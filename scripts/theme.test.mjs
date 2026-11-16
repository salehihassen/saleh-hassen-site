import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import test from 'node:test';

// Exercise the actual head script, before any page content or toggle upgrades.
const head = readFileSync(new URL('../src/components/MainHead.astro', import.meta.url), 'utf8');
const bootstrap = head.match(/<script is:inline>([\s\S]*?)<\/script>/)[1];

function setup({ saved, dark = false, blocked = false } = {}) {
    const values = new Map(saved ? [['theme-pref', saved]] : []);
    const media = Object.assign(new EventTarget(), { matches: dark });
    const root = { dataset: {}, classList: { toggle: (_, on) => { root.dark = on; } } };
    const document = Object.assign(new EventTarget(), { documentElement: root });
    const window = Object.assign(new EventTarget(), { matchMedia: () => media });
    const localStorage = {
        getItem: (key) => { if (blocked) throw new Error('Storage blocked'); return values.get(key) ?? null; },
        removeItem: (key) => { if (blocked) throw new Error('Storage blocked'); values.delete(key); },
    };
    runInNewContext(bootstrap, { document, window, localStorage, CustomEvent });
    return {
        root,
        values,
        choose: (value) => document.dispatchEvent(new CustomEvent('themeprefchange', { detail: value })),
        system: (on) => { media.matches = on; media.dispatchEvent(new Event('change')); },
        storage: (key) => window.dispatchEvent(Object.assign(new Event('storage'), { key })),
    };
}

test('system preference tracks the OS without persisting an automatic choice', () => {
    const app = setup();
    assert.equal(app.root.dataset.themePref, 'system');
    app.system(true);
    assert.equal(app.root.dark, true);
    app.system(false);
    assert.equal(app.root.dark, false);
    assert.equal(app.values.size, 0);
});

test('saved override wins until the visitor selects system', () => {
    const app = setup({ saved: 'light', dark: true });
    assert.equal(app.root.dark, false);
    app.values.delete('theme-pref');
    app.choose('system');
    assert.equal(app.root.dark, true);
});

test('theme buttons still work when storage is blocked', () => {
    const app = setup({ blocked: true });
    app.choose('dark');
    assert.equal(app.root.dataset.themePref, 'dark');
    assert.equal(app.root.dark, true);
    app.system(false);
    assert.equal(app.root.dark, true);
    app.choose('system');
    assert.equal(app.root.dark, false);
});

test('other-tab changes and clearing storage update the current preference', () => {
    const app = setup({ saved: 'light', dark: true });
    app.values.set('theme-pref', 'dark');
    app.storage('theme-pref');
    assert.equal(app.root.dataset.themePref, 'dark');
    app.values.clear();
    app.storage(null);
    assert.equal(app.root.dataset.themePref, 'system');
    assert.equal(app.root.dark, true);
});
