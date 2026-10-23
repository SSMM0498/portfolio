import nodemailer from 'nodemailer';
import validator from 'validator';
import { capturePostHogLog } from '~~/server/utils/posthog-log-capture';
const config = useRuntimeConfig();

// A person needs more than this to fill in the form; bots post right after loading the page
const MIN_FILL_MS = 3000;
// Messages accepted per IP, and in total, over the window. Kept in memory, so per server instance.
const RATE_WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_IP = 5;
const MAX_TOTAL = 50;
const MAX_BODY_BYTES = 32 * 1024;

const port = Number(config.MAIL_PORT) || 587;
const transporter = nodemailer.createTransport({
    host: config.MAIL_HOST,
    port,
    // 465 is TLS from the start; on 587 the STARTTLS upgrade is required rather than opportunistic
    secure: port === 465,
    requireTLS: port === 587,
    auth: {
        user: config.MAIL_USER,
        pass: config.MAIL_PASSWORD,
    },
    // Fail fast instead of keeping the visitor waiting on an unreachable server
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
});

const recentByIp = new Map();
let recentTotal = [];

export default defineEventHandler(async (event) => {
    // A cross-site page can post a plain form without a CORS preflight, but not JSON
    if (!getRequestHeader(event, 'content-type')?.includes('application/json')) {
        throw createError({ statusCode: 415, statusMessage: 'Expected JSON' });
    }
    if (getRequestHeader(event, 'sec-fetch-site') === 'cross-site') {
        throw createError({ statusCode: 403, statusMessage: 'Cross-site request' });
    }
    if (Number(getRequestHeader(event, 'content-length')) > MAX_BODY_BYTES) {
        throw createError({ statusCode: 413, statusMessage: 'Message too large' });
    }

    const body = (await readBody(event)) ?? {};

    // Bots fill in the hidden field, or post too fast. They get the usual answer so they don't adapt.
    if (body.website || !(Number(body.elapsed) >= MIN_FILL_MS)) {
        await capturePostHogLog('info', 'Contact form spam rejected', {
            route: '/api/contact',
            outcome: 'spam',
        });
        return { ok: true };
    }

    const { data, errors } = validate(body);
    if (errors.length > 0) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid form data', data: errors });
    }

    await capturePostHogLog('info', 'Contact form validation completed', {
        route: '/api/contact',
        outcome: 'valid',
    });

    if (!takeRateLimitSlot(getRequestIP(event, { xForwardedFor: true }) ?? 'unknown')) {
        await capturePostHogLog('info', 'Contact form rate limited', {
            route: '/api/contact',
            outcome: 'rate_limited',
        });
        setResponseHeader(event, 'Retry-After', RATE_WINDOW_MS / 1000);
        throw createError({ statusCode: 429, statusMessage: 'Too many messages' });
    }

    try {
        await transporter.sendMail({
            // Sending as the visitor would fail SPF/DMARC: send from our own mailbox, reply to the visitor
            from: config.MAIL_USER,
            replyTo: { name: singleLine(data.name), address: data.email },
            to: config.CONTACT_MAIL,
            subject: singleLine(data.subject),
            text: `${data.message}\n\n${data.name} · ${data.email} · ${data.phoneNumber}`,
            html: `<p>${toHtml(data.message)}</p><p>${toHtml(data.name)} · ${toHtml(data.email)} · ${toHtml(data.phoneNumber)}</p>`,
        });

        await capturePostHogLog('info', 'Contact mail delivered', {
            route: '/api/contact',
            outcome: 'delivered',
        });
    } catch (error) {
        await capturePostHogLog('error', 'Contact mail delivery failed', {
            route: '/api/contact',
            outcome: 'failed',
        });
        console.error('Contact mail failed:', error);
        throw createError({ statusCode: 500, statusMessage: 'Message could not be sent' });
    }

    return { ok: true };
});

function validate(body) {
    const errors = [];
    const data = {};

    for (const [field, maxLength] of Object.entries(CONTACT_MAX_LENGTH)) {
        const value = typeof body[field] === 'string' ? body[field].trim() : '';
        if (!value)
            errors.push({ field, error: 'Field is required.' });
        else if (value.length > maxLength)
            errors.push({ field, error: `Field should be at most ${maxLength} characters.` });
        data[field] = value;
    }
    if (data.email && !validator.isEmail(data.email))
        errors.push({ field: 'email', error: 'Field should be a valid email.' });
    else if (data.email)
        data.email = validator.normalizeEmail(data.email);

    return { data, errors };
}

// Records a message for this IP, or returns false when it, or the whole form, is over the limit
function takeRateLimitSlot(ip) {
    const now = Date.now();
    const isRecent = (time) => now - time < RATE_WINDOW_MS;

    recentTotal = recentTotal.filter(isRecent);
    const recent = (recentByIp.get(ip) ?? []).filter(isRecent);
    if (recent.length >= MAX_PER_IP || recentTotal.length >= MAX_TOTAL) return false;

    recent.push(now);
    recentTotal.push(now);
    recentByIp.set(ip, recent);
    for (const [key, times] of recentByIp) {
        if (!times.some(isRecent)) recentByIp.delete(key);
    }
    return true;
}

// Line breaks in a header would let the visitor add headers of their own
function singleLine(value) {
    return value.replace(/\s+/g, ' ');
}

function toHtml(value) {
    return validator.escape(value).replace(/\r?\n/g, '<br>');
}
