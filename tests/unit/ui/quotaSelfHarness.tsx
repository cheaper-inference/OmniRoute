/**
 * Shared test support for the public self-service quota page: the real English catalog, fixture
 * builders whose defaults parse in `selfQuotaResponseSchema`, and a `fetch` stub keyed by URL
 * prefix that records every call.
 */
import React from "react";
import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { vi } from "vitest";

import type {
  SelfQuotaAccount,
  SelfQuotaAccountDimension,
  SelfQuotaPool,
  SelfQuotaResponse,
  SelfQuotaSharedDimension,
} from "@/shared/schemas/selfQuota";
import messages from "../../../src/i18n/messages/en.json";

export const KEY = "sk-live-1234567890";

export function renderQuota(ui: React.ReactElement) {
  return render(
    <NextIntlClientProvider locale="en" timeZone="UTC" messages={messages}>
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

export function account(over: Partial<SelfQuotaAccount> = {}): SelfQuotaAccount {
  return { slot: 1, label: "Account 1", dimensions: [], ...over };
}

export function pool(over: Partial<SelfQuotaPool> = {}): SelfQuotaPool {
  return {
    ref: "qpr_a",
    name: "Pool A",
    provider: "claude",
    borrowMode: "saturation",
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

export function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export interface FetchCall {
  url: string;
  headers: Headers;
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
    const call: FetchCall = { url, headers: new Headers(init?.headers) };
    calls.push(call);
    const prefix = Object.keys(routes).find((candidate) => url.startsWith(candidate));
    if (!prefix) return new Response(null, { status: 404 });
    return routes[prefix](call);
  });
  return calls;
}

/** Calls whose URL starts with `prefix` (tests never count calls in total). */
export function callsTo(calls: FetchCall[], prefix: string): FetchCall[] {
  return calls.filter((call) => call.url.startsWith(prefix));
}
