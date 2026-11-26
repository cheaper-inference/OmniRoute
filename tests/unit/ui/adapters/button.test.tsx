// @vitest-environment jsdom
import fs from "node:fs";
import path from "node:path";
import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const { default: Button } = await import("@/shared/components/Button");
const { default: GuardedAction } = await import("@/shared/components/GuardedAction");

afterEach(() => cleanup());

describe("Button adapter → kit Button", () => {
  it("maps legacy variants onto kit classes and keeps type=button", () => {
    const cases: Array<[string, string]> = [
      ["primary", "ci-button--default"],
      ["accent", "ci-button--default"],
      ["secondary", "ci-button--secondary"],
      ["outline", "ci-button--outline"],
      ["ghost", "ci-button--ghost"],
      ["danger", "ci-button--destructive"],
      ["warning", "ci-button--warning"],
      // Quiet destructive action for rows and lists (kit 0.0.110, keak-ai/cheaper-inference-ui-kit#191).
      ["destructive-ghost", "ci-button--destructive-ghost"],
    ];
    for (const [variant, cls] of cases) {
      const { getByRole, unmount } = render(<Button variant={variant as any}>Go</Button>);
      const btn = getByRole("button", { name: "Go" });
      expect(btn.className, variant).toContain("ci-button");
      expect(btn.className, variant).toContain(cls);
      expect(btn.getAttribute("type")).toBe("button");
      unmount();
    }
  });

  it("maps sizes and fullWidth", () => {
    const { getByRole } = render(
      <Button size="sm" fullWidth>
        S
      </Button>
    );
    const btn = getByRole("button", { name: "S" });
    expect(btn.className).toContain("ci-button--size-sm");
    expect(btn.className).toContain("w-full");
  });

  it("renders icon/iconRight through <Icon> (Lucide for mapped names)", () => {
    const { getByRole } = render(
      <Button icon="search" iconRight="chevron_right">
        Find
      </Button>
    );
    const btn = getByRole("button", { name: "Find" });
    expect(btn.querySelectorAll("svg.oi-icon").length).toBe(2);
    expect(btn.querySelector(".material-symbols-outlined")).toBeNull();
  });

  it("loading disables the button, sets aria-busy and hides the leading icon", () => {
    const onClick = vi.fn();
    const { getByRole } = render(
      <Button loading icon="search" onClick={onClick}>
        Save
      </Button>
    );
    const btn = getByRole("button", { name: "Save" });
    expect(btn).toHaveProperty("disabled", true);
    expect(btn.getAttribute("aria-busy")).toBe("true");
    expect(btn.querySelector("svg.oi-icon")).toBeNull();
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("forwards arbitrary props (data-*, aria-*, onClick, className)", () => {
    const onClick = vi.fn();
    const { getByTestId } = render(
      <Button data-testid="x" aria-label="Extra" className="mt-2" onClick={onClick} />
    );
    const btn = getByTestId("x");
    expect(btn.getAttribute("aria-label")).toBe("Extra");
    expect(btn.className).toContain("mt-2");
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("maps the icon sizes onto the kit icon buttons", () => {
    const { getByRole, rerender } = render(
      <Button size="icon" icon="search" aria-label="Search" />
    );
    expect(getByRole("button", { name: "Search" }).className).toContain("ci-button--size-icon");
    rerender(<Button size="icon-sm" icon="search" aria-label="Search" />);
    expect(getByRole("button", { name: "Search" }).className).toContain("ci-button--size-icon-sm");
  });

  // Kit dense sizes (`Button size="2xs" | "icon-2xs"`, 24px): row and inline actions that used
  // to be shrunk by hand with `size-6 min-h-6`.
  it("maps the dense 2xs sizes onto the kit 24px buttons", () => {
    const { getByRole, rerender } = render(
      <Button size="2xs" icon="search">
        Find
      </Button>
    );
    const text = getByRole("button", { name: "Find" });
    expect(text.className).toContain("ci-button--size-2xs");
    expect(text.querySelector("svg.oi-icon")?.getAttribute("width")).toBe("14");
    rerender(<Button size="icon-2xs" icon="search" aria-label="Search" />);
    const icon = getByRole("button", { name: "Search" });
    expect(icon.className).toContain("ci-button--size-icon-2xs");
    expect(icon.querySelector("svg.oi-icon")?.getAttribute("width")).toBe("14");
  });

  // Kit `Button tone="muted"`: muted resting ink that keeps the variant's own hover, instead
  // of a `text-text-muted` class that also mutes the hover.
  it('passes tone="muted" to the kit button, and so does GuardedAction', () => {
    const { getByRole } = render(
      <>
        <Button variant="ghost" tone="muted">
          Quiet
        </Button>
        <GuardedAction variant="outline" tone="muted">
          Guarded
        </GuardedAction>
        <Button variant="ghost">Plain</Button>
      </>
    );
    for (const name of ["Quiet", "Guarded"]) {
      const btn = getByRole("button", { name });
      expect(btn.className, name).toContain("ci-button--tone-muted");
      expect(btn.getAttribute("data-tone"), name).toBe("muted");
    }
    const plain = getByRole("button", { name: "Plain" });
    expect(plain.className).not.toContain("ci-button--tone-");
    expect(plain.hasAttribute("data-tone")).toBe(false);
  });

  // The tests are not type-checked, and an undeclared prop still reaches the kit through the
  // rest spread. The dashboard screens are type-checked, so the props must be declared.
  it("declares tone and the dense sizes in the adapter's types", () => {
    const source = fs.readFileSync(
      path.resolve(process.cwd(), "src/shared/components/Button.tsx"),
      "utf8"
    );
    const sizes = /export type ButtonSize =([^;]+);/.exec(source)?.[1] ?? "";
    expect(sizes).toContain('"2xs"');
    expect(sizes).toContain('"icon-2xs"');
    const props = /export interface ButtonProps[^{]*\{([\s\S]*?)\n\}/.exec(source)?.[1] ?? "";
    expect(props).toMatch(/\btone\?: ButtonTone;/);
  });

  it("an explicit type overrides the default type=button", () => {
    const { getByRole } = render(<Button type="submit">Send</Button>);
    expect(getByRole("button", { name: "Send" }).getAttribute("type")).toBe("submit");
  });

  it("an unknown variant or size falls back to primary / md instead of throwing", () => {
    const { getByRole } = render(
      <Button variant={"bogus" as never} size={"huge" as never} icon="search">
        Safe
      </Button>
    );
    const btn = getByRole("button", { name: "Safe" });
    expect(btn.className).toContain("ci-button--default");
    expect(btn.className).toContain("ci-button--size-default");
    expect(btn.querySelector("svg.oi-icon")?.getAttribute("width")).toBe("16");
  });
});
