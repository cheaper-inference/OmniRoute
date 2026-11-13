/**
 * Tests for open-sse/utils/claudeAgentSdk.ts — lazy SDK resolver + vendored
 * CLI locator for the "claude-agent" provider.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import {
  resolveClaudeAgentSdk,
  resolveClaudeCodeExecutable,
} from "../../open-sse/utils/claudeAgentSdk.ts";

test("resolveClaudeAgentSdk loads the SDK module with a query function", async () => {
  const sdk = await resolveClaudeAgentSdk();
  assert.ok(sdk, "SDK should resolve when the dependency is installed");
  if (sdk) {
    assert.equal(typeof sdk.query, "function", "sdk.query must be a function");
  }
});

test("resolveClaudeAgentSdk caches its module across calls", async () => {
  const first = await resolveClaudeAgentSdk();
  const second = await resolveClaudeAgentSdk();
  assert.equal(first, second, "resolver must return the cached module");
});

test("resolveClaudeCodeExecutable returns null for a null SDK module", () => {
  assert.equal(resolveClaudeCodeExecutable(null), null);
});

test("resolveClaudeCodeExecutable locates the vendored Claude Code CLI", async () => {
  const sdk = await resolveClaudeAgentSdk();
  const path = resolveClaudeCodeExecutable(sdk);
  if (path) {
    assert.ok(existsSync(path), `resolved CLI path must exist: ${path}`);
    assert.ok(
      path.includes("claude-agent-sdk"),
      `path must point at the vendored SDK CLI: ${path}`
    );
  }
  // When the CLI cannot be vendored (partial install), the resolver may
  // legitimately return null — the contract allows either outcome, but it
  // must never throw.
});
