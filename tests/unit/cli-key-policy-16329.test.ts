import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { Command } from "commander";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-policy-16329-"));
const savedEnv = { ...process.env };
Object.assign(process.env, {
  DATA_DIR: dataDir,
  DISABLE_SQLITE_AUTO_BACKUP: "true",
  OMNIROUTE_CONTEXT_KEYCHAIN_DISABLED: "true",
  JWT_SECRET: "policy-test-jwt",
  INITIAL_PASSWORD: "bootstrap-password",
  API_KEY_SECRET: "policy-test-secret",
  OMNIROUTE_BASE_URL: "http://policy.example.test",
});
delete process.env.OMNIROUTE_API_KEY;
delete process.env.ROUTER_API_KEY;
const core = await import("../../src/lib/db/core.ts");
const db = await import("../../src/lib/db/apiKeys.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const route = await import("../../src/app/api/keys/[id]/route.ts");
const cli = await import("../../bin/cli/commands/keys.mjs");
const originalFetch = globalThis.fetch;
let target: Awaited<ReturnType<typeof db.createApiKey>>;
let manager: Awaited<ReturnType<typeof db.createApiKey>>;
let requests: Request[] = [];

async function capture(run: () => Promise<number>) {
  const output: string[] = [];
  const errors: string[] = [];
  const log = console.log;
  const error = console.error;
  console.log = (...args: unknown[]) => output.push(args.join(" "));
  console.error = (...args: unknown[]) => errors.push(args.join(" "));
  try {
    return { code: await run(), output: output.join("\n"), errors: errors.join("\n") };
  } finally {
    console.log = log;
    console.error = error;
  }
}
function opts(extra: Record<string, unknown> = {}) {
  return { baseUrl: "http://policy.example.test", apiKey: manager.key, ...extra };
}

test.before(async () => {
  await updateSettings({ requireLogin: true, password: "", cloudEnabled: false });
  manager = await db.createApiKey("management", "policy-test", ["manage"]);
});
test.beforeEach(async () => {
  target = await db.createApiKey("inference", "policy-test", [], {
    modelAccessMode: "restricted",
    allowedModels: ["openai/gpt-4o"],
  });
  await db.updateApiKeyPermissions(target.id, {
    rateLimits: [
      { limit: 100, window: 3600 },
      { limit: 5, window: 60 },
    ],
    usageLimitEnabled: true,
    dailyUsageLimitUsd: 2,
    weeklyUsageLimitUsd: 10,
    noLog: true,
  });
  requests = [];
  globalThis.fetch = async (input, init) => {
    const request = new Request(input, init);
    requests.push(request.clone());
    const url = new URL(request.url);
    assert.equal(url.origin, "http://policy.example.test");
    if (url.pathname === "/api/health") return Response.json({ status: "ok" });
    if (url.pathname !== `/api/keys/${target.id}`) return new Response(null, { status: 404 });
    const context = { params: Promise.resolve({ id: target.id }) };
    return request.method === "PATCH" ? route.PATCH(request, context) : route.GET(request, context);
  };
});
test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  db.resetApiKeyState();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const key of Object.keys(process.env)) if (!(key in savedEnv)) delete process.env[key];
  Object.assign(process.env, savedEnv);
});

test("policy show uses authenticated management route and exposes policy without credentials", async () => {
  const result = await capture(() => cli.runKeysPolicyShowCommand(target.id, opts({ json: true })));
  assert.equal(result.code, 0, result.errors);
  const value = JSON.parse(result.output);
  assert.equal(value.modelAccessMode, "restricted");
  assert.deepEqual(value.allowedModels, ["openai/gpt-4o"]);
  assert.equal("key" in value, false);
  assert.equal("machineId" in value, false);
  assert.equal(result.output.includes(target.key), false);
  assert.equal(requests.at(-1)?.headers.get("authorization"), `Bearer ${manager.key}`);
});

test("unrestricted updates read back as all and allow auto without changing unrelated policy", async () => {
  assert.equal(await db.isModelAllowedForKey(target.key, "auto"), false);
  const result = await capture(() =>
    cli.runKeysPolicySetCommand(target.id, opts({ unrestricted: true }))
  );
  assert.equal(result.code, 0, result.errors);
  const after = await db.getApiKeyById(target.id);
  assert.equal(after?.modelAccessMode, "all");
  assert.deepEqual(after?.allowedModels, []);
  assert.equal(after?.weeklyUsageLimitUsd, 10);
  assert.equal(after?.dailyUsageLimitUsd, 2);
  assert.equal(after?.noLog, true);
  assert.deepEqual(after?.scopes, []);
  assert.equal(await db.isModelAllowedForKey(target.key, "auto"), true);
  const readback = await capture(() =>
    cli.runKeysPolicyShowCommand(target.id, opts({ json: true }))
  );
  assert.equal(JSON.parse(readback.output).modelAccessMode, "all");
});

test("explicit empty allowlist selects all, while restricted plus empty denies auto", async () => {
  const cleared = await capture(() =>
    cli.runKeysPolicySetCommand(target.id, opts({ allowedModels: "" }))
  );
  assert.equal(cleared.code, 0, cleared.errors);
  assert.equal(await db.isModelAllowedForKey(target.key, "auto"), true);
  const restricted = await capture(() =>
    cli.runKeysPolicySetCommand(
      target.id,
      opts({ modelAccessMode: "restricted", allowedModels: "" })
    )
  );
  assert.equal(restricted.code, 0, restricted.errors);
  assert.equal(await db.isModelAllowedForKey(target.key, "auto"), false);
});

test("minute rate and daily cost map to schema fields and preserve hour/weekly limits", async () => {
  const result = await capture(() =>
    cli.runKeysPolicySetCommand(target.id, opts({ rateLimit: "12", maxCost: "3.5" }))
  );
  assert.equal(result.code, 0, result.errors);
  const after = await db.getApiKeyById(target.id);
  assert.deepEqual(after?.rateLimits, [
    { limit: 100, window: 3600 },
    { limit: 12, window: 60 },
  ]);
  assert.equal(after?.dailyUsageLimitUsd, 3.5);
  assert.equal(after?.weeklyUsageLimitUsd, 10);
  assert.equal(after?.usageLimitEnabled, true);
  assert.equal(after?.modelAccessMode, "restricted");
});

test("zero daily cost leaves the existing weekly cap enabled", async () => {
  const result = await capture(() =>
    cli.runKeysPolicySetCommand(target.id, opts({ maxCost: "0" }))
  );
  assert.equal(result.code, 0, result.errors);
  const after = await db.getApiKeyById(target.id);
  assert.equal(after?.usageLimitEnabled, true);
  assert.equal(after?.weeklyUsageLimitUsd, 10);
  assert.equal(after?.dailyUsageLimitUsd, null);
  const patch = requests.find((request) => request.method === "PATCH");
  assert.equal((await patch?.json()).dailyUsageLimitUsd, 0);
});

for (const [name, options] of Object.entries({
  "contradictory all/list": { modelAccessMode: "all", allowedModels: "openai/gpt-4o" },
  "contradictory unrestricted/restricted": { unrestricted: true, modelAccessMode: "restricted" },
  "malformed rate": { rateLimit: "12oops" },
  "zero rate": { rateLimit: "0" },
  "negative cost": { maxCost: "-1" },
  "unknown mode": { modelAccessMode: "bogus" },
})) {
  test(`invalid ${name} is rejected before network access`, async () => {
    const result = await capture(() => cli.runKeysPolicySetCommand(target.id, opts(options)));
    assert.equal(result.code, 1);
    assert.equal(requests.length, 0);
  });
}

test("inference-only credentials cannot mutate policy and receive actionable management diagnostic", async () => {
  const result = await capture(() =>
    cli.runKeysPolicySetCommand(target.id, opts({ apiKey: target.key, unrestricted: true }))
  );
  assert.equal(result.code, 1);
  assert.match(result.errors, /401|403/);
  assert.match(result.errors, /management|context/i);
  assert.equal(result.errors.includes(target.key), false);
  assert.equal((await db.getApiKeyById(target.id))?.modelAccessMode, "restricted");
});

test("Commander exposes explicit model access mode and unrestricted alias", () => {
  const program = new Command();
  cli.registerKeys(program);
  const set = program.commands
    .find((c) => c.name() === "keys")
    ?.commands.find((c) => c.name() === "policy")
    ?.commands.find((c) => c.name() === "set");
  assert.ok(set?.options.some((option) => option.long === "--model-access-mode"));
  assert.ok(set?.options.some((option) => option.long === "--unrestricted"));
});

test("transport errors cannot print upstream details or credentials", async () => {
  globalThis.fetch = async (input) => {
    if (String(input).endsWith("/api/health")) return Response.json({ status: "ok" });
    throw new Error(`network failed with secret ${manager.key}`);
  };
  const result = await capture(() => cli.runKeysPolicyShowCommand(target.id, opts()));
  assert.equal(result.code, 1);
  assert.equal(result.errors.includes(manager.key), false);
  assert.match(result.errors, /context/i);
});
