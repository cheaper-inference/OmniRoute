import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtemp, readdir, readFile, rm } from "node:fs/promises";
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
