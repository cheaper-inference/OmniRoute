// @vitest-environment jsdom
/**
 * KEA-9385 — embedded service status on a remote dashboard.
 *
 * `/api/services/<name>/status` is a local-only route for every service except the read-only
 * CLIProxyAPI status. Each service tab polled it every 5 s from several components, so a remote
 * session got a steady stream of 403s and a card reading "HTTP 403".
 */
import React from "react";
import { act, cleanup, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import messages from "../../../src/i18n/messages/en.json";
import ServicesPage from "../../../src/app/(dashboard)/dashboard/providers/services/page";
import { ServiceStatusCard } from "../../../src/app/(dashboard)/dashboard/providers/services/components/ServiceStatusCard";
import type { LocalOnlyAccessSnapshot } from "../../../src/shared/constants/localOnlyFeatures";
import { LocalOnlyAccessProvider } from "../../../src/shared/hooks/useLocalOnlyAccess";
import { __resetLocalOnlyRejectionsForTests } from "../../../src/shared/utils/localOnlyAccess";

const nav = vi.hoisted(() => ({ tab: "cliproxy" }));
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => new URLSearchParams({ tab: nav.tab }),
}));

// vi.mock is hoisted: the paths must be literals.
vi.mock(
  "../../../src/app/(dashboard)/dashboard/providers/services/tabs/CliproxyServiceTab",
  () => ({
    CliproxyServiceTab: () => <div>tab:cliproxy</div>,
  })
);
vi.mock(
  "../../../src/app/(dashboard)/dashboard/providers/services/tabs/NinerouterServiceTab",
  () => ({
    NinerouterServiceTab: () => <div>tab:9router</div>,
  })
);
vi.mock("../../../src/app/(dashboard)/dashboard/providers/services/tabs/MuxServiceTab", () => ({
  MuxServiceTab: () => <div>tab:mux</div>,
}));
vi.mock("../../../src/app/(dashboard)/dashboard/providers/services/tabs/BifrostServiceTab", () => ({
  BifrostServiceTab: () => <div>tab:bifrost</div>,
}));
vi.mock("../../../src/app/(dashboard)/dashboard/providers/services/tabs/DarioServiceTab", () => ({
  DarioServiceTab: () => <div>tab:dario</div>,
}));
vi.mock("../../../src/app/(dashboard)/dashboard/providers/services/tabs/OpenwaServiceTab", () => ({
  OpenwaServiceTab: () => <div>tab:openwa</div>,
}));
vi.mock(
  "../../../src/app/(dashboard)/dashboard/providers/services/tabs/LlmlinguaServiceTab",
  () => ({
    LlmlinguaServiceTab: () => <div>tab:llmlingua</div>,
  })
);
vi.mock(
  "../../../src/app/(dashboard)/dashboard/providers/services/tabs/OpencodeServerServiceTab",
  () => ({
    OpencodeServerServiceTab: () => <div>tab:opencode-server</div>,
  })
);
vi.mock("../../../src/app/(dashboard)/dashboard/providers/services/tabs/SingboxServiceTab", () => ({
  SingboxServiceTab: () => <div>tab:singbox</div>,
}));

const NOTICE_TITLE = "Only available on the local machine";
const GATED_SERVICES = [
  "9router",
  "mux",
  "bifrost",
  "dario",
  "openwa",
  "llmlingua",
  "opencode-server",
  "singbox",
];
const statusPath = (name: string) => `/api/services/${name}/status`;

/** What the server reports to a remote session: every status route but CLIProxyAPI's. */
const REMOTE: LocalOnlyAccessSnapshot = {
  locality: "remote",
  remoteBlockedPaths: GATED_SERVICES.map(statusPath),
};

const localOnlyRejection = () =>
  new Response(
    JSON.stringify({
      error: { code: "LOCAL_ONLY", message: "This endpoint requires localhost access" },
    }),
    { status: 403 }
  );

function withProviders(node: React.ReactNode, access?: LocalOnlyAccessSnapshot) {
  const tree = (
    <NextIntlClientProvider locale="en" timeZone="UTC" messages={messages}>
      {node}
    </NextIntlClientProvider>
  );
  return access ? <LocalOnlyAccessProvider value={access}>{tree}</LocalOnlyAccessProvider> : tree;
}

describe("embedded service status on a remote dashboard (KEA-9385)", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.useFakeTimers();
    nav.tab = "cliproxy";
    fetchMock = vi.fn(async () => localOnlyRejection());
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.unstubAllGlobals();
    __resetLocalOnlyRejectionsForTests();
  });

  it("a known-remote session gets the notice and the status is never polled", async () => {
    render(withProviders(<ServiceStatusCard name="mux" />, REMOTE));

    expect(screen.getByText(NOTICE_TITLE)).toBeTruthy();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(30_000);
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("a LOCAL_ONLY rejection shows the notice instead of 'HTTP 403' and stops the polling", async () => {
    render(withProviders(<ServiceStatusCard name="mux" />));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(screen.getByText(NOTICE_TITLE)).toBeTruthy();
    expect(screen.queryByText("HTTP 403")).toBeNull();

    const callsAfterRejection = fetchMock.mock.calls.length;
    await act(async () => {
      await vi.advanceTimersByTimeAsync(30_000);
    });
    expect(fetchMock.mock.calls.length).toBe(callsAfterRejection);
  });

  it("the Services page keeps the CLIProxyAPI tab for a remote session", () => {
    render(withProviders(<ServicesPage />, REMOTE));

    expect(document.body.textContent).toContain("tab:cliproxy");
    expect(screen.queryByTestId("local-only-notice")).toBeNull();
  });

  it.each(GATED_SERVICES)("the Services page shows the notice instead of the %s tab", (name) => {
    nav.tab = name;
    render(withProviders(<ServicesPage />, REMOTE));

    expect(document.body.textContent).not.toContain(`tab:${name}`);
    expect(screen.getAllByTestId("local-only-notice")).toHaveLength(1);
  });

  it("a local session keeps a local-only service tab", () => {
    nav.tab = "mux";
    render(withProviders(<ServicesPage />, { ...REMOTE, locality: "local" }));

    expect(document.body.textContent).toContain("tab:mux");
    expect(screen.queryByTestId("local-only-notice")).toBeNull();
  });
});
