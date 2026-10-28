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

  it("Loading dispatches by type", () => {
    const { container, rerender } = render(<Loading type="spinner" />);
    expect(container.querySelector("[role=status]")).not.toBeNull();
    rerender(<Loading type="card" />);
    expect(container.querySelectorAll(".ci-skeleton").length).toBeGreaterThan(1);
  });
});
