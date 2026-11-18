// #18556: `omniroute --mcp` must start the stdio transport even when the install
// path contains a space (macOS "Application Support", Windows "Program Files", …).
// The direct-run guard compared a percent-encoded file: URL against the raw
// argv[1] path with endsWith, which never matches once any character needs
// encoding — so the process evaluated its imports and exited 0 silently, and
// MCP clients waited forever for `initialize`. The guard now compares real
// filesystem paths (realpathSync on both sides, so symlinked installs match too).
//
// Harness: a temp directory whose NAME contains a space holds a symlink to the
// repo, and the MCP entry is spawned through it. Before the fix the child exits
// 0 without writing a byte to stdout; after the fix it answers `initialize`.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const REPO_ROOT = fileURLToPath(new URL("../..", import.meta.url));

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function tryParseJson(line: string): Record<string, unknown> | null {
  try {
    return JSON.parse(line) as Record<string, unknown>;
  } catch {
    return null;
  }
}

describe("MCP stdio entry guard (#18556)", () => {
  it("answers initialize when the entry path contains a space", async () => {
    // A space inside the temp-dir name is the point: the symlink chain makes
    // argv[1] carry it while Node resolves the module itself to the real path.
    const spaceParent = mkdtempSync(join(tmpdir(), "omniroute 18556 space "));
    const linkedRoot = join(spaceParent, "OmniRoute");
    symlinkSync(REPO_ROOT, linkedRoot, "dir");
    try {
      const entry = join(linkedRoot, "open-sse", "mcp-server", "server.ts");
      const consoleGuard = pathToFileURL(join(REPO_ROOT, "bin", "mcpStdioConsoleGuard.mjs")).href;
      const child = spawn(
        process.execPath,
        ["--import", consoleGuard, "--import", "tsx/esm", entry],
        { cwd: REPO_ROOT, env: process.env, stdio: ["pipe", "pipe", "pipe"] }
      );

      let stdout = "";
      let stderr = "";
      let exitInfo: string | null = null;
      child.stdout.on("data", (chunk) => {
        stdout += chunk.toString();
      });
      child.stderr.on("data", (chunk) => {
        stderr += chunk.toString();
      });
      child.once("exit", (code, signal) => {
        exitInfo = signal ? `signal ${signal}` : `code ${code}`;
      });
      child.stdin.write(
        `${JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "initialize",
          params: {
            protocolVersion: "2025-03-26",
            capabilities: {},
            clientInfo: { name: "issue-18556-probe", version: "0" },
          },
        })}\n`
      );

      // The bug's signature is exiting before any stdout byte. Poll for the
      // first stdout line first so that failure mode is reported distinctly.
      const firstLineDeadline = Date.now() + 90_000;
      while (Date.now() < firstLineDeadline && !stdout.includes("\n") && exitInfo === null) {
        await sleep(100);
      }
      if (exitInfo !== null && stdout.trim().length === 0) {
        assert.fail(
          `MCP entry exited (${exitInfo}) without answering initialize over a path with a space. stderr tail: ${stderr.slice(-400)}`
        );
      }

      let initResponse: Record<string, unknown> | null = null;
      const resultDeadline = Date.now() + 90_000;
      while (Date.now() < resultDeadline && !initResponse) {
        initResponse =
          stdout
            .split("\n")
            .map(tryParseJson)
            .find((msg) => msg && msg.id === 1 && msg.result) ?? null;
        if (!initResponse) await sleep(100);
      }
      child.kill();
      assert.ok(
        initResponse,
        `expected an initialize result on stdout; stdout head: ${stdout.slice(0, 200)} stderr tail: ${stderr.slice(-400)}`
      );
      assert.equal(initResponse.jsonrpc, "2.0");
    } finally {
      rmSync(spaceParent, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
  });
});
