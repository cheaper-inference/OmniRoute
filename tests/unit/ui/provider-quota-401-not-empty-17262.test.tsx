// @vitest-environment jsdom
//
// #17262 / #17877: with requireLogin=false (desktop app, no session cookie)
// GET /api/providers/client is hard-gated (ALWAYS_PROTECTED) and answers 401
// AUTH_001 while /api/providers and /api/usage/provider-limits answer 200.
// ProviderQuotaWidget used to swallow the 401 as `{}` and render the empty state
// "No Providers Connected" - indistinguishable from "no connections".
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

import ProviderQuotaWidget from "../../../src/app/(dashboard)/home/ProviderQuotaWidget";

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;

const CONNECTION = {
  id: "conn-codex-1",
  provider: "codex",
  authType: "oauth",
  name: "work",
  email: "dev@example.com",
  isActive: true,
};

function jsonResponse(status: number, body: unknown) {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  }) as Promise<Response>;
}

function installFetch(opts: { clientStatus: number; providersStatus: number }) {
  vi.stubGlobal(
    "fetch",
    vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.startsWith("/api/providers/client")) {
        return opts.clientStatus === 200
          ? jsonResponse(200, { connections: [] })
          : jsonResponse(opts.clientStatus, {
              error: { code: "AUTH_001", message: "Authentication required" },
            });
      }
      if (url === "/api/providers") {
        return opts.providersStatus === 200
          ? jsonResponse(200, { connections: [CONNECTION] })
          : jsonResponse(opts.providersStatus, { error: { code: "AUTH_001" } });
      }
      if (url.startsWith("/api/usage/provider-limits")) {
        return jsonResponse(200, { caches: { [CONNECTION.id]: { quotas: {} } } });
      }
      return jsonResponse(404, {});
    })
  );
}

async function render() {
  await act(async () => {
    root.render(<ProviderQuotaWidget />);
  });
  // Poll until the loading spinner is gone (slow CI runners need more than a fixed wait).
  for (let i = 0; i < 100 && (container.textContent ?? "").includes("Loading"); i++) {
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });
  }
  return container.textContent ?? "";
}

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

describe("ProviderQuotaWidget when /api/providers/client answers 401 (#17262)", () => {
  it("does not claim 'No Providers Connected' for an auth failure", async () => {
    installFetch({ clientStatus: 401, providersStatus: 401 });
    const text = await render();
    expect(text).not.toContain("No Providers Connected");
    expect(text).toContain("Authentication required");
  });

  it("falls back to /api/providers and shows the connection", async () => {
    installFetch({ clientStatus: 401, providersStatus: 200 });
    const text = await render();
    expect(text).not.toContain("No Providers Connected");
    expect(text).not.toContain("Authentication required");
    expect(text).toContain("work");
  });

  it("keeps the empty state for a genuinely empty 200 list", async () => {
    installFetch({ clientStatus: 200, providersStatus: 200 });
    const text = await render();
    expect(text).toContain("No Providers Connected");
  });
});
