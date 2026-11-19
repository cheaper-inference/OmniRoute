#!/usr/bin/env node
import { spawn } from "node:child_process";
import { rmSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import {
  checkoutIdentity,
  measureNextTree,
  nextDistPath,
  NEXT_INPUT_RECEIPT,
  requireProof,
  RUN_NUMBER,
  sameIdentity,
  SHA,
  UUID,
  writeNextInput,
} from "./standaloneInput.mjs";

export function requireFullNextProfile(env) {
  requireProof(
    !env.OMNIROUTE_BUILD_PROFILE || env.OMNIROUTE_BUILD_PROFILE === "full",
    "partial-build-profile"
  );
  requireProof(
    env.OMNIROUTE_BUILD_BACKEND_ONLY !== "1" && env.OMNIROUTE_SKIP_STANDALONE !== "1",
    "partial-build-profile"
  );
  requireProof(env.OMNIROUTE_BUILD_MOVE_TASKS !== "1", "task-movement-forbidden");
}

export function invalidateNextInput(root, env) {
  const dist = nextDistPath(root, env);
  for (const member of ["standalone", "BUILD_ID", NEXT_INPUT_RECEIPT]) {
    rmSync(join(dist, member), { recursive: true, force: true });
  }
  return dist;
}

export async function main(root = process.cwd(), env = process.env) {
  requireFullNextProfile(env);
  const phase = JSON.parse(env.OMNIROUTE_NEXT_PRODUCER_CONTEXT || "null");
  requireProof(
    phase?.schemaVersion === 1 &&
      phase.laneId === "pack-artifact" &&
      phase.phaseId === "build-next" &&
      phase.mode === "shared" &&
      Number.isSafeInteger(phase.budgetMs) &&
      phase.budgetMs > 0 &&
      Number.isSafeInteger(phase.preparationBudgetMs) &&
      phase.preparationBudgetMs >= phase.budgetMs &&
      UUID.test(phase.invocationId) &&
      SHA.test(phase.candidateSha),
    "invalid-next-producer-context"
  );
  const local = [phase.runId, phase.runAttempt, phase.workflowSha].every((value) => value === null);
  requireProof(
    local ||
      (RUN_NUMBER.test(phase.runId) &&
        RUN_NUMBER.test(phase.runAttempt) &&
        SHA.test(phase.workflowSha)),
    "invalid-next-producer-context"
  );
  const source = checkoutIdentity(root);
  requireProof(source.candidateSha === phase.candidateSha, "next-producer-candidate-mismatch");
  // Invalidate only generated inputs. Staging and the build cache are untouched.
  // A successful command that emits nothing cannot reuse the previous output.
  const dist = invalidateNextInput(root, env);
  const { resolveNextBuildBundlerFlag, getEffectiveBuildMemoryBytes } = await import(
    pathToFileURL(join(root, "scripts/build/build-next-isolated.mjs"))
  );
  const bundler =
    resolveNextBuildBundlerFlag(env, getEffectiveBuildMemoryBytes()) === "--webpack"
      ? "webpack"
      : "turbopack";
  const status = await new Promise((done, reject) => {
    // Keep npm's prebuild/postbuild (native check + colocation) and the supported
    // Node builder. Both command and arguments are literals; no path interpolation.
    const child = spawn(process.platform === "win32" ? "npm.cmd" : "npm", ["run", "build"], {
      cwd: root,
      env,
      stdio: "inherit",
      shell: process.platform === "win32",
    });
    child.once("error", reject);
    child.once("close", (code, signal) => done(signal ? 1 : (code ?? 1)));
  });
  if (status !== 0) return status;
  requireProof(sameIdentity(source, checkoutIdentity(root)), "next-producer-source-changed");
  const proof = writeNextInput(
    dist,
    source,
    {
      kind: "observer",
      phase,
      profile: "full",
      bundler,
      runtime: {
        node: process.version,
        abi: process.versions.modules,
        platform: process.platform,
        arch: process.arch,
      },
    },
    measureNextTree(dist)
  );
  console.log(`Next input verified: ${proof.sha256}; invocation ${phase.invocationId}`);
  return 0;
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  try {
    process.exitCode = await main();
  } catch (error) {
    console.error(
      `PREBUILT_NEXT_REQUIRED: ${/^[a-z][a-z-]+$/.test(error?.code || "") ? error.code : "next-producer-incomplete"}`
    );
    process.exitCode = 1;
  }
}
