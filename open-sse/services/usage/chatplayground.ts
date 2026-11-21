/**
 * ChatPlayground billing & query quota fetcher for Limits page.
 *
 * Calls GET https://web.chatplayground.ai/api/me with an auto-minted Clerk
 * JWT: one payload carries the user, entitlement, plan and the
 * `usage.{dailyQueries,pro,documents,images}` buckets. The pre-unified
 * `app.chatplayground.ai/api/user` route is gone (404 on the new origin), so
 * no legacy fallback is probed.
 */
import { type UsageQuota } from "./quota.ts";
import { fetchWithConnectionProxy } from "../connectionProxyFetch.ts";
import { resolveChatPlaygroundAuth } from "../chatplaygroundAuth.ts";
import {
  CHATPLAYGROUND_ME_URL,
  buildChatPlaygroundUsageQuotas,
  resolveChatPlaygroundAccount,
} from "../chatplaygroundModels.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";

export interface ChatPlaygroundUsageResult {
  plan: string;
  quotas?: Record<string, UsageQuota>;
  message?: string | null;
}

export async function getChatPlaygroundUsage(
  apiKey?: string,
  providerSpecificData?: Record<string, unknown> | null,
  connectionId?: string
): Promise<ChatPlaygroundUsageResult> {
  try {
    const auth = await resolveChatPlaygroundAuth({
      apiKey,
      providerSpecificData,
    });

    const res = connectionId
      ? await fetchWithConnectionProxy(connectionId, CHATPLAYGROUND_ME_URL, {
          method: "GET",
          headers: auth.headers,
        })
      : await globalThis.fetch(CHATPLAYGROUND_ME_URL, {
          method: "GET",
          headers: auth.headers,
        });
    if (!res) throw new Error("proxied request failed");

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      return {
        message: `ChatPlayground user API HTTP ${res.status}: ${sanitizeErrorMessage(errText.slice(0, 160))}`,
        plan: "ChatPlayground",
      };
    }

    const data = (await res.json()) as Record<string, unknown>;
    const account = resolveChatPlaygroundAccount(data);
    return {
      plan: account.plan,
      quotas: buildChatPlaygroundUsageQuotas(data),
      message: null,
    };
  } catch (err) {
    // Best-effort: the dashboard quota fetch must never throw back to the caller
    // that only renders the returned plan/quotas object.
    const msg = err instanceof Error ? err.message : String(err);
    return {
      message: `ChatPlayground quota fetch failed: ${sanitizeErrorMessage(msg)}`,
      plan: "ChatPlayground",
    };
  }
}
