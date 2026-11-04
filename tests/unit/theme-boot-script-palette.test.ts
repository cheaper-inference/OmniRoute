import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { THEME_BOOT_SCRIPT } from "../../src/shared/utils/themeBootScript.ts";
import {
  APPEARANCE_PALETTES,
  DEFAULT_APPEARANCE_PALETTE,
  isAppearancePalette,
  normalizeAppearancePalette,
} from "../../src/shared/constants/appearancePalette.ts";

// The pre-hydration script decides the first paint: Editions (the kit's
// data-ci-appearance="editions") unless the persisted `theme` store says "classic".

const require = createRequire(import.meta.url);
const { JSDOM } = require("jsdom");
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const read = (p: string) => fs.readFileSync(path.join(ROOT, p), "utf8");

/** Run the real script string against a fresh document, as the browser does before paint. */
function boot(stored: string | null, { prefersDark = false, serverAttr = true } = {}) {
  const dom = new JSDOM(
    `<!doctype html><html class="ci-theme"${serverAttr ? ' data-ci-appearance="editions"' : ""}><head></head><body></body></html>`,
    { url: "http://localhost/", runScripts: "outside-only" }
  );
  const win = dom.window;
  win.matchMedia = (query: string) => ({
    matches: query === "(prefers-color-scheme: dark)" && prefersDark,
  });
  if (stored !== null) win.localStorage.setItem("theme", stored);
  new vm.Script(THEME_BOOT_SCRIPT).runInContext(dom.getInternalVMContext());
  const root = win.document.documentElement;
  return {
    appearance: root.getAttribute("data-ci-appearance"),
    theme: root.dataset.theme,
    darkClass: root.classList.contains("dark"),
    colorScheme: root.style.colorScheme,
  };
}

const persisted = (state: Record<string, unknown>) => JSON.stringify({ state, version: 0 });

test("a fresh visitor (nothing stored) gets Editions and the system theme", () => {
  const light = boot(null);
  assert.equal(light.appearance, "editions");
  assert.equal(light.theme, "light");
  assert.equal(light.darkClass, false);
  const dark = boot(null, { prefersDark: true });
  assert.equal(dark.appearance, "editions");
  assert.equal(dark.theme, "dark");
  assert.equal(dark.darkClass, true);
  assert.equal(dark.colorScheme, "dark");
});

test("the script itself sets Editions even if the server attribute is missing", () => {
  assert.equal(boot(null, { serverAttr: false }).appearance, "editions");
  assert.equal(boot(persisted({ theme: "dark" }), { serverAttr: false }).appearance, "editions");
});

test("a stored Classic choice removes the attribute before paint, keeping the theme", () => {
  const classicDark = boot(persisted({ theme: "dark", palette: "classic" }));
  assert.equal(classicDark.appearance, null);
  assert.equal(classicDark.theme, "dark");
  assert.equal(classicDark.darkClass, true);
  const classicLight = boot(persisted({ theme: "light", palette: "classic" }), {
    prefersDark: true,
  });
  assert.equal(classicLight.appearance, null);
  assert.equal(classicLight.theme, "light");
});

test("stored Editions, a pre-Editions store and an unknown palette all resolve to Editions", () => {
  assert.equal(boot(persisted({ theme: "light", palette: "editions" })).appearance, "editions");
  assert.equal(boot(persisted({ theme: "light" })).appearance, "editions");
  assert.equal(boot(persisted({ theme: "light", palette: "violet" })).appearance, "editions");
});

test("a corrupted store never throws and leaves the server default (Editions) in place", () => {
  const broken = boot("{not json");
  assert.equal(broken.appearance, "editions");
  assert.equal(broken.theme, undefined, "nothing else was applied either");
});

test("the root layout server-renders Editions and inlines THEME_BOOT_SCRIPT in <head>", () => {
  const layout = read("src/app/layout.tsx");
  assert.match(layout, /<html[\s\S]*?data-ci-appearance=\{EDITIONS_APPEARANCE_VALUE\}[\s\S]*?>/);
  assert.match(layout, /dangerouslySetInnerHTML=\{\{ __html: THEME_BOOT_SCRIPT \}\}/);
  assert.ok(
    layout.indexOf("THEME_BOOT_SCRIPT }}") < layout.indexOf("</head>"),
    "the boot script runs in <head>, before the body paints"
  );
  // The old inline copy is gone: one script owns the theme + palette resolution.
  assert.doesNotMatch(layout, /localStorage\.getItem\('theme'\)/);
});

test("the error page outside the root layout applies the stored palette too", () => {
  const globalError = read("src/app/global-error.tsx");
  assert.match(globalError, /normalizeAppearancePalette\(parsed\?\.state\?\.palette\)/);
  assert.match(
    globalError,
    /data-ci-appearance=\{palette === "classic" \? undefined : EDITIONS_APPEARANCE_VALUE\}/
  );
});

test("palette constants: Editions is the default, Classic the only alternative", () => {
  assert.deepEqual([...APPEARANCE_PALETTES], ["editions", "classic"]);
  assert.equal(DEFAULT_APPEARANCE_PALETTE, "editions");
  assert.equal(isAppearancePalette("classic"), true);
  assert.equal(isAppearancePalette("lime"), false);
  assert.equal(normalizeAppearancePalette(undefined), "editions");
  assert.equal(normalizeAppearancePalette("classic"), "classic");
  assert.equal(normalizeAppearancePalette(42), "editions");
});

test("the attribute the app sets is the one the vendored kit styles", () => {
  const editions = read("packages/ui-kit/src/ci-editions.css");
  assert.match(editions, /html:root\[data-ci-appearance="editions"\]/);
  assert.match(editions, /html:root\[data-theme="dark"\]\[data-ci-appearance="editions"\]/);
  assert.match(read("packages/ui-kit/src/ci-ui.css"), /@import "\.\/ci-editions\.css";/);
});
