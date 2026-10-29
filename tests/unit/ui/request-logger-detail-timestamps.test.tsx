// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const fixtures = vi.hoisted(() => ({
  pending: new Map<string, Record<string, unknown>>(),
  completed: new Map<string, Record<string, unknown>>(),
  persisted: vi.fn(),
}));

vi.mock("@/lib/api/requireManagementAuth", () => ({
  requireManagementAuth: async () => null,
}));
vi.mock("@/lib/usageDb", () => ({ getCallLogById: fixtures.persisted }));
vi.mock("@/lib/usage/usageHistory", () => ({
  getPendingById: () => fixtures.pending,
  getCompletedDetails: () => fixtures.completed,
}));
vi.mock("@/lib/db/responsesContinuationStore", () => ({
  extractPreviousResponseId: () => null,
  resolveCallLogIdByResponseId: () => null,
}));

const RequestLoggerDetail = (await import("@/shared/components/RequestLoggerDetail")).default;
const { GET } = await import("@/app/api/logs/[id]/route");

const START = Date.parse("2026-10-22T12:00:00Z");
const iso = (offset: number) => new Date(START + offset).toISOString();
const dateLabel = (offset: number) =>
  new Date(START + offset).toLocaleString("en", {
    dateStyle: "short",
    timeStyle: "medium",
    hour12: false,
  });
const timeLabel = (offset: number) =>
  new Date(START + offset).toLocaleTimeString("en", { hour12: false });
const baseLog = {
  id: "preview",
  timestamp: iso(0),
  status: 200,
  model: "test-model",
  provider: "openai",
  duration: 4_000,
  tokens: { in: 10, out: 5 },
};
const noop = () => {};
let container: HTMLElement;
let root: Root;

async function renderDetail(
  log: Record<string, unknown>,
  relatedLogs = [log],
  detail: Record<string, unknown> | null = null
) {
  await act(async () => {
    root.render(
      <RequestLoggerDetail
        log={log}
        detail={detail}
        loading={false}
        debugEnabled={false}
        onClose={noop}
        onCopy={async () => true}
        onPrevious={undefined}
        onNext={undefined}
        relatedLogs={relatedLogs}
        onSelectRelated={noop}
      />
    );
  });
}

function metadata(label: string) {
  return [...container.querySelectorAll("div")].find((el) => el.textContent === label)
    ?.parentElement?.lastElementChild?.textContent;
}

function relatedButtons() {
  return [...container.querySelectorAll("button")].filter((el) =>
    el.querySelector("span.font-mono")
  );
}

async function fetchDetail() {
  const response = await GET(new Request("http://localhost/api/logs/preview"), {
    params: { id: "preview" },
  });
  expect(response.status).toBe(200);
  return response.json();
}

beforeAll(() => vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true));
afterAll(() => vi.unstubAllGlobals());

beforeEach(() => {
  fixtures.pending.clear();
  fixtures.completed.clear();
  fixtures.persisted.mockReset().mockResolvedValue(null);
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.restoreAllMocks();
});

describe("request detail timestamp semantics", () => {
  it("shows active start without a completed end", async () => {
    await renderDetail({ ...baseLog, active: true });
    expect(metadata("Started At")).toBe(dateLabel(0));
    expect(metadata("Ended At")).toBeUndefined();
  });

  it("retains live detail elapsed duration and omits an end time", async () => {
    vi.spyOn(Date, "now").mockReturnValue(START + 60_000);
    fixtures.pending.set("preview", { id: "preview", startedAt: START });
    const detail = await fetchDetail();
    expect(detail.duration).toBe(60_000);
    expect(detail.active).toBe(true);
    await renderDetail({ ...baseLog, ...detail });
    expect(metadata("Started At")).toBe(dateLabel(0));
    expect(metadata("Ended At")).toBeUndefined();
  });

  it("preserves a recorded zero duration instead of using elapsed time", async () => {
    vi.spyOn(Date, "now").mockReturnValue(START + 60_000);
    fixtures.completed.set("preview", { id: "preview", startedAt: START, durationMs: 0 });
    const detail = await fetchDetail();
    expect(detail.duration).toBe(0);
    await renderDetail({ ...baseLog, ...detail });
    expect(metadata("Started At")).toBe(dateLabel(0));
    expect(metadata("Ended At")).toBe(dateLabel(0));
  });

  it("shows completed-preview start and end using its start timestamp", async () => {
    await renderDetail({ ...baseLog, completed: true, active: false });
    expect(metadata("Started At")).toBe(dateLabel(0));
    expect(metadata("Ended At")).toBe(dateLabel(4_000));
  });

  it("preserves persisted end timestamps and subtracts duration for the start", async () => {
    await renderDetail({ ...baseLog, timestamp: iso(4_000) });
    expect(metadata("Started At")).toBe(dateLabel(0));
    expect(metadata("Ended At")).toBe(dateLabel(4_000));
  });

  it.each([undefined, false])(
    "recognizes in-memory detail without a completed flag (%s)",
    async (completed) => {
      await renderDetail({ ...baseLog, active: false, completed, detailState: "in-memory" });
      expect(metadata("Started At")).toBe(dateLabel(0));
      expect(metadata("Ended At")).toBe(dateLabel(4_000));
    }
  );

  it("orders mixed attempts by actual start and keeps labels/order after preview persistence", async () => {
    const saved = { ...baseLog, id: "saved", timestamp: iso(3_000), duration: 3_000 };
    const preview = { ...baseLog, timestamp: iso(1_000), duration: 8_000, completed: true };
    const active = {
      ...baseLog,
      id: "active",
      timestamp: iso(2_000),
      duration: 12_000,
      active: true,
    };
    await renderDetail(preview, [active, preview, saved]);
    const labels = () => relatedButtons().map((el) => el.textContent);
    expect(relatedButtons().map((el) => el.querySelector("span.font-mono")?.textContent)).toEqual([
      "saved",
      "preview",
      "active",
    ]);
    for (const [index, offset] of [0, 1_000, 2_000].entries()) {
      expect(labels()[index]).toContain(timeLabel(offset));
    }
    const before = labels();
    const persisted = {
      ...preview,
      completed: undefined,
      timestamp: iso(9_000),
      detailState: "ready",
    };
    await renderDetail(persisted, [active, persisted, saved]);
    expect(labels()).toEqual(before);
    expect(metadata("Started At")).toBe(dateLabel(1_000));
    expect(metadata("Ended At")).toBe(dateLabel(9_000));
  });

  it("uses the actual completed detail projection merged over the list preview", async () => {
    vi.spyOn(Date, "now").mockReturnValue(START + 60_000);
    fixtures.completed.set("preview", {
      id: "preview",
      startedAt: START,
      durationMs: 4_000,
      completedAt: START + 5_000,
      model: "test-model",
      provider: "openai",
      status: 200,
    });
    const detail = await fetchDetail();
    expect(detail.duration).toBe(4_000);
    expect(detail.completed).toBeUndefined();
    await renderDetail({ ...baseLog, completed: true, ...detail });
    expect(metadata("Started At")).toBe(dateLabel(0));
    expect(metadata("Ended At")).toBe(dateLabel(4_000));

    fixtures.persisted.mockResolvedValue({
      ...baseLog,
      timestamp: iso(4_000),
      detailState: "ready",
      active: false,
      pipelinePayloads: { clientRequest: {} },
    });
    // RequestLoggerV2 merges detail over the selected preview; its old flag remains.
    await renderDetail({ ...baseLog, completed: true, ...(await fetchDetail()) });
    expect(metadata("Started At")).toBe(dateLabel(0));
    expect(metadata("Ended At")).toBe(dateLabel(4_000));
  });

  it("uses separately fetched timing when the timeline caller omits preview flags", async () => {
    vi.spyOn(Date, "now").mockReturnValue(START + 60_000);
    fixtures.completed.set("preview", {
      id: "preview",
      startedAt: START,
      durationMs: 4_000,
      status: 200,
    });
    const detail = await fetchDetail();
    await renderDetail({ ...baseLog, active: false, duration: 60_000 }, undefined, detail);
    expect(metadata("Started At")).toBe(dateLabel(0));
    expect(metadata("Ended At")).toBe(dateLabel(4_000));

    expect(metadata("Duration")).toBe("4.0s");

    await renderDetail({ ...baseLog, active: true, duration: 60_000 }, undefined, {
      ...baseLog,
      timestamp: iso(4_000),
      detailState: "ready",
      active: false,
    });
    expect(metadata("Started At")).toBe(dateLabel(0));
    expect(metadata("Ended At")).toBe(dateLabel(4_000));
    expect(metadata("Duration")).toBe("4.0s");
  });

  it.each([undefined, NaN, Infinity])(
    "falls back to recorded completion when durationMs is %s",
    async (durationMs) => {
      vi.spyOn(Date, "now").mockReturnValue(START + 60_000);
      fixtures.completed.set("preview", {
        id: "preview",
        startedAt: START,
        durationMs,
        completedAt: START + 5_000,
      });
      expect((await fetchDetail()).duration).toBe(5_000);
    }
  );

  it("retains elapsed fallback when no recorded completion timing exists", async () => {
    vi.spyOn(Date, "now").mockReturnValue(START + 60_000);
    fixtures.completed.set("preview", { id: "preview", startedAt: START });
    expect((await fetchDetail()).duration).toBe(60_000);
  });

  it.each([undefined, null, "bad-date"])(
    "renders unavailable timestamps safely (%s)",
    async (timestamp) => {
      const log = { ...baseLog, timestamp, completed: true };
      await renderDetail(log, [log, { ...baseLog, id: "saved", timestamp: iso(4_000) }]);
      expect(metadata("Started At")).toBe("—");
      expect(metadata("Ended At")).toBe("—");
      expect(relatedButtons()[0].textContent).toContain("—");
      expect(container.textContent).not.toContain("Invalid Date");
    }
  );
});
