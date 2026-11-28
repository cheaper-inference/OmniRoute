/**
 * SQLite implementation for embedded-service model lists (`serviceModels` key_value
 * namespace, keyed by tool name).
 *
 * Async repository and SQLite-only legacy helpers share these private operations.
 * Resolve the database at call time so reset/restore never leaves a captured handle.
 */
import type {
  ServiceModel,
  ServiceModelRepository,
} from "@/domain/persistence/modelCatalogRepositories";
import { getDbInstance } from "../core";

const NAMESPACE = "serviceModels";

function listSync(tool: string): ServiceModel[] {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(NAMESPACE, tool) as { value: string } | undefined;
  if (!row?.value) return [];
  try {
    const parsed = JSON.parse(row.value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function replaceSync(tool: string, models: ServiceModel[]): void {
  const db = getDbInstance();
  if (models.length === 0) {
    db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(NAMESPACE, tool);
  } else {
    db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
      NAMESPACE,
      tool,
      JSON.stringify(models)
    );
  }
}

export const sqliteServiceModelRepository: ServiceModelRepository = {
  async list(tool) {
    return listSync(tool);
  },
  async replace(tool, models) {
    replaceSync(tool, models);
  },
};

/** SQLite-only synchronous access retained for the supervisor, model sync and routes. */
export const sqliteServiceModelLegacySync = {
  list: listSync,
  replace: replaceSync,
};
