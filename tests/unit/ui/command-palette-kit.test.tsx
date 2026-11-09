// @vitest-environment jsdom
import React from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import messages from "../../../src/i18n/messages/en.json";
import type { SidebarSectionChild } from "@/shared/constants/sidebarVisibility";

process.env.NEXT_PUBLIC_OMNIROUTE_E2E_MODE = "1";
const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, refresh: vi.fn() }),
  usePathname: () => "/dashboard",
}));

const { default: CommandPalette } = await import("@/shared/components/CommandPalette");
const { SIDEBAR_SECTIONS } = await import("@/shared/constants/sidebarVisibility");
const en = messages as unknown as {
  sidebar: Record<string, string> & {
    noResults: string;
    commandPalette: Record<"title" | "searchPlaceholder" | "clearSearch", string>;
  };
};
const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// jsdom has no scrollIntoView; the kit Command scrolls the active option into view
if (!Element.prototype.scrollIntoView) Element.prototype.scrollIntoView = () => {};

beforeEach(() => {
  // the palette reads hidden sidebar items from /api/settings; an empty object keeps every item
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => new Response("{}", { headers: { "content-type": "application/json" } }))
  );
});

afterEach(() => {
  cleanup();
  push.mockClear();
  vi.unstubAllGlobals();
});

describe("CommandPalette on the kit Dialog", () => {
  it(
    "opens a labelled dialog with a search input and a listbox; Enter navigates; Escape closes",
    { timeout: 20_000 },
    async () => {
      const onClose = vi.fn();
      render(<CommandPalette isOpen onClose={onClose} />);
      const dialog = await screen.findByRole("dialog", {
        name: /Quick navigation|Command palette/i,
      });
      expect(dialog.className).toContain("ci-dialog");
      expect(dialog.querySelector(".material-symbols-outlined")).toBeNull();
      const input = screen.getByRole("combobox");
      // Radix moves focus on open: no timer is involved, so it is already there
      expect(document.activeElement).toBe(input);
      expect(input.getAttribute("data-slot")).toBe("command-input");
      expect(input.getAttribute("aria-label")).toBe(en.sidebar.commandPalette.searchPlaceholder);
      expect(input.getAttribute("placeholder")).toBe(en.sidebar.commandPalette.searchPlaceholder);
      fireEvent.change(input, { target: { value: "Providers" } });
      const options = await screen.findAllByRole("option");
      expect(screen.getByRole("listbox")).not.toBeNull();
      expect(options[0].getAttribute("aria-selected")).toBe("true");
      fireEvent.keyDown(input, { key: "Enter" });
      expect(push).toHaveBeenCalledWith("/dashboard/providers");
      onClose.mockClear();
      fireEvent.keyDown(input, { key: "Escape" });
      await act(async () => {});
      expect(onClose).toHaveBeenCalledTimes(1);
    }
  );

  it(
    "the kit Command fills the dialog: no padding override, the width and top stay, the list is capped",
    { timeout: 20_000 },
    async () => {
      render(<CommandPalette isOpen onClose={vi.fn()} />);
      const dialog = await screen.findByRole("dialog");
      // `:has(> .ci-command)` drops the dialog padding, so Command must be a direct child
      const command = dialog.querySelector<HTMLElement>(":scope > .ci-command")!;
      expect(command).not.toBeNull();
      expect(dialog.className).not.toMatch(/\bp-0\b/);
      expect(dialog.className).toContain("top-[10vh]");
      expect(dialog.className).toContain("max-w-3xl");
      expect(command.className).toContain("[--ci-command-list-max-height:60vh]");
      const list = screen.getByRole("listbox");
      expect(list.getAttribute("aria-label")).toBe(en.sidebar.commandPalette.title);
      expect(dialog.querySelector("button.ci-menu__item")).toBeNull();
    }
  );

  it(
    "moves with the arrows inside the input and ignores keys outside it",
    { timeout: 20_000 },
    async () => {
      render(<CommandPalette isOpen onClose={vi.fn()} />);
      const input = await screen.findByRole("combobox");
      const options = await screen.findAllByRole("option");
      expect(input.getAttribute("aria-activedescendant")).toBe(options[0].id);
      fireEvent.keyDown(input, { key: "ArrowDown" });
      expect(input.getAttribute("aria-activedescendant")).toBe(options[1].id);
      expect(options[1].getAttribute("aria-selected")).toBe("true");
      fireEvent.keyDown(input, { key: "ArrowUp" });
      fireEvent.keyDown(input, { key: "ArrowUp" });
      expect(input.getAttribute("aria-activedescendant")).toBe(options[options.length - 1].id);
      // the document listener is gone: Enter only acts from the search field
      fireEvent.keyDown(document.body, { key: "Enter" });
      expect(push).not.toHaveBeenCalled();
    }
  );

  it("clicking a row navigates and closes", { timeout: 20_000 }, async () => {
    const onClose = vi.fn();
    render(<CommandPalette isOpen onClose={onClose} />);
    const input = await screen.findByRole("combobox");
    fireEvent.change(input, { target: { value: "Providers" } });
    fireEvent.click((await screen.findAllByRole("option"))[0]);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith("/dashboard/providers");
  });

  it("finds a row by its subtitle, its section and its subgroup", { timeout: 20_000 }, async () => {
    render(<CommandPalette isOpen onClose={vi.fn()} />);
    const input = await screen.findByRole("combobox");
    const section = SIDEBAR_SECTIONS.find((candidate) =>
      candidate.children.some((child) => "type" in child && child.type === "group")
    )!;
    const group = section.children.find(
      (child): child is Extract<SidebarSectionChild, { type: "group" }> =>
        "type" in child && child.type === "group"
    )!;
    const groupItem = group.items[0];

    const sectionTitle = en.sidebar[section.titleKey] ?? section.titleFallback;
    fireEvent.change(input, { target: { value: sectionTitle } });
    expect(screen.getAllByRole("option").length).toBeGreaterThan(0);

    const groupTitle = en.sidebar[group.titleKey] ?? group.titleFallback;
    fireEvent.change(input, { target: { value: groupTitle } });
    const label = en.sidebar[groupItem.i18nKey] ?? groupItem.labelFallback ?? groupItem.id;
    expect(screen.getByRole("option", { name: new RegExp(escapeRegExp(label)) })).not.toBeNull();

    const subtitled = SIDEBAR_SECTIONS.flatMap((candidate) => candidate.children)
      .flatMap((child) => ("type" in child && child.type === "group" ? child.items : [child]))
      .find((item) => "subtitleKey" in item && item.subtitleKey && en.sidebar[item.subtitleKey])!;
    const subtitle = en.sidebar[subtitled.subtitleKey!];
    fireEvent.change(input, { target: { value: subtitle } });
    const row = screen
      .getAllByRole("option")
      .find((option) => option.textContent?.includes(subtitle))!;
    expect(row.querySelector(".ci-command__description")?.textContent).toBe(subtitle);
  });

  it(
    "shows the empty state, and the clear button resets the list and keeps typing live",
    { timeout: 20_000 },
    async () => {
      render(<CommandPalette isOpen onClose={vi.fn()} />);
      const input = await screen.findByRole("combobox");
      const clearName = en.sidebar.commandPalette.clearSearch;
      expect(screen.queryByRole("button", { name: clearName })).toBeNull();
      fireEvent.change(input, { target: { value: "zzz-no-such-page" } });
      expect(screen.queryAllByRole("option")).toHaveLength(0);
      expect(screen.getByRole("status").textContent).toBe(en.sidebar.noResults);

      const clear = screen.getByRole("button", { name: clearName });
      // a press takes focus to the button, which then unmounts: nothing would receive the arrows
      clear.focus();
      fireEvent.click(clear);
      expect((input as HTMLInputElement).value).toBe("");
      expect(screen.getAllByRole("option").length).toBeGreaterThan(0);
      expect(screen.getByRole("status").textContent).toBe("");
      expect(document.activeElement).toBe(input);
    }
  );

  it(
    "opens external rows in a new tab and marks them in the shortcut slot",
    { timeout: 20_000 },
    async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn(
          async () =>
            new Response(JSON.stringify({ radarAdminUrl: "https://radar.example.com/admin" }), {
              headers: { "content-type": "application/json" },
            })
        )
      );
      const open = vi.spyOn(window, "open").mockReturnValue(null);
      const onClose = vi.fn();
      render(<CommandPalette isOpen onClose={onClose} />);
      const input = await screen.findByRole("combobox");
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });
      fireEvent.change(input, { target: { value: "Private operations panel" } });
      const [row] = await screen.findAllByRole("option");
      expect(row.querySelector(".ci-command__shortcut svg")).not.toBeNull();
      fireEvent.keyDown(input, { key: "Enter" });
      expect(open).toHaveBeenCalledWith(
        "https://radar.example.com/admin",
        "_blank",
        "noopener,noreferrer"
      );
      expect(push).not.toHaveBeenCalled();
      expect(onClose).toHaveBeenCalledTimes(1);
      open.mockRestore();
    }
  );

  it("leaves internal rows without a shortcut", { timeout: 20_000 }, async () => {
    render(<CommandPalette isOpen onClose={vi.fn()} />);
    const input = await screen.findByRole("combobox");
    fireEvent.change(input, { target: { value: "Providers" } });
    const [row] = await screen.findAllByRole("option");
    expect(row.querySelector(".ci-command__shortcut")).toBeNull();
    expect(row.querySelector(".ci-command__icon svg")).not.toBeNull();
  });

  // F4 (F1 checkpoint pendência): the palette has no DialogTrigger and its search field takes
  // focus itself, so Radix had nothing to return focus to and Escape left it on <body>.
  it(
    "returns focus to the opener when Escape closes the palette",
    { timeout: 20_000 },
    async () => {
      function Harness() {
        const [open, setOpen] = React.useState(false);
        return (
          <>
            <button type="button" onClick={() => setOpen(true)}>
              Open palette
            </button>
            <CommandPalette isOpen={open} onClose={() => setOpen(false)} />
          </>
        );
      }
      render(<Harness />);
      const opener = screen.getByRole("button", { name: "Open palette" });
      act(() => {
        opener.focus();
        opener.click();
      });
      const input = await screen.findByRole("combobox");
      expect(document.activeElement).toBe(input);
      fireEvent.keyDown(input, { key: "Escape" });
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });
      expect(screen.queryByRole("dialog")).toBeNull();
      expect(document.activeElement).toBe(opener);
    }
  );

  it("renders nothing while closed", () => {
    render(<CommandPalette isOpen={false} onClose={vi.fn()} />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
