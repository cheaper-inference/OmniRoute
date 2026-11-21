// @vitest-environment jsdom
/**
 * KEA-9385 — Plugins page on a remote dashboard.
 *
 * `/api/plugins` is a local-only route. A remote session got the "no plugins" empty state and a
 * "Scan for plugins" button that could only fail, as if nothing were installed.
 */
import React from "react";
import { act, cleanup, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, describe, expect, it, vi } from "vitest";

import messages from "../../../src/i18n/messages/en.json";
import PluginsPage from "../../../src/app/(dashboard)/dashboard/plugins/page";
import type { LocalOnlyAccessSnapshot } from "../../../src/shared/constants/localOnlyFeatures";
import { LocalOnlyAccessProvider } from "../../../src/shared/hooks/useLocalOnlyAccess";
import { __resetLocalOnlyRejectionsForTests } from "../../../src/shared/utils/localOnlyAccess";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => "/dashboard/plugins",
}));
vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => ({ addNotification: vi.fn() }),
}));

const PLUGINS_PATH = "/api/plugins";
const NOTICE_TITLE = "Only available on the local machine";

function localOnlyRejection(): Response {
  return new Response(
    JSON.stringify({
      error: { code: "LOCAL_ONLY", message: "This endpoint requires localhost access" },
    }),
    { status: 403 }
  );
}

async function renderPage(access?: LocalOnlyAccessSnapshot) {
  const page = (
    <NextIntlClientProvider locale="en" timeZone="UTC" messages={messages}>
      <PluginsPage />
    </NextIntlClientProvider>
  );
  await act(async () => {
    render(
      access ? <LocalOnlyAccessProvider value={access}>{page}</LocalOnlyAccessProvider> : page
    );
  });
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  __resetLocalOnlyRejectionsForTests();
});

describe("Plugins page on a remote dashboard (KEA-9385)", () => {
  it("a known-remote session gets the notice and no request", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await renderPage({ locality: "remote", remoteBlockedPaths: [PLUGINS_PATH] });

    expect(screen.getByRole("heading", { name: messages.plugins.title })).toBeTruthy();
    expect(screen.getByText(NOTICE_TITLE)).toBeTruthy();
    expect(screen.queryByText(messages.plugins.noPlugins)).toBeNull();
    expect(screen.queryByRole("button", { name: messages.plugins.scanForPlugins })).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("a LOCAL_ONLY rejection is not 'no plugins': notice, no scan button, no raw code", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => localOnlyRejection())
    );

    await renderPage();

    expect(screen.getByText(NOTICE_TITLE)).toBeTruthy();
    expect(screen.queryByText(messages.plugins.noPlugins)).toBeNull();
    expect(screen.queryByRole("button", { name: messages.plugins.scanForPlugins })).toBeNull();
    expect(document.body.textContent).not.toMatch(/LOCAL_ONLY|403/);
  });

  it("a local session still lists its plugins", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(
            JSON.stringify({
              plugins: [
                { name: "demo", version: "1.0.0", status: "active", enabled: true, hooks: [] },
              ],
            }),
            { status: 200 }
          )
      )
    );

    await renderPage({ locality: "local", remoteBlockedPaths: [PLUGINS_PATH] });

    expect(screen.getByText("demo")).toBeTruthy();
    expect(screen.queryByText(NOTICE_TITLE)).toBeNull();
    expect(screen.getByRole("button", { name: messages.plugins.scanForPlugins })).toBeTruthy();
  });
});
