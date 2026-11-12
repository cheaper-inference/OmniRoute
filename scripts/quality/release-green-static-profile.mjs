import { readFileSync } from "node:fs";
import { join } from "node:path";
import { load as parseYaml } from "js-yaml";
import { execFileSync } from "node:child_process";
import { assertUiCandidateUnchanged, resolveUiDiffBase } from "../i18n/resolve-ui-diff-base.mjs";

const UI_DIFFERENTIAL_GATES = new Set([
  "i18n:check-value-drift",
  "i18n:check-new-keys",
  "i18n:check-ui-references",
]);
const IMMUTABLE_SHA = /^[0-9a-f]{40}$/;

function testMaskingGit(root, args) {
  try {
    return execFileSync("git", ["-c", "protocol.allow=never", ...args], {
      cwd: root,
      encoding: "utf8",
      timeout: 30000,
      maxBuffer: 4096,
      stdio: ["ignore", "pipe", "pipe"],
      env: {
        ...process.env,
        GIT_ALLOW_PROTOCOL: "",
        GIT_NO_LAZY_FETCH: "1",
        GIT_OPTIONAL_LOCKS: "0",
      },
    }).trim();
  } catch {
    throw new Error("Cannot resolve test-masking comparison from local Git objects");
  }
}

function assertTestMaskingSha(value) {
  if (typeof value !== "string" || !IMMUTABLE_SHA.test(value) || /^0+$/.test(value)) {
    throw new Error("Test-masking comparison requires an immutable base SHA");
  }
  return value;
}

/** Resolve the test-masking base once, independently of the observer's i18n base. */
export function resolveTestMaskingBase(root, argv = []) {
  const flag = "--test-masking-base-sha";
  if (argv.some((arg) => arg.startsWith("--test-masking") && arg !== flag)) {
    throw new Error("Unknown observer test-masking argument or unsupported syntax");
  }
  const positions = argv.flatMap((arg, index) => (arg === flag ? [index] : []));
  if (positions.length > 1) throw new Error("Repeated observer test-masking base SHA");
  const explicit = positions.length ? assertTestMaskingSha(argv[positions[0] + 1]) : null;
  const base = assertTestMaskingSha(
    testMaskingGit(root, [
      "rev-parse",
      "--verify",
      "--end-of-options",
      `${explicit || "refs/remotes/origin/main"}^{commit}`,
    ])
  );
  if (explicit && base !== explicit)
    throw new Error("Test-masking base SHA did not resolve exactly");
  testMaskingGateEnv(root, base);
  return base;
}

/** Validate retained objects without resolving a moving ref or performing a fetch. */
export function testMaskingGateEnv(root, baseSha) {
  assertTestMaskingSha(baseSha);
  const resolved = testMaskingGit(root, [
    "rev-parse",
    "--verify",
    "--end-of-options",
    `${baseSha}^{commit}`,
  ]);
  if (resolved !== baseSha) throw new Error("Pinned test-masking base is unavailable");
  // The gate's three-dot diff must have usable local ancestry; its internal Git helper
  // otherwise turns an unavailable merge base into an empty comparison.
  assertTestMaskingSha(testMaskingGit(root, ["merge-base", "--all", baseSha, "HEAD"]));
  return {
    GITHUB_BASE_SHA: baseSha,
    GITHUB_BASE_REF: "",
    GIT_ALLOW_PROTOCOL: "",
    GIT_NO_LAZY_FETCH: "1",
  };
}

/** Validate a versioned argv inventory; workflow shell is inspected, never executed or expanded. */
export function validateFullCiProfile(profile, scripts, ci, quality) {
  if (
    profile?.schemaVersion !== 1 ||
    !Array.isArray(profile.gates) ||
    !profile.gates.length ||
    !Array.isArray(profile.sourceJobs) ||
    !Array.isArray(profile.exclusions)
  ) {
    throw new Error("Invalid full static profile");
  }
  const ids = new Set();
  const aliases = new Set();
  for (const gate of profile.gates) {
    if (
      !gate?.id ||
      ids.has(gate.id) ||
      !["hard", "drift"].includes(gate.kind) ||
      (gate.comparison !== undefined && gate.comparison !== "ui-differential") ||
      UI_DIFFERENTIAL_GATES.has(gate.id) !== (gate.comparison === "ui-differential") ||
      !Array.isArray(gate.args) ||
      gate.args.length < 2 ||
      gate.args[0] !== "run" ||
      gate.args.some((arg) => typeof arg !== "string" || /[\$`\n\r]/.test(arg)) ||
      !scripts[gate.args[1]] ||
      scripts[gate.args[1]] !== gate.command ||
      gate.args.some((arg) => /^(?:--update|--fix|--write)(?:=|$)/.test(arg)) ||
      (gate.env &&
        Object.values(gate.env).some(
          (value) => typeof value !== "string" || /[\$`\n\r]/.test(value)
        ))
    ) {
      throw new Error(`Invalid or stale full static gate: ${gate?.id}`);
    }
    ids.add(gate.id);
    aliases.add(gate.args[1]);
  }
  const excluded = new Set();
  for (const exclusion of profile.exclusions) {
    if (!exclusion.alias || !exclusion.reason || aliases.has(exclusion.alias)) {
      throw new Error("Invalid full static exclusion");
    }
    excluded.add(exclusion.alias);
  }
  // This is a coverage alarm only. The executable arguments come exclusively from
  // the reviewed manifest. A newly added direct npm gate must be modeled explicitly.
  const workflow = parseYaml(ci);
  for (const job of profile.sourceJobs) {
    if (!Array.isArray(workflow?.jobs?.[job]?.steps)) throw new Error(`Missing source job: ${job}`);
    for (const step of workflow.jobs[job].steps) {
      for (const match of String(step.run || "").matchAll(/\bnpm run ([a-z][\w:-]*)/g)) {
        const alias = match[1];
        if (!aliases.has(alias) && !excluded.has(alias)) {
          throw new Error(`Unmodeled workflow command: ${job}/${alias}`);
        }
      }
    }
  }
  if (quality) {
    const qualityWorkflow = parseYaml(quality);
    let arrays = 0;
    for (const job of Object.values(qualityWorkflow.jobs || {})) {
      for (const step of job.steps || []) {
        for (const match of String(step.run || "").matchAll(
          /(?:^|\n)\s*(?:gates|ratchet_gates)=\(([\s\S]*?)\n\s*\)/g
        )) {
          arrays++;
          for (const name of match[1]
            .replace(/#[^\n]*/g, "")
            .trim()
            .split(/\s+/)) {
            if (!aliases.has(`check:${name}`) && !excluded.has(`check:${name}`)) {
              throw new Error(`Unmodeled quality gate: check:${name}`);
            }
          }
        }
      }
    }
    if (arrays !== 2)
      throw new Error("Quality gate declarations changed; reconcile the static profile");
  }
  return profile.gates.map(({ id, job, args, env, kind, comparison }) => ({
    id,
    job,
    args,
    env,
    kind,
    comparison,
  }));
}

/** Bind the observer's selected application checkout, which may differ from workflow SHA. */
export function resolveFullCiComparison(root, argv, env = process.env) {
  const allowed = new Set(["--i18n-base-sha", "--i18n-candidate-sha", "--i18n-scope"]);
  if (argv.some((arg) => arg.startsWith("--i18n-") && !allowed.has(arg))) {
    throw new Error("Unknown observer i18n comparison argument or unsupported syntax");
  }
  const readArg = (name) => {
    const positions = argv.flatMap((arg, index) => (arg === name ? [index] : []));
    if (positions.length > 1) throw new Error("Repeated i18n comparison argument: " + name);
    if (!positions.length) return null;
    const value = argv[positions[0] + 1];
    if (!value || value.startsWith("--"))
      throw new Error("Missing i18n comparison argument: " + name);
    return value;
  };
  const baseSha = readArg("--i18n-base-sha");
  const candidateSha = readArg("--i18n-candidate-sha");
  const requestedScope = readArg("--i18n-scope");
  if (!baseSha && !candidateSha && !requestedScope) return resolveUiDiffBase({ cwd: root, env });
  if (!baseSha || !candidateSha)
    throw new Error("Observer i18n comparison requires both immutable SHAs");
  const scope = requestedScope || "candidate";
  if (!["candidate", "push-range", "last-commit"].includes(scope)) {
    throw new Error("Unknown observer i18n comparison scope");
  }
  if (![baseSha, candidateSha].every((sha) => /^[0-9a-f]{40}$/.test(sha) && !/^0+$/.test(sha))) {
    throw new Error("Observer comparison flags require immutable SHAs");
  }
  // Candidate scope accepts the pinned base tip, just like PR events and BASE_REF.
  // A base that advanced independently must not contribute unrelated changes.
  const comparison =
    scope === "candidate"
      ? resolveUiDiffBase({ cwd: root, env: { BASE_REF: baseSha } })
      : resolveUiDiffBase({
          cwd: root,
          env: {
            I18N_BASE_SHA: baseSha,
            I18N_CANDIDATE_SHA: candidateSha,
            I18N_COMPARISON_SOURCE: "release-green:explicit",
            I18N_COMPARISON_SCOPE: scope,
          },
        });
  if (comparison.candidateSha !== candidateSha) {
    throw new Error("Observer i18n candidate does not match checkout");
  }
  comparison.source = "release-green:explicit";
  comparison.scope = scope;
  if (scope === "last-commit") {
    const parent = execFileSync("git", ["rev-parse", "--verify", candidateSha + "^1"], {
      cwd: root,
      encoding: "utf8",
      timeout: 30000,
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
    if (parent !== baseSha)
      throw new Error("Last-commit comparison must use the candidate first parent");
  }
  assertUiCandidateUnchanged(root, comparison.candidateSha);
  return comparison;
}

export function loadFullCiProfile(root, { comparison, testMaskingBaseSha } = {}) {
  const read = (path) => readFileSync(join(root, path), "utf8");
  const gates = validateFullCiProfile(
    JSON.parse(read("config/quality/release-green-static-profile.json")),
    JSON.parse(read("package.json")).scripts,
    read(".github/workflows/ci.yml"),
    read(".github/workflows/quality.yml")
  );
  let uiComparison;
  if (gates.some((gate) => gate.comparison === "ui-differential")) {
    if (!comparison) throw new Error("Missing observer i18n comparison");
    uiComparison = resolveUiDiffBase({
      cwd: root,
      env: {
        I18N_BASE_SHA: comparison.baseSha,
        I18N_BASE_TIP_SHA: comparison.baseTipSha,
        I18N_CANDIDATE_SHA: comparison.candidateSha,
        I18N_COMPARISON_SOURCE: comparison.source,
        I18N_COMPARISON_SCOPE: comparison.scope,
      },
    });
  }
  for (const gate of gates) {
    if (gate.comparison === "ui-differential") {
      gate.env = {
        ...gate.env,
        I18N_BASE_SHA: uiComparison.baseSha,
        I18N_BASE_TIP_SHA: uiComparison.baseTipSha,
        I18N_CANDIDATE_SHA: uiComparison.candidateSha,
        I18N_COMPARISON_SOURCE: uiComparison.source,
        I18N_COMPARISON_SCOPE: uiComparison.scope,
      };
    }
    if (gate.id === "check:test-masking") {
      gate.env = { ...gate.env, ...testMaskingGateEnv(root, testMaskingBaseSha) };
    } else if (gate.env?.GITHUB_BASE_REF) {
      const base = execFileSync(
        "git",
        ["rev-parse", "--verify", `origin/${gate.env.GITHUB_BASE_REF}^{commit}`],
        {
          cwd: root,
          encoding: "utf8",
          timeout: 30000,
        }
      ).trim();
      gate.env = { GITHUB_BASE_SHA: base };
    }
  }
  if (uiComparison) assertUiCandidateUnchanged(root, uiComparison.candidateSha);
  return gates;
}

/** A successful wrapper cannot turn unavailable scanner evidence into a measurement. */
export function staticGateOutcome(code, output, executionOutcome = code === 0 ? "PASS" : "FAIL") {
  const text = String(output);
  const structuredIncomplete = [text, ...text.split("\n")].some((line) => {
    try {
      const value = JSON.parse(line);
      return value?.incomplete === true || value?.skipped === true;
    } catch {
      return false;
    }
  });
  const incomplete =
    !["PASS", "FAIL"].includes(executionOutcome) ||
    /\b[\w.]+=(?:SKIP|INCOMPLETE)\b/.test(text) ||
    /^\[i18n-(?:value-drift|new-keys|differential)\]\s+(?:INCOMPLETE|SKIP)\b/m.test(text) ||
    structuredIncomplete;
  return { ok: code === 0 && !incomplete, evidenceState: incomplete ? "INCOMPLETE" : "COMPLETE" };
}
