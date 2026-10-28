// @vitest-environment jsdom
/**
 * KEA-7886 lote 6 (fix round 1): the format/provider selects of the translator's Raw JSON
 * panel and Test Bench must carry an accessible name (WCAG 4.1.2, axe `select-name`). They
 * used to sit under a loose <label> with no association, so the kit trigger had no name.
 *
 * The real Select adapter is rendered (the barrel is mocked only for the heavy siblings), so
 * the assertion covers the label → trigger association the kit actually produces.
 */
import React from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

const LABELS: Record<string, string> = {
  source: "Source",
  target: "Target",
  targetProvider: "Target Provider",
};

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => LABELS[key] ?? key,
}));

vi.mock("@/shared/components/MonacoEditor", () => ({
  default: ({ value }: { value?: string }) => (
    <textarea data-testid="monaco-editor" readOnly value={value ?? ""} />
  ),
}));

vi.mock("@/shared/components/Collapsible", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock("@/shared/components", async () => {
  const actualSelect = await vi.importActual<typeof import("@/shared/components/Select")>(
    "@/shared/components/Select"
  );
  return {
    Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Button: ({ children, onClick }: { children?: React.ReactNode; onClick?: () => void }) => (
      <button type="button" onClick={onClick}>
        {children}
      </button>
    ),
    Badge: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
    Select: actualSelect.default,
  };
});

vi.mock("@/app/(dashboard)/dashboard/translator/hooks/useProviderOptions", () => ({
  useProviderOptions: () => ({
    provider: "openai",
    setProvider: vi.fn(),
    providerOptions: [
      { value: "openai", label: "OpenAI" },
      { value: "anthropic", label: "Anthropic" },
    ],
    loading: false,
  }),
}));

vi.mock("@/app/(dashboard)/dashboard/translator/hooks/useAvailableModels", () => ({
  useAvailableModels: () => ({
    model: "gpt-4o",
    setModel: vi.fn(),
    availableModels: ["gpt-4o"],
    loading: false,
    pickModelForFormat: () => "gpt-4o",
  }),
}));

vi.mock("@/app/(dashboard)/dashboard/translator/exampleTemplates", () => ({
  getExampleTemplates: () => [
    {
      id: "simple-chat",
      name: "Simple Chat",
      icon: "chat",
      description: "Simple chat",
      formats: { openai: { model: "gpt-4o", messages: [{ role: "user", content: "Hello" }] } },
    },
  ],
  FORMAT_META: {
    openai: { label: "OpenAI", color: "blue", icon: "psychology" },
    claude: { label: "Claude", color: "amber", icon: "auto_awesome" },
  },
  FORMAT_OPTIONS: [
    { value: "openai", label: "OpenAI" },
    { value: "claude", label: "Claude" },
  ],
}));

const RAW_JSON_PANEL = "@/app/(dashboard)/dashboard/translator/components/advanced/RawJsonPanel";
const TEST_BENCH = "@/app/(dashboard)/dashboard/translator/components/advanced/TestBenchAccordion";

// Warm both component modules once, outside the 5 s per-test budget: the first cold transform
// of the kit-backed Select/Input can take several seconds on a loaded runner.
beforeAll(async () => {
  await import(RAW_JSON_PANEL);
  await import(TEST_BENCH);
}, 60_000);

afterEach(() => cleanup());

describe("translator selects have an accessible name", () => {
  it("RawJsonPanel names its source and target format selects", async () => {
    const { default: RawJsonPanel } = await import(RAW_JSON_PANEL);
    const view = render(<RawJsonPanel defaultOpen />);
    expect(view.getByRole("combobox", { name: "Source" })).toBeTruthy();
    expect(view.getByRole("combobox", { name: "Target" })).toBeTruthy();
  });

  it("TestBenchAccordion names its source and target provider selects", async () => {
    const { default: TestBenchAccordion } = await import(TEST_BENCH);
    const view = render(<TestBenchAccordion forceOpen />);
    expect(view.getByRole("combobox", { name: "Source" })).toBeTruthy();
    expect(view.getByRole("combobox", { name: "Target Provider" })).toBeTruthy();
  });
});
