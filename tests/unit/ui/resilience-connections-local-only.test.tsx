// @vitest-environment jsdom
/**
 * KEA-9357 — Resilience › Connections on a remote dashboard.
 *
 * `GET /api/resilience/connections` is a local-only route, so a remote session got a long
 * loading state and then "This page is only accessible from localhost or LAN (LOCAL_ONLY)."
 * The page must show the shared plain-language notice at once, and stop asking.
 */
import React from "react";
import { act, cleanup, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import messages from "../../../src/i18n/messages/en.json";
import ResilienceConnectionsClient from "../../../src/app/(dashboard)/dashboard/resilience/connections/components/ResilienceConnectionsClient";
import type { LocalOnlyAccessSnapshot } from "../../../src/shared/constants/localOnlyFeatures";
import { LocalOnlyAccessProvider } from "../../../src/shared/hooks/useLocalOnlyAccess";
import { __resetLocalOnlyRejectionsForTests } from "../../../src/shared/utils/localOnlyAccess";

const PATH = "/api/resilience/connections";
const NOTICE_TITLE = "Only available on the local machine";

function localOnlyRejection(): Response {
  return new Response(
    JSON.stringify({
      error: { code: "LOCAL_ONLY", message: "This endpoint requires localhost access" },
    }),
    { status: 403 }
  );
}

function renderClient(access?: LocalOnlyAccessSnapshot) {
  const page = (
    <NextIntlClientProvider locale="en" timeZone="UTC" messages={messages}>
      <ResilienceConnectionsClient />
    </NextIntlClientProvider>
  );
  return render(
    access ? <LocalOnlyAccessProvider value={access}>{page}</LocalOnlyAccessProvider> : page
  );
}

describe("ResilienceConnectionsClient on a remote dashboard (KEA-9357)", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.useFakeTimers();
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.unstubAllGlobals();
    __resetLocalOnlyRejectionsForTests();
  });

  it("shows the notice on the first render and never calls the API", async () => {
    renderClient({ locality: "remote", remoteBlockedPaths: [PATH] });

    // No waiting: the notice is there before any timer or request resolves.
    expect(screen.getByText(NOTICE_TITLE)).toBeTruthy();
    expect(screen.queryByText("Loading")).toBeNull();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(90_000);
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("turns a LOCAL_ONLY rejection into the notice: no raw code, no retry, no more polling", async () => {
    fetchMock.mockResolvedValue(localOnlyRejection());
    const { container } = renderClient();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(screen.getByText(NOTICE_TITLE)).toBeTruthy();
    expect(container.textContent).not.toMatch(/LOCAL_ONLY|403/);
    expect(screen.queryByRole("button", { name: "Retry" })).toBeNull();

    const callsAfterRejection = fetchMock.mock.calls.length;
    await act(async () => {
      await vi.advanceTimersByTimeAsync(90_000);
    });
    expect(fetchMock.mock.calls.length).toBe(callsAfterRejection);
  });

  it("keeps the retryable error for a 403 that is not the local-only rejection", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ error: "Access denied" }), { status: 403 })
    );
    renderClient();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(screen.queryByText(NOTICE_TITLE)).toBeNull();
    expect(screen.getByRole("button", { name: "Retry" })).toBeTruthy();
  });

  it("still loads the list when the server serves the route to this session", async () => {
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({
          connections: [],
          breakers: [],
          window: { sinceMs: 0, untilMs: 1, now: 1 },
          meta: {
            totalConnections: 0,
            coolingDownCount: 0,
            unhealthyBreakerCount: 0,
            countsCapped: false,
            degraded: [],
          },
        }),
        { status: 200 }
      )
    );
    // Remote session, but the guard does not block this path (e.g. a GET exemption).
    renderClient({ locality: "remote", remoteBlockedPaths: [] });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(NOTICE_TITLE)).toBeNull();
    expect(screen.getByText("No connections")).toBeTruthy();
  });
});
