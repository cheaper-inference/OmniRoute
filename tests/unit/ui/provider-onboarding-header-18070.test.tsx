// #18070 — /providers/new: the wizard title is a kit `PageHeader compact` (as on
// /providers/[id]) instead of a loose `text-3xl` h1, so it scales down at 390 px.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

const { default: ProviderOnboardingHeader } =
  await import("@/app/(dashboard)/dashboard/providers/components/onboarding/ProviderOnboardingHeader");

describe("ProviderOnboardingHeader (#18070)", () => {
  let container: HTMLElement;
  let root: ReturnType<typeof createRoot>;

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("renders the title through the compact kit PageHeader with the back link and close action", async () => {
    const onClose = vi.fn();
    await act(async () => {
      root.render(
        <ProviderOnboardingHeader
          title="Provider Onboarding Wizard"
          description="Connect providers"
          backLabel="Back to providers"
          closeLabel="Close"
          onClose={onClose}
        />
      );
    });

    const header = container.querySelector('[data-slot="page-header"]');
    expect(header).toBeTruthy();
    expect(header?.getAttribute("data-compact")).toBe("true");

    const headings = container.querySelectorAll("h1");
    expect(headings).toHaveLength(1);
    expect(headings[0].className).toContain("ci-page-header__title");
    expect(headings[0].className).not.toContain("text-3xl");
    expect(headings[0].textContent).toBe("Provider Onboarding Wizard");

    const back = container.querySelector("a");
    expect(back?.getAttribute("href")).toBe("/dashboard/providers");
    expect(back?.textContent).toContain("Back to providers");

    expect(container.querySelector(".ci-page-header__description")?.textContent).toBe(
      "Connect providers"
    );

    const close = Array.from(container.querySelectorAll("button")).find(
      (b) => b.textContent === "Close"
    );
    expect(close).toBeTruthy();
    await act(async () => close!.click());
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
