import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { lstat, mkdir, mkdtemp, readFile, readdir, rename, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { promisify } from "node:util";
import { gzip, gunzip } from "node:zlib";
import { verifyCoverageSelection } from "./select-v8-coverage.mjs";
import { createSourceMapLayoutProjector } from "./v8-source-map-layouts.mjs";
import {
  initializeTransformCache,
  matchingTransformProofs,
  packTransformEvidence,
  readTransformEvidence,
  transformProducerIdentity,
} from "./v8-transform-evidence.mjs";

const require = createRequire(import.meta.url);
const requireFromC8 = createRequire(require.resolve("c8/package.json"));
const TestExclude = requireFromC8("test-exclude");
const { buildYargs } = require("c8/lib/parse-args");
const c8Version = require("c8/package.json").version;
const compress = promisify(gzip);
const decompress = promisify(gunzip);
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
const PATH_POLICY = "git-tracked-file-urls-v1";
const RAW_NAME = /^[a-zA-Z0-9_.-]+\.json$/;
const SHA256 = /^[a-f0-9]{64}$/;
const SHA = /^[a-f0-9]{40}$/;

function identity({ candidateSha, runId, runAttempt }) {
  if (
    !SHA.test(candidateSha || "") ||
    !/^[1-9][0-9]*$/.test(runId || "") ||
    !/^[1-9][0-9]*$/.test(runAttempt || "")
  ) {
    throw new Error("Coverage requires candidate SHA, run ID and run attempt");
  }
  return { candidateSha, runId: String(runId), runAttempt: String(runAttempt) };
}

function shardIdentity(shard) {
  const match = /^([1-9][0-9]*)\/([1-9][0-9]*)$/.exec(shard || "");
  if (!match || +match[1] > +match[2] || +match[2] > 256) throw new Error("Invalid coverage shard");
  return { index: +match[1], total: +match[2] };
}

function safePath(path) {
  return (
    typeof path === "string" &&
    path.length > 0 &&
    !isAbsolute(path) &&
    !/[\\\x00-\x1f]/.test(path) &&
    !path.split("/").some((part) => !part || part === "." || part === "..")
  );
}

function inside(root, absolute) {
  const path = relative(root, absolute);
  return path &&
    !isAbsolute(path) &&
    path !== ".." &&
    !path.startsWith(`..${process.platform === "win32" ? "\\" : "/"}`)
    ? path.split(process.platform === "win32" ? "\\" : "/").join("/")
    : null;
}

function gitTree(root, sha) {
  const git = (args) =>
    execFileSync("git", ["-C", root, ...args], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
  if (git(["rev-parse", "--verify", `${sha}^{commit}`]).trim() !== sha)
    throw new Error("Candidate commit mismatch");
  const entries = git(["ls-tree", "-rz", "--full-tree", sha]).split("\0").filter(Boolean);
  return new Map(
    entries.map((entry) => {
      const tab = entry.indexOf("\t");
      const match = /^(\d{6}) (blob|commit) ([a-f0-9]{40})$/.exec(entry.slice(0, tab));
      const path = entry.slice(tab + 1);
      if (!match || !safePath(path)) throw new Error("Invalid candidate source path");
      return [path, { mode: match[1], type: match[2], blob: match[3] }];
    })
  );
}

async function regular(path) {
  if (!(await lstat(path)).isFile()) throw new Error("Coverage evidence must be a regular file");
}

async function sourceIdentity(root, path, tree) {
  if (!safePath(path)) throw new Error("Unsafe coverage source path");
  const entry = tree.get(path);
  if (!entry || entry.type !== "blob" || !["100644", "100755"].includes(entry.mode))
    throw new Error("Coverage source is not a regular tracked file");
  let cursor = root;
  const parts = path.split("/");
  for (const part of parts) {
    cursor = join(cursor, part);
    if ((await lstat(cursor)).isSymbolicLink())
      throw new Error("Coverage source cannot traverse a symlink");
  }
  await regular(cursor);
  const bytes = await readFile(cursor);
  const blob = createHash("sha1").update(`blob ${bytes.length}\0`).update(bytes).digest("hex");
  if (blob !== entry.blob) throw new Error("Coverage source differs from its candidate blob");
  return { path, blob, bytes: bytes.length, sha256: hash(bytes) };
}

function absolutePath(value, base) {
  if (typeof value !== "string") throw new Error("Invalid coverage path");
  if (value.startsWith("file:")) return fileURLToPath(value);
  if (isAbsolute(value)) return value;
  if (base && !/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(value)) return resolve(base, value);
  return null;
}

function validateCoverage(data) {
  if (!data || !Array.isArray(data.result)) throw new Error("Invalid V8 coverage result");
  for (const script of data.result) {
    if (typeof script.url !== "string" || !Array.isArray(script.functions))
      throw new Error("Invalid V8 script");
    for (const fn of script.functions) {
      if (!Array.isArray(fn.ranges) || !fn.ranges.length) throw new Error("Missing V8 ranges");
      for (const range of fn.ranges) {
        if (
          ![range.startOffset, range.endOffset, range.count].every(
            (value) => Number.isSafeInteger(value) && value >= 0
          ) ||
          range.endOffset < range.startOffset
        )
          throw new Error("Invalid V8 range");
      }
    }
  }
  const maps = data["source-map-cache"];
  if (maps !== undefined && (!maps || typeof maps !== "object" || Array.isArray(maps)))
    throw new Error("Invalid V8 source-map-cache");
}

/** Only declared candidate paths move. Counters, ranges and mappings never change. */
function visitPaths(data, origin, target, tree, visit) {
  const transform = (value, base, requireTracked = false) => {
    const absolute = absolutePath(value, base);
    if (!absolute) return value;
    const path = inside(origin, absolute);
    if (!path || !tree.has(path)) {
      if (requireTracked || (origin !== target && inside(target, absolute)))
        throw new Error("Coverage source-map path escapes its candidate");
      return value;
    }
    visit(path);
    if (origin === target) return value;
    const moved = resolve(target, path);
    if (value.startsWith("file:")) {
      const url = new URL(value);
      const result = pathToFileURL(moved);
      result.search = url.search;
      result.hash = url.hash;
      return result.href;
    }
    return isAbsolute(value) ? moved : value;
  };
  for (const script of data.result) script.url = transform(script.url);
  if (data["source-map-cache"]) {
    const normalized = {};
    for (const [url, entry] of Object.entries(data["source-map-cache"])) {
      const original = absolutePath(url);
      const path = original && inside(origin, original);
      const tracked = path && tree.has(path);
      if (!entry || typeof entry !== "object") throw new Error("Invalid source map entry");
      const map = entry.data;
      if (tracked && map) {
        if (!Array.isArray(map.sources)) throw new Error("Invalid source map sources");
        const mapRoot = map.sourceRoot
          ? absolutePath(map.sourceRoot, dirname(original))
          : dirname(original);
        if (!mapRoot) throw new Error("Invalid source map root");
        for (const source of map.sources) transform(source, mapRoot, true);
        map.sources = map.sources.map((source) => {
          const absolute = absolutePath(source, mapRoot);
          const sourcePath = inside(origin, absolute);
          return origin === target ? source : pathToFileURL(resolve(target, sourcePath)).href;
        });
        // Absolute source URLs above make the relocation explicit; no old root
        // may be prepended by source-map consumers after moving the script.
        if (origin !== target) map.sourceRoot = "";
      }
      const key = transform(url);
      if (Object.hasOwn(normalized, key)) throw new Error("Duplicate relocated source map");
      normalized[key] = entry;
    }
    data["source-map-cache"] = normalized;
  }
}

async function freshStage(outputDirectory) {
  const output = resolve(outputDirectory);
  if (
    await lstat(output).catch((error) => {
      if (error.code !== "ENOENT") throw error;
      return null;
    })
  )
    throw new Error("Coverage output already exists");
  await mkdir(dirname(output), { recursive: true });
  return { output, stage: await mkdtemp(join(dirname(output), ".v8-evidence-")) };
}

export async function initializeCoverageTransformCache(options) {
  const binding = identity(options);
  const shard = shardIdentity(options.shard);
  const sourceRoot = resolve(options.sourceRoot || process.cwd());
  gitTree(sourceRoot, binding.candidateSha);
  const producer = transformProducerIdentity({
    ...binding,
    shard: `${shard.index}/${shard.total}`,
    sourceRoot,
  });
  return initializeTransformCache({ directory: options.directory, producer });
}

export async function packCoverageShard(options) {
  const binding = identity(options);
  const shard = shardIdentity(options.shard);
  const sourceRoot = resolve(options.sourceRoot || process.cwd());
  const tree = gitTree(sourceRoot, binding.candidateSha);
  const input = resolve(options.inputDirectory);
  const files = (await readdir(input)).sort();
  if (!files.length) throw new Error("No V8 coverage inputs");
  const { output, stage } = await freshStage(options.outputDirectory);
  const sources = new Map();
  const inputs = [];
  try {
    await mkdir(join(stage, "raw"));
    for (const name of files) {
      if (!RAW_NAME.test(name)) throw new Error("Unexpected V8 input name");
      const path = join(input, name);
      await regular(path);
      const bytes = await readFile(path);
      const data = JSON.parse(bytes.toString("utf8"));
      validateCoverage(data);
      const referenced = new Set();
      visitPaths(data, sourceRoot, sourceRoot, tree, (path) => referenced.add(path));
      for (const path of referenced) {
        if (!sources.has(path)) sources.set(path, await sourceIdentity(sourceRoot, path, tree));
      }
      const packed = await compress(bytes, { level: 1 });
      await writeFile(join(stage, "raw", `${name}.gz`), packed, { flag: "wx" });
      inputs.push({
        name,
        bytes: bytes.length,
        sha256: hash(bytes),
        packedBytes: packed.length,
        packedSha256: hash(packed),
      });
    }
    if (JSON.stringify(files) !== JSON.stringify((await readdir(input)).sort()))
      throw new Error("Coverage inputs changed during packaging");
    const transformEvidence = await packTransformEvidence({
      directory: options.transformCacheDirectory,
      artifactDirectory: stage,
      sourceFiles: sources,
      producer: transformProducerIdentity({
        ...binding,
        shard: `${shard.index}/${shard.total}`,
        sourceRoot,
      }),
    });
    const manifest = {
      schemaVersion: 1,
      ...binding,
      shard: `${shard.index}/${shard.total}`,
      sourceRoot,
      pathPolicy: PATH_POLICY,
      nodeVersion: process.version,
      c8Version,
      sourceFiles: [...sources.values()].sort((a, b) => a.path.localeCompare(b.path)),
      inputFiles: inputs.length,
      inputBytes: inputs.reduce((sum, item) => sum + item.bytes, 0),
      packedBytes: inputs.reduce((sum, item) => sum + item.packedBytes, 0),
      inputs,
      transformEvidence,
    };
    await writeFile(join(stage, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n", {
      flag: "wx",
    });
    await rename(stage, output);
    return manifest;
  } finally {
    await rm(stage, { recursive: true, force: true });
  }
}

export async function prepareCoverageShards(options) {
  const binding = identity(options);
  const total = options.total;
  if (!Number.isSafeInteger(total) || total < 1 || total > 256)
    throw new Error("Invalid shard total");
  const sourceRoot = resolve(options.sourceRoot || process.cwd());
  const tree = gitTree(sourceRoot, binding.candidateSha);
  const directory = resolve(options.directory);
  const producers = options.selection
    ? verifyCoverageSelection(options.selection, options)
    : Array.from({ length: total }, (_, i) => ({
        index: i + 1,
        producerAttempt: binding.runAttempt,
        artifactName: `coverage-shard-${binding.runAttempt}-${i + 1}`,
      }));
  const expected = producers.map((producer) => producer.artifactName).sort();
  if (JSON.stringify((await readdir(directory)).sort()) !== JSON.stringify(expected))
    throw new Error("V8_EVIDENCE_INCOMPLETE:downloaded-shard-inventory-mismatch");
  const inputs = [];
  const verifiedSources = new Map();
  let generatedEvidenceBytes = 0;
  for (let index = 1; index <= total; index++) {
    const producer = producers[index - 1];
    const producerBinding = { ...binding, runAttempt: producer.producerAttempt };
    const artifact = join(directory, producer.artifactName);
    if (!(await lstat(artifact)).isDirectory()) throw new Error("Invalid coverage artifact layout");
    await regular(join(artifact, "manifest.json"));
    const manifest = JSON.parse(await readFile(join(artifact, "manifest.json"), "utf8"));
    const artifactNames = manifest.transformEvidence?.entries?.length
      ? ["generated", "manifest.json", "raw"]
      : ["manifest.json", "raw"];
    if (JSON.stringify((await readdir(artifact)).sort()) !== JSON.stringify(artifactNames))
      throw new Error("Invalid coverage artifact layout");
    if (
      manifest.schemaVersion !== 1 ||
      Object.entries(producerBinding).some(([key, value]) => manifest[key] !== value) ||
      manifest.shard !== `${index}/${total}` ||
      manifest.pathPolicy !== PATH_POLICY ||
      typeof manifest.sourceRoot !== "string" ||
      !isAbsolute(manifest.sourceRoot) ||
      resolve(manifest.sourceRoot) !== manifest.sourceRoot ||
      manifest.nodeVersion !== process.version ||
      manifest.c8Version !== c8Version ||
      !Array.isArray(manifest.inputs) ||
      !manifest.inputs.length ||
      manifest.inputFiles !== manifest.inputs.length ||
      !Array.isArray(manifest.sourceFiles)
    )
      throw new Error("Incompatible coverage shard identity");
    const declared = new Set();
    for (const source of manifest.sourceFiles) {
      if (!safePath(source.path) || declared.has(source.path))
        throw new Error("Invalid or duplicate source identity");
      declared.add(source.path);
      if (!verifiedSources.has(source.path))
        verifiedSources.set(source.path, await sourceIdentity(sourceRoot, source.path, tree));
      const expectedSource = verifiedSources.get(source.path);
      if (["blob", "bytes", "sha256"].some((key) => source[key] !== expectedSource[key]))
        throw new Error("Coverage source blob mismatch");
    }
    const generated = await readTransformEvidence({
      artifactDirectory: artifact,
      evidence: manifest.transformEvidence,
      producer: transformProducerIdentity({
        ...producerBinding,
        shard: `${index}/${total}`,
        sourceRoot: manifest.sourceRoot,
      }),
      sourceFiles: new Map([...declared].map((path) => [path, verifiedSources.get(path)])),
    });
    generatedEvidenceBytes += manifest.transformEvidence?.payloadBytes || 0;
    const rawDirectory = join(artifact, "raw");
    if (!(await lstat(rawDirectory)).isDirectory())
      throw new Error("Invalid raw coverage directory");
    const names = new Set();
    for (const item of manifest.inputs) {
      if (
        !RAW_NAME.test(item.name || "") ||
        names.has(item.name) ||
        !SHA256.test(item.sha256 || "") ||
        !SHA256.test(item.packedSha256 || "") ||
        !Number.isSafeInteger(item.bytes) ||
        item.bytes <= 0 ||
        !Number.isSafeInteger(item.packedBytes) ||
        item.packedBytes <= 0
      )
        throw new Error("Invalid or duplicate V8 coverage input");
      names.add(item.name);
      inputs.push({
        ...item,
        file: join(rawDirectory, `${item.name}.gz`),
        index,
        origin: manifest.sourceRoot,
        declared,
        generated,
      });
    }
    if (
      JSON.stringify((await readdir(rawDirectory)).sort()) !==
        JSON.stringify([...names].map((name) => `${name}.gz`).sort()) ||
      manifest.inputBytes !== manifest.inputs.reduce((sum, item) => sum + item.bytes, 0) ||
      manifest.packedBytes !== manifest.inputs.reduce((sum, item) => sum + item.packedBytes, 0)
    )
      throw new Error("Incomplete coverage shard inventory");
  }
  inputs.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : a.index - b.index));
  const policy = buildYargs().parse(["report", "--exclude=tests/**", "--exclude=**/*.test.*"]);
  const exclude = new TestExclude({
    cwd: sourceRoot,
    exclude: policy.exclude,
    include: policy.include,
    extension: policy.extension,
    excludeNodeModules: policy.excludeNodeModules,
    relativePath: true,
  });
  const { output, stage } = await freshStage(options.outputDirectory);
  const instrumentedShards = new Set();
  const layouts = createSourceMapLayoutProjector();
  let relocatedFiles = 0;
  let projectedFiles = 0;
  try {
    for (const [ordinal, item] of inputs.entries()) {
      await regular(item.file);
      const packed = await readFile(item.file);
      if (packed.length !== item.packedBytes || hash(packed) !== item.packedSha256)
        throw new Error("Packed coverage hash mismatch");
      const bytes = await decompress(packed, { maxOutputLength: item.bytes });
      if (bytes.length !== item.bytes || hash(bytes) !== item.sha256)
        throw new Error("Raw coverage hash mismatch");
      const data = JSON.parse(bytes.toString("utf8"));
      validateCoverage(data);
      const maps = new Map();
      for (const [url, cache] of Object.entries(data["source-map-cache"] || {})) {
        const absolute = absolutePath(url);
        const path = absolute && inside(item.origin, absolute);
        if (!path || !item.declared.has(path)) continue;
        if (maps.has(path)) throw new Error("V8_EVIDENCE_INCOMPLETE:ambiguous-source-map");
        maps.set(path, cache);
      }
      const originals = data.result.map((script) => {
        const absolute = absolutePath(script.url);
        const path = absolute && inside(item.origin, absolute);
        return {
          url: script.url,
          generatedProofs: matchingTransformProofs(
            item.generated,
            maps.get(path),
            path,
            script.url
          ),
        };
      });
      let moved = false;
      visitPaths(data, item.origin, sourceRoot, tree, (path) => {
        if (!item.declared.has(path)) throw new Error("Undeclared coverage source identity");
        if (item.origin !== sourceRoot) moved = true;
      });
      const cacheUpdates = new Map();
      for (const [index, script] of data.result.entries()) {
        const absolute = absolutePath(script.url);
        const path = absolute && inside(sourceRoot, absolute);
        if (
          !path ||
          !item.declared.has(path) ||
          !script.functions.length ||
          !exclude.shouldInstrument(absolute)
        )
          continue;
        instrumentedShards.add(item.index);
        const cache = maps.get(path);
        const lineLengths = layouts.project({
          script,
          cache,
          originUrl: originals[index].url,
          sourcePath: path,
          sourceIdentity: verifiedSources.get(path),
          generatedProofs: originals[index].generatedProofs,
        });
        if (lineLengths) cacheUpdates.set(cache, lineLengths);
      }
      // Several script IDs may share a source map. Each reads the original
      // generated layout before the derivative cache is changed once.
      for (const [cache, lineLengths] of cacheUpdates) cache.lineLengths = lineLengths;
      if (moved) relocatedFiles++;
      if (cacheUpdates.size) projectedFiles++;
      await writeFile(
        join(stage, `coverage-${String(ordinal).padStart(10, "0")}.json`),
        moved || cacheUpdates.size ? JSON.stringify(data) : bytes,
        { flag: "wx" }
      );
    }
    if (instrumentedShards.size !== total)
      throw new Error("A shard has no instrumented candidate coverage");
    await rename(stage, output);
    return {
      ...binding,
      producerAttempts: producers.map((producer) => producer.producerAttempt),
      shards: total,
      inputFiles: inputs.length,
      inputBytes: inputs.reduce((sum, item) => sum + item.bytes, 0),
      packedBytes: inputs.reduce((sum, item) => sum + item.packedBytes, 0),
      generatedEvidenceBytes,
      relocatedFiles,
      projectedFiles,
      layoutProjection: layouts.summary(),
      pathPolicy: PATH_POLICY,
      status: "COMPLETE",
    };
  } finally {
    await rm(stage, { recursive: true, force: true });
  }
}

export async function verifyCoverageReport({ reportDirectory }) {
  const report = JSON.parse(await readFile(join(reportDirectory, "coverage-summary.json"), "utf8"));
  for (const name of ["statements", "lines", "functions", "branches"]) {
    const metric = report.total?.[name];
    if (
      !metric ||
      ![metric.total, metric.covered, metric.skipped].every(
        (value) => Number.isSafeInteger(value) && value >= 0
      ) ||
      metric.covered > metric.total ||
      metric.skipped > metric.total
    )
      throw new Error("Invalid coverage report counters");
  }
  if (!report.total.statements.total || !report.total.lines.total)
    throw new Error("Empty coverage report is incomplete");
  return {
    status: "MEASURED",
    statements: report.total.statements.total,
    lines: report.total.lines.total,
  };
}

async function main() {
  if (process.argv[2] === "init-cache") {
    const [directory, shard, candidateSha, runId, runAttempt, sourceRoot] = process.argv.slice(3);
    return initializeCoverageTransformCache({
      directory,
      shard,
      candidateSha,
      runId,
      runAttempt,
      sourceRoot,
    });
  }
  const [
    operation,
    input,
    output,
    shard,
    candidateSha,
    runId,
    runAttempt,
    sourceRoot,
    selectionPath,
    runHeadSha,
    repository,
  ] = process.argv.slice(2);
  const selection =
    operation === "prepare" && selectionPath
      ? JSON.parse(await readFile(selectionPath, "utf8"))
      : undefined;
  return operation === "pack"
    ? packCoverageShard({
        inputDirectory: input,
        outputDirectory: output,
        shard,
        candidateSha,
        runId,
        runAttempt,
        sourceRoot,
        transformCacheDirectory: selectionPath,
      })
    : operation === "prepare"
      ? prepareCoverageShards({
          directory: input,
          outputDirectory: output,
          total: Number(shard),
          candidateSha,
          runId,
          runAttempt,
          sourceRoot,
          selection,
          runHeadSha,
          repository,
        })
      : operation === "verify-report"
        ? verifyCoverageReport({ reportDirectory: input })
        : Promise.reject(
            new Error(
              "Usage: init-cache <directory> <shard> <sha> <run-id> <attempt> <root> | pack/prepare <input> <output> <shard-or-total> <sha> <run-id> <attempt> <root> [cache-directory or selection head-sha repository] | verify-report <dir>"
            )
          );
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().then(
    ({ inputs: _inputs, sourceFiles: _sources, ...summary }) =>
      console.log(JSON.stringify(summary)),
    (error) => {
      console.error(`[coverage-evidence] ${error.message}`);
      process.exitCode = 1;
    }
  );
}
