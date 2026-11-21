// @vitest-environment jsdom
/**
 * Expert-mode manual model entry is the escape hatch for a model the catalog does not list.
 * It must resolve the typed prefix against every configured provider, including one whose
 * catalog is empty for the active capability tab (a custom OpenAI-compatible node with no
 * synced models, for example).
 *
 * The capability tabs (c7e79d04ea, PR #19771) narrowed the picker list to providers that have
 * at least one model for the tab, and manual entry was reading that same narrowed list: a
 * configured provider with no catalog models answered "Unknown provider prefix." and the step
 * was never added. E2E twin: tests/e2e/combos-flow.spec.ts → "expert mode shows a single-page
 * combo form with manual model entry".
 */
import React from "react";
import "@testing-library/jest-dom/vitest";
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn(), prefetch: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/dashboard/combos",
}));

const { default: CombosPage } = await import("@/app/(dashboard)/dashboard/combos/page");

beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

const builderOptions = {
  providers: [
    {
      // Configured, but the catalog has no model for it.
      providerId: "codex",
      alias: "cx",
      displayName: "Codex",
      connectionCount: 1,
      models: [],
      connections: [{ id: "conn-codex", label: "Codex Primary", status: "active", priority: 1 }],
    },
    {
      // Configured, with a catalog model the picker can offer.
      providerId: "openrouter",
      alias: "openrouter",
      displayName: "OpenRouter",
      connectionCount: 1,
      models: [
        {
          id: "openai/gpt-5.5",
          name: "GPT-5.5",
          qualifiedModel: "openrouter/openai/gpt-5.5",
        },
      ],
      connections: [
        { id: "conn-openrouter", label: "OpenRouter Primary", status: "active", priority: 1 },
      ],
    },
  ],
  comboRefs: [],
};

function payload(url: string): unknown {
  if (url.startsWith("/api/combos/metrics")) return { metrics: {} };
  if (url.startsWith("/api/combos/builder/options")) return builderOptions;
  if (url.startsWith("/api/combos")) return { combos: [] };
  if (url.startsWith("/api/settings/proxy")) return { combos: {} };
  if (url.startsWith("/api/settings/compression")) return { enabled: false };
  if (url.startsWith("/api/settings")) return { comboConfigMode: "expert" };
  if (url.startsWith("/api/providers")) {
    return {
      connections: [
        { id: "conn-codex", provider: "codex", testStatus: "active" },
        { id: "conn-openrouter", provider: "openrouter", testStatus: "active" },
      ],
    };
  }
  if (url.startsWith("/api/provider-nodes")) return { nodes: [] };
  if (url.startsWith("/api/models/alias")) return { aliases: {} };
  return {};
}

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = typeof input === "string" ? input : input.toString();
      return new Response(JSON.stringify(payload(url)), { status: 200 });
    })
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

async function openExpertBuilder() {
  render(<CombosPage />);
  const create = await screen.findAllByRole("button", { name: /create combo/i });
  await act(async () => {
    fireEvent.click(create[0]);
  });
  const dialog = await screen.findByRole("dialog");
  // Expert mode arrives with /api/settings; the manual entry only exists in that mode.
  await within(dialog).findByTestId("combo-manual-model-input");
  // The picker options arrive with /api/combos/builder/options. Inspect the real
  // searchable popover rather than native <option> elements under its trigger.
  const search = await openProviderPicker(dialog);
  await screen.findByRole("option", { name: /OpenRouter/ });
  fireEvent.keyDown(search, { key: "Escape" });
  await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());
  return dialog;
}

async function openProviderPicker(dialog: HTMLElement) {
  fireEvent.click(within(dialog).getByTestId("combo-builder-provider"));
  return screen.findByRole("combobox", { name: "Search", exact: true });
}

async function addManualModel(dialog: HTMLElement, value: string) {
  await act(async () => {
    fireEvent.change(within(dialog).getByTestId("combo-manual-model-input"), {
      target: { value },
    });
  });
  await act(async () => {
    fireEvent.click(within(dialog).getByTestId("combo-manual-model-add"));
  });
}

// The 5k-line combos page takes a while to mount cold in jsdom; the first test pays for it.
describe("expert-mode manual model entry", { timeout: 90_000 }, () => {
  it("adds a model for a configured provider whose catalog is empty", async () => {
    const dialog = await openExpertBuilder();
    await act(async () => {
      fireEvent.change(within(dialog).getByTestId("combo-name-input"), {
        target: { value: "expert-stack" },
      });
    });
    // No step yet: the readiness panel reports the missing model.
    expect(within(dialog).getByTestId("combo-readiness-panel")).toBeInTheDocument();

    await addManualModel(dialog, "cx/gpt-5.5");

    expect(within(dialog).queryByText(/unknown provider prefix/i)).not.toBeInTheDocument();
    // Accepted: the input is cleared and, with a name and one step, nothing blocks the save.
    expect(within(dialog).getByTestId("combo-manual-model-input")).toHaveValue("");
    await waitFor(() =>
      expect(within(dialog).queryByTestId("combo-readiness-panel")).not.toBeInTheDocument()
    );
  });

  it("keeps the picker limited to providers that have a catalog model", async () => {
    const dialog = await openExpertBuilder();
    await openProviderPicker(dialog);
    const picker = within(screen.getByRole("listbox"));
    expect(picker.getByRole("option", { name: /OpenRouter/ })).toHaveAttribute(
      "data-value",
      "openrouter"
    );
    expect(picker.queryByRole("option", { name: /Codex/ })).not.toBeInTheDocument();
  });

  it("still refuses a prefix that matches no configured provider", async () => {
    const dialog = await openExpertBuilder();
    await addManualModel(dialog, "nope/gpt-5.5");
    expect(await within(dialog).findByText(/unknown provider prefix/i)).toBeInTheDocument();
    expect(within(dialog).getByTestId("combo-manual-model-input")).toHaveValue("nope/gpt-5.5");
  });
});
