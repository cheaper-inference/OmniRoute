#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const STABLE_RELEASE =
  /^(?:[a-f0-9]+\trefs\/heads\/)?(release\/v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*))$/;

/**
 * @param {string[]} refs Bare branch names or lines from `git ls-remote --heads`.
 * @returns {string | null}
 */
export function pickHighestReleaseBranch(refs) {
  let highest = null;
  for (const ref of refs) {
    const match = STABLE_RELEASE.exec(ref.trim());
    if (!match) continue;

    const [, branch, ...parts] = match;
    const version = parts.map(BigInt);
    const firstDifference = highest?.version.findIndex((part, index) => part !== version[index]);
    if (
      !highest ||
      (firstDifference >= 0 && version[firstDifference] > highest.version[firstDifference])
    ) {
      highest = { branch, version };
    }
  }
  return highest?.branch ?? null;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const target = pickHighestReleaseBranch(readFileSync(0, "utf8").split("\n"));
  if (target) {
    console.log(target);
  } else {
    console.error("No stable release branch found.");
    process.exitCode = 1;
  }
}
