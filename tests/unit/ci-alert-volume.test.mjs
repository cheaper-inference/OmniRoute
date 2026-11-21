import test, { after } from "node:test";
import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { chmodSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { load } from "js-yaml";
import {
  PROOF_KEY,
  doc_code_parity,
  filtrerSansPreuve,
  preuvesDuDiff,
} from "../../scripts/check/check-doc-code-parity.mjs";

const ROOT = new URL("../..", import.meta.url).pathname;
const SCRIPT = join(ROOT, "scripts/quality/ci-alert-volume.sh");
const ALIASES = [
  "check:doc-code-parity",
  "check:identity-bounds",
  "check:functional-invariants",
  "check:ci-alert-volume",
];
const BASE_EXPR =
  "${{ needs.changes.outputs.candidateBase || github.event.pull_request.base.sha || github.event.merge_group.base_sha }}";

// A stub npm keeps the sequencer focused on its BASE guard and markers: the
// detector command bytes are checked separately against both registries.
const stubBin = mkdtempSync(join(tmpdir(), "npm-stub-"));
const stubNpm = join(stubBin, "npm");
writeFileSync(stubNpm, "#!/bin/sh\nexit 0\n");
chmodSync(stubNpm, 0o755);
after(() => rmSync(stubBin, { recursive: true, force: true }));

function scratchRepo(t) {
  const dir = mkdtempSync(join(tmpdir(), "ci-alert-volume-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const git = (...args) =>
    execFileSync("git", ["-C", dir, ...args], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  git("init", "-q");
  git("config", "user.email", "test@example.com");
  git("config", "user.name", "Test");
  writeFileSync(join(dir, "seed.txt"), "seed\n");
  git("add", "seed.txt");
  git("commit", "-qm", "seed");
  return { dir, git, base: git("rev-parse", "HEAD").trim() };
}

function runSequencer(dir, base) {
  return spawnSync("bash", [SCRIPT], {
    cwd: dir,
    encoding: "utf8",
    timeout: 30000,
    env: { ...process.env, BASE: base, PATH: `${stubBin}:${process.env.PATH}` },
  });
}

// --- BASE guards (RED without the script, GREEN with it) ---------------------

test("1. missing BASE -> rc=2 with an explicit message", (t) => {
  const { dir } = scratchRepo(t);
  const r = runSequencer(dir, "");
  assert.equal(r.status, 2);
  assert.match(r.stderr, /REJECTED: BASE is missing/);
  assert.doesNotMatch(r.stdout, /0 FAIL/);
});

test("2. unresolved BASE -> rc=2", (t) => {
  const { dir } = scratchRepo(t);
  const r = runSequencer(dir, "no-such-ref-1234");
  assert.equal(r.status, 2);
  assert.match(r.stderr, /does not resolve/);
});

test("3. clean tree with zero target -> rc=2", (t) => {
  const { dir, base } = scratchRepo(t);
  const r = runSequencer(dir, base);
  assert.equal(r.status, 2);
  assert.match(r.stderr, /yields 0 target/);
});

test("4. one modified tracked file -> three markers, rc=0", (t) => {
  const { dir, git, base } = scratchRepo(t);
  writeFileSync(join(dir, "seed.txt"), "seed changed\n");
  void git;
  const r = runSequencer(dir, base);
  assert.equal(r.status, 0, `${r.stdout}\n${r.stderr}`);
  assert.equal((r.stdout.match(/\[ci-alert-volume\]/g) || []).length, 3);
});

test("5. one added tracked file -> three markers, rc=0", (t) => {
  const { dir, git, base } = scratchRepo(t);
  writeFileSync(join(dir, "added.txt"), "added\n");
  git("add", "added.txt");
  const r = runSequencer(dir, base);
  assert.equal(r.status, 0, `${r.stdout}\n${r.stderr}`);
  assert.equal((r.stdout.match(/\[ci-alert-volume\]/g) || []).length, 3);
});

test("6. about 3000 added files -> no SIGPIPE, three markers", (t) => {
  const { dir, base } = scratchRepo(t);
  for (let i = 0; i < 3000; i++) writeFileSync(join(dir, `bulk-${i}.txt`), `${i}\n`);
  const r = runSequencer(dir, base);
  assert.equal(r.status, 0, `${r.stdout}\n${r.stderr}`);
  assert.equal((r.stdout.match(/\[ci-alert-volume\]/g) || []).length, 3);
});

// --- Registry configuration -------------------------------------------------

test("7. four aliases in both registries with identical commands", () => {
  const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
  const manifest = JSON.parse(
    readFileSync(join(ROOT, "config/quality/gate-manifest.json"), "utf8")
  );
  for (const name of ALIASES) {
    const entry = manifest.aliases.find((a) => a.name === name);
    assert.ok(entry, `manifest entry ${name}`);
    assert.equal(entry.command, pkg.scripts[name], `command parity ${name}`);
    assert.equal(entry.disposition, "pr-dependent", `disposition ${name}`);
  }
  assert.equal(manifest.aliases.length, 167);
});

test("8. no base-dependent alias is in any profile", () => {
  const manifest = JSON.parse(
    readFileSync(join(ROOT, "config/quality/gate-manifest.json"), "utf8")
  );
  for (const [name, profile] of Object.entries(manifest.profiles)) {
    for (const alias of ALIASES) {
      assert.equal(profile.aliases.includes(alias), false, `${name}/${alias}`);
    }
  }
});

test("9. ci.yml: BASE at step level, historical call intact", () => {
  const ci = load(readFileSync(join(ROOT, ".github/workflows/ci.yml"), "utf8"));
  const job = ci.jobs.lint;
  assert.equal(job.env?.BASE, undefined);
  const steps = job.steps;
  const seq = steps.find(
    (s) => typeof s.run === "string" && s.run.includes("check:ci-alert-volume")
  );
  assert.ok(seq, "sequencer step present");
  assert.equal(seq.if, "github.event_name == 'pull_request'");
  assert.equal(seq.env.BASE, BASE_EXPR);
  const historical = steps.filter(
    (s) => s.run === "npm run check:error-helper" && !s.if && !s.env?.BASE
  );
  assert.equal(historical.length, 1, "historical allowlist call unchanged");
});

test("10. pr-dependent is rejected in a profile and needs a workflow call", async () => {
  const { validateManifest } = await import(join(ROOT, "scripts/quality/gate-manifest.mjs"));
  const manifest = JSON.parse(
    readFileSync(join(ROOT, "config/quality/gate-manifest.json"), "utf8")
  );
  const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
  assert.deepEqual(validateManifest(manifest, pkg.scripts), []);
  const altered = structuredClone(manifest);
  altered.profiles["quality-scan"].aliases.push("check:ci-alert-volume");
  assert.match(
    validateManifest(altered, pkg.scripts).join(),
    /pr-dependent in scan.*check:ci-alert-volume/
  );
  assert.match(
    validateManifest(manifest, pkg.scripts, { workflowSources: ["- run: echo nothing"] }).join(),
    /not invoked by any workflow/
  );
});

// --- Diff-derived evidence --------------------------------------------------

test("11. diff evidence nominal: two verdicts proved by code -> no REJECTED", () => {
  const r = doc_code_parity({
    docs: [
      {
        file: "changelog.d/x.md",
        text: "preview returns rate_limit; failover returns quota_exhausted",
      },
    ],
    proofs: { code: "preview -> rate_limit; failover -> quota_exhausted" },
  });
  assert.equal(r.count.rejections, 0);
  assert.equal(r.ok, true);
});

test("12. diff evidence contradicted: agreement claim with two verdicts -> one named REJECTED", () => {
  const r = doc_code_parity({
    docs: [{ file: "changelog.d/x.md", text: "verdicts now agree" }],
    proofs: { code: "preview -> rate_limit; failover -> quota_exhausted" },
  });
  assert.equal(r.count.rejections, 1);
  assert.equal(r.rejections[0].predicate, "verdicts_alignes");
});

test("13. diff evidence without proof, singular key, and diff-only reading", (t) => {
  const docs = [{ file: "changelog.d/x.md", text: "verdicts now agree" }];
  const { withProof, noProof } = filtrerSansPreuve(docs, { code: "" });
  assert.equal(withProof.length, 0);
  assert.equal(noProof.length, 1);
  assert.equal(noProof[0].predicate, "verdicts_alignes");
  assert.equal(doc_code_parity({ docs: withProof, proofs: { code: "" } }).count.rejections, 0);
  assert.ok(Object.hasOwn(PROOF_KEY, "ecriture_transactionnelle"));
  assert.equal(Object.hasOwn(PROOF_KEY, "ecritures_transactionnelle"), false);

  const { dir, git } = scratchRepo(t);
  writeFileSync(join(dir, "outside.ts"), "OUT_OF_DIFF_SENTINEL\n");
  git("add", "outside.ts");
  git("commit", "-qm", "outside");
  const base = git("rev-parse", "HEAD").trim();
  writeFileSync(join(dir, "changed.ts"), "IN_DIFF_SENTINEL\n");
  const proofs = preuvesDuDiff(dir, base, [
    { file: "changelog.d/x.md", text: "See changed.ts:1 for the verdict" },
  ]);
  assert.match(proofs.code, /IN_DIFF_SENTINEL/);
  assert.doesNotMatch(proofs.code, /OUT_OF_DIFF_SENTINEL/);
});

test("14. ci.yml anchor is unique and the insertion is idempotent", () => {
  const ci = readFileSync(join(ROOT, ".github/workflows/ci.yml"), "utf8");
  const anchor = "      - run: npm run check:error-helper\n";
  assert.equal(ci.split(anchor).length - 1, 1);
  assert.equal(ci.split("npm run --silent check:ci-alert-volume").length - 1, 1);
});
