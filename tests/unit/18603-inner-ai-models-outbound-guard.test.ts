/**
 * #18603 — the Inner.ai model discovery request must carry the provider outbound guard.
 *
 * safeOutboundFetch(url, options) reads the guard from `options.guard`. The route used
 * to pass getProviderOutboundGuard() as a third positional argument, which the function
 * ignores, so this request ran under the default guard "none" and skipped the SSRF
 * policy every sibling discovery call applies.
 *
 * The Inner.ai host is a fixed public URL, so no guard mode changes the request's
 * outcome and the behaviour cannot be observed through a stubbed fetch. The regression
 * is therefore pinned on the call shape in the route source.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROUTE = path.resolve(import.meta.dirname, "../../src/app/api/providers/[id]/models/route.ts");

function innerAiFetchCall(source: string): string {
  const start = source.indexOf('"https://platformapi.innerai.com/api/v1/ai_models"');
  assert.notEqual(start, -1, "Inner.ai models URL not found in the route");
  const callStart = source.lastIndexOf("safeOutboundFetch(", start);
  assert.notEqual(callStart, -1, "safeOutboundFetch call for Inner.ai not found");
  const end = source.indexOf("if (!modelsResp.ok)", start);
  return source.slice(callStart, end);
}

test("Inner.ai models fetch passes the outbound guard inside the options object", () => {
  const call = innerAiFetchCall(fs.readFileSync(ROUTE, "utf8"));
  assert.match(
    call,
    /\{\s*headers:\s*innerAiHeaders,\s*guard:\s*getProviderOutboundGuard\(\)\s*\}/
  );
});

test("Inner.ai models fetch has no positional third argument", () => {
  const call = innerAiFetchCall(fs.readFileSync(ROUTE, "utf8"));
  assert.doesNotMatch(call, /\},\s*getProviderOutboundGuard\(/);
});
