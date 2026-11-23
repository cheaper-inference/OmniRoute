// The devin-cli executor streams from a spawned `devin acp` child. When the HTTP client
// disconnects, the body is cancelled and the abort signal fires; the child then exits and its
// `close` handler used to call controller.enqueue()/close() on the cancelled stream. That throws
// ERR_INVALID_STATE inside a ChildProcess listener, i.e. an uncaught exception that takes down
// the whole server process (and every other stream in flight).
//
// The fake CLI is node itself, as in devin-cli-fallback-spawn-local-only-15159.test.ts: the
// production spawn is `spawn(bin, ["acp", "--agent-type", "summarizer"])`, so CLI_DEVIN_BIN is
// process.execPath and an extensionless `acp` file in the working directory is the "CLI".
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const { DevinCliExecutor } = await import("../../open-sse/executors/devin-cli.ts");

const FAKE_ACP = `
const readline = require("node:readline");
const send = (o) => process.stdout.write(JSON.stringify(o) + "\\n");
readline.createInterface({ input: process.stdin }).on("line", (line) => {
  const m = JSON.parse(line);
  if (m.method === "initialize") send({ jsonrpc: "2.0", id: m.id, result: {} });
  else if (m.method === "session/new") send({ jsonrpc: "2.0", id: m.id, result: { sessionId: "s1" } });
  else if (m.method === "session/prompt") {
    setInterval(() => send({ jsonrpc: "2.0", method: "session/update", params: { update: {
      sessionUpdate: "agent_message_chunk", content: { type: "text", text: "tok " } } } }), 10);
  }
});
`;

test("a client disconnect mid-stream does not throw from the child's close handler", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "devin-cancel-"));
  const prevCwd = process.cwd();
  const prevBin = process.env.CLI_DEVIN_BIN;
  const uncaught: Error[] = [];
  const onUncaught = (err: Error) => uncaught.push(err);
  fs.writeFileSync(path.join(dir, "acp"), FAKE_ACP);
  process.chdir(dir);
  process.env.CLI_DEVIN_BIN = process.execPath;
  process.on("uncaughtException", onUncaught);
  try {
    const ac = new AbortController();
    const executor = new DevinCliExecutor();
    const { response } = await executor.execute({
      model: "devin-test",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: { apiKey: "test-key" },
      signal: ac.signal,
      log: null,
    } as never);

    const reader = response.body!.getReader();
    const first = await reader.read();
    assert.equal(first.done, false);

    // What createDisconnectAwareStream does when the client goes away.
    await reader.cancel();
    ac.abort();

    // Give the child time to die and its `close` handler to run.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    assert.deepEqual(
      uncaught.map((e) => e.message),
      []
    );
  } finally {
    process.off("uncaughtException", onUncaught);
    process.chdir(prevCwd);
    if (prevBin === undefined) delete process.env.CLI_DEVIN_BIN;
    else process.env.CLI_DEVIN_BIN = prevBin;
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
