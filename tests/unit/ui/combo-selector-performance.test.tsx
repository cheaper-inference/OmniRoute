import React from "react";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import ComboStepSelectors from "@/app/(dashboard)/dashboard/combos/ComboStepSelectors";
import { COMBO_BUILDER_AUTO_CONNECTION } from "@/lib/combos/builderDraft";
import type {
  ComboBuilderModelOption,
  ComboBuilderProviderOption,
} from "@/lib/combos/builderOptions";

afterEach(cleanup);

it("opens 5,000 models, filters the catalog and selects the last exact model", () => {
  const models = Array.from({ length: 5_000 }, (_, i): ComboBuilderModelOption => ({
    id: `Exact-Model-${i}`,
    name: `Model ${i}`,
    qualifiedModel: `oa/Exact-Model-${i}`,
    source: "custom",
    sources: ["custom"],
  }));
  const provider: ComboBuilderProviderOption = {
    providerId: "openai",
    providerType: "openai",
    displayName: "OpenAI",
    alias: "oa",
    icon: "",
    color: "",
    source: "system",
    acceptsArbitraryModel: true,
    connectionCount: 0,
    activeConnectionCount: 0,
    modelCount: models.length,
    connections: [],
    models,
  };
  const onModelChange = vi.fn();
  render(
    <ComboStepSelectors
      providers={[provider]}
      providerId="openai"
      modelId=""
      connectionId={COMBO_BUILDER_AUTO_CONNECTION}
      loading={false}
      loadError={false}
      emailsVisible={false}
      allowedConnectionIds={[]}
      onProviderChange={vi.fn()}
      onModelChange={onModelChange}
      onConnectionChange={vi.fn()}
      onAllowedConnectionToggle={vi.fn()}
    />
  );
  const trigger = within(screen.getByTestId("combo-builder-model")).getByRole("button");
  const opening = performance.now();
  fireEvent.click(trigger);
  const openMs = performance.now() - opening;
  const query = screen.getByRole("combobox", { name: "Search", exact: true });
  const listbox = screen.getByRole("listbox");
  expect(listbox.querySelectorAll('[role="option"]')).toHaveLength(5_001);

  const filtering = performance.now();
  fireEvent.change(query, { target: { value: "custom Exact-Model-4999" } });
  const filterMs = performance.now() - filtering;
  expect(within(listbox).getAllByRole("option")).toHaveLength(2);
  expect(onModelChange).not.toHaveBeenCalled();
  const last = within(listbox).getByRole("option", { name: /Exact-Model-4999/ });
  const selecting = performance.now();
  fireEvent.click(last);
  const selectMs = performance.now() - selecting;
  console.info(
    `5,000 combo models (jsdom): open ${openMs.toFixed(1)} ms, filter ${filterMs.toFixed(1)} ms, select ${selectMs.toFixed(1)} ms`
  );
  expect(onModelChange).toHaveBeenCalledExactlyOnceWith("Exact-Model-4999");
}, 90_000);
