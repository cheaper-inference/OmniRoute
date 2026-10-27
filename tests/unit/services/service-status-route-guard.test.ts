import test from "node:test";
import assert from "node:assert/strict";
import { isLocalOnlyPath } from "../../../src/server/authz/routeGuard.ts";

/** Status route whose GET performs no child-process spawn (release-metadata HTTPS query only). */
const SAFE_REMOTE_STATUS_PATHS = ["/api/services/cliproxy/status"] as const;

/**
 * Status routes whose GET handler calls `getLatestVersion()`, which runs
 * `npm view` (execFile) on a cache miss. A non-local caller must be rejected by
 * the loopback gate BEFORE the handler runs, so no remote request can ever
 * spawn a process (Hard Rules #15/#17).
 */
const NPM_VIEW_STATUS_PATHS = [
  "/api/services/bifrost/status",
  "/api/services/dario/status",
  "/api/services/mux/status",
  "/api/services/openwa/status",
] as const;

const READ_METHODS = ["GET", "HEAD", "OPTIONS"] as const;
const WRITE_METHODS = ["POST", "PUT", "PATCH", "DELETE"] as const;

test("the spawn-free cliproxy status GET is remotely readable", () => {
  for (const path of SAFE_REMOTE_STATUS_PATHS) {
    for (const method of READ_METHODS) {
      assert.equal(isLocalOnlyPath(path, method), false, `${path} ${method} should be exempt`);
    }
  }
});

test("status exemptions never allow lifecycle mutations", () => {
  for (const path of SAFE_REMOTE_STATUS_PATHS) {
    for (const method of WRITE_METHODS) {
      assert.equal(isLocalOnlyPath(path, method), true, `${path} ${method} must stay local-only`);
    }
  }
});

test("status routes that run `npm view` stay local-only for every method (no remote spawn)", () => {
  for (const path of NPM_VIEW_STATUS_PATHS) {
    assert.equal(isLocalOnlyPath(path), true, `${path} [no method] must be local-only`);
    for (const method of [...READ_METHODS, ...WRITE_METHODS]) {
      assert.equal(isLocalOnlyPath(path, method), true, `${path} ${method} must be local-only`);
    }
  }
});

test("arbitrary service routes and near-matches remain local-only", () => {
  assert.equal(isLocalOnlyPath("/api/services/bifrost/start", "GET"), true);
  assert.equal(isLocalOnlyPath("/api/services/cliproxy/status/extra", "GET"), true);
  assert.equal(isLocalOnlyPath("/api/services/unknown/status", "GET"), true);
  assert.equal(isLocalOnlyPath("/api/services/9router/status", "GET"), true);
});

test("9router status stays local-only because its GET handler can reveal a plaintext key", () => {
  assert.equal(isLocalOnlyPath("/api/services/9router/status", "GET"), true);
  assert.equal(isLocalOnlyPath("/api/services/9router/status", "POST"), true);
});
