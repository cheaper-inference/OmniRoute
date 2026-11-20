// omni-queue: signed merge commits (compose.composeCandidate with `signing`, config
// landing.signing "ssh") against real git and a real ed25519 key made by ssh-keygen in a
// temporary directory. The signature is checked with `git verify-commit`, never mocked, and a
// signed candidate must be the unsigned composition of the same inputs plus a signature: same
// trees, parents (up to the signed chain itself), author, committer and message.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

import { resolveCandidateBase } from "../../../../scripts/merge-queue/candidate-base.mjs";
import {
  SIGNING_KEY_MISSING_CAUSE,
  composeCandidate,
  fetchInputs,
  prepareRepo,
  scratchGit,
  signingKeyPath,
} from "../../../../scripts/merge-queue/compose.mjs";
import { queuePrByCommit } from "../../../../scripts/merge-queue/history-map.mjs";
import { mergedPrsBetween, verifyComposition } from "../../../../scripts/merge-queue/land.mjs";
import { BOT, createSandbox, inheritedGitEnvCleared, prRef } from "./helpers/git-sandbox.mjs";

const BASE = "release/v1.0.0";
/** Fixed dates: two compositions of the same inputs differ only by what signing adds. */
const DATES = Object.freeze({
  GIT_AUTHOR_DATE: "2026-11-20T12:00:00Z",
  GIT_COMMITTER_DATE: "2026-11-20T12:00:00Z",
});

/** Why this machine cannot run the signature tests, or null when it can. */
function signingUnavailable() {
  const keygen = spawnSync("ssh-keygen", ["-?"], { encoding: "utf8" });
  if (keygen.error?.code === "ENOENT") return "ssh-keygen is not installed (needed to sign)";
  const version = spawnSync("git", ["--version"], { encoding: "utf8" });
  const match = /git version (\d+)\.(\d+)/.exec(version.stdout ?? "");
  if (!match) return "git --version could not be read";
  const [major, minor] = [Number(match[1]), Number(match[2])];
  if (major < 2 || (major === 2 && minor < 34)) {
    return `git ${match[1]}.${match[2]} cannot sign with SSH keys (2.34 or later)`;
  }
  return null;
}
const UNAVAILABLE = signingUnavailable();

/** A throwaway ed25519 key without a passphrase in `dir`: {keyPath, publicKey}, no .pub file. */
function makeKey(dir, name = "signing-key") {
  const keyPath = join(dir, name);
  const res = spawnSync(
    "ssh-keygen",
    ["-q", "-t", "ed25519", "-N", "", "-C", "omni-queue-test", "-f", keyPath],
    { encoding: "utf8" }
  );
  assert.equal(res.status, 0, `ssh-keygen failed: ${res.stderr}`);
  const publicKey = readFileSync(`${keyPath}.pub`, "utf8").trim();
  // As in the job: only the private key is on disk (the workflow writes the secret alone).
  rmSync(`${keyPath}.pub`);
  return { keyPath, publicKey };
}

function setup(t) {
  const sb = createSandbox({ base: BASE });
  t.after(() => sb.cleanup());
  const scratch = sb.newDir("scratch");
  const logs = [];
  const git = sb.scratchGit(scratch, {
    env: { ...inheritedGitEnvCleared(), ...sb.isolationEnv, ...DATES },
    log: (line) => logs.push(line),
  });
  prepareRepo({ git, remoteUrl: sb.remoteUrl, filter: null });
  const keys = sb.newDir("keys");
  return { sb, git, scratch, keys, logs };
}

/** Three independent PRs and a fourth that touches what the first touches (still clean). */
function publish(sb) {
  return [
    prRef(11, sb.publishPr(11, { "a.txt": "A\n" })),
    prRef(12, sb.publishPr(12, { "b.txt": "B\n" })),
    prRef(13, sb.publishPr(13, { "c/d.txt": "D\n" })),
  ];
}

function compose(git, prs, signing) {
  const { baseSha, heads } = fetchInputs({ git, base: BASE, prs });
  return composeCandidate({
    git,
    base: BASE,
    baseSha,
    prs,
    batchId: "b7",
    heads,
    ...(signing === undefined ? {} : { signing }),
  });
}

/** The first-parent chain base..sha, oldest first, each commit as git stores it. */
function chain(git, baseSha, sha) {
  const g = scratchGit(git);
  const ids = g.out(["rev-list", "--first-parent", "--reverse", `${baseSha}..${sha}`]).split("\n");
  return ids.map((id) => {
    const raw = g.out(["cat-file", "commit", id]);
    const field = (name) =>
      raw
        .split("\n")
        .filter((line) => line.startsWith(`${name} `))
        .map((line) => line.slice(name.length + 1));
    return {
      id,
      raw,
      tree: field("tree")[0],
      parents: field("parent"),
      author: field("author")[0],
      committer: field("committer")[0],
      message: g.out(["log", "-1", "--format=%B", id]),
      signed: /^gpgsig -----BEGIN SSH SIGNATURE-----$/m.test(raw),
    };
  });
}

/** The commit object without its gpgsig header (the header and its continuation lines). */
function withoutSignature(raw) {
  const lines = raw.split("\n");
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("gpgsig ")) {
      while (lines[i + 1]?.startsWith(" ")) i++;
      continue;
    }
    out.push(lines[i]);
  }
  return out.join("\n");
}

/** `git verify-commit` against an allowed-signers file listing `publicKey` for the bot. */
function verify(git, keys, sha, publicKey) {
  const allowed = join(keys, `allowed-${Math.random().toString(16).slice(2)}`);
  writeFileSync(allowed, `${BOT.email} namespaces="git" ${publicKey}\n`);
  return scratchGit(git).run(
    ["-c", "gpg.format=ssh", "-c", `gpg.ssh.allowedSignersFile=${allowed}`, "verify-commit", sha],
    { allowFail: true }
  );
}

test("signing: every merge commit is signed, verifies with the key, and is the unsigned composition plus a signature", (t) => {
  if (UNAVAILABLE) return t.skip(UNAVAILABLE);
  const { sb, git, keys, logs } = setup(t);
  const { keyPath, publicKey } = makeKey(keys);
  const prs = publish(sb);
  const baseSha = sb.baseSha();

  const unsigned = compose(git, prs);
  const signed = compose(git, prs, { keyPath });
  const composeLogs = [...logs]; // what the compositions logged (the checks below log too)
  assert.ok(composeLogs.some((line) => /^git commit-tree .* -S -F -$/.test(line)));
  assert.equal(unsigned.signing ?? null, null, "no signing asked: no report");
  assert.deepEqual(signed.signing, { signed: 3, unsigned: 0, cause: null });
  assert.deepEqual(
    signed.included.map((p) => p.n),
    unsigned.included.map((p) => p.n)
  );
  assert.equal(signed.treeSha, unsigned.treeSha, "the same tree");
  assert.notEqual(signed.candidateSha, unsigned.candidateSha, "a signature is part of the commit");

  const plain = chain(git, baseSha, unsigned.candidateSha);
  const sealed = chain(git, baseSha, signed.candidateSha);
  assert.equal(sealed.length, 3);
  for (let i = 0; i < sealed.length; i++) {
    const [u, s] = [plain[i], sealed[i]];
    assert.equal(u.signed, false, `unsigned commit ${i}`);
    assert.equal(s.signed, true, `signed commit ${i}`);
    assert.equal(s.tree, u.tree, `tree ${i}`);
    assert.equal(s.parents.length, 2);
    assert.equal(s.parents[0], i === 0 ? baseSha : sealed[i - 1].id, `first parent ${i}`);
    assert.equal(s.parents[1], u.parents[1], `second parent ${i} (the PR head)`);
    assert.equal(s.author, u.author, `author ${i}`);
    assert.equal(s.committer, u.committer, `committer ${i}`);
    assert.ok(s.committer.startsWith(`${BOT.name} <`), `committer ${i} is the queue identity`);
    assert.equal(s.message, u.message, `message ${i}`);
    assert.equal(verify(git, keys, s.id, publicKey).code, 0, `verify-commit ${i}`);
    assert.notEqual(verify(git, keys, u.id, publicKey).code, 0, `unsigned ${i} does not verify`);
  }
  // Up to its own (signed) first parent, the first commit is byte for byte the unsigned one.
  assert.equal(withoutSignature(sealed[0].raw), plain[0].raw);

  // Another key does not verify it: the check reads the signature, not just its presence.
  const other = makeKey(keys, "other-key");
  assert.notEqual(verify(git, keys, signed.candidateSha, other.publicKey).code, 0);

  // The key path never shows in the git log lines or the result.
  for (const line of composeLogs) {
    assert.ok(!line.includes(keys), `log line names the key: ${line}`);
  }
  assert.ok(!JSON.stringify(signed).includes(keys));
});

test("signing: everything that re-reads a candidate reads a signed one exactly as an unsigned one", (t) => {
  if (UNAVAILABLE) return t.skip(UNAVAILABLE);
  const { sb, git, keys } = setup(t);
  const { keyPath } = makeKey(keys);
  const prs = publish(sb);
  const baseSha = sb.baseSha();
  const unsigned = compose(git, prs);
  const signed = compose(git, prs, { keyPath });
  for (const res of [unsigned, signed]) {
    assert.deepEqual(
      verifyComposition({
        git,
        expectedBaseSha: baseSha,
        candidateSha: res.candidateSha,
        prs,
        treeSha: res.treeSha,
        trees: true,
      }),
      { ok: true }
    );
    assert.deepEqual(mergedPrsBetween(git, baseSha, res.candidateSha), [11, 12, 13]);
    const message = scratchGit(git).out(["log", "-1", "--format=%B", res.candidateSha]);
    assert.deepEqual(resolveCandidateBase({ message, headSha: res.candidateSha }), {
      baseSha,
      target: BASE,
      source: "trailer",
    });
    const map = queuePrByCommit({
      runGit: (args) => scratchGit(git).out(args),
      range: `${baseSha}..${res.candidateSha}`,
    });
    assert.deepEqual(
      prs.map((pr) => map.get(pr.head)?.pr),
      [11, 12, 13]
    );
  }
});

test("signing: a signed commit with another tree, parents or trailers is still refused", (t) => {
  if (UNAVAILABLE) return t.skip(UNAVAILABLE);
  const { sb, git, keys } = setup(t);
  const { keyPath } = makeKey(keys);
  const prs = publish(sb).slice(0, 1);
  const baseSha = sb.baseSha();
  const good = compose(git, prs, { keyPath });
  const [merge] = chain(git, baseSha, good.candidateSha);
  const g = scratchGit(git);
  const sign = (args, input) =>
    g.out(
      [
        "-c",
        "gpg.format=ssh",
        "-c",
        `user.signingkey=${keyPath}`,
        "commit-tree",
        "-S",
        ...args,
        "-F",
        "-",
      ],
      { input }
    );
  const baseTree = g.out(["rev-parse", `${baseSha}^{tree}`]);
  const forged = {
    // same parents and message, the base's tree: what lands would not be what was merged
    tree: sign([baseTree, "-p", baseSha, "-p", prs[0].head], `${merge.message}\n`),
    // same tree and message, a single parent: not a queue merge commit
    parents: sign([merge.tree, "-p", baseSha], `${merge.message}\n`),
    // same tree and parents, trailers naming another base
    message: sign(
      [merge.tree, "-p", baseSha, "-p", prs[0].head],
      `${merge.message.replace(baseSha, prs[0].head)}\n`
    ),
  };
  for (const [what, sha] of Object.entries(forged)) {
    const verdict = verifyComposition({
      git,
      expectedBaseSha: baseSha,
      candidateSha: sha,
      prs,
      trees: true,
    });
    assert.equal(verdict.ok, false, `a signed commit with another ${what} is refused`);
  }
});

test("signing: a missing key composes unsigned, names the cause, and never the path", (t) => {
  // No ssh-keygen needed: nothing is signed.
  const { sb, git, keys } = setup(t);
  const prs = publish(sb);
  const missing = join(keys, "no-such-key");
  const unsigned = compose(git, prs);
  const degraded = compose(git, prs, { keyPath: missing });
  assert.equal(degraded.candidateSha, unsigned.candidateSha, "exactly the unsigned composition");
  assert.deepEqual(degraded.signing, { signed: 0, unsigned: 3, cause: SIGNING_KEY_MISSING_CAUSE });
  assert.ok(!degraded.signing.cause.includes(keys));
  const none = compose(git, prs, { keyPath: null });
  assert.equal(none.candidateSha, unsigned.candidateSha);
  assert.deepEqual(none.signing, { signed: 0, unsigned: 3, cause: SIGNING_KEY_MISSING_CAUSE });
});

test("signing: a key git cannot sign with composes unsigned and says so, without the path", (t) => {
  if (UNAVAILABLE) return t.skip(UNAVAILABLE);
  const { sb, git, keys, logs } = setup(t);
  const bad = join(keys, "not-a-key");
  writeFileSync(bad, "this is not an ssh private key\n", { mode: 0o600 });
  const prs = publish(sb);
  const unsigned = compose(git, prs);
  const degraded = compose(git, prs, { keyPath: bad });
  assert.equal(degraded.candidateSha, unsigned.candidateSha, "exactly the unsigned composition");
  assert.equal(degraded.signing.signed, 0);
  assert.equal(degraded.signing.unsigned, 3);
  assert.match(degraded.signing.cause, /^git could not sign a merge commit \(exit \d+\)$/);
  for (const line of logs) assert.ok(!line.includes(keys), `log line names the key: ${line}`);
});

test("signingKeyPath: the file the workflow writes under RUNNER_TEMP, null without it", () => {
  assert.equal(signingKeyPath("/runner/_temp"), "/runner/_temp/omni-queue-signing/signing-key");
  assert.equal(signingKeyPath(""), null);
  assert.equal(signingKeyPath(undefined), null);
});
