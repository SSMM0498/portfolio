// Prerendered (see routeRules). Each locale's home page, listing the other as an alternate.
const PAGES = [
    { lang: 'en', path: '/' },
    { lang: 'fr', path: '/fr' },
];

export default defineEventHandler((event) => {
    const { siteUrl } = useRuntimeConfig(event).public;
    const alternates = PAGES.map(({ lang, path }) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${siteUrl}${path}"/>`)
        .concat(`<xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/"/>`)
        .join('');
    const urls = PAGES.map(({ path }) => `<url><loc>${siteUrl}${path}</loc>${alternates}</url>`).join('');

    setResponseHeader(event, 'content-type', 'application/xml; charset=utf-8');
    return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`;
});
