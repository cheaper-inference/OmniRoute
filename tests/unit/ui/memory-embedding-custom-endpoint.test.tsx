// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

function changeInput(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
  setter?.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

describe("Memory custom embedding endpoint controls", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  it("validates locally and persists a complete custom endpoint override", async () => {
    const { default: EmbeddingSourceSelector } =
      await import("@/app/(dashboard)/dashboard/memory/components/EmbeddingSourceSelector");
    const onSave = vi.fn().mockResolvedValue(true);
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(
        <EmbeddingSourceSelector
          settings={{
            embeddingSource: "remote",
            embeddingProviderModel: null,
            customBaseUrl: null,
            customModelId: null,
          }}
          providers={[]}
          onSave={onSave}
        />
      );
    });

    const baseUrl = container.querySelector(
      "[data-testid='embedding-custom-base-url']"
    ) as HTMLInputElement;
    const modelId = container.querySelector(
      "[data-testid='embedding-custom-model-id']"
    ) as HTMLInputElement;
    const save = container.querySelector(
      "[data-testid='embedding-custom-save']"
    ) as HTMLButtonElement;
    expect(baseUrl).toBeTruthy();
    expect(modelId).toBeTruthy();

    await act(async () => {
      changeInput(baseUrl, "file:///tmp/embeddings");
    });
    await act(async () => {
      changeInput(modelId, "custom-model");
    });
    await act(async () => {
      save.click();
    });
    expect(container.textContent).toContain("embedding.customEndpointInvalid");
    expect(onSave).not.toHaveBeenCalled();

    await act(async () => {
      changeInput(baseUrl, "http://localhost:8000/v1/");
    });
    await act(async () => {
      save.click();
    });
    expect(onSave).toHaveBeenCalledWith({
      customBaseUrl: "http://localhost:8000/v1",
      customModelId: "custom-model",
    });
  });
});
