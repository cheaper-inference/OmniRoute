/**
 * Claude Code CCH signing against loopback captures of the real client.
 *
 * Both bodies were sent by Claude Code 2.1.322 to a loopback listener (no network, fake API key,
 * synthetic device id) with `cch=` present. The token in each body is the real client's.
 * The test puts the `cch=00000;` placeholder back, signs, and expects the original body.
 *
 * The real client hashes a view of the body, not the wire bytes: every `model` string value is
 * emptied and every `max_tokens` member is removed. This holds at any depth. The second body
 * carries both keys inside a tool schema and fails if the view reaches the top level only.
 * The seed is 0x4d659218e32a3268. Claude Code 2.1.252 gives the same seed and view.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { signRequestBody } = await import("../../open-sse/services/claudeCodeCCH.ts");

const DEVICE = "ab".repeat(32);

// Captured request, tools: []. Token 3d519.
const PLAIN = String.raw`{"model":"claude-opus-5-5","messages":[{"role":"user","content":[{"type":"text","text":"hi","cache_control":{"type":"ephemeral"}}]},{"role":"system","content":[],"output_config":{"effort":"medium"}}],"system":[{"type":"text","text":"x-anthropic-billing-header: cc_version=2.1.322.aaf; cc_entrypoint=sdk-cli; cch=3d519; cc_prompt_id=839dae24-83e9-43d9-95f6-22c39cb91d3c; cc_turn_origin=sdk; cc_prompt_index=0; cc_turn_index=1;"},{"type":"text","text":"You are a Claude agent, built on Anthropic's Claude Agent SDK.","cache_control":{"type":"ephemeral"}},{"type":"text","text":"x","cache_control":{"type":"ephemeral"}}],"tools":[],"metadata":{"user_id":"{\"device_id\":\"${DEVICE}\",\"account_uuid\":\"\",\"session_id\":\"00000000-0000-4000-8000-000000000001\"}"},"max_tokens":128000,"thinking":{"type":"adaptive","display":"omitted"},"context_management":{"edits":[{"type":"clear_thinking_20251015","keep":"all"}]},"output_config":{"effort":"medium"},"diagnostics":{"previous_message_id":null},"stream":true}`;

// Captured request with `model` and `max_tokens` keys inside a tool input schema. Token 02d92.
const NESTED = String.raw`{"model":"claude-opus-5-5","messages":[{"role":"user","content":[{"type":"text","text":"hi","cache_control":{"type":"ephemeral"}}]},{"role":"system","content":[],"output_config":{"effort":"medium"}}],"system":[{"type":"text","text":"x-anthropic-billing-header: cc_version=2.1.322.aaf; cc_entrypoint=sdk-cli; cch=02d92; cc_prompt_id=10c2169b-60c9-4b4d-9ce6-e84d8dbb56a4; cc_turn_origin=sdk; cc_prompt_index=0; cc_turn_index=1;"},{"type":"text","text":"You are a Claude agent, built on Anthropic's Claude Agent SDK.","cache_control":{"type":"ephemeral"}},{"type":"text","text":"x","cache_control":{"type":"ephemeral"}}],"tools":[{"name":"StructuredOutput","description":"return the final response as structured JSON","input_schema":{"type":"object","properties":{"a":{"type":"string"}},"default":{"z":1,"max_tokens":5},"examples":[{"max_tokens":7},{"model":"a\"b","z":2},{"max_tokens":8,"model":"m"},{"x":"model","model":{"k":1}}]}}],"metadata":{"user_id":"{\"device_id\":\"${DEVICE}\",\"account_uuid\":\"\",\"session_id\":\"00000000-0000-4000-8000-000000000001\"}"},"max_tokens":128000,"thinking":{"type":"adaptive","display":"omitted"},"context_management":{"edits":[{"type":"clear_thinking_20251015","keep":"all"}]},"output_config":{"effort":"medium"},"diagnostics":{"previous_message_id":null},"stream":true}`;

const unsigned = (body: string) => body.replace(/cch=[0-9a-f]{5};/, "cch=00000;");

test("signs the captured Claude Code 2.1.322 body to the real token", async () => {
  assert.equal(await signRequestBody(unsigned(PLAIN)), PLAIN);
});

test("signs a captured body whose tool schema holds model and max_tokens keys", async () => {
  assert.equal(await signRequestBody(unsigned(NESTED)), NESTED);
});

test("the token ignores the model value and the max_tokens value", async () => {
  const edited = unsigned(PLAIN)
    .replace('"model":"claude-opus-5-5"', '"model":"claude-sonnet-5"')
    .replace('"max_tokens":128000', '"max_tokens":1');
  assert.equal(
    await signRequestBody(edited),
    PLAIN.replace(/"model":"[^"]*"/, '"model":"claude-sonnet-5"').replace(
      '"max_tokens":128000',
      '"max_tokens":1'
    )
  );
});
