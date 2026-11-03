// @vitest-environment jsdom
//
// The combo builder offers `nadir` as a router strategy but had no fields for its
// `config.nadir` block, so a dashboard-built combo could only run keyless with the
// 2000 ms default timeout. These tests pin the settings section: it shows only for
// `nadir`, writes a block that comboRuntimeConfigSchema accepts, and drops cleared
// fields so the env fallbacks still apply.
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { createTranslator } from "use-intl/core";

import BuilderIntelligentStep from "../../src/app/(dashboard)/dashboard/combos/BuilderIntelligentStep";
import enMessages from "../../src/i18n/messages/en.json";
import { comboRuntimeConfigSchema } from "../../src/shared/validation/schemas/combo";

const t = createTranslator({
  locale: "en",
  messages: enMessages as unknown as Record<string, unknown>,
  namespace: "combos",
});

function renderStep(config: Record<string, unknown>, onChange = vi.fn()) {
  render(
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <BuilderIntelligentStep t={t} config={config} activeProviders={[]} onChange={onChange} />
    </NextIntlClientProvider>
  );
  return onChange;
}

const lastConfig = (onChange: ReturnType<typeof vi.fn>) =>
  onChange.mock.calls.at(-1)?.[0] as Record<string, unknown>;

describe("BuilderIntelligentStep nadir settings", () => {
  it("is hidden for other router strategies", () => {
    renderStep({ routerStrategy: "rules" });
    expect(screen.queryByText("Nadir decision API")).toBeNull();
  });

  it("shows stored values for the nadir strategy", () => {
    renderStep({
      routerStrategy: "nadir",
      nadir: { apiKey: "ndr_test", timeoutMs: 4000, baseUrl: "https://nadir.internal" },
    });
    expect(screen.getByText("Nadir decision API")).toBeTruthy();
    expect((screen.getByLabelText("API key") as HTMLInputElement).value).toBe("ndr_test");
    expect((screen.getByLabelText("API key") as HTMLInputElement).type).toBe("password");
    expect((screen.getByLabelText("Timeout (ms)") as HTMLInputElement).value).toBe("4000");
    expect((screen.getByLabelText("Base URL (self-hosted)") as HTMLInputElement).value).toBe(
      "https://nadir.internal"
    );
  });

  it("writes a schema-valid nadir block and keeps the rest of the config", () => {
    const onChange = renderStep({ routerStrategy: "nadir", candidatePool: ["openai"] });

    fireEvent.change(screen.getByLabelText("API key"), { target: { value: " ndr_abc " } });
    const afterKey = lastConfig(onChange);
    expect(afterKey.nadir).toEqual({ apiKey: "ndr_abc" });
    expect(afterKey.candidatePool).toEqual(["openai"]);
    expect(afterKey.routerStrategy).toBe("nadir");

    fireEvent.change(screen.getByLabelText("Timeout (ms)"), { target: { value: "5000" } });
    const afterTimeout = lastConfig(onChange);
    expect(afterTimeout.nadir).toEqual({ timeoutMs: 5000 });
    expect(comboRuntimeConfigSchema.safeParse(afterTimeout).success).toBe(true);
  });

  it("merges into an existing block and removes it when every field is cleared", () => {
    const onChange = renderStep({ routerStrategy: "nadir", nadir: { apiKey: "ndr_abc" } });

    fireEvent.change(screen.getByLabelText("Timeout (ms)"), { target: { value: "3000" } });
    expect(lastConfig(onChange).nadir).toEqual({ apiKey: "ndr_abc", timeoutMs: 3000 });

    fireEvent.change(screen.getByLabelText("API key"), { target: { value: "" } });
    const cleared = lastConfig(onChange);
    expect(cleared.nadir).toBeUndefined();
    expect(comboRuntimeConfigSchema.safeParse(cleared).success).toBe(true);
  });
});
