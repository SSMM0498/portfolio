// Prerendered (see routeRules). A sitemap must be referenced by an absolute URL.
export default defineEventHandler((event) => {
    const { siteUrl } = useRuntimeConfig(event).public;
    const lines = ['User-agent: *', 'Allow: /', 'Disallow: /api/'];
    if (siteUrl) lines.push('', `Sitemap: ${siteUrl}/sitemap.xml`);

    setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8');
    return `${lines.join('\n')}\n`;
});
