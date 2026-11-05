// @vitest-environment jsdom
// #17915: the palette kept sidebar order for every match, so for "log" the Integrations
// item "Log export" and the Costs item "Radar Catalog" (substring in "Catalog") came before
// the Monitoring page "Logs". Results are now ranked: exact label, then label prefix or a
// word prefix, then a label substring, then matches in the subtitle or section names.
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

process.env.NEXT_PUBLIC_OMNIROUTE_E2E_MODE = "1";
const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, refresh: vi.fn() }),
  usePathname: () => "/dashboard",
}));

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
  vi.unstubAllGlobals();
});

async function optionsFor(query: string): Promise<HTMLElement[]> {
  const input = screen.getByRole("searchbox");
  fireEvent.change(input, { target: { value: query } });
  return screen.findAllByRole("option");
}

// The option renders the label as its first <p>; the subtitle is the second one.
function labelOf(option: HTMLElement): string {
  return option.querySelector("p")?.textContent?.trim() ?? "";
}

describe("CommandPalette ranking (#17915)", () => {
  it(
    "puts the main Logs page first for a broad query and the exact match first for a specific one",
    { timeout: 20_000 },
    async () => {
      render(<CommandPalette isOpen onClose={vi.fn()} />);
      await screen.findByRole("searchbox");

      const expectations: Array<[string, string]> = [
        ["log", "Logs"],
        ["logs", "Logs"],
        ["log export", "Log export"],
        ["proxy logs", "Proxy Logs"],
        ["radar", "Radar Catalog"],
      ];
      for (const [query, first] of expectations) {
        const options = await optionsFor(query);
        expect(labelOf(options[0]), `first result for "${query}"`).toBe(first);
        // Weaker matches stay available, they just come later.
        if (query === "log") {
          const labels = options.map(labelOf);
          expect(labels).toContain("Log export");
          expect(labels).toContain("Radar Catalog");
          expect(labels.indexOf("Logs")).toBeLessThan(labels.indexOf("Radar Catalog"));
        }
      }
    }
  );

  it(
    "keeps keyboard order equal to displayed order across section boundaries",
    { timeout: 20_000 },
    async () => {
      render(<CommandPalette isOpen onClose={vi.fn()} />);
      await screen.findByRole("searchbox");
      const options = await optionsFor("log");
      const flatIndexes = options.map((o) => Number(o.getAttribute("data-flat-index")));
      expect(flatIndexes).toEqual([...flatIndexes].sort((a, b) => a - b));
      expect(flatIndexes[0]).toBe(0);
      expect(options[0].getAttribute("aria-selected")).toBe("true");
    }
  );
});
