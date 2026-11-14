import assert from "node:assert/strict";
import { createServer } from "node:http";
import { once } from "node:events";
import test from "node:test";
import { startCacheDiagnostics } from "../../bin/cli/runtime/cacheDiagnostics.mjs";

test("ordinary bundled fetch reports capability against an owned synthetic HTTP service", async () => {
  const rows = [],
    logs = [],
    estimates = [];
  const server = createServer(async (req, res) => {
    for await (const chunk of req) assert.ok(chunk.length > 0);
    res.setHeader("content-type", "application/json");
    res.end(
      JSON.stringify({
        usage: { input_tokens: 7, output_tokens: 2, input_tokens_details: { cached_tokens: 0 } },
      })
    );
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const origin = `http://127.0.0.1:${server.address().port}`;
  let observed;
  const done = new Promise((resolve) => {
    observed = resolve;
  });
  const observer = startCacheDiagnostics({
    env: { OMNIROUTE_CACHE_DIAGNOSTICS: "1", OMNIROUTE_TOKEN_BREAKDOWN: "1" },
    requestClassifier: (request) =>
      String(request.origin) === origin && request.path === "/synthetic" ? "openai" : null,
    sinkFactory: () => ({
      write(row) {
        rows.push(row);
        if (row.event === "cache_usage") observed();
      },
      async close() {},
    }),
    log: (level, message) => logs.push({ level, message }),
    tokenCounter: {
      async submit(body) {
        estimates.push(body.length);
        return { status: "busy" };
      },
      async stop() {},
    },
  });
  try {
    const response = await fetch(origin + "/synthetic", {
      method: "POST",
      body: JSON.stringify({
        model: "synthetic",
        messages: [{ role: "user", content: "private synthetic" }],
      }),
    });
    assert.equal(response.status, 200);
    await response.text();
    await Promise.race([
      done,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("No observation")), 2000).unref()
      ),
    ]);
    const row = rows.find((r) => r.event === "cache_usage");
    if (Number(process.versions.node.split(".")[0]) === 22) {
      assert.equal(row.status, "unsupported_body_diagnostics");
      assert.equal(row.requestFingerprint, null);
      assert.equal(row.cacheReadTokens, null);
      assert.equal(estimates.length, 0);
      assert.equal(
        logs.filter((r) => r.level === "WARNING" && /body diagnostics unavailable/.test(r.message))
          .length,
        1
      );
      assert.equal(
        logs.some((r) => /diagnostics enabled/.test(r.message)),
        false
      );
    } else {
      assert.equal(row.status, "reported");
      assert.equal(row.inputTokens, 7);
      assert.equal(row.cacheReadTokens, 0);
      assert.match(row.requestFingerprint, /^[a-f0-9]{64}$/);
      assert.equal(estimates.length, 1);
    }
    assert.doesNotMatch(JSON.stringify(rows), /private synthetic|"model"/);
  } finally {
    await observer.stop();
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  }
});
