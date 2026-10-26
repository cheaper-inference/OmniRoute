// @vitest-environment jsdom
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const nav = vi.hoisted(() => ({ pathname: "/dashboard/providers/openai" }));
vi.mock("next/navigation", () => ({ usePathname: () => nav.pathname }));
vi.mock("next/link", () => ({
  default: ({ href, children, ...p }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={String(href)} {...p}>
      {children}
    </a>
  ),
}));

const { default: Breadcrumbs } = await import("@/shared/components/Breadcrumbs");
const { default: Avatar } = await import("@/shared/components/Avatar");

afterEach(() => cleanup());

describe("Breadcrumbs / Avatar adapters", () => {
  it("Breadcrumbs renders the kit breadcrumb with links and the current page", () => {
    render(<Breadcrumbs />);
    const navEl = screen.getByRole("navigation");
    expect(navEl.className).toContain("ci-breadcrumb");
    expect(screen.getByRole("link", { name: "Providers" }).getAttribute("href")).toBe(
      "/dashboard/providers"
    );
    expect(screen.getByText("Openai").getAttribute("aria-current")).toBe("page");
  });

  it("Breadcrumbs renders nothing on /dashboard", () => {
    nav.pathname = "/dashboard";
    const { container } = render(<Breadcrumbs />);
    expect(container.innerHTML).toBe("");
    nav.pathname = "/dashboard/providers/openai";
  });

  it("Avatar shows initials from name on the kit avatar, or the image when src is given", () => {
    const { container, rerender } = render(<Avatar name="Ada Lovelace" size="sm" />);
    expect(container.querySelector("[data-slot=avatar]")!.getAttribute("data-size")).toBe("sm");
    expect(container.textContent).toBe("AL");
    rerender(<Avatar src="/a.png" alt="Ada" />);
    expect(container.querySelector("img")!.getAttribute("alt")).toBe("Ada");
  });
});
