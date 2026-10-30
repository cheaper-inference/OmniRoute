import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, isAbsolute, join, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";
import { getFumadocsWatcherOptions } from "../../scripts/build/fumadocs-watcher-options.mjs";

const testDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(testDirectory, "../..");
const patchScript = join(repositoryRoot, "scripts", "build", "apply-fumadocs-mdx-patch.mjs");
const dependencyRoot = resolve(process.env.FUMADOCS_PATCH_ROOT ?? repositoryRoot);
const fumadocsRoot = join(dependencyRoot, "node_modules", "fumadocs-mdx");
const patchApplier = await readFile(patchScript, "utf8");
const nextSource = await readFile(join(fumadocsRoot, "dist", "next", "index.js"), "utf8");
const nextTypes = await readFile(join(fumadocsRoot, "dist", "next", "index.d.ts"), "utf8");
const { FSWatcher } = await import(
  pathToFileURL(join(dependencyRoot, "node_modules", "chokidar", "index.js")).href
);

const originalSource = `const defaultPageExtensions = [
\t"mdx",
\t"md"
];
function createMDX(options = {}) {
\tconst core = createNextCore(options);
\tconst isDev = process.env.NODE_ENV === "development";
\tlet pending;
\tif (process.env._FUMADOCS_MDX !== "1") {
\t\tprocess.env._FUMADOCS_MDX = "1";
\t\tpending = init(isDev, core);
\t}
}
function init(dev, core) {
\tasync function devServer() {
\t\tconst watcher = new FSWatcher({
\t\t\tignoreInitial: true,
\t\t\tpersistent: true,
\t\t\tignored: [core.outDir]
\t\t});
\t}
}
`;
const originalTypes = `import { p as IndexFilePluginOptions, r as CoreOptions } from "../core-b6wXL1QY.js";
import { t as MacroPluginOption } from "../options-aB6xV-d7.js";
import { NextConfig } from "next";
export interface CreateMDXOptions extends Pick<CoreOptions, 'configPath' | 'outDir'> {
  macro?: MacroPluginOption;
  index?: IndexFilePluginOptions | false;
}
`;

async function createPatchFixture({
  source = originalSource,
  types = originalTypes,
  version = "15.4.6",
  lineEnding = "\n",
} = {}) {
  const fixtureRoot = await mkdtemp(join(tmpdir(), "fumadocs prewatch applier-"));
  const packageDirectory = join(fixtureRoot, "node_modules", "fumadocs-mdx");
  const distributionDirectory = join(packageDirectory, "dist", "next");
  await mkdir(distributionDirectory, { recursive: true });
  await Promise.all([
    writeFile(join(packageDirectory, "package.json"), JSON.stringify({ version })),
    writeFile(join(distributionDirectory, "index.js"), source.replaceAll("\n", lineEnding)),
    writeFile(join(distributionDirectory, "index.d.ts"), types.replaceAll("\n", lineEnding)),
  ]);
  return {
    fixtureRoot,
    sourcePath: join(distributionDirectory, "index.js"),
    typePath: join(distributionDirectory, "index.d.ts"),
  };
}

function applyPatch(fixtureRoot) {
  return spawnSync(process.execPath, [patchScript, "--root", fixtureRoot], {
    encoding: "utf8",
  });
}

const delay = (milliseconds) =>
  new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));

function hasPathBelow(watched, target) {
  const resolvedTarget = resolve(target);
  return Object.entries(watched).some(([directory, entries]) => {
    const resolvedDirectory = resolve(directory);
    return (
      resolvedDirectory === resolvedTarget ||
      resolvedDirectory.startsWith(`${resolvedTarget}/`) ||
      entries.some(
        (entry) =>
          resolve(resolvedDirectory, entry) === resolvedTarget ||
          resolve(resolvedDirectory, entry).startsWith(`${resolvedTarget}/`)
      )
    );
  });
}

function waitForReady(watcher) {
  return new Promise((resolveReady, rejectReady) => {
    const timeout = setTimeout(
      () => rejectReady(new Error("watcher did not become ready within two seconds")),
      2_000
    );
    watcher.once("ready", () => {
      clearTimeout(timeout);
      resolveReady();
    });
  });
}

async function waitForCondition(condition, description) {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (condition()) return;
    await delay(50);
  }
  throw new Error(`${description} within two seconds`);
}

async function initializeFumadocs({ configPath, outDir, watcher }) {
  let capturedWatcher;
  let firstAddIgnored;
  const originalAdd = FSWatcher.prototype.add;
  FSWatcher.prototype.add = function patchedAdd() {
    if (!capturedWatcher) {
      capturedWatcher = this;
      firstAddIgnored = [...this.options.ignored];
    }
    return this;
  };

  try {
    const { createMDX } = await import(
      pathToFileURL(join(fumadocsRoot, "dist", "next", "index.js")).href
    );
    await createMDX({ configPath, outDir, ...(watcher ? { watcher } : {}) })({});
    await waitForCondition(
      () => capturedWatcher,
      "Fumadocs did not invoke its watcher registration path"
    );
    return { watcher: capturedWatcher, firstAddIgnored };
  } finally {
    FSWatcher.prototype.add = originalAdd;
  }
}

test("Fumadocs configures custom ignores before its first watcher.add", () => {
  const constructorIndex = nextSource.indexOf(
    "ignored: [core.outDir, ...toArray(watcherOptions?.ignored)]"
  );
  const firstAddIndex = nextSource.indexOf("watcher.add(core.configPath)");
  const devServerIndex = nextSource.indexOf("async function devServer()");
  const developmentGateIndex = nextSource.indexOf("if (dev) ready.then(devServer");

  assert.ok(constructorIndex >= 0, "merged ignored list is passed to FSWatcher");
  assert.match(nextSource, /init\(isDev, core, options\.watcher\)/);
  assert.match(nextSource, /function init\(dev, core, watcherOptions\)/);
  assert.ok(firstAddIndex >= 0, "Fumadocs still registers the config path");
  assert.ok(
    constructorIndex < firstAddIndex,
    "ignore configuration precedes the first watcher.add"
  );
  assert.ok(
    devServerIndex >= 0 && developmentGateIndex > devServerIndex,
    "production does not construct the development watcher"
  );
  assert.match(nextTypes, /watcher\?: Pick<ChokidarOptions, 'ignored'>/);
});

test("development excludes an absolute normalized docs/i18n path by default", () => {
  const projectRoot = join(tmpdir(), "fumadocs-prewatch-project", "nested", "..");
  const options = getFumadocsWatcherOptions(projectRoot, { NODE_ENV: "development" });

  assert.deepEqual(options, {
    ignored: [resolve(projectRoot, "docs", "i18n")],
  });
  assert.ok(options.ignored.every(isAbsolute));
});

test("translation watching is opt-in and production has no watcher option", () => {
  const projectRoot = join(tmpdir(), "fumadocs-prewatch-project");

  assert.equal(
    getFumadocsWatcherOptions(projectRoot, {
      NODE_ENV: "development",
      OMNIROUTE_MDX_WATCH_I18N: "1",
    }),
    undefined
  );
  assert.equal(getFumadocsWatcherOptions(projectRoot, { NODE_ENV: "production" }), undefined);
});

test("caller integration leaves Fumadocs compilation inputs unchanged", async () => {
  const [nextConfig, sourceConfig, packageManifest] = await Promise.all([
    readFile(join(repositoryRoot, "next.config.mjs"), "utf8"),
    readFile(join(repositoryRoot, "source.config.ts"), "utf8"),
    readFile(join(repositoryRoot, "package.json"), "utf8"),
  ]);
  const expectedInputs = [
    "./getting-started/**/*.md",
    "./guides/**/*.md",
    "./architecture/**/*.md",
    "./reference/**/*.md",
    "./frameworks/**/*.md",
    "./routing/**/*.md",
    "./security/**/*.md",
    "./compression/**/*.md",
    "./ops/**/*.md",
    "./providers/**/*.md",
    "./comparison/**/*.md",
  ];

  assert.match(
    nextConfig,
    /createMDX\(\{\s*watcher: getFumadocsWatcherOptions\(projectRoot\),\s*\}\)/s
  );
  assert.doesNotMatch(nextConfig, /\.unwatch\(/);
  assert.match(packageManifest, /"scripts\/build\/apply-fumadocs-mdx-patch\.mjs"/);
  assert.match(sourceConfig, /dir: "docs"/);
  for (const input of expectedInputs)
    assert.ok(sourceConfig.includes(input), `${input} remains a compilation input`);
  assert.equal(
    sourceConfig.includes("./i18n/**/*.md"),
    false,
    "translations are not added to compilation globs"
  );
});

test("the patch step is a no-op when a production install omits development dependencies", async () => {
  const emptyRoot = await mkdtemp(join(tmpdir(), "fumadocs-prewatch-empty-"));

  try {
    const result = spawnSync(process.execPath, [patchScript, "--root", emptyRoot], {
      encoding: "utf8",
    });
    assert.equal(result.status, 0);
    assert.match(result.stdout, /skipping watcher patch/);
  } finally {
    await rm(emptyRoot, { recursive: true, force: true });
  }
});

test("the patch applier is Node-only and cleanly applies the exact Fumadocs version", async () => {
  const fixture = await createPatchFixture();

  try {
    assert.doesNotMatch(patchApplier, /node:child_process|spawnSync\("patch"|--dry-run/);
    const result = applyPatch(fixture.fixtureRoot);
    const [source, types] = await Promise.all([
      readFile(fixture.sourcePath, "utf8"),
      readFile(fixture.typePath, "utf8"),
    ]);

    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /Applied fumadocs-mdx 15\.4\.6 watcher patch/);
    assert.match(source, /init\(isDev, core, options\.watcher\)/);
    assert.match(source, /ignored: \[core\.outDir, \.\.\.toArray\(watcherOptions\?\.ignored\)\]/);
    assert.match(types, /watcher\?: Pick<ChokidarOptions, 'ignored'>/);
  } finally {
    await rm(fixture.fixtureRoot, { recursive: true, force: true });
  }
});

test("the patch applier is idempotent after a complete application", async () => {
  const fixture = await createPatchFixture();

  try {
    assert.equal(applyPatch(fixture.fixtureRoot).status, 0);
    const once = await Promise.all([
      readFile(fixture.sourcePath, "utf8"),
      readFile(fixture.typePath, "utf8"),
    ]);
    const second = applyPatch(fixture.fixtureRoot);
    const twice = await Promise.all([
      readFile(fixture.sourcePath, "utf8"),
      readFile(fixture.typePath, "utf8"),
    ]);

    assert.equal(second.status, 0, second.stderr);
    assert.match(second.stdout, /watcher patch is already applied/);
    assert.deepEqual(twice, once);
  } finally {
    await rm(fixture.fixtureRoot, { recursive: true, force: true });
  }
});

test("the patch applier rejects an unexpected Fumadocs version before mutation", async () => {
  const fixture = await createPatchFixture({ version: "15.4.5" });

  try {
    const before = await Promise.all([
      readFile(fixture.sourcePath, "utf8"),
      readFile(fixture.typePath, "utf8"),
    ]);
    const result = applyPatch(fixture.fixtureRoot);
    const after = await Promise.all([
      readFile(fixture.sourcePath, "utf8"),
      readFile(fixture.typePath, "utf8"),
    ]);

    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /fumadocs-mdx 15\.4\.6 is required/);
    assert.deepEqual(after, before);
  } finally {
    await rm(fixture.fixtureRoot, { recursive: true, force: true });
  }
});

test("the patch applier rejects missing and ambiguous anchors without mutation", async () => {
  const missing = await createPatchFixture({
    source: originalSource.replace("pending = init(isDev, core);", "pending = start(isDev, core);"),
  });
  const ambiguous = await createPatchFixture({
    source: `${originalSource}\n// duplicate\npending = init(isDev, core);\n`,
  });

  try {
    for (const fixture of [missing, ambiguous]) {
      const before = await Promise.all([
        readFile(fixture.sourcePath, "utf8"),
        readFile(fixture.typePath, "utf8"),
      ]);
      const result = applyPatch(fixture.fixtureRoot);
      const after = await Promise.all([
        readFile(fixture.sourcePath, "utf8"),
        readFile(fixture.typePath, "utf8"),
      ]);

      assert.notEqual(result.status, 0);
      assert.match(result.stderr, /anchor must occur exactly once/);
      assert.deepEqual(after, before);
    }
  } finally {
    await Promise.all([
      rm(missing.fixtureRoot, { recursive: true, force: true }),
      rm(ambiguous.fixtureRoot, { recursive: true, force: true }),
    ]);
  }
});

test("the patch applier rejects a partial state without mutating either target", async () => {
  const fixture = await createPatchFixture({
    source: originalSource.replace(
      "pending = init(isDev, core);",
      "pending = init(isDev, core, options.watcher);"
    ),
  });

  try {
    const before = await Promise.all([
      readFile(fixture.sourcePath, "utf8"),
      readFile(fixture.typePath, "utf8"),
    ]);
    const result = applyPatch(fixture.fixtureRoot);
    const after = await Promise.all([
      readFile(fixture.sourcePath, "utf8"),
      readFile(fixture.typePath, "utf8"),
    ]);

    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /partially patched/);
    assert.deepEqual(after, before);
  } finally {
    await rm(fixture.fixtureRoot, { recursive: true, force: true });
  }
});

test("the patch applier rejects a package symlink that escapes node_modules", async () => {
  const fixture = await createPatchFixture();
  const externalRoot = await mkdtemp(join(tmpdir(), "fumadocs-prewatch-external-"));
  const externalPackage = join(externalRoot, "fumadocs-mdx");
  const fixturePackage = join(fixture.fixtureRoot, "node_modules", "fumadocs-mdx");

  try {
    await mkdir(join(externalPackage, "dist", "next"), { recursive: true });
    await Promise.all([
      writeFile(join(externalPackage, "package.json"), JSON.stringify({ version: "15.4.6" })),
      writeFile(join(externalPackage, "dist", "next", "index.js"), originalSource),
      writeFile(join(externalPackage, "dist", "next", "index.d.ts"), originalTypes),
    ]);
    const before = await Promise.all([
      readFile(join(externalPackage, "dist", "next", "index.js"), "utf8"),
      readFile(join(externalPackage, "dist", "next", "index.d.ts"), "utf8"),
    ]);
    await rm(fixturePackage, { recursive: true, force: true });
    await symlink(externalPackage, fixturePackage, "dir");
    const result = applyPatch(fixture.fixtureRoot);
    const after = await Promise.all([
      readFile(join(externalPackage, "dist", "next", "index.js"), "utf8"),
      readFile(join(externalPackage, "dist", "next", "index.d.ts"), "utf8"),
    ]);

    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /package path escapes/);
    assert.deepEqual(after, before);
  } finally {
    await Promise.all([
      rm(fixture.fixtureRoot, { recursive: true, force: true }),
      rm(externalRoot, { recursive: true, force: true }),
    ]);
  }
});

test("the patch applier rejects a descendant directory symlink that escapes the package", async () => {
  const fixture = await createPatchFixture();
  const externalRoot = await mkdtemp(join(tmpdir(), "fumadocs-prewatch-external-dist-"));
  const externalDistribution = join(externalRoot, "dist");
  const fixturePackage = join(fixture.fixtureRoot, "node_modules", "fumadocs-mdx");
  const fixtureDistribution = join(fixturePackage, "dist");
  const externalSourcePath = join(externalDistribution, "next", "index.js");
  const externalTypePath = join(externalDistribution, "next", "index.d.ts");

  try {
    await mkdir(join(externalDistribution, "next"), { recursive: true });
    await Promise.all([
      writeFile(externalSourcePath, originalSource),
      writeFile(externalTypePath, originalTypes),
    ]);
    const before = await Promise.all([
      readFile(externalSourcePath, "utf8"),
      readFile(externalTypePath, "utf8"),
    ]);
    await rm(fixtureDistribution, { recursive: true, force: true });
    await symlink(externalDistribution, fixtureDistribution, "dir");

    const result = applyPatch(fixture.fixtureRoot);
    const after = await Promise.all([
      readFile(externalSourcePath, "utf8"),
      readFile(externalTypePath, "utf8"),
    ]);

    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Fumadocs source path escapes/);
    assert.deepEqual(after, before);
  } finally {
    await Promise.all([
      rm(fixture.fixtureRoot, { recursive: true, force: true }),
      rm(externalRoot, { recursive: true, force: true }),
    ]);
  }
});

test("the patch applier rejects a symlinked target file before writing either target", async () => {
  const fixture = await createPatchFixture();
  const externalRoot = await mkdtemp(join(tmpdir(), "fumadocs-prewatch-external-file-"));
  const externalSourcePath = join(externalRoot, "index.js");

  try {
    await writeFile(externalSourcePath, originalSource);
    const beforeExternalSource = await readFile(externalSourcePath, "utf8");
    const beforeType = await readFile(fixture.typePath, "utf8");
    await rm(fixture.sourcePath, { force: true });
    await symlink(externalSourcePath, fixture.sourcePath, "file");

    const result = applyPatch(fixture.fixtureRoot);
    const [afterExternalSource, afterType] = await Promise.all([
      readFile(externalSourcePath, "utf8"),
      readFile(fixture.typePath, "utf8"),
    ]);

    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Fumadocs source target must not be a symbolic link/);
    assert.equal(afterExternalSource, beforeExternalSource);
    assert.equal(afterType, beforeType);
  } finally {
    await Promise.all([
      rm(fixture.fixtureRoot, { recursive: true, force: true }),
      rm(externalRoot, { recursive: true, force: true }),
    ]);
  }
});

test("the patch applier preserves CRLF and accepts a root path with spaces", async () => {
  const fixture = await createPatchFixture({ lineEnding: "\r\n" });

  try {
    const result = applyPatch(fixture.fixtureRoot);
    const [source, types] = await Promise.all([
      readFile(fixture.sourcePath, "utf8"),
      readFile(fixture.typePath, "utf8"),
    ]);

    assert.equal(result.status, 0, result.stderr);
    for (const target of [source, types]) {
      assert.match(target, /\r\n/);
      assert.equal(target.replaceAll("\r\n", "").includes("\n"), false);
    }
  } finally {
    await rm(fixture.fixtureRoot, { recursive: true, force: true });
  }
});

test(
  "the patch applier accepts a native Windows root path",
  { skip: process.platform !== "win32" },
  async () => {
    const fixture = await createPatchFixture();
    try {
      assert.match(fixture.fixtureRoot, /^[A-Za-z]:\\/);
      assert.equal(applyPatch(fixture.fixtureRoot).status, 0);
    } finally {
      await rm(fixture.fixtureRoot, { recursive: true, force: true });
    }
  }
);

test(
  "the real Fumadocs initialization path preconfigures custom ignores",
  { timeout: 5_000 },
  async () => {
    const fixtureRoot = await mkdtemp(join(dependencyRoot, ".fumadocs-init-"));
    const docsRoot = join(fixtureRoot, "docs");
    const englishDirectory = join(docsRoot, "guides");
    const translationsDirectory = join(docsRoot, "i18n");
    const arabicDirectory = join(translationsDirectory, "ar", "docs", "guides");
    const sourceDirectory = join(fixtureRoot, ".source");
    const configPath = join(fixtureRoot, "source.config.ts");
    const englishFile = join(englishDirectory, "watch-me.md");
    const translationFile = join(arabicDirectory, "ignore-me.md");
    const previousNodeEnvironment = process.env.NODE_ENV;
    const previousFumadocsFlag = process.env._FUMADOCS_MDX;
    const reportedErrors = [];
    const originalConsoleError = console.error;
    let customWatcher;

    try {
      await Promise.all([
        mkdir(englishDirectory, { recursive: true }),
        mkdir(arabicDirectory, { recursive: true }),
      ]);
      await Promise.all([
        writeFile(englishFile, "# English\n"),
        writeFile(translationFile, "# Arabic\n"),
        writeFile(
          configPath,
          [
            'import { defineDocs, defineConfig } from "fumadocs-mdx/config";',
            'export const docs = defineDocs({ dir: "docs" });',
            "export default defineConfig();",
            "",
          ].join("\n")
        ),
      ]);
      process.env.NODE_ENV = "development";
      delete process.env._FUMADOCS_MDX;
      console.error = (...argumentsToLog) => {
        reportedErrors.push(argumentsToLog.join(" "));
      };

      const initialized = await initializeFumadocs({
        configPath,
        outDir: sourceDirectory,
        watcher: { ignored: [translationsDirectory] },
      });
      customWatcher = initialized.watcher;
      assert.deepEqual(initialized.firstAddIgnored, [sourceDirectory, translationsDirectory]);
      assert.equal(
        reportedErrors.some((message) => message.includes("ReferenceError")),
        false,
        "Fumadocs initialization does not report the former scope error"
      );
    } finally {
      console.error = originalConsoleError;
      customWatcher?.close();
      if (previousNodeEnvironment === undefined) delete process.env.NODE_ENV;
      else process.env.NODE_ENV = previousNodeEnvironment;
      if (previousFumadocsFlag === undefined) delete process.env._FUMADOCS_MDX;
      else process.env._FUMADOCS_MDX = previousFumadocsFlag;
      await rm(fixtureRoot, { recursive: true, force: true });
    }
  }
);

test("real Chokidar excludes custom and core paths while retaining default behaviour", async () => {
  const fixtureRoot = await mkdtemp(join(tmpdir(), "fumadocs-prewatch-"));
  const docsRoot = join(fixtureRoot, "docs");
  const englishDirectory = join(docsRoot, "guides");
  const translationsDirectory = join(docsRoot, "i18n");
  const arabicDirectory = join(translationsDirectory, "ar", "docs", "guides");
  const sourceDirectory = join(fixtureRoot, ".source");
  const englishFile = join(englishDirectory, "watch-me.md");
  const translationFile = join(arabicDirectory, "ignore-me.md");
  let watcher;
  let defaultWatcher;

  try {
    await Promise.all([
      mkdir(englishDirectory, { recursive: true }),
      mkdir(arabicDirectory, { recursive: true }),
      mkdir(sourceDirectory, { recursive: true }),
    ]);
    await Promise.all([
      writeFile(englishFile, "# English\n"),
      writeFile(translationFile, "# Arabic\n"),
      writeFile(join(sourceDirectory, "generated.ts"), "export {};\n"),
    ]);

    const events = [];
    const watcherOptions = getFumadocsWatcherOptions(fixtureRoot, { NODE_ENV: "development" });
    assert.deepEqual(watcherOptions, { ignored: [translationsDirectory] });
    watcher = new FSWatcher({
      ignoreInitial: true,
      persistent: true,
      usePolling: true,
      interval: 25,
      ignored: [sourceDirectory, ...watcherOptions.ignored],
    });
    watcher.on("all", (event, file) => events.push({ event, file: resolve(file) }));
    watcher.add(fixtureRoot);
    await waitForReady(watcher);

    const watched = watcher.getWatched();
    assert.equal(hasPathBelow(watched, sourceDirectory), false, ".source remains ignored");
    assert.equal(
      hasPathBelow(watched, translationsDirectory),
      false,
      "docs/i18n and descendants remain unwatched"
    );

    await writeFile(englishFile, "# English update\n");
    for (
      let attempt = 0;
      attempt < 20 && !events.some(({ file }) => file === englishFile);
      attempt += 1
    )
      await delay(50);
    assert.ok(
      events.some(({ file }) => file === englishFile),
      "English Markdown emits a watcher event"
    );

    await writeFile(translationFile, "# Arabic update\n");
    await delay(250);
    assert.equal(
      events.some(({ file }) => file === translationFile),
      false,
      "ignored translations emit no watcher event"
    );

    await watcher.close();
    watcher = undefined;

    assert.equal(
      getFumadocsWatcherOptions(fixtureRoot, {
        NODE_ENV: "development",
        OMNIROUTE_MDX_WATCH_I18N: "1",
      }),
      undefined
    );
    defaultWatcher = new FSWatcher({
      ignoreInitial: true,
      persistent: true,
      usePolling: true,
      interval: 25,
      ignored: [sourceDirectory],
    });
    defaultWatcher.add(fixtureRoot);
    await waitForReady(defaultWatcher);
    assert.equal(
      hasPathBelow(defaultWatcher.getWatched(), translationsDirectory),
      true,
      "without custom ignore, translations remain watched"
    );
  } finally {
    await Promise.all([watcher?.close(), defaultWatcher?.close()]);
    await rm(fixtureRoot, { recursive: true, force: true });
  }
});
