/**
 * usage/repriceLedger.ts — resumable repricing of never-priced request_cost_ledger rows
 * (finding bifrost-12). Opt-in: the endpoint (src/app/api/usage/reprice) is closed unless
 * OMNIROUTE_USAGE_REPRICE_JOB_ENABLED is on.
 *
 * - Scope: rows stored with amount_usd = 0 and both unit prices 0 (no price row existed when the
 *   call finished). A row that was priced at write time is never rewritten.
 * - Paging: keyset on (timestamp, id). The cursor lives in `cost_reprice_cursor` and moves in the
 *   same transaction as the rows it reprices, so a restart resumes exactly where the job stopped.
 * - Degraded stubs are refused: a row with no stored usage evidence, or with unknown input, output
 *   or cached-token counts, would be charged its cached tokens at the full input rate.
 * - Price lookup goes through `priceAt(provider, model, timestamp)` with the row's own timestamp.
 *   shortcut: the tip keeps no dated price history, so the default ignores the timestamp and returns
 *   today's row; upgrade by passing a dated lookup once prices carry effective dates.
 *
 * @module usage/repriceLedger
 */

import { getDbInstance } from "../db/core";
import { toNumber } from "@/shared/utils/numeric";
import { readUsageEvidence } from "./usageEvidence";
import { computeCostFromPricing, resolvePricingRow } from "./costCalculator";

type PricingRow = Record<string, unknown> | null | undefined;
export type PriceAt = (provider: string, model: string, timestamp: string) => Promise<PricingRow>;

export interface RepriceState {
  lastTimestamp: string;
  lastId: number;
  scannedTotal: number;
  repricedTotal: number;
  refusedTotal: number;
  unpricedTotal: number;
}

export interface RepriceOptions {
  batchSize?: number;
  maxBatches?: number;
  /** Start again from the oldest row (a pricing fix may now price rows an earlier pass left). */
  restart?: boolean;
  priceAt?: PriceAt;
}

export interface RepriceResult {
  scanned: number;
  repriced: number;
  refused: number;
  unpriced: number;
  /** true when the cursor reached the end of the ledger. */
  done: boolean;
  state: RepriceState;
}

type LedgerRow = Record<string, unknown> & { id: number; timestamp: string };

export function isRepriceJobEnabled(): boolean {
  return /^(1|true|on)$/i.test(process.env.OMNIROUTE_USAGE_REPRICE_JOB_ENABLED?.trim() ?? "");
}

export function getRepriceState(): RepriceState {
  const row = getDbInstance().prepare("SELECT * FROM cost_reprice_cursor WHERE id = 1").get() as
    Record<string, unknown> | undefined;
  return {
    lastTimestamp: typeof row?.last_timestamp === "string" ? row.last_timestamp : "",
    lastId: toNumber(row?.last_id),
    scannedTotal: toNumber(row?.scanned_total),
    repricedTotal: toNumber(row?.repriced_total),
    refusedTotal: toNumber(row?.refused_total),
    unpricedTotal: toNumber(row?.unpriced_total),
  };
}

const defaultPriceAt: PriceAt = (provider, model) => resolvePricingRow(provider, model);

/** A stored row whose usage cannot be priced without guessing: charging it would bill cached tokens in full. */
function isDegradedStub(row: LedgerRow): boolean {
  const evidence = readUsageEvidence(row.usage_evidence);
  if (!evidence) return true;
  return [evidence.input, evidence.output, evidence.cacheRead].some((f) => f.source === "unknown");
}

function priceRow(row: LedgerRow, pricing: NonNullable<PricingRow>): number {
  return computeCostFromPricing(
    pricing,
    {
      input: toNumber(row.tokens_input),
      output: toNumber(row.tokens_output),
      cacheRead: toNumber(row.tokens_cache_read),
      cacheCreation: toNumber(row.tokens_cache_creation),
      reasoning: toNumber(row.tokens_reasoning),
    },
    {
      provider: String(row.provider),
      model: String(row.model),
      serviceTier: String(row.service_tier),
    }
  );
}

export async function runRepriceJob(options: RepriceOptions = {}): Promise<RepriceResult> {
  const batchSize = Math.max(1, Math.min(options.batchSize ?? 200, 1000));
  const maxBatches = Math.max(1, options.maxBatches ?? 20);
  const priceAt = options.priceAt ?? defaultPriceAt;
  const db = getDbInstance();
  if (options.restart) {
    db.prepare(
      `UPDATE cost_reprice_cursor SET last_timestamp = '', last_id = 0, scanned_total = 0,
         repriced_total = 0, refused_total = 0, unpriced_total = 0 WHERE id = 1`
    ).run();
  }
  const select = db.prepare(
    `SELECT * FROM request_cost_ledger
     WHERE (timestamp > ? OR (timestamp = ? AND id > ?))
       AND amount_usd = 0 AND unit_price_input = 0 AND unit_price_output = 0
     ORDER BY timestamp, id LIMIT ?`
  );
  const update = db.prepare(
    `UPDATE request_cost_ledger SET amount_usd = ?, unit_price_input = ?, unit_price_output = ?
     WHERE id = ? AND amount_usd = 0`
  );
  const advance = db.prepare(
    `UPDATE cost_reprice_cursor SET last_timestamp = ?, last_id = ?, scanned_total = scanned_total + ?,
       repriced_total = repriced_total + ?, refused_total = refused_total + ?,
       unpriced_total = unpriced_total + ?, updated_at = ? WHERE id = 1`
  );

  const total = { scanned: 0, repriced: 0, refused: 0, unpriced: 0 };
  let done = false;
  for (let batch = 0; batch < maxBatches && !done; batch++) {
    const cursor = getRepriceState();
    const rows = select.all(
      cursor.lastTimestamp,
      cursor.lastTimestamp,
      cursor.lastId,
      batchSize
    ) as LedgerRow[];
    const writes: Array<[number, number, number, number]> = [];
    let refused = 0;
    let unpriced = 0;
    for (const row of rows) {
      if (isDegradedStub(row)) {
        refused += 1;
        continue;
      }
      const pricing = await priceAt(String(row.provider), String(row.model), row.timestamp);
      const amount = pricing ? priceRow(row, pricing) : 0;
      if (!pricing || !(amount > 0)) {
        unpriced += 1;
        continue;
      }
      writes.push([amount, toNumber(pricing.input), toNumber(pricing.output), row.id]);
    }
    const last = rows[rows.length - 1];
    db.transaction(() => {
      for (const write of writes) update.run(...write);
      if (last) {
        advance.run(
          last.timestamp,
          last.id,
          rows.length,
          writes.length,
          refused,
          unpriced,
          new Date().toISOString()
        );
      }
    })();
    total.scanned += rows.length;
    total.repriced += writes.length;
    total.refused += refused;
    total.unpriced += unpriced;
    done = rows.length < batchSize;
  }
  return { ...total, done, state: getRepriceState() };
}
