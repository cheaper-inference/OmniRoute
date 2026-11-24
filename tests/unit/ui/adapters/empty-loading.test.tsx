// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const { default: EmptyState } = await import("@/shared/components/EmptyState");
const {
  default: Loading,
  Spinner,
  PageLoading,
  Skeleton,
  CardSkeleton,
} = await import("@/shared/components/Loading");

afterEach(() => cleanup());

describe("EmptyState / Loading adapters", () => {
  it("EmptyState renders kit empty state with Lucide icon for a Material name and an action", () => {
    const onAction = vi.fn();
    const { container } = render(
      <EmptyState
        icon="inbox"
        title="Nothing"
        description="Add one"
        actionLabel="Add"
        onAction={onAction}
      />
    );
    expect(container.querySelector("[data-slot=empty-state], .ci-empty-state")).not.toBeNull();
    expect(container.querySelector("svg.oi-icon")).not.toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("EmptyState with an emoji icon keeps the emoji and falls back to the translated title", () => {
    const { container } = render(<EmptyState icon="📭" />);
    expect(container.textContent).toContain("📭");
    // The emoji must fit the kit's 2.5rem icon tile.
    expect(screen.getByText("📭").className).toContain("text-2xl");
    expect(screen.getByRole("heading").textContent!.length).toBeGreaterThan(0);
  });

  // Kit `alert-compact-empty-inline`: the adapter used to drop every prop but the legacy five.
  it("EmptyState forwards compact, layout and border to the kit", () => {
    const { container, rerender } = render(<EmptyState title="Nothing" compact />);
    const root = () => container.querySelector<HTMLElement>("[data-slot=empty-state]")!;
    expect(root().getAttribute("data-compact")).toBe("true");
    expect(root().hasAttribute("data-layout")).toBe(false);
    expect(root().hasAttribute("data-border")).toBe(false);
    rerender(<EmptyState title="Nothing" border="none" />);
    expect(root().getAttribute("data-border")).toBe("none");
    rerender(<EmptyState title="No rules yet" layout="inline" border="dashed" />);
    expect(root().getAttribute("data-layout")).toBe("inline");
    expect(root().getAttribute("data-border")).toBe("dashed");
  });

  it("EmptyState inline is one line of text: a paragraph, and no icon unless one is named", () => {
    const { container, rerender } = render(<EmptyState title="No rules yet" layout="inline" />);
    // Not a heading: an inline empty state sits inside a list, a field or a table cell.
    expect(screen.queryByRole("heading")).toBeNull();
    expect(screen.getByText("No rules yet").tagName).toBe("P");
    expect(container.querySelector(".ci-empty-state__icon")).toBeNull();
    rerender(<EmptyState title="No rules yet" layout="inline" icon="filter_list" />);
    expect(container.querySelector(".ci-empty-state__icon svg.oi-icon")).not.toBeNull();
    // The stacked panel keeps its default icon.
    rerender(<EmptyState title="No rules yet" />);
    expect(container.querySelector(".ci-empty-state__icon svg.oi-icon")).not.toBeNull();
    expect(screen.getByRole("heading").textContent).toBe("No rules yet");
  });

  it("EmptyState takes ready-made actions, which win over actionLabel/onAction", () => {
    const onAction = vi.fn();
    const onSecond = vi.fn();
    const { container } = render(
      <EmptyState
        title="Nothing"
        actionLabel="Legacy"
        onAction={onAction}
        actions={
          <>
            <button type="button">First</button>
            <button type="button" onClick={onSecond}>
              Second
            </button>
          </>
        }
      />
    );
    const actions = container.querySelector(".ci-empty-state__actions")!;
    expect(actions.querySelectorAll("button")).toHaveLength(2);
    expect(screen.queryByRole("button", { name: "Legacy" })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Second" }));
    expect(onSecond).toHaveBeenCalledTimes(1);
    expect(onAction).not.toHaveBeenCalled();
  });

  it("EmptyState inline keeps the legacy action as a small button at the end of the line", () => {
    const onAction = vi.fn();
    render(
      <EmptyState title="No keys" layout="inline" actionLabel="Add key" onAction={onAction} />
    );
    const button = screen.getByRole("button", { name: "Add key" });
    expect(button.closest(".ci-empty-state__actions")).not.toBeNull();
    expect(button.getAttribute("data-size")).toBe("sm");
    fireEvent.click(button);
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("Spinner/PageLoading expose role=status with a label; Skeleton is aria-hidden", () => {
    render(
      <>
        <Spinner label="Loading rows" />
        <PageLoading message="Loading page" />
        <Skeleton data-testid="sk" />
        <CardSkeleton />
      </>
    );
    expect(screen.getByRole("status", { name: "Loading rows" })).not.toBeNull();
    expect(screen.getByText("Loading page")).not.toBeNull();
    expect(screen.getByTestId("sk").getAttribute("aria-hidden")).toBe("true");
    expect(screen.getByTestId("sk").className).toContain("ci-skeleton");
  });

  it("Spinner is the kit spinner: a labelled status on the primary ink by default", () => {
    const { container } = render(<Spinner />);
    const status = screen.getByRole("status");
    expect(status.getAttribute("data-slot")).toBe("spinner");
    expect(status.getAttribute("aria-live")).toBe("polite");
    expect(status.className).toContain("text-primary");
    expect(status.textContent!.length).toBeGreaterThan(0);
    // The kit draws the arc and stops it under reduced motion: no Lucide glyph, no local spin.
    expect(container.querySelector("[data-icon]")).toBeNull();
    expect(container.querySelector(".animate-spin")).toBeNull();
  });

  it("Spinner keeps a caller colour over the default one", () => {
    render(<Spinner label="Detecting" className="text-text-muted" />);
    const status = screen.getByRole("status", { name: "Detecting" });
    expect(status.className).toContain("text-text-muted");
    expect(status.className).not.toContain("text-primary");
  });

  it("a decorative Spinner has no status role or label and inherits the colour", () => {
    const { container } = render(<Spinner decorative size="xs" className="mr-2" />);
    const spinner = container.querySelector<HTMLElement>('[data-slot="spinner"]')!;
    expect(spinner.getAttribute("aria-hidden")).toBe("true");
    expect(spinner.getAttribute("data-size")).toBe("xs");
    expect(spinner.className).toContain("mr-2");
    expect(spinner.className).not.toContain("text-primary");
    expect(spinner.textContent).toBe("");
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("Spinner keeps the 16/24/32/48 steps: the kit box up to sm, a utility above it", () => {
    const { container } = render(
      <>
        <Spinner decorative size="sm" />
        <Spinner decorative />
        <Spinner decorative size="lg" />
        <Spinner decorative size="xl" />
      </>
    );
    const [sm, md, lg, xl] = Array.from(container.querySelectorAll('[data-slot="spinner"]'));
    expect(sm.getAttribute("data-size")).toBe("sm");
    expect(sm.className).not.toMatch(/\bsize-/);
    expect(md.className).toContain("size-6");
    expect(lg.className).toContain("size-8");
    expect(xl.className).toContain("size-12");
  });

  it("Loading dispatches by type", () => {
    const { container, rerender } = render(<Loading type="spinner" />);
    expect(container.querySelector("[role=status]")).not.toBeNull();
    rerender(<Loading type="card" />);
    expect(container.querySelectorAll(".ci-skeleton").length).toBeGreaterThan(1);
  });
});
