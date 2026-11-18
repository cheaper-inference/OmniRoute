import { createHash } from "node:crypto";
import { lstat, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { userInfo } from "node:os";
import { isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { isDeepStrictEqual } from "node:util";

const require = createRequire(import.meta.url);
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
const POLICY = "exclusive-tsx-cache-v1";
const MAX_ENTRY_BYTES = 64 * 1024 * 1024;
const MAX_ENTRIES = 50_000;
const CACHE_NAME = /^\d+-[a-f0-9]{40}$/;
const HASH = /^[a-f0-9]{64}$/;

function incomplete(reason) {
  throw new Error(`V8_EVIDENCE_INCOMPLETE:generated-evidence-${reason}`);
}

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, stable(value[key])])
    );
  }
  return value;
}

const mapDigest = (value) => hash(JSON.stringify(stable(value)));

async function bytesOf(path) {
  let stat;
  let bytes;
  try {
    stat = await lstat(path);
  } catch (error) {
    incomplete(error.code === "ENOENT" ? "missing-file" : "unreadable-file");
  }
  if (!stat.isFile() || stat.size > MAX_ENTRY_BYTES) incomplete("invalid-file");
  try {
    bytes = await readFile(path);
  } catch {
    incomplete("unreadable-file");
  }
  if (bytes.length > MAX_ENTRY_BYTES) incomplete("invalid-file");
  return bytes;
}

function parsePayload(bytes) {
  let payload;
  let map;
  try {
    payload = JSON.parse(bytes.toString("utf8"));
    map = typeof payload.map === "string" ? JSON.parse(payload.map) : payload.map;
  } catch {
    incomplete("invalid-json");
  }
  if (
    typeof payload?.code !== "string" ||
    !map ||
    map.version !== 3 ||
    typeof map.mappings !== "string" ||
    !Array.isArray(map.sources)
  ) {
    incomplete("invalid-payload");
  }
  const mapText = typeof payload.map === "string" ? payload.map : JSON.stringify(map);
  return { code: payload.code, map, mapText };
}

function mappedSource(map, sourceRoot) {
  // The demonstrated TSX transform has one original source. Other map layouts
  // are preserved as raw coverage, but cannot prove this coordinate projection.
  if (map.sources.length !== 1 || typeof map.sources[0] !== "string") return null;
  const source = map.sources[0];
  let absolute;
  try {
    absolute = source.startsWith("file:")
      ? fileURLToPath(source)
      : isAbsolute(source)
        ? source
        : null;
  } catch {
    incomplete("source");
  }
  if (!absolute || (map.sourceRoot && map.sourceRoot !== "")) return null;
  const path = relative(sourceRoot, absolute);
  if (
    !path ||
    isAbsolute(path) ||
    path === ".." ||
    path.startsWith(`..${process.platform === "win32" ? "\\" : "/"}`)
  )
    return null;
  return path.split(process.platform === "win32" ? "\\" : "/").join("/");
}

function verifySource(payload, sourcePath, source, sourceRoot) {
  if (
    mappedSource(payload.map, sourceRoot) !== sourcePath ||
    payload.map.sourcesContent?.length !== 1 ||
    typeof payload.map.sourcesContent[0] !== "string" ||
    hash(payload.map.sourcesContent[0]) !== source.sha256
  )
    incomplete("source");
}

export function transformProducerIdentity(binding) {
  return {
    schemaVersion: 1,
    policy: POLICY,
    candidateSha: binding.candidateSha,
    runId: binding.runId,
    runAttempt: binding.runAttempt,
    shard: binding.shard,
    sourceRoot: binding.sourceRoot,
    nodeVersion: process.version,
    c8Version: require("c8/package.json").version,
    tsxVersion: require("tsx/package.json").version,
  };
}

export async function initializeTransformCache({ directory, producer }) {
  const path = resolve(directory);
  // mkdir without recursive/reuse is the exclusivity check: a previous run's
  // cache cannot be adopted merely because its directory name looks familiar.
  await mkdir(path);
  await writeFile(join(path, "producer.json"), JSON.stringify(producer) + "\n", { flag: "wx" });
  return { directory: path, producer };
}

export async function packTransformEvidence({
  directory,
  artifactDirectory,
  producer,
  sourceFiles,
}) {
  if (!directory) return undefined;
  const root = resolve(directory);
  const rootStat = await lstat(root).catch(() => null);
  if (!rootStat?.isDirectory()) incomplete("invalid-directory");
  let stamp;
  try {
    stamp = JSON.parse((await bytesOf(join(root, "producer.json"))).toString("utf8"));
  } catch {
    incomplete("binding");
  }
  if (!isDeepStrictEqual(stamp, producer)) incomplete("binding");
  const uid = process.geteuid ? process.geteuid() : userInfo().username;
  const cacheDirectory = join(root, `tsx-${uid}`);
  const stat = await lstat(cacheDirectory).catch((error) => {
    if (error.code !== "ENOENT") throw error;
    return null;
  });
  if (stat && !stat.isDirectory()) incomplete("invalid-directory");
  const names = stat
    ? (await readdir(cacheDirectory)).filter((name) => CACHE_NAME.test(name)).sort()
    : [];
  if (names.length > MAX_ENTRIES) incomplete("entry-limit");
  const entries = [];
  const seen = new Set();
  let scannedBytes = 0;
  for (const name of names) {
    const bytes = await bytesOf(join(cacheDirectory, name));
    scannedBytes += bytes.length;
    const value = parsePayload(bytes);
    const sourcePath = mappedSource(value.map, producer.sourceRoot);
    const source = sourceFiles.get(sourcePath);
    if (!source) continue;
    verifySource(value, sourcePath, source, producer.sourceRoot);
    const payloadSha256 = hash(bytes);
    if (seen.has(payloadSha256)) continue;
    seen.add(payloadSha256);
    if (!entries.length) await mkdir(join(artifactDirectory, "generated"));
    const payload = `generated/${payloadSha256}.json`;
    await writeFile(join(artifactDirectory, payload), bytes, { flag: "wx" });
    entries.push({
      sourcePath,
      sourceBlob: source.blob,
      sourceSha256: source.sha256,
      cacheEntry: name,
      payload,
      payloadBytes: bytes.length,
      payloadSha256,
      codeSha256: hash(value.code),
      mapSha256: hash(value.mapText),
    });
  }
  return {
    policy: POLICY,
    producer,
    entries,
    payloadBytes: entries.reduce((sum, entry) => sum + entry.payloadBytes, 0),
    scannedEntries: names.length,
    scannedBytes,
    limits: { maxEntryBytes: MAX_ENTRY_BYTES, maxEntries: MAX_ENTRIES },
  };
}

function descriptor(value, entry, sourceRoot) {
  const path = resolve(sourceRoot, entry.sourcePath);
  const url = pathToFileURL(path).href;
  const banner = `__filename=${JSON.stringify(path)};(()=>{`;
  const knownBanner = value.code.startsWith(`${banner}\n`) && value.code.endsWith("\n})()\n");
  const kind = knownBanner
    ? "tsx-cjs-filename"
    : value.code.startsWith("__filename=")
      ? "unrecognized-banner"
      : "identical-code";
  const body = knownBanner ? value.code.slice(banner.length) : value.code;
  const sourceMap = { ...value.map, sources: [url], sourceRoot: "" };
  const inline =
    value.code +
    "\n//# sourceMappingURL=data:application/json;base64," +
    Buffer.from(JSON.stringify(value.map)).toString("base64");
  const trailerLineIndex = value.code.split("\n").length;
  return {
    sourcePath: entry.sourcePath,
    sourceUrl: url,
    kind,
    normalizedBodySha256: hash(body),
    normalizedMapSha256: mapDigest(sourceMap),
    layouts: [
      {
        suffixKind: "inline-source-map",
        trailerLineIndex,
        lineLengths: inline.split("\n").map((line) => line.length),
      },
      {
        suffixKind: "inline-source-map-and-source-url",
        trailerLineIndex,
        lineLengths: `${inline}\n\n//# sourceURL=${url}`.split("\n").map((line) => line.length),
      },
    ],
    payloadSha256: entry.payloadSha256,
    codeSha256: entry.codeSha256,
    mapSha256: entry.mapSha256,
  };
}

export async function readTransformEvidence({
  artifactDirectory,
  evidence,
  producer,
  sourceFiles,
}) {
  const index = new Map();
  if (!evidence) return index;
  if (
    evidence.policy !== POLICY ||
    !isDeepStrictEqual(evidence.producer, producer) ||
    !Array.isArray(evidence.entries) ||
    evidence.entries.length > MAX_ENTRIES
  )
    incomplete("binding");
  if (evidence.entries.length && !(await lstat(join(artifactDirectory, "generated"))).isDirectory())
    incomplete("invalid-directory");
  const names = new Set();
  let payloadBytes = 0;
  for (const entry of evidence.entries) {
    const source = sourceFiles.get(entry.sourcePath);
    if (
      !source ||
      source.blob !== entry.sourceBlob ||
      source.sha256 !== entry.sourceSha256 ||
      !HASH.test(entry.payloadSha256 || "") ||
      !HASH.test(entry.codeSha256 || "") ||
      !HASH.test(entry.mapSha256 || "") ||
      entry.payload !== `generated/${entry.payloadSha256}.json` ||
      !Number.isSafeInteger(entry.payloadBytes) ||
      entry.payloadBytes <= 0 ||
      entry.payloadBytes > MAX_ENTRY_BYTES ||
      names.has(entry.payload)
    )
      incomplete("binding");
    names.add(entry.payload);
    const bytes = await bytesOf(join(artifactDirectory, entry.payload));
    if (bytes.length !== entry.payloadBytes || hash(bytes) !== entry.payloadSha256)
      incomplete("hash");
    payloadBytes += bytes.length;
    const value = parsePayload(bytes);
    if (hash(value.code) !== entry.codeSha256 || hash(value.mapText) !== entry.mapSha256)
      incomplete("hash");
    verifySource(value, entry.sourcePath, source, producer.sourceRoot);
    const descriptors = index.get(entry.sourcePath) || [];
    descriptors.push(descriptor(value, entry, producer.sourceRoot));
    index.set(entry.sourcePath, descriptors);
  }
  if (payloadBytes !== evidence.payloadBytes) incomplete("hash");
  if (evidence.entries.length) {
    const generated = join(artifactDirectory, "generated");
    if (!(await lstat(generated)).isDirectory()) incomplete("invalid-directory");
    const actual = (await readdir(generated)).map((name) => `generated/${name}`).sort();
    if (!isDeepStrictEqual(actual, [...names].sort())) incomplete("inventory");
  }
  return index;
}

export function matchingTransformProofs(index, cache, sourcePath, originUrl) {
  if (!cache?.data || !Array.isArray(cache.lineLengths)) return [];
  const digest = mapDigest(cache.data);
  const matches = (index.get(sourcePath) || []).flatMap(({ layouts, ...entry }) => {
    if (entry.sourceUrl !== originUrl || entry.normalizedMapSha256 !== digest) return [];
    return layouts
      .filter((layout) => isDeepStrictEqual(layout.lineLengths, cache.lineLengths))
      .map((layout) => ({ ...entry, ...layout }));
  });
  // Repeated writes of the same code/map are the same transform. Distinct
  // generated bodies with an indistinguishable map/layout remain ambiguous.
  return [
    ...new Map(
      matches.map((entry) => [`${entry.codeSha256}:${entry.mapSha256}:${entry.suffixKind}`, entry])
    ).values(),
  ];
}
