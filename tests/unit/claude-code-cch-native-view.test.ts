/**
 * CCH signing must match the native Claude Code client.
 *
 * Vectors: Claude Code 2.1.220, as pinned by the CLIProxyAPI signer test suite. The native
 * client hashes a view of the body that omits `max_tokens`, `fallbacks` and
 * `fallback_credit_token` members and empties `model` string values, with xxHash64 seed
 * 0x4D659218E32A3268. The same seed is stored in the xxHash64 initial state next to the
 * `cch=00000` routine of the Claude Code 2.1.252 binary.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { signRequestBody, normalizeCchInput } =
  await import("../../open-sse/services/claudeCodeCCH.ts");

const BILLING =
  "x-anthropic-billing-header: cc_version=2.1.220.test; cc_entrypoint=sdk-cli; cch=00000;";
const BASE = `{"model":"model-a","messages":[{"role":"user","content":[{"type":"text","text":"x"}]}],"system":[{"type":"text","text":"${BILLING}"},{"type":"text","text":"system-x"}],"tools":[],"metadata":{"user_id":"meta-x"},"max_tokens":1,"thinking":{"type":"adaptive","display":"omitted"},"context_management":{"edits":[{"type":"clear_thinking_20251015","keep":"all"}]},"output_config":{"effort":"high"},"stream":true}`;
const swap = (from: string, to: string) => BASE.replace(from, to);
const META = '"metadata":{"user_id":"meta-x"}';
const withMeta = (inner: string) => swap(META, `"metadata":{"user_id":"meta-x",${inner}}`);

const VECTORS: Array<[string, string, string]> = [
  ["base", BASE, "7ee87"],
  ["model value ignored", swap('"model":"model-a"', '"model":"model-b"'), "7ee87"],
  ["max tokens ignored", swap('"max_tokens":1', '"max_tokens":2'), "7ee87"],
  ["message changes hash", swap('"text":"x"', '"text":"y"'), "b9cc8"],
  ["system changes hash", swap('"system-x"', '"system-y"'), "a30d3"],
  ["metadata changes hash", swap('"user_id":"meta-x"', '"user_id":"meta-y"'), "7a89d"],
  [
    "thinking changes hash",
    swap('{"type":"adaptive","display":"omitted"}', '{"type":"disabled"}'),
    "7205c",
  ],
  [
    "context changes hash",
    swap('{"edits":[{"type":"clear_thinking_20251015","keep":"all"}]}', '{"edits":[]}'),
    "05073",
  ],
  ["effort changes hash", swap('"effort":"high"', '"effort":"low"'), "12366"],
  ["stream changes hash", swap('"stream":true', '"stream":false'), "60400"],
  [
    "tool changes hash",
    swap('"tools":[]', '"tools":[{"name":"t","description":"d","input_schema":{"type":"object"}}]'),
    "3d78d",
  ],
  [
    "extra field changes hash",
    swap('"stream":true}', '"stream":true,"extra_top":"extra"}'),
    "2d622",
  ],
  [
    "field order remains significant",
    `{"stream":true,"output_config":{"effort":"high"},"context_management":{"edits":[{"type":"clear_thinking_20251015","keep":"all"}]},"thinking":{"type":"adaptive","display":"omitted"},"max_tokens":1,"metadata":{"user_id":"meta-x"},"tools":[],"system":[{"type":"text","text":"${BILLING}"},{"type":"text","text":"system-x"}],"messages":[{"role":"user","content":[{"type":"text","text":"x"}]}],"model":"model-a"}`,
    "e5b6c",
  ],
  ["nested model value ignored", withMeta('"model":"a"'), "0601b"],
  ["nested max tokens member omitted", withMeta('"max_tokens":2'), "7ee87"],
  [
    "top level fallbacks member omitted",
    swap('"stream":true}', '"stream":true,"fallbacks":[{"model":"fallback-a"}]}'),
    "7ee87",
  ],
  ["nested fallbacks member omitted", withMeta('"fallbacks":[{"model":"nested-a"}]'), "7ee87"],
  [
    "top level fallback credit token omitted",
    swap('"stream":true}', '"stream":true,"fallback_credit_token":"a"}'),
    "7ee87",
  ],
  ["nested fallback credit token omitted", withMeta('"fallback_credit_token":"a"'), "7ee87"],
  [
    "trailing dispatch run keeps native comma",
    withMeta('"max_tokens":999,"fallbacks":[{"model":"fallback-model"}]'),
    "4589b",
  ],
  [
    "model before trailing dispatch run",
    withMeta(
      '"model":"nested-model","max_tokens":999,"fallbacks":[{"model":"fallback-model"}],"fallback_credit_token":"not-a-real-token"'
    ),
    "2d312",
  ],
  [
    "model splits dispatch runs",
    withMeta('"max_tokens":999,"model":"nested-model","fallbacks":[{"model":"fallback-model"}]'),
    "0601b",
  ],
  ["ordinary nested member remains", withMeta('"plain":"a"'), "8d74c"],
  ["billing block only", `{"system":[{"type":"text","text":"${BILLING}"}]}`, "f2edb"],
];

for (const [name, body, want] of VECTORS) {
  test(`golden vector: ${name}`, async () => {
    const signed = await signRequestBody(body);
    assert.equal(signed.match(/cch=([0-9a-f]{5});/)?.[1], want);
    // Signing changes only the five CCH digits.
    assert.equal(signed.replace(/cch=[0-9a-f]{5};/, "cch=00000;"), body);
  });
}

const NORMALIZE_CASES: Array<[string, string, string]> = [
  ["model string becomes empty", '{"model":"claude","keep":1}', '{"model":"","keep":1}'],
  ["excluded first member", '{"max_tokens":1,"keep":2}', '{"keep":2}'],
  [
    "excluded middle member",
    '{"keep":1,"fallbacks":[{"model":"x"}],"tail":2}',
    '{"keep":1,"tail":2}',
  ],
  ["excluded last member", '{"keep":1,"fallback_credit_token":"secret"}', '{"keep":1}'],
  [
    "all members excluded",
    '{"max_tokens":1,"fallbacks":[],"fallback_credit_token":"secret"}',
    "{}",
  ],
  [
    "adjacent excluded members",
    '{"keep":1,"max_tokens":1,"fallbacks":[],"tail":2}',
    '{"keep":1,"tail":2}',
  ],
  ["native trailing dispatch run", '{"keep":1,"max_tokens":1,"fallbacks":[]}', '{"keep":1,}'],
  [
    "nested fields",
    '{"outer":{"model":"x","max_tokens":1,"keep":"y"}}',
    '{"outer":{"model":"","keep":"y"}}',
  ],
  [
    "escaped key text stays inside string",
    '{"text":"literal \\"model\\":\\"x\\" and \\"max_tokens\\":1"}',
    '{"text":"literal \\"model\\":\\"x\\" and \\"max_tokens\\":1"}',
  ],
];

for (const [name, body, want] of NORMALIZE_CASES) {
  test(`normalized hash view: ${name}`, () => {
    assert.equal(normalizeCchInput(body), want);
  });
}

test("a body that is not valid JSON is hashed as is instead of throwing", () => {
  assert.equal(normalizeCchInput('{"model":'), '{"model":');
});

test("signing a body that is already signed gives the same token", async () => {
  const once = await signRequestBody(BASE);
  assert.equal(await signRequestBody(once), once);
});
