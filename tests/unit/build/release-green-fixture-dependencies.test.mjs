import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  symlinkSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import test from "node:test";
import { copyReleaseGreenModuleFixture } from "../../_helpers/copyReleaseGreenModuleFixture.mjs";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const observer = "scripts/quality/validate-release-green.mjs";
const metrics = "scripts/quality/collect-metrics.mjs";

function fixture(t) {
  assert.equal(
    root.split(sep).includes("_tasks"),
    false,
    "Run from a candidate or runtime capsule"
  );
  const artifacts = join(root, "_artifacts");
  mkdirSync(artifacts, { recursive: true });
  const directory = mkdtempSync(join(artifacts, "observer-dependency-fixture-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  const source = join(directory, "source");
  const destination = join(directory, "destination");
  mkdirSync(source);
  mkdirSync(destination);
  const write = (file, text) => {
    const target = join(source, file);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, text);
  };
  return { directory, source, destination, write };
}

test("observer fixtures automatically include a newly added transitive static dependency", (t) => {
  const { source, destination, write } = fixture(t);
  write(observer, 'import "../ci/unit-diagnostics.mjs"; export const ready = true;');
  write("scripts/ci/unit-diagnostics.mjs", 'export { summary } from "./new-summary.mjs";');
  write("scripts/ci/new-summary.mjs", 'export const summary = "new dependency";');
  write("scripts/quality/unrelated.mjs", "throw new Error('must not be copied or executed');");
  write("config/quality/quality-baseline.json", '{"real":"not fixture data"}');
  mkdirSync(join(destination, "config/quality"), { recursive: true });
  const artificial = '{"metrics":{"eslintWarnings":{"value":123}}}';
  writeFileSync(join(destination, "config/quality/quality-baseline.json"), artificial);
  const result = copyReleaseGreenModuleFixture(source, destination);
  assert.deepEqual(
    result.files.map((row) => row.path),
    ["scripts/ci/new-summary.mjs", "scripts/ci/unit-diagnostics.mjs", observer]
  );
  assert.equal(
    readFileSync(join(destination, "scripts/ci/new-summary.mjs"), "utf8"),
    'export const summary = "new dependency";'
  );
  assert.equal(
    readFileSync(join(destination, "config/quality/quality-baseline.json"), "utf8"),
    artificial
  );
  assert.equal(existsSync(join(destination, "scripts/quality/unrelated.mjs")), false);
});

test("static imports, reexports and cycles are traversed once without evaluating modules", (t) => {
  const { source, destination, write } = fixture(t);
  write(
    observer,
    'import "./cycle.mjs"; export * from "./reexport.mjs"; throw new Error("not executed");'
  );
  write("scripts/quality/cycle.mjs", 'import "./validate-release-green.mjs";');
  write("scripts/quality/reexport.mjs", 'export { value } from "./value.mjs";');
  write("scripts/quality/value.mjs", "export const value = 42;");
  const result = copyReleaseGreenModuleFixture(source, destination);
  assert.equal(result.files.length, 4);
  assert.equal(new Set(result.files.map((row) => row.path)).size, 4);
});

test("comments and string examples are not dependencies; packages are not copied", (t) => {
  const { source, destination, write } = fixture(t);
  write(
    observer,
    [
      'import { readFileSync } from "node:fs";',
      'import yaml from "js-yaml";',
      '// import "./absent-comment.mjs";',
      "export const example = \"import('./absent-example.mjs')\";",
    ].join("\n")
  );
  const result = copyReleaseGreenModuleFixture(source, destination);
  assert.deepEqual(result.externalImports, ["js-yaml", "node:fs"]);
  assert.deepEqual(
    result.files.map((row) => row.path),
    [observer]
  );
  assert.equal(existsSync(join(destination, "node_modules")), false);
});

test("metrics is an explicit second entry rather than a hand-maintained dependency list", (t) => {
  const { source, destination, write } = fixture(t);
  write(observer, "export const ready = true;");
  write(metrics, 'import "../i18n/message-lookup.mjs";');
  write("scripts/i18n/message-lookup.mjs", "export const lookup = () => null;");
  const result = copyReleaseGreenModuleFixture(source, destination, { includeMetrics: true });
  assert.deepEqual(
    result.files.map((row) => row.path),
    ["scripts/i18n/message-lookup.mjs", metrics, observer]
  );
});

test("unknown entry options cannot silently omit a requested fixture module", (t) => {
  const { source, destination, write } = fixture(t);
  write(observer, "export const ready = true;");
  assert.throws(() => copyReleaseGreenModuleFixture(source, destination, { includeMetric: true }), {
    code: "INVALID_FIXTURE_ENTRY_SELECTION",
  });
  assert.deepEqual(readdirSync(destination), []);
});

for (const [name, sourceText, code] of [
  [
    "dynamic import",
    'export const load = () => import("./lazy.mjs");',
    "DYNAMIC_MODULE_LOADING_OUTSIDE_FIXTURE_CONTRACT",
  ],
  ["require", 'require("./legacy.cjs");', "DYNAMIC_MODULE_LOADING_OUTSIDE_FIXTURE_CONTRACT"],
  [
    "createRequire alias",
    'import {createRequire as makeLoader} from "node:module";',
    "DYNAMIC_MODULE_LOADING_OUTSIDE_FIXTURE_CONTRACT",
  ],
  [
    "JSON resource",
    'import data from "./config.json" with {type:"json"};',
    "IMPORT_ATTRIBUTES_OUTSIDE_FIXTURE_CONTRACT",
  ],
  ["source escape", 'import "../../../outside.mjs";', "UNSUPPORTED_FIXTURE_MODULE_PATH"],
  ["source private path", 'import "../../_tasks/private.mjs";', "UNSUPPORTED_FIXTURE_MODULE_PATH"],
  ["extensionless import", 'import "./implicit";', "UNSUPPORTED_FIXTURE_MODULE_PATH"],
  ["JS package-mode ambiguity", 'import "./dependency.js";', "UNSUPPORTED_FIXTURE_MODULE_PATH"],
  [
    "remote URL",
    'import "https://example.invalid/module.mjs";',
    "UNSUPPORTED_EXTERNAL_IMPORT_SPECIFIER",
  ],
]) {
  test(`unsupported ${name} fails before copying a partial closure`, (t) => {
    const { source, destination, write } = fixture(t);
    write(observer, sourceText);
    assert.throws(() => copyReleaseGreenModuleFixture(source, destination), { code });
    assert.deepEqual(readdirSync(destination), []);
  });
}

for (const [name, specifier] of [
  ["percent-encoded filename", "./%64ep.mjs"],
  ["tab in filename", "./de\tp.mjs"],
  ["line feed in filename", "./de\np.mjs"],
  ["carriage return in filename", "./de\rp.mjs"],
]) {
  test(
    `URL-normalized ${name} is rejected even when both filenames exist`,
    {
      skip:
        process.platform === "win32" && name !== "percent-encoded filename"
          ? "Windows cannot create filenames containing TAB, LF or CR"
          : false,
    },
    (t) => {
      const { source, destination, write } = fixture(t);
      write(observer, `import ${JSON.stringify(specifier)};`);
      const literalPath = `scripts/quality/${specifier.slice(2)}`;
      const resolvedPath = "scripts/quality/dep.mjs";
      write(literalPath, 'export const identity = "literal filesystem name";');
      write(resolvedPath, 'export const identity = "ESM URL target";');
      assert.notEqual(literalPath, resolvedPath);
      assert.equal(existsSync(join(source, literalPath)), true);
      assert.equal(existsSync(join(source, resolvedPath)), true);
      assert.equal(
        fileURLToPath(new URL(specifier, pathToFileURL(join(source, observer)))),
        join(source, resolvedPath)
      );
      assert.throws(() => copyReleaseGreenModuleFixture(source, destination), {
        code: "UNSUPPORTED_LOCAL_IMPORT_SPECIFIER",
      });
      assert.deepEqual(readdirSync(destination), []);
    }
  );
}

test("missing local dependency fails before any module is copied", (t) => {
  const { source, destination, write } = fixture(t);
  write(observer, 'import "../ci/missing.mjs";');
  assert.throws(() => copyReleaseGreenModuleFixture(source, destination), { code: "ENOENT" });
  assert.deepEqual(readdirSync(destination), []);
});

test("existing synthetic module content is never overwritten", (t) => {
  const { source, destination, write } = fixture(t);
  write(observer, "export const real = true;");
  mkdirSync(join(destination, "scripts/quality"), { recursive: true });
  writeFileSync(join(destination, observer), "export const artificial = true;");
  assert.throws(() => copyReleaseGreenModuleFixture(source, destination), {
    code: "FIXTURE_MODULE_ALREADY_EXISTS",
  });
  assert.equal(
    readFileSync(join(destination, observer), "utf8"),
    "export const artificial = true;"
  );
});

test("the source checkout cannot be selected as the destination", (t) => {
  const { source, write } = fixture(t);
  write(observer, "export const ready = true;");
  assert.throws(() => copyReleaseGreenModuleFixture(source, source), {
    code: "FIXTURE_DESTINATION_CONTAINS_SOURCE",
  });
});

test(
  "symlinked source modules and destination parents are rejected",
  { skip: process.platform === "win32" },
  (t) => {
    const { directory, source, destination, write } = fixture(t);
    write(observer, 'import "./linked.mjs";');
    const outside = join(directory, "outside.mjs");
    writeFileSync(outside, "export const outside = true;");
    symlinkSync(outside, join(source, "scripts/quality/linked.mjs"));
    assert.throws(() => copyReleaseGreenModuleFixture(source, destination), {
      code: "FIXTURE_MODULE_SYMLINK",
    });
    assert.deepEqual(readdirSync(destination), []);
    write(observer, "export const ready = true;");
    symlinkSync(join(source, "scripts"), join(destination, "scripts"), "dir");
    assert.throws(() => copyReleaseGreenModuleFixture(source, destination), {
      code: "FIXTURE_MODULE_SYMLINK",
    });
  }
);

test("closure size is bounded instead of copying an unrelated module tree", (t) => {
  const { source, destination, write } = fixture(t);
  write(observer, 'import "./dependency-0.mjs";');
  for (let index = 0; index < 32; index++) {
    write(
      `scripts/quality/dependency-${index}.mjs`,
      index === 31 ? "export const end = true;" : `import "./dependency-${index + 1}.mjs";`
    );
  }
  assert.throws(() => copyReleaseGreenModuleFixture(source, destination), {
    code: "FIXTURE_MODULE_COUNT_LIMIT",
  });
  assert.deepEqual(readdirSync(destination), []);
});

test("the real observer bootstrap detects the omitted diagnostic dependency and accepts the complete closure", (t) => {
  const { directory, destination } = fixture(t);
  const incomplete = join(directory, "incomplete");
  mkdirSync(incomplete);
  copyReleaseGreenModuleFixture(root, incomplete);
  unlinkSync(join(incomplete, "scripts/ci/unit-diagnostics.mjs"));
  copyReleaseGreenModuleFixture(root, destination);
  const bootstrap = (target) => {
    mkdirSync(join(target, "scripts/ad-hoc"), { recursive: true });
    writeFileSync(join(target, "package.json"), '{"type":"commonjs"}');
    const script = join(target, "scripts/ad-hoc/bootstrap-observer.mjs");
    writeFileSync(
      script,
      'import {writeObserverJson} from "../quality/validate-release-green.mjs";\nprocess.stdout.write(JSON.stringify({ready:typeof writeObserverJson === "function"}));\n'
    );
    return spawnSync(process.execPath, [script], {
      cwd: target,
      encoding: "utf8",
      timeout: 20000,
      maxBuffer: 1024 * 1024,
      env: {
        ...process.env,
        HOME: target,
        DATA_DIR: join(target, "data"),
        NODE_ENV: "test",
        GITHUB_OUTPUT: "",
      },
    });
  };
  const red = bootstrap(incomplete);
  assert.equal(red.error, undefined);
  assert.equal(red.signal, null);
  assert.notEqual(red.status, 0);
  assert.match(red.stderr, /ERR_MODULE_NOT_FOUND/);
  assert.match(red.stderr, /unit-diagnostics\.mjs/);
  const green = bootstrap(destination);
  assert.equal(green.error, undefined);
  assert.equal(green.signal, null);
  assert.equal(green.status, 0, green.stderr);
  assert.deepEqual(JSON.parse(green.stdout), { ready: true });
});
