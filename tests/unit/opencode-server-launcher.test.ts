import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import type { AddressInfo } from "node:net";

// The launcher reads the URL setting through the settings DB; isolate it.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-opencode-launcher-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { isLocalOnlyPath } = await import("../../src/server/authz/routeGuard.ts");
const { classifyRoute } = await import("../../src/server/authz/classify.ts");
const launcher = await import("../../open-sse/services/opencodeServerLauncher.ts");
const { clearOpencodeServerSettingsCache } =
  await import("../../open-sse/services/opencodeServerSettings.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const LIFECYCLE_PATHS = [
  "/api/services/opencode-server/status",
  "/api/services/opencode-server/start",
  "/api/services/opencode-server/stop",
];

test("opencode-server lifecycle routes are loopback-only (Hard Rules #15/#17)", () => {
  for (const route of LIFECYCLE_PATHS) {
    for (const method of ["GET", "POST"]) {
      assert.equal(isLocalOnlyPath(route, method), true, `${method} ${route}`);
      assert.notEqual(classifyRoute(route, method).routeClass, "PUBLIC", `${method} ${route}`);
    }
  }
  // The inference surface stays remote-reachable: it no longer spawns anything.
  assert.equal(isLocalOnlyPath("/api/v1/chat/completions", "POST"), false);
});

test("opencode-server lifecycle route files exist where the classification expects them", () => {
  const root = path.resolve(import.meta.dirname, "../..");
  for (const route of LIFECYCLE_PATHS) {
    const file = path.join(root, "src/app", route, "route.ts");
    assert.ok(fs.existsSync(file), file);
  }
});

test("resolveOpencodeBinary: OPENCODE_SERVER_BIN, then CLI_OPENCODE_BIN, then known locations", () => {
  assert.equal(
    launcher.resolveOpencodeBinary({ OPENCODE_SERVER_BIN: " /opt/oc ", CLI_OPENCODE_BIN: "/x" }),
    "/opt/oc"
  );
  assert.equal(launcher.resolveOpencodeBinary({ CLI_OPENCODE_BIN: "/x" }), "/x");
  const fallback = launcher.resolveOpencodeBinary({ HOME: TEST_DATA_DIR });
  assert.ok(fallback.endsWith("opencode") || fallback.endsWith("opencode.cmd"), fallback);
});

function writeMarkerBin(name: string): { bin: string; marker: string } {
  const marker = path.join(TEST_DATA_DIR, `${name}.marker`);
  const bin = path.join(TEST_DATA_DIR, `${name}.sh`);
  fs.writeFileSync(bin, `#!/bin/sh\necho spawned > "${marker}"\n`, { mode: 0o755 });
  return { bin, marker };
}

test("startOpencodeServer refuses a non-loopback URL instead of spawning", async () => {
  const { bin, marker } = writeMarkerBin("remote");
  process.env.OPENCODE_SERVER_URL = "http://192.0.2.1:4096";
  process.env.OPENCODE_SERVER_BIN = bin;
  clearOpencodeServerSettingsCache();
  try {
    await assert.rejects(launcher.startOpencodeServer(), /not a loopback URL/);
    assert.equal(fs.existsSync(marker), false);
  } finally {
    delete process.env.OPENCODE_SERVER_BIN;
    delete process.env.OPENCODE_SERVER_URL;
  }
});

test("startOpencodeServer reuses a server that already answers instead of spawning", async () => {
  const server = http.createServer((req, res) => {
    if (req.url === "/global/health") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ healthy: true, version: "9.9.9" }));
      return;
    }
    res.writeHead(404).end();
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as AddressInfo;
  const { bin, marker } = writeMarkerBin("reuse");
  process.env.OPENCODE_SERVER_URL = `http://127.0.0.1:${port}`;
  process.env.OPENCODE_SERVER_BIN = bin;
  clearOpencodeServerSettingsCache();
  try {
    const status = await launcher.startOpencodeServer();
    assert.equal(status.running, true);
    assert.equal(status.version, "9.9.9");
    assert.equal(status.managed, false);
    assert.equal(fs.existsSync(marker), false);

    const stopped = await launcher.stopOpencodeServer();
    // Not started by this process, so stop leaves it alone.
    assert.equal(stopped.running, true);
  } finally {
    delete process.env.OPENCODE_SERVER_BIN;
    delete process.env.OPENCODE_SERVER_URL;
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});

test("getOpencodeServerStatus reports a stopped server without starting it", async () => {
  const { bin, marker } = writeMarkerBin("status");
  const probe = http.createServer();
  await new Promise<void>((resolve) => probe.listen(0, "127.0.0.1", resolve));
  const { port } = probe.address() as AddressInfo;
  await new Promise<void>((resolve) => probe.close(() => resolve()));
  process.env.OPENCODE_SERVER_URL = `http://127.0.0.1:${port}`;
  process.env.OPENCODE_SERVER_BIN = bin;
  clearOpencodeServerSettingsCache();
  try {
    const status = await launcher.getOpencodeServerStatus();
    assert.deepEqual(
      { running: status.running, managed: status.managed, pid: status.pid },
      { running: false, managed: false, pid: null }
    );
    assert.equal(fs.existsSync(marker), false);
  } finally {
    delete process.env.OPENCODE_SERVER_BIN;
    delete process.env.OPENCODE_SERVER_URL;
  }
});

test("start spawns the env binary with `serve --port --hostname` and stop terminates it", async () => {
  // A stand-in `opencode` that serves /global/health on the port it is given.
  const bin = path.join(TEST_DATA_DIR, "fake-opencode-serve.mjs");
  fs.writeFileSync(
    bin,
    [
      "#!/usr/bin/env node",
      'import http from "node:http";',
      "const argv = process.argv.slice(2);",
      'const port = Number(argv[argv.indexOf("--port") + 1]);',
      'const host = argv[argv.indexOf("--hostname") + 1];',
      'if (argv[0] !== "serve") process.exit(2);',
      "http",
      "  .createServer((req, res) => {",
      '    res.writeHead(200, { "content-type": "application/json" });',
      '    res.end(JSON.stringify({ healthy: true, version: "fake" }));',
      "  })",
      "  .listen(port, host);",
      "",
    ].join("\n"),
    { mode: 0o755 }
  );
  const probe = http.createServer();
  await new Promise<void>((resolve) => probe.listen(0, "127.0.0.1", resolve));
  const { port } = probe.address() as AddressInfo;
  await new Promise<void>((resolve) => probe.close(() => resolve()));
  process.env.OPENCODE_SERVER_URL = `http://127.0.0.1:${port}`;
  process.env.OPENCODE_SERVER_BIN = bin;
  process.env.OMNIROUTE_LOG_DIR = TEST_DATA_DIR;
  process.env.OPENCODE_SERVER_START_TIMEOUT_MS = "20000";
  clearOpencodeServerSettingsCache();
  try {
    const started = await launcher.startOpencodeServer();
    assert.equal(started.running, true);
    assert.equal(started.version, "fake");
    assert.equal(started.managed, true);
    assert.ok(started.pid && started.pid > 0);

    const stopped = await launcher.stopOpencodeServer();
    assert.equal(stopped.running, false);
    assert.equal(stopped.managed, false);
  } finally {
    await launcher.stopOpencodeServer().catch(() => {});
    delete process.env.OPENCODE_SERVER_BIN;
    delete process.env.OPENCODE_SERVER_URL;
    delete process.env.OMNIROUTE_LOG_DIR;
    delete process.env.OPENCODE_SERVER_START_TIMEOUT_MS;
  }
});
