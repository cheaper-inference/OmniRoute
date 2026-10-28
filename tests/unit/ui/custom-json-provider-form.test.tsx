// @vitest-environment jsdom
//
// Custom JSON API provider nodes in the dashboard: the "Custom JSON" API type of the
// compatible-provider Add modal and the Edit modal. The form builds the same `customJson`
// config the API stores, validated client-side with the server's Zod schema, and the
// "Send test request" button goes through POST /api/provider-nodes/validate.
// The modal cases drive several kit (Radix) Selects, which is slow in jsdom under a busy
// worker pool, hence the 30 s per-test budget on those blocks.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { chooseKitSelectValue, kitSelectByLabel, kitSelectValue } from "../../helpers/kitSelect";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { default: AddCompatibleProviderModal } =
  await import("../../../src/app/(dashboard)/dashboard/providers/components/AddCompatibleProviderModal");
const { default: EditCompatibleNodeModal } =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/EditCompatibleNodeModal");
const form =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/customJsonForm");

const roots: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function mount(node: React.ReactElement) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => root.render(node));
  roots.push({ root, el });
  // The dialog is portaled to document.body (KEA-7886).
  return document.querySelector('[role="dialog"]') as HTMLElement;
}

function inputByLabel(scope: Element, label: string, index = 0): HTMLInputElement {
  const matches = Array.from(scope.querySelectorAll<HTMLInputElement>("input")).filter((i) => {
    const labelEl = i.previousElementSibling || i.parentElement?.previousElementSibling;
    return labelEl?.textContent === label;
  });
  if (!matches[index]) throw new Error(`No input for label: ${label}`);
  return matches[index];
}

function setValue(el: HTMLInputElement | HTMLTextAreaElement, value: string) {
  const proto =
    el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(proto, "value")!.set!;
  act(() => {
    setter.call(el, value);
    el.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

function setNativeSelect(el: HTMLSelectElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value")!.set!;
  act(() => {
    setter.call(el, value);
    el.dispatchEvent(new Event("change", { bubbles: true }));
  });
}

function button(scope: Element, text: string): HTMLButtonElement {
  const found = Array.from(scope.querySelectorAll<HTMLButtonElement>("button")).find(
    (b) => b.textContent === text || b.getAttribute("aria-label") === text
  );
  if (!found) throw new Error(`No button: ${text}`);
  return found;
}

function click(el: HTMLElement) {
  act(() => el.click());
}

function templateTextarea(scope: Element): HTMLTextAreaElement {
  const area = scope.querySelector<HTMLTextAreaElement>("textarea");
  if (!area) throw new Error("No template textarea");
  return area;
}

async function waitFor(fn: () => boolean, timeoutMs = 2000) {
  const start = Date.now();
  while (!fn()) {
    if (Date.now() - start > timeoutMs) throw new Error("waitFor timed out");
    await new Promise((r) => setTimeout(r, 20));
  }
}

type FetchMock = ReturnType<typeof vi.fn>;
const fetchCalls = () => (fetch as unknown as FetchMock).mock.calls;
const bodyOf = (i: number) => JSON.parse(String(fetchCalls()[i][1].body));

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  vi.stubGlobal(
    "fetch",
    vi.fn((url: string) =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve(
            String(url).includes("validate")
              ? { valid: true, method: "custom-json" }
              : { node: { id: "openai-compatible-custom-json-x" } }
          ),
      } as Response)
    )
  );
});

afterEach(() => {
  for (const { root, el } of roots.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
});

function openAddAsCustomJson(onCreated = vi.fn()) {
  const modal = mount(
    <AddCompatibleProviderModal isOpen mode="openai" onClose={() => {}} onCreated={onCreated} />
  );
  setValue(inputByLabel(modal, "nameLabel"), "Business API");
  setValue(inputByLabel(modal, "prefixLabel"), "biz");
  chooseKitSelectValue(kitSelectByLabel("apiTypeLabel", modal), "custom-json");
  return modal;
}

describe("customJsonForm helpers", () => {
  it("defaults to simple fields with model + messages and the OpenAI reply path", () => {
    const state = form.createCustomJsonForm();
    expect(state.templateMode).toBe("fields");
    expect(state.extraFields).toEqual([]);
    expect(form.parseCustomJsonForm(state).config).toEqual({
      method: "POST",
      authType: "bearer",
      authHeader: "X-API-Key",
      requestTemplate: { model: "{{model}}", messages: "{{messages}}" },
      responsePath: "choices[0].message.content",
    });
  });

  it("keeps typed JSON values, ignores an untouched row, and round-trips saved fields", () => {
    const state = {
      ...form.createCustomJsonForm(),
      extraFields: [
        form.newCustomJsonField("project_id", "text", "demo"),
        form.newCustomJsonField("temperature", "json", "0.5"),
        form.newCustomJsonField(),
      ],
    };
    const { config } = form.parseCustomJsonForm(state);
    expect(config?.requestTemplate).toEqual({
      model: "{{model}}",
      messages: "{{messages}}",
      project_id: "demo",
      temperature: 0.5,
    });
    const restored = form.createCustomJsonForm(config);
    expect(restored.templateMode).toBe("fields");
    expect(restored.extraFields.map(({ name, type, value }) => ({ name, type, value }))).toEqual([
      { name: "project_id", type: "text", value: "demo" },
      { name: "temperature", type: "json", value: "0.5" },
    ]);
  });

  it.each([
    [[form.newCustomJsonField("model", "text", "override")], "customJsonFieldDuplicate"],
    [
      [form.newCustomJsonField("x", "text", "a"), form.newCustomJsonField("x", "text", "b")],
      "customJsonFieldDuplicate",
    ],
    [[form.newCustomJsonField("", "text", "value")], "customJsonFieldNameRequired"],
    [[form.newCustomJsonField("n", "json", "not json")], "customJsonFieldInvalidJson"],
    [[form.newCustomJsonField("__proto__", "text", "x")], "customJsonConfigInvalid"],
    [[form.newCustomJsonField("q", "text", "{{secret}}")], "customJsonConfigInvalid"],
  ])("rejects invalid rows %#", (extraFields, key) => {
    const result = form.parseCustomJsonForm({ ...form.createCustomJsonForm(), extraFields });
    expect(result.config).toBeUndefined();
    expect(result.error?.key).toBe(key);
  });

  it("validates with the server schema (auth header, response path, method)", () => {
    const base = form.createCustomJsonForm();
    expect(
      form.parseCustomJsonForm({ ...base, authType: "api-key", authHeader: "Host" }).error?.key
    ).toBe("customJsonConfigInvalid");
    expect(form.parseCustomJsonForm({ ...base, responsePath: "data.*" }).error?.key).toBe(
      "customJsonConfigInvalid"
    );
    expect(form.parseCustomJsonForm({ ...base, method: "TRACE" }).error?.key).toBe(
      "customJsonConfigInvalid"
    );
  });

  it("opens a non-standard template in JSON mode and refuses to drop it into fields mode", () => {
    const state = form.createCustomJsonForm({
      requestTemplate: { question: "{{prompt}}" },
      responsePath: "data.answer",
    });
    expect(state.templateMode).toBe("json");
    expect(JSON.parse(state.requestTemplateText)).toEqual({ question: "{{prompt}}" });
    const switched = form.switchCustomJsonTemplateMode(state, "fields");
    expect(switched.error?.key).toBe("customJsonFieldsModeUnavailable");
    expect(switched.form).toBe(state);
    const toJson = form.switchCustomJsonTemplateMode(form.createCustomJsonForm(), "json");
    expect(JSON.parse(toJson.form.requestTemplateText)).toEqual({
      model: "{{model}}",
      messages: "{{messages}}",
    });
  });
});

describe("AddCompatibleProviderModal — Custom JSON API type", { timeout: 30_000 }, () => {
  it("offers the type, clears the OpenAI default URL and shows the custom JSON fields", () => {
    const modal = mount(
      <AddCompatibleProviderModal isOpen mode="openai" onClose={() => {}} onCreated={() => {}} />
    );
    expect(inputByLabel(modal, "baseUrlLabel").value).toBe("https://api.openai.com/v1");
    expect(modal.querySelector('[data-testid="custom-json-fields"]')).toBeNull();
    chooseKitSelectValue(kitSelectByLabel("apiTypeLabel", modal), "custom-json");
    expect(inputByLabel(modal, "baseUrlLabel").value).toBe("");
    expect(modal.querySelector('[data-testid="custom-json-fields"]')).not.toBeNull();
    expect(kitSelectValue(kitSelectByLabel("customJsonMethodLabel", modal))).toBe("POST");
    expect(inputByLabel(modal, "customJsonResponsePathLabel").value).toBe(
      "choices[0].message.content"
    );
    expect(button(modal, "customJsonSendTest")).toBeTruthy();
  });

  it("creates the node with the validated customJson config from simple fields", async () => {
    const onCreated = vi.fn();
    const modal = openAddAsCustomJson(onCreated);
    setValue(inputByLabel(modal, "baseUrlLabel"), "https://api.example.com/v1/answer");
    chooseKitSelectValue(kitSelectByLabel("customJsonMethodLabel", modal), "PUT");
    chooseKitSelectValue(kitSelectByLabel("customJsonAuthTypeLabel", modal), "api-key");
    setValue(inputByLabel(modal, "customJsonAuthHeaderLabel"), "X-Service-Key");
    click(button(modal, "customJsonAddField"));
    setValue(inputByLabel(modal, "customJsonFieldName"), "project_id");
    setValue(inputByLabel(modal, "customJsonFieldValue"), "demo-project");
    click(button(modal, "customJsonAddField"));
    setValue(inputByLabel(modal, "customJsonFieldName", 1), "temperature");
    const rows = modal.querySelectorAll('[data-testid="custom-json-field-row"]');
    setNativeSelect(rows[1].querySelector("select")!, "json");
    setValue(inputByLabel(modal, "customJsonFieldValue", 1), "0.2");
    setValue(inputByLabel(modal, "customJsonResponsePathLabel"), "data.answer");

    click(button(modal, "add"));
    await waitFor(() => onCreated.mock.calls.length > 0);

    expect(String(fetchCalls()[0][0])).toBe("/api/provider-nodes");
    const body = bodyOf(0);
    expect(body.apiType).toBe("custom-json");
    expect(body.baseUrl).toBe("https://api.example.com/v1/answer");
    expect(body.customJson).toEqual({
      method: "PUT",
      authType: "api-key",
      authHeader: "X-Service-Key",
      requestTemplate: {
        model: "{{model}}",
        messages: "{{messages}}",
        project_id: "demo-project",
        temperature: 0.2,
      },
      responsePath: "data.answer",
    });
  });

  it("blocks saving when a JSON field is invalid, without calling the API", () => {
    const modal = openAddAsCustomJson();
    setValue(inputByLabel(modal, "baseUrlLabel"), "https://api.example.com/v1/answer");
    click(button(modal, "customJsonAddField"));
    setValue(inputByLabel(modal, "customJsonFieldName"), "options");
    setNativeSelect(
      modal.querySelector<HTMLSelectElement>('[data-testid="custom-json-field-row"] select')!,
      "json"
    );
    setValue(inputByLabel(modal, "customJsonFieldValue"), "{not json");
    click(button(modal, "add"));
    expect(modal.querySelector('[role="alert"]')?.textContent).toBe("customJsonFieldInvalidJson");
    expect(fetchCalls()).toHaveLength(0);
  });

  it("saves a full JSON template from the advanced editor", async () => {
    const onCreated = vi.fn();
    const modal = openAddAsCustomJson(onCreated);
    setValue(inputByLabel(modal, "baseUrlLabel"), "https://api.example.com/v1/answer");
    chooseKitSelectValue(kitSelectByLabel("customJsonTemplateLabel", modal), "json");
    setValue(templateTextarea(modal), '{"question":"{{prompt}}","tenant":"demo"}');
    click(button(modal, "add"));
    await waitFor(() => onCreated.mock.calls.length > 0);
    expect(bodyOf(0).customJson.requestTemplate).toEqual({
      question: "{{prompt}}",
      tenant: "demo",
    });
  });

  it("rejects a template with an unknown placeholder via the server schema", () => {
    const modal = openAddAsCustomJson();
    setValue(inputByLabel(modal, "baseUrlLabel"), "https://api.example.com/v1/answer");
    chooseKitSelectValue(kitSelectByLabel("customJsonTemplateLabel", modal), "json");
    setValue(templateTextarea(modal), '{"x":"{{process.env}}"}');
    click(button(modal, "add"));
    expect(modal.querySelector('[role="alert"]')?.textContent).toBe("customJsonConfigInvalid");
    expect(fetchCalls()).toHaveLength(0);
  });

  it("sends one explicit test request with the config; no key needed for authType none", async () => {
    const modal = openAddAsCustomJson();
    setValue(inputByLabel(modal, "baseUrlLabel"), "https://api.example.com/v1/answer");
    const sendTest = button(modal, "customJsonSendTest");
    expect(sendTest.disabled).toBe(true);
    chooseKitSelectValue(kitSelectByLabel("customJsonAuthTypeLabel", modal), "none");
    expect(button(modal, "customJsonSendTest").disabled).toBe(false);
    click(button(modal, "customJsonSendTest"));
    await waitFor(() => fetchCalls().length > 0);

    expect(String(fetchCalls()[0][0])).toBe("/api/provider-nodes/validate");
    const body = bodyOf(0);
    expect(body.apiType).toBe("custom-json");
    expect(body.baseUrl).toBe("https://api.example.com/v1/answer");
    expect(body.customJson.authType).toBe("none");
    expect(body.customJson.requestTemplate).toEqual({
      model: "{{model}}",
      messages: "{{messages}}",
    });
    await waitFor(() => modal.textContent?.includes("valid") ?? false);
    expect(fetchCalls()).toHaveLength(1);
  });
});

describe("EditCompatibleNodeModal — Custom JSON node", { timeout: 30_000 }, () => {
  const node = {
    id: "openai-compatible-custom-json-x",
    name: "Business API",
    prefix: "biz",
    apiType: "custom-json",
    baseUrl: "https://api.example.com/v1/answer",
    customJsonConfig: {
      method: "PATCH",
      authType: "api-key",
      authHeader: "X-Service-Key",
      requestTemplate: { question: "{{prompt}}" },
      responsePath: "data.answer",
    },
  };

  it("restores the stored config (non-standard template opens in JSON mode) and saves it", async () => {
    const onSave = vi.fn(async () => {});
    const modal = mount(
      <EditCompatibleNodeModal isOpen node={node} onSave={onSave} onClose={() => {}} />
    );
    expect(kitSelectValue(kitSelectByLabel("customJsonMethodLabel", modal))).toBe("PATCH");
    expect(inputByLabel(modal, "customJsonAuthHeaderLabel").value).toBe("X-Service-Key");
    expect(kitSelectValue(kitSelectByLabel("customJsonTemplateLabel", modal))).toBe("json");
    expect(JSON.parse(templateTextarea(modal).value)).toEqual({ question: "{{prompt}}" });

    setValue(templateTextarea(modal), '{"question":"{{prompt}}","lang":"pt"}');
    click(button(modal, "save"));
    await waitFor(() => onSave.mock.calls.length > 0);
    const payload = (onSave.mock.calls[0] as unknown[])[0] as Record<string, unknown>;
    expect(payload.apiType).toBe("custom-json");
    expect(payload.customJson).toEqual({
      method: "PATCH",
      authType: "api-key",
      authHeader: "X-Service-Key",
      requestTemplate: { question: "{{prompt}}", lang: "pt" },
      responsePath: "data.answer",
    });
  });

  it("restores extra fields of a standard template in simple-fields mode", () => {
    const modal = mount(
      <EditCompatibleNodeModal
        isOpen
        node={{
          ...node,
          customJsonConfig: {
            requestTemplate: { model: "{{model}}", messages: "{{messages}}", project_id: "demo" },
          },
        }}
        onSave={async () => {}}
        onClose={() => {}}
      />
    );
    expect(kitSelectValue(kitSelectByLabel("customJsonTemplateLabel", modal))).toBe("fields");
    expect(inputByLabel(modal, "customJsonFieldName").value).toBe("project_id");
    expect(inputByLabel(modal, "customJsonFieldValue").value).toBe("demo");
  });

  it("does not send customJson for a regular chat node", async () => {
    const onSave = vi.fn(async () => {});
    const modal = mount(
      <EditCompatibleNodeModal
        isOpen
        node={{ id: "n1", name: "Chat", prefix: "c", apiType: "chat", baseUrl: "https://x/v1" }}
        onSave={onSave}
        onClose={() => {}}
      />
    );
    expect(modal.querySelector('[data-testid="custom-json-fields"]')).toBeNull();
    click(button(modal, "save"));
    await waitFor(() => onSave.mock.calls.length > 0);
    const payload = (onSave.mock.calls[0] as unknown[])[0] as Record<string, unknown>;
    expect("customJson" in payload).toBe(false);
  });
});
