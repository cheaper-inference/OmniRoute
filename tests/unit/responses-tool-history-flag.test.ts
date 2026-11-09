/**
 * OMNIROUTE_RESPONSES_STRICT_TOOL_HISTORY selects how inconsistent Responses tool history is
 * handled. Unset, the repairs stay in place: orphan outputs are dropped, unanswered calls get an
 * empty output (#15216), ids are minted or clamped and malformed arguments become "{}". Set,
 * the same histories are refused with a 400 before dispatch (#19126).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const TEST_DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-responses-tool-history-flag-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { CodexExecutor } = await import("../../open-sse/executors/codex.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { openaiToOpenAIResponsesRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");
const {
  enforceResponsesToolHistory,
  isStrictResponsesToolHistoryEnabled,
  validateResponsesToolHistory,
} = await import("../../open-sse/translator/helpers/responsesToolHistory.ts");

type Item = Record<string, unknown>;
type Message = Record<string, unknown>;

const FLAG = "OMNIROUTE_RESPONSES_STRICT_TOOL_HISTORY";
const originalFlag = process.env[FLAG];

/** Run a check with the flag in the requested state. */
function withFlag<T>(value: string | undefined, check: () => T): T {
  if (value === undefined) delete process.env[FLAG];
  else process.env[FLAG] = value;
  try {
    return check();
  } finally {
    if (originalFlag === undefined) delete process.env[FLAG];
    else process.env[FLAG] = originalFlag;
  }
}

/** Run a check in strict mode. */
function strict<T>(check: () => T): T {
  return withFlag("true", check);
}

/** Run a check with the flag unset, which is the default mode. */
function repairing<T>(check: () => T): T {
  return withFlag(undefined, check);
}

/** Translate a copy of Chat messages (the pipeline mutates them) into Responses input items. */
function translate(messages: Message[], extra: Record<string, unknown> = {}): Item[] {
  const result = translateRequest(
    "openai",
    "openai-responses",
    "gpt-4o",
    { model: "gpt-4o", messages: structuredClone(messages), ...extra },
    false,
    {},
    "openai"
  ) as { input: Item[] };
  return result.input;
}

/** Translate Chat messages with only the Responses request translator. */
function translateDirect(messages: Message[], extra: Record<string, unknown> = {}): Item[] {
  const body = { messages, ...extra };
  return (openaiToOpenAIResponsesRequest("gpt-4o", body, false, null) as { input: Item[] }).input;
}

/** Build an assistant turn with one tool call. */
function assistantCall(id: unknown, args: unknown = "{}", name = "lookup"): Message {
  return {
    role: "assistant",
    content: null,
    tool_calls: [{ id, type: "function", function: { name, arguments: args } }],
  };
}

/** Build a tool result message. */
function toolResult(id: unknown, content = "real result"): Message {
  return { role: "tool", tool_call_id: id, content };
}

/** Select the items of one Responses type. */
function ofType(items: Item[], type: string): Item[] {
  return items.filter((item) => item.type === type);
}

/** Assert a 400 with the expected message and classification. */
function assertRejected(check: () => unknown, message: RegExp, errorType: string): void {
  assert.throws(check, (error: Error & { statusCode?: number; errorType?: string }) => {
    assert.equal(error.statusCode, 400);
    assert.equal(error.errorType, errorType);
    assert.match(error.message, message);
    return true;
  });
}

/** Run a native Codex input through the executor request transform. */
function codexTransform(input: Item[]): Item[] {
  const result = new CodexExecutor().transformRequest(
    "gpt-5.6-sol",
    { _nativeCodexPassthrough: true, model: "gpt-5.6-sol", input, stream: true },
    true,
    { requestEndpointPath: "/responses" }
  );
  return result.input as Item[];
}

test.after(() => {
  core.resetDbInstance();
  rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("the flag is off unless it is set to true or 1", () => {
  for (const value of [undefined, "", "false", "0", "no", "off"]) {
    assert.equal(withFlag(value, isStrictResponsesToolHistoryEnabled), false, String(value));
  }
  for (const value of ["true", "TRUE", " true ", "1"]) {
    assert.equal(withFlag(value, isStrictResponsesToolHistoryEnabled), true, value);
  }
});

test("default mode: an unanswered call is paired with an empty output (#15216)", () => {
  const input = repairing(() => translateDirect([assistantCall("call_pending")]));
  assert.deepEqual(ofType(input, "function_call_output"), [
    { type: "function_call_output", call_id: "call_pending", output: "", status: "completed" },
  ]);
});

test("strict mode: an unanswered call keeps its place and the validator refuses it", () => {
  strict(() => {
    const input = translateDirect([
      { role: "user", content: "go" },
      assistantCall("call_pending", '{"q":"alpha"}', "probe"),
      { role: "user", content: "continue" },
    ]);
    assert.equal(ofType(input, "function_call_output").length, 0);
    const [call] = ofType(input, "function_call");
    assert.equal(call.name, "probe");
    assert.equal(call.arguments, '{"q":"alpha"}');
    assert.equal(input.indexOf(call), 1);
    assertRejected(
      () => validateResponsesToolHistory({ input }),
      /missing its output/,
      "invalid_tool_call_output"
    );
  });
});

test("strict mode: only the real output survives a mixed turn", () => {
  strict(() => {
    const input = translateDirect([
      {
        role: "assistant",
        content: null,
        tool_calls: [
          { id: "call_orphan", type: "function", function: { name: "a", arguments: "{}" } },
          { id: "call_paired", type: "function", function: { name: "b", arguments: "{}" } },
        ],
      },
      toolResult("call_paired", "b result"),
    ]);
    assert.deepEqual(
      ofType(input, "function_call").map((item) => item.call_id),
      ["call_orphan", "call_paired"]
    );
    assert.deepEqual(
      ofType(input, "function_call_output").map((item) => [item.call_id, item.output]),
      [["call_paired", "b result"]]
    );
  });
});

test("default mode: an orphan output next to a valid pair is dropped", () => {
  const messages = [toolResult("orphan"), assistantCall("call_2"), toolResult("call_2")];
  const outputs = ofType(
    repairing(() => translateDirect(messages)),
    "function_call_output"
  );
  assert.deepEqual(
    outputs.map((item) => item.call_id),
    ["call_2"]
  );
});

test("strict mode: an orphan output next to a valid pair is refused", () => {
  const messages = [toolResult("orphan"), assistantCall("call_2"), toolResult("call_2")];
  strict(() =>
    assertRejected(
      () => translateDirect(messages),
      /does not match a local tool call/i,
      "invalid_tool_call_output"
    )
  );
});

test("orphan-only history: default mode still ships continuity, strict mode refuses it", () => {
  const messages = [{ role: "system", content: "Rules" }, toolResult("call_orphan_x", "stale")];
  const input = repairing(() => translateDirect(messages));
  assert.equal(ofType(input, "function_call_output").length, 0);
  assert.ok(input.length > 0, "the request must not ship a bare input:[]");
  strict(() =>
    assertRejected(
      () => translate(messages),
      /does not match a local tool call/i,
      "invalid_tool_call_output"
    )
  );
});

test("previous_response_id: default mode drops the output, strict mode keeps its ownership", () => {
  const messages = [toolResult("call_remote", "done")];
  const extra = { previous_response_id: "resp_prev" };
  assert.equal(
    ofType(
      repairing(() => translate(messages, extra)),
      "function_call_output"
    ).length,
    0
  );
  assert.equal(strict(() => translate(messages, extra))[0]?.call_id, "call_remote");
});

test("overlong call ids: default mode clamps the pair, strict mode refuses it", () => {
  const longId = "call_" + "a".repeat(80);
  const messages = [assistantCall(longId), toolResult(longId)];
  const input = repairing(() => translateDirect(messages));
  const [call] = ofType(input, "function_call");
  const [output] = ofType(input, "function_call_output");
  assert.equal(String(call.call_id).length, 64);
  assert.equal(output.call_id, call.call_id);
  strict(() =>
    assertRejected(
      () => translateDirect(messages),
      /valid non-blank call_id/i,
      "invalid_tool_call_output"
    )
  );
});

test("missing call ids: default mode mints one, strict mode refuses it", () => {
  const messages = [assistantCall(undefined)];
  const [call] = ofType(
    repairing(() => translateDirect(messages)),
    "function_call"
  );
  assert.match(String(call.call_id), /\S/);
  strict(() =>
    assertRejected(
      () => translateDirect(messages),
      /valid non-blank call_id/i,
      "invalid_tool_call_output"
    )
  );
});

test("malformed arguments: default mode coerces them, strict mode refuses them", () => {
  for (const args of ["   ", '{"city":', "San Francisco"]) {
    const messages = [assistantCall("call_abc", args), toolResult("call_abc")];
    assert.equal(
      ofType(
        repairing(() => translate(messages)),
        "function_call"
      )[0].arguments,
      "{}"
    );
    strict(() =>
      assertRejected(
        () => translate(messages),
        /^Historical tool call has malformed arguments$/,
        "invalid_tool_call_arguments"
      )
    );
  }
});

test("a valid pair translates identically in both modes", () => {
  const messages = [
    { role: "user", content: "Hello" },
    assistantCall("call_2", '{"q":1}'),
    toolResult("call_2", "found"),
  ];
  assert.deepEqual(
    repairing(() => translate(messages)),
    strict(() => translate(messages))
  );
});

test("a displaced tool result is moved next to its call in both modes", () => {
  const messages = [
    assistantCall("call_late"),
    { role: "user", content: "interjection" },
    toolResult("call_late"),
  ];
  for (const run of [repairing, strict]) {
    const input = run(() => translate(messages));
    const callIndex = input.findIndex((item) => item.type === "function_call");
    assert.equal(input[callIndex + 1].type, "function_call_output");
    assert.equal(input[callIndex + 1].output, "real result");
  }
});

test("Codex executor inserts the missing outputs only in default mode", () => {
  const fnCall = { type: "function_call", call_id: "call_fn", name: "read", arguments: "{}" };
  const customCall = {
    type: "custom_tool_call",
    call_id: "call_custom",
    name: "apply_patch",
    input: "*** Begin Patch",
  };
  const repaired = repairing(() => codexTransform([fnCall, customCall]));
  assert.deepEqual(ofType(repaired, "function_call_output"), [
    { type: "function_call_output", call_id: "call_fn", output: "" },
  ]);
  assert.deepEqual(ofType(repaired, "custom_tool_call_output"), [
    { type: "custom_tool_call_output", call_id: "call_custom", output: "" },
  ]);

  const untouched = strict(() => codexTransform([fnCall, customCall]));
  assert.equal(ofType(untouched, "function_call_output").length, 0);
  assert.equal(ofType(untouched, "custom_tool_call_output").length, 0);
  assert.deepEqual(ofType(untouched, "function_call"), [fnCall]);
  assert.deepEqual(ofType(untouched, "custom_tool_call"), [customCall]);
});

test("enforceResponsesToolHistory validates only in strict mode", () => {
  const body = { input: [{ type: "function_call_output", call_id: "orphan", output: "x" }] };
  assert.doesNotThrow(() => repairing(() => enforceResponsesToolHistory(body)));
  strict(() =>
    assertRejected(
      () => enforceResponsesToolHistory(body),
      /does not match a local tool call/i,
      "invalid_tool_call_output"
    )
  );
});
