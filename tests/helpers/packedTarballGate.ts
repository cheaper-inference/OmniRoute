/**
 * Fixtures for the prebuilt-tarball interface of the publish gates
 * (scripts/check/check-pack-boot.mjs and scripts/check/check-install-upgrade.mjs):
 * a minimal npm tarball, a fake repo root that passes the gates' dist/server.js
 * precondition, and a runner that executes a gate with `npm` replaced by a PATH shim that
 * only records its arguments, so a test can prove which npm commands the gate issued
 * (`pack` or not) without running npm.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

export const PACKED_TARBALL_ENV = "OMNIROUTE_PACKED_TARBALL";

/** Write `<dir>/<file>`: a gzipped tar holding only package/package.json = manifest. */
export function makeFixtureTarball(
  dir: string,
  manifest: Record<string, unknown>,
  file = "fixture.tgz"
): string {
  const staging = mkdtempSync(path.join(os.tmpdir(), "packed-tarball-fixture-src-"));
  try {
    mkdirSync(path.join(staging, "package"), { recursive: true });
    writeFileSync(path.join(staging, "package", "package.json"), JSON.stringify(manifest));
    const tarball = path.join(dir, file);
    execFileSync("tar", ["-czf", tarball, "-C", staging, "package"]);
    return tarball;
  } finally {
    rmSync(staging, { recursive: true, force: true });
  }
}

/** A throwaway "repo root" that passes the gates' dist/server.js precondition. */
export function makeFakeRoot(manifest: Record<string, unknown>): string {
  const root = mkdtempSync(path.join(os.tmpdir(), "packed-tarball-fake-root-"));
  mkdirSync(path.join(root, "dist"), { recursive: true });
  writeFileSync(path.join(root, "dist", "server.js"), "// not a real server\n");
  writeFileSync(path.join(root, "package.json"), JSON.stringify(manifest));
  return root;
}

/**
 * Run `node <scriptPath> ...args` in `cwd` with an npm shim first on PATH. The caller's
 * OMNIROUTE_PACKED_TARBALL is dropped unless `env` sets it, so the test fully controls
 * the interface under test.
 */
export function runGateWithNpmShim(
  scriptPath: string,
  cwd: string,
  args: string[],
  env: Record<string, string> = {}
) {
  const shimDir = mkdtempSync(path.join(os.tmpdir(), "packed-tarball-npm-shim-"));
  const npmLog = path.join(shimDir, "npm-calls.log");
  writeFileSync(npmLog, "");
  writeFileSync(path.join(shimDir, "npm"), '#!/bin/sh\necho "$*" >> "$NPM_SHIM_LOG"\nexit 0\n', {
    mode: 0o755,
  });
  const childEnv: NodeJS.ProcessEnv = { ...process.env, ...env };
  if (!(PACKED_TARBALL_ENV in env)) delete childEnv[PACKED_TARBALL_ENV];
  try {
    const run = spawnSync(process.execPath, [scriptPath, ...args], {
      cwd,
      env: {
        ...childEnv,
        PATH: `${shimDir}${path.delimiter}${process.env.PATH ?? ""}`,
        NPM_SHIM_LOG: npmLog,
      },
      encoding: "utf8",
      timeout: 60_000,
    });
    const npmCalls = readFileSync(npmLog, "utf8").split("\n").filter(Boolean);
    return { status: run.status, stdout: run.stdout, stderr: run.stderr, npmCalls };
  } finally {
    rmSync(shimDir, { recursive: true, force: true });
  }
}
