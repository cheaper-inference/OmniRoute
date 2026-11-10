#!/usr/bin/env node
// Validates that one or more image refs together hold exactly one linux/amd64 and one
// linux/arm64 image. Exit codes are a contract with .github/workflows/docker-publish.yml:
//   0  complete
//   1  definitely not complete: missing tag, single-image manifest, wrong platform set
//   2  could not tell: registry, auth or network error that survived the retries, or bad usage
// `prepare` rebuilds on 1 and fails on 2, so a registry hiccup cannot start a ~2 h rebuild.
import { spawnSync } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { fileURLToPath } from "node:url";

const EXIT_COMPLETE = 0;
const EXIT_INCOMPLETE = 1;
const EXIT_UNDETERMINED = 2;
const MAX_INSPECT_ATTEMPTS = 3;
const DEFAULT_RETRY_DELAY_MS = 10_000;

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

// buildx reports a missing tag as "ERROR: docker.io/org/image:tag: not found". DNS failures can
// also end in "not found", so a line naming the network layer never counts as a missing tag.
export function isManifestNotFound(stderr) {
  return String(stderr ?? "")
    .split("\n")
    .some(
      (line) =>
        !/dial tcp|lookup /i.test(line) &&
        (/(^|:\s*)not found\s*$/i.test(line.trim()) || /manifest unknown|name unknown/i.test(line))
    );
}

function inspectOnce(ref) {
  const res = spawnSync("docker", ["buildx", "imagetools", "inspect", "--raw", ref], {
    encoding: "utf8",
    shell: false,
  });
  if (res.error) {
    return {
      exit: EXIT_UNDETERMINED,
      message: `docker inspect error for ${ref}: ${res.error.message}`,
    };
  }
  if (res.status !== 0) {
    const stderr = (res.stderr || "").trim();
    return {
      exit: isManifestNotFound(stderr) ? EXIT_INCOMPLETE : EXIT_UNDETERMINED,
      message: `docker inspect failed for ${ref} (exit ${res.status}): ${stderr}`,
    };
  }
  let parsed;
  try {
    parsed = JSON.parse(res.stdout);
  } catch (e) {
    return { exit: EXIT_UNDETERMINED, message: `malformed JSON for ${ref}: ${e.message}` };
  }
  if (!parsed || !Array.isArray(parsed.manifests)) {
    return { exit: EXIT_INCOMPLETE, message: `non-index manifest for ${ref}` };
  }
  return { manifests: parsed.manifests };
}

async function inspectWithRetry(ref, retryDelayMs) {
  let result = inspectOnce(ref);
  for (
    let attempt = 1;
    result.exit === EXIT_UNDETERMINED && attempt < MAX_INSPECT_ATTEMPTS;
    attempt++
  ) {
    console.error(`${result.message} (attempt ${attempt}/${MAX_INSPECT_ATTEMPTS}, retrying)`);
    await sleep(retryDelayMs * attempt);
    result = inspectOnce(ref);
  }
  return result;
}

function resolveRetryDelayMs() {
  const raw = process.env.DOCKER_IMAGE_COMPLETE_RETRY_DELAY_MS;
  const value = raw === undefined || raw === "" ? Number.NaN : Number(raw);
  return Number.isFinite(value) && value >= 0 ? value : DEFAULT_RETRY_DELAY_MS;
}

async function main(refs) {
  if (refs.length === 0) {
    console.error("Usage: docker-image-complete.mjs <ref> [ref...]");
    return EXIT_UNDETERMINED;
  }
  const retryDelayMs = resolveRetryDelayMs();
  const allManifests = [];
  for (const ref of refs) {
    const result = await inspectWithRetry(ref, retryDelayMs);
    if (result.exit !== undefined) {
      console.error(result.message);
      return result.exit;
    }
    allManifests.push(...result.manifests);
  }
  if (!isCompleteMultiArchManifest({ manifests: allManifests })) {
    console.error(`Incomplete multi-arch manifests across ${refs.length} ref(s)`);
    return EXIT_INCOMPLETE;
  }
  return EXIT_COMPLETE;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  process.exit(await main(process.argv.slice(2)));
}
