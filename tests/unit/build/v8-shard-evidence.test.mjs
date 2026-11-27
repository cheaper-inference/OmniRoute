import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { cp, mkdir, mkdtemp, readFile, readdir, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gzipSync } from "node:zlib";
import test from "node:test";
import v8Coverage from "@bcoe/v8-coverage";
import { load } from "js-yaml";

const root = resolve(fileURLToPath(new URL("../../../", import.meta.url)));
const helperPath = join(root, "scripts/ci/prepare-v8-coverage.mjs");
const helpers = () => import(pathToFileURL(helperPath).href);
const workflow = load(readFileSync(join(root, ".github/workflows/ci.yml"), "utf8"));
const total = workflow.jobs["test-unit"].strategy.matrix.shard.length;
const posix = { skip: process.platform === "win32" };
const runId = "987654321";
const runAttempt = "2";
const rawName = "coverage-4606-1794431026139-0.json";
const candidateSha = spawnSync("git", ["rev-parse", "HEAD"], {
  cwd: root,
  encoding: "utf8",
}).stdout.trim();
const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");

function rawCoverage(count = 1, sourceRoot = root) {
  return {
    result: [
      {
        scriptId: "1",
        url: pathToFileURL(join(sourceRoot, "scripts/quality/audit-dependencies.mjs")).href,
        functions: [
          {
            functionName: "fixture",
            ranges: [{ startOffset: 0, endOffset: 80, count }],
            isBlockCoverage: true,
          },
        ],
      },
    ],
  };
}

async function workspace(t) {
  const dir = await mkdtemp(join(tmpdir(), "v8-shard-evidence-"));
  t.after(() => rm(dir, { recursive: true, force: true }));
  return dir;
}

async function matrixArtifacts(t, { count = total, sourceRoot = root, input = rawCoverage } = {}) {
  const { packCoverageShard } = await helpers();
  const dir = await workspace(t);
  const directory = join(dir, "downloads");
  await mkdir(directory);
  const manifests = [];
  for (let index = 1; index <= count; index++) {
    const inputDirectory = join(dir, `raw-${index}`);
    const outputDirectory = join(directory, `coverage-shard-${runAttempt}-${index}`);
    await mkdir(inputDirectory);
    await writeFile(join(inputDirectory, rawName), JSON.stringify(input(index, sourceRoot)));
    manifests.push(
      await packCoverageShard({
        inputDirectory,
        outputDirectory,
        shard: `${index}/${total}`,
        candidateSha,
        runId,
        runAttempt,
        sourceRoot,
      })
    );
  }
  return {
    dir,
    manifests,
    directory,
    outputDirectory: join(dir, "verified"),
    total,
    candidateSha,
    runId,
    runAttempt,
    sourceRoot,
  };
}

async function exerciseWorkflow(t, count) {
  const dir = await workspace(t);
  const bin = join(dir, "bin");
  const download = workflow.jobs["test-coverage"].steps.find(
    (step) => step.name === "Download all shard coverage"
  );
  const merge = workflow.jobs["test-coverage"].steps.find(
    (step) => step.name === "Merge + report + gate"
  );
  const pack = workflow.jobs["test-unit"].steps.find((step) =>
    step.run?.includes("prepare-v8-coverage.mjs pack")
  );
  await mkdir(bin);
  await mkdir(join(dir, "scripts/ci"), { recursive: true });
  if (existsSync(helperPath)) await cp(helperPath, join(dir, "scripts/ci/prepare-v8-coverage.mjs"));
  const selectionHelper = join(root, "scripts/ci/select-v8-coverage.mjs");
  if (existsSync(selectionHelper))
    await cp(selectionHelper, join(dir, "scripts/ci/select-v8-coverage.mjs"));
  for (const name of ["v8-source-map-layouts.mjs", "v8-transform-evidence.mjs"]) {
    await cp(join(root, "scripts/ci", name), join(dir, "scripts/ci", name));
  }
  const repository = "cheaper-inference/OmniRoute";
  const runHeadSha = "a".repeat(40);
  await mkdir(join(dir, "coverage"));
  await writeFile(
    join(dir, "coverage/coverage-selection.json"),
    JSON.stringify({
      schemaVersion: 1,
      policy: "v8-shard-provenance-v1",
      repository,
      candidateSha,
      runHeadSha,
      runId,
      consumerAttempt: runAttempt,
      total,
      producers: Array.from({ length: total }, (_, offset) => ({
        index: offset + 1,
        producerAttempt: runAttempt,
        jobId: String(101 + offset),
        artifactId: String(201 + offset),
        artifactName: `coverage-shard-${runAttempt}-${offset + 1}`,
        artifactDigest: `sha256:${String(offset + 1).repeat(64)}`,
        jobStartedAt: "2026-11-18T12:00:00.000Z",
        artifactCreatedAt: "2026-11-18T12:01:00.000Z",
        jobCompletedAt: "2026-11-18T12:02:00.000Z",
        attemptStartedAt: "2026-11-18T12:00:00.000Z",
        nextAttemptStartedAt: null,
      })),
    })
  );
  await writeFile(
    join(bin, "npx"),
    `#!${process.execPath}\n` +
      'const fs=require("node:fs"), path=require("node:path");\n' +
      'const args=process.argv.slice(2); if(args[0]!=="c8"||args[1]!=="report") process.exit(91);\n' +
      'const input=args[args.indexOf("--temp-directory")+1];\n' +
      'const samples=fs.readdirSync(input).filter(n=>n.endsWith(".json")).map(n=>JSON.parse(fs.readFileSync(path.join(input,n)))).filter(v=>Array.isArray(v.result));\n' +
      "fs.writeFileSync(process.env.QG_CAPTURE,JSON.stringify(samples));\n" +
      "const metric={total:samples.length,covered:samples.length,skipped:0,pct:100};\n" +
      'fs.mkdirSync("coverage",{recursive:true});fs.writeFileSync("coverage/coverage-summary.json",JSON.stringify({total:{lines:metric,statements:metric,functions:metric,branches:metric}}));\n',
    { mode: 0o755 }
  );
  const target = join(dir, download.with.path);
  await mkdir(target, { recursive: true });
  for (let index = 1; index <= count; index++) {
    const raw = join(dir, `raw-${index}`);
    await mkdir(raw);
    await writeFile(join(raw, rawName), JSON.stringify(rawCoverage(index)));
    let artifact = raw;
    if (pack) {
      artifact = join(dir, `packed-${index}`);
      await (
        await helpers()
      ).packCoverageShard({
        inputDirectory: raw,
        outputDirectory: artifact,
        shard: `${index}/${total}`,
        candidateSha,
        runId,
        runAttempt,
        sourceRoot: root,
      });
    }
    const output =
      download.with["merge-multiple"] === true
        ? target
        : join(target, `coverage-shard-${runAttempt}-${index}`);
    await cp(artifact, output, { recursive: true });
  }
  // The helper reads the same candidate sources even though the downloaded
  // artifacts sit elsewhere. Do not replace the real workflow's shell logic.
  const result = spawnSync("/bin/bash", ["-euo", "pipefail", "-c", merge.run], {
    cwd: dir,
    encoding: "utf8",
    timeout: 30_000,
    env: {
      ...process.env,
      PATH: `${bin}:${dirname(process.execPath)}:/usr/bin:/bin`,
      NODE_PATH: join(root, "node_modules"),
      GITHUB_SHA: candidateSha,
      GITHUB_RUN_ID: runId,
      GITHUB_RUN_ATTEMPT: runAttempt,
      GITHUB_WORKSPACE: root,
      GITHUB_REPOSITORY: repository,
      RUN_HEAD_SHA: runHeadSha,
      EVENT_NAME: "pull_request",
      QG_CAPTURE: join(dir, "observed.json"),
    },
  });
  assert.equal(result.error, undefined);
  return {
    ...result,
    observed: existsSync(join(dir, "observed.json"))
      ? JSON.parse(await readFile(join(dir, "observed.json"), "utf8"))
      : null,
  };
}

test(
  "the real eight-shard workflow merges contributions with colliding filenames before c8",
  posix,
  async (t) => {
    assert.deepEqual(workflow.jobs["test-unit"].strategy.matrix.shard, [1, 2, 3, 4, 5, 6, 7, 8]);
    const result = await exerciseWorkflow(t, total);
    assert.equal(result.status, 0, result.stdout + result.stderr);
    assert.equal(result.observed.length, 1);
    assert.equal(result.observed[0].result[0].functions[0].ranges[0].count, 36);
  }
);

test("the real workflow cannot report with only seven of eight shards", posix, async (t) => {
  const result = await exerciseWorkflow(t, total - 1);
  assert.notEqual(result.status, 0);
  assert.equal(result.observed, null, "admission must fail before c8 is invoked");
});

test("shard transport preserves producer bytes and accounts for the single c8 input", async (t) => {
  const { prepareCoverageShards } = await helpers();
  const options = await matrixArtifacts(t);
  const prepared = await prepareCoverageShards(options);
  assert.equal(prepared.inputFiles, total);
  const files = await readdir(options.outputDirectory);
  assert.deepEqual(files, ["coverage-merged.json"]);
  const aggregate = await readFile(join(options.outputDirectory, files[0]));
  assert.equal(prepared.aggregateBytes, aggregate.length);
  assert.equal(prepared.aggregateSha256, digest(aggregate));
  assert.equal(JSON.parse(aggregate).result[0].functions[0].ranges[0].count, 36);
  const order = options.manifests
    .map(
      (manifest, index) => JSON.stringify([rawName, index + 1, manifest.inputs[0].sha256]) + "\n"
    )
    .join("");
  assert.equal(prepared.mergeOrderSha256, digest(order));
  for (const [index, manifest] of options.manifests.entries()) {
    const artifact = join(options.directory, `coverage-shard-${runAttempt}-${index + 1}`);
    assert.equal(
      prepared.manifestHashes[index],
      digest(await readFile(join(artifact, "manifest.json")))
    );
    assert.equal(manifest.inputs[0].sha256, digest(JSON.stringify(rawCoverage(index + 1))));
    assert.equal(
      manifest.inputs[0].packedSha256,
      digest(await readFile(join(artifact, "raw", rawName + ".gz")))
    );
    assert.ok(manifest.inputBytes > 0 && manifest.packedBytes > 0);
    assert.equal(manifest.sourceRoot, root);
    assert.equal(manifest.pathPolicy, "git-tracked-file-urls-v1");
    assert.ok(
      manifest.sourceFiles.some(
        (source) => source.path === "scripts/quality/audit-dependencies.mjs"
      )
    );
  }
});

for (const scenario of [
  "missing-shard",
  "wrong-sha",
  "wrong-run",
  "wrong-attempt",
  "packed-hash",
  "raw-hash",
  "duplicate-input",
  "extra-file",
  "symlink",
]) {
  test(`coverage admission rejects ${scenario} before publishing inputs`, posix, async (t) => {
    const { prepareCoverageShards } = await helpers();
    const options = await matrixArtifacts(t);
    const shard = join(options.directory, `coverage-shard-${runAttempt}-1`);
    const manifestPath = join(shard, "manifest.json");
    const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
    const dataPath = join(shard, "raw", `${rawName}.gz`);
    if (scenario === "missing-shard")
      await rm(join(options.directory, `coverage-shard-${runAttempt}-8`), { recursive: true });
    if (scenario === "wrong-sha") manifest.candidateSha = "b".repeat(40);
    if (scenario === "wrong-run") manifest.runId = "123";
    if (scenario === "wrong-attempt") manifest.runAttempt = "1";
    if (scenario === "packed-hash") await writeFile(dataPath, "altered");
    if (scenario === "raw-hash") manifest.inputs[0].sha256 = "0".repeat(64);
    if (scenario === "duplicate-input") {
      manifest.inputs.push({ ...manifest.inputs[0] });
      manifest.inputFiles++;
    }
    if (scenario === "extra-file") await writeFile(join(shard, "raw/unlisted.json.gz"), "unlisted");
    if (scenario === "symlink") {
      await rm(dataPath);
      await symlink(join(options.dir, "raw-1", rawName), dataPath);
    }
    await writeFile(manifestPath, JSON.stringify(manifest));
    await assert.rejects(prepareCoverageShards(options));
    assert.equal(existsSync(options.outputDirectory), false);
  });
}

test("an empty shard cannot borrow completeness from the other seven shards", async (t) => {
  const { prepareCoverageShards } = await helpers();
  const options = await matrixArtifacts(t);
  const shard = join(options.directory, `coverage-shard-${runAttempt}-1`);
  const manifestPath = join(shard, "manifest.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  const bytes = Buffer.from('{"result":[]}');
  const packed = gzipSync(bytes);
  manifest.inputs[0] = {
    ...manifest.inputs[0],
    bytes: bytes.length,
    sha256: digest(bytes),
    packedBytes: packed.length,
    packedSha256: digest(packed),
  };
  manifest.inputBytes = bytes.length;
  manifest.packedBytes = packed.length;
  await writeFile(join(shard, "raw", `${rawName}.gz`), packed);
  await writeFile(manifestPath, JSON.stringify(manifest));
  await assert.rejects(prepareCoverageShards(options));
  assert.equal(existsSync(options.outputDirectory), false);
});

for (const bad of ["{", '{"result":[]}', '{"result":[{"url":"node:fs","functions":[]}]}']) {
  test(`malformed or empty measurement cannot become a 100% report: ${bad}`, async (t) => {
    const { prepareCoverageShards } = await helpers();
    const options = await matrixArtifacts(t);
    for (let index = 1; index <= total; index++) {
      const shard = join(options.directory, `coverage-shard-${runAttempt}-${index}`);
      const manifestPath = join(shard, "manifest.json");
      const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
      const bytes = Buffer.from(bad);
      const packed = gzipSync(bytes);
      manifest.inputs[0] = {
        ...manifest.inputs[0],
        bytes: bytes.length,
        sha256: digest(bytes),
        packedBytes: packed.length,
        packedSha256: digest(packed),
      };
      manifest.inputBytes = bytes.length;
      manifest.packedBytes = packed.length;
      await writeFile(join(shard, "raw", `${rawName}.gz`), packed);
      await writeFile(manifestPath, JSON.stringify(manifest));
    }
    await assert.rejects(prepareCoverageShards(options));
    assert.equal(existsSync(options.outputDirectory), false);
  });
}

test("a truncated producer input identifies the raw file and leaves no admitted shard", async (t) => {
  const { packCoverageShard } = await helpers();
  const dir = await workspace(t);
  const inputDirectory = join(dir, "raw");
  const outputDirectory = join(dir, "packed");
  await mkdir(inputDirectory);
  await writeFile(
    join(inputDirectory, "coverage-4606-1794431026138-0.json"),
    JSON.stringify(rawCoverage())
  );
  const prefix = '{"result":[{"url":"node:';
  const raw = prefix.padEnd(262144, "x");
  await writeFile(join(inputDirectory, rawName), raw);

  await assert.rejects(
    packCoverageShard({
      inputDirectory,
      outputDirectory,
      shard: `1/${total}`,
      candidateSha,
      runId,
      runAttempt,
      sourceRoot: root,
    }),
    {
      message: `V8_EVIDENCE_INCOMPLETE:invalid-raw-json {"shard":"1/${total}","rawInput":"${rawName}","bytes":262144}`,
    }
  );
  assert.equal(existsSync(outputDirectory), false);
  assert.equal(await readFile(join(inputDirectory, rawName), "utf8"), raw);
});

test("incompatible producer layouts identify each source and leave no admitted aggregate", async (t) => {
  const { prepareCoverageShards } = await helpers();
  const firstSource = "scripts/quality/audit-dependencies.mjs";
  const secondSource = "scripts/quality/check-skill-contract.mjs";
  const options = await matrixArtifacts(t, {
    input(index, sourceRoot) {
      const raw = rawCoverage(index, sourceRoot);
      const secondUrl = pathToFileURL(join(sourceRoot, secondSource)).href;
      raw.result.push({ ...raw.result[0], scriptId: "2", url: secondUrl });
      raw["source-map-cache"] = {
        [raw.result[0].url]: { data: null, lineLengths: [index === 1 ? 80 : 81] },
        [secondUrl]: { data: null, lineLengths: [index <= 2 ? 80 : 81] },
      };
      return raw;
    },
  });
  const reason = "V8_EVIDENCE_INCOMPLETE:source-map-layout-generated-evidence-missing";
  const firstObservation = { shard: 1, rawInput: rawName, producerProofs: 0 };
  const firstConflict = {
    source: firstSource,
    shard: 2,
    rawInput: rawName,
    producerProofs: 0,
    firstObservation,
  };
  const observations = [];
  await assert.rejects(
    prepareCoverageShards({
      ...options,
      onLayoutConflict: (observation) => observations.push(observation),
    }),
    (error) => {
      const prefix = reason + " ";
      assert.ok(error.message.startsWith(prefix));
      assert.deepEqual(JSON.parse(error.message.slice(prefix.length)), firstConflict);
      assert.deepEqual(error.layoutDiagnostics, {
        sourceCount: 2,
        sources: [
          { ...firstConflict, reason, occurrences: total - 1 },
          { ...firstConflict, source: secondSource, shard: 3, reason, occurrences: total - 2 },
        ],
      });
      return true;
    }
  );
  assert.deepEqual(
    observations.map(({ source, shard }) => ({ source, shard })),
    [
      { source: firstSource, shard: 2 },
      { source: secondSource, shard: 3 },
    ]
  );
  assert.equal(existsSync(options.outputDirectory), false);
});

test("zero-denominator coverage is incomplete even if c8 emits 100 percent", async (t) => {
  const { verifyCoverageReport } = await helpers();
  const dir = await workspace(t);
  const metric = { total: 0, covered: 0, skipped: 0, pct: 100 };
  await writeFile(
    join(dir, "coverage-summary.json"),
    JSON.stringify({
      total: { lines: metric, statements: metric, functions: metric, branches: metric },
    })
  );
  await assert.rejects(verifyCoverageReport({ reportDirectory: dir }));
});

test("the evidence CLI requires candidate, run, attempt and shard identities", posix, async (t) => {
  await helpers();
  const dir = await workspace(t);
  for (const args of [
    ["pack", dir, join(dir, "packed"), "1/8", candidateSha],
    ["pack", dir, join(dir, "packed"), "1/8", candidateSha, runId],
    ["pack", dir, join(dir, "packed"), "", candidateSha, runId, runAttempt, root],
    ["prepare", dir, join(dir, "prepared"), "8", candidateSha],
  ]) {
    const result = spawnSync(process.execPath, [helperPath, ...args], {
      cwd: root,
      encoding: "utf8",
      timeout: 30_000,
    });
    assert.equal(result.error, undefined);
    assert.notEqual(result.status, 0);
    assert.equal(existsSync(join(dir, "packed")), false);
    assert.equal(existsSync(join(dir, "prepared")), false);
  }
});

for (const scenario of ["source-escape", "source-blob-mismatch"]) {
  test(`portable metadata rejects ${scenario}`, async (t) => {
    const { prepareCoverageShards } = await helpers();
    const options = await matrixArtifacts(t);
    const manifestPath = join(options.directory, "coverage-shard-2-1/manifest.json");
    const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
    if (scenario === "source-escape") manifest.sourceFiles[0].path = "../outside.mjs";
    else manifest.sourceFiles[0].blob = "0".repeat(40);
    await writeFile(manifestPath, JSON.stringify(manifest));
    await assert.rejects(prepareCoverageShards(options));
    assert.equal(existsSync(options.outputDirectory), false);
  });
}

function command(command, args, { cwd = root, env = process.env, input } = {}) {
  const result = spawnSync(command, args, { cwd, env, input, encoding: "utf8", timeout: 60_000 });
  assert.equal(result.error, undefined);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  return result.stdout.trim();
}

async function portableFixture(t, { esm = false } = {}) {
  const dir = await workspace(t);
  const firstRoot = join(dir, "omni-ci-checkout");
  const secondRoot = join(dir, "hosted-checkout");
  await mkdir(join(firstRoot, "src"), { recursive: true });
  const source =
    "export function select(value: number) { if (value > 0) return 'positive'; return 'negative'; }\nselect(Number(process.argv[2]));\n";
  await writeFile(join(firstRoot, "src/branch.ts"), source);
  const env = {
    ...process.env,
    GIT_AUTHOR_NAME: "Coverage Fixture",
    GIT_AUTHOR_EMAIL: "coverage@example.test",
    GIT_COMMITTER_NAME: "Coverage Fixture",
    GIT_COMMITTER_EMAIL: "coverage@example.test",
  };
  command("git", ["init", "--quiet", firstRoot], { env });
  const git = (args, input) => command("git", args, { cwd: firstRoot, env, input });
  const blob = git(["hash-object", "-w", "--stdin"], source);
  const subtree = git(["mktree"], `100644 blob ${blob}\tbranch.ts\n`);
  let rootEntries = `040000 tree ${subtree}\tsrc\n`;
  if (esm) {
    const manifest = '{"type":"module"}\n';
    await writeFile(join(firstRoot, "package.json"), manifest);
    const manifestBlob = git(["hash-object", "-w", "--stdin"], manifest);
    rootEntries += `100644 blob ${manifestBlob}\tpackage.json\n`;
  }
  const tree = git(["mktree"], rootEntries);
  const sha = git(["commit-tree", tree, "-m", "coverage fixture"]);
  git(["update-ref", "HEAD", sha]);
  command("git", ["clone", "--quiet", "--local", firstRoot, secondRoot], { env });
  return { dir, firstRoot, secondRoot, sha };
}

async function compareNativePortableCoverage(t, { esm = false, aliases = false } = {}) {
  const {
    initializeCoverageTransformCache,
    packCoverageShard,
    prepareCoverageShards,
    verifyCoverageReport,
  } = await helpers();
  const { dir, firstRoot, secondRoot, sha } = await portableFixture(t, { esm });
  let evidenceDirectory = null;
  if (process.env.OMNIROUTE_V8_LAYOUT_EVIDENCE) {
    const evidenceRoot = resolve(process.env.OMNIROUTE_V8_LAYOUT_EVIDENCE);
    await mkdir(evidenceRoot, { recursive: true });
    evidenceDirectory = await mkdtemp(join(evidenceRoot, "portable-layout-"));
    t.diagnostic(`portable V8 diagnostics retained at ${evidenceDirectory}`);
  }
  const baseline = join(dir, "baseline");
  const artifacts = join(dir, "artifacts");
  await mkdir(baseline);
  await mkdir(artifacts);
  const cleanEnv = { ...process.env };
  delete cleanEnv.NODE_V8_COVERAGE;
  // When requested, retain only this fixture's executed tsx transform cache.
  // Do not read the shared machine cache or recompute generated JavaScript.
  const runtimeTemp = join(dir, "runtime-tmp");
  const runtimeTemps = [];
  if (evidenceDirectory) {
    await mkdir(runtimeTemp);
    runtimeTemps.push(runtimeTemp);
    cleanEnv.TMPDIR = runtimeTemp;
    await writeFile(
      join(evidenceDirectory, "context.json"),
      JSON.stringify(
        {
          candidateSha: sha,
          firstRoot,
          secondRoot,
          rootLengths: [firstRoot.length, secondRoot.length],
          nodeVersion: process.version,
          tsxVersion: JSON.parse(
            await readFile(join(root, "node_modules/tsx/package.json"), "utf8")
          ).version,
          c8Version: JSON.parse(await readFile(join(root, "node_modules/c8/package.json"), "utf8"))
            .version,
          sourceSha256: digest(await readFile(join(firstRoot, "src/branch.ts"))),
          fixtureHasPackageJson: esm,
        },
        null,
        2
      )
    );
  }
  const samples = [];
  const recorded = new Set();
  const captureSamples = async (raw, label, shard) => {
    if (!evidenceDirectory) return;
    for (const name of await readdir(raw)) {
      const identity = `${label}:${name}`;
      if (recorded.has(identity)) continue;
      recorded.add(identity);
      const bytes = await readFile(join(raw, name));
      const data = JSON.parse(bytes.toString("utf8"));
      const scripts = data.result.filter((script) =>
        script.url.split("?")[0].endsWith("/src/branch.ts")
      );
      if (!scripts.length) continue;
      const maps = Object.fromEntries(
        Object.entries(data["source-map-cache"] || {}).filter(([url]) =>
          url.split("?")[0].endsWith("/src/branch.ts")
        )
      );
      samples.push({ label, shard, name, rawSha256: digest(bytes), scripts, sourceMapCache: maps });
    }
    await writeFile(join(evidenceDirectory, "samples.json"), JSON.stringify(samples, null, 2));
  };
  let sourceMaps = 0;
  let multipleAliases = 0;
  for (let index = 1; index <= total; index++) {
    const sourceRoot = index % 2 ? firstRoot : secondRoot;
    const inputDirectory = join(dir, `portable-raw-${index}`);
    const transformCacheDirectory = join(dir, `producer-cache-${index}`);
    await initializeCoverageTransformCache({
      directory: transformCacheDirectory,
      shard: `${index}/${total}`,
      candidateSha: sha,
      runId,
      runAttempt,
      sourceRoot,
    });
    runtimeTemps.push(transformCacheDirectory);
    await mkdir(inputDirectory);
    const argument = index % 2 ? "1" : "-1";
    for (const [cwd, raw] of [
      [firstRoot, baseline],
      [sourceRoot, inputDirectory],
    ]) {
      const entry = aliases
        ? [
            "--input-type=module",
            "--eval",
            'process.argv.splice(1, 0, "fixture"); await import("./src/branch.ts?case=first"); await import("./src/branch.ts?case=second");',
            "--",
          ]
        : ["src/branch.ts"];
      command(process.execPath, ["--import", import.meta.resolve("tsx/esm"), ...entry, argument], {
        cwd,
        env: {
          ...cleanEnv,
          NODE_V8_COVERAGE: raw,
          ...(raw === baseline ? {} : { TMPDIR: transformCacheDirectory }),
        },
      });
      await captureSamples(raw, raw === baseline ? "baseline" : "producer", index);
    }
    for (const name of await readdir(inputDirectory)) {
      const data = JSON.parse(await readFile(join(inputDirectory, name), "utf8"));
      const urls = Object.keys(data["source-map-cache"] || {});
      sourceMaps += urls.length;
      if (urls.filter((url) => url.includes("/src/branch.ts?case=")).length === 2)
        multipleAliases++;
    }
    const manifest = await packCoverageShard({
      inputDirectory,
      outputDirectory: join(artifacts, `coverage-shard-${runAttempt}-${index}`),
      shard: `${index}/${total}`,
      candidateSha: sha,
      runId,
      runAttempt,
      sourceRoot,
      transformCacheDirectory,
    });
    assert.equal(manifest.sourceRoot, sourceRoot);
    assert.equal(manifest.pathPolicy, "git-tracked-file-urls-v1");
    assert.ok(manifest.sourceFiles.some((source) => source.path === "src/branch.ts"));
  }
  if (evidenceDirectory) {
    const generated = [];
    for (const temp of runtimeTemps) {
      for (const entry of await readdir(temp, { withFileTypes: true })) {
        if (!entry.isDirectory() || !entry.name.startsWith("tsx-")) continue;
        const cache = join(temp, entry.name);
        for (const file of await readdir(cache, { withFileTypes: true })) {
          if (!file.isFile() || !/^\d+-[a-f0-9]+$/.test(file.name)) continue;
          const value = JSON.parse(await readFile(join(cache, file.name), "utf8"));
          const map = typeof value.map === "string" ? JSON.parse(value.map) : value.map;
          if (!map?.sources?.some((source) => source.endsWith("src/branch.ts"))) continue;
          generated.push({
            producerCache: temp,
            cacheEntry: file.name,
            generatedSha256:
              typeof value.code === "string" ? digest(Buffer.from(value.code)) : null,
            code: value.code,
            map,
          });
        }
      }
    }
    await writeFile(
      join(evidenceDirectory, "executed-transform-cache.json"),
      JSON.stringify(generated, null, 2)
    );
  }
  assert.ok(sourceMaps > 0, "the real tsx fixture must exercise source-map-cache");
  if (aliases) assert.equal(multipleAliases, total, "each raw producer must contain both aliases");
  const preparedDirectory = join(dir, "prepared");
  const prepared = await prepareCoverageShards({
    directory: artifacts,
    outputDirectory: preparedDirectory,
    total,
    candidateSha: sha,
    runId,
    runAttempt,
    sourceRoot: firstRoot,
  });
  assert.ok(prepared.relocatedFiles > 0, "root relocation must be reported explicitly");
  if (!esm) {
    assert.ok(
      prepared.layoutProjection.projectedScriptSamples > 0,
      "layout projection must be declared with generated-code evidence"
    );
  }
  assert.ok(
    prepared.generatedEvidenceBytes > 0,
    "the executed TSX cache must be retained for either module format"
  );
  if (evidenceDirectory) {
    await writeFile(
      join(evidenceDirectory, "coverage-preparation.json"),
      JSON.stringify(prepared, null, 2)
    );
  }
  await captureSamples(preparedDirectory, "prepared", null);
  for (const [name, inputDirectory] of [
    ["expected", baseline],
    ["actual", preparedDirectory],
  ]) {
    const reportDirectory = join(dir, name);
    command(
      process.execPath,
      [
        join(root, "node_modules/c8/bin/c8.js"),
        "report",
        "--merge-async",
        "--temp-directory",
        inputDirectory,
        "--reports-dir",
        reportDirectory,
        "--reporter=json",
        "--reporter=json-summary",
        "--exclude=tests/**",
        "--exclude=**/*.test.*",
      ],
      { cwd: firstRoot, env: cleanEnv }
    );
    await verifyCoverageReport({ reportDirectory });
    if (evidenceDirectory) {
      await cp(
        join(reportDirectory, "coverage-final.json"),
        join(evidenceDirectory, `${name}-coverage-final.json`)
      );
      await cp(
        join(reportDirectory, "coverage-summary.json"),
        join(evidenceDirectory, `${name}-coverage-summary.json`)
      );
    }
  }
  const expected = JSON.parse(await readFile(join(dir, "expected/coverage-final.json"), "utf8"));
  const actual = JSON.parse(await readFile(join(dir, "actual/coverage-final.json"), "utf8"));
  assert.ok(Object.keys(expected).some((path) => path.endsWith("src/branch.ts")));
  assert.deepEqual(actual, expected, "every Istanbul counter must retain native c8 semantics");
}

test(
  "native c8 counters and source maps are identical across two checkout roots and eight shards",
  posix,
  async (t) => {
    await compareNativePortableCoverage(t);
  }
);

test(
  "native c8 ESM compatibility retains every counter across two checkout roots and eight shards",
  posix,
  async (t) => {
    await compareNativePortableCoverage(t, { esm: true });
  }
);

test(
  "native c8 retains every counter for query-string imports of the same source within one process",
  posix,
  async (t) => {
    await compareNativePortableCoverage(t, { esm: true, aliases: true });
  }
);

test(
  "coverage keeps genuine queried imports and excludes Node's ESM mock wrappers",
  posix,
  async (t) => {
    const { initializeCoverageTransformCache, packCoverageShard, prepareCoverageShards } =
      await helpers();
    const {
      dir,
      firstRoot: sourceRoot,
      sha: candidateSha,
    } = await portableFixture(t, { esm: true });
    const inputDirectory = join(dir, "mock-coverage-raw");
    const transformCacheDirectory = join(dir, "mock-transform-cache");
    const sourceUrl = pathToFileURL(join(sourceRoot, "src/branch.ts")).href;
    const binding = { candidateSha, runId, runAttempt, sourceRoot };
    await mkdir(inputDirectory);
    await initializeCoverageTransformCache({
      ...binding,
      shard: "1/1",
      directory: transformCacheDirectory,
    });
    const env = {
      ...process.env,
      NODE_OPTIONS: "",
      NODE_V8_COVERAGE: inputDirectory,
      TMPDIR: transformCacheDirectory,
    };
    function execute(code, useTsx = true) {
      command(
        process.execPath,
        [
          "--experimental-test-module-mocks",
          ...(useTsx ? ["--import", import.meta.resolve("tsx/esm")] : []),
          "--input-type=module",
          "--eval",
          code,
        ],
        { cwd: sourceRoot, env }
      );
    }
    async function prepare(label, mockScripts = 0) {
      const directory = join(dir, `mock-artifacts-${label}`);
      const outputDirectory = join(dir, `mock-merged-${label}`);
      await packCoverageShard({
        ...binding,
        shard: "1/1",
        inputDirectory,
        transformCacheDirectory,
        outputDirectory: join(directory, `coverage-shard-${runAttempt}-1`),
      });
      const outcome = await prepareCoverageShards({
        ...binding,
        total: 1,
        directory,
        outputDirectory,
      });
      assert.equal(outcome.ignoredNodeTestMockScripts, mockScripts);
      const result = JSON.parse(
        await readFile(join(outputDirectory, "coverage-merged.json"), "utf8")
      );
      const script = result.result.find(({ url }) => url === sourceUrl);
      assert.ok(script, "the real source remains covered");
      return { functions: script.functions, map: result["source-map-cache"][sourceUrl] };
    }

    execute(`
    import assert from "node:assert/strict";
    const canonical = await import("./src/branch.ts");
    const ordinary = await import("./src/branch.ts?view=real#case");
    const reserved = await import("./src/branch.ts?node-test-mock=991");
    assert.equal(canonical.select(-1), "negative");
    assert.equal(ordinary.select(1), "positive");
    assert.equal(reserved.select(-1), "negative");
  `);
    const baseline = await prepare("genuine");
    assert.ok(baseline.map?.data, "the genuine TypeScript layout has a source map");
    assert.equal(
      baseline.functions.find(({ functionName }) => functionName === "").ranges[0].count,
      3
    );

    execute(`
    import assert from "node:assert/strict";
    import { mock } from "node:test";
    mock.module("./src/branch.ts", { exports: { select: () => "mocked" } });
    const mocked = await import("./src/branch.ts");
    assert.equal(mocked.select(1), "mocked");
  `);
    assert.deepEqual(await prepare("with-mock", 1), baseline);

    execute(`await import("./src/branch.ts?node-test-mock=992");`, false);
    await assert.rejects(
      prepare("unproved-genuine"),
      /V8_EVIDENCE_INCOMPLETE:source-map-layout-generated-evidence-missing/
    );
  }
);

test("coverage rejects query aliases with incompatible layouts for one source", async (t) => {
  const { prepareCoverageShards } = await helpers();
  const options = await matrixArtifacts(t, {
    input(index, sourceRoot) {
      const raw = rawCoverage(index, sourceRoot);
      const url = raw.result[0].url;
      raw["source-map-cache"] = {
        [`${url}?case=first`]: { data: null, lineLengths: [80] },
        [`${url}?case=second`]: { data: null, lineLengths: [81] },
      };
      return raw;
    },
  });
  await assert.rejects(prepareCoverageShards(options), (error) => {
    assert.match(error.message, /V8_EVIDENCE_INCOMPLETE:ambiguous-source-map/);
    assert.match(error.message, /"source":"scripts\/quality\/audit-dependencies\.mjs"/);
    assert.match(error.message, /"shard":1/);
    assert.ok(error.message.includes(`"rawInput":"${rawName}"`));
    return true;
  });
  assert.equal(existsSync(options.outputDirectory), false);
});

test("coverage consumer bounds retained raw without losing the eight original producers", async (t) => {
  const { prepareCoverageShards } = await helpers();
  const options = await matrixArtifacts(t);
  const originals = [];
  for (const [offset, manifest] of options.manifests.entries()) {
    const artifact = join(options.directory, `coverage-shard-${runAttempt}-${offset + 1}`);
    for (const path of [
      join(artifact, "manifest.json"),
      ...manifest.inputs.map((input) => join(artifact, "raw", `${input.name}.gz`)),
    ]) {
      originals.push({ path, sha256: digest(await readFile(path)) });
    }
  }
  const prepared = await prepareCoverageShards(options);
  let materializedBytes = 0;
  let contributedCount = 0;
  for (const name of await readdir(options.outputDirectory)) {
    const bytes = await readFile(join(options.outputDirectory, name));
    materializedBytes += bytes.length;
    const sample = JSON.parse(bytes.toString("utf8"));
    assert.ok(Array.isArray(sample.result), "the c8 input directory contains only V8 derivatives");
    for (const script of sample.result) contributedCount += script.functions[0].ranges[0].count;
  }
  assert.equal(prepared.inputFiles, 8, "provenance retains the original input count");
  assert.equal(prepared.shards, 8);
  assert.equal(contributedCount, 36, "all original counts 1..8 contribute exactly once");
  for (const original of originals) {
    assert.equal(
      digest(await readFile(original.path)),
      original.sha256,
      "producer bytes remain immutable"
    );
  }
  const largestInputBytes = Math.max(
    ...options.manifests.flatMap((manifest) => manifest.inputs.map((input) => input.bytes))
  );
  assert.ok(
    materializedBytes <= largestInputBytes * 2,
    `repeated-source corpus retains ${materializedBytes} raw bytes for largest input ${largestInputBytes}`
  );
});

test(
  "coverage consumer enforces an independent peak quota across all eight shards",
  posix,
  async (t) => {
    const { assertBoundedPreparation } = await import("./fixtures/v8-disk-quota-harness.mjs");
    await assertBoundedPreparation(await matrixArtifacts(t), { expectedCount: 36 });
  }
);

test("coverage consumer retains distinct scripts when the aggregate exceeds a repeated-source bound", async (t) => {
  const { prepareCoverageShards } = await helpers();
  const files = [
    "scripts/quality/admission-verdict.mjs",
    "scripts/quality/audit-dependencies.mjs",
    "scripts/quality/balance-e2e-shards.mjs",
    "scripts/quality/baseline-headroom.mjs",
    "scripts/quality/build-test-impact-map.mjs",
    "scripts/quality/check-quality-ratchet.mjs",
    "scripts/quality/check-skill-contract.mjs",
    "scripts/quality/classify-pr-changes.mjs",
  ];
  const options = await matrixArtifacts(t, {
    input(index, sourceRoot) {
      const sample = rawCoverage(index, sourceRoot);
      sample.result[0].url = pathToFileURL(join(sourceRoot, files[index - 1])).href;
      return sample;
    },
  });
  const prepared = await prepareCoverageShards(options);
  assert.deepEqual(await readdir(options.outputDirectory), ["coverage-merged.json"]);
  const result = JSON.parse(
    await readFile(join(options.outputDirectory, "coverage-merged.json"), "utf8")
  );
  const counts = new Map(
    result.result.map((script) => [script.url, script.functions[0].ranges[0].count])
  );
  assert.equal(counts.size, 8);
  assert.deepEqual(
    files.map((file) => counts.get(pathToFileURL(join(root, file)).href)),
    [1, 2, 3, 4, 5, 6, 7, 8]
  );
  assert.ok(
    prepared.aggregateBytes >
      2 * Math.max(...options.manifests.map((manifest) => manifest.inputBytes))
  );
});

test(
  "coverage consumer removes owned staging after a late eighth-shard failure",
  posix,
  async (t) => {
    const { runWithIndependentDiskQuota, snapshotProducerInputs, assertProducerInputsUnchanged } =
      await import("./fixtures/v8-disk-quota-harness.mjs");
    const options = await matrixArtifacts(t);
    await writeFile(
      join(options.directory, `coverage-shard-${runAttempt}-8`, "raw", `${rawName}.gz`),
      "corrupt eighth gzip"
    );
    const originals = await snapshotProducerInputs(options);
    const largest = Math.max(
      ...options.manifests.flatMap((manifest) => manifest.inputs.map((input) => input.bytes))
    );
    const result = runWithIndependentDiskQuota({
      directory: options.dir,
      options,
      quotaBytes: largest * 8,
    });
    assert.equal(result.status, 1);
    assert.equal(result.report.subjectError.reason, "packed-hash-mismatch");
    assert.equal(result.report.outputExists, false);
    assert.equal(result.report.subject.finalBytes, 0);
    assert.equal(
      result.report.subject.events.some((event) => event.rejected === "ENOSPC"),
      false,
      "the generous control quota must expose the eighth input's corruption"
    );
    await assertProducerInputsUnchanged(originals);
  }
);

test("coverage consumer preserves incremental c8 semantics for mixed function and block samples", async (t) => {
  const { prepareCoverageShards } = await helpers();
  const options = await matrixArtifacts(t, {
    input(index, sourceRoot) {
      const sample = rawCoverage(index, sourceRoot);
      const script = sample.result[0];
      if (index === 2) script.url = fileURLToPath(script.url);
      if (index === 3) script.url += "?variant=1#fixture";
      script.functions[0].isBlockCoverage = [4, 7, 8].includes(index);
      return sample;
    },
  });
  const prepared = await prepareCoverageShards(options);
  assert.equal(prepared.inputFiles, 8);
  const raw = JSON.parse(
    await readFile(join(options.outputDirectory, "coverage-merged.json"), "utf8")
  );
  assert.equal(raw.result.length, 1, "file URLs and absolute paths name one c8 script");
  assert.equal(raw.result[0].functions.length, 1);
  const fn = raw.result[0].functions[0];
  assert.equal(fn.isBlockCoverage, true);
  // The first two positive function-only counts are merged into block
  // granularity, so later function-only records cannot replace their counts.
  // A single merge over all eight would discard the first two and report 19.
  assert.equal(fn.ranges[0].count, 22);
});

test("indexed coverage merging matches the incremental c8 aggregate with same-sample aliases", async (t) => {
  const { prepareCoverageShards } = await helpers();
  const { mergeProcessCovs } = v8Coverage;
  let expected;
  const options = await matrixArtifacts(t, {
    input(index, sourceRoot) {
      const sample = rawCoverage(index, sourceRoot);
      const [script] = sample.result;
      script.functions[0].isBlockCoverage = [1, 4, 7].includes(index);
      if (index % 2 === 0) {
        const duplicate = structuredClone(script);
        duplicate.scriptId = "2";
        duplicate.url += "?view=alternate";
        duplicate.functions[0].isBlockCoverage = true;
        duplicate.functions[0].ranges[0].count = 0;
        sample.result.push(duplicate);
      }
      if (index === 1 || index === 8) {
        const extra = structuredClone(script);
        extra.scriptId = "3";
        extra.url = pathToFileURL(
          join(sourceRoot, "scripts/quality/check-skill-contract.mjs")
        ).href;
        sample.result.push(extra);
      }
      const nativeInput = structuredClone(sample);
      for (const entry of nativeInput.result) entry.url = fileURLToPath(entry.url);
      expected = mergeProcessCovs(expected ? [expected, nativeInput] : [nativeInput]);
      return sample;
    },
  });
  await prepareCoverageShards(options);
  for (const entry of expected.result) entry.url = pathToFileURL(entry.url).href;
  const actual = JSON.parse(
    await readFile(join(options.outputDirectory, "coverage-merged.json"), "utf8")
  );
  assert.deepEqual(actual.result, expected.result);
});
