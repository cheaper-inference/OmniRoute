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
 * This module gives the executor a real selection step. Models are picked from
 * Gemini's model menu by their exact option label and read back from the option's
 * `aria-checked` (see GEMINI_WEB_MODEL_MENU_LABELS). The choice persists on the
 * Google account, so no model is assumed to be already active.
 *
 * ⚠️ The Extended Thinking control selectors (GEMINI_WEB_EXTENDED_THINKING_MODE)
 * are still UNVALIDATED guesses. That is safe by design: `selectGeminiUiMode()`
 * never trusts an unconfirmed guess, so a wrong selector gives a clear 400
 * (`unsupported_control_for_provider`) instead of a response labeled with a mode
 * that never ran — the dishonesty #13381 reported. Update selectors only after
 * inspecting the real DOM on a live account, never from guesswork.
 */

import {
  GEMINI_WEB_ARGON_MODEL,
  isGeminiWebArgonEnabled,
} from "../../config/providers/registry/gemini/web/index.ts";

/** Reasons `selectGeminiUiMode`/`selectGeminiModel` can fail closed. */
export type GeminiModeSelectionFailureReason =
  | "control_not_found"
  | "indicator_not_found"
  | "indicator_mismatch"
  | "mode_not_offered"
  | "unknown_model";

export interface GeminiWebModeDescriptor {
  /** A label for the control (only Extended Thinking uses this descriptor now). */
  readonly id: string;
  /** UNVALIDATED — opens/activates the control for this mode. */
  readonly toggleSelector?: string;
  /** UNVALIDATED — element whose text proves which mode is now active. */
  readonly activeIndicatorSelector?: string;
  /** Text the active-mode indicator must contain once the switch is confirmed. */
  readonly expectedIndicatorPattern?: RegExp;
}

/**
 * Model -> Gemini model-menu option for the `gweb/<model>` ids advertised by
 * `open-sse/config/providers/registry/gemini/web/index.ts` (gemini-4-argon only
 * when OMNIROUTE_GEMINI_WEB_ARGON_ENABLED is on, #16573). Keep the two catalogs
 * in sync: an advertised model with no entry here fails closed as `unknown_model`.
 *
 * `menuLabel` is the exact `.sublabel` text of the option in the model menu. It is
 * the model name, not localized. Checked on a live account (2026-11-20, Spanish
 * UI): "4 Hydrogen", "4 Hydrogen Thinking", "3.1 Pro". The Argon/Flash labels have
 * not been seen on a live account; an account whose menu lacks them gets a 400
 * (`mode_not_offered`), never an answer from another model.
 */
export const GEMINI_WEB_MODEL_MENU_LABELS: Readonly<Record<string, string>> = {
  "gemini-4-hydrogen": "4 Hydrogen",
  "gemini-4-hydrogen-thinking": "4 Hydrogen Thinking",
  "gemini-3.1-pro": "3.1 Pro",
  "gemini-4-argon": "4 Argon",
  "gemini-3.7-flash": "3.7 Flash",
  "gemini-3.1-flash-lite": "3.1 Flash-Lite",
};

/**
 * The model-menu button. Gemini renders it in the header on wide windows and in the
 * composer on narrower ones (Playwright's default 1280x720); both carry this id, but
 * their visible label differs ("4 Hydrogen" vs "Hydrogen"), so the selection is read
 * back from the menu option's `aria-checked`, never from the button text.
 */
export const GEMINI_WEB_MODE_MENU_BUTTON = '[data-test-id="bard-mode-menu-button"]';

/** Playwright selector for the model-menu option whose model name is `menuLabel`. */
export function geminiWebModeOptionSelector(menuLabel: string): string {
  return `[role="menuitemradio"]:has(.sublabel:text-is("${menuLabel}"))`;
}

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
  getAttribute?(name: string): Promise<string | null>;
  textContent?(): Promise<string | null>;
  innerText?(): Promise<string>;
}

/** Minimal Playwright-shaped page the selection step needs — the real `Page` satisfies this. */
export interface GeminiAutomationPage {
  waitForSelector(
    selector: string,
    opts?: { timeout?: number }
  ): Promise<GeminiAutomationElement | null>;
  keyboard: { press(key: string): Promise<void> };
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
  const { toggleSelector, activeIndicatorSelector, expectedIndicatorPattern } = descriptor;
  if (!toggleSelector || !activeIndicatorSelector || !expectedIndicatorPattern) {
    return { confirmed: false, reason: "control_not_found", descriptor };
  }

  const toggle = await page
    .waitForSelector(toggleSelector, { timeout: timeoutMs })
    .catch(() => null);
  if (!toggle) return { confirmed: false, reason: "control_not_found", descriptor };

  await toggle.click();

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

export function resolveGeminiModelMenuLabel(modelId: string): string | null {
  // #16573: gemini-4-argon is opt-in until its menu label is checked live; with
  // the switch off it stays an unknown model, exactly as before it was added.
  if (modelId === GEMINI_WEB_ARGON_MODEL.id && !isGeminiWebArgonEnabled()) return null;
  return GEMINI_WEB_MODEL_MENU_LABELS[modelId] ?? null;
}

/** Opens the model menu and returns the option for `optionSelector` (null: not offered). */
async function openModelMenuOption(
  page: GeminiAutomationPage,
  optionSelector: string,
  timeoutMs: number
): Promise<GeminiAutomationElement | "no_menu" | null> {
  const button = await page
    .waitForSelector(GEMINI_WEB_MODE_MENU_BUTTON, { timeout: timeoutMs })
    .catch(() => null);
  if (!button) return "no_menu";
  await button.click();
  return page.waitForSelector(optionSelector, { timeout: timeoutMs }).catch(() => null);
}

async function isOptionChecked(option: GeminiAutomationElement): Promise<boolean> {
  return (await option.getAttribute?.("aria-checked").catch(() => null)) === "true";
}

/**
 * Select the requested model in the Gemini model menu and confirm it. The choice
 * persists on the Google account, so there is no "default" model: every request
 * opens the menu, picks the option (unless it is already checked), then reopens the
 * menu to read the option's `aria-checked` back.
 */
export async function selectGeminiModel(
  page: GeminiAutomationPage,
  modelId: string,
  timeoutMs = 5000
): Promise<GeminiModeSelectionResult> {
  const menuLabel = resolveGeminiModelMenuLabel(modelId);
  if (!menuLabel) return { confirmed: false, reason: "unknown_model" };
  const optionSelector = geminiWebModeOptionSelector(menuLabel);

  const option = await openModelMenuOption(page, optionSelector, timeoutMs);
  if (option === "no_menu") return { confirmed: false, reason: "control_not_found" };
  if (!option) {
    await page.keyboard.press("Escape");
    return { confirmed: false, reason: "mode_not_offered" };
  }
  if (await isOptionChecked(option)) {
    await page.keyboard.press("Escape");
    return { confirmed: true };
  }

  await option.click();
  const reopened = await openModelMenuOption(page, optionSelector, timeoutMs);
  if (reopened === "no_menu") return { confirmed: false, reason: "indicator_not_found" };
  const confirmed = reopened !== null && (await isOptionChecked(reopened));
  await page.keyboard.press("Escape");
  return confirmed ? { confirmed: true } : { confirmed: false, reason: "indicator_mismatch" };
}

/**
 * Read-only check that `modelId` is still the checked model-menu option. When a model
 * is under heavy demand, Gemini answers with another model
 * and switches the menu to it, so this is read after the response arrives.
 */
export async function isGeminiModelActive(
  page: GeminiAutomationPage,
  modelId: string,
  timeoutMs = 5000
): Promise<boolean> {
  const menuLabel = resolveGeminiModelMenuLabel(modelId);
  if (!menuLabel) return false;
  const option = await openModelMenuOption(page, geminiWebModeOptionSelector(menuLabel), timeoutMs);
  if (option === "no_menu") return false;
  const active = option !== null && (await isOptionChecked(option));
  await page.keyboard.press("Escape");
  return active;
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
  mode_not_offered: "this Gemini account's model menu does not offer it",
  control_not_found: "the Gemini UI control used to switch modes was not found",
  indicator_not_found: "the active-mode indicator used to confirm the switch was not found",
  indicator_mismatch: "the active-mode indicator did not confirm the switch after attempting it",
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
