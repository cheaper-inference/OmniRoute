#!/usr/bin/env node
// Reports whether the vendored CI UI Kit (packages/ui-kit) is behind the newest upstream release.
//
// WHY: the kit is a vendored snapshot pinned in packages/ui-kit/UPSTREAM.md, so nothing tells the
// team when Keak ships a new version — 0.0.66 sat in the tree while 0.0.76 was already released.
// This compares the pinned version with the highest `v*` tag of the upstream repo and prints the
// one command that syncs it (`scripts/dev/sync-ui-kit.sh latest`).
//
// The upstream repo is private: the tag listing goes through `git ls-remote`, which uses the local
// git credentials (gh auth) or, in CI, `UI_KIT_READ_TOKEN`. Without access the check reports
// "unknown" and exits 0 — it never blocks anyone.
//
// Usage: node scripts/check/check-ui-kit-upstream.mjs [--json] [--strict]
//   --strict  exit 1 when behind (for a scheduled job that opens an issue)
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const REPO = "keak-ai/cheaper-inference-ui-kit";

/** Pure: semver-ish compare of "0.0.76" style versions. */
export function compareVersions(a, b) {
  const pa = String(a).split(".").map(Number);
  const pb = String(b).split(".").map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (d !== 0) return Math.sign(d);
  }
  return 0;
}

/** Pure: highest `vX.Y.Z` tag in `git ls-remote --tags` output → { version, commit }. */
export function latestTag(lsRemoteOutput) {
  const tags = new Map();
  for (const line of String(lsRemoteOutput).split("\n")) {
    const m = /^([0-9a-f]{40})\s+refs\/tags\/v(\d+\.\d+\.\d+)(\^\{\})?$/.exec(line.trim());
    if (!m) continue;
    // annotated tags list the tag object first and the commit as `^{}`: keep the commit
    if (m[3] || !tags.has(m[2])) tags.set(m[2], m[1]);
  }
  let best = null;
  for (const [version, commit] of tags) {
    if (!best || compareVersions(version, best.version) > 0) best = { version, commit };
  }
  return best;
}

export function pinnedVersion(upstreamMd) {
  return {
    version: /^- version:\s*(\S+)$/m.exec(upstreamMd)?.[1] ?? null,
    commit: /^- commit:\s*([0-9a-f]{7,40})$/m.exec(upstreamMd)?.[1] ?? null,
  };
}

function listRemoteTags() {
  const token = process.env.UI_KIT_READ_TOKEN;
  const env = { ...process.env, GIT_TERMINAL_PROMPT: "0" };
  if (token) {
    // header through the environment, never the URL / argv (both show up in `ps`)
    const basic = Buffer.from(`x-access-token:${token}`).toString("base64");
    Object.assign(env, {
      GIT_CONFIG_COUNT: "1",
      GIT_CONFIG_KEY_0: "http.https://github.com/.extraheader",
      GIT_CONFIG_VALUE_0: `AUTHORIZATION: basic ${basic}`,
    });
  }
  return execFileSync("git", ["ls-remote", "--tags", `https://github.com/${REPO}.git`], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
    timeout: 60000,
    env,
  });
}

function main() {
  const args = new Set(process.argv.slice(2));
  const pinned = pinnedVersion(
    readFileSync(path.join(ROOT, "packages/ui-kit/UPSTREAM.md"), "utf8")
  );
  let latest = null;
  try {
    latest = latestTag(listRemoteTags());
  } catch {
    latest = null;
  }
  const state = !latest
    ? "unknown"
    : compareVersions(latest.version, pinned.version) > 0
      ? "behind"
      : "up-to-date";
  const report = { state, pinned, latest, repo: REPO };
  if (args.has("--json")) {
    console.log(JSON.stringify(report, null, 2));
  } else if (state === "unknown") {
    console.log(
      `[ui-kit-upstream] unknown — could not list ${REPO} tags (no access); pinned ${pinned.version}`
    );
  } else if (state === "behind") {
    console.log(
      `[ui-kit-upstream] BEHIND — pinned ${pinned.version}, latest release v${latest.version} (${latest.commit.slice(0, 7)}).\n` +
        "  Sync: git -C _references/cheaper-inference-ui-kit fetch --tags && scripts/dev/sync-ui-kit.sh latest"
    );
  } else {
    console.log(`[ui-kit-upstream] up to date — pinned ${pinned.version} = latest release`);
  }
  if (args.has("--strict") && state === "behind") process.exit(1);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
