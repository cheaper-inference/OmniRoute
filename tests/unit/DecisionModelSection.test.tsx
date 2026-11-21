// @vitest-environment jsdom
//
// Decision routing, step 10: the combo builder section for the `decision` router. It shows
// only for that strategy, writes a `config.decision` block that comboRuntimeConfigSchema
// accepts, never offers an API-key field, shows generated descriptions as placeholders and
// stores only what the operator typed, and runs a one-off test through the preview route.
import React, { useState } from "react";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createTranslator } from "use-intl/core";

import BuilderIntelligentStep from "../../src/app/(dashboard)/dashboard/combos/BuilderIntelligentStep";
import enMessages from "../../src/i18n/messages/en.json";
import { comboRuntimeConfigSchema } from "../../src/shared/validation/schemas/combo";

const t = createTranslator({
  locale: "en",
  messages: enMessages as unknown as Record<string, unknown>,
  namespace: "combos",
});
const fetchMock = vi.fn<typeof fetch>();
const generated = {
  cheap: "Model cheap; estimated cost $1 per 1M tokens (cost rank 1 of 2, 1 = cheapest)",
  capable: "Model capable; estimated cost $10 per 1M tokens (cost rank 2 of 2, 1 = cheapest)",
};

function Harness({
  initial,
  onConfig,
}: {
  initial: Record<string, unknown>;
  onConfig: (config: Record<string, unknown>) => void;
}) {
  const [config, setConfig] = useState(initial);
  return (
    <BuilderIntelligentStep
      t={t}
      config={config}
      activeProviders={[]}
      stepModels={["openai/cheap", "anthropic/capable"]}
      onChange={(next) => {
        setConfig(next);
        onConfig(next);
      }}
    />
  );
}

const lastDecision = (onConfig: ReturnType<typeof vi.fn>) =>
  (onConfig.mock.calls.at(-1)?.[0] as Record<string, unknown>).decision as Record<string, unknown>;

describe("DecisionModelSection", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    // A fresh Response per call: the builder also fetches other routes, and a body reads once.
    fetchMock.mockImplementation(async () =>
      Response.json({ menu: ["cheap", "capable"], generated })
    );
    vi.stubGlobal("fetch", fetchMock);
  });
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("stays hidden (and silent) for other router strategies", () => {
    render(<Harness initial={{ routerStrategy: "rules" }} onConfig={() => {}} />);
    expect(screen.queryByText("Decision router")).toBeNull();
    const previewCalls = fetchMock.mock.calls.filter(([url]) =>
      String(url).includes("/api/combos/decision-preview")
    );
    expect(previewCalls).toHaveLength(0);
  });

  it("offers the three deciders and no API-key field", () => {
    render(<Harness initial={{ routerStrategy: "decision" }} onConfig={() => {}} />);
    expect(screen.getByText("Decision router")).toBeTruthy();
    const decider = screen.getByLabelText("Decider") as HTMLSelectElement;
    expect([...decider.options].map((option) => option.value)).toEqual([
      "systemone",
      "http",
      "combo-model",
    ]);
    expect(screen.queryByLabelText(/api key/i)).toBeNull();
    expect(document.querySelector('input[type="password"]')).toBeNull();
  });

  it("writes an http decider block the combo schema accepts", () => {
    const onConfig = vi.fn();
    render(<Harness initial={{ routerStrategy: "decision" }} onConfig={onConfig} />);
    fireEvent.change(screen.getByLabelText("Decider"), { target: { value: "http" } });
    fireEvent.change(screen.getByLabelText("Base URL"), {
      target: { value: "https://decider.example/v1" },
    });
    fireEvent.change(screen.getByLabelText("Wire format"), { target: { value: "openai-chat" } });
    fireEvent.change(screen.getByLabelText("Decision model"), { target: { value: "qwen-small" } });
    fireEvent.change(screen.getByLabelText("Connection ID (optional)"), {
      target: { value: "conn-1" },
    });
    fireEvent.change(screen.getByLabelText("Timeout (ms)"), { target: { value: "1500" } });
    const decision = lastDecision(onConfig);
    expect(decision).toEqual({
      decider: "http",
      baseUrl: "https://decider.example/v1",
      wire: "openai-chat",
      model: "qwen-small",
      connectionId: "conn-1",
      timeoutMs: 1500,
    });
    expect(
      comboRuntimeConfigSchema.safeParse({ routerStrategy: "decision", decision }).success
    ).toBe(true);
  });

  it("combo-model hides the connection field and drops http-only fields", () => {
    const onConfig = vi.fn();
    render(
      <Harness
        initial={{
          routerStrategy: "decision",
          decision: { decider: "http", baseUrl: "https://d.example", connectionId: "c" },
        }}
        onConfig={onConfig}
      />
    );
    fireEvent.change(screen.getByLabelText("Decider"), { target: { value: "combo-model" } });
    expect(screen.queryByLabelText("Connection ID (optional)")).toBeNull();
    expect(screen.queryByLabelText("Base URL")).toBeNull();
    expect(lastDecision(onConfig)).toEqual({ decider: "combo-model" });
  });

  it("shows generated text as placeholder and stores only typed descriptions", async () => {
    const onConfig = vi.fn();
    render(<Harness initial={{ routerStrategy: "decision" }} onConfig={onConfig} />);
    const cheap = (await screen.findByLabelText(
      "cheap",
      {},
      { timeout: 8000 }
    )) as HTMLInputElement;
    await waitFor(() => expect(cheap.placeholder).toBe(generated.cheap));
    fireEvent.change(cheap, { target: { value: "Fast drafts" } });
    expect(lastDecision(onConfig)).toEqual({
      decider: "systemone",
      descriptions: { cheap: "Fast drafts" },
    });
  });

  it("runs a one-off test through the preview route and shows the choice", async () => {
    render(<Harness initial={{ routerStrategy: "decision" }} onConfig={() => {}} />);
    await screen.findByLabelText("cheap", {}, { timeout: 8000 });
    fetchMock.mockResolvedValueOnce(
      Response.json({
        menu: ["cheap", "capable"],
        generated,
        test: {
          status: "selected",
          choice: "capable",
          confidence: 0.81,
          probabilities: { capable: 0.81, cheap: 0.19 },
          latencyMs: 42,
        },
      })
    );
    fireEvent.change(screen.getByPlaceholderText("Example prompt"), {
      target: { value: "prove this theorem" },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Test" }));
    });
    await screen.findByText("capable", { selector: "span.font-semibold" }, { timeout: 8000 });
    const [, init] = fetchMock.mock.calls
      .filter(([url]) => String(url).includes("/api/combos/decision-preview"))
      .at(-1) as [string, RequestInit];
    expect(JSON.parse(String(init.body))).toEqual({
      models: ["openai/cheap", "anthropic/capable"],
      decision: { decider: "systemone" },
      prompt: "prove this theorem",
    });
  });
});
