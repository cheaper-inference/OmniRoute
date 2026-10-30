import test from "node:test";
import assert from "node:assert/strict";
import { createServer, type Server } from "node:http";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { AddressInfo } from "node:net";
import { Command, Option } from "commander";

import { registerSetupClaude } from "../../../bin/cli/commands/setup-claude.mjs";

/**
 * The subcommand `--api-key` collides with the program-level option
 * declared in bin/cli/program.mjs, so Commander binds the value to the program
 * and `opts.apiKey` inside the subcommand action is undefined in EVERY arrangement
 * (before or after the subcommand name). Only `command.optsWithGlobals()` recovers it.
 *
 * This asserts the real wiring end to end: the real `registerSetupClaude` action runs
 * against a stub catalog server, and the key must arrive as an Authorization header.
 */
function startCatalogServer(): Promise<{
  url: string;
  seen: { authorization?: string };
  close: () => Promise<void>;
}> {
  const seen: { authorization?: string } = {};
  const server: Server = createServer((req, res) => {
    seen.authorization = req.headers.authorization;
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ data: [{ id: "glm/glm-5.2", type: "chat" }] }));
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address() as AddressInfo;
      resolve({
        url: `http://127.0.0.1:${port}`,
        seen,
        close: () => new Promise<void>((done) => server.close(() => done())),
      });
    });
  });
}

/** Mirrors bin/cli/program.mjs: a program-level --api-key bound to OMNIROUTE_API_KEY. */
function buildProgram(): Command {
  const program = new Command();
  program.exitOverride();
  program.addOption(new Option("--api-key <key>", "server key").env("OMNIROUTE_API_KEY"));
  registerSetupClaude(program);
  return program;
}

async function runSetupClaude(
  argv: string[]
): Promise<{ authorization?: string; exitCode?: number }> {
  const { url, seen, close } = await startCatalogServer();
  const claudeHome = mkdtempSync(join(tmpdir(), "omniroute-setup-claude-"));
  const originalEnvKey = process.env.OMNIROUTE_API_KEY;
  const originalExit = process.exit;
  let exitCode: number | undefined;

  delete process.env.OMNIROUTE_API_KEY;
  // The real action calls process.exit() on a non-zero code; capture instead of dying.
  process.exit = ((code?: number) => {
    exitCode = code;
    return undefined as never;
  }) as typeof process.exit;

  try {
    await buildProgram().parseAsync([
      "node",
      "omniroute",
      ...argv.map((a) => (a === "__REMOTE__" ? url : a)),
      "--claude-home",
      claudeHome,
      "--dry-run",
    ]);
  } finally {
    process.exit = originalExit;
    if (originalEnvKey === undefined) delete process.env.OMNIROUTE_API_KEY;
    else process.env.OMNIROUTE_API_KEY = originalEnvKey;
    await close();
  }

  return { authorization: seen.authorization, exitCode };
}

test("setup-claude --api-key reaches the request despite the program-level --api-key", async () => {
  const { authorization } = await runSetupClaude([
    "setup-claude",
    "--remote",
    "__REMOTE__",
    "--api-key",
    "sk-cli-only",
  ]);

  // Regression: opts.apiKey was undefined, so no Authorization header was sent and
  // the generated profile carried no credential whenever OMNIROUTE_API_KEY was unset.
  assert.equal(authorization, "Bearer sk-cli-only");
});

test("setup-claude --api-key before the subcommand name also reaches the request", async () => {
  const { authorization } = await runSetupClaude([
    "--api-key",
    "sk-global-position",
    "setup-claude",
    "--remote",
    "__REMOTE__",
  ]);

  assert.equal(authorization, "Bearer sk-global-position");
});

test("setup-claude sends no Authorization header when no key is supplied anywhere", async () => {
  const { authorization } = await runSetupClaude(["setup-claude", "--remote", "__REMOTE__"]);

  assert.equal(authorization, undefined);
});
