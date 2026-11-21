import test from "node:test";
import assert from "node:assert/strict";
import * as credits from "../../open-sse/services/antigravityCredits.ts";

const initialEnv = process.env.ANTIGRAVITY_CREDITS;

test.beforeEach(() => {
  process.env.ANTIGRAVITY_CREDITS = "  ReTrY  ";
});

test.after(() => {
  if (initialEnv === undefined) delete process.env.ANTIGRAVITY_CREDITS;
  else process.env.ANTIGRAVITY_CREDITS = initialEnv;
  credits.setAntigravityCreditsMode(null);
});

test("normalizes supported values, case/whitespace variants, and invalid input", () => {
  assert.deepEqual(credits.ANTIGRAVITY_CREDITS_MODES, ["off", "retry", "always"]);
  const cases = [
    ["off", "off"],
    ["retry", "retry"],
    ["always", "always"],
    [" oFF ", "off"],
    [" rEtRy\t", "retry"],
    [" ALWAYS\n", "always"],
    [null, "off"],
    [undefined, "off"],
    ["unexpected", "off"],
    [false, "off"],
    [0, "off"],
  ];
  for (const [input, expected] of cases) {
    assert.equal(credits.normalizeAntigravityCreditsMode(input), expected);
  }
});

test("runtime override takes precedence over the env, including explicit off", () => {
  assert.equal(credits.getCreditsMode(), "retry");
  for (const mode of ["off", "always", "retry"] as const) {
    credits.setAntigravityCreditsMode(mode);
    assert.equal(credits.getCreditsMode(), mode);
  }
  process.env.ANTIGRAVITY_CREDITS = "ALWAYS";
  credits.setAntigravityCreditsMode(null);
  assert.equal(credits.getCreditsMode(), "always");
  credits.setAntigravityCreditsMode("off");
  credits.setAntigravityCreditsMode(undefined);
  assert.equal(credits.getCreditsMode(), "always");
  delete process.env.ANTIGRAVITY_CREDITS;
  assert.equal(credits.getCreditsMode(), "off");
});

test("an independent server module instance observes the runtime override", async () => {
  const secondModuleUrl = new URL(
    "../../open-sse/services/antigravityCredits.ts?separate-server-bundle",
    import.meta.url
  );
  const secondInstance: typeof credits = await import(secondModuleUrl.href);
  assert.notEqual(secondInstance.getCreditsMode, credits.getCreditsMode);
  credits.setAntigravityCreditsMode("off");
  assert.equal(secondInstance.getCreditsMode(), "off");
  secondInstance.setAntigravityCreditsMode("always");
  assert.equal(credits.getCreditsMode(), "always");
});
