/**
 * Test helper (#21116 review): every gemini-web model, `gemini-3.1-pro` included, is now
 * selected from the model menu and read back (no "already the default" shortcut), so a
 * fake Playwright page needs a menu to answer a request. This adds a menu that offers (and
 * has already checked) any sublabel, WITHOUT making the page DOM-readable for the answer:
 * every other in-page expression resolves to `null`, so the executor keeps taking the
 * StreamGenerate-only path these legacy fakes were written for.
 */

const MENU_BUTTON = '[data-test-id="bard-mode-menu-button"]';

export interface GeminiMenuStubOptions {
  /** Sublabels the fake menu does NOT offer (the option is absent). */
  missing?: readonly string[];
  /** Sublabels the fake menu lists as locked (upsell). */
  locked?: readonly string[];
}

type FakeElement = { click: () => Promise<void> };
type FakePage = {
  waitForSelector?: (selector: string, ...rest: unknown[]) => Promise<unknown>;
  evaluate?: unknown;
  click?: unknown;
  keyboard?: { press?: (key: string) => Promise<void>; [k: string]: unknown };
  [k: string]: unknown;
};

export function withGeminiMenu<T extends FakePage>(
  page: T,
  options: GeminiMenuStubOptions = {}
): T {
  const waitForSelector = page.waitForSelector?.bind(page);
  const press = page.keyboard?.press?.bind(page.keyboard);
  const menuElement: FakeElement = { click: async () => {} };
  return {
    ...page,
    waitForSelector: async (selector: string, ...rest: unknown[]) =>
      selector === MENU_BUTTON ? menuElement : waitForSelector?.(selector, ...rest),
    click: async () => {},
    evaluate: async (expression: string) => {
      if (/"sublabel":/.test(expression)) {
        const sublabel = JSON.parse(/"sublabel":("(?:[^"\\]|\\.)*")/.exec(expression)![1]);
        if (options.missing?.includes(sublabel)) return null;
        const locked = Boolean(options.locked?.includes(sublabel));
        return {
          testId: `bard-mode-option-${locked ? "upsell-" : ""}stub`,
          checked: !locked,
          locked,
        };
      }
      if (/mode-picker-sign-in-button/.test(expression)) return false;
      return null;
    },
    keyboard: page.keyboard && {
      ...page.keyboard,
      // Escape closes the menu; it must not count as a prompt keypress.
      press: async (key: string) => {
        if (key !== "Escape") await press?.(key);
      },
    },
  } as T;
}
