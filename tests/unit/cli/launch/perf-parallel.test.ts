// runLaunch runs independent steps concurrently (binary + version probe with the gateway chain,
// capabilities with mint, catalog with connected providers, health with the binary in previews)
// while consuming every result in the original order. No timing assertions: deferred promises
// prove what is in flight, and the error-precedence cases prove the surfaced error is unchanged.

import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import {
  LaunchError,
  createPlan,
  defineAdapter,
  findTokenSites,
} from "../../../../bin/cli/launch/contract.mjs";
import { runLaunch } from "../../../../bin/cli/launch/core/pipeline.mjs";

type Deferred<T> = {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (error: unknown) => void;
};

function deferred<T>(): Deferred<T> {
  let resolve!: (value: T) => void;
  let reject!: (error: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

/** Yield to the event loop until `condition()` holds; false after `rounds` turns. */
async function until(condition: () => boolean, rounds = 200) {
  for (let i = 0; i < rounds; i++) {
    if (condition()) return true;
    await new Promise((resolve) => setImmediate(resolve));
  }
  return condition();
}

const unhandled: unknown[] = [];
const onUnhandled = (reason: unknown) => void unhandled.push(reason);
process.on("unhandledRejection", onUnhandled);

const roots: string[] = [];
test.after(() => {
  process.off("unhandledRejection", onUnhandled);
  for (const dir of roots) rmSync(dir, { recursive: true, force: true });
});

const TOKEN = "olx_parallel_session_token";
const ROW = { id: "openai/gpt-5.2", capabilities: ["tools"], context_length: 200000 };

const adapter = defineAdapter({
  contract: { major: 1, minor: 1 },
  id: "fake",
  binaries: ["fake-tool"],
  capabilities: {
    protocol: "openai-chat",
    modelList: { strategy: "inject", view: { name: "fake", filter: {}, order: "preferences" } },
    model: "optional",
    install: { commands: { any: ["npm i -g fake-tool"] } },
    supportsProfile: false,
    platforms: ["linux", "darwin", "win32"],
    tier: "core",
    passthrough: [],
  },
  plan(ctx) {
    const base = createPlan("fake", {
      argv: ["fake-tool"],
      env: { set: { FAKE_KEY: "${TOKEN}" } },
      modelList: { strategy: "inject", viewHash: ctx.view.hash, injected: ctx.view.rows.length },
    });
    return { ...base, secretSites: findTokenSites(base) };
  },
});

function sink() {
  let text = "";
  return {
    write: (chunk: string) => ((text += chunk), true),
    get text() {
      return text;
    },
  };
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

type Session = { sessionId: string; token: string };
type Client = {
  capabilities: () => Promise<unknown>;
  mint: () => Promise<Session>;
  patchView: () => Promise<unknown>;
  heartbeat: () => Promise<unknown>;
  usage: () => Promise<unknown>;
  revoke: (session: Session) => Promise<unknown>;
};

function makeClient(overrides: Partial<Client> = {}) {
  const revoked: string[] = [];
  const client: Client = {
    capabilities: async () => ({ version: "1" }),
    mint: async () => ({ sessionId: "s1", token: TOKEN }),
    patchView: async () => undefined,
    heartbeat: async () => undefined,
    usage: async () => null,
    revoke: async (session) => void revoked.push(session.sessionId),
    ...overrides,
  };
  return { client, revoked };
}

/** Default fetch: catalog with one row, providers route says openai. */
function defaultFetch(url: string) {
  if (url.endsWith("/api/launch/providers")) return Promise.resolve(json({ prefixes: ["openai"] }));
  if (url.endsWith("/v1/models")) return Promise.resolve(json({ data: [ROW] }));
  return Promise.resolve(json({}, 404));
}

const missingBinary = async () => {
  throw new LaunchError("ToolNotFound", "fake: binary not found (fake-tool)");
};

async function launch(
  deps: Record<string, unknown> = {},
  flags: Record<string, unknown> = {},
  client = makeClient().client
) {
  const root = mkdtempSync(join(tmpdir(), "olx-parallel-"));
  roots.push(root);
  const stdout = sink();
  const stderr = sink();
  const outcome = await runLaunch(
    "fake",
    { yes: true, ...flags },
    {
      registry: {
        get: (id: string) => (id === "fake" ? adapter : undefined),
        list: () => [adapter],
      },
      env: { PATH: process.env.PATH ?? "", HOME: root },
      homeDir: root,
      cwd: root,
      dataDir: join(root, "data"),
      stdout,
      stderr,
      isTTY: false,
      acquireGateway: async () => ({
        baseUrl: "http://127.0.0.1:1/v1",
        owned: true,
        release: async () => undefined,
      }),
      createSessionClient: () => client,
      fetch: defaultFetch,
      resolveBinary: async () => ({ command: "fake-tool", shell: false }),
      probeTool: async () => ({ version: "1.0.0", features: {}, warnings: [] }),
      probeHealth: async () => true,
      loadPreferences: () => ({ favorites: [], recent: [] }),
      recordPreference: () => undefined,
      writeLastLaunch: () => undefined,
      readToolDefaults: () => undefined,
      readLastLaunch: () => undefined,
      evaluatePreflight: async () => [],
      execute: async (_plan: unknown, o: { afterExit: (r: { exitCode: number }) => unknown }) => {
        await o.afterExit({ exitCode: 0 });
        return { exitCode: 0, warnings: [] };
      },
      ...deps,
    }
  );
  return { outcome, stdout, stderr };
}

test("capabilities and mint are both in flight before either resolves", async () => {
  const caps = deferred<unknown>();
  const mint = deferred<Session>();
  const started: string[] = [];
  const { client, revoked } = makeClient({
    capabilities: () => (started.push("capabilities"), caps.promise),
    mint: () => (started.push("mint"), mint.promise),
  });
  const running = launch({}, {}, client);
  assert.equal(await until(() => started.length === 2), true, `started: ${started.join(",")}`);
  assert.deepEqual(started, ["capabilities", "mint"]);
  mint.resolve({ sessionId: "s1", token: TOKEN });
  caps.resolve({ version: "1" });
  const r = await running;
  assert.equal(r.outcome.exitCode, 0, r.stderr.text);
  assert.equal(r.outcome.sessionId, "s1");
  assert.deepEqual(revoked, ["s1"]);
});

test("catalog and connected providers are both in flight before either resolves", async () => {
  const catalog = deferred<Response>();
  const providers = deferred<Response>();
  const started: string[] = [];
  const fetch = (url: string) => {
    if (url.endsWith("/v1/models")) return (started.push("catalog"), catalog.promise);
    if (url.endsWith("/api/launch/providers"))
      return (started.push("providers"), providers.promise);
    return Promise.resolve(json({}, 404));
  };
  const running = launch({ fetch });
  assert.equal(await until(() => started.length === 2), true, `started: ${started.join(",")}`);
  assert.deepEqual(started, ["catalog", "providers"]);
  providers.resolve(json({ prefixes: ["openai"] }));
  catalog.resolve(json({ data: [ROW] }));
  const r = await running;
  assert.equal(r.outcome.exitCode, 0, r.stderr.text);
  assert.deepEqual(r.outcome.warnings, []);
});

test("--all-models still makes no providers request", async () => {
  const urls: string[] = [];
  const r = await launch(
    { fetch: (url: string) => (urls.push(url), defaultFetch(url)) },
    { allModels: true }
  );
  assert.equal(r.outcome.exitCode, 0, r.stderr.text);
  assert.equal(
    urls.some((u) => u.endsWith("/api/launch/providers")),
    false
  );
});

test("the version probe starts before the gateway acquire resolves", async () => {
  const gateway = deferred<unknown>();
  const started: string[] = [];
  const running = launch({
    acquireGateway: () => (started.push("gateway"), gateway.promise),
    resolveBinary: async () => (started.push("binary"), { command: "fake-tool", shell: false }),
    probeTool: async () => (
      started.push("probe"),
      { version: "1.0.0", features: {}, warnings: [] }
    ),
  });
  assert.equal(await until(() => started.includes("probe")), true, `started: ${started}`);
  gateway.resolve({
    baseUrl: "http://127.0.0.1:1/v1",
    owned: true,
    release: async () => undefined,
  });
  const r = await running;
  assert.equal(r.outcome.exitCode, 0, r.stderr.text);
});

test("capabilities fails, mint succeeds: the capabilities error, and the session is revoked", async () => {
  const { client, revoked } = makeClient({
    capabilities: async () => {
      throw new LaunchError("GatewayTooOld", "launch capabilities: endpoint not found (HTTP 404)");
    },
    mint: async () => ({ sessionId: "orphan", token: TOKEN }),
  });
  const r = await launch({}, {}, client);
  assert.equal(r.outcome.error?.code, "GatewayTooOld");
  assert.equal(r.outcome.sessionId, undefined);
  assert.deepEqual(revoked, ["orphan"]);
});

test("capabilities and mint both fail: the capabilities error, nothing revoked", async () => {
  const { client, revoked } = makeClient({
    capabilities: async () => {
      throw new LaunchError("GatewayTooOld", "launch capabilities: endpoint not found (HTTP 404)");
    },
    mint: async () => {
      throw new LaunchError("AuthFailed", "session mint was refused (HTTP 401)");
    },
  });
  const r = await launch({}, {}, client);
  assert.equal(r.outcome.error?.code, "GatewayTooOld");
  assert.deepEqual(revoked, []);
});

test("empty catalog + providers 404: NoProviders and no providers warning", async () => {
  const fetch = (url: string) => {
    if (url.endsWith("/v1/models")) return Promise.resolve(json({ data: [] }));
    return Promise.resolve(json({ error: "nope" }, 404));
  };
  const r = await launch({ fetch });
  assert.equal(r.outcome.error?.code, "NoProviders");
  assert.match(r.outcome.error?.message ?? "", /catalog is empty/);
  assert.deepEqual(r.outcome.warnings, []);
  assert.equal(r.stderr.text.includes("connected providers"), false);
});

test("catalog fails + providers 404: the catalog error and no providers warning", async () => {
  const fetch = (url: string) => {
    if (url.endsWith("/v1/models")) return Promise.resolve(json({}, 401));
    return Promise.resolve(json({}, 404));
  };
  const r = await launch({ fetch });
  assert.equal(r.outcome.error?.code, "AuthFailed");
  assert.deepEqual(r.outcome.warnings, []);
});

test("gateway acquire fails + binary missing: the gateway error", async () => {
  const r = await launch({
    acquireGateway: async () => {
      throw new LaunchError("GatewayUnreachable", "OmniRoute is not reachable at x");
    },
    resolveBinary: missingBinary,
  });
  assert.equal(r.outcome.error?.code, "GatewayUnreachable");
  assert.deepEqual(r.outcome.warnings, []);
});

test("mint fails + binary missing: the mint error", async () => {
  const { client } = makeClient({
    mint: async () => {
      throw new LaunchError("AuthFailed", "session mint was refused (HTTP 401)");
    },
  });
  const r = await launch({ resolveBinary: missingBinary }, {}, client);
  assert.equal(r.outcome.error?.code, "AuthFailed");
});

test("version probe fails + catalog fails: the catalog error", async () => {
  const r = await launch({
    fetch: (url: string) =>
      url.endsWith("/v1/models") ? Promise.resolve(json({}, 500)) : defaultFetch(url),
    probeTool: async () => {
      throw new LaunchError("ToolVersionTooOld", "fake 0.1 is older than 1.0");
    },
  });
  assert.equal(r.outcome.error?.code, "GatewayUnreachable");
});

test("binary missing alone still surfaces ToolNotFound after the gateway chain", async () => {
  const r = await launch({ resolveBinary: missingBinary });
  assert.equal(r.outcome.error?.code, "ToolNotFound");
});

test("dry-run: health and binary/probe are in flight together", async () => {
  const health = deferred<boolean>();
  const started: string[] = [];
  const running = launch(
    {
      probeHealth: () => (started.push("health"), health.promise),
      probeTool: async () => (
        started.push("probe"),
        { version: "1.0.0", features: {}, warnings: [] }
      ),
    },
    { dryRun: true }
  );
  assert.equal(await until(() => started.includes("probe")), true, `started: ${started}`);
  assert.equal(started[0], "health");
  health.resolve(true);
  const r = await running;
  assert.equal(r.outcome.exitCode, 0, r.stderr.text);
});

test("doctor: warnings keep their order (catalog, binary); a dropped providers request is aborted", async () => {
  const providerSignals: AbortSignal[] = [];
  const r = await launch(
    {
      fetch: (url: string, init: { signal?: AbortSignal } = {}) => {
        if (url.endsWith("/v1/models")) return Promise.resolve(json({}, 500));
        if (init.signal) providerSignals.push(init.signal);
        return Promise.resolve(json({}, 404));
      },
      resolveBinary: missingBinary,
    },
    { doctor: true }
  );
  assert.deepEqual(r.outcome.warnings, [
    "catalog not read: model catalog failed (HTTP 500)",
    "fake: binary not found (fake-tool)",
  ]);
  assert.equal(
    providerSignals.every((signal) => signal.aborted),
    true
  );
});

test("doctor: providers warning comes after the catalog and before the probe warnings", async () => {
  const r = await launch(
    {
      fetch: (url: string) =>
        url.endsWith("/v1/models") ? Promise.resolve(json({ data: [ROW] })) : json({}, 404),
      probeTool: async () => ({ version: "1.0.0", features: {}, warnings: ["probe says hi"] }),
    },
    { doctor: true }
  );
  assert.deepEqual(r.outcome.warnings, [
    "this gateway does not report connected providers; showing every catalog model",
    "probe says hi",
  ]);
});

test("no unhandled rejections from steps started early", async () => {
  await new Promise((resolve) => setTimeout(resolve, 20));
  assert.deepEqual(unhandled, []);
});
