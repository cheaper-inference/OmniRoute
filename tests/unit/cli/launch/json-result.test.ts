// `--json` with a real launch: one JSON document on stdout after exit.

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

type ExecOpts = { afterExit: (result: { exitCode: number }) => Promise<unknown> | unknown };

const TOKEN = "olx_secret_session_token_value";
const SUMMARY = { sessionId: "s1", toolId: "fake", requests: 2, inputTokens: 10, outputTokens: 5 };

const roots: string[] = [];
test.after(() => {
  for (const dir of roots) rmSync(dir, { recursive: true, force: true });
});

function makeAdapter(planWarnings: string[] = []) {
  return defineAdapter({
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
        warnings: planWarnings,
        modelList: { strategy: "inject", viewHash: ctx.view.hash, injected: ctx.view.rows.length },
      });
      return { ...base, secretSites: findTokenSites(base) };
    },
  });
}

function sink() {
  let text = "";
  return {
    write: (chunk: string) => ((text += chunk), true),
    get text() {
      return text;
    },
  };
}

async function run(
  opts: {
    toolId?: string;
    flags?: Record<string, unknown>;
    adapter?: ReturnType<typeof makeAdapter>;
    acquireGateway?: () => Promise<unknown>;
    exitCode?: number;
  } = {}
) {
  const root = mkdtempSync(join(tmpdir(), "olx-json-"));
  roots.push(root);
  const adapter = opts.adapter ?? makeAdapter();
  const stdout = sink();
  const stderr = sink();
  const client = {
    capabilities: async () => ({ version: "1" }),
    mint: async () => ({ sessionId: "s1", token: TOKEN }),
    patchView: async () => undefined,
    heartbeat: async () => undefined,
    usage: async () => SUMMARY,
    revoke: async () => undefined,
  };
  const outcome = await runLaunch(
    opts.toolId ?? "fake",
    { yes: true, json: true, ...(opts.flags || {}) },
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
      acquireGateway:
        opts.acquireGateway ??
        (async () => ({
          baseUrl: "http://127.0.0.1:1/v1",
          owned: true,
          release: async () => undefined,
        })),
      createSessionClient: () => client,
      fetch: async () =>
        new Response(
          JSON.stringify({
            data: [{ id: "openai/gpt-5.2", capabilities: ["tools"], context_length: 200000 }],
          }),
          { status: 200, headers: { "content-type": "application/json" } }
        ),
      resolveBinary: async () => ({ command: "fake-tool", shell: false }),
      probeTool: async () => ({ version: "1.0.0", features: {}, warnings: [] }),
      loadPreferences: () => ({ favorites: [], recent: [] }),
      recordPreference: () => undefined,
      writeLastLaunch: () => undefined,
      readToolDefaults: () => undefined,
      readLastLaunch: () => undefined,
      execute: async (_plan: unknown, o: ExecOpts) => {
        await o.afterExit({ exitCode: opts.exitCode ?? 3 });
        return { exitCode: opts.exitCode ?? 3, warnings: [] };
      },
    }
  );
  return { outcome, stdout, stderr };
}

function assertNoToken(r: { stdout: { text: string }; stderr: { text: string } }) {
  assert.equal(r.stdout.text.includes(TOKEN), false, "token in stdout");
  assert.equal(r.stderr.text.includes(TOKEN), false, "token in stderr");
}

test("json: one document {tool, sessionId, exitCode, summary, warnings} after a real launch", async () => {
  const r = await run({ adapter: makeAdapter(["plan says careful"]) });
  assert.equal(r.outcome.exitCode, 3);
  assert.equal(r.outcome.sessionId, "s1");
  assert.equal(r.stdout.text.endsWith("\n"), true);
  const doc = JSON.parse(r.stdout.text);
  assert.deepEqual(Object.keys(doc).sort(), [
    "exitCode",
    "sessionId",
    "summary",
    "tool",
    "warnings",
  ]);
  assert.equal(doc.tool, "fake");
  assert.equal(doc.sessionId, "s1");
  assert.equal(doc.exitCode, 3);
  assert.deepEqual(doc.summary, SUMMARY);
  assert.ok(Array.isArray(doc.warnings));
  assert.ok(doc.warnings.includes("plan says careful"), JSON.stringify(doc.warnings));
  assertNoToken(r);
});

test("json: summary is null when the summary is disabled", async () => {
  const r = await run({ flags: { summary: false } });
  const doc = JSON.parse(r.stdout.text);
  assert.equal(doc.summary, null);
  assert.equal(doc.exitCode, 3);
  assertNoToken(r);
});

test("json: unknown tool prints {error} on stdout and returns exit 2", async () => {
  const r = await run({ toolId: "nope" });
  assert.equal(r.outcome.exitCode, 2);
  const doc = JSON.parse(r.stdout.text);
  assert.deepEqual(Object.keys(doc), ["error"]);
  assert.equal(doc.error.code, "UsageError");
  assert.match(doc.error.message, /unknown tool/);
  assert.match(doc.error.hint, /fake/);
  assert.equal(r.stderr.text.includes("unknown tool"), false);
  assertNoToken(r);
});

test("json: GatewayUnreachable prints {error} on stdout and returns exit 69", async () => {
  const r = await run({
    acquireGateway: async () => {
      throw new LaunchError("GatewayUnreachable", "gateway down", { hint: "start it" });
    },
  });
  assert.equal(r.outcome.exitCode, 69);
  assert.equal(r.outcome.error?.code, "GatewayUnreachable");
  const doc = JSON.parse(r.stdout.text);
  assert.deepEqual(doc.error, {
    code: "GatewayUnreachable",
    message: "gateway down",
    hint: "start it",
  });
  assertNoToken(r);
});
