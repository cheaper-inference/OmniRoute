import assert from "node:assert/strict";
import test from "node:test";

import {
  normalizeOpenAIToolNames,
  restoreOpenAIToolNames,
} from "../../open-sse/translator/helpers/toolCallHelper.ts";

const COLLISION_MESSAGE = "Tool names become ambiguous after length normalization.";
const COLLIDING_A = "mcp__example_gateway__tool_1";
const COLLIDING_B = "mcp__example_gateway__tool_3";
const CASE_NAME = "mcp__example_gateway__tool_2";
const LONG_A = "mcp__example-observability-prod__trace_top_time_consuming_operations";
const LONG_B = `${LONG_A}_detail`;

function bodyWithTools(names: string[]): Record<string, unknown> {
  return {
    tools: names.map((name) => ({ type: "function", function: { name } })),
    messages: [{ role: "user", content: "Use a tool" }],
  };
}

function aliasFor(name: string, limit: number): string {
  const aliases = normalizeOpenAIToolNames(bodyWithTools([name]), limit);
  assert.equal(aliases.size, 1);
  return [...aliases.keys()][0];
}

function assertRejectedWithoutMutation(body: Record<string, unknown>, limit: number): void {
  const existing = new Map([["existing_alias", "existing_original"]]);
  Object.defineProperty(body, "_toolNameMap", {
    value: existing,
    enumerable: false,
    configurable: true,
    writable: true,
  });
  const before = structuredClone(body);
  const beforeDescriptor = Object.getOwnPropertyDescriptor(body, "_toolNameMap");
  assert.throws(() => normalizeOpenAIToolNames(body, limit), {
    name: "Error",
    message: COLLISION_MESSAGE,
  });
  assert.deepEqual(body, before);
  assert.deepEqual(Object.getOwnPropertyDescriptor(body, "_toolNameMap"), beforeDescriptor);
  assert.equal(body._toolNameMap, existing);
  assert.deepEqual([...existing], [["existing_alias", "existing_original"]]);
}

test("rejects colliding truncated hashes before mutating either tool", () => {
  assert.equal(aliasFor(COLLIDING_A, 1), aliasFor(COLLIDING_B, 1));
  assertRejectedWithoutMutation(bodyWithTools([COLLIDING_A, COLLIDING_B]), 1);
});

for (const reverse of [false, true]) {
  test(`rejects an alias shadowing a valid one-character name, reverse=${reverse}`, () => {
    const names = [CASE_NAME, aliasFor(CASE_NAME, 1)];
    assertRejectedWithoutMutation(bodyWithTools(reverse ? names.reverse() : names), 1);
  });

  test(`rejects case-insensitive alias shadowing, reverse=${reverse}`, () => {
    const alias = aliasFor(CASE_NAME, 1);
    assert.equal(alias, "f");
    const names = [CASE_NAME, alias.toUpperCase()];
    assertRejectedWithoutMutation(bodyWithTools(reverse ? names.reverse() : names), 1);
  });

  test(`rejects a generated alias shadowing a valid 64-character name, reverse=${reverse}`, () => {
    const alias = aliasFor(LONG_A, 64);
    assert.equal(alias.length, 64);
    const names = [LONG_A, alias];
    assertRejectedWithoutMutation(bodyWithTools(reverse ? names.reverse() : names), 64);
  });

  test(`rejects a case-folded 64-character shadow, reverse=${reverse}`, () => {
    const alias = aliasFor(LONG_A, 64);
    assert.notEqual(alias, alias.toUpperCase());
    const names = [LONG_A, alias.toUpperCase()];
    assertRejectedWithoutMutation(bodyWithTools(reverse ? names.reverse() : names), 64);
  });
}

for (const carrier of ["tool_choice", "assistant_call", "tool_result"]) {
  test(`rejects a late collision in ${carrier} without earlier writes`, () => {
    const body = bodyWithTools([COLLIDING_A]);
    if (carrier === "tool_choice") {
      body.tool_choice = { type: "function", function: { name: COLLIDING_B } };
    } else if (carrier === "assistant_call") {
      body.messages = [
        {
          role: "assistant",
          tool_calls: [{ id: "call_1", function: { name: COLLIDING_B, arguments: "{}" } }],
        },
      ];
    } else {
      body.messages = [{ role: "tool", tool_call_id: "call_1", name: COLLIDING_B, content: "ok" }];
    }
    assertRejectedWithoutMutation(body, 1);
  });
}

test("rejects collisions confined to history when no tool definitions exist", () => {
  const body = {
    messages: [
      { role: "assistant", tool_calls: [{ function: { name: COLLIDING_A } }] },
      { role: "tool", name: COLLIDING_B, content: "ok" },
    ],
  };
  assertRejectedWithoutMutation(body, 1);
});

test("repeated references to one original normalize consistently and restore", () => {
  const body = {
    tools: [{ type: "function", function: { name: LONG_A } }],
    tool_choice: { type: "function", function: { name: LONG_A } },
    messages: [
      { role: "assistant", tool_calls: [{ function: { name: LONG_A } }] },
      { role: "tool", name: LONG_A, content: "ok" },
    ],
  };
  const aliases = normalizeOpenAIToolNames(body, 64);
  assert.equal(aliases.size, 1);
  const alias = [...aliases.keys()][0];
  assert.equal(body.tools[0].function.name, alias);
  assert.equal(body.tool_choice.function.name, alias);
  assert.equal(body.messages[0].tool_calls?.[0].function.name, alias);
  assert.equal(body.messages[1].name, alias);
  const response = {
    choices: [{ message: { tool_calls: [{ function: { name: alias } }] } }],
  };
  assert.equal(restoreOpenAIToolNames(response, aliases), true);
  assert.equal(response.choices[0].message.tool_calls[0].function.name, LONG_A);
});

test("ordinary distinct long names retain independent aliases and round trips", () => {
  const body = bodyWithTools([LONG_A, LONG_B]);
  const aliases = normalizeOpenAIToolNames(body, 64);
  assert.equal(aliases.size, 2);
  for (const [alias, original] of aliases) {
    assert.match(alias, /^[A-Za-z0-9_-]{1,64}$/);
    const response = {
      choices: [{ delta: { tool_calls: [{ function: { name: alias } }] } }],
    };
    assert.equal(restoreOpenAIToolNames(response, aliases), true);
    assert.equal(response.choices[0].delta.tool_calls[0].function.name, original);
  }
});

test("already valid names with different casing remain unchanged", () => {
  const body = bodyWithTools(["Bash", "bash", "read_file"]);
  const before = structuredClone(body);
  assert.equal(normalizeOpenAIToolNames(body, 64).size, 0);
  assert.deepEqual(body, before);
});

test("invalid limits and non-record requests keep the existing no-op contract", () => {
  for (const limit of [0, -1, 1.5, Number.NaN]) {
    const body = bodyWithTools([LONG_A]);
    const before = structuredClone(body);
    assert.equal(normalizeOpenAIToolNames(body, limit).size, 0);
    assert.deepEqual(body, before);
  }
  for (const body of [null, undefined, [], "request"]) {
    assert.equal(normalizeOpenAIToolNames(body, 64).size, 0);
  }
});
