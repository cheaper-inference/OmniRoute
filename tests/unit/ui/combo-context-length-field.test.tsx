// @vitest-environment jsdom
import React from "react";
import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render } from "@testing-library/react";
import ComboContextLengthField from "@/app/(dashboard)/dashboard/combos/ComboContextLengthField";

// KEA-7886 lote 4 review I1: the error and hint must reach the input through the Input
// adapter, so assistive tech announces them (aria-invalid + aria-describedby).
function t(key: string): string {
  return key === "agentFeaturesContextLengthErrorRange" ? "Out of range" : key;
}

afterEach(cleanup);

function renderField(error: string, showHint = true) {
  return render(
    <ComboContextLengthField
      contextLength={50}
      setContextLength={() => {}}
      contextLengthError={error}
      setContextLengthError={() => {}}
      t={Object.assign(t, { has: () => false })}
      showHint={showHint}
    />
  );
}

describe("ComboContextLengthField", () => {
  it("marks the input invalid and describes it with the error text", () => {
    const { getByRole } = renderField("Out of range");
    const input = getByRole("spinbutton");
    expect(input.getAttribute("aria-invalid")).toBe("true");
    const describedBy = input.getAttribute("aria-describedby") ?? "";
    expect(describedBy).not.toBe("");
    const text = describedBy
      .split(/\s+/)
      .map((id) => document.getElementById(id)?.textContent ?? "")
      .join(" ");
    expect(text).toContain("Out of range");
  });

  it("describes the input with the hint when there is no error", () => {
    const { getByRole } = renderField("");
    const input = getByRole("spinbutton");
    expect(input.getAttribute("aria-invalid")).toBeNull();
    const describedBy = input.getAttribute("aria-describedby") ?? "";
    const text = describedBy
      .split(/\s+/)
      .map((id) => document.getElementById(id)?.textContent ?? "")
      .join(" ");
    expect(text).toContain("Defines the context window");
  });
});
