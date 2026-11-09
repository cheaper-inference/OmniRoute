import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8")) as {
  allowScripts?: Record<string, boolean>;
};

test("npm 12 allowScripts entries are name-only, never version pins", () => {
  const allow = pkg.allowScripts ?? {};
  const pinned = Object.keys(allow).filter((name) => name.lastIndexOf("@") > 0);
  assert.deepEqual(pinned, [], `pinned allowScripts keys must be name-only: ${pinned.join(", ")}`);
});

test("npm 12 allowScripts covers native dependencies by name and denies onnxruntime-node", () => {
  const allow = pkg.allowScripts ?? {};
  for (const name of [
    "better-sqlite3",
    "bun",
    "opencode-ai",
    "@playwright/browser-chromium",
    "@huggingface/transformers",
    "sharp",
  ]) {
    assert.equal(allow[name], true, `${name} must be explicitly allowed by name`);
  }
  assert.equal(allow["onnxruntime-node"], false, "onnxruntime-node must be explicitly denied");
});
