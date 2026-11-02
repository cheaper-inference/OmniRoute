import test from "node:test";
import assert from "node:assert/strict";

import {
  DEVIN_PASSWORD_LOGIN_URL,
  DEVIN_POST_AUTH_URL,
  DEVIN_GET_OTT_URL,
  DEVIN_REGISTER_USER_URL,
  encodeVarint,
  readVarint,
  encodeProtoString,
  decodeProto,
  protoString,
  findSubslice,
  truncateToken,
} from "../../src/lib/oauth/devinAuth.ts";
import { devinAuth } from "../../src/lib/oauth/services/devinAuth.ts";

// ---------------------------------------------------------------------------
// Protobuf wire codec — ported from cockpit-tools windsurf_devin_oauth.rs
// ---------------------------------------------------------------------------

test("varint round-trips across the 1/2/3/5 byte boundaries", () => {
  for (const n of [0, 1, 127, 128, 16383, 16384, 2097151, 2097152, 268435455, 268435456]) {
    const encoded = encodeVarint(n);
    const decoded = readVarint(encoded, 0);
    assert.notEqual(decoded, null, `failed to decode ${n}`);
    assert.equal(decoded.value, n);
    assert.equal(decoded.offset, encoded.length);
  }
});

test("encodeVarint produces the expected canonical bytes", () => {
  assert.deepEqual([...encodeVarint(0)], [0x00]);
  assert.deepEqual([...encodeVarint(1)], [0x01]);
  assert.deepEqual([...encodeVarint(127)], [0x7f]);
  assert.deepEqual([...encodeVarint(128)], [0x80, 0x01]);
  assert.deepEqual([...encodeVarint(300)], [0xac, 0x02]);
});

test("readVarint reports truncation instead of inventing a value", () => {
  assert.equal(readVarint(new Uint8Array([]), 0), null);
  // Continuation bit set but no following byte.
  assert.equal(readVarint(new Uint8Array([0x80]), 0), null);
  assert.equal(readVarint(new Uint8Array([0x80, 0x80]), 0), null);
});

test("encodeProtoString lays out tag, length and UTF-8 payload", () => {
  const encoded = encodeProtoString(1, "abc");
  // field 1, wire type 2 => tag 0x0a, length 3, then payload
  assert.deepEqual([...encoded], [0x0a, 0x03, 0x61, 0x62, 0x63]);

  const empty = encodeProtoString(1, "");
  assert.deepEqual([...empty], [0x0a, 0x00]);
});

test("encodeProtoString encodes multi-byte UTF-8 lengths in bytes not chars", () => {
  const encoded = encodeProtoString(1, "ñ");
  // "ñ" is 2 UTF-8 bytes
  assert.deepEqual([...encoded], [0x0a, 0x02, 0xc3, 0xb1]);
});

test("decodeProto reads back string and varint fields", () => {
  const buf = new Uint8Array([
    ...encodeProtoString(1, "hello"),
    ...encodeVarint((3 << 3) | 0), // field 3, wire type 0
    ...encodeVarint(42),
    ...encodeProtoString(5, "world"),
  ]);
  const fields = decodeProto(buf);
  assert.equal(protoString(fields, 1), "hello");
  assert.equal(protoString(fields, 5), "world");
  assert.equal(fields.get(3)?.[0]?.value, 42);
  assert.equal(protoString(fields, 99), null);
});

test("decodeProto tolerates a truncated tail without throwing", () => {
  const truncated = new Uint8Array([0x0a, 0x10, 0x61]); // claims 16 bytes, has 1
  const fields = decodeProto(truncated);
  assert.equal(protoString(fields, 1), null);
});

test("protoString ignores empty strings, matching the Rust helper", () => {
  const fields = decodeProto(encodeProtoString(1, ""));
  assert.equal(protoString(fields, 1), null);
});

test("findSubslice locates an ASCII marker inside binary data", () => {
  const hay = Buffer.from([0x08, 0xff, ...Buffer.from("devin-session-token$abc"), 0x00]);
  const at = findSubslice(hay, Buffer.from("devin-session-token$"));
  assert.equal(at, 2);
  assert.equal(findSubslice(hay, Buffer.from("nope")), -1);
  assert.equal(findSubslice(hay, Buffer.from("")), -1);
});

test("truncateToken never echoes a full credential", () => {
  const full = "auth1_abcdefghijklmnopqrstuvwxyz";
  const out = truncateToken(full, 10);
  assert.ok(out.startsWith("auth1_abcd"));
  assert.ok(!out.includes("uvwxyz"));
  assert.equal(truncateToken("short", 10), "short");
});

// ---------------------------------------------------------------------------
// Endpoints
// ---------------------------------------------------------------------------

test("the Devin Auth endpoints match cockpit-tools", () => {
  assert.equal(DEVIN_PASSWORD_LOGIN_URL, "https://windsurf.com/_devin-auth/password/login");
  assert.equal(
    DEVIN_POST_AUTH_URL,
    "https://windsurf.com/_backend/exa.seat_management_pb.SeatManagementService/WindsurfPostAuth"
  );
  assert.equal(
    DEVIN_GET_OTT_URL,
    "https://windsurf.com/_backend/exa.seat_management_pb.SeatManagementService/GetOneTimeAuthToken"
  );
  assert.equal(
    DEVIN_REGISTER_USER_URL,
    "https://register.windsurf.com/exa.seat_management_pb.SeatManagementService/RegisterUser"
  );
});

// ---------------------------------------------------------------------------
// Login flow — the fake fetch asserts method, headers and proto bodies
// ---------------------------------------------------------------------------

type Call = { url: string; init: RequestInit };

function stubFetch(handlers: Array<(call: Call) => Response | Promise<Response>>): {
  calls: Call[];
  restore: () => void;
} {
  const calls: Call[] = [];
  const original = globalThis.fetch;
  let index = 0;
  globalThis.fetch = (async (url: unknown, init?: RequestInit) => {
    const call: Call = { url: String(url), init: init ?? {} };
    calls.push(call);
    const handler = handlers[Math.min(index, handlers.length - 1)];
    index += 1;
    return handler(call);
  }) as typeof fetch;
  return { calls, restore: () => (globalThis.fetch = original) };
}

const IDE_TOKEN = "devin-session-token$ide-from-register";
const AUTH1 = "auth1_long_lived_credential_value";
const SESSION = "devin-session-token$session-value";
const OTT = "ott$one-time-value";

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * RegisterUser answers with a proto blob where the ide_token appears as a raw
 * printable ASCII run. Mirror that, including a non-printable length prefix.
 */
function registerBlob(): Uint8Array {
  return Uint8Array.from([0x0a, 0x2a, ...new TextEncoder().encode(IDE_TOKEN), 0x00]);
}

test("loginWithPassword walks password -> PostAuth -> OTT -> RegisterUser", async () => {
  const stub = stubFetch([
    () => jsonResponse({ auth1_token: AUTH1, user_id: "u_1", email: "a@b.c" }),
    () =>
      new Response(
        Uint8Array.from([
          ...encodeProtoString(2, SESSION),
          ...encodeProtoString(3, AUTH1),
          ...encodeProtoString(4, "acct_1"),
          ...encodeProtoString(5, "org_1"),
        ]),
        { status: 200 }
      ),
    () => new Response(Uint8Array.from(encodeProtoString(1, OTT)), { status: 200 }),
    () => new Response(registerBlob(), { status: 200 }),
  ]);

  try {
    const result = await devinAuth.loginWithPassword("a@b.c", "hunter2");
    assert.equal(result.ideToken, IDE_TOKEN);
    assert.equal(result.auth1Token, AUTH1);
    assert.equal(result.accountId, "acct_1");
    assert.equal(result.orgId, "org_1");
    assert.equal(result.sessionToken, SESSION);
    assert.equal(result.email, "a@b.c");

    assert.equal(stub.calls.length, 5);
    assert.equal(stub.calls[0].url, DEVIN_PASSWORD_LOGIN_URL);
    assert.equal(stub.calls[0].init.method, "POST");
    const loginBody = JSON.parse(String(stub.calls[0].init.body));
    assert.deepEqual(loginBody, { email: "a@b.c", password: "hunter2", product: "Windsurf" });

    assert.equal(stub.calls[1].url, DEVIN_POST_AUTH_URL);
    const postAuthBody = new Uint8Array(stub.calls[1].init.body as Uint8Array);
    assert.equal(protoString(decodeProto(postAuthBody), 1), AUTH1);

    assert.equal(stub.calls[3].url, DEVIN_REGISTER_USER_URL);
    const registerBody = new Uint8Array(stub.calls[3].init.body as Uint8Array);
    assert.equal(protoString(decodeProto(registerBody), 1), OTT);
  } finally {
    stub.restore();
  }
});

test("the auth1 header is sent to PostAuth and GetOneTimeAuthToken but not to RegisterUser", async () => {
  const stub = stubFetch([
    () => jsonResponse({ auth1_token: AUTH1 }),
    () =>
      new Response(
        Uint8Array.from([
          ...encodeProtoString(2, SESSION),
          ...encodeProtoString(4, "acct_1"),
          ...encodeProtoString(5, "org_1"),
        ]),
        { status: 200 }
      ),
    () => new Response(Uint8Array.from(encodeProtoString(1, OTT)), { status: 200 }),
    () => new Response(registerBlob(), { status: 200 }),
  ]);

  try {
    await devinAuth.loginWithPassword("a@b.c", "pw");
    const headersOf = (i: number) => (stub.calls[i].init.headers ?? {}) as Record<string, string>;

    assert.equal(headersOf(1)["x-devin-auth1-token"], AUTH1);
    assert.equal(headersOf(1)["Content-Type"], "application/proto");
    assert.equal(headersOf(2)["x-devin-auth1-token"], AUTH1);
    assert.equal(headersOf(2)["x-devin-session-token"], SESSION);
    assert.equal(headersOf(2)["x-devin-account-id"], "acct_1");

    const registerHeaders = headersOf(3);
    assert.equal(registerHeaders["x-devin-auth1-token"], undefined);
    assert.equal(registerHeaders["User-Agent"], "connect-es/1.5.0");
    assert.equal(registerHeaders["Content-Type"], "application/proto");
  } finally {
    stub.restore();
  }
});

test("loginWithPassword refuses empty credentials before any network call", async () => {
  const stub = stubFetch([() => jsonResponse({})]);
  try {
    await assert.rejects(() => devinAuth.loginWithPassword("", "pw"), /email/i);
    await assert.rejects(() => devinAuth.loginWithPassword("a@b.c", ""), /password/i);
    assert.equal(stub.calls.length, 0);
  } finally {
    stub.restore();
  }
});

test("a 401 on the password login surfaces invalid credentials, not a raw upstream body", async () => {
  const stub = stubFetch([() => jsonResponse({ message: "EMAIL_NOT_FOUND" }, 401)]);
  try {
    await assert.rejects(
      () => devinAuth.loginWithPassword("a@b.c", "pw"),
      (err: Error & { status?: number; code?: string }) => {
        assert.equal(err.status, 401);
        assert.equal(err.code, "invalid_credentials");
        assert.doesNotMatch(err.message, /EMAIL_NOT_FOUND/);
        return true;
      }
    );
  } finally {
    stub.restore();
  }
});

test("a 429 on the password login maps to a rate-limit error", async () => {
  const stub = stubFetch([() => jsonResponse({}, 429)]);
  try {
    await assert.rejects(
      () => devinAuth.loginWithPassword("a@b.c", "pw"),
      (err: Error & { status?: number; code?: string }) => {
        assert.equal(err.status, 429);
        assert.equal(err.code, "rate_limited");
        return true;
      }
    );
  } finally {
    stub.restore();
  }
});

test("RegisterUser without an ide_token is a hard failure", async () => {
  const stub = stubFetch([
    () => jsonResponse({ auth1_token: AUTH1 }),
    () =>
      new Response(
        Uint8Array.from([
          ...encodeProtoString(2, SESSION),
          ...encodeProtoString(4, "acct_1"),
          ...encodeProtoString(5, "org_1"),
        ]),
        { status: 200 }
      ),
    () => new Response(Uint8Array.from(encodeProtoString(1, OTT)), { status: 200 }),
    // A proto blob that carries no devin-session-token$ marker at all.
    () => new Response(Uint8Array.from([0x0a, 0x03, 0x61, 0x62, 0x63]), { status: 200 }),
  ]);

  try {
    await assert.rejects(
      () => devinAuth.loginWithPassword("a@b.c", "pw"),
      (err: Error & { code?: string }) => {
        assert.equal(err.code, "missing_ide_token");
        return true;
      }
    );
  } finally {
    stub.restore();
  }
});

test("refreshFromAuth1 needs no password and re-derives the ide token", async () => {
  const stub = stubFetch([
    () =>
      new Response(
        Uint8Array.from([
          ...encodeProtoString(2, SESSION),
          ...encodeProtoString(4, "acct_1"),
          ...encodeProtoString(5, "org_1"),
        ]),
        { status: 200 }
      ),
    () => new Response(Uint8Array.from(encodeProtoString(1, OTT)), { status: 200 }),
    () => new Response(registerBlob(), { status: 200 }),
  ]);

  try {
    const result = await devinAuth.refreshFromAuth1(AUTH1);
    assert.equal(result.ideToken, IDE_TOKEN);
    assert.equal(result.sessionToken, SESSION);
    assert.equal(stub.calls.length, 3);
    assert.equal(stub.calls[0].url, DEVIN_POST_AUTH_URL);
    assert.equal(new Uint8Array(stub.calls[0].init.body as Uint8Array).length > 0, true);
    assert.equal(JSON.stringify(stub.calls).includes("password"), false);
  } finally {
    stub.restore();
  }
});

test("refreshFromAuth1 rejects a malformed auth1 credential without a request", async () => {
  const stub = stubFetch([() => jsonResponse({})]);
  try {
    await assert.rejects(() => devinAuth.refreshFromAuth1("not-auth1"), /auth1/i);
    assert.equal(stub.calls.length, 0);
  } finally {
    stub.restore();
  }
});

test("the password never reaches a persisted or returned payload", async () => {
  const stub = stubFetch([
    () => jsonResponse({ auth1_token: AUTH1 }),
    () =>
      new Response(
        Uint8Array.from([
          ...encodeProtoString(2, SESSION),
          ...encodeProtoString(4, "acct_1"),
          ...encodeProtoString(5, "org_1"),
        ]),
        { status: 200 }
      ),
    () => new Response(Uint8Array.from(encodeProtoString(1, OTT)), { status: 200 }),
    () => new Response(registerBlob(), { status: 200 }),
  ]);

  try {
    const result = await devinAuth.loginWithPassword("a@b.c", "super-secret-pw");
    assert.equal(JSON.stringify(result).includes("super-secret-pw"), false);
  } finally {
    stub.restore();
  }
});
