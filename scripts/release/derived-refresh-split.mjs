#!/usr/bin/env node
import { readFileSync } from "node:fs";

import { isMainModule } from "../lib/is-main-module.mjs";
import { loadConfig } from "../merge-queue/config.mjs";
import { isProtectedPath } from "../merge-queue/contracts.mjs";

const SKILL_DIR = /^skills\/[^/]+\//;

// A generated skill is published as one unit: when its SKILL.md is protected, the files beside it
// (references/ and the rest of skills/<name>/) travel in the same protected PR, so neither PR
// carries half of one regenerated skill.
export function protectedFiles(paths, protectedPaths) {
  const direct = paths.filter((path) => isProtectedPath(path, protectedPaths));
  const skillDirs = new Set(direct.map((path) => path.match(SKILL_DIR)?.[0]).filter(Boolean));
  return paths.filter(
    (path) => direct.includes(path) || skillDirs.has(path.match(SKILL_DIR)?.[0] ?? "")
  );
}

if (isMainModule(import.meta.url)) {
  // The workflow uses NUL separators to preserve Git paths containing newlines.
  const separator = process.argv.includes("--null") ? "\0" : "\n";
  const input = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(readFileSync(0));
  const paths = input.split(separator).filter(Boolean);
  const files = protectedFiles(paths, loadConfig().protectedPaths);
  if (files.length) process.stdout.write(files.join(separator) + separator);
}
