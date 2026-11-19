// scripts/merge-queue/refs-guard.mjs — L1: the queue blesses only while its own refs are protected.
//
// The tick trusts two things it reads back from the repository: the in-flight record on the state
// branch and the candidate commit under the candidate prefix. land.verifyComposition checks that
// the candidate is the composition of the stored PRs, but whoever can write those refs can plant
// both. The barrier is the queue-refs ruleset (apply-ruleset.mjs --kind queue-refs): only the
// queue's App may create, update or delete them. This module reads whether GitHub actually
// enforces those rules right now; the tick refuses to bless in live mode when it does not.
//
// Bypass actors are NOT checked: the App installation token cannot read them (no Administration
// permission), and anyone who can edit a ruleset's bypass list can just as well disable the
// ruleset, so a check here would add nothing against them.

import { STATE_BRANCH } from "./contracts.mjs";

/** Rule types the queue-refs ruleset puts on the state branch and on every candidate ref. */
export const QUEUE_REF_RULES = Object.freeze(["creation", "update", "deletion"]);

/**
 * Read the active rules of the state branch and of the batch's own candidate ref (one GET each,
 * through gh.getBranchRules) and report every rule of QUEUE_REF_RULES that GitHub does not
 * enforce on one of them. A read error is thrown, never reported as "unprotected" or "protected":
 * the caller decides (the tick fails and the next one reads again).
 * @param {{gh: {getBranchRules: (branch: string) => Promise<{type: string}[]>},
 *          candidateRef: string}} input   candidateRef: a branch name, without refs/heads/
 * @returns {Promise<{ok: boolean, missing: string[], detail: string}>}
 *   missing: "<ref>: <rule>", state branch first; detail: missing joined by ", " ("" when ok)
 */
export async function readQueueRefsProtection({ gh, candidateRef }) {
  const missing = [];
  for (const ref of [STATE_BRANCH, candidateRef]) {
    const enforced = new Set((await gh.getBranchRules(ref)).map((rule) => rule.type));
    for (const rule of QUEUE_REF_RULES) {
      if (!enforced.has(rule)) missing.push(`${ref}: ${rule}`);
    }
  }
  return { ok: missing.length === 0, missing, detail: missing.join(", ") };
}
