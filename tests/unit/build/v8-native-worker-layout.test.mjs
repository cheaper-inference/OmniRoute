import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdir, mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = new URL("../../../", import.meta.url);
const preload = new URL("scripts/ci/native-worker-v8-layout.mjs", root);
const worker = "src/lib/usage/callLogArtifactWorker.ts";
const writer = "src/lib/usage/callLogArtifactWriter.ts";
const artifact = "src/lib/usage/callLogArtifacts.ts";

async function probe(t, tsx, usePreload) {
  const coverageDirectory = await mkdtemp(join(tmpdir(), "native-worker-coverage-"));
  t.after(() => rm(coverageDirectory, { recursive: true, force: true }));
  execFileSync(
    process.execPath,
    [
      "--import",
      tsx,
      "--input-type=module",
      "--eval",
      `
        import { once } from "node:events";
        import { readFile } from "node:fs/promises";
        import { createRequire } from "node:module";
        import { join } from "node:path";
        import { Worker } from "node:worker_threads";
        const entry = "./${artifact}";
        const common = process.execArgv.includes("tsx") ? createRequire(import.meta.url)(entry) : null;
        const library = await import(entry);
        if (common && ${usePreload} && common.getCallLogsDir !== library.getCallLogsDir) {
          throw new Error("Require and import loaded distinct copies");
        }
        const directory = library.getCallLogsDir();
        await import("./${writer}");
        const worker = new Worker(new URL("./${worker}", import.meta.url), { execArgv: [] });
        const reply = once(worker, "message");
        const artifact = {
          schemaVersion: 5,
          summary: { timestamp: "2026-11-19T12:00:00.000Z", id: "coverage-fixture" },
          requestBody: { message: "native worker" },
        };
        worker.postMessage({ id: 1, artifact, environment: { dataDir: process.env.DATA_DIR } });
        try {
          const [{ id, result }] = await reply;
          if (id !== 1 || !result) throw new Error("Unexpected worker reply");
          const text = await readFile(join(directory, result.relPath), "utf8");
          if (text !== JSON.stringify(artifact)) throw new Error("Unexpected worker output");
        } finally {
          await worker.terminate();
        }
      `,
    ],
    {
      cwd: root,
      env: {
        ...process.env,
        DATA_DIR: coverageDirectory,
        NODE_OPTIONS: usePreload ? `--import=${preload.href}` : "",
        NODE_V8_COVERAGE: coverageDirectory,
      },
      stdio: "pipe",
      timeout: 60_000,
    }
  );

  const reports = [];
  for (const file of await readdir(coverageDirectory)) {
    if (file.startsWith("coverage-") && file.endsWith(".json")) {
      reports.push(JSON.parse(await readFile(join(coverageDirectory, file), "utf8")));
    }
  }
  const find = (reports, path) => {
    const url = new URL(path, root).href;
    const filename = fileURLToPath(url);
    return reports.flatMap((report) =>
      report.result
        .filter((script) => script.url === url || script.url === filename)
        .map((script) => ({
          url: script.url,
          mapped: Boolean(
            report["source-map-cache"]?.[url] ?? report["source-map-cache"]?.[filename]
          ),
          functions: script.functions,
        }))
    );
  };
  const workerReport = reports.find((report) => find([report], worker).length);
  assert.ok(workerReport, "the real worker must supply its own coverage");
  const parentReports = reports.filter((report) => report !== workerReport);
  return { find, workerReport, parentReports };
}

for (const tsx of ["tsx/esm", "tsx"]) {
  test(`${tsx}: coverage includes native worker and caller offsets in the same layout`, async (t) => {
    const { find, workerReport, parentReports } = await probe(t, tsx, true);
    const runtimeSources = workerReport.result.filter((script) =>
      script.url.startsWith(new URL("src/", root).href)
    );
    assert.ok(runtimeSources.length > 1, "native worker dependency graph must be exercised");
    for (const { url, functions } of runtimeSources) {
      assert.equal(workerReport["source-map-cache"]?.[url], undefined, url);
      if (url === new URL(worker, root).href) continue;
      const parent = find(parentReports, url);
      assert.equal(parent.length, 1, url);
      assert.equal(parent[0].mapped, false, url);
      const sourceLength = (await readFile(new URL(url), "utf8")).length;
      for (const sample of [{ url, functions }, parent[0]]) {
        const runtimeLength = sourceLength + `\n\n//# sourceURL=${sample.url}`.length;
        const [{ startOffset, endOffset }] = sample.functions[0].ranges;
        assert.deepEqual([startOffset, endOffset], [0, runtimeLength], sample.url);
        for (const fn of sample.functions.slice(1)) {
          assert.ok(
            fn.ranges.every((range) => range.endOffset <= sourceLength),
            url
          );
        }
      }
      if (url === new URL(artifact, root).href) {
        const getter = (sample) => sample.find((fn) => fn.functionName === "getCallLogsDir");
        const [workerCall] = getter(functions).ranges;
        const [parentCall] = getter(parent[0].functions).ranges;
        assert.deepEqual(parentCall, workerCall, "both call sites count at the same coordinates");
        assert.equal(parentCall.count, 1);
      }
    }
    assert.equal(find(parentReports, writer)[0].mapped, true, "other files still use tsx");
  });
}

test("without the preload, tsx and the worker still exhibit distinct layouts", async (t) => {
  const { find, workerReport, parentReports } = await probe(t, "tsx/esm", false);
  const [parent] = find(parentReports, artifact);
  const [native] = find([workerReport], artifact);
  assert.equal(parent.mapped, true);
  assert.equal(native.mapped, false);
  assert.notEqual(parent.functions[0].ranges[0].endOffset, native.functions[0].ranges[0].endOffset);
});

test("CLI and maintenance scripts keep the Node coverage layout through tsx registration", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "native-cli-coverage-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const entry = new URL("bin/cli/utils/cliToken.mjs", root).href;
  const aliasResolver = new URL("bin/aliasResolver.mjs", root).href;
  const translation = new URL("scripts/i18n/run-translation.mjs", root).href;
  const lifecycle = new URL("scripts/check/check-model-lifecycle.mjs", root).href;
  const dependency = new URL("bin/cli/data-dir.mjs", root).href;
  const tray = new URL("bin/cli/runtime/trayRuntime.ts", root).href;
  const trayEntry = new URL("bin/cli/tray/traySystray.mjs", root).href;
  const windows = new URL("src/shared/platform/windowsProcess.ts", root).href;
  const cliTsx = new URL("scripts/ci/native-cli-v8-tsx.mjs", root).href;
  const query = `${entry}?coverage-fixture=1`;
  const required = new Set([
    entry,
    query,
    dependency,
    tray,
    trayEntry,
    windows,
    aliasResolver,
    translation,
    lifecycle,
  ]);
  const imports = [entry, query, tray, trayEntry, aliasResolver, translation, lifecycle]
    .map((url) => `await import(${JSON.stringify(url)});`)
    .join("\n");

  async function record(mode, args, code) {
    const coverage = join(directory, mode);
    await mkdir(coverage);
    execFileSync(process.execPath, [...args, "--input-type=module", "--eval", code], {
      cwd: root,
      env: {
        PATH: process.env.PATH,
        DATA_DIR: directory,
        NODE_ENV: "test",
        NODE_OPTIONS: mode === "native" ? "" : `--import=${preload.href}`,
        NODE_V8_COVERAGE: coverage,
      },
      stdio: "pipe",
      timeout: 60_000,
    });
    const samples = new Map();
    for (const file of await readdir(coverage)) {
      if (!file.endsWith(".json")) continue;
      const report = JSON.parse(await readFile(join(coverage, file), "utf8"));
      for (const script of report.result) {
        const projectTs =
          script.url.startsWith(root.href) &&
          script.url.endsWith(".ts") &&
          !script.url.includes("/node_modules/");
        if (!required.has(script.url) && !projectTs) continue;
        assert.equal(Boolean(report["source-map-cache"]?.[script.url]), false, script.url);
        assert.equal(samples.has(script.url), false, script.url);
        samples.set(script.url, script.functions);
      }
    }
    for (const url of required) assert.ok(samples.has(url), `${mode} did not cover ${url}`);
    return samples;
  }

  const native = await record("native", [], imports);
  assert.deepEqual(await record("native-preload", [], imports), native);
  assert.deepEqual(await record("early", ["--import", "tsx/esm"], imports), native);
  assert.deepEqual(
    await record("late", [], `await import(${JSON.stringify(cliTsx)});\n${imports}`),
    native
  );
});

test("the global-install alias fixtures keep native coverage after late tsx registration", async (t) => {
  const coverage = await mkdtemp(join(tmpdir(), "late-tsx-alias-coverage-"));
  t.after(() => rm(coverage, { recursive: true, force: true }));
  const driver = "tests/unit/cli/alias-resolver-12073.test.ts";
  const source = new URL("bin/aliasResolver.mjs", root);
  const sourceLength = (await readFile(source, "utf8")).length;
  const env = {
    ...process.env,
    NODE_OPTIONS: `--import=${preload.href}`,
    NODE_V8_COVERAGE: coverage,
    OMNIROUTE_CI_SYNC_TSX_CACHE: coverage,
  };
  delete env.NODE_TEST_CONTEXT;
  execFileSync(
    process.execPath,
    [
      "--import",
      "tsx/esm",
      "--test",
      "--test-name-pattern",
      "keeps global-install-style alias imports working|retains module.register",
      driver,
    ],
    { cwd: root, env, stdio: "pipe", timeout: 60_000 }
  );

  let evaluated = 0;
  for (const file of await readdir(coverage)) {
    if (!file.endsWith(".json")) continue;
    const report = JSON.parse(await readFile(join(coverage, file), "utf8"));
    const sample = report.result.find(({ url }) => url === source.href);
    if (!sample || !report.result.some(({ url }) => url.endsWith("/[eval1]"))) continue;
    evaluated++;
    assert.equal(Boolean(report["source-map-cache"]?.[source.href]), false, source.href);
    const [{ startOffset, endOffset }] = sample.functions[0].ranges;
    assert.deepEqual([startOffset, endOffset], [0, sourceLength]);
  }
  assert.equal(evaluated, 2, "both actual late-TSX launchers must emit coverage");
});

test("the CLI doctor and native tray diagnostic share coverage coordinates", async (t) => {
  const coverage = await mkdtemp(join(tmpdir(), "doctor-native-coverage-"));
  t.after(() => rm(coverage, { recursive: true, force: true }));
  const atomicPreload = new URL("scripts/ci/atomic-tsx-cache.mjs", root);
  const tsxDriver = new URL("tests/unit/cli-doctor-prebuilt-native-binary-10083.test.ts", root);
  const trayDriver = new URL("tests/unit/cli/tray-failure-diagnostics-17315.test.ts", root);
  const tray = new URL("bin/cli/tray/traySystray.mjs", root);
  const source = new URL("src/lib/cli-helper/doctor/checks.ts", root);
  const sourceSize = (await readFile(source, "utf8")).length;
  const env = {
    ...process.env,
    TMPDIR: coverage,
    NODE_OPTIONS: `--import=${atomicPreload.href} --import=${preload.href}`,
    NODE_V8_COVERAGE: coverage,
    OMNIROUTE_CI_SYNC_TSX_CACHE: coverage,
  };
  delete env.NODE_TEST_CONTEXT;
  execFileSync(
    process.execPath,
    [
      "--import",
      "tsx/esm",
      "--test",
      "--test-name-pattern",
      "doctor finds a prebuilt|doctor surfaces the persisted tray failure",
      fileURLToPath(tsxDriver),
      fileURLToPath(trayDriver),
    ],
    { cwd: root, env, stdio: "pipe", timeout: 90_000 }
  );

  const producers = new Set();
  for (const file of await readdir(coverage)) {
    if (!file.endsWith(".json")) continue;
    const report = JSON.parse(await readFile(join(coverage, file), "utf8"));
    const script = report.result.find(({ url }) => url === source.href);
    if (!script) continue;
    const urls = new Set(report.result.map(({ url }) => url));
    if (urls.has(tsxDriver.href)) {
      assert.ok(urls.has(preload.href));
      producers.add("tsx doctor");
    } else if (urls.has(tray.href)) {
      assert.equal(urls.has(preload.href), false);
      producers.add("native tray doctor");
    }
    assert.equal(Boolean(report["source-map-cache"]?.[source.href]), false, source.href);
    assert.equal(script.functions[0].ranges[0].startOffset, 0);
    assert.equal(
      script.functions[0].ranges[0].endOffset,
      sourceSize + `\n\n//# sourceURL=${source.href}`.length
    );
  }
  assert.deepEqual(producers, new Set(["tsx doctor", "native tray doctor"]));
});

test("the real CLI keeps native coverage through the clean-environment launcher", async (t) => {
  const coverage = await mkdtemp(join(tmpdir(), "clean-cli-coverage-"));
  t.after(() => rm(coverage, { recursive: true, force: true }));
  execFileSync(
    process.execPath,
    [
      "--import",
      "tsx/esm",
      "--input-type=module",
      "--eval",
      `
        import assert from "node:assert/strict";
        import { BIN, cleanEnv, layout, rm, runCli } from "./tests/_helpers/cliCwdEnvHarness.ts";
        const fixture = layout();
        try {
          const env = cleanEnv(fixture.home);
          assert.equal(env.NODE_OPTIONS, undefined);
          const result = await runCli(BIN, ["--help"], fixture.cwd, env);
          assert.equal(result.code, 0, result.stderr);
        } finally {
          rm(fixture.tmp);
        }
      `,
    ],
    {
      cwd: root,
      env: {
        ...process.env,
        NODE_OPTIONS: `--import=${preload.href}`,
        NODE_V8_COVERAGE: coverage,
        OMNIROUTE_CI_SYNC_TSX_CACHE: coverage,
      },
      stdio: "pipe",
      timeout: 90_000,
    }
  );
  const cli = new URL("bin/omniroute.mjs", root).href;
  const token = new URL("bin/cli/utils/cliToken.mjs", root);
  let launches = 0;
  for (const file of await readdir(coverage)) {
    if (!file.endsWith(".json")) continue;
    const report = JSON.parse(await readFile(join(coverage, file), "utf8"));
    if (!report.result.some((script) => script.url === cli)) continue;
    launches++;
    assert.ok(report.result.some((script) => script.url === preload.href));
    assert.ok(
      report.result.some(
        (script) => script.url === new URL("scripts/ci/native-cli-v8-tsx.mjs", root).href
      )
    );
    const script = report.result.find((sample) => sample.url === token.href);
    assert.ok(script, "the CLI's imports contribute native coverage");
    assert.equal(Boolean(report["source-map-cache"]?.[token.href]), false);
    assert.equal(script.functions[0].ranges[0].endOffset, (await readFile(token, "utf8")).length);
  }
  assert.equal(launches, 1);
});

test("the installed-layout CLI records native coverage for checkout-backed modules", async (t) => {
  const fixture = await mkdtemp(join(tmpdir(), "installed-cli-coverage-"));
  t.after(() => rm(fixture, { recursive: true, force: true }));
  const coverage = join(fixture, "coverage");
  await mkdir(coverage);
  const env = {
    ...process.env,
    TMPDIR: fixture,
    NODE_OPTIONS: `--import=${preload.href}`,
    NODE_V8_COVERAGE: coverage,
  };
  delete env.NODE_TEST_CONTEXT;
  execFileSync(
    process.execPath,
    ["--import", "tsx/esm", "--test", "tests/unit/cli-installed-default-env-16763.test.ts"],
    {
      cwd: root,
      env,
      stdio: "pipe",
      timeout: 120_000,
    }
  );

  const token = new URL("bin/cli/utils/cliToken.mjs", root);
  const tokenSourceLength = (await readFile(token, "utf8")).length;
  const installedEntry = "/node_modules/omniroute/bin/omniroute.mjs";
  let invocations = 0;
  for (const file of await readdir(coverage)) {
    if (!file.endsWith(".json")) continue;
    const report = JSON.parse(await readFile(join(coverage, file), "utf8"));
    if (!report.result.some(({ url }) => url.endsWith(installedEntry))) continue;
    invocations++;
    const sample = report.result.find(({ url }) => url === token.href);
    assert.ok(sample, "the installed CLI loaded the checkout-backed token module");
    assert.equal(Boolean(report["source-map-cache"]?.[token.href]), false, token.href);
    assert.equal(sample.functions[0].ranges[0].endOffset, tokenSourceLength);
  }
  assert.equal(invocations, 2, "include the default and edited installed .env launches");
});

async function assertIsolatedBoundaryCoverage(t, driver, fixturePath) {
  const coverage = await mkdtemp(join(tmpdir(), "isolated-boundary-v8-coverage-"));
  t.after(() => rm(coverage, { recursive: true, force: true }));
  const env = {
    ...process.env,
    TMPDIR: coverage,
    NODE_OPTIONS: `--import=${preload.href}`,
    NODE_V8_COVERAGE: coverage,
    OMNIROUTE_CI_SYNC_TSX_CACHE: coverage,
  };
  delete env.NODE_TEST_CONTEXT;
  execFileSync(process.execPath, ["--import", "tsx/esm", "--test", driver], {
    cwd: root,
    env,
    stdio: "pipe",
    timeout: 120_000,
  });

  const fixture = new URL(fixturePath, root).href;
  const source = new URL("src/lib/dataPaths.ts", root);
  const sourceLength = (await readFile(source, "utf8")).length;
  let children = 0;
  for (const file of await readdir(coverage)) {
    if (!file.endsWith(".json")) continue;
    const report = JSON.parse(await readFile(join(coverage, file), "utf8"));
    if (!report.result.some(({ url }) => url === fixture)) continue;
    children++;
    const sample = report.result.find(({ url }) => url === source.href);
    assert.ok(sample, "the boundary fixture must exercise dataPaths");
    assert.equal(Boolean(report["source-map-cache"]?.[source.href]), false, source.href);
    assert.ok(report.result.some(({ url }) => url === preload.href));
    assert.equal(
      sample.functions[0].ranges[0].endOffset,
      sourceLength + `\n\n//# sourceURL=${source.href}`.length
    );
  }
  assert.equal(children, 1, "check coverage emitted by the real isolated fixture subprocess");
}

test("the isolated Codex boundary child records native dataPaths coverage", async (t) => {
  await assertIsolatedBoundaryCoverage(
    t,
    "tests/unit/codex-response-failed-boundary.test.ts",
    "tests/fixtures/codex-response-failed-boundary.fixture.ts"
  );
});

test("the shared error boundary child records native dataPaths coverage", async (t) => {
  await assertIsolatedBoundaryCoverage(
    t,
    "tests/unit/provider-last-error-sanitization.test.ts",
    "tests/unit/fixtures/provider-last-error-sanitization.fixture.ts"
  );
});

test("the standalone media MCP and tsx share native coverage coordinates", async (t) => {
  const fixture = await mkdtemp(join(tmpdir(), "media-mcp-native-coverage-"));
  t.after(() => rm(fixture, { recursive: true, force: true }));
  const mediaEntry = "scripts/cli/omniroute-media-mcp.mjs";
  const media = new URL(mediaEntry, root).href;
  const sanitizer = new URL("open-sse/utils/errorSanitization.ts", root).href;

  async function record(mode, args) {
    const coverage = join(fixture, mode);
    await mkdir(coverage);
    execFileSync(process.execPath, args, {
      cwd: root,
      env: {
        ...process.env,
        NODE_OPTIONS: mode === "native" ? "" : `--import=${preload.href}`,
        NODE_V8_COVERAGE: coverage,
      },
      input: "",
      stdio: "pipe",
      timeout: 90_000,
    });
    const files = (await readdir(coverage)).filter((file) => file.endsWith(".json"));
    return Promise.all(
      files.map(async (file) => JSON.parse(await readFile(join(coverage, file), "utf8")))
    );
  }

  const nativeReports = await record("native", [mediaEntry]);
  const nativeProcess = nativeReports.find((report) =>
    report.result.some(({ url }) => url === media)
  );
  assert.ok(nativeProcess, "the standalone media process must emit coverage on stdin EOF");
  const sources = nativeProcess.result.filter(
    ({ url }) => url.startsWith(root.href) && url.endsWith(".ts") && !url.includes("/node_modules/")
  );
  assert.ok(sources.length > 1 && sources.some(({ url }) => url === sanitizer));

  const imports = sources.map(({ url }) => `await import(${JSON.stringify(url)});`).join("\n");
  const tsxReports = await record("tsx", [
    "--import",
    "tsx/esm",
    "--input-type=module",
    "--eval",
    imports,
  ]);
  const tsxProcess = tsxReports.find((report) =>
    report.result.some(({ url }) => url === sanitizer)
  );
  assert.ok(tsxProcess, "the tsx caller must exercise the same sanitizer");

  const coordinates = ({ functions }) =>
    functions.map(({ functionName, ranges: [{ startOffset, endOffset }] }) => [
      functionName,
      startOffset,
      endOffset,
    ]);
  for (const native of sources) {
    const caller = tsxProcess.result.find(({ url }) => url === native.url);
    assert.ok(caller, native.url);
    assert.equal(Boolean(nativeProcess["source-map-cache"]?.[native.url]), false, native.url);
    assert.equal(Boolean(tsxProcess["source-map-cache"]?.[native.url]), false, native.url);
    assert.deepEqual(coordinates(caller), coordinates(native), native.url);
  }
});

test("migration schema boots retain the native layout for the shared data paths module", async (t) => {
  const fixture = await mkdtemp(join(tmpdir(), "migration-native-coverage-"));
  t.after(() => rm(fixture, { recursive: true, force: true }));
  const base = join(fixture, "base");
  const head = join(fixture, "head");
  const coverage = join(fixture, "coverage");
  await Promise.all([base, head, coverage].map((directory) => mkdir(directory)));
  const original = "20261119010000_create_coverage_layout_fixture.sql";
  const createTable = "CREATE TABLE coverage_layout_fixture (id INTEGER PRIMARY KEY);";
  await Promise.all([
    writeFile(join(base, original), createTable),
    writeFile(join(head, original), createTable),
    writeFile(
      join(head, "20261119020000_extend_coverage_layout_fixture.sql"),
      "ALTER TABLE coverage_layout_fixture ADD COLUMN label TEXT;"
    ),
  ]);
  execFileSync(
    process.execPath,
    [
      "--import",
      "tsx/esm",
      "scripts/check/migration-commutation.ts",
      "--base-dir",
      base,
      "--head-dir",
      head,
    ],
    {
      cwd: root,
      env: {
        ...process.env,
        TMPDIR: fixture,
        NODE_OPTIONS: `--import=${preload.href}`,
        NODE_V8_COVERAGE: coverage,
        OMNIROUTE_CI_SYNC_TSX_CACHE: fixture,
      },
      stdio: "pipe",
      timeout: 240_000,
    }
  );
  const boot = new URL("scripts/check/lib/migrationSchemaBoot.ts", root).href;
  const dbCore = new URL("src/lib/db/core.ts", root).href;
  const dataPaths = new URL("src/lib/dataPaths.ts", root);
  const sourceLength = (await readFile(dataPaths, "utf8")).length;
  let boots = 0;
  for (const file of await readdir(coverage)) {
    if (!file.endsWith(".json")) continue;
    const report = JSON.parse(await readFile(join(coverage, file), "utf8"));
    const urls = new Set(report.result.map((script) => script.url));
    if (!urls.has(boot) || !urls.has(dbCore)) continue;
    boots++;
    const script = report.result.find((script) => script.url === dataPaths.href);
    assert.ok(script, "the boot exercised the data paths module");
    assert.equal(report["source-map-cache"]?.[dataPaths.href], undefined);
    const [{ startOffset, endOffset }] = script.functions[0].ranges;
    assert.deepEqual(
      [startOffset, endOffset],
      [0, sourceLength + `\n\n//# sourceURL=${dataPaths.href}`.length]
    );
  }
  assert.ok(boots > 0, "the migration boot supplied coverage");
});
