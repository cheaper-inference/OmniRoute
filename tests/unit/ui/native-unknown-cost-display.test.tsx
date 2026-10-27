// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("next-intl", () => {
  const cache = new Map<string, (key: string, values?: Record<string, unknown>) => string>();
  return {
    useTranslations: (namespace: string) => {
      if (!cache.has(namespace))
        cache.set(
          namespace,
          (key, values) =>
            `${namespace}.${key}${values?.count === undefined ? "" : `:${values.count}`}`
        );
      return cache.get(namespace)!;
    },
  };
});
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));
vi.mock("@/shared/components/Card", () => ({
  default: ({ children }: { children: React.ReactNode }) => <section>{children}</section>,
}));
vi.mock("@/shared/components/Badge", () => ({
  default: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));
vi.mock("@/shared/components/Toggle", () => ({ default: () => null }));
vi.mock("@/shared/components/Loading", () => ({ CardSkeleton: () => <p>Loading</p> }));
vi.mock("@/shared/components/SegmentedControl", () => ({
  default: ({
    options,
    onChange,
  }: {
    options: Array<{ value: string; label: string }>;
    onChange: (value: string) => void;
  }) => (
    <div>
      {options.map((option) => (
        <button key={option.value} onClick={() => onChange(option.value)}>
          {option.label}
        </button>
      ))}
    </div>
  ),
}));
vi.mock("@omniroute/ui-kit/data-table-shell", () => ({
  SortableTableHead: ({ children }: { children: React.ReactNode }) => <th>{children}</th>,
}));
vi.mock("@omniroute/ui-kit/table", () => ({
  Table: ({ children }: { children: React.ReactNode }) => <table>{children}</table>,
  TableHeader: ({ children }: { children: React.ReactNode }) => <thead>{children}</thead>,
  TableBody: ({ children }: { children: React.ReactNode }) => <tbody>{children}</tbody>,
  TableRow: ({ children }: { children: React.ReactNode }) => <tr>{children}</tr>,
  TableCell: ({ children }: { children: React.ReactNode }) => <td>{children}</td>,
}));
vi.mock("@/shared/components/Modal", () => ({
  default: ({ children }: { children: React.ReactNode }) => <section>{children}</section>,
}));
vi.mock("@/shared/components/Icon", () => ({ default: () => null }));
vi.mock("@omniroute/ui-kit/slider", () => ({
  Slider: ({ disabled, "aria-label": label }: { disabled: boolean; "aria-label": string }) => (
    <input type="range" disabled={disabled} aria-label={label} />
  ),
}));
let host: HTMLDivElement;
let root: Root;
let fetchMock: ReturnType<typeof vi.fn>;
beforeEach(() => {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  host = document.createElement("div");
  document.body.appendChild(host);
  root = createRoot(host);
  fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(async () => {
  await act(async () => root.unmount());
  host.remove();
  vi.unstubAllGlobals();
});
const json = (body: unknown) =>
  new Response(JSON.stringify(body), { headers: { "Content-Type": "application/json" } });
const partial = { costStatus: "partial", unpricedNativeCount: 2 };
const statRow = {
  rawModel: "synthetic/decision",
  provider: "synthetic",
  account: "Fixture",
  requests: 2,
  promptTokens: 5,
  completionTokens: 2,
  cost: 0,
  lastUsed: "2026-10-27T00:00:00Z",
};
async function stats(extra: Record<string, unknown>) {
  const { default: UsageStats } = await import("../../../src/shared/components/UsageStats");
  fetchMock.mockResolvedValue(
    json({
      totalRequests: 2,
      totalTokens: 7,
      totalCost: 0,
      byModel: { model: statRow },
      byAccount: {},
      ...extra,
    })
  );
  await act(async () => root.render(<UsageStats />));
}
const row = {
  apiKeyKey: "fixture",
  apiKeyId: "fixture",
  apiKeyName: "Restricted fixture",
  requests: 2,
  totalTokens: 7,
  costUsd: 0,
  limitUsd: null,
  limitPeriod: null,
  limitUsedPercent: null,
  budgetResetAt: null,
  lastUsed: null,
};
const windowPayload = {
  provider: "synthetic",
  connectionId: "fixture",
  windowStartAt: "2026-10-27T00:00:00Z",
  windowResetAt: "2026-10-28T00:00:00Z",
  windowSource: "provider_weekly_reset",
  windowStartSource: "recorded_reset_event",
  quotaName: "Fixture",
  quotaUsedPercent: 25,
  quotaRemainingPercent: 75,
  totalCostUsd: 0,
  estimatedFullQuotaUsd: null,
  rows: [row],
};
async function modal(payload: unknown) {
  const { default: Modal } =
    await import("../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/ProviderUsdCostModal");
  fetchMock.mockResolvedValue(json(payload));
  await act(async () =>
    root.render(
      <Modal
        isOpen
        onClose={vi.fn()}
        connection={{ provider: "synthetic", id: "fixture" }}
        providerLabel="Synthetic"
        accountLabel="Fixture"
      />
    )
  );
}

describe("partial native cost display", () => {
  it("labels zero known subtotal and unpriced counts at stats total/model/account without calling them free", async () => {
    await stats({
      ...partial,
      byModel: { model: { ...statRow, ...partial } },
      byAccount: { account: { ...statRow, ...partial } },
    });
    expect(host.textContent).toContain("stats.knownSubtotal");
    expect(host.textContent).toContain("stats.unpricedNativeRequests:2");
    const button = [...host.querySelectorAll("button")].find(
      (entry) => entry.textContent === "stats.costs"
    )!;
    await act(async () => button.click());
    expect(host.textContent!.split("stats.unpricedNativeRequests:2").length - 1).toBe(3);
    expect(host.textContent).toContain("stats.costUnknown");
    expect(host.textContent!.toLowerCase()).not.toContain("free");
  });
  it("leaves ordinary and genuine known-zero stats labels unchanged", async () => {
    await stats({});
    expect(host.textContent).toContain("stats.totalCost");
    expect(host.textContent).not.toContain("stats.knownSubtotal");
    expect(host.textContent).not.toContain("stats.unpricedNativeRequests");
  });
  it("marks modal total/key subtotal partial and disables unavailable quota estimates", async () => {
    await modal({ ...windowPayload, ...partial, rows: [{ ...row, ...partial }] });
    expect(host.textContent).toContain("usageLimits.knownSubtotal");
    expect(host.textContent!.split("usageLimits.unpricedNativeRequests:2").length - 1).toBe(2);
    expect(host.textContent).toContain("usageLimits.partialQuotaEstimateUnavailable");
    expect((host.querySelector('input[type="range"]') as HTMLInputElement).disabled).toBe(true);
  });
  it("shows overlapping ledger amounts separately without adding them to the known subtotal", async () => {
    await modal({
      ...windowPayload,
      ...partial,
      totalCostUsd: 2,
      unallocatedRecordedCostUsd: 3,
      recordedCostProvenance: "unallocated_api_key_ledger",
      rows: [
        {
          ...row,
          ...partial,
          costUsd: 2,
          unallocatedRecordedCostUsd: 3,
          recordedCostProvenance: "unallocated_api_key_ledger",
        },
      ],
    });
    expect(host.textContent).toContain("$2.00");
    expect(host.textContent).toContain("$3.00");
    expect(host.textContent).not.toContain("$5.00");
    expect(host.textContent).toContain("usageLimits.unallocatedRecordedCostWarning");
  });
  it("leaves fully known-zero modal unchanged without invented unknown requests or ledger", async () => {
    await modal({ ...windowPayload, estimatedFullQuotaUsd: 0 });
    expect(host.textContent).toContain("usageLimits.used");
    expect(host.textContent).not.toContain("usageLimits.knownSubtotal");
    expect(host.textContent).not.toContain("usageLimits.unpricedNativeRequests");
    expect(host.textContent).not.toContain("usageLimits.unallocatedRecordedCost");
    expect((host.querySelector('input[type="range"]') as HTMLInputElement).disabled).toBe(false);
  });
  it("keeps the existing closed/reopened modal lifecycle from adopting a late prior response", async () => {
    const { default: Modal } =
      await import("../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/ProviderUsdCostModal");
    let finishOld!: (response: Response) => void;
    fetchMock.mockImplementationOnce(
      () =>
        new Promise<Response>((resolve) => {
          finishOld = resolve;
        })
    );
    const props = {
      onClose: vi.fn(),
      connection: { provider: "synthetic", id: "old" },
      providerLabel: "Synthetic",
      accountLabel: "Fixture",
    };
    await act(async () => root.render(<Modal {...props} isOpen />));
    expect(host.textContent).toContain("usageLimits.loadingUsdCosts");
    await act(async () => root.render(<Modal {...props} isOpen={false} />));
    expect(host.textContent).toBe("");
    fetchMock.mockResolvedValueOnce(json({ ...windowPayload, totalCostUsd: 1 }));
    await act(async () =>
      root.render(<Modal {...props} connection={{ provider: "synthetic", id: "new" }} isOpen />)
    );
    await act(async () => finishOld(json({ ...windowPayload, totalCostUsd: 9 })));
    expect(host.textContent).toContain("$1.00");
    expect(host.textContent).not.toContain("$9.00");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
