// #20356 — `omniroute setup-claude --api-key <key>` dropped `--api-key` because
// bin/cli/program.mjs defines a root `--api-key` option (with .env("OMNIROUTE_API_KEY"))
// and setup-claude declared a subcommand `--api-key` without reading cmd.optsWithGlobals().
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { createServer } from "node:http";
import os from "node:os";
import path from "node:path";
import { createProgram } from "../../../bin/cli/program.mjs";
import { runSetupClaudeCommand } from "../../../bin/cli/commands/setup-claude.mjs";

// Same stdout hygiene as setup-claude.test.ts (#5959).
const originalConsole = {
  log: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error,
};

test.before(() => {
  console.log = () => {};
  console.info = () => {};
  console.warn = () => {};
  console.error = () => {};
});

test.after(() => {
  console.log = originalConsole.log;
  console.info = originalConsole.info;
  console.warn = originalConsole.warn;
  console.error = originalConsole.error;
});

async function withMockCatalogServer(
  expectedBearer: string,
  fn: (baseUrl: string, claudeHome: string, seenAuth: Array<string | null>) => Promise<void>
) {
  const seenAuth: Array<string | null> = [];
  const server = createServer((req, res) => {
    const auth = typeof req.headers.authorization === "string" ? req.headers.authorization : null;
    seenAuth.push(auth);
    if (auth !== `Bearer ${expectedBearer}`) {
      res.writeHead(401, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          error: {
            message: "Authentication required",
            type: "invalid_api_key",
            code: "invalid_api_key",
          },
        })
      );
      return;
    }
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ data: [{ id: "glm/glm-5.2" }] }));
  });

  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  const baseUrl = `http://127.0.0.1:${address.port}`;
  const claudeHome = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-20356-claude-"));

  try {
    await fn(baseUrl, claudeHome, seenAuth);
  } finally {
    server.closeAllConnections();
    await new Promise<void>((resolve) => server.close(() => resolve()));
    await fs.rm(claudeHome, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

async function runSetupClaudeCli(
  argv: string[],
  expectedBearer: string,
  envApiKey?: string
): Promise<{ exitCode: number; seenAuth: Array<string | null> }> {
  let exitCode = 0;
  let capturedAuth: Array<string | null> = [];

  await withMockCatalogServer(expectedBearer, async (baseUrl, claudeHome, seenAuth) => {
    capturedAuth = seenAuth;
    const prevEnvKey = process.env.OMNIROUTE_API_KEY;
    if (envApiKey === undefined) delete process.env.OMNIROUTE_API_KEY;
    else process.env.OMNIROUTE_API_KEY = envApiKey;

    const originalExit = process.exit;
    process.exit = ((code?: number) => {
      const err = new Error(`process.exit(${code ?? 0})`) as Error & { exitCode?: number };
      err.exitCode = code ?? 0;
      throw err;
    }) as typeof process.exit;

    try {
      const program = createProgram();
      await program.parseAsync(
        [
          ...argv,
          "--remote",
          baseUrl,
          "--claude-home",
          claudeHome,
          "--dry-run",
          "--allow-container-write",
        ],
        { from: "user" }
      );
    } catch (err) {
      const exitErr = err as { exitCode?: number };
      if (typeof exitErr.exitCode === "number") {
        exitCode = exitErr.exitCode;
      } else {
        throw err;
      }
    } finally {
      process.exit = originalExit;
      if (prevEnvKey === undefined) delete process.env.OMNIROUTE_API_KEY;
      else process.env.OMNIROUTE_API_KEY = prevEnvKey;
    }
  });

  return { exitCode, seenAuth: capturedAuth };
}

test("setup-claude sends Bearer header when --api-key is passed after the subcommand (#20356)", async () => {
  const result = await runSetupClaudeCli(
    ["setup-claude", "--api-key", "sk-sub-20356"],
    "sk-sub-20356"
  );
  assert.equal(result.exitCode, 0);
  assert.deepEqual(result.seenAuth, ["Bearer sk-sub-20356"]);
});

test("setup-claude sends Bearer header when --api-key is passed before the subcommand (#20356)", async () => {
  const result = await runSetupClaudeCli(
    ["--api-key", "sk-global-20356", "setup-claude"],
    "sk-global-20356"
  );
  assert.equal(result.exitCode, 0);
  assert.deepEqual(result.seenAuth, ["Bearer sk-global-20356"]);
});

test("setup-claude explicit --api-key overrides ambient OMNIROUTE_API_KEY", async () => {
  const result = await runSetupClaudeCli(
    ["setup-claude", "--api-key", "sk-flag-wins"],
    "sk-flag-wins",
    "sk-env-loses"
  );
  assert.equal(result.exitCode, 0);
  assert.deepEqual(result.seenAuth, ["Bearer sk-flag-wins"]);
});

test("setup-claude falls back to OMNIROUTE_API_KEY when --api-key is omitted", async () => {
  const result = await runSetupClaudeCli(["setup-claude"], "sk-env-only", "sk-env-only");
  assert.equal(result.exitCode, 0);
  assert.deepEqual(result.seenAuth, ["Bearer sk-env-only"]);
});

test("runSetupClaudeCommand accepts direct apiKey option", async () => {
  await withMockCatalogServer("sk-direct-20356", async (baseUrl, claudeHome, seenAuth) => {
    const code = await runSetupClaudeCommand({
      remote: baseUrl,
      apiKey: "sk-direct-20356",
      claudeHome,
      dryRun: true,
      allowContainerWrite: true,
    });
    assert.equal(code, 0);
    assert.deepEqual(seenAuth, ["Bearer sk-direct-20356"]);
  });
});
