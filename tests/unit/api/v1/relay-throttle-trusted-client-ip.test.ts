// The relay's per-(token, client) throttle must key on a client address the server vouches for —
// the one the authz pipeline stamps after resolving the TCP peer or a trusted proxy's report —
// never on X-Forwarded-For / X-Real-IP, which a direct caller controls and can rotate to reset
// the bucket. Those headers stay useful only as the best-known address for the forensic log row
// when no stamp exists.
import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolated DATA_DIR even when run without the suite preamble; a tiny per-client ceiling so the
// bucket semantics can be observed in three requests (read once at module load).
process.env.DATA_DIR ||= fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-relay-throttle-"));
process.env.RELAY_IP_PER_MINUTE = "2";

const relaySecurity =
  await import("../../../../src/app/api/v1/relay/chat/completions/relaySecurity.ts");
const authzHeaders = await import("../../../../src/server/authz/headers.ts");
const { getDbInstance } = await import("../../../../src/lib/db/core.ts");
const { getRelayLogs } = await import("../../../../src/lib/db/relayProxies.ts");

const { getClientIp, checkIpRateLimit } = relaySecurity;

// Wire names pinned on purpose: the route and the pipeline must agree on them.
const TRUSTED_CLIENT_IP = "x-omniroute-trusted-client-ip";
const TRUSTED_PEER_IP = "x-omniroute-trusted-peer-ip";

function relayRequest(headers: Record<string, string>) {
  return new Request("http://localhost/api/v1/relay/chat/completions", { headers });
}

function freshTokenId() {
  return `relay-throttle-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

test("the relay reads the client address through the pipeline's stamped header", () => {
  assert.equal(authzHeaders.AUTHZ_HEADER_TRUSTED_CLIENT_IP, TRUSTED_CLIENT_IP);
});

test("getClientIp: forwarding headers from a direct caller never become the throttle key", () => {
  const a = getClientIp(relayRequest({ "x-forwarded-for": "198.51.100.1, 10.0.0.2" }));
  const b = getClientIp(relayRequest({ "x-forwarded-for": "198.51.100.2" }));
  const c = getClientIp(relayRequest({ "x-real-ip": "198.51.100.3" }));

  // Same bucket for every unstamped caller of a token — the per-token DB limit is the control.
  assert.equal(a.throttleKey, b.throttleKey);
  assert.equal(b.throttleKey, c.throttleKey);
  assert.notEqual(a.throttleKey, "198.51.100.1");

  // The forensic row still carries the best-known address.
  assert.equal(a.forensic, "198.51.100.1");
  assert.equal(b.forensic, "198.51.100.2");
  assert.equal(c.forensic, "198.51.100.3");
  assert.equal(getClientIp(relayRequest({})).forensic, "unknown");
});

test("getClientIp: the stamped client address wins over the peer stamp and forwarding headers", () => {
  const resolved = getClientIp(
    relayRequest({
      [TRUSTED_CLIENT_IP]: "203.0.113.5",
      [TRUSTED_PEER_IP]: "10.0.0.2",
      "x-forwarded-for": "198.51.100.1",
    })
  );
  assert.equal(resolved.throttleKey, "203.0.113.5");
  assert.equal(resolved.forensic, "203.0.113.5");
});

test("getClientIp: falls back to the stamped socket peer when only that stamp exists", () => {
  const resolved = getClientIp(
    relayRequest({ [TRUSTED_PEER_IP]: "10.0.0.2", "x-forwarded-for": "198.51.100.1" })
  );
  assert.equal(resolved.throttleKey, "10.0.0.2");
  assert.equal(resolved.forensic, "10.0.0.2");
});

test("getClientIp: a stamped address is capped like any logged header", () => {
  const resolved = getClientIp(relayRequest({ [TRUSTED_CLIENT_IP]: "a".repeat(300) }));
  assert.equal(resolved.forensic.length, 256);
  assert.equal(resolved.throttleKey, resolved.forensic);
});

test("throttle: rotating X-Forwarded-For shares one bucket per token", () => {
  const tokenId = freshTokenId();
  const keyFor = (xff: string) => getClientIp(relayRequest({ "x-forwarded-for": xff })).throttleKey;

  assert.equal(checkIpRateLimit(tokenId, keyFor("198.51.100.1")).allowed, true);
  assert.equal(checkIpRateLimit(tokenId, keyFor("198.51.100.2")).allowed, true);
  assert.equal(checkIpRateLimit(tokenId, keyFor("198.51.100.3")).allowed, false, "3rd request");
});

test("throttle: distinct stamped client addresses get separate buckets", () => {
  const tokenId = freshTokenId();
  const keyFor = (ip: string) => getClientIp(relayRequest({ [TRUSTED_CLIENT_IP]: ip })).throttleKey;

  assert.equal(checkIpRateLimit(tokenId, keyFor("203.0.113.1")).allowed, true);
  assert.equal(checkIpRateLimit(tokenId, keyFor("203.0.113.1")).allowed, true);
  assert.equal(checkIpRateLimit(tokenId, keyFor("203.0.113.2")).allowed, true, "other client");
  assert.equal(checkIpRateLimit(tokenId, keyFor("203.0.113.2")).allowed, true, "other client");
  assert.equal(checkIpRateLimit(tokenId, keyFor("203.0.113.1")).allowed, false, "1st client 3rd");
  assert.equal(checkIpRateLimit(tokenId, keyFor("203.0.113.2")).allowed, false, "2nd client 3rd");
});

// ── Route level ──────────────────────────────────────────────────────────────
// The token only allows a model the request never asks for, so requests the throttle lets
// through end in a cheap 403 after the gate — no upstream involved. The gate's own answer is the
// 429 scoped "ip".

async function postRelay(rawToken: string, headers: Record<string, string>) {
  const { POST } = await import("../../../../src/app/api/v1/relay/chat/completions/route.ts");
  return POST(
    new Request("http://localhost/api/v1/relay/chat/completions", {
      method: "POST",
      headers: {
        authorization: `Bearer ${rawToken}`,
        "content-type": "application/json",
        ...headers,
      },
      body: JSON.stringify({
        model: "some-other-model",
        messages: [{ role: "user", content: "hi" }],
      }),
    })
  );
}

// Seeded like the sibling relay tests: createRelayToken() hashes through a CommonJS `require`
// that the ESM test runtime does not provide.
function seedToken(name: string) {
  const id = `rl_test_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  const rawToken = `relay_${name}_${Math.random().toString(16).slice(2)}`;
  const now = Math.floor(Date.now() / 1000);
  getDbInstance()
    .prepare(
      `INSERT INTO relay_tokens (id, name, token_hash, token_prefix, description, combo_id,
        allowed_models, max_tokens_per_request, max_requests_per_minute, max_requests_per_day,
        max_cost_per_day, enabled, created_at, updated_at, expires_at, metadata)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?)`
    )
    .run(
      id,
      name,
      createHash("sha256").update(rawToken).digest("hex"),
      "rl_test",
      "",
      null,
      JSON.stringify(["relay-throttle-only-model"]),
      128000,
      60,
      10000,
      0,
      now,
      now,
      null,
      "{}"
    );
  return { id, rawToken };
}

test("relay route: a direct caller cannot reset the throttle by rotating X-Forwarded-For", async () => {
  const token = seedToken("relay-throttle-rotating-xff");

  const first = await postRelay(token.rawToken, { "x-forwarded-for": "198.51.100.1" });
  const second = await postRelay(token.rawToken, { "x-forwarded-for": "198.51.100.2" });
  const third = await postRelay(token.rawToken, { "x-forwarded-for": "198.51.100.3" });

  assert.equal(first.status, 403);
  assert.equal(second.status, 403);
  assert.equal(third.status, 429, "third request from a 'new' forwarded address");
  assert.equal(third.headers.get("X-RateLimit-Scope"), "ip");

  // The forensic row keeps the best-known address for the operator.
  const [latest] = getRelayLogs(token.id, 1);
  assert.equal(latest.status, "rate_limited");
  assert.equal(latest.client_ip, "198.51.100.3");
});

test("relay route: clients the pipeline stamped apart get separate buckets", async () => {
  const token = seedToken("relay-throttle-stamped-clients");
  const stamped = (ip: string, xff: string) => ({
    [TRUSTED_CLIENT_IP]: ip,
    "x-forwarded-for": xff,
  });

  assert.equal((await postRelay(token.rawToken, stamped("203.0.113.1", "1.1.1.1"))).status, 403);
  assert.equal((await postRelay(token.rawToken, stamped("203.0.113.1", "2.2.2.2"))).status, 403);
  // Another client behind the same proxy is not collapsed into the first one's bucket.
  assert.equal((await postRelay(token.rawToken, stamped("203.0.113.2", "3.3.3.3"))).status, 403);

  const limited = await postRelay(token.rawToken, stamped("203.0.113.1", "4.4.4.4"));
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get("X-RateLimit-Scope"), "ip");

  const [latest] = getRelayLogs(token.id, 1);
  assert.equal(latest.status, "rate_limited");
  assert.equal(latest.client_ip, "203.0.113.1", "forensic row carries the trusted address");
});
