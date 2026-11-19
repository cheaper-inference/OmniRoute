// @vitest-environment jsdom
/**
 * The plugins page must tell the operator that plugins run with the full privileges of the
 * OmniRoute process. The manifest's `requires.permissions` is not a sandbox (it only selects
 * which environment variables the plugin process receives), so the notice is shown whether
 * or not any plugin is installed and cannot be dismissed.
 */

import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../src/i18n/messages/en.json";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => "/dashboard/plugins",
}));

vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => ({ addNotification: vi.fn() }),
}));

let pluginList: unknown[] = [];
vi.stubGlobal(
  "fetch",
  vi
    .fn()
    .mockImplementation(() =>
      Promise.resolve({ ok: true, json: async () => ({ plugins: pluginList }) })
    )
);

import PluginsPage from "../../../src/app/(dashboard)/dashboard/plugins/page";

describe("plugins page — full-privileges notice", () => {
  let container: HTMLDivElement;
  let root: ReturnType<typeof createRoot>;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    document.body.removeChild(container);
    pluginList = [];
  });

  async function renderPage() {
    await act(async () => {
      root.render(
        <NextIntlClientProvider locale="en" messages={{ plugins: messages.plugins }}>
          <PluginsPage />
        </NextIntlClientProvider>
      );
    });
  }

  function notice(): HTMLElement | null {
    return container.querySelector('[data-slot="alert"][data-variant="warning"]');
  }

  it("shows the notice when no plugin is installed", async () => {
    await renderPage();
    const alert = notice();
    expect(alert).not.toBeNull();
    expect(alert!.textContent).toContain(messages.plugins.privilegesWarningTitle);
    expect(alert!.textContent).toContain(messages.plugins.privilegesWarningBody);
    expect(alert!.querySelector("button.ci-alert__dismiss")).toBeNull();
  });

  it("shows the notice alongside installed plugins", async () => {
    pluginList = [
      { name: "demo", version: "1.0.0", status: "active", enabled: true, hooks: ["onRequest"] },
    ];
    await renderPage();
    expect(container.textContent).toContain("demo");
    expect(notice()?.textContent).toContain(messages.plugins.privilegesWarningTitle);
  });

  it("the notice says permissions are not a sandbox and to trust the plugin", () => {
    const body = messages.plugins.privilegesWarningBody;
    expect(body).toMatch(/whatever permissions its manifest declares/);
    expect(body).toMatch(/only plugins you trust/);
  });
});
