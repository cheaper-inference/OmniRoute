/**
 * Shared harness for the working-directory `.env` CLI tests (tests/unit/cli-untrusted-cwd-env*.test.ts):
 * in-process loopback recorders, temp HOME / data dir / cwd layouts and a CLI runner that never
 * reaches the developer's real environment.
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { nativeCoverageArgs } from "./nativeCoverageArgs.ts";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
export const BIN = path.join(ROOT, "bin", "omniroute.mjs");

export type Hit = { url: string; authorization: string | null; cliToken: string | null };

export async function startRecorder(host = "127.0.0.1") {
  const hits: Hit[] = [];
  const server = http.createServer((req, res) => {
    hits.push({
      url: req.url ?? "",
      authorization: (req.headers.authorization as string) ?? null,
      cliToken: (req.headers["x-omniroute-cli-token"] as string) ?? null,
    });
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
  });
  await new Promise<void>((resolve) => server.listen(0, host, resolve));
  const { port } = server.address() as net.AddressInfo;
  return { hits, port, close: () => new Promise<void>((r) => server.close(() => r())) };
}

export async function freePort() {
  const srv = net.createServer();
  await new Promise<void>((resolve) => srv.listen(0, "127.0.0.1", resolve));
  const { port } = srv.address() as net.AddressInfo;
  await new Promise<void>((r) => srv.close(() => r()));
  return port;
}

export function layout() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-r6b1-"));
  const home = path.join(tmp, "home");
  const dataDir = path.join(home, ".omniroute");
  const cwd = path.join(tmp, "untrusted");
  fs.mkdirSync(dataDir, { recursive: true });
  fs.mkdirSync(cwd, { recursive: true });
  return { tmp, home, dataDir, cwd };
}

export function cleanEnv(home: string, extra: Record<string, string> = {}) {
  const env: Record<string, string> = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (value === undefined) continue;
    if (/^(OMNIROUTE_|NODE_|NPM_CONFIG_|DATA_DIR$|PORT$|API_PORT$|DASHBOARD_PORT$)/i.test(key)) {
      continue;
    }
    if (/_PROXY$|^XDG_|^LD_|^DYLD_|^SSL_CERT_|^USERPROFILE$|^APPDATA$/i.test(key)) continue;
    env[key] = value;
  }
  return {
    ...env,
    HOME: home,
    CI: "1",
    NO_UPDATE_NOTIFIER: "1",
    OMNIROUTE_NO_UPDATE_NOTIFIER: "1",
    OMNIROUTE_CLI_SKIP_REPO_ENV: "1",
    OMNIROUTE_CONTEXT_KEYCHAIN_DISABLED: "1",
    OMNIROUTE_DISABLE_CLI_TOKEN: "1",
    STORAGE_ENCRYPTION_KEY: "0".repeat(64),
    ...extra,
  };
}

export function cliCoverageNodeArgs(bin: string) {
  const args = nativeCoverageArgs();
  if (!args.length || bin === BIN) return args;
  try {
    return fs.readFileSync(bin).equals(fs.readFileSync(BIN)) ? args : [];
  } catch {
    return [];
  }
}

export function runCli(bin: string, args: string[], cwd: string, env: Record<string, string>) {
  return new Promise<{ code: number | null; stdout: string; stderr: string }>((resolve) => {
    const child = spawn(process.execPath, [...cliCoverageNodeArgs(bin), bin, ...args], {
      cwd,
      env,
      detached: true,
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (d) => (stdout += d));
    child.stderr.on("data", (d) => (stderr += d));
    const timer = setTimeout(() => {
      try {
        process.kill(-child.pid!, "SIGKILL");
      } catch {}
    }, 60_000);
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ code, stdout, stderr });
    });
  });
}

export function rm(dir: string) {
  fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
}
