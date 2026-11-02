import { readFileSync } from "node:fs";
import { join } from "node:path";
import { load as parseYaml } from "js-yaml";
import { execFileSync } from "node:child_process";

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

export function loadFullCiProfile(root) {
  const read = (path) => readFileSync(join(root, path), "utf8");
  const gates = validateFullCiProfile(
    JSON.parse(read("config/quality/release-green-static-profile.json")),
    JSON.parse(read("package.json")).scripts,
    read(".github/workflows/ci.yml"),
    read(".github/workflows/quality.yml")
  );
  for (const gate of gates) {
    if (gate.env?.GITHUB_BASE_REF) {
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
  return gates;
}

/** A successful wrapper cannot turn unavailable scanner evidence into a measurement. */
export function staticGateOutcome(code, output, executionOutcome = code === 0 ? "PASS" : "FAIL") {
  const incomplete =
    !["PASS", "FAIL"].includes(executionOutcome) ||
    /\b[\w.]+=(?:SKIP|INCOMPLETE)\b/.test(String(output));
  return { ok: code === 0 && !incomplete, evidenceState: incomplete ? "INCOMPLETE" : "COMPLETE" };
}
