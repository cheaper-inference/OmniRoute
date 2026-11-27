// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from "vitest";

// ── Polyfill ResizeObserver ────────────────────────────────────────────────

beforeAll(() => {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

// ── Mocks ─────────────────────────────────────────────────────────────────

// ReactFlow's Handle/Position require a ReactFlowProvider context.
// We stub the xyflow module so EngineNode can render without the provider.
vi.mock("@xyflow/react", async () => {
  const actual = (await vi.importActual("@xyflow/react")) as Record<string, unknown>;
  return {
    ...actual,
    Handle: (_props: Record<string, unknown>) => null,
    Position: { Left: "left", Right: "right", Top: "top", Bottom: "bottom" },
  };
});

// ── Import after mocks ─────────────────────────────────────────────────────

const { EngineNode } =
  await import("@/app/(dashboard)/dashboard/compression/studio/nodes/EngineNode");

// ── Helpers ───────────────────────────────────────────────────────────────

const containers: HTMLElement[] = [];

function mount(ui: React.ReactElement): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);
  const root = createRoot(container);
  act(() => {
    root.render(ui);
  });
  return container;
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
});

// ── Sample data ───────────────────────────────────────────────────────────

const SAMPLE_ENGINE_DATA = {
  id: "engine-0",
  type: "engine",
  position: { x: 200, y: 0 },
  data: {
    engine: "caveman",
    originalTokens: 900,
    compressedTokens: 729,
    savingsPercent: 19.0,
    techniquesUsed: ["filler-drop", "dedup"],
    durationMs: 5.3,
    stepState: "done" as const,
    label: "caveman",
  },
};

// NodeProps-compatible shim
const nodeProps = {
  ...SAMPLE_ENGINE_DATA,
  selected: false,
  isConnectable: true,
  dragging: false,
  zIndex: 0,
  positionAbsoluteX: 200,
  positionAbsoluteY: 0,
  width: 180,
  height: 80,
} as unknown as Parameters<typeof EngineNode>[0];

// ── Tests ─────────────────────────────────────────────────────────────────

describe("EngineNode", () => {
  it("renders the engine name", () => {
    const container = mount(<EngineNode {...nodeProps} />);
    expect(container.textContent).toContain("caveman");
  });

  it("shows the savings percentage", () => {
    const container = mount(<EngineNode {...nodeProps} />);
    const el = container.querySelector("[data-testid='savings-percent']");
    expect(el).toBeTruthy();
    expect(el?.textContent).toContain("19.0");
  });

  it("shows technique names", () => {
    const container = mount(<EngineNode {...nodeProps} />);
    expect(container.textContent).toContain("filler-drop");
  });

  it("marks a skipped node (tokensIn === tokensOut)", () => {
    const skippedProps = {
      ...nodeProps,
      data: {
        ...SAMPLE_ENGINE_DATA.data,
        compressedTokens: SAMPLE_ENGINE_DATA.data.originalTokens,
        savingsPercent: 0,
        stepState: "skipped" as const,
      },
    };
    const container = mount(<EngineNode {...skippedProps} />);
    expect(container.textContent).toContain("skip");
  });

  it("is the kit FlowNode: the savings ramp is its status tone and the savings its state line", () => {
    const tone = (savingsPercent: number) => {
      const container = mount(
        <EngineNode {...nodeProps} data={{ ...SAMPLE_ENGINE_DATA.data, savingsPercent }} />
      );
      return container.querySelector('[data-slot="flow-node"]')?.getAttribute("data-status");
    };
    expect(tone(45)).toBe("success");
    expect(tone(19)).toBe("warning");
    expect(tone(3)).toBeNull();

    const container = mount(<EngineNode {...nodeProps} />);
    expect(container.querySelector(".ci-flow-node__title")?.textContent).toBe("caveman");
    expect(container.querySelector(".ci-flow-node__description")?.textContent).toBe(
      "filler-drop, dedup"
    );
    expect(
      container.querySelector(".ci-flow-node__status [data-testid='savings-percent']")
    ).toBeTruthy();
  });

  it("a running step is the active FlowNode in the warning tone", () => {
    const container = mount(
      <EngineNode
        {...nodeProps}
        data={{ ...SAMPLE_ENGINE_DATA.data, stepState: "running" as const }}
      />
    );
    const node = container.querySelector('[data-slot="flow-node"]');
    expect(node?.getAttribute("data-status")).toBe("warning");
    expect(node?.getAttribute("data-active")).toBe("true");
  });

  it("a skipped step says so in a badge and has no status", () => {
    const container = mount(
      <EngineNode
        {...nodeProps}
        data={{
          ...SAMPLE_ENGINE_DATA.data,
          compressedTokens: SAMPLE_ENGINE_DATA.data.originalTokens,
          savingsPercent: 0,
          stepState: "skipped" as const,
        }}
      />
    );
    expect(container.querySelector('.ci-flow-node__meta [data-slot="badge"]')?.textContent).toBe(
      "skip"
    );
    expect(container.querySelector('[data-slot="flow-node"]')?.hasAttribute("data-status")).toBe(
      false
    );
    expect(container.querySelector("[data-testid='savings-percent']")).toBeNull();
  });

  it("layer pills are badges in the layer's chart tone", () => {
    const container = mount(
      <EngineNode {...nodeProps} data={{ ...SAMPLE_ENGINE_DATA.data, engine: "rtk" }} />
    );
    const pills = Array.from(container.querySelectorAll('.ci-flow-node__body [data-slot="badge"]'));
    expect(pills.map((p) => p.textContent)).toEqual(["L3", "L4"]);
    for (const pill of pills) expect(pill.getAttribute("data-tone")).toMatch(/^chart-[1-8]$/);
  });

  it("renders layer pills for rtk engine", () => {
    const rtkProps = {
      ...nodeProps,
      data: {
        ...SAMPLE_ENGINE_DATA.data,
        engine: "rtk",
        stepState: "done" as const,
      },
    };
    const container = mount(<EngineNode {...rtkProps} />);
    // rtk maps to L3, L4
    expect(container.textContent).toContain("L3");
    expect(container.textContent).toContain("L4");
  });
});
