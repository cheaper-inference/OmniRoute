/**
 * SQLite implementation for Claude Code discovery-alias overrides: `key_value`
 * namespace `ccDiscoveryAliases`. Keys:
 *   - `provider:<providerId>`              -> "on" | "off"
 *   - `model:<providerId>/<modelId>`       -> "on" | "off"
 * A missing key means "inherit" (null).
 *
 * Async repository and SQLite-only legacy helpers share these private operations.
 * Resolve the database at call time so reset/restore never leaves a captured handle.
 */
import type {
  CcAliasOverrideRepository,
  CcAliasOverrides,
  CcAliasSetting,
} from "@/domain/persistence/modelDiscoveryRepositories";
import { getDbInstance } from "../core";
import { loadCatalogOverrides } from "../catalogOverrides";

const NAMESPACE = "ccDiscoveryAliases";

function providerKey(providerId: string): string {
  return `provider:${providerId}`;
}

function modelKey(providerId: string, modelId: string): string {
  return `model:${providerId}/${modelId}`;
}

function parseSetting(value: string | undefined): CcAliasSetting {
  if (value === "on" || value === "off") return value;
  return null;
}

function readSetting(key: string): CcAliasSetting {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(NAMESPACE, key) as { value: string } | undefined;
  return parseSetting(row?.value);
}

function writeSetting(key: string, setting: CcAliasSetting): void {
  const db = getDbInstance();
  if (setting === null) {
    db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(NAMESPACE, key);
    return;
  }
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    NAMESPACE,
    key,
    setting
  );
}

function getProviderSync(providerId: string): CcAliasSetting {
  return readSetting(providerKey(providerId));
}

function setProviderSync(providerId: string, setting: CcAliasSetting): void {
  writeSetting(providerKey(providerId), setting);
}

function getModelSync(providerId: string, modelId: string): CcAliasSetting {
  return readSetting(modelKey(providerId, modelId));
}

function setModelSync(providerId: string, modelId: string, setting: CcAliasSetting): void {
  writeSetting(modelKey(providerId, modelId), setting);
}

function listAllSync(): CcAliasOverrides {
  return loadCatalogOverrides(NAMESPACE);
}

export const sqliteCcAliasOverrideRepository: CcAliasOverrideRepository = {
  async getProvider(providerId) {
    return getProviderSync(providerId);
  },
  async setProvider(providerId, setting) {
    setProviderSync(providerId, setting);
  },
  async getModel(providerId, modelId) {
    return getModelSync(providerId, modelId);
  },
  async setModel(providerId, modelId, setting) {
    setModelSync(providerId, modelId, setting);
  },
  async listAll() {
    return listAllSync();
  },
};

/**
 * SQLite-only synchronous access retained for the cc-alias route, the /v1/models
 * catalog builder and the discovery-alias resolver.
 */
export const sqliteCcAliasOverrideLegacySync = {
  getProvider: getProviderSync,
  setProvider: setProviderSync,
  getModel: getModelSync,
  setModel: setModelSync,
  listAll: listAllSync,
};
