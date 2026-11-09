import test from "node:test";
import assert from "node:assert/strict";

import {
  MUSE_CODE_BLOCKED_TOOL_NAMES,
  aliasMuseCodeHistoryItems,
  attachMuseCodeToolNameMap,
  sanitizeMuseCodeToolNames,
} from "../../open-sse/executors/default/museCodeToolNames.ts";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";

type JsonRecord = Record<string, unknown>;

function responsesBody(): JsonRecord {
  return {
    model: "muse-spark-1.3",
    input: [
      { type: "message", role: "user", content: "run it" },
      { type: "function_call", call_id: "call_1", name: "shell", arguments: "{}" },
      { type: "function_call_output", call_id: "call_1", output: "ok" },
      { type: "custom_tool_call", call_id: "call_2", name: "apply_patch", input: "*** Begin" },
      { type: "function_call", call_id: "call_3", name: "my_tool", arguments: "{}" },
    ],
    tools: [
      { type: "function", name: "shell", parameters: { type: "object" } },
      { type: "custom", name: "apply_patch" },
      { type: "function", name: "my_tool", parameters: { type: "object" } },
      {
        type: "namespace",
        name: "mcp__fs",
        tools: [
          { type: "function", name: "search" },
          { type: "function", name: "list_dir" },
        ],
      },
    ],
    tool_choice: { type: "function", name: "shell" },
  };
}

test("blocked declarations become omniroute_ aliases; unblocked names are untouched", () => {
  const body = responsesBody();
  const ledger = sanitizeMuseCodeToolNames(body);
  assert.ok(ledger);
  assert.deepEqual(
    [...ledger.entries()].sort(),
    [
      ["omniroute_apply_patch", "apply_patch"],
      ["omniroute_search", "search"],
      ["omniroute_shell", "shell"],
    ].sort()
  );
  const tools = body.tools as JsonRecord[];
  assert.equal(tools[0].name, "omniroute_shell");
  assert.equal(tools[1].name, "omniroute_apply_patch");
  assert.equal(tools[2].name, "my_tool");
  const leaves = tools[3].tools as JsonRecord[];
  assert.equal(tools[3].name, "mcp__fs", "namespace group keeps its own name");
  assert.equal(leaves[0].name, "omniroute_search");
  assert.equal(leaves[1].name, "list_dir");
  assert.equal((body.tool_choice as JsonRecord).name, "omniroute_shell");
  const input = body.input as JsonRecord[];
  assert.equal(input[1].name, "omniroute_shell");
  assert.equal(input[3].name, "omniroute_apply_patch");
  assert.equal(input[4].name, "my_tool");
});

test("chat-completions function declarations and history follow the same aliases", () => {
  const body: JsonRecord = {
    tools: [{ type: "function", function: { name: "read_file", parameters: {} } }],
    messages: [
      {
        role: "assistant",
        tool_calls: [{ id: "c1", type: "function", function: { name: "read_file" } }],
        content: [{ type: "tool_use", id: "t1", name: "read_file", input: {} }],
      },
    ],
  };
  const ledger = sanitizeMuseCodeToolNames(body);
  assert.deepEqual([...(ledger ?? new Map())], [["omniroute_read_file", "read_file"]]);
  const fn = ((body.tools as JsonRecord[])[0].function ?? {}) as JsonRecord;
  assert.equal(fn.name, "omniroute_read_file");
  const message = (body.messages as JsonRecord[])[0];
  const call = (message.tool_calls as JsonRecord[])[0].function as JsonRecord;
  assert.equal(call.name, "omniroute_read_file");
  assert.equal((message.content as JsonRecord[])[0].name, "omniroute_read_file");
});

test("an alias never shadows a tool the client already declared under that name", () => {
  const body: JsonRecord = {
    tools: [
      { type: "function", name: "bash" },
      { type: "function", name: "omniroute_bash" },
    ],
  };
  const ledger = sanitizeMuseCodeToolNames(body);
  assert.deepEqual([...(ledger ?? new Map())], [["omniroute_bash_2", "bash"]]);
  const tools = body.tools as JsonRecord[];
  assert.equal(tools[0].name, "omniroute_bash_2");
  assert.equal(tools[1].name, "omniroute_bash");
});

test("nothing blocked, no tools, or a non-object body returns null and leaves the body as is", () => {
  const clean: JsonRecord = { tools: [{ type: "function", name: "Read_File" }] };
  assert.equal(sanitizeMuseCodeToolNames(clean), null);
  assert.equal((clean.tools as JsonRecord[])[0].name, "Read_File", "case variants pass the gate");
  assert.equal(sanitizeMuseCodeToolNames({ input: "hi" }), null);
  assert.equal(sanitizeMuseCodeToolNames({ tools: [] }), null);
  assert.equal(sanitizeMuseCodeToolNames(null), null);
  assert.equal(sanitizeMuseCodeToolNames([{ name: "bash" }]), null);
});

test("history aliasing is a no-op with an empty ledger and skips non-call items", () => {
  const body: JsonRecord = {
    input: [
      { type: "function_call_output", call_id: "c", name: "bash" },
      { type: "function_call", call_id: "c", name: "bash" },
    ],
  };
  aliasMuseCodeHistoryItems(body, new Map());
  assert.equal((body.input as JsonRecord[])[1].name, "bash");
  aliasMuseCodeHistoryItems(body, new Map([["bash", "omniroute_bash"]]));
  assert.equal((body.input as JsonRecord[])[0].name, "bash");
  assert.equal((body.input as JsonRecord[])[1].name, "omniroute_bash");
});

test("the ledger attaches non-enumerably and merges without overwriting existing entries", () => {
  const body: JsonRecord = {};
  attachMuseCodeToolNameMap(body, new Map([["omniroute_bash", "bash"]]));
  const map = body._toolNameMap as Map<string, string>;
  assert.ok(map instanceof Map);
  assert.equal(map.get("omniroute_bash"), "bash");
  assert.equal(Object.keys(body).includes("_toolNameMap"), false);
  assert.equal(JSON.stringify(body), "{}");

  attachMuseCodeToolNameMap(
    body,
    new Map([
      ["omniroute_bash", "other"],
      ["omniroute_shell", "shell"],
    ])
  );
  assert.equal(map.get("omniroute_bash"), "bash");
  assert.equal(map.get("omniroute_shell"), "shell");

  const untouched: JsonRecord = {};
  attachMuseCodeToolNameMap(untouched, new Map());
  assert.equal("_toolNameMap" in untouched, false);
});

test("the blocked set is the exact-name list, not a pattern", () => {
  for (const name of ["read_file", "write_file", "edit_file", "apply_patch", "bash"]) {
    assert.ok(MUSE_CODE_BLOCKED_TOOL_NAMES.has(name), name);
  }
  assert.equal(MUSE_CODE_BLOCKED_TOOL_NAMES.has("read_file_v2"), false);
});

test("the muse-code executor aliases blocked declarations on the wire and restores via _toolNameMap", () => {
  const out = new DefaultExecutor("muse-code").transformRequest(
    "muse-spark-1.3",
    { model: "muse-spark-1.3", input: "hi", tools: [{ type: "function", name: "shell" }] },
    false,
    { apiKey: "LLM|test" }
  ) as JsonRecord;
  assert.equal((out.tools as JsonRecord[])[0].name, "omniroute_shell");
  const map = out._toolNameMap as Map<string, string>;
  assert.ok(map instanceof Map);
  assert.equal(map.get("omniroute_shell"), "shell");
  assert.equal(JSON.stringify(out).includes("_toolNameMap"), false);
});

test("other providers keep the client's declared names", () => {
  const out = new DefaultExecutor("openai").transformRequest(
    "gpt-4.1",
    { model: "gpt-4.1", messages: [], tools: [{ type: "function", function: { name: "shell" } }] },
    false,
    { apiKey: "sk-test" }
  ) as JsonRecord;
  const fn = (out.tools as JsonRecord[])[0].function as JsonRecord;
  assert.equal(fn.name, "shell");
});
