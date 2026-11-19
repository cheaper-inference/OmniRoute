import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdir, mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

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
    return reports.flatMap((report) =>
      report.result
        .filter((script) => script.url === url)
        .map((script) => ({
          mapped: Boolean(report["source-map-cache"]?.[url]),
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
      const runtimeLength = sourceLength + `\n\n//# sourceURL=${url}`.length;
      for (const sample of [functions, parent[0].functions]) {
        const [{ startOffset, endOffset }] = sample[0].ranges;
        assert.deepEqual([startOffset, endOffset], [0, runtimeLength], url);
        for (const fn of sample.slice(1)) {
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

test("CLI JavaScript coverage keeps the Node layout with an explicit tsx preload", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "native-cli-coverage-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const entry = new URL("bin/cli/utils/cliToken.mjs", root).href;
  const dependency = new URL("bin/cli/data-dir.mjs", root).href;
  const query = `${entry}?coverage-fixture=1`;
  const imports = `await import(${JSON.stringify(entry)}); await import(${JSON.stringify(query)});`;

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
        if (script.url !== entry && script.url !== query && script.url !== dependency) continue;
        assert.equal(Boolean(report["source-map-cache"]?.[script.url]), false, script.url);
        assert.equal(samples.has(script.url), false, script.url);
        samples.set(script.url, script.functions);
      }
    }
    assert.equal(samples.size, 3, `${mode} must cover the CLI modules and the query alias`);
    return samples;
  }

  const native = await record("native", [], imports);
  assert.deepEqual(await record("native-preload", [], imports), native);
  assert.deepEqual(await record("early", ["--import", "tsx/esm"], imports), native);
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
