// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";

vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));

const { default: AddApiKeyModal } =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/AddApiKeyModal");
const { default: EditConnectionModal } =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/EditConnectionModal");
const mounted: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];
const payloadSchema = z.object({
  providerSpecificData: z.record(z.string(), z.unknown()).optional(),
});
const fixture = {
  id: "m365-first",
  provider: "copilot-m365-web",
  name: "M365 fixture",
  authType: "apikey",
  refreshToken: "SYNTHETIC-STORED-TOP",
  providerSpecificData: { refreshToken: "SYNTHETIC-STORED-NESTED", tier: "enterprise" },
};

function mount(element: React.ReactNode) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  mounted.push({ root, el });
  const render = (next: React.ReactNode) => act(() => root.render(next));
  render(element);
  return render;
}

function dialog() {
  const element = document.body.querySelector('[role="dialog"]');
  if (!(element instanceof HTMLElement)) throw new Error("Expected a real modal dialog");
  return element;
}

function advanced() {
  const button = Array.from(dialog().querySelectorAll("button")).find(
    (element) => element.textContent?.trim() === "advancedSettings"
  );
  if (!button) throw new Error("Expected Advanced Settings button");
  if (button.getAttribute("aria-expanded") !== "true") act(() => button.click());
}

function refreshInput() {
  const label = Array.from(dialog().querySelectorAll("label")).find(
    (element) => element.textContent === "m365RefreshTokenLabel"
  );
  if (!label) throw new Error("Expected accessible M365 refresh token label");
  const input = document.getElementById(label.htmlFor);
  if (!(input instanceof HTMLInputElement)) throw new Error("Expected refresh token input");
  return input;
}

function setValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
  if (!setter) throw new Error("Expected native input value setter");
  act(() => {
    setter.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

async function save() {
  const button = Array.from(dialog().querySelectorAll("button")).find(
    (element) => element.textContent?.trim() === "save"
  );
  if (!button) throw new Error("Expected Save button");
  await act(async () => button.click());
}

beforeEach(() => {
  vi.stubGlobal("fetch", async (_url: string, init?: RequestInit) => {
    const raw: unknown = typeof init?.body === "string" ? JSON.parse(init.body) : {};
    const body = z.object({ provider: z.string().optional() }).parse(raw);
    return Response.json({
      valid: true,
      // Validation metadata must never override explicitly typed replacement or blank intent.
      providerSpecificData:
        body.provider === "copilot-m365-web" ? { refreshToken: "SYNTHETIC-VALIDATOR-TOKEN" } : {},
      connections: [],
      models: [],
      settings: {},
    });
  });
});

afterEach(() => {
  for (const { root, el } of mounted.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.unstubAllGlobals();
});

describe("M365 refresh token fields", () => {
  for (const mode of ["Add", "Edit"] as const) {
    function renderModal(onSave: (data: unknown) => Promise<void>, provider = "copilot-m365-web") {
      return mode === "Add" ? (
        <AddApiKeyModal
          isOpen
          provider={provider}
          providerName="Provider"
          onSave={onSave}
          onClose={() => {}}
        />
      ) : (
        <EditConnectionModal
          isOpen
          connection={{
            ...fixture,
            provider,
            providerSpecificData:
              provider === "copilot-m365-web" ? fixture.providerSpecificData : {},
          }}
          providerId={provider}
          onSave={onSave}
          onClose={() => {}}
        />
      );
    }

    it(`${mode} renders an empty masked accessible M365-only input`, () => {
      mount(renderModal(async () => {}));
      advanced();
      const input = refreshInput();
      expect(input.type).toBe("password");
      expect(input.value).toBe("");
      expect(input.getAttribute("aria-describedby")).toBeTruthy();
      expect(dialog().textContent).toContain(
        mode === "Add" ? "m365RefreshTokenHint" : "m365RefreshTokenEditHint"
      );
    });

    for (const value of [" NEW-REFRESH ", "", "   "]) {
      it(`${mode} submits only an explicitly typed nonblank trimmed token (${JSON.stringify(value)})`, async () => {
        let saved: unknown;
        mount(
          renderModal(async (data) => {
            saved = data;
          })
        );
        advanced();
        setValue(refreshInput(), value);
        const apiInput = Array.from(dialog().querySelectorAll("input")).find(
          (input) => input.type === "password" && input !== refreshInput()
        );
        if (!apiInput) throw new Error("Expected access credential input");
        setValue(apiInput, "synthetic-access-input");
        await save();
        const payload = payloadSchema.parse(saved);
        expect(payload.providerSpecificData?.refreshToken).toBe(value.trim() || undefined);
      });
    }

    it(`${mode} omits the field and token for other providers`, async () => {
      let saved: unknown;
      mount(
        renderModal(async (data) => {
          saved = data;
        }, "openai")
      );
      advanced();
      expect(dialog().textContent).not.toContain("m365RefreshTokenLabel");
      const apiInput = dialog().querySelector('input[type="password"]');
      if (!(apiInput instanceof HTMLInputElement)) throw new Error("Expected API key input");
      setValue(apiInput, "synthetic-access-input");
      await save();
      expect(payloadSchema.parse(saved).providerSpecificData?.refreshToken).toBeUndefined();
    });
  }

  it("Add clears a typed token on reopen and provider switch", () => {
    const props = {
      isOpen: true,
      provider: "copilot-m365-web",
      onSave: async () => {},
      onClose: () => {},
    };
    const render = mount(<AddApiKeyModal {...props} />);
    advanced();
    setValue(refreshInput(), "TYPED-SECRET");
    render(<AddApiKeyModal {...props} isOpen={false} />);
    render(<AddApiKeyModal {...props} />);
    advanced();
    expect(refreshInput().value).toBe("");
    setValue(refreshInput(), "SECOND-SECRET");
    render(<AddApiKeyModal {...props} provider="openai" />);
    render(<AddApiKeyModal {...props} />);
    advanced();
    expect(refreshInput().value).toBe("");
  });

  it("Edit clears tokens on reopen, connection switch and provider switch", () => {
    const props = {
      isOpen: true,
      connection: fixture,
      providerId: "copilot-m365-web",
      onSave: async () => {},
      onClose: () => {},
    };
    const render = mount(<EditConnectionModal {...props} />);
    advanced();
    setValue(refreshInput(), "TYPED-SECRET");
    render(<EditConnectionModal {...props} isOpen={false} />);
    render(<EditConnectionModal {...props} />);
    advanced();
    expect(refreshInput().value).toBe("");
    setValue(refreshInput(), "SECOND-SECRET");
    render(<EditConnectionModal {...props} connection={{ ...fixture, id: "m365-second" }} />);
    advanced();
    expect(refreshInput().value).toBe("");
    setValue(refreshInput(), "THIRD-SECRET");
    render(<EditConnectionModal {...props} connection={{ ...fixture, provider: "openai" }} />);
    render(<EditConnectionModal {...props} />);
    advanced();
    expect(refreshInput().value).toBe("");
  });
});
