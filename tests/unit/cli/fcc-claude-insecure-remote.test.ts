// CodeRabbit I4 (CWE-319): fcc-claude sent the resolved bearer key to a plain-HTTP
// remote (GET /v1/models for the context window, POST /v1/messages in --test mode)
// before it even looked for the claude binary. A credential-bearing, non-loopback
// http:// target is now refused unless OMNIROUTE_ALLOW_INSECURE_REMOTE=1 opts in.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const { runFccClaude } = await import("../../../bin/cli/commands/fcc-claude.mjs");

const SECRET = "sk-fcc-insecure-remote-private";
const ORIGINAL = {
  fetch: globalThis.fetch,
  error: console.error,
  exit: process.exit,
  path: process.env.PATH,
  optIn: process.env.OMNIROUTE_ALLOW_INSECURE_REMOTE,
};

// A stand-in claude binary, so a launch that is not refused never runs the real one.
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-fcc-insecure-"));
fs.mkdirSync(path.join(TMP, "bin"));
fs.writeFileSync(path.join(TMP, "bin", "claude"), "#!/bin/sh\nexit 0\n", { mode: 0o755 });
process.env.PATH = `${path.join(TMP, "bin")}${path.delimiter}${ORIGINAL.path}`;
// runFccClaude ends the process when claude exits; never let a test do that.
process.exit = (() => undefined) as unknown as typeof process.exit;
test.after(() => {
  process.env.PATH = ORIGINAL.path;
  process.exit = ORIGINAL.exit;
  fs.rmSync(TMP, { recursive: true, force: true });
});

type Call = { url: string; authorization: string | null };

async function run(opts: Record<string, unknown>, claudeArgs: string[] = []) {
  const calls: Call[] = [];
  const stderr: string[] = [];
  globalThis.fetch = (async (url: string, init?: RequestInit) => {
    const headers = new Headers(init?.headers);
    calls.push({ url: String(url), authorization: headers.get("authorization") });
    if (String(url).endsWith("/v1/messages")) {
      return new Response('event: message_stop\ndata: {"type":"message_stop"}\n\n', {
        status: 200,
      });
    }
    return new Response("{}", { status: 200 });
  }) as typeof fetch;
  console.error = (...args: unknown[]) => stderr.push(args.map(String).join(" "));
  const writeOut = process.stdout.write;
  process.stdout.write = (() => true) as typeof process.stdout.write;
  try {
    const code = await runFccClaude(opts, claudeArgs);
    return { code, calls, stderr: stderr.join("\n") };
  } finally {
    process.stdout.write = writeOut;
    globalThis.fetch = ORIGINAL.fetch;
    console.error = ORIGINAL.error;
  }
}

function withOptIn(value: string | undefined) {
  if (value === undefined) delete process.env.OMNIROUTE_ALLOW_INSECURE_REMOTE;
  else process.env.OMNIROUTE_ALLOW_INSECURE_REMOTE = value;
}

test.afterEach(() => withOptIn(ORIGINAL.optIn));

test("fcc-claude refuses to send a credential to a plain-HTTP LAN remote", async () => {
  withOptIn(undefined);
  const { code, calls, stderr } = await run(
    { remote: "http://192.168.0.15:20128", token: SECRET },
    ["--model", "glm/glm-5.2"]
  );
  assert.equal(code, 1);
  assert.deepEqual(
    calls.filter((c) => c.authorization),
    [],
    "no request may carry the key over plain HTTP"
  );
  assert.deepEqual(calls, [], "the refusal happens before any request");
  assert.match(stderr, /OMNIROUTE_ALLOW_INSECURE_REMOTE=1/);
  assert.match(stderr, /http:\/\/192\.168\.0\.15:20128/);
  assert.ok(!stderr.includes(SECRET), "the key is never printed");
});

test("fcc-claude --test refuses a plain-HTTP remote with a credential too", async () => {
  withOptIn(undefined);
  const { code, calls, stderr } = await run({
    remote: "http://omni.lan.example:20128",
    token: SECRET,
    test: "hi",
    models: ["auto/fast"],
  });
  assert.equal(code, 1);
  assert.deepEqual(calls, []);
  assert.match(stderr, /OMNIROUTE_ALLOW_INSECURE_REMOTE=1/);
  assert.ok(!stderr.includes(SECRET));
});

test("the refusal names the origin without any userinfo from the URL", async () => {
  withOptIn(undefined);
  const { code, stderr } = await run({
    remote: "http://user:urlpass@192.168.0.15:20128",
    token: SECRET,
    test: "hi",
    models: ["auto/fast"],
  });
  assert.equal(code, 1);
  assert.ok(!stderr.includes("urlpass"), stderr);
  assert.ok(!stderr.includes(SECRET), stderr);
});

test("OMNIROUTE_ALLOW_INSECURE_REMOTE=1 lets an operator use a trusted plain-HTTP LAN remote", async () => {
  withOptIn("1");
  const { code, calls } = await run({
    remote: "http://192.168.0.15:20128",
    token: SECRET,
    test: "hi",
    models: ["auto/fast"],
  });
  assert.equal(code, 0);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "http://192.168.0.15:20128/v1/messages");
  assert.equal(calls[0].authorization, `Bearer ${SECRET}`);
});

test("loopback http, https remotes and credential-less http remotes are not refused", async () => {
  withOptIn(undefined);
  for (const [remote, token] of [
    ["http://localhost:20128", SECRET],
    ["http://127.0.0.1:20128", SECRET],
    ["http://[::1]:20128", SECRET],
    ["https://omni.example.test", SECRET],
    ["http://192.168.0.15:20128", undefined],
  ] as const) {
    const { code, calls } = await run({ remote, token, test: "hi", models: ["auto/fast"] });
    assert.equal(code, 0, `${remote} with${token ? "" : "out"} a token`);
    assert.equal(calls.length, 1, remote);
  }
});

test("a working-directory .env cannot opt in to insecure remotes", async () => {
  const { isAllowedFromCwdEnv } = await import("../../../bin/cli/utils/untrustedCwdEnv.mjs");
  assert.equal(isAllowedFromCwdEnv("OMNIROUTE_ALLOW_INSECURE_REMOTE", "1"), false);
});
