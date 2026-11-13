#!/usr/bin/env node
// scripts/merge-queue/apply-ruleset.mjs — WP6. Plan §3.9: apply config/merge-queue/ruleset.release.json.
// STUB written by the lead: exported names, parameters and return shapes are the contract.
//
//   node scripts/merge-queue/apply-ruleset.mjs --base <branch> [--dry-run]
//        [--repo <owner/repo>] [--app-id <id>]
// NOT to be run against cheaper-inference/OmniRoute in this delivery except with --dry-run.

/**
 * Fill the template for one branch: conditions.ref_name.include = ["refs/heads/<base>"], the
 * name suffixed with the base, and the App bypass actor id (Integration) from appId.
 * @param {object} template   parsed ruleset.release.json
 * @param {{base: string, appId: number|null}} input
 * @returns {object} REST body for POST/PUT /repos/{owner}/{repo}/rulesets
 */
export function buildRuleset(template, input) {
  void template;
  void input;
  throw new Error("not implemented (WP6)");
}

/**
 * @param {{gh: object, base: string, desired: object, dryRun: boolean}} input
 * @returns {Promise<{action: "create"|"update"|"noop", id: number|null, diff: string[]}>}
 */
export async function applyRuleset(input) {
  void input;
  throw new Error("not implemented (WP6)");
}

/** CLI entry. @returns {Promise<number>} exit code */
export async function main(argv = process.argv.slice(2), env = process.env) {
  void argv;
  void env;
  throw new Error("not implemented (WP6)");
}
