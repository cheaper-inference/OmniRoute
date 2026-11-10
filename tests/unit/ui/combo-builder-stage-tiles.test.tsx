// @vitest-environment jsdom
/**
 * #19066 leftover (combo builder stages): the builder stepper tiles were raw `<button>`s under a
 * `kit-exception:` comment. They are kit `Tile`s now; the stepper keeps its semantics: the
 * current stage is `aria-current="step"`, locked stages are disabled, and each tile is named by
 * the stage label and described by its description and status line.
 */
import React from "react";
import "@testing-library/jest-dom/vitest";
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn(), prefetch: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/dashboard/combos",
}));

const { default: CombosPage } = await import("@/app/(dashboard)/dashboard/combos/page");

beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

function payload(url: string): unknown {
  if (url.startsWith("/api/combos/metrics")) return { metrics: {} };
  if (url.startsWith("/api/combos/builder/options")) return { providers: [], combos: [] };
  if (url.startsWith("/api/combos")) return { combos: [] };
  if (url.startsWith("/api/providers")) return { connections: [] };
  if (url.startsWith("/api/provider-nodes")) return { nodes: [] };
  if (url.startsWith("/api/models/alias")) return { aliases: {} };
  return {};
}

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = typeof input === "string" ? input : input.toString();
      return new Response(JSON.stringify(payload(url)), { status: 200 });
    })
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

async function openBuilder() {
  render(<CombosPage />);
  const create = await screen.findAllByRole("button", { name: /create combo/i });
  await act(async () => {
    fireEvent.click(create[0]);
  });
  return screen.findByRole("dialog");
}

// The 5k-line combos page takes a while to mount cold in jsdom; the first test pays for it.
describe("combo builder stage tiles on the kit Tile", { timeout: 90_000 }, () => {
  it("renders every stage as a kit Tile with the stepper semantics", async () => {
    const dialog = await openBuilder();
    const basics = await within(dialog).findByTestId("combo-builder-stage-basics");
    const steps = within(dialog).getByTestId("combo-builder-stage-steps");

    for (const tile of [basics, steps]) {
      expect(tile.tagName).toBe("BUTTON");
      expect(tile).toHaveClass("ci-tile");
      expect(tile).toHaveAttribute("data-slot", "tile");
      // A stage is a step in a sequence, not a toggle.
      expect(tile).not.toHaveAttribute("aria-pressed");
    }

    // The first stage is current; a later stage stays locked until the name is valid.
    expect(basics).toHaveAttribute("aria-current", "step");
    expect(steps).not.toHaveAttribute("aria-current");
    expect(steps).toBeDisabled();

    // Named by the stage label, described by its description and status line.
    expect(basics).toHaveAccessibleName("Basics");
    expect(steps).toHaveAccessibleName("Steps");
    // The tiles are reachable by role and name, not only by test id.
    expect(within(dialog).getByRole("button", { name: "Basics" })).toBe(basics);
    expect(basics.getAttribute("aria-describedby")).toBeTruthy();
    expect(basics).toHaveAccessibleDescription(/Current/);
    expect(steps).toHaveAccessibleDescription(/Locked/);
  });

  it("unlocks and moves to the next stage once the combo has a valid name", async () => {
    const dialog = await openBuilder();
    const steps = await within(dialog).findByTestId("combo-builder-stage-steps");
    expect(steps).toBeDisabled();
    await act(async () => {
      fireEvent.change(within(dialog).getByTestId("combo-name-input"), {
        target: { value: "my-combo" },
      });
    });
    await waitFor(() => expect(steps).toBeEnabled());
    await act(async () => {
      fireEvent.click(steps);
    });
    expect(steps).toHaveAttribute("aria-current", "step");
    expect(within(dialog).getByTestId("combo-builder-stage-basics")).not.toHaveAttribute(
      "aria-current"
    );
  });
});
