import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Liquid } from 'liquidjs';

const engine = new Liquid({
  strictFilters: true,
  strictVariables: false,
});

engine.registerFilter('json', (value) => JSON.stringify(value));
engine.registerFilter('url_encode', (value) => encodeURIComponent(String(value)));

const source = await readFile(new URL('../snippets/lean-cookie-consent.liquid', import.meta.url), 'utf8');
const template = engine.parse(source);

const shop = {
  permanent_domain: 'lean-test.myshopify.com',
  name: 'Lean Test Store',
};

const rendered = await engine.render(template, {
  site_key: 'site_abc123',
  settings: {},
  shop,
});

assert.ok(rendered.includes('window.LeanCookieConsentShopify'));
assert.ok(rendered.includes('"site_abc123"'));
assert.ok(rendered.includes('"lean-test.myshopify.com"'));
assert.ok(rendered.includes('https://api.leancookieconsent.com/embed.js?site=site_abc123'));
assert.doesNotMatch(rendered, /YOUR_SITE_KEY/);

const escaped = await engine.render(template, {
  site_key: 'site_abc123\"bad',
  settings: {},
  shop,
});

assert.ok(escaped.includes('"site_abc123\\"bad"'));
assert.ok(escaped.includes('site=site_abc123%22bad'));

const settingsFallback = await engine.render(template, {
  settings: { lean_cookie_consent_site_key: 'site_from_settings' },
  shop,
});

assert.ok(settingsFallback.includes('"site_from_settings"'));
assert.ok(settingsFallback.includes('site=site_from_settings'));

const missing = await engine.render(template, {
  settings: {},
  shop,
});

assert.ok(missing.includes('missing site_key render parameter'));
assert.ok(!missing.includes('embed.js?site='));

console.log('Shopify Liquid snippet render tests passed');
