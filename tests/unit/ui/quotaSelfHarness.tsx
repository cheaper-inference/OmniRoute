/**
 * Shared test support for the public self-service quota page: the real English catalog, fixture
 * builders whose defaults parse in `selfQuotaResponseSchema`, and a `fetch` stub keyed by URL
 * prefix that records every call.
 */
import React from "react";
import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { vi } from "vitest";

import {
  selfQuotaResponseSchema,
  type SelfQuotaAccount,
  type SelfQuotaAccountDimension,
  type SelfQuotaMemberSlice,
  type SelfQuotaPool,
  type SelfQuotaResponse,
  type SelfQuotaSharedDimension,
} from "@/shared/schemas/selfQuota";
import { selfUsageResponseSchema, type SelfUsageResponse } from "@/shared/schemas/selfUsage";
import messages from "../../../src/i18n/messages/en.json";

export const KEY = "sk-live-1234567890";
/** A pool reference that matches the PATCH body schema. */
export const LENDING_REF = "qpr_0123456789abcdef0123456789abcdef";

export const OTHER_KEY = "sk-live-0987654321";

/** Models a key may call, in server order and on purpose out of order (two providers). */
export const QUOTA_MODELS = [
  "qtSd/team/claude/claude-haiku-4-5-20251001",
  "qtSd/team/codex/gpt-5.5",
  "qtSd/team/claude/claude-opus-4-8",
  "qtSd/team/claude/claude-sonnet-5",
];

export function renderQuota(ui: React.ReactElement, timeZone = "UTC") {
  return render(
    <NextIntlClientProvider locale="en" timeZone={timeZone} messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
}

export function sharedDim(over: Partial<SelfQuotaSharedDimension> = {}): SelfQuotaSharedDimension {
  return {
    unit: "requests",
    window: "daily",
    limit: 1000,
    total: { used: 200, status: "ok", resetAt: "2026-05-28T00:00:00.000Z" },
    yourShare: { fairShare: 500, consumed: 120, remaining: 380, status: "ok" },
    ...over,
  };
}

export function accountDim(
  over: Partial<SelfQuotaAccountDimension> = {}
): SelfQuotaAccountDimension {
  return {
    unit: "percent",
    window: "5h",
    limit: 100,
    account: { used: 40, status: "ok", resetAt: "2026-05-27T18:00:00.000Z" },
    yourShare: {
      fairShare: 50,
      consumed: null,
      remaining: null,
      status: "unavailable",
      reason: "percent_attribution_unavailable",
    },
    ...over,
  };
}

/** Member slices in slot order: slot = index + 1, and the first one is the asking key. */
export function memberSlices(consumed: number[]): SelfQuotaMemberSlice[] {
  return consumed.map((value, index) => ({ slot: index + 1, consumed: value, isYou: index === 0 }));
}

export function account(over: Partial<SelfQuotaAccount> = {}): SelfQuotaAccount {
  return { slot: 1, label: "Account 1", dimensions: [], ...over };
}

export function pool(over: Partial<SelfQuotaPool> = {}): SelfQuotaPool {
  return {
    ref: "qpr_a",
    name: "Pool A",
    provider: "claude",
    borrowMode: "saturation",
    lendingPercent: 0,
    lendingUntil: null,
    lendingActive: false,
    policy: "hard",
    weight: 50,
    cap: null,
    accountVisible: true,
    dimensions: [],
    accounts: [],
    ...over,
  };
}

export function quotaView(over: Partial<SelfQuotaResponse> = {}): SelfQuotaResponse {
  return {
    provider: "claude",
    generatedAt: "2026-05-27T15:30:00.000Z",
    pools: [pool()],
    availableModels: [],
    expiresAt: null,
    apiBaseUrl: null,
    blocks: { schedules: [], modelCaps: [] },
    ...over,
  };
}

/** A pool as the page receives it: parsed through the real response schema, so a fixture that
 * breaks the contract throws instead of testing nothing. */
export function parsedPool(over: Partial<SelfQuotaPool> = {}): SelfQuotaPool {
  return selfQuotaResponseSchema.parse(quotaView({ pools: [pool(over)] })).pools[0];
}

type UsageDay = SelfUsageResponse["daily"][number];
type UsageModelRow = SelfUsageResponse["byModel"][number];

export function usageDay(over: Partial<UsageDay> = {}): UsageDay {
  return {
    date: "2026-05-26",
    requests: 2,
    promptTokens: 1500,
    completionTokens: 750,
    totalTokens: 2250,
    costUsd: 1.5,
    listPriceUsd: 3,
    ...over,
  };
}

export function usageModelRow(over: Partial<UsageModelRow> = {}): UsageModelRow {
  return {
    model: "claude-sonnet-5",
    provider: "claude",
    requests: 4,
    promptTokens: 3000,
    completionTokens: 1500,
    totalTokens: 4500,
    costUsd: 3,
    listPriceUsd: 6,
    avgLatencyMs: 900,
    successRatePct: 100,
    lastUsed: "2026-05-27T15:00:00.000Z",
    ...over,
  };
}

/** A usage answer whose defaults parse in `selfUsageResponseSchema` (checked on every build). */
export function usageSeries(over: Partial<SelfUsageResponse> = {}): SelfUsageResponse {
  return selfUsageResponseSchema.parse({
    range: "30d",
    generatedAt: "2026-05-27T15:30:00.000Z",
    coverage: {
      from: "2026-04-28T00:00:00.000Z",
      to: "2026-05-27T15:30:00.000Z",
      retentionDays: 90,
      truncatedByRetention: false,
    },
    summary: {
      requests: 4,
      promptTokens: 3000,
      completionTokens: 1500,
      totalTokens: 4500,
      costUsd: 3,
      listPriceUsd: 6,
      successfulRequests: 4,
      successRatePct: 100,
      uniqueModels: 1,
      avgLatencyMs: 900,
      firstRequest: "2026-05-26T10:00:00.000Z",
      lastRequest: "2026-05-27T15:00:00.000Z",
    },
    daily: [usageDay(), usageDay({ date: "2026-05-27" })],
    dailyByModel: [],
    byModel: [usageModelRow()],
    byModelTruncated: false,
    byProvider: [],
    ...over,
  });
}

export function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export interface FetchCall {
  url: string;
  /** Upper case, `GET` when the caller set none. */
  method: string;
  headers: Headers;
  /** The body when it is a string, else null. */
  body: string | null;
  /** The abort signal the caller passed, if any. */
  signal: AbortSignal | null;
}

export type FetchRoute = (call: FetchCall) => Response | Promise<Response>;

/**
 * Replaces `fetch` with a stub that answers by the first matching URL prefix. An unmapped URL gets
 * an empty 404, so a section a test does not cover fails quietly instead of throwing.
 */
export function stubFetch(routes: Record<string, FetchRoute>): FetchCall[] {
  const calls: FetchCall[] = [];
  vi.stubGlobal("fetch", async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    const call: FetchCall = {
      url,
      method: (init?.method ?? "GET").toUpperCase(),
      headers: new Headers(init?.headers),
      body: typeof init?.body === "string" ? init.body : null,
      signal: init?.signal ?? null,
    };
    calls.push(call);
    const prefix = Object.keys(routes).find((candidate) => url.startsWith(candidate));
    if (!prefix) return new Response(null, { status: 404 });
    return routes[prefix](call);
  });
  return calls;
}

/** Calls whose URL starts with `prefix`, and with `method` when given (tests never count calls in
 * total). */
export function callsTo(calls: FetchCall[], prefix: string, method?: string): FetchCall[] {
  return calls.filter(
    (call) => call.url.startsWith(prefix) && (method === undefined || call.method === method)
  );
}

let savedClipboard: PropertyDescriptor | undefined;
let clipboardStubbed = false;

/** Installs navigator.clipboard.writeText and returns the texts it receives. */
export function stubClipboard(): string[] {
  const writes: string[] = [];
  if (!clipboardStubbed) savedClipboard = Object.getOwnPropertyDescriptor(navigator, "clipboard");
  clipboardStubbed = true;
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: {
      writeText: async (text: string) => {
        writes.push(text);
      },
    },
  });
  return writes;
}

/** Removes the clipboard stub (call in afterEach). */
export function restoreClipboard(): void {
  if (!clipboardStubbed) return;
  if (savedClipboard) Object.defineProperty(navigator, "clipboard", savedClipboard);
  else Reflect.deleteProperty(navigator, "clipboard");
  savedClipboard = undefined;
  clipboardStubbed = false;
}

/** "tag@attribute" for every attribute whose value contains `needle`, plus "tag.value" for form controls. */
export function attributesContaining(needle: string): string[] {
  const found: string[] = [];
  for (const element of Array.from(document.querySelectorAll("*"))) {
    const tag = element.tagName.toLowerCase();
    for (const attribute of Array.from(element.attributes)) {
      if (attribute.value.includes(needle)) found.push(`${tag}@${attribute.name}`);
    }
    const isControl =
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement ||
      element instanceof HTMLSelectElement;
    if (isControl && element.value.includes(needle)) found.push(`${tag}.value`);
  }
  return found;
}
