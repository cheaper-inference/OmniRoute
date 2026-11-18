/**
 * REQUIRE_API_KEY must be read the same way by the request gate and by both
 * startup exposure warnings (Hard Rule #18 fail-then-pass).
 *
 * The gate used to accept only the exact strings "true" / "1" / "yes", while
 * the Next startup guard (nonLoopbackApiKeyGuard.ts) and the CLI `serve`
 * warning (serverHost.mjs) trimmed and lower-cased first. A value such as
 * "TRUE" or " true" left the gate off (anonymous /v1 allowed) while both
 * warnings treated it as on and stayed silent.
 *
 * The warnings read only the env value. A DB override is not covered: with an
 * override of "false" and env "true" the gate is off and neither warning fires.
 * That gap predates this fix and is out of its scope.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test, { after } from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rak-parse-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { isRequireApiKeyEnabled } = await import("../../src/shared/utils/featureFlags.ts");
const { warnIfNonLoopbackWithoutApiKey } =
  await import("../../src/lib/startup/nonLoopbackApiKeyGuard.ts");
const { resolveExposureWarning } = await import("../../bin/cli/utils/serverHost.mjs");
const { setFeatureFlagOverride, removeFeatureFlagOverride } =
  await import("../../src/lib/db/featureFlags");

const ORIGINAL = process.env.REQUIRE_API_KEY;

// [raw env value, expected gate result]
const MATRIX: Array<[string | undefined, boolean]> = [
  [undefined, false],
  ["", false],
  ["true", true],
  ["1", true],
  ["yes", true],
  ["TRUE", true],
  ["True", true],
  ["YES", true],
  [" true", true],
  ["true ", true],
  [" true ", true],
  ["true\r", true],
  ["\tyes", true],
  [" 1 ", true],
  ["false", false],
  ["FALSE", false],
  ["0", false],
  ["no", false],
  ["off", false],
  ["on", false],
  ["enabled", false],
];

function setEnv(value: string | undefined): void {
  if (value === undefined) delete process.env.REQUIRE_API_KEY;
  else process.env.REQUIRE_API_KEY = value;
}

function nextGuardWarns(): boolean {
  const messages: string[] = [];
  const original = console.warn;
  console.warn = (...args: unknown[]) => {
    messages.push(args.map(String).join(" "));
  };
  try {
    warnIfNonLoopbackWithoutApiKey("Test server", "0.0.0.0");
  } finally {
    console.warn = original;
  }
  return messages.length > 0;
}

function cliWarns(value: string | undefined): boolean {
  const env = value === undefined ? {} : { REQUIRE_API_KEY: value };
  return resolveExposureWarning(env, "0.0.0.0") !== null;
}

after(() => {
  setEnv(ORIGINAL);
  removeFeatureFlagOverride("REQUIRE_API_KEY");
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

for (const [value, expected] of MATRIX) {
  test(`REQUIRE_API_KEY=${JSON.stringify(value)}: gate is ${expected ? "on" : "off"} and, with no DB override, both warnings agree`, () => {
    setEnv(value);
    const gate = isRequireApiKeyEnabled();
    assert.equal(gate, expected, "gate result");
    assert.equal(
      nextGuardWarns(),
      !gate,
      "Next startup warning must fire when the gate is off from the env value"
    );
    assert.equal(
      cliWarns(value),
      !gate,
      "CLI serve warning must fire when the gate is off from the env value"
    );
  });
}

test("a DB override is parsed with the same rules as the env value", () => {
  setEnv(undefined);
  setFeatureFlagOverride("REQUIRE_API_KEY", "TRUE");
  try {
    assert.equal(isRequireApiKeyEnabled(), true);
  } finally {
    removeFeatureFlagOverride("REQUIRE_API_KEY");
  }
  setFeatureFlagOverride("REQUIRE_API_KEY", "on");
  try {
    assert.equal(isRequireApiKeyEnabled(), false);
  } finally {
    removeFeatureFlagOverride("REQUIRE_API_KEY");
  }
});
