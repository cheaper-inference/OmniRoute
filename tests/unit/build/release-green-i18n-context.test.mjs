import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { load as parseYaml } from "js-yaml";
import { fileURLToPath } from "node:url";
import * as profile from "../../../scripts/quality/release-green-static-profile.mjs";
import { createReleaseGreenProfileFixture } from "../../_helpers/releaseGreenProfileFixture.mjs";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const comparisonFor = (fixture) => ({
  baseSha: fixture.baseSha,
  baseTipSha: fixture.baseSha,
  candidateSha: fixture.headSha,
  source: "release-green:explicit",
  scope: "candidate",
});

test("both UI aliases receive the same pinned observer pair, not a package-derived branch", (t) => {
  const fixture = createReleaseGreenProfileFixture(t, root);
  const comparison = comparisonFor(fixture);
  const gates = profile.loadFullCiProfile(fixture.root, { comparison });
  const ui = gates.filter((gate) =>
    ["i18n:check-value-drift", "i18n:check-new-keys"].includes(gate.id)
  );
  assert.equal(ui.length, 2);
  for (const gate of ui) {
    assert.equal(gate.env?.I18N_BASE_SHA, fixture.baseSha);
    assert.equal(gate.env?.I18N_CANDIDATE_SHA, fixture.headSha);
    assert.equal(gate.env?.I18N_COMPARISON_SCOPE, "candidate");
    assert.equal(gate.env?.BASE_REF, undefined);
  }
  assert.deepEqual(ui[0].env, ui[1].env);
});

test("missing or stale pinned observer comparison cannot execute the UI aliases", (t) => {
  const fixture = createReleaseGreenProfileFixture(t, root);
  assert.throws(() => profile.loadFullCiProfile(fixture.root), /comparison/);
  assert.throws(
    () =>
      profile.loadFullCiProfile(fixture.root, {
        comparison: { ...comparisonFor(fixture), candidateSha: fixture.baseSha },
      }),
    /match checkout/
  );
});

for (const [label, output] of [
  ["text", "[i18n-value-drift] INCOMPLETE: Missing local base reference\n"],
  ["new-key text", "[i18n-new-keys] INCOMPLETE: catalog unavailable\n"],
  ["JSON", '{"ok":false,"incomplete":true,"reason":"unavailable"}\n'],
  ["pretty JSON", JSON.stringify({ ok: false, incomplete: true }, null, 2)],
  ["JSON with npm banner", '> npm run gate\n{"ok":false,"incomplete":true}\n'],
]) {
  test("observer preserves INCOMPLETE from i18n " + label, () => {
    assert.deepEqual(profile.staticGateOutcome(2, output, "FAIL"), {
      ok: false,
      evidenceState: "INCOMPLETE",
    });
  });
}

test("a normal measured violation remains COMPLETE and incomplete prose is not a marker", () => {
  assert.deepEqual(
    profile.staticGateOutcome(1, "[i18n-value-drift] FAIL — stale translations detected.", "FAIL"),
    { ok: false, evidenceState: "COMPLETE" }
  );
  assert.deepEqual(profile.staticGateOutcome(0, "fixture covers INCOMPLETE errors", "PASS"), {
    ok: true,
    evidenceState: "COMPLETE",
  });
});

test("explicit observer argv validates a selected checkout independently of workflow checkout identity", (t) => {
  const fixture = createReleaseGreenProfileFixture(t, root);
  const resolved = profile.resolveFullCiComparison(
    fixture.root,
    [
      "--i18n-base-sha",
      fixture.baseSha,
      "--i18n-candidate-sha",
      fixture.headSha,
      "--i18n-scope",
      "last-commit",
    ],
    { GITHUB_EVENT_NAME: "workflow_dispatch", GITHUB_SHA: "a".repeat(40) }
  );
  assert.equal(resolved.baseSha, fixture.baseSha);
  assert.equal(resolved.candidateSha, fixture.headSha);
  assert.equal(resolved.scope, "last-commit");
});

test("an incomplete, repeated, unknown-scope or empty pair of observer flags is rejected", (t) => {
  const fixture = createReleaseGreenProfileFixture(t, root);
  for (const args of [
    ["--i18n-base-sha", fixture.baseSha],
    ["--i18n-base-sha=" + fixture.baseSha],
    [
      "--i18n-base-sha",
      fixture.baseSha,
      "--i18n-candidate-sha",
      fixture.headSha,
      "--i18n-scope",
      "global",
    ],
    ["--i18n-base-sha", fixture.baseSha, "--i18n-base-sha", fixture.baseSha],
    ["--i18n-base-sha", fixture.headSha, "--i18n-candidate-sha", fixture.headSha],
  ]) {
    assert.throws(() => profile.resolveFullCiComparison(fixture.root, args, {}));
  }
  assert.throws(() => profile.resolveFullCiComparison(fixture.root, [], {}), /Missing local base/);
});

test("a last-commit scope must actually use the selected candidate first parent", (t) => {
  const fixture = createReleaseGreenProfileFixture(t, root);
  const tree = execFileSync("git", ["rev-parse", fixture.headSha + "^{tree}"], {
    cwd: fixture.root,
    encoding: "utf8",
  }).trim();
  const third = execFileSync(
    "git",
    [
      "-c",
      "user.name=Fixture",
      "-c",
      "user.email=fixture@example.invalid",
      "commit-tree",
      tree,
      "-p",
      fixture.headSha,
      "-m",
      "third",
    ],
    {
      cwd: fixture.root,
      encoding: "utf8",
    }
  ).trim();
  execFileSync("git", ["update-ref", "--no-deref", "HEAD", third], { cwd: fixture.root });
  assert.throws(
    () =>
      profile.resolveFullCiComparison(
        fixture.root,
        [
          "--i18n-base-sha",
          fixture.baseSha,
          "--i18n-candidate-sha",
          third,
          "--i18n-scope",
          "last-commit",
        ],
        {}
      ),
    /first parent/
  );
});

test("both hosted observers pass the exact selected tip and its first parent with declared scope", () => {
  const workflow = parseYaml(
    readFileSync(root + "/.github/workflows/nightly-release-green.yml", "utf8")
  );
  const steps = Object.values(workflow.jobs)
    .flatMap((job) => job.steps || [])
    .filter((step) => String(step.run).includes("node scripts/quality/validate-release-green.mjs"));
  assert.equal(steps.length, 2);
  for (const step of steps) {
    assert.equal(step.env.VALIDATED_SHA, "${{ steps.revision.outputs.sha }}");
    assert.match(
      step.run,
      /# shellcheck disable=SC2086\nnode scripts\/quality\/validate-release-green\.mjs/
    );
    assert.ok(step.run.includes('git rev-parse --verify "${VALIDATED_SHA}^1"'));
    assert.ok(step.run.includes('--i18n-base-sha "$I18N_BASE_SHA"'));
    assert.ok(step.run.includes('--i18n-candidate-sha "$VALIDATED_SHA" --i18n-scope last-commit'));
  }
});

test("candidate scope uses common ancestry while push-range preserves the exact before tip", (t) => {
  const fixture = createReleaseGreenProfileFixture(t, root);
  const tree = execFileSync("git", ["rev-parse", fixture.baseSha + "^{tree}"], {
    cwd: fixture.root,
    encoding: "utf8",
  }).trim();
  const advancedBase = execFileSync(
    "git",
    [
      "-c",
      "user.name=Fixture",
      "-c",
      "user.email=fixture@example.invalid",
      "commit-tree",
      tree,
      "-p",
      fixture.baseSha,
      "-m",
      "advanced base",
    ],
    {
      cwd: fixture.root,
      encoding: "utf8",
    }
  ).trim();
  const argv = ["--i18n-base-sha", advancedBase, "--i18n-candidate-sha", fixture.headSha];
  const candidate = profile.resolveFullCiComparison(fixture.root, argv, {});
  assert.equal(candidate.baseSha, fixture.baseSha);
  assert.equal(candidate.baseTipSha, advancedBase);
  const push = profile.resolveFullCiComparison(
    fixture.root,
    [...argv, "--i18n-scope", "push-range"],
    {}
  );
  assert.equal(push.baseSha, advancedBase);
  assert.equal(push.baseTipSha, advancedBase);
});
