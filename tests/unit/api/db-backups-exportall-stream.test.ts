// GET /api/db-backups/exportAll — the archive must stream, not buffer.
//
// The route used to run `tar` through execFileSync and then readFileSync the
// whole archive, so a full export froze the event loop (tar up to its 30s
// timeout) and sized the response buffer at the whole backup. The archive is
// now produced by an async `execFile` and streamed from disk.
import test, { before, after, mock } from "node:test";
import assert from "node:assert/strict";
import childProcess from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { syncBuiltinESMExports } from "node:module";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-exportall-stream-"));
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  INITIAL_PASSWORD: process.env.INITIAL_PASSWORD,
};

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "exportall-stream-api-key-secret";
delete process.env.INITIAL_PASSWORD;

// Static imports cannot work here: DATA_DIR must point at the temp directory
// before src/lib/db/* resolves its storage paths at module load.
const core = await import("../../../src/lib/db/core.ts");
const settings = await import("../../../src/lib/db/settings.ts");
const route = await import("../../../src/app/api/db-backups/exportAll/route.ts");

const ORIGINAL_TMPDIR = os.tmpdir;
let workRoot: string;
let calls: { args: string[]; options: { cwd: string; timeout: number } }[] = [];

/** Fake `tar`: write the archive the route expects, then invoke the callback. */
function stubTar(): void {
  mock.method(
    childProcess,
    "execFile",
    (
      _command: string,
      args: string[],
      options: { cwd: string; timeout: number },
      callback: (error: Error | null, stdout?: string, stderr?: string) => void
    ) => {
      calls.push({ args, options });
      fs.writeFileSync(path.resolve(options.cwd, args[1]), "archive bytes");
      callback(null, "", "");
    }
  );
  syncBuiltinESMExports();
}

before(async () => {
  workRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-exportall-work-"));
  // Every mkdtemp the route makes lands under workRoot, so the assertions can
  // see what the cleanup left behind.
  os.tmpdir = () => workRoot;
  core.resetDbInstance();
  core.getDbInstance();
  // Fresh isolated DB: disarms requireOperatorCredential (cf. isAuthRequired).
  await settings.updateSettings({ requireLogin: false });
});

after(() => {
  os.tmpdir = ORIGINAL_TMPDIR;
  core.resetDbInstance();
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.rmSync(workRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("the archive is produced asynchronously and streamed to the response", async () => {
  calls = [];
  stubTar();

  try {
    const response = await route.GET(new Request("http://localhost/api/db-backups/exportAll"));
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), "application/gzip");
    assert.equal(await response.text(), "archive bytes");
  } finally {
    mock.restoreAll();
    syncBuiltinESMExports();
  }

  assert.equal(calls.length, 1, "tar must run exactly once");
  const call = calls[0];
  assert.ok(call, "tar must have been invoked");
  assert.equal(call.args[0], "-czf");
  assert.equal(
    path.isAbsolute(call.args[1]),
    false,
    "a relative archive name keeps GNU tar from treating the path as remote"
  );
  assert.equal(call.options.timeout, 30000);
  assert.deepEqual(
    fs.readdirSync(workRoot),
    [],
    "the work directory is removed once the response consumed the archive"
  );
});

/**
 * Fake `tar` writing an archive far larger than the stream buffer, so the read
 * stream cannot drain on its own: only an explicit teardown can release it.
 */
function stubLargeTar(onArchiveWritten: () => void): void {
  mock.method(
    childProcess,
    "execFile",
    (
      _command: string,
      args: string[],
      options: { cwd: string; timeout: number },
      callback: (error: Error | null, stdout?: string, stderr?: string) => void
    ) => {
      fs.writeFileSync(path.resolve(options.cwd, args[1]), Buffer.alloc(8 * 1024 * 1024));
      onArchiveWritten();
      callback(null, "", "");
    }
  );
  syncBuiltinESMExports();
}

/** Record whether the archive descriptor was released before the work directory went away. */
function traceTeardownOrder(): string[] {
  const events: string[] = [];
  const realClose = fs.close;
  const realRmSync = fs.rmSync;
  mock.method(fs, "close", (fd: number, callback: (error: Error | null) => void) => {
    realClose(fd, (error) => {
      events.push("fd-closed");
      callback(error);
    });
  });
  mock.method(fs, "rmSync", (target: fs.PathLike, options?: fs.RmOptions) => {
    if (String(target).startsWith(workRoot)) events.push("work-dir-removed");
    realRmSync(target, options);
  });
  return events;
}

async function waitForEmptyWorkRoot(): Promise<void> {
  const deadline = Date.now() + 2000;
  while (fs.readdirSync(workRoot).length > 0 && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
}

// Next's pipeToNodeResponse returns without reading or cancelling the body when
// the client is already gone, so these responses are deliberately never consumed.
for (const moment of ["while tar is running", "after the response is built"]) {
  test(`a client that disconnects ${moment} leaves no database copy behind`, async () => {
    const client = new AbortController();
    stubLargeTar(() => {
      if (moment === "while tar is running") client.abort();
    });
    const events = traceTeardownOrder();

    try {
      const response = await route.GET(
        new Request("http://localhost/api/db-backups/exportAll", { signal: client.signal })
      );
      assert.equal(response.status, 200);
      client.abort();
      await waitForEmptyWorkRoot();
    } finally {
      mock.restoreAll();
      syncBuiltinESMExports();
    }

    assert.deepEqual(fs.readdirSync(workRoot), [], "the work directory must not outlive the abort");
    assert.deepEqual(
      events,
      ["fd-closed", "work-dir-removed"],
      "the descriptor is released before the directory is removed"
    );
  });
}
