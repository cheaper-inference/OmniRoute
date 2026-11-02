/**
 * Codex wire fidelity: OmniRoute must not rewrite what a client actually sent.
 *
 * Live evidence (2026-11-02): native Codex accepted the same payload that failed with
 * "This request was blocked by our safety systems. Reason: Potentially unintended activity."
 * through OmniRoute. The executor (a) injected a placeholder `instructions` into native
 * Codex passthrough, (b) dropped Codex 0.166's `reasoning.context` and added a `summary`
 * the client never asked for, (c) gave translated non-Codex clients (OpenCode) the Codex
 * CLI persona as `instructions`, and (d) used the account-wide `workspaceId` as the
 * upstream `session_id`, merging every conversation on an account into one session.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { CodexExecutor } from "../../open-sse/executors/codex.ts";
import { CODEX_CHAT_DEFAULT_INSTRUCTIONS } from "../../open-sse/config/codexInstructions.ts";

const nativeCodexBody = () => ({
  _nativeCodexPassthrough: true,
  model: "gpt-6.1-sol",
  input: [
    {
      type: "additional_tools",
      role: "developer",
      tools: [{ type: "namespace", name: "functions" }],
    },
    { type: "message", role: "developer", content: [{ type: "input_text", text: "dev" }] },
    { type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] },
  ],
  reasoning: { effort: "low", context: "all_turns" },
  include: ["reasoning.encrypted_content"],
  store: false,
  stream: true,
  prompt_cache_key: "7e57c0de-0000-4000-8000-00000000000a",
});

test("native Codex passthrough without instructions is not given injected instructions", () => {
  const out = new CodexExecutor().transformRequest("gpt-6.1-sol", nativeCodexBody(), true, {
    requestEndpointPath: "/responses",
  } as never) as Record<string, unknown>;
  assert.equal("instructions" in out, false);
});

test("native Codex passthrough keeps reasoning exactly as sent (context kept, no summary added)", () => {
  const out = new CodexExecutor().transformRequest("gpt-6.1-sol", nativeCodexBody(), true, {
    requestEndpointPath: "/responses",
  } as never) as Record<string, unknown>;
  assert.deepEqual(out.reasoning, { effort: "low", context: "all_turns" });
  assert.deepEqual(out.include, ["reasoning.encrypted_content"]);
});

test("reasoning whitelist keeps context but still strips OpenRouter-style keys (#13643)", () => {
  const body = {
    ...nativeCodexBody(),
    reasoning: { effort: "low", context: "all_turns", enabled: true, max_tokens: 9 },
  };
  const out = new CodexExecutor().transformRequest("gpt-6.1-sol", body, true, {
    requestEndpointPath: "/responses",
  } as never) as Record<string, unknown>;
  assert.deepEqual(out.reasoning, { effort: "low", context: "all_turns" });
});

test("translated tool-bearing requests get neutral instructions, not the Codex CLI persona", () => {
  const out = new CodexExecutor().transformRequest(
    "gpt-6.1-sol",
    {
      model: "gpt-6.1-sol",
      messages: [{ role: "user", content: "hello" }],
      tools: [{ type: "function", function: { name: "read", parameters: { type: "object" } } }],
    },
    true,
    { requestEndpointPath: "/responses" } as never
  ) as Record<string, unknown>;
  assert.equal(out.instructions, CODEX_CHAT_DEFAULT_INSTRUCTIONS);
  assert.doesNotMatch(JSON.stringify(out), /You are Codex/);
});

const accountCreds = {
  accessToken: "t",
  providerSpecificData: { workspaceId: "ws-account-wide-1" },
};

test("session_id is never the account-wide workspaceId when the client presented no session", () => {
  const headers = new CodexExecutor().buildHeaders(
    accountCreds as never,
    true,
    {},
    "gpt-6.1-sol",
    undefined,
    { prompt_cache_key: "ws-account-wide-1" }
  ) as Record<string, string>;
  assert.equal(headers.session_id, undefined);
  assert.equal(
    headers["chatgpt-account-id"],
    "ws-account-wide-1",
    "workspace binding is unchanged"
  );
});

test("session_id carries the client's own session (header alias, then client prompt_cache_key)", () => {
  const exec = new CodexExecutor();
  const viaAlias = exec.buildHeaders(accountCreds as never, true, {
    "x-opencode-session-id": "ses_opencode_A",
  }) as Record<string, string>;
  assert.equal(viaAlias.session_id, "ses_opencode_A");
  const viaBody = exec.buildHeaders(accountCreds as never, true, {}, "gpt-6.1-sol", undefined, {
    prompt_cache_key: "conv-client-B",
  }) as Record<string, string>;
  assert.equal(viaBody.session_id, "conv-client-B");
});

test("the WebSocket transport carries the client's session like the HTTP path", async () => {
  const { __setCodexWebSocketTransportForTesting } =
    await import("../../open-sse/executors/codex.ts");
  let socket: {
    send: (data: string) => void;
    close: () => void;
    onmessage: ((event: { data: unknown }) => void) | null;
    onerror: ((event: { message?: string }) => void) | null;
    onclose: ((event?: { code?: number; reason?: string }) => void) | null;
  } | null = null;
  __setCodexWebSocketTransportForTesting(async () => {
    socket = { send() {}, close() {}, onmessage: null, onerror: null, onclose: null };
    return socket;
  });
  try {
    const result = (await new CodexExecutor().execute({
      model: "gpt-6.1-sol",
      body: { model: "gpt-6.1-sol", input: [], prompt_cache_key: "conv-client-B", stream: true },
      stream: true,
      credentials: {
        accessToken: "t",
        providerSpecificData: {
          workspaceId: "ws-account-wide-1",
          codexTransport: "websocket",
          codexFingerprintMode: "off",
        },
      },
      clientHeaders: { "x-opencode-session-id": "ses_opencode_A" },
    } as never)) as { headers?: Record<string, string> };
    assert.equal(result.headers?.session_id, "ses_opencode_A");
  } finally {
    socket?.onclose?.({ code: 1000 });
    __setCodexWebSocketTransportForTesting(undefined);
  }
});
