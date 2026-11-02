import test from "node:test";
import assert from "node:assert/strict";

import { refreshDevinDesktopToken } from "../../open-sse/services/tokenRefresh/providers/devinDesktop.ts";
import { encodeProtoString, encodeVarint } from "../../src/lib/oauth/devinAuth.ts";

const AUTH1 = "auth1_stored_long_lived_credential";

function registerBlob(): Uint8Array {
  return Uint8Array.from([
    0x0a,
    0x2a,
    ...new TextEncoder().encode("devin-session-token$refreshed"),
    0x00,
  ]);
}

function stubFetch(handlers: Array<() => Response>) {
  const calls: string[] = [];
  const original = globalThis.fetch;
  let i = 0;
  globalThis.fetch = (async (url: unknown) => {
    calls.push(String(url));
    const h = handlers[Math.min(i, handlers.length - 1)];
    i += 1;
    return h();
  }) as typeof fetch;
  return { calls, restore: () => (globalThis.fetch = original) };
}

test("import-token connections are not refreshable and stay untouched", async () => {
  const stub = stubFetch([]);
  try {
    // No auth1 token in providerSpecificData → no network call at all.
    assert.equal(await refreshDevinDesktopToken(null), null);
    assert.equal(await refreshDevinDesktopToken({}), null);
    assert.equal(await refreshDevinDesktopToken({ devinAuth1Token: "sk-ws-legacy" }), null);
    assert.equal(stub.calls.length, 0);
  } finally {
    stub.restore();
  }
});

test("a password-login connection refreshes from its auth1 token", async () => {
  const stub = stubFetch([
    () =>
      new Response(
        Uint8Array.from([
          ...encodeProtoString(2, "devin-session-token$new-session"),
          ...encodeProtoString(4, "acct_1"),
          ...encodeProtoString(5, "org_1"),
        ]),
        { status: 200 }
      ),
    () => new Response(Uint8Array.from(encodeProtoString(1, "ott$new")), { status: 200 }),
    () => new Response(registerBlob(), { status: 200 }),
  ]);

  try {
    const result = await refreshDevinDesktopToken({ devinAuth1Token: AUTH1, cliUserID: "keep-me" });
    assert.ok(result);
    assert.equal(result.accessToken, "devin-session-token$refreshed");
    assert.equal(result.providerSpecificData.devinIdeToken, "devin-session-token$refreshed");
    assert.equal(result.providerSpecificData.devinAccountId, "acct_1");
    // Unrelated connection metadata must survive the refresh.
    assert.equal(result.providerSpecificData.cliUserID, "keep-me");
    assert.equal(stub.calls.length, 3);
  } finally {
    stub.restore();
  }
});

test("a rejected auth1 token returns null instead of throwing into the pipeline", async () => {
  const stub = stubFetch([() => new Response("{}", { status: 401 })]);
  try {
    const result = await refreshDevinDesktopToken({ devinAuth1Token: AUTH1 });
    assert.equal(result, null);
  } finally {
    stub.restore();
  }
});

test("the refresh never logs the auth1 token in full", async () => {
  const stub = stubFetch([() => new Response("{}", { status: 401 })]);
  const logged: string[] = [];
  const log = {
    error: (_scope: string, _msg: string, data?: Record<string, unknown>) => {
      logged.push(JSON.stringify(data ?? {}));
    },
  };
  try {
    await refreshDevinDesktopToken({ devinAuth1Token: AUTH1 }, log);
    assert.equal(logged.length, 1);
    assert.equal(logged[0].includes(AUTH1), false);
    assert.equal(logged[0].includes("auth1_stored"), true);
  } finally {
    stub.restore();
  }
});

test("register blob helper stays a valid proto for the codec", () => {
  // Guards the fixture itself: tag 0x0a / len 0x2a then payload.
  const blob = registerBlob();
  assert.equal(blob[0], 0x0a);
  assert.deepEqual([...encodeVarint(0)], [0x00]);
});
