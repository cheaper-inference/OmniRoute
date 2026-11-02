#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

export function isCompleteMultiArchManifest(value) {
  let data = value;
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch {
      return false;
    }
  }
  if (!data || typeof data !== "object" || !Array.isArray(data.manifests)) {
    return false;
  }
  let amd64Count = 0;
  let arm64Count = 0;
  for (const m of data.manifests) {
    const p = m?.platform;
    if (p?.os === "unknown" && p?.architecture === "unknown") {
      continue;
    }
    if (p?.os === "linux" && p?.architecture === "amd64") {
      amd64Count++;
    } else if (p?.os === "linux" && p?.architecture === "arm64") {
      arm64Count++;
    } else {
      return false;
    }
  }
  return amd64Count === 1 && arm64Count === 1;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const refs = process.argv.slice(2);
  if (refs.length === 0) {
    console.error("Usage: docker-image-complete.mjs <ref> [ref...]");
    process.exit(1);
  }
  const allManifests = [];
  for (const ref of refs) {
    const res = spawnSync("docker", ["buildx", "imagetools", "inspect", "--raw", ref], {
      encoding: "utf8",
      shell: false,
    });
    if (res.error) {
      console.error(`docker inspect error for ${ref}: ${res.error.message}`);
      process.exit(1);
    }
    if (res.status !== 0) {
      console.error(
        `docker inspect failed for ${ref} (exit ${res.status}): ${(res.stderr || "").trim()}`
      );
      process.exit(1);
    }
    let parsed;
    try {
      parsed = JSON.parse(res.stdout);
    } catch (e) {
      console.error(`malformed JSON for ${ref}: ${e.message}`);
      process.exit(1);
    }
    if (!parsed || !Array.isArray(parsed.manifests)) {
      console.error(`non-index manifest for ${ref}`);
      process.exit(1);
    }
    allManifests.push(...parsed.manifests);
  }
  if (!isCompleteMultiArchManifest({ manifests: allManifests })) {
    console.error(`Incomplete multi-arch manifests across ${refs.length} ref(s)`);
    process.exit(1);
  }
  process.exit(0);
}
