// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import {
  ChatGptManageUsageButton,
  ChatGptPlanNotice,
  ChatGptPlanWelcome,
  ChatGptUsageSummary,
  ChatGptPlanBadge,
} from "@/shared/components/ChatGptPlanUi";
import {
  hasChatGptUsageLimit,
  shouldWelcomeChatGptPlan,
  acknowledgeChatGptPlan,
} from "@/shared/utils/chatgptPlanUi";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it("renders the kit outline button with an accessible label and decorative arrow", () => {
  render(<ChatGptManageUsageButton />);
  const link = screen.getByRole("link", { name: "Manage usage" });
  expect(link).toHaveAttribute("href", "https://chatgpt.com/settings/usage");
  expect(link).toHaveAttribute("rel", "noopener noreferrer");
  expect(link).toHaveAttribute("target", "_blank");
  // Kit outline button (KEA-7886): themed by the kit tokens, no hand-rolled palette.
  expect(link.className).toContain("ci-button--outline");
  expect(link.className).not.toMatch(/\bdark:|neutral-\d/);
  expect(link.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
});

it("does not imply plan use before connecting", () => {
  const view = render(<ChatGptPlanNotice />);
  expect(screen.getByText("Use your ChatGPT plan")).toBeDefined();
  expect(screen.queryByRole("link")).toBeNull();
  view.rerender(<ChatGptPlanNotice connected />);
  expect(screen.getByText("Using your ChatGPT plan")).toBeDefined();
  expect(screen.getByRole("link", { name: "Manage usage" })).toBeDefined();
});

it("distinguishes unavailable account totals from zero or unlimited usage", () => {
  render(<ChatGptUsageSummary />);
  expect(screen.getByText(/Not your account-wide ChatGPT usage/)).toBeDefined();
  expect(screen.getAllByLabelText("Not available")).toHaveLength(3);
  expect(screen.queryByText("Usage limit reached")).toBeNull();
  expect(screen.queryByText(/Last 30 days/)).toBeNull();
});

it("shows plan permission without guessing a subscription tier", () => {
  const view = render(<ChatGptPlanBadge scopes={["chatgpt.tokens.use.direct"]} />);
  expect(screen.getByText("Plan linked")).toBeInTheDocument();
  view.rerender(<ChatGptPlanBadge scopes={["openid"]} />);
  expect(screen.getByText("Plan not authorized")).toBeInTheDocument();
  expect(screen.queryByText("Plan linked")).toBeNull();
});

it("makes usage management primary for a confirmed limit, with no app-credit sales", () => {
  render(<ChatGptUsageSummary limitReached />);
  expect(screen.getByRole("status")).toHaveTextContent("Usage limit reached");
  const primary = screen.getAllByRole("link", { name: "Manage usage" })[0];
  expect(primary.className).toContain("w-full");
  expect(primary.className).toContain("ci-button--default");
  expect(screen.queryByText("Buy app credits")).toBeNull();
});

it("dismisses the welcome through the explicit confirmation action", () => {
  const dismiss = vi.fn();
  render(<ChatGptPlanWelcome onDismiss={dismiss} />);
  fireEvent.click(screen.getByRole("button", { name: "Got it" }));
  expect(dismiss).toHaveBeenCalledOnce();
});

it("remembers only a welcome acknowledgement, and skips all reauthentication", () => {
  const values = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
  });
  expect(shouldWelcomeChatGptPlan(false)).toBe(true);
  expect(shouldWelcomeChatGptPlan(true)).toBe(false);
  acknowledgeChatGptPlan();
  expect(shouldWelcomeChatGptPlan(false)).toBe(false);
  expect(values.size).toBe(1);
  expect(window.localStorage.getItem("omniroute.chatgpt.plan-welcome.v1")).toBe("acknowledged");
});

it("recognizes only active, explicitly classified ChatGPT usage limits", () => {
  const now = Date.now();
  const connection = {
    provider: "chatgpt",
    testStatus: "unavailable",
    lastErrorType: "quota_exhausted",
    rateLimitedUntil: new Date(now + 60000).toISOString(),
  };
  expect(hasChatGptUsageLimit(connection, now)).toBe(true);
  expect(hasChatGptUsageLimit({ ...connection, provider: "codex" }, now)).toBe(false);
  expect(hasChatGptUsageLimit({ ...connection, lastErrorType: "rate_limit" }, now)).toBe(false);
  expect(hasChatGptUsageLimit({ ...connection, testStatus: "active" }, now)).toBe(false);
  expect(hasChatGptUsageLimit({ ...connection, testStatus: "expired" }, now)).toBe(false);
  expect(
    hasChatGptUsageLimit({ ...connection, rateLimitedUntil: new Date(now - 1).toISOString() }, now)
  ).toBe(false);
  expect(hasChatGptUsageLimit({ ...connection, rateLimitedUntil: "invalid" }, now)).toBe(false);
  expect(hasChatGptUsageLimit({ provider: "chatgpt", testStatus: "credits_exhausted" }, now)).toBe(
    true
  );
});
