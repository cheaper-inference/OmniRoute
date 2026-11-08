/**
 * The standalone AgentBridge proxy counts failed Traffic Inspector posts (ingest.cjs). The count
 * must reach stats.json, the proxy's status file, or a broken capture path still looks like an
 * empty capture there. This runs the real server.cjs against a loopback router stub, so no
 * provider is contacted.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import https from "node:https";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { spawn, type ChildProcess } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const serverPath = path.resolve(here, "../../src/mitm/server.cjs");
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mitm-stats-"));
const statsFile = path.join(dataDir, "mitm", "stats.json");
const TARGET_HOST = "daily-cloudcode-pa.googleapis.com";
const INGEST_PATH = "/api/tools/traffic-inspector/internal/ingest";

let ingestStatus = 403;
let ingestPosts = 0;
let child: ChildProcess | null = null;
// Keep the client socket open between requests. Otherwise the proxy's socket-close stats write
// would publish the count and hide a missing write after the failed post.
const clientAgent = new https.Agent({ keepAlive: true, maxSockets: 1 });

// Loopback stand-in for the OmniRoute router: the ingest endpoint answers with `ingestStatus`,
// every chat route answers 500 (the proxy only needs some answer to finish the request).
const router = http.createServer((req, res) => {
  req.resume();
  req.on("end", () => {
    if (req.url === INGEST_PATH) {
      ingestPosts += 1;
      res.writeHead(ingestStatus).end("{}");
    } else {
      res.writeHead(500).end("stub");
    }
  });
});

async function listen(server: http.Server, port = 0): Promise<number> {
  await new Promise<void>((resolve) => server.listen(port, "127.0.0.1", resolve));
  return (server.address() as net.AddressInfo).port;
}

async function freePort(): Promise<number> {
  const probe = http.createServer();
  const port = await listen(probe);
  await new Promise((resolve) => probe.close(resolve));
  return port;
}

function readStats(): Record<string, unknown> {
  try {
    return JSON.parse(fs.readFileSync(statsFile, "utf8"));
  } catch {
    return {};
  }
}

async function waitFor(done: () => boolean, ms: number): Promise<void> {
  const deadline = Date.now() + ms;
  while (!done() && Date.now() < deadline) await new Promise((r) => setTimeout(r, 50));
}

function sendIntercepted(port: number): Promise<void> {
  const body = JSON.stringify({ model: "gemini-x", request: { contents: [{ role: "user" }] } });
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        host: "127.0.0.1",
        port,
        method: "POST",
        path: "/v1beta/models/gemini-x:generateContent",
        headers: { host: TARGET_HOST, "content-type": "application/json" },
        rejectUnauthorized: false,
        agent: clientAgent,
      },
      (res) => {
        res.resume();
        res.on("end", resolve);
      }
    );
    req.on("error", reject);
    req.end(body);
  });
}

const routerPort = await listen(router);
const proxyPort = await freePort();

fs.mkdirSync(path.join(dataDir, "mitm"), { recursive: true });
fs.writeFileSync(
  path.join(dataDir, "db.json"),
  JSON.stringify({ mitmAlias: { antigravity: { "gemini-x": "openai/gpt-x" } } })
);

child = spawn(process.execPath, [serverPath], {
  env: {
    ...process.env,
    DATA_DIR: dataDir,
    ROUTER_API_KEY: "test-router-key",
    INSPECTOR_INTERNAL_INGEST_TOKEN: "test-ingest-token",
    OMNIROUTE_BASE_URL: `http://127.0.0.1:${routerPort}`,
    MITM_LOCAL_PORT: String(proxyPort),
    MITM_CERT_MODE: "root-ca",
    MITM_VERBOSE: "0",
  },
  stdio: "ignore",
});

test.after(async () => {
  clientAgent.destroy();
  child?.kill("SIGTERM");
  await new Promise((resolve) => router.close(resolve));
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("stats.json starts with a zero ingest failure count", async () => {
  await waitFor(() => typeof readStats().startedAt === "string", 30_000);
  assert.equal(typeof readStats().startedAt, "string", "proxy did not start");
  assert.equal(readStats().ingestFailures, 0);
});

test("failed inspector posts show up in stats.json", async () => {
  ingestStatus = 403;
  await sendIntercepted(proxyPort);
  // One post for the in-flight capture and one after the intercept.
  await waitFor(() => readStats().ingestFailures === 2, 5_000);
  assert.equal(ingestPosts, 2);
  assert.equal(readStats().ingestFailures, 2);
});

test("accepted inspector posts do not raise the count", async () => {
  ingestStatus = 200;
  const before = ingestPosts;
  await sendIntercepted(proxyPort);
  await waitFor(() => ingestPosts === before + 2, 5_000);
  assert.equal(ingestPosts, before + 2);
  await new Promise((r) => setTimeout(r, 200));
  assert.equal(readStats().ingestFailures, 2);
});
