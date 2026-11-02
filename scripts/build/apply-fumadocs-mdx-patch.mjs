import {
  existsSync,
  lstatSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, "../..");
const expectedVersion = "15.4.6";

const sourceMarkers = [
  "function toArray(value) {\n\treturn value === void 0 ? [] : Array.isArray(value) ? value : [value];\n}",
  "init(isDev, core, options.watcher)",
  "function init(dev, core, watcherOptions) {",
  "ignored: [core.outDir, ...toArray(watcherOptions?.ignored)]",
];
const typeMarkers = [
  'import type { ChokidarOptions } from "chokidar";',
  "watcher?: Pick<ChokidarOptions, 'ignored'>;",
];

const usage =
  "Usage: node scripts/build/apply-fumadocs-mdx-patch.mjs [--postinstall] [--root <dependency-root>]";

function parseArguments(argumentsToParse) {
  const remaining = [...argumentsToParse];
  const postinstallIndex = remaining.indexOf("--postinstall");
  const postinstall = postinstallIndex !== -1;
  if (postinstall) remaining.splice(postinstallIndex, 1);

  if (remaining.length === 0) return { dependencyRoot: repositoryRoot, postinstall };
  if (remaining.length === 2 && remaining[0] === "--root" && remaining[1].length > 0)
    return { dependencyRoot: resolve(remaining[1]), postinstall };
  throw new Error(usage);
}

function countOccurrences(text, value) {
  let count = 0;
  let position = 0;
  while ((position = text.indexOf(value, position)) !== -1) {
    count += 1;
    position += value.length;
  }
  return count;
}

function replaceUnique(text, anchor, replacement, label) {
  const count = countOccurrences(text, anchor);
  if (count !== 1) throw new Error(`${label} anchor must occur exactly once; found ${count}.`);
  return text.replace(anchor, replacement);
}

function withNormalizedLineEndings(text, transform) {
  const hasCrLf = text.includes("\r\n");
  const withoutCrLf = text.replaceAll("\r\n", "");
  if (withoutCrLf.includes("\r") || (hasCrLf && withoutCrLf.includes("\n")))
    throw new Error("mixed or unsupported line endings.");

  const normalized = hasCrLf ? text.replaceAll("\r\n", "\n") : text;
  const transformed = transform(normalized);
  return hasCrLf ? transformed.replaceAll("\n", "\r\n") : transformed;
}

function classification(text, markers) {
  const normalized = text.replaceAll("\r\n", "\n");
  const present = markers.filter((marker) => normalized.includes(marker));
  if (present.length === markers.length) return "patched";
  if (present.length > 0) return "partial";
  return "unpatched";
}

function assertPathInside(packageRoot, path, label) {
  const pathRelativeToPackage = relative(packageRoot, path);
  if (
    pathRelativeToPackage === "" ||
    isAbsolute(pathRelativeToPackage) ||
    pathRelativeToPackage === ".." ||
    pathRelativeToPackage.startsWith(`..${process.platform === "win32" ? "\\" : "/"}`)
  )
    throw new Error(`${label} path escapes the fumadocs-mdx package directory.`);
}

function resolvePatchTarget(packageRoot, targetSegments, label) {
  const targetPath = join(packageRoot, ...targetSegments);
  if (lstatSync(targetPath).isSymbolicLink())
    throw new Error(`${label} target must not be a symbolic link.`);

  const resolvedTargetPath = realpathSync(targetPath);
  assertPathInside(packageRoot, resolvedTargetPath, label);
  return resolvedTargetPath;
}

function transformSource(source) {
  return withNormalizedLineEndings(source, (text) => {
    let transformed = replaceUnique(
      text,
      "];\nfunction createMDX(options = {}) {",
      "];\nfunction toArray(value) {\n\treturn value === void 0 ? [] : Array.isArray(value) ? value : [value];\n}\nfunction createMDX(options = {}) {",
      "createMDX declaration"
    );
    transformed = replaceUnique(
      transformed,
      "pending = init(isDev, core);",
      "pending = init(isDev, core, options.watcher);",
      "createMDX initialization"
    );
    transformed = replaceUnique(
      transformed,
      "function init(dev, core) {",
      "function init(dev, core, watcherOptions) {",
      "init declaration"
    );
    transformed = replaceUnique(
      transformed,
      "ignored: [core.outDir]",
      "ignored: [core.outDir, ...toArray(watcherOptions?.ignored)]",
      "development watcher"
    );
    return transformed;
  });
}

function transformTypes(types) {
  return withNormalizedLineEndings(types, (text) => {
    let transformed = replaceUnique(
      text,
      'import { NextConfig } from "next";',
      'import type { ChokidarOptions } from "chokidar";\nimport { NextConfig } from "next";',
      "CreateMDXOptions imports"
    );
    transformed = replaceUnique(
      transformed,
      "  index?: IndexFilePluginOptions | false;\n}",
      "  index?: IndexFilePluginOptions | false;\n  /**\n   * Files or directories excluded from Fumadocs' development watcher.\n   */\n  watcher?: Pick<ChokidarOptions, 'ignored'>;\n}",
      "CreateMDXOptions declaration"
    );
    return transformed;
  });
}

function verifyPatched(path, markers, label) {
  if (classification(readFileSync(path, "utf8"), markers) !== "patched")
    throw new Error(`${label} was not fully patched after replacement.`);
}

function replaceBothFiles({ sourcePath, typePath, source, types, temporaryDirectory }) {
  const stagedSourcePath = join(temporaryDirectory, "index.js");
  const stagedTypePath = join(temporaryDirectory, "index.d.ts");
  const originalSourcePath = join(temporaryDirectory, "index.js.original");
  const originalTypePath = join(temporaryDirectory, "index.d.ts.original");
  let sourceMoved = false;
  let typesMoved = false;

  writeFileSync(stagedSourcePath, source, "utf8");
  writeFileSync(stagedTypePath, types, "utf8");

  try {
    renameSync(sourcePath, originalSourcePath);
    sourceMoved = true;
    renameSync(typePath, originalTypePath);
    typesMoved = true;
    renameSync(stagedSourcePath, sourcePath);
    renameSync(stagedTypePath, typePath);
    verifyPatched(sourcePath, sourceMarkers, "Fumadocs source");
    verifyPatched(typePath, typeMarkers, "Fumadocs type declaration");
  } catch (error) {
    let rollbackError;
    try {
      if (typesMoved && existsSync(originalTypePath)) {
        rmSync(typePath, { force: true });
        renameSync(originalTypePath, typePath);
      }
      if (sourceMoved && existsSync(originalSourcePath)) {
        rmSync(sourcePath, { force: true });
        renameSync(originalSourcePath, sourcePath);
      }
    } catch (failure) {
      rollbackError = failure;
    }
    if (rollbackError)
      throw new Error(
        `Could not apply the fumadocs-mdx watcher patch and rollback also failed: ${rollbackError.message}`,
        { cause: error }
      );
    throw new Error(
      "Could not apply the fumadocs-mdx watcher patch; original files were restored.",
      {
        cause: error,
      }
    );
  }
}

function applyPatch(dependencyRoot, postinstall) {
  const nodeModulesRoot = join(dependencyRoot, "node_modules");
  const packageRoot = join(nodeModulesRoot, "fumadocs-mdx");
  const packagePath = join(packageRoot, "package.json");

  if (!existsSync(packagePath)) {
    // A devDependency: every global `npm i -g omniroute` lands here, so say nothing on that path.
    if (!postinstall)
      console.log(`fumadocs-mdx is not installed under ${dependencyRoot}; skipping watcher patch.`);
    return;
  }

  const resolvedNodeModulesRoot = realpathSync(nodeModulesRoot);
  const resolvedPackageRoot = realpathSync(packageRoot);
  assertPathInside(resolvedNodeModulesRoot, resolvedPackageRoot, "fumadocs-mdx package");
  const resolvedPackageMetadataPath = resolvePatchTarget(
    resolvedPackageRoot,
    ["package.json"],
    "fumadocs-mdx package metadata"
  );
  const packageMetadata = JSON.parse(readFileSync(resolvedPackageMetadataPath, "utf8"));
  if (packageMetadata.version !== expectedVersion)
    throw new Error(
      `fumadocs-mdx ${expectedVersion} is required; found ${packageMetadata.version}`
    );

  const sourcePath = resolvePatchTarget(
    resolvedPackageRoot,
    ["dist", "next", "index.js"],
    "Fumadocs source"
  );
  const typePath = resolvePatchTarget(
    resolvedPackageRoot,
    ["dist", "next", "index.d.ts"],
    "Fumadocs type declaration"
  );

  const source = readFileSync(sourcePath, "utf8");
  const types = readFileSync(typePath, "utf8");
  const sourceState = classification(source, sourceMarkers);
  const typeState = classification(types, typeMarkers);

  if (sourceState === "patched" && typeState === "patched") {
    console.log(`fumadocs-mdx ${expectedVersion} watcher patch is already applied.`);
    return;
  }
  if (sourceState !== "unpatched" || typeState !== "unpatched")
    throw new Error(
      "fumadocs-mdx is partially patched; restore both target files from a clean 15.4.6 installation before retrying."
    );

  const transformedSource = transformSource(source);
  const transformedTypes = transformTypes(types);
  if (
    classification(transformedSource, sourceMarkers) !== "patched" ||
    classification(transformedTypes, typeMarkers) !== "patched"
  )
    throw new Error("Fumadocs watcher patch transformation did not produce every required marker.");

  const temporaryDirectory = mkdtempSync(join(resolvedNodeModulesRoot, ".fumadocs-mdx-patch-"));
  try {
    replaceBothFiles({
      sourcePath,
      typePath,
      source: transformedSource,
      types: transformedTypes,
      temporaryDirectory,
    });
  } finally {
    rmSync(temporaryDirectory, { recursive: true, force: true });
  }

  console.log(`Applied fumadocs-mdx ${expectedVersion} watcher patch.`);
}

const { dependencyRoot, postinstall } = parseArguments(process.argv.slice(2));

try {
  applyPatch(dependencyRoot, postinstall);
} catch (error) {
  // This bridge only spares the dev watcher some file descriptors, which is not worth a failed
  // `npm ci` after a dependency bump. Every check above runs before the first write, so the install
  // keeps an intact, unpatched Fumadocs. `npm run patch:fumadocs-mdx` still fails on the same error.
  if (!postinstall) throw error;
  console.warn(
    `[fumadocs-mdx patch] skipped: ${error.message} The dev watcher keeps watching docs/i18n; ` +
      "run `npm run patch:fumadocs-mdx` for the failure."
  );
}
