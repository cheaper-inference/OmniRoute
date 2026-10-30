import test from "node:test";
import assert from "node:assert/strict";

import { KimiExecutor } from "../../open-sse/executors/kimi.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

const PROVIDERS = ["kimi-coding", "kimi-coding-apikey"];
const MODELS = ["k3.1-pro", "k3.1-pro-highspeed"];
const PROTOCOLS = [FORMATS.OPENAI, FORMATS.CLAUDE];
const LIVE_POLICY = {
  supportsThinking: true,
  alwaysThinking: true,
  supportedThinkingEfforts: ["low", "high", "max"],
  defaultThinkingEffort: "max",
};

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function transform(
  provider: string,
  model: string,
  protocol: string,
  body: Record<string, unknown>
): Record<string, unknown> {
  const executor = new KimiExecutor(provider);
  return executor.transformRequest(model, body, false, {
    apiKey: "test-key",
    providerSpecificData: {
      _omnirouteKimiTargetFormat: protocol,
      _omnirouteKimiThinking: LIVE_POLICY,
    },
  }) as Record<string, unknown>;
}

function effectiveEffort(body: Record<string, unknown>, protocol: string): unknown {
  const thinking = asRecord(body.thinking);
  if (thinking?.type === "disabled") return "disabled";
  return protocol === FORMATS.OPENAI ? thinking?.effort : asRecord(body.output_config)?.effort;
}

test("K3.1 live policy maps all effort tiers on both Coding providers and protocols", () => {
  const cases: Array<[Record<string, unknown>, string]> = [
    [{}, "max"],
    [{ thinking: { type: "enabled" } }, "max"],
    [{ reasoning_effort: "low" }, "low"],
    [{ reasoning_effort: "high" }, "high"],
    [{ reasoning_effort: "max" }, "max"],
    [{ reasoning_effort: "medium" }, "high"],
    [{ reasoning_effort: "minimum" }, "low"],
    [{ reasoning_effort: "light" }, "low"],
    [{ reasoning_effort: "xhigh" }, "max"],
    [{ reasoning_effort: "ultra" }, "max"],
    [{ reasoning_effort: "mystery" }, "mystery"],
    [{ reasoning_effort: "on" }, "on"],
    [{ reasoning_effort: "auto" }, "auto"],
    [{ reasoning_effort: "" }, ""],
    [{ reasoning_effort: "none" }, "disabled"],
    [{ reasoning_effort: "off" }, "disabled"],
    [{ reasoning_effort: "disabled" }, "disabled"],
  ];

  for (const provider of PROVIDERS) {
    for (const model of MODELS) {
      for (const protocol of PROTOCOLS) {
        for (const [input, expected] of cases) {
          const output = transform(provider, model, protocol, {
            ...input,
            messages: [{ role: "user", content: "hi" }],
          });
          const label = `${provider}/${model} (${protocol}): ${JSON.stringify(input)}`;
          assert.equal(effectiveEffort(output, protocol), expected, label);
          assert.equal(output.reasoning_effort, undefined, label);
          assert.equal(output.reasoning, undefined, label);
          assert.equal(output.enable_thinking, undefined, label);
        }
      }
    }
  }
});

test("K3.1 explicit effort wins over disabled flags without enabling disabled-only requests", () => {
  const cases: Array<[Record<string, unknown>, string]> = [
    [{ reasoning_effort: "low", thinking: { type: "disabled" } }, "low"],
    [{ reasoning_effort: "high", enable_thinking: false }, "high"],
    [{ thinking: { type: "enabled", effort: "high" }, enable_thinking: false }, "high"],
    [
      {
        reasoning: { effort: "medium" },
        enable_thinking: false,
        thinking: { type: "disabled" },
      },
      "high",
    ],
    [{ enable_thinking: false }, "disabled"],
    [{ thinking: { type: "disabled" } }, "disabled"],
  ];

  for (const provider of PROVIDERS) {
    for (const model of MODELS) {
      for (const protocol of PROTOCOLS) {
        for (const [input, expected] of cases) {
          const output = transform(provider, model, protocol, input);
          const label = `${provider}/${model} (${protocol}): ${JSON.stringify(input)}`;
          assert.equal(effectiveEffort(output, protocol), expected, label);
          assert.equal(output.reasoning_effort, undefined, label);
          assert.equal(output.reasoning, undefined, label);
          assert.equal(output.enable_thinking, undefined, label);
        }
      }
    }
  }
});

test("K3.1 preserves explicit non-string efforts for upstream rejection", () => {
  for (const provider of PROVIDERS) {
    for (const model of MODELS) {
      for (const protocol of PROTOCOLS) {
        for (const value of [123, true, false, null, {}, []]) {
          const output = transform(provider, model, protocol, { reasoning_effort: value });
          assert.deepEqual(
            effectiveEffort(output, protocol),
            value,
            `${provider}/${model} (${protocol}): ${JSON.stringify(value)}`
          );
          assert.equal(output.enable_thinking, undefined);
        }
      }
    }
  }
});

test("K3.1 native OpenAI and Anthropic effort fields use the same compatibility mapping", () => {
  for (const provider of PROVIDERS) {
    for (const model of MODELS) {
      const openAI = transform(provider, model, FORMATS.OPENAI, {
        thinking: { type: "enabled", effort: "medium" },
      });
      const anthropic = transform(provider, model, FORMATS.CLAUDE, {
        thinking: { type: "enabled" },
        output_config: { effort: "light" },
      });
      assert.equal(effectiveEffort(openAI, FORMATS.OPENAI), "high");
      assert.equal(effectiveEffort(anthropic, FORMATS.CLAUDE), "low");
    }
  }
});

test("K3.1 recognizes provider-prefixed model ids in the executor", () => {
  for (const provider of PROVIDERS) {
    const alias = provider === "kimi-coding" ? "kmc" : "kmca";
    for (const prefix of [provider, alias]) {
      for (const model of MODELS.flatMap((model) => [model, `kimi-${model}`])) {
        for (const protocol of PROTOCOLS) {
          const namespaced = `${prefix}/${model}`;
          const output = transform(provider, namespaced, protocol, {});
          assert.equal(effectiveEffort(output, protocol), "max", namespaced);

          const disabled = transform(provider, namespaced, protocol, { enable_thinking: false });
          assert.equal(effectiveEffort(disabled, protocol), "disabled", namespaced);
          assert.equal(disabled.enable_thinking, undefined, namespaced);

          const unknown = transform(provider, namespaced, protocol, {
            reasoning_effort: "mystery",
          });
          assert.equal(effectiveEffort(unknown, protocol), "mystery", namespaced);
        }
      }
    }
  }
});

test("legacy Kimi models keep their prior enable_thinking behavior", () => {
  for (const model of ["k3", "kimi-for-coding"]) {
    for (const protocol of PROTOCOLS) {
      const output = transform("kimi-coding", model, protocol, { enable_thinking: false });
      assert.equal(output.enable_thinking, false, `${model} (${protocol})`);
      assert.equal(effectiveEffort(output, protocol), "max", `${model} (${protocol})`);
    }
  }
});
