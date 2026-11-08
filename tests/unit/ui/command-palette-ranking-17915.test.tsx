// @vitest-environment jsdom
// #17915: the palette kept sidebar order for every match, so for "log" the Integrations
// item "Log export" and the Costs item "Radar Catalog" (substring in "Catalog") came before
// the Monitoring page "Logs". Results are now ranked: exact label, then label prefix or a
// word prefix, then a label substring, then matches in the subtitle or section names.
// The kit Command still decides which rows show; ranking only orders them.
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

process.env.NEXT_PUBLIC_OMNIROUTE_E2E_MODE = "1";
const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, refresh: vi.fn() }),
  usePathname: () => "/dashboard",
}));

// Real English copy, as in the global mock, with a few strings a test can localize. They are
// pinned here instead of read from a locale file, so a translation wave cannot change the case.
const sidebarOverrides = vi.hoisted(() => ({ current: {} as Record<string, string> }));
vi.mock("next-intl", async () => {
  const { createTranslator } = await import("use-intl/core");
  const { default: en } = await import("../../../src/i18n/messages/en.json");
  const translators = new Map<string, ReturnType<typeof createTranslator>>();
  return {
    useTranslations: (namespace?: string) => {
      // One translator per message set: the palette keeps `t` in its dependency arrays.
      const cacheKey = `${namespace}:${JSON.stringify(sidebarOverrides.current)}`;
      let t = translators.get(cacheKey);
      if (!t) {
        t = createTranslator({
          locale: "en",
          messages: { ...en, sidebar: { ...en.sidebar, ...sidebarOverrides.current } },
          namespace,
          onError: () => {},
          getMessageFallback: ({ key }) => key,
        });
        translators.set(cacheKey, t);
      }
      return t;
    },
    useLocale: () => "en",
  };
});

const { default: CommandPalette } = await import("@/shared/components/CommandPalette");

if (!Element.prototype.scrollIntoView) Element.prototype.scrollIntoView = () => {};

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => new Response("{}", { headers: { "content-type": "application/json" } }))
  );
});

afterEach(() => {
  cleanup();
  push.mockClear();
  sidebarOverrides.current = {};
  vi.unstubAllGlobals();
});

async function openPalette(): Promise<HTMLElement> {
  render(<CommandPalette isOpen onClose={vi.fn()} />);
  return screen.findByRole("combobox");
}

async function optionsFor(input: HTMLElement, query: string): Promise<HTMLElement[]> {
  fireEvent.change(input, { target: { value: query } });
  return screen.findAllByRole("option");
}

function labelOf(option: HTMLElement): string {
  return option.querySelector(".ci-command__label")?.textContent?.trim() ?? "";
}

describe("CommandPalette ranking (#17915)", () => {
  it(
    "puts the main Logs page first for a broad query and the exact match first for a specific one",
    { timeout: 20_000 },
    async () => {
      const input = await openPalette();

      const expectations: Array<[string, string]> = [
        ["log", "Logs"],
        ["logs", "Logs"],
        ["log export", "Log export"],
        ["proxy logs", "Proxy Logs"],
        ["radar", "Radar Catalog"],
      ];
      for (const [query, first] of expectations) {
        const options = await optionsFor(input, query);
        expect(labelOf(options[0]), `first result for "${query}"`).toBe(first);
        // Weaker matches stay available, they just come later.
        if (query === "log") {
          const labels = options.map(labelOf);
          expect(labels).toContain("Log export");
          expect(labels).toContain("Radar Catalog");
          expect(labels.indexOf("Logs")).toBeLessThan(labels.indexOf("Log export"));
          expect(labels.indexOf("Logs")).toBeLessThan(labels.indexOf("Radar Catalog"));
        }
      }
    }
  );

  it(
    "selects the first displayed row, and the arrows and Enter walk the displayed order",
    { timeout: 20_000 },
    async () => {
      const input = await openPalette();
      const options = await optionsFor(input, "log");
      const labels = options.map(labelOf);
      expect(labels.slice(0, 2)).toEqual(["Logs", "Proxy Logs"]);
      expect(options[0].getAttribute("aria-selected")).toBe("true");
      expect(input.getAttribute("aria-activedescendant")).toBe(options[0].id);

      fireEvent.keyDown(input, { key: "ArrowDown" });
      expect(input.getAttribute("aria-activedescendant")).toBe(options[1].id);
      fireEvent.keyDown(input, { key: "Enter" });
      expect(push).toHaveBeenCalledTimes(1);
      expect(push).toHaveBeenLastCalledWith("/dashboard/logs/proxy");

      // Past the first section: "Log export" sits in Integrations, after the Monitoring rows.
      const target = labels.indexOf("Log export");
      expect(target).toBeGreaterThan(1);
      for (let step = 1; step < target; step += 1) fireEvent.keyDown(input, { key: "ArrowDown" });
      expect(input.getAttribute("aria-activedescendant")).toBe(options[target].id);
      fireEvent.keyDown(input, { key: "Enter" });
      expect(push).toHaveBeenCalledTimes(2);
      expect(push).toHaveBeenLastCalledWith("/dashboard/log-export");
    }
  );

  it("ranks a label typed without its accents above a subtitle match", async () => {
    sidebarOverrides.current = {
      radar: "Catálogo Radar",
      settingsCacheSubtitle: "Catálogo de modelos e cache de respostas",
    };
    const input = await openPalette();
    const labels = (await optionsFor(input, "catalogo")).map(labelOf);
    expect(labels).toEqual(["Catálogo Radar", "Cache"]);
  });

  it("keeps rows the kit finds across fields even though no field holds the whole query", async () => {
    const input = await openPalette();
    const labels = (await optionsFor(input, "logs monitoring")).map(labelOf);
    expect(labels).toEqual(
      expect.arrayContaining(["Logs", "Proxy Logs", "Console Logs", "Timeline", "Conversations"])
    );
    expect(labels).toHaveLength(5);
  });

  it("returns to the sidebar order when the query is cleared", async () => {
    const input = await openPalette();
    const sidebarOrder = (await screen.findAllByRole("option")).map(labelOf);
    await optionsFor(input, "log");
    const cleared = (await optionsFor(input, "")).map(labelOf);
    expect(cleared).toEqual(sidebarOrder);
  });
});
