// @vitest-environment jsdom
/**
 * KEA-9360 — Traffic Inspector on a remote dashboard.
 *
 * Every Traffic Inspector API (sessions, capture modes, the TPROXY status under
 * /api/tools/agent-bridge/, the live WebSocket) is a local-only route. A remote session got a
 * working-looking, permanently empty inspector and a stream of silent 403s.
 */
import React from "react";
import { act, cleanup, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import messages from "../../../src/i18n/messages/en.json";
import { TrafficInspectorPageClient } from "../../../src/app/(dashboard)/dashboard/tools/traffic-inspector/TrafficInspectorPageClient";
import type { LocalOnlyAccessSnapshot } from "../../../src/shared/constants/localOnlyFeatures";
import { LocalOnlyAccessProvider } from "../../../src/shared/hooks/useLocalOnlyAccess";
import { __resetLocalOnlyRejectionsForTests } from "../../../src/shared/utils/localOnlyAccess";

// vi.mock is hoisted: the paths must be literals.
vi.mock(
  "../../../src/app/(dashboard)/dashboard/tools/traffic-inspector/components/TopBarControls",
  () => ({ TopBarControls: () => null })
);
vi.mock(
  "../../../src/app/(dashboard)/dashboard/tools/traffic-inspector/components/RequestStreamingList",
  () => ({ RequestStreamingList: () => <div>request list</div> })
);
vi.mock(
  "../../../src/app/(dashboard)/dashboard/tools/traffic-inspector/components/DetailsPanel",
  () => ({ DetailsPanel: () => null })
);

const CAPTURE_MODES_PATH = "/api/tools/traffic-inspector/capture-modes";
const NOTICE_TITLE = "Only available on the local machine";

const localOnlyRejection = () =>
  new Response(
    JSON.stringify({
      error: { code: "LOCAL_ONLY", message: "This endpoint requires localhost access" },
    }),
    { status: 403 }
  );

let sockets: string[] = [];

class FakeWebSocket {
  static CLOSING = 2;
  readyState = 0;
  onopen: (() => void) | null = null;
  onmessage: (() => void) | null = null;
  onclose: (() => void) | null = null;
  onerror: (() => void) | null = null;
  constructor(url: string) {
    sockets.push(url);
  }
  close() {}
  send() {}
}

async function renderInspector(access?: LocalOnlyAccessSnapshot) {
  const page = (
    <NextIntlClientProvider locale="en" timeZone="UTC" messages={messages}>
      <TrafficInspectorPageClient title="Traffic Inspector" subtitle="Inspect traffic" />
    </NextIntlClientProvider>
  );
  await act(async () => {
    render(
      access ? <LocalOnlyAccessProvider value={access}>{page}</LocalOnlyAccessProvider> : page
    );
  });
  await act(async () => {});
}

describe("Traffic Inspector on a remote dashboard (KEA-9360)", () => {
  beforeEach(() => {
    sockets = [];
    vi.stubGlobal("WebSocket", FakeWebSocket);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    __resetLocalOnlyRejectionsForTests();
  });

  it("a known-remote session gets the notice: no request, no live socket", async () => {
    const fetchMock = vi.fn(async () => localOnlyRejection());
    vi.stubGlobal("fetch", fetchMock);

    await renderInspector({ locality: "remote", remoteBlockedPaths: [CAPTURE_MODES_PATH] });

    expect(screen.getByRole("heading", { name: "Traffic Inspector" })).toBeTruthy();
    expect(screen.getByText(NOTICE_TITLE)).toBeTruthy();
    expect(screen.queryByText("request list")).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(sockets).toHaveLength(0);
  });

  it("a LOCAL_ONLY rejection replaces the empty inspector with the notice", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => localOnlyRejection())
    );

    await renderInspector();

    expect(screen.getByText(NOTICE_TITLE)).toBeTruthy();
    expect(screen.queryByText("request list")).toBeNull();
    expect(document.body.textContent).not.toMatch(/LOCAL_ONLY|403/);
  });

  it("a local session keeps the inspector", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({}), { status: 200 }))
    );

    await renderInspector({ locality: "local", remoteBlockedPaths: [CAPTURE_MODES_PATH] });

    expect(screen.getByText("request list")).toBeTruthy();
    expect(screen.queryByText(NOTICE_TITLE)).toBeNull();
    expect(sockets).toHaveLength(1);
  });
});
