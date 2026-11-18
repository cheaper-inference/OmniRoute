/**
 * #16631 under a deep-frozen body and the egress guard.
 *
 * claude-oauth-body-isolation-16631.test.ts (from #16648) compares a plain body against a
 * structuredClone snapshot and unit-tests detachClaudeCodeRewriteTargets. This file drives the
 * same executor from the other side:
 *   - the caller's body is deep-frozen, so an in-place write anywhere in execute() throws a
 *     TypeError at the writing line instead of depending on a later diff, and a write the
 *     executor catches and swallows is also visible as a diff against the snapshot;
 *   - the run happens inside withEgressGuard, so a transport other than the stubbed
 *     globalThis.fetch (child process, raw socket, HTTP/2, WebSocket, wreq-js) fails the test
 *     instead of dialing out;
 *   - it covers the two ways the Claude Code block switches on (an OAuth token alone, and an
 *     OAuth token with Claude Code client headers), and a body the #16648 test does not have:
 *     a tool name over the 64-character cap, a one-hour cache_control ttl and several tool_use /
 *     tool_result pairs.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { getExecutor } from "../../open-sse/executors/index.ts";
import { clearEgressHits, egressHits, withEgressGuard } from "../_setup/egressGuard.ts";

type Json = Record<string, unknown>;

const MARKER = "frozen-body-probe-16631";
const LONG_TOOL =
  "mcp__claude_ai_Example_Workspace_Server__search_every_document_in_the_shared_drive";

const PROFILES: Record<string, { clientHeaders: Record<string, string> }> = {
  "oauth-token": { clientHeaders: {} },
  "claude-code-oauth": {
    clientHeaders: { "x-app": "cli", "user-agent": "claude-cli/2.1.0 (external, cli)" },
  },
};

function clientBody(): Json {
  return {
    model: "claude-opus-4-8",
    max_tokens: 1024,
    stream: false,
    system: [
      {
        type: "text",
        text: "You are a coding agent.",
        cache_control: { type: "ephemeral", ttl: "1h" },
      },
    ],
    metadata: { user_id: "client-user" },
    output_config: { effort: "low" },
    tools: [
      {
        name: "read",
        description: "Read a file",
        input_schema: { type: "object", properties: { path: { type: "string" } } },
        cache_control: { type: "ephemeral" },
      },
      { name: "proxy_glob", description: "Glob files", input_schema: { type: "object" } },
      { name: LONG_TOOL, description: "Search", input_schema: { type: "object" } },
      { type: "web_search_20250305", name: "web_search", model: "cc/claude-opus-4-8" },
    ],
    tool_choice: { type: "auto" },
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: `read a.ts ${MARKER}`, cache_control: { type: "ephemeral" } },
        ],
      },
      {
        role: "assistant",
        content: [
          { type: "tool_use", id: "toolu_1", name: "read", input: { path: "a.ts" } },
          { type: "tool_use", id: "toolu_2", name: LONG_TOOL, input: { q: "x" } },
        ],
      },
      {
        role: "user",
        content: [
          { type: "tool_result", tool_use_id: "toolu_1", content: "export {}" },
          { type: "tool_result", tool_use_id: "toolu_2", content: "none" },
        ],
      },
    ],
  };
}

function deepFreeze<T>(value: T): T {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const key of Object.getOwnPropertyNames(value)) deepFreeze((value as Json)[key]);
  }
  return value;
}

/** `requestCalls` counts fetches that carried MARKER: the upstream request, not a version check. */
type Step = { upstream: Json | null; requestCalls: number };

/** One Claude executor step on `body`, fetch stubbed, every other transport blocked. */
async function runGuardedStep(body: Json, profile: string): Promise<Step> {
  const step: Step = { upstream: null, requestCalls: 0 };
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (_url: string | URL | Request, init: RequestInit = {}) => {
    const text = typeof init.body === "string" ? init.body : "";
    if (text.includes(MARKER)) {
      step.requestCalls++;
      step.upstream = JSON.parse(text);
    }
    return new Response(JSON.stringify({ id: "msg_1", type: "message", content: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
  clearEgressHits();
  try {
    await withEgressGuard(async () => {
      const executor = await getExecutor("claude");
      await executor.execute({
        model: "claude-opus-4-8",
        body,
        stream: false,
        credentials: { accessToken: "sk-ant-oat-test-16631" },
        clientHeaders: { ...PROFILES[profile].clientHeaders },
      } as Parameters<typeof executor.execute>[0]);
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
  return step;
}

for (const profile of Object.keys(PROFILES)) {
  test(`#16631 frozen body under the egress guard: Claude OAuth step (${profile}) does not write into the caller's body`, async () => {
    const plain = clientBody();
    const snapshot = structuredClone(plain);
    const frozen = deepFreeze(clientBody());

    // A write into the frozen body throws a TypeError out of execute() and fails the test here.
    const step = await runGuardedStep(frozen, profile);

    assert.equal(step.requestCalls, 1, "the stubbed fetch received the upstream request once");
    assert.deepEqual(egressHits, [], "no transport other than the stubbed fetch was touched");
    assert.deepEqual(frozen, snapshot, "the frozen body still equals the client's body");

    // Not vacuous: the wire body was rewritten for Claude Code, from a body that stayed intact.
    const upstream = step.upstream as Json;
    const toolNames = (upstream.tools as Json[]).map((t) => t.name);
    assert.ok(toolNames.includes("Read"), `upstream tools are TitleCase: ${toolNames}`);
    assert.ok(toolNames.includes("Glob"), `proxy_ prefix stripped upstream: ${toolNames}`);
    assert.match(String((upstream.system as Json[])[0].text), /x-anthropic-billing-header/);
  });
}

test("#16631 frozen body under the egress guard: the same frozen body can be replayed on the next step", async () => {
  const frozen = deepFreeze(clientBody());
  const first = await runGuardedStep(frozen, "claude-code-oauth");
  const second = await runGuardedStep(frozen, "claude-code-oauth");

  assert.equal(first.requestCalls + second.requestCalls, 2);
  assert.deepEqual(second.upstream?.tools, first.upstream?.tools);
  assert.deepEqual(second.upstream?.messages, first.upstream?.messages);
  assert.deepEqual(second.upstream?.system, first.upstream?.system);
});
