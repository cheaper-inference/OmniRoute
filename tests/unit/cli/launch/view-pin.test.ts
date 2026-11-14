// An explicit --model is pinned into the launch view even when the adapter's view limit would cut
// it (live smoke item 4: opencode, kilo and codex rejected ids past the first 100 catalog rows).
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { defineAdapter } from "../../../../bin/cli/launch/contract.mjs";
import { computeView, effectiveViewSpec } from "../../../../bin/cli/launch/core/view.mjs";
import { runLaunch } from "../../../../bin/cli/launch/core/pipeline.mjs";
import opencode from "../../../../bin/cli/launch/adapters/opencode.mjs";
import kilo from "../../../../bin/cli/launch/adapters/kilo.mjs";
import codex from "../../../../bin/cli/launch/adapters/codex.mjs";
import { startStubGateway } from "../../../helpers/launch/stubGateway.mjs";

const PIN_INDEX = 250;

/** 300 tool-capable chat rows in the gateway /v1/models shape. */
function bigCatalog() {
  return Array.from({ length: 300 }, (_, i) => ({
    id: `bulk/model-${String(i).padStart(3, "0")}`,
    object: "model",
    owned_by: "bulk",
    display_name: `Bulk ${i}`,
    context_length: 256000,
    max_output_tokens: 32000,
    capabilities: { tool_calling: true },
  }));
}

/** The same rows in the normalized catalog shape computeView reads. */
function bigRows() {
  return bigCatalog().map((m) => ({
    id: m.id,
    label: m.display_name,
    contextTokens: m.context_length,
    maxOutputTokens: m.max_output_tokens,
    capabilities: ["tool_calling"],
    kind: "model",
  }));
}

const PIN = `bulk/model-${PIN_INDEX}`;

function capture() {
  let text = "";
  return {
    write: (chunk: string) => ((text += chunk), true),
    get text() {
      return text;
    },
  };
}

for (const adapter of [opencode, kilo, codex]) {
  test(`${adapter.id}: computeView pins a model past the view limit`, () => {
    const limit = effectiveViewSpec(adapter).limit;
    assert.equal(typeof limit, "number", "the adapter caps its view");
    const { view, ids } = computeView(bigRows(), adapter, {}, { pin: PIN });
    assert.ok(ids.length <= limit!, `view length ${ids.length} <= ${limit}`);
    assert.equal(ids[0], PIN, "the pin comes first");
    assert.equal(view.rows[0].id, PIN);
    assert.equal(ids[1], "bulk/model-000", "then the rest in normal order");
    assert.equal(new Set(ids).size, ids.length, "no duplicates");
    const unpinned = computeView(bigRows(), adapter);
    assert.ok(!unpinned.ids.includes(PIN), "without the pin the limit cuts it");
  });

  test(`${adapter.id}: --model ${PIN} in a 300-row catalog launches`, async () => {
    const stub = await startStubGateway({ models: bigCatalog() });
    const root = mkdtempSync(join(tmpdir(), "launch-pin-"));
    try {
      mkdirSync(join(root, "tmp"), { recursive: true });
      const stderr = capture();
      let planned: { argv: string[] } | undefined;
      let ctxView: string[] = [];
      const outcome = await runLaunch(
        adapter.id,
        { yes: true, model: PIN, summary: false },
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
          recordPreference: () => undefined,
          writeLastLaunch: () => undefined,
          middleware: [
            {
              id: "capture-view",
              beforePlan: (ctx: { view: { rows: { id: string }[] } }) => {
                ctxView = ctx.view.rows.map((r) => r.id);
                return ctx;
              },
            },
          ],
          execute: async (plan: { argv: string[] }, opts: { afterExit?: Function }) => {
            planned = plan;
            await opts.afterExit?.({ exitCode: 0 });
            return { exitCode: 0, signal: null, forwardedSignal: null, warnings: [] };
          },
        }
      );
      assert.equal(outcome.exitCode, 0, stderr.text);
      assert.ok(planned, "the plan reached execute");
      const limit = effectiveViewSpec(adapter).limit!;
      assert.ok(ctxView.includes(PIN), "the plan context view holds the pin");
      assert.ok(ctxView.length <= limit);
      assert.ok(JSON.stringify(planned).includes(PIN), "the plan names the pinned model");
      const patched = [...stub.sessions.values()]
        .map((s: { view?: { ids: string[] } }) => s.view)
        .filter((v): v is { ids: string[] } => Boolean(v));
      for (const view of patched) {
        assert.ok(view.ids.includes(PIN), "server-view PATCH holds the pin");
        assert.ok(view.ids.length <= limit);
      }
    } finally {
      await stub.close();
      rmSync(root, { recursive: true, force: true });
    }
  });
}

function filtered(filter: object) {
  return defineAdapter({
    contract: { major: 1, minor: 1 },
    id: "f",
    binaries: ["f"],
    capabilities: {
      protocol: "openai-chat",
      modelList: { strategy: "inject", view: { name: "fv", filter, limit: 2 } },
      model: "optional",
      install: { commands: {} },
      supportsProfile: false,
      platforms: ["linux"],
      tier: "core",
    },
    plan: () => ({}) as never,
  });
}

test("a pinned model that fails a view filter is ModelUnsuitable naming the filter", () => {
  const rows = [
    ...bigRows().slice(0, 3),
    { id: "tiny/ctx", contextTokens: 4000, capabilities: ["tool_calling"], kind: "model" },
    { id: "no/tools", contextTokens: 200000, capabilities: [], kind: "model" },
  ];
  assert.throws(
    () => computeView(rows, filtered({ minContextTokens: 100000 }), {}, { pin: "tiny/ctx" }),
    (err: { code?: string; message?: string }) =>
      err.code === "ModelUnsuitable" && /minContextTokens 100000/.test(err.message ?? "")
  );
  assert.throws(
    () => computeView(rows, filtered({ capabilities: ["tools"] }), {}, { pin: "no/tools" }),
    (err: { code?: string; message?: string }) =>
      err.code === "ModelUnsuitable" && /capabilities \["tools"\]/.test(err.message ?? "")
  );
});

test("a pin absent from the catalog or already in the view leaves the view unchanged", () => {
  const rows = bigRows().slice(0, 5);
  const a = filtered({});
  const base = computeView(rows, a);
  assert.deepEqual(computeView(rows, a, {}, { pin: "nope/missing" }).ids, base.ids);
  assert.deepEqual(computeView(rows, a, {}, { pin: "bulk/model-001" }).ids, base.ids);
  assert.equal(computeView(rows, a, {}, { pin: "bulk/model-004" }).ids[0], "bulk/model-004");
});
