import assert from "node:assert/strict";
import { after, before, describe, it } from "node:test";
import { chmod, copyFile, mkdir, mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { KiroCliExecutor } from "../../open-sse/executors/kiro-cli.ts";
import { kiroCliTurn } from "../../open-sse/services/kiroCliTurn.ts";

describe("official Kiro CLI ACP transport", { skip: process.platform !== "linux" }, () => {
  let root: string;
  const vars = [
    "REQUIRE_API_KEY",
    "OMNIROUTE_KIRO_CLI_BIN",
    "OMNIROUTE_KIRO_CLI_DATA_DIR",
    "ACP_SECRET_CANARY",
  ];
  const saved = Object.fromEntries(vars.map((k) => [k, process.env[k]]));
  before(async () => {
    root = await mkdtemp(path.join(os.tmpdir(), "kiro-acp-test-"));
    const bin = path.join(root, "kiro-cli");
    const data = path.join(root, "auth");
    await mkdir(data, { mode: 0o700 });
    await copyFile(new URL("../fixtures/cli/kiro-acp-text.mjs", import.meta.url), bin);
    await chmod(bin, 0o700);
    Object.assign(process.env, {
      REQUIRE_API_KEY: "true",
      OMNIROUTE_KIRO_CLI_BIN: bin,
      OMNIROUTE_KIRO_CLI_DATA_DIR: data,
      ACP_SECRET_CANARY: "do-not-inherit",
    });
  });
  after(async () => {
    for (const k of vars) {
      if (saved[k] === undefined) delete process.env[k];
      else process.env[k] = saved[k];
    }
    await rm(root, { recursive: true, force: true });
  });
  it("requires server-side opt-in and an authenticated gateway", async () => {
    delete process.env.OMNIROUTE_KIRO_CLI_BIN;
    try {
      await assert.rejects(kiroCliTurn("test", "say hello"), { status: 503 });
    } finally {
      process.env.OMNIROUTE_KIRO_CLI_BIN = path.join(root, "kiro-cli");
    }
    process.env.REQUIRE_API_KEY = "false";
    try {
      await assert.rejects(kiroCliTurn("test", "say hello"), { status: 503 });
    } finally {
      process.env.REQUIRE_API_KEY = "true";
    }
  });
  for (const [model, status] of [
    ["wrong-mode", 502],
    ["wrong-model", 502],
    ["require-login", 401],
  ] as const) {
    it(`does not prompt on ${model}`, async () => {
      await assert.rejects(kiroCliTurn(model, "say hello"), { status });
    });
  }
  it("bounds stalled sessions and honours cancellation", async () => {
    await assert.rejects(kiroCliTurn("hang", "say hello", undefined, 120), { status: 504 });
    const ac = new AbortController();
    const pending = kiroCliTurn("hang", "say hello", ac.signal);
    setTimeout(() => ac.abort(), 120);
    await assert.rejects(pending, { status: 499 });
    assert.equal(await kiroCliTurn("test", "say hello"), "hello");
  });
  it("rejects caller tools and returns text in both Chat Completions encodings", async () => {
    const executor = new KiroCliExecutor();
    const base = {
      model: "test",
      credentials: {},
      body: { messages: [{ role: "user", content: "say hello" }] },
      stream: false,
    };
    assert.equal(
      (await executor.execute({ ...base, body: { ...base.body, tools: [{ type: "function" }] } }))
        .response.status,
      400
    );
    const normal = await executor.execute(base);
    assert.equal(normal.response.status, 200);
    assert.equal((await normal.response.json()).choices[0].message.content, "hello");
    const stream = await executor.execute({ ...base, stream: true });
    const wire = await stream.response.text();
    assert.match(wire, /"content":"hello"/);
    assert.match(wire, /data: \[DONE\]/);
  });
});
