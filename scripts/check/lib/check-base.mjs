#!/usr/bin/env node
// scripts/check/lib/check-base.mjs — one verified base resolver for PR gates.
//
// Migration checks and the merge queue already resolve the comparison base, but
// with two different policies. This module is the single entry point every
// base-relative gate shares: the existing resolvers are re-exported unchanged
// and `resolveCheckBase` adds the PR/merge-queue discipline on top. It uses only
// Node built-ins so it can be imported before `npm ci`.

import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

import { BASE_REQUIRED_EVENTS, parseGateArgs, resolveBaseRef } from "./migrationBaseDiff.mjs";
import { resolveCandidateBase } from "../../merge-queue/candidate-base.mjs";

export { BASE_REQUIRED_EVENTS, parseGateArgs, resolveBaseRef, resolveCandidateBase };

// Name reported by fail-closed paths so an operator sees which resolver refused.
export const CHECK_BASE_RESOLVER = "check-base";

function git(cwd, args) {
  const result = spawnSync("git", ["-C", cwd, ...args], { encoding: "utf8" });
  return result;
}

/** True when the checkout has shallow history (a PR base cannot be trusted). */
export function isShallow(cwd = process.cwd()) {
  const result = git(cwd, ["rev-parse", "--is-shallow-repository"]);
  return result.status === 0 && result.stdout.trim() === "true";
}

/**
 * Files changed between the verified base and HEAD (`base...HEAD`). The merge
 * base, not the working tree, is the authority for diff scope.
 *
 * @param {string} cwd
 * @param {string} baseSha
 * @returns {string[]} repository-relative paths
 */
export function diffChangedFiles(cwd, baseSha) {
  const result = git(cwd, ["diff", "--name-only", `${baseSha}...HEAD`]);
  if (result.status !== 0) {
    throw new Error(`cannot list changed files from base ${baseSha}: ${result.stderr.trim()}`);
  }
  return result.stdout
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

/**
 * Resolve the comparison base for any gate.
 *
 * Resolution order: explicit `--base` / `BASE` env -> merge-queue candidate
 * trailer -> the migration resolver (merge parent, merge_group payload,
 * merge-base against the base ref) -> fail closed on a PR, stay global off PR.
 *
 * @param {{cwd?: string, cliBase?: string|null, env?: object, ref?: string|null,
 *   message?: string|null, headSha?: string|null, latestTag?: boolean}} input
 * @returns {{status:"resolved", sha:string, label:string, resolver:string}
 *   | {status:"skipped", resolver:string}
 *   | {status:"error", reason:string, resolver:string}}
 */
export function resolveCheckBase({
  cwd = process.cwd(),
  cliBase = null,
  env = process.env,
  ref = null,
  message = null,
  headSha = null,
  latestTag = false,
} = {}) {
  const explicit = cliBase || env.BASE || env.MIGRATION_BASE_REF || null;
  if (explicit) {
    const resolved = resolveBaseRef({ cwd, cliBase: explicit, latestTag, env });
    if (resolved.status === "resolved") return { ...resolved, resolver: CHECK_BASE_RESOLVER };
    return {
      status: "error",
      reason: resolved.message || `unresolved base ${explicit}`,
      resolver: CHECK_BASE_RESOLVER,
    };
  }

  // A merge-queue push names its base in a trailer. A batch candidate without
  // one is refused: comparing a batch with itself hides every regression.
  if (ref && /omni-queue/.test(String(ref))) {
    try {
      const candidate = resolveCandidateBase({
        message: message ?? "",
        headSha: headSha ?? "",
        ref,
      });
      return {
        status: "resolved",
        sha: candidate.baseSha,
        label: `Omni-Queue-Base trailer (${candidate.source})`,
        resolver: CHECK_BASE_RESOLVER,
      };
    } catch (error) {
      return { status: "error", reason: error.message, resolver: CHECK_BASE_RESOLVER };
    }
  }

  const event = String(env.GITHUB_EVENT_NAME || "");
  const resolved = resolveBaseRef({ cwd, cliBase: null, latestTag, env });
  if (resolved.status === "error") {
    return { status: "error", reason: resolved.message, resolver: CHECK_BASE_RESOLVER };
  }
  if (resolved.status === "skipped") {
    return { status: "skipped", resolver: CHECK_BASE_RESOLVER };
  }

  if (BASE_REQUIRED_EVENTS.has(event) && isShallow(cwd)) {
    return {
      status: "error",
      reason: "shallow history on a PR event; fetch the full history before comparing to the base",
      resolver: CHECK_BASE_RESOLVER,
    };
  }

  return { ...resolved, resolver: CHECK_BASE_RESOLVER };
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  const resolution = resolveCheckBase();
  process.stdout.write(`${JSON.stringify(resolution)}\n`);
  if (resolution.status === "error") {
    process.stderr.write(`[${resolution.resolver}] ${resolution.reason}\n`);
    process.exitCode = 2;
  }
}
