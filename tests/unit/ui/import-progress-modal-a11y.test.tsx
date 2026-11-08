// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, afterEach } from "vitest";

// KEA-7886 lote 2a review: the "fetching" phase has no measurable progress, so its bar must
// stay out of the accessibility tree instead of announcing a fabricated 60 %. The determinate
// "importing" bar keeps its real progressbar semantics.

const { default: ImportProgressModal } =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/ImportProgressModal");

type Phase = "idle" | "fetching" | "importing" | "done" | "warning" | "error";

const roots: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function render(phase: Phase, current = 0, total = 0) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(
      <ImportProgressModal
        isOpen
        onClose={() => {}}
        t={((key: string) => key) as never}
        importProgress={{
          phase,
          current,
          total,
          status: "status",
          logs: [],
          error: "",
          importedCount: 0,
        }}
      />
    );
  });
  roots.push({ root, el });
}

/** Progressbars a screen reader can reach: not inside an aria-hidden subtree. */
function exposedProgressbars(): Element[] {
  return Array.from(document.body.querySelectorAll('[role="progressbar"]')).filter(
    (node) => !node.closest('[aria-hidden="true"]')
  );
}

afterEach(() => {
  for (const { root, el } of roots.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
});

describe("ImportProgressModal progress semantics", () => {
  it("does not expose a fabricated progress value while fetching", () => {
    render("fetching");
    expect(document.body.querySelector('[role="dialog"]')).not.toBeNull();
    const exposed = exposedProgressbars();
    expect(exposed.some((node) => node.getAttribute("aria-valuenow") === "60")).toBe(false);
    expect(exposed).toHaveLength(0);
  });

  it("keeps the determinate bar exposed with its real value while importing", () => {
    render("importing", 3, 10);
    const exposed = exposedProgressbars();
    expect(exposed).toHaveLength(1);
    const bar = exposed[0];
    const max = Number(bar.getAttribute("aria-valuemax"));
    const now = Number(bar.getAttribute("aria-valuenow"));
    expect(now / max).toBeCloseTo(0.3, 5);
  });
});
