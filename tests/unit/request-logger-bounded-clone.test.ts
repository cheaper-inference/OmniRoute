import test from "node:test";
import assert from "node:assert/strict";

const { cloneBoundedForLog, MAX_LOG_ARRAY_ITEMS } =
  await import("../../open-sse/utils/requestLogger.ts");

test("cloneBoundedForLog: tools array is exempt from truncation (debug-critical)", () => {
  const tools = Array.from({ length: 45 }, (_, i) => ({
    name: `tool_${String(i).padStart(2, "0")}`,
    description: `Tool ${i} description`,
  }));
  const result = cloneBoundedForLog({ tools }) as { tools: Array<Record<string, unknown>> };
  assert.equal(result.tools.length, 45);
  assert.equal(result.tools[0].name, "tool_00");
  assert.equal(result.tools[44].name, "tool_44");
  // No truncation marker should appear inside tools
  assert.ok(
    !("_omniroute_truncated_array" in result.tools[0]),
    "tools array should NOT have truncation marker"
  );
});

test("cloneBoundedForLog: other large arrays still truncated to MAX_LOG_ARRAY_ITEMS", () => {
  const total = MAX_LOG_ARRAY_ITEMS + 10;
  const messages = Array.from({ length: total }, (_, i) => ({ role: "user", content: `msg ${i}` }));
  const result = cloneBoundedForLog({ messages }) as { messages: Array<Record<string, unknown>> };
  assert.equal(result.messages.length, MAX_LOG_ARRAY_ITEMS + 1, "1 marker + tail items");
  const marker = result.messages[0];
  assert.equal(marker._omniroute_truncated_array, true);
  assert.equal(marker.originalLength, total);
  assert.equal(marker.retainedTailItems, MAX_LOG_ARRAY_ITEMS);
});

test("cloneBoundedForLog: nested tools field still exempt", () => {
  const body = {
    body: { tools: Array.from({ length: 30 }, (_, i) => ({ name: `t_${i}` })) },
  };
  const result = cloneBoundedForLog(body) as { body: { tools: unknown[] } };
  assert.equal(result.body.tools.length, 30);
});

// Regression: a Chat Completions response's tool_calls[].function is 6 levels
// deep from the response body (body -> choices -> [i] -> message -> tool_calls
// -> [i] -> function) — the depth cap used to be a hardcoded 6, so every
// logged tool call's `function` (name + arguments) got replaced outright with
// the literal string "[MaxDepth]", not just deeply truncated. This broke tool
// call rendering in the request-detail view for ANY response with a tool
// call — not an edge case, universal.
test("cloneBoundedForLog: tool_calls[].function survives at its natural depth (was clobbered to '[MaxDepth]')", () => {
  const body = {
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "call_1",
              type: "function",
              function: { name: "write", arguments: '{"path":"/tmp/x","content":"hi"}' },
            },
          ],
        },
      },
    ],
  };
  const result = cloneBoundedForLog(body) as {
    choices: Array<{ message: { tool_calls: Array<{ function: unknown }> } }>;
  };
  const fn = result.choices[0].message.tool_calls[0].function;
  assert.notEqual(fn, "[MaxDepth]", "function must not be clobbered to the MaxDepth placeholder");
  assert.deepEqual(fn, { name: "write", arguments: '{"path":"/tmp/x","content":"hi"}' });
});

test("cloneBoundedForLog: top-level array without key context still truncated", () => {
  const arr = Array.from({ length: MAX_LOG_ARRAY_ITEMS + 10 }, (_, i) => i);
  const result = cloneBoundedForLog(arr) as unknown[];
  assert.equal(result.length, MAX_LOG_ARRAY_ITEMS + 1);
});

test("cloneBoundedForLog: small tools array (<=MAX) passes through unchanged", () => {
  const tools = Array.from({ length: 10 }, (_, i) => ({ name: `t_${i}` }));
  const result = cloneBoundedForLog({ tools }) as { tools: unknown[] };
  assert.equal(result.tools.length, 10);
});

// The pipeline capture (cloneBoundedForLog) and its sibling cloneBoundedChatLogPayload
// (chatCore/logTruncation.ts) bound the same call-log artifact. Only the sibling honored
// CHAT_LOG_TEXT_LIMIT / CHAT_LOG_MAX_OBJECT_KEYS, so an operator could not get a complete
// providerRequest: a tool schema with >80 properties lost its tail and any tool output
// above 64 KB was cut, whatever the env said.
function withEnv(vars: Record<string, string | undefined>, fn: () => void) {
  const saved = Object.fromEntries(Object.keys(vars).map((k) => [k, process.env[k]]));
  for (const [k, v] of Object.entries(vars)) {
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }
  try {
    fn();
  } finally {
    for (const [k, v] of Object.entries(saved)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  }
}

function schemaWithProperties(count: number) {
  return Object.fromEntries(Array.from({ length: count }, (_, i) => [`p${i}`, { type: "string" }]));
}

test("cloneBoundedForLog: default caps unchanged (64 KB strings, 80 object keys)", () => {
  withEnv({ CHAT_LOG_TEXT_LIMIT: undefined, CHAT_LOG_MAX_OBJECT_KEYS: undefined }, () => {
    const result = cloneBoundedForLog({
      text: "a".repeat(100 * 1024),
      properties: schemaWithProperties(88),
    }) as { text: string; properties: Record<string, unknown> };
    assert.equal(result.text.length, 64 * 1024);
    assert.match(result.text, /\[\.\.\.truncated \d+ chars\.\.\.\]/);
    assert.equal(result.properties._omniroute_truncated_keys, 8);
  });
});

test("cloneBoundedForLog: honors CHAT_LOG_TEXT_LIMIT", () => {
  withEnv({ CHAT_LOG_TEXT_LIMIT: String(1024 * 1024) }, () => {
    const text = "a".repeat(400 * 1024);
    const result = cloneBoundedForLog({ text }) as { text: string };
    assert.equal(result.text, text);
  });
});

test("cloneBoundedForLog: CHAT_LOG_MAX_OBJECT_KEYS=0 keeps every key", () => {
  withEnv({ CHAT_LOG_MAX_OBJECT_KEYS: "0" }, () => {
    const properties = schemaWithProperties(88);
    const result = cloneBoundedForLog({ properties }) as { properties: Record<string, unknown> };
    assert.deepEqual(result.properties, properties);
  });
});

test("cloneBoundedForLog: honors a raised CHAT_LOG_MAX_OBJECT_KEYS", () => {
  withEnv({ CHAT_LOG_MAX_OBJECT_KEYS: "100" }, () => {
    const properties = schemaWithProperties(88);
    const result = cloneBoundedForLog({ properties }) as { properties: Record<string, unknown> };
    assert.deepEqual(result.properties, properties);
  });
});
