import test from "node:test";
import assert from "node:assert/strict";

import manifest from "../../src/app/manifest.ts";

const CJK = /[㐀-鿿＀-￯]/;

test("#20504: manifest declared lang=en must not carry CJK name/description", () => {
  const m = manifest();
  assert.equal(m.lang, "en");
  assert.ok(String(m.name).length > 0);
  assert.ok(String(m.description).length > 0);
  assert.doesNotMatch(String(m.name), CJK, `name is "${m.name}"`);
  assert.doesNotMatch(String(m.description), CJK, `description is "${m.description}"`);
  assert.equal(m.short_name, "OmniRoute");
});
