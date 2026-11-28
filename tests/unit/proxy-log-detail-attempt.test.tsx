// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, args?: Record<string, unknown>) => {
    if (key === "attemptNumber") return "Attempt";
    if (key === "attemptIssue") {
      const issue = args?.issue;
      return issue === "served" || issue === "abandoned" ? issue : "—";
    }
    return args ? key + Object.values(args).join("") : key;
  },
}));

const BASE_LOG = {
  id: "log-attempt",
  timestamp: "2026-11-17T12:00:00.000Z",
  status: "success",
  proxy: { type: "http", host: "127.0.0.1", port: 8080, name: "reg-test" },
  tlsFingerprint: false,
  level: "provider",
  provider: "openai",
  targetUrl: "openai/gpt-5",
  latencyMs: 42,
  clientIp: "10.9.9.9",
  upstreamStatus: 200,
  headersMs: 1234,
  firstChunkMs: 5678,
  egressIp: "203.0.113.9",
  correlationId: "corr-abcdef-123456",
  account: "conn-traff",
  rotationAccount: "rot-acc-01",
  error: null,
};

async function renderBadge(log: Record<string, unknown>, attemptTotal?: number | null) {
  const { default: ProxyLogDetail } = await import("@/shared/components/ProxyLogDetail");
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  try {
    await act(async () => {
      root.render(<ProxyLogDetail log={log} attemptTotal={attemptTotal} onClose={() => {}} />);
    });
    const text = document.body.textContent ?? "";
    const label = Array.from(document.body.querySelectorAll("div")).find(
      (element) => element.textContent === "Attempt" && element.className.includes("uppercase")
    );
    const value = (label?.nextElementSibling as HTMLElement | null)?.textContent ?? "";
    return { text, value };
  } finally {
    await act(async () => root.unmount());
    container.remove();
  }
}

describe("ProxyLogDetail attempt rank and outcome", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  it("shows the rank and outcome of an abandoned attempt", async () => {
    const { text, value } = await renderBadge(
      { ...BASE_LOG, attemptNumber: 1, attemptIssue: "abandoned" },
      3
    );
    expect(text).toContain("1/3 · abandoned");
    expect(value).toBe("1/3 · abandoned");
  });

  it("shows the rank and outcome of the served attempt", async () => {
    const { text, value } = await renderBadge(
      { ...BASE_LOG, attemptNumber: 3, attemptIssue: "served" },
      3
    );
    expect(text).toContain("3/3 · served");
    expect(value).toBe("3/3 · served");
  });

  it("shows dashes, never 0 or an outcome label, for an unjournaled row", async () => {
    const { value } = await renderBadge(
      { ...BASE_LOG, attemptNumber: null, attemptIssue: null },
      null
    );
    expect(value).toBe("— · —");
    expect(value).not.toContain("0");
    expect(value).not.toContain("served");
    expect(value).not.toContain("abandoned");
  });

  it("falls back to the attempt number as total when no total is supplied", async () => {
    const { text, value } = await renderBadge({
      ...BASE_LOG,
      attemptNumber: 3,
      attemptIssue: "served",
    });
    expect(text).toContain("3/3 · served");
    expect(value).toBe("3/3 · served");
  });
});
