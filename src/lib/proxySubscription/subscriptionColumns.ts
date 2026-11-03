/**
 * Column helpers for `proxy_subscriptions` readers/writers.
 *
 * The `mirror_urls` column lands via migration 218; databases migrated
 * before it (and unit tests seeding legacy rows) lack the column. Readers
 * pick the SELECT list by probing `PRAGMA table_info`, writers add the
 * column only when present — so both paths stay green with and without
 * the migration applied.
 */

const SUBSCRIPTION_COLUMNS =
  "id, name, url, mirror_urls, enabled, mode, rule_providers, local_core_endpoint, update_interval_minutes, control_url, core_config_path, control_secret_enc, selector_min_gap_seconds, selector_last_switch_at, selector_last_switch_result, selector_last_switch_member, selector_last_switch_kind, selector_last_switch_by_selector, last_fetched_at, status, error, last_nodes, last_error_at, consecutive_failures, created_at, updated_at";

const SUBSCRIPTION_COLUMNS_LEGACY =
  "id, name, url, enabled, mode, rule_providers, local_core_endpoint, update_interval_minutes, control_url, core_config_path, control_secret_enc, selector_min_gap_seconds, selector_last_switch_at, selector_last_switch_result, selector_last_switch_member, selector_last_switch_kind, selector_last_switch_by_selector, last_fetched_at, status, error, last_nodes, last_error_at, consecutive_failures, created_at, updated_at";

interface ColumnProbe {
  prepare: (sql: string) => { all: (...args: unknown[]) => unknown };
}

/** SELECT list that tolerates a DB predating the mirror_urls column. */
export function subscriptionColumns(db: ColumnProbe): string {
  return hasSubscriptionColumn(db, "mirror_urls")
    ? SUBSCRIPTION_COLUMNS
    : SUBSCRIPTION_COLUMNS_LEGACY;
}

/** True when the `proxy_subscriptions` table already carries a column. */
export function hasSubscriptionColumn(db: ColumnProbe, column: string): boolean {
  try {
    const columns = db.prepare("PRAGMA table_info(proxy_subscriptions)").all() as Array<{
      name?: string;
    }>;
    return columns.some((entry) => entry.name === column);
  } catch {
    return false;
  }
}
