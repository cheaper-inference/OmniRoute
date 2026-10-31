/**
 * Unit tests for the Cloudflare Playground's JSON tool-call protocol.
 *
 * Covers the two properties the bare-JSON contract depends on and that the tag
 * ladder cannot provide:
 *
 * - the optional `type: "tool_call"` discriminator — read as a marker, never as
 *   an argument, and never as a reason to read a quoted schema as a call;
 * - truncated documents — a turn cut off mid-array parses to *nothing*, so the
 *   executor re-asks instead of executing the calls that happened to complete.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  parseCfToolCalls,
  hasMalformedCfToolIntent,
  stripCfToolMarkup,
  type CfToolDef,
} from "../../open-sse/translator/cloudflarePlaygroundTools.ts";

const TEST_TOOLS: CfToolDef[] = [
  {
    name: "bash",
    description: "Execute a shell command",
    parameters: {
      type: "object",
      properties: { command: { type: "string" } },
      required: ["command"],
    },
  },
  {
    name: "read_file",
    description: "Read a file",
    parameters: {
      type: "object",
      properties: { path: { type: "string" } },
      required: ["path"],
    },
  },
];

const TOOL_NAMES = ["bash", "read_file"];

// ── the `type` discriminator ─────────────────────────────────────────────────

test("parseCfToolCalls reads the contract's type discriminator", () => {
  const text =
    '{"type": "tool_call", "name": "bash", "arguments": {"command": "pwd"}, "_nonce": "abcd1234"}';
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "bash");
  assert.deepEqual(JSON.parse(calls[0].arguments), { command: "pwd", _nonce: "abcd1234" });
});

test("the type discriminator is metadata, never an argument", () => {
  // Flattened drift plus the marker: `type` describes the object, it is not one
  // of the arguments the tool declares.
  const text = '{"type": "tool_call", "name": "bash", "command": "pwd"}';
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.deepEqual(JSON.parse(calls[0].arguments), { command: "pwd" });
});

test("a type value that is not the marker does not make a payload a call", () => {
  // `type` is a JSON-schema keyword in a quoted schema, not the contract's
  // marker, so the payload stays prose.
  const text =
    'The schema is {"name": "bash", "type": "object", "properties": {"command": {"type": "string"}}}.';
  assert.deepEqual(parseCfToolCalls(text, TEST_TOOLS), []);
  assert.equal(hasMalformedCfToolIntent(text, TOOL_NAMES, TEST_TOOLS), false);
});

test("a typed envelope is stripped from the content with its own bytes", () => {
  const text =
    '{"type": "tool_call", "name": "bash", "arguments": {"command": "pwd"}, "_nonce": "abcd1234"}';
  assert.equal(stripCfToolMarkup(text, TOOL_NAMES), "");
});

test("an envelope is still read when the model drops the type discriminator", () => {
  // The marker is optional: models drop fields, and requiring it here would be a
  // new way for a good call to be lost.
  const text = '{"name": "bash", "arguments": {"command": "pwd"}}';
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "bash");
});

// ── truncated documents: execute none of the calls, retry the whole turn ─────

test("a truncated array of calls parses to nothing and reports intent", () => {
  // The first call is complete and the second is cut off mid-object. Executing
  // the first would run half of what the model asked for and never say so.
  const text =
    '[{"name": "bash", "arguments": {"command": "pwd"}, "_nonce": "abcd1234"},\n' +
    '{"name": "read_file", "arguments": {"path": "a.';
  assert.deepEqual(parseCfToolCalls(text, TEST_TOOLS), []);
  assert.equal(hasMalformedCfToolIntent(text, TOOL_NAMES, TEST_TOOLS), true);
});

test("two consecutive envelopes with the second cut off parse to nothing", () => {
  const text =
    '{"name": "bash", "arguments": {"command": "pwd"}, "_nonce": "abcd1234"}\n' +
    '{"name": "read_file", "arguments": {"path": "a.';
  assert.deepEqual(parseCfToolCalls(text, TEST_TOOLS), []);
  assert.equal(hasMalformedCfToolIntent(text, TOOL_NAMES, TEST_TOOLS), true);
});

test("a typed envelope cut off before its name still reports intent", () => {
  // The marker is all the reply managed to write; without reading it as intent
  // the turn would come back as text with the cut-off call inside it.
  const text = '{"type": "tool_call", "name": "ba';
  assert.deepEqual(parseCfToolCalls(text, TEST_TOOLS), []);
  assert.equal(hasMalformedCfToolIntent(text, TOOL_NAMES, TEST_TOOLS), true);
});

test("a complete call survives an unbalanced brace in the prose after it", () => {
  // Truncation is only assumed for an opener that begins a JSON document (a key,
  // or an array of them), so a stray brace in prose cannot void a good call.
  const text =
    '{"name": "bash", "arguments": {"command": "pwd"}, "_nonce": "abcd1234"}\n' +
    "Then a block opens with `{` and never closes.";
  const calls = parseCfToolCalls(text, TEST_TOOLS);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "bash");
});
