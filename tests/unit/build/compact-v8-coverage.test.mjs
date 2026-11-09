import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile, cp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";
import { gunzipSync } from "node:zlib";

import {
  compactV8Coverage,
  verifyCoverageShards,
  reportCoverageShards,
} from "../../../scripts/ci/compact-v8-coverage.mjs";

const candidateSha = "a".repeat(40);
const minimal = () => ({
  result: [
    {
      scriptId: "1",
      url: pathToFileURL(resolve("scripts/ci/compact-v8-coverage.mjs")).href,
      functions: [
        {
          functionName: "fixture",
          ranges: [{ startOffset: 0, endOffset: 100, count: 1 }],
          isBlockCoverage: true,
        },
      ],
    },
  ],
});

async function workspace(t) {
  const dir = await mkdtemp(join(tmpdir(), "omniroute-v8-compact-"));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const inputDirectory = join(dir, "raw");
  await mkdir(inputDirectory);
  return { dir, inputDirectory, outputDirectory: join(dir, "compact"), shard: "1/1", candidateSha };
}

function runNode(args, env = process.env) {
  const result = spawnSync(process.execPath, args, { env, encoding: "utf8", timeout: 60000 });
  assert.equal(result.status, 0, result.stderr || result.error?.message);
}

test("real V8/tsx source maps and every Istanbul counter match the original c8 CLI", async (t) => {
  const options = await workspace(t);
  const fixtureDir = await mkdtemp(resolve("scripts/ad-hoc/v8-compact-test-"));
  t.after(() => rm(fixtureDir, { recursive: true, force: true }));
  const fixture = join(fixtureDir, "branch.ts");
  await writeFile(
    fixture,
    "export function select(value: number) { if (value > 0) return 'positive'; return 'negative'; }\nselect(Number(process.argv[2]));\n"
  );
  const env = { ...process.env, NODE_V8_COVERAGE: options.inputDirectory };
  runNode(["--import", "tsx/esm", fixture, "1"], env);
  runNode(["--import", "tsx/esm", fixture, "-1"], env);
  const names = await readdir(options.inputDirectory);
  assert.ok(names.length >= 2);
  // Several carry levels, repeated module counts and source-map overwrites.
  for (let i = 0; i < 8; i++) {
    await cp(
      join(options.inputDirectory, names[0]),
      join(options.inputDirectory, `copy-${i}.json`)
    );
  }
  const manifest = await compactV8Coverage(options);
  assert.ok(manifest.packedBytes < manifest.inputBytes);
  for (const item of manifest.inputs) {
    assert.deepEqual(
      gunzipSync(await readFile(join(options.outputDirectory, "shard-1-of-1", item.name + ".gz"))),
      await readFile(join(options.inputDirectory, item.name))
    );
  }
  assert.equal(
    (await verifyCoverageShards({ directory: options.outputDirectory, total: 1, candidateSha }))
      .status,
    "PASS"
  );
  const cleanEnv = { ...process.env };
  delete cleanEnv.NODE_V8_COVERAGE;
  for (const [name, input] of [["original", options.inputDirectory]]) {
    runNode(
      [
        "node_modules/c8/bin/c8.js",
        "report",
        "--merge-async",
        "--temp-directory",
        input,
        "--reports-dir",
        join(options.dir, name + "-report"),
        "--reporter=json",
        "--exclude=tests/**",
        "--exclude=**/*.test.*",
      ],
      cleanEnv
    );
  }
  await reportCoverageShards({
    directory: options.outputDirectory,
    total: 1,
    candidateSha,
    reportOptions: ["--reports-dir", join(options.dir, "compact-report"), "--reporter=json"],
  });
  const original = JSON.parse(
    await readFile(join(options.dir, "original-report/coverage-final.json"), "utf8")
  );
  const compact = JSON.parse(
    await readFile(join(options.dir, "compact-report/coverage-final.json"), "utf8")
  );
  assert.ok(
    Object.keys(original).some((path) => path.endsWith("branch.ts")),
    "fixture must actually be covered"
  );
  assert.deepEqual(compact, original);
});

for (const [name, data, message] of [
  ["malformed JSON", "{", /Malformed V8 JSON/],
  ["missing V8 result", "{}", /Invalid V8 coverage/],
  ["no covered project files", '{"result":[]}', /No instrumented project coverage/],
  [
    "negative counts",
    JSON.stringify({
      result: [
        {
          ...minimal().result[0],
          functions: [{ ranges: [{ startOffset: 0, endOffset: 1, count: -1 }] }],
        },
      ],
    }),
    /Invalid V8 range/,
  ],
  [
    "invalid source maps",
    JSON.stringify({ ...minimal(), "source-map-cache": [] }),
    /Invalid V8 source maps/,
  ],
]) {
  test(`rejects ${name} before reporting coverage`, async (t) => {
    const options = await workspace(t);
    await writeFile(join(options.inputDirectory, "coverage.json"), data);
    await compactV8Coverage(options);
    const reportDir = join(options.dir, "invalid-report");
    await assert.rejects(
      reportCoverageShards({
        directory: options.outputDirectory,
        total: 1,
        candidateSha,
        reportOptions: ["--reports-dir", reportDir, "--reporter=json"],
      }),
      message
    );
    await assert.rejects(readFile(join(reportDir, "coverage-final.json")), { code: "ENOENT" });
  });
}

test("rejects missing inputs and refuses to overwrite an existing shard", async (t) => {
  const options = await workspace(t);
  await assert.rejects(compactV8Coverage(options), /No V8 coverage inputs/);
  await writeFile(join(options.inputDirectory, "coverage.json"), JSON.stringify(minimal()));
  await compactV8Coverage(options);
  await assert.rejects(compactV8Coverage(options), { code: "EEXIST" });
});

test("requires the full matrix, exact SHA and untampered coverage", async (t) => {
  const options = await workspace(t);
  await writeFile(join(options.inputDirectory, "coverage.json"), JSON.stringify(minimal()));
  await compactV8Coverage({ ...options, shard: "1/2" });
  const verify = { directory: options.outputDirectory, total: 2, candidateSha };
  await assert.rejects(verifyCoverageShards(verify), /Missing or unexpected/);
  const second = join(options.dir, "second");
  const secondInput = join(options.dir, "second-input");
  await mkdir(secondInput);
  await writeFile(join(secondInput, "coverage-2.json"), JSON.stringify(minimal()));
  await compactV8Coverage({
    ...options,
    inputDirectory: secondInput,
    outputDirectory: second,
    shard: "2/2",
  });
  await cp(second, options.outputDirectory, { recursive: true });
  assert.equal((await verifyCoverageShards(verify)).status, "PASS");
  await assert.rejects(
    verifyCoverageShards({ ...verify, candidateSha: "b".repeat(40) }),
    /Incompatible/
  );
  const coverageFile = join(options.outputDirectory, "shard-2-of-2/coverage-2.json.gz");
  await writeFile(coverageFile, JSON.stringify(minimal()));
  await assert.rejects(verifyCoverageShards(verify), /Coverage hash mismatch/);
});

test("rejects mixed runtime or source-root receipts", async (t) => {
  const options = await workspace(t);
  await writeFile(join(options.inputDirectory, "coverage.json"), JSON.stringify(minimal()));
  const manifest = await compactV8Coverage(options);
  for (const change of [
    { nodeVersion: "v1.0.0" },
    { sourceRoot: "/different-checkout" },
    { c8Version: "0.0.0" },
  ]) {
    await writeFile(
      join(options.outputDirectory, "manifest-1-of-1.json"),
      JSON.stringify({ ...manifest, ...change })
    );
    await assert.rejects(
      verifyCoverageShards({ directory: options.outputDirectory, total: 1, candidateSha }),
      /Incompatible/
    );
  }
});

test("preserves global c8 order across shards with mixed block/function samples", async (t) => {
  const options = await workspace(t);
  const shardInputs = [join(options.dir, "part1"), join(options.dir, "part2")];
  for (const dir of shardInputs) await mkdir(dir);
  for (const [index, count] of [1, 3, 1, 3].entries()) {
    const data = minimal();
    const fn = data.result[0].functions[0];
    fn.ranges[0].count = count;
    fn.isBlockCoverage = index === 0;
    if (index === 0) fn.ranges.push({ startOffset: 10, endOffset: 40, count: 2 });
    const filename = `coverage-${index}.json`;
    await writeFile(join(options.inputDirectory, filename), JSON.stringify(data));
    await writeFile(join(shardInputs[index % 2], filename), JSON.stringify(data));
  }
  for (let index = 0; index < 2; index++) {
    const packed = join(options.dir, `packed${index}`);
    await compactV8Coverage({
      ...options,
      inputDirectory: shardInputs[index],
      outputDirectory: packed,
      shard: `${index + 1}/2`,
    });
    await cp(packed, options.outputDirectory, { recursive: true });
  }
  const cleanEnv = { ...process.env };
  delete cleanEnv.NODE_V8_COVERAGE;
  runNode(
    [
      "node_modules/c8/bin/c8.js",
      "report",
      "--merge-async",
      "--temp-directory",
      options.inputDirectory,
      "--reports-dir",
      join(options.dir, "expected"),
      "--reporter=json",
      "--exclude=tests/**",
      "--exclude=**/*.test.*",
    ],
    cleanEnv
  );
  await reportCoverageShards({
    directory: options.outputDirectory,
    total: 2,
    candidateSha,
    reportOptions: ["--reports-dir", join(options.dir, "actual"), "--reporter=json"],
  });
  const expected = JSON.parse(
    await readFile(join(options.dir, "expected/coverage-final.json"), "utf8")
  );
  const actual = JSON.parse(
    await readFile(join(options.dir, "actual/coverage-final.json"), "utf8")
  );
  assert.ok(Object.keys(expected).length, "the regression must cover project code");
  assert.deepEqual(actual, expected);
});

test("the report CLI preserves c8's failing coverage exit code", async (t) => {
  const options = await workspace(t);
  const data = minimal();
  data.result[0].functions[0].ranges[0].count = 0;
  await writeFile(join(options.inputDirectory, "coverage.json"), JSON.stringify(data));
  await compactV8Coverage(options);
  const env = { ...process.env };
  delete env.NODE_V8_COVERAGE;
  const result = spawnSync(
    process.execPath,
    [
      "scripts/ci/compact-v8-coverage.mjs",
      "report",
      options.outputDirectory,
      "1",
      candidateSha,
      "--reports-dir",
      join(options.dir, "threshold-report"),
      "--reporter=json-summary",
      "--check-coverage",
      "--statements=100",
    ],
    { env, encoding: "utf8", timeout: 30000 }
  );
  assert.equal(result.status, 1, result.stderr);
  assert.match(result.stdout + result.stderr, /Coverage for statements.*does not meet/);
});

test("reporting checks the original bytes after decompression", async (t) => {
  const options = await workspace(t);
  await writeFile(join(options.inputDirectory, "coverage.json"), JSON.stringify(minimal()));
  const manifest = await compactV8Coverage(options);
  manifest.inputs[0].sha256 = "0".repeat(64);
  await writeFile(join(options.outputDirectory, "manifest-1-of-1.json"), JSON.stringify(manifest));
  await assert.rejects(
    reportCoverageShards({
      directory: options.outputDirectory,
      total: 1,
      candidateSha,
      reportOptions: ["--reports-dir", join(options.dir, "invalid-report"), "--reporter=json"],
    }),
    /Uncompressed coverage hash mismatch/
  );
  await assert.rejects(readFile(join(options.dir, "invalid-report/coverage-final.json")), {
    code: "ENOENT",
  });
});

test("duplicate raw filenames from different shards cannot overwrite each other", async (t) => {
  const options = await workspace(t);
  await writeFile(join(options.inputDirectory, "coverage.json"), JSON.stringify(minimal()));
  await compactV8Coverage({ ...options, shard: "1/2" });
  const second = join(options.dir, "duplicate");
  await compactV8Coverage({ ...options, outputDirectory: second, shard: "2/2" });
  await cp(second, options.outputDirectory, { recursive: true });
  await assert.rejects(
    verifyCoverageShards({ directory: options.outputDirectory, total: 2, candidateSha }),
    /Invalid or duplicate coverage input/
  );
});
