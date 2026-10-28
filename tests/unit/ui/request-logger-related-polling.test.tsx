// @vitest-environment jsdom
import React, { act, createRef } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import RequestLoggerV2, { type RequestLoggerV2Handle } from "@/shared/components/RequestLoggerV2";

const { router } = vi.hoisted(() => ({ router: { replace: vi.fn() } }));
vi.mock("next/navigation", () => ({ useRouter: () => router }));
vi.mock("@/shared/components/RequestLoggerDetail", () => ({
  default: ({ relatedLogs, onClose }) => (
    <div>
      <output data-testid="related">{JSON.stringify(relatedLogs.map((row) => row.id))}</output>
      <button onClick={onClose}>Close detail</button>
    </div>
  ),
}));

function row(id: string, extra: Record<string, unknown> = {}) {
  return {
    id,
    correlationId: "request-1",
    timestamp: "2026-10-22T00:00:00.000Z",
    status: 200,
    model: "test-model",
    provider: "openai",
    tokens: { in: 1, out: 2 },
    ...extra,
  };
}
const selected = row("saved-selected");
const active = row("expired-active", {
  active: true,
  stale: true,
  sweptAt: "2026-10-22T00:01:00.000Z",
});
const completed = row("expired-completed", { completed: true, detailState: "in-memory" });
const memory = row("expired-memory", { detailState: "in-memory" });
const history = row("saved-outside-page", { status: 502 });
const unrelated = row("other-preview", { correlationId: "request-10", active: true });

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

let root: Root;
let container: HTMLDivElement;
let ref: React.RefObject<RequestLoggerV2Handle | null>;
let poll: ReturnType<typeof vi.fn>;
let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      disconnect() {}
    }
  );
  Object.defineProperty(document, "visibilityState", { configurable: true, value: "visible" });
  localStorage.clear();
  poll = vi.fn(async () => Response.json([selected]));
  fetchMock = vi.fn(async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.startsWith("/api/usage/call-logs?correlationId=")) return poll();
    if (url.startsWith("/api/usage/call-logs?")) {
      return Response.json([selected, active, completed, memory, history, unrelated]);
    }
    if (url.startsWith("/api/logs/") && !url.startsWith("/api/logs/detail")) {
      return Response.json(row(url.split("/").at(-1)!));
    }
    if (url === "/api/provider-nodes") return Response.json({ nodes: [] });
    return Response.json({});
  });
  vi.stubGlobal("fetch", fetchMock);
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  ref = createRef<RequestLoggerV2Handle>();
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

async function open() {
  await act(async () => root.render(<RequestLoggerV2 ref={ref} />));
  await act(async () => {
    await ref.current!.openDetail(selected);
  });
}
async function tick() {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(3000);
  });
}
function rows() {
  return ref.current!.getSortedLogs();
}
function ids() {
  return rows().map((log) => log.id);
}
async function close() {
  await act(async () => {
    Array.from(container.querySelectorAll("button"))
      .find((button) => button.textContent === "Close detail")!
      .click();
  });
}

describe("related-request polling", () => {
  it("expires absent previews while retaining paged saved history, real retries and unrelated rows", async () => {
    const stillActive = row("still-active", { active: true });
    const stillCompleted = row("still-completed", { completed: true, detailState: "in-memory" });
    const retry = row("saved-retry", { status: 503 });
    poll.mockResolvedValue(
      Response.json([selected, stillActive, stillCompleted, retry, unrelated])
    );
    await open();
    await tick();
    expect(ids()).toEqual(
      expect.arrayContaining([
        selected.id,
        history.id,
        unrelated.id,
        stillActive.id,
        stillCompleted.id,
        retry.id,
      ])
    );
    expect(ids()).not.toContain(active.id);
    expect(ids()).not.toContain(completed.id);
    expect(ids()).not.toContain(memory.id);
    expect(JSON.parse(container.querySelector("output")!.textContent!)).toEqual([
      selected.id,
      history.id,
      stillActive.id,
      stillCompleted.id,
      retry.id,
    ]);
    expect(
      fetchMock.mock.calls.filter(([url]) => String(url).startsWith("/api/usage/call-logs?limit="))
    ).toHaveLength(1);
  });

  it("treats an empty successful snapshot as expiry of only the selected correlation's previews", async () => {
    poll.mockResolvedValue(Response.json([]));
    await open();
    await tick();
    expect(ids()).toEqual([selected.id, history.id, unrelated.id]);
  });

  it.each([
    ["HTTP failure", () => new Response("failed", { status: 500 })],
    ["network failure", () => Promise.reject(new Error("offline"))],
    ["JSON failure", () => new Response("invalid-json")],
    ["non-array body", () => Response.json({ error: "invalid" })],
    ["null row", () => Response.json([selected, null])],
    ["missing id", () => Response.json([selected, { correlationId: "request-1" }])],
    ["missing correlation", () => Response.json([selected, { id: "broken" }])],
    ["empty id", () => Response.json([row("")])],
    ["incomplete summary", () => Response.json([{ id: "broken", correlationId: "request-1" }])],
    ["invalid preview flag", () => Response.json([row("broken", { active: "true" })])],
  ])("preserves existing rows on %s", async (_name, response) => {
    poll.mockImplementation(response);
    await open();
    const before = rows();
    await tick();
    expect(rows()).toEqual(before);
    poll.mockResolvedValue(Response.json([]));
    await tick();
    expect(ids()).toEqual([selected.id, history.id, unrelated.id]);
  });

  it.each([active, completed])(
    "clears transient fields on same-ID persisted arrival for $id and preserves it on later empty pages",
    async (preview) => {
      const saved = row(preview.id, { duration: 42 });
      poll
        .mockResolvedValueOnce(Response.json([selected, saved]))
        .mockResolvedValue(Response.json([]));
      await open();
      await tick();
      expect(rows().find((log) => log.id === saved.id)).toEqual(saved);
      await tick();
      expect(ids()).toContain(saved.id);
    }
  );

  it("updates an active preview to completed without retaining its active or stale state", async () => {
    const finished = row(active.id, { active: false, completed: true, detailState: "in-memory" });
    poll.mockResolvedValue(Response.json([selected, finished]));
    await open();
    await tick();
    expect(rows().find((log) => log.id === active.id)).toEqual(finished);
    poll.mockResolvedValue(Response.json([]));
    await tick();
    expect(ids()).not.toContain(active.id);
  });

  it("continues polling when the same selected log is reopened", async () => {
    await open();
    await act(async () => {
      await ref.current!.openDetail(selected);
    });
    await tick();
    expect(ids()).toEqual([selected.id, history.id, unrelated.id]);
  });

  it("does not collapse a still-present preview into a different-ID saved retry", async () => {
    const retry = row("different-saved-id");
    poll.mockResolvedValue(Response.json([selected, active, retry]));
    await open();
    await tick();
    expect(ids()).toEqual([selected.id, active.id, history.id, unrelated.id, retry.id]);
  });

  it("does not import substring-matched correlations or overwrite an unrelated ID", async () => {
    poll.mockResolvedValue(
      Response.json([
        selected,
        row("foreign-preview", { correlationId: "request-10", active: true }),
        row(unrelated.id),
      ])
    );
    await open();
    await tick();
    expect(rows().find((log) => log.id === unrelated.id)).toEqual(unrelated);
    expect(ids()).not.toContain("foreign-preview");
  });

  it.each(["close", "switch"])("ignores a late fetch after modal %s", async (action) => {
    const response = deferred<Response>();
    poll.mockReturnValue(response.promise);
    await open();
    await tick();
    if (action === "close") await close();
    else
      await act(async () => {
        await ref.current!.openDetail(row("another-selection"));
      });
    const before = rows();
    await act(async () => response.resolve(Response.json([row("late-row")])));
    expect(rows()).toEqual(before);
  });

  it.each(["close", "switch"])("ignores JSON resolved after modal %s", async (action) => {
    const body = deferred<unknown>();
    poll.mockResolvedValue({ ok: true, json: () => body.promise });
    await open();
    await tick();
    if (action === "close") await close();
    else
      await act(async () => {
        await ref.current!.openDetail(row("another-selection"));
      });
    const before = rows();
    await act(async () => body.resolve([row("late-row")]));
    expect(rows()).toEqual(before);
  });

  it("waits for the in-flight snapshot before starting another destructive poll", async () => {
    const response = deferred<Response>();
    poll.mockReturnValueOnce(response.promise).mockResolvedValue(Response.json([selected, active]));
    await open();
    await tick();
    await tick();
    expect(poll).toHaveBeenCalledTimes(1);
    await act(async () => response.resolve(Response.json([selected])));
    await tick();
    expect(poll).toHaveBeenCalledTimes(2);
    expect(ids()).toContain(active.id);
  });
});
