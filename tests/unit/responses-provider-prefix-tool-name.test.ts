import test from "node:test";
import assert from "node:assert/strict";

/**
 * Some Chat Completions upstreams echo tool calls with a prefix the client never
 * declared (`functions.exec`, harmony-style). A Responses client (Codex CLI)
 * dispatches on the exact declared name and rejects the turn with
 * `unsupported call: functions.exec`. The Chat -> Responses seam must map the
 * emitted name back to a DECLARED name by exact dotted-suffix match — never by
 * guessing — and forward anything unresolvable unchanged.
 */

const { openaiToOpenAIResponsesResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");
const { initState } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { createSSETransformStreamWithLogger } = await import("../../open-sse/utils/stream.ts");
const { translateNonStreamingClientResponse } =
  await import("../../open-sse/handlers/chatCore/nonStreamingClientTranslate.ts");
const { canonicalizeDeclaredToolName, collectDeclaredToolNames } =
  await import("../../open-sse/translator/response/openai-responses/declaredToolName.ts");

type NamespaceIdentity = { namespace: string; name: string };
type ResponseItem = {
  type: string;
  name: string;
  namespace?: string;
  input?: string;
  arguments?: string;
};
type ResponseEvent = { event: string; data: { item?: ResponseItem } };
type RuntimeState = ReturnType<typeof initState> & {
  declaredToolNames?: Set<string> | null;
  customToolNames?: Set<string>;
  requestToolIdentityMap?: Map<string, NamespaceIdentity>;
};

function chatToolBody(...names: string[]) {
  return {
    messages: [{ role: "user", content: "go" }],
    tools: names.map((name) => ({
      type: "function",
      function: { name, parameters: { type: "object", properties: {} } },
    })),
  };
}

function toolCallChunk(name: string, callId: string, args = '{"cmd":"ls"}') {
  return {
    id: `chatcmpl-${callId}`,
    model: "gpt-oss-120b",
    choices: [
      {
        index: 0,
        delta: {
          tool_calls: [
            { index: 0, id: callId, type: "function", function: { name, arguments: args } },
          ],
        },
        finish_reason: "tool_calls",
      },
    ],
    usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
  };
}

function runTranslator(
  name: string,
  setup: Partial<
    Pick<RuntimeState, "declaredToolNames" | "customToolNames" | "requestToolIdentityMap">
  >,
  callId = "call_1"
) {
  const state = initState(FORMATS.OPENAI_RESPONSES) as RuntimeState;
  Object.assign(state, setup);
  const events = [
    ...(openaiToOpenAIResponsesResponse(toolCallChunk(name, callId), state) || []),
    ...(openaiToOpenAIResponsesResponse(null, state) || []),
  ] as ResponseEvent[];
  const added = events.find((e) => e.event === "response.output_item.added")?.data.item;
  const done = events.find(
    (e) => e.event === "response.output_item.done" && e.data.item?.type !== "message"
  )?.data.item;
  return { added, done, events };
}

function captureWarnings<T>(fn: () => T): { result: T; warnings: string[] } {
  const original = console.warn;
  const warnings: string[] = [];
  console.warn = (...args: unknown[]) => {
    warnings.push(args.map(String).join(" "));
  };
  try {
    return { result: fn(), warnings };
  } finally {
    console.warn = original;
  }
}

test("helper: exact, suffix, undeclared and no-declaration cases", () => {
  const declared = new Set(["exec", "a.b", "read"]);
  assert.deepEqual(canonicalizeDeclaredToolName("functions.exec", declared), {
    name: "exec",
    unresolved: false,
  });
  assert.deepEqual(canonicalizeDeclaredToolName("x.functions.exec", declared), {
    name: "exec",
    unresolved: false,
  });
  // A declared dotted name wins over any suffix logic.
  assert.deepEqual(canonicalizeDeclaredToolName("a.b", declared), {
    name: "a.b",
    unresolved: false,
  });
  assert.deepEqual(canonicalizeDeclaredToolName("exec", declared), {
    name: "exec",
    unresolved: false,
  });
  assert.deepEqual(canonicalizeDeclaredToolName("functions.nope", declared), {
    name: "functions.nope",
    unresolved: true,
  });
  // No suffix fuzziness: `xexec` is not `exec`.
  assert.equal(canonicalizeDeclaredToolName("functions.xexec", declared).name, "functions.xexec");
  // No declared tools -> no guessing at all.
  assert.deepEqual(canonicalizeDeclaredToolName("functions.exec", null), {
    name: "functions.exec",
    unresolved: false,
  });
  assert.deepEqual(
    [...(collectDeclaredToolNames({ tools: [{ type: "function", name: "exec" }] }) || [])],
    ["exec"]
  );
  assert.equal(collectDeclaredToolNames({ messages: [] }), null);
});

test("provider-injected `functions.exec` maps back to the declared flat `exec`", () => {
  const { added, done } = runTranslator("functions.exec", {
    declaredToolNames: new Set(["exec", "read"]),
  });
  assert.equal(added?.type, "function_call");
  assert.equal(added?.name, "exec");
  assert.equal(added?.namespace, undefined);
  assert.equal(done?.name, "exec");
  assert.equal(done?.arguments, '{"cmd":"ls"}');
});

test("an exactly declared name is emitted unchanged", () => {
  const { added, done } = runTranslator("exec", { declaredToolNames: new Set(["exec"]) });
  assert.equal(added?.name, "exec");
  assert.equal(done?.name, "exec");
});

test("an undeclared name is forwarded unchanged (never dropped)", () => {
  const { added, done } = runTranslator("unknown_tool", { declaredToolNames: new Set(["exec"]) });
  assert.equal(added?.type, "function_call");
  assert.equal(added?.name, "unknown_tool");
  assert.equal(done?.name, "unknown_tool");
});

test("an unresolvable dotted name is forwarded unchanged with one warning per stream", () => {
  const { result, warnings } = captureWarnings(() => {
    const state = initState(FORMATS.OPENAI_RESPONSES) as RuntimeState;
    state.declaredToolNames = new Set(["exec"]);
    const first = openaiToOpenAIResponsesResponse(
      {
        id: "chatcmpl-x",
        model: "m",
        choices: [
          {
            index: 0,
            delta: {
              tool_calls: [
                { index: 0, id: "c1", type: "function", function: { name: "functions.nope" } },
                { index: 1, id: "c2", type: "function", function: { name: "functions.nope" } },
              ],
            },
            finish_reason: "tool_calls",
          },
        ],
      },
      state
    ) as ResponseEvent[];
    return first;
  });
  const names = result
    .filter((e) => e.event === "response.output_item.added")
    .map((e) => e.data.item?.name);
  assert.deepEqual(names, ["functions.nope", "functions.nope"]);
  const matching = warnings.filter((w) => w.includes("functions.nope"));
  assert.equal(matching.length, 1, `expected one warning, got: ${warnings.join("\n")}`);
  assert.equal(
    matching[0].includes('{"cmd"'),
    false,
    "tool arguments must never reach the log line"
  );
});

test("namespace identity restoration is unchanged (#7936 regression guard)", () => {
  const identityMap = new Map([
    ["collaboration__spawn_agent", { namespace: "collaboration", name: "spawn_agent" }],
  ]);
  const { added, done } = runTranslator("collaboration__spawn_agent", {
    declaredToolNames: new Set(["collaboration__spawn_agent", "exec"]),
    requestToolIdentityMap: identityMap,
  });
  assert.equal(added?.name, "spawn_agent");
  assert.equal(added?.namespace, "collaboration");
  assert.equal(done?.name, "spawn_agent");
  assert.equal(done?.namespace, "collaboration");

  // The ledger's `namespace.leaf` dot alias still wins over suffix canonicalization,
  // even when a flat tool with the same leaf name is also declared.
  const dotted = runTranslator("collaboration.spawn_agent", {
    declaredToolNames: new Set(["collaboration__spawn_agent", "spawn_agent"]),
    requestToolIdentityMap: identityMap,
  });
  assert.equal(dotted.added?.name, "spawn_agent");
  assert.equal(dotted.added?.namespace, "collaboration");
});

test("`functions.apply_patch` resolves to the declared custom apply_patch tool", () => {
  const { added, done } = runTranslator("functions.apply_patch", {
    declaredToolNames: new Set(["exec"]),
    customToolNames: new Set(["apply_patch"]),
  });
  assert.equal(added?.type, "custom_tool_call");
  assert.equal(added?.name, "apply_patch");
  assert.equal(done?.type, "custom_tool_call");
  assert.equal(done?.name, "apply_patch");
});

test("declared names are request-scoped: two states never leak into each other", () => {
  const first = runTranslator("functions.exec", { declaredToolNames: new Set(["exec"]) }, "r1");
  const second = runTranslator("functions.exec", { declaredToolNames: new Set(["other"]) }, "r2");
  assert.equal(first.added?.name, "exec");
  assert.equal(second.added?.name, "functions.exec");
});

test("stream wiring: the request body's declared tools reach the translator", async () => {
  const ts = createSSETransformStreamWithLogger(
    FORMATS.OPENAI,
    FORMATS.OPENAI_RESPONSES,
    "openai-compatible",
    null,
    null,
    "gpt-oss-120b",
    "conn-4200",
    chatToolBody("exec", "read")
  );
  const writer = ts.writable.getWriter();
  const reader = ts.readable.getReader();
  const decoder = new TextDecoder();
  const readAll = (async () => {
    let out = "";
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      out += decoder.decode(value);
    }
    return out;
  })();
  const encoder = new TextEncoder();
  await writer.write(
    encoder.encode(`data: ${JSON.stringify(toolCallChunk("functions.exec", "call_s"))}\n\n`)
  );
  await writer.write(encoder.encode("data: [DONE]\n\n"));
  await writer.close();
  const raw = await readAll;

  assert.match(raw, /"name":"exec"/);
  assert.doesNotMatch(raw, /functions\.exec/);
});

test("non-streaming Chat -> Responses maps `functions.exec` to the declared name", () => {
  const result = translateNonStreamingClientResponse({
    responseBody: {
      id: "chatcmpl-ns",
      object: "chat.completion",
      model: "gpt-oss-120b",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: null,
            tool_calls: [
              {
                id: "call_ns",
                type: "function",
                function: { name: "functions.exec", arguments: '{"cmd":"ls"}' },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
      usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
    },
    responsePayloadFormat: FORMATS.OPENAI,
    clientResponseFormat: FORMATS.OPENAI_RESPONSES,
    sourceFormat: FORMATS.OPENAI_RESPONSES,
    provider: "openai-compatible",
    model: "gpt-oss-120b",
    requestBody: chatToolBody("exec"),
    responseToolNameMap: null,
    requestToolIdentityMap: null,
    reasoningCacheScope: null,
    clientHeaders: null,
    isClaudeCodeCompatible: false,
    phase: "final",
  });
  const output = (result.response as { output: ResponseItem[] }).output;
  const call = output.find((item) => item.type === "function_call");
  assert.equal(call?.name, "exec");
});
