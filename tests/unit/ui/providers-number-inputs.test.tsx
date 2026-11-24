// @vitest-environment jsdom
/**
 * Providers area, kit NumberInput (adoption slice A1). The provider forms keep optional numbers
 * as text ("" = not set). Their fields are now the NumberInput adapter: a text field with a
 * numeric keyboard that refuses what is not a number, instead of `type="number"`.
 */
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import NewApiAggregatorFields from "@/app/(dashboard)/dashboard/providers/[id]/components/modals/NewApiAggregatorFields";
import { NinerouterInstallWizard } from "@/app/(dashboard)/dashboard/providers/services/components/NinerouterInstallWizard";
import { numberToText, textToNumber } from "@/app/(dashboard)/dashboard/providers/numberFieldText";

vi.mock("@/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus", () => ({
  useServiceStatus: () => ({ mutate: () => {} }),
}));

afterEach(cleanup);

describe("numberFieldText", () => {
  it("reads the form text as the field value", () => {
    expect(textToNumber("")).toBeNull();
    expect(textToNumber("   ")).toBeNull();
    expect(textToNumber("60")).toBe(60);
    expect(textToNumber("42.5")).toBe(42.5);
    expect(textToNumber("0")).toBe(0);
    expect(textToNumber("abc")).toBeNull();
    expect(textToNumber(7)).toBe(7);
    expect(textToNumber(undefined)).toBeNull();
  });

  it("writes the field value back as the form text", () => {
    expect(numberToText(null)).toBe("");
    expect(numberToText(0)).toBe("0");
    expect(numberToText(42.5)).toBe("42.5");
  });
});

describe("NewApiAggregatorFields — quota per unit", () => {
  const values = { consoleApiKey: "", newApiUserId: "", quotaPerUnit: "" };
  const t = (key: string) => key;

  function show(quotaPerUnit = "") {
    const onChange = vi.fn();
    render(
      <NewApiAggregatorFields
        enabled
        values={{ ...values, quotaPerUnit }}
        onChange={onChange}
        t={t}
      />
    );
    const input = screen.getByLabelText("newApiAggregatorQuotaPerUnitLabel") as HTMLInputElement;
    return { input, onChange };
  }

  it("is the kit numeric text field, not type=number", () => {
    const { input } = show("500000");
    expect(input.type).toBe("text");
    expect(input.inputMode).toBe("numeric");
    expect(input.value).toBe("500000");
  });

  it("hands the typed number to the form as text and an empty field as an empty string", () => {
    const { input, onChange } = show("500000");
    fireEvent.change(input, { target: { value: "250000" } });
    expect(onChange).toHaveBeenLastCalledWith({ quotaPerUnit: "250000" });
    fireEvent.change(input, { target: { value: "" } });
    expect(onChange).toHaveBeenLastCalledWith({ quotaPerUnit: "" });
  });

  it("refuses text that is not a number and a minus sign", () => {
    const { input, onChange } = show("");
    fireEvent.change(input, { target: { value: "abc" } });
    fireEvent.change(input, { target: { value: "-5" } });
    expect(onChange).not.toHaveBeenCalled();
    expect(input.value).toBe("");
  });
});

describe("NinerouterInstallWizard — service port", () => {
  it("brings the port into 1024-65535 when the edit ends", () => {
    render(<NinerouterInstallWizard />);
    const input = document.getElementById("ninerouter-port") as HTMLInputElement;
    expect(input.type).toBe("text");
    fireEvent.change(input, { target: { value: "80" } });
    expect(input.value).toBe("80");
    fireEvent.blur(input);
    expect(input.value).toBe("1024");
  });
});
