import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const { buildClaudeEnv, runLaunchCommand } = await import("../../../bin/cli/commands/launch.mjs");

// `omniroute launch` used to hard-code CLAUDE_CODE_AUTO_COMPACT_WINDOW=190000 for
// every routed model. A route whose real window is below that (128k, 32k) hit the
// API limit before Claude Code compacted. The window must follow the routed
// model's context size from the /v1/models catalog when that size is below 200k.
// Routes at 200k or more keep 190000: Claude Code assumes 200K for a gateway
// model id it does not recognise and caps the compact window there, so a larger
// number would not help and a wrong "1M" claim would risk 400 errors.

const base = { PATH: "/bin" };
const compactFor = (contextWindow?: number, model?: string) =>
  buildClaudeEnv(base, 20128, "t", { contextWindow, model }).CLAUDE_CODE_AUTO_COMPACT_WINDOW;

test("a 128k route compacts at 85% of its window, below the window", () => {
  assert.equal(compactFor(131072), "111411");
});

test("a 200k route, a larger route and an unknown window keep the old 190000", () => {
  assert.equal(compactFor(200_000), "190000");
  assert.equal(compactFor(1_000_000), "190000");
  assert.equal(compactFor(undefined), "190000");
  assert.equal(compactFor(0), "190000");
  assert.equal(compactFor(Number.NaN), "190000");
});

test("a window below 117648 cannot be expressed as a compact window: declare the window instead", () => {
  const env = buildClaudeEnv(base, 20128, "t", { contextWindow: 32768 });
  assert.equal(env.CLAUDE_CODE_AUTO_COMPACT_WINDOW, undefined);
  assert.equal(env.CLAUDE_CODE_MAX_CONTEXT_TOKENS, "32768");
});

test("a window below 200k also declares the real window to Claude Code", () => {
  const env = buildClaudeEnv(base, 20128, "t", { contextWindow: 131072 });
  assert.equal(env.CLAUDE_CODE_MAX_CONTEXT_TOKENS, "131072");
});

test("a window of 200k or more declares nothing extra", () => {
  assert.equal(buildClaudeEnv(base, 20128, "t", {}).CLAUDE_CODE_MAX_CONTEXT_TOKENS, undefined);
  assert.equal(
    buildClaudeEnv(base, 20128, "t", { contextWindow: 1_000_000 }).CLAUDE_CODE_MAX_CONTEXT_TOKENS,
    undefined
  );
});

// --- end to end: catalog lookup -> env of the spawned claude ----------------

const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-launch-window-"));
const OUT = path.join(TMP, "seen.txt");
const FAKE_BIN = path.join(TMP, "bin");
fs.mkdirSync(FAKE_BIN);
fs.writeFileSync(
  path.join(FAKE_BIN, "claude"),
  `#!/bin/sh\nprintf '%s' "$CLAUDE_CODE_AUTO_COMPACT_WINDOW" > '${OUT}'\n`,
  { mode: 0o755 }
);
const ORIGINAL_PATH = process.env.PATH;
const ORIGINAL_FETCH = globalThis.fetch;

test.after(() => {
  process.env.PATH = ORIGINAL_PATH;
  globalThis.fetch = ORIGINAL_FETCH;
  fs.rmSync(TMP, { recursive: true, force: true });
});

async function launchWith(catalog: unknown, claudeArgs: string[], opts = {}) {
  process.env.PATH = `${FAKE_BIN}${path.delimiter}${ORIGINAL_PATH}`;
  fs.rmSync(OUT, { force: true });
  const urls: string[] = [];
  globalThis.fetch = (async (url: string) => {
    urls.push(String(url));
    if (String(url).endsWith("/api/monitoring/health")) return new Response("{}", { status: 200 });
    if (catalog === null) throw new Error("catalog offline");
    return new Response(JSON.stringify(catalog), { status: 200 });
  }) as typeof fetch;
  const exitCode = await runLaunchCommand(
    { remote: "http://127.0.0.1:20128", token: "t", ...opts },
    claudeArgs
  );
  assert.equal(exitCode, 0);
  return { seen: fs.readFileSync(OUT, "utf8"), urls };
}

test("launch reads the routed model's window from /v1/models", async () => {
  const catalog = {
    data: [
      { id: "glm/glm-5.2", context_length: 131072, max_input_tokens: 131072 },
      { id: "other/model", context_length: 1_000_000, max_input_tokens: 1_000_000 },
      { id: "ctx/only", context_length: 65536 },
    ],
  };
  const { seen, urls } = await launchWith(catalog, ["--model", "glm/glm-5.2"]);
  assert.equal(seen, "111411");
  assert.ok(urls.some((u) => u.endsWith("/v1/models")));
  assert.equal((await launchWith(catalog, ["--model=other/model"])).seen, "190000");
  // 65536 is below 117648: no compact window can be set, the window is declared instead.
  assert.equal((await launchWith(catalog, ["--model=ctx/only"])).seen, "");
  assert.equal((await launchWith(catalog, [], { model: "glm/glm-5.2" })).seen, "111411");
});

test("launch keeps 190000 when the catalog has no entry or is unreachable", async () => {
  assert.equal((await launchWith({ data: [] }, ["--model", "glm/glm-5.2"])).seen, "190000");
  assert.equal((await launchWith(null, ["--model", "glm/glm-5.2"])).seen, "190000");
  assert.equal((await launchWith({ data: [] }, [])).seen, "190000");
});
