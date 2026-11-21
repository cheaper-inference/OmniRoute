/**
 * selfViewPercent.ts — the key's own part of each percent plan window in the self-service view.
 *
 * It never writes the book's state. For every pool connection and every `percent` plan dimension
 * (limit above Number.EPSILON) it reads the attribution book once, through
 * previewPercentDimension, with the plan limit of ONE account. The plan-window reading comes only
 * from the quota gate's cache (peekPlanWindowReading): the provider is never called, and no book
 * is opened or rewritten. A store may still clean superseded revision fields on a read, as it
 * does for the gate's reads.
 *
 * Each state of the book has its own answer, never a zero:
 *   - a usable book with a cached reading: `ok`; without one, the last stored state: `stale`;
 *   - no book: `percent_attribution_unavailable`;
 *   - a book whose window ended: `percent_window_ended`;
 *   - a store that failed, is missing or cannot read books: `store_unavailable`;
 *   - a connection the key may not use: `account_not_used_by_key`, and its book is not read.
 *
 * `consumed` is what the gate compares with the share: the key's attributed part plus its charge
 * for usage made outside the pool, the same sum the gate builds. Both parts are reported apart,
 * so `attributed + external` equals `consumed` exactly, and only to a key that may see account
 * data.
 */

import type { SelfQuotaShare } from "@/shared/schemas/selfQuota";
import type { QuotaDimension } from "./dimensions";
import { previewPercentDimension, type PercentDimensionPreview } from "./percentAttribution";
import type { ViewStore } from "./selfViewStore";
import type { QuotaSelfViewDeps, SelfViewPoolContext } from "./selfViewTypes";
import type { PlanWindowReading, QuotaStore } from "./types";

const STORE_UNAVAILABLE = "store_unavailable";
const PERCENT_ATTRIBUTION_UNAVAILABLE = "percent_attribution_unavailable";
const PERCENT_WINDOW_ENDED = "percent_window_ended";
const ACCOUNT_NOT_USED_BY_KEY = "account_not_used_by_key";

/** saturationSignals reads both ids of this family the same way. */
const CLAUDE_FAMILY: readonly string[] = ["claude", "anthropic"];

const REASON_BY_KIND: Record<Exclude<PercentDimensionPreview["kind"], "book">, string> = {
  failed: STORE_UNAVAILABLE,
  none: PERCENT_ATTRIBUTION_UNAVAILABLE,
  ended: PERCENT_WINDOW_ENDED,
};

export type PercentShareState =
  | {
      status: "ok" | "stale";
      consumed: number;
      attributed: number;
      external: number;
      /** The attributed part of every allocation of the pool, in the dimension's units. */
      memberAttributed: Record<string, number>;
    }
  | { status: "unavailable"; reason: string };

export type PercentShares = ReadonlyMap<string, PercentShareState>;

type PercentDimension = QuotaDimension & { unit: "percent" };
type PeekReading = NonNullable<QuotaSelfViewDeps["peekPlanWindowReading"]>;
type BookReadingStore = ViewStore & Pick<QuotaStore, "ledgerRead">;

export interface ReadPercentSharesInput {
  ctx: SelfViewPoolContext;
  apiKeyId: string;
  allowedConnections: string[] | undefined;
  store: ViewStore | null;
  now: number;
  peekReading: PeekReading;
}

/** The lookup key of one account and window in PercentShares. */
export function percentShareKey(connectionId: string, window: string): string {
  return JSON.stringify([connectionId, window]);
}

function unavailable(reason: string): PercentShareState {
  return { status: "unavailable", reason };
}

function isPercentDimension(dim: QuotaDimension): dim is PercentDimension {
  return dim.unit === "percent" && dim.limit > Number.EPSILON;
}

/** Every pool connection when the key has no list (absent or empty), else only the listed ones. */
function usableConnections(connectionIds: string[], allowed: string[] | undefined): Set<string> {
  const listed = (allowed ?? []).filter((id) => typeof id === "string" && id);
  return new Set(listed.length > 0 ? listed : connectionIds);
}

function hasBookReader(store: ViewStore | null): store is BookReadingStore {
  return store !== null && typeof store.ledgerRead === "function";
}

function peekOrNull(
  peek: PeekReading,
  connectionId: string,
  provider: string,
  window: PercentDimension["window"]
): PlanWindowReading | null {
  try {
    return peek(connectionId, provider, { unit: "percent", window }) ?? null;
  } catch {
    return null;
  }
}

/** The newest cached reading of the window, over the provider ids the gate may have used. */
function cachedReading(
  peek: PeekReading,
  connectionId: string,
  provider: string,
  window: PercentDimension["window"]
): PlanWindowReading | null {
  const providers = CLAUDE_FAMILY.includes(provider) ? CLAUDE_FAMILY : [provider];
  let newest: PlanWindowReading | null = null;
  for (const id of providers) {
    const reading = peekOrNull(peek, connectionId, id, window);
    if (reading && (!newest || reading.fetchedAt > newest.fetchedAt)) newest = reading;
  }
  return newest;
}

function hasOwn(map: Record<string, number>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(map, key);
}

/** The key's state from one preview; a key the book does not list is not counted yet. */
function shareState(preview: PercentDimensionPreview, apiKeyId: string): PercentShareState {
  if (preview.kind !== "book") return unavailable(REASON_BY_KIND[preview.kind]);
  const { consumedByKey, internalByKey, externalByKey } = preview.shares;
  const listed = [consumedByKey, internalByKey, externalByKey].every((map) =>
    hasOwn(map, apiKeyId)
  );
  if (!listed) return unavailable(PERCENT_ATTRIBUTION_UNAVAILABLE);
  return {
    status: preview.confirmed ? "ok" : "stale",
    consumed: consumedByKey[apiKeyId],
    attributed: internalByKey[apiKeyId],
    external: externalByKey[apiKeyId],
    memberAttributed: { ...internalByKey },
  };
}

async function readAccountShare(
  input: ReadPercentSharesInput,
  usable: Set<string>,
  connectionId: string,
  dim: PercentDimension
): Promise<PercentShareState> {
  if (!usable.has(connectionId)) return unavailable(ACCOUNT_NOT_USED_BY_KEY);
  const store = input.store;
  if (!hasBookReader(store)) return unavailable(STORE_UNAVAILABLE);
  const preview = await previewPercentDimension({
    store,
    pool: input.ctx.pool,
    connectionId,
    dimension: { window: dim.window, limit: dim.limit },
    reading: cachedReading(input.peekReading, connectionId, input.ctx.provider, dim.window),
    nowMs: input.now,
  });
  return shareState(preview, input.apiKeyId);
}

/** One state per pool connection and percent window, read in parallel. */
export async function readPercentShares(input: ReadPercentSharesInput): Promise<PercentShares> {
  const usable = usableConnections(input.ctx.connectionIds, input.allowedConnections);
  const dimensions = (input.ctx.plan.dimensions ?? []).filter(isPercentDimension);
  const reads = input.ctx.connectionIds.flatMap((connectionId) =>
    dimensions.map(async (dim): Promise<[string, PercentShareState]> => [
      percentShareKey(connectionId, dim.window),
      await readAccountShare(input, usable, connectionId, dim),
    ])
  );
  return new Map(await Promise.all(reads));
}

/**
 * The `yourShare` of one account dimension; a missing state is not counted yet. The two parts
 * go only to a key that may see account data (`withParts`): with its own weight, the external
 * charge would let any key work out the account's use made outside the pool.
 */
export function percentShareOf(
  fairShare: number,
  state: PercentShareState | undefined,
  withParts: boolean
): SelfQuotaShare {
  if (!state || state.status === "unavailable") {
    // Narrowed by the status here, so the read also typechecks without strict null checks.
    const reason =
      state && state.status === "unavailable" ? state.reason : PERCENT_ATTRIBUTION_UNAVAILABLE;
    return { fairShare, consumed: null, remaining: null, status: "unavailable", reason };
  }
  const read: SelfQuotaShare = {
    fairShare,
    consumed: state.consumed,
    remaining: Math.max(0, fairShare - state.consumed),
    status: state.status,
  };
  if (!withParts) return read;
  return { ...read, attributed: state.attributed, external: state.external };
}
