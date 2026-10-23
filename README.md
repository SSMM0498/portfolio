# Portfolio — Serigne Saliou Mbacké Mbaye

Personal site of an AI & remote sensing research engineer: a one-page portfolio in English and French, with a contact form.

Built with [Nuxt 4](https://nuxt.com), [Nuxt UI](https://ui.nuxt.com), [@nuxtjs/i18n](https://i18n.nuxtjs.org) and [PostHog](https://posthog.com) for analytics.

## Setup

```bash
yarn install
cp .env.example .env   # then fill it in, see below
yarn dev               # http://localhost:3000, also reachable from other devices on the network
```

| Variable | Used for |
| --- | --- |
| `NUXT_PUBLIC_SITE_URL` | Public origin, e.g. `https://example.com`. Makes canonical, hreflang, `og:image`, JSON-LD and sitemap URLs absolute. **Set it for production builds.** |
| `NUXT_PUBLIC_POSTHOG_PROJECT_TOKEN`, `NUXT_PUBLIC_POSTHOG_HOST` | Analytics and server logs. Required in development. |
| `MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, `MAIL_PASSWORD` | SMTP account the contact form sends from. Port 465 uses TLS, 587 requires STARTTLS. |
| `CONTACT_MAIL` | Address that receives the messages. |

The `MAIL_*` and `CONTACT_MAIL` values are read when building; on the server they can be overridden at runtime as `NUXT_MAIL_HOST`, `NUXT_MAIL_PASSWORD`, `NUXT_CONTACT_MAIL`, etc.

## Scripts

| Command | |
| --- | --- |
| `yarn dev` | Development server |
| `yarn build` | Production build in `.output/` (pages, sitemap and robots.txt are prerendered) |
| `yarn preview` | Serves the production build locally |

## Deployment

The pages are static, but `/api/contact` needs the Nitro server: deploy `.output/` with `node .output/server/index.mjs`, or on any platform supported by [Nitro](https://nitro.build/deploy).

Security headers (CSP, HSTS, `X-Frame-Options`…) are set in `nuxt.config.ts` for production only. On static hosting they have to be set by the host instead.

## Structure

```
app/
  pages/index.vue          the one page: sections, wheel/touch/keyboard navigation, URL hash
  components/              one component per section (app-section-*), menu, carousel, controls
  composables/             current section and menu state, carousels registry
  utils/                   content lists: projects, expertise, techs, socials
i18n/locales/              all the texts, in English and French
server/api/contact.post.js contact form: validation, anti-spam, rate limit, email
server/routes/             sitemap.xml and robots.txt
shared/utils/              limits shared by the form and the API
public/                    CV, favicons, share images (og/), web manifest
```

### Navigation

Sections change with the mouse wheel, a vertical swipe, the menu or the keyboard:

| Key | Action |
| --- | --- |
| `↓` `PageDown` `Space` | Next section |
| `↑` `PageUp` `Shift`+`Space` | Previous section |
| `Home` / `End` | First / last section |
| `←` `→` | Scroll the carousel of the section |
| `Esc` | Close the menu |

Each section has its own URL hash (`#about`, `#expertise`, `#projects`, `#contact`), so it can be linked to.

### Contact form anti-spam

A hidden field that only bots fill in, a minimum time between page load and sending, a limit of 5 messages per IP and 50 in total per hour, a maximum length per field, and JSON-only same-site requests. Spam gets the usual success answer so bots don't adapt.

The rate limit is kept in memory, so it is per server instance.

## License

[MIT](LICENSE)
