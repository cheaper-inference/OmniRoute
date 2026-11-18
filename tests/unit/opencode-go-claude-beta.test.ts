/**
 * OpenCode Go / Zen Claude lane (`/v1/messages`) is a strict Anthropic proxy: it rejects
 * `context_management` with 400 "Extra inputs are not permitted" unless the paired
 * `context-management-2025-06-27` beta travels with the body, and answers 200 +
 * `applied_edits` once it does. The executor used to drop the client's `anthropic-beta`
 * entirely on this lane, so a Claude Code session on `claude-haiku-5-5` lost context
 * editing after a strip-and-retry round trip.
 *
 * Rules:
 *   R1 The client's allowlisted betas are forwarded on the Claude lane.
 *   R2 A body carrying `context_management` gets the paired beta even with no client beta.
 *   R3 Client + pairing never duplicate a token.
 *   R4 Tokens outside the forwardable allowlist (Claude OAuth fingerprint) are not forwarded.
 *   R5 Nothing to forward → no `anthropic-beta` header at all.
 *   R6 The Bearer (openai) and Responses lanes keep sending no beta header.
 *   R7 The same applies to the Zen Claude lane.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";

const CONTEXT_MANAGEMENT_BETA = "context-management-2025-06-27";
const CONTEXT_BODY = {
  model: "claude-haiku-5-5",
  messages: [{ role: "user", content: "hi" }],
  context_management: { edits: [{ type: "clear_thinking_20251015", keep: "all" }] },
};
const PLAIN_BODY = { model: "claude-haiku-5-5", messages: [{ role: "user", content: "hi" }] };

function claudeLaneHeaders(
  provider: string,
  clientHeaders: Record<string, string> | null,
  body: unknown,
  format: string | null = "claude"
) {
  const executor = new OpencodeExecutor(provider);
  executor._requestFormat = format;
  return executor.buildHeaders(
    { apiKey: "synthetic-test-key" },
    true,
    clientHeaders,
    "claude-haiku-5-5",
    undefined,
    body
  );
}

function betaKeys(headers: Record<string, string>) {
  return Object.keys(headers).filter((key) => key.toLowerCase() === "anthropic-beta");
}

function betaTokens(headers: Record<string, string>) {
  const keys = betaKeys(headers);
  if (keys.length === 0) return [];
  return headers[keys[0]]
    .split(",")
    .map((token) => token.trim())
    .filter(Boolean);
}

test("R1: the client's allowlisted anthropic-beta reaches the opencode-go Claude lane", () => {
  const headers = claudeLaneHeaders(
    "opencode-go",
    { "anthropic-beta": `${CONTEXT_MANAGEMENT_BETA},effort-2025-11-24` },
    CONTEXT_BODY
  );
  const tokens = betaTokens(headers);
  assert.ok(tokens.includes(CONTEXT_MANAGEMENT_BETA), `got ${tokens.join(",")}`);
  assert.ok(tokens.includes("effort-2025-11-24"), `got ${tokens.join(",")}`);
  assert.equal(headers["anthropic-version"], "2023-06-01");
});

test("R1: a mixed-case client header name is still read", () => {
  const headers = claudeLaneHeaders(
    "opencode-go",
    { "Anthropic-Beta": "effort-2025-11-24" },
    PLAIN_BODY
  );
  assert.deepEqual(betaTokens(headers), ["effort-2025-11-24"]);
  assert.equal(betaKeys(headers).length, 1);
});

test("R2: context_management in the body is paired with its beta when the client sent none", () => {
  const headers = claudeLaneHeaders("opencode-go", null, CONTEXT_BODY);
  assert.deepEqual(betaTokens(headers), [CONTEXT_MANAGEMENT_BETA]);
});

test("R3: client beta and pairing never duplicate the context-management token", () => {
  const headers = claudeLaneHeaders(
    "opencode-go",
    { "anthropic-beta": `${CONTEXT_MANAGEMENT_BETA}, ${CONTEXT_MANAGEMENT_BETA}` },
    CONTEXT_BODY
  );
  const tokens = betaTokens(headers);
  assert.equal(tokens.filter((token) => token === CONTEXT_MANAGEMENT_BETA).length, 1);
  assert.equal(betaKeys(headers).length, 1);
});

test("R4: Claude OAuth fingerprint betas are not forwarded to the third-party lane", () => {
  const headers = claudeLaneHeaders(
    "opencode-go",
    { "anthropic-beta": "claude-code-20250219,oauth-2025-04-20,effort-2025-11-24" },
    PLAIN_BODY
  );
  const tokens = betaTokens(headers);
  assert.ok(!tokens.includes("claude-code-20250219"));
  assert.ok(!tokens.includes("oauth-2025-04-20"));
  assert.deepEqual(tokens, ["effort-2025-11-24"]);
});

test("R5: no client beta and no context_management → no anthropic-beta header", () => {
  const headers = claudeLaneHeaders("opencode-go", null, PLAIN_BODY);
  assert.equal(betaKeys(headers).length, 0);
});

test("R5: a client beta that filters down to nothing leaves the header unset", () => {
  const headers = claudeLaneHeaders(
    "opencode-go",
    { "anthropic-beta": "claude-code-20250219" },
    PLAIN_BODY
  );
  assert.equal(betaKeys(headers).length, 0);
});

test("R6: the Bearer (openai) lane emits no anthropic-beta", () => {
  const headers = claudeLaneHeaders(
    "opencode-go",
    { "anthropic-beta": `${CONTEXT_MANAGEMENT_BETA},effort-2025-11-24` },
    CONTEXT_BODY,
    "openai"
  );
  assert.equal(betaKeys(headers).length, 0);
  assert.ok(headers["Authorization"]?.startsWith("Bearer "));
});

test("R6: the Responses lane emits no anthropic-beta", () => {
  const headers = claudeLaneHeaders(
    "opencode-go",
    { "anthropic-beta": "effort-2025-11-24" },
    CONTEXT_BODY,
    "openai-responses"
  );
  assert.equal(betaKeys(headers).length, 0);
});

test("R7: the opencode-zen Claude lane pairs context_management the same way", () => {
  const headers = claudeLaneHeaders("opencode-zen", null, CONTEXT_BODY);
  assert.deepEqual(betaTokens(headers), [CONTEXT_MANAGEMENT_BETA]);
});
