/**
 * The opt-in ACP branch inside `AntigravityExecutor`.
 *
 * This is the seam the anti-ban path actually turns on: the real executor class,
 * the real transport, and a fake `agy` process — no HTTP request is made, so a
 * green run proves the whole chain from `execute()` to a translated reply works
 * without a token. The HTTP path is asserted to stay the default in the same
 * file, because "opt-in" is the entire safety property here.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

/** A fake agy that answers one prompt with fixed text over ACP. */
const FAKE_AGY = `import readline from "node:readline";
const write = (message) => process.stdout.write(JSON.stringify(message) + "\\n");
const reply = (id, result) => write({ jsonrpc: "2.0", id, result });
const chunk = (sessionId, text) => write({
  jsonrpc: "2.0",
  method: "session/update",
  params: { sessionId, update: { sessionUpdate: "agent_message_chunk", content: { type: "text", text } } },
});
const sessionId = "session-exec";
const rl = readline.createInterface({ input: process.stdin });
rl.on("line", (line) => {
  let message;
  try { message = JSON.parse(line); } catch { return; }
  if (message.method === "initialize") {
    reply(message.id, {
      protocolVersion: 1,
      agentCapabilities: { sessionCapabilities: { resume: {} } },
      agentInfo: { name: "fake-agy", version: "1.5.9" },
    });
    return;
  }
  if (message.method === "session/new" || message.method === "session/resume") {
    reply(message.id, { sessionId, models: { currentModelId: "gemini-3-pro" }, configOptions: [] });
    return;
  }
  if (message.method === "session/prompt") {
    chunk(sessionId, "the file says hi");
    reply(message.id, { stopReason: "end_turn" });
    return;
  }
  if (!message.method) return;
  reply(message.id, {});
});
`;

function installFakeAgy(): { path: string; cleanup: () => void } {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "agy-exec-"));
  const file = path.join(dir, "agy.mjs");
  fs.writeFileSync(file, FAKE_AGY);
  // A `.cmd` launcher only exists on Windows; elsewhere it is a shell script, so
  // the same test proves the transport on a POSIX CI runner too.
  const launcher = path.join(dir, process.platform === "win32" ? "agy.cmd" : "agy");
  if (process.platform === "win32") {
    fs.writeFileSync(launcher, `@echo off\r\n"${process.execPath}" "${file}" %*\r\n`);
  } else {
    fs.writeFileSync(launcher, `#!/bin/sh\nexec "${process.execPath}" "${file}" "$@"\n`, {
      mode: 0o700,
    });
  }
  return {
    path: launcher,
    cleanup: () => fs.rmSync(dir, { recursive: true, force: true }),
  };
}

/** Run `body` with the environment the transport reads, restored afterwards. */
async function withEnv(
  values: Record<string, string | undefined>,
  body: () => Promise<void>
): Promise<void> {
  const saved = new Map<string, string | undefined>();
  for (const [key, value] of Object.entries(values)) {
    saved.set(key, process.env[key]);
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  try {
    await body();
  } finally {
    for (const [key, value] of saved) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

const userMessage = (text: string) => ({
  request: {
    contents: [{ role: "user", parts: [{ text }] }],
    systemInstruction: { role: "system", parts: [{ text: "be brief" }] },
  },
});

const credentials = (extra: Record<string, unknown> = {}) =>
  ({
    accessToken: "token",
    connectionId: "conn-exec",
    ...extra,
  }) as Parameters<
    typeof import("../../open-sse/executors/antigravity.ts").AntigravityExecutor.prototype.execute
  >[0]["credentials"];

test("Antigravity stays on HTTP unless ACP is opted into", async () => {
  const { resolveAgyTransport } = await import("../../open-sse/executors/agyCliExecutor.ts");
  await withEnv({ AGY_CLI_TRANSPORT: undefined }, async () => {
    assert.equal(resolveAgyTransport(credentials()), "http", "the default must not need agy");
  });
});

test("an ACP request is answered from agy without any HTTP call", async () => {
  const fake = installFakeAgy();
  const workDir = fs.mkdtempSync(path.join(os.tmpdir(), "agy-exec-work-"));
  const savedLocal = process.env.LOCALAPPDATA;
  const savedProfile = process.env.USERPROFILE;
  const savedHome = process.env.HOME;
  try {
    // Never let this fall through to a real agy install on the machine.
    process.env.LOCALAPPDATA = workDir;
    process.env.USERPROFILE = workDir;
    process.env.HOME = workDir;
    // The transport resolves the binary through its own lookup, so point that
    // at the fake by name.
    await withEnv(
      { AGY_CLI_TRANSPORT: "acp", AGY_PATH: fake.path, AGY_BRIDGE_START_TIMEOUT_MS: "10000" },
      async () => {
        const { AntigravityExecutor } = await import("../../open-sse/executors/antigravity.ts");
        const acp = await import("../../open-sse/services/agyCliAcp.ts");
        const executor = new AntigravityExecutor();
        try {
          const result = await executor.execute({
            model: "gemini-3-pro",
            body: userMessage("what does a.txt say?"),
            stream: true,
            credentials: credentials(),
          });
          const response = "response" in result ? result.response : result;
          assert.equal(response.status, 200);
          assert.match(response.headers.get("content-type") || "", /text\/event-stream/);
          const body = await response.text();
          assert.match(body, /the file says hi/, "agy's reply reaches the caller");
          assert.match(body, /data: \[DONE\]/, "the stream is terminated");
          assert.equal("transport" in result ? result.transport : null, "agy-cli");
        } finally {
          await acp.shutdownAgyPool();
        }
      }
    );
  } finally {
    if (savedLocal === undefined) delete process.env.LOCALAPPDATA;
    else process.env.LOCALAPPDATA = savedLocal;
    if (savedProfile === undefined) delete process.env.USERPROFILE;
    else process.env.USERPROFILE = savedProfile;
    if (savedHome === undefined) delete process.env.HOME;
    else process.env.HOME = savedHome;
    fs.rmSync(workDir, { recursive: true, force: true });
    fake.cleanup();
  }
});

test("a non-streaming request through agy answers with the JSON body", async () => {
  const fake = installFakeAgy();
  const workDir = fs.mkdtempSync(path.join(os.tmpdir(), "agy-exec-json-"));
  const savedLocal = process.env.LOCALAPPDATA;
  const savedProfile = process.env.USERPROFILE;
  const savedHome = process.env.HOME;
  try {
    process.env.LOCALAPPDATA = workDir;
    process.env.USERPROFILE = workDir;
    process.env.HOME = workDir;
    await withEnv(
      { AGY_CLI_TRANSPORT: "acp", AGY_PATH: fake.path, AGY_BRIDGE_START_TIMEOUT_MS: "10000" },
      async () => {
        const { AntigravityExecutor } = await import("../../open-sse/executors/antigravity.ts");
        const acp = await import("../../open-sse/services/agyCliAcp.ts");
        const executor = new AntigravityExecutor();
        try {
          const result = await executor.execute({
            model: "gemini-3-pro",
            body: userMessage("hello"),
            stream: false,
            credentials: credentials(),
          });
          const response = "response" in result ? result.response : result;
          assert.equal(response.status, 200);
          const parsed = JSON.parse(await response.text());
          assert.equal(parsed.response.candidates[0].content.role, "model");
          assert.match(
            JSON.stringify(parsed.response.candidates[0].content.parts),
            /the file says hi/
          );
        } finally {
          await acp.shutdownAgyPool();
        }
      }
    );
  } finally {
    if (savedLocal === undefined) delete process.env.LOCALAPPDATA;
    else process.env.LOCALAPPDATA = savedLocal;
    if (savedProfile === undefined) delete process.env.USERPROFILE;
    else process.env.USERPROFILE = savedProfile;
    if (savedHome === undefined) delete process.env.HOME;
    else process.env.HOME = savedHome;
    fs.rmSync(workDir, { recursive: true, force: true });
    fake.cleanup();
  }
});

test("a host with no agy reports it as an actionable error, not a crash", async () => {
  const workDir = fs.mkdtempSync(path.join(os.tmpdir(), "agy-exec-missing-"));
  const savedPath = process.env.PATH;
  const savedLocal = process.env.LOCALAPPDATA;
  const savedProfile = process.env.USERPROFILE;
  const savedHome = process.env.HOME;
  const savedOverride = process.env.AGY_PATH;
  try {
    process.env.PATH = "";
    process.env.LOCALAPPDATA = workDir;
    process.env.USERPROFILE = workDir;
    process.env.HOME = workDir;
    delete process.env.AGY_PATH;
    await withEnv({ AGY_CLI_TRANSPORT: "acp" }, async () => {
      const { AntigravityExecutor } = await import("../../open-sse/executors/antigravity.ts");
      const acp = await import("../../open-sse/services/agyCliAcp.ts");
      const executor = new AntigravityExecutor();
      try {
        const result = await executor.execute({
          model: "gemini-3-pro",
          body: userMessage("hello"),
          stream: true,
          credentials: credentials(),
        });
        const response = "response" in result ? result.response : result;
        assert.equal(response.status, 500);
        const parsed = JSON.parse(await response.text());
        assert.match(parsed.error.message, /agy/);
        assert.match(parsed.error.message, /not found/i);
      } finally {
        await acp.shutdownAgyPool();
      }
    });
  } finally {
    if (savedPath === undefined) delete process.env.PATH;
    else process.env.PATH = savedPath;
    if (savedLocal === undefined) delete process.env.LOCALAPPDATA;
    else process.env.LOCALAPPDATA = savedLocal;
    if (savedProfile === undefined) delete process.env.USERPROFILE;
    else process.env.USERPROFILE = savedProfile;
    if (savedHome === undefined) delete process.env.HOME;
    else process.env.HOME = savedHome;
    if (savedOverride !== undefined) process.env.AGY_PATH = savedOverride;
    fs.rmSync(workDir, { recursive: true, force: true });
  }
});
