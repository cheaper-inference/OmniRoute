// `omniroute sync pull` sent `POST /api/db-backups/exportAll` with a JSON body, but that route
// only exports `GET` and answers with a `.tar.gz` archive — so the command always died with
// `Error: 405` (and, had it ever gotten a 200, `res.json()` would have choked on the gzip).
//
// These tests drive the REAL commander wiring of `registerSync()` with `fetch` stubbed, and
// assert the request the CLI sends matches the route contract (GET, no body, loopback CLI
// credential so `requireOperatorCredential()` accepts it), that the archive is written to disk
// byte-for-byte, and that refusals (403 / 405) end in a clear message + exit code instead of a
// stack trace.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { Command } from "commander";

import { registerSync } from "../../bin/cli/commands/sync.mjs";

const ARCHIVE_BYTES = Buffer.from([0x1f, 0x8b, 0x08, 0x00, 0xde, 0xad, 0xbe, 0xef]);
const CLI_TOKEN = "test-cli-token-sync-pull";

type Captured = { url: string; method: string; body: unknown; headers: Headers };

function archiveResponse(filename = "omniroute-full-backup-2026-10-15T00-00-00.tar.gz") {
  return new Response(ARCHIVE_BYTES, {
    status: 200,
    headers: {
      "Content-Type": "application/gzip",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}

function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function runPull(args: string[], respond: () => Response) {
  const calls: Captured[] = [];
  const exitCodes: number[] = [];
  const stderr: string[] = [];
  const stdout: string[] = [];

  const origFetch = globalThis.fetch;
  const origExit = process.exit;
  const origErr = process.stderr.write.bind(process.stderr);
  const origOut = process.stdout.write.bind(process.stdout);
  const origEnv = {
    base: process.env.OMNIROUTE_BASE_URL,
    token: process.env.OMNIROUTE_CLI_TOKEN,
    key: process.env.OMNIROUTE_API_KEY,
  };

  process.env.OMNIROUTE_BASE_URL = "http://127.0.0.1:20999";
  process.env.OMNIROUTE_CLI_TOKEN = CLI_TOKEN;
  delete process.env.OMNIROUTE_API_KEY;

  globalThis.fetch = (async (url: string, init: RequestInit = {}) => {
    calls.push({
      url: String(url),
      method: String(init.method ?? "GET").toUpperCase(),
      body: init.body,
      headers: new Headers(init.headers),
    });
    return respond();
  }) as typeof fetch;
  process.exit = ((code?: number) => {
    exitCodes.push(code ?? 0);
    throw new Error(`__exit_${code ?? 0}__`);
  }) as typeof process.exit;
  process.stderr.write = ((chunk: string | Uint8Array) => {
    stderr.push(String(chunk));
    return true;
  }) as typeof process.stderr.write;
  process.stdout.write = ((chunk: string | Uint8Array) => {
    stdout.push(String(chunk));
    return true;
  }) as typeof process.stdout.write;

  let thrown: unknown = null;
  try {
    const program = new Command().exitOverride();
    registerSync(program);
    await program.parseAsync(["node", "omniroute", "sync", "pull", ...args]);
  } catch (err) {
    thrown = err;
  } finally {
    globalThis.fetch = origFetch;
    process.exit = origExit;
    process.stderr.write = origErr;
    process.stdout.write = origOut;
    for (const [envKey, value] of [
      ["OMNIROUTE_BASE_URL", origEnv.base],
      ["OMNIROUTE_CLI_TOKEN", origEnv.token],
      ["OMNIROUTE_API_KEY", origEnv.key],
    ] as const) {
      if (value === undefined) delete process.env[envKey];
      else process.env[envKey] = value;
    }
  }

  const err = thrown as Error | null;
  if (err && !/^__exit_\d+__$/.test(err.message)) throw err;
  return { calls, exitCodes, stderr: stderr.join(""), stdout: stdout.join("") };
}

function tempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sync-pull-"));
}

test("sync pull sends GET /api/db-backups/exportAll (the only method the route exports)", async () => {
  const dir = tempDir();
  try {
    const out = path.join(dir, "backup.tar.gz");
    const { calls, exitCodes } = await runPull([out], () => archiveResponse());

    assert.deepEqual(exitCodes, [], "a successful pull must not exit non-zero");
    assert.equal(calls.length, 1);
    const [call] = calls;
    assert.equal(call.method, "GET");
    assert.equal(new URL(call.url).pathname, "/api/db-backups/exportAll");
    assert.equal(call.body, undefined, "GET must not carry a body");
    assert.equal(
      call.headers.get("x-omniroute-cli-token"),
      CLI_TOKEN,
      "the loopback CLI credential must be sent so requireOperatorCredential() accepts it"
    );
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("sync pull writes the archive byte-for-byte to the given path", async () => {
  const dir = tempDir();
  try {
    const out = path.join(dir, "backup.tar.gz");
    const { stdout } = await runPull([out], () => archiveResponse());

    assert.deepEqual(fs.readFileSync(out), ARCHIVE_BYTES);
    assert.match(stdout, /backup\.tar\.gz/);
    if (process.platform !== "win32") {
      assert.equal(fs.statSync(out).mode & 0o077, 0, "the archive holds credentials: owner-only");
    }
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("sync pull without a path saves under the server-provided filename in cwd", async () => {
  const dir = tempDir();
  const origCwd = process.cwd();
  try {
    process.chdir(dir);
    const name = "omniroute-full-backup-2026-10-15T01-02-03.tar.gz";
    const { exitCodes } = await runPull([], () => archiveResponse(name));
    assert.deepEqual(exitCodes, []);
    assert.deepEqual(fs.readFileSync(path.join(dir, name)), ARCHIVE_BYTES);
  } finally {
    process.chdir(origCwd);
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("sync pull ignores a path-traversal filename from the server", async () => {
  const dir = tempDir();
  const origCwd = process.cwd();
  try {
    process.chdir(dir);
    const { exitCodes } = await runPull([], () => archiveResponse("../../evil.tar.gz"));
    assert.deepEqual(exitCodes, []);
    assert.deepEqual(fs.readdirSync(dir), ["evil.tar.gz"], "reduced to a bare name inside cwd");
    assert.equal(fs.existsSync(path.join(dir, "..", "..", "evil.tar.gz")), false);
  } finally {
    process.chdir(origCwd);
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("sync pull falls back to a generated name when the server filename is unusable", async () => {
  const dir = tempDir();
  const origCwd = process.cwd();
  try {
    process.chdir(dir);
    const { exitCodes } = await runPull([], () => archiveResponse(".."));
    assert.deepEqual(exitCodes, []);
    const written = fs.readdirSync(dir);
    assert.equal(written.length, 1);
    assert.match(written[0], /^omniroute-full-backup-.+\.tar\.gz$/);
  } finally {
    process.chdir(origCwd);
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("sync pull refuses to overwrite an existing file", async () => {
  const dir = tempDir();
  try {
    const out = path.join(dir, "backup.tar.gz");
    fs.writeFileSync(out, "keep me");
    const { exitCodes, stderr } = await runPull([out], () => archiveResponse());

    assert.deepEqual(exitCodes, [1]);
    assert.match(stderr, /already exists/);
    assert.equal(fs.readFileSync(out, "utf8"), "keep me");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("sync pull turns a 403 (machine credential) into a clear operator-credential error", async () => {
  const dir = tempDir();
  try {
    const out = path.join(dir, "backup.tar.gz");
    const { exitCodes, stderr } = await runPull([out], () =>
      jsonResponse(403, {
        error: {
          message:
            "Exporting stored credentials requires a signed-in dashboard session or the local CLI; API keys and access tokens cannot download backups.",
        },
      })
    );

    assert.deepEqual(exitCodes, [4], "401/403 map to the CLI auth exit code");
    assert.match(stderr, /HTTP 403/);
    assert.match(stderr, /operator credential/i);
    assert.match(stderr, /local CLI/);
    assert.doesNotMatch(stderr, /\n\s+at /, "no stack trace");
    assert.equal(fs.existsSync(out), false, "nothing is written on refusal");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("sync pull reports a 405/404 as a server that does not serve the export", async () => {
  const dir = tempDir();
  try {
    const out = path.join(dir, "backup.tar.gz");
    const { exitCodes, stderr } = await runPull([out], () => new Response(null, { status: 405 }));

    assert.equal(exitCodes.length, 1);
    assert.notEqual(exitCodes[0], 0);
    assert.match(stderr, /HTTP 405/);
    assert.match(stderr, /does not serve/);
    assert.equal(fs.existsSync(out), false);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
