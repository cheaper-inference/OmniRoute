/**
 * MCP Origin guard on OmniRoute's own custom server (scripts/dev/run-next.mjs).
 *
 * The unit suite (tests/unit/mcp-origin-validation.test.ts) builds NextRequests by
 * hand, so it cannot show what the real server puts in `request.url`. That matters:
 * `request.url` is one of the Origin candidates, so if the server derived it from
 * the client's Host header a DNS-rebinding page (`Host: evil.test` +
 * `Origin: http://evil.test`) would match itself. run-next.mjs passes an explicit
 * `hostname` to next(), which keeps `request.url` on the bound address; this test
 * pins that end to end, through the real TCP peer stamp.
 *
 * Boots a fresh install in open bootstrap mode, so a loopback caller reaches
 * `/api/mcp/*` without credentials and MCP is disabled: a request the Origin guard
 * lets through ends at the route's 503 "MCP server is disabled".
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";
import net from "node:net";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { stopTestProcess } from "../_helpers/stopTestProcess.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mcp-origin-e2e-"));
const REPO_ROOT = fileURLToPath(new URL("../..", import.meta.url));
const SERVER_PORT = await getFreePort();

function getFreePort() {
  return new Promise<number>((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      if (!addr || typeof addr === "string") {
        server.close();
        reject(new Error("failed to allocate port"));
        return;
      }
      const { port } = addr;
      server.close((err) => (err ? reject(err) : resolve(port)));
    });
  });
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createServerProcess() {
  const output: string[] = [];
  let exitInfo: { code: number | null; signal: NodeJS.Signals | null } | null = null;
  // The custom server, not bare `next dev`: only run-next.mjs stamps the real TCP
  // peer that makes this a loopback caller (#11535, #14403).
  const child = spawn(process.execPath, ["scripts/dev/run-next.mjs", "dev"], {
    cwd: REPO_ROOT,
    env: {
      ...process.env,
      DATA_DIR: TEST_DATA_DIR,
      PORT: String(SERVER_PORT),
      DASHBOARD_PORT: String(SERVER_PORT),
      API_PORT: String(SERVER_PORT),
      HOST: "127.0.0.1",
      REQUIRE_API_KEY: "false",
      API_KEY_SECRET: "mcp-origin-e2e-secret",
      DISABLE_SQLITE_AUTO_BACKUP: "true",
      INITIAL_PASSWORD: "",
      NEXT_TELEMETRY_DISABLED: "1",
      OMNIROUTE_E2E_BOOTSTRAP_MODE: "open",
      OMNIROUTE_PUBLIC_BASE_URL: "",
      NEXT_PUBLIC_BASE_URL: "",
      NEXT_PUBLIC_APP_URL: "",
      OMNIROUTE_TRUST_PROXY: "",
      OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK: "true",
      OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK: "true",
      OMNIROUTE_HIDE_HEALTHCHECK_LOGS: "true",
      PATH: process.env.PATH,
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  child.once("exit", (code, signal) => {
    exitInfo = { code, signal };
  });
  const collect = (chunk: Buffer) => {
    output.push(...String(chunk).split(/\r?\n/).filter(Boolean));
    if (output.length > 200) output.splice(0, output.length - 200);
  };
  child.stdout.on("data", collect);
  child.stderr.on("data", collect);
  return {
    child,
    output,
    get exitInfo() {
      return exitInfo;
    },
  };
}

type RawResponse = { status: number; body: string };

/** node:http, not fetch: fetch does not let a caller set the Host header. */
function rawRequest(headers: Record<string, string>, pathname = "/api/mcp/stream") {
  const body = JSON.stringify({ jsonrpc: "2.0", id: 1, method: "ping" });
  return new Promise<RawResponse>((resolve, reject) => {
    const req = http.request(
      {
        host: "127.0.0.1",
        port: SERVER_PORT,
        path: pathname,
        method: "POST",
        headers: {
          "content-type": "application/json",
          "content-length": Buffer.byteLength(body),
          ...headers,
        },
        timeout: 60_000,
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (chunk: Buffer) => chunks.push(chunk));
        res.on("end", () =>
          resolve({ status: res.statusCode ?? 0, body: Buffer.concat(chunks).toString("utf8") })
        );
      }
    );
    req.once("timeout", () => req.destroy(new Error("request timed out")));
    req.once("error", reject);
    req.end(body);
  });
}

async function waitForServer(proc: ReturnType<typeof createServerProcess>) {
  const deadline = Date.now() + 240_000;
  let last = "";
  while (Date.now() < deadline) {
    if (proc.exitInfo) {
      throw new Error(
        `Server exited early (code=${proc.exitInfo.code}, signal=${proc.exitInfo.signal})\n` +
          proc.output.slice(-40).join("\n")
      );
    }
    try {
      const resp = await fetch(`http://127.0.0.1:${SERVER_PORT}/api/health/ping`, {
        signal: AbortSignal.timeout(15_000),
      });
      if (resp.ok) return;
      last = `status ${resp.status}`;
    } catch (error) {
      last = error instanceof Error ? error.message : String(error);
    }
    await sleep(500);
  }
  throw new Error(`Timed out waiting for server (${last})\n${proc.output.slice(-40).join("\n")}`);
}

function assertReachedRoute(res: RawResponse, label: string) {
  assert.equal(res.status, 503, `${label}: ${res.body}`);
  assert.match(res.body, /MCP server is disabled/, label);
}

function assertInvalidOrigin(res: RawResponse, label: string) {
  assert.equal(res.status, 403, `${label}: ${res.body}`);
  const body = JSON.parse(res.body);
  assert.equal(body.jsonrpc, "2.0", label);
  assert.equal(body.error.data.code, "INVALID_ORIGIN", label);
}

let app: ReturnType<typeof createServerProcess>;

test.before(async () => {
  app = createServerProcess();
  await waitForServer(app);
});

test.after(async () => {
  try {
    if (app) await stopTestProcess(app.child);
  } finally {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("without an Origin header a loopback MCP request reaches the route", async () => {
  assertReachedRoute(await rawRequest({}), "no Origin");
});

test("the bound address and localhost origins are accepted", async () => {
  assertReachedRoute(
    await rawRequest({ origin: `http://127.0.0.1:${SERVER_PORT}` }),
    "bound origin"
  );
  assertReachedRoute(await rawRequest({ origin: "http://localhost:6274" }), "localhost origin");
});

test("DNS rebinding: a forged Host never turns its own Origin into a trusted one", async () => {
  // If request.url followed Host, the request-url candidate would be
  // http://evil.test:<port> and this would reach the route (503) instead.
  const evil = `evil.test:${SERVER_PORT}`;
  assertInvalidOrigin(
    await rawRequest({ host: evil, origin: `http://${evil}` }),
    "forged Host + same Origin"
  );
  assertInvalidOrigin(
    await rawRequest({ host: evil, origin: `http://${evil}` }, "/api/mcp/sse"),
    "forged Host + same Origin on /api/mcp/sse"
  );
  // The forged Host alone does not block a non-browser client.
  assertReachedRoute(await rawRequest({ host: evil }), "forged Host, no Origin");
});

test("forwarding headers on a loopback socket make it a proxy hop, not a local caller", async () => {
  // Any X-Forwarded-* header sets the via-proxy stamp (peer-stamp.mjs), so the
  // loopback socket is treated as a reverse proxy and the anonymous caller is
  // refused as LOCAL_ONLY before an attacker-chosen forwarded host could matter.
  for (const origin of [undefined, "https://evil.example.test"]) {
    const headers: Record<string, string> = {
      "x-forwarded-proto": "https",
      "x-forwarded-host": "evil.example.test",
    };
    if (origin) headers.origin = origin;
    const res = await rawRequest(headers);
    assert.equal(res.status, 403, `origin=${origin}: ${res.body}`);
    assert.equal(JSON.parse(res.body).error.code, "LOCAL_ONLY", `origin=${origin}`);
  }
});
