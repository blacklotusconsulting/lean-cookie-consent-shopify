# Lean Cookie Consent for Shopify

Lightweight Shopify theme connector for the Lean Cookie Consent SaaS platform.

This first release is not a Shopify App Store app. It is a theme snippet that lets a Shopify merchant or developer load Lean Cookie Consent from a public Site Key without adding arbitrary scripts to the theme settings.

## What it does

- Adds the Lean Cookie Consent hosted runtime to a Shopify storefront.
- Uses a single public Site Key from the Lean Cookie Consent dashboard.
- Hardcodes the Lean runtime host: `https://api.leancookieconsent.com`.
- Exposes basic Shopify storefront context to the page through `window.LeanCookieConsentShopify`.
- Keeps banner copy, languages, categories, services, policy links and evidence handling inside Lean Cookie Consent.

## Requirements

- A Shopify Online Store 2.0 theme or a theme that lets you edit `theme.liquid`.
- A Lean Cookie Consent account.
- A valid Lean Cookie Consent Site Key for the Shopify storefront domain.

## Installation

1. In Shopify Admin, go to **Online Store -> Themes**.
2. Open the current theme menu and choose **Edit code**.
3. Create a new snippet named `lean-cookie-consent`.
4. Copy the contents of `snippets/lean-cookie-consent.liquid` into that snippet.
5. Open `layout/theme.liquid`.
6. Add this line before `</head>`:

```liquid
{% render 'lean-cookie-consent', site_key: 'YOUR_SITE_KEY' %}
```

7. Replace `YOUR_SITE_KEY` with the Site Key from the Lean Cookie Consent dashboard.
8. Save the theme and test the storefront in an incognito browser window.

## Optional theme setting

If you prefer not to hardcode the Site Key in `theme.liquid`, merge the object in `config/settings_schema.fragment.json` into the theme's `config/settings_schema.json`, then use:

```liquid
{% render 'lean-cookie-consent' %}
```

The snippet will read `settings.lean_cookie_consent_site_key`.

## Content Security Policy

If the storefront or a custom proxy adds a strict CSP, allow:

```text
script-src https://api.leancookieconsent.com
connect-src https://api.leancookieconsent.com
```

The hosted Lean runtime fetches public site configuration and records visitor consent choices for the configured Site Key.

## Current limitations

- This connector does not yet use a Shopify app extension.
- It does not automatically configure Shopify Customer Privacy API consent signals.
- It cannot block scripts that are already emitted before the snippet runs.
- For stronger control, install Lean through Google Tag Manager with the Lean GTM template or move marketing tags behind Lean-compatible consent gates.

## Repository Links

- Lean Cookie Consent: https://leancookieconsent.com/
- Lean app: https://app.leancookieconsent.com/
- GTM template: https://github.com/blacklotusconsulting/lean-cookie-consent-gtm-template

