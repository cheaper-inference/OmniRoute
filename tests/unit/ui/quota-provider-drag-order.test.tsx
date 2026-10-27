// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// QuotaCard pulls provider icons/next runtime bits that are irrelevant here —
// the grid's provider grouping, ordering and drag handles are what is tested.
vi.mock("../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/QuotaCard", () => ({
  default: ({ connection }: { connection: { id: string } }) => (
    <div data-testid="quota-card">{connection.id}</div>
  ),
}));

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

const { default: QuotaCardGrid } =
  await import("../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/QuotaCardGrid");
const { useQuotaProviderOrder } =
  await import("../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/useQuotaProviderOrder");
const { PROVIDER_ORDER } =
  await import("../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/constants");

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

let container: HTMLDivElement | null = null;
let root: Root | null = null;

function jsonResponse(body: unknown, ok = true) {
  return { ok, status: ok ? 200 : 500, json: async () => body } as Response;
}

async function mount(element: React.ReactElement) {
  (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement("div");
  document.body.appendChild(container);
  await act(async () => {
    root = createRoot(container!);
    root.render(element);
  });
}

async function flush() {
  await act(async () => {
    for (let i = 0; i < 5; i += 1) await Promise.resolve();
  });
}

function renderGrid(props: Partial<React.ComponentProps<typeof QuotaCardGrid>> = {}) {
  return (
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
      {...props}
    />
  );
}

function sectionOrder(): string[] {
  return [...container!.querySelectorAll("details h3")].map((h) => h.textContent || "");
}

function handles(): HTMLButtonElement[] {
  return [...container!.querySelectorAll<HTMLButtonElement>("button[aria-label^='Drag']")];
}

afterEach(() => {
  if (root) act(() => root!.unmount());
  container?.remove();
  container = null;
  root = null;
});

describe("QuotaCardGrid provider drag order", () => {
  it("keeps the built-in PROVIDER_ORDER layout when no custom order is given", async () => {
    await mount(renderGrid());
    expect(sectionOrder()).toEqual(["Antigravity", "OpenAI Codex", "Claude Code"]);
    expect(handles()).toHaveLength(0);
  });

  it("orders sections by the provided rank map and shows one grip per provider", async () => {
    const ranks = { ...PROVIDER_ORDER, claude: -2, antigravity: -1 };
    await mount(renderGrid({ providerOrder: ranks, onReorderProviders: () => {} }));
    expect(sectionOrder()).toEqual(["Claude Code", "Antigravity", "OpenAI Codex"]);
    const grips = handles();
    expect(grips).toHaveLength(3);
    expect(grips[0].getAttribute("aria-label")).toBe("Drag to reorder providers: Claude Code");
    expect(grips.every((g) => !g.disabled)).toBe(true);
  });

  it("grabbing the grip does not collapse the provider section", async () => {
    await mount(renderGrid({ onReorderProviders: () => {} }));
    const details = container!.querySelector("details")!;
    expect(details.open).toBe(true);
    await act(async () => {
      handles()[0].click();
    });
    expect(details.open).toBe(true);
  });

  it("disables the grips while saving and hides them in compact mode", async () => {
    await mount(renderGrid({ onReorderProviders: () => {}, dragDisabled: true }));
    expect(handles()).toHaveLength(3);
    expect(handles().every((g) => g.disabled)).toBe(true);
    act(() => root!.unmount());
    root = null;
    container?.remove();
    await mount(renderGrid({ onReorderProviders: () => {}, compact: true }));
    expect(handles()).toHaveLength(0);
  });
});

describe("useQuotaProviderOrder", () => {
  type HookState = ReturnType<typeof useQuotaProviderOrder>;
  let state: HookState | null = null;
  const notify = { error: vi.fn() };
  const tr = (_key: string, fallback: string) => fallback;

  function Probe() {
    const value = useQuotaProviderOrder(tr, notify);
    React.useEffect(() => {
      state = value;
    });
    return null;
  }

  beforeEach(() => {
    mockFetch.mockReset();
    notify.error.mockReset();
    state = null;
  });

  it("loads the saved order and ranks listed providers first", async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse({ quotaProviderOrder: ["claude", "codex"] }));
    await mount(<Probe />);
    await flush();
    expect(mockFetch).toHaveBeenCalledWith("/api/settings", { cache: "no-store" });
    expect(state!.hasCustomOrder).toBe(true);
    expect(state!.providerRankMap.claude).toBeLessThan(state!.providerRankMap.codex);
    expect(state!.providerRankMap.codex).toBeLessThan(state!.providerRankMap.antigravity);
  });

  it("without a saved order the rank map is exactly PROVIDER_ORDER", async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse({}));
    await mount(<Probe />);
    await flush();
    expect(state!.hasCustomOrder).toBe(false);
    expect(state!.providerRankMap).toBe(PROVIDER_ORDER);
  });

  it("persists a drag via PATCH /api/settings with the moved sequence", async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse({}));
    await mount(<Probe />);
    await flush();
    mockFetch.mockResolvedValueOnce(jsonResponse({ ok: true }));
    await act(async () => {
      state!.reorderProviders(["antigravity", "codex", "claude"], "claude", "antigravity");
    });
    await flush();
    const [url, init] = mockFetch.mock.calls[1];
    expect(url).toBe("/api/settings");
    expect(init.method).toBe("PATCH");
    expect(JSON.parse(init.body)).toEqual({
      quotaProviderOrder: ["claude", "antigravity", "codex"],
    });
    expect(state!.providerRankMap.claude).toBeLessThan(state!.providerRankMap.antigravity);
    expect(notify.error).not.toHaveBeenCalled();
  });

  it("a same-provider drop is a no-op (nothing persisted)", async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse({}));
    await mount(<Probe />);
    await flush();
    await act(async () => {
      state!.reorderProviders(["antigravity", "codex"], "codex", "codex");
    });
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("rolls back, notifies and re-reads the server order when the save fails", async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse({ quotaProviderOrder: ["codex"] }));
    await mount(<Probe />);
    await flush();
    mockFetch
      .mockResolvedValueOnce(jsonResponse({ error: "boom" }, false))
      .mockResolvedValueOnce(jsonResponse({ quotaProviderOrder: ["codex"] }));
    await act(async () => {
      state!.reorderProviders(["codex", "antigravity", "claude"], "claude", "codex");
    });
    await flush();
    expect(notify.error).toHaveBeenCalledWith("Failed to save the provider order");
    expect(mockFetch).toHaveBeenCalledTimes(3);
    expect(mockFetch.mock.calls[2][0]).toBe("/api/settings");
    expect(state!.providerRankMap.codex).toBeLessThan(state!.providerRankMap.claude);
    expect(state!.savingProviderOrder).toBe(false);
  });

  it("reset writes an empty order and restores PROVIDER_ORDER", async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse({ quotaProviderOrder: ["claude"] }));
    await mount(<Probe />);
    await flush();
    mockFetch.mockResolvedValueOnce(jsonResponse({ ok: true }));
    await act(async () => {
      state!.resetProviderOrder();
    });
    await flush();
    expect(JSON.parse(mockFetch.mock.calls[1][1].body)).toEqual({ quotaProviderOrder: [] });
    expect(state!.hasCustomOrder).toBe(false);
    expect(state!.providerRankMap).toBe(PROVIDER_ORDER);
  });
});
