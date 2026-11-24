// @vitest-environment jsdom
/**
 * OmniExecutionsTab — the paginator is the Pager adapter (kit PaginationControls, summary
 * variant) and still drives the page through onPagePrev / onPageNext.
 */
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { OmniExecutionsTab } from "@/app/(dashboard)/dashboard/omni-skills/components/OmniExecutionsTab";

const executions = [
  {
    id: "e1",
    skillId: "s1",
    skillName: "Summarize",
    status: "success",
    duration: 12,
    createdAt: "2026-11-18T10:00:00.000Z",
  },
];

function renderTab(page: number, totalPages: number, total: number) {
  const onPagePrev = vi.fn();
  const onPageNext = vi.fn();
  render(
    <OmniExecutionsTab
      executions={executions}
      execPage={page}
      execTotalPages={totalPages}
      execTotal={total}
      onPagePrev={onPagePrev}
      onPageNext={onPageNext}
    />
  );
  return { onPagePrev, onPageNext };
}

afterEach(cleanup);

describe("OmniExecutionsTab paginator", { timeout: 60000 }, () => {
  it("is the kit pager, with the page summary between previous and next", () => {
    renderTab(2, 3, 27);
    const nav = document.querySelector('[data-slot="pagination"]');
    expect(nav).not.toBeNull();
    expect(nav?.textContent).toContain("Page 2 of 3 (27 total)");
  });

  it("goes back and forward through the callbacks of the page", () => {
    const { onPagePrev, onPageNext } = renderTab(2, 3, 27);
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(onPageNext).toHaveBeenCalledTimes(1);
    expect(onPagePrev).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: /previous/i }));
    expect(onPagePrev).toHaveBeenCalledTimes(1);
  });

  it("disables previous on the first page and next on the last, also with no executions", () => {
    renderTab(1, 0, 0);
    expect((screen.getByRole("button", { name: /previous/i }) as HTMLButtonElement).disabled).toBe(
      true
    );
    expect((screen.getByRole("button", { name: /next/i }) as HTMLButtonElement).disabled).toBe(
      true
    );
  });
});
