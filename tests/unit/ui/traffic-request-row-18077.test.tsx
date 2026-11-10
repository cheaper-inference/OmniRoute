// @vitest-environment jsdom
/**
 * #18077 — the traffic inspector row was a `div role="button"` with the context chip (a real
 * <button>) nested inside it (axe `nested-interactive`), and the chip's accessible name
 * ("Filter by context #abc123") did not contain its visible text "ctx #abc123" (WCAG 2.5.3).
 */
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import type { InterceptedRequest } from "../../../src/mitm/inspector/types";

let RequestRow: typeof import("../../../src/app/(dashboard)/dashboard/tools/traffic-inspector/components/RequestRow").RequestRow;

beforeAll(async () => {
  ({ RequestRow } =
    await import("../../../src/app/(dashboard)/dashboard/tools/traffic-inspector/components/RequestRow"));
}, 180_000);

const INTERACTIVE = 'button, a[href], input, select, textarea, [role="button"], [tabindex]';

function makeRequest(overrides: Partial<InterceptedRequest> = {}): InterceptedRequest {
  return {
    id: "6f1c1d3e-0000-4000-8000-000000000001",
    source: "agent-bridge",
    agent: "codex",
    timestamp: "2026-11-09T10:00:00.000Z",
    method: "POST",
    host: "api.openai.com",
    path: "/v1/responses",
    requestHeaders: {},
    requestBody: null,
    requestSize: 10,
    responseHeaders: {},
    responseBody: null,
    responseSize: 2048,
    status: 200,
    contextKey: "abc123def456",
    ...overrides,
  };
}

let root: Root;
let container: HTMLDivElement;

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

function render(ui: React.ReactElement) {
  act(() => root.render(ui));
  const row = container.querySelector<HTMLElement>("[data-testid='request-row']");
  expect(row).not.toBeNull();
  return row as HTMLElement;
}

describe("traffic inspector RequestRow", () => {
  it("has no interactive element nested inside another one", () => {
    const row = render(<RequestRow request={makeRequest()} selected={false} onClick={() => {}} />);
    const interactive = [...row.querySelectorAll<HTMLElement>(INTERACTIVE)];
    expect(interactive.length).toBeGreaterThanOrEqual(2);
    for (const el of interactive) {
      expect(el.parentElement?.closest(INTERACTIVE), el.outerHTML.slice(0, 80)).toBeNull();
    }
    // The row container itself is not a fake button any more.
    expect(row.getAttribute("role")).toBeNull();
    expect(row.hasAttribute("tabindex")).toBe(false);
  });

  it("selects the request through a native toggle button", () => {
    const onClick = vi.fn();
    const row = render(<RequestRow request={makeRequest()} selected onClick={onClick} />);
    const select = row.querySelector<HTMLButtonElement>("button[aria-pressed]");
    expect(select).not.toBeNull();
    expect(select?.getAttribute("type")).toBe("button");
    expect(select?.getAttribute("aria-pressed")).toBe("true");
    act(() => select?.click());
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("the context chip filters without selecting, and its name contains its visible text", () => {
    const onClick = vi.fn();
    const onSameContext = vi.fn();
    const row = render(
      <RequestRow
        request={makeRequest()}
        selected={false}
        onClick={onClick}
        onSameContext={onSameContext}
      />
    );
    const chip = [...row.querySelectorAll<HTMLButtonElement>("button")].find((b) =>
      b.textContent?.includes("ctx #abc123")
    );
    expect(chip).toBeDefined();
    const name = chip?.getAttribute("aria-label") ?? chip?.textContent ?? "";
    expect(name).toContain("ctx #abc123");
    act(() => chip?.click());
    expect(onSameContext).toHaveBeenCalledWith("abc123def456");
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders no chip when the request has no context key", () => {
    const row = render(
      <RequestRow
        request={makeRequest({ contextKey: undefined })}
        selected={false}
        onClick={() => {}}
      />
    );
    expect(row.textContent).not.toContain("ctx #");
    expect(row.querySelectorAll("button")).toHaveLength(1);
  });
});
