// @vitest-environment jsdom
/**
 * RTL coverage for the shared "misc" group moved onto the CI UI Kit (KEA-7886, lote 10):
 * CapabilityBadge (kit Badge, icon through <Icon>), DegradationBadge (warning-tone kit Badge
 * rendered as the link) and TokenHealthBadge (kit Button trigger + Popover, axe on the open panel).
 */
import React from "react";
import axe from "axe-core";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, describe, expect, it, vi } from "vitest";
import CapabilityBadge from "@/shared/components/CapabilityBadge";
import DegradationBadge from "@/shared/components/DegradationBadge";
import TokenHealthBadge from "@/shared/components/TokenHealthBadge";
import messages from "../../../src/i18n/messages/en.json";

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

function stubFetch(body: unknown) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({ ok: true, json: async () => body }))
  );
}

describe("CapabilityBadge", () => {
  it("renders a kit pill badge with a Lucide icon and the caller's tone classes", () => {
    const { container } = render(
      <CapabilityBadge icon="image" className="bg-warning/15 text-warning" title="Images">
        Images
      </CapabilityBadge>
    );
    const badge = container.querySelector(".ci-badge") as HTMLElement;
    expect(badge).toBeTruthy();
    expect(badge.className).toContain("ci-badge--pill");
    expect(badge.className).toContain("text-warning");
    expect(badge.getAttribute("title")).toBe("Images");
    expect(badge.textContent).toBe("Images");
    expect(badge.querySelector("svg.oi-icon[data-icon='image']")).toBeTruthy();
    expect(container.querySelector(".material-symbols-outlined")).toBeNull();
  });

  it("renders without an icon", () => {
    const { container } = render(<CapabilityBadge>Vision</CapabilityBadge>);
    expect(container.querySelector("svg")).toBeNull();
    expect(container.textContent).toBe("Vision");
  });
});

describe("DegradationBadge", () => {
  it("renders nothing while the gateway is healthy", async () => {
    stubFetch({ isDegraded: false });
    const { container } = wrap(<DegradationBadge />);
    await act(async () => {});
    expect(container.textContent).toBe("");
  });

  it("renders the warning-tone badge as the link to the health page", async () => {
    stubFetch({ isDegraded: true });
    wrap(<DegradationBadge />);
    const link = await screen.findByRole("link", { name: "Degraded" });
    expect(link.getAttribute("href")).toBe("/dashboard/health");
    expect(link.className).toContain("ci-badge");
    expect(link.getAttribute("data-tone")).toBe("warning");
    expect(link.querySelector("svg.oi-icon[data-icon='healing']")).toBeTruthy();
  });
});

describe("TokenHealthBadge", () => {
  it("renders nothing without OAuth tokens", async () => {
    stubFetch({ total: 0 });
    const { container } = wrap(<TokenHealthBadge />);
    await act(async () => {});
    expect(container.textContent).toBe("");
  });

  it("shows the status icon and errored count, and opens the detail popover", async () => {
    stubFetch({ total: 3, healthy: 1, errored: 2, warning: 0, status: "error" });
    wrap(<TokenHealthBadge />);
    const trigger = await screen.findByRole("button", {
      name: "Token refresh failures detected",
    });
    expect(trigger.className).toContain("ci-button--ghost");
    expect(trigger.querySelector("svg.oi-icon.text-error")).toBeTruthy();
    expect(trigger.textContent).toContain("2");

    fireEvent.click(trigger);
    const panel = await screen.findByRole("dialog");
    expect(panel.textContent).toContain("Token Health");
    expect(panel.textContent).toContain("Total OAuth");
    expect(panel.textContent).toContain("Errored");
    const results = await runAxe(document.body);
    expect(results.violations.map((v) => v.id)).toEqual([]);

    fireEvent.keyDown(panel, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
    // Keyboard/click sessions still hand focus back to the trigger on close.
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
    expect(document.activeElement).toBe(trigger);
  });

  it("opens on hover without moving focus away from what the user is typing in", async () => {
    stubFetch({ total: 3, healthy: 1, errored: 2, warning: 0, status: "error" });
    render(
      <NextIntlClientProvider locale="en" timeZone="UTC" messages={messages}>
        <input aria-label="search" />
        <TokenHealthBadge />
      </NextIntlClientProvider>
    );
    const trigger = await screen.findByRole("button", {
      name: "Token refresh failures detected",
    });
    const input = screen.getByRole("textbox", { name: "search" });
    input.focus();

    await act(async () => {
      fireEvent.mouseEnter(trigger);
    });
    expect(screen.getByRole("dialog").textContent).toContain("Token Health");
    expect(document.activeElement).toBe(input);

    await act(async () => {
      fireEvent.mouseLeave(trigger);
    });
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(input);
  });

  it("keeps the hover-opened panel open when the badge is then clicked", async () => {
    stubFetch({ total: 3, healthy: 1, errored: 2, warning: 0, status: "error" });
    wrap(<TokenHealthBadge />);
    const trigger = await screen.findByRole("button", {
      name: "Token refresh failures detected",
    });
    await act(async () => {
      fireEvent.mouseEnter(trigger);
    });
    await act(async () => {
      fireEvent.click(trigger);
    });
    expect(screen.queryByRole("dialog")).not.toBeNull();
    // Clicked open, the panel stays when the pointer moves on (to read or select its rows).
    await act(async () => {
      fireEvent.mouseLeave(trigger);
    });
    expect(screen.queryByRole("dialog")).not.toBeNull();
    // A second click closes it as before.
    await act(async () => {
      fireEvent.click(trigger);
    });
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("hides the count when no token errored", async () => {
    stubFetch({ total: 2, healthy: 2, errored: 0, warning: 0, status: "healthy" });
    wrap(<TokenHealthBadge />);
    const trigger = await screen.findByRole("button", { name: "All tokens healthy" });
    expect(trigger.querySelector("svg.oi-icon.text-success")).toBeTruthy();
    expect(trigger.textContent).toBe("");
  });
});
