import assert from "node:assert/strict";
import test from "node:test";
import { IntlMessageFormat } from "intl-messageformat";
import { translateStringsWithGoogle } from "../../scripts/i18n/lib/google-translate.mjs";

const mockGoogle = (change) => async (_url, init) => ({
  ok: true,
  status: 200,
  json: async () => new URLSearchParams(init.body).getAll("q").map(change),
});
const parameters = { count: 2, b: (chunks) => chunks.join("") };

test("plural pound inside rich tags never enters the prose transport", async () => {
  const source = "{count, plural, one {<b># item</b>} other {<b># items</b>}}";
  assert.equal(new IntlMessageFormat(source, "en").format(parameters), "2 items");
  const [translated] = await translateStringsWithGoogle([source], "de", {
    backoffMs: 0,
    fetchImpl: mockGoogle((text) =>
      text.replace(/#/g, "NUMBER").replace(/\bitem(s?)\b/g, "article$1")
    ),
  });
  assert.ok(translated);
  assert.equal(new IntlMessageFormat(translated, "de").format(parameters), "2 articles");
  assert.doesNotMatch(translated, /NUMBER/);
});
test("select nested in plural retains its own literal pound semantics", async () => {
  const source = "{count, plural, other {{gender, select, female {# items} other {# items}}}}";
  const args = { count: 2, gender: "female" };
  assert.equal(new IntlMessageFormat(source, "en").format(args), "# items");
  const [translated] = await translateStringsWithGoogle([source], "de", {
    fetchImpl: mockGoogle((text) => text),
  });
  assert.equal(new IntlMessageFormat(translated, "de").format(args), "# items");
});
for (const [literal, expected] of [
  ["'{'", "{ article"],
  ["'}'", "} article"],
  ["'{''}'", "{'} article"],
]) {
  test(`ICU quoted literal ${literal} cannot change structural brace matching`, async () => {
    const source = `{count, plural, one {${literal} item} other {# items}}`;
    assert.doesNotThrow(() => new IntlMessageFormat(source, "en"));
    const [translated] = await translateStringsWithGoogle([source], "de", {
      backoffMs: 0,
      fetchImpl: mockGoogle((text) =>
        text.replace(/plural/g, "PLURAL").replace(/\bitem(s?)\b/g, "article$1")
      ),
    });
    assert.ok(translated);
    const message = new IntlMessageFormat(translated, "de");
    assert.equal(message.format({ count: 1 }), expected);
    assert.equal(message.format({ count: 2 }), "2 articles");
    assert.ok(translated.includes(literal));
  });
}
