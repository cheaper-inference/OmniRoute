#!/usr/bin/env node
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

export function desktopAssets(directory) {
  return readdirSync(directory, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() &&
        /(?:\.dmg|\.exe|\.AppImage|\.deb|\.blockmap|\.yml|\.source\.tar\.gz|\.source\.zip)$/.test(
          entry.name
        )
    )
    .map((entry) => join(directory, entry.name))
    .sort();
}

export function uploadDesktopAssets({
  version,
  repository,
  directory = "release-assets",
  run = (args) => spawnSync("gh", args, { encoding: "utf8", maxBuffer: 1024 * 1024 }),
}) {
  if (!/^v\d+\.\d+\.\d+$/.test(version ?? "")) throw new Error("Invalid release version");
  if (!/^[\w.-]+\/[\w.-]+$/.test(repository ?? "")) throw new Error("Invalid repository");
  const files = desktopAssets(directory);
  if (!files.length) throw new Error("No desktop assets to upload");
  const invoke = (args) => {
    const result = run(args);
    if (result.error || result.signal || result.status !== 0) {
      throw new Error(`GitHub release operation failed: ${args.slice(0, 2).join(" ")}`);
    }
  };
  const lookup = run(["api", `repos/${repository}/releases/tags/${version}`]);
  const missing =
    !lookup.error && !lookup.signal && lookup.status === 1 && /HTTP 404/.test(lookup.stderr ?? "");
  if (lookup.error || lookup.signal || (lookup.status !== 0 && !missing))
    throw new Error("Cannot establish release state");
  if (missing) {
    invoke([
      "release",
      "create",
      version,
      "--repo",
      repository,
      "--verify-tag",
      "--title",
      version,
      "--notes",
      "",
    ]);
  } else {
    // Keep the curated body intact, including retries after a partial upload.
    invoke([
      "release",
      "edit",
      version,
      "--repo",
      repository,
      "--draft=false",
      "--prerelease=false",
    ]);
  }
  invoke(["release", "upload", version, ...files, "--repo", repository, "--clobber"]);
  return { created: missing, uploaded: files.length };
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  try {
    console.log(
      uploadDesktopAssets({
        version: process.env.VERSION,
        repository: process.env.GITHUB_REPOSITORY,
      })
    );
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
