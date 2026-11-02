/**
 * Row writers for `proxy_subscriptions` (mirror column tolerant).
 *
 * The `mirror_urls` column lands via a later migration; databases that
 * predate it (and unit tests seeding legacy rows) lack the column. Both
 * writers probe `PRAGMA table_info` and include the column only when
 * present — so writes stay green with and without the migration applied.
 */
import { encodeMirrorUrls } from "./mirrorUrls";
import { hasSubscriptionColumn } from "./subscriptionColumns";

export interface RowDb {
  prepare: (sql: string) => {
    run: (...args: unknown[]) => unknown;
    all: (...args: unknown[]) => unknown;
  };
}

export interface SubscriptionRowValues {
  id: string;
  name: string;
  url: string;
  mirrorUrls: string[] | null;
  enabled: number;
  mode: string;
  ruleProviders: string[] | null;
  localCoreEndpoint: string | null;
  updateIntervalMinutes: number;
  controlUrl: string | null;
  coreConfigPath: string | null;
  gapSeconds: number;
  now: string;
}

/** INSERT a subscription row, with `mirror_urls` only when the column exists. */
export function insertSubscriptionRow(
  db: RowDb,
  row: SubscriptionRowValues & { controlSecretEnc: string | null }
): void {
  const head = [row.id, row.name, row.url];
  const tail = [
    row.enabled,
    row.mode,
    row.ruleProviders ? JSON.stringify(row.ruleProviders) : null,
    row.localCoreEndpoint || null,
    row.updateIntervalMinutes,
    row.controlUrl,
    row.coreConfigPath,
    row.controlSecretEnc,
    row.gapSeconds,
    row.now,
    row.now,
  ];
  if (hasSubscriptionColumn(db, "mirror_urls")) {
    db.prepare(
      `INSERT INTO proxy_subscriptions
      (id, name, url, mirror_urls, enabled, mode, rule_providers, local_core_endpoint, update_interval_minutes, control_url, core_config_path, control_secret_enc, selector_min_gap_seconds, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'empty', ?, ?)`
    ).run(...head, encodeMirrorUrls(row.mirrorUrls), ...tail);
    return;
  }
  db.prepare(
    `INSERT INTO proxy_subscriptions
      (id, name, url, enabled, mode, rule_providers, local_core_endpoint, update_interval_minutes, control_url, core_config_path, control_secret_enc, selector_min_gap_seconds, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'empty', ?, ?)`
  ).run(...head, ...tail);
}

export interface SubscriptionUpdateValues extends SubscriptionRowValues {
  controlSecretEnc: string | null | undefined;
}

function updateSql(withMirror: boolean, withSecret: boolean): string {
  const mirrorSet = withMirror ? "mirror_urls = ?, " : "";
  const secretSet = withSecret ? "control_secret_enc = ?, " : "";
  return `UPDATE proxy_subscriptions
         SET name = ?, url = ?, ${mirrorSet}enabled = ?, mode = ?, rule_providers = ?, local_core_endpoint = ?, update_interval_minutes = ?, control_url = ?, core_config_path = ?, ${secretSet}selector_min_gap_seconds = ?, updated_at = ?
       WHERE id = ?`;
}

/** UPDATE a subscription row, with `mirror_urls` only when the column exists. */
export function updateSubscriptionRow(db: RowDb, row: SubscriptionUpdateValues): void {
  const withMirror = hasSubscriptionColumn(db, "mirror_urls");
  const withSecret = row.controlSecretEnc !== undefined;
  const head = [row.name, row.url];
  const mirrorArgs = withMirror ? [encodeMirrorUrls(row.mirrorUrls)] : [];
  const tail = [
    row.enabled,
    row.mode,
    row.ruleProviders ? JSON.stringify(row.ruleProviders) : null,
    row.localCoreEndpoint || null,
    row.updateIntervalMinutes,
    row.controlUrl,
    row.coreConfigPath,
  ];
  const secretArgs = withSecret ? [row.controlSecretEnc] : [];
  const end = [row.gapSeconds, row.now, row.id];
  db.prepare(updateSql(withMirror, withSecret)).run(
    ...head,
    ...mirrorArgs,
    ...tail,
    ...secretArgs,
    ...end
  );
}
