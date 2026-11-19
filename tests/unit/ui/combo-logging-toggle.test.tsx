// @vitest-environment jsdom
//
// Per-combo "Logging" switch. ON by default; turning it off writes
// `config.noLog = true`, which makes every request routed through the combo
// withhold request/response message content from call logs.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/shared/components/Checkbox", () => ({
  default: ({
    checked,
    onChange,
    label,
    id,
  }: {
    checked?: boolean;
    onChange?: (e: { target: { checked: boolean } }) => void;
    label?: string;
    id?: string;
  }) => (
    <label>
      <input
        id={id}
        type="checkbox"
        aria-label={label}
        checked={Boolean(checked)}
        onChange={() => onChange?.({ target: { checked: !checked } })}
      />
      {label}
    </label>
  ),
}));

vi.mock("@/shared/components/InfoTooltip", () => ({
  default: () => null,
}));

const { default: ComboLoggingToggle } =
  await import("../../../src/app/(dashboard)/dashboard/combos/ComboLoggingToggle");

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

// `t.has` returns true so the component takes the i18n key path and the tests can
// assert on stable keys instead of the English fallback copy.
const t = Object.assign((key: string) => key, { has: () => true });

function mount(config: Record<string, unknown>, setConfig = vi.fn()) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(<ComboLoggingToggle config={config} setConfig={setConfig} t={t} />);
  });
  containers.push({ root, el });
  return { el, setConfig };
}

const loggingBox = (el: HTMLElement) =>
  el.querySelector<HTMLInputElement>('input[aria-label="comboLoggingToggle"]');

afterEach(() => {
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
});

describe("Combo Logging toggle", () => {
  it("is ON by default when config.noLog is unset", () => {
    const { el } = mount({ strategy: "round-robin" });
    expect(loggingBox(el)!.checked).toBe(true);
    expect(el.textContent).toContain("comboLoggingToggle");
  });

  it("is ON when config.noLog is explicitly false", () => {
    const { el } = mount({ noLog: false });
    expect(loggingBox(el)!.checked).toBe(true);
  });

  it("is OFF when the combo is no-log", () => {
    const { el } = mount({ noLog: true });
    expect(loggingBox(el)!.checked).toBe(false);
  });

  it("turning it OFF writes noLog=true and keeps the rest of the config", () => {
    const { el, setConfig } = mount({ strategy: "round-robin", maxRetries: 3 });
    act(() => loggingBox(el)!.click());
    expect(setConfig).toHaveBeenCalledWith({
      strategy: "round-robin",
      maxRetries: 3,
      noLog: true,
    });
  });

  it("turning it back ON writes noLog=false", () => {
    const { el, setConfig } = mount({ strategy: "pipeline", noLog: true });
    act(() => loggingBox(el)!.click());
    expect(setConfig).toHaveBeenCalledWith({ strategy: "pipeline", noLog: false });
  });
});
