import { test } from "node:test";
import assert from "node:assert/strict";

import { defineAdapter, selectView, viewHash } from "../../../../bin/cli/launch/contract.mjs";
import {
  computeView,
  effectiveViewSpec,
  needsServerView,
  serverViewBody,
} from "../../../../bin/cli/launch/core/view.mjs";
import { normalizeCatalog, contextWindowOf } from "../../../../bin/cli/launch/core/catalog.mjs";
import { DEFAULT_MODELS } from "../../../helpers/launch/stubGateway.mjs";

function adapter(strategy: "inject" | "server-view" | "both", view: object, serve?: object) {
  return defineAdapter({
    contract: { major: 1, minor: 1 },
    id: "v",
    binaries: ["v"],
    capabilities: {
      protocol: "openai-responses",
      modelList: {
        strategy,
        view: { name: "v", filter: {}, ...view },
        ...(serve ? { serve } : {}),
      },
      model: "optional",
      install: { commands: {} },
      supportsProfile: false,
      platforms: ["linux"],
      tier: "core",
    },
    plan: () => ({}) as any,
  });
}

test("catalog normalization: context, capabilities object, kinds, labels, type", () => {
  const rows = normalizeCatalog({ data: DEFAULT_MODELS });
  const byId = Object.fromEntries(rows.map((r: any) => [r.id, r]));
  assert.equal(byId["anthropic/claude-sonnet-4-6"].contextTokens, 200000);
  assert.equal(byId["anthropic/claude-sonnet-4-6"].label, "Claude Sonnet 4.6");
  assert.ok(byId["anthropic/claude-sonnet-4-6"].capabilities.includes("tool_calling"));
  assert.ok(!byId["plain/no-tools"].capabilities.includes("tool_calling"));
  assert.equal(byId["auto/best-coding"].kind, "auto");
  assert.equal(byId["text-embedding-3"].type, "embedding");
  assert.equal(contextWindowOf({ max_input_tokens: 5, context_length: 9 }), 5);
  assert.equal(contextWindowOf({ max_context_window_tokens: 7 }), 7);
  assert.deepEqual(
    normalizeCatalog([{ id: "" }, null, { id: "a" }]).map((r: any) => r.id),
    ["a"]
  );
});

test("computeView = the shared selector with the protocol default; preferences reorder", () => {
  const rows = normalizeCatalog({ data: DEFAULT_MODELS });
  const a = adapter("inject", { filter: { capabilities: ["tools"] }, order: "preferences" });
  assert.deepEqual(effectiveViewSpec(a).filter.protocols, ["openai-responses"]);
  const { view, ids } = computeView(rows, a, { favorites: ["openai/gpt-5.2"] });
  assert.equal(ids[0], "openai/gpt-5.2");
  assert.ok(!ids.includes("plain/no-tools") && !ids.includes("text-embedding-3"));
  assert.equal(view.hash, viewHash(ids));
  const direct = selectView(rows, effectiveViewSpec(a), { favorites: ["openai/gpt-5.2"] });
  assert.deepEqual(view.rows, direct.rows, "parity with the gateway selector");
  assert.ok(Object.isFrozen(view));
});

test("server-view body carries ids, hash and serve; strategies", () => {
  const rows = normalizeCatalog({ data: DEFAULT_MODELS });
  const a = adapter("both", { limit: 2 }, { shape: "codex" });
  const { view } = computeView(rows, a);
  assert.deepEqual(serverViewBody(view, a), {
    hash: view.hash,
    ids: view.rows.map((r: any) => r.id),
    serve: { shape: "codex" },
  });
  assert.equal(view.rows.length, 2);
  assert.equal(needsServerView("inject"), false);
  assert.equal(needsServerView("server-view"), true);
  assert.equal(needsServerView("both"), true);
  assert.equal("serve" in serverViewBody(view, adapter("server-view", {})), false);
});
