// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { ComboListToolbar } from "@/app/(dashboard)/dashboard/combos/ComboListControls";

const combos = [
  {
    id: "c-1",
    name: "Fast Coding",
    strategy: "priority",
    models: [{ model: "openai/gpt-4o-mini" }, "claude/claude-sonnet-4-6"],
  },
  {
    id: "c-2",
    name: "Cheap Chat",
    strategy: "auto",
    models: [{ providerId: "groq", model: "llama-3.3-70b" }],
  },
  { id: "c-3", name: "Empty", strategy: "priority", models: [] },
];

// Loaded per test so a missing module fails the helper tests, not the whole file.
const loadSearch = () => import("@/app/(dashboard)/dashboard/combos/comboSearch");

describe("combo list search helper", () => {
  it("a blank query keeps every combo in order", async () => {
    const { filterCombosBySearch } = await loadSearch();
    expect(filterCombosBySearch(combos, "").map((c) => c.id)).toEqual(["c-1", "c-2", "c-3"]);
    expect(filterCombosBySearch(combos, "   ").map((c) => c.id)).toEqual(["c-1", "c-2", "c-3"]);
  });

  it("matches the name, case-insensitively and by substring", async () => {
    const { filterCombosBySearch } = await loadSearch();
    expect(filterCombosBySearch(combos, "coding").map((c) => c.id)).toEqual(["c-1"]);
    expect(filterCombosBySearch(combos, "CHEAP").map((c) => c.id)).toEqual(["c-2"]);
  });

  it("is Turkish-safe: dotted and dotless i match their plain forms", async () => {
    const { filterCombosBySearch } = await loadSearch();
    const turkish = [{ id: "t-1", name: "Hızlı Işık", models: [] }];
    expect(filterCombosBySearch(turkish, "hizli").map((c) => c.id)).toEqual(["t-1"]);
    expect(filterCombosBySearch(turkish, "ISIK").map((c) => c.id)).toEqual(["t-1"]);
  });

  it("matches member model ids, string steps and object steps", async () => {
    const { filterCombosBySearch } = await loadSearch();
    expect(filterCombosBySearch(combos, "gpt-4o").map((c) => c.id)).toEqual(["c-1"]);
    expect(filterCombosBySearch(combos, "sonnet").map((c) => c.id)).toEqual(["c-1"]);
    expect(filterCombosBySearch(combos, "llama").map((c) => c.id)).toEqual(["c-2"]);
  });

  it("a query with no match returns an empty list, and odd rows do not throw", async () => {
    const { filterCombosBySearch, comboMatchesSearch } = await loadSearch();
    expect(filterCombosBySearch(combos, "zzz")).toEqual([]);
    expect(comboMatchesSearch({ id: "x" } as never, "a")).toBe(false);
    expect(comboMatchesSearch({ id: "x", models: [null, 7, {}] } as never, "a")).toBe(false);
  });
});

describe("ComboListToolbar search input", () => {
  const containers: HTMLElement[] = [];
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });
  afterEach(() => {
    while (containers.length) containers.pop()?.remove();
  });

  const t = Object.assign((key: string) => key, { has: () => false });
  async function render(props: Record<string, unknown>) {
    const container = document.createElement("div");
    document.body.appendChild(container);
    containers.push(container);
    await act(async () => {
      createRoot(container).render(
        <ComboListToolbar
          t={t as never}
          comboCount={3}
          filteredCount={3}
          pageStart={1}
          pageEnd={3}
          reordering={false}
          savingOrder={false}
          onToggleReorder={() => {}}
          {...props}
        />
      );
    });
    return container;
  }

  it("default: no search box without a handler", async () => {
    const container = await render({});
    expect(container.querySelector('input[type="search"]')).toBeNull();
  });

  it("with a handler: shows the box with the current value and reports typing", async () => {
    const seen: string[] = [];
    const container = await render({
      searchQuery: "gpt",
      onSearchChange: (v: string) => seen.push(v),
    });
    const input = container.querySelector('input[type="search"]') as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.value).toBe("gpt");
    await act(async () => {
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!;
      setter.call(input, "gpts");
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
    expect(seen).toEqual(["gpts"]);
  });
});

describe("combos page wiring", () => {
  it("enables the box only with ?search=1 and searches the strategy-filtered list", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const page = fs.readFileSync(
      path.resolve(__dirname, "../../../src/app/(dashboard)/dashboard/combos/page.tsx"),
      "utf8"
    );
    expect(page).toContain('searchParams.get("search") === "1"');
    expect(page).toContain("onSearchChange={searchEnabled ? setComboSearch : undefined}");
    // The search runs on the strategy-filtered list and is bypassed when the box is off.
    expect(page).toMatch(
      /filterCombosBySearch\(\s*filterCombosByStrategyCategory\(combos, activeFilter\),\s*searchEnabled \? comboSearch : ""\s*\)/
    );
  });
});
