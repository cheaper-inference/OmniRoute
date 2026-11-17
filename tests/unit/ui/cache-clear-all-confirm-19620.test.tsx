// @vitest-environment jsdom
//
// #19620: "clear all" on the semantic and reasoning caches deleted everything on one click. Both
// now go through the destructive kit confirm dialog: the DELETE only runs after Confirm.
import React from "react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import messages from "../../../src/i18n/messages/en.json";

const { default: CachePage } = await import("../../../src/app/(dashboard)/dashboard/cache/page");
const { default: ReasoningCacheTab } =
  await import("../../../src/app/(dashboard)/dashboard/cache/components/ReasoningCacheTab");

beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

type Call = { url: string; method: string };

const CACHE_STATS = {
  semanticCache: {
    memoryEntries: 2,
    dbEntries: 3,
    hits: 1,
    misses: 1,
    hitRate: "50.0",
    tokensSaved: 10,
  },
  promptCache: null,
  trend: [],
  idempotency: { activeKeys: 0, windowMs: 5000 },
  config: { semanticCacheEnabled: true },
};

const REASONING_DATA = {
  stats: {
    memoryEntries: 1,
    dbEntries: 1,
    totalEntries: 2,
    totalChars: 100,
    hits: 1,
    misses: 1,
    replays: 1,
    replayRate: "50%",
    byProvider: {},
    byModel: {},
    oldestEntry: null,
    newestEntry: null,
  },
  entries: [],
};

function installFetch(): Call[] {
  const calls: Call[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: string, init?: RequestInit) => {
      const url = String(input);
      const method = init?.method ?? "GET";
      calls.push({ url, method });
      let body: unknown = {};
      if (method === "DELETE") body = { cleared: 2 };
      else if (url.startsWith("/api/cache/reasoning")) body = REASONING_DATA;
      else if (url.startsWith("/api/cache/entries")) {
        body = { entries: [], pagination: { page: 1, limit: 20, total: 0, totalPages: 0 } };
      } else if (url.startsWith("/api/cache")) body = CACHE_STATS;
      return { ok: true, status: 200, json: async () => body, text: async () => "" };
    })
  );
  return calls;
}

const deletes = (calls: Call[]) => calls.filter((c) => c.method === "DELETE");

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

async function openDialog(label: string) {
  fireEvent.click(await screen.findByRole("button", { name: label }));
  return screen.findByRole("alertdialog", { name: label });
}

function expectDestructiveConfirm(dialog: HTMLElement, label: string) {
  expect(within(dialog).getByText(messages.cache.clearAllConfirm)).toBeTruthy();
  const confirm = within(dialog).getByRole("button", { name: label });
  expect(confirm.className).toMatch(/destructive|danger/);
  return confirm;
}

describe("semantic cache clear all", () => {
  const label = messages.cache.clearAll;

  async function renderSemanticView() {
    render(<CachePage />);
    fireEvent.click(await screen.findByRole("tab", { name: messages.cache.semanticCache }));
  }

  it("does not delete until the destructive dialog is confirmed", async () => {
    const calls = installFetch();
    await renderSemanticView();

    const dialog = await openDialog(label);
    const confirm = expectDestructiveConfirm(dialog, label);
    expect(deletes(calls)).toEqual([]);

    fireEvent.click(confirm);
    await waitFor(() => expect(deletes(calls)).toEqual([{ url: "/api/cache", method: "DELETE" }]));
  });

  it("keeps the cache when the dialog is cancelled", async () => {
    const calls = installFetch();
    await renderSemanticView();

    const dialog = await openDialog(label);
    fireEvent.click(within(dialog).getByRole("button", { name: messages.common.cancel }));

    await waitFor(() => expect(screen.queryByRole("alertdialog")).toBeNull());
    expect(deletes(calls)).toEqual([]);
  });
});

describe("reasoning cache clear all", () => {
  const label = messages.cache.reasoningClearAll;

  it("does not delete until the destructive dialog is confirmed", async () => {
    const calls = installFetch();
    render(<ReasoningCacheTab />);

    const dialog = await openDialog(label);
    const confirm = expectDestructiveConfirm(dialog, label);
    expect(deletes(calls)).toEqual([]);

    fireEvent.click(confirm);
    await waitFor(() =>
      expect(deletes(calls)).toEqual([{ url: "/api/cache/reasoning", method: "DELETE" }])
    );
  });

  it("keeps the cache when the dialog is cancelled", async () => {
    const calls = installFetch();
    render(<ReasoningCacheTab />);

    const dialog = await openDialog(label);
    fireEvent.click(within(dialog).getByRole("button", { name: messages.common.cancel }));

    await waitFor(() => expect(screen.queryByRole("alertdialog")).toBeNull());
    expect(deletes(calls)).toEqual([]);
  });
});
