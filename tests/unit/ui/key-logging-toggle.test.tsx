// @vitest-environment jsdom
//
// API-key "Logging" toggle (Behaviour tab of the key detail page).
//
// The opt-out is stored as `api_keys.no_log` (true = withhold payloads), but the
// UI presents it as "Logging", ON by default, so it reads the same way as the
// global, connection and per-model toggles. These tests pin that presentation:
// a key with noLog unset shows Logging ON, turning it off writes noLog=true, and
// turning it back on writes noLog=false.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/shared/components/Button", () => ({
  default: ({ children, onClick, ...props }: Record<string, unknown>) => (
    <button onClick={onClick as () => void} {...props}>
      {children as React.ReactNode}
    </button>
  ),
}));

vi.mock("@/shared/components/Icon", () => ({
  default: () => null,
}));

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

vi.mock("@/app/(dashboard)/dashboard/api-manager/components/ApiKeyCompressionToggle", () => ({
  ApiKeyCompressionToggle: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/api-manager/components/ChaosModeAccessToggle", () => ({
  ChaosModeAccessToggle: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/api-manager/components/BypassProviderQuotaToggle", () => ({
  BypassProviderQuotaToggle: () => null,
}));

const { default: BehaviourTab } =
  await import("../../../src/app/(dashboard)/dashboard/api-manager/[id]/access/tabs/BehaviourTab");

type FormState = Parameters<typeof BehaviourTab>[0]["formState"];

const baseFormState = (noLog: boolean) =>
  ({
    name: "key",
    allowAll: true,
    selectedModels: [],
    blockedClaudeCodeFamilies: [],
    allowAllCombos: true,
    selectedCombos: [],
    allowAllConnections: true,
    selectedConnections: [],
    selectedPreferredConnections: [],
    allowAllEndpoints: true,
    selectedEndpoints: [],
    noLog,
    autoResolve: false,
    isActive: true,
    throttleDelayMs: 0,
    isBanned: false,
    expiresAt: "",
    maxSessions: 0,
    scheduleEnabled: false,
    scheduleFrom: "",
    scheduleUntil: "",
    scheduleDays: [],
    scheduleTz: "UTC",
    rateLimits: [],
    manageEnabled: true,
    compressionEnabled: false,
    chaosModeEnabled: false,
    allowUsageCommand: false,
    bypassProviderQuotaPolicyEnabled: false,
  }) as unknown as FormState;

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function mount(noLog: boolean, setNoLog = vi.fn()) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(
      <BehaviourTab
        formState={baseFormState(noLog)}
        setNoLog={setNoLog}
        setAutoResolve={vi.fn()}
        setStreamDefaultMode={vi.fn()}
        setCompressionEnabled={vi.fn()}
        setChaosModeEnabled={vi.fn()}
        setAllowUsageCommand={vi.fn()}
        setBypassProviderQuotaPolicyEnabled={vi.fn()}
      />
    );
  });
  containers.push({ root, el });
  return { el, setNoLog };
}

const loggingSwitch = (el: HTMLElement) =>
  el.querySelector<HTMLInputElement>('input[aria-label="keyLoggingToggle"]');

afterEach(() => {
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
});

describe("API-key Logging toggle", () => {
  it("is ON by default when noLog is unset", () => {
    const { el } = mount(false);
    const toggle = loggingSwitch(el);
    expect(toggle).not.toBeNull();
    expect(toggle!.checked).toBe(true);
    expect(el.textContent).toContain("keyLoggingToggle");
    expect(el.textContent).toContain("keyLoggingDescription");
  });

  it("turning it OFF stores noLog=true", () => {
    const { el, setNoLog } = mount(false);
    const toggle = loggingSwitch(el)!;
    act(() => toggle.click());
    expect(setNoLog).toHaveBeenCalledWith(true);
  });

  it("renders OFF for a no-log key and turning it back ON stores noLog=false", () => {
    const { el, setNoLog } = mount(true);
    const toggle = loggingSwitch(el)!;
    expect(toggle.checked).toBe(false);
    act(() => toggle.click());
    expect(setNoLog).toHaveBeenCalledWith(false);
  });

  it("no longer renders the inverted No-Log Payload Privacy label", () => {
    const { el } = mount(false);
    expect(el.textContent).not.toContain("noLogPayloadPrivacy");
  });
});
