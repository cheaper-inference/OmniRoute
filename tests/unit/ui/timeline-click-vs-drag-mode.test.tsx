// @vitest-environment jsdom
/**
 * Regression guard for the request timeline view mode.
 *
 * Bug: clicking anywhere on the timeline flipped the view out of "follow" into
 * "pan". `handleMouseDown` switched mode on ANY left-button press, with no
 * movement threshold, so merely clicking the canvas (or selecting a bar)
 * stopped the live scroll and froze the background — the user had to know the
 * mode buttons to get back.
 *
 * Fix: mouse panning mirrors the touch path (which already had a 10px
 * threshold). The mode flips to "pan" only once the pointer travels past
 * DRAG_THRESHOLD_PX; a click below that stays in the current mode and falls
 * through to the bar's onClick.
 */
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: vi.fn(),
    push: vi.fn(),
    prefetch: vi.fn(),
    refresh: vi.fn(),
  }),
}));

const { default: RequestTimeline } = await import("../../../src/shared/components/RequestTimeline");
const { DRAG_THRESHOLD_PX } = await import("../../../src/shared/components/RequestTimeline.utils");

class FakeResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

let container: HTMLElement;
let root: Root;

async function settle() {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(50);
  });
}

function mouse(type: string, clientX: number, clientY = 100) {
  return new MouseEvent(type, { bubbles: true, cancelable: true, button: 0, clientX, clientY });
}

const MODES = ["follow", "live", "pan"] as const;

// The mode buttons are kit Buttons (KEA-7886): the active one is the pressed toggle.
function activeMode(): string | null {
  return (
    MODES.find(
      (m) =>
        (container.querySelector(`[data-testid="timeline-mode-${m}"]`) as HTMLElement).getAttribute(
          "aria-pressed"
        ) === "true"
    ) ?? null
  );
}

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
  await act(async () => {
    root.unmount();
  });
  container.remove();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("Timeline view mode — click vs drag", () => {
  it("a click below the drag threshold keeps follow mode", async () => {
    await act(async () => {
      root.render(<RequestTimeline />);
    });
    await settle();

    const canvas = container.querySelector('[data-testid="timeline-canvas"]') as HTMLElement;
    expect(activeMode()).toBe("follow");

    await act(async () => {
      canvas.dispatchEvent(mouse("mousedown", 300));
    });
    await settle();

    // A stray sub-threshold movement is still a click, not a drag.
    await act(async () => {
      canvas.dispatchEvent(mouse("mousemove", 300 + (DRAG_THRESHOLD_PX - 1)));
    });
    await settle();

    await act(async () => {
      canvas.dispatchEvent(mouse("mouseup", 300 + (DRAG_THRESHOLD_PX - 1)));
    });
    await settle();

    expect(activeMode()).toBe("follow");
  });

  it("a drag past the threshold switches follow -> pan", async () => {
    await act(async () => {
      root.render(<RequestTimeline />);
    });
    await settle();

    const canvas = container.querySelector('[data-testid="timeline-canvas"]') as HTMLElement;
    expect(activeMode()).toBe("follow");

    await act(async () => {
      canvas.dispatchEvent(mouse("mousedown", 300));
    });
    await settle();

    await act(async () => {
      canvas.dispatchEvent(mouse("mousemove", 300 + DRAG_THRESHOLD_PX + 20));
    });
    await settle();

    expect(activeMode()).toBe("pan");

    await act(async () => {
      canvas.dispatchEvent(mouse("mouseup", 300 + DRAG_THRESHOLD_PX + 20));
    });
    await settle();

    expect(activeMode()).toBe("pan");
  });

  it("the mode buttons still switch modes explicitly", async () => {
    await act(async () => {
      root.render(<RequestTimeline />);
    });
    await settle();

    await act(async () => {
      (container.querySelector('[data-testid="timeline-mode-pan"]') as HTMLElement).click();
    });
    await settle();
    expect(activeMode()).toBe("pan");

    await act(async () => {
      (container.querySelector('[data-testid="timeline-mode-follow"]') as HTMLElement).click();
    });
    await settle();
    expect(activeMode()).toBe("follow");
  });
});
