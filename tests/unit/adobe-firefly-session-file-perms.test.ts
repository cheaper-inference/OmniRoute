import assert from "node:assert/strict";
import test from "node:test";
import { chmodSync, mkdirSync, mkdtempSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import fs from "node:fs";
import { syncBuiltinESMExports } from "node:module";

// Point DATA_DIR at a throwaway tmp dir BEFORE importing the module under test, since
// adobeFireflySession.ts reads process.env.DATA_DIR lazily via dataDir().
const probeDataDir = mkdtempSync(join(tmpdir(), "adobe-firefly-perm-"));
process.env.DATA_DIR = probeDataDir;

test.after(() => {
  try {
    rmSync(probeDataDir, { recursive: true, force: true });
  } catch {
    /* best-effort cleanup */
  }
});

const posixModes = {
  skip:
    process.platform === "win32"
      ? "NTFS does not expose POSIX mode bits; the API mode contract is tested separately"
      : false,
};

test("secure file helpers request restrictive modes on every platform", async (t) => {
  const mkdir = t.mock.method(fs, "mkdirSync", () => undefined);
  const chmod = t.mock.method(fs, "chmodSync", () => undefined);
  const write = t.mock.method(fs, "writeFileSync", () => undefined);
  syncBuiltinESMExports();
  try {
    const { ensureSecureDir, writeSecureFile } =
      await import("../../open-sse/utils/secureFileWrite.ts");
    const dir = join(probeDataDir, "mode-contract");
    const file = join(dir, "probe.json");
    ensureSecureDir(dir);
    writeSecureFile(file, "{}");
    assert.deepEqual(mkdir.mock.calls[0].arguments, [dir, { recursive: true, mode: 0o700 }]);
    assert.deepEqual(
      chmod.mock.calls[0].arguments,
      [dir, 0o700],
      "existing directories must also be tightened"
    );
    assert.deepEqual(write.mock.calls[0].arguments, [
      file,
      "{}",
      { encoding: "utf8", mode: 0o600 },
    ]);
  } finally {
    t.mock.restoreAll();
    syncBuiltinESMExports();
  }
});

test(
  "Adobe Firefly session dir/file are created with restrictive permissions (0700/0600)",
  posixModes,
  async () => {
    const { markAdobeFireflyArpSuccess, fingerprintAdobeCredential } =
      await import("../../open-sse/services/adobeFireflySession.ts");

    const fp = fingerprintAdobeCredential("probe-credential-blob");

    // Triggers sessionFilePath() -> ensureSecureDir(dir) with no cached session and no
    // pre-existing file on disk (mirrors first-touch creation of the adobe-firefly-sessions
    // directory in production).
    markAdobeFireflyArpSuccess(fp, "arp-probe-1");

    const sessionDir = join(probeDataDir, "adobe-firefly-sessions");
    const dirMode = statSync(sessionDir).mode & 0o777;

    assert.equal(
      dirMode & 0o077,
      0,
      `expected adobe-firefly-sessions dir to be 0700 (no group/other access), got mode ${dirMode.toString(8)}`
    );
  }
);

test(
  "ensureSecureDir tightens an already-existing looser directory to 0700",
  posixModes,
  async () => {
    const { ensureSecureDir } = await import("../../open-sse/utils/secureFileWrite.ts");
    const dir = join(probeDataDir, "already-loose-dir");
    mkdirSync(dir, { recursive: true, mode: 0o777 });
    chmodSync(dir, 0o777);

    ensureSecureDir(dir);

    const dirMode = statSync(dir).mode & 0o777;
    assert.equal(
      dirMode & 0o077,
      0,
      `expected already-loose-dir to be tightened to 0700, got mode ${dirMode.toString(8)}`
    );
  }
);

test("writeSecureFile writes files with 0600 permissions", posixModes, async () => {
  const { writeSecureFile, ensureSecureDir } =
    await import("../../open-sse/utils/secureFileWrite.ts");
  const dir = join(probeDataDir, "secure-file-write-probe");
  ensureSecureDir(dir);
  const filePath = join(dir, "probe.json");
  writeSecureFile(filePath, JSON.stringify({ hello: "world" }));

  const fileMode = statSync(filePath).mode & 0o777;
  assert.equal(
    fileMode & 0o177,
    0,
    `expected probe.json to be 0600 (no group/other access), got mode ${fileMode.toString(8)}`
  );
});
