import test from "node:test";
import assert from "node:assert/strict";

import { applyFieldDowngradeRecovery } from "../../open-sse/executors/base/fieldDowngradeRecovery.ts";
import { applyReasoningEffortRecovery } from "../../open-sse/executors/base/reasoningEffortRecovery.ts";
import { KimiExecutor } from "../../open-sse/executors/kimi.ts";
import { MoonshotExecutor } from "../../open-sse/executors/moonshot.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

const MODELS = ["kimi-k3.1-pro", "kimi-k3.1-pro-highspeed", "k3.1-pro", "k3.1-pro-highspeed"];
const INVALID_EFFORTS = [
  "none",
  "off",
  "disabled",
  "mystery",
  "on",
  "auto",
  123,
  true,
  false,
  null,
  {},
  [],
];
const LIVE_POLICY = {
  supportsThinking: true,
  alwaysThinking: true,
  supportedThinkingEfforts: ["low", "high", "max"],
  defaultThinkingEffort: "max",
};
const REJECTION = JSON.stringify({
  error: { message: "Unsupported parameter: reasoning_effort; expected one of low, high, max" },
});

async function recover(model: string, body: Record<string, unknown>, rejectedField: string) {
  const originalBody = structuredClone(body);
  const strippedFields = new Set<string>();
  const sentBodies: unknown[] = [];
  const message = ["thinking", "reasoning"].includes(rejectedField)
    ? "model does not support thinking"
    : `Unsupported parameter: ${rejectedField}`;
  const response = new Response(JSON.stringify({ error: { message } }), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
  const result = await applyFieldDowngradeRecovery({
    response,
    url: "https://upstream.example/v1/chat/completions",
    provider: model.startsWith("kimi-") ? "moonshot" : "kimi-coding",
    model,
    body,
    fetchOptions: { method: "POST" },
    fetchFn: async (_url, init) => {
      sentBodies.push(JSON.parse(String(init.body)));
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    },
    serializeBody: (value) => JSON.stringify(value),
    strippedFields,
    log: null,
  });
  return { result, response, originalBody, strippedFields, sentBodies };
}

test("K3.1 explicit off-thinking and invalid efforts preserve the original 400", async () => {
  for (const model of MODELS) {
    for (const effort of INVALID_EFFORTS) {
      const body = { model, reasoning_effort: effort, messages: [] };
      const { result, response, originalBody, strippedFields, sentBodies } = await recover(
        model,
        body,
        "reasoning_effort"
      );
      const label = `${model}: ${JSON.stringify(effort)}`;
      assert.equal(result, response, label);
      assert.equal(response.status, 400, label);
      assert.equal(sentBodies.length, 0, label);
      assert.deepEqual(body, originalBody, label);
      assert.equal(strippedFields.size, 0, label);
      assert.match(await response.text(), /Unsupported parameter/, label);
    }
  }
});

test("K3.1 Coding wire bodies cannot downgrade disabled or unknown effort after a 400", async () => {
  const cases: Array<[Record<string, unknown>, string]> = [
    [{ thinking: { type: "disabled" } }, "thinking"],
    [{ enable_thinking: false, reasoning: {} }, "reasoning"],
    [{ thinking: { type: "enabled", effort: "mystery" } }, "thinking"],
    [{ thinking: { type: "enabled", effort: 123 } }, "thinking"],
    [{ reasoning: { effort: "mystery" } }, "reasoning"],
    [{ reasoning: { effort: null } }, "reasoning"],
  ];

  for (const model of ["k3.1-pro", "k3.1-pro-highspeed"]) {
    for (const [fields, rejectedField] of cases) {
      const body = { model, ...fields, messages: [] };
      const { result, response, originalBody, sentBodies } = await recover(
        model,
        body,
        rejectedField
      );
      const label = `${model}: ${JSON.stringify(fields)}`;
      assert.equal(result, response, label);
      assert.equal(sentBodies.length, 0, label);
      assert.deepEqual(body, originalBody, label);
    }
  }
});

test("K3.1 reasoning recovery does not clamp or probe invalid efforts", async () => {
  for (const [provider, model] of [
    ["moonshot", "kimi-k3.1-pro"],
    ["kimi", "kimi-k3.1-pro-highspeed"],
    ["kimi-coding", "k3.1-pro"],
    ["kimi-coding-apikey", "k3.1-pro-highspeed"],
  ]) {
    for (const effort of ["mystery", "on", "auto", 123, false, null]) {
      const body = { model, reasoning_effort: effort };
      const originalBody = structuredClone(body);
      const response = new Response(REJECTION, { status: 400 });
      let retries = 0;
      const result = await applyReasoningEffortRecovery({
        response,
        url: "https://upstream.example/v1/chat/completions",
        provider,
        model,
        body,
        fetchOptions: { method: "POST" },
        fetchFn: async () => {
          retries += 1;
          return new Response(JSON.stringify({ ok: true }), { status: 200 });
        },
        log: null,
      });
      const label = `${provider}/${model}: ${JSON.stringify(effort)}`;
      assert.equal(result.response, response, label);
      assert.equal(result.retried, false, label);
      assert.equal(result.attempted, false, label);
      assert.equal(retries, 0, label);
      assert.deepEqual(body, originalBody, label);
    }
  }
});

test("K3.1 still recovers an unrelated rejected field for a valid effort", async () => {
  const body = {
    model: "kimi-k3.1-pro",
    reasoning_effort: "high",
    diagnostics: { client: "test" },
    messages: [{ role: "user", content: "hi" }],
  };
  const { result, strippedFields, sentBodies } = await recover(
    "kimi-k3.1-pro",
    body,
    "diagnostics"
  );

  assert.equal(result.status, 200);
  assert.equal(sentBodies.length, 1);
  assert.deepEqual(sentBodies[0], {
    model: "kimi-k3.1-pro",
    reasoning_effort: "high",
    messages: [{ role: "user", content: "hi" }],
  });
  assert.deepEqual([...strippedFields], ["diagnostics"]);
});

function credentials(provider: string, protocol: string) {
  return {
    apiKey: "test-key",
    providerSpecificData:
      provider === "moonshot" || provider === "kimi"
        ? {}
        : {
            _omnirouteKimiTargetFormat: protocol,
            _omnirouteKimiThinking: LIVE_POLICY,
          },
  };
}

async function assertExecutePreserves400(
  executor: KimiExecutor | MoonshotExecutor,
  provider: string,
  model: string,
  protocol: string,
  effort: unknown
) {
  const creds = credentials(provider, protocol);
  const input = { model, reasoning_effort: effort, messages: [{ role: "user", content: "hi" }] };
  const expected = executor.transformRequest(model, structuredClone(input), false, creds);
  const captured: unknown[] = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (_url: unknown, init: RequestInit = {}) => {
    captured.push(JSON.parse(String(init.body)));
    return new Response(REJECTION, {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
  try {
    const result = await executor.execute({
      model,
      body: structuredClone(input),
      stream: false,
      credentials: creds,
    });
    assert.equal(result.response.status, 400);
  } finally {
    globalThis.fetch = originalFetch;
  }
  const label = `${provider}/${model} (${protocol}): ${JSON.stringify(effort)}`;
  assert.equal(captured.length, 1, `${label}: ${JSON.stringify(captured)}`);
  assert.deepEqual(captured[0], expected, label);
}

test("Moonshot does not retry a whitespace-padded effort with a default", async () => {
  for (const provider of ["moonshot", "kimi"]) {
    for (const model of ["kimi-k3.1-pro", "kimi-k3.1-pro-highspeed"]) {
      await assertExecutePreserves400(
        new MoonshotExecutor(provider),
        provider,
        model,
        FORMATS.OPENAI,
        " high "
      );
    }
  }
});

test("full executor chains preserve K3.1 invalid-effort 400s without a retry", async () => {
  for (const provider of ["moonshot", "kimi"]) {
    for (const model of ["kimi-k3.1-pro", "kimi-k3.1-pro-highspeed"]) {
      for (const effort of ["mystery", 123, null, "none"]) {
        await assertExecutePreserves400(
          new MoonshotExecutor(provider),
          provider,
          model,
          FORMATS.OPENAI,
          effort
        );
      }
    }
  }
  for (const provider of ["kimi-coding", "kimi-coding-apikey"]) {
    for (const model of ["k3.1-pro", "k3.1-pro-highspeed"]) {
      for (const protocol of [FORMATS.OPENAI, FORMATS.CLAUDE]) {
        for (const effort of ["mystery", 123, null, "none"]) {
          await assertExecutePreserves400(
            new KimiExecutor(provider),
            provider,
            model,
            protocol,
            effort
          );
        }
      }
    }
  }
});
