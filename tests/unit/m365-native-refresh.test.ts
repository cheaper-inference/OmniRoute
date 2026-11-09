import assert from "node:assert/strict";
import test, { after } from "node:test";
import {
  currentM365AccessToken,
  currentM365ChathubPath,
  resolveConnectionParams,
  refreshM365AccessToken,
  M365_OAUTH_CLIENT_ID,
  M365_OAUTH_SCOPE,
} from "../../open-sse/executors/copilot-m365-connection.ts";
import {
  getAccessToken,
  refreshAccessToken,
  supportsTokenRefresh,
  isUnrecoverableRefreshError,
  _clearTokenRotationMap,
} from "../../open-sse/services/tokenRefresh.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

const tenant = "11111111-1111-1111-1111-111111111111";
const oid = "22222222-2222-2222-2222-222222222222";
const jwt = (claims: Record<string, unknown>) =>
  `e30.${Buffer.from(JSON.stringify(claims)).toString("base64url")}.signature`;
const originalFetch = globalThis.fetch;
after(() => {
  globalThis.fetch = originalFetch;
  resetDbInstance();
});

function stubFetch(fn: typeof fetch) {
  globalThis.fetch = fn;
}

test("native refresh: canonical opaque token and explicit path beat stale pasted credential", () => {
  const creds = {
    accessToken: "canonical-opaque",
    apiKey: "access_token=stale; chathubPath=old@tenant",
    providerSpecificData: { chathubPath: "explicit@tenant", host: "eu.m365.cloud.microsoft" },
  };
  assert.equal(currentM365AccessToken(creds), "canonical-opaque");
  assert.equal(currentM365ChathubPath(creds), "explicit@tenant");
  const params = resolveConnectionParams(creds);
  assert.ok(!("error" in params));
  assert.equal(params.accessToken, "canonical-opaque");
  assert.equal(params.chathubPath, "explicit@tenant");
  assert.equal(params.host, "eu.m365.cloud.microsoft");
});

test("native refresh: derive only valid oid/tid hints, never issuer or tier", () => {
  const params = resolveConnectionParams({
    accessToken: jwt({ oid, tid: tenant, iss: "enterprise" }),
  });
  assert.ok(!("error" in params));
  assert.equal(params.chathubPath, `${oid}@${tenant}`);
  assert.equal(params.tier, undefined);
  for (const claims of [
    { oid: "user", tid: tenant },
    { oid, tid: "../common" },
    { oid, iss: tenant },
  ]) {
    assert.ok("error" in resolveConnectionParams({ accessToken: jwt(claims) }));
  }
});

test("native refresh: reject malformed explicit paths and untrusted hosts without fallback", () => {
  for (const chathubPath of ["u@t/extra", " u@t", "u@t?token=x", "u@@t", "u%40t", ""]) {
    assert.ok(
      "error" in
        resolveConnectionParams({
          accessToken: jwt({ oid, tid: tenant }),
          providerSpecificData: { chathubPath },
        })
    );
  }
  assert.ok(
    "error" in
      resolveConnectionParams({
        accessToken: "opaque",
        providerSpecificData: {
          chathubPath: "u@t",
          host: "attacker.invalid",
        },
      })
  );
});

test("native refresh: canonical dispatch preserves public grant, rotation and expiry", async () => {
  let calls = 0;
  stubFetch(async (input, init) => {
    calls++;
    assert.equal(String(input), `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`);
    assert.equal(init?.redirect, "error");
    assert.ok(init?.signal);
    const body = new URLSearchParams(String(init?.body));
    assert.equal(body.get("client_id"), M365_OAUTH_CLIENT_ID);
    assert.equal(body.get("scope"), M365_OAUTH_SCOPE);
    return Response.json({
      access_token: "fresh-opaque",
      refresh_token: "rotated",
      expires_in: 3600,
    });
  });
  try {
    assert.equal(supportsTokenRefresh("copilot-m365-web"), true);
    const result = await refreshAccessToken(
      "copilot-m365-web",
      "old",
      { providerSpecificData: { tenantId: tenant } },
      null
    );
    assert.equal(result?.accessToken, "fresh-opaque");
    assert.equal(result?.refreshToken, "rotated");
    assert.equal(result?.expiresIn, 3600);
    assert.ok(Date.parse(result?.expiresAt) > Date.now());
    assert.equal(calls, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("native refresh: malformed tenant routing never sends credentials", async () => {
  let calls = 0;
  stubFetch(async () => {
    calls++;
    throw new Error("must not fetch");
  });
  try {
    for (const tid of [
      "../common",
      "common?x=1",
      "tenant-id",
      "https://attacker.invalid",
      " common",
      "%63ommon",
    ]) {
      const result = await refreshM365AccessToken("secret", tid);
      assert.ok("error" in result);
    }
    const result = await getAccessToken(
      "copilot-m365-web",
      { refreshToken: "bad-tenant", providerSpecificData: { tenantId: "../common" } },
      null
    );
    assert.ok(isUnrecoverableRefreshError(result));
    assert.equal(calls, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("native refresh: malformed identity hints cannot select a refresh tenant", async () => {
  let calls = 0;
  stubFetch(async () => {
    calls++;
    return Response.json({ access_token: "next" });
  });
  try {
    for (const providerSpecificData of [
      { tenantId: null },
      { tenantId: 12 },
      { chathubPath: "u@common/extra" },
      { chathubPath: "u@@common" },
      { chathubPath: "" },
    ]) {
      const result = await getAccessToken(
        "copilot-m365-web",
        { refreshToken: `malformed-${calls}`, providerSpecificData },
        null
      );
      assert.ok(isUnrecoverableRefreshError(result));
    }
    assert.equal(calls, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("native refresh: invalid_grant is terminal and upstream secrets never enter logs", async () => {
  const messages: string[] = [];
  stubFetch(async () =>
    Response.json({ error: "invalid_grant", error_description: "SECRET" }, { status: 400 })
  );
  try {
    const result = await getAccessToken(
      "copilot-m365-web",
      { refreshToken: "invalid-refresh" },
      {
        warn: (_tag: string, message: string) => messages.push(message),
      }
    );
    assert.ok(isUnrecoverableRefreshError(result));
    assert.equal(result.code, "invalid_grant");
    assert.ok(!JSON.stringify([result, messages]).includes("SECRET"));
    stubFetch(async () => {
      throw new Error("opaque-secret-never-log");
    });
    const failed = await refreshM365AccessToken("secret", "common", {
      warn: (_tag, message) => messages.push(message),
    });
    assert.ok(!JSON.stringify([failed, messages]).includes("opaque-secret-never-log"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test(
  "native refresh: concurrent canonical callers share refresh and persist before release",
  { timeout: 5000 },
  async () => {
    _clearTokenRotationMap();
    let calls = 0;
    let persists = 0;
    let release: (() => void) | undefined;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    stubFetch(async () => {
      calls++;
      await gate;
      return Response.json({
        access_token: "next",
        refresh_token: "next-refresh",
        expires_in: 1200,
      });
    });
    try {
      const creds = { connectionId: "m365-native-refresh-test", refreshToken: "concurrent-old" };
      const persist = async () => {
        persists++;
      };
      const first = getAccessToken("copilot-m365-web", { ...creds }, null, null, persist);
      const second = getAccessToken("copilot-m365-web", { ...creds }, null, null, persist);
      release?.();
      const [a, b] = await Promise.all([first, second]);
      assert.equal(a?.accessToken, "next");
      assert.deepEqual(a, b);
      assert.equal(calls, 1);
      assert.equal(persists, 1);
    } finally {
      globalThis.fetch = originalFetch;
      _clearTokenRotationMap();
    }
  }
);

test(
  "native refresh: deadline bounds response-body stalls and abort cancels dispatch",
  { timeout: 2000 },
  async () => {
    let capturedSignal: AbortSignal | null | undefined;
    stubFetch(async (_input, init) => {
      capturedSignal = init?.signal;
      return new Response(new ReadableStream({ start() {} }));
    });
    try {
      const result = await refreshM365AccessToken("secret", "common", undefined, { timeoutMs: 20 });
      assert.deepEqual(result, { error: "refresh_cancelled" });
      assert.equal(capturedSignal?.aborted, true);
      const controller = new AbortController();
      controller.abort();
      let calls = 0;
      stubFetch(async () => {
        calls++;
        return Response.json({});
      });
      assert.deepEqual(
        await refreshM365AccessToken("secret", "common", undefined, { signal: controller.signal }),
        { error: "refresh_cancelled" }
      );
      assert.equal(calls, 0);
    } finally {
      globalThis.fetch = originalFetch;
    }
  }
);

test("native refresh: legacy no-refresh row does not attempt network or persistence", async () => {
  let calls = 0;
  stubFetch(async () => {
    calls++;
    throw new Error("unexpected");
  });
  try {
    const result = await getAccessToken(
      "copilot-m365-web",
      { apiKey: "legacy-opaque" },
      null,
      null,
      async () => {
        calls++;
      }
    );
    assert.equal(result, null);
    assert.equal(calls, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
