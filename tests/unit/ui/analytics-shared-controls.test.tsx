// @vitest-environment jsdom
/**
 * RTL coverage for the shared analytics controls moved onto the CI UI Kit (KEA-7886, lote 1):
 * ApiKeyFilterDropdown (disclosure + aria-pressed toggles, axe on the open overlay),
 * CustomRangePicker, RequestCountDateFilter and RequestCountByProviderDateTable.
 */
import React from "react";
import axe from "axe-core";
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import ApiKeyFilterDropdown from "@/shared/components/analytics/ApiKeyFilterDropdown";
import CustomRangePicker from "@/shared/components/analytics/CustomRangePicker";
import RequestCountDateFilter from "@/shared/components/analytics/RequestCountDateFilter";
import RequestCountByProviderDateTable from "@/shared/components/analytics/RequestCountByProviderDateTable";
import messages from "../../../src/i18n/messages/en.json";

// The kit Table measures itself with ResizeObserver (persistent scrollbar); jsdom lacks it.
beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

const wrap = (ui: React.ReactElement) =>
  render(
    <NextIntlClientProvider locale="en" timeZone="UTC" messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );

async function runAxe(root: HTMLElement) {
  // color-contrast needs real layout, which jsdom does not have.
  return axe.run(root, {
    runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] },
    rules: { "color-contrast": { enabled: false } },
  });
}

const KEYS = [
  { id: "k1", name: "alpha" },
  { id: "k2", name: "beta" },
];

describe("ApiKeyFilterDropdown", () => {
  it("renders nothing without keys", () => {
    const { container } = wrap(
      <ApiKeyFilterDropdown available={[]} selected={[]} onChange={() => {}} />
    );
    expect(container.textContent).toBe("");
  });

  it("labels the trigger for all, one and many selected keys", () => {
    const { rerender } = wrap(
      <ApiKeyFilterDropdown available={KEYS} selected={[]} onChange={() => {}} />
    );
    expect(screen.getByRole("button", { name: "All Keys" })).toBeTruthy();
    const withIntl = (selected: string[]) => (
      <NextIntlClientProvider locale="en" timeZone="UTC" messages={messages}>
        <ApiKeyFilterDropdown available={KEYS} selected={selected} onChange={() => {}} />
      </NextIntlClientProvider>
    );
    rerender(withIntl(["k1"]));
    expect(screen.getByRole("button", { name: "alpha" })).toBeTruthy();
    rerender(withIntl(["k1", "k2"]));
    expect(screen.getByRole("button", { name: "2 keys" })).toBeTruthy();
  });

  it("opens a group of aria-pressed toggles that select keys and clear back to all", async () => {
    const onChange = vi.fn();
    wrap(<ApiKeyFilterDropdown available={KEYS} selected={["k2"]} onChange={onChange} />);
    const trigger = screen.getByRole("button", { name: "beta" });
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");

    const group = screen.getByRole("group", { name: "beta" });
    // No half-implemented ARIA menu: plain toggle buttons.
    expect(group.querySelector('[role="menu"], [role="menuitemcheckbox"]')).toBeNull();
    const all = within(group).getByRole("button", { name: /All Keys/ });
    const alpha = within(group).getByRole("button", { name: "alpha" });
    const beta = within(group).getByRole("button", { name: "beta" });
    expect(all.getAttribute("aria-pressed")).toBe("false");
    expect(alpha.getAttribute("aria-pressed")).toBe("false");
    expect(beta.getAttribute("aria-pressed")).toBe("true");

    fireEvent.click(alpha);
    expect(onChange).toHaveBeenLastCalledWith(["k2", "k1"]);
    fireEvent.click(beta);
    expect(onChange).toHaveBeenLastCalledWith([]);
    fireEvent.click(all);
    expect(onChange).toHaveBeenLastCalledWith([]);

    const results = await runAxe(document.body);
    expect(results.violations.map((v) => v.id)).toEqual([]);
    expect(results.passes.length).toBeGreaterThan(0);
  });

  it("closes on Escape (focus back on the trigger) and on an outside click", () => {
    wrap(<ApiKeyFilterDropdown available={KEYS} selected={[]} onChange={() => {}} />);
    const trigger = screen.getByRole("button", { name: "All Keys" });
    fireEvent.click(trigger);
    expect(screen.queryByRole("group")).not.toBeNull();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("group")).toBeNull();
    expect(document.activeElement).toBe(trigger);

    fireEvent.click(trigger);
    expect(screen.queryByRole("group")).not.toBeNull();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole("group")).toBeNull();
  });

  it("shows a search field above five keys and filters the list", () => {
    const many = Array.from({ length: 6 }, (_, i) => ({ id: `id${i}`, name: `key-${i}` }));
    wrap(<ApiKeyFilterDropdown available={many} selected={[]} onChange={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: "All Keys" }));
    const search = screen.getByLabelText("Search keys…");
    fireEvent.change(search, { target: { value: "key-3" } });
    const group = screen.getByRole("group");
    expect(within(group).getByRole("button", { name: "key-3" })).toBeTruthy();
    expect(within(group).queryByRole("button", { name: "key-1" })).toBeNull();
    fireEvent.change(search, { target: { value: "zzz" } });
    expect(screen.getByText("No keys match")).toBeTruthy();
  });
});

describe("CustomRangePicker", () => {
  it("renders presets and labelled kit fields; apply stays disabled until the range is valid", () => {
    const onApply = vi.fn();
    wrap(<CustomRangePicker start="" end="" onApply={onApply} onClose={() => {}} />);
    expect(screen.getByText("Quick Select")).toBeTruthy();
    const start = screen.getByLabelText("Start") as HTMLInputElement;
    const end = screen.getByLabelText("End") as HTMLInputElement;
    expect(start.type).toBe("datetime-local");
    const apply = screen.getByRole("button", { name: "Apply" }) as HTMLButtonElement;
    expect(apply.disabled).toBe(true);

    fireEvent.change(start, { target: { value: "2026-10-20T10:00" } });
    fireEvent.change(end, { target: { value: "2026-10-19T10:00" } });
    expect(screen.getByText("Start must be before end")).toBeTruthy();
    expect(apply.disabled).toBe(true);

    fireEvent.change(end, { target: { value: "2026-10-21T10:00" } });
    expect(apply.disabled).toBe(false);
    fireEvent.click(apply);
    expect(onApply).toHaveBeenCalledTimes(1);
    const [isoStart, isoEnd] = onApply.mock.calls[0];
    expect(new Date(isoStart).getTime()).toBeLessThan(new Date(isoEnd).getTime());
  });

  it("fills both fields from a preset", () => {
    wrap(<CustomRangePicker start="" end="" onApply={() => {}} onClose={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: "Today" }));
    expect((screen.getByLabelText("Start") as HTMLInputElement).value).not.toBe("");
    expect((screen.getByLabelText("End") as HTMLInputElement).value).not.toBe("");
    expect((screen.getByRole("button", { name: "Apply" }) as HTMLButtonElement).disabled).toBe(
      false
    );
  });

  it("closes through Cancel, Escape and an outside click", () => {
    const onClose = vi.fn();
    wrap(<CustomRangePicker start="" end="" onApply={() => {}} onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    fireEvent.keyDown(document, { key: "Escape" });
    fireEvent.mouseDown(document.body);
    expect(onClose).toHaveBeenCalledTimes(3);
  });
});

describe("RequestCountDateFilter", () => {
  it("renders the title and date field; the clear button only appears with a value", () => {
    const onChange = vi.fn();
    const { rerender } = wrap(
      <RequestCountDateFilter title="Requests" dateLabel="Date" value="" onChange={onChange} />
    );
    expect(screen.getByText("Requests")).toBeTruthy();
    const input = screen.getByLabelText("Date") as HTMLInputElement;
    expect(input.type).toBe("date");
    expect(screen.queryByRole("button", { name: "Clear" })).toBeNull();
    fireEvent.change(input, { target: { value: "2026-10-20" } });
    expect(onChange).toHaveBeenLastCalledWith("2026-10-20");

    rerender(
      <NextIntlClientProvider locale="en" timeZone="UTC" messages={messages}>
        <RequestCountDateFilter
          title="Requests"
          dateLabel="Date"
          value="2026-10-20"
          onChange={onChange}
        />
      </NextIntlClientProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: "Clear" }));
    expect(onChange).toHaveBeenLastCalledWith("");
  });
});

describe("RequestCountByProviderDateTable", () => {
  const ROWS = [
    {
      date: "2026-10-20",
      provider: "openai",
      requests: 12,
      promptTokens: 10,
      completionTokens: 5,
      totalTokens: 15,
    },
    {
      date: "2026-10-19",
      provider: "anthropic",
      requests: 3,
      promptTokens: 1,
      completionTokens: 1,
      totalTokens: 2,
    },
  ];

  it("renders the rows in a kit table and refetches by date when the filter changes", async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ rows: ROWS })));
    vi.stubGlobal("fetch", fetchMock);
    const { container } = wrap(<RequestCountByProviderDateTable range="7d" />);
    expect(screen.getByText("Loading...")).toBeTruthy();
    await act(async () => {});
    expect(container.querySelector("table.ci-table")).not.toBeNull();
    expect(screen.getByText("openai")).toBeTruthy();
    expect(screen.getByText("anthropic")).toBeTruthy();
    expect(String(fetchMock.mock.calls[0][0])).toContain("range=7d");

    fireEvent.change(screen.getByLabelText("Date"), { target: { value: "2026-10-20" } });
    await act(async () => {});
    expect(String(fetchMock.mock.calls.at(-1)?.[0])).toContain("date=2026-10-20");
  });

  it("shows the empty and error states", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ rows: [] })))
    );
    wrap(<RequestCountByProviderDateTable range="7d" />);
    await act(async () => {});
    expect(screen.getByText("No data")).toBeTruthy();
    cleanup();

    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ error: "boom" }), { status: 500 }))
    );
    const { container } = wrap(<RequestCountByProviderDateTable range="7d" />);
    await act(async () => {});
    expect(container.querySelector(".text-error")).not.toBeNull();
    expect(container.querySelector("table")).toBeNull();
  });
});
