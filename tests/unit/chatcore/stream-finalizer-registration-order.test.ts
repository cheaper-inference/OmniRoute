import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

// Deterministic regression guard for the Perplexity stream-error-boundary flake (#17290).
//
// The stream failure handlers (`onPipelineStreamError` / `onClientDisconnectFinalize`) used to
// reach chatCore only through `carry`, after `runStreamingTail` returned, while chatCore's stream
// controller reads them through getters at event time. A pipeline failure raised in that window
// was dropped. The race itself only shows up under CI load (the fixture passes on an idle box),
// so this pins the ordering that closes the window instead of relying on timing:
// the tail must hand both handlers back via `registerStreamFinalizers` right after creating them,
// with no await in between, and before the pipeline is assembled and starts pumping.

const ROOT = path.resolve(import.meta.dirname, "../../..");
const read = (p: string) => readFileSync(path.join(ROOT, p), "utf8");
const LEAF = "open-sse/handlers/chatCore/streamingTail.ts";
const BARREL = "open-sse/handlers/chatCore.ts";

test("the tail registers both finalizers before the streaming pipeline is assembled", () => {
  const leaf = read(LEAF);
  const created = leaf.indexOf("onClientDisconnectFinalize = streamFailure.");
  const registered = leaf.indexOf("deps.registerStreamFinalizers?.(");
  const assembled = leaf.indexOf("assembleStreamingPipeline({");
  assert.ok(created > 0, "the tail must still create onClientDisconnectFinalize");
  assert.ok(registered > 0, "the tail must call deps.registerStreamFinalizers");
  assert.ok(assembled > 0, "the tail must still assemble the streaming pipeline");
  assert.ok(
    created < registered && registered < assembled,
    "registerStreamFinalizers must run after the handlers exist and before the pipeline starts"
  );
  const registerCall = leaf.slice(registered, leaf.indexOf(";", registered));
  assert.match(registerCall, /onPipelineStreamError/);
  assert.match(registerCall, /onClientDisconnectFinalize/);
});

test("nothing awaits between creating the handlers and registering them", () => {
  const leaf = read(LEAF);
  const from = leaf.indexOf("onPipelineStreamError = streamFailureFinalizers.");
  const registered = leaf.indexOf("deps.registerStreamFinalizers?.(");
  assert.ok(from > 0 && registered > from, "handler creation must precede registration");
  assert.doesNotMatch(
    leaf.slice(from, registered),
    /\bawait\b/,
    "an await here reopens the window in which a pipeline failure has no handler"
  );
});

test("chatCore wires registerStreamFinalizers to the variables its stream controller reads", () => {
  const barrel = read(BARREL);
  const wiring = barrel.match(
    /registerStreamFinalizers:\s*\(([\s\S]*?)\)\s*=>\s*\{([\s\S]*?)\n\s*\},/
  );
  assert.ok(wiring, "runStreamingTail must be passed a registerStreamFinalizers callback");
  assert.match(wiring[2], /onPipelineStreamError\s*=\s*pipelineError/);
  assert.match(wiring[2], /onClientDisconnectFinalize\s*=\s*clientDisconnect/);
  assert.match(barrel, /getPipelineStreamError: \(\) => onPipelineStreamError/);
  assert.match(barrel, /getClientDisconnectFinalize: \(\) => onClientDisconnectFinalize/);
});
