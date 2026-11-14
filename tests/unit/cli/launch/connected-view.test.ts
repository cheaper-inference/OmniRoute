// Default launch view = models of the providers the user has a stored key for (contract 1.3).
// Fixture shaped like the operator's live catalog: 3 keyed providers (openai, gemini and
// cheaperinference served under its alias `cinf`), keyless noAuth providers (a `dva/*`-like bulk
// provider, cloudflare-playground, uncloseai), many built-in `auto/*` rows and one user combo.
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { runLaunch } from "../../../../bin/cli/launch/core/pipeline.mjs";
import { fetchConnectedProviders } from "../../../../bin/cli/launch/core/catalog.mjs";
import opencode from "../../../../bin/cli/launch/adapters/opencode.mjs";
import kilo from "../../../../bin/cli/launch/adapters/kilo.mjs";
import codex from "../../../../bin/cli/launch/adapters/codex.mjs";
import pi from "../../../../bin/cli/launch/adapters/pi.mjs";
import claude from "../../../../bin/cli/launch/adapters/claude.mjs";
import { startStubGateway } from "../../../helpers/launch/stubGateway.mjs";

const CAPS = { tool_calling: true, reasoning: true };

function model(id: string, ownedBy: string) {
  return {
    id,
    object: "model",
    owned_by: ownedBy,
    display_name: id,
    context_length: 400000,
    max_output_tokens: 64000,
    capabilities: { ...CAPS },
  };
}

const USER_COMBO = "my-coding-combo";

function operatorCatalog() {
  const rows = [];
  for (let i = 0; i < 45; i++) rows.push({ ...model(`auto/variant-${i}`, "combo") });
  rows.push({ ...model("auto", "combo") });
  rows.push({ ...model("auto/best-chaos", "combo") });
  rows.push({ ...model(USER_COMBO, "combo") });
  for (let i = 0; i < 300; i++) rows.push(model(`dva/free-${i}`, "dva"));
  rows.push(model("cloudflare-playground/llama-4", "cloudflare-playground"));
  rows.push(model("uncloseai/hermes", "uncloseai"));
  for (let i = 0; i < 40; i++) rows.push(model(`openai/gpt-${i}`, "openai"));
  for (let i = 0; i < 40; i++) rows.push(model(`gemini/gemini-${i}`, "gemini"));
  for (let i = 0; i < 20; i++) rows.push(model(`cinf/model-${i}`, "cheaperinference"));
  return rows;
}

const CONNECTED = {
  providers: [
    { id: "cheaperinference", prefixes: ["cheaperinference", "cinf"] },
    { id: "gemini", prefixes: ["gemini"] },
    { id: "openai", prefixes: ["openai"] },
  ],
  prefixes: ["cheaperinference", "cinf", "gemini", "openai"],
};
const CONNECTED_PREFIXES = ["cinf", "gemini", "openai"];

function capture() {
  let text = "";
  return {
    write: (chunk: string) => ((text += chunk), true),
    get text() {
      return text;
    },
  };
}

type Adapter = typeof opencode;

async function launchView(
  adapter: Adapter,
  options: { connected?: object | null; flags?: Record<string, unknown>; models?: object[] } = {}
) {
  const stub = await startStubGateway({
    models: options.models ?? operatorCatalog(),
    connectedProviders: options.connected === undefined ? CONNECTED : options.connected,
  });
  const root = mkdtempSync(join(tmpdir(), "launch-connected-"));
  try {
    mkdirSync(join(root, "tmp"), { recursive: true });
    const stderr = capture();
    let ids: string[] = [];
    const outcome = await runLaunch(
      adapter.id,
      { yes: true, summary: false, ...(options.flags || {}) },
      {
        registry: { get: (id: string) => (id === adapter.id ? adapter : undefined) },
        env: { PATH: process.env.PATH ?? "", HOME: root },
        homeDir: root,
        cwd: root,
        dataDir: join(root, "data"),
        tmpRoot: join(root, "tmp"),
        stdout: capture(),
        stderr,
        isTTY: false,
        stdio: "ignore",
        acquireGateway: async () => ({
          baseUrl: `${stub.url}/v1`,
          owned: true,
          release: async () => undefined,
        }),
        resolveBinary: async () => ({ command: process.execPath, shell: false }),
        probeTool: async () => ({ version: "999.0.0", features: {}, warnings: [] }),
        loadPreferences: () => ({ favorites: [], recent: [] }),
        readToolDefaults: () => undefined,
        readLastLaunch: () => undefined,
        recordPreference: () => undefined,
        writeLastLaunch: () => undefined,
        middleware: [
          {
            id: "capture-view",
            beforePlan: (ctx: { view: { rows: { id: string }[] } }) => {
              ids = ctx.view.rows.map((r) => r.id);
              return ctx;
            },
          },
        ],
        execute: async (_plan: unknown, opts: { afterExit?: Function }) => {
          await opts.afterExit?.({ exitCode: 0 });
          return { exitCode: 0, signal: null, forwardedSignal: null, warnings: [] };
        },
      }
    );
    const providerCalls = stub.requests.filter(
      (r: { path: string }) => r.path === "/api/launch/providers"
    ).length;
    return { outcome, ids, stderr: stderr.text, providerCalls };
  } finally {
    await stub.close();
    rmSync(root, { recursive: true, force: true });
  }
}

const prefixOf = (id: string) => (id.includes("/") ? id.slice(0, id.indexOf("/")) : "");

for (const adapter of [opencode, kilo, codex, pi, claude] as Adapter[]) {
  test(`${adapter.id}: default view holds only connected providers' models plus the user combo`, async () => {
    const run = await launchView(adapter);
    assert.equal(run.outcome.exitCode, 0, run.stderr);
    assert.ok(run.ids.length > 0);
    assert.equal(run.providerCalls, 1, "the connected set is fetched once per launch");
    for (const id of run.ids) {
      assert.ok(
        id === USER_COMBO || CONNECTED_PREFIXES.includes(prefixOf(id)),
        `${id} is from a connected provider or the user combo`
      );
    }
    for (const prefix of CONNECTED_PREFIXES) {
      assert.ok(
        run.ids.some((id) => prefixOf(id) === prefix),
        `${prefix} has models in the view`
      );
    }
    assert.ok(run.ids.includes(USER_COMBO), "user combo kept");
    assert.ok(!run.ids.some((id) => id === "auto" || id.startsWith("auto/")), "no auto rows");
    assert.doesNotMatch(run.stderr, /warning/);
  });

  test(`${adapter.id}: --all-models gives the full catalog view`, async () => {
    const run = await launchView(adapter, { flags: { allModels: true } });
    assert.equal(run.outcome.exitCode, 0, run.stderr);
    assert.equal(run.providerCalls, 0, "--all-models skips the connected set");
    assert.ok(
      run.ids.some((id) => id.startsWith("auto/")),
      "auto rows back"
    );
    assert.ok(
      run.ids.some((id) => id.startsWith("dva/")),
      "keyless rows back"
    );
  });

  test(`${adapter.id}: a gateway without the route falls back with one warning`, async () => {
    const run = await launchView(adapter, { connected: null });
    assert.equal(run.outcome.exitCode, 0, run.stderr);
    const warnings = run.stderr.split("\n").filter((line) => line.includes("warning:"));
    assert.equal(warnings.length, 1, run.stderr);
    assert.match(warnings[0], /does not report connected providers; showing every catalog model/);
    const full = await launchView(adapter, { flags: { allModels: true } });
    assert.deepEqual(run.ids, full.ids, "same view as --all-models");
  });
}

test("an explicit --model from a provider without a key is still pinned", async () => {
  const run = await launchView(opencode, { flags: { model: "dva/free-7" } });
  assert.equal(run.outcome.exitCode, 0, run.stderr);
  assert.equal(run.ids[0], "dva/free-7");
  assert.ok(run.ids.slice(1).every((id) => id === USER_COMBO || !id.startsWith("dva/")));
});

test("no connected provider: NoProviders naming omniroute setup and --all-models", async () => {
  const run = await launchView(opencode, {
    connected: { providers: [], prefixes: [] },
    models: operatorCatalog().filter((row) => row.id !== USER_COMBO),
  });
  assert.equal(run.outcome.exitCode, 69);
  assert.match(run.stderr, /omniroute setup/);
  assert.match(run.stderr, /--all-models/);
});

test("a capped view keeps every connected provider (round robin)", async () => {
  const many = {
    providers: [{ id: "dva", prefixes: ["dva"] }, ...CONNECTED.providers],
    prefixes: ["dva", ...CONNECTED.prefixes],
  };
  const run = await launchView(opencode, { connected: many });
  assert.equal(run.outcome.exitCode, 0, run.stderr);
  for (const prefix of ["dva", ...CONNECTED_PREFIXES]) {
    assert.ok(
      run.ids.some((id) => prefixOf(id) === prefix),
      `${prefix} kept`
    );
  }
});

test("fetchConnectedProviders: union of ids and prefixes; 404 is a fallback, not an error", async () => {
  const stub = await startStubGateway({ connectedProviders: CONNECTED });
  try {
    const ok = await fetchConnectedProviders({ rootUrl: stub.url });
    assert.deepEqual(ok, { ok: true, prefixes: ["cheaperinference", "cinf", "gemini", "openai"] });
    stub.setConnectedProviders(null);
    const missing = await fetchConnectedProviders({ rootUrl: stub.url });
    assert.equal(missing.ok, false);
  } finally {
    await stub.close();
  }
});
