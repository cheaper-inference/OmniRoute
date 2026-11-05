import test from "node:test";
import assert from "node:assert/strict";

import { applyFingerprint } from "../../open-sse/config/cliFingerprints.ts";
import { copyAntigravityRequestForSerialization } from "../../open-sse/executors/antigravity/requestSerializationCopy.ts";

test("Antigravity serialization copies only mutable root fields, not large histories", () => {
  const history = Array.from({ length: 250 }, (_, index) => ({
    role: "user",
    parts: [{ text: String(index) + "a".repeat(1024) }],
  }));
  const body: Record<string, unknown> = {
    model: "gemini-3-pro",
    contents: history,
    generationConfig: { temperature: 0.7 },
    _omnirouteRoutingMarker: true,
  };
  const aliases = new Map([["short", "long_tool_name"]]);
  Object.defineProperty(body, "_toolNameMap", {
    value: aliases,
    enumerable: false,
    configurable: true,
  });

  const copied = copyAntigravityRequestForSerialization(body) as Record<string, unknown>;
  assert.notStrictEqual(copied, body);
  assert.strictEqual(copied.contents, history);
  assert.strictEqual(copied.generationConfig, body.generationConfig);
  assert.equal("_toolNameMap" in copied, false);
  assert.strictEqual(body._toolNameMap, aliases);

  // The CLI fingerprint removes markers on the copied root, never on the
  // caller's request; the full history remains available for retry.
  const fingerprinted = applyFingerprint("antigravity", {}, copied);
  assert.equal("_omnirouteRoutingMarker" in copied, false);
  assert.equal(body._omnirouteRoutingMarker, true);
  assert.strictEqual(body.contents, history);
  assert.ok(Array.isArray((JSON.parse(fingerprinted.bodyString) as Record<string, unknown>).contents));
});

test("Antigravity plain and CLI-compatible JSON match the former deep-clone path", () => {
  const body = {
    model: "gemini-3-pro",
    contents: [{ role: "user", parts: [{ text: "hello" }] }],
    tools: [{ functionDeclarations: [{ name: "run", parameters: { type: "object" } }] }],
    _nativeCodexPassthrough: true,
    _omnirouteInternalHint: "hidden",
    _toolNameMap: { run: "run-original" },
  };
  const oldCopy = structuredClone(body);
  delete (oldCopy as Record<string, unknown>)._toolNameMap;
  const newCopy = copyAntigravityRequestForSerialization(body) as Record<string, unknown>;

  assert.equal(JSON.stringify(newCopy), JSON.stringify(oldCopy));
  const expected = applyFingerprint("antigravity", { "Content-Type": "application/json" }, oldCopy);
  const actual = applyFingerprint("antigravity", { "Content-Type": "application/json" }, newCopy);
  assert.deepEqual(actual, expected);
  assert.equal(body._omnirouteInternalHint, "hidden");
  assert.equal(body._nativeCodexPassthrough, true);
});

test("Antigravity copy never traverses nested history before serialization", () => {
  const history: Record<string, unknown> = { contents: [] };
  Object.defineProperty(history, "expensive", {
    enumerable: true,
    get() {
      throw new Error("deep request traversal must not run");
    },
  });
  const body = { model: "gemini-3-pro", request: history };
  const copied = copyAntigravityRequestForSerialization(body) as Record<string, unknown>;
  assert.strictEqual(copied.request, history);
  assert.strictEqual(body.request, history);
});
