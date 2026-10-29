import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

import { isDirectRun } from "../../../open-sse/mcp-server/directRun.ts";

const ROOT = fileURLToPath(new URL("../../..", import.meta.url));
const SERVER = join(ROOT, "open-sse", "mcp-server", "server.ts");

// `import.meta.url` is a percent-encoded file: URL, `process.argv[1]` is the raw path.
// A tail comparison between the two never matches when the install directory holds a
// space, so `omniroute --mcp` exited 0 without ever starting the stdio transport.
test("server.ts decides it was run directly through isDirectRun, not a URL-tail comparison", () => {
  const source = readFileSync(SERVER, "utf8");
  assert.doesNotMatch(source, /import\.meta\.url\.endsWith\(\s*process\.argv\[1\]/);
  assert.match(source, /isDirectRun\(import\.meta\.url, process\.argv\[1\]\)/);
});

test("isDirectRun matches the entry script whatever characters its path holds", () => {
  const entries = [
    join(ROOT, "open-sse", "mcp-server", "server.ts"),
    join(ROOT, "Program Files", "OmniRoute", "open-sse", "mcp-server", "server.ts"),
    join(ROOT, "100% done #1", "ünï", "server.ts"),
  ];
  for (const entry of entries) {
    assert.equal(isDirectRun(pathToFileURL(entry).href, entry), true, entry);
  }
});

test("isDirectRun is false for another entry script and for a missing argv[1]", () => {
  const url = pathToFileURL(join(ROOT, "a b", "server.ts")).href;
  assert.equal(isDirectRun(url, join(ROOT, "a b", "other.ts")), false);
  assert.equal(isDirectRun(url, undefined), false);
  assert.equal(isDirectRun(url, ""), false);
});
