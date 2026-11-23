// @vitest-environment jsdom
/**
 * Antigravity `403 VALIDATION_REQUIRED` persists Google's "verify your account"
 * link in providerSpecificData.verificationUrl. The connection row must offer it
 * as an external link — and only when it points at https://accounts.google.com.
 */
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string) => key,
}));

import ConnectionRow, {
  type ConnectionRowConnection,
} from "@/app/(dashboard)/dashboard/providers/[id]/components/ConnectionRow";

const VERIFY_URL = "https://accounts.google.com/signin/continue?sarp=1&id=ag-1";

const rowProps = {
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

function connectionWith(providerSpecificData?: Record<string, unknown>): ConnectionRowConnection {
  return {
    id: "conn-ag-verify",
    name: "ag account",
    provider: "antigravity",
    priority: 1,
    providerSpecificData,
  } as ConnectionRowConnection;
}

describe("ConnectionRow Verify account link", () => {
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

  afterEach(async () => {
    await act(async () => {
      root.unmount();
    });
    container.remove();
  });

  async function render(connection: ConnectionRowConnection) {
    await act(async () => {
      root.render(<ConnectionRow {...(rowProps as never)} connection={connection} />);
    });
    return container.querySelector<HTMLAnchorElement>("a[data-testid='connection-verify-account']");
  }

  it("renders an external, noopener link for a stored Google verification URL", async () => {
    const link = await render(connectionWith({ verificationUrl: VERIFY_URL }));
    expect(link).toBeTruthy();
    expect(link!.getAttribute("href")).toBe(VERIFY_URL);
    expect(link!.getAttribute("target")).toBe("_blank");
    expect(link!.getAttribute("rel")).toBe("noopener noreferrer");
    expect(link!.getAttribute("aria-label")).toBe("verifyAccount");
  });

  it("renders nothing without a stored URL", async () => {
    expect(await render(connectionWith({ projectId: "p" }))).toBeNull();
    expect(await render(connectionWith(undefined))).toBeNull();
  });

  it("refuses non-Google or non-https URLs", async () => {
    expect(await render(connectionWith({ verificationUrl: "https://evil.com/x" }))).toBeNull();
    expect(
      await render(connectionWith({ verificationUrl: "http://accounts.google.com/x" }))
    ).toBeNull();
    expect(
      await render(connectionWith({ verificationUrl: "https://accounts.google.com.evil.com/x" }))
    ).toBeNull();
    expect(await render(connectionWith({ verificationUrl: "javascript:alert(1)" }))).toBeNull();
  });
});
