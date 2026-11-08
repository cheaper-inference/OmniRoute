// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string) =>
    ({
      quotaRefreshCurrent: "Refresh current quota",
      quotaRefreshing: "Checking quota…",
      quotaRefreshStale: "The server returned old quota data.",
    })[key] ?? key,
}));

import ConnectionRow, {
  type ConnectionRowProps,
} from "@/app/(dashboard)/dashboard/providers/[id]/components/ConnectionRow";

const cleanup: Array<() => void> = [];
const noop = () => {};

beforeEach(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
});
afterEach(() => {
  while (cleanup.length) cleanup.pop()?.();
  document.body.innerHTML = "";
});

async function mount(element: React.ReactElement) {
  const el = document.createElement("div");
  document.body.append(el);
  const root = createRoot(el);
  cleanup.push(() => act(() => root.unmount()));
  await act(async () => root.render(element));
  return el;
}

function props(overrides: Partial<ConnectionRowProps> = {}): ConnectionRowProps {
  return {
    connection: { id: "a", provider: "codex", name: "Synthetic Codex", testStatus: "active" },
    isOAuth: true,
    isCodex: true,
    isFirst: true,
    isLast: true,
    onMoveUp: noop,
    onMoveDown: noop,
    onToggleActive: noop,
    onToggleRateLimit: noop,
    onRetest: noop,
    onEdit: noop,
    onDelete: noop,
    onToggleQuotaVisibility: noop,
    onRefreshQuota: noop,
    quotaRefreshState: { status: "stale" },
    quotaCache: { quotas: { session: { used: 20, total: 100 } } },
    ...overrides,
  };
}

const refreshButtons = (el: HTMLElement) =>
  Array.from(el.querySelectorAll("button")).filter((b) =>
    b.textContent?.includes("Refresh current quota")
  );

describe("Codex operational row quota refresh (#16161 with the collection layout)", () => {
  it.each(["list", "cards", "table"] as const)(
    "keeps one refresh action and one status after expanding details (%s view)",
    async (codexViewMode) => {
      const row = <ConnectionRow {...props({ codexViewMode })} />;
      const el = await mount(
        codexViewMode === "table" ? (
          <table>
            <tbody>{row}</tbody>
          </table>
        ) : (
          row
        )
      );
      expect(refreshButtons(el)).toHaveLength(1);
      const details = el.querySelector<HTMLButtonElement>("button[aria-expanded='false']")!;
      await act(async () => details.click());
      expect(el.querySelector("button[aria-expanded='true']")).not.toBeNull();
      expect(refreshButtons(el)).toHaveLength(1);
      expect(el.querySelectorAll("[role='status']")).toHaveLength(1);
    }
  );
});
