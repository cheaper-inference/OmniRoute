// @vitest-environment jsdom
//
// API-key "Logging" toggle in the key-template policy editor (the create/edit
// flow). Same presentation rule as the key detail page: the stored flag is
// `no_log` (true = withhold) but the switch reads "Logging", ON by default.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

const policyState = {
  noLog: false as boolean | undefined,
  groupIds: [] as string[],
  comboIds: [] as string[],
  connectionIds: [] as string[],
  streamDefaultMode: "legacy",
  autoResolve: false,
  compressionEnabled: false,
  chaosModeEnabled: false,
  allowUsageCommand: false,
  bypassProviderQuotaPolicyEnabled: false,
  reasoningRules: [] as unknown[],
  cacheDefaultMode: "auto",
  codexServiceMode: "default",
};
const updateState = vi.fn();

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/shared/components/Button", () => ({
  default: ({ children }: Record<string, unknown>) => (
    <button>{children as React.ReactNode}</button>
  ),
}));
vi.mock("@/shared/components/Icon", () => ({ default: () => null }));
vi.mock("@/shared/components/Input", () => ({ default: () => null }));
vi.mock("@/shared/components/Select", () => ({ default: () => null }));
vi.mock("@/shared/components/Toggle", () => ({
  default: ({
    checked,
    onChange,
    ariaLabel,
  }: {
    checked?: boolean;
    onChange?: () => void;
    ariaLabel?: string;
  }) => (
    <input
      type="checkbox"
      role="switch"
      aria-label={ariaLabel}
      aria-checked={checked}
      checked={Boolean(checked)}
      onChange={() => onChange?.()}
    />
  ),
}));

vi.mock("@/app/(dashboard)/dashboard/api-manager/components/KeyPolicyEditorContext", () => ({
  useKeyPolicyEditor: () => ({
    t: (key: string) => key,
    formState: policyState,
    updateState,
    // Sections other than the Logging toggle read these; empty arrays keep them
    // inert without pulling the real context provider into the test.
    allKeyGroups: [],
    allCombos: [],
    allConnections: [],
  }),
}));

vi.mock("@/app/(dashboard)/dashboard/api-manager/components/KeyTemplatePolicyDetails", () => ({
  KeyTemplateReasoningFields: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/api-manager/components/ApiKeyCompressionToggle", () => ({
  ApiKeyCompressionToggle: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/api-manager/components/ChaosModeAccessToggle", () => ({
  ChaosModeAccessToggle: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/api-manager/components/BypassProviderQuotaToggle", () => ({
  BypassProviderQuotaToggle: () => null,
}));

const { default: KeyPolicyBehaviourTab } =
  await import("../../../src/app/(dashboard)/dashboard/api-manager/components/KeyPolicyBehaviourTab");

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function mount() {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => root.render(<KeyPolicyBehaviourTab />));
  containers.push({ root, el });
  return el;
}

const loggingSwitch = (el: HTMLElement) =>
  el.querySelector<HTMLInputElement>('input[aria-label="keyLoggingToggle"]');

afterEach(() => {
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  updateState.mockClear();
  policyState.noLog = false;
});

describe("key policy editor Logging toggle", () => {
  it("is ON when noLog is unset/false", () => {
    policyState.noLog = false;
    const el = mount();
    expect(loggingSwitch(el)!.checked).toBe(true);
    expect(el.textContent).toContain("keyLoggingToggle");
  });

  it("is OFF when the key is no-log", () => {
    policyState.noLog = true;
    const el = mount();
    expect(loggingSwitch(el)!.checked).toBe(false);
  });

  it("turning it OFF writes noLog=true through updateState", () => {
    policyState.noLog = false;
    const el = mount();
    act(() => loggingSwitch(el)!.click());
    expect(updateState).toHaveBeenCalledTimes(1);
    const updater = updateState.mock.calls[0][0] as (p: { noLog: boolean }) => { noLog: boolean };
    expect(updater({ noLog: false }).noLog).toBe(true);
  });

  it("turning it back ON writes noLog=false", () => {
    policyState.noLog = true;
    const el = mount();
    act(() => loggingSwitch(el)!.click());
    const updater = updateState.mock.calls[0][0] as (p: { noLog: boolean }) => { noLog: boolean };
    expect(updater({ noLog: true }).noLog).toBe(false);
  });
});
