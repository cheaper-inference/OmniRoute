import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { ensureManagedDirectory } from "../../src/lib/services/managedProxy/directories.ts";
import { nativeOutbound } from "../../src/lib/services/managedProxy/config.ts";

test("native outbounds reject local processes and nested filesystem options", () => {
  assert.throws(() => nativeOutbound("singbox", { type: "tor" }), /Unsupported/);
  for (const key of [
    "certificateFile",
    "keyFile",
    "data_directory",
    "cache_dir",
    "extra_args",
    "torrc",
  ]) {
    assert.throws(
      () => nativeOutbound("singbox", { type: "vless", tls: { [key]: "private" } }),
      /Unsupported local option/
    );
  }
  assert.equal(
    nativeOutbound("singbox", { type: "vless", transport: { path: "/chat" } }).type,
    "vless"
  );
});

test("managed fixture cleanup uses PowerShell environment syntax", () => {
  const runner = fs.readFileSync(
    new URL("../../scripts/test/managed-proxy-fixture-children.mjs", import.meta.url),
    "utf8"
  );
  assert.ok(runner.includes("$env:FIXTURE_PID"));
  assert.ok(!runner.includes("$env.FIXTURE_PID"));
});

for (const link of ["services", "managed-proxy", "singbox"]) {
  test(`trusted DATA_DIR link is accepted but descendant ${link} links are rejected before writing`, () => {
    const temp = fs.mkdtempSync(path.join(os.tmpdir(), "managed-paths-"));
    try {
      const actual = path.join(temp, "actual");
      const trusted = path.join(temp, "trusted");
      const outside = path.join(temp, "outside");
      fs.mkdirSync(actual);
      fs.mkdirSync(outside);
      fs.symlinkSync(actual, trusted, "junction");
      const parts = ["services", "managed-proxy", "singbox"];
      const target = path.join(trusted, ...parts);
      ensureManagedDirectory(target, trusted);
      assert.ok(fs.statSync(target).isDirectory());
      const linked = path.join(trusted, ...parts.slice(0, parts.indexOf(link) + 1));
      fs.rmSync(linked, { recursive: true });
      fs.symlinkSync(outside, linked, "junction");
      assert.throws(
        () => ensureManagedDirectory(path.join(target, "unexpected"), trusted),
        /not links/
      );
      assert.deepEqual(fs.readdirSync(outside), []);
      assert.throws(
        () => ensureManagedDirectory(path.join(temp, "escape"), trusted),
        /inside DATA_DIR/
      );
      assert.equal(fs.existsSync(path.join(temp, "escape")), false);
    } finally {
      fs.rmSync(temp, { recursive: true, force: true });
    }
  });
}

test("hosted managed suites have dedicated discovery and retain their guard", () => {
  const directory = new URL("../integration/managed-proxy/", import.meta.url);
  const files = fs
    .readdirSync(directory)
    .filter((name) => /^managedProxy.*\.test\.tsx?$/.test(name))
    .sort();
  assert.deepEqual(files, [
    "managedProxyArchive.test.ts",
    "managedProxyAuth.test.tsx",
    "managedProxyConfig.test.ts",
    "managedProxyDeletionDispatch.test.tsx",
    "managedProxyDeletionHandlers.test.tsx",
    "managedProxyLifecycle.test.tsx",
    "managedProxyManager.test.ts",
    "managedProxyRemoval.test.tsx",
    "managedProxyUi.test.tsx",
  ]);
  const runner = fs.readFileSync(
    new URL("../../scripts/test/run-managed-proxy-runtime.mjs", import.meta.url),
    "utf8"
  );
  const config = fs.readFileSync(
    new URL("../../vitest.managed-proxy.config.ts", import.meta.url),
    "utf8"
  );
  const general = fs.readFileSync(new URL("../../vitest.config.ts", import.meta.url), "utf8");
  assert.ok(runner.includes('"vitest.managed-proxy.config.ts"'));
  assert.ok(runner.includes('"tests/integration/managed-proxy"'));
  assert.ok(config.includes('include: ["tests/integration/managed-proxy/managedProxy*.test.tsx"]'));
  assert.ok(!general.includes("tests/integration/managed-proxy"));
  for (const file of files) {
    assert.equal(fs.existsSync(new URL(file, new URL("./", import.meta.url))), false);
    const source = fs.readFileSync(new URL(file, directory), "utf8");
    assert.match(source, /assertManagedFixture\(\)/);
    assert.ok(runner.includes(`"${file}"`));
    for (const match of source.matchAll(/(?:from\s+|import\()["'](\.[^"']+)["']/g)) {
      const imported = new URL(match[1], new URL(file, directory));
      assert.ok(
        ["", ".ts", ".tsx"].some((extension) => fs.existsSync(fileURLToPath(imported) + extension)),
        match[1]
      );
    }
  }
});
