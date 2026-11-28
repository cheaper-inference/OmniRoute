import { getDbInstance } from "../core";
import { parseApiKeyBanReason, type ApiKeyBanReason } from "@/shared/constants/apiKeyBanReasons";

export interface ApiKeyBanSummary {
  total: number;
  keys: { id: string; name: string; reason: ApiKeyBanReason | null }[];
}

// Match the API Keys dashboard's banned status. Rate limits, single-request
// guardrail rejections, expiration and ordinary disablement do not set this flag.
export function getApiKeyBanSummary(): ApiKeyBanSummary {
  const db = getDbInstance();
  // Fresh databases add the legacy ban flag on the first key operation. In
  // its absence no key can be banned, so the summary can remain read-only.
  const hasBanFlag = db
    .prepare("SELECT 1 FROM pragma_table_info('api_keys') WHERE name = 'is_banned'")
    .get();
  if (!hasBanFlag) return { total: 0, keys: [] };

  const rows = db
    .prepare(
      `SELECT id, name, ban_reason, COUNT(*) OVER () AS total
       FROM api_keys
       WHERE is_banned = 1
       ORDER BY banned_at DESC, name COLLATE NOCASE, id
       LIMIT 5`
    )
    .all() as { id: string; name: string; ban_reason: unknown; total: number }[];

  return {
    total: rows[0]?.total ?? 0,
    keys: rows.map(({ id, name, ban_reason }) => ({
      id,
      name,
      reason: parseApiKeyBanReason(ban_reason),
    })),
  };
}
