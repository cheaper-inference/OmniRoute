import React from "react";
import "@testing-library/jest-dom/vitest";
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import CombosPage from "@/app/(dashboard)/dashboard/combos/page";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn(), prefetch: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/dashboard/combos",
}));

const providers = [
  {
    providerId: "openai",
    displayName: "OpenAI",
    alias: "oa",
    prefix: "route-openai",
    connectionCount: 3,
    models: [
      {
        id: "model-4.1-mini",
        name: "کارت‌یار",
        qualifiedModel: "oa/model-4.1-mini",
        source: "custom",
      },
    ],
    connections: [
      { id: "account-one", label: "secret.person@example.test", status: "active" },
      { id: "account-two", label: "Second account", status: "active" },
      { id: "account-three", label: "Second account", status: "active" },
    ],
  },
  {
    providerId: "other",
    displayName: "Other provider",
    alias: "else",
    connectionCount: 0,
    models: [
      {
        id: "other-model",
        name: "Other model",
        qualifiedModel: "other/other-model",
        source: "custom",
      },
    ],
    connections: [],
  },
];

beforeAll(() => {
  HTMLElement.prototype.scrollIntoView ??= () => {};
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  useEmailPrivacyStore.setState({ emailsVisible: false });
});

async function openCreate(mode = "expert", catalog = providers) {
  const writes: Record<string, unknown>[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (init?.method === "POST" || init?.method === "PUT") {
        const payload = JSON.parse(String(init.body)) as Record<string, unknown>;
        writes.push(payload);
        return Response.json({ id: "saved-combo", isActive: true, ...payload });
      }
      if (url.includes("/builder/options")) {
        return Response.json({
          providers: catalog,
          comboRefs: [
            { id: "internal-ref-id", name: "Fallback-Chain", strategy: "priority", stepCount: 2 },
            { id: "self", name: "search-test", strategy: "priority", stepCount: 1 },
          ],
        });
      }
      if (url === "/api/combos") return Response.json({ combos: [] });
      if (url === "/api/settings") return Response.json({ comboConfigMode: mode });
      return Response.json({});
    })
  );
  render(<CombosPage />);
  const create = await screen.findAllByRole("button", { name: /create combo/i });
  fireEvent.click(create[0]);
  const dialog = await screen.findByRole("dialog");
  fireEvent.change(within(dialog).getByTestId("combo-name-input"), {
    target: { value: "search-test" },
  });
  if (mode === "guided") fireEvent.click(within(dialog).getByTestId("combo-builder-next"));
  return { dialog, writes };
}

function pickerTrigger(dialog: HTMLElement, field: string) {
  return within(within(dialog).getByTestId(`combo-builder-${field}`)).getByRole("button");
}

async function searchPicker(dialog: HTMLElement, field: string, query: string) {
  const trigger = pickerTrigger(dialog, field);
  await waitFor(() => expect(trigger).toBeEnabled());
  fireEvent.click(trigger);
  const input = await screen.findByRole("combobox", { name: "Search", exact: true });
  fireEvent.change(input, { target: { value: query } });
  return input;
}

function pickerOptions() {
  return within(screen.getByRole("listbox"));
}

async function choose(dialog: HTMLElement, field: string, query: string, option: string | RegExp) {
  await searchPicker(dialog, field, query);
  fireEvent.click(pickerOptions().getByRole("option", { name: option }));
  expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
}

async function selectModel(dialog: HTMLElement) {
  await choose(dialog, "provider", "OA route-openai", /OpenAI/);
  await choose(dialog, "model", "كارت يار CUSTOM", /model-4\.1-mini/);
}

function addStep(dialog: HTMLElement) {
  fireEvent.click(within(dialog).getByTestId("combo-builder-add-step"));
}

async function saveCombo(dialog: HTMLElement, writes: Record<string, unknown>[]) {
  fireEvent.click(within(dialog).getByRole("button", { name: "Create Combo", exact: true }));
  await waitFor(() => expect(writes).toHaveLength(1));
}

// Mount the full page and let slow shared runners finish the React render.
describe("Combo editor searchable selectors", { timeout: 90_000 }, () => {
  it("filters providers by alias and prefix and keeps the clear option visible", async () => {
    const { dialog, writes } = await openCreate();
    await searchPicker(dialog, "provider", "OA route-openai");
    expect(pickerOptions().getByRole("option", { name: /OpenAI/ })).toBeInTheDocument();
    expect(pickerOptions().getByRole("option", { name: "Select provider" })).toBeInTheDocument();
    expect(
      pickerOptions().queryByRole("option", { name: /Other provider/ })
    ).not.toBeInTheDocument();
    expect(pickerTrigger(dialog, "provider")).toHaveTextContent("Select provider");
    expect(writes).toHaveLength(0);
  });

  it.each(["expert", "guided"])(
    "keeps the current picks when typing, clearing, closing and cancelling in %s mode",
    async (mode) => {
      const { dialog, writes } = await openCreate(mode);
      await selectModel(dialog);
      await choose(dialog, "account", "account-two", /Second account.*account-two/);

      const input = await searchPicker(dialog, "provider", "Other provider");
      expect(pickerTrigger(dialog, "provider")).toHaveTextContent("OpenAI");
      expect(pickerTrigger(dialog, "model")).toHaveTextContent("کارت‌یار");
      expect(pickerTrigger(dialog, "account")).toHaveTextContent("Second account");
      fireEvent.change(input, { target: { value: "" } });
      expect(pickerTrigger(dialog, "provider")).toHaveTextContent("OpenAI");
      fireEvent.keyDown(input, { key: "Escape" });
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      expect(within(dialog).getByTestId("combo-builder-add-step")).toBeEnabled();
      addStep(dialog);
      fireEvent.click(within(dialog).getByRole("button", { name: "Cancel", exact: true }));
      await waitFor(() => expect(dialog).not.toBeInTheDocument());
      expect(writes).toHaveLength(0);

      fireEvent.click(screen.getAllByRole("button", { name: /create combo/i })[0]);
      const reopened = await screen.findByRole("dialog");
      if (mode === "guided") {
        fireEvent.change(within(reopened).getByTestId("combo-name-input"), {
          target: { value: "search-test" },
        });
        fireEvent.click(within(reopened).getByTestId("combo-builder-next"));
      }
      const trigger = pickerTrigger(reopened, "provider");
      await waitFor(() => expect(trigger).toBeEnabled());
      expect(trigger).toHaveTextContent("Select provider");
      fireEvent.click(trigger);
      expect(await screen.findByRole("combobox", { name: "Search", exact: true })).toHaveValue("");
    }
  );

  it("reselects current provider and model without clearing an explicit account pin", async () => {
    const { dialog, writes } = await openCreate();
    await selectModel(dialog);
    await choose(dialog, "account", "account-three", /account-three/);
    await choose(dialog, "provider", "openai", /OpenAI/);
    await choose(dialog, "model", "model-4.1-mini", /model-4\.1-mini/);
    await choose(dialog, "account", "account-three", /account-three/);
    addStep(dialog);
    await saveCombo(dialog, writes);
    expect(writes[0].models).toMatchObject([
      {
        providerId: "openai",
        model: "oa/model-4.1-mini",
        connectionId: "account-three",
      },
    ]);
  });

  it("saves distinct same-label accounts by ID and a reference by its exact name", async () => {
    const { dialog, writes } = await openCreate();
    await selectModel(dialog);
    for (const id of ["account-two", "account-three"]) {
      await choose(dialog, "account", id, new RegExp(`Second account.*${id}`));
      addStep(dialog);
    }
    await choose(dialog, "account", "account-two", /account-two/);
    expect(within(dialog).getByTestId("combo-builder-add-step")).toBeDisabled();
    const query = await searchPicker(dialog, "reference", "search-test");
    expect(pickerOptions().queryByRole("option", { name: /search-test/ })).not.toBeInTheDocument();
    fireEvent.change(query, { target: { value: "priority FALLBACK" } });
    fireEvent.click(pickerOptions().getByRole("option", { name: /Fallback-Chain.*priority/ }));
    fireEvent.click(within(dialog).getByRole("button", { name: /add combo reference/i }));
    await saveCombo(dialog, writes);
    expect(writes[0].models).toMatchObject([
      { providerId: "openai", model: "oa/model-4.1-mini", connectionId: "account-two" },
      { providerId: "openai", model: "oa/model-4.1-mini", connectionId: "account-three" },
      { kind: "combo-ref", comboName: "Fallback-Chain" },
    ]);
    expect(JSON.stringify(writes[0])).not.toContain("internal-ref-id");
  });

  it("keeps Auto visible and saves restrictions hidden by the filter", async () => {
    const { dialog, writes } = await openCreate();
    await selectModel(dialog);
    await choose(dialog, "account", "account-one", /account-one/);
    await choose(dialog, "account", "unmatched", /automatically select account/i);
    const query = within(dialog).getByRole("textbox", { name: /Search.*Restrict to accounts/i });
    const restrictions = within(within(dialog).getByTestId("combo-builder-allowlist"));
    fireEvent.change(query, { target: { value: "account-two" } });
    fireEvent.click(restrictions.getByRole("button", { name: /account-two/ }));
    fireEvent.change(query, { target: { value: "account-three" } });
    expect(restrictions.queryByRole("button", { name: /account-two/ })).not.toBeInTheDocument();
    expect(within(dialog).getByText("1 selected")).toBeInTheDocument();
    fireEvent.click(restrictions.getByRole("button", { name: /account-three/ }));
    await choose(dialog, "provider", "openai", /OpenAI/);
    await choose(dialog, "model", "model-4.1-mini", /model-4\.1-mini/);
    expect(query).toHaveValue("account-three");
    expect(within(dialog).getByText("2 selected")).toBeInTheDocument();
    addStep(dialog);
    await saveCombo(dialog, writes);
    expect(writes[0].models).toMatchObject([
      { model: "oa/model-4.1-mini", allowedConnectionIds: ["account-two", "account-three"] },
    ]);
    expect(JSON.stringify(writes[0])).not.toContain("connectionId");
  });

  it("clears the account and restriction queries when email visibility changes", async () => {
    const { dialog, writes } = await openCreate();
    await selectModel(dialog);
    const hiddenQuery = await searchPicker(dialog, "account", "secret.person");
    expect(pickerOptions().queryByRole("option", { name: /account-one/ })).not.toBeInTheDocument();
    fireEvent.keyDown(hiddenQuery, { key: "Escape" });
    act(() => useEmailPrivacyStore.setState({ emailsVisible: true }));
    const restrictions = within(dialog).getByRole("textbox", {
      name: /Search.*Restrict to accounts/i,
    });
    fireEvent.change(restrictions, { target: { value: "secret.person" } });
    await searchPicker(dialog, "account", "secret.person");
    expect(
      pickerOptions().getByRole("option", { name: /secret.person@example.test/ })
    ).toBeInTheDocument();
    act(() => useEmailPrivacyStore.setState({ emailsVisible: false }));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(
      within(dialog).getByRole("textbox", { name: /Search.*Restrict to accounts/i })
    ).toHaveValue("");
    fireEvent.click(pickerTrigger(dialog, "account"));
    expect(await screen.findByRole("combobox", { name: "Search", exact: true })).toHaveValue("");
    expect(pickerOptions().getByRole("option", { name: /account-one/ })).not.toHaveTextContent(
      "secret.person@example.test"
    );
    expect(writes).toHaveLength(0);
  });

  it("keeps Combo Ref unavailable for Jev", async () => {
    const { dialog } = await openCreate();
    expect(pickerTrigger(dialog, "reference")).toBeVisible();
    fireEvent.click(within(dialog).getByRole("radio", { name: /Jev/i }));
    expect(within(dialog).queryByTestId("combo-builder-reference")).not.toBeInTheDocument();
    expect(pickerTrigger(dialog, "provider")).toBeVisible();
  });

  it("opens 5,000 models, filters the catalog and selects the last exact model", async () => {
    const models = Array.from({ length: 5_000 }, (_, i) => ({
      id: `Exact-Model-${i}`,
      name: `Model ${i}`,
      qualifiedModel: `oa/Exact-Model-${i}`,
      source: "custom",
    }));
    const { dialog, writes } = await openCreate("expert", [{ ...providers[0], models }]);
    await choose(dialog, "provider", "openai", /OpenAI/);
    const trigger = pickerTrigger(dialog, "model");
    const opening = performance.now();
    fireEvent.click(trigger);
    const query = await screen.findByRole("combobox", { name: "Search", exact: true });
    const openMs = performance.now() - opening;
    expect(screen.getByRole("listbox").querySelectorAll('[role="option"]')).toHaveLength(5_001);

    const filtering = performance.now();
    fireEvent.change(query, { target: { value: "custom Exact-Model-4999" } });
    const filterMs = performance.now() - filtering;
    expect(pickerOptions().getAllByRole("option")).toHaveLength(2);
    const last = pickerOptions().getByRole("option", { name: /Exact-Model-4999/ });
    const selecting = performance.now();
    fireEvent.click(last);
    const selectMs = performance.now() - selecting;
    console.info(
      `5,000 combo models (jsdom): open ${openMs.toFixed(1)} ms, filter ${filterMs.toFixed(1)} ms, select ${selectMs.toFixed(1)} ms`
    );
    expect(trigger).toHaveTextContent("Model 4999");
    addStep(dialog);
    await saveCombo(dialog, writes);
    expect(writes[0].models).toMatchObject([{ model: "oa/Exact-Model-4999" }]);
  }, 90_000);
});
