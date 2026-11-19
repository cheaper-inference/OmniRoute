import assert from "node:assert/strict";
import test from "node:test";
import {
  ambiguous,
  divergent,
  expectStatus,
  overrideGitRead,
  fixture,
  sample,
  source,
} from "../_helpers/testMaskingGitFixture.mjs";

test("upstream-only assertions cannot reject a strengthened divergent candidate", (t) => {
  const repo = divergent(t);
  expectStatus(
    repo.run(repo.tip),
    0,
    "compare the candidate's three assertions with the common ancestor's two"
  );
});

test("upstream removal cannot hide a real candidate assertion removal", (t) => {
  const repo = divergent(t, { base: 4, upstream: 2, candidate: 3 });
  expectStatus(
    repo.run(repo.tip),
    1,
    "the candidate lost one of the common ancestor's four assertions"
  );
});

test("a missing explicit comparison object cannot become an empty successful diff", (t) => {
  const repo = divergent(t);
  expectStatus(repo.run("f".repeat(40)), 1, "the explicitly requested base is not available");
});

test("unrelated histories cannot produce successful comparison evidence", (t) => {
  const repo = fixture(t);
  const tip = repo.commit({ [sample]: source(2) }, "unrelated upstream");
  repo.git("switch", "--quiet", "--orphan", "candidate");
  repo.commit({ [sample]: source(3) }, "unrelated candidate");
  assert.throws(() => repo.git("merge-base", "--all", tip, "HEAD"));
  expectStatus(repo.run(tip), 1, "there is no common ancestor");
});

test("two best merge bases require a blocking ambiguity result", (t) => {
  const repo = ambiguous(t);
  expectStatus(repo.run(repo.tip), 1, "Git must not select an arbitrary best ancestor");
});

for (const command of ["ls-files", "diff", "show"]) {
  test(`a failed Git ${command} read cannot become an empty successful scan`, (t) => {
    const repo = divergent(t);
    const fault = overrideGitRead(repo, command);
    const result = repo.run(repo.fork, fault.env);
    fault.observed();
    expectStatus(result, 1, `injected ${command} failure must remain visible to the gate`);
  });
}

test("a tracked-path listing above one MiB still reaches the absolute tautology scan", (t) => {
  const repo = fixture(t);
  repo.commit(
    { [sample]: 'import assert from "node:assert/strict";\nassert.equal(1, 1);\n' },
    "tautology"
  );
  const listing =
    `${sample}\n` +
    Array.from(
      { length: 11000 },
      (_, index) => `docs/${String(index).padStart(5, "0")}-${"x".repeat(114)}\n`
    ).join("");
  assert.ok(Buffer.byteLength(listing) > 1024 * 1024);
  const largeListing = overrideGitRead(repo, "ls-files", listing);
  const result = repo.run(null, largeListing.env);
  largeListing.observed();
  expectStatus(
    result,
    1,
    "read the complete bounded listing rather than silently lose the floor scan"
  );
  assert.match(result.stderr, /tautologia/);
  assert.ok(result.stderr.includes(sample), result.stderr);
});

test("an approved mode-conditional helper remains report-only", (t) => {
  const repo = fixture(t);
  const base = repo.commit({ [sample]: source(2) }, "base");
  repo.commit({ [sample]: source(2, { modeSkip: true }) }, "approved conditional helper");
  const result = repo.run(base);
  expectStatus(result, 0);
  assert.match(result.stderr, /report-only/);
  assert.match(result.stderr, /releaseOnlyUnlessTouched/);
});

test("a Git listing above the explicit ceiling fails visibly instead of returning zero files", (t) => {
  const repo = fixture(t);
  repo.commit({ [sample]: source(2) }, "base");
  const listing = `docs/${"x".repeat(120)}\n`.repeat(140000);
  assert.ok(Buffer.byteLength(listing) > 16 * 1024 * 1024);
  const oversized = overrideGitRead(repo, "ls-files", listing);
  const result = repo.run(null, oversized.env);
  oversized.observed();
  expectStatus(result, 1);
  assert.match(result.stderr, /Git ls-files failed.*16 MiB/);
  assert.doesNotMatch(result.stdout, /\[test-masking\] OK|tautologias OK/);
});

test("relocation uses the same common ancestor and cannot hide a real assertion loss", (t) => {
  const repo = divergent(t);
  const moved = "tests/unit/relocated.spec.mjs";
  repo.git("mv", "--", sample, moved);
  repo.commit({}, "relocate strengthened candidate");
  expectStatus(repo.run(repo.tip), 0);
  repo.commit({ [moved]: source(1) }, "remove an ancestral assertion after relocation");
  const result = repo.run(repo.tip);
  expectStatus(result, 1);
  assert.ok(result.stderr.includes(moved), result.stderr);
});
