// omni-queue L1: the tick reads the active protection of its own refs before it blesses
// (scripts/merge-queue/refs-guard.mjs).
import assert from "node:assert/strict";
import test from "node:test";
import { STATE_BRANCH } from "../../../scripts/merge-queue/contracts.mjs";
import {
  QUEUE_REF_RULES,
  readQueueRefsProtection,
} from "../../../scripts/merge-queue/refs-guard.mjs";

const CANDIDATE = "omni-queue/release-v9.9.9/b1-0123456789ab";

/** A client whose getBranchRules answers `rules[branch]` (type names) and records each read. */
function rulesClient(rules) {
  const reads = [];
  return {
    reads,
    async getBranchRules(branch) {
      reads.push(branch);
      return (rules[branch] ?? []).map((type) => ({ type, rulesetId: 7 }));
    },
  };
}

const PROTECTED = ["creation", "update", "deletion", "non_fast_forward"];

test("QUEUE_REF_RULES names the three rules of the queue-refs ruleset, frozen", () => {
  assert.deepEqual(QUEUE_REF_RULES, ["creation", "update", "deletion"]);
  assert.ok(Object.isFrozen(QUEUE_REF_RULES));
});

test("ok when both refs carry creation, update and deletion", async () => {
  const gh = rulesClient({ [STATE_BRANCH]: PROTECTED, [CANDIDATE]: PROTECTED });
  const out = await readQueueRefsProtection({ gh, candidateRef: CANDIDATE });
  assert.deepEqual(out, { ok: true, missing: [], detail: "" });
  assert.deepEqual(gh.reads, [STATE_BRANCH, CANDIDATE], "one read per ref, state branch first");
});

test("missing names the ref and the rule", async () => {
  const gh = rulesClient({
    [STATE_BRANCH]: ["creation", "deletion", "non_fast_forward"],
    [CANDIDATE]: ["update"],
  });
  const out = await readQueueRefsProtection({ gh, candidateRef: CANDIDATE });
  assert.equal(out.ok, false);
  assert.deepEqual(out.missing, [
    "omni-queue-state: update",
    `${CANDIDATE}: creation`,
    `${CANDIDATE}: deletion`,
  ]);
  assert.equal(
    out.detail,
    `omni-queue-state: update, ${CANDIDATE}: creation, ${CANDIDATE}: deletion`
  );

  // Rules of other types (a release ruleset matching the name, say) protect nothing here.
  const none = await readQueueRefsProtection({
    gh: rulesClient({ [STATE_BRANCH]: ["non_fast_forward", "pull_request"] }),
    candidateRef: CANDIDATE,
  });
  assert.equal(none.ok, false);
  assert.equal(none.missing.length, 6, "all three rules on both refs");
});

test("a read error is thrown", async () => {
  const gh = {
    async getBranchRules() {
      throw new Error("GET /rules/branches/omni-queue-state → 403: Resource not accessible");
    },
  };
  await assert.rejects(readQueueRefsProtection({ gh, candidateRef: CANDIDATE }), /403/);

  // The candidate read failing after the state branch read succeeded throws as well.
  let calls = 0;
  const half = {
    async getBranchRules() {
      calls += 1;
      if (calls === 2) throw new Error("socket hang up");
      return PROTECTED.map((type) => ({ type, rulesetId: 7 }));
    },
  };
  await assert.rejects(readQueueRefsProtection({ gh: half, candidateRef: CANDIDATE }), /hang up/);
});
