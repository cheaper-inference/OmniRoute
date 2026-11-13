// Legacy launch-codex delegation: parity with the codex adapter, execution through the core
// executor, and the deprecation note (architecture sections 6 and 8).

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import type { AddressInfo } from "node:net";
import { Command } from "commander";

import codexAdapter from "../../../../bin/cli/launch/adapters/codex.mjs";
import { resolveTarget } from "../../../../bin/cli/launch/core/target.mjs";
import {
  buildCodexEnv,
  buildCodexProviderArgs,
  registerLaunchCodex,
  resolveCodexTarget,
  runLaunchCodexCommand,
} from "../../../../bin/cli/commands/launch-codex.mjs";
import { legacyDeprecationNote } from "../../../../bin/cli/commands/launch.mjs";
import { fixtureCtx } from "./_helpers/fixtureCtx.mjs";

const isWin = process.platform === "win32";
const savedEnv = { ...process.env };
const tmpDirs: string[] = [];
const servers: http.Server[] = [];

function mkTmp(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "legacy-codex-"));
  tmpDirs.push(dir);
  return dir;
}

async function startHealthServer(): Promise<string> {
  const server = http.createServer((req, res) => {
    res.statusCode = req.url === "/api/monitoring/health" ? 200 : 404;
    res.end("{}");
  });
  servers.push(server);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  return `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
}

async function freePort(): Promise<number> {
  const server = http.createServer();
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as AddressInfo;
  await new Promise<void>((resolve) => server.close(() => resolve()));
  return port;
}

function writeFakeCodex(dir: string, exitCode: number): string {
  const out = path.join(dir, "capture.json");
  const bin = path.join(dir, "codex");
  fs.writeFileSync(
    bin,
    `#!${process.execPath}\n` +
      `require("node:fs").writeFileSync(${JSON.stringify(out)}, JSON.stringify(` +
      `{ argv: process.argv.slice(2), env: process.env }));\n` +
      `process.exit(${exitCode});\n`,
    { mode: 0o755 }
  );
  return out;
}

function captureStderr() {
  const chunks: string[] = [];
  const original = process.stderr.write.bind(process.stderr);
  (process.stderr as { write: unknown }).write = (chunk: unknown) => {
    chunks.push(String(chunk));
    return true;
  };
  return {
    text: () => chunks.join(""),
    restore: () => {
      (process.stderr as { write: unknown }).write = original;
    },
  };
}

test.after(async () => {
  for (const server of servers) await new Promise<void>((r) => server.close(() => r()));
  for (const dir of tmpDirs) fs.rmSync(dir, { recursive: true, force: true });
  for (const key of Object.keys(process.env)) if (!(key in savedEnv)) delete process.env[key];
  Object.assign(process.env, savedEnv);
});

test("legacy codex builders agree with the codex adapter plan on provider wiring", () => {
  const rootUrl = "http://127.0.0.1:20128";
  const ctx = fixtureCtx({
    tool: "codex",
    viewSpec: codexAdapter.capabilities.modelList.view,
    rootUrl,
  });
  const plan = codexAdapter.plan(ctx);
  const legacy = buildCodexProviderArgs(rootUrl);

  // The same provider -c flags (order differs; the adapter adds catalog and telemetry flags).
  for (const flag of legacy) assert.ok(plan.argv.includes(flag), `adapter plan lacks ${flag}`);
  assert.ok(plan.argv.includes(`model_providers.omniroute.base_url="${rootUrl}/v1"`));

  // Token env var name matches.
  assert.ok("OMNIROUTE_API_KEY" in plan.env.set);
  assert.equal(buildCodexEnv({}, "tok").OMNIROUTE_API_KEY, "tok");

  // Both strip the same stale OpenAI/Codex credentials.
  const legacyEnv = buildCodexEnv(
    { OPENAI_API_KEY: "x", OPENAI_BASE_URL: "x", CODEX_API_KEY: "x", OPENAI_ORG_ID: "x" },
    "tok"
  );
  for (const key of plan.env.unset) assert.equal(legacyEnv[key], undefined);
});

test("resolveCodexTarget agrees with core resolveTarget on base URL", () => {
  const dir = mkTmp();
  const env = { OMNIROUTE_CONTEXT: "", DATA_DIR: dir } as Record<string, string>;
  const remote = resolveCodexTarget({ remote: "http://10.1.2.3:20128/v1/" });
  assert.equal(
    remote.baseUrl,
    resolveTarget({ remote: "http://10.1.2.3:20128/v1/" }, { env }).rootUrl
  );
});

test(
  "runLaunchCodexCommand runs the fake codex through the core executor",
  { skip: isWin },
  async () => {
    const baseUrl = await startHealthServer();
    const dir = mkTmp();
    const out = writeFakeCodex(dir, 7);
    process.env.PATH = `${dir}${path.delimiter}${savedEnv.PATH}`;
    process.env.OPENAI_API_KEY = "stale";

    const code = await runLaunchCodexCommand(
      { remote: baseUrl, apiKey: "sk-test", profile: "p1" },
      ["exec", "hello"]
    );
    assert.equal(code, 7);
    const seen = JSON.parse(fs.readFileSync(out, "utf8"));
    assert.deepEqual(seen.argv, [
      ...buildCodexProviderArgs(baseUrl),
      "--profile",
      "p1",
      "exec",
      "hello",
    ]);
    assert.equal(seen.env.OMNIROUTE_API_KEY, "sk-test");
    assert.equal(seen.env.OPENAI_API_KEY, undefined);
  }
);

test(
  "runLaunchCodexCommand returns 127 with the not-found message when codex is missing",
  { skip: isWin },
  async () => {
    const baseUrl = await startHealthServer();
    process.env.PATH = mkTmp();
    const err = captureStderr();
    const logs: string[] = [];
    const origError = console.error;
    console.error = (...a: unknown[]) => logs.push(a.join(" "));
    let code: number;
    try {
      code = await runLaunchCodexCommand({ remote: baseUrl }, []);
    } finally {
      console.error = origError;
      err.restore();
    }
    assert.equal(code, 127);
    assert.match(err.text(), /The 'codex' CLI was not found in PATH/);
  }
);

test("runLaunchCodexCommand returns 1 without launching when the gateway is unreachable", async () => {
  const port = await freePort();
  const origError = console.error;
  console.error = () => {};
  try {
    assert.equal(await runLaunchCodexCommand({ remote: `http://127.0.0.1:${port}` }, []), 1);
  } finally {
    console.error = origError;
  }
});

test("deprecation note is printed by the command action and silenced by the env flag", async () => {
  const port = await freePort();
  const origError = console.error;
  console.error = () => {};
  const prevExit = process.exitCode;
  try {
    for (const silenced of [false, true]) {
      if (silenced) process.env.OMNIROUTE_NO_DEPRECATION = "1";
      else delete process.env.OMNIROUTE_NO_DEPRECATION;
      const program = new Command();
      registerLaunchCodex(program);
      const err = captureStderr();
      try {
        await program.parseAsync([
          "node",
          "omniroute",
          "launch-codex",
          "--remote",
          `http://127.0.0.1:${port}`,
        ]);
      } finally {
        err.restore();
      }
      if (silenced) assert.equal(err.text(), "");
      else assert.match(err.text(), /launch-codex` is deprecated, use `omnirouter launch codex`/);
    }
  } finally {
    console.error = origError;
    process.exitCode = prevExit;
    delete process.env.OMNIROUTE_NO_DEPRECATION;
  }
});

test("legacyDeprecationNote honours an injected env", () => {
  const lines: string[] = [];
  const stderr = { write: (s: string) => lines.push(s) };
  legacyDeprecationNote("hi", { env: {}, stderr });
  legacyDeprecationNote("hi", { env: { OMNIROUTE_NO_DEPRECATION: "1" }, stderr });
  assert.deepEqual(lines, ["omniroute: note: hi\n"]);
});
