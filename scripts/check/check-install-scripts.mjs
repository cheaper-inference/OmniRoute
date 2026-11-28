#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, realpathSync, statSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { isMainModule } from "../lib/is-main-module.mjs";

const POLICY_PATH = "config/quality/npm-install-scripts.json";
const IDENTITY_FIELDS = ["name", "version", "integrity", "resolved"];
const INSTALL_HOOKS = ["preinstall", "install", "postinstall"];

const isRecord = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const isText = (value) => typeof value === "string" && value.trim().length > 0;

function isPackagePath(path) {
  return (
    path === "" ||
    (typeof path === "string" &&
      !/[\\:]/.test(path) &&
      path.split("/").every((part) => part && part !== "." && part !== ".."))
  );
}

function identity(path, entry, lock) {
  const installedName = /(?:^|\/)node_modules\/((?:@[^/]+\/)?[^/]+)$/.exec(path)?.[1];
  return {
    name: entry.name ?? (path ? (installedName ?? basename(path)) : lock.name),
    version: entry.version ?? (path ? null : (lock.version ?? null)),
    integrity: entry.integrity ?? null,
    resolved: entry.resolved ?? null,
  };
}

function location(lockfile, path, version) {
  return `${lockfile} ${path === "" ? "<project>" : path}@${version ?? "<unknown>"}`;
}

function lockErrors(lockfile, lock) {
  if (
    ![2, 3].includes(lock?.lockfileVersion) ||
    !isRecord(lock.packages) ||
    !isRecord(lock.packages[""])
  ) {
    return [
      `${location(lockfile, "", lock?.version)}: invalid lock; expected npm packages map and project entry`,
    ];
  }
  return Object.entries(lock.packages).flatMap(([path, entry]) => {
    const valid =
      isPackagePath(path) &&
      isRecord(entry) &&
      IDENTITY_FIELDS.every((field) => entry[field] === undefined || isText(entry[field])) &&
      (entry.hasInstallScript === undefined || typeof entry.hasInstallScript === "boolean") &&
      (entry.link === undefined || typeof entry.link === "boolean") &&
      (!entry.link || (isText(entry.resolved) && Object.hasOwn(lock.packages, entry.resolved)));
    return valid ? [] : [`${location(lockfile, path, entry?.version)}: invalid lock package entry`];
  });
}

function isDecision(entry) {
  return (
    isRecord(entry) &&
    isPackagePath(entry.path) &&
    isText(entry.name) &&
    isText(entry.version) &&
    (entry.integrity === null || isText(entry.integrity)) &&
    (entry.resolved === null || isText(entry.resolved)) &&
    isText(entry.reason) &&
    Array.isArray(entry.profiles) &&
    entry.profiles.length > 0 &&
    entry.profiles.every(isText) &&
    ((entry.decision === "deny" && entry.command === undefined) ||
      (entry.decision === "allow" &&
        isText(entry.command) &&
        isText(entry.integrity) &&
        isText(entry.resolved) &&
        !entry.profiles.includes("all")))
  );
}

export function findInstallHooks(manifest, { hasBindingGyp = false, includePrepare = false } = {}) {
  const names = includePrepare ? [...INSTALL_HOOKS, "prepare"] : INSTALL_HOOKS;
  const hooks = names.filter((name) => isText(manifest.scripts?.[name]));
  if (
    hasBindingGyp &&
    manifest.gypfile !== false &&
    !hooks.includes("preinstall") &&
    !hooks.includes("install")
  ) {
    hooks.push("install (implicit node-gyp rebuild)");
  }
  return hooks;
}

export function checkLockfile(lockfile, lock, decisions, installedHooks = new Map()) {
  const errors = lockErrors(lockfile, lock);
  if (errors.length) return errors;

  const byPath = new Map();
  for (const decision of decisions) {
    const label = location(lockfile, decision?.path ?? "<unknown>", decision?.version);
    if (!isDecision(decision)) {
      errors.push(`${label}: invalid policy decision`);
      continue;
    }
    const { path } = decision;
    if (byPath.has(path)) {
      errors.push(`${label}: duplicate policy decision`);
      continue;
    }
    byPath.set(path, decision);
    const entry = Object.hasOwn(lock.packages, path) ? lock.packages[path] : undefined;
    // A denial can record hooks found by the installed audit even without a lock marker.
    if (!entry || (decision.decision === "allow" && !entry.hasInstallScript)) {
      errors.push(`${label}: orphaned decision (package or authorized install marker is absent)`);
      continue;
    }
    const actual = identity(path, entry, lock);
    for (const field of IDENTITY_FIELDS) {
      if (actual[field] !== decision[field]) {
        errors.push(
          `${location(lockfile, path, actual.version)}: ${field} changed (reviewed ${JSON.stringify(decision[field])}, found ${JSON.stringify(actual[field])})`
        );
      }
    }
  }

  for (const [path, entry] of Object.entries(lock.packages)) {
    const hooks = installedHooks.get(path) ?? [];
    if ((entry.hasInstallScript || hooks.length) && !byPath.has(path)) {
      const detail = hooks.length ? ` (observed ${hooks.join(", ")})` : "";
      errors.push(
        `${location(lockfile, path, identity(path, entry, lock).version)}: install script has no policy decision${detail}`
      );
    }
  }
  return errors;
}

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    throw new Error(`${path}: ${error.message}`, { cause: error });
  }
}

function trackedLockfiles() {
  const files = execFileSync(
    "git",
    ["ls-files", "-z", "--", "package-lock.json", ":(glob)**/package-lock.json"],
    {
      encoding: "utf8",
    }
  );
  return new Set(files.split("\0").filter(Boolean));
}

function readInstalledHooks(lockfile, lock) {
  const root = realpathSync(dirname(lockfile));
  const hooks = new Map();
  for (const [path, entry] of Object.entries(lock.packages)) {
    // Workspace links point at a separate packages entry, inspected at its source path.
    if (entry.link) continue;
    const directory = join(root, path);
    const inNodeModules = path.split("/").includes("node_modules");
    if (inNodeModules && !existsSync(directory)) continue;

    const manifestPath = join(directory, "package.json");
    const expected = identity(path, entry, lock);
    const label = location(lockfile, path, expected.version);
    if (realpathSync(manifestPath) !== manifestPath) {
      throw new Error(`${label}: installed manifest path resolves through a symlink`);
    }
    const manifest = readJson(manifestPath);
    if (manifest?.name !== expected.name || (manifest?.version ?? null) !== expected.version) {
      throw new Error(`${label}: installed package name/version differs from the lock`);
    }
    hooks.set(
      path,
      findInstallHooks(manifest, {
        includePrepare: !inNodeModules || /^git[+:]/.test(entry.resolved ?? ""),
        hasBindingGyp: statSync(join(directory, "binding.gyp"), {
          throwIfNoEntry: false,
        })?.isFile(),
      })
    );
  }
  return hooks;
}

function main(args) {
  if (args.length && (args.length !== 2 || args[0] !== "--installed")) {
    throw new Error("Usage: node scripts/check/check-install-scripts.mjs [--installed <lockfile>]");
  }
  const files = trackedLockfiles();
  if (!files.size) throw new Error("No tracked npm package-lock.json files found");
  const installedLockfile = args[1];
  if (installedLockfile && !files.has(installedLockfile)) {
    throw new Error(`${installedLockfile}: expected a tracked npm lockfile`);
  }
  const policy = readJson(POLICY_PATH);
  if (policy?.schemaVersion !== 1 || !isRecord(policy.lockfiles)) {
    throw new Error(`${POLICY_PATH}: invalid policy schema`);
  }

  const errors = [];
  for (const [file, decisions] of Object.entries(policy.lockfiles)) {
    if (!Array.isArray(decisions)) throw new Error(`${file}: expected a list of policy decisions`);
    if (!files.has(file)) {
      for (const decision of decisions) {
        errors.push(
          `${location(file, decision?.path ?? "<unknown>", decision?.version)}: orphaned decision (lockfile is not tracked)`
        );
      }
      if (!decisions.length) errors.push(`${file}: orphaned lockfile policy`);
    }
  }
  let installedCount;
  for (const file of files) {
    const lock = readJson(file);
    let observed;
    if (file === installedLockfile && lockErrors(file, lock).length === 0) {
      observed = readInstalledHooks(file, lock);
      installedCount = observed.size;
    }
    const decisions = Object.hasOwn(policy.lockfiles, file) ? policy.lockfiles[file] : [];
    errors.push(...checkLockfile(file, lock, decisions, observed));
  }
  if (errors.length) throw new Error(errors.join("\n"));

  console.log(`[check-install-scripts] OK — ${files.size} npm lockfiles reviewed`);
  if (installedCount !== undefined) {
    console.log(
      `[check-install-scripts] ${installedLockfile}: ${installedCount} local manifests inspected`
    );
  }
}

if (isMainModule(import.meta.url)) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error(`[check-install-scripts] FAIL — ${error.message}`);
    process.exitCode = 1;
  }
}
