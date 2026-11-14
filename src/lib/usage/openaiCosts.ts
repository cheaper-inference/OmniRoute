import { createHash } from "node:crypto";
import { z } from "zod";

export type OpenAICostPeriod = "7d" | "30d" | "month";
export function openAICostWindow(period: OpenAICostPeriod, now = new Date()) {
  const endTime = Math.floor(now.getTime() / 1000);
  const start =
    period === "month"
      ? Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1) / 1000
      : Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate() - (period === "7d" ? 6 : 29)
        ) / 1000;
  return { startTime: start, endTime };
}

const pageSchema = z.object({
  data: z.array(
    z.object({
      start_time: z.number().int(),
      end_time: z.number().int(),
      results: z.array(
        z.object({
          amount: z.object({ value: z.number().finite(), currency: z.literal("usd") }),
          organization_id: z.string().nullable().optional(),
        })
      ),
    })
  ),
  has_more: z.boolean(),
  next_page: z.string().nullable().optional(),
});

export type OpenAICosts = {
  organizationId: string;
  startTime: number;
  endTime: number;
  totalUsd: number;
  fetchedAt: string;
};

// Billing-only snapshots. Never insert these organization totals into request usage/cost ledgers.
const cache = new Map<string, { until: number; value: Promise<OpenAICosts> }>();
export function clearOpenAICostCache() {
  cache.clear();
}

type CostsPage = z.infer<typeof pageSchema>;
type CostsWindow = ReturnType<typeof openAICostWindow>;
type PageRequest = {
  organizationId: string;
  adminKey: string;
  window: CostsWindow;
  cursor: string | undefined;
  fetcher: typeof fetch;
  signal: AbortSignal;
};

const COSTS_URL = "https://api.openai.com/v1/organization/costs";
const MAX_PAGES = 10;

async function fetchCostsPage(request: PageRequest): Promise<CostsPage> {
  const url = new URL(COSTS_URL);
  url.searchParams.set("start_time", String(request.window.startTime));
  url.searchParams.set("end_time", String(request.window.endTime));
  url.searchParams.set("bucket_width", "1d");
  url.searchParams.set("limit", "31");
  if (request.cursor) url.searchParams.set("page", request.cursor);
  // Called unbound, like the global fetch it defaults to.
  const fetcher = request.fetcher;
  const response = await fetcher(url, {
    headers: {
      Authorization: `Bearer ${request.adminKey}`,
      "OpenAI-Organization": request.organizationId,
    },
    redirect: "error",
    signal: request.signal,
  });
  if (!response.ok) {
    const denied = response.status === 401 || response.status === 403;
    throw new Error(denied ? "billing_access_denied" : "billing_upstream_error");
  }
  const parsed = pageSchema.safeParse(await response.json());
  if (!parsed.success) throw new Error("billing_invalid_response");
  return parsed.data;
}

/** Sums one page; rejects repeated buckets and rows from another organization. */
function sumCostsPage(page: CostsPage, organizationId: string, seenBuckets: Set<string>): number {
  let total = 0;
  for (const bucket of page.data) {
    const bucketKey = `${bucket.start_time}:${bucket.end_time}`;
    if (seenBuckets.has(bucketKey)) throw new Error("billing_duplicate_bucket");
    seenBuckets.add(bucketKey);
    for (const row of bucket.results) {
      if (row.organization_id && row.organization_id !== organizationId)
        throw new Error("billing_organization_mismatch");
      total += row.amount.value;
    }
  }
  return total;
}

/** Cursor of the next page; a missing or repeated cursor means the listing cannot complete. */
function nextCursor(page: CostsPage, seenCursors: Set<string>): string {
  const next = page.next_page;
  if (!next || seenCursors.has(next)) throw new Error("billing_invalid_pagination");
  seenCursors.add(next);
  return next;
}

async function readAllCosts(
  organizationId: string,
  adminKey: string,
  window: CostsWindow,
  fetcher: typeof fetch,
  now: Date
): Promise<OpenAICosts> {
  const seenCursors = new Set<string>();
  const seenBuckets = new Set<string>();
  const signal = AbortSignal.timeout(20_000);
  let cursor: string | undefined;
  let totalUsd = 0;
  for (let pageIndex = 0; pageIndex < MAX_PAGES; pageIndex++) {
    const page = await fetchCostsPage({
      organizationId,
      adminKey,
      window,
      cursor,
      fetcher,
      signal,
    });
    totalUsd += sumCostsPage(page, organizationId, seenBuckets);
    if (!page.has_more) {
      if (!Number.isFinite(totalUsd)) throw new Error("billing_invalid_response");
      return { organizationId, ...window, totalUsd, fetchedAt: now.toISOString() };
    }
    cursor = nextCursor(page, seenCursors);
  }
  throw new Error("billing_incomplete_response");
}

export async function fetchOpenAICosts(
  organizationId: string,
  adminKey: string,
  period: OpenAICostPeriod,
  options: { fetcher?: typeof fetch; now?: Date } = {}
): Promise<OpenAICosts> {
  const now = options.now || new Date();
  const window = openAICostWindow(period, now);
  const key = `${organizationId}:${window.startTime}:${createHash("sha256").update(adminKey).digest("hex")}`;
  const existing = cache.get(key);
  if (existing && existing.until > now.getTime()) return existing.value;
  // Bound process memory; expired entries need no persistence.
  if (cache.size >= 100) cache.clear();
  const value = readAllCosts(organizationId, adminKey, window, options.fetcher || fetch, now);
  cache.set(key, { until: now.getTime() + 300_000, value });
  try {
    return await value;
  } catch (error) {
    if (cache.get(key)?.value === value) cache.delete(key);
    throw error;
  }
}
