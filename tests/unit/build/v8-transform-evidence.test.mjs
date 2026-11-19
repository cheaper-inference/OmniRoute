import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { tmpdir, userInfo } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";
import {
  initializeCoverageTransformCache,
  packCoverageShard,
  prepareCoverageShards,
} from "../../../scripts/ci/prepare-v8-coverage.mjs";

const require = createRequire(import.meta.url);
const digest = (value) => createHash("sha256").update(value).digest("hex");
const runId = "987654321";
const runAttempt = "2";
const total = 8;
const sourcePath = "src/branch.ts";
const source = "export const value = true;\n";

async function fixture(t) {
  const dir = await mkdtemp(join(tmpdir(), "v8-transform-proof-"));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const firstRoot = join(dir, "omni-ci-checkout");
  const secondRoot = join(dir, "hosted-checkout");
  await mkdir(join(firstRoot, "src"), { recursive: true });
  await writeFile(join(firstRoot, sourcePath), source);
  const env = {
    ...process.env,
    GIT_AUTHOR_NAME: "Coverage Fixture",
    GIT_AUTHOR_EMAIL: "coverage@example.test",
    GIT_COMMITTER_NAME: "Coverage Fixture",
    GIT_COMMITTER_EMAIL: "coverage@example.test",
  };
  const git = (args, input) =>
    execFileSync("git", args, {
      cwd: firstRoot,
      env,
      input,
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    }).trim();
  git(["init", "--quiet"]);
  const blob = git(["hash-object", "-w", "--stdin"], source);
  const subtree = git(["mktree"], `100644 blob ${blob}\tbranch.ts\n`);
  const tree = git(["mktree"], `040000 tree ${subtree}\tsrc\n`);
  const candidateSha = git(["commit-tree", tree, "-m", "coverage fixture"]);
  git(["update-ref", "HEAD", candidateSha]);
  git(["clone", "--quiet", "--local", firstRoot, secondRoot]);
  const directory = join(dir, "downloads");
  await mkdir(directory);
  return { dir, firstRoot, secondRoot, candidateSha, directory, manifests: [] };
}

function generated(sourceRoot, { differentBody = false, unrecognizedBanner = false } = {}) {
  const path = join(sourceRoot, sourcePath);
  const url = pathToFileURL(path).href;
  const banner = `__filename=${JSON.stringify(path)};${unrecognizedBanner ? "(function(){" : "(()=>{"}`;
  const code = `${banner}\nconst value=${differentBody ? "null" : "true"};\n})()\n`;
  const map = {
    version: 3,
    mappings: ";AAAA",
    names: [],
    ignoreList: [],
    sources: [path],
    sourcesContent: [source],
  };
  const executable =
    code +
    "\n//# sourceMappingURL=data:application/json;base64," +
    Buffer.from(JSON.stringify(map)).toString("base64") +
    `\n\n//# sourceURL=${url}`;
  const raw = {
    result: [
      {
        scriptId: "1",
        url,
        functions: [
          {
            functionName: "",
            ranges: [{ startOffset: 0, endOffset: executable.length, count: 1 }],
            isBlockCoverage: true,
          },
          {
            functionName: "",
            ranges: [{ startOffset: banner.length - 5, endOffset: code.length - 4, count: 1 }],
            isBlockCoverage: true,
          },
        ],
      },
    ],
    "source-map-cache": {
      [url]: {
        lineLengths: executable.split("\n").map((line) => line.length),
        data: { ...map, sources: [url], sourceRoot: "" },
        url: null,
      },
    },
  };
  return { code, map, raw };
}

async function packageMatrix(t, scenario = "valid") {
  const options = await fixture(t);
  for (let index = 1; index <= total; index++) {
    const sourceRoot = index % 2 ? options.firstRoot : options.secondRoot;
    const shard = `${index}/${total}`;
    const inputDirectory = join(options.dir, `raw-${index}`);
    const cacheDirectory = join(options.dir, `exclusive-cache-${index}`);
    const uid = process.geteuid ? process.geteuid() : userInfo().username;
    const cache = join(cacheDirectory, `tsx-${uid}`);
    await mkdir(inputDirectory);
    await mkdir(cache, { recursive: true });
    const value = generated(sourceRoot, {
      differentBody: scenario === "same-size-body" && index === 2,
      unrecognizedBanner: scenario === "unrecognized-banner" && index === 2,
    });
    if (scenario === "wrong-raw-source" && index === 2) {
      const rawMap = Object.values(value.raw["source-map-cache"])[0].data;
      rawMap.sourcesContent = ["export const value = null;\n"];
    }
    await writeFile(join(inputDirectory, "coverage-1.json"), JSON.stringify(value.raw));
    const binding = {
      schemaVersion: 1,
      policy: "exclusive-tsx-cache-v1",
      candidateSha: options.candidateSha,
      runId,
      runAttempt,
      shard,
      sourceRoot,
      nodeVersion: process.version,
      c8Version: require("c8/package.json").version,
      tsxVersion: require("tsx/package.json").version,
    };
    if (scenario === "wrong-cache-binding" && index === 2) binding.candidateSha = "b".repeat(40);
    await writeFile(join(cacheDirectory, "producer.json"), JSON.stringify(binding));
    const payload = { code: value.code, map: JSON.stringify(value.map) };
    const interrupted = '{"code":';
    const neededEntry = scenario === "interrupted-required-cache" && index === 2;
    await writeFile(
      join(cache, `17950-${"a".repeat(40)}`),
      neededEntry ? interrupted : JSON.stringify(payload)
    );
    if (scenario === "interrupted-unrelated-cache" && index === 2) {
      await writeFile(join(cache, `17950-${"b".repeat(40)}`), interrupted);
    }
    if (scenario === "wrong-unused-cached-source" && index === 2) {
      const staleMap = { ...value.map, sourcesContent: ["export const value = null;\n"] };
      await writeFile(
        join(cache, `17950-${"b".repeat(40)}`),
        JSON.stringify({ code: value.code, map: JSON.stringify(staleMap) })
      );
    }
    if (scenario === "ambiguous-cache" && index === 2) {
      const different = generated(sourceRoot, { differentBody: true });
      await writeFile(
        join(cache, `17950-${"b".repeat(40)}`),
        JSON.stringify({
          code: different.code,
          map: JSON.stringify(different.map),
        })
      );
    }
    const outputDirectory = join(options.directory, `coverage-shard-${runAttempt}-${index}`);
    options.manifests.push(
      await packCoverageShard({
        inputDirectory,
        outputDirectory,
        shard,
        candidateSha: options.candidateSha,
        runId,
        runAttempt,
        sourceRoot,
        transformCacheDirectory: scenario === "missing-cache" ? undefined : cacheDirectory,
      })
    );
  }
  return {
    ...options,
    total,
    runId,
    runAttempt,
    sourceRoot: options.firstRoot,
    outputDirectory: join(options.dir, "prepared"),
  };
}

test("tsx generated evidence binds original code and map bytes to the producer and candidate", async (t) => {
  const options = await packageMatrix(t);
  const evidence = options.manifests[1].transformEvidence;
  assert.ok(evidence, "the original executed transform must travel with its shard");
  assert.equal(evidence.policy, "exclusive-tsx-cache-v1");
  assert.equal(evidence.producer.candidateSha, options.candidateSha);
  assert.equal(evidence.producer.runId, runId);
  assert.equal(evidence.producer.runAttempt, runAttempt);
  assert.equal(evidence.producer.shard, "2/8");
  assert.equal(evidence.producer.nodeVersion, process.version);
  assert.equal(evidence.producer.tsxVersion, require("tsx/package.json").version);
  assert.equal(evidence.entries.length, 1);
  const entry = evidence.entries[0];
  assert.equal(entry.sourcePath, sourcePath);
  assert.equal(entry.sourceSha256, digest(source));
  const bytes = await readFile(join(options.directory, "coverage-shard-2-2", entry.payload));
  assert.equal(digest(bytes), entry.payloadSha256);
  const payload = JSON.parse(bytes);
  assert.equal(digest(payload.code), entry.codeSha256);
  assert.equal(digest(payload.map), entry.mapSha256);
  const prepared = await prepareCoverageShards(options);
  assert.equal(prepared.shards, 8);
  assert.ok(prepared.layoutProjection.projectedScriptSamples > 0);
  assert.deepEqual(
    await readFile(join(options.directory, "coverage-shard-2-2", entry.payload)),
    bytes
  );
  assert.deepEqual(
    JSON.parse(await readFile(join(options.directory, "coverage-shard-2-2/manifest.json"), "utf8")),
    options.manifests[1]
  );
});

test("an interrupted tsx cache write cannot block complete generated coverage evidence", async (t) => {
  const options = await packageMatrix(t, "interrupted-unrelated-cache");
  const evidence = options.manifests[1].transformEvidence;
  assert.equal(evidence.scannedEntries, 2);
  assert.equal(evidence.invalidJsonEntries, 1);
  assert.equal(evidence.entries.length, 1);
  const prepared = await prepareCoverageShards(options);
  assert.ok(prepared.layoutProjection.projectedScriptSamples > 0);
});

test("an unused transform with a different source cannot replace the measured proof", async (t) => {
  const options = await packageMatrix(t, "wrong-unused-cached-source");
  const evidence = options.manifests[1].transformEvidence;
  assert.equal(evidence.mismatchedSourceEntries, 1);
  assert.equal(evidence.entries.length, 1);
  const prepared = await prepareCoverageShards(options);
  assert.ok(prepared.layoutProjection.projectedScriptSamples > 0);
});

test("V8 evidence refuses an embedded source different from the candidate Git blob", async (t) => {
  await assert.rejects(
    packageMatrix(t, "wrong-raw-source"),
    /V8_EVIDENCE_INCOMPLETE:generated-evidence-embedded-source \(src\/branch.ts\)/
  );
});

for (const [scenario, reason] of [
  ["missing-cache", "generated-evidence-missing"],
  ["interrupted-required-cache", "generated-evidence-missing"],
  ["same-size-body", "generated-body-differs"],
  ["ambiguous-cache", "generated-evidence-ambiguous"],
  ["unrecognized-banner", "unrecognized-banner"],
]) {
  test(`tsx projection rejects ${scenario} before publishing derived coverage`, async (t) => {
    const options = await packageMatrix(t, scenario);
    await assert.rejects(prepareCoverageShards(options), (error) => {
      assert.match(error.message, /V8_EVIDENCE_INCOMPLETE:/);
      assert.ok(error.message.includes(reason), error.message);
      assert.match(error.message, /"source":"src\/branch.ts"/);
      assert.match(error.message, /"shard":[1-8]/);
      return true;
    });
    assert.equal(existsSync(options.outputDirectory), false);
  });
}

test("tsx evidence rejects an altered transported cache payload", async (t) => {
  const options = await packageMatrix(t);
  const entry = options.manifests[1].transformEvidence?.entries[0];
  assert.ok(entry, "transport must retain a hash-bound original cache payload");
  await writeFile(join(options.directory, "coverage-shard-2-2", entry.payload), "altered cache");
  await assert.rejects(
    prepareCoverageShards(options),
    /V8_EVIDENCE_INCOMPLETE:.*generated-evidence-hash/
  );
  assert.equal(existsSync(options.outputDirectory), false);
});

test("tsx evidence rejects a cache initialized for a different candidate", async (t) => {
  await assert.rejects(
    packageMatrix(t, "wrong-cache-binding"),
    /V8_EVIDENCE_INCOMPLETE:.*generated-evidence-binding/
  );
});

test("tsx producer initialization creates an exclusive cache and never adopts an existing directory", async (t) => {
  const options = await fixture(t);
  const directory = join(options.dir, "exclusive-producer");
  const binding = {
    directory,
    candidateSha: options.candidateSha,
    runId,
    runAttempt,
    shard: "1/8",
    sourceRoot: options.firstRoot,
  };
  const initialized = await initializeCoverageTransformCache(binding);
  assert.equal(initialized.producer.candidateSha, options.candidateSha);
  assert.equal(initialized.producer.shard, "1/8");
  const original = await readFile(join(directory, "producer.json"));
  await assert.rejects(initializeCoverageTransformCache(binding), { code: "EEXIST" });
  assert.deepEqual(await readFile(join(directory, "producer.json")), original);
});

for (const [field, value] of [
  ["runId", "123"],
  ["runAttempt", "1"],
  ["shard", "1/8"],
  ["nodeVersion", "v0.0.0"],
  ["c8Version", "0.0.0"],
  ["tsxVersion", "0.0.0"],
  ["sourceRoot", "/unrelated-checkout"],
]) {
  test(`tsx consumer rejects a different ${field} in the transform binding`, async (t) => {
    const options = await packageMatrix(t);
    const manifestPath = join(options.directory, "coverage-shard-2-2/manifest.json");
    const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
    manifest.transformEvidence.producer[field] = value;
    await writeFile(manifestPath, JSON.stringify(manifest));
    await assert.rejects(
      prepareCoverageShards(options),
      /V8_EVIDENCE_INCOMPLETE:.*generated-evidence-binding/
    );
    assert.equal(existsSync(options.outputDirectory), false);
  });
}

test("coverage consumer bounds retained raw after generated proof and portable layout projection", async (t) => {
  const options = await packageMatrix(t);
  const originals = [];
  let generatedEvidenceBytes = 0;
  for (const [offset, manifest] of options.manifests.entries()) {
    const artifact = join(options.directory, `coverage-shard-${runAttempt}-${offset + 1}`);
    generatedEvidenceBytes += manifest.transformEvidence.payloadBytes;
    for (const path of [
      join(artifact, "manifest.json"),
      ...manifest.inputs.map((input) => join(artifact, "raw", `${input.name}.gz`)),
      ...manifest.transformEvidence.entries.map((entry) => join(artifact, entry.payload)),
    ]) {
      originals.push({ path, sha256: digest(await readFile(path)) });
    }
  }
  const prepared = await prepareCoverageShards(options);
  let materializedBytes = 0;
  let contributedCount = 0;
  // readFile is already used by this suite; enumerate only the owned derivative directory.
  const { readdir } = await import("node:fs/promises");
  for (const name of await readdir(options.outputDirectory)) {
    const bytes = await readFile(join(options.outputDirectory, name));
    materializedBytes += bytes.length;
    const sample = JSON.parse(bytes.toString("utf8"));
    assert.ok(Array.isArray(sample.result), "the c8 input directory contains only V8 derivatives");
    for (const script of sample.result) contributedCount += script.functions[0].ranges[0].count;
  }
  assert.equal(prepared.inputFiles, 8);
  assert.equal(prepared.shards, 8);
  assert.equal(contributedCount, 8, "the projection retains each producer contribution");
  assert.ok(generatedEvidenceBytes > 0);
  assert.equal(prepared.generatedEvidenceBytes, generatedEvidenceBytes);
  assert.ok(prepared.layoutProjection.projectedScriptSamples > 0);
  for (const original of originals) {
    assert.equal(
      digest(await readFile(original.path)),
      original.sha256,
      "raw, manifests and generated proof stay immutable"
    );
  }
  const largestInputBytes = Math.max(
    ...options.manifests.flatMap((manifest) => manifest.inputs.map((input) => input.bytes))
  );
  assert.ok(
    materializedBytes <= largestInputBytes * 2,
    `proved repeated-source corpus retains ${materializedBytes} raw bytes for largest input ${largestInputBytes}`
  );
});

test(
  "coverage consumer enforces peak quota with portable generated-code evidence",
  { skip: process.platform === "win32" },
  async (t) => {
    const { assertBoundedPreparation } = await import("./fixtures/v8-disk-quota-harness.mjs");
    await assertBoundedPreparation(await packageMatrix(t), { expectedCount: 8, generated: true });
  }
);

test("tsx coverage retains the original generated bytes when either loader forces exit", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "v8-tsx-forced-exit-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const atomicPreload = new URL("../../../scripts/ci/atomic-tsx-cache.mjs", import.meta.url).href;
  const nativePreload = new URL("../../../scripts/ci/native-worker-v8-layout.mjs", import.meta.url)
    .href;
  const uid = process.geteuid ? process.geteuid() : userInfo().username;
  for (const [loader, extension] of [
    ["tsx/esm", "mts"],
    ["tsx/esm", "cts"],
    ["tsx", "mts"],
    ["tsx", "cts"],
  ]) {
    const mode = `${loader.replace("/", "-")}-${extension}`;
    const fixture = join(directory, `${mode}.${extension}`);
    await writeFile(
      fixture,
      [
        'const value: string = "fixture-ok";',
        "console.log(value);",
        'if (process.env.V8_FIXTURE_FORCE_EXIT === "1") process.exit(0);',
        "setTimeout(() => {}, 100);",
      ].join("\n")
    );
    const snapshots = [];
    for (const forced of [false, true]) {
      const scratch = join(directory, `${mode}-${Number(forced)}`);
      await mkdir(scratch);
      const env = { ...process.env, TMPDIR: scratch };
      delete env.OMNIROUTE_CI_SYNC_TSX_CACHE;
      delete env.TSX_DISABLE_CACHE;
      env.NODE_V8_COVERAGE = join(scratch, "raw");
      env.NODE_OPTIONS = `--import=${nativePreload}`;
      if (forced) {
        env.V8_FIXTURE_FORCE_EXIT = "1";
        env.OMNIROUTE_CI_SYNC_TSX_CACHE = scratch;
        env.NODE_OPTIONS = `--import=${atomicPreload} --import=${nativePreload}`;
      } else {
        delete env.V8_FIXTURE_FORCE_EXIT;
      }
      const output = execFileSync(process.execPath, ["--import", loader, fixture], {
        env,
        encoding: "utf8",
        timeout: 15000,
      });
      assert.equal(output.trim(), "fixture-ok");
      const cache = join(scratch, `tsx-${uid}`);
      const files = (await readdir(cache)).sort();
      assert.ok(files.length > 0, `${mode} produced no cache`);
      assert.ok(files.every((file) => /^\d+-[a-f0-9]{40}$/.test(file)));
      const retained = [];
      for (const file of files) {
        const bytes = await readFile(join(cache, file));
        const value = JSON.parse(bytes.toString("utf8"));
        assert.equal(typeof value.code, "string");
        retained.push([file, digest(bytes)]);
      }
      snapshots.push(retained);
    }
    assert.deepEqual(snapshots[1], snapshots[0], mode);
  }
});
