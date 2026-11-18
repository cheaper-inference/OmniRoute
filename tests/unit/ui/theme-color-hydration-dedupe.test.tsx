import { afterEach, describe, expect, it } from "vitest";
import { act } from "react";
import { hydrateRoot, type Root } from "react-dom/client";
import { THEME_BOOT_SCRIPT } from "@/shared/utils/themeBootScript";
import {
  THEME_COLOR_BOOT_ATTRIBUTE,
  THEME_COLOR_FALLBACK_ATTRIBUTE,
  THEME_COLOR_PARKED_MEDIA,
  THEME_COLOR_PARKED_MEDIA_ATTRIBUTE,
  applyThemeColor,
  themeColorBootValue,
} from "@/shared/utils/themeColorMeta";
import {
  CLASSIC_PAGE_BACKGROUND,
  EDITIONS_PAGE_BACKGROUND,
} from "@/shared/constants/pwaThemeColors";

// #19066 block 2: with a stored palette the page ended up with 4 `<meta name="theme-color">` tags
// instead of the 2 the server renders. React 19 adopts the server's <meta> tags at hydration by
// matching their `content`; THEME_BOOT_SCRIPT used to rewrite that content before hydration, so
// React left the repainted tags unowned and appended fresh server copies. This runs the real boot
// script and a real React hydration of the whole document, then the store's applyThemeColor().

const LIGHT = "(prefers-color-scheme: light)";
const DARK = "(prefers-color-scheme: dark)";

// What the root layout's `viewport.themeColor` renders (Editions, one tag per scheme).
function ServerDocument() {
  return (
    <html lang="en">
      {/* eslint-disable-next-line @next/next/no-head-element -- whole-document hydration fixture, not a Next page */}
      <head>
        <meta name="theme-color" media={LIGHT} content={EDITIONS_PAGE_BACKGROUND.light} />
        <meta name="theme-color" media={DARK} content={EDITIONS_PAGE_BACKGROUND.dark} />
      </head>
      <body>
        <main>page</main>
      </body>
    </html>
  );
}

const SERVER_HEAD =
  `<meta name="theme-color" media="${LIGHT}" content="${EDITIONS_PAGE_BACKGROUND.light}">` +
  `<meta name="theme-color" media="${DARK}" content="${EDITIONS_PAGE_BACKGROUND.dark}">`;

let root: Root | null = null;

const allTags = () => [...document.querySelectorAll('meta[name="theme-color"]')];
const tags = () =>
  allTags().map((m) => ({ media: m.getAttribute("media"), content: m.getAttribute("content") }));
const byMedia = () => Object.fromEntries(tags().map((m) => [m.media, m.content]));

/** The colour the browser uses per scheme: the first tag in tree order whose media can match. */
function effectiveColors() {
  const out: Record<string, string | null> = {};
  for (const { media, content } of tags()) {
    if (media === THEME_COLOR_PARKED_MEDIA || (media ?? "") in out) continue;
    out[media ?? ""] = content;
  }
  return out;
}

function mockScheme(prefersDark: boolean) {
  window.matchMedia = ((query: string) => ({
    matches: query === "(prefers-color-scheme: dark)" && prefersDark,
    media: query,
    addEventListener() {},
    removeEventListener() {},
  })) as unknown as typeof window.matchMedia;
}

function runBootScript() {
  // jsdom (runScripts: "dangerously" in Vitest) executes an inline script like the browser does.
  const script = document.createElement("script");
  script.textContent = THEME_BOOT_SCRIPT;
  document.head.appendChild(script);
  script.remove();
}

/** Server HTML → boot script (before paint) → React hydration → the store's first apply. */
async function loadPage(stored: Record<string, unknown> | null, prefersDark = false) {
  document.documentElement.innerHTML = `<head>${SERVER_HEAD}</head><body><main>page</main></body>`;
  mockScheme(prefersDark);
  localStorage.clear();
  if (stored) localStorage.setItem("theme", JSON.stringify({ state: stored, version: 0 }));
  runBootScript();
  const beforeHydration = effectiveColors();
  await act(async () => {
    root = hydrateRoot(document, <ServerDocument />, { onRecoverableError: () => {} });
  });
  // React must have adopted the 2 server tags instead of appending copies of them.
  const serverTagsAfterHydration = allTags().filter(
    (m) => !m.hasAttribute(THEME_COLOR_BOOT_ATTRIBUTE)
  ).length;
  applyThemeColor(stored?.theme ?? "system", stored?.palette);
  return { beforeHydration, serverTagsAfterHydration };
}

afterEach(async () => {
  await act(async () => root?.unmount());
  root = null;
});

describe("theme-color tags across hydration (#19066)", () => {
  it("a stored Classic palette: Classic before paint, React adopts the 2 server tags, 2 remain", async () => {
    const { beforeHydration, serverTagsAfterHydration } = await loadPage({
      theme: "system",
      palette: "classic",
    });
    expect(beforeHydration).toEqual({
      [LIGHT]: themeColorBootValue(CLASSIC_PAGE_BACKGROUND.light),
      [DARK]: themeColorBootValue(CLASSIC_PAGE_BACKGROUND.dark),
    });
    expect(serverTagsAfterHydration).toBe(2);
    expect(tags()).toHaveLength(2);
    expect(byMedia()).toEqual({
      [LIGHT]: CLASSIC_PAGE_BACKGROUND.light,
      [DARK]: CLASSIC_PAGE_BACKGROUND.dark,
    });
    expect(
      document.querySelector(
        `[${THEME_COLOR_BOOT_ATTRIBUTE}], [${THEME_COLOR_PARKED_MEDIA_ATTRIBUTE}]`
      )
    ).toBeNull();
  });

  it("an explicit dark theme (one server tag already dark): 2 tags, both dark", async () => {
    const { beforeHydration, serverTagsAfterHydration } = await loadPage({
      theme: "dark",
      palette: "editions",
    });
    expect(beforeHydration).toEqual({
      [LIGHT]: themeColorBootValue(EDITIONS_PAGE_BACKGROUND.dark),
      [DARK]: EDITIONS_PAGE_BACKGROUND.dark,
    });
    expect(serverTagsAfterHydration).toBe(2);
    expect(byMedia()).toEqual({
      [LIGHT]: EDITIONS_PAGE_BACKGROUND.dark,
      [DARK]: EDITIONS_PAGE_BACKGROUND.dark,
    });
    expect(tags()).toHaveLength(2);
  });

  it("an explicit light Classic theme on a dark OS: 2 tags, both Classic light", async () => {
    const { serverTagsAfterHydration } = await loadPage(
      { theme: "light", palette: "classic" },
      true
    );
    expect(serverTagsAfterHydration).toBe(2);
    expect(byMedia()).toEqual({
      [LIGHT]: CLASSIC_PAGE_BACKGROUND.light,
      [DARK]: CLASSIC_PAGE_BACKGROUND.light,
    });
    expect(tags()).toHaveLength(2);
  });

  it("nothing stored: the boot script parks nothing and the server tags stay as rendered", async () => {
    const { beforeHydration, serverTagsAfterHydration } = await loadPage(null);
    expect(beforeHydration).toEqual({
      [LIGHT]: EDITIONS_PAGE_BACKGROUND.light,
      [DARK]: EDITIONS_PAGE_BACKGROUND.dark,
    });
    expect(serverTagsAfterHydration).toBe(2);
    expect(tags()).toEqual([
      { media: LIGHT, content: EDITIONS_PAGE_BACKGROUND.light },
      { media: DARK, content: EDITIONS_PAGE_BACKGROUND.dark },
    ]);
  });

  it("the boot copy's colour can never equal a server tag's content", () => {
    for (const hex of [
      EDITIONS_PAGE_BACKGROUND.light,
      EDITIONS_PAGE_BACKGROUND.dark,
      CLASSIC_PAGE_BACKGROUND.light,
      CLASSIC_PAGE_BACKGROUND.dark,
    ]) {
      expect(themeColorBootValue(hex)).toMatch(/^rgb\(\d{1,3} \d{1,3} \d{1,3}\)$/);
      expect(themeColorBootValue(hex)).not.toBe(hex);
    }
    expect(themeColorBootValue("#11120f")).toBe("rgb(17 18 15)");
    expect(themeColorBootValue("#fff")).toBe("rgb(255 255 255)");
  });

  it("without hydration (no React), applyThemeColor still unparks, drops the copies and repaints", () => {
    document.documentElement.innerHTML = `<head>${SERVER_HEAD}</head><body></body>`;
    mockScheme(false);
    localStorage.setItem(
      "theme",
      JSON.stringify({ state: { theme: "light", palette: "classic" } })
    );
    runBootScript();
    expect(tags()).toHaveLength(4);
    applyThemeColor("light", "classic");
    expect(tags()).toEqual([
      { media: LIGHT, content: CLASSIC_PAGE_BACKGROUND.light },
      { media: DARK, content: CLASSIC_PAGE_BACKGROUND.light },
    ]);
  });

  it("running the boot script twice does not stack copies", () => {
    document.documentElement.innerHTML = `<head>${SERVER_HEAD}</head><body></body>`;
    mockScheme(false);
    localStorage.setItem("theme", JSON.stringify({ state: { theme: "dark", palette: "classic" } }));
    runBootScript();
    runBootScript();
    expect(tags()).toHaveLength(4);
  });

  it("the boot script's own fallback tag (no server tag) is painted directly, not parked", () => {
    document.documentElement.innerHTML = "<head></head><body></body>";
    mockScheme(false);
    localStorage.setItem("theme", JSON.stringify({ state: { theme: "dark", palette: "classic" } }));
    runBootScript();
    const added = allTags();
    expect(added).toHaveLength(1);
    expect(added[0].hasAttribute(THEME_COLOR_FALLBACK_ATTRIBUTE)).toBe(true);
    expect(added[0].hasAttribute(THEME_COLOR_BOOT_ATTRIBUTE)).toBe(false);
    expect(added[0].getAttribute("content")).toBe(CLASSIC_PAGE_BACKGROUND.dark);
  });
});
