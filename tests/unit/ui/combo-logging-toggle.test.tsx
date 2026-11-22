// @vitest-environment jsdom
import React from "react";
import { describe, it, expect, afterEach } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import ComboLoggingToggle from "@/app/(dashboard)/dashboard/combos/ComboLoggingToggle";

function t(key: string): string {
  return key === "comboLoggingToggle" ? "Logging" : key;
}

afterEach(cleanup);

describe("ComboLoggingToggle", () => {
  it("defaults to Logging ON and writes noLog=true when turned off", () => {
    const setConfig = vi.fn();
    const { getByTestId } = render(
      <ComboLoggingToggle
        config={{}}
        setConfig={setConfig}
        t={Object.assign(t, { has: () => false })}
      />
    );

    const checkbox = getByTestId("combo-logging-enabled") as HTMLInputElement;
    expect(checkbox.checked).toBe(true);

    fireEvent.click(checkbox);
    expect(setConfig).toHaveBeenCalledWith({ noLog: true });
  });

  it("writes noLog=false when turning logging back on", () => {
    const setConfig = vi.fn();
    const { getByTestId } = render(
      <ComboLoggingToggle
        config={{ noLog: true }}
        setConfig={setConfig}
        t={Object.assign(t, { has: () => false })}
      />
    );

    const checkbox = getByTestId("combo-logging-enabled") as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);
    expect(setConfig).toHaveBeenCalledWith({ noLog: false });
  });
});
