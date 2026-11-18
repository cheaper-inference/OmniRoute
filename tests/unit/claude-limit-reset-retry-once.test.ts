/**
 * A granted Claude session-limit reset must trigger at most one same-account retry per
 * request. The reset result is memoised for 60 s, so without a cap every following wall
 * 429 was answered with an immediate, zero-delay resend of the same request.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import {
  _resetClaudeLowPriorityState,
  createClaudeLowPriorityWait,
  handleClaudeUsageLimitResponse,
} from "../../open-sse/services/claudeLowPriority.ts";
import {
  CLAUDE_LIMIT_RESET_STATUS_URL,
  _resetClaudeLimitResetMemo,
} from "../../open-sse/services/claudeLimitReset.ts";

const WALL_HEADERS = {
  "Content-Type": "application/json",
  "anthropic-ratelimit-unified-status": "rejected",
  "anthropic-ratelimit-unified-representative-claim": "five_hour",
  "anthropic-ratelimit-unified-reset": String(Math.floor(Date.now() / 1000) + 3600),
};

test.beforeEach(() => {
  _resetClaudeLowPriorityState();
  _resetClaudeLimitResetMemo();
});

test("handle: a second wall in the same request does not claim or retry again", async () => {
  const wait = createClaudeLowPriorityWait();
  let claims = 0;
  const input = {
    key: "c-once",
    config: { lowPriorityMode: false, autoLimitReset: true },
    response: { status: 429, headers: WALL_HEADERS },
    wait,
    claimLimitReset: async () => {
      claims++;
      return true;
    },
  };
  assert.deepEqual(await handleClaudeUsageLimitResponse(input), {
    kind: "retry",
    delayMs: 0,
    via: "limit-reset",
  });
  assert.deepEqual(await handleClaudeUsageLimitResponse(input), { kind: "none" });
  assert.equal(claims, 1);
});

test("executor: upstream keeps answering the wall after a granted reset -> one retry, 429 surfaced", async () => {
  const realFetch = globalThis.fetch;
  let messageCalls = 0;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.startsWith(CLAUDE_LIMIT_RESET_STATUS_URL)) {
      return new Response(
        JSON.stringify({ juniper_tide: { eligible: true, arm: "reset", available: true } }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    if (url.includes("reset_rate_limits")) {
      return new Response(JSON.stringify({ result: "reset" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (url.includes("/v1/messages")) {
      messageCalls++;
      if (messageCalls >= 20) throw new Error("test stop: executor still re-sending");
      return new Response('{"error":{"type":"rate_limit_error"}}', {
        status: 429,
        headers: WALL_HEADERS,
      });
    }
    return new Response("{}", { status: 200 });
  }) as typeof fetch;
  try {
    const result = await new DefaultExecutor("claude").execute({
      model: "claude-sonnet-4-5",
      body: {
        model: "claude-sonnet-4-5",
        max_tokens: 8,
        messages: [{ role: "user", content: "hi" }],
      },
      stream: false,
      credentials: {
        accessToken: "sk-ant-oat-test",
        connectionId: "c-loop",
        providerSpecificData: { autoLimitReset: true, organizationUUID: "org-uuid-1" },
      },
      clientHeaders: { "user-agent": "claude-cli/2.1.0 (external, cli)", "x-app": "cli" },
      skipUpstreamRetry: true,
    } as never);
    assert.equal(messageCalls, 2, "first attempt plus one retry after the reset");
    assert.equal(result.response.status, 429);
  } finally {
    globalThis.fetch = realFetch;
  }
});
