import { execFileSync } from "node:child_process";

const SHA = /^[0-9a-f]{40}$/;

/** Resolve a PR comparison from the checked-out candidate, never from a moving branch. */
export function resolvePullRequestComparison({ pr, cwd = process.cwd(), env = process.env }) {
  const git = (...args) =>
    execFileSync("git", args, {
      cwd,
      encoding: "utf8",
      timeout: 30000,
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  const eventBase = pr?.base?.sha;
  const headSha = pr?.head?.sha;
  if (![eventBase, headSha, env.GITHUB_SHA].every((sha) => SHA.test(sha ?? ""))) {
    throw new Error("Missing immutable PR comparison identity");
  }
  // A complete candidate/base does not prove that base..head can traverse all
  // contributor commits. A shallow boundary anywhere can truncate that scan.
  if (git("rev-parse", "--is-shallow-repository") !== "false") {
    throw new Error("Shallow PR history cannot establish a complete comparison");
  }
  const candidateSha = git("rev-parse", "--verify", "HEAD^{commit}");
  if (env.GITHUB_SHA !== candidateSha) throw new Error("PR candidate does not match checkout");
  git("rev-parse", "--verify", "--end-of-options", `${eventBase}^{commit}`);
  git("rev-parse", "--verify", "--end-of-options", `${headSha}^{commit}`);
  let baseTipSha = eventBase;
  if (candidateSha !== headSha) {
    const parents = git("rev-list", "--parents", "-n", "1", candidateSha).split(/\s+/).slice(1);
    if (parents.length !== 2 || parents[1] !== headSha) {
      throw new Error("PR candidate is not a merge of the event head");
    }
    // GitHub's event base can lag the base used by refs/pull/N/merge. Validate
    // both parents before excluding newer upstream commits from this PR's diff.
    git("merge-base", "--is-ancestor", eventBase, parents[0]);
    baseTipSha = parents[0];
  }
  // A direct head checkout can predate its event base, or itself be a contributor
  // merge. Only a verified synthetic merge above may substitute its first parent.
  const baseSha = git("merge-base", "--all", baseTipSha, candidateSha);
  if (!SHA.test(baseSha)) throw new Error("No unambiguous PR comparison base");
  return { baseSha, baseTipSha, headSha, candidateSha };
}
