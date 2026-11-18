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
import {
  CLASSIC_PAGE_BACKGROUND,
  EDITIONS_PAGE_BACKGROUND,
} from "../../src/shared/constants/pwaThemeColors.ts";
import { resolveThemeColor } from "../../src/shared/utils/themeColorMeta.ts";

// The pre-hydration script decides the first paint: Editions (the kit's
// data-ci-appearance="editions") unless the persisted `theme` store says "classic".

const require = createRequire(import.meta.url);
const { JSDOM } = require("jsdom");
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const read = (p: string) => fs.readFileSync(path.join(ROOT, p), "utf8");

/** Run the real script string against a fresh document, as the browser does before paint. */
/** The viewport theme-color tags the root layout server-renders (Editions, one per scheme). */
const SERVER_THEME_COLOR_METAS =
  `<meta name="theme-color" media="(prefers-color-scheme: light)" content="${EDITIONS_PAGE_BACKGROUND.light}">` +
  `<meta name="theme-color" media="(prefers-color-scheme: dark)" content="${EDITIONS_PAGE_BACKGROUND.dark}">`;

function boot(
  stored: string | null,
  { prefersDark = false, serverAttr = true, head = SERVER_THEME_COLOR_METAS } = {}
) {
  const dom = new JSDOM(
    `<!doctype html><html class="ci-theme"${serverAttr ? ' data-ci-appearance="editions"' : ""}><head>${head}</head><body></body></html>`,
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
    /**
     * The colour the browser uses per media ("" when a tag has none): the first tag in tree order
     * that is not parked (`media="not all"`), as hex. A server tag whose colour changes is parked
     * behind an `rgb()` copy rather than rewritten (#19066), so React can still adopt it.
     */
    themeColors: effectiveThemeColors(win.document),
    /** content of the server-rendered tags (parked ones included), keyed by original media. */
    serverContents: Object.fromEntries(
      [...win.document.querySelectorAll('meta[name="theme-color"]')]
        .filter((m) => !m.hasAttribute("data-theme-color-boot"))
        .map((m) => [
          m.getAttribute("data-theme-color-media") ?? m.getAttribute("media") ?? "",
          m.getAttribute("content"),
        ])
    ) as Record<string, string | null>,
  };
}

function toHex(content: string | null): string | null {
  const rgb = /^rgb\((\d+) (\d+) (\d+)\)$/.exec(content ?? "");
  if (!rgb) return content;
  return `#${rgb
    .slice(1)
    .map((c) => Number(c).toString(16).padStart(2, "0"))
    .join("")}`;
}

function effectiveThemeColors(doc: Document): Record<string, string | null> {
  const out: Record<string, string | null> = {};
  for (const m of doc.querySelectorAll('meta[name="theme-color"]')) {
    const media = m.getAttribute("media") ?? "";
    if (media === "not all" || media in out) continue;
    out[media] = toHex(m.getAttribute("content"));
  }
  return out;
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
  assert.deepEqual(broken.themeColors, {
    [LIGHT_MEDIA]: EDITIONS_PAGE_BACKGROUND.light,
    [DARK_MEDIA]: EDITIONS_PAGE_BACKGROUND.dark,
  });
});

const LIGHT_MEDIA = "(prefers-color-scheme: light)";
const DARK_MEDIA = "(prefers-color-scheme: dark)";

test("theme-color before paint: the server tags keep their content (React adopts them by it)", () => {
  for (const state of [
    { theme: "dark", palette: "classic" },
    { theme: "system", palette: "classic" },
    { theme: "light", palette: "editions" },
  ]) {
    for (const prefersDark of [false, true]) {
      assert.deepEqual(boot(persisted(state), { prefersDark }).serverContents, {
        [LIGHT_MEDIA]: EDITIONS_PAGE_BACKGROUND.light,
        [DARK_MEDIA]: EDITIONS_PAGE_BACKGROUND.dark,
      });
    }
  }
});

test("theme-color before paint: palette × explicit light/dark sets every variant to that mode", () => {
  for (const [palette, bg] of [
    ["editions", EDITIONS_PAGE_BACKGROUND],
    ["classic", CLASSIC_PAGE_BACKGROUND],
  ] as const) {
    for (const prefersDark of [false, true]) {
      const light = boot(persisted({ theme: "light", palette }), { prefersDark });
      assert.deepEqual(light.themeColors, { [LIGHT_MEDIA]: bg.light, [DARK_MEDIA]: bg.light });
      const dark = boot(persisted({ theme: "dark", palette }), { prefersDark });
      assert.deepEqual(dark.themeColors, { [LIGHT_MEDIA]: bg.dark, [DARK_MEDIA]: bg.dark });
    }
  }
});

test("theme-color before paint: the system theme keeps one colour per scheme, in the stored palette", () => {
  for (const prefersDark of [false, true]) {
    const classic = boot(persisted({ theme: "system", palette: "classic" }), { prefersDark });
    assert.deepEqual(classic.themeColors, {
      [LIGHT_MEDIA]: CLASSIC_PAGE_BACKGROUND.light,
      [DARK_MEDIA]: CLASSIC_PAGE_BACKGROUND.dark,
    });
    // Nothing stored = system theme + Editions: the server defaults stay as rendered.
    const fresh = boot(null, { prefersDark });
    assert.deepEqual(fresh.themeColors, {
      [LIGHT_MEDIA]: EDITIONS_PAGE_BACKGROUND.light,
      [DARK_MEDIA]: EDITIONS_PAGE_BACKGROUND.dark,
    });
  }
});

test("theme-color before paint: with no server tag yet the script adds one for the active mode", () => {
  const classicDark = boot(persisted({ theme: "dark", palette: "classic" }), { head: "" });
  assert.deepEqual(classicDark.themeColors, { "": CLASSIC_PAGE_BACKGROUND.dark });
  const systemDark = boot(persisted({ theme: "system", palette: "classic" }), {
    head: "",
    prefersDark: true,
  });
  assert.deepEqual(systemDark.themeColors, { "": CLASSIC_PAGE_BACKGROUND.dark });
  const editionsLight = boot(null, { head: "" });
  assert.deepEqual(editionsLight.themeColors, { "": EDITIONS_PAGE_BACKGROUND.light });
  assert.ok(
    THEME_BOOT_SCRIPT.includes('"data-theme-color-fallback"'),
    "the added tag is marked, so the store can drop it once the server tags exist"
  );
});

test("the boot script and resolveThemeColor() agree on every palette × theme × scheme", () => {
  for (const palette of ["editions", "classic", "violet", undefined]) {
    for (const theme of ["light", "dark", "system", "foo", undefined]) {
      for (const prefersDark of [false, true]) {
        const { themeColors } = boot(persisted({ theme, palette }), { prefersDark });
        for (const media of [LIGHT_MEDIA, DARK_MEDIA]) {
          assert.equal(
            themeColors[media],
            resolveThemeColor({
              palette,
              theme: theme ?? "system",
              media,
              systemDark: prefersDark,
            }),
            `${palette}/${theme}/${prefersDark ? "os-dark" : "os-light"}/${media}`
          );
        }
      }
    }
  }
});

test("the boot script embeds the pinned palette backgrounds, not its own literals", () => {
  for (const hex of [
    EDITIONS_PAGE_BACKGROUND.light,
    EDITIONS_PAGE_BACKGROUND.dark,
    CLASSIC_PAGE_BACKGROUND.light,
    CLASSIC_PAGE_BACKGROUND.dark,
  ]) {
    assert.ok(THEME_BOOT_SCRIPT.includes(JSON.stringify(hex)), `${hex} reaches the boot script`);
  }
  assert.doesNotMatch(read("src/shared/utils/themeBootScript.ts"), /#[0-9a-f]{6}/i);
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
