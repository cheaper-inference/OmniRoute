// scripts/merge-queue/land.mjs — WP2. Plan §3.2: land a green candidate.
//
// merge-ff (default) pushes the tested candidate commit to the base WITHOUT force; the server's
// fast-forward check is the compare-and-swap. squash-api merges each PR through the REST API
// and then verifies that the resulting tree is exactly the tested candidate tree.

import {
  CANDIDATE_PREFIX,
  STATE_BRANCH,
  TRAILERS,
  isSha,
  parseQueueTrailers,
} from "./contracts.mjs";
import {
  haveCommonAncestor,
  isAncestor,
  isValidBranchName,
  mergeTree,
  pushDetail,
  remoteBranchSha,
  scratchGit,
} from "./compose.mjs";

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
 * @property {true} [rateLimited]    squash-api "merge-failed": the merge call failed with an error
 *                                   the client marked as a rate limit (github isRateLimited); not a
 *                                   verdict on the PR, the tick retries it as an error
 */

/** Porcelain push summaries that mean "the base is no longer where we composed on". */
const BASE_MOVED_RE = /non-fast-forward|fetch first|stale info/i;

function assertBase(git, base) {
  const name = String(base ?? "");
  if (name.startsWith(CANDIDATE_PREFIX) || name === STATE_BRANCH || !isValidBranchName(git, name)) {
    throw new Error(`land: refusing unsafe base ${JSON.stringify(name)}`);
  }
  return name;
}

/** True when the scratch store already has `sha` as a commit (no fetch). */
function hasCommit(git, sha) {
  return scratchGit(git).run(["cat-file", "-e", `${sha}^{commit}`], { allowFail: true }).code === 0;
}

/** Make sure a commit is in the scratch store (a later tick may run on a fresh runner). */
function ensureCommit(git, sha) {
  const g = scratchGit(git);
  const has = () => hasCommit(git, sha);
  if (has()) return;
  g.run(["fetch", "--no-tags", "--no-write-fetch-head", "--quiet", "origin", sha]);
  if (!has()) throw new Error(`land: commit ${sha} is not available from origin`);
}

/** Lines of `message` whose key is Omni-Queue-Base, in any paragraph and with any value. */
function countBaseTrailers(message) {
  let count = 0;
  for (const line of String(message).replace(/\r\n/g, "\n").split("\n")) {
    const m = /^([A-Za-z-]+):/.exec(line);
    if (m && m[1] === TRAILERS.base) count += 1;
  }
  return count;
}

/**
 * The commits of the first-parent chain expectedBaseSha..candidateSha, oldest first: SHA,
 * parents, queue trailers and the number of Omni-Queue-Base lines of the message.
 *
 * Every field is NUL-terminated: a commit message cannot hold a NUL, so each commit's message is
 * read whole, exactly as candidate-base.mjs reads it (any other separator can be written inside a
 * message and would hide its end from this reader). Output that does not split into
 * SHA/parents/message triples is not skipped: `malformed` describes it, `commits` holds the
 * commits read before it, and verifyComposition refuses the candidate.
 *
 * @returns {{commits: {sha: string, parents: string[], trailers: object, baseTrailers: number}[],
 *            malformed: string|null}}
 */
function firstParentChain(git, expectedBaseSha, candidateSha) {
  const out = scratchGit(git).out([
    "log",
    "--first-parent",
    "--reverse",
    "--format=%H%x00%P%x00%B%x00",
    `${expectedBaseSha}..${candidateSha}`,
  ]);
  const fields = out.split("\x00");
  // `out` is trimmed: after the last commit's final NUL nothing is left.
  const tail = fields.pop();
  const commits = [];
  if (tail !== "" || fields.length % 3 !== 0) {
    return { commits, malformed: "the first-parent chain cannot be read as whole commits" };
  }
  for (let i = 0; i < fields.length; i += 3) {
    // Every commit after the first starts on the newline git writes between log entries.
    const sha = i === 0 ? fields[i] : fields[i].replace(/^\n/, "");
    const parents = fields[i + 1] === "" ? [] : fields[i + 1].split(" ");
    const message = fields[i + 2];
    if (!isSha(sha) || !parents.every(isSha)) {
      return {
        commits,
        malformed: `the first-parent chain cannot be read past commit ${commits.length + 1}`,
      };
    }
    commits.push({
      sha,
      parents,
      trailers: parseQueueTrailers(message),
      baseTrailers: countBaseTrailers(message),
    });
  }
  return { commits, malformed: null };
}

/** A queue merge commit: its trailers name a PR and its second parent is the head they claim. */
const isQueueMerge = (commit) =>
  Boolean(commit.trailers.pr && commit.trailers.head) && commit.parents[1] === commit.trailers.head;

/**
 * PR numbers carried by the queue merge commits on the first-parent chain
 * expectedBaseSha..candidateSha, oldest first. A commit counts only when its trailers name a PR
 * AND its second parent is the head the trailers claim. A chain that cannot be read whole
 * contributes the commits read before the break (verifyComposition refuses such a candidate).
 */
export function mergedPrsBetween(git, expectedBaseSha, candidateSha) {
  const merged = [];
  for (const commit of firstParentChain(git, expectedBaseSha, candidateSha).commits) {
    const n = commit.trailers.pr;
    if (isQueueMerge(commit) && !merged.includes(n)) merged.push(n);
  }
  return merged;
}

/**
 * Is candidateSha exactly what compose.composeCandidate builds from `prs` on expectedBaseSha?
 * The tick asks before it blesses a candidate (and before a shadow would-land): a stored
 * in-flight record is only as trustworthy as the state branch, and the App's land status on a
 * planted candidate would let it into the base.
 *
 * Accepted only when `prs` is a non-empty list without repeats, expectedBaseSha is an ancestor
 * of the candidate, every commit of the first-parent chain expectedBaseSha..candidateSha is a
 * queue merge commit (two parents, trailers naming a PR, second parent = the head the trailers
 * claim), and walking `prs` in order consumes that chain exactly:
 *  - a PR with a merge commit of its own is the next merge commit of the chain, at the same head;
 *  - a PR without one is a stacked PR (ComposeResult.alreadyContained): composeCandidate includes
 *    it without a commit when its head is already reachable from the candidate so far (the last
 *    merge commit walked) and not from the base, and only then.
 * `treeSha` (optional): the stored tree, which must be the candidate's tree.
 * `trees` (optional, the tick sets it): each merge commit of the chain must also carry exactly the
 * tree composeCandidate would write for it, the merge of its two parents (the commit before it on
 * the chain and the PR head) recomposed with compose.mergeTree. Without it, a merge commit with
 * the right parents and trailers could carry any tree: shape alone does not tell what lands.
 * A recomposition that conflicts (or parents without common history, which composeCandidate
 * never merges) fails too. A git error while recomposing (an object the scratch store cannot
 * fetch) is thrown, not reported as a mismatch.
 * Last, every merge commit of the chain must carry exactly one Omni-Queue-Base, equal to
 * expectedBaseSha (the candidate's CI reads its base from that trailer; a second line with that
 * key, in any paragraph, is refused rather than resolved). The chain is read with each commit's
 * whole message, as the CI reads it; output that cannot be split into whole commits is a
 * mismatch. The subject, the author trailer and the commit identity are not checked.
 *
 * @param {{git: Git, expectedBaseSha: string, candidateSha: string, prs: PrRef[],
 *          treeSha?: string|null, trees?: boolean}} input   the commits must be in the scratch
 *          store already
 * @returns {{ok: true} | {ok: false, detail: string}}
 */
export function verifyComposition({ git, expectedBaseSha, candidateSha, prs, treeSha, trees }) {
  const fail = (detail) => ({ ok: false, detail });
  const short = (sha) => String(sha ?? "").slice(0, 12);
  if (!Array.isArray(prs) || !prs.length) return fail("the batch names no pull request");
  const numbers = prs.map((pr) => pr?.n);
  const twice = numbers.find((n, i) => numbers.indexOf(n) !== i);
  if (twice !== undefined) return fail(`#${twice} is named twice`);
  if (!isSha(expectedBaseSha) || !isSha(candidateSha)) return fail("invalid base or candidate SHA");
  for (const sha of [candidateSha, expectedBaseSha]) {
    if (!hasCommit(git, sha)) return fail(`commit ${short(sha)} is not in the scratch repository`);
  }
  if (!isAncestor(git, expectedBaseSha, candidateSha)) {
    return fail(`base ${short(expectedBaseSha)} is not an ancestor of the candidate`);
  }
  if (treeSha !== undefined) {
    const tree = scratchGit(git).out(["rev-parse", `${candidateSha}^{tree}`]);
    if (tree !== treeSha)
      return fail(`candidate tree ${short(tree)}, the batch says ${short(treeSha)}`);
  }
  const { commits: chain, malformed } = firstParentChain(git, expectedBaseSha, candidateSha);
  if (malformed) return fail(malformed);
  const odd = chain.find((commit) => commit.parents.length !== 2 || !isQueueMerge(commit));
  if (odd)
    return fail(`commit ${short(odd.sha)} on the first-parent chain is not a queue merge commit`);
  let current = expectedBaseSha;
  let next = 0;
  for (const pr of prs) {
    const merge = chain[next];
    if (merge && merge.trailers.pr === pr?.n) {
      if (merge.trailers.head !== pr.head) {
        return fail(
          `the merge commit of #${pr.n} merges head ${short(merge.trailers.head)}, the batch says ` +
            short(pr.head)
        );
      }
      current = merge.sha;
      next += 1;
      continue;
    }
    const stacked =
      isSha(pr?.head) &&
      hasCommit(git, pr.head) &&
      isAncestor(git, pr.head, current) &&
      !isAncestor(git, pr.head, expectedBaseSha);
    if (!stacked) {
      return fail(
        `#${pr?.n} has no merge commit at its place on the candidate and is not contained in ` +
          "the pull requests before it"
      );
    }
  }
  if (next !== chain.length) {
    return fail(`the candidate merges #${chain[next].trailers.pr}, which the batch does not name`);
  }
  if (trees) {
    for (const commit of chain) {
      // The same call composeCandidate makes for this PR: ours = the candidate so far, theirs =
      // the PR head (every commit of the chain has exactly these two parents, checked above).
      const [ours, theirs] = commit.parents;
      const tree = scratchGit(git).out(["rev-parse", `${commit.sha}^{tree}`]);
      const merged = haveCommonAncestor(git, ours, theirs)
        ? mergeTree(git, ours, theirs)
        : { clean: false };
      if (!merged.clean || merged.tree !== tree) {
        return fail(
          `merge commit ${short(commit.sha)} of #${commit.trailers.pr}: tree ${short(tree)}, ` +
            `recomposing gives ${merged.clean ? short(merged.tree) : "conflict"}`
        );
      }
    }
  }
  // The candidate's CI takes its base from the top commit's Omni-Queue-Base trailer
  // (candidate-base.mjs), constrained only to be an ancestor: a trailer naming a PR head would
  // make every base-relative gate compare nothing. composeCandidate writes the same base on every
  // merge commit of the batch.
  for (const commit of chain) {
    const named = commit.trailers.base;
    const prefix = `merge commit ${short(commit.sha)} of #${commit.trailers.pr} carries`;
    // composeCandidate writes one; with two, which one counts depends on the reader.
    if (commit.baseTrailers > 1)
      return fail(`${prefix} ${commit.baseTrailers} Omni-Queue-Base trailers`);
    if (named === expectedBaseSha) continue;
    return fail(
      named
        ? `${prefix} Omni-Queue-Base ${short(named)}, the batch's base is ${short(expectedBaseSha)}`
        : `${prefix} no Omni-Queue-Base trailer`
    );
  }
  return { ok: true };
}

/**
 * PRs landed by candidateSha: the trailer-carrying merge commits (mergedPrsBetween), then every
 * other PR of `prs` whose head is reachable from candidateSha but not from expectedBaseSha (a
 * stacked PR that compose reported in alreadyContained: it lands without a merge commit of its
 * own). Heads unknown to the scratch store are not reachable from the candidate (its whole commit
 * history is local after ensureCommit), so they are skipped without a fetch.
 */
function landedPrs(git, expectedBaseSha, candidateSha, prs) {
  const merged = mergedPrsBetween(git, expectedBaseSha, candidateSha);
  for (const pr of prs ?? []) {
    if (!pr || merged.includes(pr.n) || !isSha(pr.head) || !hasCommit(git, pr.head)) continue;
    if (isAncestor(git, pr.head, candidateSha) && !isAncestor(git, pr.head, expectedBaseSha)) {
      merged.push(pr.n);
    }
  }
  return merged;
}

/** Parse the porcelain line of `git push --porcelain` for one destination ref. */
function porcelainStatus(stdout, dstRef) {
  for (const line of String(stdout).split("\n")) {
    const parts = line.split("\t");
    if (parts.length >= 3 && parts[1].endsWith(`:${dstRef}`)) {
      return { flag: parts[0], summary: parts.slice(2).join("\t").trim() };
    }
  }
  return null;
}

/**
 * merge-ff (default): `git push origin <candidateSha>:refs/heads/<base>` without "+". Before
 * pushing, verify locally that expectedBaseSha is an ancestor of candidateSha ("not-descendant"
 * otherwise). Every PR head becomes reachable from the base, so GitHub marks each PR "Merged".
 *
 * Compare-and-swap on the base: the remote tip read just before the push must be
 *   - expectedBaseSha (the normal case), or
 *   - candidateSha itself (re-landing after a crash between the push and the state save: no
 *     push, ok:true, idempotent), or
 *   - a commit between them (expectedBaseSha ⊑ tip ⊑ candidateSha, e.g. someone fast-forwarded
 *     the base to one of the batch's PR heads): the push still lands the exact tested tree.
 *     Not an ordinary case for the live tick: it blesses only when its own tip read equals
 *     expectedBaseSha (tick landOrWouldLand), so it reaches this branch only when the base moved
 *     in the race between that read and this one.
 * Anything else is {ok:false, reason:"base-moved"} WITHOUT pushing — including a base that was
 * REWOUND to an ancestor of expectedBaseSha (an admin removing a bad commit): a push without
 * force would be a valid fast-forward there and would silently bring the removed commits back.
 * The push carries `--force-with-lease=refs/heads/<base>:<tip read>` (refspec without "+"), so
 * the base is updated only while it is still at the tip read: a base that moves forward,
 * is rewound or is deleted between that read and the push is refused ("stale info") and mapped
 * to "base-moved". The ancestry checks above keep the update a true fast-forward.
 *
 * A base branch already missing at that read is "rejected" (the push would CREATE it).
 * Any other refusal (protected-branch hook, ruleset) is "rejected" with the redacted detail.
 * A transport failure with no porcelain verdict throws (outcome unknown; the next tick
 * re-observes the base).
 *
 * `merged` lists the PRs whose queue merge commits are on expectedBaseSha..candidateSha. With the
 * optional `prs` (inFlight.prs), it also lists stacked PRs that landed without a merge commit of
 * their own (ComposeResult.alreadyContained); without it they are not reported.
 *
 * @param {{git: Git, base: string, candidateSha: string, expectedBaseSha: string,
 *          prs?: PrRef[]}} input
 * @returns {LandResult}   on success: {ok:true, newBaseSha: candidateSha, merged: number[]}
 */
export function landMergeFf({ git, base, candidateSha, expectedBaseSha, prs }) {
  const branch = assertBase(git, base);
  if (!isSha(candidateSha)) throw new Error("landMergeFf: invalid candidateSha");
  if (!isSha(expectedBaseSha)) throw new Error("landMergeFf: invalid expectedBaseSha");
  const g = scratchGit(git);

  ensureCommit(git, candidateSha);
  ensureCommit(git, expectedBaseSha);
  if (!isAncestor(git, expectedBaseSha, candidateSha)) {
    return {
      ok: false,
      reason: "not-descendant",
      merged: [],
      detail: `${expectedBaseSha} is not an ancestor of ${candidateSha}`,
    };
  }
  const merged = landedPrs(git, expectedBaseSha, candidateSha, prs);

  const before = remoteBranchSha(git, branch);
  if (!before) {
    return { ok: false, reason: "rejected", merged: [], detail: `base ${branch} not found` };
  }
  if (before === candidateSha) {
    return {
      ok: true,
      newBaseSha: candidateSha,
      merged,
      detail: `base ${branch} already at the candidate (landed earlier)`,
    };
  }
  // The live tick already required its own tip read to equal expectedBaseSha before blessing, so
  // a tip other than expectedBaseSha here (in between, or anywhere else) means the base moved in
  // the race between that read and this one.
  if (before !== expectedBaseSha) {
    const between =
      hasCommit(git, before) &&
      isAncestor(git, expectedBaseSha, before) &&
      isAncestor(git, before, candidateSha);
    if (!between) {
      return {
        ok: false,
        reason: "base-moved",
        merged: [],
        newBaseSha: before,
        detail: `base ${branch} is at ${before}, expected ${expectedBaseSha} (or a commit between it and the candidate)`,
      };
    }
  }

  const dst = `refs/heads/${branch}`;
  const lease = `--force-with-lease=${dst}:${before}`;
  const res = g.run(["push", "--porcelain", lease, "origin", `${candidateSha}:${dst}`], {
    allowFail: true,
  });
  const status = porcelainStatus(res.stdout, dst);
  if (!status) {
    throw new Error(`landMergeFf: push gave no verdict: ${pushDetail(res)}`);
  }
  if (status.flag === "!") {
    if (BASE_MOVED_RE.test(status.summary) && !/remote rejected/i.test(status.summary)) {
      return {
        ok: false,
        reason: "base-moved",
        merged: [],
        detail: status.summary,
        newBaseSha: remoteBranchSha(git, branch) ?? undefined,
      };
    }
    return { ok: false, reason: "rejected", merged: [], detail: pushDetail(res) };
  }
  if (res.code !== 0) {
    return { ok: false, reason: "rejected", merged: [], detail: pushDetail(res) };
  }

  const after = remoteBranchSha(git, branch);
  if (after !== candidateSha) {
    // The push itself succeeded (porcelain verdict); someone advanced the base right after.
    return {
      ok: true,
      newBaseSha: candidateSha,
      merged,
      detail: `base ${branch} advanced to ${after ?? "(deleted)"} after landing`,
    };
  }
  return { ok: true, newBaseSha: candidateSha, merged };
}

/**
 * squash-api: verify the base tip == expectedBaseSha (else "base-moved", nothing merged); then
 * for each PR in order `gh.mergePull(n, {method:"squash", sha: pr.head})`; stop at the first
 * failure ("merge-failed", with `rateLimited: true` when the call failed with an error the client
 * marked as a rate limit); finally compare the base tip's tree with candidateTreeSha —
 * mismatch → {ok:false, reason:"tree-divergence", actualTree}. The tick pauses the queue and
 * opens an issue on divergence.
 *
 * GitHub's default squash title/message ("<title> (#N)" + Co-authored-by trailers) is kept:
 * release tooling already maps those commits to PRs and credits co-authors.
 *
 * @param {{gh: object, base: string, prs: PrRef[], expectedBaseSha: string,
 *          candidateTreeSha: string}} input
 * @returns {Promise<LandResult>}  merged: PR numbers merged so far (also on failure)
 */
export async function landSquashApi({ gh, base, prs, expectedBaseSha, candidateTreeSha }) {
  if (!isSha(expectedBaseSha)) throw new Error("landSquashApi: invalid expectedBaseSha");
  if (!isSha(candidateTreeSha)) throw new Error("landSquashApi: invalid candidateTreeSha");
  /** @type {number[]} */
  const merged = [];
  const tip = await gh.getBranchSha(base);
  if (tip !== expectedBaseSha) {
    return {
      ok: false,
      reason: "base-moved",
      merged,
      detail: `base ${base} is at ${tip ?? "(missing)"}, expected ${expectedBaseSha}`,
      ...(tip ? { newBaseSha: tip } : {}),
    };
  }
  for (const pr of prs ?? []) {
    let res;
    try {
      res = await gh.mergePull(pr.n, { method: "squash", sha: pr.head });
    } catch (err) {
      res = {
        merged: false,
        status: 0,
        message: String(err?.message ?? err),
        // The client's mark survives into the result: a rate limit is no verdict on the PR.
        rateLimited: err?.rateLimited === true,
      };
    }
    if (!res?.merged) {
      return {
        ok: false,
        reason: "merge-failed",
        merged,
        detail: `#${pr.n}: ${res?.status ?? "?"} ${String(res?.message ?? "").slice(0, 500)}`,
        ...(res?.rateLimited === true ? { rateLimited: true } : {}),
      };
    }
    merged.push(pr.n);
  }
  const newBaseSha = await gh.getBranchSha(base);
  const commit = newBaseSha ? await gh.getCommit(newBaseSha) : null;
  const actualTree = commit?.treeSha ?? null;
  if (actualTree !== candidateTreeSha) {
    return {
      ok: false,
      reason: "tree-divergence",
      merged,
      newBaseSha: newBaseSha ?? undefined,
      actualTree: actualTree ?? undefined,
      detail: `base tree ${actualTree} != candidate tree ${candidateTreeSha}`,
    };
  }
  return { ok: true, merged, newBaseSha };
}
