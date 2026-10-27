import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import childProcess from "node:child_process";
import { syncBuiltinESMExports } from "node:module";

const fixture = fs.mkdtempSync(path.join(os.tmpdir(), "backup-16527-"));
const exportTemp = path.join(fixture, "export-temp");
process.env.DATA_DIR = path.join(fixture, "data");
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const core = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const route = await import("../../src/app/api/db-backups/exportAll/route.ts");
const realExec = childProcess.execFileSync;

function request() {
  return new Request("http://localhost/api/db-backups/exportAll");
}

function mockTar(context, implementation) {
  context.mock.method(childProcess, "execFileSync", implementation);
  syncBuiltinESMExports();
}

function outputPath(args, options) {
  return path.resolve(options?.cwd || process.cwd(), args[1]);
}

test.beforeEach(async () => {
  fs.mkdirSync(exportTemp, { recursive: true });
  await updateSettings({ requireLogin: false });
});
test.afterEach(() => {
  test.mock.restoreAll();
  childProcess.execFileSync = realExec;
  syncBuiltinESMExports();
  fs.rmSync(exportTemp, { recursive: true, force: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(fixture, { recursive: true, force: true });
});

test("backup tar receives a relative archive filename and an explicit working directory", async (t) => {
  t.mock.method(os, "tmpdir", () => exportTemp);
  let invocation;
  mockTar(t, (command, args, options) => {
    invocation = { command, args, options };
    fs.writeFileSync(outputPath(args, options), "archive bytes");
    return Buffer.alloc(0);
  });
  const response = await route.GET(request());
  assert.equal(response.status, 200);
  assert.equal(await response.text(), "archive bytes");
  assert.equal(invocation.command, "tar");
  assert.equal(path.isAbsolute(invocation.args[1]), false, "archive argument must be relative");
  assert.equal(invocation.args[1].includes(":"), false);
  assert.ok(path.isAbsolute(invocation.options.cwd));
  assert.equal(invocation.options.timeout, 30000);
  assert.deepEqual(fs.readdirSync(exportTemp), [], "success removes archive and staging files");
});

for (const failure of ["exit", "timeout"]) {
  test(`backup removes a partial archive after tar ${failure}`, async (t) => {
    t.mock.method(os, "tmpdir", () => exportTemp);
    t.mock.method(console, "error", () => {});
    let archivePath;
    mockTar(t, (_command, args, options) => {
      archivePath = outputPath(args, options);
      fs.writeFileSync(archivePath, "partial sensitive backup");
      throw Object.assign(new Error(`tar ${failure}\n    at /private/export.ts:1:1`), {
        code: failure === "timeout" ? "ETIMEDOUT" : "ENOENT",
      });
    });
    const response = await route.GET(request());
    assert.equal(response.status, 500);
    const body = await response.json();
    assert.equal(body.error, "Failed to create full export");
    assert.equal(body.details.includes("at /"), false);
    assert.ok(archivePath);
    assert.equal(fs.existsSync(archivePath), false, "partial archive must not survive failure");
    assert.deepEqual(fs.readdirSync(exportTemp), []);
  });
}

test(
  "real tar exports from a temporary path containing a colon",
  {
    skip: process.platform !== "linux" ? "Linux GNU tar portability repro" : false,
  },
  async (t) => {
    // GNU tar interprets ':' as remote syntax only BEFORE the first slash.
    // A relative Linux directory reproduces that Windows-drive argument shape.
    const colonTemp = "C:temporary-files";
    const previousCwd = process.cwd();
    fs.mkdirSync(path.join(fixture, colonTemp));
    t.mock.method(os, "tmpdir", () => colonTemp);
    t.mock.method(console, "error", () => {});
    try {
      process.chdir(fixture);
      const response = await route.GET(request());
      assert.equal(response.status, 200, "GNU tar must not parse the colon as a remote archive");
      const archive = path.join(fixture, "download.tar.gz");
      fs.writeFileSync(archive, Buffer.from(await response.arrayBuffer()));
      const listing = realExec("tar", ["-tzf", path.basename(archive)], {
        cwd: fixture,
        encoding: "utf8",
      });
      assert.match(listing, /storage\.sqlite/);
      assert.match(listing, /metadata\.json/);
      assert.match(listing, /reasoning-routing-rules\.json/);
      assert.deepEqual(fs.readdirSync(colonTemp), []);
    } finally {
      process.chdir(previousCwd);
    }
  }
);

test("unauthenticated backup requests never invoke tar", async (t) => {
  await updateSettings({ requireLogin: true, password: "test-password-hash" });
  let calls = 0;
  mockTar(t, () => {
    calls += 1;
    return Buffer.alloc(0);
  });
  const response = await route.GET(request());
  assert.equal(response.status, 401);
  assert.equal(calls, 0);
});
