// @vitest-environment jsdom
import React from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const { default: Icon, MISSING_ICON_GLYPH } = await import("@/shared/components/Icon");
const { ICON_MAP } = await import("@/shared/constants/iconMap");

afterEach(() => cleanup());

describe("<Icon> adapter (icon name → Lucide only; no Material fallback)", () => {
  it("renders the mapped Lucide glyph, decorative by default", () => {
    const { container } = render(<Icon name="settings" />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg!.getAttribute("aria-hidden")).toBe("true");
    expect(svg!.getAttribute("width")).toBe("18");
    expect(svg!.classList.contains("oi-icon")).toBe(true);
    expect(svg!.classList.contains("pointer-events-none")).toBe(true);
    expect(container.querySelector(".material-symbols-outlined")).toBeNull();
  });

  it("exposes an accessible name when ariaLabel is given", () => {
    const { getByRole } = render(<Icon name="search" ariaLabel="Search" size={16} />);
    const svg = getByRole("img", { name: "Search" });
    expect(svg.getAttribute("width")).toBe("16");
  });

  it("draws a neutral placeholder glyph for an unmapped name and warns once in dev (KEA-7886 F4)", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { container, rerender } = render(<Icon name="rocket_launch_unmapped_xyz" size={16} />);
    const svg = container.querySelector("svg.oi-icon");
    expect(svg).not.toBeNull();
    expect(svg!.getAttribute("data-icon")).toBe("rocket_launch_unmapped_xyz");
    expect(svg!.getAttribute("data-icon-missing")).toBe("true");
    expect(svg!.getAttribute("aria-hidden")).toBe("true");
    expect(svg!.getAttribute("width")).toBe("16");
    // Never ligature text, never the Material font class.
    expect(container.textContent).toBe("");
    expect(container.querySelector(".material-symbols-outlined")).toBeNull();
    rerender(<Icon name="rocket_launch_unmapped_xyz" size={16} />);
    expect(
      warn.mock.calls.filter((c) => String(c[0]).includes("rocket_launch_unmapped_xyz")).length
    ).toBe(1);
    expect(String(warn.mock.calls[0][0])).toContain("is not in ICON_MAP");
    warn.mockRestore();
  });

  it("keeps the accessible name on the placeholder glyph and stays silent in production", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const env = process.env.NODE_ENV;
    try {
      (process.env as Record<string, string>).NODE_ENV = "production";
      const { getByRole } = render(<Icon name="prod_only_unmapped_xyz" ariaLabel="Status" />);
      const svg = getByRole("img", { name: "Status" });
      expect(svg.getAttribute("data-icon-missing")).toBe("true");
      expect(warn).not.toHaveBeenCalled();
    } finally {
      (process.env as Record<string, string>).NODE_ENV = env as string;
      warn.mockRestore();
    }
  });

  it("the placeholder glyph is no ICON_MAP icon, so a gap never reads as a real icon/status", async () => {
    const { createElement } = await import("react");
    const { renderToStaticMarkup } = await import("react-dom/server");
    expect(Object.values(ICON_MAP)).not.toContain(MISSING_ICON_GLYPH);
    // Same drawing too (aliases are distinct objects): compare the rendered SVG paths.
    const paths = (C: unknown) =>
      renderToStaticMarkup(createElement(C as React.ComponentType)).replace(/class="[^"]*"/g, "");
    const placeholder = paths(MISSING_ICON_GLYPH);
    const clash = Object.entries(ICON_MAP).filter(([, C]) => paths(C) === placeholder);
    expect(clash.map(([name]) => name)).toEqual([]);
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { container } = render(<Icon name="unmapped_glyph_check_xyz" />);
    warn.mockRestore();
    // The unmapped name really draws MISSING_ICON_GLYPH.
    expect(container.querySelector("svg")!.innerHTML.replace(/class="[^"]*"/g, "")).toBe(
      placeholder.replace(/^<svg[^>]*>|<\/svg>$/g, "")
    );
  });

  it("a mapped icon never carries the missing marker", () => {
    const { container } = render(<Icon name="settings" />);
    expect(container.querySelector("svg")!.hasAttribute("data-icon-missing")).toBe(false);
  });

  it("renders nothing for an empty name", () => {
    const { container } = render(
      <>
        <Icon name="" />
        <Icon name={null} />
        <Icon />
      </>
    );
    expect(container.innerHTML).toBe("");
  });

  it("the shell and primitive names are all mapped to Lucide (never null)", () => {
    for (const name of [
      "home",
      "settings",
      "search",
      "close",
      "menu",
      "logout",
      "check",
      "expand_more",
      "chevron_right",
      "push_pin",
      "left_panel_open",
      "left_panel_close",
      "light_mode",
      "dark_mode",
      "restart_alt",
      "power_settings_new",
      "power_off",
      "progress_activity",
      "info",
      "visibility",
      "visibility_off",
      "error",
      "warning",
      "check_circle",
      "inbox",
      "add",
      "delete",
      "edit",
      "content_copy",
      "refresh",
      "open_in_new",
      "more_vert",
      "arrow_back",
      "arrow_forward",
      "dns",
      "api",
      "vpn_key",
      "view_list",
      "deployed_code",
      "healing",
    ]) {
      expect(ICON_MAP[name], `${name} must map to a Lucide icon`).toBeTypeOf("object");
    }
  });
});
