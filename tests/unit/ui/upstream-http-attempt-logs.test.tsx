import React, { act, createRef } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import RequestLoggerV2, { type RequestLoggerV2Handle } from "@/shared/components/RequestLoggerV2";
import RequestLoggerDetail from "@/shared/components/RequestLoggerDetail";

vi.mock("next/navigation", () => {
  const router = { replace: vi.fn() };
  return { useRouter: () => router };
});
const groupId = "00000000-0000-4000-8000-000000000001";
function send(ordinal: number, status: number | null, outcome = "response") {
  return {
    id: `00000000-0000-4000-8000-${String(ordinal).padStart(12, "0")}`,
    ordinal,
    provider: "openai",
    model: "test-model",
    connectionId: "account-wire",
    method: "POST",
    endpoint: "chat_completions",
    startedAt: 1000,
    endedAt: outcome === "no_response_observed" ? null : 2000,
    cutoffAt: outcome === "no_response_observed" ? 2000 : null,
    durationMs: status ? 1000 : null,
    status,
    outcome,
    retryReason: "unknown",
  };
}
function row(id: string, status = 200, extra: Record<string, unknown> = {}) {
  return {
    id,
    correlationId: "request-1",
    timestamp: "2026-11-01T00:00:01Z",
    status,
    model: "test-model",
    provider: "openai",
    account: "account-wire",
    tokens: { in: 0, out: 0 },
    upstreamHttp: extra.upstreamHttp,
    ...extra,
  };
}
const failed = row("wire-failed", 403, {
  requestType: "upstream_http_attempt",
  upstreamHttp: { version: 1, groupId, role: "attempt", send: send(1, 403) },
});
const final = row("logical", 200, {
  timestamp: "2026-11-01T00:00:02Z",
  upstreamHttp: {
    version: 1,
    groupId,
    role: "logical",
    send: send(2, 200),
    total: 2,
    failed: 1,
    omitted: 0,
    logicalOutcome: "success",
  },
});
let root: Root;
let container: HTMLDivElement;
let main: Record<string, unknown>[];
let related: Record<string, unknown>[];
let ref: React.RefObject<RequestLoggerV2Handle | null>;
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
  main = [failed, final];
  related = main;
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.startsWith("/api/usage/call-logs?correlationIdExact=")) return Response.json(related);
      if (url.startsWith("/api/usage/call-logs?"))
        return Response.json(
          url.includes("status=error") ? main.filter((entry) => Number(entry.status) >= 400) : main
        );
      if (url.startsWith("/api/logs/"))
        return Response.json(main.find((entry) => entry.id === url.split("/").at(-1)) ?? final);
      if (url === "/api/provider-nodes") return Response.json({ nodes: [] });
      return Response.json({});
    })
  );
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  ref = createRef();
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});
async function render() {
  await act(async () => root.render(<RequestLoggerV2 ref={ref} />));
}
async function grouped() {
  const button = [...container.querySelectorAll("button")].find((entry) =>
    /latest per correlation/i.test(entry.title)
  );
  expect(button).toBeTruthy();
  await act(async () => button!.click());
}
function tableText() {
  return container.querySelector("tbody")?.textContent ?? "";
}

it("Grouped view keeps recovery metadata before dedup and final-only pagination", async () => {
  await render();
  await grouped();
  expect(container.querySelectorAll("tbody tr")).toHaveLength(1);
  expect(tableText()).toMatch(/healed/i);
  await act(async () => ref.current!.openDetail(final));
  expect(
    [...container.querySelectorAll("button")]
      .filter((entry) => entry.querySelector("span.font-mono"))
      .map((entry) => entry.textContent)
  ).toEqual([expect.stringContaining("wire-failed"), expect.stringContaining("logical")]);
  await act(async () => root.render(<RequestLoggerV2 key="page-two" ref={ref} />));
  main = [final];
  await act(async () => {
    await vi.advanceTimersByTimeAsync(3000);
  });
  expect(tableText()).toMatch(/healed/i);
});

it("upstream HTTP200 cannot heal a failed logical result and pending is not failure", async () => {
  main = [
    row("wire-ok", 200, {
      requestType: "upstream_http_attempt",
      upstreamHttp: { version: 1, groupId, role: "attempt", send: send(1, 200) },
    }),
    row("logical-failure", 502, {
      timestamp: "2026-11-01T00:00:02Z",
      upstreamHttp: {
        ...(final.upstreamHttp as Record<string, unknown>),
        send: send(1, 200),
        total: 1,
        failed: 0,
        logicalOutcome: "failure",
      },
    }),
  ];
  await render();
  await grouped();
  expect(tableText()).toMatch(/failed/i);
  expect(tableText()).not.toMatch(/healed/i);
  main = [row("pending", 0, { active: true })];
  await act(async () => root.render(<RequestLoggerV2 key="pending-only" ref={ref} />));
  expect(tableText()).not.toMatch(/failed|healed/i);
});

it("wire-only filtered groups stay unknown and related polls never inject filtered rows", async () => {
  await render();
  const errorFilter = [...container.querySelectorAll("button")].find(
    (entry) => entry.textContent?.trim() === "Error"
  );
  expect(errorFilter).toBeTruthy();
  await act(async () => errorFilter!.click());
  await grouped();
  expect(tableText()).not.toMatch(/healed|failed/i);
  expect(ref.current!.getSortedLogs().map((entry) => entry.id)).toEqual([failed.id]);
  const allRows = [...container.querySelectorAll("button")].find((entry) =>
    /all rows/i.test(entry.title)
  );
  expect(allRows).toBeTruthy();
  await act(async () => allRows!.click());
  await act(async () => ref.current!.openDetail(failed));
  related = [
    failed,
    final,
    row("other-model-account", 403, { model: "hidden-model", account: "hidden-account" }),
  ];
  await act(async () => {
    await vi.advanceTimersByTimeAsync(3000);
  });
  expect(ref.current!.getSortedLogs().map((entry) => entry.id)).toEqual([failed.id]);
  expect(tableText()).not.toContain("hidden-model");
  expect(
    [...container.querySelectorAll("button")].some((entry) =>
      entry.textContent?.includes("other-model-account")
    )
  ).toBe(true);
});

it("transport errors and unobserved sends have truthful table/detail/related labels without artifacts", async () => {
  main = [
    row("transport", 0, {
      requestType: "upstream_http_attempt",
      error: "Upstream transport error",
    }),
    row("cutoff", 0, {
      requestType: "upstream_http_attempt",
      error: "No HTTP response observed",
      upstreamHttp: {
        version: 1,
        groupId,
        role: "attempt",
        send: send(2, null, "no_response_observed"),
      },
    }),
  ];
  await render();
  expect(tableText()).toContain("Transport error");
  expect(tableText()).toContain("No HTTP response observed");
  await act(async () =>
    root.render(
      <RequestLoggerDetail
        log={main[0]}
        detail={null}
        loading={false}
        debugEnabled={false}
        onClose={() => {}}
        onCopy={async () => true}
        relatedLogs={main}
      />
    )
  );
  expect(container.textContent).toContain("Transport error");
  expect(container.textContent).toContain("No HTTP response observed");
  expect(container.textContent).not.toContain("Completed");
  await act(async () =>
    root.render(
      <RequestLoggerDetail
        log={row("failed-logical", 502, {
          upstreamHttp: {
            ...(final.upstreamHttp as Record<string, unknown>),
            send: send(1, 200),
            total: 1,
            failed: 0,
            logicalOutcome: "failure",
          },
        })}
        detail={null}
        loading={false}
        debugEnabled={false}
        onClose={() => {}}
        onCopy={async () => true}
      />
    )
  );
  expect(container.textContent).toContain("Upstream: 200");
});

it("a final-only page retains recovery and excludes an unrelated collector with the same correlation", async () => {
  const overflow = row("overflow", 200, {
    upstreamHttp: { ...(final.upstreamHttp as Record<string, unknown>), total: 36, omitted: 4 },
  });
  main = [overflow];
  await render();
  await grouped();
  expect(tableText()).toMatch(/healed/i);
  expect(tableText()).toContain("4 HTTP sends not retained");
  expect(
    [...container.querySelectorAll("[title]")].some(
      (entry) => entry.getAttribute("title") === "Request recovered across 36 attempts"
    )
  ).toBe(true);
  await act(async () => ref.current!.openDetail(overflow));
  expect(container.textContent?.match(/4 HTTP sends not retained/g)).toHaveLength(2);
  main = [
    failed,
    row("different-collector", 200, {
      upstreamHttp: {
        ...(final.upstreamHttp as Record<string, unknown>),
        groupId: "00000000-0000-4000-8000-000000000099",
        failed: 0,
        total: 1,
      },
    }),
  ];
  await act(async () => root.render(<RequestLoggerV2 key="other-collector" ref={ref} />));
  await grouped();
  expect(tableText()).not.toMatch(/healed/i);
});

it("a newer active logical preview leaves grouped health unknown until recovery completes", async () => {
  main = [
    row("failed-logical", 502, { connectionId: "account-a" }),
    row("active-logical", 0, {
      active: true,
      connectionId: "account-b",
      timestamp: "2026-11-01T00:00:03Z",
    }),
  ];
  await render();
  await grouped();
  expect(container.querySelectorAll("tbody tr")).toHaveLength(1);
  expect(tableText()).not.toMatch(/failed|healed/i);
  main = [
    row("failed-logical", 502, { connectionId: "account-a" }),
    row("completed-logical", 200, { connectionId: "account-b", timestamp: "2026-11-01T00:00:04Z" }),
  ];
  await act(async () => root.render(<RequestLoggerV2 key="completed-recovery" ref={ref} />));
  await grouped();
  expect(tableText()).toMatch(/healed/i);
});

it("related hedged collectors keep one transitive order across every input permutation", async () => {
  const start = Date.parse("2026-11-01T12:00:00Z");
  const iso = (offset: number) => new Date(start + offset).toISOString();
  const a1 = row("hedge-A1", 403, {
    timestamp: iso(1500),
    duration: 500,
    requestType: "upstream_http_attempt",
    upstreamHttp: {
      version: 1,
      groupId,
      role: "attempt",
      send: { ...send(1, 403), startedAt: start + 1000, endedAt: start + 1500, durationMs: 500 },
    },
  });
  const a2 = row("hedge-A2", 200, {
    timestamp: iso(3000),
    duration: 3000,
    upstreamHttp: {
      version: 1,
      groupId,
      role: "logical",
      send: { ...send(2, 200), startedAt: start + 2000, endedAt: start + 2500, durationMs: 500 },
      total: 2,
      failed: 1,
      omitted: 0,
      logicalOutcome: "success",
    },
  });
  const b = row("hedge-B", 200, {
    timestamp: iso(2600),
    duration: 2100,
    upstreamHttp: {
      version: 1,
      groupId: "00000000-0000-4000-8000-000000000099",
      role: "logical",
      send: {
        ...send(1, 200),
        id: "00000000-0000-4000-8000-000000000099",
        startedAt: start + 1600,
        endedAt: start + 2000,
        durationMs: 400,
      },
      total: 1,
      failed: 0,
      omitted: 0,
      logicalOutcome: "success",
    },
  });
  const inputs = [
    [a1, a2, b],
    [a1, b, a2],
    [a2, a1, b],
    [a2, b, a1],
    [b, a1, a2],
    [b, a2, a1],
  ];
  const original = JSON.stringify(inputs);
  const onSelectRelated = vi.fn();
  const orders: (string | null | undefined)[][] = [];
  for (const relatedLogs of inputs) {
    await act(async () =>
      root.render(
        <RequestLoggerDetail
          log={a2}
          detail={null}
          loading={false}
          debugEnabled={false}
          onClose={() => {}}
          onCopy={async () => true}
          relatedLogs={relatedLogs}
          onSelectRelated={onSelectRelated}
        />
      )
    );
    const buttons = [...container.querySelectorAll("button")].filter((entry) =>
      entry.querySelector("span.font-mono")
    );
    orders.push(buttons.map((entry) => entry.querySelector("span.font-mono")?.textContent));
    for (const [related, offset] of [
      [a1, 1000],
      [a2, 0],
      [b, 500],
    ] as const) {
      expect(
        buttons.find((entry) => entry.querySelector("span.font-mono")?.textContent === related.id)
          ?.textContent
      ).toContain(new Date(start + offset).toLocaleTimeString("en", { hour12: false }));
    }
    await act(async () =>
      buttons.find((entry) => entry.querySelector("span.font-mono")?.textContent === b.id)!.click()
    );
    expect(onSelectRelated).toHaveBeenLastCalledWith(b);
  }
  expect(orders).toEqual(inputs.map(() => [a1.id, b.id, a2.id]));
  expect(JSON.stringify(inputs)).toBe(original);
});
