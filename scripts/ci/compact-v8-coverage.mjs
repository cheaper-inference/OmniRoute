import { createHash } from "node:crypto";
import { lstat, mkdir, mkdtemp, readFile, readdir, rename, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { promisify } from "node:util";
import { gzip, gunzip } from "node:zlib";
import { pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const requireFromC8 = createRequire(require.resolve("c8/package.json"));
const { buildYargs } = require("c8/lib/parse-args");
const createReport = require("c8/lib/report");
const { mergeProcessCovs, mergeScriptCovs } = requireFromC8("@bcoe/v8-coverage");
const compress = promisify(gzip);
const decompress = promisify(gunzip);
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");

function shardIdentity(value) {
  const match = /^(\d+)\/(\d+)$/.exec(value || "");
  if (!match || +match[1] < 1 || +match[2] < +match[1] || +match[2] > 256) {
    throw new Error("Expected a shard identity such as 1/8");
  }
  return { index: +match[1], total: +match[2], id: `${+match[1]}-of-${+match[2]}` };
}

function candidateIdentity(value) {
  if (!/^[a-f0-9]{40}$/.test(value || "")) throw new Error("Expected the full candidate SHA");
  return value;
}

function validateCoverage(data, name) {
  if (!data || !Array.isArray(data.result)) throw new Error(`Invalid V8 coverage: ${name}`);
  for (const script of data.result) {
    if (typeof script.url !== "string" || !Array.isArray(script.functions)) {
      throw new Error(`Invalid V8 script: ${name}`);
    }
    for (const fn of script.functions) {
      if (!Array.isArray(fn.ranges) || !fn.ranges.length) {
        throw new Error(`Missing V8 ranges: ${name}`);
      }
      for (const range of fn.ranges) {
        if (
          ![range.startOffset, range.endOffset, range.count].every(
            (value) => Number.isSafeInteger(value) && value >= 0
          ) ||
          range.endOffset < range.startOffset
        ) {
          throw new Error(`Invalid V8 range: ${name}`);
        }
      }
    }
  }
  const maps = data["source-map-cache"];
  if (maps !== undefined && (!maps || typeof maps !== "object" || Array.isArray(maps))) {
    throw new Error(`Invalid V8 source maps: ${name}`);
  }
}

/** Compress raw inputs losslessly; never merge per shard (V8 merging is not associative). */
export async function compactV8Coverage({ inputDirectory, outputDirectory, shard, candidateSha }) {
  const identity = shardIdentity(shard);
  candidateIdentity(candidateSha);
  const input = resolve(inputDirectory);
  const output = resolve(outputDirectory);
  if (
    await lstat(output).catch((error) => {
      if (error.code !== "ENOENT") throw error;
      return null;
    })
  ) {
    throw Object.assign(new Error("Coverage output already exists"), { code: "EEXIST" });
  }
  const files = await readdir(input);
  if (!files.length) throw new Error("No V8 coverage inputs");
  const stage = await mkdtemp(resolve(dirname(output), ".v8-pack-"));
  const inputs = new Array(files.length);
  let nextInput = 0;
  try {
    const dataDir = resolve(stage, `shard-${identity.id}`);
    await mkdir(dataDir);
    const packNext = async () => {
      while (nextInput < files.length) {
        const index = nextInput++;
        const name = files[index];
        const file = resolve(input, name);
        if (!/^[a-zA-Z0-9_.-]+\.json$/.test(name) || !(await lstat(file)).isFile()) {
          throw new Error(`Unexpected coverage input: ${name}`);
        }
        const bytes = await readFile(file);
        if (!bytes.length) throw new Error(`Empty coverage input: ${name}`);
        const packed = await compress(bytes, { level: 1 });
        await writeFile(resolve(dataDir, `${name}.gz`), packed, { flag: "wx" });
        inputs[index] = {
          name,
          bytes: bytes.length,
          sha256: sha256(bytes),
          packedBytes: packed.length,
          packedSha256: sha256(packed),
        };
      }
    };
    // Two bounded compression workers; JSON/schema validation belongs to the
    // mandatory final report. It reads and validates every original byte once.
    const workers = await Promise.allSettled([packNext(), packNext()]);
    const failed = workers.find((result) => result.status === "rejected");
    if (failed) throw failed.reason;
    const finalFiles = await readdir(input);
    if (
      files.length !== finalFiles.length ||
      files.some((name, index) => name !== finalFiles[index])
    ) {
      throw new Error("Coverage inputs changed while packaging");
    }
    const manifest = {
      schemaVersion: 2,
      candidateSha,
      shard: `${identity.index}/${identity.total}`,
      sourceRoot: process.cwd(),
      nodeVersion: process.version,
      c8Version: require("c8/package.json").version,
      inputFiles: inputs.length,
      inputBytes: inputs.reduce((n, x) => n + x.bytes, 0),
      packedBytes: inputs.reduce((n, x) => n + x.packedBytes, 0),
      inputs,
    };
    await writeFile(
      resolve(stage, `manifest-${identity.id}.json`),
      JSON.stringify(manifest, null, 2)
    );
    await rename(stage, output);
    return manifest;
  } finally {
    await rm(stage, { recursive: true, force: true });
  }
}

async function coverageInputs({ directory, total, candidateSha }) {
  candidateIdentity(candidateSha);
  if (!Number.isSafeInteger(total) || total < 1 || total > 256)
    throw new Error("Invalid shard total");
  const dir = resolve(directory);
  const entries = await readdir(dir);
  if (entries.length !== total * 2)
    throw new Error("Missing or unexpected coverage shard manifests");
  const inputs = [];
  const seen = new Set();
  for (let index = 1; index <= total; index++) {
    const id = `${index}-of-${total}`;
    const manifestPath = resolve(dir, `manifest-${id}.json`);
    const dataDir = resolve(dir, `shard-${id}`);
    if (!(await lstat(manifestPath)).isFile() || !(await lstat(dataDir)).isDirectory()) {
      throw new Error(`Invalid coverage shard artifact: ${id}`);
    }
    const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
    if (
      manifest.schemaVersion !== 2 ||
      manifest.candidateSha !== candidateSha ||
      manifest.shard !== `${index}/${total}` ||
      manifest.sourceRoot !== process.cwd() ||
      manifest.nodeVersion !== process.version ||
      manifest.c8Version !== require("c8/package.json").version ||
      !Number.isSafeInteger(manifest.inputFiles) ||
      manifest.inputFiles < 1 ||
      !Array.isArray(manifest.inputs) ||
      manifest.inputs.length !== manifest.inputFiles
    ) {
      throw new Error(`Incompatible coverage shard: ${index}/${total}`);
    }
    const files = await readdir(dataDir);
    if (files.length !== manifest.inputFiles) throw new Error(`Incomplete coverage shard: ${id}`);
    for (const item of manifest.inputs) {
      if (
        !/^[a-zA-Z0-9_.-]+\.json$/.test(item.name || "") ||
        seen.has(item.name) ||
        !/^[a-f0-9]{64}$/.test(item.sha256 || "") ||
        !/^[a-f0-9]{64}$/.test(item.packedSha256 || "") ||
        !Number.isSafeInteger(item.bytes) ||
        item.bytes < 1 ||
        !Number.isSafeInteger(item.packedBytes) ||
        item.packedBytes < 1
      ) {
        throw new Error(`Invalid or duplicate coverage input in ${id}`);
      }
      seen.add(item.name);
      const file = resolve(dataDir, `${item.name}.gz`);
      if (!(await lstat(file)).isFile()) throw new Error(`Invalid coverage file: ${item.name}`);
      const packed = await readFile(file);
      if (packed.length !== item.packedBytes || sha256(packed) !== item.packedSha256) {
        throw new Error(`Coverage hash mismatch: ${id}`);
      }
      inputs.push({ ...item, file });
    }
  }
  // Same filename order as c8 reading the flattened Linux artifact directory.
  return inputs.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
}

/** Admit all artifacts; failed-test artifacts use a separate workflow artifact prefix. */
export async function verifyCoverageShards(options) {
  const inputs = await coverageInputs(options);
  return {
    candidateSha: options.candidateSha,
    shards: options.total,
    inputFiles: inputs.length,
    status: "PASS",
  };
}

async function mergeCoverageInputs(inputs, report) {
  const scripts = new Map();
  const fileIndex = new Set();
  for (const item of inputs) {
    const bytes = await decompress(await readFile(item.file));
    if (bytes.length !== item.bytes || sha256(bytes) !== item.sha256) {
      throw new Error(`Uncompressed coverage hash mismatch: ${item.name}`);
    }
    let data;
    try {
      data = JSON.parse(bytes.toString("utf8"));
    } catch {
      throw new Error(`Malformed V8 JSON: ${item.name}`);
    }
    validateCoverage(data, item.name);
    if (data["source-map-cache"]) {
      Object.assign(
        report.sourceMapCache,
        report._normalizeSourceMapCache(data["source-map-cache"])
      );
    }
    const group = report._normalizeProcessCov(data, fileIndex);
    const byUrl = new Map();
    for (const script of group.result) {
      if (!byUrl.has(script.url)) byUrl.set(script.url, []);
      byUrl.get(script.url).push(script);
    }
    // Exactly c8's per-URL input order, without re-normalizing untouched scripts.
    // Regrouping samples changes mixed function/block coverage and is forbidden.
    for (const [url, incoming] of byUrl) {
      const previous = scripts.get(url);
      scripts.set(url, mergeScriptCovs(previous ? [previous, ...incoming] : incoming));
    }
  }
  if (!scripts.size) throw new Error("No instrumented project coverage in the inputs");
  return mergeProcessCovs([{ result: [...scripts.values()] }]);
}

export async function reportCoverageShards({ reportOptions = [], ...options }) {
  const inputs = await coverageInputs(options);
  const argv = buildYargs().parse([
    ...reportOptions,
    "--merge-async",
    "--exclude=tests/**",
    "--exclude=**/*.test.*",
    "report",
  ]);
  if (argv.all || argv.excludeAfterRemap) throw new Error("Unsupported coverage remapping options");
  const report = createReport({
    ...argv,
    reportsDirectory: argv["reports-dir"],
    reporter: Array.isArray(argv.reporter) ? argv.reporter : [argv.reporter],
  });
  report._getMergedProcessCovAsync = () => mergeCoverageInputs(inputs, report);
  await report.run();
  if (argv.checkCoverage)
    await require("c8/lib/commands/check-coverage").checkCoverages(argv, report);
  return {
    candidateSha: options.candidateSha,
    shards: options.total,
    inputFiles: inputs.length,
    status: "COMPLETE",
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const [command, input, output, shard, sha, ...extra] = process.argv.slice(2);
  const run =
    command === "compact"
      ? compactV8Coverage({
          inputDirectory: input,
          outputDirectory: output,
          shard,
          candidateSha: sha,
        })
      : command === "verify"
        ? verifyCoverageShards({ directory: input, total: Number(output), candidateSha: shard })
        : command === "report"
          ? reportCoverageShards({
              directory: input,
              total: Number(output),
              candidateSha: shard,
              reportOptions: [sha, ...extra].filter(Boolean),
            })
          : Promise.reject(
              new Error(
                "Usage: compact <input> <output> <1/8> <sha> | verify/report <dir> <8> <sha> [c8 options]"
              )
            );
  run.then(
    ({ inputs: _inputs, ...summary }) => console.log(JSON.stringify(summary)),
    (error) => {
      console.error(`[coverage] ${error.message}`);
      process.exitCode = 1;
    }
  );
}
