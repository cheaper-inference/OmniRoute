// @vitest-environment jsdom
/**
 * F4 (KEA-7886, lote 6 pendência 17): the timeline header was a fixed-height single row
 * (style height = HEADER_HEIGHT) holding ~10 controls, so at 390 px the toolbar was clipped.
 * HEADER_HEIGHT only sized the header (no canvas maths reads it), so it becomes a minimum and
 * both the header and its control group wrap.
 */
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn(), push: vi.fn(), prefetch: vi.fn(), refresh: vi.fn() }),
}));

const { default: RequestTimeline } = await import("../../../src/shared/components/RequestTimeline");
const { HEADER_HEIGHT } = await import("../../../src/shared/components/RequestTimeline.utils");

class FakeResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

let container: HTMLElement;
let root: Root;

beforeEach(() => {
  vi.stubGlobal("ResizeObserver", FakeResizeObserver);
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => Response.json({ enabled: false }))
  );
  vi.useFakeTimers();
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("RequestTimeline header", () => {
  it("wraps its toolbar instead of clipping it at a fixed height", async () => {
    await act(async () => {
      root.render(<RequestTimeline />);
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(50);
    });
    const group = container.querySelector('[data-testid="timeline-mode-follow"]')!.parentElement!;
    const controls = group.parentElement!;
    const header = controls.parentElement!;
    expect(header.style.height).toBe("");
    expect(header.style.minHeight).toBe(`${HEADER_HEIGHT}px`);
    expect(header.className).toMatch(/\bflex-wrap\b/);
    expect(controls.className).toMatch(/\bflex-wrap\b/);
  });
});
