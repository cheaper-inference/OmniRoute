#!/usr/bin/env node
import { createHash } from "node:crypto";
import {
  chmodSync,
  cpSync,
  existsSync,
  lstatSync,
  mkdirSync,
  openSync,
  readFileSync,
  readdirSync,
  realpathSync,
  renameSync,
  rmSync,
  statSync,
  symlinkSync,
  unlinkSync,
  writeFileSync,
  fsyncSync,
  closeSync,
} from "node:fs";
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";

const MANIFEST_NAME = ".zcode-native-runtime-manifest.json";
const REQUIRED_FILES = ["node", "server-core.js", "zcode.cjs"];

function isWithin(root, candidate) {
  const rel = relative(root, candidate);
  return rel === "" || (rel !== ".." && !rel.startsWith(`..${sep}`) && !isAbsolute(rel));
}

function enumerateRuntime(sourceRoot, { ignoreInstallerManifest = false } = {}) {
  const rootInfo = lstatSync(sourceRoot);
  const records = [{ path: ".", type: "directory", mode: rootInfo.mode & 0o777 }];
  const visit = (directory, prefix = "") => {
    for (const name of readdirSync(directory).sort()) {
      if (!prefix && name === MANIFEST_NAME) {
        if (ignoreInstallerManifest) continue;
        throw new Error(`Source uses reserved installer filename: ${MANIFEST_NAME}`);
      }
      const absolute = join(directory, name);
      const path = prefix ? `${prefix}/${name}` : name;
      const info = lstatSync(absolute);
      if (info.isSymbolicLink()) {
        let resolvedTarget;
        try {
          resolvedTarget = realpathSync(absolute);
        } catch {
          throw new Error(`Runtime contains a broken symlink: ${path}`);
        }
        if (!isWithin(sourceRoot, resolvedTarget))
          throw new Error(`Runtime symlink escapes source directory: ${path}`);
        const targetPath = relative(sourceRoot, resolvedTarget);
        const portableTarget = relative(dirname(path), targetPath).split(sep).join("/");
        records.push({ path, type: "symlink", target: portableTarget, mode: info.mode & 0o777 });
      } else if (info.isDirectory()) {
        records.push({ path, type: "directory", mode: info.mode & 0o777 });
        visit(absolute, path);
      } else if (info.isFile()) {
        const digest = createHash("sha256").update(readFileSync(absolute)).digest("hex");
        records.push({ path, type: "file", mode: info.mode & 0o777, sha256: digest });
      } else {
        throw new Error(`Runtime contains an unsupported filesystem object: ${path}`);
      }
    }
  };

  visit(sourceRoot);
  for (const required of REQUIRED_FILES) {
    const record = records.find((entry) => entry.path === required);
    if (!record || record.type === "directory")
      throw new Error(`Runtime is incomplete: required file '${required}' is missing`);
    const target = join(sourceRoot, required);
    if (!statSync(target).isFile())
      throw new Error(`Runtime is incomplete: required file '${required}' is not a file`);
  }
  return records;
}

function manifestFor(records) {
  const canonical = `${JSON.stringify(records)}\n`;
  const id = createHash("sha256").update(canonical).digest("hex");
  return { id, records, canonical };
}

function restoreCopiedModes(root, records) {
  for (const record of records) {
    if (record.type === "file") chmodSync(join(root, record.path), record.mode);
  }
  records
    .filter((record) => record.type === "directory")
    .sort((a, b) => b.path.length - a.path.length)
    .forEach((record) => chmodSync(join(root, record.path), record.mode));
}

function ensurePrivateDirectory(path) {
  mkdirSync(path, { recursive: true, mode: 0o700 });
  const info = lstatSync(path);
  if (info.isSymbolicLink() || !info.isDirectory())
    throw new Error(`Installer state path must be a real directory: ${path}`);
  chmodSync(path, 0o700);
}

function lstatIfPresent(path) {
  try {
    return lstatSync(path);
  } catch (error) {
    if (error?.code === "ENOENT") return undefined;
    throw error;
  }
}

function readReleaseManifest(releasePath) {
  const manifestPath = join(releasePath, MANIFEST_NAME);
  const manifestInfo = lstatIfPresent(manifestPath);
  if (!manifestInfo || manifestInfo.isSymbolicLink() || !manifestInfo.isFile())
    throw new Error(`Existing release is missing a regular ${MANIFEST_NAME}`);
  let saved;
  try {
    saved = JSON.parse(readFileSync(manifestPath, "utf8"));
  } catch {
    throw new Error("Existing release manifest is invalid");
  }
  const actual = manifestFor(enumerateRuntime(releasePath, { ignoreInstallerManifest: true }));
  if (
    saved.id !== actual.id ||
    saved.id !== basename(releasePath) ||
    saved.records.length !== actual.records.length
  )
    throw new Error("Existing release content differs; refusing to overwrite immutable runtime");
  if (JSON.stringify(saved.records) !== JSON.stringify(actual.records))
    throw new Error("Existing release manifest does not match runtime contents");
  return actual;
}

function readCurrent(currentPath, releasesPath) {
  if (!existsSync(currentPath)) return undefined;
  let current;
  try {
    current = JSON.parse(readFileSync(currentPath, "utf8"));
  } catch {
    throw new Error("current.json is invalid; refusing to replace the active runtime pointer");
  }
  if (
    !current ||
    typeof current.id !== "string" ||
    typeof current.runtime !== "string" ||
    !isAbsolute(current.runtime) ||
    !isWithin(releasesPath, current.runtime) ||
    (current.previousRuntime !== undefined &&
      (typeof current.previousRuntime !== "string" || !isAbsolute(current.previousRuntime)))
  ) {
    throw new Error("current.json has an invalid runtime pointer; refusing activation");
  }
  return current;
}

function atomicWriteCurrent(currentPath, value) {
  const directory = dirname(currentPath);
  const temporary = join(directory, `.current.json.${process.pid}.${Date.now()}.tmp`);
  const fd = openSync(temporary, "wx", 0o600);
  try {
    writeFileSync(fd, `${JSON.stringify(value, null, 2)}\n`, "utf8");
    fsyncSync(fd);
  } finally {
    closeSync(fd);
  }
  chmodSync(temporary, 0o600);
  renameSync(temporary, currentPath);
  const dirFd = openSync(directory, "r");
  try {
    fsyncSync(dirFd);
  } finally {
    closeSync(dirFd);
  }
}

export function installZcodeNativeRuntime({ source, dataDir, activate = false }) {
  if (typeof source !== "string" || !isAbsolute(source))
    throw new Error("--source must be an absolute path");
  if (typeof dataDir !== "string" || !dataDir) throw new Error("--data-dir is required");

  const sourceRoot = realpathSync(source);
  if (!statSync(sourceRoot).isDirectory()) throw new Error("--source must name a directory");
  const stateRoot = resolve(dataDir, "zcode-native-runtime");
  const releasesPath = join(stateRoot, "releases");
  if (isWithin(sourceRoot, releasesPath))
    throw new Error("Runtime destination cannot be inside the source directory");

  const initialManifest = manifestFor(enumerateRuntime(sourceRoot));
  const currentPath = join(stateRoot, "current.json");
  const targetPath = join(releasesPath, initialManifest.id);

  ensurePrivateDirectory(stateRoot);
  ensurePrivateDirectory(releasesPath);

  if (lstatIfPresent(targetPath)) {
    if (lstatSync(targetPath).isSymbolicLink() || !lstatSync(targetPath).isDirectory())
      throw new Error("Existing release path is not a regular directory; refusing to replace it");
    readReleaseManifest(targetPath);
  } else {
    const stagingPath = join(
      releasesPath,
      `.${initialManifest.id}.${process.pid}.${Date.now()}.stage`
    );
    try {
      cpSync(sourceRoot, stagingPath, {
        recursive: true,
        dereference: false,
        preserveTimestamps: true,
      });
      for (const record of initialManifest.records) {
        if (record.type !== "symlink") continue;
        const stagedLink = join(stagingPath, record.path);
        unlinkSync(stagedLink);
        symlinkSync(record.target, stagedLink);
      }
      restoreCopiedModes(stagingPath, initialManifest.records);
      const copiedManifest = manifestFor(enumerateRuntime(stagingPath));
      if (copiedManifest.id !== initialManifest.id)
        throw new Error("Runtime source changed while it was being copied; staged copy rejected");
      writeFileSync(
        join(stagingPath, MANIFEST_NAME),
        `${JSON.stringify({ id: copiedManifest.id, records: copiedManifest.records }, null, 2)}\n`,
        { mode: 0o600, flag: "wx" }
      );
      chmodSync(join(stagingPath, MANIFEST_NAME), 0o600);
      renameSync(stagingPath, targetPath);
    } catch (error) {
      rmSync(stagingPath, { recursive: true, force: true });
      throw error;
    }
  }

  const result = { runtime: targetPath, id: initialManifest.id };
  if (activate) {
    const current = readCurrent(currentPath, releasesPath);
    if (current?.id === result.id && current.runtime === result.runtime) return result;
    const next = {
      runtime: targetPath,
      ...(current ? { previousRuntime: current.runtime } : {}),
      id: result.id,
    };
    atomicWriteCurrent(currentPath, next);
  }
  return result;
}

function parseArgs(argv) {
  const options = { activate: false };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--activate") {
      options.activate = true;
    } else if (arg === "--source" || arg === "--data-dir") {
      const value = argv[index + 1];
      if (!value || value.startsWith("--")) throw new Error(`${arg} requires a value`);
      options[arg.slice(2).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())] = value;
      index += 1;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return options;
}

async function main() {
  try {
    const result = installZcodeNativeRuntime(parseArgs(process.argv.slice(2)));
    process.stdout.write(`${JSON.stringify(result)}\n`);
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href)
  await main();
