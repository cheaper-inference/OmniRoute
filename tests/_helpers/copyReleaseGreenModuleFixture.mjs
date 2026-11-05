import { createHash } from "node:crypto";
import { lstatSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { isBuiltin } from "node:module";
import { dirname, isAbsolute, join, posix, relative, resolve, sep } from "node:path";
import ts from "typescript";

const OBSERVER = "scripts/quality/validate-release-green.mjs";
const METRICS = "scripts/quality/collect-metrics.mjs";
const MAX_FILES = 32;
const MAX_FILE_BYTES = 1024 * 1024;
const MAX_TOTAL_BYTES = 2 * 1024 * 1024;

function requireFixture(condition, code, detail) {
  if (!condition) {
    throw Object.assign(new Error(`${code}: ${detail}`), { code });
  }
}

function regularRoot(value) {
  const root = resolve(value);
  requireFixture(
    lstatSync(root).isDirectory() && realpathSync(root) === root,
    "FIXTURE_ROOT_NOT_PHYSICAL",
    root
  );
  return root;
}

function modulePath(value) {
  requireFixture(
    typeof value === "string" &&
      value.startsWith("scripts/") &&
      !value.includes("\\") &&
      !value.includes("\0") &&
      !value
        .split("/")
        .some((part) => part === ".." || part.startsWith("_") || part === "node_modules") &&
      posix.normalize(value) === value &&
      value.endsWith(".mjs"),
    "UNSUPPORTED_FIXTURE_MODULE_PATH",
    value
  );
  return value;
}

function pathMetadata(root, file, allowMissing) {
  let current = root;
  const parts = file.split("/");
  for (const [index, part] of parts.entries()) {
    current = join(current, part);
    let metadata;
    try {
      metadata = lstatSync(current);
    } catch (error) {
      if (allowMissing && error.code === "ENOENT") return null;
      throw error;
    }
    requireFixture(!metadata.isSymbolicLink(), "FIXTURE_MODULE_SYMLINK", file);
    if (index < parts.length - 1) {
      requireFixture(metadata.isDirectory(), "FIXTURE_MODULE_PARENT_NOT_DIRECTORY", file);
    } else {
      requireFixture(metadata.isFile(), "FIXTURE_MODULE_NOT_REGULAR", file);
      return metadata;
    }
  }
  return null;
}

function moduleImports(file, bytes) {
  const source = ts.createSourceFile(
    file,
    bytes.toString("utf8"),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.JS
  );
  requireFixture(source.parseDiagnostics.length === 0, "FIXTURE_MODULE_PARSE_ERROR", file);
  const specifiers = [];
  function visit(node) {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
      if (node.moduleSpecifier) {
        requireFixture(ts.isStringLiteral(node.moduleSpecifier), "NONLITERAL_STATIC_IMPORT", file);
        requireFixture(
          !node.attributes && !node.assertClause,
          "IMPORT_ATTRIBUTES_OUTSIDE_FIXTURE_CONTRACT",
          file
        );
        specifiers.push(node.moduleSpecifier.text);
      }
    }
    requireFixture(
      !ts.isImportEqualsDeclaration(node) &&
        !(
          ts.isCallExpression(node) &&
          (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
            (ts.isIdentifier(node.expression) &&
              ["require", "createRequire"].includes(node.expression.text)) ||
            (ts.isPropertyAccessExpression(node.expression) &&
              node.expression.name.text === "createRequire"))
        ) &&
        !(ts.isImportSpecifier(node) && (node.propertyName || node.name).text === "createRequire"),
      "DYNAMIC_MODULE_LOADING_OUTSIDE_FIXTURE_CONTRACT",
      file
    );
    ts.forEachChild(node, visit);
  }
  visit(source);
  return specifiers;
}

/**
 * Copy only the static ESM .mjs closure of the observer (and optionally metrics).
 * Never imports source modules, copies packages/data/configs, or resolves dynamic loaders.
 * Existing fixture data stays owned by its test; any module collision fails before copying.
 */
export function copyReleaseGreenModuleFixture(sourceRoot, fixtureRoot, options = {}) {
  requireFixture(
    options &&
      Object.getPrototypeOf(options) === Object.prototype &&
      Object.keys(options).every((key) => key === "includeMetrics"),
    "INVALID_FIXTURE_ENTRY_SELECTION",
    "options"
  );
  const { includeMetrics = false } = options;
  requireFixture(
    typeof includeMetrics === "boolean",
    "INVALID_FIXTURE_ENTRY_SELECTION",
    "includeMetrics"
  );
  const source = regularRoot(sourceRoot);
  const destination = regularRoot(fixtureRoot);
  const sourceUnderDestination = relative(destination, source);
  requireFixture(
    sourceUnderDestination !== "" &&
      (sourceUnderDestination === ".." ||
        sourceUnderDestination.startsWith(`..${sep}`) ||
        isAbsolute(sourceUnderDestination)),
    "FIXTURE_DESTINATION_CONTAINS_SOURCE",
    destination
  );
  const pending = [OBSERVER, ...(includeMetrics ? [METRICS] : [])];
  const modules = new Map();
  const externalImports = new Set();
  const edges = [];
  let totalBytes = 0;
  while (pending.length) {
    const file = modulePath(pending.shift());
    if (modules.has(file)) continue;
    requireFixture(modules.size < MAX_FILES, "FIXTURE_MODULE_COUNT_LIMIT", file);
    const metadata = pathMetadata(source, file, false);
    requireFixture(metadata.size <= MAX_FILE_BYTES, "FIXTURE_MODULE_BYTE_LIMIT", file);
    const bytes = readFileSync(join(source, file));
    totalBytes += bytes.length;
    requireFixture(
      bytes.length <= MAX_FILE_BYTES && totalBytes <= MAX_TOTAL_BYTES,
      "FIXTURE_TOTAL_BYTE_LIMIT",
      file
    );
    modules.set(file, { bytes, mode: metadata.mode & 0o777 });
    for (const specifier of moduleImports(file, bytes)) {
      if (specifier.startsWith("./") || specifier.startsWith("../")) {
        // ESM resolves relative specifiers as URLs. Percent escapes and control
        // stripping must never select a different file than the literal path copied here.
        requireFixture(
          !/[?#%\\]/.test(specifier) && !/\p{Cc}/u.test(specifier),
          "UNSUPPORTED_LOCAL_IMPORT_SPECIFIER",
          specifier
        );
        const dependency = modulePath(posix.join(posix.dirname(file), specifier));
        edges.push({ importer: file, specifier, dependency });
        pending.push(dependency);
      } else {
        requireFixture(
          isBuiltin(specifier) ||
            (!specifier.startsWith(".") &&
              !specifier.startsWith("/") &&
              !specifier.startsWith("#") &&
              !/[:?\\\0]/.test(specifier)),
          "UNSUPPORTED_EXTERNAL_IMPORT_SPECIFIER",
          specifier
        );
        externalImports.add(specifier);
      }
    }
  }
  const files = [...modules.keys()].sort();
  for (const file of files) {
    requireFixture(
      pathMetadata(destination, file, true) === null,
      "FIXTURE_MODULE_ALREADY_EXISTS",
      file
    );
  }
  // Validate the complete closure first. I/O errors while writing still fail the fixture;
  // its existing finally/t.after cleanup owns any partial output, not this helper.
  for (const file of files) {
    const target = join(destination, file);
    mkdirSync(dirname(target), { recursive: true });
    pathMetadata(destination, file, true);
    writeFileSync(target, modules.get(file).bytes, { flag: "wx", mode: modules.get(file).mode });
  }
  return {
    files: files.map((file) => ({
      path: file,
      bytes: modules.get(file).bytes.length,
      sha256: createHash("sha256").update(modules.get(file).bytes).digest("hex"),
    })),
    edges,
    externalImports: [...externalImports].sort(),
    totalBytes,
  };
}
