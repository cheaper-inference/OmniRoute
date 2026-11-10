// @vitest-environment jsdom
/**
 * Regression guard for #5836 — the red "Token Expired" connection badge must
 * NOT flash for OAuth refresh-capable providers (Antigravity/Gemini) whose
 * access token merely lapsed but is auto-refreshed. It should render ONLY when
 * the connection is terminally expired (testStatus === "expired").
 * Continuation of #5326.
 */
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string) => key,
}));
// This row test exercises expiry/usage UI, not the global persisted privacy store.
vi.mock("@/store/emailPrivacyStore", () => ({
  default: (select: (state: { emailsVisible: boolean }) => unknown) =>
    select({ emailsVisible: true }),
}));

import ConnectionRow, {
  type ConnectionRowConnection,
} from "@/app/(dashboard)/dashboard/providers/[id]/components/ConnectionRow";

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

const baseProps = {
  isOAuth: true,
  isFirst: true,
  isLast: true,
  onMoveUp: () => {},
  onMoveDown: () => {},
  onToggleActive: () => {},
  onToggleRateLimit: () => {},
  onRetest: () => {},
  onEdit: () => {},
  onDelete: () => {},
};

function renderRow(connection: ConnectionRowConnection, onReauth?: () => void): HTMLElement {
  const container = makeContainer();
  const root = createRoot(container);
  cleanupCallbacks.push(() => act(() => root.unmount()));
  act(() => {
    root.render(
      React.createElement(ConnectionRow, { ...baseProps, connection, onReauth } as never)
    );
  });
  return container;
}

const PAST = new Date(Date.now() - 60 * 60 * 1000).toISOString(); // 1h ago

describe("ConnectionRow token expiry badge (#5836)", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    while (cleanupCallbacks.length) cleanupCallbacks.pop()!();
  });

  it("does NOT render the red Token Expired badge for a healthy OAuth connection whose access token merely lapsed", () => {
    const container = renderRow({
      id: "c1",
      provider: "antigravity",
      testStatus: "active",
      isActive: true,
      tokenExpiresAt: PAST,
      priority: 1,
    } as ConnectionRowConnection);
    expect(container.textContent).not.toContain("tokenExpiredBadge");
  });

  it("renders the red Token Expired badge when the connection is terminally expired", () => {
    const container = renderRow({
      id: "c2",
      provider: "antigravity",
      testStatus: "expired",
      isActive: true,
      tokenExpiresAt: PAST,
      errorCode: "no_refresh_token",
      priority: 1,
    } as ConnectionRowConnection);
    expect(container.textContent).toContain("tokenExpiredBadge");
  });

  it("shows healthy ChatGPT expiry as renewal information and links to official usage settings", () => {
    const container = renderRow({
      id: "chatgpt",
      provider: "chatgpt",
      testStatus: "active",
      isActive: true,
      expiresAt: new Date(Date.now() + 15 * 60_000).toISOString(),
    });
    expect(container.querySelector('[title="chatgptTokenRenewsTitle"]')).not.toBeNull();
    const link = container.querySelector('a[href="https://chatgpt.com/settings/usage"]');
    expect(link?.textContent).toContain("chatgptManageUsage");
    expect(link?.getAttribute("rel")).toContain("noreferrer");
    expect(link?.getAttribute("target")).toBe("_blank");
  });

  it("keeps renewal errors visible and does not add ChatGPT usage actions to other providers", () => {
    const invalid = renderRow({
      id: "bad",
      provider: "chatgpt",
      testStatus: "invalid",
      expiresAt: new Date(Date.now() + 15 * 60_000).toISOString(),
    });
    expect(invalid.querySelector('[title="chatgptTokenRenewsTitle"]')).toBeNull();
    const other = renderRow({ id: "other", provider: "antigravity", testStatus: "active" });
    expect(other.querySelector('a[href="https://chatgpt.com/settings/usage"]')).toBeNull();
  });

  it("opens ChatGPT reauthentication with a compact action instead of a branded sign-in button", () => {
    const onReauth = vi.fn();
    const container = renderRow(
      { id: "chatgpt", provider: "chatgpt", testStatus: "active" },
      onReauth
    );
    expect(container.textContent).not.toContain("Continue with ChatGPT");
    const button = container.querySelector<HTMLButtonElement>(
      'button[aria-label="reauthenticateConnection"]'
    );
    expect(button).not.toBeNull();
    expect(button?.getAttribute("aria-haspopup")).toBe("dialog");
    act(() => button!.click());
    expect(onReauth).toHaveBeenCalledOnce();
  });
});
