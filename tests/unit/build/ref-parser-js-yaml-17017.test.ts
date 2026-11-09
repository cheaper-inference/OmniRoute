import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const lock = JSON.parse(fs.readFileSync(path.join(root, "package-lock.json"), "utf8"));

test("#17017 ref-parser receives js-yaml 5, not an incompatible nested 4", () => {
  const parser = lock.packages["node_modules/@apidevtools/json-schema-ref-parser"];
  assert.ok(parser, "ref-parser must remain installed");
  assert.match(parser.dependencies["js-yaml"], /^\^5\./);
  assert.equal(pkg.overrides["@apidevtools/json-schema-ref-parser"]["js-yaml"], "^5.4.2");
  assert.equal(pkg.dependencies["js-yaml"], "^5.4.2");
  assert.equal(lock.packages[""].dependencies["js-yaml"], pkg.dependencies["js-yaml"]);
  assert.equal(lock.packages["node_modules/js-yaml"].version, "5.4.2");
  assert.equal(
    lock.packages["node_modules/@apidevtools/json-schema-ref-parser/node_modules/js-yaml"],
    undefined,
    "no nested js-yaml 4 shadowing the root package"
  );
});

test("#17017 preserve unrelated packages' intentional js-yaml 4 installations", () => {
  for (const name of ["@yarnpkg/parsers", "lockfile-lint", "xmlbuilder2"]) {
    const entry = lock.packages[`node_modules/${name}/node_modules/js-yaml`];
    assert.ok(entry, `missing intentional legacy js-yaml for ${name}`);
    assert.match(entry.version, /^4\./);
  }
});
