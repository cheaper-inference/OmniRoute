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
  const value = readCosts();
  cache.set(key, { until: now.getTime() + 300_000, value });
  try {
    return await value;
  } catch (error) {
    if (cache.get(key)?.value === value) cache.delete(key);
    throw error;
  }

  async function readCosts(): Promise<OpenAICosts> {
    let cursor: string | undefined;
    let totalUsd = 0;
    const cursors = new Set<string>();
    const buckets = new Set<string>();
    const signal = AbortSignal.timeout(20_000);
    for (let page = 0; page < 10; page++) {
      const url = new URL("https://api.openai.com/v1/organization/costs");
      url.searchParams.set("start_time", String(window.startTime));
      url.searchParams.set("end_time", String(window.endTime));
      url.searchParams.set("bucket_width", "1d");
      url.searchParams.set("limit", "31");
      if (cursor) url.searchParams.set("page", cursor);
      const response = await (options.fetcher || fetch)(url, {
        headers: { Authorization: `Bearer ${adminKey}`, "OpenAI-Organization": organizationId },
        redirect: "error",
        signal,
      });
      if (!response.ok)
        throw new Error(
          response.status === 401 || response.status === 403
            ? "billing_access_denied"
            : "billing_upstream_error"
        );
      const data = pageSchema.safeParse(await response.json());
      if (!data.success) throw new Error("billing_invalid_response");
      for (const bucket of data.data.data) {
        const bucketKey = `${bucket.start_time}:${bucket.end_time}`;
        if (buckets.has(bucketKey)) throw new Error("billing_duplicate_bucket");
        buckets.add(bucketKey);
        for (const row of bucket.results) {
          if (row.organization_id && row.organization_id !== organizationId)
            throw new Error("billing_organization_mismatch");
          totalUsd += row.amount.value;
        }
      }
      if (!data.data.has_more) {
        if (!Number.isFinite(totalUsd)) throw new Error("billing_invalid_response");
        return { organizationId, ...window, totalUsd, fetchedAt: now.toISOString() };
      }
      const next = data.data.next_page;
      if (!next || cursors.has(next)) throw new Error("billing_invalid_pagination");
      cursors.add(next);
      cursor = next;
    }
    throw new Error("billing_incomplete_response");
  }
}
