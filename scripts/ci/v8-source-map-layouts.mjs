import { createHash } from "node:crypto";
import { isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";

export const SOURCE_MAP_LAYOUT_POLICY = "tsx-generated-layout-v1";

function incomplete(reason) {
  throw new Error(`V8_EVIDENCE_INCOMPLETE:source-map-layout-${reason}`);
}

function lineStarts(lengths) {
  if (!Array.isArray(lengths) || !lengths.length) incomplete("invalid-lines");
  const starts = [];
  let next = 0;
  for (const length of lengths) {
    if (!Number.isSafeInteger(length) || length < 0) incomplete("invalid-lines");
    starts.push(next);
    next += length + 1;
    if (!Number.isSafeInteger(next)) incomplete("invalid-lines");
  }
  return { starts, eof: next - 1 };
}

function roots(functions) {
  return functions
    .map((fn) => [fn.functionName || "", fn.ranges[0].startOffset, fn.ranges[0].endOffset])
    .sort((a, b) => a[1] - b[1] || a[2] - b[2] || a[0].localeCompare(b[0]));
}

function layoutDigest(cache) {
  return createHash("sha256").update(JSON.stringify(cache)).digest("hex");
}

function verifyGeneratedProofs(previous, current, required) {
  if (previous.length > 1 || current.length > 1) incomplete("generated-evidence-ambiguous");
  if (required && (!previous.length || !current.length)) incomplete("generated-evidence-missing");
  if (!previous.length || !current.length) return;
  const [prior] = previous;
  const [next] = current;
  if (required && (prior.kind === "unrecognized-banner" || next.kind === "unrecognized-banner"))
    incomplete("unrecognized-banner");
  if (prior.kind !== next.kind || prior.normalizedBodySha256 !== next.normalizedBodySha256)
    incomplete("generated-body-differs");
  if (required && prior.suffixKind !== next.suffixKind) incomplete("unproven-layout");
}

function bannerLength(url) {
  let path;
  try {
    path = url.startsWith("file:") ? fileURLToPath(url) : isAbsolute(url) ? url : null;
  } catch {
    incomplete("unrecognized-banner");
  }
  if (!path) incomplete("unrecognized-banner");
  return `__filename=${JSON.stringify(path)};(()=>{`.length;
}

function projectFunctions(script, cache, originUrl, canonical, proof) {
  const from = cache.lineLengths;
  const to = canonical.cache.lineLengths;
  const trailer = proof.trailerLineIndex;
  const withSourceUrl = proof.suffixKind === "inline-source-map-and-source-url";
  if (
    from.length !== to.length ||
    !Number.isSafeInteger(trailer) ||
    trailer < 1 ||
    trailer !== canonical.generatedProofs[0].trailerLineIndex ||
    trailer !== from.length - (withSourceUrl ? 3 : 1)
  )
    incomplete("unproven-layout");
  // The exact suffix was reconstructed from the executed cache. Only those
  // unmapped trailers may change length when the checkout path changes.
  if (
    from[trailer - 1] !== 0 ||
    to[trailer - 1] !== 0 ||
    (withSourceUrl && (from[trailer + 1] !== 0 || to[trailer + 1] !== 0))
  )
    incomplete("unproven-layout");
  for (let index = 1; index < trailer; index++) {
    if (from[index] !== to[index]) incomplete("body-differs");
  }
  const bannerChanged = from[0] !== to[0];
  // A corrupted banner can accidentally equal the canonical length. Validate
  // the executed filename binding independently of whether its length changes.
  if (
    (bannerChanged || proof.kind === "tsx-cjs-filename") &&
    (!cache.data?.mappings?.startsWith(";") ||
      from[0] !== bannerLength(originUrl) ||
      to[0] !== bannerLength(canonical.originUrl))
  )
    incomplete("unrecognized-banner");
  // Both source-map trailers must be unmapped. Changing mapped code is outside
  // this projection; it needs independent instrumentation evidence instead.
  const mappingLines = cache.data?.mappings?.split(";");
  if (!mappingLines || mappingLines.slice(trailer).some((line) => line !== ""))
    incomplete("mapped-trailer");
  const source = lineStarts(from);
  const target = lineStarts(to);
  const coordinate = (offset) => {
    if (!Number.isSafeInteger(offset) || offset < 0 || offset > source.eof)
      incomplete("invalid-range");
    if (offset === 0) return 0;
    if (offset === source.eof) return target.eof;
    if (offset >= source.starts[trailer]) incomplete("range-in-trailer");
    let line = 0;
    while (line + 1 < source.starts.length && source.starts[line + 1] <= offset) line++;
    let column = offset - source.starts[line];
    if (line === 0 && bannerChanged) {
      // The only instrumented position inside the known filename banner is
      // the wrapper's `()=>{` start. Never shift an arbitrary banner range.
      if (column !== from[0] - 5) incomplete("range-in-banner");
      column = to[0] - 5;
    }
    if (column > to[line]) incomplete("invalid-range");
    return target.starts[line] + column;
  };
  const projected = script.functions.map((fn) => ({
    ...fn,
    ranges: fn.ranges.map((range) => ({
      ...range,
      startOffset: coordinate(range.startOffset),
      endOffset: coordinate(range.endOffset),
    })),
  }));
  if (!isDeepStrictEqual(roots(projected), canonical.roots))
    incomplete("function-identity-differs");
  for (const fn of projected) {
    for (const range of fn.ranges)
      if (range.endOffset < range.startOffset) incomplete("invalid-range");
  }
  return projected;
}

/**
 * Preserve producer bytes and project only a demonstrated tsx path layout into
 * the first admitted layout. The c8 CLI still performs the original V8 merge.
 * Source map mappings, body columns, counts and block/function flags stay intact.
 */
export function createSourceMapLayoutProjector() {
  const canonical = new Map();
  const transformations = new Map();
  let projectedScriptSamples = 0;
  return {
    project({ script, cache, originUrl, sourcePath, sourceIdentity, generatedProofs = [] }) {
      if (
        typeof sourcePath !== "string" ||
        !sourcePath ||
        !/^[a-f0-9]{40}$/.test(sourceIdentity?.blob || "") ||
        !/^[a-f0-9]{64}$/.test(sourceIdentity?.sha256 || "")
      )
        incomplete("source-identity-missing");
      if (cache?.lineLengths) lineStarts(cache.lineLengths);
      const current = cache ?? null;
      const prior = canonical.get(sourcePath);
      if (!prior) {
        canonical.set(sourcePath, {
          cache: structuredClone(current),
          originUrl,
          identity: structuredClone(sourceIdentity),
          roots: roots(script.functions),
          generatedProofs: structuredClone(generatedProofs),
        });
        return null;
      }
      if (!isDeepStrictEqual(prior.identity, sourceIdentity)) incomplete("source-identity-differs");
      const sameLayout = isDeepStrictEqual(prior.cache, current);
      verifyGeneratedProofs(prior.generatedProofs, generatedProofs, !sameLayout);
      if (sameLayout) return null;
      if (
        !prior.cache?.data ||
        !current?.data ||
        !Array.isArray(prior.cache.lineLengths) ||
        !Array.isArray(current.lineLengths)
      )
        incomplete("unproven-layout");
      const { lineLengths: _priorLines, ...priorMap } = prior.cache;
      const { lineLengths: _currentLines, ...currentMap } = current;
      if (!isDeepStrictEqual(priorMap, currentMap)) incomplete("map-differs");
      const projected = projectFunctions(script, current, originUrl, prior, generatedProofs[0]);
      const fromLayoutSha256 = layoutDigest(current);
      const toLayoutSha256 = layoutDigest(prior.cache);
      const key = `${sourcePath}:${fromLayoutSha256}:${toLayoutSha256}`;
      const entry = transformations.get(key) || {
        sourcePath,
        sourceBlob: sourceIdentity.blob,
        sourceSha256: sourceIdentity.sha256,
        originalSourceUrl: originUrl,
        canonicalSourceUrl: prior.originUrl,
        fromLayoutSha256,
        toLayoutSha256,
        samples: 0,
        originalGeneratedPayloadSha256: generatedProofs[0].payloadSha256,
        canonicalGeneratedPayloadSha256: prior.generatedProofs[0].payloadSha256,
        originalCodeSha256: generatedProofs[0].codeSha256,
        canonicalCodeSha256: prior.generatedProofs[0].codeSha256,
        originalMapSha256: generatedProofs[0].mapSha256,
        canonicalMapSha256: prior.generatedProofs[0].mapSha256,
        normalizedBodySha256: generatedProofs[0].normalizedBodySha256,
        generatedCodeKind: generatedProofs[0].kind,
        suffixKind: generatedProofs[0].suffixKind,
      };
      entry.samples++;
      transformations.set(key, entry);
      projectedScriptSamples++;
      script.functions = projected;
      // The caller applies this only after all scripts in the raw sample have
      // read their original cache. Multiple script IDs can share the same URL.
      return [...prior.cache.lineLengths];
    },
    summary() {
      return {
        policy: SOURCE_MAP_LAYOUT_POLICY,
        projectedScriptSamples,
        transformations: [...transformations.values()],
      };
    },
  };
}
