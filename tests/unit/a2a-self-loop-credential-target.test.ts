/**
 * buildSelfLoopHeaders must not put a Bearer token on a cleartext non-loopback
 * OMNIROUTE_BASE_URL. https and loopback http stay allowed.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { buildSelfLoopHeaders, mayForwardSelfLoopCredential, UnsafeSelfLoopTargetError } =
  await import("../../src/lib/a2a/selfLoopAuth.ts");

const ORIGINAL_KEY = process.env.OMNIROUTE_API_KEY;
process.env.OMNIROUTE_API_KEY = "sk-env-self-loop-target";

test.after(() => {
  if (ORIGINAL_KEY === undefined) delete process.env.OMNIROUTE_API_KEY;
  else process.env.OMNIROUTE_API_KEY = ORIGINAL_KEY;
});

test("mayForwardSelfLoopCredential: https any host, http only loopback", () => {
  assert.equal(mayForwardSelfLoopCredential("https://example.com"), true);
  assert.equal(mayForwardSelfLoopCredential("https://10.0.0.5:443/v1"), true);
  assert.equal(mayForwardSelfLoopCredential("http://localhost:20128"), true);
  assert.equal(mayForwardSelfLoopCredential("http://127.0.0.1:20128"), true);
  assert.equal(mayForwardSelfLoopCredential("http://[::1]:20128"), true);
  // Unbracketed ::1 is not a valid URL hostname; mayForward must reject it.
  assert.equal(mayForwardSelfLoopCredential("http://::1:20128"), false);
  assert.equal(mayForwardSelfLoopCredential("http://example.com"), false);
  assert.equal(mayForwardSelfLoopCredential("http://10.0.0.5:20128"), false);
  assert.equal(mayForwardSelfLoopCredential("http://169.254.169.254/"), false);
  assert.equal(mayForwardSelfLoopCredential("http://user:pass@localhost:20128"), false);
  assert.equal(mayForwardSelfLoopCredential("ftp://localhost"), false);
  assert.equal(mayForwardSelfLoopCredential("not-a-url"), false);
});

test("buildSelfLoopHeaders attaches Bearer on loopback http and on https", () => {
  for (const url of [
    "http://localhost:20128",
    "http://127.0.0.1:20128",
    "https://gateway.example",
  ]) {
    const headers = buildSelfLoopHeaders({ apiKey: "sk-caller" }, url);
    assert.equal(headers.Authorization, "Bearer sk-caller", url);
  }
});

test("buildSelfLoopHeaders refuses a cleartext non-loopback target when a key would be sent", () => {
  assert.throws(
    () => buildSelfLoopHeaders({ apiKey: "sk-caller" }, "http://evil.example:8080"),
    (err: unknown) => {
      assert.ok(err instanceof UnsafeSelfLoopTargetError);
      assert.match((err as Error).message, /http:\/\/evil\.example:8080/);
      return true;
    }
  );
  assert.throws(
    () => buildSelfLoopHeaders(undefined, "http://203.0.113.9"),
    UnsafeSelfLoopTargetError
  );
});

test("buildSelfLoopHeaders omits Authorization when no key is available, even on an unsafe URL", () => {
  const saved = process.env.OMNIROUTE_API_KEY;
  delete process.env.OMNIROUTE_API_KEY;
  try {
    const headers = buildSelfLoopHeaders({ apiKey: null }, "http://evil.example");
    assert.equal(headers.Authorization, undefined);
    assert.equal(headers["Content-Type"], "application/json");
  } finally {
    process.env.OMNIROUTE_API_KEY = saved;
  }
});

test("caller apiKey wins over OMNIROUTE_API_KEY on a safe target", () => {
  const headers = buildSelfLoopHeaders({ apiKey: "sk-caller" }, "http://localhost");
  assert.equal(headers.Authorization, "Bearer sk-caller");
});
