// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { compressionSettingsUpdateSchema } from "@/shared/validation/compressionConfigSchemas";

// next-intl echoes the key, so labels are the translation keys.
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("@/shared/components", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Button: ({ children, onClick }: { children?: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

const CONFIG = {
  enabled: true,
  defaultMode: "standard",
  autoTriggerTokens: 0,
  cacheMinutes: 5,
  preserveSystemPrompt: true,
  comboOverrides: {},
  cavemanConfig: {
    enabled: true,
    compressRoles: ["user"],
    skipRules: [],
    minMessageLength: 50,
    preservePatterns: [],
    intensity: "full",
  },
  cavemanOutputMode: { enabled: false, intensity: "full", autoClarity: true },
  rtkConfig: { enabled: true, intensity: "standard" },
};

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot> | undefined;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  vi.stubGlobal(
    "fetch",
    vi.fn((url: string) => {
      const u = String(url);
      if (u.includes("/api/settings/compression")) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve(CONFIG) });
      }
      if (u.includes("/api/compression/rules")) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ rules: [] }) });
      }
      return Promise.resolve({ ok: false, json: () => Promise.resolve(null) });
    })
  );
});

afterEach(() => {
  act(() => root?.unmount());
  root = undefined;
  container.remove();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

async function renderTab() {
  const { default: CompressionSettingsTab } =
    await import("@/app/(dashboard)/dashboard/settings/components/CompressionSettingsTab");
  await act(async () => {
    root = createRoot(container);
    root.render(<CompressionSettingsTab />);
  });
  // Drain the on-mount fetch, json and setState microtask chain.
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

function cacheTtlInput(): HTMLInputElement {
  // Kit Field: the <label for> names the input (no longer a <label> wrapping it).
  const label = Array.from(container.querySelectorAll("label")).find((candidate) =>
    candidate.textContent?.includes("compressionCacheTTL")
  );
  const forId = label?.getAttribute("for");
  const input = forId ? container.querySelector<HTMLInputElement>(`input[id="${forId}"]`) : null;
  expect(input).toBeTruthy();
  return input!;
}

// The field is the kit NumberInput: a text field with no `min`/`max` attributes, which brings
// an edited value into its bounds when the edit ends. The bound is what it leaves in place of
// a value far outside the range.
function boundFor(typed: string): number {
  const input = cacheTtlInput();
  expect(input.className).toContain("ci-number-input");
  fireEvent.change(input, { target: { value: typed } });
  fireEvent.blur(input);
  return Number(cacheTtlInput().value);
}

// The bounds are read off the rendered input and checked against the PUT schema, so a change
// to either side without the other fails here.
const routeAccepts = (cacheMinutes: number) =>
  compressionSettingsUpdateSchema.safeParse({ cacheMinutes }).success;

describe("CompressionSettingsTab cache TTL input bounds", () => {
  it("starts the input at the lowest cache TTL the settings route accepts", async () => {
    await renderTab();
    const min = boundFor("0");
    expect(routeAccepts(min)).toBe(true);
    expect(routeAccepts(min - 1)).toBe(false);
  });

  it("stops the input at the highest cache TTL the settings route accepts", async () => {
    await renderTab();
    const max = boundFor("99999");
    expect(routeAccepts(max)).toBe(true);
    expect(routeAccepts(max + 1)).toBe(false);
  });
});
