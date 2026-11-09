// @vitest-environment jsdom
import React, { act } from "react";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, describe, expect, it, vi } from "vitest";
import messages from "@/i18n/messages/en.json";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import { COMBO_BUILDER_AUTO_CONNECTION } from "@/lib/combos/builderDraft";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));
vi.mock("next/dynamic", () => ({ default: () => () => null }));

const { default: CombosPage } = await import("@/app/(dashboard)/dashboard/combos/page");

// jsdom does not implement scrolling; production pagination is still exercised.
HTMLElement.prototype.scrollIntoView ??= () => {};

const providers = [
  {
    providerId: "openai",
    displayName: "OpenAI",
    alias: "oa",
    connectionCount: 3,
    models: [
      {
        id: "model-4.1-mini",
        name: "Mini Display",
        qualifiedModel: "oa/model-4.1-mini",
        source: "custom",
      },
    ],
    connections: [
      { id: "account-one", label: "secret.person@example.test", status: "active", isActive: true },
      { id: "account-two", label: "Second account", status: "active", isActive: true },
      { id: "account-three", label: "Second account", status: "active", isActive: true },
    ],
  },
  {
    providerId: "other",
    displayName: "Other provider",
    alias: "else",
    connectionCount: 0,
    models: [],
    connections: [],
  },
];

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  localStorage.clear();
  useEmailPrivacyStore.setState({ emailsVisible: false });
});

async function openCreate(mode = "expert") {
  const saved: Record<string, unknown>[] = [];
  const writes: { method: string; payload: Record<string, unknown> }[] = [];
  const fetchMock = vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input);
    if (init?.method === "POST" || init?.method === "PUT") {
      const payload = JSON.parse(String(init.body)) as Record<string, unknown>;
      writes.push({ method: init.method, payload });
      saved[0] = { id: "saved-combo", isActive: true, ...payload };
      return new Response(JSON.stringify(saved[0]), { status: 200 });
    }
    const data = url.includes("/builder/options")
      ? {
          providers,
          comboRefs: [
            {
              id: "internal-id-never-saved",
              name: "fallback-chain",
              strategy: "priority",
              stepCount: 2,
            },
            { id: "self", name: "search-test", strategy: "priority", stepCount: 1 },
          ],
        }
      : url === "/api/combos"
        ? { combos: saved }
        : url === "/api/providers"
          ? { connections: [] }
          : url === "/api/settings"
            ? { comboConfigMode: mode }
            : url.includes("combo-defaults")
              ? { comboDefaults: {} }
              : url.includes("metrics")
                ? { metrics: {} }
                : url.includes("provider-nodes")
                  ? { nodes: [] }
                  : url.includes("/alias")
                    ? { aliases: {} }
                    : {};
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  });
  vi.stubGlobal("fetch", fetchMock);
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <CombosPage />
    </NextIntlClientProvider>
  );
  const buttons = await screen.findAllByRole("button", { name: /create combo/i });
  fireEvent.click(buttons[0]);
  const dialog = await screen.findByRole("dialog");
  fireEvent.change(within(dialog).getByTestId("combo-name-input"), {
    target: { value: "search-test" },
  });
  if (mode === "guided") fireEvent.click(within(dialog).getByTestId("combo-builder-next"));
  await waitFor(() => expect(within(dialog).getByTestId("combo-builder-provider")).toBeTruthy());
  return { dialog, fetchMock, writes, saved };
}

async function searchPicker(dialog: HTMLElement, field: string, query: string) {
  const trigger = within(dialog).getByTestId(`combo-builder-${field}`);
  act(() => trigger.focus());
  fireEvent.click(trigger);
  const input = await screen.findByRole("combobox", { name: "Search", exact: true });
  fireEvent.change(input, { target: { value: query } });
  return input;
}

async function choose(dialog: HTMLElement, field: string, value: string) {
  await searchPicker(dialog, field, value);
  const option = screen
    .getAllByRole("option")
    .find((row) => row.getAttribute("data-value") === value);
  expect(option, `Exact option ${value}`).toBeDefined();
  fireEvent.click(option!);
  await waitFor(() =>
    expect(screen.queryByRole("combobox", { name: "Search", exact: true })).toBeNull()
  );
}

async function selectModel(dialog: HTMLElement) {
  await choose(dialog, "provider", "openai");
  await choose(dialog, "model", "model-4.1-mini");
}

function pressEscape(input: HTMLElement) {
  fireEvent.keyDown(input, { key: "Escape" });
}

function saveButton(dialog: HTMLElement) {
  return within(dialog).getByRole("button", { name: "Create Combo", exact: true });
}

describe("Combo form searchable selectors", () => {
  it("opens a visible provider query and filters real selectable results", async () => {
    const { dialog } = await openCreate();
    fireEvent.click(within(dialog).getByTestId("combo-builder-provider"));
    const search = await screen.findByRole("combobox", { name: "Search" });
    fireEvent.change(search, { target: { value: "oa" } });
    expect(screen.getByRole("option", { name: /OpenAI/ })).toBeTruthy();
    expect(screen.queryByRole("option", { name: /Other provider/ })).toBeNull();
  });

  it.each(["expert", "guided"])("query is not a committed transition in %s mode", async (mode) => {
    const { dialog, fetchMock, writes } = await openCreate(mode);
    await selectModel(dialog);
    await choose(dialog, "account", "account-two");
    const before = fetchMock.mock.calls.length;
    const query = await searchPicker(dialog, "provider", "other");
    expect(within(dialog).getByTestId("combo-builder-model").getAttribute("data-value")).toBe(
      "model-4.1-mini"
    );
    expect(within(dialog).getByTestId("combo-builder-account").getAttribute("data-value")).toBe(
      "account-two"
    );
    pressEscape(query);
    expect(screen.getByRole("dialog")).toBe(dialog);
    expect(fetchMock).toHaveBeenCalledTimes(before);
    expect(writes).toEqual([]);
    await choose(dialog, "provider", "other");
    expect(within(dialog).getByTestId("combo-builder-model").getAttribute("data-value")).toBe("");
    expect(within(dialog).getByTestId("combo-builder-account").getAttribute("data-value")).toBe(
      COMBO_BUILDER_AUTO_CONNECTION
    );
  });

  it("reselects current provider and model without resetting pins or restrictions", async () => {
    const { dialog, fetchMock, writes } = await openCreate();
    await selectModel(dialog);
    await choose(dialog, "account", "account-two");
    const before = fetchMock.mock.calls.length;
    const providerSearch = await searchPicker(dialog, "provider", "");
    fireEvent.keyDown(providerSearch, { key: "Enter" });
    await waitFor(() => expect(screen.queryByRole("combobox", { name: "Search" })).toBeNull());
    await choose(dialog, "model", "model-4.1-mini");
    expect(within(dialog).getByTestId("combo-builder-model").getAttribute("data-value")).toBe(
      "model-4.1-mini"
    );
    expect(within(dialog).getByTestId("combo-builder-account").getAttribute("data-value")).toBe(
      "account-two"
    );

    await choose(dialog, "account", COMBO_BUILDER_AUTO_CONNECTION);
    const query = within(dialog).getByLabelText(/Search.*Restrict/i);
    fireEvent.change(query, { target: { value: "account-two" } });
    fireEvent.click(
      within(within(dialog).getByTestId("combo-builder-allowlist")).getByRole("button")
    );
    await choose(dialog, "provider", "openai");
    await choose(dialog, "model", "model-4.1-mini");
    expect(within(dialog).getByTestId("combo-builder-account").getAttribute("data-value")).toBe(
      COMBO_BUILDER_AUTO_CONNECTION
    );
    expect(within(dialog).getByText("1 selected")).toBeTruthy();
    expect(
      within(within(dialog).getByTestId("combo-builder-allowlist"))
        .getByRole("button")
        .getAttribute("aria-pressed")
    ).toBe("true");
    expect(fetchMock).toHaveBeenCalledTimes(before);
    expect(writes).toEqual([]);
  });

  it("saves two same-label pinned accounts and a name-based reference, then reopens unchanged", async () => {
    const { dialog, writes, saved } = await openCreate();
    await selectModel(dialog);
    for (const id of ["account-two", "account-three"]) {
      await choose(dialog, "account", id);
      fireEvent.click(within(dialog).getByTestId("combo-builder-add-step"));
    }
    await choose(dialog, "account", "account-two");
    expect(
      (within(dialog).getByTestId("combo-builder-add-step") as HTMLButtonElement).disabled
    ).toBe(true);
    const query = await searchPicker(dialog, "reference", "search-test");
    expect(screen.queryByRole("option", { name: /search-test/ })).toBeNull();
    pressEscape(query);
    await choose(dialog, "reference", "fallback-chain");
    fireEvent.click(within(dialog).getByRole("button", { name: /add combo ref/i }));
    fireEvent.click(saveButton(dialog));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(writes).toHaveLength(1);
    expect(writes[0].payload).toMatchObject({
      name: "search-test",
      strategy: "priority",
      models: [
        {
          kind: "model",
          providerId: "openai",
          model: "oa/model-4.1-mini",
          connectionId: "account-two",
          weight: 0,
        },
        {
          kind: "model",
          providerId: "openai",
          model: "oa/model-4.1-mini",
          connectionId: "account-three",
          weight: 0,
        },
        { kind: "combo-ref", comboName: "fallback-chain", weight: 0 },
      ],
    });
    expect(JSON.stringify(writes[0])).not.toContain("internal-id-never-saved");
    fireEvent.click(screen.getByRole("button", { name: "Edit", exact: true }));
    const edit = await screen.findByRole("dialog");
    await waitFor(() => expect(within(edit).getByTestId("combo-builder-provider")).toBeTruthy());
    const search = await searchPicker(edit, "provider", "other");
    pressEscape(search);
    fireEvent.click(within(edit).getByRole("button", { name: "Save", exact: true }));
    await waitFor(() => expect(writes).toHaveLength(2));
    // Existing normalizeModelEntry adds the reference display alias on edit.
    const original = writes[0].payload.models as Record<string, unknown>[];
    const reopened = [original[0], original[1], { ...original[2], model: "fallback-chain" }];
    expect(writes[1].payload.models).toEqual(reopened);
    expect(saved[0].models).toEqual(reopened);
  });

  it("filters restrictions without dropping hidden selections or serializing Auto", async () => {
    const { dialog, writes } = await openCreate();
    await selectModel(dialog);
    await choose(dialog, "account", COMBO_BUILDER_AUTO_CONNECTION);
    const query = within(dialog).getByLabelText(/Search.*Restrict/i);
    fireEvent.change(query, { target: { value: "account-two" } });
    fireEvent.click(
      within(within(dialog).getByTestId("combo-builder-allowlist")).getByRole("button")
    );
    fireEvent.change(query, { target: { value: "account-three" } });
    expect(within(dialog).getByText("1 selected")).toBeTruthy();
    fireEvent.click(
      within(within(dialog).getByTestId("combo-builder-allowlist")).getByRole("button")
    );
    expect(within(dialog).getByText("2 selected")).toBeTruthy();
    fireEvent.click(within(dialog).getByTestId("combo-builder-add-step"));
    fireEvent.click(saveButton(dialog));
    await waitFor(() => expect(writes).toHaveLength(1));
    const models = writes[0].payload.models as Record<string, unknown>[];
    expect(models[0]).toMatchObject({
      allowedConnectionIds: ["account-two", "account-three"],
      model: "oa/model-4.1-mini",
    });
    expect(models[0]).not.toHaveProperty("connectionId");
    expect(JSON.stringify(writes[0])).not.toContain(COMBO_BUILDER_AUTO_CONNECTION);
  });

  it("never indexes hidden email and clears sensitive query when visibility changes", async () => {
    const { dialog, writes } = await openCreate();
    await selectModel(dialog);
    let query = await searchPicker(dialog, "account", "secret.person");
    expect(screen.queryByRole("option", { name: /account-one/ })).toBeNull();
    expect(dialog.innerHTML).not.toContain("secret.person@example.test");
    act(() => useEmailPrivacyStore.setState({ emailsVisible: true }));
    expect((query as HTMLInputElement).value).toBe("");
    fireEvent.change(query, { target: { value: "secret.person" } });
    expect(screen.getByRole("option", { name: /secret.person@example.test/ })).toBeTruthy();
    act(() => useEmailPrivacyStore.setState({ emailsVisible: false }));
    query = screen.getByRole("combobox", { name: "Search", exact: true });
    expect((query as HTMLInputElement).value).toBe("");
    expect(dialog.innerHTML).not.toContain("secret.person");
    expect(writes).toEqual([]);
  });

  it("cancel and reopen discard queries without creating a combo", async () => {
    const { dialog, writes } = await openCreate();
    pressEscape(await searchPicker(dialog, "provider", "other"));
    fireEvent.click(within(dialog).getByRole("button", { name: "Cancel", exact: true }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    fireEvent.click(screen.getAllByRole("button", { name: /create combo/i })[0]);
    const reopened = await screen.findByRole("dialog");
    fireEvent.click(within(reopened).getByTestId("combo-builder-provider"));
    expect(
      ((await screen.findByRole("combobox", { name: "Search", exact: true })) as HTMLInputElement)
        .value
    ).toBe("");
    expect(writes).toEqual([]);
  });
});
