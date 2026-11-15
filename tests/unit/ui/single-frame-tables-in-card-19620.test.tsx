// @vitest-environment jsdom
/**
 * #19620, owner decision 2026-11-14: the Card is the only frame around a table.
 *
 * The AST guard (tests/unit/datatable-not-framed-inside-card.test.ts) only sees a table and a
 * Card written in the same JSX tree. These two components render their table in their own
 * file and are placed inside a Card by their parent, so they are checked here by rendering:
 *
 * - CacheEntriesTab (semantic cache entries, inside the Semantic Cache card) used the kit
 *   DataTableShell, whose `.ci-data-table__frame` draws a border of its own.
 * - CooldownConnectionsCard (resilience cooldowns) renders a kit Table, whose container keeps
 *   the kit border and radius unless the consumer zeroes them.
 */
import React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

// One translator for every call: CacheEntriesTab lists `t` in its fetch effect's dependencies,
// so a new function per render would refetch forever.
vi.mock("next-intl", () => {
  const translate = (key: string) => key;
  return { useTranslations: () => translate };
});

const { default: CacheEntriesTab } =
  await import("@/app/(dashboard)/dashboard/cache/components/CacheEntriesTab");
const { default: CooldownConnectionsCard } =
  await import("@/app/(dashboard)/dashboard/resilience/cooldowns/components/CooldownConnectionsCard");

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function expectBorderlessTable(container: HTMLElement) {
  expect(container.querySelector("[data-slot=data-table-shell]")).toBeNull();
  expect(container.querySelector(".ci-data-table__frame")).toBeNull();
  const tableContainer = container.querySelector("[data-slot=table-container]");
  expect(tableContainer).not.toBeNull();
  expect(tableContainer!.className).toContain("border-0");
  expect(tableContainer!.className).toContain("rounded-none");
}

const entry = (i: number) => ({
  id: `e${i}`,
  signature: `sig-${i}-0123456789abcdef`,
  model: "gpt-4o",
  hit_count: i,
  tokens_saved: 100 * i,
  created_at: "2026-11-13T10:00:00.000Z",
  expires_at: "2026-11-15T10:00:00.000Z",
});

describe("semantic cache entries: no frame of their own", () => {
  it("renders the entries as a borderless kit table, with search and pagination kept", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        Response.json({
          entries: [entry(1), entry(2)],
          pagination: { page: 1, limit: 20, total: 45, totalPages: 3 },
        })
      )
    );
    const { container } = render(<CacheEntriesTab />);
    await waitFor(() => expect(screen.getAllByRole("row")).toHaveLength(3));

    expectBorderlessTable(container);
    expect(screen.getByRole("textbox", { name: "searchEntries" })).not.toBeNull();
    expect(screen.getByRole("button", { name: "search" })).not.toBeNull();
    expect(screen.getByRole("button", { name: "previousPage" })).not.toBeNull();
    expect(screen.getByRole("button", { name: "nextPage" })).not.toBeNull();
    expect(screen.getByText("1 / 3")).not.toBeNull();
  });

  it("keeps the kit loading overlay while the first page loads", () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => new Promise<Response>(() => {}))
    );
    const { container } = render(<CacheEntriesTab />);
    expect(container.querySelector("[data-slot=table-loading-region]")).not.toBeNull();
    expect(screen.getByRole("status")).not.toBeNull();
    expect(container.querySelector(".ci-data-table__frame")).toBeNull();
  });
});

describe("resilience cooldowns: the Card is the table's only frame", () => {
  it("renders the connections table without its own container border", () => {
    const { container } = render(
      <CooldownConnectionsCard
        connections={[
          {
            id: "c1",
            provider: "codex",
            name: "Cooling account",
            authType: "oauth",
            priority: 1,
            isActive: true,
            status: "cooling_down",
            testStatus: "unavailable",
            rateLimitedUntil: null,
            cooldownRemainingMs: 60_000,
            backoffLevel: 1,
            errorCode: "502",
            lastErrorType: "server_error",
            lastErrorAt: null,
            lockouts: [],
          } as never,
        ]}
        onClear={async () => {}}
        onRefresh={() => {}}
      />
    );
    expect(container.querySelector("[data-slot=card]")).not.toBeNull();
    expectBorderlessTable(container);
    expect(screen.getAllByRole("row")).toHaveLength(2);
  });
});
