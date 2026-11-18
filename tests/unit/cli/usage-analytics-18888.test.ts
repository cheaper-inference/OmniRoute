import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import test from "node:test";

/** Runs the actual CLI against an isolated local HTTP fixture and captures its output. */
async function captureUsageAnalytics(
  byProvider: unknown[],
  output: "json" | "table" = "json"
): Promise<{ code: number | null; stdout: string; stderr: string; requests: string[] }> {
  const requests: string[] = [];
  const server = createServer((req, res) => {
    requests.push(req.url || "");
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ byProvider }));
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");

  try {
    const script =
      "const { runUsageAnalytics } = await import(process.argv[1]); " +
      "await runUsageAnalytics({ period: '7d' }, { optsWithGlobals: () => " +
      "({ output: process.argv[2], timeout: 2000 }) });";
    const child = spawn(
      process.execPath,
      [
        "--input-type=module",
        "--eval",
        script,
        new URL("../../../bin/cli/commands/usage.mjs", import.meta.url).href,
        output,
      ],
      {
        env: {
          ...process.env,
          OMNIROUTE_BASE_URL: "http://127.0.0.1:" + address.port,
          OMNIROUTE_API_KEY: "fixture-usage-key",
          OMNIROUTE_CLI_TOKEN: "fixture-usage-token",
        },
        stdio: ["ignore", "pipe", "pipe"],
      }
    );
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    const code = await new Promise<number | null>((resolve, reject) => {
      child.once("error", reject);
      child.once("close", resolve);
    });
    return { code, stdout, stderr, requests };
  } finally {
    server.closeAllConnections();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
}

test("usage analytics maps current byProvider token fields and keeps legacy fallbacks", async () => {
  const result = await captureUsageAnalytics([
    {
      provider: "provider-current",
      requests: 3,
      promptTokens: 260,
      completionTokens: 34,
      totalTokensIn: 888,
      totalTokensOut: 999,
      cost: 0.125,
    },
    {
      providerId: "provider-legacy",
      totalRequests: 2,
      totalTokensIn: 40,
      totalTokensOut: 7,
      totalCost: 0.05,
    },
    {
      provider: "provider-alias",
      requests: 1,
      tokensIn: 12,
      tokensOut: 5,
      cost: 0,
    },
  ]);
  assert.equal(result.code, 0, result.stderr);
  assert.deepEqual(result.requests, ["/api/usage/analytics?range=7d"]);
  assert.deepEqual(JSON.parse(result.stdout), [
    {
      provider: "provider-current",
      requests: 3,
      tokensIn: 260,
      tokensOut: 34,
      costUsd: 0.125,
    },
    {
      provider: "provider-legacy",
      requests: 2,
      tokensIn: 40,
      tokensOut: 7,
      costUsd: 0.05,
    },
    {
      provider: "provider-alias",
      requests: 1,
      tokensIn: 12,
      tokensOut: 5,
      costUsd: 0,
    },
  ]);
});

test("usage analytics table displays token totals from the current API", async () => {
  const result = await captureUsageAnalytics(
    [{ provider: "provider-current", requests: 1, promptTokens: 2048, completionTokens: 3, cost: 0 }],
    "table"
  );
  assert.equal(result.code, 0, result.stderr);
  assert.match(result.stdout, /Tokens In/);
  assert.match(result.stdout, /Tokens Out/);
  assert.match(result.stdout, /2\.0K/);
  assert.match(result.stdout, /\b3\b/);
  assert.match(result.stdout, /provider-current/);
});

test("usage analytics does not invent token totals for absent fields", async () => {
  const result = await captureUsageAnalytics([{ provider: "missing", requests: 1, cost: 0 }]);
  assert.equal(result.code, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), [
    { provider: "missing", requests: 1, tokensIn: 0, tokensOut: 0, costUsd: 0 },
  ]);
});
