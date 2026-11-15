// scripts/merge-queue/compose.mjs — WP2. Plan §3.1 step 3: build the candidate with git.
//
// Security contract: NEVER check out a working tree of PR code. Compose with
// `git merge-tree --write-tree` + `git commit-tree` in a bare scratch repository (git ≥ 2.38).
// All git calls go through gitexec.createGit (no shell, token in env, redacted errors), and every
// call pins GIT_DIR to the scratch directory so git can never discover (and push from) an
// enclosing repository such as the workflow's own checkout.
//
// Nothing here force-pushes. Candidate refs are unique per SHA (contracts.candidateRef), so a
// push either creates a new ref or finds it already at the same SHA.

import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

import {
  CANDIDATE_PREFIX,
  STATE_BRANCH,
  baseCheckSha12,
  buildMergeMessage,
  isSha,
  parseCandidateRef,
} from "./contracts.mjs";

/**
 * @typedef {import("./gitexec.mjs").Git} Git
 * @typedef {import("./contracts.mjs").PrRef} PrRef
 */

/**
 * @typedef {object} ComposeResult
 * @property {string|null} candidateSha   null when no PR could be included
 * @property {string|null} treeSha
 * @property {string} baseSha
 * @property {PrRef[]} included            merged into the candidate, in order
 * @property {PrRef[]} excludedBatchConflict  conflicts with earlier PRs of this batch only (stay queued)
 * @property {PrRef[]} excludedBaseConflict   conflicts with the bare base too (leave the queue)
 * @property {PrRef[]} excludedHeadMoved      fetched refs/pull/N/head ≠ pr.head (approval is stale)
 * @property {PrRef[]} alreadyContained   subset of `included` whose head was already reachable
 *                                        from the candidate-so-far (stacked PR): included WITHOUT a
 *                                        merge commit of its own, so it carries no queue trailers
 * @property {PrRef[]} alreadyInBase      head already reachable from the bare base (the PR's
 *                                        commits are on the base already): NOT included, nothing to
 *                                        test or land; the tick drops it from the queue
 */

/** Local refs of the scratch repository (never pushed anywhere). */
export const LOCAL_BASE_REF = "refs/omni-queue/base";
export const localPrRef = (n) => `refs/omni-queue/pr/${n}`;

/**
 * Repository-location variables that git honours from the environment. createGit inherits
 * process.env, so a tick (or a test suite) running inside a git hook or a wrapper could carry
 * values that redirect the object store, index or work tree away from the scratch repository.
 * scratchGit clears them (Node's spawn drops `undefined` entries). Identity, auth and config
 * isolation variables are left alone on purpose.
 */
const INHERITED_LOCATION_VARS = Object.freeze([
  "GIT_WORK_TREE",
  "GIT_INDEX_FILE",
  "GIT_OBJECT_DIRECTORY",
  "GIT_ALTERNATE_OBJECT_DIRECTORIES",
  "GIT_COMMON_DIR",
  "GIT_NAMESPACE",
  "GIT_QUARANTINE_PATH",
  "GIT_SHALLOW_FILE",
  "GIT_GRAFT_FILE",
  "GIT_REPLACE_REF_BASE",
]);
const CLEARED_LOCATION_ENV = Object.freeze(
  Object.fromEntries(INHERITED_LOCATION_VARS.map((k) => [k, undefined]))
);

/**
 * Wrap a Git runner so every call targets the scratch repository explicitly (GIT_DIR = cwd) and
 * no inherited GIT_* location variable can point it anywhere else.
 * @param {Git} git
 */
export function scratchGit(git) {
  const gitDir = resolve(git.cwd);
  const env = (extra) => ({ ...CLEARED_LOCATION_ENV, GIT_DIR: gitDir, ...(extra ?? {}) });
  return {
    cwd: gitDir,
    run: (args, opts = {}) => git.run(args, { ...opts, env: env(opts.env) }),
    out: (args, opts = {}) => git.out(args, { ...opts, env: env(opts.env) }),
  };
}

function isBareRepoDir(dir) {
  return (
    existsSync(join(dir, "HEAD")) &&
    existsSync(join(dir, "objects")) &&
    existsSync(join(dir, "refs")) &&
    !existsSync(join(dir, ".git"))
  );
}

/** `git merge-base --is-ancestor a b` → true / false; anything else throws. */
export function isAncestor(git, ancestor, descendant) {
  const res = scratchGit(git).run(["merge-base", "--is-ancestor", ancestor, descendant], {
    allowFail: true,
  });
  if (res.code === 0) return true;
  if (res.code === 1) return false;
  throw new Error(`git merge-base --is-ancestor failed (exit ${res.code}): ${res.stderr.trim()}`);
}

/** True when `name` is a valid branch name usable inside a refspec. */
export function isValidBranchName(git, name) {
  const s = String(name ?? "");
  if (!s || s.startsWith("-") || s.startsWith("refs/") || /[:*+\s\\]/.test(s)) return false;
  const res = scratchGit(git).run(["check-ref-format", `refs/heads/${s}`], { allowFail: true });
  return res.code === 0;
}

/**
 * Initialize a bare scratch repository at git.cwd with `origin` = remoteUrl. With a filter
 * (default `blob:none`, production against github.com) the remote is registered as a promisor
 * so `merge-tree` fetches only the blobs it needs; tests pass `filter: null` and never use
 * partial clone. Idempotent: an existing bare repository is reused and its URL updated.
 * A filter configured by an earlier call is left in place (unsetting it would orphan the
 * promised objects already in the store).
 * @param {{git: Git, remoteUrl: string, filter?: string|null}} input
 * @returns {{created: boolean}}
 */
export function prepareRepo({ git, remoteUrl, filter = "blob:none" }) {
  if (typeof remoteUrl !== "string" || !remoteUrl || remoteUrl.startsWith("-")) {
    throw new Error("prepareRepo: invalid remoteUrl");
  }
  if (filter !== null && !/^[a-z]+(:[A-Za-z0-9=._-]+)?$/.test(String(filter))) {
    throw new Error(`prepareRepo: invalid filter ${JSON.stringify(filter)}`);
  }
  const g = scratchGit(git);
  const dir = g.cwd;
  mkdirSync(dir, { recursive: true });
  let created = false;
  if (!isBareRepoDir(dir)) {
    if (readdirSync(dir).length > 0) {
      throw new Error(`prepareRepo: ${dir} is not empty and is not a bare git repository`);
    }
    g.run(["init", "--bare", "--quiet"]);
    created = true;
  }
  if (g.out(["rev-parse", "--is-bare-repository"]) !== "true") {
    throw new Error(`prepareRepo: ${dir} is not a bare repository`);
  }
  g.run(["config", "gc.auto", "0"]);
  g.run(["config", "core.hooksPath", "/dev/null"]);
  g.run(["config", "remote.origin.url", remoteUrl]);
  // Push only what the server lacks: negotiate common commits (PR heads live under
  // refs/pull/*, which receive-pack does not advertise) instead of re-sending their objects.
  g.run(["config", "push.negotiate", "true"]);
  if (filter !== null) {
    g.run(["config", "remote.origin.promisor", "true"]);
    g.run(["config", "remote.origin.partialclonefilter", filter]);
  }
  return { created };
}

/**
 * Fetch refs/heads/<base> and refs/pull/<n>/head for every PR into local refs
 * (refs/omni-queue/base, refs/omni-queue/pr/<n>). Returns the fetched base tip and heads.
 *
 * The leading `+` of these FETCH refspecs only lets the scratch repository overwrite its own
 * local bookkeeping refs (a PR head that was force-pushed upstream must replace the stale local
 * copy). It updates nothing on the remote and is not a force-push.
 *
 * A PR whose ref cannot be fetched (deleted fork, closed PR) gets `heads[n] = null`, which
 * composeCandidate reports as excludedHeadMoved. A missing base branch throws.
 *
 * @param {{git: Git, base: string, prs: PrRef[], filter?: string|null}} input
 *   filter: undefined = use the promisor filter configured by prepareRepo (if any);
 *           null = never filter; string = pass `--filter=<string>` explicitly.
 * @returns {{baseSha: string, heads: Object<number, string|null>}}
 */
export function fetchInputs({ git, base, prs, filter }) {
  const g = scratchGit(git);
  if (!isValidBranchName(git, base)) throw new Error(`fetchInputs: unsafe base ${base}`);
  const numbers = (prs ?? []).map((pr) => pr?.n);
  if (!numbers.every((n) => Number.isSafeInteger(n) && n > 0)) {
    throw new Error("fetchInputs: every PR needs a positive integer number");
  }
  const fetchArgs = ["fetch", "--no-tags", "--no-write-fetch-head", "--quiet"];
  if (typeof filter === "string") fetchArgs.push(`--filter=${filter}`);
  else if (filter === null) fetchArgs.push("--no-filter");
  fetchArgs.push("origin");

  const baseSpec = `+refs/heads/${base}:${LOCAL_BASE_REF}`;
  const prSpec = (n) => `+refs/pull/${n}/head:${localPrRef(n)}`;

  // Drop local copies first: a ref that fails to fetch must read as absent, never as stale.
  g.run(["update-ref", "-d", LOCAL_BASE_REF], { allowFail: true });
  for (const n of numbers) g.run(["update-ref", "-d", localPrRef(n)], { allowFail: true });

  const all = g.run([...fetchArgs, baseSpec, ...numbers.map(prSpec)], { allowFail: true });
  if (all.code !== 0) {
    // One missing ref fails the whole fetch: retry one ref at a time.
    g.run([...fetchArgs, baseSpec]);
    for (const n of numbers) g.run([...fetchArgs, prSpec(n)], { allowFail: true });
  }

  const read = (ref) => {
    const res = g.run(["rev-parse", "--verify", "--quiet", `${ref}^{commit}`], {
      allowFail: true,
    });
    const sha = res.stdout.trim();
    return res.code === 0 && isSha(sha) ? sha : null;
  };
  const baseSha = read(LOCAL_BASE_REF);
  if (!baseSha) throw new Error(`fetchInputs: base ${base} could not be fetched`);
  /** @type {Object<number, string|null>} */
  const heads = {};
  for (const n of numbers) heads[n] = read(localPrRef(n));
  return { baseSha, heads };
}

/**
 * `git merge-tree --write-tree ours theirs` → {clean: true, tree} | {clean: false}.
 * Exit 0 = clean (tree on line 1), exit 1 = conflict, anything else = error.
 */
function mergeTree(git, ours, theirs) {
  const res = scratchGit(git).run(
    ["merge-tree", "--write-tree", "--no-messages", "--name-only", ours, theirs],
    { allowFail: true }
  );
  if (res.code === 0) {
    const tree = res.stdout.split("\n")[0].trim();
    if (!isSha(tree))
      throw new Error(`git merge-tree returned no tree: ${res.stdout.slice(0, 200)}`);
    return { clean: true, tree };
  }
  if (res.code === 1) return { clean: false };
  throw new Error(`git merge-tree failed (exit ${res.code}): ${res.stderr.trim().slice(0, 2000)}`);
}

/** True when the two commits share history (`git merge-base` finds a common ancestor). */
function haveCommonAncestor(git, a, b) {
  const res = scratchGit(git).run(["merge-base", a, b], { allowFail: true });
  if (res.code === 0) return true;
  if (res.code === 1) return false;
  throw new Error(`git merge-base failed (exit ${res.code}): ${res.stderr.trim()}`);
}

/**
 * Starting at baseSha, merge each PR's exact head in order (`merge-tree --write-tree`, then
 * `commit-tree -p <current> -p <head>` with contracts.buildMergeMessage). A PR that conflicts
 * with the candidate-so-far is re-tried against the bare base to decide between
 * excludedBatchConflict and excludedBaseConflict. Never a working tree, never a rebase.
 *
 * - The fetched head must equal the approved `pr.head`, else excludedHeadMoved.
 * - A head with no common history with the candidate (unrelated histories) cannot merge with
 *   the base either → excludedBaseConflict.
 * - A head already reachable from the bare base is reported in `alreadyInBase` and skipped.
 * - A head already reachable from the candidate-so-far (stacked on an earlier PR of the batch)
 *   is included WITHOUT a new commit, like `git merge` reporting "Already up to date": it lands
 *   with the batch (GitHub marks it merged once reachable) and is listed in `alreadyContained`.
 *
 * The merge commits take their author/committer identity from the Git runner (createGit
 * `identity`, the App bot). Their message is built only from validated fields.
 *
 * @param {{git: Git, base: string, baseSha: string, prs: PrRef[], batchId: string,
 *          heads: Object<number, string|null>}} input   heads = fetchInputs().heads
 * @returns {ComposeResult}
 */
export function composeCandidate({ git, base, baseSha, prs, batchId, heads }) {
  if (!isSha(baseSha)) throw new Error("composeCandidate: invalid baseSha");
  const g = scratchGit(git);
  /** @type {ComposeResult} */
  const result = {
    candidateSha: null,
    treeSha: null,
    baseSha,
    included: [],
    excludedBatchConflict: [],
    excludedBaseConflict: [],
    excludedHeadMoved: [],
    alreadyContained: [],
    alreadyInBase: [],
  };
  let current = baseSha;
  for (const pr of prs ?? []) {
    const fetched = heads?.[pr.n] ?? null;
    if (!isSha(pr.head) || fetched !== pr.head) {
      result.excludedHeadMoved.push(pr);
      continue;
    }
    if (isAncestor(git, pr.head, baseSha)) {
      result.alreadyInBase.push(pr);
      continue;
    }
    if (isAncestor(git, pr.head, current)) {
      result.included.push(pr);
      result.alreadyContained.push(pr);
      continue;
    }
    if (!haveCommonAncestor(git, current, pr.head)) {
      result.excludedBaseConflict.push(pr);
      continue;
    }
    const merged = mergeTree(git, current, pr.head);
    if (!merged.clean) {
      const againstBase = current === baseSha ? merged : mergeTree(git, baseSha, pr.head);
      if (againstBase.clean) result.excludedBatchConflict.push(pr);
      else result.excludedBaseConflict.push(pr);
      continue;
    }
    const message = buildMergeMessage({ pr, base, baseSha, batchId });
    current = g.out(["commit-tree", merged.tree, "-p", current, "-p", pr.head, "-F", "-"], {
      input: message,
    });
    if (!isSha(current)) throw new Error("git commit-tree returned no commit id");
    result.included.push(pr);
  }
  // Only a candidate with at least one queue merge commit is worth testing and landing. (A PR in
  // alreadyContained always follows a merge commit, since a head reachable from the bare base
  // goes to alreadyInBase; the check on `current` keeps a no-op candidate impossible.)
  if (result.included.length > 0 && current !== baseSha) {
    result.candidateSha = current;
    result.treeSha = g.out(["rev-parse", `${current}^{tree}`]);
  }
  return result;
}

/**
 * Validate a candidate branch name: must start with contracts.CANDIDATE_PREFIX (no
 * `refs/heads/` prefix), parse with contracts.parseCandidateRef and be a valid ref.
 */
function assertCandidateRef(git, ref) {
  const name = String(ref ?? "");
  if (
    !name.startsWith(CANDIDATE_PREFIX) ||
    name === STATE_BRANCH ||
    !parseCandidateRef(name) ||
    !isValidBranchName(git, name)
  ) {
    throw new Error(`refusing to touch non-candidate ref: ${JSON.stringify(name)}`);
  }
  return name;
}

/** Remote SHA of refs/heads/<branch> via ls-remote, or null when absent. */
export function remoteBranchSha(git, branch) {
  const out = scratchGit(git).out(["ls-remote", "--heads", "origin", `refs/heads/${branch}`]);
  for (const line of out.split("\n")) {
    const [sha, ref] = line.split("\t");
    if (ref === `refs/heads/${branch}` && isSha(sha)) return sha;
  }
  return null;
}

/**
 * The ref name must encode the SHA it carries (D2: candidate refs are unique per SHA):
 * `<batchId>-<sha12>` for a batch, `basecheck-<sha12>[-r<n>]` for a base check (contracts
 * baseCheckRef). This is what makes a push without force safe: the only commit that may live
 * under a name is the one it names.
 */
export function assertRefNamesSha(name, sha) {
  const parsed = parseCandidateRef(name);
  const sha12 = sha.slice(0, 12);
  const ok =
    parsed.kind === "base-check"
      ? baseCheckSha12(parsed.id) === sha12
      : parsed.id.endsWith(`-${sha12}`) && parsed.id.length > sha12.length + 1;
  if (!ok) {
    throw new Error(`pushCandidate: ref ${JSON.stringify(name)} does not name sha ${sha}`);
  }
}

/**
 * Create refs/heads/<ref> on origin pointing at sha. Refuses any ref outside
 * contracts.CANDIDATE_PREFIX, any ref whose name does not encode `sha`, and never forces
 * (candidate refs are unique per SHA): a ref that already points at `sha` is fine (nothing
 * pushed); a ref at another SHA is an error. After the push the remote ref is read back and
 * must equal `sha`.
 * @param {{git: Git, sha: string, ref: string}} input
 * @returns {{created: boolean}}
 */
export function pushCandidate({ git, sha, ref }) {
  const name = assertCandidateRef(git, ref);
  if (!isSha(sha)) throw new Error(`pushCandidate: invalid sha ${sha}`);
  assertRefNamesSha(name, sha);
  const existing = remoteBranchSha(git, name);
  if (existing === sha) return { created: false };
  if (existing) {
    throw new Error(`pushCandidate: ${name} already exists at ${existing} (expected ${sha})`);
  }
  const res = scratchGit(git).run(["push", "--porcelain", "origin", `${sha}:refs/heads/${name}`], {
    allowFail: true,
  });
  if (res.code !== 0) {
    throw new Error(`pushCandidate: push of ${name} failed: ${pushDetail(res)}`);
  }
  const after = remoteBranchSha(git, name);
  if (after !== sha) {
    throw new Error(
      `pushCandidate: ${name} is at ${after ?? "(absent)"} after push, expected ${sha}`
    );
  }
  return { created: true };
}

/**
 * Delete a candidate branch on origin (refuses refs outside CANDIDATE_PREFIX; missing = ok).
 * @param {{git: Git, ref: string}} input
 * @returns {{deleted: boolean}}
 */
export function deleteCandidate({ git, ref }) {
  const name = assertCandidateRef(git, ref);
  if (!remoteBranchSha(git, name)) return { deleted: false };
  const res = scratchGit(git).run(["push", "--porcelain", "origin", `:refs/heads/${name}`], {
    allowFail: true,
  });
  if (res.code !== 0) {
    if (!remoteBranchSha(git, name)) return { deleted: false };
    throw new Error(`deleteCandidate: delete of ${name} failed: ${pushDetail(res)}`);
  }
  return { deleted: true };
}

/** Short, already-redacted description of a failed push (porcelain status + stderr tail). */
export function pushDetail(res) {
  const lines = `${res.stdout}\n${res.stderr}`
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && l !== "Done" && !l.startsWith("To "));
  return lines.join(" | ").slice(0, 1000);
}
