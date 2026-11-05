import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-login-"));
process.env.DATA_DIR = dataDir;
process.env.JWT_SECRET = "isolated-proxy-login-test-secret";
process.env.INITIAL_PASSWORD = "isolated-proxy-login-password";
process.env.OMNIROUTE_PEER_STAMP_TOKEN = "isolated-proxy-stamp";
const core = await import("../../../src/lib/db/core.ts");
const route = await import("../../../src/app/api/auth/login/route.ts");
const guard = await import("../../../src/server/auth/loginGuard.ts");
const peer = await import("../../../src/server/auth/loginPeer.ts");
const compliance = await import("../../../src/lib/compliance/index.ts");
const originalCookies = route.authRouteInternals.getCookieStore;
route.authRouteInternals.getCookieStore = async () => ({ set() {} });

// Simulate the headers the pipeline adds AFTER stripping caller-supplied headers
// and validating the server's peer/client stamps. Raw forwarded IPs stay untrusted.
function request(client: string, password: string, forwarded = client) {
  return new Request("https://example.test/api/auth/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": forwarded,
      "x-omniroute-peer-locality": "remote",
      "x-omniroute-trusted-peer-ip": "127.0.0.1",
      "x-omniroute-trusted-client-ip": client,
    },
    body: JSON.stringify({ password }),
  });
}

test.beforeEach(() => guard.resetLoginGuardForTests());
test.after(() => {
  route.authRouteInternals.getCookieStore = originalCookies;
  guard.resetLoginGuardForTests();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("one client behind Nginx cannot lock out a different client", async () => {
  for (let attempt = 1; attempt <= 5; attempt++) {
    const response = await route.POST(request("198.51.100.10", "incorrect-password"));
    assert.equal(response.status, attempt < 5 ? 401 : 429);
  }
  const other = await route.POST(request("198.51.100.20", "isolated-proxy-login-password"));
  assert.equal(other.status, 200, "another client must retain its own attempt budget");
  const stillLocked = await route.POST(
    request("198.51.100.10", "isolated-proxy-login-password", "203.0.113.99")
  );
  assert.equal(stillLocked.status, 429, "successful login by B must not clear A's lock");
});

test("raw forwarded IP cannot change the validated client lockout key", () => {
  assert.equal(
    peer.getLoginLockoutKey(request("198.51.100.10", "wrong", "203.0.113.99"), "203.0.113.99"),
    "198.51.100.10"
  );
});

test("missing client stamp falls back to validated socket peer, never forwarded IP", () => {
  const req = request("198.51.100.10", "wrong");
  req.headers.delete("x-omniroute-trusted-client-ip");
  assert.equal(peer.getLoginLockoutKey(req, "203.0.113.99"), "127.0.0.1");
  req.headers.delete("x-omniroute-trusted-peer-ip");
  assert.equal(peer.getLoginLockoutKey(req, "203.0.113.99"), "__unknown_peer__");
});

test("failed-login audit records the validated client instead of the proxy", async () => {
  const response = await route.POST(request("198.51.100.30", "incorrect-password", "203.0.113.99"));
  assert.equal(response.status, 401);
  const [entry] = compliance.getAuditLog({ action: "auth.login.failed", limit: 1 });
  assert.equal(entry.ip_address, "198.51.100.30");
});
