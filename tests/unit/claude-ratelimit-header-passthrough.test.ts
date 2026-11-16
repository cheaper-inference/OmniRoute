/**
 * Forward the upstream `anthropic-ratelimit-*` headers to the client response.
 *
 * Claude-format clients (Claude Code, the Anthropic SDK) read these headers to
 * show rate-limit state. OmniRoute already consumes them internally
 * (rateLimitManager, claudeUsageCooldown) but never passes them on. The port is
 * opt-in: set CLAUDE_FORWARD_RATELIMIT_HEADERS=true (default off).
 */
import test from "node:test";
import assert from "node:assert/strict";

const ENV_VAR = "CLAUDE_FORWARD_RATELIMIT_HEADERS";

const { forwardUpstreamRateLimitHeaders, isForwardUpstreamRateLimitHeadersEnabled } =
  await import("../../src/sse/handlers/chat/upstreamRateLimitHeaders.ts");

function jsonResponse(): Response {
  return new Response('{"content":[]}', {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

const UPSTREAM_HEADERS: Record<string, string> = {
  "content-type": "application/json",
  "anthropic-ratelimit-requests-limit": "50",
  "anthropic-ratelimit-requests-remaining": "49",
  "anthropic-ratelimit-requests-reset": "2026-11-16T12:00:00Z",
  "anthropic-ratelimit-input-tokens-limit": "400000",
  "anthropic-ratelimit-input-tokens-remaining": "399123",
  "anthropic-ratelimit-input-tokens-reset": "2026-11-16T12:00:30Z",
  "x-should-not-forward": "no",
  "retry-after": "12",
};

test("flag off by default: no rate-limit header reaches the client", () => {
  delete process.env[ENV_VAR];
  const out = forwardUpstreamRateLimitHeaders(jsonResponse(), UPSTREAM_HEADERS);
  assert.equal(out.headers.get("anthropic-ratelimit-requests-limit"), null);
  assert.equal(isForwardUpstreamRateLimitHeadersEnabled(), false);
});

test("flag on: every anthropic-ratelimit-* header is copied, nothing else", () => {
  process.env[ENV_VAR] = "true";
  try {
    const out = forwardUpstreamRateLimitHeaders(jsonResponse(), UPSTREAM_HEADERS);
    for (const name of Object.keys(UPSTREAM_HEADERS)) {
      const expected = name.startsWith("anthropic-ratelimit-")
        ? UPSTREAM_HEADERS[name]
        : name === "content-type"
          ? "application/json"
          : null;
      assert.equal(out.headers.get(name), expected, `header ${name}`);
    }
  } finally {
    delete process.env[ENV_VAR];
  }
});

test("flag on: accepts a Headers instance as the upstream source", () => {
  process.env[ENV_VAR] = "1";
  try {
    const upstream = new Headers({
      "Anthropic-Ratelimit-Requests-Remaining": "7",
      "x-other": "skip",
    });
    const out = forwardUpstreamRateLimitHeaders(jsonResponse(), upstream);
    assert.equal(out.headers.get("anthropic-ratelimit-requests-remaining"), "7");
    assert.equal(out.headers.get("x-other"), null);
  } finally {
    delete process.env[ENV_VAR];
  }
});

test("flag on: missing or empty upstream headers leave the response untouched", () => {
  process.env[ENV_VAR] = "true";
  try {
    const response = jsonResponse();
    assert.equal(forwardUpstreamRateLimitHeaders(response, undefined), response);
    assert.equal(forwardUpstreamRateLimitHeaders(response, {}), response);
    assert.equal(forwardUpstreamRateLimitHeaders(response, { "x-nothing": "1" }), response);
  } finally {
    delete process.env[ENV_VAR];
  }
});

test("immutable response headers still get the forwarded values (clone path)", () => {
  process.env[ENV_VAR] = "true";
  try {
    // Response.redirect() headers are immutable and force the clone path.
    const original = Response.redirect("https://example.invalid/x", 302);
    assert.throws(() => original.headers.set("x-probe", "1"));
    const out = forwardUpstreamRateLimitHeaders(original, {
      "anthropic-ratelimit-requests-remaining": "3",
    });
    assert.equal(out.headers.get("anthropic-ratelimit-requests-remaining"), "3");
    assert.equal(out.status, 302);
  } finally {
    delete process.env[ENV_VAR];
  }
});
