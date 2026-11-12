#!/usr/bin/env node
import { createHash } from "node:crypto";
import { existsSync, lstatSync, readFileSync, realpathSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const TEMPLATES = fileURLToPath(new URL("../../config/quality/skill-templates/", import.meta.url));
const CONTRACTS = [
  "quality-scan/SKILL.md",
  "validate-release-green/SKILL.md",
  "_shared/base-green.md",
  "green-prs/SKILL.md",
  "sweep-reds/SKILL.md",
  "merge-prs/SKILL.md",
  "merge-batch/SKILL.md",
  "i18n-waves/SKILL.md",
  "i18n-waves/scripts/bootstrap.sh",
  "i18n-waves/scripts/wave.sh",
  "i18n-waves/scripts/resolve_state_merge.py",
  "_shared/merge-gates.md",
  "_shared/validation-gate.md",
  "_shared/protected-surfaces.md",
  "_shared/credit-preservation.md",
];

export function inspectSkillContracts(root, templates = TEMPLATES) {
  if (!existsSync(root)) return { ok: false, status: "NOT_INSTALLED", files: [] };
  const files = CONTRACTS.map((path) => {
    const installed = resolve(root, path);
    const expected = readFileSync(resolve(templates, path), "utf8");
    const status = !existsSync(installed)
      ? "MISSING"
      : readFileSync(installed, "utf8") === expected
        ? "MATCH"
        : "DRIFT";
    return { path, status };
  });
  const ok = files.every((file) => file.status === "MATCH");
  return { ok, status: ok ? "MATCH" : "INCOMPLETE", files };
}

const CALLER_POLICY = fileURLToPath(
  new URL("../../config/quality/skill-callers.json", import.meta.url)
);
const CALLERS = [
  "_shared/i18n-translate-new-keys.md",
  "i18n-waves/references/scope-map.md",
  "implement-features/SKILL.md",
  "uplift-prs/scripts/fill_missing_i18n.py",
  "generate-release/phases/phase-0-preflight.md",
];
const OVERLAY_PATH = "skill-caller-overlays/i18n-explicit-base.patch";
const sha256 = (data) => createHash("sha256").update(data).digest("hex");
const validHash = (value) => typeof value === "string" && /^[a-f0-9]{64}$/.test(value);

// These fingerprints bind only the reviewed overlay and detect later drift. They
// do not turn the surrounding legacy skill into a canonical, fully reviewed template.
export function inspectSkillCallers(root, policyPath = CALLER_POLICY) {
  if (!existsSync(root)) return { ok: false, status: "NOT_INSTALLED", files: [] };
  let policy;
  try {
    policy = JSON.parse(readFileSync(policyPath, "utf8"));
    if (
      policy?.schemaVersion !== 1 ||
      policy.scope !== "i18n-explicit-comparison-callers" ||
      !Array.isArray(policy.files) ||
      policy.files.length !== CALLERS.length ||
      new Set(policy.files.map((file) => file?.path)).size !== CALLERS.length ||
      policy.files.some(
        (file) =>
          !CALLERS.includes(file?.path) ||
          !validHash(file.beforeSha256) ||
          !validHash(file.afterSha256)
      ) ||
      policy.overlay?.path !== OVERLAY_PATH ||
      !validHash(policy.overlay.sha256) ||
      sha256(readFileSync(resolve(dirname(policyPath), OVERLAY_PATH))) !== policy.overlay.sha256
    ) {
      throw new Error("Invalid caller contract");
    }
  } catch {
    return {
      ok: false,
      status: "INCOMPLETE",
      reason: "Invalid or unavailable caller contract/overlay",
      files: [],
    };
  }
  const files = policy.files.map(({ path, afterSha256 }) => {
    let status;
    try {
      let cursor = resolve(root);
      if (!lstatSync(cursor).isDirectory() || lstatSync(cursor).isSymbolicLink()) {
        throw new Error("Invalid installation root");
      }
      const parts = path.split("/");
      for (let index = 0; index < parts.length; index++) {
        cursor = resolve(cursor, parts[index]);
        const stat = lstatSync(cursor);
        if (
          stat.isSymbolicLink() ||
          !(index === parts.length - 1 ? stat.isFile() : stat.isDirectory())
        ) {
          throw new Error("Invalid installed caller");
        }
      }
      status = sha256(readFileSync(cursor)) === afterSha256 ? "MATCH" : "DRIFT";
    } catch (error) {
      status = error.code === "ENOENT" ? "MISSING" : "INVALID";
    }
    return { path, status, contract: "reviewed-overlay" };
  });
  const ok = files.every((file) => file.status === "MATCH");
  return { ok, status: ok ? "MATCH" : "INCOMPLETE", files };
}

const RELEASE_CALLER_POLICY = fileURLToPath(
  new URL("../../config/quality/release-skill-callers.json", import.meta.url)
);
const RELEASE_CALLERS = [
  "generate-release/SKILL.md",
  "generate-release/phases/candidate-admission.md",
  "generate-release/phases/phase-0a-reconciliation.md",
  "generate-release/phases/phase-5-next-cycle.md",
  "version-bump/SKILL.md",
];
const RELEASE_OVERLAY_PATH = "skill-caller-overlays/release-cut-bump.patch";
const MERGE_CALLER_POLICY = fileURLToPath(
  new URL("../../config/quality/merge-skill-callers.json", import.meta.url)
);
const MERGE_CALLERS = [
  "merge-waves/SKILL.md",
  "merge-waves/references/01-censo.md",
  "merge-waves/references/02-pregate.md",
  "merge-waves/references/03-board-validacao.md",
  "merge-waves/references/04-squash.md",
  "merge-waves/references/05-teardown-relato.md",
  "merge-waves/references/06-conserto-branch.md",
  "security-wave/SKILL.md",
  "security-wave/references/recipes-and-pitfalls.md",
  "omni-code-sec/SKILL.md",
  "omni-code-sec/rubric.md",
  "omni-code-review/rubric.md",
  "_shared/omni-review-core.md",
  "_shared/pr-rework-uplift.md",
  "security-wave/templates/worker-prompt.md",
  "uplift-prs/REWORK_RULES.md",
  "review-prs/SKILL.md",
  "review-group-prs/SKILL.md",
];

// Exact reviewed bytes detect instruction drift. MATCH does not certify GitHub
// admission, authorize publication, or review the unchanged legacy skill text.
export function inspectReleaseSkillCallers(root, policyPath = RELEASE_CALLER_POLICY) {
  return inspectReviewedCallers(root, policyPath, {
    scope: "release-cut-bump-admission-callers",
    paths: RELEASE_CALLERS,
    overlayPath: RELEASE_OVERLAY_PATH,
    newFile: "generate-release/phases/candidate-admission.md",
    label: "reviewed-release-overlay",
  });
}

export function inspectMergeSkillCallers(root, policyPath = MERGE_CALLER_POLICY) {
  return inspectReviewedCallers(root, policyPath, {
    scope: "merge-security-admission-callers",
    paths: MERGE_CALLERS,
    overlayPath: "skill-caller-overlays/merge-security-admission.patch",
    label: "reviewed-merge-security-overlay",
  });
}

function inspectReviewedCallers(root, policyPath, contract) {
  if (!existsSync(root)) return { ok: false, status: "NOT_INSTALLED", files: [] };
  let policy;
  try {
    policy = JSON.parse(readFileSync(policyPath, "utf8"));
    if (
      policy?.schemaVersion !== 1 ||
      policy.scope !== contract.scope ||
      !Array.isArray(policy.files) ||
      policy.files.length !== contract.paths.length ||
      new Set(policy.files.map((file) => file?.path)).size !== contract.paths.length ||
      policy.files.some(
        (file) =>
          !contract.paths.includes(file?.path) ||
          !(
            validHash(file.beforeSha256) ||
            (file.path === contract.newFile && file.beforeSha256 === null)
          ) ||
          !validHash(file.afterSha256)
      ) ||
      policy.overlay?.path !== contract.overlayPath ||
      !validHash(policy.overlay.sha256) ||
      sha256(readFileSync(resolve(dirname(policyPath), contract.overlayPath))) !==
        policy.overlay.sha256
    ) {
      throw new Error("Invalid reviewed caller contract");
    }
  } catch {
    return {
      ok: false,
      status: "INCOMPLETE",
      reason: "Invalid or unavailable reviewed caller contract/overlay",
      files: [],
    };
  }
  const files = policy.files.map(({ path, afterSha256 }) => {
    let status;
    try {
      let cursor = resolve(root);
      const rootStat = lstatSync(cursor);
      if (!rootStat.isDirectory() || rootStat.isSymbolicLink() || realpathSync(cursor) !== cursor) {
        throw new Error("Physical installation root required");
      }
      const parts = path.split("/");
      for (let index = 0; index < parts.length; index++) {
        cursor = resolve(cursor, parts[index]);
        const stat = lstatSync(cursor);
        if (
          stat.isSymbolicLink() ||
          !(index === parts.length - 1 ? stat.isFile() : stat.isDirectory())
        ) {
          throw new Error("Invalid installed reviewed caller");
        }
      }
      status = sha256(readFileSync(cursor)) === afterSha256 ? "MATCH" : "DRIFT";
    } catch (error) {
      status = error.code === "ENOENT" ? "MISSING" : "INVALID";
    }
    return { path, status, contract: contract.label };
  });
  const ok = files.every((file) => file.status === "MATCH");
  return { ok, status: ok ? "MATCH" : "INCOMPLETE", files };
}

export function inspectInstalledSkillContracts(root) {
  const templates = inspectSkillContracts(root);
  const callers = inspectSkillCallers(root);
  const releaseCallers = inspectReleaseSkillCallers(root);
  const mergeCallers = inspectMergeSkillCallers(root);
  const ok = templates.ok && callers.ok && releaseCallers.ok && mergeCallers.ok;
  return {
    ok,
    status: ok ? "MATCH" : templates.status === "NOT_INSTALLED" ? "NOT_INSTALLED" : "INCOMPLETE",
    installedRoot: resolve(root),
    files: [...templates.files, ...callers.files, ...releaseCallers.files, ...mergeCallers.files],
    scopes: { templates, callers, releaseCallers, mergeCallers },
  };
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  try {
    const result = inspectInstalledSkillContracts(process.argv[2] || resolve(".agents/skills"));
    console.log(JSON.stringify(result, null, 2));
    process.exitCode = result.ok ? 0 : 1;
  } catch (error) {
    console.error(`[quality-skill-contract] ${error.message}`);
    process.exitCode = 1;
  }
}
