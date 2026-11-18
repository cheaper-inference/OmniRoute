#!/usr/bin/env node
// Copies a published release from the canonical GHCR image to the Cheaper Inference Docker Hub
// organization (`cheaperinference/omniroute`), next to the legacy `diegosouzapw/omniroute`
// repository that keeps receiving the same images.
//
// Docker Hub cannot move a repository between namespaces, so the 1.8M pulls stay on the legacy
// repository and both are published in parallel (owner decision, 2026-11-16).
//
// The org credentials come from the DOCKERHUB_ORG_USERNAME / DOCKERHUB_ORG_TOKEN secrets, which
// the organization owner provides. Until they exist this script SKIPS with a visible warning
// (workflow annotation + job summary line) and exits 0: a missing third-party credential must
// never fail the release. With credentials present, a failed copy of a mandatory tag exits 1.
//
// Env:
//   VERSION            release version to copy (e.g. 3.8.54); channels main/next are not mirrored
//   PROMOTE_LATEST     "true" to also move :latest / :latest-web on the target. Only a stable
//                      X.Y.Z may ask for it (a prerelease is rejected before login), and the
//                      flag is a request, not a decision: the run re-reads origin's release tags
//                      and moves :latest only when VERSION is still the highest stable one, so an
//                      older release that mirrors after a newer one cannot move it back.
//   DOCKERHUB_ORG_USERNAME       Docker Hub user (or org name for an Organization Access Token)
//   DOCKERHUB_ORG_TOKEN          Docker Hub token with read & write on the target repository
//   SOURCE_IMAGE       default ghcr.io/cheaper-inference/omniroute
//   TARGET_IMAGE       default cheaperinference/omniroute
//   GITHUB_STEP_SUMMARY  optional file the summary is appended to
//   GITHUB_OUTPUT      optional; receives promoted=true|false (whether :latest was moved)
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

export const DEFAULT_SOURCE_IMAGE = "ghcr.io/cheaper-inference/omniroute";
export const DEFAULT_TARGET_IMAGE = "cheaperinference/omniroute";

const VERSION_PATTERN = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;
const STABLE_VERSION_PATTERN = /^\d+\.\d+\.\d+$/;
// Same helper docker-publish.yml uses to decide :latest, so both registries agree.
const SHOULD_PROMOTE_HELPER = fileURLToPath(new URL("./should-promote-latest.sh", import.meta.url));

/** Tags this run copies: Node and Web are mandatory, the Bun images are best-effort. */
export function planTags(version, promoteLatest) {
  const tags = [
    { tag: version, from: version, required: true },
    { tag: `${version}-web`, from: `${version}-web`, required: true },
    { tag: `${version}-bun`, from: `${version}-bun`, required: false },
    { tag: `${version}-web-bun`, from: `${version}-web-bun`, required: false },
  ];
  if (promoteLatest) {
    tags.push(
      { tag: "latest", from: version, required: true },
      { tag: "latest-web", from: `${version}-web`, required: true },
      { tag: "latest-bun", from: `${version}-bun`, required: false },
      { tag: "latest-web-bun", from: `${version}-web-bun`, required: false }
    );
  }
  return tags;
}

/**
 * Re-decides :latest from origin's release tags at mirror time (not from the flag computed when
 * the publish started): VERSION must be the highest stable tag in {tags on origin} ∪ {VERSION}.
 * @returns {{ promote: boolean } | { error: string }}
 */
export function recheckLatest(version, run) {
  const listing = run("git", ["ls-remote", "--tags", "--refs", "origin"]);
  if (listing.status !== 0) {
    return { error: `could not list the release tags on origin (git exit ${listing.status})` };
  }
  const tags = [];
  for (const line of listing.stdout.split("\n")) {
    const match = /^[0-9a-f]+\s+refs\/tags\/(v\d\S*)$/.exec(line.trim());
    if (match) tags.push(match[1]);
  }
  const decision = run("bash", [SHOULD_PROMOTE_HELPER, version], `${tags.join("\n")}\n`);
  const answer = decision.stdout.trim();
  if (decision.status !== 0 || (answer !== "true" && answer !== "false")) {
    return { error: `the :latest helper failed (exit ${decision.status})` };
  }
  return { promote: answer === "true" };
}

function defaultRun(cmd, args, input) {
  const res = spawnSync(cmd, args, { encoding: "utf8", shell: false, input });
  return {
    status: res.error ? 127 : res.status,
    stdout: res.stdout || "",
    stderr: res.error ? res.error.message : res.stderr || "",
  };
}

/**
 * @param {Record<string, string | undefined>} env
 * @param {{ run?: typeof defaultRun, log?: (line: string) => void }} [deps]
 * @returns {{ exitCode: number, status: "skipped" | "mirrored" | "failed", promoted: boolean, summary: string[] }}
 */
export function mirrorToOrg(env, deps = {}) {
  const run = deps.run || defaultRun;
  const log = deps.log || ((line) => console.log(line));
  const source = env.SOURCE_IMAGE || DEFAULT_SOURCE_IMAGE;
  const target = env.TARGET_IMAGE || DEFAULT_TARGET_IMAGE;
  const version = (env.VERSION || "").trim();
  let promoteLatest = env.PROMOTE_LATEST === "true";
  const summary = [];
  const fail = (msg) => {
    log(`::error title=Docker Hub org mirror::${msg}`);
    summary.push(`❌ Docker Hub org mirror: ${msg}`);
    return { exitCode: 1, status: "failed", promoted: false, summary };
  };

  if (version === "main" || version === "next") {
    summary.push(`Docker Hub org mirror: channel \`${version}\` is not mirrored to \`${target}\`.`);
    log(summary[0]);
    return { exitCode: 0, status: "skipped", promoted: false, summary };
  }
  if (!VERSION_PATTERN.test(version)) {
    return fail(`Invalid VERSION ${JSON.stringify(version)}: expected X.Y.Z or X.Y.Z-pre.`);
  }
  if (promoteLatest && !STABLE_VERSION_PATTERN.test(version)) {
    return fail(
      `PROMOTE_LATEST=true with the prerelease VERSION ${version}: only a stable X.Y.Z release ` +
        `may move :latest. Nothing was copied.`
    );
  }

  if (!env.DOCKERHUB_ORG_USERNAME || !env.DOCKERHUB_ORG_TOKEN) {
    const msg =
      `Skipped the push to ${target}: the DOCKERHUB_ORG_USERNAME / DOCKERHUB_ORG_TOKEN secrets ` +
      `are not set. ${source} and diegosouzapw/omniroute were published normally. Once the ` +
      `secrets exist, run the "Mirror Docker image to the Docker Hub org" workflow with ` +
      `version=${version}.`;
    log(`::warning title=Docker Hub org mirror skipped::${msg}`);
    summary.push(`⚠️ Docker Hub org mirror skipped — ${msg}`);
    return { exitCode: 0, status: "skipped", promoted: false, summary };
  }

  if (promoteLatest) {
    const recheck = recheckLatest(version, run);
    if ("error" in recheck) {
      return fail(`:latest recheck failed: ${recheck.error}. Nothing was copied.`);
    }
    if (!recheck.promote) {
      promoteLatest = false;
      const msg =
        `${version} is no longer the highest stable release on origin, so ${target}:latest is ` +
        `left where it is; the ${version} tags are still copied.`;
      log(`::notice title=Docker Hub org mirror::${msg}`);
      summary.push(`ℹ️ \`${target}:latest\` not moved: ${msg}`, "");
    }
  }

  const login = run(
    "docker",
    ["login", "--username", env.DOCKERHUB_ORG_USERNAME, "--password-stdin"],
    env.DOCKERHUB_ORG_TOKEN
  );
  if (login.status !== 0) {
    log(
      `::error title=Docker Hub org mirror::docker login to Docker Hub as the org credential failed (exit ${login.status}).`
    );
    summary.push(`❌ Docker Hub org mirror: login failed (exit ${login.status}).`);
    return { exitCode: 1, status: "failed", promoted: false, summary };
  }

  const failures = [];
  const rows = [];
  for (const { tag, from, required } of planTags(version, promoteLatest)) {
    const sourceRef = `${source}:${from}`;
    const targetRef = `${target}:${tag}`;
    if (!required) {
      const probe = run("docker", ["buildx", "imagetools", "inspect", "--raw", sourceRef]);
      if (probe.status !== 0) {
        rows.push(`| \`${targetRef}\` | skipped (no \`${sourceRef}\`; Bun is best-effort) |`);
        continue;
      }
    }
    const copy = run("docker", ["buildx", "imagetools", "create", "-t", targetRef, sourceRef]);
    if (copy.status === 0) {
      rows.push(`| \`${targetRef}\` | copied from \`${sourceRef}\` |`);
      continue;
    }
    if (required) {
      failures.push(targetRef);
      log(`::error title=Docker Hub org mirror::Could not copy ${sourceRef} to ${targetRef}.`);
      rows.push(`| \`${targetRef}\` | ❌ failed |`);
    } else {
      log(
        `::warning::Could not copy ${sourceRef} to ${targetRef}. Bun is best-effort; continuing.`
      );
      rows.push(`| \`${targetRef}\` | ⚠️ failed (best-effort) |`);
    }
  }

  summary.push(
    `### Docker Hub org mirror (\`${target}\`)`,
    "",
    "| Tag | Result |",
    "| --- | --- |"
  );
  summary.push(...rows);
  if (failures.length > 0) {
    summary.push("", `❌ ${failures.length} mandatory tag(s) failed: ${failures.join(", ")}`);
    return { exitCode: 1, status: "failed", promoted: false, summary };
  }
  return { exitCode: 0, status: "mirrored", promoted: promoteLatest, summary };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const result = mirrorToOrg(process.env);
  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${result.summary.join("\n")}\n`);
  }
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `promoted=${result.promoted}\n`);
  }
  process.exit(result.exitCode);
}
