import assert from "node:assert/strict";
import test from "node:test";
import { lookupMessagePath } from "../../scripts/i18n/message-lookup.mjs";

test("message lookup preserves scalar, placeholder and array leaf values", () => {
  const values = ["translated", "__MISSING__:label", "", 0, false, null, ["entry"]];
  for (const value of values) {
    assert.equal(lookupMessagePath({ section: { label: value } }, ["section", "label"]), value);
  }
});

test("message lookup returns undefined for missing keys and non-object namespaces", () => {
  assert.equal(lookupMessagePath({ section: {} }, ["section", "missing"]), undefined);
  for (const value of [null, undefined, 0, false, "text", ["entry"]]) {
    assert.equal(lookupMessagePath({ section: value }, ["section", "label"]), undefined);
  }
});

test("message lookup does not follow inherited namespaces or values", () => {
  const inherited = Object.create({ label: "inherited" });
  assert.equal(lookupMessagePath({ section: inherited }, ["section", "label"]), undefined);
  assert.equal(
    lookupMessagePath(Object.create({ section: { label: "inherited" } }), ["section", "label"]),
    undefined
  );
  const own = Object.assign(Object.create(null), { label: "own" });
  assert.equal(lookupMessagePath({ section: own }, ["section", "label"]), "own");
});

test("message lookup rejects prototype-related path segments even when they are own JSON keys", () => {
  const blocked = JSON.parse(
    '{"__proto__":{"label":"bad"},"prototype":{"label":"bad"},"constructor":{"label":"bad"}}'
  );
  for (const key of ["__proto__", "prototype", "constructor"]) {
    assert.equal(lookupMessagePath(blocked, [key, "label"]), undefined);
    assert.equal(lookupMessagePath({ section: blocked }, ["section", key, "label"]), undefined);
  }
});

test("one message lookup does not enumerate all sibling keys in a wide namespace", () => {
  let enumerations = 0;
  const section = new Proxy(
    Object.fromEntries(Array.from({ length: 2000 }, (_, i) => [`key${i}`, `value${i}`])),
    {
      ownKeys(target) {
        enumerations++;
        return Reflect.ownKeys(target);
      },
    }
  );
  assert.equal(lookupMessagePath({ section }, ["section", "key1999"]), "value1999");
  assert.equal(enumerations, 0, "resolving one path must not scan its 2,000 sibling properties");
});

test("message lookup does not evaluate unrelated accessors", () => {
  const section = Object.defineProperty({ label: "translated" }, "unrelated", {
    enumerable: true,
    get() {
      throw new Error("unrelated property was evaluated");
    },
  });
  assert.equal(lookupMessagePath({ section }, ["section", "label"]), "translated");
});

test("message lookup ignores non-enumerable fields and accessors", () => {
  const section = Object.defineProperties(
    {},
    {
      hidden: { value: "hidden", enumerable: false },
      accessor: {
        enumerable: true,
        get() {
          throw new Error("accessor was evaluated");
        },
      },
    }
  );
  assert.equal(lookupMessagePath({ section }, ["section", "hidden"]), undefined);
  assert.equal(lookupMessagePath({ section }, ["section", "accessor"]), undefined);
});
