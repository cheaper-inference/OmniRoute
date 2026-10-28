// The authz pipeline already resolves a trusted-proxy-aware client address for the IP allow/deny
// list: the TCP peer on a direct connection, or the client a trusted proxy reported for it
// (scripts/dev/peer-stamp.mjs). Route handlers that key a per-client control on "who is calling"
// (the relay throttle) must read that same resolution through a pipeline-stamped header — one the
// pipeline strips from client input first, so a caller can neither pre-set it nor move it with
// X-Forwarded-For on a direct connection.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { NextRequest } from "next/server";
import { wrapRequestListenerWithPeerStamp } from "../../../scripts/dev/peer-stamp.mjs";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-trusted-client-ip-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = "test-secret-trusted-client-ip";

const core = await import("../../../src/lib/db/core.ts");
const pipeline = await import("../../../src/server/authz/pipeline.ts");
const authzHeaders = await import("../../../src/server/authz/headers.ts");

// The wire name is pinned on purpose: route handlers and the pipeline must agree on it.
const TRUSTED_CLIENT_IP = "x-omniroute-trusted-client-ip";
const RELAY_PATH = "/api/v1/relay/chat/completions";

const ORIGINAL_STAMP_TOKEN = process.env.OMNIROUTE_PEER_STAMP_TOKEN;
const ORIGINAL_TRUSTED_PROXIES = process.env.OMNIROUTE_TRUSTED_PROXIES;
const ORIGINAL_REQUIRE_API_KEY = process.env.REQUIRE_API_KEY;

function restoreEnv(name: string, value: string | undefined) {
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  restoreEnv("DATA_DIR", ORIGINAL_DATA_DIR);
  restoreEnv("OMNIROUTE_PEER_STAMP_TOKEN", ORIGINAL_STAMP_TOKEN);
  restoreEnv("OMNIROUTE_TRUSTED_PROXIES", ORIGINAL_TRUSTED_PROXIES);
  restoreEnv("REQUIRE_API_KEY", ORIGINAL_REQUIRE_API_KEY);
});

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  process.env.OMNIROUTE_PEER_STAMP_TOKEN = "stamp-tok";
  delete process.env.OMNIROUTE_TRUSTED_PROXIES;
  delete process.env.REQUIRE_API_KEY;
});

const DIRECT_CLIENT = "203.0.113.10";
const PROXIED_CLIENT = "198.51.100.7";
const FORGED = "192.0.2.66";

// What the custom server does before the request reaches the pipeline: stamp the socket peer.
function stampedRequest(peer: string, headers: Record<string, string>) {
  const stamped: Record<string, string> = {};
  wrapRequestListenerWithPeerStamp((req: { headers: Record<string, string> }) => {
    Object.assign(stamped, req.headers);
  })({ headers: { ...headers }, socket: { remoteAddress: peer } } as never, {} as never);
  return new NextRequest(`http://localhost${RELAY_PATH}`, { method: "POST", headers: stamped });
}

// A request that never went through the custom server (plain `next dev`, or a forger that
// skipped it): no stamps at all, only what the client sent.
function unstampedRequest(headers: Record<string, string>) {
  return new NextRequest(`http://localhost${RELAY_PATH}`, { method: "POST", headers });
}

// The headers the route handler receives after the pipeline ran.
async function forwardedHeaders(request: NextRequest): Promise<Headers> {
  const res = await pipeline.runAuthzPipeline(request, { enforce: true });
  assert.equal(res.headers.get("x-middleware-next"), "1", `pipeline blocked: ${res.status}`);
  const forwarded = new Headers();
  for (const [name, value] of res.headers) {
    if (name.startsWith("x-middleware-request-")) {
      forwarded.set(name.slice("x-middleware-request-".length), value);
    }
  }
  return forwarded;
}

test("the stamped client-address header is one the pipeline never trusts from a client", () => {
  assert.equal(authzHeaders.AUTHZ_HEADER_TRUSTED_CLIENT_IP, TRUSTED_CLIENT_IP);
  assert.ok(
    authzHeaders.AUTHZ_TRUSTED_HEADERS.includes(TRUSTED_CLIENT_IP),
    "must be in AUTHZ_TRUSTED_HEADERS so client-supplied values are stripped before stamping"
  );
});

test("a direct client's X-Forwarded-For does not change the forwarded client address", async () => {
  for (const forged of [
    { "x-forwarded-for": FORGED },
    { "x-real-ip": FORGED },
    { "x-forwarded-for": `${FORGED}, ${PROXIED_CLIENT}` },
  ]) {
    const forwarded = await forwardedHeaders(stampedRequest(DIRECT_CLIENT, forged));
    assert.equal(forwarded.get(TRUSTED_CLIENT_IP), DIRECT_CLIENT, Object.keys(forged)[0]);
  }
});

test("behind a trusted proxy the forwarded client address is the one the proxy reported", async () => {
  // Loopback proxy (nginx / Caddy on the same host).
  let forwarded = await forwardedHeaders(
    stampedRequest("127.0.0.1", { "x-forwarded-for": PROXIED_CLIENT })
  );
  assert.equal(forwarded.get(TRUSTED_CLIENT_IP), PROXIED_CLIENT);

  // Two clients behind the same proxy are told apart — they must not collapse into the proxy.
  forwarded = await forwardedHeaders(
    stampedRequest("127.0.0.1", { "x-forwarded-for": DIRECT_CLIENT })
  );
  assert.equal(forwarded.get(TRUSTED_CLIENT_IP), DIRECT_CLIENT);

  // A proxy on a public address counts only once the operator names it.
  const publicProxy = "198.51.100.200";
  forwarded = await forwardedHeaders(
    stampedRequest(publicProxy, { "x-forwarded-for": PROXIED_CLIENT })
  );
  assert.equal(forwarded.get(TRUSTED_CLIENT_IP), publicProxy, "unnamed public proxy");

  process.env.OMNIROUTE_TRUSTED_PROXIES = "198.51.100.0/24";
  forwarded = await forwardedHeaders(
    stampedRequest(publicProxy, { "x-forwarded-for": PROXIED_CLIENT })
  );
  assert.equal(forwarded.get(TRUSTED_CLIENT_IP), PROXIED_CLIENT, "named public proxy");
});

test("a client cannot pre-set the stamped client address", async () => {
  // Through the custom server: the injected value is stripped and the real one stamped over it.
  let forwarded = await forwardedHeaders(
    stampedRequest(DIRECT_CLIENT, { [TRUSTED_CLIENT_IP]: FORGED })
  );
  assert.equal(forwarded.get(TRUSTED_CLIENT_IP), DIRECT_CLIENT);

  // Without the custom server: no stamp means no header reaches the route — never the client's.
  forwarded = await forwardedHeaders(
    unstampedRequest({ [TRUSTED_CLIENT_IP]: FORGED, "x-forwarded-for": FORGED })
  );
  assert.equal(forwarded.has(TRUSTED_CLIENT_IP), false, "unstamped request");

  // A forged server stamp with the wrong token is not a stamp.
  forwarded = await forwardedHeaders(
    unstampedRequest({ "x-omniroute-client-ip": `wrong-token|${FORGED}` })
  );
  assert.equal(forwarded.has(TRUSTED_CLIENT_IP), false, "forged stamp token");
});
