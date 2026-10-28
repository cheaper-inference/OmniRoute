import test from "node:test";
import assert from "node:assert/strict";
import { spawn, type ChildProcess } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import tls from "node:tls";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

import { resolveMitmDataDir as resolveMitmDataDirTs } from "../../src/mitm/dataDir.ts";
import { decideCertMigration as decideCertMigrationTs } from "../../src/mitm/cert/migration.ts";

// bin/antigravity-bridge.mjs used to read `server.crt`/`server.key` from `CERT_DIR` or
// `$HOME/.omniroute/mitm` only: it ignored DATA_DIR and the root-CA model (`ca.crt`/`ca.key`,
// per-host leaves minted from the CA), so on a default root-CA install it exited with
// "Certificate files not found". It must pick the cert model the MITM server picks.

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const BRIDGE = path.join(ROOT, "bin", "antigravity-bridge.mjs");
const TARGET_HOST = "cloudcode-pa.googleapis.com";

const rootCaShim = require("../../src/mitm/_internal/rootCaShim.cjs");
type CertMode = "use-legacy-leaf" | "use-root-ca";
interface BridgeCertInfo {
  certDir: string;
  source: "CERT_DIR" | "DATA_DIR";
  mode: CertMode;
  certPath: string;
  keyPath: string;
  missing: string[];
}
type Env = Record<string, string | undefined>;
interface BridgeCertShim {
  resolveMitmDataDir(env: Env): string;
  decideCertMigration(certDir: string, rootCaEnabled: boolean): CertMode;
  resolveBridgeCert(env: Env, platform?: string, homeDir?: () => string): BridgeCertInfo;
  bridgeCertMissingMessage(info: BridgeCertInfo): string;
  createBridgeTlsProvider(
    env: Env
  ): BridgeCertInfo & { getSecureContext(host: string): Promise<tls.SecureContext> };
}
// Loaded lazily so the end-to-end script tests below report on their own.
const bridgeCert = new Proxy({} as BridgeCertShim, {
  get: (_t, prop: string) => require("../../src/mitm/_internal/bridgeCert.cjs")[prop],
});

const tmpDirs: string[] = [];
function tmpDir(prefix: string): string {
  const base = process.env.DATA_DIR || os.tmpdir();
  fs.mkdirSync(base, { recursive: true });
  const dir = fs.mkdtempSync(path.join(base, prefix));
  tmpDirs.push(dir);
  return dir;
}

test.after(() => {
  for (const dir of tmpDirs) {
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

let caPromise: Promise<{ key: string; cert: string }> | null = null;
/** One CA per test file — RSA generation is slow. Written into a scratch dir. */
function sharedCa(): Promise<{ key: string; cert: string }> {
  caPromise ||= rootCaShim.loadOrCreateMitmCa(tmpDir("bridge-ca-src-"));
  return caPromise;
}

async function writeRootCaInstall(dataDir: string): Promise<{ key: string; cert: string }> {
  const ca = await sharedCa();
  const certDir = path.join(dataDir, "mitm");
  fs.mkdirSync(certDir, { recursive: true });
  fs.writeFileSync(path.join(certDir, "ca.key"), ca.key);
  fs.writeFileSync(path.join(certDir, "ca.crt"), ca.cert);
  return ca;
}

async function writeLegacyPair(certDir: string): Promise<{ key: string; cert: string }> {
  const ca = await sharedCa();
  const leaf = await rootCaShim.issueLeafCert(TARGET_HOST, ca);
  fs.mkdirSync(certDir, { recursive: true });
  fs.writeFileSync(path.join(certDir, "server.key"), leaf.key);
  fs.writeFileSync(path.join(certDir, "server.crt"), leaf.cert);
  return ca;
}

function bridgeEnv(extra: Record<string, string>): NodeJS.ProcessEnv {
  return {
    PATH: process.env.PATH || "",
    HOME: tmpDir("bridge-home-"),
    NODE_ENV: "test",
    ...extra,
  };
}

async function freePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.once("error", reject);
    srv.listen(0, "127.0.0.1", () => {
      const port = (srv.address() as net.AddressInfo).port;
      srv.close(() => resolve(port));
    });
  });
}

interface StartedBridge {
  child: ChildProcess;
  listening: boolean;
  exitCode: number | null;
  output: string;
}

/** Spawn the real script; resolve once it listens, exits, or `ms` elapses. */
async function startBridge(env: NodeJS.ProcessEnv, ms = 15000): Promise<StartedBridge> {
  const child = spawn(process.execPath, [BRIDGE], { env, stdio: ["ignore", "pipe", "pipe"] });
  const state: StartedBridge = { child, listening: false, exitCode: null, output: "" };
  await new Promise<void>((resolve) => {
    const timer = setTimeout(resolve, ms);
    const onData = (chunk: Buffer) => {
      state.output += chunk.toString();
      if (state.output.includes("Antigravity Bridge listening")) {
        state.listening = true;
        clearTimeout(timer);
        resolve();
      }
    };
    child.stdout?.on("data", onData);
    child.stderr?.on("data", onData);
    child.once("exit", (code) => {
      state.exitCode = code;
      clearTimeout(timer);
      resolve();
    });
  });
  return state;
}

function stopBridge(bridge: StartedBridge): Promise<void> {
  if (bridge.child.exitCode !== null || bridge.child.signalCode !== null) {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    bridge.child.once("exit", () => resolve());
    bridge.child.kill("SIGTERM");
  });
}

/** CONNECT through the bridge and complete a TLS handshake that trusts only `caCert`. */
async function handshakeThroughBridge(
  port: number,
  caCert: string
): Promise<{ authorized: boolean; subjectCN: string; error: string | null }> {
  const socket = net.connect(port, "127.0.0.1");
  await new Promise<void>((resolve, reject) => {
    socket.once("connect", () => resolve());
    socket.once("error", reject);
  });
  socket.write(`CONNECT ${TARGET_HOST}:443 HTTP/1.1\r\nHost: ${TARGET_HOST}:443\r\n\r\n`);
  const head = await new Promise<string>((resolve, reject) => {
    let buf = "";
    const onData = (chunk: Buffer) => {
      buf += chunk.toString("latin1");
      if (buf.includes("\r\n\r\n")) {
        socket.off("data", onData);
        resolve(buf);
      }
    };
    socket.on("data", onData);
    socket.once("error", reject);
    socket.once("close", () => reject(new Error(`proxy closed before CONNECT reply: ${buf}`)));
  });
  assert.match(head, /^HTTP\/1\.1 200/, `CONNECT reply: ${head}`);

  return new Promise((resolve, reject) => {
    const tlsSocket = tls.connect({ socket, servername: TARGET_HOST, ca: [caCert] });
    tlsSocket.setTimeout(15000, () => {
      tlsSocket.destroy();
      reject(new Error("TLS handshake timed out"));
    });
    tlsSocket.once("secureConnect", () => {
      const peer = tlsSocket.getPeerCertificate();
      const result = {
        authorized: tlsSocket.authorized,
        subjectCN: String(peer?.subject?.CN ?? ""),
        error: tlsSocket.authorizationError ? String(tlsSocket.authorizationError) : null,
      };
      tlsSocket.destroy();
      resolve(result);
    });
    tlsSocket.once("error", reject);
  });
}

// ── Resolution logic ───────────────────────────────────────────────────────

test("resolveBridgeCert: DATA_DIR holding only ca.crt/ca.key resolves to the root-CA model", async () => {
  const dataDir = tmpDir("bridge-data-");
  await writeRootCaInstall(dataDir);
  const info = bridgeCert.resolveBridgeCert({ DATA_DIR: dataDir, HOME: tmpDir("bridge-home-") });
  assert.equal(info.certDir, path.join(dataDir, "mitm"));
  assert.equal(info.mode, "use-root-ca");
  assert.equal(info.certPath, path.join(dataDir, "mitm", "ca.crt"));
  assert.equal(info.keyPath, path.join(dataDir, "mitm", "ca.key"));
  assert.deepEqual(info.missing, []);
});

test("resolveBridgeCert: a legacy server.crt/server.key pair keeps the legacy-leaf model", async () => {
  const dataDir = tmpDir("bridge-data-");
  await writeLegacyPair(path.join(dataDir, "mitm"));
  const info = bridgeCert.resolveBridgeCert({ DATA_DIR: dataDir });
  assert.equal(info.mode, "use-legacy-leaf");
  assert.equal(info.certPath, path.join(dataDir, "mitm", "server.crt"));
  assert.equal(info.keyPath, path.join(dataDir, "mitm", "server.key"));
  assert.deepEqual(info.missing, []);
});

test("resolveBridgeCert: MITM_ROOT_CA_ENABLED=true forces root-CA even over a legacy pair", async () => {
  const dataDir = tmpDir("bridge-data-");
  await writeLegacyPair(path.join(dataDir, "mitm"));
  const info = bridgeCert.resolveBridgeCert({ DATA_DIR: dataDir, MITM_ROOT_CA_ENABLED: "true" });
  assert.equal(info.mode, "use-root-ca");
  assert.deepEqual(
    info.missing.map((p) => path.basename(p)),
    ["ca.crt", "ca.key"]
  );
  // Only the exact string "true" opts in, like the server/routes.
  const notOptedIn = bridgeCert.resolveBridgeCert({ DATA_DIR: dataDir, MITM_ROOT_CA_ENABLED: "1" });
  assert.equal(notOptedIn.mode, "use-legacy-leaf");
});

test("resolveBridgeCert: CERT_DIR overrides DATA_DIR", async () => {
  const dataDir = tmpDir("bridge-data-");
  await writeRootCaInstall(dataDir);
  const certDir = tmpDir("bridge-certdir-");
  await writeLegacyPair(certDir);
  const info = bridgeCert.resolveBridgeCert({ DATA_DIR: dataDir, CERT_DIR: certDir });
  assert.equal(info.certDir, path.resolve(certDir));
  assert.equal(info.mode, "use-legacy-leaf");
  assert.equal(info.certPath, path.join(certDir, "server.crt"));
});

test("resolveBridgeCert: without DATA_DIR/CERT_DIR it uses <HOME>/.omniroute/mitm", () => {
  const home = tmpDir("bridge-home-");
  const info = bridgeCert.resolveBridgeCert({ HOME: home }, "linux", () => home);
  assert.equal(info.certDir, path.join(home, ".omniroute", "mitm"));
});

test("bridgeCertMissingMessage: names the missing files and the per-mode remedy", () => {
  const dir = tmpDir("bridge-empty-");
  const rootCa = bridgeCert.resolveBridgeCert({ DATA_DIR: dir });
  assert.equal(rootCa.mode, "use-root-ca");
  const rootMsg = bridgeCert.bridgeCertMissingMessage(rootCa);
  assert.match(rootMsg, /Root CA/);
  assert.match(rootMsg, /ca\.crt/);
  assert.match(rootMsg, /Start the AgentBridge server once/);

  const legacy: BridgeCertInfo = {
    ...rootCa,
    mode: "use-legacy-leaf",
    missing: [path.join(dir, "server.key")],
  };
  const legacyMsg = bridgeCert.bridgeCertMissingMessage(legacy);
  assert.match(legacyMsg, /server\.key/);
  assert.match(legacyMsg, /cert\/regenerate/);
});

test("createBridgeTlsProvider: root-CA mode mints a CA-signed leaf per intercepted host", async () => {
  const dataDir = tmpDir("bridge-data-");
  const ca = await writeRootCaInstall(dataDir);
  const provider = bridgeCert.createBridgeTlsProvider({ DATA_DIR: dataDir });
  assert.equal(provider.mode, "use-root-ca");
  const ctx = await provider.getSecureContext(TARGET_HOST);
  assert.ok(ctx && typeof ctx === "object" && "context" in ctx, "returns a tls.SecureContext");
  assert.equal(await provider.getSecureContext(TARGET_HOST), ctx, "cached per host");
  assert.ok(ca.cert.includes("CERTIFICATE"));
});

test("createBridgeTlsProvider: throws the per-mode message when files are missing", () => {
  const dir = tmpDir("bridge-empty-");
  assert.throws(
    () => bridgeCert.createBridgeTlsProvider({ DATA_DIR: dir }),
    /Start the AgentBridge server once/
  );
  // The bridge never mints a CA itself: it would not be trusted by the OS.
  assert.equal(fs.existsSync(path.join(dir, "mitm", "ca.key")), false);
});

// ── Drift guard: the CJS twin must answer exactly like the TS sources ──────

test("CJS twin matches src/mitm/dataDir.ts and cert/migration.ts", async () => {
  const saved = { DATA_DIR: process.env.DATA_DIR, XDG: process.env.XDG_CONFIG_HOME };
  const xdg = tmpDir("bridge-xdg-");
  try {
    for (const scenario of [
      { DATA_DIR: tmpDir("bridge-data-"), XDG_CONFIG_HOME: undefined },
      { DATA_DIR: `  ${tmpDir("bridge-data-")}  `, XDG_CONFIG_HOME: undefined },
      { DATA_DIR: undefined, XDG_CONFIG_HOME: xdg },
      { DATA_DIR: "   ", XDG_CONFIG_HOME: undefined },
    ]) {
      for (const [key, value] of Object.entries(scenario)) {
        if (value === undefined) delete process.env[key];
        else process.env[key] = value;
      }
      assert.equal(bridgeCert.resolveMitmDataDir(process.env), resolveMitmDataDirTs());
    }
  } finally {
    if (saved.DATA_DIR === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = saved.DATA_DIR;
    if (saved.XDG === undefined) delete process.env.XDG_CONFIG_HOME;
    else process.env.XDG_CONFIG_HOME = saved.XDG;
  }

  const files = ["server.crt", "server.key", "ca.crt", "ca.key"];
  for (let mask = 0; mask < 16; mask++) {
    const dir = tmpDir("bridge-matrix-");
    files.forEach((f, i) => {
      if (mask & (1 << i)) fs.writeFileSync(path.join(dir, f), "x");
    });
    for (const enabled of [false, true]) {
      assert.equal(
        bridgeCert.decideCertMigration(dir, enabled),
        decideCertMigrationTs(dir, enabled),
        `mask=${mask} enabled=${enabled}`
      );
    }
  }
});

// ── The real script ────────────────────────────────────────────────────────

test("bridge script: root-CA install under DATA_DIR serves a CA-signed leaf for the target host", async () => {
  const dataDir = tmpDir("bridge-data-");
  const ca = await writeRootCaInstall(dataDir);
  const port = await freePort();
  const bridge = await startBridge(bridgeEnv({ DATA_DIR: dataDir, BRIDGE_PORT: String(port) }));
  try {
    assert.equal(bridge.listening, true, `bridge did not start:\n${bridge.output}`);
    const result = await handshakeThroughBridge(port, ca.cert);
    assert.equal(result.error, null);
    assert.equal(result.authorized, true);
    assert.equal(result.subjectCN, TARGET_HOST);
  } finally {
    await stopBridge(bridge);
  }
});

test("bridge script: legacy server.crt/server.key under DATA_DIR still works", async () => {
  const dataDir = tmpDir("bridge-data-");
  const ca = await writeLegacyPair(path.join(dataDir, "mitm"));
  const port = await freePort();
  const bridge = await startBridge(bridgeEnv({ DATA_DIR: dataDir, BRIDGE_PORT: String(port) }));
  try {
    assert.equal(bridge.listening, true, `bridge did not start:\n${bridge.output}`);
    const result = await handshakeThroughBridge(port, ca.cert);
    assert.equal(result.authorized, true);
    assert.equal(result.subjectCN, TARGET_HOST);
  } finally {
    await stopBridge(bridge);
  }
});

test("bridge script: CERT_DIR override is honored over DATA_DIR", async () => {
  const dataDir = tmpDir("bridge-data-");
  const certDir = tmpDir("bridge-certdir-");
  const ca = await writeLegacyPair(certDir);
  const port = await freePort();
  const bridge = await startBridge(
    bridgeEnv({ DATA_DIR: dataDir, CERT_DIR: certDir, BRIDGE_PORT: String(port) })
  );
  try {
    assert.equal(bridge.listening, true, `bridge did not start:\n${bridge.output}`);
    const result = await handshakeThroughBridge(port, ca.cert);
    assert.equal(result.authorized, true);
    assert.equal(result.subjectCN, TARGET_HOST);
  } finally {
    await stopBridge(bridge);
  }
});

test("bridge script: missing root CA exits at startup with the root-CA remedy", async () => {
  const dataDir = tmpDir("bridge-empty-");
  const port = await freePort();
  const bridge = await startBridge(bridgeEnv({ DATA_DIR: dataDir, BRIDGE_PORT: String(port) }));
  try {
    assert.equal(bridge.listening, false, `bridge started without a cert:\n${bridge.output}`);
    assert.equal(bridge.exitCode, 1);
    assert.match(bridge.output, /Start the AgentBridge server once/);
    assert.match(bridge.output, new RegExp(path.join(dataDir, "mitm").replace(/[/\\.]/g, "\\$&")));
  } finally {
    await stopBridge(bridge);
  }
});
