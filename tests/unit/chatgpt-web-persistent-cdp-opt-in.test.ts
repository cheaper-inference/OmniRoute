import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// #15935: the persistent CDP profile is strictly opt-in. Without
// CHATGPT_WEB_CODEX_USE_CDP_PROFILE=1 (and a CDP endpoint) the adapter keeps
// isolated contexts and the 5-tab cap exactly as on the release.

const { usePersistentCdpProfile } =
  await import("../../open-sse/vendor/codex-chatgpt-web/persistent-cdp-context.ts");

const FLAG = "CHATGPT_WEB_CODEX_USE_CDP_PROFILE";
const CDP = "http://127.0.0.1:9223";

function withEnv(value: string | undefined, fn: () => void) {
  const previous = process.env[FLAG];
  if (value === undefined) delete process.env[FLAG];
  else process.env[FLAG] = value;
  try {
    fn();
  } finally {
    if (previous === undefined) delete process.env[FLAG];
    else process.env[FLAG] = previous;
  }
}

test("persistent profile is off by default and needs both the env opt-in and a CDP endpoint", () => {
  withEnv(undefined, () => {
    assert.equal(usePersistentCdpProfile(CDP), false);
    assert.equal(usePersistentCdpProfile(undefined), false);
  });
  for (const value of ["", "0", "true", "yes"]) {
    withEnv(value, () => assert.equal(usePersistentCdpProfile(CDP), false, `value ${value}`));
  }
  withEnv("1", () => {
    assert.equal(usePersistentCdpProfile(CDP), true);
    assert.equal(usePersistentCdpProfile(undefined), false);
    assert.equal(usePersistentCdpProfile(""), false);
  });
});

function tabCapWith(value: string | undefined): number {
  const moduleUrl = new URL(
    "../../open-sse/vendor/codex-chatgpt-web/adapters/chatgpt-web/concurrency.ts",
    import.meta.url
  ).href;
  const env = { ...process.env };
  if (value === undefined) delete env[FLAG];
  else env[FLAG] = value;
  const run = spawnSync(
    process.execPath,
    [
      "--import",
      "tsx/esm",
      "--input-type=module",
      "-e",
      `const m = await import(${JSON.stringify(moduleUrl)}); process.stdout.write(String(m.MAX_CHATGPT_BROWSER_TABS));`,
    ],
    { env, encoding: "utf8", cwd: fileURLToPath(new URL("../..", import.meta.url)) }
  );
  assert.equal(run.status, 0, run.stderr);
  return Number(run.stdout.trim());
}

test("tab cap stays 5 by default and drops to 1 only with the opt-in", () => {
  assert.equal(tabCapWith(undefined), 5);
  assert.equal(tabCapWith("0"), 5);
  assert.equal(tabCapWith("1"), 1);
});
