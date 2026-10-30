#!/usr/bin/env node
import { createHash } from "node:crypto";
import { readFile, realpath, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export class LocalPatchGuardError extends Error {
  constructor(message) {
    super(message);
    this.name = "LocalPatchGuardError";
  }
}

function isWithin(root, candidate) {
  const relative = path.relative(root, candidate);
  return (
    relative === "" ||
    (!relative.startsWith(`..${path.sep}`) &&
      relative !== ".." &&
      !path.isAbsolute(relative))
  );
}

function manifestTargetPath(root, target) {
  if (
    typeof target !== "string" ||
    target.length === 0 ||
    target.includes(String.fromCharCode(0))
  ) {
    throw new LocalPatchGuardError(
      "Manifest contains an empty or invalid target path.",
    );
  }

  const hasParentSegment = target
    .split(/[\\/]/)
    .some((segment) => segment === "..");
  if (hasParentSegment) {
    throw new LocalPatchGuardError(
      `Manifest target must not contain '..': ${target}`,
    );
  }

  const absolute = path.isAbsolute(target) || path.win32.isAbsolute(target);
  const candidate = absolute
    ? path.resolve(target)
    : path.resolve(root, target);
  if (!isWithin(root, candidate) || candidate === root) {
    throw new LocalPatchGuardError(
      `Manifest target is outside the package root: ${target}`,
    );
  }
  return candidate;
}

function manifestEntries(manifest) {
  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) {
    throw new LocalPatchGuardError("Manifest must be a JSON object.");
  }
  const expectedVersion = manifest.packageVersion ?? manifest.version;
  if (typeof expectedVersion !== "string" || expectedVersion.length === 0) {
    throw new LocalPatchGuardError(
      "Manifest must declare packageVersion (or version).",
    );
  }
  if (!Array.isArray(manifest.files) || manifest.files.length === 0) {
    throw new LocalPatchGuardError(
      "Manifest must contain a non-empty files array.",
    );
  }
  return { expectedVersion, files: manifest.files };
}

/**
 * Read-only verification of local runtime files against a versioned manifest.
 * Accepts the installed-proof shape (`version`, `files[].target`) as well as
 * the compact form (`packageVersion`, `files[].path`).
 */
export async function verifyLocalPatchManifest({ packageRoot, manifest }) {
  if (typeof packageRoot !== "string" || packageRoot.length === 0) {
    throw new LocalPatchGuardError("A package root is required.");
  }

  let root;
  try {
    root = await realpath(packageRoot);
  } catch {
    throw new LocalPatchGuardError(
      `Package root does not exist: ${packageRoot}`,
    );
  }

  const { expectedVersion, files } = manifestEntries(manifest);
  let packageJson;
  try {
    const packageJsonPath = await realpath(path.join(root, "package.json"));
    if (!isWithin(root, packageJsonPath)) {
      throw new LocalPatchGuardError(
        "package.json resolves outside the package root.",
      );
    }
    packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));
  } catch (error) {
    if (error instanceof LocalPatchGuardError) throw error;
    throw new LocalPatchGuardError(
      "Could not read package.json under the package root.",
    );
  }
  if (packageJson.version !== expectedVersion) {
    throw new LocalPatchGuardError(
      `Package version mismatch: manifest expects ${expectedVersion}, found ${String(packageJson.version)}.`,
    );
  }

  const seen = new Set();
  for (const [index, entry] of files.entries()) {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      throw new LocalPatchGuardError(
        `Manifest file entry ${index} is invalid.`,
      );
    }
    const target = entry.target ?? entry.path;
    const expectedHash = entry.sha256;
    if (
      typeof expectedHash !== "string" ||
      !/^[a-f0-9]{64}$/i.test(expectedHash)
    ) {
      throw new LocalPatchGuardError(
        `Manifest file entry ${index} has an invalid SHA256.`,
      );
    }

    const candidate = manifestTargetPath(root, target);
    let resolved;
    try {
      resolved = await realpath(candidate);
    } catch {
      throw new LocalPatchGuardError(`Manifest target is missing: ${target}`);
    }
    if (!isWithin(root, resolved)) {
      throw new LocalPatchGuardError(
        `Manifest target resolves outside the package root: ${target}`,
      );
    }
    if (seen.has(resolved)) {
      throw new LocalPatchGuardError(
        `Manifest contains a duplicate target: ${target}`,
      );
    }
    seen.add(resolved);

    let targetStat;
    try {
      targetStat = await stat(resolved);
    } catch {
      throw new LocalPatchGuardError(
        `Could not inspect manifest target: ${target}`,
      );
    }
    if (!targetStat.isFile()) {
      throw new LocalPatchGuardError(
        `Manifest target is not a regular file: ${target}`,
      );
    }
    const actualHash = createHash("sha256")
      .update(await readFile(resolved))
      .digest("hex");
    if (actualHash.toLowerCase() !== expectedHash.toLowerCase()) {
      throw new LocalPatchGuardError(
        `SHA256 drift detected for ${target}; refusing to continue.`,
      );
    }
  }

  return {
    ok: true,
    packageVersion: expectedVersion,
    checkedFiles: files.length,
  };
}

function parseArgs(argv) {
  const parsed = {};
  for (let index = 0; index < argv.length; index += 1) {
    const option = argv[index];
    if (option === "--help" || option === "-h") return { help: true };
    if (option !== "--package-root" && option !== "--manifest") {
      throw new LocalPatchGuardError(`Unknown option: ${option}`);
    }
    if (
      parsed[option] !== undefined ||
      !argv[index + 1] ||
      argv[index + 1].startsWith("--")
    ) {
      throw new LocalPatchGuardError(
        `Option ${option} requires exactly one value.`,
      );
    }
    parsed[option] = argv[index + 1];
    index += 1;
  }
  if (!parsed["--package-root"] || !parsed["--manifest"]) {
    throw new LocalPatchGuardError(
      "Usage: local-patch-guard.mjs --package-root <dir> --manifest <file>",
    );
  }
  return parsed;
}

async function main(argv) {
  try {
    const args = parseArgs(argv);
    if (args.help) {
      console.log(
        "Usage: local-patch-guard.mjs --package-root <dir> --manifest <file>",
      );
      return 0;
    }
    const manifest = JSON.parse(await readFile(args["--manifest"], "utf8"));
    const result = await verifyLocalPatchManifest({
      packageRoot: args["--package-root"],
      manifest,
    });
    console.log(
      `Local patch integrity OK: ${result.packageVersion}; ${result.checkedFiles} files verified.`,
    );
    return 0;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Local patch integrity check failed: ${message}`);
    return 1;
  }
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
if (invokedPath === fileURLToPath(import.meta.url)) {
  process.exitCode = await main(process.argv.slice(2));
}
