import nodemailer from 'nodemailer';
import validator from 'validator';
const config = useRuntimeConfig();

const transporter = nodemailer.createTransport({
    host: config.MAIL_HOST,
    port: config.MAIL_PORT,
    auth: {
        user: config.MAIL_USER,
        pass: config.MAIL_PASSWORD,
    },
});

export default defineEventHandler(async (event) => {
    const body = (await readBody(event)) ?? {};

    let data;
    try {
        data = await isValid(body);
    } catch (errors) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid form data', data: errors });
    }

    try {
        const mail = await transporter.sendMail({
            // Sending as the visitor would fail SPF/DMARC: send from our own mailbox, reply to the visitor
            from: config.MAIL_USER,
            replyTo: { name: data.name, address: data.email },
            to: config.CONTACT_MAIL,
            subject: data.subject,
            text: `${data.message}\n\n${data.name} · ${data.email} · ${data.phoneNumber}`,
            html: `<p>${data.message}</p><p>${data.name} · ${data.email} · ${data.phoneNumber}</p>`,
        });

        console.log('Message sent: %s', mail.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(mail));
    } catch (error) {
        console.error('Contact mail failed:', error);
        throw createError({ statusCode: 500, statusMessage: 'Message could not be sent' });
    }

    return 'Gesendet!';
});

async function isValid(body) {
    const errors = [];

    if (validator.isEmpty(body.email || ''))
        errors.push({
            field: 'email',
            error: 'Field is required.',
        });
    if (validator.isEmpty(body.name || ''))
        errors.push({ field: 'name', error: 'Field is required.' });
    if (validator.isEmpty(body.phoneNumber || ''))
        errors.push({ field: 'phoneNumber', error: 'Field is required.' });
    if (validator.isEmpty(body.subject || ''))
        errors.push({ field: 'subject', error: 'Field is required.' });
    if (validator.isEmpty(body.message || ''))
        errors.push({ field: 'message', error: 'Field is required.' });
    if (!validator.isEmail(body.email || ''))
        errors.push({ field: 'email', error: 'Field should be a valid email.' });

    if (errors.length > 0) {
        return Promise.reject(errors);
    } else {
        return Promise.resolve({
            email: validator.normalizeEmail(body.email),
            phoneNumber: validator.escape(body.phoneNumber),
            subject: validator.escape(body.subject),
            name: validator.escape(body.name),
            message: validator.escape(body.message),
        });
    }
}
