import assert from "node:assert/strict";
import test from "node:test";
import { expectStatus, fixture, source } from "../_helpers/testMaskingGitFixture.mjs";

for (const extension of ["js", "mjs"]) {
  const file = `tests/unit/sample.test.${extension}`;

  test(`${extension}: assertion removal is checked through the real CLI`, (t) => {
    const repo = fixture(t);
    const base = repo.commit({ [file]: source(3) }, "base");
    repo.commit({ [file]: source(2) }, "remove assertion");
    expectStatus(repo.run(base), 1, file);
    repo.commit({ [file]: source(4) }, "strengthen assertions");
    expectStatus(repo.run(base), 0, file);
  });

  test(`${extension}: test deletion is checked through the real CLI`, (t) => {
    const repo = fixture(t);
    const base = repo.commit({ [file]: source(3) }, "base");
    repo.git("rm", "--", file);
    repo.commit({ "notes.md": "Candidate note.\n" }, "remove test");
    const result = repo.run(base);
    expectStatus(result, 1, file);
    assert.ok((result.stdout + result.stderr).includes(file));
  });

  test(`${extension}: the absolute scan rejects tautologies and preserves self-test fixtures`, (t) => {
    const repo = fixture(t);
    repo.commit(
      { [file]: 'import assert from "node:assert/strict";\nassert.equal(1, 1);\n' },
      "tautology"
    );
    expectStatus(repo.run(null), 1, file);
    const selfFixture = `tests/unit/check-test-masking-example.test.${extension}`;
    repo.git("mv", "--", file, selfFixture);
    repo.commit({}, "move literal to the checker self-test fixture family");
    expectStatus(repo.run(null), 0, selfFixture);
  });

  test(`${extension}: a reviewed reduction does not waive skips or new tautologies`, (t) => {
    const repo = fixture(t);
    const allowlist = "config/quality/test-masking-allowlist.json";
    const reason = JSON.stringify({ [file]: "Fixture: reviewed assertion consolidation" });
    const base = repo.commit({ [file]: source(3), [allowlist]: reason }, "base");
    repo.commit({ [file]: source(2) }, "reviewed reduction");
    expectStatus(repo.run(base), 0);
    repo.commit({ [file]: source(2, { skip: true }) }, "new skipped test");
    expectStatus(repo.run(base), 1);
    repo.commit({ [file]: source(2) + "assert.ok(true);\n" }, "new tautology");
    expectStatus(repo.run(base), 1);
  });

  test(`${extension}: a deletion waiver still requires its declared replacement`, (t) => {
    const repo = fixture(t);
    const replacement = `tests/unit/replacement.spec.${extension}`;
    const base = repo.commit({ [file]: source(3) }, "base");
    repo.git("rm", "--", file);
    repo.commit(
      {
        [replacement]: 'import assert from "node:assert/strict";\nassert.equal(6 * 7, 42);\n',
        "config/quality/test-masking-allowlist.json": JSON.stringify({
          _deletedWithReplacement: {
            [file]: { replacement, reason: "Fixture: reviewed replacement coverage" },
          },
        }),
      },
      "replace the test"
    );
    expectStatus(repo.run(base), 0);
    repo.git("rm", "--", replacement);
    repo.commit({}, "remove the declared replacement");
    expectStatus(repo.run(base), 1);
  });
}
