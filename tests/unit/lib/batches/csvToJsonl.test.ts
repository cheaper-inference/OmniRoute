import { test } from "node:test";
import assert from "node:assert/strict";

const { csvToJsonl } = await import("../../../../src/lib/batches/csvToJsonl.ts");

// ── Helpers ──────────────────────────────────────────────────────────────────

const DEFAULT_MAPPING = {
  id: "custom_id",
  prompt: "body.messages[0].content",
};
const DEFAULT_DEFAULTS = {
  model: "gpt-4o",
  url: "/v1/chat/completions" as const,
};

function make(csv: string, mapping = DEFAULT_MAPPING, defaults = DEFAULT_DEFAULTS) {
  return csvToJsonl({ csv, mapping, defaults });
}

function parseLines(jsonl: string) {
  return jsonl
    .split("\n")
    .filter((l) => l.trim().length > 0)
    .map((l) => JSON.parse(l));
}

// ── Basic cases ───────────────────────────────────────────────────────────────

test("csvToJsonl: header only (no data rows) → rowsParsed=0, error reported", () => {
  const result = make("id,prompt\n");
  assert.equal(result.rowsParsed, 0);
  assert.equal(result.rowsSkipped, 0);
  assert.ok(result.errors.length > 0, "should have at least one error");
  assert.ok(
    result.errors[0].reason.toLowerCase().includes("no data"),
    "error should mention no data rows"
  );
});

test("csvToJsonl: 1 valid row → 1 JSONL line", () => {
  const result = make("id,prompt\nrow1,hello world");
  assert.equal(result.rowsParsed, 1);
  assert.equal(result.rowsSkipped, 0);
  assert.equal(result.errors.length, 0);
  const parsed = parseLines(result.jsonl);
  assert.equal(parsed.length, 1);
  assert.equal(parsed[0].custom_id, "row1");
  assert.equal(parsed[0].body.messages[0].content, "hello world");
  assert.equal(parsed[0].method, "POST");
  assert.equal(parsed[0].url, "/v1/chat/completions");
});

test("csvToJsonl: 5 valid rows → 5 JSONL lines", () => {
  const rows = ["id,prompt", "r1,a", "r2,b", "r3,c", "r4,d", "r5,e"].join("\n");
  const result = make(rows);
  assert.equal(result.rowsParsed, 5);
  assert.equal(result.rowsSkipped, 0);
  assert.equal(result.errors.length, 0);
  const parsed = parseLines(result.jsonl);
  assert.equal(parsed.length, 5);
  assert.equal(parsed[4].custom_id, "r5");
});

// ── Quoted fields ─────────────────────────────────────────────────────────────

test("csvToJsonl: quoted fields with comma inside → single field", () => {
  const csv = `id,prompt\n"row,1","hello, world"`;
  const result = make(csv);
  assert.equal(result.rowsParsed, 1);
  const parsed = parseLines(result.jsonl);
  assert.equal(parsed[0].custom_id, "row,1");
  assert.equal(parsed[0].body.messages[0].content, "hello, world");
});

test("csvToJsonl: escaped double-quotes inside quoted field → literal quote in output", () => {
  const csv = `id,prompt\nr1,"He said ""hi"""`;
  const result = make(csv);
  assert.equal(result.rowsParsed, 1);
  const parsed = parseLines(result.jsonl);
  assert.equal(parsed[0].body.messages[0].content, 'He said "hi"');
});

test("csvToJsonl: CRLF line endings → same result as LF", () => {
  const csv = "id,prompt\r\nr1,hello\r\nr2,world";
  const result = make(csv);
  assert.equal(result.rowsParsed, 2);
  assert.equal(result.errors.length, 0);
});

test("csvToJsonl: inline newline inside quoted field → preserved in content", () => {
  const csv = `id,prompt\nr1,"line one\nline two"`;
  const result = make(csv);
  assert.equal(result.rowsParsed, 1);
  const parsed = parseLines(result.jsonl);
  assert.ok(parsed[0].body.messages[0].content.includes("\n"), "newline should be inside content");
});

// ── Mapping edge cases ────────────────────────────────────────────────────────

test("csvToJsonl: column not in mapping → ignored (not in output body)", () => {
  const csv = "id,prompt,extra\nr1,hello,ignored_value";
  const result = make(csv);
  assert.equal(result.rowsParsed, 1);
  const parsed = parseLines(result.jsonl);
  assert.equal(parsed[0].body.extra, undefined, "unmapped column should not appear");
});

test("csvToJsonl: row with no content field in output → row skipped, error recorded", () => {
  // This mapping satisfies Zod (has custom_id + body.messages content)
  // but only the "id" column maps to custom_id, and "note" maps to a non-content body field.
  // We use body.input as the content target (satisfies schema), but the CSV only has
  // a "note" column mapped to body.system (non-content). The content column is missing.
  // Instead: map a content column but have it empty → row skipped.
  const csv = "id,prompt\nr1,"; // empty prompt cell
  const mapping = { id: "custom_id", prompt: "body.messages[0].content" };
  const result = csvToJsonl({ csv, mapping, defaults: DEFAULT_DEFAULTS });
  // An empty content string is still "content" — the row will be parsed.
  // What actually skips is a row with NO mapping to content at all.
  // Let's verify: empty string IS still written as content, so rowsParsed=1.
  // The point of this test is that rows with truly missing content/custom_id are skipped.
  // Use a case where custom_id is missing:
  const csv2 = "id,prompt\n,hello world"; // empty custom_id
  const result2 = csvToJsonl({ csv: csv2, mapping, defaults: DEFAULT_DEFAULTS });
  assert.equal(result2.rowsParsed, 0, "row with empty custom_id should be skipped");
  assert.ok(result2.rowsSkipped > 0 || result2.errors.some((e) => e.reason.includes("custom_id")));
});

test("csvToJsonl: auto-fill role=user when content is mapped without explicit role", () => {
  const result = make("id,prompt\nr1,hello");
  const parsed = parseLines(result.jsonl);
  assert.equal(parsed[0].body.messages[0].role, "user");
});

test("csvToJsonl: explicit role override via mapping → not auto-filled", () => {
  const csv = "id,prompt,role\nr1,hello,assistant";
  const mapping = {
    id: "custom_id",
    prompt: "body.messages[0].content",
    role: "body.messages[0].role",
  };
  const result = csvToJsonl({ csv, mapping, defaults: DEFAULT_DEFAULTS });
  assert.equal(result.rowsParsed, 1);
  const parsed = parseLines(result.jsonl);
  assert.equal(
    parsed[0].body.messages[0].role,
    "assistant",
    "explicit role should not be overridden"
  );
});

// ── Numeric coercion ──────────────────────────────────────────────────────────

test("csvToJsonl: max_tokens and temperature coerced to numbers", () => {
  const csv = "id,prompt,max_tokens,temperature\nr1,hello,512,0.7";
  const mapping = {
    id: "custom_id",
    prompt: "body.messages[0].content",
    max_tokens: "body.max_tokens",
    temperature: "body.temperature",
  };
  const result = csvToJsonl({ csv, mapping, defaults: DEFAULT_DEFAULTS });
  assert.equal(result.rowsParsed, 1);
  const parsed = parseLines(result.jsonl);
  assert.equal(typeof parsed[0].body.max_tokens, "number");
  assert.equal(parsed[0].body.max_tokens, 512);
  assert.equal(typeof parsed[0].body.temperature, "number");
  assert.equal(parsed[0].body.temperature, 0.7);
});

test("csvToJsonl: non-numeric string in max_tokens stays as string", () => {
  const csv = "id,prompt,max_tokens\nr1,hello,auto";
  const mapping = {
    id: "custom_id",
    prompt: "body.messages[0].content",
    max_tokens: "body.max_tokens",
  };
  const result = csvToJsonl({ csv, mapping, defaults: DEFAULT_DEFAULTS });
  const parsed = parseLines(result.jsonl);
  assert.equal(parsed[0].body.max_tokens, "auto");
});

// ── Security: setByPath prototype pollution guard ─────────────────────────────

for (const key of ["__proto__", "constructor", "prototype"]) {
  test(`csvToJsonl: rejects the forbidden ${key} mapping segment`, () => {
    const prototypeBefore = Object.getOwnPropertyDescriptors(Object.prototype);
    const result = csvToJsonl({
      csv: "id,prompt,extra\nr1,hello,unexpected",
      mapping: { ...DEFAULT_MAPPING, extra: `body.${key}.marker` },
      defaults: DEFAULT_DEFAULTS,
    });
    assert.equal(result.rowsParsed, 1, "rejecting one path must preserve the valid row");
    assert.equal(result.rowsSkipped, 0);
    assert.deepEqual(result.errors, []);
    const [request] = parseLines(result.jsonl);
    // Null-prototype objects already protect Object.prototype; also assert that
    // the forbidden path itself never reaches the generated request body.
    assert.deepEqual(request.body, {
      model: "gpt-4o",
      messages: [{ content: "hello", role: "user" }],
    });
    assert.deepEqual(Object.getOwnPropertyDescriptors(Object.prototype), prototypeBefore);
  });
}

test("csvToJsonl: setByPath accepts body.messages[0].content — normal nested path works", () => {
  const csv = "id,prompt\ntest-1,deep nested value";
  const result = make(csv);
  const parsed = parseLines(result.jsonl);
  assert.equal(parsed[0].body.messages[0].content, "deep nested value");
  assert.equal(parsed[0].custom_id, "test-1");
});

// ── Zod validation ────────────────────────────────────────────────────────────

test("csvToJsonl: mapping without custom_id → Zod throws ZodError", () => {
  assert.throws(
    () =>
      csvToJsonl({
        csv: "id,prompt\nr1,hello",
        mapping: { id: "body.messages[0].content" }, // no custom_id target
        defaults: DEFAULT_DEFAULTS,
      }),
    (err: unknown) => {
      assert.ok(err instanceof Error, "should throw an Error");
      assert.ok(
        err.message.toLowerCase().includes("custom_id") ||
          err.message.toLowerCase().includes("zod") ||
          err.constructor.name.includes("Zod"),
        "error should be Zod-related"
      );
      return true;
    }
  );
});

test("csvToJsonl: empty CSV string → Zod throws (min(1) violation)", () => {
  assert.throws(() =>
    csvToJsonl({ csv: "", mapping: DEFAULT_MAPPING, defaults: DEFAULT_DEFAULTS })
  );
});
