import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import semver from "semver";

const lock = JSON.parse(
  readFileSync(
    new URL("../../../@omniroute/opencode-plugin/package-lock.json", import.meta.url),
    "utf8"
  )
);

// GHSA-chp3-j5qr-2vfr: Effect v4 cookie validation was fixed in beta.103.
// This contract covers the standalone development/CI lock, including nested copies.
function assertEffectSecurityFloor(candidate) {
  assert.ok(
    candidate?.packages &&
      typeof candidate.packages === "object" &&
      !Array.isArray(candidate.packages),
    "the standalone lock must expose its packages"
  );
  const suffix = "node_modules/effect";
  const copies = Object.entries(candidate.packages).filter(
    ([location]) => location === suffix || location.endsWith(`/${suffix}`)
  );
  assert.ok(copies.length > 0, "the Effect dependency must remain visible to this contract");
  for (const [location, entry] of copies) {
    const version = typeof entry?.version === "string" ? semver.valid(entry.version) : null;
    assert.ok(version, `${location}: review an unsupported Effect version`);
    assert.ok(
      semver.gte(version, "4.0.0-beta.103"),
      `${location}: ${entry.version} lacks the Effect v4 cookie fix`
    );
  }
}

test("the OpenCode v1 toolchain includes the Effect cookie validation fix", () => {
  assertEffectSecurityFloor(lock);
});

test("the Effect floor rejects the last beta before the fix", () => {
  assert.throws(
    () =>
      assertEffectSecurityFloor({
        packages: { "node_modules/effect": { version: "4.0.0-beta.102" } },
      }),
    /4\.0\.0-beta\.102 lacks the Effect v4 cookie fix/
  );
});

test("a fixed top-level Effect cannot hide a vulnerable nested copy", () => {
  assert.throws(
    () =>
      assertEffectSecurityFloor({
        packages: {
          "node_modules/effect": { version: "4.0.0-beta.103" },
          "node_modules/@opencode-ai/plugin/node_modules/effect": {
            version: "4.0.0-beta.66",
          },
        },
      }),
    /@opencode-ai\/plugin\/node_modules\/effect: 4\.0\.0-beta\.66 lacks the Effect v4 cookie fix/
  );
});

test("the Effect floor accepts patched prerelease and stable copies at either depth", () => {
  assert.doesNotThrow(() =>
    assertEffectSecurityFloor({
      packages: {
        "node_modules/effect": { version: "4.0.0-beta.103" },
        "node_modules/@opencode-ai/plugin/node_modules/effect": { version: "4.0.1" },
      },
    })
  );
  assert.doesNotThrow(() =>
    assertEffectSecurityFloor({
      packages: {
        "node_modules/@opencode-ai/plugin/node_modules/effect": { version: "4.0.0" },
      },
    })
  );
});

test("the Effect floor rejects empty or missing package evidence", () => {
  assert.throws(() => assertEffectSecurityFloor({}), /lock must expose its packages/);
  assert.throws(
    () =>
      assertEffectSecurityFloor({
        packages: { "node_modules/effect-lookalike": { version: "4.0.0-beta.103" } },
      }),
    /Effect dependency must remain visible/
  );
});

test("the Effect floor rejects malformed or missing versions", () => {
  for (const version of ["not-a-version", "", undefined]) {
    assert.throws(
      () => assertEffectSecurityFloor({ packages: { "node_modules/effect": { version } } }),
      /review an unsupported Effect version/
    );
  }
});
