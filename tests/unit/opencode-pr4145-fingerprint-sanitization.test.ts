import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { sanitizeResponsesBody } from "../../open-sse/executors/opencode.ts";

/**
 * Only the Responses-API payload-sanitization half of upstream 9router PR #4145 is wired
 * into OpencodeExecutor.transformRequest. The other half of that port — forcing
 * `stream: true` and injecting a bash/glob/grep/read fingerprint-tools quartet for every
 * opencode/opencode-zen request — is intentionally NOT wired in: it is already fully
 * covered for gated (free-tier) requests by the free-tier request contract
 * (opencodeFreeTierContract.ts), and forcing it for a non-gated (paid) request regressed
 * the "a paid model keeps the client's own stream/tools" contract asserted by
 * `transformRequest: the contract is applied for a free model and skipped for a paid one`
 * in opencode-free-tier-request-contract.test.ts.
 */
describe("PR #4145 OpenCode Responses API sanitization", () => {
  describe("sanitizeResponsesBody", () => {
    it("converts max_tokens/max_completion_tokens to max_output_tokens", () => {
      const body: Record<string, unknown> = { max_tokens: 2048 };
      sanitizeResponsesBody(body);
      assert.equal(body.max_output_tokens, 2048);
      assert.equal(body.max_tokens, undefined);
    });

    it("strips opaque-only prior reasoning items and encrypted_content fields", () => {
      const body: Record<string, unknown> = {
        input: [
          { type: "reasoning", encrypted_content: "secret" },
          { type: "message", role: "user", content: "hello", encrypted_content: "old" },
        ],
      };
      sanitizeResponsesBody(body);
      const input = body.input as Array<Record<string, unknown>>;
      assert.equal(input.length, 1);
      assert.equal(input[0].type, "message");
      assert.equal(input[0].encrypted_content, undefined);
    });

    it("preserves plaintext reasoning required by DeepSeek continuation", () => {
      const reasoning = {
        type: "reasoning",
        content: [{ type: "reasoning_text", text: "The earlier result explains this step." }],
      };
      const assistant = { type: "message", role: "assistant", content: "Done." };
      const body: Record<string, unknown> = { input: [structuredClone(reasoning), assistant] };
      sanitizeResponsesBody(body);
      assert.deepEqual(body.input, [reasoning, assistant]);
    });

    it("projects mixed reasoning onto plaintext without carrying opaque state or display summaries", () => {
      const body: Record<string, unknown> = {
        input: [
          {
            type: "reasoning",
            id: "rs_other_account",
            encrypted_content: "opaque-fixture",
            reasoning_encrypted_content: "legacy-opaque-fixture",
            signature: "signature-fixture",
            format: "provider-bound",
            summary: [{ type: "summary_text", text: "Only for display." }],
            content: [{ type: "reasoning_text", text: "Portable continuation." }],
          },
        ],
      };
      sanitizeResponsesBody(body);
      assert.deepEqual(body.input, [
        {
          type: "reasoning",
          content: [{ type: "reasoning_text", text: "Portable continuation." }],
        },
      ]);
    });

    it("drops summary-only, empty and malformed reasoning instead of promoting it to continuation", () => {
      const body: Record<string, unknown> = {
        input: [
          { type: "reasoning", summary: [{ type: "summary_text", text: "Display only." }] },
          { type: "reasoning", content: [{ type: "reasoning_text", text: "  " }] },
          { type: "reasoning", content: [{ type: "summary_text", text: "Not continuation." }] },
          { type: "reasoning", content: "not-an-array" },
        ],
      };
      sanitizeResponsesBody(body);
      assert.deepEqual(body.input, []);
    });

    it("ensures empty parameters object has properties map", () => {
      const body: Record<string, unknown> = {
        tools: [
          {
            type: "function",
            name: "test_tool",
            parameters: { type: "object" },
          },
        ],
      };
      sanitizeResponsesBody(body);
      const tools = body.tools as Array<{ parameters?: { properties?: object } }>;
      assert.ok(tools[0].parameters?.properties);
    });
  });
});
