// @vitest-environment jsdom
/**
 * KEA-9358 (Database health half) — Settings › Status on a remote dashboard.
 *
 * `/api/db/health` is a local-only route. The card read a failed check as "Attention needed"
 * (0 issues, 0 repairs) and still offered "Run Auto-Repair", which answered "HTTP 403".
 */
import React from "react";
import { act, cleanup, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import HealthPage from "../../../src/app/(dashboard)/dashboard/health/page";
import messages from "../../../src/i18n/messages/en.json";
import type { LocalOnlyAccessSnapshot } from "../../../src/shared/constants/localOnlyFeatures";
import { LocalOnlyAccessProvider } from "../../../src/shared/hooks/useLocalOnlyAccess";
import { __resetLocalOnlyRejectionsForTests } from "../../../src/shared/utils/localOnlyAccess";

vi.mock("@/lib/display/useProviderNodeMap", () => ({
  useProviderNodeMap: () => new Map(),
  resolveProviderName: (provider: string) => provider,
}));
vi.mock("../../../src/app/(dashboard)/dashboard/health/TelemetryCard", () => ({
  default: () => null,
}));
vi.mock("../../../src/app/(dashboard)/dashboard/health/ProviderHealthAutopilotCard", () => ({
  default: () => null,
}));
vi.mock("../../../src/app/(dashboard)/dashboard/health/ProviderHealthMatrixCard", () => ({
  default: () => null,
}));
vi.mock("../../../src/app/(dashboard)/dashboard/health/ConcurrencyQueuesCard", () => ({
  default: () => null,
}));

const DB_HEALTH_PATH = "/api/db/health";
const NOTICE_TITLE = "Only available on the local machine";

const HEALTH_SNAPSHOT = {
  status: "healthy",
  system: { uptime: 60, version: "0.0.0", nodeVersion: "v24", memoryUsage: {} },
  providerHealth: {},
  providerSummary: { configuredCount: 0, activeCount: 0, monitoredCount: 0 },
  rateLimitStatus: {},
  learnedLimits: {},
  lockouts: {},
  sessions: {},
  quotaMonitor: {},
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status });
}

function localOnlyRejection(): Response {
  return json(
    { error: { code: "LOCAL_ONLY", message: "This endpoint requires localhost access" } },
    403
  );
}

/** Stubs fetch; `dbHealth` answers every `/api/db/health` call. */
function stubFetch(dbHealth: () => Response) {
  const fetchMock = vi.fn<typeof fetch>(async (input) => {
    if (input === "/api/monitoring/health") return json(HEALTH_SNAPSHOT);
    if (input === DB_HEALTH_PATH) return dbHealth();
    return json({});
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

async function renderHealthPage(access?: LocalOnlyAccessSnapshot) {
  const page = (
    <NextIntlClientProvider locale="en" timeZone="UTC" messages={messages}>
      <HealthPage />
    </NextIntlClientProvider>
  );
  render(access ? <LocalOnlyAccessProvider value={access}>{page}</LocalOnlyAccessProvider> : page);
  await act(async () => {
    await vi.advanceTimersByTimeAsync(0);
  });
}

const dbHealthCalls = (fetchMock: ReturnType<typeof stubFetch>) =>
  fetchMock.mock.calls.filter(([url]) => url === DB_HEALTH_PATH);

describe("Database health card on a remote dashboard (KEA-9358)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.unstubAllGlobals();
    __resetLocalOnlyRejectionsForTests();
  });

  it("a known-remote session gets the notice, no auto-repair, and no db health request", async () => {
    const fetchMock = stubFetch(localOnlyRejection);
    await renderHealthPage({ locality: "remote", remoteBlockedPaths: [DB_HEALTH_PATH] });

    expect(screen.getByText("Database Health")).toBeTruthy();
    expect(screen.getByText(NOTICE_TITLE)).toBeTruthy();
    expect(screen.queryByText("Attention needed")).toBeNull();
    expect(screen.queryByRole("button", { name: "Run Auto-Repair" })).toBeNull();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(31_000);
    });
    expect(dbHealthCalls(fetchMock)).toHaveLength(0);
  });

  it("a LOCAL_ONLY rejection is not 'Attention needed': notice, no raw status, no repeat", async () => {
    const fetchMock = stubFetch(localOnlyRejection);
    await renderHealthPage();

    expect(screen.getByText(NOTICE_TITLE)).toBeTruthy();
    expect(screen.queryByText("Attention needed")).toBeNull();
    expect(screen.queryByText("HTTP 403")).toBeNull();
    expect(screen.queryByRole("button", { name: "Run Auto-Repair" })).toBeNull();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(31_000);
    });
    expect(dbHealthCalls(fetchMock)).toHaveLength(1);
  });

  it("a check that failed for another reason says so instead of 'Attention needed'", async () => {
    stubFetch(() => json({ error: "boom" }, 500));
    await renderHealthPage();

    expect(screen.getByText("Check failed")).toBeTruthy();
    expect(screen.queryByText("Attention needed")).toBeNull();
    expect(screen.queryByText(NOTICE_TITLE)).toBeNull();
    // A local operator can still try the repair.
    expect(screen.getByRole("button", { name: "Run Auto-Repair" })).toBeTruthy();
  });

  it("keeps the real verdict when the check answers", async () => {
    stubFetch(() =>
      json({
        isHealthy: false,
        issues: [{ table: "combos", type: "broken_ref", description: "Broken combo", count: 2 }],
        repairedCount: 0,
      })
    );
    await renderHealthPage();

    expect(screen.getByText("Attention needed")).toBeTruthy();
    expect(screen.getByText("Broken combo")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Run Auto-Repair" })).toBeTruthy();
  });
});
