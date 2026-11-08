import assert from "node:assert/strict";
import test from "node:test";
import { sortRelatedLogs } from "../../src/shared/components/requestLoggerGroups.ts";

const groupA = "00000000-0000-4000-8000-000000000001";
const groupB = "00000000-0000-4000-8000-000000000002";
type Row = { id: string; timestamp: string; legacyStart: number; upstreamHttp?: unknown };
let sequence = 0;
const iso = (time: number) => new Date(time).toISOString();
function send(ordinal: number, startedAt: number) {
  return {
    id: `00000000-0000-4000-8000-${String(++sequence).padStart(12, "0")}`,
    ordinal,
    provider: "openai",
    model: "fixture",
    connectionId: "account",
    method: "POST",
    endpoint: "chat_completions",
    startedAt,
    endedAt: startedAt + 10,
    cutoffAt: null,
    durationMs: 10,
    status: 200,
    outcome: "response",
    retryReason: "unknown",
  };
}
function wire(id: string, groupId: string, ordinal: number, time: number): Row {
  return {
    id,
    timestamp: iso(time + 10),
    legacyStart: 0,
    upstreamHttp: { version: 1, groupId, role: "attempt", send: send(ordinal, time) },
  };
}
function logical(
  id: string,
  groupId: string,
  selected: ReturnType<typeof send> | null,
  total: number,
  completedAt: number
): Row {
  return {
    id,
    timestamp: iso(completedAt),
    legacyStart: 0,
    upstreamHttp: {
      version: 1,
      groupId,
      role: "logical",
      send: selected,
      total,
      failed: 0,
      omitted: 0,
      logicalOutcome: "success",
    },
  };
}
const sorted = (rows: readonly Row[]) => sortRelatedLogs(rows, (row) => row.legacyStart);

test("equal collector and legacy times have deterministic tuple tie breaks", () => {
  const input = [
    wire("A", groupA, 1, 1000),
    logical("B", groupB, send(1, 1000), 1, 2000),
    { id: "legacy-z", timestamp: iso(9000), legacyStart: 1000 },
    { id: "legacy-a", timestamp: iso(8000), legacyStart: 1000 },
  ];
  for (const permutation of [
    input,
    [...input].reverse(),
    ...input.map((_, index) => [...input.slice(index), ...input.slice(0, index)]),
  ]) {
    assert.deepEqual(
      sorted(permutation).map((row) => row.id),
      ["A", "B", "legacy-a", "legacy-z"]
    );
  }
});

test("collector ordinals survive selected-earlier and local outcomes with backward or equal clocks", () => {
  const other = wire("other", groupB, 1, 2500);
  const cases = [
    {
      rows: [
        wire("A1", groupA, 1, 3000),
        logical("selected-A2", groupA, send(2, 1000), 3, 4000),
        wire("A3", groupA, 3, 3000),
      ],
      expected: ["other", "A1", "selected-A2", "A3"],
    },
    {
      rows: [
        wire("A1", groupA, 1, 3000),
        wire("A2", groupA, 2, 1000),
        logical("local", groupA, null, 2, 2000),
      ],
      expected: ["other", "A1", "A2", "local"],
    },
  ];
  for (const fixture of cases) {
    const input = [fixture.rows[2], other, fixture.rows[1], fixture.rows[0]];
    const original = JSON.stringify(input);
    const result = sorted(input);
    assert.deepEqual(
      result.map((row) => row.id),
      fixture.expected
    );
    assert.equal(JSON.stringify(input), original);
    for (const row of result)
      assert.strictEqual(
        row,
        input.find((entry) => entry.id === row.id)
      );
  }
});

test("unassociated logical rows use completion time while legacy and invalid metadata use the supplied start reader", () => {
  const legacy = { id: "legacy", timestamp: iso(9000), legacyStart: 3000 };
  const invalid = {
    id: "invalid",
    timestamp: iso(9000),
    legacyStart: 2000,
    upstreamHttp: { version: 99 },
  };
  const completed = logical("local-completion", groupA, null, 1, 4000);
  const typed = wire("typed", groupB, 1, 5000);
  const calls: string[] = [];
  const result = sortRelatedLogs([typed, completed, legacy, invalid], (row) => {
    calls.push(row.id);
    return row.legacyStart;
  });
  assert.deepEqual(
    result.map((row) => row.id),
    ["invalid", "legacy", "local-completion", "typed"]
  );
  assert.deepEqual(calls, ["legacy", "invalid"]);
});
