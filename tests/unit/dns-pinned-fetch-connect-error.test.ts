/**
 * A pinned connection that fails at once (ENETUNREACH when there is no route to the pinned
 * address) must reject the fetch. When the pinned lookup answered synchronously, the connect
 * error fired before undici had wrapped the socket in TLS: the fetch rejected with "Cannot
 * read properties of null (reading 'setServername')" and the ENETUNREACH itself escaped as an
 * uncaughtException, which stops the server.
 *
 * The failure is immediate only where 203.0.113.0/24 has no route, as in the network-isolated
 * test run (`unshare -rn`). With a route the connection times out instead, and the test still
 * checks that no error escapes.
 */

import test from "node:test";
import assert from "node:assert/strict";

const { createPinnedFetch } = await import("../../src/shared/network/dnsPinnedFetch.ts");

test("a pinned fetch whose connection fails rejects without an uncaughtException", async () => {
  const escaped: unknown[] = [];
  const onUncaught = (err: unknown) => escaped.push(err);
  // node:test reports an uncaughtException as a failure of the running test; listening
  // here records it so the assertion below can name it.
  process.prependListener("uncaughtException", onUncaught);
  try {
    const pinned = createPinnedFetch("203.0.113.8", 4);
    await assert.rejects(
      pinned("https://media.example/v.mp4", { signal: AbortSignal.timeout(500) }),
      (err: unknown) => !/setServername/.test(String((err as { cause?: unknown })?.cause))
    );
    await new Promise((resolve) => setTimeout(resolve, 200));
    assert.deepEqual(escaped.map(String), []);
  } finally {
    process.removeListener("uncaughtException", onUncaught);
  }
});
