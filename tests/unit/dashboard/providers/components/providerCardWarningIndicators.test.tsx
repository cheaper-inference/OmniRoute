// #10261 — provider warning badges advertised interaction they did not implement:
// (1) the usage-risk `subscriptionRisk` indicator promised "click for details"
//     (`providers.riskNotice.tooltip`) but was a bare <span> with no onClick/role/dialog;
// (2) the connection warning-count badge exposed neither a `title` (reasons) nor any
//     click affordance, even though the reasons already exist in
//     `providerSpecificData.apiKeyHealth[]` (see EditConnectionModal.tsx).
//
// This is the permanent regression guard for both defects, extended (per the plan-file's
// implementation checkbox) to also assert KEYBOARD activation (focus + Enter), not just
// pointer click, for the interactive risk indicator.
import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ProviderCard from "../../../../../src/app/(dashboard)/dashboard/providers/components/ProviderCard";

// The shared Modal is a kit Dialog (Radix) since KEA-7886: its content is portaled to
// document.body, so queries start there (the container is a child of body).

vi.mock("@/shared/components/ProviderTestSlideOver", () => ({ default: () => null }));
vi.mock("@/shared/components/ProviderIcon", () => ({ default: () => null }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: () => {} }) }));

describe("ProviderCard — #10261 warning indicator consistency", () => {
  let container: HTMLDivElement | null = null;
  let root: ReturnType<typeof createRoot> | null = null;

  function renderCard(props: Record<string, unknown> = {}) {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    act(() => {
      root!.render(
        <ProviderCard
          providerId="openai"
          provider={{ id: "openai", name: "OpenAI", subscriptionRisk: true }}
          stats={{ total: 2, connected: 1, error: 0, warning: 2, warningMaxFailures: 5 }}
          authType="oauth"
          onToggle={() => {}}
          {...props}
        />
      );
    });
    return { container: container!, root: root! };
  }

  afterEach(() => {
    if (root) {
      act(() => root!.unmount());
      root = null;
    }
    if (container) {
      document.body.removeChild(container);
      container = null;
    }
  });

  it("usage-risk indicator advertised as 'click for details' opens an accessible dialog on click", () => {
    const { container: el } = renderCard();
    const riskEl = el.querySelector('[aria-label*="click for details"]');
    expect(riskEl).toBeTruthy();
    expect(document.body.querySelector('[role="dialog"]')).toBeFalsy();
    act(() => {
      riskEl!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const dialog = document.body.querySelector('[role="dialog"]');
    expect(dialog).toBeTruthy();
    // The dialog must not leak raw credential values.
    expect(dialog!.textContent || "").not.toMatch(/sk-[a-zA-Z0-9]/);
  });

  it("usage-risk indicator is a real interactive control reachable and activatable by keyboard", () => {
    const { container: el } = renderCard();
    const riskEl = el.querySelector('[aria-label*="click for details"]') as HTMLElement;
    expect(riskEl).toBeTruthy();
    // Must be a real interactive element — a <button> or an explicit role="button" —
    // not a bare <span> that keyboard users can never reach.
    const isRealButton = riskEl.tagName.toLowerCase() === "button";
    const hasButtonRole = riskEl.getAttribute("role") === "button";
    expect(isRealButton || hasButtonRole).toBe(true);
    riskEl.focus();
    expect(document.activeElement).toBe(riskEl);
    act(() => {
      riskEl.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true })
      );
    });
    expect(document.body.querySelector('[role="dialog"]')).toBeTruthy();
  });

  it("warning-count badge exposes sanitized reasons and a distinct click/keyboard affordance", () => {
    const { container: el } = renderCard();
    const badge = Array.from(el.querySelectorAll("span")).find((node) =>
      (node.textContent || "").includes("Warning")
    );
    expect(badge).toBeTruthy();
    const hasReasonsTooltip = Boolean(badge!.getAttribute("title"));
    const isInteractive = Boolean(
      badge!.getAttribute("role") === "button" || badge!.tagName.toLowerCase() === "button"
    );
    expect(hasReasonsTooltip || isInteractive).toBeTruthy();
    // Never render raw upstream error text/credentials in the tooltip.
    const title = badge!.getAttribute("title") || "";
    expect(title).not.toMatch(/sk-[a-zA-Z0-9]/);
    // Reachable and activatable by keyboard too.
    expect(badge!.getAttribute("tabindex")).toBe("0");
  });

  it("neither the risk indicator nor the warning badge use identical amber icon styling", () => {
    const { container: el } = renderCard();
    const riskEl = el.querySelector('[aria-label*="click for details"]');
    const badge = Array.from(el.querySelectorAll("span")).find((node) =>
      (node.textContent || "").includes("Warning")
    );
    expect(riskEl).toBeTruthy();
    expect(badge).toBeTruthy();
    // The risk indicator is a bare icon glyph (kit ghost icon button + Lucide <svg>); the
    // warning badge is rendered through the pill-shaped kit Badge — distinct visual language.
    expect(riskEl!.querySelector("svg.oi-icon")).toBeTruthy();
    expect(riskEl!.closest(".ci-badge")).toBeNull();
    expect(badge!.querySelector(".ci-badge")).toBeTruthy();
    expect(badge!.querySelector("svg.oi-icon")?.closest(".ci-badge")).toBeTruthy();
  });
});
