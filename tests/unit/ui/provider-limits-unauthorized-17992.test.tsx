import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

import ProviderLimits from "../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits";

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;

beforeEach(() => {
  localStorage.clear();
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

describe("Provider Quota unauthorized first paint (#17992)", () => {
  for (const fallbackStatus of [200, 401, 403]) {
    it(`replaces both skeletons with visible content after 401 and fallback ${fallbackStatus}`, async () => {
      const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input);
        const status =
          url === "/api/providers/client" ? 401 : url === "/api/providers" ? fallbackStatus : 200;
        const body = url === "/api/providers" && status === 200 ? { connections: [] } : {};
        return new Response(JSON.stringify(body), {
          status,
          headers: { "content-type": "application/json" },
        });
      });
      vi.stubGlobal("fetch", fetchMock);
      await act(async () => {
        root.render(<ProviderLimits />);
      });
      await vi.waitFor(() => {
        expect(container.querySelector('[aria-hidden="true"][data-slot="card"]')).toBeNull();
        expect(container.textContent).toContain(
          fallbackStatus === 200 ? "noProviders" : "quotaAuthRequired"
        );
      });
      expect(container.textContent).toContain(
        fallbackStatus === 200 ? "connectProvidersForQuota" : "quotaAuthRequiredHint"
      );
      expect(fetchMock.mock.calls.map(([input]) => String(input))).toContain("/api/providers");
    });
  }
});
