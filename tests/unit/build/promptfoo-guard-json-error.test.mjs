import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

for (const scenario of [
  {
    name: "accepts an HTTP 400 guard rejection",
    status: 400,
    code: "SECURITY_001",
    accepted: true,
  },
  { name: "rejects a different HTTP 400 error", status: 400, code: "WRONG_CODE", accepted: false },
  {
    name: "rejects HTTP 200 even with the expected error code",
    status: 200,
    code: "SECURITY_001",
    accepted: false,
  },
]) {
  test(`the pinned promptfoo ${scenario.name}`, { timeout: 90000 }, async (t) => {
    const root = fileURLToPath(new URL("../../../", import.meta.url));
    const directory = mkdtempSync(join(tmpdir(), "promptfoo-guard-"));
    t.after(() => rmSync(directory, { recursive: true, force: true }));
    const requests = [];
    const server = createServer(async (request, response) => {
      let body = "";
      for await (const chunk of request) body += chunk;
      requests.push({ method: request.method, path: request.url, body: JSON.parse(body) });
      response.writeHead(scenario.status, { "content-type": "application/json" });
      response.end(
        JSON.stringify({ error: { code: scenario.code, message: "Blocked by fixture" } })
      );
    });
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    t.after(() => {
      server.closeAllConnections();
      server.close();
    });
    const outputPath = join(directory, "result.json");
    const child = spawn(
      process.execPath,
      [
        join(root, "node_modules/promptfoo/dist/src/entrypoint.js"),
        "eval",
        "-c",
        join(root, "promptfooconfig.yaml"),
        "--no-cache",
        "--output",
        outputPath,
      ],
      {
        cwd: directory,
        env: {
          PATH: process.env.PATH,
          CI: "true",
          PROMPTFOO_CONFIG_DIR: join(directory, "config"),
          PROMPTFOO_DISABLE_TELEMETRY: "true",
          PROMPTFOO_DISABLE_UPDATE: "true",
          OMNIROUTE_URL: `http://127.0.0.1:${server.address().port}`,
          OMNIROUTE_API_KEY: "fixture-key",
        },
        stdio: ["ignore", "pipe", "pipe"],
      }
    );
    t.after(() => {
      if (child.exitCode === null) child.kill("SIGTERM");
    });
    let output = "";
    for (const stream of [child.stdout, child.stderr])
      stream.on("data", (chunk) => {
        output += chunk;
      });
    const status = await new Promise((resolve, reject) => {
      child.once("error", reject);
      child.once("exit", resolve);
    });
    if (scenario.accepted) assert.equal(status, 0, output.slice(-12000));
    else assert.notEqual(status, 0, "invalid guard outcomes must fail the evaluation");
    const report = JSON.parse(readFileSync(outputPath, "utf8"));
    assert.equal(report.results.stats.successes, scenario.accepted ? 2 : 0);
    assert.equal(
      report.results.stats.failures + report.results.stats.errors,
      scenario.accepted ? 0 : 2
    );
    assert.equal(requests.length, 2);
    for (const request of requests) {
      assert.equal(request.method, "POST");
      assert.equal(request.path, "/v1/chat/completions");
      assert.equal(request.body.messages[0].role, "user");
    }
  });
}
