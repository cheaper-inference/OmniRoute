// @vitest-environment jsdom
import React from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

process.env.NEXT_PUBLIC_OMNIROUTE_E2E_MODE = "1";
const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, refresh: vi.fn() }),
  usePathname: () => "/dashboard",
}));

const { default: CommandPalette } = await import("@/shared/components/CommandPalette");

// jsdom has no scrollIntoView; the palette scrolls the selected option into view
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
      const input = screen.getByRole("searchbox");
      expect(document.activeElement).toBe(input);
      // our own clear button replaces the native search cancel (×), which would double it
      expect(input.className).toContain("[&::-webkit-search-cancel-button]:appearance-none");
      // with an icon the border/ring live on the kit .ci-input-shell, so that is what gets flattened
      const field = input.closest(".ci-input-shell")!.parentElement!;
      expect(field.className).toContain("[&_.ci-input-shell]:border-0");
      expect(field.className).toContain("[&_.ci-input-shell]:shadow-none");
      expect(input.className).not.toContain("border-0");
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
      const input = await screen.findByRole("searchbox");
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 60));
      });
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
