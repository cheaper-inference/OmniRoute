/**
 * quota-scraping credential fields rendered by QuotaScrapingFields.tsx.
 *
 * Kept in a UI-free module on purpose: importing the .tsx pulls in
 * `@/shared/components`, whose barrel reaches untranspiled ESM deps
 * (@lobehub/icons) that the node:test runner cannot parse. Unit tests import
 * this file instead; the component re-exports it for existing callers.
 */

import { getProviderConnectionFamilyIds } from "@/shared/constants/providers";

/** Providers whose quota lives behind the Qwen/Model Studio console gateway (#9603). */
export const QWEN_TOKEN_PLAN_PROVIDERS = new Set(["qwen-cloud-token-plan", "bailian-coding-plan"]);

/** Providers whose quota lives behind the Volcano Engine console gateway. */
export const VOLCENGINE_PLAN_PROVIDERS = new Set([
  "volcengine-coding-plan",
  "volcengine-agent-plan",
]);

/** Providers whose Token Plan quota lives behind the Xiaomi MiMo console (#15753). */
export const XIAOMI_MIMO_PROVIDERS = new Set(["xiaomi-mimo", "xiaomi-mimo-token-plan"]);

/** Providers whose quota lives behind the Muse Code console (dev.meta.ai). */
export const MUSE_CODE_PROVIDERS = new Set(["muse-code"]);

export type QuotaScrapingFieldValues = {
  ollamaCloudUsageCookie: string;
  alibabaConsoleCookie: string;
  alibabaConsoleSecToken: string;
  qwenCloudCookie: string;
  qwenCloudSecToken: string;
  volcConsoleCookie: string;
  xiaomiMimoConsoleCookie: string;
  museConsoleSession: string;
  museTeamId: string;
  billingPortalUrl: string;
};

export const EMPTY_QUOTA_SCRAPING_FIELDS: QuotaScrapingFieldValues = {
  ollamaCloudUsageCookie: "",
  alibabaConsoleCookie: "",
  alibabaConsoleSecToken: "",
  qwenCloudCookie: "",
  qwenCloudSecToken: "",
  volcConsoleCookie: "",
  xiaomiMimoConsoleCookie: "",
  museConsoleSession: "",
  museTeamId: "",
  billingPortalUrl: "",
};

export function assignQuotaScrapingProviderData(
  provider: string | undefined,
  values: QuotaScrapingFieldValues,
  target: Record<string, unknown>
) {
  if (provider === "zed-hosted") {
    assignZedHostedBillingPortalUrl(values, target);
    return;
  }
  assignConsoleSessionProviderData(provider, values, target);
}

function assignZedHostedBillingPortalUrl(
  values: QuotaScrapingFieldValues,
  target: Record<string, unknown>
) {
  // Empty/absent leaves the stored link alone on the edit round-trip.
  const link = values.billingPortalUrl?.trim();
  if (link) target.billingPortalUrl = link;
}

function assignConsoleSessionProviderData(
  provider: string | undefined,
  values: QuotaScrapingFieldValues,
  target: Record<string, unknown>
) {
  if (provider === "ollama-cloud" && values.ollamaCloudUsageCookie.trim()) {
    target.ollamaCloudUsageCookie = values.ollamaCloudUsageCookie.trim();
  } else if (
    getProviderConnectionFamilyIds("alibaba").includes(provider) &&
    values.alibabaConsoleCookie.trim()
  ) {
    target.alibabaConsoleCookie = values.alibabaConsoleCookie.trim();
    if (values.alibabaConsoleSecToken.trim()) {
      target.alibabaConsoleSecToken = values.alibabaConsoleSecToken.trim();
    }
  } else if (QWEN_TOKEN_PLAN_PROVIDERS.has(provider ?? "") && values.qwenCloudCookie?.trim()) {
    // Optional access: callers (AddApiKeyModal/EditConnectionModal form state, and
    // existing tests) may pass a partial form object without the newer fields —
    // bailian-coding-plan previously matched no branch here at all.
    target.qwenCloudCookie = values.qwenCloudCookie.trim();
    if (values.qwenCloudSecToken?.trim()) {
      target.qwenCloudSecToken = values.qwenCloudSecToken.trim();
    }
  } else if (VOLCENGINE_PLAN_PROVIDERS.has(provider ?? "") && values.volcConsoleCookie?.trim()) {
    target.volcConsoleCookie = values.volcConsoleCookie.trim();
  } else if (XIAOMI_MIMO_PROVIDERS.has(provider ?? "") && values.xiaomiMimoConsoleCookie?.trim()) {
    // Optional access: callers may pass a partial form object without the newer
    // fields (same contract as the qwen branch above).
    target.xiaomiMimoConsoleCookie = values.xiaomiMimoConsoleCookie.trim();
  } else if (MUSE_CODE_PROVIDERS.has(provider ?? "")) {
    // Same partial-form contract as the qwen/xiaomi branches above; the team
    // id is independent of the session so editing one alone still saves.
    if (values.museConsoleSession?.trim()) {
      target.museConsoleSession = values.museConsoleSession.trim();
    }
    if (values.museTeamId?.trim()) {
      target.museTeamId = values.museTeamId.trim();
    }
  }
}
