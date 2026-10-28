import { test } from "node:test";
import assert from "node:assert/strict";
import { parseCsvHeaders } from "../../../../src/lib/batches/csvToJsonl.ts";

test("parseCsvHeaders preserves multiline fields, escaped quotes and commas", () => {
  assert.deepEqual(parseCsvHeaders('id,"user ""quoted"",\r\nprompt"\r\nr1,hello'), [
    "id",
    'user "quoted",\r\nprompt',
  ]);
});

test("parseCsvHeaders only returns the first logical record", () => {
  assert.deepEqual(parseCsvHeaders('id,prompt\n"unterminated later record'), ["id", "prompt"]);
});

test("parseCsvHeaders matches conversion normalization for BOM and leading empty lines", () => {
  assert.deepEqual(parseCsvHeaders("\uFEFF\r\nid,prompt\r\nr1,hello"), ["id", "prompt"]);
});

test("parseCsvHeaders handles empty input and a header without a terminator", () => {
  assert.deepEqual(parseCsvHeaders(""), []);
  assert.deepEqual(parseCsvHeaders("\r\n"), []);
  assert.deepEqual(parseCsvHeaders("id,prompt"), ["id", "prompt"]);
});
