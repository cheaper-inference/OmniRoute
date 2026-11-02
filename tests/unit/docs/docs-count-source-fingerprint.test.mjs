import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { countSourceFingerprint } from "../../../scripts/docs/lib/count-io.mjs";

test("count source fingerprint includes the shared metadata parser", () => {
  const root = process.cwd();
  const helper = path.join(root, "scripts/check/lib/staticCountMetadata.mjs");
  const before = countSourceFingerprint(root);
  const changed = {
    ...fs,
    readFileSync(file, ...args) {
      const value = fs.readFileSync(file, ...args);
      return String(file) === helper
        ? Buffer.concat([Buffer.from(value), Buffer.from("\n// metadata parser changed\n")])
        : value;
    },
  };
  assert.notEqual(countSourceFingerprint(root, changed), before);
});
