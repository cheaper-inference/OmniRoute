// @vitest-environment jsdom
import React from "react";
import { act, cleanup, render, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// #18344 (port of upstream decolua/9router#4920, idea by ape1121): the Quota
// Tracker provider order (#17026's useProviderOrder store) is saved to
// `settings.quotaProviderOrder` so it follows the operator across browsers, and
// the Full layout's collapsible provider sections get the same drag grips as
// the overview.

// QuotaCard pulls provider icons/next runtime bits that are irrelevant here.
vi.mock("../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/QuotaCard", () => ({
  default: ({ connection }: { connection: { id: string } }) => (
    <div data-testid="quota-card">{connection.id}</div>
  ),
}));

// Load the grid's module graph once while the file is collected, so the first
// test does not pay the cold transform inside its own timeout; every test still
// re-imports a fresh copy after vi.resetModules().
import "../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/QuotaCardGrid";

const DIR = "../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits";
const ORDER_KEY = "omniroute:limits:providerOrder";
const IDS = ["claude", "antigravity", "codex"];
const LABELS: Record<string, string> = {
  antigravity: "Antigravity",
  codex: "OpenAI Codex",
  claude: "Claude Code",
};
const CONNECTIONS = [
  { id: "cl-1", provider: "claude", isActive: true },
  { id: "ag-1", provider: "antigravity", isActive: true },
  { id: "cx-1", provider: "codex", isActive: true },
];

const mockFetch = vi.fn();

function jsonResponse(body: unknown, ok = true) {
  return { ok, status: ok ? 200 : 500, json: async () => body } as Response;
}

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((r) => {
    resolve = r;
  });
  return { promise, resolve };
}

function settingsGet(quotaProviderOrder: unknown) {
  return (_url: string, init?: RequestInit) =>
    Promise.resolve(
      !init?.method || init.method === "GET"
        ? jsonResponse({ quotaProviderOrder })
        : jsonResponse({ ok: true })
    );
}

function patchBodies(): unknown[] {
  return mockFetch.mock.calls
    .filter(([, init]) => (init as RequestInit | undefined)?.method === "PATCH")
    .map(([, init]) => JSON.parse(String((init as RequestInit).body)).quotaProviderOrder);
}

async function flush() {
  await act(async () => {
    for (let i = 0; i < 10; i += 1) await Promise.resolve();
  });
}

// The order store is module-level: every test gets a fresh copy.
async function loadHook() {
  return (await import(`${DIR}/useProviderOrder`)).useProviderOrder;
}

async function renderGrid() {
  const { default: QuotaCardGrid } = await import(`${DIR}/QuotaCardGrid`);
  const view = render(
    <QuotaCardGrid
      connections={CONNECTIONS}
      quotaData={{}}
      loading={{}}
      errors={{}}
      lastRefreshedAt={{}}
      emailsVisible={false}
      providerLabels={LABELS}
      onRefresh={() => {}}
      onOpenCutoff={() => {}}
      onToggleActive={() => {}}
      togglingActiveId={null}
    />
  );
  await flush();
  return view;
}

function sectionOrder(container: HTMLElement): string[] {
  return [...container.querySelectorAll("details h3")].map((h) => h.textContent?.trim() || "");
}

beforeEach(() => {
  vi.resetModules();
  localStorage.clear();
  mockFetch.mockReset();
  vi.stubGlobal("fetch", mockFetch);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  localStorage.clear();
});

describe("Quota Tracker Full layout drag grips", () => {
  it("renders one grip per provider section and grabbing it keeps the section open", async () => {
    mockFetch.mockImplementation(settingsGet([]));
    const { container } = await renderGrid();
    expect(sectionOrder(container)).toEqual(["Antigravity", "OpenAI Codex", "Claude Code"]);
    const grips = [...container.querySelectorAll<HTMLButtonElement>("details [data-drag-handle]")];
    expect(grips.map((g) => g.getAttribute("aria-label"))).toEqual([
      "Drag to reorder providers: Antigravity",
      "Drag to reorder providers: OpenAI Codex",
      "Drag to reorder providers: Claude Code",
    ]);
    const details = container.querySelector("details")!;
    expect(details.open).toBe(true);
    act(() => grips[0].click());
    expect(details.open).toBe(true);
    expect(container.querySelector("[data-reset-order]")).toBeNull();
  });

  it("hides the grip when a single provider is shown", async () => {
    mockFetch.mockImplementation(settingsGet([]));
    const { default: QuotaCardGrid } = await import(`${DIR}/QuotaCardGrid`);
    const { container } = render(
      <QuotaCardGrid
        connections={[CONNECTIONS[0]]}
        quotaData={{}}
        loading={{}}
        errors={{}}
        lastRefreshedAt={{}}
        emailsVisible={false}
        providerLabels={LABELS}
        onRefresh={() => {}}
        onOpenCutoff={() => {}}
        onToggleActive={() => {}}
        togglingActiveId={null}
      />
    );
    await flush();
    expect(container.querySelectorAll("[data-drag-handle]")).toHaveLength(0);
  });

  it("uses the server order and offers the reset action", async () => {
    mockFetch.mockImplementation(settingsGet(["claude", "codex", "antigravity"]));
    const { container } = await renderGrid();
    expect(sectionOrder(container)).toEqual(["Claude Code", "OpenAI Codex", "Antigravity"]);
    const resetButton = container.querySelector<HTMLButtonElement>("[data-reset-order]")!;
    expect(resetButton.textContent).toContain("Restore default order");
    act(() => resetButton.click());
    await flush();
    expect(sectionOrder(container)).toEqual(["Antigravity", "OpenAI Codex", "Claude Code"]);
    expect(patchBodies()).toEqual([[]]);
  });
});

describe("useProviderOrder server persistence (settings.quotaProviderOrder)", () => {
  it("a saved server order wins over this browser's cache and refreshes it", async () => {
    localStorage.setItem(ORDER_KEY, JSON.stringify(["codex", "claude", "antigravity"]));
    mockFetch.mockImplementation(settingsGet([" antigravity ", "claude", 42, "claude"]));
    const useProviderOrder = await loadHook();
    const { result } = renderHook(() => useProviderOrder(IDS));
    await flush();
    expect(mockFetch).toHaveBeenCalledWith("/api/settings", { cache: "no-store" });
    expect(result.current.order).toEqual(["antigravity", "claude", "codex"]);
    expect(JSON.parse(localStorage.getItem(ORDER_KEY)!)).toEqual(["antigravity", "claude"]);
    expect(patchBodies()).toEqual([]);
  });

  it("an empty or unreadable server order keeps the local order", async () => {
    localStorage.setItem(ORDER_KEY, JSON.stringify(["codex", "claude", "antigravity"]));
    mockFetch.mockImplementation(settingsGet([]));
    let useProviderOrder = await loadHook();
    let hook = renderHook(() => useProviderOrder(IDS));
    await flush();
    expect(hook.result.current.order).toEqual(["codex", "claude", "antigravity"]);
    hook.unmount();

    vi.resetModules();
    mockFetch.mockReset();
    mockFetch.mockRejectedValue(new Error("offline"));
    useProviderOrder = await loadHook();
    hook = renderHook(() => useProviderOrder(IDS));
    await flush();
    expect(hook.result.current.order).toEqual(["codex", "claude", "antigravity"]);
  });

  it("loads the server order once per page and writes reorder/reset through PATCH", async () => {
    mockFetch.mockImplementation(settingsGet([]));
    const useProviderOrder = await loadHook();
    const first = renderHook(() => useProviderOrder(IDS));
    const second = renderHook(() => useProviderOrder(IDS));
    await flush();
    expect(mockFetch).toHaveBeenCalledTimes(1);
    const reversed = [...first.result.current.order].reverse();
    act(() => first.result.current.reorder(reversed));
    await flush();
    expect(second.result.current.order).toEqual(reversed);
    act(() => second.result.current.reset());
    await flush();
    expect(patchBodies()).toEqual([reversed, []]);
    const patch = mockFetch.mock.calls.find(([, init]) => init?.method === "PATCH")!;
    expect(patch[0]).toBe("/api/settings");
    expect(patch[1].headers).toEqual({ "Content-Type": "application/json" });
  });

  it("a drag made before the settings response arrives is not overwritten by it", async () => {
    const get = deferred<Response>();
    mockFetch.mockImplementation((_url: string, init?: RequestInit) =>
      init?.method === "PATCH" ? Promise.resolve(jsonResponse({ ok: true })) : get.promise
    );
    const useProviderOrder = await loadHook();
    const { result } = renderHook(() => useProviderOrder(IDS));
    act(() => result.current.reorder(["codex", "antigravity", "claude"]));
    get.resolve(jsonResponse({ quotaProviderOrder: ["claude", "antigravity", "codex"] }));
    await flush();
    expect(result.current.order).toEqual(["codex", "antigravity", "claude"]);
  });

  it("serializes writes and coalesces queued ones so the latest order is saved last", async () => {
    const firstPatch = deferred<Response>();
    let patches = 0;
    mockFetch.mockImplementation((_url: string, init?: RequestInit) => {
      if (init?.method !== "PATCH") return Promise.resolve(jsonResponse({}));
      patches += 1;
      return patches === 1 ? firstPatch.promise : Promise.resolve(jsonResponse({ ok: true }));
    });
    const useProviderOrder = await loadHook();
    const { result } = renderHook(() => useProviderOrder(IDS));
    await flush();
    act(() => result.current.reorder(["codex", "antigravity", "claude"]));
    act(() => result.current.reorder(["claude", "codex", "antigravity"]));
    act(() => result.current.reorder(["antigravity", "claude", "codex"]));
    await flush();
    expect(patchBodies()).toHaveLength(1);
    firstPatch.resolve(jsonResponse({ ok: true }));
    await flush();
    expect(patchBodies()).toEqual([
      ["codex", "antigravity", "claude"],
      ["antigravity", "claude", "codex"],
    ]);
  });

  it("a failed save keeps the new order in this browser", async () => {
    mockFetch.mockImplementation((_url: string, init?: RequestInit) =>
      init?.method === "PATCH"
        ? Promise.reject(new Error("offline"))
        : Promise.resolve(jsonResponse({}))
    );
    const useProviderOrder = await loadHook();
    const { result } = renderHook(() => useProviderOrder(IDS));
    act(() => result.current.reorder(["codex", "antigravity", "claude"]));
    await flush();
    expect(result.current.order).toEqual(["codex", "antigravity", "claude"]);
    expect(JSON.parse(localStorage.getItem(ORDER_KEY)!)).toEqual([
      "codex",
      "antigravity",
      "claude",
    ]);
  });
});
