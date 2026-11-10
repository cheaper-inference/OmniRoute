// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ALL_COMBOS_ACCESS_RULE } from "@/shared/constants/comboAccess";
import ModelVisionOverrideEditor from "@/app/(dashboard)/dashboard/providers/[id]/components/ModelVisionOverrideEditor";
import type { AccessKey } from "@/app/(dashboard)/dashboard/models/keyAccessAssignUtils";
import type { ApiKeyAccessIndex } from "@/app/(dashboard)/dashboard/models/useApiKeyAccessIndex";

const fixtures = vi.hoisted(() => {
  const translate = (key: string) => key;
  const notify = { info: vi.fn(), error: vi.fn(), addNotification: vi.fn() };
  return { translate, notify };
});
vi.mock("next-intl", () => ({ useTranslations: () => fixtures.translate }));
vi.mock("next/link", () => ({ default: "a" }));
vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: Object.assign(() => fixtures.notify, { getState: () => fixtures.notify }),
}));
vi.mock("@/shared/components", async () => ({
  Button: (await import("@/shared/components/Button")).default,
  Checkbox: (await import("@/shared/components/Checkbox")).default,
  Select: (await import("@/shared/components/Select")).default,
  Input: (await import("@/shared/components/Input")).default,
  Modal: (await import("@/shared/components/Modal")).default,
}));
vi.mock("@/shared/constants/providers", () => ({
  getProviderAlias: (id: string) => id,
  getProviderByAlias: () => undefined,
  resolveProviderId: (id: string) => id,
}));
vi.mock("@/app/(dashboard)/dashboard/providers/[id]/providerPageHelpers", () => ({
  providerText: (t: (key: string) => string, key: string) => t(key),
}));

import CopilotPolicyStep from "@/shared/components/oauthModal/CopilotPolicyStep";
import ModelComboBadge from "@/app/(dashboard)/dashboard/providers/[id]/components/ModelComboBadge";
import ProviderCliVersionSection from "@/app/(dashboard)/dashboard/providers/[id]/components/ProviderCliVersionSection";
import { OAuthExportImportModal } from "@/app/(dashboard)/dashboard/providers/components/OAuthExportImportModal";
import CatalogKeyAccessButton from "@/app/(dashboard)/dashboard/models/CatalogKeyAccessButton";
import CatalogKeyAssignDialog from "@/app/(dashboard)/dashboard/models/CatalogKeyAssignDialog";

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT =
  true;
const mounted: Array<{ root: Root; container: HTMLDivElement }> = [];
async function render(element: React.ReactNode) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  mounted.push({ root, container });
  await act(async () => root.render(element));
  return container;
}
async function click(element: HTMLElement | null) {
  expect(element).not.toBeNull();
  await act(async () => element!.click());
}
async function change(input: HTMLInputElement, value: string) {
  await act(async () => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set?.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}
const button = (text: string) =>
  Array.from(document.querySelectorAll("button")).find((el) => el.textContent === text) ?? null;
const key = (overrides: Partial<AccessKey> = {}): AccessKey => ({
  id: "k1",
  name: "Fixture key",
  modelAccessMode: "restricted",
  allowedModels: ["model-a", "model-b"],
  blockedModels: [],
  allowedCombos: ["combo-a", "combo-b"],
  ...overrides,
});
const index = (keys: AccessKey[]): ApiKeyAccessIndex => ({
  keys,
  loading: false,
  error: false,
  checkedAt: 0,
  pendingKeys: new Set(),
  ensureLoaded: vi.fn(async () => {}),
  refresh: vi.fn(async () => {}),
  assign: vi.fn(async () => ({ status: "changed" as const })),
  toggle: vi.fn(async () => ({ status: "changed" as const })),
});
afterEach(() => {
  for (const { root, container } of mounted.splice(0)) {
    act(() => root.unmount());
    container.remove();
  }
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("dashboard kit repair behavior", () => {
  it("shows Copilot disclosure as SVG and requires an explicit connect click", async () => {
    const startOAuthFlow = vi.fn();
    const onClose = vi.fn();
    const container = await render(
      <CopilotPolicyStep startOAuthFlow={startOAuthFlow} onClose={onClose} />
    );
    expect(container.querySelectorAll("svg[data-icon]")).toHaveLength(4);
    expect(startOAuthFlow).not.toHaveBeenCalled();
    await click(button("cancel"));
    expect(onClose).toHaveBeenCalledOnce();
    expect(startOAuthFlow).not.toHaveBeenCalled();
    await click(button("copilotPolicyAcknowledge"));
    expect(startOAuthFlow).toHaveBeenCalledOnce();
  });

  it("keeps combo links separate from the parent row action", async () => {
    const rowClick = vi.fn();
    const container = await render(
      <div onClick={rowClick}>
        <ModelComboBadge combos={["One", "Two"]} t={fixtures.translate} />
      </div>
    );
    expect(container.querySelectorAll('svg[data-icon="layers"]')).toHaveLength(2);
    const links = container.querySelectorAll("a");
    expect(links).toHaveLength(2);
    expect(links[0].getAttribute("href")).toBe("/dashboard/combos");
    links[0].addEventListener("click", (event) => event.preventDefault());
    await act(async () =>
      links[0].dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }))
    );
    expect(rowClick).not.toHaveBeenCalled();
  });

  it("uses the real version input and preserves Enter save and reset payloads", async () => {
    const fetchMock = vi.fn(async () => ({
      ok: true,
      json: async () => ({
        items: [
          {
            key: "codex",
            version: "1.0.0",
            effective: "1.0.0",
            source: "settings",
            pinned: "0.9.0",
          },
        ],
      }),
    }));
    vi.stubGlobal("fetch", fetchMock);
    const container = await render(<ProviderCliVersionSection providerId="codex" />);
    const input = container.querySelector<HTMLInputElement>(
      'input[aria-label="cliVersionInputLabel"]'
    )!;
    expect(input.className).toContain("ci-input");
    await change(input, "2.0.0");
    await act(async () =>
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }))
    );
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/settings/cli-versions",
      expect.objectContaining({ method: "PUT", body: JSON.stringify({ codex: "2.0.0" }) })
    );
    await click(button("cliVersionResetButton"));
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/settings/cli-versions",
      expect.objectContaining({ method: "PUT", body: JSON.stringify({ codex: null }) })
    );
  });

  it("does not request version overrides for an unsupported provider", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const container = await render(<ProviderCliVersionSection providerId="other" />);
    expect(container.textContent).toBe("");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("imports only checked OAuth accounts through the chosen provider", async () => {
    const onImported = vi.fn(async () => {});
    const fetchMock = vi.fn(async () => ({
      ok: true,
      json: async () => ({ success: true, imported: 1, failed: 0, total: 1 }),
    }));
    vi.stubGlobal("fetch", fetchMock);
    await render(<OAuthExportImportModal isOpen onClose={vi.fn()} onImported={onImported} />);
    const accounts = [
      { email: "one@example.invalid", refreshToken: "synthetic-one" },
      { email: "two@example.invalid", refreshToken: "synthetic-two" },
    ];
    const file = new File([JSON.stringify(accounts)], "fixture.json", { type: "application/json" });
    Object.defineProperty(file, "text", { value: async () => JSON.stringify(accounts) });
    const input = document.querySelector<HTMLInputElement>('input[type="file"]')!;
    await act(async () => {
      Object.defineProperty(input, "files", { configurable: true, value: [file] });
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
    expect(document.querySelector('table[data-slot="table"]')).not.toBeNull();
    const rows = document.querySelectorAll<HTMLInputElement>('tbody input[type="checkbox"]');
    expect(rows).toHaveLength(2);
    await click(rows[1]);
    const select = document.querySelector<HTMLSelectElement>("#oauth-export-provider")!;
    await act(async () => {
      select.value = "agy";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await click(button("oauthExportImport"));
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/oauth/agy/import-export",
      expect.objectContaining({ method: "POST", body: JSON.stringify({ accounts: [accounts[0]] }) })
    );
    expect(onImported).toHaveBeenCalledOnce();
  });

  it("uses a portaled key popover and restores trigger focus on Escape", async () => {
    const access = index([key()]);
    const container = await render(
      <CatalogKeyAccessButton kind="combos" id="combo-a" index={access} />
    );
    const trigger = container.querySelector<HTMLButtonElement>("button")!;
    trigger.focus();
    await click(trigger);
    expect(access.ensureLoaded).toHaveBeenCalledOnce();
    const dialog = document.querySelector<HTMLElement>('[data-slot="popover-content"]')!;
    expect(dialog).not.toBeNull();
    expect(container.contains(dialog)).toBe(false);
    expect(dialog.getAttribute("role")).toBe("dialog");
    const toggle = dialog.querySelector<HTMLButtonElement>('[role="switch"]')!;
    expect(toggle.getAttribute("aria-checked")).toBe("true");
    await click(toggle);
    expect(access.toggle).toHaveBeenCalledWith(access.keys[0], "combos", "combo-a", false);
    await act(async () =>
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }))
    );
    expect(document.querySelector('[data-slot="popover-content"]')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("keeps all-access and final-item switches disabled", async () => {
    const access = index([
      key({ id: "all", allowedCombos: [ALL_COMBOS_ACCESS_RULE] }),
      key({ id: "last", allowedCombos: ["combo-a"] }),
    ]);
    const container = await render(
      <CatalogKeyAccessButton kind="combos" id="combo-a" index={access} />
    );
    await click(container.querySelector("button"));
    const toggles = Array.from(document.querySelectorAll<HTMLButtonElement>('[role="switch"]'));
    expect(toggles).toHaveLength(2);
    expect(toggles.every((toggle) => toggle.disabled)).toBe(true);
    expect(access.toggle).not.toHaveBeenCalled();
  });

  it("keeps key selection and the add/remove radio decision in the assignment request", async () => {
    const access = index([key()]);
    await render(
      <CatalogKeyAssignDialog
        kind="combos"
        items={[{ id: "combo-a" }]}
        index={access}
        onClose={vi.fn()}
      />
    );
    const group = document.querySelector('[data-slot="radio-group"]');
    expect(group).not.toBeNull();
    await click(document.querySelector<HTMLInputElement>('input[aria-label="selectApiKey"]'));
    await click(document.querySelector<HTMLInputElement>('input[type="radio"][value="remove"]'));
    await click(document.querySelector('[data-testid="assign-apply-btn"]'));
    expect(access.assign).toHaveBeenCalledWith("k1", { remove: { combos: ["combo-a"] } });
    expect(access.refresh).toHaveBeenCalledOnce();
  });
  it("keeps vision overrides tri-state and disables saving controls", async () => {
    const onSave = vi.fn(async () => true);
    const container = await render(
      <ModelVisionOverrideEditor
        modelId="model-a"
        value={null}
        onSave={onSave}
        t={fixtures.translate}
      />
    );
    const input = container.querySelector<HTMLInputElement>('input[type="checkbox"]')!;
    expect(input.className).toContain("ci-checkbox");
    await click(input);
    expect(onSave).toHaveBeenCalledWith("model-a", true);
    const { root } = mounted.at(-1)!;
    await act(async () =>
      root.render(
        <ModelVisionOverrideEditor
          modelId="model-a"
          value={true}
          onSave={onSave}
          t={fixtures.translate}
        />
      )
    );
    await click(input);
    expect(onSave).toHaveBeenCalledWith("model-a", null);
    await act(async () =>
      root.render(
        <ModelVisionOverrideEditor
          modelId="model-a"
          value={true}
          saving
          onSave={onSave}
          t={fixtures.translate}
        />
      )
    );
    expect(input.disabled).toBe(true);
  });

  it("closes key access when focus moves outside without stealing that focus", async () => {
    const access = index([key()]);
    const container = await render(
      <>
        <CatalogKeyAccessButton kind="combos" id="combo-a" index={access} />
        <button data-testid="outside">Outside</button>
      </>
    );
    const trigger = container.querySelector<HTMLButtonElement>("button")!;
    // HTMLElement.click() does not focus the trigger in jsdom. Model the user
    // leaving a focused control; a focus event with no origin has a different policy.
    trigger.focus();
    await click(trigger);
    expect(document.activeElement).toBe(trigger);
    expect(document.querySelector('[data-slot="popover-content"]')).not.toBeNull();
    const outside = container.querySelector<HTMLButtonElement>('[data-testid="outside"]')!;
    await act(async () => outside.focus());
    expect(document.querySelector('[data-slot="popover-content"]')).toBeNull();
    expect(document.activeElement).toBe(outside);
  });
});
