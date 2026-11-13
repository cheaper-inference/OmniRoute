// End-to-end launcher core: stub gateway + fake adapter + fakeTool (architecture 16.2 step 3).

import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { createPlan, defineAdapter, findTokenSites } from "../../../../bin/cli/launch/contract.mjs";
import {
  runLaunch,
  composeModel,
  rejectReserved,
  gateWarnings,
} from "../../../../bin/cli/launch/core/pipeline.mjs";
import { startStubGateway } from "../../../helpers/launch/stubGateway.mjs";
import { FAKE_TOOL_PATH, readFakeToolDump } from "../../../helpers/launch/fakeTool.mjs";

const roots: string[] = [];
function tempRoot(name: string) {
  const dir = mkdtempSync(join(tmpdir(), `olx-pipeline-${name}-`));
  roots.push(dir);
  return dir;
}
test.after(() => {
  for (const dir of roots) rmSync(dir, { recursive: true, force: true });
});

function fakeAdapter(options: {
  strategy?: "inject" | "server-view" | "both";
  exitCode?: number;
  outPath: string;
  extraEnv?: Record<string, string>;
}) {
  const strategy = options.strategy ?? "server-view";
  return defineAdapter({
    contract: { major: 1, minor: 1 },
    id: "fake",
    binaries: ["fake-tool"],
    capabilities: {
      protocol: "openai-chat",
      modelList: {
        strategy,
        view: {
          name: "fake",
          filter: { capabilities: ["tools"], minContextTokens: 64000 },
          order: "preferences",
        },
        ...(strategy !== "inject" ? { serve: { shape: "openai" } } : {}),
      },
      model: "optional",
      install: { commands: { any: ["npm i -g fake-tool"] } },
      supportsProfile: false,
      platforms: ["linux", "darwin", "win32"],
      tier: "core",
      passthrough: [
        { flag: "--config", action: "mergeJson" },
        { flag: "--provider", action: "owned" },
      ],
    },
    plan(ctx) {
      const ids = ctx.view.rows.map((row) => row.id);
      const base = createPlan("fake", {
        argv: [
          FAKE_TOOL_PATH,
          "--file",
          "${TMP}/config.json",
          "--model",
          ctx.model?.id ?? "",
          ...ctx.passthroughArgs,
        ],
        env: {
          set: {
            FAKE_KEY: "${TOKEN}",
            FAKE_TOOL_OUT: options.outPath,
            FAKE_TOOL_EXIT: String(options.exitCode ?? 0),
            FAKE_TOOL_REQUEST: JSON.stringify({
              url: `${ctx.gateway.rootUrl}/v1/chat/completions`,
              body: {
                model: ctx.model?.id,
                stream: true,
                messages: [{ role: "user", content: "hi" }],
              },
              tokenEnv: "FAKE_KEY",
            }),
            ...(options.extraEnv || {}),
          },
          unset: ["OPENAI_API_KEY"],
        },
        tempFiles: [
          {
            path: "config.json",
            contents: ctx.util.json({
              key: "${TOKEN}",
              models: strategy === "server-view" ? [] : ids,
              user: ctx.passthroughJson["--config"] ?? null,
            }),
          },
        ],
        modelList: {
          strategy,
          viewHash: ctx.view.hash,
          injected: strategy === "server-view" ? 0 : ids.length,
        },
      });
      return { ...base, secretSites: findTokenSites(base) };
    },
  });
}

function registryOf(adapter: { id: string }) {
  return { get: (id: string) => (id === adapter.id ? adapter : undefined), list: () => [adapter] };
}

function capture() {
  let text = "";
  return {
    write: (chunk: string) => ((text += chunk), true),
    get text() {
      return text;
    },
  };
}

async function launchAgainst(
  stub: Awaited<ReturnType<typeof startStubGateway>>,
  adapter: object,
  flags: object = {},
  extra: object = {}
) {
  const root = tempRoot("run");
  const tmpRoot = join(root, "tmp");
  const dataDir = join(root, "data");
  mkdirSync(tmpRoot, { recursive: true });
  const releases: string[] = [];
  const stdout = capture();
  const stderr = capture();
  const outcome = await runLaunch(
    "fake",
    { yes: true, ...flags },
    {
      registry: registryOf(adapter as { id: string }),
      env: { PATH: process.env.PATH ?? "", OPENAI_API_KEY: "sk-leak", HOME: root },
      homeDir: root,
      cwd: root,
      dataDir,
      tmpRoot,
      stdout,
      stderr,
      isTTY: false,
      stdio: "ignore",
      acquireGateway: async () => ({
        baseUrl: `${stub.url}/v1`,
        owned: true,
        release: async () => void releases.push("released"),
      }),
      resolveBinary: async () => ({ command: process.execPath, shell: false }),
      probeTool: async () => ({ version: "1.0.0", features: {}, warnings: [] }),
      loadPreferences: () => ({ favorites: [], recent: [] }),
      recordPreference: () => undefined,
      ...extra,
    }
  );
  return { outcome, tmpRoot, dataDir, releases, stdout, stderr };
}

test("end to end: mint, catalog via session token, view PATCH, substituted token, cleanup, DELETE, exit passthrough", async () => {
  const stub = await startStubGateway({ parentKey: "sk-parent" });
  try {
    const outPath = join(tempRoot("out"), "dump.json");
    const adapter = fakeAdapter({ strategy: "server-view", exitCode: 7, outPath });
    const run = await launchAgainst(stub, adapter, {
      apiKey: "sk-parent",
      args: ["--config", '{"theme":"dark"}', "--verbose"],
    });
    assert.equal(run.outcome.exitCode, 7, run.stderr.text);
    assert.deepEqual(run.releases, ["released"]);

    const paths = stub.requests.map(
      (r: { method: string; path: string }) => `${r.method} ${r.path}`
    );
    const mint = stub.requests.find(
      (r: { method: string; path: string }) =>
        r.method === "POST" && r.path === "/api/launch/sessions"
    );
    assert.ok(mint, `mint called: ${paths.join(", ")}`);
    assert.equal(mint.auth, "sk-parent");
    assert.equal(mint.body.tool, "fake");

    const [session] = [...stub.sessions.values()];
    const models = stub.requests.find((r: { path: string }) => r.path === "/v1/models");
    assert.equal(models.auth, session.token, "catalog fetched with the session token");

    assert.ok(session.view, "server-view PATCHed");
    // view: tools capability + >= 64k context, so the small and no-tools rows are gone
    assert.deepEqual(session.view.ids, [
      "anthropic/claude-sonnet-4-6",
      "openai/gpt-5.2",
      "auto/best-coding",
    ]);
    assert.equal(session.revoked, true, "DELETE called");
    assert.ok(
      paths.indexOf("DELETE /api/launch/sessions/" + session.id) >
        paths.indexOf("POST /v1/chat/completions")
    );

    const dump = readFakeToolDump(outPath);
    assert.ok(dump, "fake tool ran");
    assert.equal(dump.env.FAKE_KEY, session.token, "token substituted in env");
    assert.equal(dump.env.OMNIROUTER_SESSION_ID, session.id);
    assert.equal(dump.env.OPENAI_API_KEY, undefined, "unsafe env filtered");
    const model = dump.argv[dump.argv.indexOf("--model") + 1];
    assert.equal(model, "auto/best-coding", "default model is auto/best-coding when in the view");
    assert.ok(session.view.ids.includes(model));
    assert.deepEqual(dump.argv.slice(-1), ["--verbose"], "mergeJson flag removed, other args kept");
    const filePath = dump.argv[dump.argv.indexOf("--file") + 1];
    const file = dump.files[filePath];
    assert.equal(file.mode, 0o600);
    assert.ok(file.contents.includes(session.token), "token substituted in file");
    assert.deepEqual(JSON.parse(file.contents).user, { theme: "dark" });
    assert.equal(dump.request.status, 200, "tool reached the gateway with the session token");
    const completion = stub.requests.find(
      (r: { path: string }) => r.path === "/v1/chat/completions"
    );
    assert.equal(completion.auth, session.token);
    assert.equal(completion.body.model, model);

    assert.equal(existsSync(filePath), false, "temp file gone");
    assert.deepEqual(readdirSync(run.tmpRoot), [], "temp dir gone");
    assert.ok(!run.stderr.text.includes(session.token), "token never printed");
  } finally {
    await stub.close();
  }
});

test("inject strategy does not PATCH a view; --json prints the result; heartbeat runs while the child lives", async () => {
  const stub = await startStubGateway();
  try {
    const outPath = join(tempRoot("out"), "dump.json");
    const adapter = fakeAdapter({
      strategy: "inject",
      outPath,
      extraEnv: { FAKE_TOOL_SLEEP_MS: "300" },
    });
    const run = await launchAgainst(
      stub,
      adapter,
      { json: true, model: "openai/gpt-5.2" },
      { heartbeatMs: 50 }
    );
    assert.equal(run.outcome.exitCode, 0, run.stderr.text);
    const [session] = [...stub.sessions.values()];
    assert.equal(session.view, null);
    assert.ok(session.heartbeats >= 1, `heartbeats ${session.heartbeats}`);
    assert.equal(session.revoked, true);
    const result = JSON.parse(run.stdout.text);
    assert.equal(result.tool, "fake");
    assert.equal(result.sessionId, session.id);
    assert.equal(result.exitCode, 0);
    assert.equal(result.summary.requests, 1);
    const dump = readFakeToolDump(outPath);
    assert.equal(dump.argv[dump.argv.indexOf("--model") + 1], "openai/gpt-5.2");
    const contents = Object.values(dump.files)[0] as { contents: string };
    assert.deepEqual(JSON.parse(contents.contents).models, [
      "anthropic/claude-sonnet-4-6",
      "openai/gpt-5.2",
      "auto/best-coding",
    ]);
  } finally {
    await stub.close();
  }
});

test("gateway without /api/launch: GatewayTooOld exit 69, release still called", async () => {
  const stub = await startStubGateway({ capabilities: null, sessionsEnabled: false });
  try {
    const run = await launchAgainst(stub, fakeAdapter({ outPath: join(tempRoot("o"), "d.json") }), {
      json: true,
    });
    assert.equal(run.outcome.exitCode, 69);
    assert.equal(JSON.parse(run.stdout.text).error.code, "GatewayTooOld");
    assert.deepEqual(run.releases, ["released"]);
  } finally {
    await stub.close();
  }
});

test("bad parent key: AuthFailed exit 77; unknown model: ModelNotFound exit 2 and the session is revoked", async () => {
  const stub = await startStubGateway({ parentKey: "sk-right" });
  try {
    const adapter = fakeAdapter({ outPath: join(tempRoot("o"), "d.json") });
    const denied = await launchAgainst(stub, adapter, { apiKey: "sk-wrong" });
    assert.equal(denied.outcome.exitCode, 77, denied.stderr.text);
    assert.match(denied.stderr.text, /^omnirouter: /);
    const missing = await launchAgainst(stub, adapter, {
      apiKey: "sk-right",
      model: "openai/gpt-5.3",
    });
    assert.equal(missing.outcome.exitCode, 2);
    assert.match(missing.stderr.text, /did you mean: openai\/gpt-5\.2/);
    assert.ok([...stub.sessions.values()].every((s: { revoked: boolean }) => s.revoked));
  } finally {
    await stub.close();
  }
});

test("empty view: NoProviders exit 69", async () => {
  const stub = await startStubGateway({
    models: [{ id: "small/x", context_length: 1000, capabilities: { tool_calling: true } }],
  });
  try {
    const run = await launchAgainst(stub, fakeAdapter({ outPath: join(tempRoot("o"), "d.json") }));
    assert.equal(run.outcome.exitCode, 69);
    assert.match(run.stderr.text, /no catalog model fits fake/);
  } finally {
    await stub.close();
  }
});

test("--dry-run --json: no mint, no spawn, token placeholder kept, compat keys present", async () => {
  const stub = await startStubGateway();
  try {
    const outPath = join(tempRoot("o"), "d.json");
    const run = await launchAgainst(
      stub,
      fakeAdapter({ outPath }),
      { dryRun: true, json: true, apiKey: "sk-secret-value", port: new URL(stub.url).port },
      {
        acquireGateway: async () => assert.fail("dry-run must not acquire the gateway"),
      }
    );
    assert.equal(run.outcome.exitCode, 0, run.stderr.text);
    const doc = JSON.parse(run.stdout.text);
    assert.equal(doc.planVersion, 1);
    assert.equal(doc.env.set.FAKE_KEY, "${TOKEN}");
    assert.equal(doc.gateway.status, "running");
    assert.equal(doc.target, "fake");
    assert.equal(doc.baseUrl, stub.url);
    assert.ok(
      Array.isArray(doc.args) &&
        Array.isArray(doc.env.changedOrAdded) &&
        Array.isArray(doc.env.removed)
    );
    assert.ok(
      doc.env.removed.includes("OPENAI_API_KEY") === false,
      "base env is already safe-filtered"
    );
    assert.equal(doc.auth.source, "option");
    assert.ok(!run.stdout.text.includes("sk-secret-value"));
    assert.equal(stub.sessions.size, 0, "no session minted");
    assert.equal(readFakeToolDump(outPath), null, "tool not spawned");
  } finally {
    await stub.close();
  }
});

test("--dry-run with the gateway down still renders (would auto-start)", async () => {
  const stub = await startStubGateway();
  const url = stub.url;
  await stub.close();
  const port = Number(new URL(url).port);
  const stdout = capture();
  const outcome = await runLaunch(
    "fake",
    { dryRun: true, port: String(port), model: "x/y" },
    {
      registry: registryOf(fakeAdapter({ strategy: "inject", outPath: "/nonexistent" })),
      env: { PATH: "" },
      stdout,
      stderr: capture(),
      isTTY: false,
      dataDir: tempRoot("d"),
      resolveBinary: async () => ({ command: "fake-tool", shell: false }),
      probeTool: async () => ({ version: undefined, features: {}, warnings: [] }),
      loadPreferences: () => ({}),
    }
  );
  assert.equal(outcome.exitCode, 0);
  assert.match(stdout.text, new RegExp(`would auto-start on 127\\.0\\.0\\.1:${port}`));
  assert.match(stdout.text, /model: x\/y/);
});

test("reserved flags, unknown tool, owned passthrough", async () => {
  assert.throws(() => rejectReserved({ budget: "5" }), /--budget is not yet supported/);
  assert.equal(composeModel({ provider: "openai", model: "gpt" }), "openai/gpt");
  assert.equal(composeModel({ provider: "openai", model: "a/b" }), "a/b");
  const deps = {
    registry: registryOf(fakeAdapter({ outPath: "/x" })),
    stdout: capture(),
    stderr: capture(),
    env: {},
    isTTY: false,
  };
  assert.equal((await runLaunch("fake", { mcp: "x" }, deps)).exitCode, 2);
  const unknown = await runLaunch("nope", {}, { ...deps, stderr: capture() });
  assert.equal(unknown.exitCode, 2);
  assert.equal(unknown.error?.code, "UsageError");
  const owned = await runLaunch("fake", { args: ["--provider", "x"] }, deps);
  assert.equal(owned.exitCode, 2);
  assert.equal(owned.error?.code, "ConfigConflict");
});

test("version gate below recommended: a real adapter (qwen) yields exactly one warning", async () => {
  const qwen = (await import("../../../../bin/cli/launch/adapters/qwen.mjs")).default;
  const { applyVersionGate } = await import("../../../../bin/cli/launch/core/resolve-bin.mjs");
  const version = "0.1.0";
  assert.ok(qwen.capabilities.versionGate.recommended, "qwen has a recommended version");
  // A dry run keeps plan warnings in its document; a launch prints them.
  const gateWarnings = (outcome: { warnings: string[]; dryRun?: { warnings: string[] } }) =>
    [...outcome.warnings, ...(outcome.dryRun?.warnings ?? [])].filter((w) =>
      w.includes(qwen.capabilities.versionGate.recommended)
    );
  const stub = await startStubGateway();
  try {
    const common = {
      registry: { get: (id: string) => (id === "qwen" ? qwen : undefined), list: () => [qwen] },
      probeTool: async (adapter: object) => ({
        version,
        ...applyVersionGate(adapter, version, process.platform),
      }),
      execute: async () => ({ exitCode: 0, warnings: [] }),
    };
    for (const flags of [{}, { dryRun: true, json: true, port: new URL(stub.url).port }]) {
      const root = tempRoot("gate");
      const stderr = capture();
      const outcome = await runLaunch(
        "qwen",
        { yes: true, model: "anthropic/claude-sonnet-4-6", ...flags },
        {
          ...common,
          env: { PATH: process.env.PATH ?? "", HOME: root },
          homeDir: root,
          cwd: root,
          dataDir: join(root, "data"),
          stdout: capture(),
          stderr,
          isTTY: false,
          acquireGateway: async () => ({
            baseUrl: `${stub.url}/v1`,
            owned: true,
            release: async () => undefined,
          }),
          resolveBinary: async () => ({ command: process.execPath, shell: false }),
          loadPreferences: () => ({ favorites: [], recent: [] }),
          recordPreference: () => undefined,
        }
      );
      assert.equal(outcome.exitCode, 0, stderr.text);
      assert.equal(gateWarnings(outcome).length, 1, JSON.stringify(outcome.warnings));
      assert.equal(
        stderr.text
          .split("\n")
          .filter(
            (l) => l.includes("warning:") && l.includes(qwen.capabilities.versionGate.recommended)
          ).length,
        "dryRun" in flags ? 0 : 1,
        stderr.text
      );
    }
  } finally {
    await stub.close();
  }
});

test("gateWarnings drops core's generic gate warning only when the plan words its own", () => {
  const adapter = { capabilities: { versionGate: { recommended: "2.0.0" } } };
  const core = "x 1.0.0 works, but 2.0.0 or newer is recommended";
  assert.deepEqual(gateWarnings(adapter, [core, "other"], ["x 1.0.0 is older than 2.0.0"]), [
    "other",
  ]);
  assert.deepEqual(gateWarnings(adapter, [core], ["unrelated"]), [core]);
  assert.deepEqual(gateWarnings(adapter, [core], [core]), []);
});
