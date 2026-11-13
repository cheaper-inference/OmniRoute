// scripts/merge-queue/land.mjs — WP2. Plan §3.2: land a green candidate.
// STUB written by the lead: exported names, parameters and return shapes are the contract.

/**
 * @typedef {import("./gitexec.mjs").Git} Git
 * @typedef {import("./contracts.mjs").PrRef} PrRef
 */

/**
 * @typedef {object} LandResult
 * @property {boolean} ok
 * @property {number[]} [merged]     PR numbers landed
 * @property {"base-moved"|"rejected"|"not-descendant"|"merge-failed"|"tree-divergence"} [reason]
 * @property {string} [detail]
 * @property {string} [newBaseSha]
 * @property {string} [actualTree]   squash-api: tree of the base after the last merge
 */

/**
 * merge-ff (default): `git push origin <candidateSha>:refs/heads/<base>` WITHOUT force. The
 * non-fast-forward refusal is the compare-and-swap: if the base moved since composition the
 * push fails → {ok:false, reason:"base-moved"} and the tick recomposes. Before pushing, verify
 * locally that expectedBaseSha is an ancestor of candidateSha ("not-descendant" otherwise).
 * Every PR head becomes reachable from the base, so GitHub marks each PR "Merged".
 * @param {{git: Git, base: string, candidateSha: string, expectedBaseSha: string}} input
 * @returns {LandResult}   on success: {ok:true, newBaseSha: candidateSha, merged: number[]}
 */
export function landMergeFf(input) {
  void input;
  throw new Error("not implemented (WP2)");
}

/**
 * squash-api: verify the base tip == expectedBaseSha (else "base-moved", nothing merged); then
 * for each PR in order `gh.mergePull(n, {method:"squash", sha: pr.head})`; stop at the first
 * failure ("merge-failed"); finally compare the base tip's tree with candidateTreeSha —
 * mismatch → {ok:false, reason:"tree-divergence", actualTree}. The tick pauses the queue and
 * opens an issue on divergence.
 * @param {{gh: object, base: string, prs: PrRef[], expectedBaseSha: string,
 *          candidateTreeSha: string}} input
 * @returns {Promise<LandResult>}  merged: PR numbers merged so far (also on failure)
 */
export async function landSquashApi(input) {
  void input;
  throw new Error("not implemented (WP2)");
}
