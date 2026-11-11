import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = new URL("../../../", import.meta.url);
const require = createRequire(new URL("package.json", root));
const dependencyRoot = fileURLToPath(new URL("node_modules/", root));
for (const name of ["fast-xml-parser", "mongoose"]) {
  assert.ok(
    require.resolve(name).startsWith(dependencyRoot),
    `${name} must resolve from this checkout's dependency installation`
  );
}
const { XMLParser } = require("fast-xml-parser");
const { Mongoose } = require("mongoose");

test("the patched XML parser preserves valid stop-node content", () => {
  const parser = new XMLParser({ stopNodes: ["root.raw"] });
  assert.deepEqual(parser.parse("<root><raw><a>safe</a></raw><count>2</count></root>"), {
    root: { raw: "<a>safe</a>", count: 2 },
  });
});

test("the XML parser rejects an unterminated stop-node tag", () => {
  const parser = new XMLParser({ stopNodes: ["root.raw"] });
  assert.throws(() => parser.parse("<root><raw>" + "<a ".repeat(16)));
});

test("Mongoose virtual paths cannot add properties to Object.prototype", () => {
  const mongoose = new Mongoose();
  const schema = new mongoose.Schema({ first: String, last: String });
  const marker = "omnirouteNovemberVirtualGuard";
  assert.equal(Object.hasOwn(Object.prototype, marker), false);
  try {
    try {
      schema.virtual(`__proto__.${marker}`);
    } catch (error) {
      // Rejecting the special path is acceptable; mutating the prototype is not.
      assert.ok(error instanceof Error);
    }
    assert.equal(Object.hasOwn(Object.prototype, marker), false);
  } finally {
    Reflect.deleteProperty(Object.prototype, marker);
  }

  schema.virtual("fullName").get(function () {
    return `${this.first} ${this.last}`;
  });
  const Person = mongoose.model("NovemberDependencySmoke", schema);
  const person = new Person({ first: "Ada", last: "Lovelace" });
  assert.equal(person.fullName, "Ada Lovelace");
});
