import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import { startZcodeLogin, pollZcodeLogin } from "../../src/lib/oauth/services/zcodeLogin.ts";

const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("isolates family flows, hides poll token, and completes each grant once", async () => {
  const tokens = new Map<string, string>();
  const saved: Array<{ family: string; data: { refreshToken?: string; accessToken?: string } }> =
    [];
  globalThis.fetch = async (input, init) => {
    const url = String(input),
      auth = new Headers(init?.headers).get("authorization")!;
    if (url.endsWith("/init")) {
      const family = JSON.parse(String(init?.body)).provider;
      tokens.set(family, auth);
      return Response.json({
        code: 0,
        data: {
          flow_id: family,
          authorize_url: "https://example.com/login",
          expires_at: Date.now() / 1000 + 300,
          poll_interval_sec: 2,
        },
      });
    }
    if (url.endsWith("/api/auth/z/login"))
      return Response.json({ code: 200, data: { access_token: "business-zai" } });
    const family = url.split("/").pop()!;
    assert.equal(auth, tokens.get(family));
    return Response.json({
      code: 0,
      data: {
        status: "ready",
        token: `jwt-${family}`,
        user: { user_id: `user-${family}` },
        [family]: { access_token: `access-${family}`, refresh_token: `refresh-${family}` },
      },
    });
  };
  const a = await startZcodeLogin("zai", "owner"),
    b = await startZcodeLogin("bigmodel", "owner");
  assert.notEqual(a.sessionId, b.sessionId);
  assert.notEqual(tokens.get("zai"), tokens.get("bigmodel"));
  assert.ok(!JSON.stringify(a).includes(tokens.get("zai")!));
  const persist = async (family: string, data: { refreshToken?: string; accessToken?: string }) => {
    saved.push({ family, data });
    return { id: family };
  };
  const [x, y] = await Promise.all([
    pollZcodeLogin(a.sessionId, "owner", persist),
    pollZcodeLogin(a.sessionId, "owner", persist),
  ]);
  assert.deepEqual([x.status, y.status].sort(), ["ok", "pending"]);
  assert.equal((await pollZcodeLogin(b.sessionId, "owner", persist)).status, "ok");
  assert.equal((await pollZcodeLogin(a.sessionId, "owner", persist)).status, "ok");
  assert.equal((await pollZcodeLogin(a.sessionId, "other", persist)).status, "expired");
  assert.equal(saved.length, 2);
  assert.equal(saved[0].data.accessToken, "business-zai");
  assert.equal(saved[0].data.refreshToken, undefined);
  assert.equal(saved[1].data.refreshToken, "refresh-bigmodel");
});

test("both families accept grants without refresh tokens or token expiry", async () => {
  let requests = 0;
  globalThis.fetch = async (input, init) => {
    requests++;
    if (String(input).endsWith("/init")) {
      const family = JSON.parse(String(init?.body)).provider;
      return Response.json({
        code: 0,
        data: {
          flow_id: family,
          authorize_url: "https://example.com/login",
          expires_at: Date.now() / 1000 + 300,
          poll_interval_sec: 1,
        },
      });
    }
    if (String(input).endsWith("/api/auth/z/login"))
      return Response.json({ code: 200, data: { access_token: "business-zai" } });
    const family = String(input).split("/").pop()!;
    return Response.json({
      code: 0,
      data: {
        status: "ready",
        token: `jwt-${family}`,
        user: { user_id: `user-${family}` },
        [family]: { access_token: `access-${family}` },
      },
    });
  };
  for (const family of ["zai", "bigmodel"] as const) {
    const session = await startZcodeLogin(family, "owner");
    let writes = 0;
    const persist = async (
      _family: string,
      data: { refreshToken?: string; accessToken?: string }
    ) => {
      writes++;
      assert.equal(data.refreshToken, undefined);
      return { id: family };
    };
    assert.equal((await pollZcodeLogin(session.sessionId, "owner", persist)).status, "ok");
    assert.equal((await pollZcodeLogin(session.sessionId, "owner", persist)).status, "ok");
    assert.equal(writes, 1);
  }
  assert.equal(requests, 5, "completed grants must not trigger another upstream poll or refresh");
});

test("rejects invalid upstream responses and expires failed flows", async () => {
  globalThis.fetch = async () =>
    Response.json({
      code: 0,
      data: {
        flow_id: "f",
        authorize_url: "http://example.com",
        expires_at: Date.now() / 1000 + 100,
        poll_interval_sec: 1,
      },
    });
  await assert.rejects(startZcodeLogin("zai", "owner"), /authorization URL/);
  let count = 0;
  globalThis.fetch = async () =>
    Response.json({
      code: 0,
      data:
        ++count === 1
          ? {
              flow_id: "f",
              authorize_url: "https://example.com",
              expires_at: Date.now() / 1000 + 100,
              poll_interval_sec: 1,
            }
          : { status: "failed" },
    });
  const session = await startZcodeLogin("zai", "owner");
  assert.equal(
    (
      await pollZcodeLogin(session.sessionId, "owner", async () => {
        throw Error("unexpected");
      })
    ).status,
    "failed"
  );
  assert.equal(
    (
      await pollZcodeLogin(session.sessionId, "owner", async () => {
        throw Error("unexpected");
      })
    ).status,
    "expired"
  );
});

test("retains a ready grant after a storage error and never repeats upstream poll", async () => {
  let polls = 0,
    writes = 0;
  globalThis.fetch = async (input) => {
    if (String(input).endsWith("/init"))
      return Response.json({
        code: 0,
        data: {
          flow_id: "f",
          authorize_url: "https://example.com",
          expires_at: Date.now() / 1000 + 300,
          poll_interval_sec: 1,
        },
      });
    if (String(input).endsWith("/api/auth/z/login"))
      return Response.json({ code: 200, data: { access_token: "business-zai" } });
    polls++;
    return Response.json({
      code: 0,
      data: {
        status: "ready",
        token: "jwt",
        user: { user_id: "u" },
        zai: { access_token: "access" },
      },
    });
  };
  const s = await startZcodeLogin("zai", "owner");
  const persist = async () => {
    if (++writes === 1) throw Error("SQLite unavailable");
    return { id: "existing" };
  };
  await assert.rejects(pollZcodeLogin(s.sessionId, "owner", persist));
  assert.equal((await pollZcodeLogin(s.sessionId, "owner", persist)).status, "ok");
  assert.equal(polls, 1);
});

test("expires sessions at upstream deadline", async () => {
  const now = Date.now;
  let clock = now();
  Date.now = () => clock;
  globalThis.fetch = async () =>
    Response.json({
      code: 0,
      data: {
        flow_id: "f",
        authorize_url: "https://example.com",
        expires_at: clock / 1000 + 1,
        poll_interval_sec: 1,
      },
    });
  try {
    const s = await startZcodeLogin("zai", "owner");
    clock += 1100;
    assert.equal(
      (await pollZcodeLogin(s.sessionId, "owner", async () => ({ id: "x" }))).status,
      "expired"
    );
  } finally {
    Date.now = now;
  }
});

test("uses native production endpoints, bearer and encoded flow id", async () => {
  let firstAuthorization = "";
  let call = 0;
  globalThis.fetch = async (input, init) => {
    call++;
    const headers = new Headers(init?.headers);
    if (call === 1) {
      assert.equal(String(input), "https://zcode.z.ai/api/v1/oauth/cli/init");
      assert.equal(init?.method, "POST");
      assert.deepEqual(JSON.parse(String(init?.body)), { provider: "bigmodel" });
      firstAuthorization = headers.get("authorization")!;
      assert.match(firstAuthorization, /^Bearer [a-f0-9]{64}$/);
      return Response.json({
        code: 0,
        data: {
          flow_id: "id/one",
          authorize_url: "https://example.com",
          expires_at: Date.now() / 1000 + 86400,
          poll_interval_sec: 3,
        },
      });
    }
    assert.equal(String(input), "https://zcode.z.ai/api/v1/oauth/cli/poll/id%2Fone");
    assert.equal(init?.method, "GET");
    assert.equal(headers.get("authorization"), firstAuthorization);
    return Response.json({ code: 0, data: { status: "pending" } });
  };
  const session = await startZcodeLogin("bigmodel", "owner");
  assert.ok(session.expiresAt <= Date.now() + 15 * 60_000);
  assert.equal(
    (await pollZcodeLogin(session.sessionId, "owner", async () => ({ id: "unused" }))).status,
    "pending"
  );
});

test("bounds concurrent initialization including requests still in flight", async () => {
  const realNow = Date.now;
  Date.now = () => realNow() + 16 * 60_000;
  globalThis.fetch = async () => new Promise<Response>(() => {});
  try {
    const starts = Array.from({ length: 100 }, () => startZcodeLogin("zai", "owner"));
    await assert.rejects(startZcodeLogin("bigmodel", "owner"), /Error/);
    void starts;
  } finally {
    Date.now = realNow;
  }
});
