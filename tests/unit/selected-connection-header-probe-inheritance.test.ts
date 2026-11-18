/**
 * #15567 / #15521 moved withSelectedConnectionHeader() out of chatHelpers.ts into
 * src/sse/handlers/chat/selectedConnectionHeader.ts. The release tip had meanwhile
 * taught the chatHelpers copy (#15594) to carry the provider-probe marker onto the
 * clone it builds when the original response's headers are immutable. This guard
 * keeps the extracted helper — and the chatHelpers re-export — from dropping it.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { withSelectedConnectionHeader } =
  await import("../../src/sse/handlers/chat/selectedConnectionHeader.ts");
const helpers = await import("../../src/sse/handlers/chatHelpers.ts");
const { markProviderProbeResponse, isProviderProbeResponse } =
  await import("../../src/shared/utils/providerProbeResult.ts");

function immutableProbeResponse(): Response {
  // Response.redirect() returns a Response whose headers are immutable, which forces
  // withSelectedConnectionHeader() down its clone path.
  const response = Response.redirect("https://example.invalid/probe", 302);
  assert.throws(() => response.headers.set("x-probe", "1"));
  markProviderProbeResponse(response);
  return response;
}

test("cloned response keeps the provider-probe marker (#15594 on the extracted helper)", () => {
  const original = immutableProbeResponse();
  const out = withSelectedConnectionHeader(original, "conn-1");
  assert.notEqual(out, original, "immutable headers must produce a clone");
  assert.equal(out.headers.get("X-OmniRoute-Selected-Connection-Id"), "conn-1");
  assert.equal(isProviderProbeResponse(out), true);
});

test("chatHelpers re-exports the same probe-preserving helper", () => {
  assert.equal(helpers.withSelectedConnectionHeader, withSelectedConnectionHeader);
});

test("a non-probe response is not marked as a probe after cloning", () => {
  const original = Response.redirect("https://example.invalid/plain", 302);
  const out = withSelectedConnectionHeader(original, "conn-2");
  assert.equal(isProviderProbeResponse(out), false);
});

// The release tip (#16072) taught the policy-inheritance helper to also carry the trusted
// empty-turn execution record; the extracted helper has to go through it, not through the
// probe-only inheritance, or a valid empty terminal turn is re-classified as failed.
test("cloned response keeps the trusted empty-turn execution record (#16072)", async () => {
  const { markEmptyTurnExecution, hasTrustedEmptyTurn } =
    await import("../../open-sse/utils/emptyTurnPolicy.ts");
  const upstream = new Response(
    'data: {"choices":[{"finish_reason":"stop","delta":{}}]}\n\ndata: [DONE]\n\n',
    { status: 200, headers: { "content-type": "text/event-stream" } }
  );
  const executed = markEmptyTurnExecution(upstream, "https://api.openai.com/v1/chat/completions", {
    connectionId: "conn-3",
    apiKey: "sk-test",
  });
  await executed.clone().text();
  assert.equal(hasTrustedEmptyTurn(executed), true, "fixture must be a trusted empty turn");
  // Force the clone path: the headers of this response refuse mutation.
  Object.defineProperty(executed.headers, "set", {
    value: () => {
      throw new TypeError("immutable headers");
    },
  });
  const out = withSelectedConnectionHeader(executed, "conn-3");
  assert.notEqual(out, executed, "immutable headers must produce a clone");
  assert.equal(out.headers.get("X-OmniRoute-Selected-Connection-Id"), "conn-3");
  assert.equal(hasTrustedEmptyTurn(out), true);
});
