/**
 * Revoke a deleted combo's name from every API key's `allowed_combos`.
 *
 * Combo grants are stored by NAME, so a grant left behind after the combo row is
 * deleted would silently apply to any combo later created under the same name.
 * The caller runs this inside the same transaction as the combo DELETE.
 */

import { ALL_COMBOS_ACCESS_RULE } from "@/shared/constants/comboAccess";
import type { getDbInstance } from "../core";

type Db = ReturnType<typeof getDbInstance>;

// Same normalization as `normalizeComboAccessName` in `@/shared/utils/apiKeyPolicy`
// (kept local: that module imports the combo repository, which calls this helper).
function grantedComboName(rule: string): string {
  const trimmed = rule.trim();
  return trimmed.startsWith("combo/") ? trimmed.slice(6).trim() || trimmed : trimmed;
}

/**
 * Strip `comboName` (bare or `combo/`-prefixed, case-insensitive) from every key's
 * `allowed_combos`. Returns the ids of the keys that changed.
 *
 * - Skipped while another combo with the same name (any case) still exists:
 *   requests resolve combos case-insensitively, so that grant can still apply.
 * - `combo/*` and every other rule are kept.
 * - An emptied list is written as `[]` (deny all), never NULL (legacy allow-all).
 * - NULL and malformed lists are left untouched.
 */
export function revokeComboGrantsByName(db: Db, comboName: string): string[] {
  const target = comboName.trim().toLowerCase();
  if (!target) return [];

  const stillExists = db
    .prepare("SELECT 1 FROM combos WHERE name = ? COLLATE NOCASE LIMIT 1")
    .get(comboName.trim());
  if (stillExists) return [];

  const rows = db
    .prepare("SELECT id, allowed_combos FROM api_keys WHERE allowed_combos IS NOT NULL")
    .all() as Array<{ id: string; allowed_combos: unknown }>;
  const update = db.prepare("UPDATE api_keys SET allowed_combos = ? WHERE id = ?");
  const changed: string[] = [];

  for (const row of rows) {
    if (typeof row.allowed_combos !== "string") continue;
    let rules: unknown;
    try {
      rules = JSON.parse(row.allowed_combos);
    } catch {
      continue;
    }
    if (!Array.isArray(rules)) continue;

    const remaining = rules.filter(
      (rule) =>
        typeof rule !== "string" ||
        rule === ALL_COMBOS_ACCESS_RULE ||
        grantedComboName(rule).toLowerCase() !== target
    );
    if (remaining.length === rules.length) continue;

    update.run(JSON.stringify(remaining), row.id);
    changed.push(row.id);
  }

  return changed;
}
