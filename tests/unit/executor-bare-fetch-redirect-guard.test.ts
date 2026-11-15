// Executors that build their upstream URL from stored or upstream-supplied data must send it
// through the provider dispatch guard (dispatchGuarded), not the global fetch. A bare fetch
// follows redirects on its own, so a 307 from the configured host sent the prompt body to a
// second origin, including cloud metadata, without any guard check.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import type { AddressInfo } from "node:net";

// Production installs the patched global fetch; use the same path here.
await import("../../open-sse/utils/proxyFetch.ts");
const { GitlabExecutor } = await import("../../open-sse/executors/gitlab.ts");

// Nothing listens there in a test environment, so an unguarded fetch hangs until the
// abort signal instead of failing fast with the guard error.
const METADATA = "http://169.254.169.254/latest/meta-data/";

const server = http.createServer((_req, res) => {
  res.writeHead(307, { location: METADATA });
  res.end();
});
await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
test.after(() => {
  server.close();
  server.closeAllConnections();
});

test("a redirect from the GitLab host to cloud metadata is refused by the guard", async () => {
  const started = Date.now();
  const outcome = await new GitlabExecutor()
    .execute({
      model: "gitlab-duo-code-suggestions",
      body: { messages: [{ role: "user", content: "secret prompt" }] },
      stream: false,
      credentials: { apiKey: "glpat-test", providerSpecificData: { baseUrl: origin } },
      signal: AbortSignal.timeout(4000),
      log: null,
    } as never)
    .then(
      // The executor turns a guard refusal into an error response.
      async (result: { response?: Response }) =>
        `${result.response?.status} ${await result.response?.text()}`,
      (error: unknown) => String((error as Error)?.message || error)
    );
  assert.match(outcome, /metadata|blocked/i, `unexpected outcome: ${outcome}`);
  assert.ok(Date.now() - started < 3500, "the redirect was followed until the timeout");
});

// Executors that dispatch to a stored, self-hosted or upstream-supplied host. Each one must
// go through dispatchRequest()/dispatchGuarded(); the counts are the bare fetch() calls that
// remain, all of them liveness probes or fixed public hosts.
const GUARDED_EXECUTORS: Record<string, number> = {
  "cliproxyapi.ts": 1, // healthCheck GET on the operator's local CLIProxyAPI
  "dario.ts": 1, // healthCheck GET
  "ghe-copilot.ts": 0,
  "github.ts": 2, // fixed api.github.com and GitHub OAuth token endpoints
  "gitlab.ts": 0,
  "glm.ts": 0,
  "ninerouter.ts": 1, // healthCheck GET
  "nlpcloud.ts": 0,
  "oneminai.ts": 0,
};

const BARE_FETCH = /(^|[^.\w])fetch\(/;

function bareFetchCount(file: string): number {
  return fs
    .readFileSync(file, "utf8")
    .split("\n")
    .filter((line) => !line.trim().startsWith("//") && !line.trim().startsWith("*"))
    .filter((line) => BARE_FETCH.test(line)).length;
}

test("dispatching executors keep their upstream calls behind the dispatch guard", () => {
  const dir = path.join(process.cwd(), "open-sse/executors");
  for (const [file, allowed] of Object.entries(GUARDED_EXECUTORS)) {
    const count = bareFetchCount(path.join(dir, file));
    assert.ok(count <= allowed, `${file} has ${count} bare fetch() calls, ${allowed} allowed`);
  }
});
