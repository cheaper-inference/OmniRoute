// @vitest-environment jsdom
import React, { useState } from "react";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createTranslator } from "use-intl/core";

import BuilderIntelligentStep from "../../src/app/(dashboard)/dashboard/combos/BuilderIntelligentStep";
import enMessages from "../../src/i18n/messages/en.json";

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

describe("DecisionModelSection", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("stays hidden for other router strategies", () => {
    render(<Harness initial={{ routerStrategy: "rules" }} onConfig={() => {}} />);
    expect(screen.queryByText("Model descriptions")).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("shows generated text as placeholder and stores only typed descriptions", async () => {
    fetchMock.mockResolvedValue(Response.json({ menu: ["cheap", "capable"], generated }));
    const configs: Record<string, unknown>[] = [];
    render(
      <Harness
        initial={{ routerStrategy: "decision-openai" }}
        onConfig={(config) => configs.push(config)}
      />
    );

    const cheap = (await screen.findByLabelText("cheap")) as HTMLInputElement;
    expect(cheap.placeholder).toBe(generated.cheap);
    const [, init] = fetchMock.mock.calls[0];
    expect(JSON.parse(String(init?.body))).toEqual({
      strategy: "decision-openai",
      models: ["openai/cheap", "anthropic/capable"],
    });

    fireEvent.change(cheap, { target: { value: "Small, fast; chat" } });
    expect(configs.at(-1)?.decisionModel).toEqual({ descriptions: { cheap: "Small, fast; chat" } });
    fireEvent.change(cheap, { target: { value: "" } });
    expect(configs.at(-1)?.decisionModel).toBeUndefined();
  });

  it("tests a prompt against the unsaved settings and lists probabilities", async () => {
    fetchMock.mockImplementation(async (_url, init) => {
      const body = JSON.parse(String(init?.body));
      if (!body.prompt) return Response.json({ menu: ["cheap", "capable"], generated });
      return Response.json({
        menu: ["cheap", "capable"],
        generated,
        test: {
          status: "selected",
          choice: "capable",
          refused: false,
          confidence: 0.7,
          probabilities: { cheap: 0.25, capable: 0.75 },
          latencyMs: 42,
        },
      });
    });
    render(
      <Harness
        initial={{
          routerStrategy: "decision-openai",
          decisionModel: { model: "router", descriptions: { cheap: "Fast" } },
        }}
        onConfig={() => {}}
      />
    );
    await screen.findByLabelText("cheap");

    fireEvent.change(screen.getByPlaceholderText("Example prompt"), {
      target: { value: "Prove this theorem" },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Test" }));
    });

    await waitFor(() => expect(screen.getByText("0.75")).toBeTruthy());
    const testCall = fetchMock.mock.calls.find(([, init]) =>
      String(init?.body).includes("Prove this theorem")
    );
    expect(JSON.parse(String(testCall?.[1]?.body))).toMatchObject({
      decisionModel: { model: "router", descriptions: { cheap: "Fast" } },
      prompt: "Prove this theorem",
    });
    expect(document.body.textContent).toContain("42 ms");
  });
});
