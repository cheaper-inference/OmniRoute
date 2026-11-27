/**
 * auggie / zcode must stay out of the auto/* pools while their binary is absent on the host,
 * from the same verdict that hides them from /v1/models (localCliAvailability, #18753), and
 * be admitted once it is present. devin-cli-agentic keeps its own login probe, and
 * codex-app-server stays fail-open (the CLI may run elsewhere).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-local-cli-ready-"));
const ENV_KEYS = [
  "DATA_DIR",
  "ZCODE_BIN",
  "ZCODE_SERVER_RUNTIME_ROOT",
  "ZCODE_SERVER_NODE",
  "ZCODE_SERVER_ENTRY",
  "AUGGIE_BIN",
  "CLI_AUGGIE_BIN",
  "CLI_DEVIN_AGENTIC_BIN",
] as const;
const ORIGINAL_ENV = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));
for (const key of ENV_KEYS) delete process.env[key];
process.env.DATA_DIR = DIR;
const ZCODE_BIN = path.join(DIR, "zcode");
process.env.ZCODE_BIN = ZCODE_BIN;
process.env.ZCODE_SERVER_RUNTIME_ROOT = path.join(DIR, "no-runtime");
process.env.AUGGIE_BIN = path.join(DIR, "auggie");
// Deterministic "no Devin CLI on this machine" for the login probe.
process.env.CLI_DEVIN_AGENTIC_BIN = path.join(DIR, "no-such-devin-binary");

const readiness = await import("../../open-sse/services/autoCombo/noAuthReadiness.ts");
const availability = await import("../../src/shared/services/localCliAvailability.ts");
const { registerNoAuthAutoRoutingReadiness } =
  await import("../../src/lib/providers/noAuthAutoRoutingReadiness.ts");

function writeFakeBinary(file: string) {
  fs.writeFileSync(file, "#!/bin/sh\n", { mode: 0o755 });
}

test.beforeEach(() => {
  readiness.__resetNoAuthReadinessForTests();
  availability.resetLocalCliAvailabilityCache();
  fs.rmSync(ZCODE_BIN, { force: true });
});

test.after(() => {
  readiness.__resetNoAuthReadinessForTests();
  availability.resetLocalCliAvailabilityCache();
  for (const key of ENV_KEYS) {
    if (ORIGINAL_ENV[key] === undefined) delete process.env[key];
    else process.env[key] = ORIGINAL_ENV[key];
  }
  fs.rmSync(DIR, { recursive: true, force: true });
});

test("zcode is not auto-routable without its binary; auggie is once its binary exists", () => {
  writeFakeBinary(path.join(DIR, "auggie"));
  registerNoAuthAutoRoutingReadiness();
  assert.equal(readiness.isNoAuthProviderReadyForAutoRouting("zcode"), false);
  assert.equal(readiness.isNoAuthProviderReadyForAutoRouting("auggie"), true);
});

test("installing the binary admits zcode once the availability cache is refreshed", () => {
  registerNoAuthAutoRoutingReadiness();
  assert.equal(readiness.isNoAuthProviderReadyForAutoRouting("zcode"), false);
  writeFakeBinary(ZCODE_BIN);
  availability.resetLocalCliAvailabilityCache();
  assert.equal(readiness.isNoAuthProviderReadyForAutoRouting("zcode"), true);
});

test("codex-app-server stays fail-open and devin-cli-agentic keeps its login probe", () => {
  registerNoAuthAutoRoutingReadiness();
  assert.equal(readiness.isNoAuthProviderReadyForAutoRouting("codex-app-server"), true);
  // No Devin login confirmed on this host: the existing #15446 probe keeps it out.
  assert.equal(readiness.isNoAuthProviderReadyForAutoRouting("devin-cli-agentic"), false);
});
