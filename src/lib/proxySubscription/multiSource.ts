/**
 * Multi-source fetch for one proxy subscription.
 *
 * The primary URL plus every mirror URL is fetched concurrently with the
 * existing per-URL timeout, SSRF guard and retry policy, so one slow feed
 * never blocks the others. Each body is parsed with the production
 * `parseSubscription` reader; fetch failures surface as `unknown` content,
 * which the merge gate (`mergeParsedSources` in `coreConfig/sync.ts`)
 * isolates per source. This module never fetches by itself: the caller
 * supplies the content reader (production: `fetchSubscriptionContent` via
 * `fetchSubscriptionBodies` in `subscriptionService.ts`). No call here
 * ever throws: failures are data.
 */
import { isUsableSubscriptionContent, parseSubscription, type ParsedSubscription } from "./parse";
import { subscriptionFeedUrls } from "./mirrorUrls";
import type { ProxySubscriptionRecord } from "./subscriptionService";

/** One fetched feed: the URL, its raw body when fetched, and parsed content. */
export interface SubscriptionFeed {
  url: string;
  ok: boolean;
  fetchFailed: boolean;
  body?: string;
  error?: string;
  parsed: ReturnType<typeof parseSubscription>;
}

type FeedRecord = Pick<ProxySubscriptionRecord, "url" | "mirrorUrls">;

/** Parsed view of a feed that couldn't be fetched: unrecognized, no nodes. */
const UNFETCHED: ParsedSubscription = { nodes: [], needsCore: [], format: "unknown" };

/** Fetch a single URL with the caller-supplied reader. Never throws. */
async function fetchOne(
  url: string,
  fetchContent: (url: string) => Promise<string>
): Promise<{ body?: string; error?: string }> {
  try {
    return { body: await fetchContent(url) };
  } catch (e) {
    return { error: e instanceof Error ? e.message : String(e) };
  }
}

/**
 * Fetch every feed of a subscription concurrently (allSettled semantics:
 * one slow or failing feed never blocks the others) and parse each body
 * with the production reader. Order matches `subscriptionFeedUrls`
 * (primary first). Never throws.
 */
export async function fetchSubscriptionFeeds(
  sub: FeedRecord,
  fetchContent: (url: string) => Promise<string>
): Promise<SubscriptionFeed[]> {
  const urls = subscriptionFeedUrls(sub);
  const settled = await Promise.all(urls.map((url) => fetchOne(url, fetchContent)));
  return urls.map((url, index) => {
    const outcome = settled[index];
    const body = outcome.body;
    if (body === undefined) {
      return {
        url,
        ok: false,
        fetchFailed: true,
        error: outcome.error,
        parsed: UNFETCHED,
      };
    }
    const parsed = parseSubscription(body);
    return {
      url,
      ok: isUsableSubscriptionContent(parsed),
      fetchFailed: false,
      ...(outcome.error ? { error: outcome.error } : {}),
      body,
      parsed,
    };
  });
}
