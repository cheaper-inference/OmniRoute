/**
 * buildSelfLoopHeaders must not put a Bearer token on a plain-http base URL that
 * leaves the private network. https stays allowed, and so does http to loopback,
 * a container or service name, or a private address.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { inspect } from "node:util";

const { buildSelfLoopHeaders, mayForwardSelfLoopCredential, UnsafeSelfLoopTargetError } =
  await import("../../src/lib/a2a/selfLoopAuth.ts");

const ORIGINAL_KEY = process.env.OMNIROUTE_API_KEY;
process.env.OMNIROUTE_API_KEY = "sk-env-self-loop-target";

/**
 * Occurrences of `literal` in `text`. A plain text search over rendered output (task records,
 * an inspected error): the text is not a URL, so there is no hostname to parse and compare.
 */
function occurrences(text: string, literal: string): number {
  return text.split(literal).length - 1;
}

test.after(() => {
  if (ORIGINAL_KEY === undefined) delete process.env.OMNIROUTE_API_KEY;
  else process.env.OMNIROUTE_API_KEY = ORIGINAL_KEY;
});

test("mayForwardSelfLoopCredential: https any host, http only inside the private network", () => {
  assert.equal(mayForwardSelfLoopCredential("https://example.com"), true);
  assert.equal(mayForwardSelfLoopCredential("https://10.0.0.5:443/v1"), true);
  assert.equal(mayForwardSelfLoopCredential("http://localhost:20128"), true);
  assert.equal(mayForwardSelfLoopCredential("http://127.0.0.1:20128"), true);
  assert.equal(mayForwardSelfLoopCredential("http://[::1]:20128"), true);
  // Unbracketed ::1 is not a valid URL hostname; mayForward must reject it.
  assert.equal(mayForwardSelfLoopCredential("http://::1:20128"), false);
  assert.equal(mayForwardSelfLoopCredential("http://example.com"), false);
  assert.equal(mayForwardSelfLoopCredential("http://gw.example.com:20128"), false);
  assert.equal(mayForwardSelfLoopCredential("http://8.8.8.8:20128"), false);
  assert.equal(mayForwardSelfLoopCredential("http://172.32.0.1:20128"), false);
  assert.equal(mayForwardSelfLoopCredential("http://[2001:4860:4860::8888]:20128"), false);
  assert.equal(mayForwardSelfLoopCredential("http://169.254.169.254/"), false);
  assert.equal(mayForwardSelfLoopCredential("http://[fe80::1]:20128"), false);
  assert.equal(mayForwardSelfLoopCredential("http://user:pass@localhost:20128"), false);
  assert.equal(mayForwardSelfLoopCredential("ftp://localhost"), false);
  assert.equal(mayForwardSelfLoopCredential("not-a-url"), false);
});

test("mayForwardSelfLoopCredential: http to a container or private host stays allowed", () => {
  // docs/guides/DOCKER_GUIDE.md documents this one as the internal self-fetch URL.
  assert.equal(mayForwardSelfLoopCredential("http://omniroute:20128"), true);
  assert.equal(mayForwardSelfLoopCredential("http://omniroute.default.svc.cluster.local"), true);
  assert.equal(mayForwardSelfLoopCredential("http://omniroute.internal:20128"), true);
  assert.equal(mayForwardSelfLoopCredential("http://0.0.0.0:20128"), true);
  assert.equal(mayForwardSelfLoopCredential("http://10.0.0.5:20128"), true);
  assert.equal(mayForwardSelfLoopCredential("http://172.18.0.2:20128"), true);
  assert.equal(mayForwardSelfLoopCredential("http://192.168.0.15:20128"), true);
  assert.equal(mayForwardSelfLoopCredential("http://[fd00::5]:20128"), true);
  assert.equal(mayForwardSelfLoopCredential("http://user:pass@omniroute:20128"), false);
});

test("mayForwardSelfLoopCredential: an IPv6 literal is judged by the IPv4 address it maps to", () => {
  // new URL() rewrites these to hex (::ffff:808:808), which is no dotted address to classify.
  assert.equal(mayForwardSelfLoopCredential("http://[::ffff:8.8.8.8]:20128"), false);
  assert.equal(mayForwardSelfLoopCredential("http://[::ffff:808:808]:20128"), false);
  assert.equal(mayForwardSelfLoopCredential("http://[::ffff:169.254.169.254]/"), false);
  assert.equal(mayForwardSelfLoopCredential("http://[::ffff:127.0.0.1]:20128"), true);
  assert.equal(mayForwardSelfLoopCredential("http://[::ffff:10.0.0.5]:20128"), true);
  assert.equal(mayForwardSelfLoopCredential("http://[64:ff9b::808:808]:20128"), false);
  assert.equal(mayForwardSelfLoopCredential("http://[::]:20128"), false);
});

test("mayForwardSelfLoopCredential: a public name that looks like a loopback address is refused", () => {
  assert.equal(mayForwardSelfLoopCredential("http://127.evil.example:20128"), false);
  assert.equal(mayForwardSelfLoopCredential("http://127.0.0.1.nip.io:20128"), false);
  assert.equal(mayForwardSelfLoopCredential("http://127.0.0.2:20128"), true);
});

test("mayForwardSelfLoopCredential: cloud-metadata names are refused like their addresses", () => {
  assert.equal(mayForwardSelfLoopCredential("http://metadata.google.internal/"), false);
  assert.equal(mayForwardSelfLoopCredential("http://metadata.google.internal./"), false);
  assert.equal(mayForwardSelfLoopCredential("http://metadata/"), false);
  assert.equal(mayForwardSelfLoopCredential("http://instance-data/"), false);
  assert.equal(mayForwardSelfLoopCredential("http://[fd00:ec2::254]/"), false);
});

test("buildSelfLoopHeaders sends no Bearer to a mapped public or metadata address", () => {
  for (const url of [
    "http://[::ffff:8.8.8.8]:20128",
    "http://[::ffff:169.254.169.254]/",
    "http://127.evil.example:20128",
    "http://metadata.google.internal/",
  ]) {
    assert.throws(
      () => buildSelfLoopHeaders({ apiKey: "sk-caller" }, url),
      UnsafeSelfLoopTargetError,
      url
    );
  }
});

test("buildSelfLoopHeaders attaches Bearer on a private http target and on https", () => {
  for (const url of [
    "http://localhost:20128",
    "http://127.0.0.1:20128",
    "http://omniroute:20128",
    "https://gateway.example",
  ]) {
    const headers = buildSelfLoopHeaders({ apiKey: "sk-caller" }, url);
    assert.equal(headers.Authorization, "Bearer sk-caller", url);
  }
});

test("buildSelfLoopHeaders refuses a cleartext public target when a key would be sent", () => {
  assert.throws(
    () => buildSelfLoopHeaders({ apiKey: "sk-caller" }, "http://evil.example:8080"),
    UnsafeSelfLoopTargetError
  );
  assert.throws(
    () => buildSelfLoopHeaders(undefined, "http://203.0.113.9"),
    UnsafeSelfLoopTargetError
  );
});

test("UnsafeSelfLoopTargetError keeps the configured URL out of the error", () => {
  assert.throws(
    () => buildSelfLoopHeaders({ apiKey: "sk-caller" }, "https://proxyuser:s3cret@gw.example.com"),
    (err: unknown) => {
      assert.ok(err instanceof UnsafeSelfLoopTargetError);
      const shown = inspect(err, { depth: 6 });
      assert.equal(occurrences(shown, "s3cret"), 0, shown);
      assert.equal(occurrences(shown, "gw.example.com"), 0, shown);
      return true;
    }
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
