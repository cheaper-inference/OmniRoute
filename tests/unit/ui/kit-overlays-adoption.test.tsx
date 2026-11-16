// @vitest-environment jsdom
/**
 * UI review 2026-11-15, defect 16: panels and tooltips positioned by hand (`absolute … z-50`,
 * local state, hand-made Escape / outside-click) had no portal and no collision handling. This
 * pins the rendered contract of the ones moved onto the kit: the panel is portaled out of the
 * component (Radix), Escape closes it and returns focus to the trigger, and a tooltip opens on
 * keyboard focus as well as on hover. The static inventory is guarded by
 * tests/unit/hand-positioned-overlays.test.ts.
 */
import React from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import messages from "../../../src/i18n/messages/en.json";
import ClaudeCcDiscoveryInfoButton from "../../../src/app/(dashboard)/dashboard/cli-code/components/ClaudeCcDiscoveryInfoButton";
import { SessionPicker } from "../../../src/app/(dashboard)/dashboard/tools/traffic-inspector/components/session/SessionPicker";
import CacheTrends from "../../../src/app/(dashboard)/dashboard/cache/components/CacheTrends";
import ComboDefaultsTab from "../../../src/app/(dashboard)/dashboard/settings/components/ComboDefaultsTab";

afterEach(cleanup);

const popoverPanel = () => document.querySelector<HTMLElement>('[data-slot="popover-content"]');

/** Radix hands focus back to the trigger one tick after the panel unmounts. */
async function nextTick() {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

describe("ClaudeCcDiscoveryInfoButton", () => {
  it("opens the explanation in a portaled kit Popover and closes it on Escape", async () => {
    const { container } = render(<ClaudeCcDiscoveryInfoButton />);
    const trigger = screen.getByRole("button", { name: messages.cliTools.ccDiscoveryInfoButton });
    expect(popoverPanel()).toBeNull();
    expect(trigger.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(trigger);
    const panel = popoverPanel()!;
    expect(panel).not.toBeNull();
    expect(panel.classList.contains("ci-popover")).toBe(true);
    // Portaled to the body: an `overflow: hidden` card cannot clip it.
    expect(container.contains(panel)).toBe(false);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(panel.textContent).toContain(messages.cliTools.ccDiscoveryInfoTooltip);
    expect(panel.querySelector("a")?.getAttribute("href")).toBe(
      "/dashboard/settings/feature-flags"
    );

    fireEvent.keyDown(document, { key: "Escape" });
    expect(popoverPanel()).toBeNull();
    await nextTick();
    expect(document.activeElement).toBe(trigger);
  });
});

describe("SessionPicker", () => {
  const sessions = [
    { id: "abcdef123", name: "Checkout flow", requestCount: 3 },
    { id: "fedcba987", name: undefined, requestCount: 1 },
  ] as never[];

  it("lists the sessions in a portaled kit Popover and closes after a choice", () => {
    const onSelect = vi.fn();
    const { container } = render(
      <SessionPicker sessions={sessions} onSelect={onSelect} onDelete={() => {}} />
    );
    const trigger = screen.getByRole("button", { name: messages.trafficInspector.sessions });
    fireEvent.click(trigger);
    const panel = popoverPanel()!;
    expect(panel).not.toBeNull();
    expect(container.contains(panel)).toBe(false);

    fireEvent.click(screen.getByRole("button", { name: /Checkout flow/ }));
    expect(onSelect).toHaveBeenCalledWith("abcdef123");
    expect(popoverPanel()).toBeNull();
  });

  it("closes on Escape with focus back on the trigger, and deletes without closing", async () => {
    const onDelete = vi.fn();
    const onSelect = vi.fn();
    render(
      <SessionPicker
        sessions={sessions}
        selectedId="abcdef123"
        onSelect={onSelect}
        onDelete={onDelete}
      />
    );
    const trigger = screen.getByRole("button", { name: /Checkout flow/ });
    fireEvent.click(trigger);
    const deleteButtons = screen.getAllByRole("button", {
      name: messages.trafficInspector.deleteSession,
    });
    fireEvent.click(deleteButtons[0]);
    expect(onDelete).toHaveBeenCalledWith("abcdef123");
    // Deleting the selected session falls back to all traffic.
    expect(onSelect).toHaveBeenCalledWith(undefined);
    expect(popoverPanel()).not.toBeNull();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(popoverPanel()).toBeNull();
    await nextTick();
    expect(document.activeElement).toBe(trigger);
  });
});

describe("CacheTrends", () => {
  const data = [
    {
      timestamp: "2026-04-01T00:00:00Z",
      requests: 120,
      cachedRequests: 100,
      inputTokens: 1200,
      cachedTokens: 1000,
      cacheCreationTokens: 0,
    },
  ];

  it("shows the hour detail in a kit Tooltip on keyboard focus, not in a CSS-hover box", () => {
    const { container } = render(<CacheTrends data={data} />);
    const bar = container.querySelector<HTMLElement>('[data-testid="trend-bar"]')!;
    // No hand-positioned hover box inside the bar any more.
    expect(bar.querySelector(".absolute")).toBeNull();
    expect(document.querySelector('[role="tooltip"]')).toBeNull();
    // Reachable by keyboard.
    expect(bar.tabIndex).toBe(0);

    act(() => bar.focus());
    const tooltip = document.querySelector<HTMLElement>('[role="tooltip"]')!;
    expect(tooltip).not.toBeNull();
    expect(container.contains(tooltip)).toBe(false);
    expect(tooltip.textContent).toContain("120");
    expect(tooltip.textContent).toContain("100");
    expect(tooltip.textContent?.toLowerCase()).toContain(messages.cache.cached.toLowerCase());

    fireEvent.keyDown(document, { key: "Escape" });
    expect(document.querySelector('[role="tooltip"]')).toBeNull();
  });
});

describe("ComboDefaultsTab provider picker", () => {
  function okJson(data: unknown) {
    return Promise.resolve({ ok: true, json: () => Promise.resolve(data) } as Response);
  }

  afterEach(() => vi.unstubAllGlobals());

  it("adds a provider override from the kit SearchableSelect, by search and keyboard", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn((url: string) => {
        if (String(url).includes("/combo-defaults")) return okJson({ comboDefaults: {} });
        if (String(url).includes("/api/providers")) {
          return okJson([
            { id: "c1", provider: "openai" },
            { id: "c2", provider: "anthropic" },
          ]);
        }
        return okJson({});
      })
    );
    const { container } = render(<ComboDefaultsTab />);
    await nextTick();

    // Plain selectors: role queries walk the whole (large) settings tab and are slow under jsdom.
    const picker = () =>
      container.querySelector<HTMLButtonElement>('button[aria-haspopup="listbox"]')!;
    // The tab has other comboboxes (kit Select triggers): take the picker's own search field.
    const searchBox = () =>
      document.querySelector<HTMLInputElement>(".ci-searchable-select__popover input")!;
    const optionLabels = () =>
      Array.from(document.querySelectorAll('[role="option"]')).map((option) => option.textContent);

    const placeholder = messages.settings.selectProviderPlaceholder;
    expect(picker().getAttribute("aria-label")).toBe(placeholder);
    expect(picker().textContent).toContain(placeholder);
    // No hand-made listbox in the page until the picker opens.
    expect(document.querySelector('[role="listbox"]')).toBeNull();

    fireEvent.click(picker());
    const listbox = document.querySelector<HTMLElement>('[role="listbox"]')!;
    expect(listbox).not.toBeNull();
    // Portaled to the body by the kit Popover: the settings card cannot clip it.
    expect(container.contains(listbox)).toBe(false);
    expect(optionLabels()).toEqual(["anthropic", "openai"]);

    // The kit lowercases the query with the browser locale. In a Turkish-locale browser "OPENAI"
    // becomes "openaı" (dotless ı); the old hand-made search folded both sides and still matched.
    fireEvent.change(searchBox(), { target: { value: "OPENAI".toLocaleLowerCase("tr") } });
    expect(optionLabels()).toEqual(["openai"]);

    fireEvent.change(searchBox(), { target: { value: "anth" } });
    const options = listbox.querySelectorAll('[role="option"]');
    expect(options).toHaveLength(1);
    // The active option is announced to assistive tech (the hand-made list had no such link).
    expect(searchBox().getAttribute("aria-activedescendant")).toBe(options[0].id);

    fireEvent.keyDown(searchBox(), { key: "Enter" });
    expect(document.querySelector('[role="listbox"]')).toBeNull();
    expect(container.textContent).toContain("anthropic");
    // The picker holds no value: it shows the placeholder again and no longer offers the provider.
    expect(picker().textContent).toContain(placeholder);
    fireEvent.click(picker());
    expect(optionLabels()).toEqual(["openai"]);

    fireEvent.change(searchBox(), { target: { value: "zzz" } });
    expect(document.querySelector('[role="listbox"]')?.textContent).toContain(
      messages.settings.noProvidersFound
    );
  });
});
