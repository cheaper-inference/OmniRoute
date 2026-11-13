// Exit usage summary (architecture 12.3): fetched after child exit, before revoke, silent on failure.

import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { createPlan, defineAdapter, findTokenSites } from "../../../../bin/cli/launch/contract.mjs";
import { runLaunch } from "../../../../bin/cli/launch/core/pipeline.mjs";

const TOKEN = "olx_secret_session_token_value";
const SUMMARY = {
  sessionId: "s1",
  toolId: "fake",
  requests: 4,
  errors: 0,
  inputTokens: 1200,
  outputTokens: 345,
  costUsd: 0.12345,
  models: [
    { id: "openai/gpt-5.2", requests: 3 },
    { id: "auto/best-coding", requests: 1 },
  ],
  fallbacks: 2,
};

const roots: string[] = [];
test.after(() => {
  for (const dir of roots) rmSync(dir, { recursive: true, force: true });
});

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

async function run(
  opts: {
    flags?: Record<string, unknown>;
    env?: Record<string, string>;
    usage?: () => Promise<unknown>;
    exitCode?: number;
    observers?: Array<{ id: string; on(e: any): void }>;
  } = {}
) {
  const root = mkdtempSync(join(tmpdir(), "olx-summary-"));
  roots.push(root);
  const calls: string[] = [];
  const stdout = sink();
  const stderr = sink();
  const client = {
    capabilities: async () => ({ version: "1" }),
    mint: async () => ({ sessionId: "s1", token: TOKEN }),
    patchView: async () => undefined,
    heartbeat: async () => undefined,
    usage: async () => {
      calls.push("usage");
      return opts.usage ? opts.usage() : SUMMARY;
    },
    revoke: async () => void calls.push("revoke"),
  };
  const outcome = await runLaunch(
    "fake",
    { yes: true, ...(opts.flags || {}) },
    {
      registry: {
        get: (id: string) => (id === "fake" ? adapter : undefined),
        list: () => [adapter],
      },
      env: { PATH: process.env.PATH ?? "", HOME: root, ...(opts.env || {}) },
      homeDir: root,
      cwd: root,
      dataDir: join(root, "data"),
      stdout,
      stderr,
      isTTY: false,
      observers: opts.observers,
      acquireGateway: async () => ({
        baseUrl: "http://127.0.0.1:1/v1",
        owned: true,
        release: async () => void calls.push("release"),
      }),
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
      execute: async (_plan: unknown, o: any) => {
        await o.afterExit({ exitCode: opts.exitCode ?? 0 });
        return { exitCode: opts.exitCode ?? 0, warnings: [] };
      },
    }
  );
  return { outcome, calls, stdout, stderr };
}

test("summary: one stderr line with requests, tokens, cost, models, fallbacks", async () => {
  const r = await run();
  assert.equal(r.outcome.exitCode, 0, r.stderr.text);
  const lines = r.stderr.text.split("\n").filter((l) => l.includes("session:"));
  assert.equal(lines.length, 1);
  const line = lines[0];
  assert.match(line, /4 requests/);
  assert.match(line, /1200 in \/ 345 out tokens/);
  assert.match(line, /\$0\.1235/);
  assert.match(line, /openai\/gpt-5\.2 \(3\)/);
  assert.match(line, /auto\/best-coding \(1\)/);
  assert.match(line, /2 fallbacks/);
  assert.equal(r.stdout.text, "");
});

test("summary: usage is fetched before revoke", async () => {
  const r = await run();
  assert.deepEqual(r.calls, ["usage", "revoke", "release"]);
});

test("summary: flags.summary === false skips the usage call and prints nothing", async () => {
  const r = await run({ flags: { summary: false } });
  assert.equal(r.calls.includes("usage"), false);
  assert.equal(r.stderr.text.includes("session:"), false);
  assert.equal(r.calls.includes("revoke"), true);
});

test("summary: OMNIROUTE_LAUNCH_SUMMARY=0 skips the usage call", async () => {
  const r = await run({ env: { OMNIROUTE_LAUNCH_SUMMARY: "0" } });
  assert.equal(r.calls.includes("usage"), false);
  assert.equal(r.stderr.text.includes("session:"), false);
});

test("summary: usage throwing keeps the exit code and prints nothing", async () => {
  const r = await run({
    exitCode: 5,
    usage: async () => {
      throw new Error("boom");
    },
  });
  assert.equal(r.outcome.exitCode, 5);
  assert.equal(r.stderr.text.includes("session:"), false);
  assert.equal(r.stderr.text.includes("boom"), false);
  assert.deepEqual(r.calls, ["usage", "revoke", "release"]);
});

test("summary: usage returning null keeps the exit code and prints nothing", async () => {
  const r = await run({ exitCode: 6, usage: async () => null });
  assert.equal(r.outcome.exitCode, 6);
  assert.equal(r.stderr.text.includes("session:"), false);
});

test("summary: a session.summary event reaches an injected observer", async () => {
  const events: any[] = [];
  const r = await run({ observers: [{ id: "spy", on: (e: any) => void events.push(e) }] });
  assert.equal(r.outcome.exitCode, 0);
  const ev = events.find((e) => e.type === "session.summary");
  assert.ok(ev, `events: ${events.map((e) => e.type).join(", ")}`);
  assert.deepEqual(ev.summary, SUMMARY);
  const types = events.map((e) => e.type);
  assert.ok(types.indexOf("child.exited") < types.indexOf("session.summary"));
});

test("summary: json mode does not print the summary text on stderr", async () => {
  const r = await run({ flags: { json: true } });
  assert.equal(r.stderr.text.includes("session:"), false);
  assert.equal(JSON.parse(r.stdout.text).summary.requests, 4);
  assert.equal(r.stderr.text.includes(TOKEN) || r.stdout.text.includes(TOKEN), false);
});
