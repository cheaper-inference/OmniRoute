import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { fetchGrokBotAccountEmail } from "../../src/lib/oauth/services/grokBotAccount.ts";

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

describe("fetchGrokBotAccountEmail", () => {
  it("returns the lowercased email from GetMe", async () => {
    const seen: { url?: string; headers?: Headers } = {};
    const email = await fetchGrokBotAccountEmail("token-1", async (url, init) => {
      seen.url = String(url);
      seen.headers = new Headers(init?.headers);
      return jsonResponse(200, { email: "User@Example.com" });
    });
    assert.equal(email, "user@example.com");
    assert.equal(
      seen.url,
      "https://api2.cursor.sh/aiserver.v1.DashboardService/GetMe"
    );
    assert.equal(seen.headers?.get("authorization"), "Bearer token-1");
    assert.equal(seen.headers?.get("x-cursor-client-type"), "sand");
  });

  it("returns null when the response has no email", async () => {
    const email = await fetchGrokBotAccountEmail("token-1", async () =>
      jsonResponse(200, { userId: "u1" })
    );
    assert.equal(email, null);
  });

  it("returns null when the request fails", async () => {
    const email = await fetchGrokBotAccountEmail("token-1", async () => jsonResponse(401, {}));
    assert.equal(email, null);
  });
});
