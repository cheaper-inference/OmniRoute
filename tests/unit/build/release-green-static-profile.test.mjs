import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  firstFailureLine,
  fullCiKindFor,
} from "../../../scripts/quality/validate-release-green.mjs";
import {
  loadFullCiProfile,
  validateFullCiProfile,
  staticGateOutcome,
} from "../../../scripts/quality/release-green-static-profile.mjs";
import { createReleaseGreenProfileFixture } from "../../_helpers/releaseGreenProfileFixture.mjs";

const root = fileURLToPath(new URL("../../../", import.meta.url));

test("full static requirements include audit, mutation and translation drift", (t) => {
  const fixture = createReleaseGreenProfileFixture(t, root);
  const gates = loadFullCiProfile(fixture.root, {
    comparison: {
      baseSha: fixture.baseSha,
      baseTipSha: fixture.baseSha,
      candidateSha: fixture.headSha,
      source: "fixture",
      scope: "candidate",
    },
  });
  for (const id of [
    "audit:deps",
    "check:mutation-test-coverage",
    "i18n:check",
    "check:ui-icu",
    "i18n:check-keys:cli",
    "check:test-tla-order",
  ]) {
    assert.ok(
      gates.some((gate) => gate.id === id),
      `${id} must have an execution receipt`
    );
  }
  assert.ok(
    gates.every((gate) => gate.args.every((arg) => !/[\$`]/.test(arg))),
    "no unevaluated shell values reach spawn"
  );
});

test("a failing Node summary wins over stderr from a passing error fixture", () => {
  const out =
    "stderr | fixture\nError: expected provider failure\n✔ fixture passes\nℹ failing tests:\ntest at tests/unit/real.test.ts:4:1\n✖ actual broken contract (10ms)\n  AssertionError: mismatch";
  assert.equal(firstFailureLine(out), "✖ actual broken contract (10ms)");
});

test("a failing Vitest summary wins over expected Error messages", () => {
  const out =
    "stderr | passing fixture\nError: simulated failure\n ✓ fixture.test.ts (1 test)\n⎯⎯⎯ Failed Tests 1 ⎯⎯⎯\n FAIL  tests/unit/ui/real.test.tsx > restores the selection\nAssertionError: expected value";
  assert.equal(firstFailureLine(out), "FAIL  tests/unit/ui/real.test.tsx > restores the selection");
});

test("ANSI formatting cannot hide a terminal failing test", () => {
  assert.equal(
    firstFailureLine("Error: expected fixture\n\u001b[31m✖ actual assertion\u001b[0m"),
    "✖ actual assertion"
  );
});

function input() {
  return {
    profile: JSON.parse(
      readFileSync(`${root}/config/quality/release-green-static-profile.json`, "utf8")
    ),
    scripts: JSON.parse(readFileSync(`${root}/package.json`, "utf8")).scripts,
    ci: readFileSync(`${root}/.github/workflows/ci.yml`, "utf8"),
    quality: readFileSync(`${root}/.github/workflows/quality.yml`, "utf8"),
  };
}

test("a new CI requirement cannot silently disappear from the profile", () => {
  const f = input();
  f.ci = f.ci.replace(
    "- run: npm run audit:deps",
    "- run: npm run audit:deps\n      - run: npm run check:new-requirement"
  );
  assert.throws(
    () => validateFullCiProfile(f.profile, f.scripts, f.ci, f.quality),
    /Unmodeled.*check:new-requirement/
  );
});

test("a new Quality array requirement must be reconciled explicitly", () => {
  const f = input();
  f.quality = f.quality.replace("gates=(", "gates=(\n            new-requirement");
  assert.throws(
    () => validateFullCiProfile(f.profile, f.scripts, f.ci, f.quality),
    /Unmodeled quality gate/
  );
});

for (const mutation of [
  (p) => p.gates.push(p.gates[0]),
  (p) => p.gates[0].args.push('"$PR_BASE_SHA"'),
  (p) => p.gates[0].args.push("--update"),
  (p) => (p.gates[0].command = "node another-script.mjs"),
]) {
  test("invalid, mutating or stale execution entries are rejected", () => {
    const f = input();
    mutation(f.profile);
    assert.throws(
      () => validateFullCiProfile(f.profile, f.scripts, f.ci, f.quality),
      /Invalid or stale/
    );
  });
}

test("only completed required measurements can pass", () => {
  assert.deepEqual(staticGateOutcome(0, "vulnCount=SKIP reason=binary-absent"), {
    ok: false,
    evidenceState: "INCOMPLETE",
  });
  assert.deepEqual(staticGateOutcome(0, "workflowFindings=INCOMPLETE"), {
    ok: false,
    evidenceState: "INCOMPLETE",
  });
  assert.equal(staticGateOutcome(1, "vulnCount=0").ok, false);
  assert.deepEqual(staticGateOutcome(0, "vulnCount=0"), { ok: true, evidenceState: "COMPLETE" });
});

test("an interrupted static process never has complete measurement evidence", () => {
  for (const executionOutcome of ["TIMEOUT", "CANCELLED", "SPAWN_ERROR", "SIGNAL", "UNKNOWN"]) {
    assert.deepEqual(staticGateOutcome(0, "cached summary: pass", executionOutcome), {
      ok: false,
      evidenceState: "INCOMPLETE",
    });
    assert.deepEqual(staticGateOutcome(1, "Gate execution failed", executionOutcome), {
      ok: false,
      evidenceState: "INCOMPLETE",
    });
  }
  assert.deepEqual(staticGateOutcome(1, "policy violation", "FAIL"), {
    ok: false,
    evidenceState: "COMPLETE",
  });
});

test("the real profile has executable absolute boundary arguments", (t) => {
  const fixture = createReleaseGreenProfileFixture(t, root);
  const gate = loadFullCiProfile(fixture.root, {
    comparison: {
      baseSha: fixture.baseSha,
      baseTipSha: fixture.baseSha,
      candidateSha: fixture.headSha,
      source: "fixture",
      scope: "candidate",
    },
  }).find((g) => g.id === "check:boundary:ratchet");
  assert.deepEqual(gate.args, ["run", "check:boundary:ratchet"]);
});

test("declared required policy cannot be weakened by an old curated drift bucket", () => {
  assert.equal(
    fullCiKindFor("check:workflows", [{ id: "workflow-lint", kind: "drift" }], "hard"),
    "hard"
  );
  assert.equal(fullCiKindFor("check:circular-deps", [], "drift"), "drift");
});

test("test-masking receives a fixed base SHA in the full profile", (t) => {
  const fixture = createReleaseGreenProfileFixture(t, root);
  const gate = loadFullCiProfile(fixture.root, {
    comparison: {
      baseSha: fixture.baseSha,
      baseTipSha: fixture.baseSha,
      candidateSha: fixture.headSha,
      source: "fixture",
      scope: "candidate",
    },
  }).find((g) => g.id === "check:test-masking");
  assert.match(gate.env.GITHUB_BASE_SHA, /^[0-9a-f]{40}$/);
  assert.equal(gate.env.GITHUB_BASE_SHA, fixture.baseSha);
  assert.notEqual(gate.env.GITHUB_BASE_SHA, fixture.headSha);
  assert.equal(gate.env.GITHUB_BASE_REF, undefined);
});

test("the full profile rejects a checkout without the required base ref", (t) => {
  const fixture = createReleaseGreenProfileFixture(t, root, { withBase: false });
  assert.throws(
    () =>
      loadFullCiProfile(fixture.root, {
        comparison: {
          baseSha: fixture.baseSha,
          baseTipSha: fixture.baseSha,
          candidateSha: fixture.headSha,
          source: "fixture",
          scope: "candidate",
        },
      }),
    {
      status: 128,
      message: /origin\/main/,
    }
  );
});
