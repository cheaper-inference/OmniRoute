// Table-driven tests for the pure acquire decision in core/gateway/local-reaper.mjs.
import { test } from "node:test";
import assert from "node:assert/strict";

import { decideAcquire } from "../../../../bin/cli/launch/core/gateway/local-reaper.mjs";

const PORT = 20128;

type Rec = { state: string; port: number; generation: string };

function rec(state: string, port = PORT): Rec {
  return { state, port, generation: "g1" };
}

type Snap = {
  port: number;
  record: Rec | null;
  reaperAlive: boolean;
  healthy: boolean;
  noStart: boolean;
  serverMatches: boolean;
  serverAlive: boolean;
};

function snap(over: Partial<Snap>): Snap {
  return {
    port: PORT,
    record: null,
    reaperAlive: false,
    healthy: false,
    noStart: false,
    serverMatches: false,
    serverAlive: false,
    ...over,
  };
}

type Decision = { kind: string; wait?: boolean; removeStale?: boolean };

const OTHER = PORT + 1;

const CASES: Array<[string, Partial<Snap>, Decision]> = [
  // wrong port (live, not kept launcher gateway on another port)
  [
    "wrong port, healthy -> external",
    { record: rec("ready", OTHER), reaperAlive: true, healthy: true },
    { kind: "external" },
  ],
  [
    "wrong port, unhealthy -> wrongPort",
    { record: rec("starting", OTHER), reaperAlive: true },
    { kind: "wrongPort" },
  ],
  [
    "wrong port wins over stopping",
    { record: rec("stopping", OTHER), reaperAlive: true },
    { kind: "wrongPort" },
  ],
  [
    "wrong port wins over --no-start",
    { record: rec("ready", OTHER), reaperAlive: true, noStart: true },
    { kind: "wrongPort" },
  ],
  [
    "other port but kept -> not wrongPort (healthy kept -> external)",
    { record: rec("kept", OTHER), reaperAlive: true, healthy: true },
    { kind: "external" },
  ],
  [
    "other port, dead reaper, unhealthy -> start (stale record dropped)",
    { record: rec("ready", OTHER) },
    { kind: "start", removeStale: true },
  ],
  // stopping
  [
    "stopping + reaper alive -> retry",
    { record: rec("stopping"), reaperAlive: true },
    { kind: "retry" },
  ],
  [
    "stopping + reaper alive + healthy -> retry",
    { record: rec("stopping"), reaperAlive: true, healthy: true },
    { kind: "retry" },
  ],
  [
    "stopping + reaper dead + healthy -> dropStale",
    { record: rec("stopping"), healthy: true },
    { kind: "dropStale" },
  ],
  // healthy
  ["healthy, no record -> external", { healthy: true }, { kind: "external" }],
  ["healthy, kept -> external", { record: rec("kept"), healthy: true }, { kind: "external" }],
  [
    "healthy, ready, reaper alive, server matches -> join (no wait)",
    { record: rec("ready"), healthy: true, reaperAlive: true, serverMatches: true },
    { kind: "join", wait: false },
  ],
  [
    "healthy, starting, reaper alive, server matches -> join (wait)",
    { record: rec("starting"), healthy: true, reaperAlive: true, serverMatches: true },
    { kind: "join", wait: true },
  ],
  [
    "healthy, ready, reaper alive, server mismatch -> dropStale",
    { record: rec("ready"), healthy: true, reaperAlive: true },
    { kind: "dropStale" },
  ],
  [
    "healthy, ready, reaper dead, server ours + alive -> adopt",
    { record: rec("ready"), healthy: true, serverMatches: true, serverAlive: true },
    { kind: "adopt" },
  ],
  [
    "healthy, starting, reaper dead, server ours + alive -> adopt",
    { record: rec("starting"), healthy: true, serverMatches: true, serverAlive: true },
    { kind: "adopt" },
  ],
  [
    "healthy, ready, reaper dead, server ours but dead -> dropStale",
    { record: rec("ready"), healthy: true, serverMatches: true },
    { kind: "dropStale" },
  ],
  [
    "healthy, ready, reaper dead, server mismatch -> dropStale",
    { record: rec("ready"), healthy: true, serverAlive: true },
    { kind: "dropStale" },
  ],
  ["healthy wins over --no-start", { healthy: true, noStart: true }, { kind: "external" }],
  // not healthy
  ["--no-start, nothing -> unreachable", { noStart: true }, { kind: "unreachable" }],
  [
    "--no-start wins over a starting gateway",
    { record: rec("starting"), reaperAlive: true, noStart: true },
    { kind: "unreachable" },
  ],
  [
    "starting + reaper alive -> joinStarting",
    { record: rec("starting"), reaperAlive: true },
    { kind: "joinStarting" },
  ],
  [
    "ready + reaper alive (not answering) -> joinStarting",
    { record: rec("ready"), reaperAlive: true },
    { kind: "joinStarting" },
  ],
  ["no record -> start", {}, { kind: "start", removeStale: false }],
  [
    "starting + reaper dead -> start, drop stale",
    { record: rec("starting") },
    { kind: "start", removeStale: true },
  ],
  [
    "kept + not healthy -> start, drop stale",
    { record: rec("kept"), reaperAlive: true },
    { kind: "start", removeStale: true },
  ],
  [
    "stopping + reaper dead -> start, drop stale",
    { record: rec("stopping") },
    { kind: "start", removeStale: true },
  ],
];

for (const [name, over, expected] of CASES) {
  test(`decideAcquire: ${name}`, () => {
    assert.deepEqual(decideAcquire(snap(over)), expected);
  });
}

test("decideAcquire is pure: the snapshot is not mutated", () => {
  const s = snap({ record: rec("ready"), healthy: true, serverMatches: true, serverAlive: true });
  const copy = structuredClone(s);
  decideAcquire(s);
  assert.deepEqual(s, copy);
});
