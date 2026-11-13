/**
 * GET /api/providers/claude-agent/status spawns the vendored `claude auth
 * status` (getClaudeAgentAuthStatus()), so it MUST be LOCAL_ONLY like every
 * other spawn-capable route (Hard Rules #15 + #17) — a leaked dashboard
 * session over a tunnel must not be able to trigger process spawning. The
 * sibling POST /api/providers/claude-agent/login is covered by the existing
 * `/api/providers/{id}/login` LOCAL_ONLY pattern (spawnCapablePrefixes.ts).
 */
import test from "node:test";
import assert from "node:assert/strict";

import { isLocalOnlyPath } from "@/server/authz/routeGuard";

test("claude-agent status + login routes are classified LOCAL_ONLY", () => {
  assert.equal(isLocalOnlyPath("/api/providers/claude-agent/status", "GET"), true);
  assert.equal(isLocalOnlyPath("/api/providers/claude-agent/login", "POST"), true);
});

test("unrelated provider GETs stay classification-free", () => {
  assert.equal(isLocalOnlyPath("/api/providers/opencode/models"), false);
});
