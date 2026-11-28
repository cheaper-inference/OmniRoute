import test from "node:test";
import assert from "node:assert/strict";
import { nous } from "../../src/lib/oauth/providers/nous.ts";

function mockFetch(handler: () => Promise<Response> | Response) {
  const original = globalThis.fetch;
  globalThis.fetch = (async () => handler()) as typeof fetch;
  return () => {
    globalThis.fetch = original;
  };
}

test("nous poll: an HTML 503 keeps polling instead of failing", async () => {
  const restore = mockFetch(
    () =>
      new Response("<html><body>bad gateway</body></html>", {
        status: 503,
        headers: { "content-type": "text/html" },
      })
  );
  try {
    const result = await nous.pollToken(nous.config, "dc");
    assert.equal(result.ok, false);
    assert.equal((result.data as { error?: string }).error, "authorization_pending");
  } finally {
    restore();
  }
});

test("nous poll: an empty 429 keeps polling", async () => {
  const restore = mockFetch(() => new Response("", { status: 429 }));
  try {
    const result = await nous.pollToken(nous.config, "dc");
    assert.equal(result.ok, false);
    assert.equal((result.data as { error?: string }).error, "authorization_pending");
  } finally {
    restore();
  }
});

test("nous poll: an explicit invalid_grant is terminal", async () => {
  const restore = mockFetch(
    () =>
      new Response(
        JSON.stringify({ error: "invalid_grant", error_description: "Invalid device code" }),
        {
          status: 400,
          headers: { "content-type": "application/json" },
        }
      )
  );
  try {
    const result = await nous.pollToken(nous.config, "dc");
    assert.equal(result.ok, false);
    assert.equal((result.data as { error?: string }).error, "expired_token");
  } finally {
    restore();
  }
});

test("nous poll: a body-read transport failure returns pending", async () => {
  const fake = {
    ok: false,
    status: 500,
    text: async () => {
      throw new Error("socket closed after headers");
    },
  } as unknown as Response;
  const restore = mockFetch(() => fake);
  try {
    const result = await nous.pollToken(nous.config, "dc");
    assert.equal(result.ok, false);
    assert.equal((result.data as { error?: string }).error, "authorization_pending");
  } finally {
    restore();
  }
});
