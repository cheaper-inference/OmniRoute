import assert from "node:assert/strict";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { pathToFileURL } from "node:url";
import test from "node:test";
import { createSourceMapLayoutProjector } from "../../../scripts/ci/v8-source-map-layouts.mjs";

const sourcePath = "src/sample.ts";
const sourceIdentity = { blob: "a".repeat(40), sha256: "b".repeat(64) };
const root = join(tmpdir(), "v8-layout-fixture");

function sample(checkout, count = 1) {
  const path = join(root, checkout, sourcePath);
  const originUrl = pathToFileURL(path).href;
  const banner = `__filename=${JSON.stringify(path)};(()=>{`;
  const body = "function branch(value){if(value)return 1;return 0;}";
  const code = `${banner}\n${body}\n})()\n`;
  const generated = `${code}\n//# sourceMappingURL=${originUrl}\n\n//# sourceURL=${originUrl}`;
  const start = banner.length + 1;
  return {
    sourcePath,
    sourceIdentity: { ...sourceIdentity },
    originUrl,
    cache: {
      lineLengths: generated.split("\n").map((line) => line.length),
      // prepare already relocates source paths before this coordinate-only module.
      data: {
        version: 3,
        mappings: ";AAAA",
        sources: ["file:///candidate/src/sample.ts"],
        sourcesContent: ["candidate source"],
      },
      url: null,
    },
    generatedProofs: [
      {
        kind: "tsx-cjs-filename",
        normalizedBodySha256: "c".repeat(64),
        suffixKind: "inline-source-map-and-source-url",
        trailerLineIndex: 4,
        payloadSha256: "d".repeat(64),
        codeSha256: "e".repeat(64),
        mapSha256: "f".repeat(64),
      },
    ],
    script: {
      scriptId: "42",
      url: "file:///candidate/src/sample.ts",
      functions: [
        {
          functionName: "",
          ranges: [{ startOffset: 0, endOffset: generated.length, count }],
          isBlockCoverage: true,
        },
        {
          functionName: "",
          ranges: [{ startOffset: banner.length - 5, endOffset: code.length - 4, count }],
          isBlockCoverage: false,
        },
        {
          functionName: "branch",
          ranges: [
            { startOffset: start, endOffset: start + body.length, count },
            { startOffset: start + 30, endOffset: start + 36, count: 0 },
          ],
          isBlockCoverage: true,
        },
      ],
    },
  };
}

function pair() {
  return { canonical: sample("omni-ci-checkout"), current: sample("hosted-checkout", 7) };
}

test("verified TSX layout projection preserves every counter and flag without mutating the original cache", () => {
  const { canonical, current } = pair();
  const projector = createSourceMapLayoutProjector();
  assert.equal(projector.project(canonical), null);
  const before = structuredClone(current);
  const projectedLines = projector.project(current);
  assert.deepEqual(projectedLines, canonical.cache.lineLengths);
  assert.deepEqual(
    current.cache,
    before.cache,
    "cache updates are deferred until all script IDs are projected"
  );
  assert.equal(current.script.scriptId, before.script.scriptId);
  assert.equal(current.script.url, before.script.url);
  for (const [index, fn] of current.script.functions.entries()) {
    assert.equal(fn.isBlockCoverage, before.script.functions[index].isBlockCoverage);
    assert.deepEqual(
      fn.ranges.map((range) => range.count),
      before.script.functions[index].ranges.map((range) => range.count)
    );
    assert.deepEqual(
      fn.ranges.map(({ count: _count, ...range }) => range),
      canonical.script.functions[index].ranges.map(({ count: _count, ...range }) => range)
    );
  }
  const receipt = projector.summary();
  assert.equal(receipt.policy, "tsx-generated-layout-v1");
  assert.equal(receipt.projectedScriptSamples, 1);
  assert.equal(receipt.transformations[0].sourceBlob, sourceIdentity.blob);
  assert.equal(receipt.transformations[0].normalizedBodySha256, "c".repeat(64));
  assert.equal(receipt.transformations[0].originalSourceUrl, before.originUrl);
  assert.equal(receipt.transformations[0].canonicalSourceUrl, canonical.originUrl);
  assert.notEqual(
    receipt.transformations[0].fromLayoutSha256,
    receipt.transformations[0].toLayoutSha256
  );
});

test("multiple script IDs sharing a cache each read the original layout", () => {
  const { canonical, current } = pair();
  const projector = createSourceMapLayoutProjector();
  projector.project(canonical);
  const second = { ...current, script: structuredClone(current.script) };
  second.script.scriptId = "43";
  const firstLines = projector.project(current);
  const secondLines = projector.project(second);
  assert.deepEqual(firstLines, secondLines);
  assert.deepEqual(current.script.functions, second.script.functions);
  assert.equal(projector.summary().projectedScriptSamples, 2);
});

test("an unchanged layout does not require projection evidence", () => {
  const canonical = sample("same-checkout");
  const current = structuredClone(canonical);
  canonical.generatedProofs = [];
  current.generatedProofs = [];
  current.script.functions[0].ranges[0].count = 9;
  const projector = createSourceMapLayoutProjector();
  projector.project(canonical);
  const before = structuredClone(current);
  assert.equal(projector.project(current), null);
  assert.deepEqual(current, before);
  assert.equal(projector.summary().projectedScriptSamples, 0);
});

const negatives = [
  ["body line length", "body-differs", ({ current }) => current.cache.lineLengths[1]++],
  [
    "map",
    "map-differs",
    ({ current }) => {
      current.cache.data.mappings += ",CAAC";
    },
  ],
  [
    "mapped source",
    "map-differs",
    ({ current }) => {
      current.cache.data.sourcesContent[0] = "different source";
    },
  ],
  [
    "source blob",
    "source-identity-differs",
    ({ current }) => {
      current.sourceIdentity.blob = "0".repeat(40);
    },
  ],
  [
    "source hash",
    "source-identity-differs",
    ({ current }) => {
      current.sourceIdentity.sha256 = "0".repeat(64);
    },
  ],
  [
    "function identity",
    "function-identity-differs",
    ({ current }) => {
      current.script.functions[2].functionName = "different";
    },
  ],
  [
    "unrecognized banner",
    "unrecognized-banner",
    ({ current }) => {
      current.generatedProofs[0].kind = "unrecognized-banner";
    },
  ],
  ["banner length", "unrecognized-banner", ({ current }) => current.cache.lineLengths[0]++],
  [
    "range in filename",
    "range-in-banner",
    ({ current }) => {
      current.script.functions[1].ranges.push({ startOffset: 2, endOffset: 3, count: 0 });
    },
  ],
  [
    "invalid offset",
    "invalid-range",
    ({ current }) => {
      current.script.functions[2].ranges[1].endOffset = Number.MAX_SAFE_INTEGER;
    },
  ],
  [
    "invalid line length",
    "invalid-lines",
    ({ current }) => {
      current.cache.lineLengths[1] = -1;
    },
  ],
  [
    "missing generated evidence",
    "generated-evidence-missing",
    ({ current }) => {
      current.generatedProofs = [];
    },
  ],
  [
    "different generated body",
    "generated-body-differs",
    ({ current }) => {
      current.generatedProofs[0].normalizedBodySha256 = "0".repeat(64);
    },
  ],
  [
    "mapped trailer",
    "mapped-trailer",
    ({ canonical, current }) => {
      canonical.cache.data.mappings = ";AAAA;;;AAAA";
      current.cache.data.mappings = canonical.cache.data.mappings;
    },
  ],
];

for (const trailer of [4, 6]) {
  negatives.push([
    `range in trailer ${trailer}`,
    "range-in-trailer",
    ({ current }) => {
      const startOffset =
        current.cache.lineLengths.slice(0, trailer).reduce((sum, length) => sum + length + 1, 0) +
        1;
      current.script.functions[0].ranges.push({
        startOffset,
        endOffset: startOffset + 1,
        count: 0,
      });
    },
  ]);
}

for (const [name, reason, mutate] of negatives) {
  test(`layout projection rejects ${name} without publishing a transformation`, () => {
    const values = pair();
    mutate(values);
    const projector = createSourceMapLayoutProjector();
    projector.project(values.canonical);
    assert.throws(
      () => projector.project(values.current),
      (error) => {
        assert.ok(
          error.message.includes(`V8_EVIDENCE_INCOMPLETE:source-map-layout-${reason}`),
          error.message
        );
        return true;
      }
    );
    assert.equal(projector.summary().projectedScriptSamples, 0);
  });
}

test("same-size generated body changes cannot hide behind an identical map and layout", () => {
  const canonical = sample("same-checkout");
  const current = structuredClone(canonical);
  current.generatedProofs[0].normalizedBodySha256 = "0".repeat(64);
  const projector = createSourceMapLayoutProjector();
  projector.project(canonical);
  assert.throws(() => projector.project(current), /generated-body-differs/);
});
