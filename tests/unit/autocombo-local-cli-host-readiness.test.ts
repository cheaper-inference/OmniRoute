/**
 * zcode / auggie must stay out of auto/* pools while their binary is absent on the host
 * (same verdict that hides them from /v1/models), and be admitted once it is present.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-local-cli-ready-"));
process.env.DATA_DIR = DIR;
process.env.ZCODE_BIN = path.join(DIR, "no-zcode");
process.env.ZCODE_SERVER_RUNTIME_ROOT = path.join(DIR, "no-runtime");
process.env.AUGGIE_BIN = path.join(DIR, "auggie");

const readiness = await import("../../open-sse/services/autoCombo/noAuthReadiness.ts");
const host = await import("../../src/lib/providers/localCliHostAvailability.ts");
const { registerNoAuthAutoRoutingReadiness } =
  await import("../../src/lib/providers/noAuthAutoRoutingReadiness.ts");

test.after(() => {
  readiness.__resetNoAuthReadinessForTests();
  fs.rmSync(DIR, { recursive: true, force: true });
});

test("zcode is not auto-routable without its binary; auggie is once its binary exists", () => {
  readiness.__resetNoAuthReadinessForTests();
  host.__resetLocalCliHostVerdictsForTests();
  fs.writeFileSync(path.join(DIR, "auggie"), "#!/bin/sh\n", { mode: 0o755 });
  registerNoAuthAutoRoutingReadiness();
  assert.equal(readiness.isNoAuthProviderReadyForAutoRouting("zcode"), false);
  assert.equal(readiness.isNoAuthProviderReadyForAutoRouting("auggie"), true);
});
