import React, { useState } from "react";
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import AccountPreferencesEditor from "../../../src/app/(dashboard)/dashboard/combos/AccountPreferencesEditor";
import BuilderIntelligentStep from "../../../src/app/(dashboard)/dashboard/combos/BuilderIntelligentStep";
import type { AccountPreference } from "../../../open-sse/services/combo/accountPreferences";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function Harness({ providerIds }: { providerIds?: string[] }) {
  const [value, setValue] = useState<Record<string, AccountPreference>>({
    a: "preferred",
    b: "reserve",
  });
  return (
    <>
      <AccountPreferencesEditor value={value} onChange={setValue} providerIds={providerIds} />
      <output data-testid="value">{JSON.stringify(value)}</output>
    </>
  );
}

function choose(element: HTMLElement, value: string, label: string) {
  if (element.tagName === "SELECT") {
    fireEvent.change(element, { target: { value } });
  } else {
    fireEvent.keyDown(element, { key: "Enter" });
    fireEvent.click(screen.getByRole("option", { name: label }));
  }
}

it("the builder passes its selected pool and uses available providers when the pool is unrestricted", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        connections: [
          { id: "a", provider: "openai", name: "A" },
          { id: "b", provider: "anthropic", name: "B" },
          { id: "c", provider: "firecrawl", name: "C" },
        ],
      }),
    })
  );
  const props = {
    t: Object.assign((key: string) => key, { has: () => false }),
    activeProviders: [{ providerId: "openai" }, { providerId: "anthropic" }],
    onChange: vi.fn(),
  };
  const { rerender } = render(
    <BuilderIntelligentStep {...props} config={{ candidatePool: ["openai"] }} />
  );
  fireEvent.click(screen.getByRole("button", { name: /Account preferences/ }));
  await screen.findByRole("combobox", { name: "openai · A" });
  expect(screen.queryByRole("combobox", { name: "anthropic · B" })).toBeNull();
  rerender(<BuilderIntelligentStep {...props} config={{ candidatePool: [] }} />);
  expect(screen.getByRole("combobox", { name: "anthropic · B" })).toBeTruthy();
  expect(screen.queryByRole("combobox", { name: "firecrawl · C" })).toBeNull();
});

it("edits several accounts independently and clears only the account restored to normal", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        connections: [
          { id: "a", provider: "openai", name: "A" },
          { id: "b", provider: "openai", name: "B" },
          { id: "c", provider: "openai", name: "C" },
        ],
      }),
    })
  );
  render(<Harness />);
  fireEvent.click(screen.getByRole("button", { name: /Account preferences/ }));
  const first = await screen.findByRole("combobox", { name: "openai · A" });
  const third = await screen.findByRole("combobox", { name: "openai · C" });
  choose(third, "preferred", "Preferred");
  expect(JSON.parse(screen.getByTestId("value").textContent!)).toEqual({
    a: "preferred",
    b: "reserve",
    c: "preferred",
  });
  choose(first, "normal", "Normal");
  expect(JSON.parse(screen.getByTestId("value").textContent!)).toEqual({
    b: "reserve",
    c: "preferred",
  });
});

it("reports a failed account load without erasing stored preferences", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
  render(<Harness />);
  fireEvent.click(screen.getByRole("button", { name: /Account preferences/ }));
  expect(await screen.findByRole("alert")).toBeTruthy();
  expect(JSON.parse(screen.getByTestId("value").textContent!)).toEqual({
    a: "preferred",
    b: "reserve",
  });
});

it("filters the current pool reactively without deleting hidden account preferences", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        connections: [
          { id: "a", provider: "openai", name: "A" },
          { id: "b", provider: "anthropic", name: "B" },
          { id: "c", provider: "firecrawl", name: "C" },
        ],
      }),
    })
  );
  const { rerender } = render(<Harness providerIds={["openai"]} />);
  fireEvent.click(screen.getByRole("button", { name: /Account preferences/ }));
  const first = await screen.findByRole("combobox", { name: "openai · A" });
  expect(screen.queryByRole("combobox", { name: "anthropic · B" })).toBeNull();
  expect(screen.queryByRole("combobox", { name: "firecrawl · C" })).toBeNull();
  choose(first, "normal", "Normal");
  expect(JSON.parse(screen.getByTestId("value").textContent!)).toEqual({ b: "reserve" });
  rerender(<Harness providerIds={["anthropic"]} />);
  expect(screen.getByRole("combobox", { name: "anthropic · B" })).toBeTruthy();
  expect(screen.queryByRole("combobox", { name: "openai · A" })).toBeNull();
  rerender(<Harness providerIds={[]} />);
  expect(screen.queryAllByRole("combobox")).toHaveLength(0);
  expect(JSON.parse(screen.getByTestId("value").textContent!)).toEqual({ b: "reserve" });
});

it("bounds long lists in a keyboard-accessible scroll region without dropping the last account", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        connections: Array.from({ length: 60 }, (_, i) => ({
          id: String(i),
          provider: "openai",
          name: "Account " + i,
        })),
      }),
    })
  );
  render(<Harness providerIds={["openai"]} />);
  fireEvent.click(screen.getByRole("button", { name: /Account preferences/ }));
  await screen.findByRole("combobox", { name: "openai · Account 59" });
  const region = screen.getByRole("region", { name: "Account preferences" });
  expect(region.className).toContain("overflow-y-auto");
  expect(region.className).toContain("max-h-");
  expect(region.tabIndex).toBe(0);
  expect(region.querySelectorAll('[role="combobox"],select')).toHaveLength(60);
});
