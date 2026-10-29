// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ConnectionRow, { type ConnectionRowProps } from "../components/ConnectionRow";

const noop = () => {};

function buildProps(overrides: Partial<ConnectionRowProps>): ConnectionRowProps {
  return {
    connection: { id: "conn-1", provider: "codex", authType: "oauth", isActive: true },
    isOAuth: true,
    isCodex: true,
    isFirst: false,
    isLast: false,
    onMoveUp: noop,
    onMoveDown: noop,
    onToggleActive: noop,
    onToggleRateLimit: noop,
    onRetest: noop,
    onEdit: noop,
    onDelete: noop,
    ...overrides,
  } as ConnectionRowProps;
}

const roots: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function render(props: ConnectionRowProps) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => root.render(<ConnectionRow {...props} />));
  roots.push({ root, el });
}

function pingButton() {
  return [...document.querySelectorAll("button")].find((b) =>
    (b.textContent || "").includes("Ping now")
  ) as HTMLButtonElement | undefined;
}

function mockFetch(status: number, body: unknown) {
  const fetchMock = vi.fn(async () => ({ ok: status < 400, status, json: async () => body }));
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  for (const { root, el } of roots.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("Codex Ping now button", () => {
  it("renders only for Codex OAuth connections", () => {
    render(buildProps({}));
    expect(pingButton()).toBeDefined();
  });

  it("is absent for non-Codex and API-key connections", () => {
    render(
      buildProps({
        isCodex: false,
        connection: { id: "c", provider: "claude", authType: "oauth", isActive: true },
      })
    );
    render(
      buildProps({
        isOAuth: false,
        connection: { id: "k", provider: "codex", authType: "apikey", isActive: true },
      })
    );
    expect(pingButton()).toBeUndefined();
  });

  it("is disabled for an inactive connection", () => {
    render(
      buildProps({
        connection: { id: "conn-1", provider: "codex", authType: "oauth", isActive: false },
      })
    );
    expect(pingButton()?.disabled).toBe(true);
  });

  it("POSTs to the ping route and shows the localized success message", async () => {
    const fetchMock = mockFetch(200, { status: "succeeded", reason: "completed" });
    render(buildProps({}));
    await act(async () => {
      pingButton()?.click();
    });
    expect(fetchMock).toHaveBeenCalledWith("/api/providers/conn-1/ping", { method: "POST" });
    const status = document.querySelector('[role="status"]');
    expect(status?.textContent).toBe("Ping completed.");
    expect(status?.className).toContain("text-success");
  });

  it("shows a skipped reason without implying the ping was sent", async () => {
    mockFetch(200, { status: "skipped", reason: "quota_exhausted" });
    render(buildProps({}));
    await act(async () => {
      pingButton()?.click();
    });
    const status = document.querySelector('[role="status"]');
    expect(status?.textContent).toBe("Quota exhausted; no request sent.");
    expect(status?.className).toContain("text-warning");
  });

  it("falls back to a generic failure on an error response or network error", async () => {
    mockFetch(500, { error: { message: "Internal error" }, reason: "error" });
    render(buildProps({}));
    await act(async () => {
      pingButton()?.click();
    });
    expect(document.querySelector('[role="status"]')?.textContent).toBe("Ping failed.");

    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("offline");
      })
    );
    await act(async () => {
      pingButton()?.click();
    });
    const status = document.querySelector('[role="status"]');
    expect(status?.textContent).toBe("Ping failed.");
    expect(status?.className).toContain("text-error");
  });
});
