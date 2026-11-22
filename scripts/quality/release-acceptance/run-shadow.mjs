#!/usr/bin/env node
import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { main as validateAcceptance } from "../validate-release-acceptance.mjs";
import { gateKey } from "./types.mjs";

const GATE = "gate-manifest";
const REPORT = "release-acceptance-report.json";

function identifyCheckout(env, cwd) {
  const { GITHUB_REPOSITORY, GITHUB_RUN_ID, GITHUB_EVENT_NAME, GITHUB_REF, GITHUB_SHA } = env;
  const attempt = Number(env.GITHUB_RUN_ATTEMPT);
  if (
    !/^[\w.-]+\/[\w.-]+$/.test(GITHUB_REPOSITORY ?? "") ||
    !/^[1-9]\d*$/.test(GITHUB_RUN_ID ?? "") ||
    !Number.isSafeInteger(attempt) ||
    attempt < 1 ||
    !GITHUB_REF?.startsWith("refs/heads/") ||
    !["push", "workflow_dispatch"].includes(GITHUB_EVENT_NAME) ||
    !/^[0-9a-f]{40}$/.test(GITHUB_SHA ?? "")
  ) {
    throw new Error("Release acceptance requires a valid GitHub workflow identity");
  }
  const tested = execFileSync("git", ["rev-parse", "HEAD"], { cwd, encoding: "utf8" }).trim();
  if (tested !== GITHUB_SHA) throw new Error("Release acceptance checkout SHA mismatch");
  execFileSync("git", ["diff", "--quiet", "HEAD", "--"], { cwd });
  return {
    repository: GITHUB_REPOSITORY,
    run_id: GITHUB_RUN_ID,
    run_attempt: attempt,
    workflow: "release-acceptance.yml",
    trigger: GITHUB_EVENT_NAME,
    scope: "release",
    requested_ref: GITHUB_REF,
    base_sha: tested,
    candidate_sha: tested,
    tested_sha: tested,
  };
}

export async function runShadow(out, { env = process.env, cwd = process.cwd() } = {}) {
  const identity = identifyCheckout(env, cwd);
  const key = gateKey({ gate_id: GATE });
  const logs = join(out, "logs");
  const manifests = join(out, "manifests");
  const plan = join(out, "plan.json");
  mkdirSync(logs, { recursive: true });
  mkdirSync(manifests, { recursive: true });

  const started = performance.now();
  const execution = spawnSync(process.execPath, ["scripts/quality/gate-manifest.mjs"], {
    cwd,
    env,
    encoding: "utf8",
  });
  const duration = Math.round(performance.now() - started);
  const output = Buffer.from(
    [execution.stdout, execution.stderr, execution.error?.message, execution.signal]
      .filter(Boolean)
      .join("\n")
  );
  const status =
    execution.error || execution.status == null
      ? "INFRA_ERROR"
      : execution.status === 0
        ? "PASS"
        : "FAIL";
  writeFileSync(join(logs, GATE + ".log"), output);
  writeFileSync(plan, JSON.stringify({ identity, required_gates: [key], artifact: null }) + "\n");
  writeFileSync(
    join(manifests, GATE + ".json"),
    JSON.stringify({
      ...key,
      tested_sha: identity.tested_sha,
      run_id: identity.run_id,
      run_attempt: identity.run_attempt,
      command_id: "check:gate-manifest",
      gate_type: "static",
      status,
      cause: null,
      exit_code: execution.status,
      duration_ms: duration,
      evidence: [
        {
          artifact_id: "logs",
          member: GATE + ".log",
          algorithm: "sha256",
          digest: createHash("sha256").update(output).digest("hex"),
        },
      ],
    }) + "\n"
  );
  const code = await validateAcceptance([
    process.execPath,
    "validate-release-acceptance.mjs",
    "--plan",
    plan,
    "--manifests",
    manifests,
    "--evidence-root",
    out,
    "--out",
    join(out, REPORT),
  ]);
  console.log(
    `Release acceptance shadow validated ${identity.tested_sha} (exit ${code}, gate: ${GATE})`
  );
  return code;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  const out = process.argv[2];
  if (!out) throw new Error("Release acceptance shadow requires an artifact output directory");
  process.exitCode = await runShadow(out);
}
