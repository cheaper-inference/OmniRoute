import { readFileSync } from "node:fs";
import { join } from "node:path";
import { load as parseYaml } from "js-yaml";
import { execFileSync } from "node:child_process";

const IMMUTABLE_SHA = /^[0-9a-f]{40}$/;

function assertTestMaskingSha(value) {
  if (typeof value !== "string" || !IMMUTABLE_SHA.test(value) || /^0+$/.test(value)) {
    throw new Error("Test-masking comparison requires an immutable base SHA");
  }
  return value;
}

function testMaskingGit(root, args) {
  try {
    return execFileSync("git", args, {
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
  } catch (error) {
    throw new Error(
      `Cannot resolve test-masking comparison from local Git objects (${args[0]}: ${error.code ?? error.status ?? "unknown"})`
    );
  }
}

function immutableBaseEnv(baseSha) {
  return {
    GITHUB_BASE_SHA: assertTestMaskingSha(baseSha),
    GITHUB_BASE_REF: "",
    GIT_ALLOW_PROTOCOL: "",
    GIT_NO_LAZY_FETCH: "1",
  };
}

/** Validate retained local objects without consulting a moving ref or fetching. */
export function testMaskingGateEnv(root, baseSha) {
  assertTestMaskingSha(baseSha);
  const resolved = testMaskingGit(root, [
    "rev-parse",
    "--verify",
    "--end-of-options",
    `${baseSha}^{commit}`,
  ]);
  if (resolved !== baseSha) throw new Error("Pinned test-masking base did not resolve exactly");
  const mergeBases = testMaskingGit(root, ["merge-base", "--all", "--", baseSha, "HEAD"]).split(
    /\r?\n/
  );
  if (mergeBases.length !== 1 || !IMMUTABLE_SHA.test(mergeBases[0])) {
    throw new Error("Test-masking comparison needs one unique local merge base");
  }
  return immutableBaseEnv(baseSha);
}

/** Capture one immutable base before the observer executes any of its gates. */
export function resolveTestMaskingBase(root, argv = []) {
  const flag = "--test-masking-base-sha";
  if (argv.some((arg) => arg.startsWith("--test-masking") && arg !== flag)) {
    throw new Error("Unknown observer test-masking argument or unsupported syntax");
  }
  const positions = argv.flatMap((arg, index) => (arg === flag ? [index] : []));
  if (positions.length > 1) throw new Error("Repeated observer test-masking base SHA");
  if (!positions.length) return resolveOriginCommit(root, "main");
  const baseSha = assertTestMaskingSha(argv[positions[0] + 1]);
  testMaskingGateEnv(root, baseSha);
  return baseSha;
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
  return profile.gates.map(({ id, job, args, env, kind }) => ({ id, job, args, env, kind }));
}

/** Resolve and validate a local remote-tracking commit; never fetch a replacement. */
function resolveOriginCommit(root, ref) {
  const baseSha = assertTestMaskingSha(
    testMaskingGit(root, [
      "rev-parse",
      "--verify",
      "--end-of-options",
      `refs/remotes/origin/${ref}^{commit}`,
    ])
  );
  testMaskingGateEnv(root, baseSha);
  return baseSha;
}

/**
 * `resolveBaseSha(root, ref)` pins a gate's GITHUB_BASE_REF to a fixed SHA. It defaults to the
 * checkout's `origin/<ref>`; callers without that remote ref (a shallow CI checkout) inject it.
 */
export function loadFullCiProfile(root, resolveBaseSha = resolveOriginCommit) {
  const read = (path) => readFileSync(join(root, path), "utf8");
  const gates = validateFullCiProfile(
    JSON.parse(read("config/quality/release-green-static-profile.json")),
    JSON.parse(read("package.json")).scripts,
    read(".github/workflows/ci.yml"),
    read(".github/workflows/quality.yml")
  );
  for (const gate of gates) {
    if (gate.env?.GITHUB_BASE_REF) {
      gate.env = immutableBaseEnv(resolveBaseSha(root, gate.env.GITHUB_BASE_REF));
    }
  }
  return gates;
}

/** A successful wrapper cannot turn unavailable scanner evidence into a measurement. */
export function staticGateOutcome(code, output, executionOutcome = code === 0 ? "PASS" : "FAIL") {
  const incomplete =
    !["PASS", "FAIL"].includes(executionOutcome) ||
    /\b[\w.]+=(?:SKIP|INCOMPLETE)\b/.test(String(output));
  return { ok: code === 0 && !incomplete, evidenceState: incomplete ? "INCOMPLETE" : "COMPLETE" };
}
