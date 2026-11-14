// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock(
  "../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaParsing",
  () => ({
    parseQuotaData: () =>
      [1, 2, 3, 4, 5].map((n) => ({
        name: `quota-${n}`,
        displayName: `quota-${n}`,
        remainingPercentage: 50,
      })),
  })
);

import ProviderQuotaWidget from "../../../src/app/(dashboard)/home/ProviderQuotaWidget";

const CONNECTION = { id: "c1", provider: "claude", authType: "oauth", name: "main" };

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;

function jsonResponse(body: unknown) {
  return Promise.resolve({ ok: true, status: 200, json: async () => body }) as Promise<Response>;
}

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  vi.stubGlobal(
    "fetch",
    vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.startsWith("/api/usage/provider-limits")) {
        return jsonResponse({ caches: { c1: { quotas: {} } } });
      }
      return jsonResponse({ connections: [CONNECTION] });
    })
  );
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

async function render(showAllQuotas?: boolean) {
  await act(async () => {
    root.render(<ProviderQuotaWidget showAllQuotas={showAllQuotas} />);
  });
  for (let i = 0; i < 100 && !(container.textContent ?? "").includes("quota-1"); i++) {
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });
  }
  return container.textContent ?? "";
}

describe("ProviderQuotaWidget showAllQuotas", () => {
  it("shows only the primary quotas and the toggle by default", async () => {
    const text = await render();

    expect(text).toContain("quota-3");
    expect(text).not.toContain("quota-4");
    expect(container.querySelector("button[aria-expanded]")).toBeTruthy();
  });

  it("shows every quota and no toggle when showAllQuotas is set", async () => {
    const text = await render(true);

    expect(text).toContain("quota-4");
    expect(text).toContain("quota-5");
    expect(container.querySelector("button[aria-expanded]")).toBeNull();
  });
});
