import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cache-debug-"));
const FLAG = "OMNIROUTE_CACHE_DEBUG";
const {
  buildCacheDebugRecord,
  writeCacheDebugRecord,
  isCacheDebugEnabled,
  resetCacheDebugForTests,
} = await import("../../open-sse/services/cacheDebug.ts");

test.afterEach(() => {
  delete process.env[FLAG];
  resetCacheDebugForTests();
});
test.after(() => fs.rmSync(DIR, { recursive: true, force: true }));

const message = (role: string, text: string) => ({ role, content: text });
const inbound = (extra: Record<string, unknown> = {}) => ({
  model: "gpt-5",
  prompt_cache_key: "session-key-1",
  instructions: "be brief",
  tools: [{ type: "function", name: "lookup", parameters: { type: "object" } }],
  input: [message("user", "first turn"), message("assistant", "answer"), message("user", "second")],
  ...extra,
});

test("off by default: nothing is built or written", () => {
  delete process.env[FLAG];
  assert.equal(isCacheDebugEnabled(), false);
  assert.equal(writeCacheDebugRecord({ dir: DIR, inbound: inbound(), outbound: inbound() }), null);
  assert.deepEqual(fs.readdirSync(DIR), []);
});

test("an identical prompt on the wire reports no divergence", () => {
  const record = buildCacheDebugRecord(inbound(), inbound());
  assert.equal(record.firstDivergentBlock, null);
  assert.equal(record.cacheKey.inbound.present, true);
  assert.equal(record.cacheKey.outbound.present, true);
  assert.equal(record.cacheKey.inbound.tag, record.cacheKey.outbound.tag);
});

test("the first block that differs is named by section and index", () => {
  const wire = inbound({
    input: [
      message("user", "first turn"),
      message("assistant", "ANSWER REWRITTEN"),
      message("user", "second"),
    ],
  });
  const record = buildCacheDebugRecord(inbound(), wire);
  assert.deepEqual(record.firstDivergentBlock, { section: "input", index: 1 });
});

test("sections are checked in prompt order: instructions, then tools, then messages", () => {
  const record = buildCacheDebugRecord(
    inbound(),
    inbound({ instructions: "be verbose", tools: [], input: [] })
  );
  assert.deepEqual(record.firstDivergentBlock, { section: "instructions", index: 0 });
  const toolsOnly = buildCacheDebugRecord(inbound(), inbound({ tools: [] }));
  assert.deepEqual(toolsOnly.firstDivergentBlock, { section: "tools", index: 0 });
});

test("a dropped trailing block and a changed cache key are both reported", () => {
  const shorter = inbound({ input: [message("user", "first turn")], prompt_cache_key: "other" });
  const record = buildCacheDebugRecord(inbound(), shorter);
  assert.deepEqual(record.firstDivergentBlock, { section: "input", index: 1 });
  assert.notEqual(record.cacheKey.inbound.tag, record.cacheKey.outbound.tag);
});

test("the record carries tags only: no prompt text and no cache key value", () => {
  const record = buildCacheDebugRecord(inbound(), inbound());
  const text = JSON.stringify(record);
  for (const secret of ["first turn", "answer", "second", "be brief", "session-key-1", "lookup"]) {
    assert.equal(text.includes(secret), false, `leaked: ${secret}`);
  }
  assert.match(record.sections.input[0], /^[0-9a-f]{12}$/);
});

test("tags are keyed per process: the same block has the same tag, a new process key changes it", () => {
  const a = buildCacheDebugRecord(inbound(), inbound());
  const b = buildCacheDebugRecord(inbound(), inbound());
  assert.deepEqual(a.sections, b.sections, "stable within a process");
  resetCacheDebugForTests();
  const c = buildCacheDebugRecord(inbound(), inbound());
  assert.notDeepEqual(
    a.sections.input,
    c.sections.input,
    "a restart cannot be matched to a past tag"
  );
});

test("object key order does not change a tag (canonical JSON)", () => {
  const one = buildCacheDebugRecord({ input: [{ role: "user", content: "x" }] }, {});
  const two = buildCacheDebugRecord({ input: [{ content: "x", role: "user" }] }, {});
  assert.deepEqual(one.sections.input, two.sections.input);
});

test("on: one JSON line per request is appended, and the file rolls 200 to 100 lines", () => {
  process.env[FLAG] = "true";
  assert.equal(isCacheDebugEnabled(), true);
  for (let i = 0; i < 205; i += 1) {
    writeCacheDebugRecord({
      dir: DIR,
      inbound: inbound({ input: [message("user", `turn ${i}`)] }),
      outbound: inbound({ input: [message("user", `turn ${i}`)] }),
      route: `route-${i}`,
    });
  }
  const lines = fs.readFileSync(path.join(DIR, "cache-debug.jsonl"), "utf8").trim().split("\n");
  assert.ok(lines.length <= 200 && lines.length >= 100, `rolled to ${lines.length} lines`);
  const last = JSON.parse(lines[lines.length - 1]);
  assert.equal(last.route, "route-204", "the newest line is kept");
  assert.equal(JSON.parse(lines[0]).route.startsWith("route-"), true);
  assert.equal(fs.statSync(path.join(DIR, "cache-debug.jsonl")).mode & 0o077, 0, "owner-only file");
});

test("a write failure never throws into the request path", () => {
  process.env[FLAG] = "true";
  const blocker = path.join(DIR, "not-a-dir");
  fs.writeFileSync(blocker, "x");
  assert.doesNotThrow(() =>
    writeCacheDebugRecord({
      dir: path.join(blocker, "sub"),
      inbound: inbound(),
      outbound: inbound(),
    })
  );
});
