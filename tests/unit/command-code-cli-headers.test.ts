import test from "node:test";
import assert from "node:assert/strict";

// The default-version checks below must not depend on the developer's
// environment: COMMAND_CODE_VERSION is a supported override, read once at
// module load, so clear it before this file's (per-process) import.
delete process.env.COMMAND_CODE_VERSION;

const { COMMAND_CODE_VERSION, buildCommandCodeCliHeaders } =
  await import("../../open-sse/executors/commandCode.ts");

// The /alpha/generate fallback and the API-key probe mimic the official Command
// Code CLI. The CLI moved to 1.88.0 with `x-cli-environment: production` and
// `x-cli-surface: cli`; OmniRoute still announced 1.15.1 / external, which the
// upstream can fingerprint as a stale client.

test("COMMAND_CODE_VERSION defaults to the current CLI 1.88.0", () => {
  assert.equal(COMMAND_CODE_VERSION, "1.88.0");
});

test("CLI fallback headers announce production, the cli surface and no taste learning", () => {
  const key = ["sk", "commandcode", "probe"].join("-");
  const headers = buildCommandCodeCliHeaders(key, "session-1");
  assert.equal(headers["x-command-code-version"], "1.88.0");
  assert.equal(headers["x-cli-environment"], "production");
  assert.equal(headers["x-cli-surface"], "cli");
  assert.equal(headers["x-taste-learning"], "false");
  assert.equal(headers["x-co-flag"], "false");
  assert.equal(headers["x-project-slug"], "pi-cc");
  assert.equal(headers["x-session-id"], "session-1");
  assert.equal(headers.Authorization, `Bearer ${key}`);
  assert.equal(headers["Content-Type"], "application/json");
});
