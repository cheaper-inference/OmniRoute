import { after, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  readTestImpactMap,
  writeTestImpactMap,
} from "../../scripts/quality/build-test-impact-map.mjs";

// The release map is ~512 MiB, right at V8's maximum string length (0x1fffffe8). Readers that
// load it with readFileSync(path, "utf8") + JSON.parse die with "Cannot create a string longer
// than 0x1fffffe8 characters" as soon as a branch adds a few edges, turning the advisory
// forgotten-sibling step (and Fast Quality Gates) red on every PR.

const tmpDirs: string[] = [];
after(() => {
  for (const dir of tmpDirs) fs.rmSync(dir, { recursive: true, force: true });
});
function tmpFile(name: string): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "impact-map-reader-"));
  tmpDirs.push(dir);
  return path.join(dir, name);
}

const SAMPLE = {
  generatedFrom: "import-graph",
  sources: {
    "open-sse/utils/error.ts": ["tests/unit/a.test.ts", "tests/unit/b.test.ts"],
    'src/quote"and\\back,slash.ts': ["tests/unit/new\nline.test.ts", "tests/unit/ünïcode.test.ts"],
    "src/empty.ts": [],
  },
  artifacts: {},
  nested: { deeper: { value: ["a", "}", "{"] } },
};

test("the writer puts every sources/artifacts entry on its own line", () => {
  const out = tmpFile("map.json");
  writeTestImpactMap(out, SAMPLE);
  const lines = fs.readFileSync(out, "utf8").split("\n");
  for (const key of Object.keys(SAMPLE.sources)) {
    assert.ok(
      lines.some((line) => line.startsWith(JSON.stringify(key) + ":")),
      `sources entry ${key} must start its own line`
    );
  }
  assert.deepEqual(JSON.parse(fs.readFileSync(out, "utf8")), SAMPLE, "output must stay valid JSON");
});

test("readTestImpactMap reads the map line by line without one whole-file string", () => {
  const out = tmpFile("map.json");
  writeTestImpactMap(out, SAMPLE);
  // A whole-file string limit of 16 chars forces the line reader: any attempt to decode the
  // complete file as one string would exceed it.
  assert.deepEqual(readTestImpactMap(out, { wholeStringLimit: 16 }), SAMPLE);
});

test("readTestImpactMap still reads a small legacy single-line map", () => {
  const out = tmpFile("legacy.json");
  fs.writeFileSync(out, JSON.stringify(SAMPLE));
  assert.deepEqual(readTestImpactMap(out), SAMPLE);
});

test("readTestImpactMap refuses an unrecognised layout it cannot read whole", () => {
  const out = tmpFile("legacy-big.json");
  fs.writeFileSync(out, JSON.stringify(SAMPLE));
  assert.throws(() => readTestImpactMap(out, { wholeStringLimit: 16 }), /test-impact-map/);
});
