import test from "node:test";
import assert from "node:assert/strict";
import { refreshNousToken } from "../../open-sse/services/tokenRefresh/providers/nous.ts";

type FetchArgs = { url: string; body: string };

function mockFetch(handler: (args: FetchArgs) => Promise<Response>) {
  const original = globalThis.fetch;
  let seen: FetchArgs | null = null;
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    seen = { url: String(input), body: String(init?.body ?? "") };
    return handler(seen);
  }) as typeof fetch;
  return {
    restore: () => {
      globalThis.fetch = original;
    },
    get seen() {
      return seen;
    },
  };
}

test("nous refresh posts the rotating refresh grant to the Portal", async () => {
  const mock = mockFetch(
    async () =>
      new Response(JSON.stringify({ access_token: "a2", refresh_token: "r2", expires_in: 3599 }), {
        status: 200,
        headers: { "content-type": "application/json" },
      })
  );
  try {
    const result = await refreshNousToken("r1", null);
    assert.deepEqual(result, { accessToken: "a2", refreshToken: "r2", expiresIn: 3599 });

    const seen = mock.seen;
    assert.ok(seen, "fetch must be called");
    assert.match(seen.url, /portal\.nousresearch\.com\/api\/oauth\/token$/);
    const body = new URLSearchParams(seen.body);
    assert.equal(body.get("grant_type"), "refresh_token");
    assert.equal(body.get("refresh_token"), "r1");
    assert.equal(body.get("client_id"), "hermes-cli");
  } finally {
    mock.restore();
  }
});

test("nous refresh maps invalid_grant to the unrecoverable sentinel", async () => {
  const mock = mockFetch(
    async () =>
      new Response(
        JSON.stringify({ error: "invalid_grant", error_description: "Invalid refresh token" }),
        {
          status: 400,
          headers: { "content-type": "application/json" },
        }
      )
  );
  try {
    const result = await refreshNousToken("dead", null);
    assert.deepEqual(result, { error: "unrecoverable_refresh_error", code: "invalid_grant" });
  } finally {
    mock.restore();
  }
});

test("nous refresh treats a 5xx without an OAuth code as transient", async () => {
  const mock = mockFetch(async () => new Response("upstream unavailable", { status: 503 }));
  try {
    const result = await refreshNousToken("r1", null);
    assert.equal(result, null);
  } finally {
    mock.restore();
  }
});
