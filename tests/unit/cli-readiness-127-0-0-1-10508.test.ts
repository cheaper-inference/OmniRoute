import test from "node:test";
import assert from "node:assert/strict";
import { waitForServer } from "../../bin/cli/utils/pid.mjs";

// Regression guard for #10508: pollHealthOnce() used "localhost" (forcing DNS
// resolution) while the sibling isPortListening() already hard-codes 127.0.0.1
// for exactly this reason. A slow "localhost" DNS lookup (Windows VPN
// split-DNS/search-suffix probing, corporate resolvers, DNS-filtering
// security software) can exceed the 2s per-poll timeout and make
// waitForServer() report "hanging" forever even though the server is healthy.

for (const readyHost of ["127.0.0.1", "[::1]"]) {
  test(`issue #10508: readiness uses literal loopbacks when ${readyHost} answers`, async (t) => {
    const port = 20128;
    const requested: string[] = [];
    const outcomes: string[] = [];
    // Exercise the real polling path without DNS, sockets, or source formatting
    // assumptions. The sibling socket tests cover timeout and TCP fallback.
    t.mock.method(globalThis, "fetch", async (input: string | URL | Request) => {
      const url = String(input);
      requested.push(url);
      return new Response("", {
        status: url === `http://${readyHost}:${port}/api/monitoring/health` ? 200 : 503,
      });
    });

    assert.equal(
      await waitForServer(port, 500, { onOutcome: (outcome: string) => outcomes.push(outcome) }),
      true
    );
    const [ipv4Request, ipv6Request, ...unexpectedRequests] = requested.sort();
    assert.equal(ipv4Request, `http://127.0.0.1:${port}/api/monitoring/health`);
    assert.equal(ipv6Request, `http://[::1]:${port}/api/monitoring/health`);
    assert.deepEqual(unexpectedRequests, [], "readiness must probe each loopback exactly once");
    assert.deepEqual(outcomes, ["ready"], "either loopback must succeed without TCP fallback");
  });
}
