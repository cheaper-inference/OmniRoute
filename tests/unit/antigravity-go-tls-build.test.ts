import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import {
  buildAntigravityGoTlsNative,
  resolveAntigravityGoTlsPaths,
} from "../../scripts/build/build-antigravity-go-tls.mjs";
import {
  APP_STAGING_ALLOWED_EXACT_PATHS,
  PACK_ARTIFACT_ROOT_ALLOWED_EXACT_PATHS,
} from "../../scripts/build/pack-artifact-policy.ts";
import { NATIVE_ASSET_ENTRIES } from "../../scripts/build/assembleStandalone.mjs";

const ROOT = "/repo";
const { nativeDir, outputPath: linuxOut } = resolveAntigravityGoTlsPaths(ROOT, "linux");
const { outputPath: winOut } = resolveAntigravityGoTlsPaths(ROOT, "win32");
const GO_MOD = path.join(nativeDir, "go.mod");
const MAIN_GO = path.join(nativeDir, "main.go");

test("resolveAntigravityGoTlsPaths uses .exe only on win32", () => {
  assert.ok(winOut.endsWith(`${path.sep}build${path.sep}antigravity-go-tls.exe`));
  assert.ok(linuxOut.endsWith(`${path.sep}build${path.sep}antigravity-go-tls`));
});

test("skips gracefully when Go sources are absent", () => {
  let ran = false;
  const res = buildAntigravityGoTlsNative(ROOT, {
    platform: "linux",
    goBinary: "/usr/bin/go",
    run: () => {
      ran = true;
    },
    exists: (p) => p !== GO_MOD,
  });
  assert.equal(res.built, false);
  assert.match(res.reason ?? "", /sources absent|go\.mod/i);
  assert.equal(ran, false);
});

test("skips gracefully when Go toolchain is unavailable", () => {
  let ran = false;
  const res = buildAntigravityGoTlsNative(ROOT, {
    platform: "linux",
    goBinary: null,
    run: () => {
      ran = true;
    },
    exists: (p) => p === GO_MOD || p === MAIN_GO,
  });
  assert.equal(res.built, false);
  assert.match(res.reason ?? "", /go toolchain/i);
  assert.equal(ran, false);
});

test("builds Go sidecar with fixed argv array and no shell interpolation", () => {
  const calls: Array<{ cmd: string; args: string[]; cwd: string }> = [];
  const mkdirCalls: string[] = [];
  const res = buildAntigravityGoTlsNative(ROOT, {
    platform: "linux",
    goBinary: "/usr/local/go/bin/go",
    mkdir: (dir) => mkdirCalls.push(dir),
    run: (cmd, args, cwd) => calls.push({ cmd, args, cwd }),
    exists: (p) => p === GO_MOD || p === MAIN_GO || p === linuxOut,
  });
  assert.equal(res.built, true);
  assert.equal(res.outputPath, linuxOut);
  assert.deepEqual(mkdirCalls, [path.dirname(linuxOut)]);
  assert.deepEqual(calls, [
    {
      cmd: "/usr/local/go/bin/go",
      args: ["build", "-trimpath", "-ldflags=-s -w", "-o", linuxOut, "."],
      cwd: nativeDir,
    },
  ]);
});

test("go build failure is non-fatal (built: false with reason)", () => {
  const res = buildAntigravityGoTlsNative(ROOT, {
    platform: "win32",
    goBinary: "go",
    mkdir: () => {},
    run: () => {
      throw new Error("exit status 2");
    },
    exists: (p) => p === GO_MOD || p === MAIN_GO,
  });
  assert.equal(res.built, false);
  assert.match(res.reason ?? "", /go build failed/i);
});

test("reports built: false when go build finishes without output binary", () => {
  const res = buildAntigravityGoTlsNative(ROOT, {
    platform: "linux",
    goBinary: "go",
    mkdir: () => {},
    run: () => {},
    exists: (p) => p === GO_MOD || p === MAIN_GO,
  });
  assert.equal(res.built, false);
  assert.match(res.reason ?? "", /produced no sidecar binary/i);
});

test("packaging allowlists and standalone native asset entries include Antigravity Go TLS sidecar", () => {
  assert.ok(
    APP_STAGING_ALLOWED_EXACT_PATHS.includes(
      "open-sse/native/antigravity-go-tls/build/antigravity-go-tls"
    )
  );
  assert.ok(
    APP_STAGING_ALLOWED_EXACT_PATHS.includes(
      "open-sse/native/antigravity-go-tls/build/antigravity-go-tls.exe"
    )
  );
  assert.ok(
    PACK_ARTIFACT_ROOT_ALLOWED_EXACT_PATHS.includes("scripts/build/build-antigravity-go-tls.mjs")
  );
  assert.ok(
    NATIVE_ASSET_ENTRIES.some(
      (entry) =>
        entry.src.join("/") === "open-sse/native/antigravity-go-tls/build" &&
        entry.dest.join("/") === "open-sse/native/antigravity-go-tls/build"
    )
  );
  const pkg = JSON.parse(readFileSync(path.join(process.cwd(), "package.json"), "utf8")) as {
    files: string[];
    scripts: Record<string, string>;
  };
  assert.ok(pkg.files.includes("scripts/build/build-antigravity-go-tls.mjs"));
  assert.equal(
    pkg.scripts["build:native:antigravity-go-tls"],
    "node scripts/build/build-antigravity-go-tls.mjs"
  );
});
