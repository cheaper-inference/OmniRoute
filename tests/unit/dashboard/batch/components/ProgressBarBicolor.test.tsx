// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, afterEach } from "vitest";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../../src/i18n/messages/en.json";

// ── Import component ──────────────────────────────────────────────────────────

const { default: ProgressBarBicolor } =
  await import("../../../../../src/app/(dashboard)/dashboard/batch/components/ProgressBarBicolor");

// ── Helpers ───────────────────────────────────────────────────────────────────

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderBar(props: {
  total: number;
  completed: number;
  failed: number;
  className?: string;
  showLabels?: boolean;
}) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ProgressBarBicolor {...props} />
      </NextIntlClientProvider>
    );
  });
  containers.push({ root, el });
  return el;
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────

afterEach(() => {
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
});

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("ProgressBarBicolor", () => {
  function bar(el: HTMLElement) {
    const progressbar = el.querySelector('[role="progressbar"]') as HTMLElement;
    expect(progressbar).not.toBeNull();
    return {
      progressbar,
      green: progressbar.querySelector('[data-tone="success"]') as HTMLElement | null,
      red: progressbar.querySelector('[data-tone="danger"]') as HTMLElement | null,
    };
  }

  it("renders the kit Progress with a named progressbar", () => {
    const el = renderBar({ total: 100, completed: 50, failed: 25 });
    const { progressbar } = bar(el);
    expect(progressbar.className).toContain("ci-progress__track");
    expect(progressbar.getAttribute("aria-label")).toBe(messages.common.batchListTableProgress);
    expect(progressbar.getAttribute("aria-valuemax")).toBe("100");
    expect(progressbar.getAttribute("aria-valuetext")).toBe("75%");
  });

  it("renders green bar at 50% when total=100, completed=50, failed=0", () => {
    const el = renderBar({ total: 100, completed: 50, failed: 0 });
    const { progressbar, green, red } = bar(el);
    expect(green).not.toBeNull();
    expect(green!.style.width).toBe("50%");
    // An empty failed segment is not drawn (the kit drops zero-width segments).
    expect(red).toBeNull();
    expect(progressbar.getAttribute("aria-valuenow")).toBe("50");
  });

  it("renders green 50% and red 25% when total=100, completed=50, failed=25", () => {
    const el = renderBar({ total: 100, completed: 50, failed: 25 });
    const { progressbar, green, red } = bar(el);
    expect(green!.style.width).toBe("50%");
    expect(red!.style.width).toBe("25%");
    expect(progressbar.getAttribute("aria-valuenow")).toBe("75");
  });

  it("renders empty bar without crash when total=0 (no NaN)", () => {
    const el = renderBar({ total: 0, completed: 0, failed: 0 });
    const { progressbar, green, red } = bar(el);
    expect(green).toBeNull();
    expect(red).toBeNull();
    expect(progressbar.getAttribute("aria-valuenow")).toBe("0");
    expect(el.innerHTML).not.toContain("NaN");
  });

  it("shows labels when showLabels=true with correct counts and percent", () => {
    const el = renderBar({ total: 100, completed: 50, failed: 25, showLabels: true });
    const text = el.textContent ?? "";
    // Should show completed count
    expect(text).toContain("50");
    // Should show failed count
    expect(text).toContain("25 failed");
    // Should show total
    expect(text).toContain("100");
    // Should show percentage: (50+25)/100 = 75%
    expect(text).toContain("75%");
  });

  it("does not show labels when showLabels=false (default)", () => {
    const el = renderBar({ total: 100, completed: 50, failed: 25, showLabels: false });
    // No label div should be present (just the bar container)
    const labelDiv = el.querySelector(".flex.items-center.justify-between");
    expect(labelDiv).toBeNull();
  });
});
