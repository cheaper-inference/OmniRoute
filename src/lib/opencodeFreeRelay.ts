/**
 * Lifecycle of the OpenCode free-tier Bun relay (`scripts/opencode-free-relay.ts`).
 *
 * Armed only when OPENCODE_FREE_TIER_RELAY_URL points at a loopback address. If something
 * already answers /health there (an externally managed sidecar), nothing is spawned.
 * Otherwise the relay is spawned with Bun — the current runtime when it is Bun, else `bun`
 * from PATH (or OPENCODE_FREE_RELAY_BUN) — and stopped with the server. Never fatal.
 */
import { spawn, type ChildProcess } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { freeTierRelayUrl } from "@omniroute/open-sse/executors/opencodeFreeTierContract.ts";

let child: ChildProcess | null = null;

function isLoopback(hostname: string): boolean {
  const host = hostname.replace(/^\[|\]$/g, "").toLowerCase();
  return host === "localhost" || host === "::1" || host === "127.0.0.1" || host.startsWith("127.");
}

async function healthy(base: string): Promise<boolean> {
  try {
    const res = await fetch(`${base}/health`, { signal: AbortSignal.timeout(1500) });
    return res.ok;
  } catch {
    return false;
  }
}

export type RelayStartResult =
  | { status: "disabled" | "external" | "missing-script" | "spawned"; detail?: string }
  | { status: "failed"; detail: string };

export async function startOpencodeFreeRelay(): Promise<RelayStartResult> {
  const relay = freeTierRelayUrl();
  if (!relay) return { status: "disabled" };
  const url = new URL(relay);
  if (!isLoopback(url.hostname)) return { status: "external", detail: "relay URL is not loopback" };
  if (await healthy(relay)) return { status: "external", detail: "relay already answering" };
  if (child && child.exitCode === null) return { status: "spawned", detail: "already spawned" };

  const script =
    process.env.OPENCODE_FREE_RELAY_SCRIPT ||
    path.join(process.cwd(), "scripts", "opencode-free-relay.ts");
  if (!fs.existsSync(script)) return { status: "missing-script", detail: script };

  const bun =
    process.env.OPENCODE_FREE_RELAY_BUN ||
    (typeof (process.versions as Record<string, string>).bun === "string"
      ? process.execPath
      : "bun");
  try {
    const port = url.port || (url.protocol === "https:" ? "443" : "80");
    child = spawn(bun, [script], {
      stdio: ["ignore", "inherit", "inherit"],
      windowsHide: true,
      env: {
        ...process.env,
        OPENCODE_FREE_RELAY_PORT: port,
        OPENCODE_FREE_RELAY_HOST: url.hostname.replace(/^\[|\]$/g, ""),
      },
    });
    child.on("error", (err) => {
      console.warn("[STARTUP] OpenCode free relay failed (non-fatal):", err.message);
      child = null;
    });
    child.on("exit", () => {
      child = null;
    });
    process.once("exit", () => child?.kill());
    return { status: "spawned", detail: `${bun} ${script}` };
  } catch (err) {
    return { status: "failed", detail: err instanceof Error ? err.message : String(err) };
  }
}

export function stopOpencodeFreeRelay(): void {
  child?.kill();
  child = null;
}
