// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import SimpleControls from "@/app/(dashboard)/dashboard/translator/components/SimpleControls";
import AdvancedSection from "@/app/(dashboard)/dashboard/translator/components/advanced/AdvancedSection";
import CompressionPreviewAccordion from "@/app/(dashboard)/dashboard/translator/components/advanced/CompressionPreviewAccordion";
import Collapsible from "@/shared/components/Collapsible";

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/app/(dashboard)/dashboard/translator/hooks/useAvailableModels", () => ({
  useAvailableModels: () => ({ availableModels: [] }),
}));

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

it("KEA-9804: Mode stacks its options and wraps their labels on phones", async () => {
  await act(async () => {
    root.render(
      <SimpleControls
        source="claude"
        target="openai"
        provider="openai"
        providerOptions={[]}
        inputText=""
        mode="preview"
        onModeChange={vi.fn()}
        onSourceChange={vi.fn()}
        onTargetChange={vi.fn()}
        onProviderChange={vi.fn()}
        onInputChange={vi.fn()}
        onSubmit={vi.fn()}
        onOpenAdvanced={vi.fn()}
        isLoading={false}
        loading={false}
      />
    );
  });

  const group = container.querySelector('[role="radiogroup"][aria-label="Mode"]');
  expect(group?.parentElement?.className.split(" ")).toEqual(
    expect.arrayContaining(["w-full", "min-w-0"])
  );
  expect(group?.className.split(" ")).toEqual(
    expect.arrayContaining([
      "max-sm:grid",
      "max-sm:grid-cols-1",
      "max-sm:[&>button]:whitespace-normal",
    ])
  );
  expect(group?.querySelectorAll('[role="radio"]')).toHaveLength(2);
});

it("KEA-9804: Advanced contains its accordions and allows their headings to wrap on phones", async () => {
  await act(async () => {
    root.render(
      <AdvancedSection>
        <Collapsible title="OpenAI intermediate pipeline" subtitle="Inspect the translation steps">
          <p>Pipeline</p>
        </Collapsible>
        <CompressionPreviewAccordion inputContent="" />
      </AdvancedSection>
    );
  });

  const card = container.querySelector("#translator-advanced-section");
  const accordions = card?.querySelector('[data-advanced-container="true"]');
  expect(card?.className.split(" ")).toEqual(expect.arrayContaining(["w-full", "min-w-0"]));
  expect(accordions?.className.split(" ")).toContain(
    "max-sm:[&_:is([data-slot=accordion-trigger],[data-slot=disclosure-trigger])_.truncate]:whitespace-normal"
  );
  expect(accordions?.querySelector("button")?.textContent).toContain(
    "OpenAI intermediate pipeline"
  );
  expect(accordions?.querySelector('[data-slot="disclosure-trigger"] .truncate')).toBeTruthy();
});
