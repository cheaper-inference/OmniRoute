// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));
vi.mock("@/store/emailPrivacyStore", () => ({ default: () => ({ emailsVisible: true }) }));
vi.mock("next-intl", async () => {
  const { default: en } = await import("../../../src/i18n/messages/en.json");
  return {
    useLocale: () => "en",
    useTranslations:
      (namespace: string) =>
      (key: string, params: Record<string, string> = {}) => {
        let value: unknown = en;
        for (const segment of `${namespace}.${key}`.split(".")) {
          value = value && typeof value === "object" ? Reflect.get(value, segment) : undefined;
        }
        return typeof value === "string"
          ? value.replace(/\{(\w+)\}/g, (_, name: string) => params[name] ?? `{${name}}`)
          : key;
      },
  };
});
const RequestLoggerV2 = (await import("@/shared/components/RequestLoggerV2")).default;
let root: Root;
let container: HTMLElement;
const rows = [
  {
    id: "burst",
    model: "burst-model",
    duration: 10_000,
    ttft: 9900,
    tokens: { in: 1, out: 1000, reasoning: 800 },
  },
  {
    id: "steady",
    model: "steady-model",
    duration: 1000,
    ttft: 500,
    tokens: { in: 1, out: 500, reasoning: 0 },
  },
  {
    id: "unknown",
    model: "unknown-model",
    duration: null,
    ttft: null,
    tokens: { in: 1, out: 500, reasoning: 0 },
  },
].map((row, i) => ({
  ...row,
  provider: "openai",
  status: 200,
  timestamp: `2026-10-21T12:00:0${i}.000Z`,
}));
beforeEach(() => {
  localStorage.clear();
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.startsWith("/api/usage/call-logs")) return Response.json(rows);
      if (url.startsWith("/api/provider-nodes")) return Response.json({ nodes: [] });
      if (url.startsWith("/api/logs/detail")) return Response.json({ enabled: false });
      return Response.json({});
    })
  );
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});
async function render() {
  await act(async () => {
    root.render(<RequestLoggerV2 />);
  });
}
function rowFor(model: string) {
  const row = [...container.querySelectorAll("tbody tr")].find((r) =>
    r.textContent?.includes(model)
  );
  expect(row).toBeDefined();
  return row!;
}
it("renders two labeled rates and a keyboard-accessible explanation of buffered delivery", async () => {
  await render();
  const row = rowFor("burst-model");
  expect(row.textContent).toContain("Post-first-token");
  expect(row.textContent).toContain("10,000");
  expect(row.textContent).toContain("End-to-end");
  const metrics = row.querySelector<HTMLElement>('[role="group"]');
  expect(metrics?.tabIndex).toBe(0);
  expect(metrics?.getAttribute("aria-label")).toContain("100 tokens/sec");
  expect(metrics?.getAttribute("aria-label")).toContain("buffered");
  expect(metrics?.getAttribute("aria-label")).toContain("TTFT 9.9s");
  expect(metrics?.getAttribute("aria-label")).toContain("generation 0.1s");
  expect(metrics?.getAttribute("aria-label")).toContain("reasoning 800 tok");
  expect(metrics?.title).toBe(metrics?.getAttribute("aria-label"));
  const unavailable = rowFor("unknown-model").querySelector('[role="group"]');
  expect(unavailable?.textContent).toContain("—");
  expect(unavailable?.textContent).not.toContain("NaN");
});
it("keeps ascending/descending header sorting on post-first-token rate, not E2E", async () => {
  await render();
  // The TPS header is the UI kit's SortableTableHead (button inside a <th> that
  // owns aria-sort), so locate it by the column label instead of a custom aria-label.
  const tpsHead = [...container.querySelectorAll<HTMLElement>("thead th")].find(
    (th) => th.textContent?.trim() === "TPS"
  );
  expect(tpsHead).toBeDefined();
  expect(tpsHead!.getAttribute("aria-sort")).toBe("none");
  const button = tpsHead!.querySelector<HTMLButtonElement>("button");
  expect(button).not.toBeNull();
  await act(async () => button!.click());
  const visibleModels = () =>
    [...container.querySelectorAll("tbody tr")].map(
      (row) => rows.find((r) => row.textContent?.includes(r.model))?.id
    );
  expect(visibleModels()).toEqual(["burst", "steady", "unknown"]);
  expect(button!.closest("th")?.getAttribute("aria-sort")).toBe("descending");
  await act(async () => button!.click());
  expect(visibleModels()).toEqual(["unknown", "steady", "burst"]);
  expect(button!.closest("th")?.getAttribute("aria-sort")).toBe("ascending");
});
