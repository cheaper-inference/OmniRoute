import { after, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { writeTestImpactMap } from "../../scripts/quality/build-test-impact-map.mjs";

const tmpDirs: string[] = [];

after(() => {
  for (const dir of tmpDirs) fs.rmSync(dir, { recursive: true, force: true });
});

function tmpFile(name: string): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "impact-map-"));
  tmpDirs.push(dir);
  return path.join(dir, name);
}

function readBack(file: string): unknown {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

const SAMPLE = {
  generatedFrom: "import-graph",
  sources: {
    "open-sse/utils/error.ts": ["tests/unit/a.test.ts", "tests/unit/b.test.ts"],
    "src/lib/db/cleanup.ts": ["tests/unit/c.test.ts"],
  },
  artifacts: {
    ".env.example": ["tests/unit/d.test.ts"],
  },
};

test("writes a map that reads back with the same shape", () => {
  const out = tmpFile("map.json");
  writeTestImpactMap(out, SAMPLE);

  assert.deepEqual(readBack(out), SAMPLE, "round trip changed the map");
  assert.ok(fs.readFileSync(out, "utf8").endsWith("\n"), "output must end with a newline");
});

test("keeps empty containers, special characters and deep values intact", () => {
  const out = tmpFile("map-edge.json");
  const edge = {
    generatedFrom: "",
    sources: {
      "src/empty.ts": [],
      'src/quote"and\\backslash.ts': ["tests/unit/new\nline.test.ts", "tests/unit/ünïcode.test.ts"],
    },
    artifacts: {},
    nested: { deeper: { value: ["a", "b"] } },
    numbers: [0, -1, 1.5],
    flags: [true, false, null],
  };

  writeTestImpactMap(out, edge);

  assert.deepEqual(readBack(out), edge, "edge-case values did not survive the round trip");
});

test("writes an empty map as valid JSON", () => {
  const out = tmpFile("map-empty.json");
  writeTestImpactMap(out, {});

  assert.deepEqual(readBack(out), {});
});

function bigMap() {
  const sources: Record<string, string[]> = {};
  for (let i = 0; i < 20000; i += 1) {
    sources[`open-sse/generated/module-${i}.ts`] = [
      `tests/unit/generated-${i}-a.test.ts`,
      `tests/unit/generated-${i}-b.test.ts`,
    ];
  }
  return { generatedFrom: "import-graph", sources, artifacts: {} };
}

test("never serialises the whole map as one string", () => {
  const out = tmpFile("map-big.json");
  // The shape that failed in CI: the release map is about 502 MiB when
  // serialised in one piece, so a map large enough to matter must not reach
  // JSON.stringify as a single argument.
  const big = bigMap();

  const original = JSON.stringify;
  let wholeMapCalls = 0;
  (JSON as unknown as { stringify: typeof JSON.stringify }).stringify = ((
    value: unknown,
    ...rest: unknown[]
  ) => {
    // Shape check rather than identity: handing over a copy of the map is just
    // as fatal as handing over the original.
    if (value !== null && typeof value === "object" && "sources" in value && "artifacts" in value) {
      wholeMapCalls += 1;
    }
    return (original as (...args: unknown[]) => string)(value, ...rest);
  }) as typeof JSON.stringify;
  try {
    writeTestImpactMap(out, big);
  } finally {
    (JSON as unknown as { stringify: typeof JSON.stringify }).stringify = original;
  }

  assert.equal(wholeMapCalls, 0, "the writer serialised the whole map in one call");

  const parsed = readBack(out) as { sources: Record<string, string[]> };
  assert.equal(Object.keys(parsed.sources).length, 20000, "entry count changed");
  assert.deepEqual(parsed.sources["open-sse/generated/module-0.ts"], [
    "tests/unit/generated-0-a.test.ts",
    "tests/unit/generated-0-b.test.ts",
  ]);
  assert.deepEqual(parsed.sources["open-sse/generated/module-19999.ts"], [
    "tests/unit/generated-19999-a.test.ts",
    "tests/unit/generated-19999-b.test.ts",
  ]);
});

test("batches its writes without holding the whole document", () => {
  const out = tmpFile("map-writes.json");
  const big = bigMap();

  // The real map has millions of edges and this step runs on every PR, so one
  // write per array element costs minutes of syscalls.
  const sizes: number[] = [];
  const writers = fs as unknown as Record<"writeSync" | "writeFileSync", typeof fs.writeSync>;
  const originals = { writeSync: writers.writeSync, writeFileSync: writers.writeFileSync };
  for (const name of ["writeSync", "writeFileSync"] as const) {
    writers[name] = ((target: unknown, data: unknown, ...rest: unknown[]) => {
      sizes.push(Buffer.byteLength(data as string));
      return (originals[name] as (...args: unknown[]) => number)(target, data, ...rest);
    }) as typeof fs.writeSync;
  }
  try {
    writeTestImpactMap(out, big);
  } finally {
    Object.assign(writers, originals);
  }

  const total = fs.statSync(out).size;
  const chunk = 1024 * 1024;
  assert.ok(total > 2 * chunk, `fixture too small to prove batching: ${total} bytes`);
  assert.equal(
    sizes.reduce((sum, size) => sum + size, 0),
    total,
    "every byte must go through the counted writers"
  );
  assert.ok(sizes.length <= Math.ceil(total / chunk) + 1, `${sizes.length} writes for ${total} B`);
  assert.ok(Math.max(...sizes) < 2 * chunk, "one write grew with the document");
});
