/**
 * Decision routing, step 4: the TypeSafe System One decider and the credential rules.
 * A credential is only a reference to a stored connection (inside the API key's
 * allowlist, the jevAsk pattern) or an environment variable — never a key in combo config.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  DECISION_API_KEY_ENV,
  resolveDecisionApiKey,
} from "../../../open-sse/services/decision/credentials.ts";
import { createSystemOneDecider } from "../../../open-sse/services/decision/systemOneDecider.ts";
import type { EvaluateSystemOneChoiceOptions } from "../../../open-sse/services/typesafe/systemOne.ts";

type Lookup = (provider: string, allowlist: string[] | null) => Promise<unknown>;

function lookupRecorder(apiKey: string | null) {
  const calls: Array<[string, string[] | null]> = [];
  const lookup: Lookup = async (provider, allowlist) => {
    calls.push([provider, allowlist]);
    return apiKey ? { apiKey, connectionId: allowlist?.[0] ?? "auto" } : null;
  };
  return { calls, lookup };
}

const request = {
  state: "write a sorting function",
  options: { cheap: "Model cheap", capable: "Model capable" },
};

test("credential: a connection outside the API key allowlist is refused without a lookup", async () => {
  const { calls, lookup } = lookupRecorder("ts_key");
  const key = await resolveDecisionApiKey(
    { provider: "typesafe", connectionId: "conn-b", apiKeyAllowedConnections: ["conn-a"] },
    { getCredentials: lookup, env: { [DECISION_API_KEY_ENV]: "env-key" } }
  );
  assert.equal(key, null, "an out-of-scope connection must not fall back to the env key");
  assert.equal(calls.length, 0);
});

test("credential: a referenced connection is read alone; no reference uses the allowlist", async () => {
  const pinned = lookupRecorder("ts_pinned");
  assert.equal(
    await resolveDecisionApiKey(
      { provider: "typesafe", connectionId: "conn-a", apiKeyAllowedConnections: ["conn-a"] },
      { getCredentials: pinned.lookup, env: {} }
    ),
    "ts_pinned"
  );
  assert.deepEqual(pinned.calls, [["typesafe", ["conn-a"]]]);

  const scoped = lookupRecorder("ts_any");
  assert.equal(
    await resolveDecisionApiKey(
      { provider: "typesafe", apiKeyAllowedConnections: ["conn-a", "conn-c"] },
      { getCredentials: scoped.lookup, env: {} }
    ),
    "ts_any"
  );
  assert.deepEqual(scoped.calls, [["typesafe", ["conn-a", "conn-c"]]]);
});

test("credential: the env variable is the fallback; nothing at all is null", async () => {
  const none = lookupRecorder(null);
  assert.equal(
    await resolveDecisionApiKey(
      { provider: "typesafe" },
      { getCredentials: none.lookup, env: { [DECISION_API_KEY_ENV]: "  env-key " } }
    ),
    "env-key"
  );
  assert.equal(
    await resolveDecisionApiKey({ provider: "typesafe" }, { getCredentials: none.lookup, env: {} }),
    null
  );
});

test("credential: a connection of an unknown provider is resolved through the store", async () => {
  const { calls, lookup } = lookupRecorder("sk-openai-compatible");
  const key = await resolveDecisionApiKey(
    { connectionId: "conn-x" },
    {
      getCredentials: lookup,
      getConnectionProvider: async (id) => (id === "conn-x" ? "openai-compatible-x" : null),
      env: {},
    }
  );
  assert.equal(key, "sk-openai-compatible");
  assert.deepEqual(calls, [["openai-compatible-x", ["conn-x"]]]);
  assert.equal(
    await resolveDecisionApiKey(
      { connectionId: "missing" },
      { getCredentials: lookup, getConnectionProvider: async () => null, env: {} }
    ),
    null
  );
});

test("systemone decider: no credential means no call", async () => {
  let evaluated = 0;
  const decide = createSystemOneDecider({
    timeoutMs: 2000,
    resolveApiKey: async () => null,
    evaluate: async () => {
      evaluated += 1;
      throw new Error("must not be called");
    },
  });
  const result = await decide(request);
  assert.equal(evaluated, 0);
  assert.deepEqual(result, { ok: false, reason: "missing_credential" });
});

test("systemone decider: asks the base client with the menu, model and timeout", async () => {
  let seen: EvaluateSystemOneChoiceOptions | undefined;
  const decide = createSystemOneDecider({
    model: "jev-custom",
    timeoutMs: 1500,
    resolveApiKey: async () => "ts_key",
    evaluate: async (options) => {
      seen = options;
      return {
        ok: true,
        choice: "capable",
        probabilities: { cheap: 0.2, capable: 0.8 },
        confidence: 0.8,
        model: "jev-1.13.0",
        inputTokens: 10,
        outputTokens: 2,
      };
    },
  });
  const result = await decide({ ...request, instructions: "pick" });
  assert.equal(seen?.apiKey, "ts_key");
  assert.equal(seen?.model, "jev-custom");
  assert.equal(seen?.timeoutMs, 1500);
  assert.equal(seen?.state, request.state);
  assert.equal(seen?.instructions, "pick");
  assert.deepEqual(seen?.criteria, request.options);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.choice, "capable");
  assert.equal(result.confidence, 0.8);
  assert.equal(result.backendModel, "jev-1.13.0");
});

test("systemone decider: client failures keep their log-safe reason and status", async () => {
  const decide = createSystemOneDecider({
    timeoutMs: 2000,
    resolveApiKey: async () => "ts_key",
    evaluate: async () => ({
      ok: false,
      reason: "http_error",
      status: 503,
      detail: "System One returned HTTP 503",
    }),
  });
  assert.deepEqual(await decide(request), { ok: false, reason: "http_error", status: 503 });
  const missing = createSystemOneDecider({
    timeoutMs: 2000,
    resolveApiKey: async () => "ts_key",
    evaluate: async () => ({ ok: false, reason: "missing_api_key", status: null, detail: "x" }),
  });
  assert.deepEqual(await missing(request), { ok: false, reason: "missing_credential" });
});
