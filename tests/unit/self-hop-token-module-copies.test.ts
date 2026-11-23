// #13593 follow-up: the own-listener self-hop token must be one value per process,
// not one per module instance.
//
// Next.js bundles `@omniroute/open-sse` (it is in `transpilePackages`, not external), so
// `open-sse/utils/selfHop.ts` gets one module instance per bundle/layer. The stamping
// side is the global fetch patch, which `proxyFetch.ts` installs ONCE per process from
// whichever copy loads first (`patchState.isPatched` lives on globalThis) — in production
// that is the instrumentation bundle (`src/instrumentation-node.ts`). The verifying side
// (`isInternalAdmissionBypass` in `chatAdmissionIdentity.ts`) runs in the route bundles.
// A module-level token therefore gives the stamper and the verifier different random
// values, and the admission bypass silently never matches. #14740 hit the same split for
// the self-loop secret and moved it to globalThis; this locks the self-hop token to the
// same invariant. Loading the module under distinct query strings yields separate
// module records, which reproduces the bundle duplication in node:test.
import test from "node:test";
import assert from "node:assert/strict";

type SelfHopModule = typeof import("../../open-sse/utils/selfHop.ts");

const stamper: SelfHopModule = await import("../../open-sse/utils/selfHop.ts?copy=instrumentation");
const verifier: SelfHopModule = await import("../../open-sse/utils/selfHop.ts?copy=route");
const { isInternalAdmissionBypass } =
  await import("../../src/shared/middleware/chatAdmissionIdentity.ts");

const OWN_URL = "http://127.0.0.1:20128/v1/chat/completions";

function withPort<T>(fn: () => T): T {
  const previous = process.env.PORT;
  process.env.PORT = "20128";
  try {
    return fn();
  } finally {
    if (previous === undefined) delete process.env.PORT;
    else process.env.PORT = previous;
  }
}

test("separate module copies of selfHop.ts agree on the process token", () => {
  assert.notEqual(stamper, verifier, "the test must exercise two module records");
  assert.equal(stamper.ownListenerSelfHopToken(), verifier.ownListenerSelfHopToken());
});

test("a hop stamped by one module copy is accepted by another copy's verifier", () => {
  withPort(() => {
    const init: { headers?: HeadersInit } = {};
    stamper.stampOwnListenerSelfHop(OWN_URL, init);
    const stamped = new Headers(init.headers).get(stamper.SELF_HOP_HEADER);
    assert.ok(stamped, "own-listener hop must carry the self-hop header");
    assert.equal(verifier.isOwnListenerSelfHop(stamped), true);

    const request = new Request(OWN_URL, { headers: init.headers });
    assert.equal(isInternalAdmissionBypass(request), true);
  });
});

test("a forged self-hop value is still rejected by every copy", () => {
  for (const copy of [stamper, verifier]) {
    assert.equal(copy.isOwnListenerSelfHop("internal"), false);
    assert.equal(copy.isOwnListenerSelfHop(""), false);
    assert.equal(copy.isOwnListenerSelfHop("0".repeat(64)), false);
  }
});
