/**
 * Appearance palettes (Settings → Appearance → Color palette).
 *
 * - `editions` (default): the CI UI Kit's Editions appearance — warm paper neutrals and the
 *   copper accent, the same look as omniroute.online. The kit ships it as pure CSS in
 *   packages/ui-kit/src/ci-editions.css, switched on by `data-ci-appearance="editions"` on
 *   `<html>`; it combines with the existing `data-theme="light|dark"`.
 * - `classic`: the kit's base tokens (ci-tokens.css) — the lime accent OmniRoute shipped before.
 *   Classic is the absence of the attribute, so removing it restores the base kit look.
 *
 * The choice is persisted next to the theme in the `theme` store (src/store/themeStore.ts) and
 * applied before paint by THEME_BOOT_SCRIPT (src/shared/utils/themeBootScript.ts). The server
 * renders the default attribute on `<html>` (src/app/layout.tsx), so a page without JS, or a
 * visitor with nothing stored, already gets Editions.
 */

export const APPEARANCE_PALETTES = ["editions", "classic"] as const;

export type AppearancePalette = (typeof APPEARANCE_PALETTES)[number];

export const DEFAULT_APPEARANCE_PALETTE: AppearancePalette = "editions";

/** The kit's opt-in attribute and the value that selects Editions. */
export const APPEARANCE_ATTRIBUTE = "data-ci-appearance";
export const EDITIONS_APPEARANCE_VALUE = "editions";

export function isAppearancePalette(value: unknown): value is AppearancePalette {
  return typeof value === "string" && (APPEARANCE_PALETTES as readonly string[]).includes(value);
}

/** Anything that is not an explicit, known choice resolves to the default (Editions). */
export function normalizeAppearancePalette(value: unknown): AppearancePalette {
  return isAppearancePalette(value) ? value : DEFAULT_APPEARANCE_PALETTE;
}
