/**
 * Per-model Gemini Web UI mode selection + verification (#13381, Option B).
 *
 * Before this module, `GeminiWebExecutor.execute()` read the `model` field
 * only AFTER Gemini had already answered — purely to stamp the OpenAI-shaped
 * response, never to influence what was actually typed/clicked in the
 * browser (../gemini-web.ts). Every advertised `gweb/<model>` alias ran the
 * identical automation, so the response `model` field was a caller-supplied
 * label, not an observed fact.
 *
 * This module gives the executor a real selection step: for each advertised
 * model (and for the Extended Thinking control, #13381 follow-up comment
 * 2026-09-11), it tries the corresponding UI control, then READS BACK the
 * active-mode indicator to confirm the switch actually took effect before
 * the caller is allowed to proceed. Every advertised model requires a
 * confirmed switch: there is no "default" mode that is assumed active, because
 * an account's active mode varies (the #21116 reporter's is Hydrogen, whose
 * menu has no "3.1 Pro"), and assuming it would answer under the wrong label.
 *
 * ⚠️ SELECTOR SET IS UNVALIDATED. Every CSS selector below is a best-effort
 * guess at Gemini's current DOM, not a value confirmed against a live
 * account — this checkout has no live Gemini session and no way to inspect
 * Google's current markup (which also changes without notice). That is fine
 * BY DESIGN: `selectGeminiUiMode()` never trusts an unconfirmed guess. If a
 * selector is wrong — the likely outcome until the mandatory live smoke in
 * the PR is run and these values are corrected against the real DOM — the
 * toggle/indicator lookup simply fails, the read-back does not confirm the
 * requested mode, and the caller gets a clear 400
 * (`unsupported_control_for_provider`) instead of a response silently
 * labeled with a model/mode that never actually ran — the exact dishonesty
 * #13381 reported. Update the selectors only after inspecting the real DOM
 * on a live account, never from guesswork.
 */

import {
  GEMINI_WEB_ARGON_MODEL,
  isGeminiWebArgonEnabled,
} from "../../config/providers/registry/gemini/web/index.ts";
import { isGeminiSignedOutInPage, toInPageExpression } from "./domReply.ts";

/** Reasons `selectGeminiUiMode`/`selectGeminiModel` can fail closed. */
export type GeminiModeSelectionFailureReason =
  | "control_not_found"
  | "indicator_not_found"
  | "indicator_mismatch"
  | "unknown_model"
  | "mode_not_offered"
  | "mode_locked"
  | "signed_out";

export interface GeminiWebModeDescriptor {
  /** The advertised `gweb/<model>` id, or a synthetic label for non-model controls. */
  readonly id: string;
  /** UNVALIDATED — opens/activates the control for this mode. */
  readonly toggleSelector?: string;
  /** UNVALIDATED — element whose text proves which mode is now active. */
  readonly activeIndicatorSelector?: string;
  /** Text the active-mode indicator must contain once the switch is confirmed. */
  readonly expectedIndicatorPattern?: RegExp;
  /**
   * Model-menu selection (#21116): the exact, non-localized sublabel of the
   * option in the mode menu (e.g. "4 Hydrogen"). When set, the menu path is
   * used instead of the toggle/indicator selectors above.
   */
  readonly menuSublabel?: string;
}

/**
 * Model menu, checked live 2026-11-24 (consumer Pro account, pt-BR UI):
 *   button[data-test-id="bard-mode-menu-button"]           opens the menu
 *   gem-menu-item[role="menuitemradio"][data-test-id^="bard-mode-option-"]
 *     title (localized, e.g. "Ajuda no dia a dia") + sublabel ("4 Hydrogen")
 *     aria-checked="true" on the active option
 *     data-test-id contains "upsell" when the tier does not include it (locked)
 * The menu also lists a reasoning-level group whose items have no
 * `bard-mode-option-` id, so they never match.
 */
export const GEMINI_WEB_MODE_MENU_BUTTON = '[data-test-id="bard-mode-menu-button"]';
const GEMINI_WEB_MODE_OPTION = '[role="menuitemradio"][data-test-id^="bard-mode-option-"]';

/**
 * Model -> Gemini UI mode map for the `gweb/<model>` ids advertised by
 * `open-sse/config/providers/registry/gemini/web/index.ts` (gemini-4-argon only
 * when OMNIROUTE_GEMINI_WEB_ARGON_ENABLED is on, #16573). Keep the two
 * catalogs in sync: an advertised model with no entry here fails closed as
 * `unknown_model` (see `resolveGeminiModelMode`), which is the intended,
 * honest behavior for a model this module cannot yet select.
 */
export const GEMINI_WEB_MODEL_MODES: Readonly<Record<string, GeminiWebModeDescriptor>> = {
  // Sublabels (not localized): "4 Hydrogen", "4 Hydrogen Thinking" and "3.1 Pro" are the
  // ones PGSCOM saw on a live account (#20842, 2026-11-20, Spanish UI); "4 Neon" and
  // "4 Carbon" come from the #21116 account (pt-BR). A mode the menu lacks fails closed.
  "gemini-3.1-pro": { id: "gemini-3.1-pro", menuSublabel: "3.1 Pro" },
  "gemini-4-hydrogen": { id: "gemini-4-hydrogen", menuSublabel: "4 Hydrogen" },
  "gemini-4-hydrogen-thinking": {
    id: "gemini-4-hydrogen-thinking",
    menuSublabel: "4 Hydrogen Thinking",
  },
  "gemini-4-neon": { id: "gemini-4-neon", menuSublabel: "4 Neon" },
  "gemini-4-carbon": { id: "gemini-4-carbon", menuSublabel: "4 Carbon" },
  "gemini-4-argon": {
    id: "gemini-4-argon",

    toggleSelector:
      '[data-test-id="bard-mode-menu-button"], button[aria-haspopup="menu"][aria-label*="model" i]',
    activeIndicatorSelector:
      '[data-test-id="bard-mode-menu-button"] .mode-title, [data-test-id="bard-mode-menu-button"]',
    expectedIndicatorPattern: /\b(argon|gemini\s*4)\b/i,
  },
  "gemini-3.7-flash": {
    id: "gemini-3.7-flash",

    toggleSelector:
      '[data-test-id="bard-mode-menu-button"], button[aria-haspopup="menu"][aria-label*="model" i]',
    activeIndicatorSelector:
      '[data-test-id="bard-mode-menu-button"] .mode-title, [data-test-id="bard-mode-menu-button"]',
    expectedIndicatorPattern: /\bflash\b(?!.*\blite\b)/i,
  },
  "gemini-3.1-flash-lite": {
    id: "gemini-3.1-flash-lite",

    toggleSelector:
      '[data-test-id="bard-mode-menu-button"], button[aria-haspopup="menu"][aria-label*="model" i]',
    activeIndicatorSelector:
      '[data-test-id="bard-mode-menu-button"] .mode-title, [data-test-id="bard-mode-menu-button"]',
    expectedIndicatorPattern: /flash.*\blite\b/i,
  },
};

/** The Extended Thinking control (#13381 follow-up, 2026-09-11) — account-dependent, not a model. */
export const GEMINI_WEB_EXTENDED_THINKING_MODE: GeminiWebModeDescriptor = {
  id: "extended-thinking",

  toggleSelector:
    '[data-test-id="deep-think-toggle"], button[aria-label*="extended thinking" i], ' +
    'button[aria-label*="deep think" i]',
  activeIndicatorSelector:
    '[data-test-id="deep-think-toggle"][aria-pressed="true"], [data-test-id="deep-think-toggle"].is-active',
  expectedIndicatorPattern: /thinking|deep think/i,
};

/** Minimal Playwright-shaped element the read-back needs — real `ElementHandle`s satisfy this. */
export interface GeminiAutomationElement {
  click(): Promise<void>;
  textContent?(): Promise<string | null>;
  innerText?(): Promise<string>;
}

/** Minimal Playwright-shaped page the selection step needs — the real `Page` satisfies this. */
export interface GeminiAutomationPage {
  waitForSelector(
    selector: string,
    opts?: { timeout?: number }
  ): Promise<GeminiAutomationElement | null>;
  /** Real Playwright pages have these; the menu path needs them. */
  evaluate?: (expression: string) => Promise<unknown>;
  click?: (selector: string, opts?: { timeout?: number }) => Promise<void>;
  waitForTimeout?: (ms: number) => Promise<void>;
  keyboard?: { press(key: string): Promise<void> };
}

interface GeminiMenuOptionState {
  testId: string;
  checked: boolean;
  locked: boolean;
}

/** Runs in the page: find the open mode menu's option whose sublabel is exactly `sublabel`. */
export function findMenuOptionInPage(args: {
  selector: string;
  sublabel: string;
}): GeminiMenuOptionState | null {
  const options = Array.from(document.querySelectorAll(args.selector));
  for (const opt of options) {
    const leaves = Array.from(opt.querySelectorAll("*")).filter((e) => e.children.length === 0);
    if (!leaves.some((e) => (e.textContent || "").trim() === args.sublabel)) continue;
    const testId = opt.getAttribute("data-test-id") || "";
    return {
      testId,
      checked: opt.getAttribute("aria-checked") === "true",
      locked: /upsell/i.test(testId) || opt.getAttribute("aria-disabled") === "true",
    };
  }
  return null;
}

async function readMenuOption(
  page: GeminiAutomationPage,
  sublabel: string,
  timeoutMs: number
): Promise<GeminiMenuOptionState | null> {
  const end = Date.now() + timeoutMs;
  while (Date.now() < end) {
    const state = (await page.evaluate!(
      toInPageExpression(findMenuOptionInPage, { selector: GEMINI_WEB_MODE_OPTION, sublabel })
    ).catch(() => null)) as GeminiMenuOptionState | null;
    if (state) return state;
    await page.waitForTimeout?.(200);
  }
  return null;
}

async function isMenuSignedOut(page: GeminiAutomationPage): Promise<boolean> {
  try {
    return Boolean(await page.evaluate!(toInPageExpression(isGeminiSignedOutInPage)));
  } catch {
    return false;
  }
}

/**
 * Model-menu path (#21116): open the mode menu, pick the option whose sublabel
 * matches exactly, then reopen the menu and require `aria-checked="true"` on it.
 * A locked (upsell) or missing option fails closed instead of answering with
 * whatever model the account currently has selected.
 */
export async function selectGeminiMenuMode(
  page: GeminiAutomationPage,
  descriptor: GeminiWebModeDescriptor,
  timeoutMs = 5000
): Promise<GeminiModeSelectionResult> {
  const sublabel = descriptor.menuSublabel;
  if (!sublabel || typeof page.evaluate !== "function" || typeof page.click !== "function") {
    return { confirmed: false, reason: "control_not_found", descriptor };
  }
  const closeMenu = async () => {
    await page.keyboard?.press("Escape").catch(() => {});
  };
  const button = await page
    .waitForSelector(GEMINI_WEB_MODE_MENU_BUTTON, { timeout: timeoutMs })
    .catch(() => null);
  if (!button) return { confirmed: false, reason: "control_not_found", descriptor };

  await page.click(GEMINI_WEB_MODE_MENU_BUTTON, { timeout: timeoutMs });
  let option = await readMenuOption(page, sublabel, timeoutMs);
  // The signed-out "Sign in" item only exists inside the open menu (live, 2026-11-25),
  // and there the Gemini 4 options are aria-disabled, which would read as mode_locked.
  if (await isMenuSignedOut(page)) {
    await closeMenu();
    return { confirmed: false, reason: "signed_out", descriptor };
  }
  if (!option) {
    await closeMenu();
    return { confirmed: false, reason: "mode_not_offered", descriptor };
  }
  if (option.locked) {
    await closeMenu();
    return { confirmed: false, reason: "mode_locked", descriptor };
  }
  if (!option.checked) {
    await page.click(`[data-test-id="${option.testId}"]`, { timeout: timeoutMs });
    await page.waitForTimeout?.(500);
    await page.click(GEMINI_WEB_MODE_MENU_BUTTON, { timeout: timeoutMs });
    option = await readMenuOption(page, sublabel, timeoutMs);
  }
  await closeMenu();
  if (!option?.checked) return { confirmed: false, reason: "indicator_mismatch", descriptor };
  return { confirmed: true, descriptor };
}

/**
 * After the answer (#20842 review item on #21119): true only when the requested
 * menu mode is listed and no longer checked, i.e. Gemini switched to another model
 * while answering (high demand). A model without a menu entry, a page without
 * in-page access, or an unreadable menu answers false: an unconfirmed switch never
 * discards an answer.
 */
export async function isGeminiMenuModeReplaced(
  page: GeminiAutomationPage,
  modelId: string,
  timeoutMs = 3000
): Promise<boolean> {
  const sublabel = GEMINI_WEB_MODEL_MODES[modelId]?.menuSublabel;
  if (!sublabel || typeof page.evaluate !== "function" || typeof page.click !== "function") {
    return false;
  }
  try {
    const button = await page
      .waitForSelector(GEMINI_WEB_MODE_MENU_BUTTON, { timeout: timeoutMs })
      .catch(() => null);
    if (!button) return false;
    await page.click(GEMINI_WEB_MODE_MENU_BUTTON, { timeout: timeoutMs });
    const option = await readMenuOption(page, sublabel, timeoutMs);
    await page.keyboard?.press("Escape").catch(() => {});
    return option !== null && !option.checked;
  } catch {
    return false;
  }
}

export interface GeminiModeSelectionResult {
  confirmed: boolean;
  reason?: GeminiModeSelectionFailureReason;
  descriptor?: GeminiWebModeDescriptor;
}

async function readIndicatorText(el: GeminiAutomationElement): Promise<string | null> {
  try {
    if (typeof el.textContent === "function") {
      const text = await el.textContent();
      if (typeof text === "string") return text;
    }
    if (typeof el.innerText === "function") {
      return await el.innerText();
    }
  } catch {
    // Unreadable is treated the same as "did not confirm" below — never a pass.
  }
  return null;
}

/**
 * Try to switch the live Gemini Web page to `descriptor`'s mode, then READ
 * BACK the active-mode indicator before reporting success. A click landing
 * is never itself treated as success — only a confirmed, pattern-matching
 * indicator text is (#13381).
 */
export async function selectGeminiUiMode(
  page: GeminiAutomationPage,
  descriptor: GeminiWebModeDescriptor,
  timeoutMs = 5000
): Promise<GeminiModeSelectionResult> {
  if (descriptor.menuSublabel) return selectGeminiMenuMode(page, descriptor, timeoutMs);

  const { toggleSelector, activeIndicatorSelector, expectedIndicatorPattern } = descriptor;
  if (!toggleSelector || !activeIndicatorSelector || !expectedIndicatorPattern) {
    return { confirmed: false, reason: "control_not_found", descriptor };
  }

  const toggle = await page
    .waitForSelector(toggleSelector, { timeout: timeoutMs })
    .catch(() => null);
  if (!toggle) return { confirmed: false, reason: "control_not_found", descriptor };

  await toggle.click();
  // The toggle is the mode-menu button on current pages; a signed-out session shows
  // its "Sign in" item only now that the menu is open (live, 2026-11-25).
  if (typeof page.evaluate === "function" && (await isMenuSignedOut(page))) {
    await page.keyboard?.press("Escape").catch(() => {});
    return { confirmed: false, reason: "signed_out", descriptor };
  }

  const indicator = await page
    .waitForSelector(activeIndicatorSelector, { timeout: timeoutMs })
    .catch(() => null);
  if (!indicator) return { confirmed: false, reason: "indicator_not_found", descriptor };

  const text = await readIndicatorText(indicator);
  if (!text || !expectedIndicatorPattern.test(text)) {
    return { confirmed: false, reason: "indicator_mismatch", descriptor };
  }

  return { confirmed: true, descriptor };
}

export function resolveGeminiModelMode(modelId: string): GeminiWebModeDescriptor | null {
  // #16573: gemini-4-argon is opt-in until its selectors are checked live; with
  // the switch off it stays an unknown model, exactly as before it was added.
  if (modelId === GEMINI_WEB_ARGON_MODEL.id && !isGeminiWebArgonEnabled()) return null;
  return GEMINI_WEB_MODEL_MODES[modelId] ?? null;
}

/** Select + verify the requested advertised model's Gemini UI mode. */
export async function selectGeminiModel(
  page: GeminiAutomationPage,
  modelId: string,
  timeoutMs?: number
): Promise<GeminiModeSelectionResult> {
  const descriptor = resolveGeminiModelMode(modelId);
  if (!descriptor) return { confirmed: false, reason: "unknown_model" };
  return selectGeminiUiMode(page, descriptor, timeoutMs);
}

/** Select + verify the Extended Thinking control (#13381 follow-up). */
export async function selectGeminiExtendedThinking(
  page: GeminiAutomationPage,
  timeoutMs?: number
): Promise<GeminiModeSelectionResult> {
  return selectGeminiUiMode(page, GEMINI_WEB_EXTENDED_THINKING_MODE, timeoutMs);
}

const REASON_DETAIL: Record<GeminiModeSelectionFailureReason, string> = {
  unknown_model: "it is not one of the advertised, selectable gweb models",
  control_not_found: "the Gemini UI control used to switch modes was not found",
  indicator_not_found: "the active-mode indicator used to confirm the switch was not found",
  indicator_mismatch: "the active-mode indicator did not confirm the switch after attempting it",
  mode_not_offered: "this account's Gemini mode menu does not offer it",
  mode_locked: "this account's Gemini plan does not include it (the option is locked)",
  signed_out: "the stored cookie no longer signs in to Gemini",
};

/**
 * Client-facing explanation for a failed-closed selection, safe to put
 * directly in a response body (no selector text, no stack trace).
 */
export function describeModeSelectionFailure(
  controlLabel: string,
  reason: GeminiModeSelectionFailureReason | undefined
): string {
  const detail = (reason && REASON_DETAIL[reason]) || "the switch could not be verified";
  return (
    `Model provider "gemini-web" could not verify that "${controlLabel}" is actually active in ` +
    `the Gemini web UI (${detail}). Rather than silently answering under a model/mode label that ` +
    'may not be accurate, the request was rejected with "unsupported_control_for_provider" — ' +
    "see #13381."
  );
}
