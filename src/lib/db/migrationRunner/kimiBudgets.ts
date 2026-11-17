import { getBudgetWindow, type BudgetResetInterval } from "@/domain/budgetWindow";
import { canonicalKimiProvider } from "@omniroute/open-sse/config/kimiProvider.ts";
import type { SqliteAdapter } from "../adapters/types";
import { readKimiBudgetHistory } from "../kimiBudgetHistory";
import { budgetPolicy, hasDistinctBudgetSchedules, type Row } from "./kimiSettings";

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

function reconcileRetainedCounters(db: SqliteAdapter, old: Row, current: Row, now: number): void {
  const receiptKey = JSON.stringify(["20261115232030", old.id, current.id]);
  const receipt = db
    .prepare<{ value: string }>(
      "SELECT value FROM key_value WHERE namespace='migrationReceipts' AND key=?"
    )
    .get(receiptKey);
  if (receipt) {
    try {
      if (JSON.parse(receipt.value).completed === true) return;
    } catch {
      // An incomplete receipt must not suppress reconciliation.
    }
  }
  const original = db
    .prepare<Row>(
      "SELECT limit_id,window_start,tokens_used FROM api_key_token_counters WHERE limit_id IN (?,?)"
    )
    .all(old.id, current.id);
  const sources = [
    [old, "moonshot"],
    [current, "kimi"],
  ] as const;
  const windows = [old, current].map((row) =>
    getBudgetWindow(
      row.reset_interval as BudgetResetInterval,
      String(row.reset_time || "00:00"),
      now
    )
  );
  // Both totals use the original snapshot; partially overlapping counters are indivisible.
  const totals = windows.map((target) =>
    sources.reduce((total, [source, spelling]) => {
      let bucket = getBudgetWindow(
        source.reset_interval as BudgetResetInterval,
        String(source.reset_time || "00:00"),
        target.periodStartAt
      );
      while (bucket.periodStartAt < target.nextResetAt) {
        const counter = original.find(
          (row) => row.limit_id === source.id && row.window_start === String(bucket.periodStartAt)
        );
        const history =
          readKimiBudgetHistory(
            db,
            String(source.api_key_id),
            "provider",
            spelling,
            Math.max(bucket.periodStartAt, target.periodStartAt),
            Math.min(bucket.nextResetAt, target.nextResetAt),
            spelling
          ) || 0;
        total += Math.max(Number(counter?.tokens_used) || 0, history);
        bucket = getBudgetWindow(
          source.reset_interval as BudgetResetInterval,
          String(source.reset_time || "00:00"),
          bucket.nextResetAt
        );
      }
      return total;
    }, 0)
  );
  for (const [index, row] of [old, current].entries())
    db.prepare(
      "INSERT INTO api_key_token_counters(limit_id,window_start,tokens_used) VALUES(?,?,?) ON CONFLICT(limit_id,window_start) DO UPDATE SET tokens_used=excluded.tokens_used"
    ).run(row.id, String(windows[index].periodStartAt), totals[index]);
  db.prepare(
    "INSERT OR REPLACE INTO key_value(namespace,key,value) VALUES('migrationReceipts',?,?)"
  ).run(
    receiptKey,
    JSON.stringify({
      completed: true,
      clocks: [old, current].map((row) => ({
        id: row.id,
        resetInterval: row.reset_interval,
        resetTime: row.reset_time,
      })),
      windows,
    })
  );
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
    // Two scopes preserve reset clocks that a single canonical row cannot represent.
    if (hasDistinctBudgetSchedules(old, current)) {
      reconcileRetainedCounters(db, old, current, now);
      db.prepare("UPDATE api_key_token_limits SET token_limit=? WHERE id IN (?,?)").run(
        policy.token_limit,
        old.id,
        current.id
      );
      continue;
    }
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
    const caps = [Number(old.token_limit), Number(current.token_limit)].filter(
      (n) => Number.isFinite(n) && n > 0
    );
    return {
      ...current,
      tokens_used: Number(old.tokens_used) + Number(current.tokens_used),
      token_limit: caps.length ? Math.min(...caps) : 0,
      window_start: Math.min(Number(old.window_start), Number(current.window_start)),
      window_reset:
        Number(old.window_reset) <= 0 || Number(current.window_reset) <= 0
          ? 0
          : Math.max(Number(old.window_reset), Number(current.window_reset)),
    };
  }
  if (active(old)) return { ...old, model: current.model };
  if (active(current)) return current;
  return Number(old.window_reset) > Number(current.window_reset)
    ? { ...old, model: current.model }
    : current;
}
