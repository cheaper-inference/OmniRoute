import { presetsActive } from "./capability-presets.js";
import type { OmniRouteRawModelEntry } from "./shared/models-map.js";

/**
 * Where published combos come from.
 *
 * - `"api"` (default): `/api/combos`, folded over the member list, so a combo
 *   publishes only when every member passes the active filters (#16779).
 * - `"models"` (opt-in): the combo rows `/v1/models` already serves with
 *   server-computed limits, without the extra `/api/combos` request.
 */
export type CombosSource = "api" | "models";

export interface CombosSourceOptions {
  combosSource?: CombosSource;
  visibleModels?: string[];
  hiddenModels?: string[];
  providersAllow?: string[];
  usableOnly?: boolean;
  freeOnly?: boolean;
  toolsOnly?: boolean;
  visionOnly?: boolean;
}

function narrows(list: string[] | undefined): boolean {
  return Array.isArray(list) && list.some((id) => typeof id === "string" && id.length > 0);
}

/**
 * True when this refresh may skip `/api/combos` and take combos from the
 * `/v1/models` rows. Only when the option asks for it AND no filter needs the
 * member list: a `/v1/models` combo row carries no members, so the capability
 * presets, `usableOnly`, the provider allowlist and the visible/hidden lists
 * (which all judge a combo by its members) keep the member-verified source.
 * Any doubt resolves to the default source.
 */
export function usesModelsComboSource(opts: CombosSourceOptions): boolean {
  if (opts.combosSource !== "models") return false;
  if (presetsActive(opts)) return false;
  if (opts.usableOnly === true) return false;
  if (narrows(opts.providersAllow)) return false;
  if (narrows(opts.hiddenModels)) return false;
  if (narrows(opts.visibleModels) && opts.visibleModels?.includes("*") !== true) return false;
  return true;
}

/**
 * A user combo row as `/v1/models` serves it: `owned_by: "combo"`, excluding
 * the built-in `auto` / `auto/*` virtual combos (never published by the
 * `/api/combos` pass either, and the gateway never lets a user combo shadow
 * one of those ids).
 */
export function isUserComboRow(entry: OmniRouteRawModelEntry): boolean {
  if (entry.owned_by !== "combo") return false;
  return entry.id !== "auto" && !entry.id.startsWith("auto/");
}
