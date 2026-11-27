import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "or9r-session-header-safe-"));

const { forwardOpencodeClientHeaders, resolveOpencodeCliDefaults } =
  await import("../../open-sse/utils/opencodeHeaders.ts");
const { preserveOpencodeSessionIdentity, resolveOpencodeSessionIdentity } =
  await import("../../open-sse/utils/opencodeSessionIdentity.ts");

const CJK = "会话-一二三";
const EMOJI = "session-🚀-1";

function outbound(sessionBody: Record<string, unknown>, cliDefaults?: unknown) {
  const headers: Record<string, string> = {};
  forwardOpencodeClientHeaders(
    headers,
    {},
    {
      synthesizeRequestId: true,
      cliDefaults: cliDefaults as undefined,
      sessionBody: sessionBody as never,
    }
  );
  return headers;
}

for (const [name, value] of [
  ["CJK", CJK],
  ["emoji", EMOJI],
] as const) {
  test(`${name} body session id does not break header construction`, () => {
    const headers = outbound({ session_id: value });
    assert.doesNotThrow(() => new Headers(headers));
    assert.ok(headers["x-opencode-session"], "the session id is kept, not dropped");
  });

  test(`${name} body session id maps to one stable value per conversation`, () => {
    const a1 = outbound({ session_id: value })["x-opencode-session"];
    const a2 = outbound({ session_id: value })["x-opencode-session"];
    const b = outbound({ session_id: `${value}-other` })["x-opencode-session"];
    assert.equal(a1, a2);
    assert.notEqual(a1, b);
  });

  test(`${name} id from preserveOpencodeSessionIdentity is header-safe`, () => {
    const headers: Record<string, string> = {};
    preserveOpencodeSessionIdentity(headers, {
      provider: "opencode-go",
      body: { metadata: { session_id: value } },
    });
    assert.doesNotThrow(() => new Headers(headers));
    assert.ok(headers["x-opencode-session"]);
  });
}

test("CLI synthesis off: a non-Latin-1 body session id still yields a header-safe value", () => {
  const previous = process.env.OPENCODE_SYNTHESIZE_CLI_HEADERS;
  process.env.OPENCODE_SYNTHESIZE_CLI_HEADERS = "false";
  try {
    const cliDefaults = resolveOpencodeCliDefaults("opencode-go", false);
    assert.equal(cliDefaults, undefined, "synthesis is disabled");
    const first = outbound({ session_id: "会话" }, cliDefaults);
    const second = outbound({ session_id: "会话" }, cliDefaults);
    assert.doesNotThrow(() => new Headers(first));
    assert.match(first["x-opencode-session"], /^[\x20-\xff]+$/);
    assert.equal(first["x-opencode-session"], second["x-opencode-session"]);
    assert.equal(
      outbound({ session_id: "conv-abc_123" }, cliDefaults)["x-opencode-session"],
      "conv-abc_123"
    );
  } finally {
    if (previous === undefined) delete process.env.OPENCODE_SYNTHESIZE_CLI_HEADERS;
    else process.env.OPENCODE_SYNTHESIZE_CLI_HEADERS = previous;
  }
});

test("Latin-1 and ASCII ids pass through unchanged", () => {
  assert.equal(resolveOpencodeSessionIdentity({}, { session_id: "conv-abc_123" }), "conv-abc_123");
  assert.equal(resolveOpencodeSessionIdentity({}, { session_id: "café-1" }), "café-1");
  assert.equal(resolveOpencodeSessionIdentity({ session_id: "  padded " }), "padded");
});

test("control characters and oversize ids are still rejected", () => {
  assert.equal(resolveOpencodeSessionIdentity({}, { session_id: "a\nb" }), undefined);
  assert.equal(resolveOpencodeSessionIdentity({}, { session_id: "x".repeat(257) }), undefined);
  assert.equal(resolveOpencodeSessionIdentity({}, { session_id: "   " }), undefined);
});

test("distinct lone-surrogate ids keep distinct hashed session values", () => {
  const high = resolveOpencodeSessionIdentity({}, { session_id: "conv-\ud800" });
  const low = resolveOpencodeSessionIdentity({}, { session_id: "conv-\udc00" });
  assert.ok(high && low, "both ids are kept");
  assert.notEqual(high, low);
  assert.doesNotThrow(() => new Headers({ "x-opencode-session": high }));
});
