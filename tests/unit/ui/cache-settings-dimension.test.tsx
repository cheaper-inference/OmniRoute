// The semantic-cache embedding dimension is operator-editable and its effective source is
// spelled out. These cases pin the behaviour that fixes the UI/DB (1024) vs env/runtime (768)
// split: the env layer disables the field and is never persisted, a probe result is offered
// when nobody pinned a value, and a pinned value is kept with a visible mismatch warning.
import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CacheSettingsTab from "@/app/(dashboard)/dashboard/settings/components/CacheSettingsTab";
import en from "@/i18n/messages/en.json";

const model = {
  id: "lemonade/harrier-oss-v1-0.6b",
  rawId: "harrier-oss-v1-0.6b",
  name: "Harrier OSS v1 0.6B",
  maxTokens: 8192,
  supportedInputTypes: ["text"],
};

function configWith(overrides: Record<string, unknown> = {}) {
  return {
    modelCatalogCacheTtlMs: 1500,
    semanticCacheEnabled: true,
    semanticCacheVectorEnabled: false,
    semanticCacheEmbeddingProvider: "lemonade",
    semanticCacheEmbeddingModel: model.rawId,
    semanticCacheEmbeddingDimension: 1024,
    semanticCacheEmbeddingDimensionSource: "db",
    semanticCacheEmbeddingDimensionConfigured: 1024,
    embeddingOptions: [{ id: "lemonade", name: "Lemonade", hasConnection: true, models: [model] }],
    ...overrides,
  };
}

// Exercise the real catalog and formatter, not the global key-only test mock.
vi.unmock("next-intl");

const reply = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status });
const fetchMock = vi.fn<typeof fetch>();

function mount() {
  return render(
    <NextIntlClientProvider
      locale="en"
      timeZone="UTC"
      messages={{ settings: en.settings, common: en.common }}
      onError={(error) => {
        throw error;
      }}
    >
      <CacheSettingsTab />
    </NextIntlClientProvider>
  );
}

async function loaded() {
  const view = mount();
  await waitFor(() => expect(screen.getAllByRole("combobox")[0]).toHaveProperty("disabled", false));
  return view;
}

function dimensionInput(): HTMLInputElement {
  return screen.getByLabelText(en.settings.semanticCacheEmbeddingDimension) as HTMLInputElement;
}

beforeEach(() => {
  fetchMock.mockReset();
  fetchMock.mockImplementation(async () => reply(configWith()));
  vi.stubGlobal("fetch", fetchMock);
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("semantic cache embedding dimension", () => {
  it("lets the operator edit the dimension and persists the edited value", async () => {
    await loaded();
    expect(dimensionInput().value).toBe("1024");

    fireEvent.change(dimensionInput(), { target: { value: "768" } });
    fireEvent.click(screen.getByRole("button", { name: en.settings.semanticCacheSave }));

    await screen.findByText(en.settings.semanticCacheSaveSuccess);
    const body = JSON.parse(String(fetchMock.mock.calls.at(-1)?.[1]?.body));
    expect(body.semanticCacheEmbeddingDimension).toBe(768);
  });

  it("shows the env override, locks the field and never persists the env value", async () => {
    fetchMock.mockImplementation(async () =>
      reply(
        configWith({
          semanticCacheEmbeddingDimension: 768,
          semanticCacheEmbeddingDimensionSource: "env",
          semanticCacheEmbeddingDimensionConfigured: 1024,
        })
      )
    );
    await loaded();

    expect(dimensionInput().value).toBe("768");
    expect(dimensionInput()).toHaveProperty("disabled", true);
    expect(
      screen.getByText(/Overridden by OMNIROUTE_SEMANTIC_CACHE_EMBEDDING_DIMENSION/)
    ).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: en.settings.semanticCacheSave }));
    await screen.findByText(en.settings.semanticCacheSaveSuccess);

    const body = JSON.parse(String(fetchMock.mock.calls.at(-1)?.[1]?.body));
    expect(body).not.toHaveProperty("semanticCacheEmbeddingDimension");
  });

  it("offers the detected dimension when nobody pinned one", async () => {
    await loaded();
    fetchMock.mockResolvedValueOnce(
      reply({
        ok: true,
        latencyMs: 12,
        dimensions: 768,
        configuredDimensions: 1024,
        dimensionSource: "db",
        dimensionMismatch: true,
      })
    );
    fireEvent.click(screen.getByRole("button", { name: en.settings.semanticCacheTest }));

    await waitFor(() => expect(dimensionInput().value).toBe("768"));
    expect(
      screen.getByText(/Using the 768 dimensions detected by the connection test/)
    ).toBeTruthy();
    // The probe only offers the value: nothing is saved until the operator saves.
    expect(screen.queryByText(/The configured value was kept/)).toBeNull();
  });

  it("keeps a pinned dimension and surfaces the probe mismatch", async () => {
    await loaded();
    fireEvent.change(dimensionInput(), { target: { value: "512" } });

    fetchMock.mockResolvedValueOnce(
      reply({
        ok: true,
        latencyMs: 12,
        dimensions: 768,
        configuredDimensions: 512,
        dimensionSource: "db",
        dimensionMismatch: true,
      })
    );
    fireEvent.click(screen.getByRole("button", { name: en.settings.semanticCacheTest }));

    await screen.findByText(/The endpoint returned 768 dimensions but 512 is configured/);
    expect(dimensionInput().value).toBe("512");
  });
});
