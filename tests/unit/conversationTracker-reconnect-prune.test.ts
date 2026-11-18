/**
 * Regression tests for findReconnectMatch's search termination
 * (open-sse/services/conversationTracker.ts).
 *
 * Since the "longest verified run wins" election (#16268) the only early exit
 * was a run reaching the very end of the request. A continuation request
 * always ends with turns the chain has not recorded yet, so that exit never
 * fires: after the real match at start 0 the walker kept re-walking the same
 * chain from start 1, 2, 3, ... until DEFAULT_RECONNECT_MAX_STEPS was spent —
 * one HMAC per step, on every request of a long conversation.
 *
 * A run starting at index s verifies at most `chainTurns.length - s` turns, so
 * once that cannot beat the current best (shorter, or equal while the best
 * already has the preferred anchorHasChild===false) no later start can win
 * and the search can stop. These tests pin:
 *   1. a long continuation resolves the same match in O(n) steps, not the
 *      whole budget;
 *   2. the election (match fields) is identical to the unpruned walk on
 *      randomized duplicate-heavy chains, including equal-length ties.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";

import { mkdtempSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-conv-prune-"));
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "conversation-prune-test-secret";

const tracker = await import("../../open-sse/services/conversationTracker.ts");
const { findReconnectMatch, hashTurnContent, DEFAULT_RECONNECT_MAX_STEPS } = tracker as {
  findReconnectMatch: typeof tracker.findReconnectMatch;
  hashTurnContent: typeof tracker.hashTurnContent;
  DEFAULT_RECONNECT_MAX_STEPS: number;
};

type Turn = {
  role: "user" | "assistant" | "tool";
  text: string;
  blockKind: "text";
  toolName: null;
};
type Index = {
  nodeIds: Set<string>;
  byContentHash: Map<string, string[]>;
  parentsWithChildren: Set<string>;
};

function turn(role: Turn["role"], text: string): Turn {
  return { role, text, blockKind: "text", toolName: null };
}

// Mirrors the tracker's chain node id derivation (chainNodeIdFromHash).
function nodeId(parent: string, turnHash: string): string {
  return createHmac("sha256", "omniroute-conversation-fingerprint-v1")
    .update(`${parent} ${turnHash}`)
    .digest("hex");
}

function emptyIndex(): Index {
  return { nodeIds: new Set(), byContentHash: new Map(), parentsWithChildren: new Set() };
}

/** Record `turns` as one chain hanging off `root` into `index`. */
function recordChain(index: Index, turns: Turn[], root: string): void {
  let parent = root;
  for (let i = 0; i < turns.length; i++) {
    const h = hashTurnContent(turns[i]);
    const id = nodeId(parent, h);
    if (!index.nodeIds.has(id)) {
      index.nodeIds.add(id);
      const bucket = index.byContentHash.get(h) ?? [];
      bucket.push(id);
      index.byContentHash.set(h, bucket);
    }
    if (i > 0) index.parentsWithChildren.add(parent);
    parent = id;
  }
}

/** The election without any search pruning and without a budget (oracle). */
function referenceMatch(chainTurns: Turn[], index: Index) {
  const hashes = chainTurns.map(hashTurnContent);
  let best: {
    startIndex: number;
    matchEndIndex: number;
    anchorNodeId: string;
    anchorHasChild: boolean;
  } | null = null;
  let bestLength = -1;
  for (let s = 0; s < chainTurns.length; s++) {
    for (const anchor of index.byContentHash.get(hashes[s]) ?? []) {
      let parent = anchor;
      let end = s + 1;
      while (end < chainTurns.length) {
        const id = nodeId(parent, hashes[end]);
        if (!index.nodeIds.has(id)) break;
        parent = id;
        end++;
      }
      const anchorHasChild = index.parentsWithChildren.has(parent);
      const len = end - s;
      if (
        !best ||
        len > bestLength ||
        (len === bestLength && !anchorHasChild && best.anchorHasChild)
      ) {
        best = { startIndex: s, matchEndIndex: end, anchorNodeId: parent, anchorHasChild };
        bestLength = len;
      }
      if (best.matchEndIndex === chainTurns.length) return best;
    }
  }
  return best;
}

test("findReconnectMatch: a long continuation stops once no later start can win", () => {
  // 1000 recorded turns; the request resends all of them plus two new turns,
  // which is what every follow-up request of a long agent session looks like.
  const N = 1000;
  const recorded = Array.from({ length: N }, (_, i) =>
    turn(i % 2 === 0 ? "user" : "assistant", `turn ${i}`)
  );
  const index = emptyIndex();
  recordChain(index, recorded, "root-prune");
  const request = [...recorded, turn("user", "new question"), turn("assistant", "new answer")];

  const { match, stepsUsed } = findReconnectMatch(request, index);

  assert.deepEqual(match, referenceMatch(request, index));
  assert.equal(match?.startIndex, 0);
  assert.equal(match?.matchEndIndex, N);
  // The verified run from start 0 costs ~N steps; any further start is shorter
  // and cannot win. Without the cut the walk re-walks the chain from every
  // later start and spends the whole budget.
  assert.ok(
    stepsUsed < 3 * N,
    `continuation spent ${stepsUsed} steps (budget ${DEFAULT_RECONNECT_MAX_STEPS})`
  );
});

test("findReconnectMatch: an equal-length run with a free anchor still wins the tie", () => {
  // Two recorded branches share the request's turns at different offsets:
  //   branch A records [x, a, b, c, y]   -> walking a,b,c ends on a node WITH a child (y)
  //   branch B records [a, b, c]         -> same 3-turn run, anchor has NO child
  // Request = [a, b, c, z]. Start 0 finds both 3-turn runs; the free anchor
  // must win. A run starting later is shorter, so the search may stop, but
  // only after the tie at the same length has been considered.
  const x = turn("user", "x");
  const a = turn("user", "a");
  const b = turn("assistant", "b");
  const c = turn("user", "c");
  const y = turn("assistant", "y");
  const z = turn("assistant", "z");
  const index = emptyIndex();
  recordChain(index, [x, a, b, c, y], "root-A");
  recordChain(index, [a, b, c], "root-B");
  const request = [a, b, c, z];

  const { match } = findReconnectMatch(request, index);
  assert.deepEqual(match, referenceMatch(request, index));
  assert.equal(match?.matchEndIndex, 3);
  assert.equal(match?.anchorHasChild, false);
});

test("findReconnectMatch: a later start reaching the same length can still break a tie", () => {
  // Start 0 yields a 2-turn run whose anchor has a child; start 1 yields a
  // 2-turn run (the remaining length is exactly 2) whose anchor is free.
  // Remaining length == bestLength with best.anchorHasChild===true must keep
  // searching.
  const p = turn("user", "p");
  const q = turn("assistant", "q");
  const r = turn("user", "r");
  const w = turn("assistant", "w");
  const index = emptyIndex();
  recordChain(index, [p, q, w], "root-1"); // p,q matched; anchor q has child w
  recordChain(index, [q, r], "root-2"); // q,r matched; anchor r is free
  const request = [p, q, r];

  const { match } = findReconnectMatch(request, index);
  assert.deepEqual(match, referenceMatch(request, index));
  assert.equal(match?.startIndex, 1);
  assert.equal(match?.anchorHasChild, false);
});

test("findReconnectMatch: election matches the unpruned walk on randomized chains", () => {
  // Small alphabet => many duplicate anchors, partial overlaps and ties.
  let seed = 0x5eed;
  const rand = (n: number) => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed % n;
  };
  const alphabet = ["ok", "a", "b", "c", "d"].map((t, i) => turn(i % 2 === 0 ? "tool" : "user", t));
  const pick = (len: number) => Array.from({ length: len }, () => alphabet[rand(alphabet.length)]);

  for (let iter = 0; iter < 400; iter++) {
    const index = emptyIndex();
    const chains = 1 + rand(4);
    const recorded: Turn[][] = [];
    for (let k = 0; k < chains; k++) {
      const chain = pick(1 + rand(12));
      recorded.push(chain);
      recordChain(index, chain, `root-${iter}-${k}`);
    }
    // Requests: a recorded chain (optionally trimmed at the front and
    // extended), or random noise.
    const base = recorded[rand(recorded.length)];
    const request =
      rand(3) === 0
        ? pick(1 + rand(12))
        : [...base.slice(rand(Math.max(1, base.length))), ...pick(rand(4))];
    if (request.length === 0) continue;

    const { match } = findReconnectMatch(request, index);
    assert.deepEqual(match, referenceMatch(request, index), `iteration ${iter}`);
  }
});
