import { spawn } from "node:child_process";
import { isIP } from "node:net";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { request } from "undici";
import { createSocksDispatcherWithFamily } from "@omniroute/open-sse/utils/socksConnectorWithFamily";
import { coreEnvironment, probeSocks } from "./runtime";
import type { ManagedCore } from "./config";

export async function startTemporaryCore(
  _core: ManagedCore,
  executable: string,
  config: string,
  port: number,
  signal: AbortSignal
): Promise<() => Promise<void>> {
  signal.throwIfAborted();
  const child = spawn(executable, ["run", "-c", config], {
    cwd: path.dirname(config),
    env: coreEnvironment(),
    stdio: "ignore",
    windowsHide: true,
  });
  let exited = false;
  let failed = false;
  const closed = new Promise<void>((resolve) => {
    child.on("error", () => {
      failed = true;
      // A failed kill can emit an error while the process is still alive.
      if (!child.pid) {
        exited = true;
        resolve();
      }
    });
    child.once("close", () => {
      exited = true;
      resolve();
    });
  });
  const cleanup = async () => {
    signal.removeEventListener("abort", abort);
    if (exited) return;
    child.kill();
    await Promise.race([closed, delay(1000)]);
    if (!exited) {
      child.kill("SIGKILL");
      await Promise.race([closed, delay(1000)]);
    }
    if (!exited) throw new Error("Managed temporary core could not be stopped");
  };
  const abort = () => child.kill();
  signal.addEventListener("abort", abort, { once: true });
  try {
    for (let attempt = 0; attempt < 30; attempt++) {
      signal.throwIfAborted();
      if (failed || exited) throw new Error("Managed temporary core exited");
      if (await probeSocks(port, signal)) return cleanup;
      await delay(100, undefined, { signal });
    }
    throw new Error("Managed temporary core did not become ready");
  } catch (error) {
    await cleanup();
    throw error;
  }
}

/** Fixed HTTPS target, no application credentials, redirects, configurable URLs or response logs. */
export async function probeTemporaryCore(port: number, signal: AbortSignal) {
  const dispatcher = createSocksDispatcherWithFamily({ type: 5, host: "127.0.0.1", port }, 4, {
    connections: 1,
    connectTimeout: 10000,
    pipelining: 0,
    connect: { rejectUnauthorized: true, timeout: 10000 },
  });
  const start = Date.now();
  try {
    const response = await request("https://api.ipify.org?format=json", {
      dispatcher,
      signal,
      headersTimeout: 10000,
      bodyTimeout: 10000,
    });
    try {
      if (response.statusCode !== 200) throw new Error("Managed proxy probe failed");
      let size = 0;
      const chunks: Buffer[] = [];
      for await (const chunk of response.body) {
        size += chunk.length;
        if (size > 4096) throw new Error("Managed proxy probe response exceeds limit");
        chunks.push(Buffer.from(chunk));
      }
      const payload = JSON.parse(Buffer.concat(chunks).toString("utf8"));
      if (typeof payload.ip !== "string" || !isIP(payload.ip))
        throw new Error("Managed proxy probe returned an invalid IP");
      return {
        success: true as const,
        publicIp: payload.ip as string,
        latencyMs: Date.now() - start,
      };
    } finally {
      response.body.destroy();
    }
  } finally {
    await dispatcher.close();
  }
}
