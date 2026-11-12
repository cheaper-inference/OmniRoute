import assert from "node:assert/strict";
import test from "node:test";
import { effortId, effortOf, orderEndpoints, quotaSurface, stripEffort } from "../src/routing.ts";
import type { ClassifiedEndpoint } from "../src/types.ts";

function ep(providerId: string, modelId: string, connectionId = providerId): ClassifiedEndpoint {
  return {
    endpoint: { connectionId, providerId, modelId, billingClass: "subscription", active: true },
    lineage: { owner: "gpt", line: "astra" },
    version: { generation: [6], display: "6" },
    isReasoningVariant: false,
  };
}

test("gpt order is codex, then codex-app-server, then github, then opencode", () => {
  const ordered = orderEndpoints("gpt", [
    ep("opencode-go", "gpt-6-astra"),
    ep("github", "gpt-6-astra"),
    ep("codex-app-server", "gpt-6-astra"),
    ep("codex", "gpt-6-astra"),
  ]);
  assert.deepEqual(ordered.map((e) => e.endpoint.providerId), ["codex", "codex-app-server", "github", "opencode-go"]);
});

test("an openai api key is not a chatgpt subscription", () => {
  const ordered = orderEndpoints("gpt", [ep("openai", "gpt-6-astra"), ep("codex", "gpt-6-astra")]);
  assert.deepEqual(ordered.map((e) => e.endpoint.providerId), ["codex"]);
});

test("devin is never placed on a gpt, claude, or gemini alias", () => {
  for (const owner of ["gpt", "claude", "gemini"]) {
    const ordered = orderEndpoints(owner, [
      { ...ep("devin-desktop", "x"), lineage: { owner, line: "x" } },
      { ...ep(owner === "gpt" ? "codex" : owner === "claude" ? "claude" : "antigravity", "x"), lineage: { owner, line: "x" } },
    ]);
    assert.ok(ordered.every((e) => !e.endpoint.providerId.startsWith("devin")));
  }
});

test("agy is the same quota surface as antigravity and is not stacked", () => {
  assert.equal(quotaSurface("agy"), quotaSurface("antigravity"));
  const ordered = orderEndpoints("gemini", [
    { ...ep("antigravity", "gemini-3.1-pro"), lineage: { owner: "gemini", line: "pro" } },
    { ...ep("agy", "gemini-3.1-pro"), lineage: { owner: "gemini", line: "pro" } },
  ]);
  assert.deepEqual(ordered.map((e) => e.endpoint.providerId), ["antigravity"]);
});

test("devin surfaces collapse onto devin-desktop", () => {
  for (const id of ["dv", "dva", "cpa-devin"]) assert.equal(quotaSurface(id), "devin-desktop");
});

test("swe-2 is only devin-desktop", () => {
  const ordered = orderEndpoints("swe", [
    { ...ep("devin-desktop", "devin-desktop/swe-2-high"), lineage: { owner: "swe", line: "swe-2" } },
    { ...ep("dv", "dv/swe-2-high"), lineage: { owner: "swe", line: "swe-2" } },
    { ...ep("cpa", "cpa/devin/swe-2"), lineage: { owner: "swe", line: "swe-2" } },
  ]);
  assert.deepEqual(ordered.map((e) => e.endpoint.providerId), ["devin-desktop"]);
});

test("effort is only the exact trailing token", () => {
  assert.equal(effortOf("gpt-6-luna-high"), "high");
  assert.equal(effortOf("qwen3.8-flash"), null);
  assert.equal(effortOf("gemini-3.1-pro"), null);
  assert.equal(effortOf("model-thinking"), null);
  assert.equal(stripEffort("gpt-6-luna-high"), "gpt-6-luna");
  assert.equal(effortId("gpt-6-luna-high", "low"), "gpt-6-luna-low");
});
