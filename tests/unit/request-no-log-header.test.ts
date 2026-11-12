import test from "node:test";
import assert from "node:assert/strict";

// Per-request call-log payload opt-out via `x-omniroute-no-log`.
// Complements the per-API-key `no_log` flag; the header must never be forwarded upstream.
const { isNoLogRequested, resolveNoLogEnabled } =
  await import("../../open-sse/handlers/chatCore/headers.ts");
const { buildExecutorClientHeaders } =
  await import("../../open-sse/handlers/chatCore/executorClientHeaders.ts");
const { resolveUsageAgentContext } =
  await import("../../open-sse/handlers/chatCore/agentContext.ts");

test("isNoLogRequested accepts truthy header values (plain object)", () => {
  for (const value of ["true", "1", "yes", "TRUE", "Yes", " true "]) {
    assert.equal(
      isNoLogRequested({ "x-omniroute-no-log": value }),
      true,
      `expected true for ${JSON.stringify(value)}`
    );
  }
});

test("isNoLogRequested is case-insensitive on the header name", () => {
  assert.equal(isNoLogRequested({ "X-OmniRoute-No-Log": "true" }), true);
});

test("isNoLogRequested works with a Headers instance", () => {
  const headers = new Headers();
  headers.set("x-omniroute-no-log", "1");
  assert.equal(isNoLogRequested(headers), true);
});

test("isNoLogRequested is false when absent, empty, or falsy", () => {
  assert.equal(isNoLogRequested(null), false);
  assert.equal(isNoLogRequested(undefined), false);
  assert.equal(isNoLogRequested({}), false);
  assert.equal(isNoLogRequested({ "x-omniroute-no-log": "" }), false);
  assert.equal(isNoLogRequested({ "x-omniroute-no-log": "false" }), false);
  assert.equal(isNoLogRequested({ "x-omniroute-no-log": "0" }), false);
  assert.equal(isNoLogRequested({ "x-omniroute-no-log": "no" }), false);
});

test("resolveNoLogEnabled ORs the per-key flag and the per-request header", () => {
  const noLogKey = { noLog: true };
  const loggedKey = { noLog: false };
  const header = { "x-omniroute-no-log": "true" };

  assert.equal(resolveNoLogEnabled(noLogKey, null), true);
  assert.equal(resolveNoLogEnabled(noLogKey, header), true);
  assert.equal(resolveNoLogEnabled(loggedKey, header), true);
  assert.equal(resolveNoLogEnabled(loggedKey, null), false);
  assert.equal(resolveNoLogEnabled(null, header), true);
  assert.equal(resolveNoLogEnabled(undefined, {}), false);
  // Only a strict boolean true on the key opts in, matching isNoLog().
  assert.equal(resolveNoLogEnabled({ noLog: "true" }, null), false);
});

test("x-omniroute-no-log is stripped before executor headers reach an upstream", () => {
  const plain = buildExecutorClientHeaders({
    "x-omniroute-no-log": "true",
    "x-omniroute-lease-generation": "7",
    "x-session-id": "kept",
  });
  assert.deepEqual(plain, { "x-session-id": "kept" });

  const headers = new Headers({
    "x-omniroute-no-log": "1",
    "x-omniroute-lease-owner": `vlo_${"A".repeat(43)}`,
    "content-type": "application/json",
  });
  const fromHeaders = buildExecutorClientHeaders(headers);
  assert.equal(fromHeaders?.["x-omniroute-no-log"], undefined);
  assert.equal(fromHeaders?.["x-omniroute-lease-owner"], undefined);
  assert.equal(fromHeaders?.["content-type"], "application/json");
});

test("effective no-log drops prompt-derived agent context but keeps header identifiers", () => {
  const body = {
    system: "Primary working directory: /Users/me/project",
    messages: [{ role: "user", content: "Current branch: feature/x" }],
  };
  const headers = { "x-omniroute-project": "header-project" };

  const logged = resolveUsageAgentContext(body, headers, { noLog: false });
  assert.equal(logged.projectName, "header-project");
  assert.equal(logged.projectPath, "/Users/me/project");
  assert.equal(logged.gitBranch, "feature/x");

  const noLog = resolveUsageAgentContext(body, headers, { noLog: true });
  assert.equal(noLog.projectName, "header-project");
  assert.equal(noLog.projectSource, "header");
  assert.equal(noLog.projectPath, null);
  assert.equal(noLog.gitBranch, null);

  const noHeaderNoLog = resolveUsageAgentContext(body, null, { noLog: true });
  assert.equal(noHeaderNoLog.projectName, null);
  assert.equal(noHeaderNoLog.projectPath, null);
  assert.equal(noHeaderNoLog.gitBranch, null);
});
