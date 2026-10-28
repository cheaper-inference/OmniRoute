// @vitest-environment jsdom
import React from "react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";

const notify = vi.hoisted(() => ({ error: vi.fn(), success: vi.fn() }));
vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));
vi.mock("@/store/notificationStore", () => ({ useNotificationStore: () => notify }));
vi.mock("@/shared/components", () => ({
  Button: ({
    children,
    icon: _icon,
    size: _size,
    variant: _variant,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon?: string;
    size?: string;
    variant?: string;
  }) => <button {...props}>{children}</button>,
  Input: ({
    label,
    inputClassName: _class,
    ...props
  }: React.InputHTMLAttributes<HTMLInputElement> & { label?: string; inputClassName?: string }) => (
    <label>
      {label}
      <input {...props} />
    </label>
  ),
  Select: ({
    label,
    selectClassName: _class,
    children,
    ...props
  }: React.SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string;
    selectClassName?: string;
  }) => (
    <label>
      {label}
      <select {...props}>{children}</select>
    </label>
  ),
  Checkbox: ({
    label,
    ...props
  }: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) => (
    <label>
      <input type="checkbox" {...props} />
      {label}
    </label>
  ),
  CapabilityBadge: ({
    children,
    icon: _icon,
    ...props
  }: React.HTMLAttributes<HTMLSpanElement> & { icon?: string }) => (
    <span {...props}>{children}</span>
  ),
}));
vi.mock(
  "../../../src/app/(dashboard)/dashboard/providers/[id]/components/ModelCompatPopover",
  () => ({ default: () => null })
);

const { default: ModelEndpointTagsEditor } =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/ModelEndpointTagsEditor");
const { default: CustomModelsSection } =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/CustomModelsSection");
const t = (key: string) => key;

beforeEach(() => {
  notify.error.mockClear();
  notify.success.mockClear();
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it("offers an explicit native decision endpoint and saves only the management PUT", async () => {
  const fetchMock = vi.fn().mockResolvedValue({ ok: true });
  vi.stubGlobal("fetch", fetchMock);
  const changed = vi.fn();
  render(
    <ModelEndpointTagsEditor
      provider="typesafe"
      modelId="jev-fixture"
      supportedEndpoints={["systemone"]}
      t={t}
      onChanged={changed}
    />
  );
  fireEvent.click(screen.getByRole("button", { name: "endpointCapabilitiesEdit" }));
  expect((screen.getByRole("checkbox", { name: "systemone" }) as HTMLInputElement).checked).toBe(
    true
  );
  fireEvent.click(screen.getByRole("button", { name: "endpointCapabilitiesSave" }));
  await waitFor(() => expect(changed).toHaveBeenCalledOnce());
  expect(fetchMock).toHaveBeenCalledOnce();
  expect(fetchMock.mock.calls[0][0]).toBe("/api/provider-models");
  expect(JSON.parse(fetchMock.mock.calls[0][1].body).supportedEndpoints).toEqual(["systemone"]);
});

it("shows unknown capability without manufacturing a chat declaration", () => {
  const fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
  render(<ModelEndpointTagsEditor provider="typesafe" modelId="unknown" t={t} />);
  expect(screen.getByText("endpointCapabilitiesUnknown")).toBeTruthy();
  fireEvent.click(screen.getByRole("button", { name: "endpointCapabilitiesEdit" }));
  expect((screen.getByRole("checkbox", { name: "chat" }) as HTMLInputElement).checked).toBe(false);
  fireEvent.click(screen.getByRole("button", { name: "endpointCapabilitiesSave" }));
  expect(screen.getByRole("alert").textContent).toContain("selectSupportedEndpoint");
  expect(fetchMock).not.toHaveBeenCalled();
});

it("cancelling native endpoint edits makes no network request", () => {
  const fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
  render(
    <ModelEndpointTagsEditor
      provider="typesafe"
      modelId="jev-fixture"
      supportedEndpoints={["systemone"]}
      t={t}
    />
  );
  fireEvent.click(screen.getByRole("button", { name: "endpointCapabilitiesEdit" }));
  fireEvent.click(screen.getByRole("checkbox", { name: "systemone" }));
  fireEvent.click(screen.getByRole("button", { name: "cancel" }));
  fireEvent.click(screen.getByRole("button", { name: "endpointCapabilitiesEdit" }));
  expect((screen.getByRole("checkbox", { name: "systemone" }) as HTMLInputElement).checked).toBe(
    true
  );
  expect(fetchMock).not.toHaveBeenCalled();
});

it("ignores completion of an endpoint save after its provider/model is replaced", async () => {
  let finish!: () => void;
  const changed = vi.fn();
  vi.stubGlobal(
    "fetch",
    vi.fn(
      () =>
        new Promise<{ ok: boolean }>((resolve) => {
          finish = () => resolve({ ok: true });
        })
    )
  );
  const { rerender } = render(
    <ModelEndpointTagsEditor
      provider="typesafe"
      modelId="old"
      supportedEndpoints={["systemone"]}
      t={t}
      onChanged={changed}
    />
  );
  fireEvent.click(screen.getByRole("button", { name: "endpointCapabilitiesEdit" }));
  fireEvent.click(screen.getByRole("button", { name: "endpointCapabilitiesSave" }));
  rerender(
    <ModelEndpointTagsEditor
      provider="openrouter"
      modelId="new"
      supportedEndpoints={["systemone"]}
      t={t}
      onChanged={changed}
    />
  );
  await act(async () => finish());
  expect(changed).not.toHaveBeenCalled();
  expect(screen.queryByRole("button", { name: "endpointCapabilitiesSave" })).toBeNull();
});

it("repeated endpoint saves issue one management write until the first finishes", async () => {
  let finish!: () => void;
  const fetchMock = vi.fn(
    () =>
      new Promise<{ ok: boolean }>((resolve) => {
        finish = () => resolve({ ok: true });
      })
  );
  vi.stubGlobal("fetch", fetchMock);
  render(
    <ModelEndpointTagsEditor
      provider="typesafe"
      modelId="jev-fixture"
      supportedEndpoints={["systemone"]}
      t={t}
    />
  );
  fireEvent.click(screen.getByRole("button", { name: "endpointCapabilitiesEdit" }));
  const save = screen.getByRole("button", { name: "endpointCapabilitiesSave" });
  fireEvent.click(save);
  fireEvent.click(save);
  expect(fetchMock).toHaveBeenCalledOnce();
  await act(async () => finish());
});

it("provider-model write errors never expose exception content", async () => {
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("synthetic-private-credential")));
  render(
    <ModelEndpointTagsEditor
      provider="typesafe"
      modelId="jev-fixture"
      supportedEndpoints={["systemone"]}
      t={t}
    />
  );
  fireEvent.click(screen.getByRole("button", { name: "endpointCapabilitiesEdit" }));
  fireEvent.click(screen.getByRole("button", { name: "endpointCapabilitiesSave" }));
  expect((await screen.findByRole("alert")).textContent).toBe("endpointCapabilitiesSaveFailed");
  expect(document.body.textContent).not.toContain("synthetic-private-credential");
});

it("a successful write with failed reload is reported as saved but unrefreshed", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
  render(
    <ModelEndpointTagsEditor
      provider="typesafe"
      modelId="jev-fixture"
      supportedEndpoints={["systemone"]}
      t={t}
      onChanged={() => Promise.reject(new Error("synthetic-private-content"))}
    />
  );
  fireEvent.click(screen.getByRole("button", { name: "endpointCapabilitiesEdit" }));
  fireEvent.click(screen.getByRole("button", { name: "endpointCapabilitiesSave" }));
  expect((await screen.findByRole("alert")).textContent).toBe("endpointCapabilitiesRefreshFailed");
  expect(document.body.textContent).not.toContain("synthetic-private-content");
});

type ModelRow = {
  id: string;
  apiFormat?: string;
  supportedEndpoints?: string[];
  modelType?: string;
};
function managedFixture(initial: ModelRow[] = []) {
  let rows = initial;
  const writes: Record<string, unknown>[] = [];
  const fetchMock = vi.fn(async (_url: unknown, init?: RequestInit) => {
    if (init?.method === "POST" || init?.method === "PUT") {
      const body = JSON.parse(String(init.body));
      writes.push(body);
      rows = [{ ...rows.find((row) => row.id === body.modelId), ...body, id: body.modelId }];
      return Response.json({ ok: true });
    }
    return Response.json({ models: rows, modelCompatOverrides: [] });
  });
  vi.stubGlobal("fetch", fetchMock);
  return { writes, fetchMock };
}

it("native custom-model creation saves a decision type and reloads without chat or inference", async () => {
  const fixture = managedFixture();
  const props = { providerId: "typesafe", providerAlias: "typesafe", onCopy: vi.fn() };
  const { unmount } = render(<CustomModelsSection {...props} />);
  await screen.findByText("noCustomModels");
  fireEvent.change(screen.getByLabelText("modelId"), { target: { value: "jev-fixture" } });
  const format = document.getElementById("custom-api-format") as HTMLSelectElement;
  expect(within(format).getByRole("option", { name: "System One" })).toBeTruthy();
  fireEvent.change(format, { target: { value: "systemone" } });
  expect(
    (screen.getByRole("checkbox", { name: "supportedEndpointChat" }) as HTMLInputElement).disabled
  ).toBe(true);
  fireEvent.click(screen.getByRole("button", { name: "add" }));
  await waitFor(() => expect(fixture.writes).toHaveLength(1));
  expect(fixture.writes[0]).toMatchObject({
    apiFormat: "systemone",
    supportedEndpoints: ["systemone"],
    modelType: "decision",
  });
  await screen.findByText("Decision model");
  unmount();
  render(<CustomModelsSection {...props} />);
  await screen.findByText("Decision model");
  fireEvent.click(screen.getByRole("button", { name: "edit" }));
  const formats = screen.getAllByRole("combobox");
  expect(formats.some((select) => (select as HTMLSelectElement).value === "systemone")).toBe(true);
  expect(
    fixture.fetchMock.mock.calls.every(([url]) => String(url).startsWith("/api/provider-models"))
  ).toBe(true);
});

it("native format cannot be enabled on an unregistered execution adapter", async () => {
  const fixture = managedFixture();
  render(
    <CustomModelsSection
      providerId="openai-compatible-fixture"
      providerAlias="fixture"
      onCopy={vi.fn()}
    />
  );
  await screen.findByText("noCustomModels");
  const format = document.getElementById("custom-api-format") as HTMLSelectElement;
  const nativeOption = within(format).getByRole("option", {
    name: "System One",
  }) as HTMLOptionElement;
  expect(nativeOption.disabled).toBe(true);
  expect(fixture.writes).toHaveLength(0);
});

it("editing an unknown-capability custom row requires an explicit declaration before PUT", async () => {
  const fixture = managedFixture([{ id: "unknown-fixture" }]);
  render(<CustomModelsSection providerId="typesafe" providerAlias="typesafe" onCopy={vi.fn()} />);
  fireEvent.click(await screen.findByRole("button", { name: "edit" }));
  fireEvent.click(screen.getByRole("button", { name: "save" }));
  expect(fixture.writes).toHaveLength(0);
  expect(notify.error).toHaveBeenCalledWith("Select at least one supported endpoint");
});

it("changing an existing decision model back to chat explicitly clears its decision type", async () => {
  const fixture = managedFixture([
    {
      id: "mixed-fixture",
      apiFormat: "systemone",
      supportedEndpoints: ["systemone"],
      modelType: "decision",
    },
  ]);
  render(<CustomModelsSection providerId="typesafe" providerAlias="typesafe" onCopy={vi.fn()} />);
  fireEvent.click(await screen.findByRole("button", { name: "edit" }));
  const format = screen
    .getAllByRole("combobox")
    .find((node) => (node as HTMLSelectElement).value === "systemone")!;
  fireEvent.change(format, { target: { value: "chat-completions" } });
  fireEvent.click(screen.getByRole("button", { name: "save" }));
  await waitFor(() => expect(fixture.writes).toHaveLength(1));
  expect(fixture.writes[0]).toMatchObject({
    apiFormat: "chat-completions",
    supportedEndpoints: ["chat"],
    modelType: null,
  });
});

it("cancelling a native custom-model edit retains the saved type and endpoints", async () => {
  const fixture = managedFixture([
    {
      id: "jev-fixture",
      apiFormat: "systemone",
      supportedEndpoints: ["systemone"],
      modelType: "decision",
    },
  ]);
  render(<CustomModelsSection providerId="typesafe" providerAlias="typesafe" onCopy={vi.fn()} />);
  fireEvent.click(await screen.findByRole("button", { name: "edit" }));
  const nativeFormat = screen
    .getAllByRole("combobox")
    .find((node) => (node as HTMLSelectElement).value === "systemone")!;
  fireEvent.change(nativeFormat, { target: { value: "chat-completions" } });
  fireEvent.click(screen.getByRole("button", { name: "cancel" }));
  fireEvent.click(screen.getByRole("button", { name: "edit" }));
  expect(
    screen
      .getAllByRole("combobox")
      .some((node) => (node as HTMLSelectElement).value === "systemone")
  ).toBe(true);
  expect(fixture.writes).toHaveLength(0);
});

it("a previous provider's delayed load cannot replace the current model editor", async () => {
  let finish!: () => void;
  vi.stubGlobal(
    "fetch",
    vi.fn((url: string) => {
      if (url.endsWith("provider=typesafe"))
        return new Promise<Response>((resolve) => {
          finish = () => resolve(Response.json({ models: [{ id: "old-private-fixture" }] }));
        });
      return Promise.resolve(
        Response.json({
          models: [
            { id: "current-fixture", apiFormat: "systemone", supportedEndpoints: ["systemone"] },
          ],
        })
      );
    })
  );
  const { rerender } = render(
    <CustomModelsSection providerId="typesafe" providerAlias="typesafe" onCopy={vi.fn()} />
  );
  rerender(
    <CustomModelsSection providerId="openrouter" providerAlias="openrouter" onCopy={vi.fn()} />
  );
  await screen.findByText("current-fixture");
  await act(async () => finish());
  expect(screen.queryByText("old-private-fixture")).toBeNull();
  expect(screen.getByText("current-fixture")).toBeTruthy();
});

it("a pending native-model write locks cancel and competing row edits until settlement", async () => {
  let finish!: () => void;
  let puts = 0;
  const models = ["first", "second"].map((id) => ({
    id,
    apiFormat: "systemone",
    supportedEndpoints: ["systemone"],
    modelType: "decision",
  }));
  vi.stubGlobal(
    "fetch",
    vi.fn(async (_url, init?: RequestInit) => {
      if (init?.method === "PUT") {
        puts++;
        await new Promise<void>((resolve) => {
          finish = resolve;
        });
        return Response.json({ ok: true });
      }
      return Response.json({ models, modelCompatOverrides: [] });
    })
  );
  render(<CustomModelsSection providerId="typesafe" providerAlias="typesafe" onCopy={vi.fn()} />);
  const edits = await screen.findAllByRole("button", { name: "edit" });
  fireEvent.click(edits[0]);
  const save = screen.getByRole("button", { name: "save" });
  fireEvent.click(save);
  expect((screen.getByRole("button", { name: "cancel" }) as HTMLButtonElement).disabled).toBe(true);
  expect(edits.every((button) => (button as HTMLButtonElement).disabled)).toBe(true);
  fireEvent.click(save);
  expect(puts).toBe(1);
  await act(async () => finish());
  await waitFor(() => expect(screen.queryByRole("button", { name: "save" })).toBeNull());
});
