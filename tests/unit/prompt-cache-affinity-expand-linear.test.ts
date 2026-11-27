/**
 * Prompt-cache expansion binds each unpinned combo target to every active
 * account of its provider. The authType lookup per account must use one index
 * per provider, not a linear find per account (O(accounts^2) per target).
 */
import { test } from "node:test";
import assert from "node:assert/strict";

const { expandPromptCacheAffinityTargetsFromConnections } =
  await import("../../open-sse/services/combo/promptCacheAffinity.ts");

type Conn = Record<string, unknown>;

function unbound(executionKey: string, extra: Record<string, unknown> = {}) {
  return {
    kind: "model",
    stepId: executionKey,
    executionKey,
    modelStr: "codex/gpt-5",
    provider: "codex",
    providerId: null,
    connectionId: null,
    weight: 1,
    label: null,
    ...extra,
  } as never;
}

// Count how often code reads `id` from a connection object.
function countingConnections(count: number) {
  const reads = { id: 0 };
  const list: Conn[] = [];
  for (let i = 0; i < count; i++) {
    const conn: Conn = { id: `acct-${i}`, authType: i % 2 ? "oauth" : "apikey" };
    list.push(
      new Proxy(conn, {
        get(target, prop, receiver) {
          if (prop === "id") reads.id++;
          return Reflect.get(target, prop, receiver);
        },
      })
    );
  }
  return { list, reads };
}

test("expansion reads each connection id a bounded number of times", () => {
  const N = 200;
  const { list, reads } = countingConnections(N);
  const expanded = expandPromptCacheAffinityTargetsFromConnections(
    [unbound("step-a")],
    new Map([["codex", list]])
  );
  assert.equal(expanded.length, N);
  assert.ok(reads.id <= 8 * N, `read connection ids ${reads.id} times for ${N} accounts`);
});

test("several targets of one provider still read ids in linear time", () => {
  const N = 100;
  const { list, reads } = countingConnections(N);
  const expanded = expandPromptCacheAffinityTargetsFromConnections(
    [unbound("step-a"), unbound("step-b"), unbound("step-c")],
    new Map([["codex", list]])
  );
  assert.equal(expanded.length, 3 * N);
  assert.ok(reads.id <= 12 * N, `read connection ids ${reads.id} times for 3 x ${N} accounts`);
});

test("expansion keeps account order and authType per account", () => {
  const expanded = expandPromptCacheAffinityTargetsFromConnections(
    [unbound("step-a")],
    new Map([
      ["codex", [{ id: "b", authType: "oauth" }, { id: "a", authType: "apikey" }, { id: "c" }]],
    ])
  );
  assert.deepEqual(
    expanded.map((t) => [t.connectionId, t.authType, t.executionKey]),
    [
      ["b", "oauth", "step-a@b"],
      ["a", "apikey", "step-a@a"],
      ["c", null, "step-a@c"],
    ]
  );
});

test("duplicate account ids use the first entry's authType", () => {
  const expanded = expandPromptCacheAffinityTargetsFromConnections(
    [unbound("step-a")],
    new Map([
      [
        "codex",
        [
          { id: "dup", authType: "oauth" },
          { id: "dup", authType: "apikey" },
        ],
      ],
    ])
  );
  assert.deepEqual(
    expanded.map((t) => t.authType),
    ["oauth", "oauth"]
  );
});

test("a pinned target takes authType from its own account", () => {
  const expanded = expandPromptCacheAffinityTargetsFromConnections(
    [unbound("step-p", { connectionId: "b", authType: "stale" })],
    new Map([
      [
        "codex",
        [
          { id: "a", authType: "apikey" },
          { id: "b", authType: "oauth" },
        ],
      ],
    ])
  );
  assert.equal(expanded.length, 1);
  assert.equal(expanded[0].connectionId, "b");
  assert.equal(expanded[0].authType, "oauth");
});
