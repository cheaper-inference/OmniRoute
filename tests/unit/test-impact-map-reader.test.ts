import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { readJsonFileChunked } from "../../scripts/quality/lib/readJsonFileChunked.mjs";
import { writeTestImpactMap } from "../../scripts/quality/build-test-impact-map.mjs";
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "impact-reader-"));
test.after(() => fs.rmSync(dir, { recursive: true, force: true }));
const file = path.join(dir, "map.json");
test("writer roundtrip across tiny UTF8, quote, escape and nesting boundaries", () => {
  const value = JSON.parse(
    '{"generatedFrom":"import-graph","sources":{"__proto__":["a"],"雪🦜\\\"\\\\":["x\\n", "\\u1234"]},"artifacts":{},"extra":[[],{},null,true,false,-1.23e+4]}'
  );
  writeTestImpactMap(file, value);
  for (const chunkSize of [1, 2, 3, 7, 64]) {
    const result = readJsonFileChunked(file, { chunkSize });
    assert.deepEqual(result, value);
    assert.equal(Object.hasOwn(result.sources, "__proto__"), true);
    assert.equal(Object.getPrototypeOf(result.sources), Object.prototype);
  }
});
test("rejects malformed, truncated and trailing input", () => {
  for (const input of [
    "",
    "{",
    "[1,]",
    '{"x":1,}',
    '{"x" 1}',
    '{"x":01}',
    "[true false]",
    '"bad\\x"',
    '"unterminated',
    "{} garbage",
    "{}{}",
    "[NaN]",
    '"a\nb"',
  ]) {
    fs.writeFileSync(file, input);
    assert.throws(() => readJsonFileChunked(file, { chunkSize: 1 }), SyntaxError, input);
  }
});
test("retains JSON duplicate-key semantics without prototype mutation", () => {
  fs.writeFileSync(file, '{"__proto__":1,"__proto__":2,"constructor":3}');
  assert.deepEqual(readJsonFileChunked(file), JSON.parse(fs.readFileSync(file, "utf8")));
});
test("both CLI consumers use chunked decoding rather than whole map reads", () => {
  // Exercise real CLI entry points; poison only the map's whole-file read.
  const preload = path.join(dir, "guard.cjs");
  fs.writeFileSync(file, '{"sources":{},"artifacts":{}}');
  fs.writeFileSync(
    preload,
    `const fs=require('node:fs');const original=fs.readFileSync;fs.readFileSync=function(p,...args){if(String(p).endsWith('test-impact-map.json')||String(p)===process.env.TEST_MAP)throw Error('whole map read forbidden');return original.call(this,p,...args)};const open=fs.openSync;fs.openSync=function(p,...args){return open.call(this,String(p).endsWith('test-impact-map.json')?process.env.TEST_MAP:p,...args)};`
  );
  const env = { ...process.env, TEST_MAP: file };
  const sibling = execFileSync(
    process.execPath,
    [
      "--require",
      preload,
      "scripts/check/check-forgotten-sibling-tests.mjs",
      "--base",
      "HEAD",
      "--impact-map",
      file,
    ],
    { env, encoding: "utf8" }
  );
  assert.match(sibling, /Unallowlisted findings: 0/);
  const selected = execFileSync(
    process.execPath,
    ["--require", preload, "scripts/quality/select-impacted-tests.mjs", "--stdin"],
    { env, input: "", encoding: "utf8" }
  );
  assert.equal(selected.trim(), "");
  fs.writeFileSync(file, "{");
  const fallback = execFileSync(
    process.execPath,
    ["--require", preload, "scripts/quality/select-impacted-tests.mjs", "--stdin"],
    { env, input: "", encoding: "utf8" }
  );
  assert.equal(fallback.trim(), "__RUN_ALL__");
});

test("closes the input descriptor when parsing fails", () => {
  fs.writeFileSync(file, '{"sources":[');
  const original = fs.closeSync;
  let closed = 0;
  fs.closeSync = (fd) => {
    closed++;
    return original(fd);
  };
  try {
    assert.throws(() => readJsonFileChunked(file, { chunkSize: 2 }), SyntaxError);
    assert.equal(closed, 1);
  } finally {
    fs.closeSync = original;
  }
});
