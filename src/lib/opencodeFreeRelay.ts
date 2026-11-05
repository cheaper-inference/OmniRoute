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
import { fileURLToPath } from "node:url";
import { isLoopbackHostname } from "@omniroute/open-sse/utils/urlHost.ts";
import { freeTierRelayUrl } from "@omniroute/open-sse/executors/opencodeFreeTierContract.ts";

let child: ChildProcess | null = null;

const RELAY_SCRIPT = path.join("scripts", "opencode-free-relay.ts");

/**
 * Relay script location: `OPENCODE_FREE_RELAY_SCRIPT`, else `scripts/opencode-free-relay.ts`
 * under the nearest ancestor of this module (the package root of an installed package or a
 * checkout), else under the working directory (container layouts that copy it next to the
 * server). Falls back to the working-directory path when none exists so the caller can report it.
 */
export function resolveRelayScript(moduleUrl: string = import.meta.url): string {
  const override = process.env.OPENCODE_FREE_RELAY_SCRIPT;
  if (override) return override;
  const candidates: string[] = [];
  try {
    let dir = path.dirname(fileURLToPath(moduleUrl));
    for (let i = 0; i < 8; i++) {
      candidates.push(path.join(dir, RELAY_SCRIPT));
      const parent = path.dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
  } catch {
    // module URL is not a file URL (bundled): fall through to the cwd candidate
  }
  const cwdScript = path.join(process.cwd(), RELAY_SCRIPT);
  candidates.push(cwdScript);
  return candidates.find((c) => fs.existsSync(c)) ?? cwdScript;
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
  if (!isLoopbackHostname(url.hostname))
    return { status: "external", detail: "relay URL is not loopback" };
  if (await healthy(relay)) return { status: "external", detail: "relay already answering" };
  if (child && child.exitCode === null) return { status: "spawned", detail: "already spawned" };

  const script = resolveRelayScript();
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
