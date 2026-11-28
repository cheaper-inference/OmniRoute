/**
 * db/ccDiscoveryAliases.ts — Claude Code discovery-alias gate.
 *
 * Gates `claude/<provider>/<model>` mirror ids on the /v1/models catalog so
 * the Claude Code gateway's model discovery can list non-Claude models. This
 * module only owns the gate (global flag + per-provider/per-model overrides
 * + precedence resolver) — the catalog wiring itself lives elsewhere.
 *
 * Storage: `key_value` table, namespace `ccDiscoveryAliases`, behind
 * CcAliasOverrideRepository (`repositories/sqliteCcAliasOverrideRepository.ts`).
 * Keys:
 *   - `provider:<providerId>`              -> "on" | "off"
 *   - `model:<providerId>/<modelId>`       -> "on" | "off"
 * A missing key means "inherit" (null).
 *
 * The exports below stay synchronous (SQLite-only legacy access) for the
 * cc-alias route, the /v1/models catalog builder and the discovery-alias
 * resolver; every write invalidates the model catalog cache in the same turn.
 *
 * Global enablement precedence (see `getCcAliasGlobalState`):
 *   env EXPOSE_CC_DISCOVERY_ALIASES ("1"|"true") > DB flag override > default
 * (env wins over the dashboard DB override, matching the brief — this is the
 * opposite precedence from the generic `resolveFeatureFlag` helper, which is
 * why this module resolves the flag directly instead of reusing it).
 */

import type {
  CcAliasOverrideRepository,
  CcAliasSetting,
} from "@/domain/persistence/modelDiscoveryRepositories";
import { getFeatureFlagOverride } from "./featureFlags";
import { finishModelCatalogWriteWithoutBackup } from "./models/modelCatalogWriteSignals";
import { modelDiscoveryRepositories } from "./repositories/modelDiscoveryRepositories";

export type { CcAliasSetting } from "@/domain/persistence/modelDiscoveryRepositories";

const FLAG_KEY = "EXPOSE_CC_DISCOVERY_ALIASES";

const legacy = modelDiscoveryRepositories.legacySync.ccAliasOverrides;

/** Async persistence contract; it never invalidates the model catalog cache. */
export function getCcAliasOverrideRepository(): CcAliasOverrideRepository {
  return modelDiscoveryRepositories.ccAliasOverrides;
}

/**
 * Pure precedence resolver: model setting wins over provider setting, which
 * wins over the global flag. `null`/`undefined` means "inherit" from the
 * next level down.
 */
export function resolveCcAliasEnabled(opts: {
  model?: CcAliasSetting;
  provider?: CcAliasSetting;
  global: boolean;
}): boolean {
  if (opts.model === "on") return true;
  if (opts.model === "off") return false;
  if (opts.provider === "on") return true;
  if (opts.provider === "off") return false;
  return opts.global;
}

export function getCcAliasProviderSetting(providerId: string): CcAliasSetting {
  return legacy.getProvider(providerId);
}

export function setCcAliasProviderSetting(providerId: string, v: CcAliasSetting): void {
  legacy.setProvider(providerId, v);
  finishModelCatalogWriteWithoutBackup();
}

export function getCcAliasModelSetting(providerId: string, modelId: string): CcAliasSetting {
  return legacy.getModel(providerId, modelId);
}

export function setCcAliasModelSetting(
  providerId: string,
  modelId: string,
  v: CcAliasSetting
): void {
  legacy.setModel(providerId, modelId, v);
  finishModelCatalogWriteWithoutBackup();
}

/**
 * Loads every provider/model override in a single query — intended for the
 * catalog builder, which needs the full set rather than per-row lookups.
 */
export function getCcAliasSettingsBulk() {
  return legacy.listAll();
}

function envForcesGlobalOn(): boolean {
  const raw = process.env[FLAG_KEY];
  return raw === "1" || raw === "true";
}

/**
 * Resolves the effective global state, and where it came from.
 * Precedence: env forces on > DB override > definition default.
 */
export function getCcAliasGlobalState(): { enabled: boolean; source: "env" | "db" | "default" } {
  if (envForcesGlobalOn()) {
    return { enabled: true, source: "env" };
  }

  const dbOverride = getFeatureFlagOverride(FLAG_KEY);
  if (dbOverride !== undefined) {
    return { enabled: dbOverride === "true" || dbOverride === "1", source: "db" };
  }

  return { enabled: false, source: "default" };
}

export function isCcAliasGlobalEnabled(): boolean {
  return getCcAliasGlobalState().enabled;
}
