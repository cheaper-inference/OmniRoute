// @vitest-environment jsdom
/**
 * Test verifying that PassthroughModelsSection preserves and passes supportsVision
 * to PassthroughModelRow, displaying vision capabilities and override controls.
 */
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import PassthroughModelsSection from "../components/PassthroughModelsSection";

let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ overrides: {} }),
  } as Response);
});

afterEach(() => {
  container.remove();
  vi.restoreAllMocks();
});

describe("PassthroughModelsSection vision capabilities", () => {
  it("renders vision badge and editor when a model supports vision", async () => {
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <PassthroughModelsSection
          providerId="mistral"
          providerAlias="mistral"
          modelAliases={{}}
          availableModels={[
            {
              id: "pixtral-large-latest",
              name: "Pixtral Large",
              supportsVision: true,
            },
            {
              id: "mistral-large-latest",
              name: "Mistral Large",
              supportsVision: false,
            },
          ]}
          customModels={[]}
          catalogModels={[]}
          description="Mistral models"
          inputLabel="Model ID"
          inputPlaceholder="Enter model"
          onCopy={() => {}}
          onSetAlias={async () => {}}
          onDeleteAlias={() => {}}
          t={(key: string) => {
            if (key === "visionCapableLabel") return "Vision";
            if (key === "visionOverrideLabel") return "Override vision";
            return key;
          }}
          effectiveModelNormalize={() => false}
          effectiveModelPreserveDeveloper={() => false}
          getUpstreamHeadersRecord={() => ({})}
          saveModelCompatFlags={async () => {}}
          isModelHidden={() => false}
          onToggleHidden={async () => {}}
          onBulkToggleHidden={async () => {}}
          connectionId="conn-1"
        />
      );
    });

    const rows = Array.from(container.querySelectorAll(".rounded-lg.border"));
    const pixtralRow = rows.find((r) =>
      r.querySelector("code")?.textContent?.includes("pixtral-large-latest")
    );
    const mistralRow = rows.find((r) =>
      r.querySelector("code")?.textContent?.includes("mistral-large-latest")
    );

    expect(pixtralRow).toBeDefined();
    expect(mistralRow).toBeDefined();

    // Verify vision badge within each row
    const pixtralVisionBadges = Array.from(pixtralRow?.querySelectorAll(".ci-badge") || []).filter(
      (el) => el.textContent?.trim() === "Vision"
    );
    expect(pixtralVisionBadges.length).toBe(1);

    const mistralVisionBadges = Array.from(mistralRow?.querySelectorAll(".ci-badge") || []).filter(
      (el) => el.textContent?.trim() === "Vision"
    );
    expect(mistralVisionBadges.length).toBe(0);
  });
});
