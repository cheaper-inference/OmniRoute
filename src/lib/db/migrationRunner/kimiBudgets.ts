import { getBudgetWindow, type BudgetResetInterval } from "@/domain/budgetWindow";
import { canonicalKimiProvider } from "@omniroute/open-sse/config/kimiProvider.ts";
import type { SqliteAdapter } from "../adapters/types";
import { readKimiBudgetHistory } from "../kimiBudgetHistory";
import { budgetPolicy, type Row } from "./kimiSettings";

function window(row: Row, now: number): number {
  return getBudgetWindow(
    row.reset_interval as BudgetResetInterval,
    String(row.reset_time || "00:00"),
    now
  ).periodStartAt;
}

function seedCounter(
  db: SqliteAdapter,
  row: Row,
  start: number,
  spelling?: "moonshot" | "kimi"
): void {
  const counter = db
    .prepare<Row>(
      "SELECT tokens_used FROM api_key_token_counters WHERE limit_id = ? AND window_start = ?"
    )
    .get(row.id, String(start));
  if (Number(counter?.tokens_used) > 0) return;
  const seed =
    readKimiBudgetHistory(
      db,
      String(row.api_key_id),
      String(row.scope_type),
      String(row.scope_value),
      start,
      undefined,
      spelling
    ) || 0;
  if (seed > 0)
    db.prepare(
      "INSERT INTO api_key_token_counters(limit_id,window_start,tokens_used) VALUES(?,?,?) ON CONFLICT(limit_id,window_start) DO UPDATE SET tokens_used = excluded.tokens_used"
    ).run(row.id, String(start), seed);
}

export function migrateKimiTokenBudgets(db: SqliteAdapter, now: number): void {
  const rows = db
    .prepare<Row>("SELECT * FROM api_key_token_limits WHERE scope_type = 'provider'")
    .all();
  for (const old of rows) {
    const value = String(old.scope_value);
    const canonical = canonicalKimiProvider(value);
    if (value === canonical) continue;
    const current = db
      .prepare<Row>(
        "SELECT * FROM api_key_token_limits WHERE api_key_id = ? AND scope_type = ? AND scope_value = ? AND reset_interval = ?"
      )
      .get(old.api_key_id, old.scope_type, canonical, old.reset_interval);
    if (!current) {
      const start = window(old, now);
      seedCounter(db, old, start);
      db.prepare("UPDATE api_key_token_limits SET scope_value = ? WHERE id = ?").run(
        canonical,
        old.id
      );
      continue;
    }
    const policy = budgetPolicy(old, current);
    const start = window({ ...current, ...policy }, now);
    for (const [component, spelling] of [
      [old, "moonshot"],
      [current, "kimi"],
    ] as const) {
      seedCounter(db, component, start, spelling);
    }
    db.prepare(
      "INSERT INTO api_key_token_counters(limit_id,window_start,tokens_used,updated_at) SELECT ?,window_start,tokens_used,updated_at FROM api_key_token_counters WHERE limit_id = ? AND true ON CONFLICT(limit_id,window_start) DO UPDATE SET tokens_used = tokens_used + excluded.tokens_used"
    ).run(current.id, old.id);
    db.prepare("DELETE FROM api_key_token_counters WHERE limit_id = ?").run(old.id);
    db.prepare("UPDATE api_key_token_limit_reset_logs SET limit_id = ? WHERE limit_id = ?").run(
      current.id,
      old.id
    );
    db.prepare("DELETE FROM api_key_token_limits WHERE id = ?").run(old.id);
    db.prepare(
      "UPDATE api_key_token_limits SET enabled = ?, token_limit = ?, reset_time = ? WHERE id = ?"
    ).run(policy.enabled, policy.token_limit, policy.reset_time, current.id);
  }
}

export function mergeQuotaLedger(old: Row, current: Row, now: number): Row {
  const active = (row: Row) => !(Number(row.window_reset) > 0 && now > Number(row.window_reset));
  if (active(old) && active(current)) {
    if (old.window_start !== current.window_start || old.window_reset !== current.window_reset) {
      throw new Error("Kimi quota ledger has incompatible active windows");
    }
    const caps = [Number(old.token_limit), Number(current.token_limit)].filter((n) => n > 0);
    return {
      ...current,
      tokens_used: Number(old.tokens_used) + Number(current.tokens_used),
      token_limit: caps.length ? Math.min(...caps) : 0,
    };
  }
  if (active(old)) return { ...old, model: current.model };
  if (active(current)) return current;
  return Number(old.window_reset) > Number(current.window_reset)
    ? { ...old, model: current.model }
    : current;
}
