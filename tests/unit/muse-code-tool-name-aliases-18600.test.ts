import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";

import { aliasMuseToolNames } from "../../open-sse/executors/museToolNameAliases.ts";

type JsonRecord = Record<string, unknown>;
type Identity = { namespace: string; name: string };
const COLLISIONS = [
  "read_file",
  "write_file",
  "edit_file",
  "bash",
  "web_search",
  "tool_search",
  "subagent_send_message",
  "subagent_cancel",
];

function record(value: unknown): JsonRecord {
  assert.ok(value && typeof value === "object" && !Array.isArray(value));
  return value as JsonRecord;
}

function records(value: unknown): JsonRecord[] {
  assert.ok(Array.isArray(value));
  return value.map(record);
}

function rewrite(body: unknown): JsonRecord {
  return record(aliasMuseToolNames(body));
}

function aliases(body: JsonRecord): Map<string, string> {
  assert.ok(body._toolNameMap instanceof Map);
  return body._toolNameMap as Map<string, string>;
}

function identities(body: JsonRecord): Map<string, Identity> {
  assert.ok(body._namespaceToolIdentityMap instanceof Map);
  return body._namespaceToolIdentityMap as Map<string, Identity>;
}

function fn(name: string, extra: JsonRecord = {}): JsonRecord {
  return { type: "function", name, parameters: { type: "object", properties: {} }, ...extra };
}

function ns(name: string, tools: JsonRecord[]): JsonRecord {
  return { type: "namespace", name, tools };
}

function wire(body: JsonRecord, index = 0): string {
  const name = records(body.tools)[index].name;
  assert.equal(typeof name, "string");
  return name as string;
}

function childWire(body: JsonRecord, index = 0): string {
  return records(records(body.tools)[index].tools)[0].name as string;
}

function baseAlias(name: string, namespace = ""): string {
  const hash = createHash("sha256")
    .update(JSON.stringify([namespace, name]))
    .digest("hex")
    .slice(0, 16);
  return `muse_${name}_${hash}`;
}

function metadata(body: JsonRecord, key: string, map: Map<string, unknown>): void {
  Object.defineProperty(body, key, { value: map, configurable: true, writable: true });
}

function deepFreeze(value: unknown): void {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return;
  if (value instanceof Map) {
    for (const entry of value.values()) deepFreeze(entry);
  } else {
    for (const entry of Object.values(value)) deepFreeze(entry);
  }
  Object.freeze(value);
}

for (const name of COLLISIONS) {
  test(`aliases exact function name ${name} with a readable SHA256 identity suffix`, () => {
    const out = rewrite({ tools: [fn(name)] });
    assert.equal(wire(out), baseAlias(name));
    assert.match(wire(out), /^[A-Za-z0-9_-]{1,64}$/);
    assert.equal(aliases(out).get(wire(out)), name);
    assert.equal(out._namespaceToolIdentityMap, undefined);
  });
}

test("collision matching is case-sensitive and never parses flat dots or mcp prefixes", () => {
  const names = [
    "Read_file",
    "Bash",
    "WEB_SEARCH",
    "read_file_extra",
    "files.read_file",
    "mcp__files__read_file",
  ];
  const body = { tools: names.map((name) => fn(name)) };
  const out = rewrite(body);
  assert.deepEqual(
    records(out.tools).map((tool) => tool.name),
    names
  );
  assert.equal(out._toolNameMap, undefined);
  assert.equal(out._namespaceToolIdentityMap, undefined);
});

test("mixed function, custom, native server, and builtin fleets only alias functions", () => {
  const untouched = [
    { type: "web_search", name: "web_search", filters: { name: "read_file" } },
    { type: "tool_search", name: "tool_search" },
    { type: "custom", name: "bash", format: { type: "text" } },
    { type: "mcp", name: "read_file", server_label: "bash" },
    { type: "computer_use_preview", name: "edit_file" },
  ];
  const out = rewrite({ tools: [fn("web_search"), ...untouched] });
  assert.equal(wire(out), baseAlias("web_search"));
  assert.deepEqual(records(out.tools).slice(1), untouched);
  assert.equal(aliases(out).size, 1);
});

test("duplicate namespace leaves get distinct aliases, schemas and containers stay intact", () => {
  const schemaA = { type: "object", properties: { path: { type: "string" } }, required: ["path"] };
  const schemaB = { type: "object", properties: { url: { type: "string" } } };
  const body = {
    tools: [
      ns("files", [fn("read_file", { parameters: schemaA })]),
      ns("remote", [fn("read_file", { parameters: schemaB })]),
    ],
  };
  const out = rewrite(body);
  assert.equal(childWire(out, 0), baseAlias("read_file", "files"));
  assert.equal(childWire(out, 1), baseAlias("read_file", "remote"));
  assert.notEqual(childWire(out, 0), childWire(out, 1));
  assert.deepEqual(
    records(out.tools).map((tool) => tool.name),
    ["files", "remote"]
  );
  assert.equal(records(records(out.tools)[0].tools)[0].parameters, schemaA);
  assert.equal(records(records(out.tools)[1].tools)[0].parameters, schemaB);
  assert.deepEqual(identities(out).get(childWire(out)), { namespace: "files", name: "read_file" });
});

test("namespace children with missing type are functions, explicit custom/server children are not", () => {
  const children = [
    { name: "bash", strict: false },
    { type: "custom", name: "bash" },
    { type: "web_search", name: "web_search" },
  ];
  const out = rewrite({ tools: [ns("functions", children)] });
  const rewritten = records(records(out.tools)[0].tools);
  assert.equal(rewritten[0].name, baseAlias("bash", "functions"));
  assert.equal(rewritten[0].type, undefined);
  assert.deepEqual(rewritten.slice(1), children.slice(1));
  assert.deepEqual(identities(out).get(childWire(out)), { namespace: "functions", name: "bash" });
});

test("history-only function calls alias flat and native namespace identities", () => {
  const input = [
    { type: "function_call", name: "bash", call_id: "bash", arguments: '{"name":"bash"}' },
    { type: "function_call", name: "bash", namespace: "shell", call_id: "c2", arguments: "{}" },
    { type: "function_call_output", name: "bash", call_id: "bash", output: "bash" },
    { type: "custom_tool_call", name: "bash", input: "bash" },
    { type: "web_search_call", name: "web_search", action: { query: "bash" } },
  ];
  const out = rewrite({ input });
  const items = records(out.input);
  assert.equal(items[0].name, baseAlias("bash"));
  assert.equal(items[1].name, baseAlias("bash", "shell"));
  assert.equal(items[1].namespace, "shell");
  assert.equal(items[0].call_id, "bash");
  assert.equal(items[0].arguments, input[0].arguments);
  assert.deepEqual(items.slice(2), input.slice(2));
  assert.deepEqual(identities(out).get(items[1].name as string), {
    namespace: "shell",
    name: "bash",
  });
});

test("forced function choice and namespaced history agree with declarations", () => {
  const out = rewrite({
    tools: [ns("files", [fn("edit_file")])],
    input: [
      {
        type: "function_call",
        namespace: "files",
        name: "edit_file",
        arguments: "{}",
        call_id: "c1",
      },
    ],
    tool_choice: { type: "function", namespace: "files", name: "edit_file", extra: "edit_file" },
  });
  const name = childWire(out);
  assert.equal(record(out.tool_choice).name, name);
  assert.equal(record(out.tool_choice).namespace, "files");
  assert.equal(record(out.tool_choice).extra, "edit_file");
  assert.equal(records(out.input)[0].name, name);
});

test("allowed_tools function descriptors are rewritten without changing mode or native/custom choices", () => {
  const descriptors = [
    { type: "function", name: "bash" },
    { type: "function", namespace: "files", name: "read_file" },
    { type: "custom", name: "bash" },
    { type: "web_search" },
  ];
  const out = rewrite({
    tools: [fn("bash"), ns("files", [fn("read_file")])],
    tool_choice: { type: "allowed_tools", mode: "required", tools: descriptors },
  });
  const choice = record(out.tool_choice);
  const tools = records(choice.tools);
  assert.equal(choice.mode, "required");
  assert.equal(tools[0].name, wire(out));
  assert.equal(tools[1].name, childWire(out, 1));
  assert.equal(tools[1].namespace, "files");
  assert.deepEqual(tools.slice(2), descriptors.slice(2));
});

test("tool_choice control strings and custom/server forced choices remain unchanged", () => {
  for (const choice of [
    "auto",
    "none",
    "required",
    { type: "custom", name: "bash" },
    { type: "web_search", name: "web_search" },
  ]) {
    const out = rewrite({ tools: [fn("bash")], tool_choice: choice });
    assert.equal(wire(out), baseAlias("bash"));
    assert.deepEqual(out.tool_choice, choice);
  }
});

test("accepted inline additional_tools declarations are aliased in place with namespace context", () => {
  const inline = {
    type: "additional_tools",
    tools: [fn("write_file"), ns("files", [{ name: "read_file", parameters: { type: "object" } }])],
    extra: "write_file",
  };
  const out = rewrite({
    input: [inline, { type: "function_call", name: "write_file", call_id: "c1" }],
    tool_choice: { type: "function", namespace: "files", name: "read_file" },
  });
  const items = records(out.input);
  const declarations = records(items[0].tools);
  assert.equal(declarations[0].name, baseAlias("write_file"));
  assert.equal(items[1].name, declarations[0].name);
  assert.equal(records(declarations[1].tools)[0].name, baseAlias("read_file", "files"));
  assert.equal(record(out.tool_choice).name, records(declarations[1].tools)[0].name);
  assert.equal(out.tools, undefined);
  assert.equal(items[0].extra, "write_file");
  assert.notEqual(items[0], inline);
});

test("occupied declarations, history, references, container names and both ledger keys reserve candidates", () => {
  const candidate = baseAlias("bash");
  const body: JsonRecord = {
    tools: [fn("bash"), { type: "custom", name: candidate }, ns(`${candidate}_4`, [])],
    input: [{ type: "function_call", name: `${candidate}_1` }],
    tool_choice: { type: "allowed_tools", tools: [{ type: "custom", name: `${candidate}_2` }] },
  };
  metadata(body, "_toolNameMap", new Map([[`${candidate}_3`, "Original"]]));
  metadata(
    body,
    "_namespaceToolIdentityMap",
    new Map([[`${candidate}_5`, { namespace: "other", name: "other" }]])
  );
  const out = rewrite(body);
  assert.equal(wire(out), `${candidate}_6`);
  assert.equal(aliases(out).get(`${candidate}_3`), "Original");
  assert.match(wire(out), /^[A-Za-z0-9_-]{1,64}$/);
});

test("custom history and unknown nonfunction allowed descriptors reserve occupied candidates", () => {
  const candidate = baseAlias("bash");
  const history = { type: "custom_tool_call", name: candidate, input: "bash" };
  const descriptor = { type: "future_server_tool", name: `${candidate}_1`, config: "bash" };
  const out = rewrite({
    tools: [fn("bash")],
    input: [history],
    tool_choice: { type: "allowed_tools", mode: "auto", tools: [descriptor] },
  });
  assert.equal(wire(out), `${candidate}_2`);
  assert.deepEqual(records(out.input)[0], history);
  assert.deepEqual(records(record(out.tool_choice).tools)[0], descriptor);
});

test("malformed ledger entries still reserve their string keys", () => {
  const candidate = baseAlias("bash");
  const body: JsonRecord = { tools: [fn("bash")] };
  metadata(body, "_toolNameMap", new Map([[candidate, 123]]));
  metadata(body, "_namespaceToolIdentityMap", new Map([[`${candidate}_1`, null]]));
  const out = rewrite(body);
  assert.equal(wire(out), `${candidate}_2`);
  assert.deepEqual([...aliases(out)], [[`${candidate}_2`, "bash"]]);
});

test("equivalent declaration orders allocate identical ledgers and identities", () => {
  const declarations = [
    fn("bash"),
    ns("z", [fn("read_file")]),
    ns("a", [fn("read_file")]),
    fn("tool_search"),
  ];
  const first = rewrite({ tools: declarations });
  const second = rewrite({ tools: [...declarations].reverse() });
  assert.deepEqual([...aliases(first)], [...aliases(second)]);
  assert.deepEqual([...identities(first)], [...identities(second)]);
});

test("shared declaration records in distinct namespace containers are copied per identity", () => {
  const shared = fn("read_file");
  const out = rewrite({ tools: [ns("a", [shared]), ns("b", [shared])] });
  assert.equal(childWire(out), baseAlias("read_file", "a"));
  assert.equal(childWire(out, 1), baseAlias("read_file", "b"));
  assert.equal(shared.name, "read_file");
});

test("reapplying an unresolved ambiguous reference stays idempotent after declarations are aliased", () => {
  const body = {
    tools: [ns("a", [fn("bash")]), ns("b", [fn("bash")])],
    input: [{ type: "function_call", name: "bash" }],
  };
  const first = rewrite(body);
  const second = rewrite(first);
  assert.deepEqual(second, first);
  assert.equal(records(second.input)[0].name, "bash");
  assert.deepEqual([...aliases(second)], [...aliases(first)]);
});

test("redispatch is deterministic and reapplying the helper is idempotent", () => {
  const body = { tools: [fn("bash"), ns("files", [fn("read_file")])] };
  const first = rewrite(body);
  const redispatch = rewrite(body);
  const second = rewrite(first);
  assert.deepEqual(redispatch, first);
  assert.deepEqual(second, first);
  assert.deepEqual([...aliases(second)], [...aliases(first)]);
  assert.deepEqual([...identities(second)], [...identities(first)]);
  assert.notEqual(aliases(second), aliases(first));
  assert.notEqual(identities(second), identities(first));
});

test("deep-frozen client body and shared ledgers are untouched; modified arrays/records are copied", () => {
  const originalIdentity = { namespace: "files", name: "read_file" };
  const oldAliases = new Map<string, unknown>([["safe", "SafeOriginal"]]);
  const oldIdentities = new Map<string, unknown>([["safe_ns", originalIdentity]]);
  const body: JsonRecord = {
    tools: [fn("bash"), ns("files", [fn("read_file")])],
    input: [{ type: "function_call", name: "bash", arguments: "{}" }],
    tool_choice: { type: "allowed_tools", tools: [{ type: "function", name: "bash" }] },
    unknown: { name: "bash" },
  };
  metadata(body, "_toolNameMap", oldAliases);
  metadata(body, "_namespaceToolIdentityMap", oldIdentities);
  deepFreeze(body);
  deepFreeze(oldIdentities);
  const before = JSON.stringify(body);
  const out = rewrite(body);
  assert.notEqual(out, body);
  assert.notEqual(out.tools, body.tools);
  assert.notEqual(records(out.tools)[0], records(body.tools)[0]);
  assert.notEqual(records(out.tools)[1], records(body.tools)[1]);
  assert.notEqual(records(out.tools)[1].tools, records(body.tools)[1].tools);
  assert.notEqual(out.input, body.input);
  assert.notEqual(records(out.input)[0], records(body.input)[0]);
  assert.notEqual(out.tool_choice, body.tool_choice);
  assert.notEqual(record(out.tool_choice).tools, record(body.tool_choice).tools);
  assert.equal(out.unknown, body.unknown);
  assert.equal(JSON.stringify(body), before);
  assert.deepEqual([...oldAliases], [["safe", "SafeOriginal"]]);
  assert.deepEqual([...oldIdentities], [["safe_ns", originalIdentity]]);
  assert.notEqual(aliases(out), oldAliases);
  assert.notEqual(identities(out), oldIdentities);
  assert.notEqual(identities(out).get("safe_ns"), originalIdentity);
  aliases(out).set("new", "New");
  assert.equal(oldAliases.has("new"), false);
});

test("prior alias chains compose directly from final wire names to client originals", () => {
  const body: JsonRecord = { tools: [fn("bash")] };
  metadata(
    body,
    "_toolNameMap",
    new Map([
      ["bash", "prior_wire"],
      ["prior_wire", "OriginalClientBash"],
    ])
  );
  const out = rewrite(body);
  assert.equal(wire(out), baseAlias("OriginalClientBash"));
  assert.equal(aliases(out).get(wire(out)), "OriginalClientBash");
  assert.equal(aliases(out).get("bash"), "OriginalClientBash");
});

test("existing dedicated identities remap to the new wire key and retain actual namespace/name", () => {
  const identity = { namespace: "files", name: "OriginalRead" };
  const body: JsonRecord = {
    tools: [fn("read_file")],
    input: [{ type: "function_call", name: "read_file" }],
    tool_choice: { type: "function", name: "read_file" },
  };
  metadata(body, "_namespaceToolIdentityMap", new Map([["read_file", identity]]));
  metadata(body, "_toolNameMap", new Map([["read_file", "OriginalRead"]]));
  const out = rewrite(body);
  const name = wire(out);
  assert.equal(name, baseAlias("OriginalRead", "files"));
  assert.deepEqual(identities(out).get(name), identity);
  assert.equal(identities(out).has("read_file"), false);
  assert.equal(aliases(out).get(name), "OriginalRead");
  assert.equal(records(out.input)[0].name, name);
  assert.equal(record(out.tool_choice).name, name);
  assert.equal(records(out.tools)[0].namespace, undefined);
});

test("prior aliases preserve dedicated identity keyed by the previous wire spelling", () => {
  const identity = { namespace: "files", name: "OriginalRead" };
  const body: JsonRecord = {
    tools: [fn("read_file")],
    input: [{ type: "function_call", name: "read_file" }],
    tool_choice: { type: "function", name: "read_file" },
  };
  const previous = new Map<string, unknown>([["previous_wire", identity]]);
  metadata(body, "_namespaceToolIdentityMap", previous);
  metadata(
    body,
    "_toolNameMap",
    new Map([
      ["read_file", "previous_wire"],
      ["previous_wire", "OriginalRead"],
    ])
  );
  const out = rewrite(body);
  const name = wire(out);
  assert.equal(name, baseAlias("OriginalRead", "files"));
  assert.deepEqual(identities(out).get(name), identity);
  assert.equal(aliases(out).get(name), "OriginalRead");
  assert.equal(records(out.input)[0].name, name);
  assert.equal(record(out.tool_choice).name, name);
  assert.deepEqual([...previous], [["previous_wire", identity]]);
  assert.equal(records(out.tools)[0].namespace, undefined);
});

test("intermediate alias references resolve the declared composed client identity", () => {
  for (const dedicated of [false, true]) {
    for (const explicitNamespace of [false, true]) {
      for (const allowed of [false, true]) {
        const namespace = explicitNamespace ? "files" : undefined;
        const reference = { type: "function", name: "bash", ...(namespace ? { namespace } : {}) };
        const call = {
          type: "function_call",
          name: "bash",
          call_id: "c1",
          arguments: "{}",
          ...(namespace ? { namespace } : {}),
        };
        const original = new Map<string, unknown>([
          ["safe_wire", "bash"],
          ["bash", "OriginalClientBash"],
        ]);
        const identity = { namespace: "files", name: "OriginalClientBash" };
        const previous = new Map<string, unknown>([["safe_wire", identity]]);
        const body: JsonRecord = {
          tools: [ns("files", [fn("safe_wire")])],
          input: [call],
          tool_choice: allowed
            ? { type: "allowed_tools", mode: "required", tools: [reference] }
            : reference,
        };
        metadata(body, "_toolNameMap", original);
        if (dedicated) metadata(body, "_namespaceToolIdentityMap", previous);
        deepFreeze(body);
        const out = rewrite(body);
        const choice = allowed
          ? records(record(out.tool_choice).tools)[0]
          : record(out.tool_choice);
        assert.equal(childWire(out), "safe_wire");
        assert.equal(records(out.input)[0].name, "safe_wire");
        assert.equal(choice.name, "safe_wire");
        assert.equal(records(out.input)[0].namespace, namespace);
        assert.equal(choice.namespace, namespace);
        assert.equal(records(out.tools)[0].name, "files");
        assert.deepEqual(identities(out).get("safe_wire"), identity);
        assert.notEqual(identities(out).get("safe_wire"), identity);
        assert.equal(aliases(out).get("safe_wire"), "OriginalClientBash");
        assert.notEqual(aliases(out), original);
        assert.equal(call.name, "bash");
        assert.equal(reference.name, "bash");
        assert.deepEqual(
          [...original],
          [
            ["safe_wire", "bash"],
            ["bash", "OriginalClientBash"],
          ]
        );
        assert.deepEqual([...previous], [["safe_wire", identity]]);
      }
    }
  }
});

test("composed alias leaves preserve ambiguous bare references across namespace declarations", () => {
  for (const allowed of [false, true]) {
    const reference = { type: "function", name: "bash" };
    const original = new Map<string, unknown>([
      ["a_wire", "bash"],
      ["b_wire", "bash"],
      ["bash", "OriginalClientBash"],
    ]);
    const body: JsonRecord = {
      tools: [ns("a", [fn("a_wire")]), ns("b", [fn("b_wire")])],
      input: [{ type: "function_call", name: "bash" }],
      tool_choice: allowed ? { type: "allowed_tools", tools: [reference] } : reference,
    };
    metadata(body, "_toolNameMap", original);
    deepFreeze(body);
    const out = rewrite(body);
    const choice = allowed ? records(record(out.tool_choice).tools)[0] : record(out.tool_choice);
    assert.equal(childWire(out), "a_wire");
    assert.equal(childWire(out, 1), "b_wire");
    assert.equal(records(out.input)[0].name, "bash");
    assert.equal(choice.name, "bash");
    assert.equal(aliases(out).size, original.size);
    assert.notEqual(aliases(out), original);
    assert.deepEqual(
      [...original],
      [
        ["a_wire", "bash"],
        ["b_wire", "bash"],
        ["bash", "OriginalClientBash"],
      ]
    );
  }
});

test("explicit flat identity guards survive alongside unrelated colliding tools", () => {
  const guard = { namespace: "", name: "mcp__files__read" };
  const body: JsonRecord = { tools: [fn("bash"), fn(guard.name)] };
  const original = new Map<string, unknown>([[guard.name, guard]]);
  metadata(body, "_namespaceToolIdentityMap", original);
  const out = rewrite(body);
  assert.equal(wire(out), baseAlias("bash"));
  assert.equal(wire(out, 1), guard.name);
  assert.deepEqual(identities(out).get(guard.name), guard);
  assert.notEqual(identities(out).get(guard.name), guard);
  assert.equal(identities(out).has(wire(out)), false);
  assert.deepEqual([...original], [[guard.name, guard]]);
});

test("an existing explicit flat identity remaps to the aliased wire without namespace fabrication", () => {
  const guard = { namespace: "", name: "bash" };
  const body: JsonRecord = {
    tools: [fn("bash")],
    input: [{ type: "function_call", name: "bash" }],
  };
  const original = new Map<string, unknown>([["bash", guard]]);
  metadata(body, "_namespaceToolIdentityMap", original);
  const out = rewrite(body);
  const name = wire(out);
  assert.deepEqual(identities(out).get(name), guard);
  assert.equal(identities(out).has("bash"), false);
  assert.equal(records(out.input)[0].name, name);
  assert.equal(records(out.input)[0].namespace, undefined);
  assert.equal(records(out.tools)[0].namespace, undefined);
  assert.deepEqual([...original], [["bash", guard]]);
});

test("new original-name history and choices reuse the same already-declared function wire", () => {
  for (const namespace of [undefined, "files"]) {
    for (const allowed of [false, true]) {
      const first = rewrite({ tools: [namespace ? ns(namespace, [fn("bash")]) : fn("bash")] });
      const name = namespace ? childWire(first) : wire(first);
      const reference = { type: "function", name: "bash", ...(namespace ? { namespace } : {}) };
      const call = {
        type: "function_call",
        name: "bash",
        call_id: "c1",
        arguments: "{}",
        ...(namespace ? { namespace } : {}),
      };
      const body: JsonRecord = {
        tools: first.tools,
        input: [call],
        tool_choice: allowed
          ? { type: "allowed_tools", mode: "required", tools: [reference] }
          : reference,
      };
      const priorAliases = aliases(first);
      metadata(body, "_toolNameMap", priorAliases);
      if (namespace) metadata(body, "_namespaceToolIdentityMap", identities(first));
      deepFreeze(body);
      const out = rewrite(body);
      const choice = allowed ? records(record(out.tool_choice).tools)[0] : record(out.tool_choice);
      assert.equal(namespace ? childWire(out) : wire(out), name);
      assert.equal(records(out.input)[0].name, name);
      assert.equal(choice.name, name);
      assert.equal(choice.namespace, namespace);
      assert.equal(records(out.input)[0].namespace, namespace);
      assert.equal(call.name, "bash");
      assert.equal(reference.name, "bash");
      assert.equal(aliases(out).size, priorAliases.size);
      assert.notEqual(aliases(out), priorAliases);
    }
  }
});

test("an occupied prior alias for a different identity is never reused as this declaration wire", () => {
  const candidate = baseAlias("bash");
  const body: JsonRecord = {
    tools: [fn("bash"), fn(candidate)],
    input: [{ type: "function_call", name: "bash" }],
  };
  metadata(body, "_toolNameMap", new Map([[candidate, "AnotherClientTool"]]));
  const out = rewrite(body);
  assert.equal(wire(out), `${candidate}_1`);
  assert.equal(wire(out, 1), candidate);
  assert.equal(records(out.input)[0].name, `${candidate}_1`);
  assert.equal(aliases(out).get(candidate), "AnotherClientTool");
});

test("matching string aliases on custom/native declarations do not make them reusable functions", () => {
  const candidate = baseAlias("bash");
  for (const type of ["custom", "web_search"]) {
    const body: JsonRecord = {
      tools: [{ type, name: candidate }],
      input: [{ type: "function_call", name: "bash" }],
    };
    metadata(body, "_toolNameMap", new Map([[candidate, "bash"]]));
    const out = rewrite(body);
    assert.equal(wire(out), candidate);
    assert.equal(records(out.input)[0].name, `${candidate}_1`);
    assert.equal(aliases(out).get(`${candidate}_1`), "bash");
  }
});

test("legacy namespace-only maps migrate safely into a dedicated detached identity channel", () => {
  const legacy = new Map<string, unknown>([
    ["read_file", { namespace: "files", name: "read_file" }],
  ]);
  const body: JsonRecord = { tools: [fn("read_file")] };
  metadata(body, "_toolNameMap", legacy);
  const out = rewrite(body);
  assert.equal(wire(out), baseAlias("read_file", "files"));
  assert.equal(aliases(out).get(wire(out)), "read_file");
  assert.deepEqual(identities(out).get(wire(out)), { namespace: "files", name: "read_file" });
  assert.deepEqual([...legacy], [["read_file", { namespace: "files", name: "read_file" }]]);
});

test("mixed/malformed maps never publish mixed values or stringify identity objects", () => {
  const body: JsonRecord = { tools: [fn("bash")] };
  metadata(
    body,
    "_toolNameMap",
    new Map<string, unknown>([
      ["safe", "Safe"],
      ["old_ns", { namespace: "files", name: "read" }],
      ["bad", {}],
      ["number", 1],
    ])
  );
  metadata(
    body,
    "_namespaceToolIdentityMap",
    new Map<string, unknown>([
      ["valid", { namespace: "x", name: "y" }],
      ["bad", "not-an-identity"],
    ])
  );
  const out = rewrite(body);
  assert.equal(wire(out), baseAlias("bash"));
  assert.ok([...aliases(out).values()].every((value) => typeof value === "string"));
  assert.ok(
    [...identities(out).values()].every(
      (value) => typeof value.namespace === "string" && typeof value.name === "string"
    )
  );
  assert.equal(aliases(out).get("safe"), "Safe");
  assert.deepEqual(identities(out).get("old_ns"), { namespace: "files", name: "read" });
  assert.equal(aliases(out).has("bad"), false);
  assert.equal(identities(out).has("bad"), false);
});

test("native namespace reference context wins over a conflicting bare ledger identity", () => {
  const body: JsonRecord = {
    tools: [ns("a", [fn("bash")]), ns("b", [fn("bash")])],
    input: [{ type: "function_call", namespace: "b", name: "bash" }],
    tool_choice: { type: "function", namespace: "b", name: "bash" },
  };
  metadata(
    body,
    "_namespaceToolIdentityMap",
    new Map([["bash", { namespace: "a", name: "bash" }]])
  );
  const out = rewrite(body);
  assert.equal(records(out.input)[0].name, childWire(out, 1));
  assert.equal(record(out.tool_choice).name, childWire(out, 1));
  assert.notEqual(childWire(out), childWire(out, 1));
});

test("pre-existing ambiguous bare references stay unresolved rather than selecting a namespace", () => {
  const body = {
    tools: [ns("a", [fn("bash")]), ns("b", [fn("bash")])],
    input: [{ type: "function_call", name: "bash" }],
    tool_choice: { type: "function", name: "bash" },
  };
  const out = rewrite(body);
  assert.notEqual(childWire(out), "bash");
  assert.notEqual(childWire(out, 1), "bash");
  assert.equal(records(out.input)[0].name, "bash");
  assert.equal(record(out.tool_choice).name, "bash");
  assert.equal(body.input[0].name, "bash");
});

test("flat and default functions context disambiguate bare references", () => {
  for (const defaultNamespace of [false, true]) {
    const tools = [
      defaultNamespace ? ns("functions", [fn("bash")]) : fn("bash"),
      ns("other", [fn("bash")]),
    ];
    const out = rewrite({
      tools,
      input: [{ type: "function_call", name: "bash" }],
      tool_choice: { type: "function", name: "bash" },
    });
    const name = defaultNamespace ? childWire(out) : wire(out);
    assert.equal(records(out.input)[0].name, name);
    assert.equal(record(out.tool_choice).name, name);
  }
});

test("unknown fields, schemas, arbitrary nested strings and unsupported declaration shapes are untouched", () => {
  const unknown = { name: "bash", function: { name: "read_file" }, tools: [fn("edit_file")] };
  const nestedFunction = { type: "function", function: { name: "bash", parameters: {} } };
  const missingType = { name: "bash", parameters: {} };
  const body = {
    tools: [
      fn("bash", { description: "bash", parameters: unknown, extra: unknown }),
      nestedFunction,
      missingType,
    ],
    input: [
      { type: "message", name: "bash", content: [{ type: "text", text: "bash" }], extra: unknown },
    ],
    unknown,
    metadata: { name: "bash" },
  };
  const out = rewrite(body);
  assert.equal(records(out.tools)[0].parameters, unknown);
  assert.equal(records(out.tools)[0].description, "bash");
  assert.equal(records(out.tools)[0].extra, unknown);
  assert.deepEqual(records(out.tools).slice(1), [nestedFunction, missingType]);
  assert.deepEqual(out.input, body.input);
  assert.equal(out.unknown, unknown);
  assert.deepEqual(out.metadata, body.metadata);
});

test("both copied metadata channels remain nonenumerable and do not serialize", () => {
  const body: JsonRecord = { tools: [ns("files", [fn("read_file")])] };
  body._toolNameMap = new Map([["safe", "Safe"]]);
  body._namespaceToolIdentityMap = new Map([["safe_ns", { namespace: "files", name: "Safe" }]]);
  const out = rewrite(body);
  for (const key of ["_toolNameMap", "_namespaceToolIdentityMap"]) {
    assert.equal(Object.getOwnPropertyDescriptor(out, key)?.enumerable, false);
    assert.equal(Object.keys(out).includes(key), false);
    assert.equal(JSON.stringify(out).includes(key), false);
  }
  assert.equal(Object.getOwnPropertyDescriptor(body, "_toolNameMap")?.enumerable, true);
});

test("existing ledgers are detached and nonenumerable even when no function needs rewriting", () => {
  const body: JsonRecord = { tools: [fn("safe")] };
  const oldAliases = new Map<string, unknown>([["safe", "Safe"]]);
  const oldIdentities = new Map<string, unknown>([["safe", { namespace: "files", name: "Safe" }]]);
  metadata(body, "_toolNameMap", oldAliases);
  metadata(body, "_namespaceToolIdentityMap", oldIdentities);
  const out = rewrite(body);
  assert.equal(wire(out), "safe");
  assert.notEqual(out, body);
  assert.notEqual(aliases(out), oldAliases);
  assert.notEqual(identities(out), oldIdentities);
  assert.equal(Object.getOwnPropertyDescriptor(out, "_toolNameMap")?.enumerable, false);
});

test("unsupported deeper namespace nesting is not recursively reinterpreted", () => {
  const nested = ns("inner", [fn("bash")]);
  const out = rewrite({ tools: [fn("bash"), ns("outer", [nested])] });
  assert.equal(wire(out), baseAlias("bash"));
  assert.equal(records(records(out.tools)[1].tools)[0], nested);
  assert.equal(records(nested.tools)[0].name, "bash");
});

test("composed long client originals retain a readable safe prefix within 64 characters", () => {
  const original = `Client tool / ${"x".repeat(90)}`;
  const hash = createHash("sha256")
    .update(JSON.stringify(["", original]))
    .digest("hex")
    .slice(0, 16);
  const candidate = `${`muse_${original}`.replace(/[^A-Za-z0-9_-]/g, "_").slice(0, 47)}_${hash}`;
  const body: JsonRecord = { tools: [fn("bash"), { type: "custom", name: candidate }] };
  metadata(body, "_toolNameMap", new Map([["bash", original]]));
  const out = rewrite(body);
  assert.equal(wire(out), `${candidate.slice(0, 45)}_${hash}_1`);
  assert.match(wire(out), /^[A-Za-z0-9_-]{64}$/);
  assert.equal(aliases(out).get(wire(out)), original);
});

test("cyclic malformed aliases terminate safely without mutating the source ledger", () => {
  const old = new Map<string, unknown>([
    ["bash", "other"],
    ["other", "bash"],
  ]);
  const body: JsonRecord = { tools: [fn("bash")] };
  metadata(body, "_toolNameMap", old);
  const out = rewrite(body);
  assert.notEqual(wire(out), "bash");
  assert.ok([...aliases(out).values()].every((value) => typeof value === "string"));
  assert.deepEqual(
    [...old],
    [
      ["bash", "other"],
      ["other", "bash"],
    ]
  );
});

test("non-record and malformed optional shapes are safe no-ops", () => {
  for (const body of [
    null,
    undefined,
    "bash",
    1,
    [],
    { tools: null, input: "bash", tool_choice: false },
  ]) {
    assert.equal(aliasMuseToolNames(body), body);
  }
});
