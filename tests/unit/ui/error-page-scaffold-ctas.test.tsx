// @vitest-environment jsdom
import React from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { default: ErrorPageScaffold } = await import("@/shared/components/ErrorPageScaffold");

afterEach(() => cleanup());

// #18068: the two CTAs were hand-styled links (`px-6 py-3 rounded-lg bg-primary …`); they are
// kit buttons now, rendered as links through the Button client component.
describe("ErrorPageScaffold CTAs", () => {
  it("renders the primary and secondary actions as kit button links", () => {
    const { getByRole } = render(
      <ErrorPageScaffold
        code="404"
        title="Not found"
        description="Gone"
        primaryAction={{ href: "/dashboard", label: "Dashboard" }}
        secondaryAction={{ href: "/status", label: "Status" }}
      />
    );
    const primary = getByRole("link", { name: "Dashboard" });
    const secondary = getByRole("link", { name: "Status" });
    expect(primary.getAttribute("href")).toBe("/dashboard");
    expect(secondary.getAttribute("href")).toBe("/status");
    expect(primary.className).toContain("ci-button--default");
    expect(primary.className).toContain("ci-button--size-lg");
    expect(secondary.className).toContain("ci-button--outline");
    expect(secondary.className).toContain("ci-button--size-lg");
    for (const link of [primary, secondary]) {
      expect(link.className).not.toMatch(/\b(bg-primary|px-6|py-3|rounded-lg)\b/);
    }
  });

  it("falls back to the dashboard and status actions", () => {
    const { getByRole } = render(<ErrorPageScaffold code="500" title="Oops" description="x" />);
    expect(getByRole("link", { name: "goToDashboard" }).className).toContain("ci-button");
    expect(getByRole("link", { name: "checkSystemStatus" }).className).toContain("ci-button");
  });
});
