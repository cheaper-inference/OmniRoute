import { after, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "systemone-refusal-"));
process.env.DATA_DIR = testDataDir;
const root = process.env.SYSTEMONE_REPRO_ROOT || process.cwd();
const { handleSystemOneProxy } = await import(
  pathToFileURL(path.join(root, "open-sse/handlers/systemOne.ts")).href
);
const { dispatchSystemOne } = await import(
  pathToFileURL(path.join(root, "src/app/api/v1/systemone/dispatch.ts")).href
);
const { resolveSystemOneCandidates } = await import(
  pathToFileURL(path.join(root, "open-sse/config/systemOneRegistry.ts")).href
);
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
after(() => {
  resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5 });
});
const state = "private request state",
  key = "synthetic-provider-secret";
function proxyOptions(provider = "opencode-zen") {
  return {
    provider,
    canonicalModel: provider + "/jev-1.13-free",
    body: {
      model: "jev-1.13-free",
      state,
      questions: { q: { type: "noul", instructions: "yes?" } },
    },
    credentials: {
      connectionId: "healthy-account",
      apiKey: key,
      providerSpecificData: { systemOneTier: "free" },
    },
    tier: "free" as const,
  };
}
function fake(cooldowns: unknown[]) {
  return {
    withCapacity: async (_o: unknown, _s: unknown, run: () => Promise<Response>) => run(),
    fetchSystemOne: async () =>
      Response.json(
        { error: { type: "FreeTierError", message: state + " " + key } },
        { status: 403 }
      ),
    saveCallLog: async () => {},
    saveRequestUsage: async () => {},
    markAccountUnavailable: async (...args: unknown[]) => {
      cooldowns.push(args);
    },
    recordCost: () => {},
  };
}
test("Zen request-specific refusal preserves safe classification without account or model cooldown", async () => {
  const cooldowns: unknown[] = [];
  const response = await handleSystemOneProxy(proxyOptions(), fake(cooldowns));
  assert.equal(response.status, 403);
  assert.equal(cooldowns.length, 0, "A request refusal penalized the healthy account/model");
  const text = await response.text();
  assert.ok(!text.includes(state) && !text.includes(key));
  assert.equal(JSON.parse(text).error.code, "upstream_request_error");
});
test("the same upstream name on another provider remains a denial of unknown account scope", async () => {
  const cooldowns: unknown[] = [];
  const response = await handleSystemOneProxy(
    {
      ...proxyOptions("openrouter"),
      credentials: { connectionId: "foreign", apiKey: key },
      body: { ...proxyOptions().body, model: "typesafe/jev-1.13" },
      tier: "paid",
    },
    fake(cooldowns)
  );
  assert.equal(response.status, 403);
  assert.equal(cooldowns.length, 0);
  assert.equal(response.headers.get("x-omniroute-provider-error-kind"), "access");
  assert.equal(response.headers.get("x-omniroute-provider-auth-scope"), "unknown");
  assert.notEqual((await response.json()).error.code, "upstream_request_error");
});
test("request-specific refusal is terminal rather than rotating through healthy credentials", async () => {
  let selections = 0,
    calls = 0;
  const cooldowns: unknown[] = [];
  const options = proxyOptions();
  const response = await dispatchSystemOne(
    {
      body: options.body,
      requestedModel: "opencode-zen/jev-1.13-free",
      candidates: resolveSystemOneCandidates("opencode-zen/jev-1.13-free"),
    },
    {
      selectCredentials: async () => ({
        ...options.credentials,
        connectionId: "account-" + ++selections,
      }),
      dispatch: async (o) => {
        calls++;
        return handleSystemOneProxy(o, fake(cooldowns));
      },
      clearRecoveredProviderState: async () => {},
      validateRoutingTarget: async () => null,
    }
  );
  assert.equal(response.status, 403);
  assert.equal(selections, 1);
  assert.equal(calls, 1);
  assert.equal(cooldowns.length, 0);
});
