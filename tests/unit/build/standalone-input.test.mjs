import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { ensureStandaloneInput } from "../../../scripts/build/standaloneInput.mjs";

test("a consumer refuses missing standalone without invoking a build", () => {
  const root = mkdtempSync(path.join(tmpdir(), "standalone-required-"));
  try {
    let builds = 0;
    const options = {
      serverPath: path.join(root, "server.js"),
      requirePrebuilt: true,
      build: () => builds++,
    };
    assert.throws(() => ensureStandaloneInput(options), /PREBUILT_NEXT_REQUIRED/);
    assert.equal(builds, 0);
    mkdirSync(options.serverPath);
    assert.throws(() => ensureStandaloneInput(options), /PREBUILT_NEXT_REQUIRED/);
    assert.equal(builds, 0, "a directory at the server path is not a build");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("an existing standalone is consumed in both modes, without invoking a build", () => {
  const root = mkdtempSync(path.join(tmpdir(), "standalone-existing-"));
  try {
    const serverPath = path.join(root, "server.js");
    writeFileSync(serverPath, "// fixture\n");
    for (const requirePrebuilt of [false, true]) {
      assert.equal(
        ensureStandaloneInput({
          serverPath,
          requirePrebuilt,
          build: () => assert.fail("must not rebuild"),
        }),
        "reused"
      );
    }
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("ordinary local builds retain exactly one fallback and reject incomplete output", () => {
  const root = mkdtempSync(path.join(tmpdir(), "standalone-fallback-"));
  try {
    let builds = 0;
    const serverPath = path.join(root, "server.js");
    assert.equal(
      ensureStandaloneInput({
        serverPath,
        build: () => {
          builds++;
          writeFileSync(serverPath, "// built fixture\n");
        },
      }),
      "built"
    );
    assert.equal(builds, 1);
    rmSync(serverPath);
    assert.throws(
      () => ensureStandaloneInput({ serverPath, build: () => builds++ }),
      /NEXT_BUILD_INCOMPLETE/
    );
    assert.equal(builds, 2);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
