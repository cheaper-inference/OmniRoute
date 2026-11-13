#!/usr/bin/env node
// scripts/merge-queue/cli.mjs — WP4. Plan §3.10: local CLI for the owner and the skills.
// STUB written by the lead: exported names, parameters and return shapes are the contract.
//
//   npm run queue -- status [--base <branch>]
//   npm run queue -- add <PR...>        apply the queue label (approval is recorded by the workflow)
//   npm run queue -- remove <PR...>     remove the queue label
//   npm run queue -- pause <base> [--reason <text>]   workflow_dispatch action=pause
//   npm run queue -- resume <base>                    workflow_dispatch action=resume
//   npm run queue -- why <PR>           eligibility verdict + reasons, computed locally
//   npm run queue -- history [--base <branch>] [--limit <n>]
//
// Token: `gh auth token` (execFile, never a shell). Reads state from contracts.STATE_BRANCH via
// the Contents API; never writes state (the workflow is the single writer).

/**
 * @param {string[]} argv   arguments after `cli.mjs`
 * @param {{gh?: object, out?: (line: string) => void, err?: (line: string) => void,
 *          config?: object, now?: () => string}} [deps]  injected in tests
 * @returns {Promise<number>} exit code
 */
export async function runCli(argv, deps) {
  void argv;
  void deps;
  throw new Error("not implemented (WP4)");
}
