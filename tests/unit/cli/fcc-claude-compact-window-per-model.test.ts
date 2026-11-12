// fcc-claude launched claude with a flat CLAUDE_CODE_AUTO_COMPACT_WINDOW=190000. It must size the
// window to the routed model (pass-through --model) the way `omniroute launch` does.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const { runFccClaude } = await import("../../../bin/cli/commands/fcc-claude.mjs");

const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-fcc-window-"));
const OUT = path.join(TMP, "seen.txt");
fs.mkdirSync(path.join(TMP, "bin"));
fs.writeFileSync(
  path.join(TMP, "bin", "claude"),
  `#!/bin/sh\nprintf '%s' "$CLAUDE_CODE_AUTO_COMPACT_WINDOW" > '${OUT}'\n`,
  { mode: 0o755 }
);
const ORIGINAL = { path: process.env.PATH, fetch: globalThis.fetch, exit: process.exit };
test.after(() => {
  process.env.PATH = ORIGINAL.path;
  globalThis.fetch = ORIGINAL.fetch;
  process.exit = ORIGINAL.exit;
  fs.rmSync(TMP, { recursive: true, force: true });
});

// runFccClaude ends the process when claude exits; capture that instead of dying.
async function fccWith(catalog: unknown, claudeArgs: string[]) {
  process.env.PATH = `${path.join(TMP, "bin")}${path.delimiter}${ORIGINAL.path}`;
  fs.rmSync(OUT, { force: true });
  globalThis.fetch = (async (url: string) => {
    if (String(url).endsWith("/api/monitoring/health")) return new Response("{}", { status: 200 });
    if (catalog === null) throw new Error("catalog offline");
    return new Response(JSON.stringify(catalog), { status: 200 });
  }) as typeof fetch;
  const exited = new Promise<number>((resolve) => {
    process.exit = ((code?: number) => resolve(code ?? 0)) as typeof process.exit;
  });
  await runFccClaude({ remote: "http://127.0.0.1:20128", token: "t" }, claudeArgs);
  assert.equal(await exited, 0);
  return fs.readFileSync(OUT, "utf8");
}

const catalog = {
  data: [
    { id: "glm/glm-5.2", max_input_tokens: 131072 },
    { id: "big/model", max_input_tokens: 1_000_000 },
  ],
};

test("fcc-claude compacts a 128k route at 85% of its window", async () => {
  assert.equal(await fccWith(catalog, ["--model", "glm/glm-5.2"]), "111411");
  assert.equal(await fccWith(catalog, ["--model=glm/glm-5.2"]), "111411");
});

test("fcc-claude keeps 190000 for a large window, no --model, or an unreachable catalog", async () => {
  assert.equal(await fccWith(catalog, ["--model", "big/model"]), "190000");
  assert.equal(await fccWith(catalog, []), "190000");
  assert.equal(await fccWith(null, ["--model", "glm/glm-5.2"]), "190000");
});
