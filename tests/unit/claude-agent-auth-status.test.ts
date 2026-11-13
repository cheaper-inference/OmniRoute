import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  clearClaudeAgentAuthStatusCache,
  getClaudeAgentAuthStatus,
} from "@/lib/providers/claudeAgentAuthStatus";

/** Writes a fake "claude" CLI whose `auth status` prints the given stdout. */
function makeFakeClaude(stdout: string): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "claude-agent-auth-"));
  const script = path.join(dir, "claude");
  fs.writeFileSync(script, `#!/bin/sh\ncat <<'JSON'\n${stdout}\nJSON\n`);
  fs.chmodSync(script, 0o755);
  return script;
}

test("claude-agent auth status: logged-in CLI JSON parses", async () => {
  clearClaudeAgentAuthStatusCache();
  const executable = makeFakeClaude(
    '{"loggedIn": true, "authMethod": "oauth_token", "apiProvider": "firstParty"}'
  );
  const status = await getClaudeAgentAuthStatus(executable);
  assert.equal(status.installed, true);
  assert.equal(status.loggedIn, true);
  assert.equal(status.authMethod, "oauth_token");
  assert.equal(status.apiProvider, "firstParty");
  clearClaudeAgentAuthStatusCache();
});

test("claude-agent auth status: logged-out CLI JSON parses", async () => {
  clearClaudeAgentAuthStatusCache();
  const executable = makeFakeClaude('{"loggedIn": false}');
  const status = await getClaudeAgentAuthStatus(executable);
  assert.equal(status.installed, true);
  assert.equal(status.loggedIn, false);
  assert.equal(status.authMethod, undefined);
  clearClaudeAgentAuthStatusCache();
});

test("claude-agent auth status: non-JSON / failing CLI counts as logged out", async () => {
  clearClaudeAgentAuthStatusCache();
  const executable = makeFakeClaude("not json at all");
  const status = await getClaudeAgentAuthStatus(executable);
  assert.equal(status.installed, true);
  assert.equal(status.loggedIn, false);
  clearClaudeAgentAuthStatusCache();
});

test("claude-agent auth status: missing executable reports installed=false", async () => {
  clearClaudeAgentAuthStatusCache();
  const status = await getClaudeAgentAuthStatus(null);
  assert.deepEqual(status, { installed: false, loggedIn: false });
  clearClaudeAgentAuthStatusCache();
});

test("claude-agent auth status: no account PII is returned", async () => {
  clearClaudeAgentAuthStatusCache();
  const executable = makeFakeClaude(
    '{"loggedIn": true, "email": "a@b.c", "projectsDirectory": "/home/x/.claude/projects", "authMethod": "oauth_token"}'
  );
  const status = await getClaudeAgentAuthStatus(executable);
  assert.equal("email" in status, false);
  assert.equal("projectsDirectory" in status, false);
  clearClaudeAgentAuthStatusCache();
});
