import assert from "node:assert/strict";
import test from "node:test";
import { setCliVersionOverrides } from "../../open-sse/config/cliVersions.ts";
import * as codex from "../../open-sse/config/codexClient.ts";
import * as claude from "../../src/shared/constants/claudeCodeClient.ts";

const savedEnv = {
  CODEX_CLIENT_VERSION: process.env.CODEX_CLIENT_VERSION,
  CLAUDE_CODE_CLIENT_VERSION: process.env.CLAUDE_CODE_CLIENT_VERSION,
};

test.beforeEach(() => {
  delete process.env.CODEX_CLIENT_VERSION;
  delete process.env.CLAUDE_CODE_CLIENT_VERSION;
  setCliVersionOverrides({});
  codex.clearCodexClientVersionCache();
  codex.resetCodexClientVersionCacheForTests();
  claude.resetClaudeCodeClientVersionCache();
});

test.after(() => {
  setCliVersionOverrides({});
  for (const [key, value] of Object.entries(savedEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

test("verified installed versions become the next provider client identity without a network request", () => {
  codex.seedVerifiedCodexClientVersion("9.10.0");
  claude.seedVerifiedClaudeCodeClientVersion("9.10.0");
  assert.equal(codex.getCodexClientVersion(), "9.10.0");
  assert.equal(codex.getCodexClientVersionSource(), "registry");
  assert.equal(claude.getClaudeCodeClientVersion(), "9.10.0");
  assert.equal(claude.getClaudeCodeClientVersionSource(), "discovered");
});

test("verified installation never lowers a previously discovered version or the built-in floor", () => {
  codex.seedVerifiedCodexClientVersion("9.10.0");
  claude.seedVerifiedClaudeCodeClientVersion("9.10.0");
  codex.seedVerifiedCodexClientVersion("9.9.9");
  claude.seedVerifiedClaudeCodeClientVersion("9.9.9");
  assert.equal(codex.getCodexClientVersion(), "9.10.0");
  assert.equal(claude.getClaudeCodeClientVersion(), "9.10.0");
});

test("an older in-flight registry response cannot replace a verified Claude installation", async () => {
  let finishFetch!: (response: Response) => void;
  const response = new Promise<Response>((resolve) => {
    finishFetch = resolve;
  });
  const pendingRefresh = claude.refreshClaudeCodeClientVersion(async () => response);
  claude.seedVerifiedClaudeCodeClientVersion("9.10.0");
  finishFetch(Response.json({ version: "9.9.0" }));

  assert.equal(await pendingRefresh, "9.10.0");
  assert.equal(claude.getClaudeCodeClientVersion(), "9.10.0");
});

test("explicit dashboard and environment identities retain priority after installation", () => {
  process.env.CODEX_CLIENT_VERSION = "0.166.0";
  process.env.CLAUDE_CODE_CLIENT_VERSION = "2.1.281";
  codex.seedVerifiedCodexClientVersion("9.10.0");
  claude.seedVerifiedClaudeCodeClientVersion("9.10.0");
  assert.equal(codex.getCodexClientVersion(), "0.166.0");
  assert.equal(claude.getClaudeCodeClientVersion(), "2.1.281");
  setCliVersionOverrides({ codex: "0.167.0", claude: "2.1.282" });
  assert.equal(codex.getCodexClientVersion(), "0.167.0");
  assert.equal(claude.getClaudeCodeClientVersion(), "2.1.282");
  assert.equal(codex.getCodexAdvertisedVersionSource(), "settings");
  assert.equal(claude.getClaudeCodeClientVersionSource(), "settings");
});

test("unverified version syntax cannot enter provider client caches", () => {
  for (const version of ["latest", "9.1.0-beta.1", "1.2.3\r\nX-Test: 1", "01.2.3", "1.2.3;echo"]) {
    assert.throws(() => codex.seedVerifiedCodexClientVersion(version), TypeError);
    assert.throws(() => claude.seedVerifiedClaudeCodeClientVersion(version), TypeError);
  }
});

test("a newer GitHub release remains visible after an in-flight managed version seed", async () => {
  let finishFetch!: (response: Response) => void;
  const response = new Promise<Response>((resolve) => {
    finishFetch = resolve;
  });
  const pending = codex.resolveCodexClientVersion(async () => response);
  codex.seedVerifiedCodexClientVersion("9.10.0");
  finishFetch(Response.json({ tag_name: "rust-v9.11.0" }));

  assert.equal(await pending, "9.11.0");
  assert.equal(codex.getCodexClientVersion(), "9.11.0");
});

test("verifying an older Codex installation does not extend a newer cached version's life", async (t) => {
  let now = Date.now();
  t.mock.method(Date, "now", () => now);
  codex.seedVerifiedCodexClientVersion("9.11.0");
  now += codex.CODEX_VERSION_CACHE_TTL_MS + 1;
  codex.seedVerifiedCodexClientVersion("9.10.0");

  const discovered = await codex.refreshCodexClientVersion(async () =>
    Response.json({ name: "@openai/codex", version: "9.12.0" })
  );
  assert.equal(discovered, "9.12.0");
});
