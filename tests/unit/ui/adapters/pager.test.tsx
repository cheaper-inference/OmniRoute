// @vitest-environment jsdom
// `Pager` is the dashboard pager: the kit `PaginationControls` (buttons, a numbered window or a
// "Page X of Y" summary) with every text of the kit translated from `common`.
import React from "react";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createTranslator } from "use-intl/core";
import en from "../../../../src/i18n/messages/en.json";

// A translator that shows which message was asked for, so no text can be the kit's English default.
vi.mock("next-intl", () => ({
  useTranslations: (namespace: string) => {
    const t = (key: string, values?: Record<string, unknown>) =>
      `${namespace}.${key}${values ? JSON.stringify(values) : ""}`;
    return t;
  },
  useLocale: () => "en",
}));

const { default: Pager, usePagerLabels } = await import("@/shared/components/Pager");

afterEach(() => cleanup());

describe("Pager adapter", () => {
  it("renders the kit numbered pager with every label translated", () => {
    const onPageChange = vi.fn();
    render(<Pager page={5} pageCount={12} onPageChange={onPageChange} />);

    const nav = screen.getByRole("navigation", { name: "common.pagination" });
    expect(nav.getAttribute("data-slot")).toBe("pagination");
    const inNav = within(nav);

    const previous = inNav.getByRole("button", { name: "common.previousPage" });
    const next = inNav.getByRole("button", { name: "common.nextPage" });
    expect(previous.textContent).toBe("common.previous");
    expect(next.textContent).toBe("common.next");

    // The kit window: first, current and last page, with an ellipsis on each side.
    const current = inNav.getByRole("button", { name: 'common.goToPage{"page":5}' });
    expect(current.getAttribute("aria-current")).toBe("page");
    expect(inNav.getByRole("button", { name: 'common.goToPage{"page":1}' })).not.toBeNull();
    expect(inNav.getByRole("button", { name: 'common.goToPage{"page":12}' })).not.toBeNull();
    expect(inNav.getAllByText("common.morePages")).toHaveLength(2);
    // Buttons, not links: there is no href to fake.
    expect(inNav.queryAllByRole("link")).toHaveLength(0);

    fireEvent.click(next);
    fireEvent.click(previous);
    fireEvent.click(inNav.getByRole("button", { name: 'common.goToPage{"page":12}' }));
    fireEvent.click(current);
    expect(onPageChange.mock.calls).toEqual([[6], [4], [12]]);
  });

  it("renders the summary variant and disables the ends of the range", () => {
    const onPageChange = vi.fn();
    const { rerender } = render(
      <Pager variant="summary" page={1} pageCount={3} onPageChange={onPageChange} />
    );
    expect(screen.getByText('common.pageSummary{"page":1,"pageCount":3}')).not.toBeNull();
    const previous = screen.getByRole("button", {
      name: "common.previousPage",
    }) as HTMLButtonElement;
    const next = screen.getByRole("button", { name: "common.nextPage" }) as HTMLButtonElement;
    expect(previous.disabled).toBe(true);
    expect(next.disabled).toBe(false);
    expect(screen.queryByRole("button", { name: /goToPage/ })).toBeNull();

    rerender(
      <Pager variant="summary" page={3} pageCount={3} onPageChange={onPageChange} disabled />
    );
    expect(previous.disabled).toBe(true);
    expect(next.disabled).toBe(true);
  });

  it("forwards nav props and lets a caller replace one label", () => {
    render(
      <Pager
        page={1}
        pageCount={2}
        onPageChange={() => {}}
        className="justify-end"
        data-testid="logs-pager"
        labels={{ navigation: "Log pages" }}
      />
    );
    const nav = screen.getByRole("navigation", { name: "Log pages" });
    expect(nav.className).toContain("justify-end");
    expect(nav.getAttribute("data-testid")).toBe("logs-pager");
    // The other labels stay translated.
    expect(within(nav).getByRole("button", { name: "common.nextPage" })).not.toBeNull();
  });

  it("usePagerLabels hands the same translated labels to a hand-composed pager", () => {
    let labels: ReturnType<typeof usePagerLabels> | undefined;
    function Probe() {
      labels = usePagerLabels();
      return null;
    }
    render(<Probe />);
    expect(labels).toMatchObject({
      navigation: "common.pagination",
      previous: "common.previous",
      next: "common.next",
      previousPage: "common.previousPage",
      nextPage: "common.nextPage",
      morePages: "common.morePages",
    });
    expect(labels!.goToPage(7)).toBe('common.goToPage{"page":7}');
    expect(labels!.summary(2, 9)).toBe('common.pageSummary{"page":2,"pageCount":9}');
  });

  it("the English catalog has the eight messages, with their placeholders", () => {
    const common = en.common as Record<string, unknown>;
    expect({
      pagination: common.pagination,
      previous: common.previous,
      next: common.next,
      previousPage: common.previousPage,
      nextPage: common.nextPage,
      goToPage: common.goToPage,
      morePages: common.morePages,
      pageSummary: common.pageSummary,
    }).toEqual({
      pagination: "Pagination",
      previous: "Previous",
      next: "Next",
      previousPage: "Previous page",
      nextPage: "Next page",
      goToPage: "Go to page {page}",
      morePages: "More pages",
      pageSummary: "Page {page} of {pageCount}",
    });
    // And they format with the real translator.
    const t = createTranslator({ locale: "en", messages: en, namespace: "common" });
    expect(t("goToPage", { page: 5 })).toBe("Go to page 5");
    expect(t("pageSummary", { page: 2, pageCount: 9 })).toBe("Page 2 of 9");
  });
});
