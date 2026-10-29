// `omniroute sync push|diff|resolve|bundle|initialize` were written against an API the server
// never had:
//   - push sent `{parts, dryRun, target}` to POST /api/sync/cloud, whose schema only accepts
//     `{action: "enable"|"sync"|"disable"}` → always 400.
//   - diff / resolve called GET /api/sync/cloud?op=diff|conflicts; the route ignores `op` and
//     answers with the cloud status, so they printed a status (or did nothing) silently.
//   - bundle sent `--include` as `?parts=` (ignored) and authenticated with the API key, while
//     GET /api/sync/bundle only accepts a sync token.
//   - initialize --from-cloud sent a flag POST /api/sync/initialize never reads.
//
// These tests drive the REAL commander wiring of `registerSync()` with `fetch` stubbed and assert
// that every request matches the route contract, and that subcommands/flags with no server
// capability behind them are gone instead of faking output.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { Command } from "commander";

import { registerSync } from "../../bin/cli/commands/sync.mjs";

const CLI_TOKEN = "test-cli-token-sync-subcommands";
const SYNC_TOKEN = "osync_test_token_value";

type Captured = { url: string; method: string; body: unknown; headers: Headers };
type RunResult = {
  calls: Captured[];
  exitCodes: number[];
  stderr: string;
  stdout: string;
  commanderCode: string | null;
};

function jsonResponse(status: number, body: unknown, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

const ENV_KEYS = [
  "OMNIROUTE_BASE_URL",
  "OMNIROUTE_CLI_TOKEN",
  "OMNIROUTE_API_KEY",
  "OMNIROUTE_SYNC_TOKEN",
] as const;

async function runSync(
  args: string[],
  respond: () => Response,
  env: Partial<Record<(typeof ENV_KEYS)[number], string>> = {}
): Promise<RunResult> {
  const calls: Captured[] = [];
  const exitCodes: number[] = [];
  const stderr: string[] = [];
  const stdout: string[] = [];

  const origFetch = globalThis.fetch;
  const origExit = process.exit;
  const origErr = process.stderr.write.bind(process.stderr);
  const origOut = process.stdout.write.bind(process.stdout);
  const origEnv = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]));

  for (const k of ENV_KEYS) delete process.env[k];
  process.env.OMNIROUTE_BASE_URL = "http://127.0.0.1:20999";
  process.env.OMNIROUTE_CLI_TOKEN = CLI_TOKEN;
  Object.assign(process.env, env);

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
  // The CLI writes strings; the test runner's child reports its events to stdout as binary
  // chunks, so only strings are captured and everything else is passed through untouched.
  process.stderr.write = ((chunk: string | Uint8Array, ...rest: unknown[]) => {
    if (typeof chunk !== "string") return (origErr as (...a: unknown[]) => boolean)(chunk, ...rest);
    stderr.push(chunk);
    return true;
  }) as typeof process.stderr.write;
  process.stdout.write = ((chunk: string | Uint8Array, ...rest: unknown[]) => {
    if (typeof chunk !== "string") return (origOut as (...a: unknown[]) => boolean)(chunk, ...rest);
    stdout.push(chunk);
    return true;
  }) as typeof process.stdout.write;

  let thrown: unknown = null;
  try {
    const program = new Command().exitOverride();
    program.option("--output <format>");
    registerSync(program);
    await program.parseAsync(["node", "omniroute", "--output", "json", "sync", ...args]);
  } catch (err) {
    thrown = err;
  } finally {
    globalThis.fetch = origFetch;
    process.exit = origExit;
    process.stderr.write = origErr;
    process.stdout.write = origOut;
    for (const k of ENV_KEYS) {
      if (origEnv[k] === undefined) delete process.env[k];
      else process.env[k] = origEnv[k];
    }
  }

  const err = thrown as (Error & { code?: string }) | null;
  let commanderCode: string | null = null;
  if (err) {
    if (typeof err.code === "string" && err.code.startsWith("commander.")) commanderCode = err.code;
    else if (!/^__exit_\d+__$/.test(err.message)) throw err;
  }
  return { calls, exitCodes, stderr: stderr.join(""), stdout: stdout.join(""), commanderCode };
}

function tempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sync-subcmd-"));
}

// ── sync push ─────────────────────────────────────────────────────────────────────────

test("sync push sends POST /api/sync/cloud with {action: 'sync'} — the only body the schema accepts", async () => {
  const { calls, exitCodes, stdout } = await runSync(["push"], () =>
    jsonResponse(200, { success: true, message: "Synced" })
  );

  assert.deepEqual(exitCodes, []);
  assert.equal(calls.length, 1);
  const [call] = calls;
  assert.equal(call.method, "POST");
  assert.equal(new URL(call.url).pathname, "/api/sync/cloud");
  assert.deepEqual(JSON.parse(String(call.body)), { action: "sync" });
  assert.equal(call.headers.get("x-omniroute-cli-token"), CLI_TOKEN);
  assert.match(stdout, /"success": true/);
});

test("sync push no longer accepts the never-supported --target/--bundle/--dry-run options", async () => {
  for (const flag of [["--dry-run"], ["--target", "cloud"], ["--bundle", "settings"]]) {
    const { calls, commanderCode } = await runSync(["push", ...flag], () => jsonResponse(200, {}));
    assert.equal(commanderCode, "commander.unknownOption", `${flag[0]} must be rejected`);
    assert.equal(calls.length, 0, `${flag[0]} must not reach the server`);
  }
});

test("sync push surfaces 'Cloud sync is disabled' (502) once, with a hint, without retrying", async () => {
  const { calls, exitCodes, stderr } = await runSync(["push"], () =>
    jsonResponse(502, { error: "Cloud sync is disabled" })
  );

  assert.equal(calls.length, 1, "a non-idempotent sync must not be retried");
  assert.deepEqual(exitCodes, [1]);
  assert.match(stderr, /HTTP 502/);
  assert.match(stderr, /Cloud sync is disabled/);
  assert.match(stderr, /enable cloud sync/i);
  assert.doesNotMatch(stderr, /\n\s+at /, "no stack trace");
});

test("sync push explains the credential the route needs on 401", async () => {
  const { exitCodes, stderr } = await runSync(["push"], () =>
    jsonResponse(401, { error: "Unauthorized" })
  );

  assert.deepEqual(exitCodes, [4], "401/403 map to the CLI auth exit code");
  assert.match(stderr, /HTTP 401/);
  assert.match(stderr, /manage/);
  assert.doesNotMatch(stderr, /\n\s+at /);
});

// ── sync diff / sync resolve ──────────────────────────────────────────────────────────

for (const sub of ["diff", "resolve"]) {
  test(`sync ${sub} is removed: no server route computes it, so it must not fake output`, async () => {
    const { calls, commanderCode, stdout } = await runSync([sub], () =>
      jsonResponse(200, { enabled: false })
    );
    assert.equal(commanderCode, "commander.unknownCommand");
    assert.equal(calls.length, 0, "must not call /api/sync/cloud and print its status");
    assert.equal(stdout, "");
  });
}

// ── sync bundle ───────────────────────────────────────────────────────────────────────

const BUNDLE_ENVELOPE = { version: "v-abc123", bundle: { settings: { theme: "dark" } } };

test("sync bundle sends GET /api/sync/bundle with the sync token and writes the JSON envelope", async () => {
  const dir = tempDir();
  try {
    const out = path.join(dir, "bundle.json");
    const { calls, exitCodes, stdout } = await runSync(["bundle", out, "--token", SYNC_TOKEN], () =>
      jsonResponse(200, BUNDLE_ENVELOPE, { etag: '"v-abc123"' })
    );

    assert.deepEqual(exitCodes, []);
    assert.equal(calls.length, 1);
    const [call] = calls;
    assert.equal(call.method, "GET");
    const url = new URL(call.url);
    assert.equal(url.pathname, "/api/sync/bundle");
    assert.equal(url.search, "", "the route reads no query parameters (no ?parts=)");
    assert.equal(call.headers.get("x-sync-token"), SYNC_TOKEN);

    assert.deepEqual(JSON.parse(fs.readFileSync(out, "utf8")), BUNDLE_ENVELOPE);
    assert.match(stdout, /v-abc123/);
    if (process.platform !== "win32") {
      assert.equal(fs.statSync(out).mode & 0o077, 0, "the bundle holds credentials: owner-only");
    }
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("sync bundle reads the sync token from OMNIROUTE_SYNC_TOKEN", async () => {
  const dir = tempDir();
  try {
    const out = path.join(dir, "bundle.json");
    const { calls, exitCodes } = await runSync(
      ["bundle", out],
      () => jsonResponse(200, BUNDLE_ENVELOPE),
      { OMNIROUTE_SYNC_TOKEN: SYNC_TOKEN }
    );
    assert.deepEqual(exitCodes, []);
    assert.equal(calls[0].headers.get("x-sync-token"), SYNC_TOKEN);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("sync bundle without a sync token fails before any request, pointing at `sync tokens create`", async () => {
  const dir = tempDir();
  try {
    const out = path.join(dir, "bundle.json");
    const { calls, exitCodes, stderr } = await runSync(["bundle", out], () =>
      jsonResponse(200, BUNDLE_ENVELOPE)
    );
    assert.equal(calls.length, 0);
    assert.deepEqual(exitCodes, [2]);
    assert.match(stderr, /sync token/i);
    assert.match(stderr, /sync tokens create/);
    assert.equal(fs.existsSync(out), false);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("sync bundle explains a 401 (invalid sync token) without a stack trace", async () => {
  const dir = tempDir();
  try {
    const out = path.join(dir, "bundle.json");
    const { exitCodes, stderr } = await runSync(["bundle", out, "--token", "bad"], () =>
      jsonResponse(401, { error: { message: "Invalid sync token" } })
    );
    assert.deepEqual(exitCodes, [4]);
    assert.match(stderr, /HTTP 401/);
    assert.match(stderr, /Invalid sync token/);
    assert.match(stderr, /sync tokens create/);
    assert.doesNotMatch(stderr, /\n\s+at /);
    assert.equal(fs.existsSync(out), false);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("sync bundle rejects a non-JSON 200 without writing anything", async () => {
  const dir = tempDir();
  try {
    const out = path.join(dir, "bundle.json");
    const { exitCodes, stderr } = await runSync(
      ["bundle", out, "--token", SYNC_TOKEN],
      () => new Response("<html>proxy page</html>", { status: 200 })
    );
    assert.deepEqual(exitCodes, [1]);
    assert.match(stderr, /did not return a JSON bundle/);
    assert.equal(fs.existsSync(out), false);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("sync bundle refuses to overwrite an existing file", async () => {
  const dir = tempDir();
  try {
    const out = path.join(dir, "bundle.json");
    fs.writeFileSync(out, "keep me");
    const { exitCodes, stderr } = await runSync(["bundle", out, "--token", SYNC_TOKEN], () =>
      jsonResponse(200, BUNDLE_ENVELOPE)
    );
    assert.deepEqual(exitCodes, [1]);
    assert.match(stderr, /already exists/);
    assert.equal(fs.readFileSync(out, "utf8"), "keep me");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("sync bundle no longer accepts --include (the route always returns the full bundle)", async () => {
  const { calls, commanderCode } = await runSync(
    ["bundle", "x.json", "--token", SYNC_TOKEN, "--include", "settings"],
    () => jsonResponse(200, BUNDLE_ENVELOPE)
  );
  assert.equal(commanderCode, "commander.unknownOption");
  assert.equal(calls.length, 0);
});

// ── sync initialize ───────────────────────────────────────────────────────────────────

test("sync initialize sends POST /api/sync/initialize without the ignored fromCloud flag", async () => {
  const { calls, exitCodes, stdout } = await runSync(["initialize"], () =>
    jsonResponse(200, { success: true, message: "Cloud sync initialized successfully" })
  );
  assert.deepEqual(exitCodes, []);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].method, "POST");
  assert.equal(new URL(calls[0].url).pathname, "/api/sync/initialize");
  assert.equal(calls[0].body, undefined, "the route reads no request body");
  assert.match(stdout, /initialized successfully/);
});

test("sync initialize no longer accepts --from-cloud", async () => {
  const { calls, commanderCode } = await runSync(["initialize", "--from-cloud"], () =>
    jsonResponse(200, {})
  );
  assert.equal(commanderCode, "commander.unknownOption");
  assert.equal(calls.length, 0);
});

test("sync initialize reports a failure with its HTTP status and exit code", async () => {
  const { exitCodes, stderr } = await runSync(["initialize"], () =>
    jsonResponse(500, { error: "Failed to initialize cloud sync" })
  );
  assert.deepEqual(exitCodes, [1]);
  assert.match(stderr, /HTTP 500/);
  assert.match(stderr, /Failed to initialize cloud sync/);
});
