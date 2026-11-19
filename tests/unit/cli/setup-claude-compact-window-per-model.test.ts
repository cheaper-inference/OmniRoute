// setup-claude wrote CLAUDE_CODE_AUTO_COMPACT_WINDOW=190000 into every profile, whatever the
// model's real window. `omniroute launch` already sizes the window to the routed model (below
// 200k: compact at 85% and declare the window). A generated profile must follow the same rule.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {
  buildProfileSettings,
  syncClaudeProfilesFromModels,
} from "../../../bin/cli/commands/setup-claude.mjs";

// Same stdout hygiene as setup-claude.test.ts (#5959).
const _console = { log: console.log, info: console.info, warn: console.warn };
before(() => {
  console.log = () => {};
  console.info = () => {};
  console.warn = () => {};
});
after(() => {
  console.log = _console.log;
  console.info = _console.info;
  console.warn = _console.warn;
});

const envOf = (cfg: object, contextWindow?: number) =>
  JSON.parse(buildProfileSettings("p/m", "http://vps:20128", cfg, contextWindow)).env;

test("a 128k model compacts at 85% of its window and declares the window", () => {
  const env = envOf({ name: "x", ctx: 131072 });
  assert.equal(env.CLAUDE_CODE_AUTO_COMPACT_WINDOW, "111411");
  assert.equal(env.CLAUDE_CODE_MAX_CONTEXT_TOKENS, "131072");
});

test("an explicit catalog window wins over the profile table window", () => {
  const env = envOf({ name: "x", ctx: 131072 }, 65536);
  assert.equal(env.CLAUDE_CODE_AUTO_COMPACT_WINDOW, undefined, "65536 is below any compact window");
  assert.equal(env.CLAUDE_CODE_MAX_CONTEXT_TOKENS, "65536");
});

test("a window of 200k or more, or an unknown window, keeps 190000", () => {
  for (const env of [envOf({ name: "x", ctx: 1_000_000 }), envOf({ name: "x" })]) {
    assert.equal(env.CLAUDE_CODE_AUTO_COMPACT_WINDOW, "190000");
    assert.equal(env.CLAUDE_CODE_MAX_CONTEXT_TOKENS, undefined);
  }
});

test("the profile still pins model, base URL and gateway discovery, and no token", () => {
  const raw = buildProfileSettings("p/m", "http://vps:20128", { name: "x", ctx: 131072 });
  const env = JSON.parse(raw).env;
  assert.equal(env.ANTHROPIC_BASE_URL, "http://vps:20128");
  assert.equal(env.ANTHROPIC_MODEL, "p/m");
  assert.equal(env.CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY, "1");
  assert.equal(raw.includes("ANTHROPIC_AUTH_TOKEN"), false);
});

async function profileEnv(entry: Record<string, unknown>, name: string) {
  const claudeHome = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-claude-window-"));
  try {
    await syncClaudeProfilesFromModels([{ output_modalities: ["text"], ...entry }], {
      claudeHome,
      baseUrl: "http://vps:20128",
    });
    const file = path.join(claudeHome, "profiles", name, "settings.json");
    return JSON.parse(await fs.readFile(file, "utf8")).env;
  } finally {
    await fs.rm(claudeHome, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

test("profile sync reads the window from the live catalog entry", async () => {
  const env = await profileEnv(
    { id: "new-provider/future-chat-1", context_length: 131072 },
    "new-provider-future-chat-1"
  );
  assert.equal(env.CLAUDE_CODE_AUTO_COMPACT_WINDOW, "111411");
  assert.equal(env.CLAUDE_CODE_MAX_CONTEXT_TOKENS, "131072");
});

test("profile sync prefers max_input_tokens, as launch does, and the catalog over the table", async () => {
  // glm/glm-5.2 has a 131072 window in the profile table; this catalog says 200000.
  const env = await profileEnv(
    { id: "glm/glm-5.2", context_length: 262144, max_input_tokens: 200000 },
    "glm52"
  );
  assert.equal(env.CLAUDE_CODE_AUTO_COMPACT_WINDOW, "190000");
  assert.equal(env.CLAUDE_CODE_MAX_CONTEXT_TOKENS, undefined);
});

test("profile sync falls back to the profile table window when the catalog has none", async () => {
  const env = await profileEnv({ id: "glm/glm-5.2" }, "glm52");
  assert.equal(env.CLAUDE_CODE_AUTO_COMPACT_WINDOW, "111411");
});

// --- `omniroute run claude` executes through runLaunchCommand, which already sizes the window.
// Guard that path so a later refactor of run.mjs cannot drop it. ---------------------------

test("run claude passes the routed model's catalog window to the spawned claude", async () => {
  const { runCliTarget } = await import("../../../bin/cli/commands/run.mjs");
  const tmp = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-run-window-"));
  const out = path.join(tmp, "seen.txt");
  await fs.mkdir(path.join(tmp, "bin"));
  await fs.writeFile(
    path.join(tmp, "bin", "claude"),
    `#!/bin/sh\nprintf '%s' "$CLAUDE_CODE_AUTO_COMPACT_WINDOW" > '${out}'\n`,
    { mode: 0o755 }
  );
  const originalPath = process.env.PATH;
  const originalFetch = globalThis.fetch;
  process.env.PATH = `${path.join(tmp, "bin")}${path.delimiter}${originalPath}`;
  globalThis.fetch = (async (url: string) =>
    String(url).endsWith("/api/monitoring/health")
      ? new Response("{}", { status: 200 })
      : new Response(JSON.stringify({ data: [{ id: "glm/glm-5.2", max_input_tokens: 131072 }] }), {
          status: 200,
        })) as typeof fetch;
  try {
    const code = await runCliTarget(
      "claude",
      { remote: "http://127.0.0.1:20128", token: "t", model: "glm/glm-5.2" },
      []
    );
    assert.equal(code, 0);
    assert.equal(await fs.readFile(out, "utf8"), "111411");
  } finally {
    process.env.PATH = originalPath;
    globalThis.fetch = originalFetch;
    await fs.rm(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
