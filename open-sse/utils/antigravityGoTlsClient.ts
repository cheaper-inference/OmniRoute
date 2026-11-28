import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { randomBytes } from "node:crypto";
import { existsSync } from "node:fs";
import http from "node:http";
import { dirname, join, resolve } from "node:path";

export interface AntigravityGoTargetMeta {
  url: string;
  method: string;
  headers: [string, string][];
  proxyUrl?: string;
  redirect?: string;
  connectGuard?: string;
  blockBenchmarkRange?: boolean;
}

export interface AntigravityGoBridgeResponseMeta {
  status: number;
  statusText: string;
  headers: [string, string][];
}

export interface AntigravityGoBridgeLike {
  send(
    meta: AntigravityGoTargetMeta,
    body: Uint8Array | null,
    signal?: AbortSignal | null
  ): Promise<Response>;
}

export class AntigravityGoBridgeError extends Error {
  code: string;
  isPreSend: boolean;
  isBridgeUnavailable: boolean;

  constructor(
    message: string,
    options: { code: string; isPreSend?: boolean; isBridgeUnavailable?: boolean }
  ) {
    super(message);
    this.name = "AntigravityGoBridgeError";
    this.code = options.code;
    this.isPreSend = options.isPreSend === true;
    this.isBridgeUnavailable = options.isBridgeUnavailable === true;
  }
}

const BINARY_SUBPATH = join(
  "open-sse",
  "native",
  "antigravity-go-tls",
  "build",
  process.platform === "win32" ? "antigravity-go-tls.exe" : "antigravity-go-tls"
);
const MAX_WALK_UP = 8;
const STARTUP_TIMEOUT_MS = 5_000;
const NULL_BODY_STATUSES = new Set([101, 204, 205, 304]);

const PRE_SEND_BRIDGE_CODES = new Set([
  "ECONNREFUSED",
  "ENOTFOUND",
  "EAI_AGAIN",
  "ENETUNREACH",
  "ERR_TLS_CERT",
  "ERR_PROXY_CONFIG",
  "ERR_INVALID_META",
]);

let binaryPathOverrideForTest: string | null | undefined = undefined;
let bridgeOverrideForTest: AntigravityGoBridgeLike | null = null;

function runtimeAnchors(): string[] {
  const anchors: string[] = [];
  if (typeof process.argv[1] === "string" && process.argv[1].length > 0) {
    anchors.push(dirname(resolve(process.argv[1])));
  }
  const cwd = process.cwd();
  if (!anchors.includes(cwd)) anchors.push(cwd);
  return anchors;
}

/**
 * Resolve the optional compiled Go sidecar binary across dev and standalone layouts
 * without `import.meta.url` (Next.js standalone freezes build-machine paths).
 */
export function resolveAntigravityGoBinaryPath(): string | null {
  if (binaryPathOverrideForTest !== undefined) {
    return binaryPathOverrideForTest && existsSync(binaryPathOverrideForTest)
      ? binaryPathOverrideForTest
      : null;
  }
  for (const anchor of runtimeAnchors()) {
    let dir = anchor;
    for (let depth = 0; depth < MAX_WALK_UP; depth++) {
      const candidate = join(dir, BINARY_SUBPATH);
      if (existsSync(candidate)) return candidate;
      const parent = dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
  }
  return null;
}

export function setAntigravityGoBinaryPathForTest(pathOrNull: string | null | undefined): void {
  binaryPathOverrideForTest = pathOrNull;
}

export function setAntigravityGoBridgeForTest(bridge: AntigravityGoBridgeLike | null): void {
  bridgeOverrideForTest = bridge;
}

export function hasAntigravityGoBridge(): boolean {
  return Boolean(bridgeOverrideForTest || resolveAntigravityGoBinaryPath());
}

interface BridgeHandle {
  port: number;
  token: string;
  proc: ChildProcessWithoutNullStreams;
}

let activeBridge: BridgeHandle | null = null;
let startingBridge: Promise<BridgeHandle | null> | null = null;
let exitHookRegistered = false;

function stopActiveBridge(): Promise<void> {
  const current = activeBridge;
  activeBridge = null;
  if (!current) return Promise.resolve();
  const proc = current.proc;
  const exited =
    proc.exitCode !== null || proc.signalCode !== null
      ? Promise.resolve()
      : new Promise<void>((resolveExit) => {
          const timer = setTimeout(resolveExit, 1_500);
          timer.unref?.();
          proc.once("exit", () => {
            clearTimeout(timer);
            resolveExit();
          });
        });
  try {
    proc.stdin.end();
  } catch {
    // ignore closed stdin
  }
  try {
    proc.kill();
  } catch {
    // ignore already exited child
  }
  return exited;
}

export async function stopAntigravityGoBridgeForTest(): Promise<void> {
  startingBridge = null;
  await stopActiveBridge();
}

function registerExitHook(): void {
  if (exitHookRegistered) return;
  exitHookRegistered = true;
  process.once("exit", () => {
    void stopActiveBridge();
  });
}

function unrefChildStreams(proc: ChildProcessWithoutNullStreams): void {
  proc.unref();
  (proc.stdin as { unref?: () => void }).unref?.();
  (proc.stdout as { unref?: () => void }).unref?.();
  (proc.stderr as { unref?: () => void }).unref?.();
}

function spawnBridgeProcess(binaryPath: string): Promise<BridgeHandle | null> {
  return new Promise((resolveStart) => {
    let settled = false;
    const token = randomBytes(24).toString("hex");
    let proc: ChildProcessWithoutNullStreams;

    try {
      proc = spawn(binaryPath, [], {
        stdio: ["pipe", "pipe", "pipe"],
        windowsHide: true,
      });
    } catch {
      resolveStart(null);
      return;
    }

    registerExitHook();

    let stdoutBuf = "";
    const finish = (handle: BridgeHandle | null) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      proc.stdout.off("data", onStdout);
      proc.off("error", onError);
      proc.off("exit", onExit);
      if (!handle) {
        try {
          proc.stdin.end();
        } catch {
          // ignore
        }
        try {
          proc.kill();
        } catch {
          // ignore
        }
      }
      resolveStart(handle);
    };

    const timer = setTimeout(() => finish(null), STARTUP_TIMEOUT_MS);
    timer.unref?.();

    const onError = () => finish(null);
    const onExit = () => {
      if (activeBridge?.proc === proc) activeBridge = null;
      finish(null);
    };

    const onStdout = (chunk: Buffer) => {
      stdoutBuf += chunk.toString("utf8");
      const newlineIdx = stdoutBuf.indexOf("\n");
      if (newlineIdx === -1) return;
      const line = stdoutBuf.slice(0, newlineIdx).trim();
      try {
        const parsed = JSON.parse(line) as { port?: unknown };
        if (typeof parsed.port === "number" && parsed.port > 0) {
          const handle: BridgeHandle = { port: parsed.port, token, proc };
          proc.once("exit", () => {
            if (activeBridge?.proc === proc) activeBridge = null;
          });
          // Drain stdout/stderr and unref streams so an idle sidecar never keeps Node alive.
          proc.stdout.resume();
          proc.stderr.resume();
          unrefChildStreams(proc);
          finish(handle);
          return;
        }
      } catch {
        // invalid ready payload
      }
      finish(null);
    };

    proc.stdout.on("data", onStdout);
    proc.once("error", onError);
    proc.once("exit", onExit);
    proc.stdin.on("error", () => {
      // ignore EPIPE if child dies early
    });
    proc.stdin.write(`${token}\n`);
  });
}

async function ensureBridgeHandle(): Promise<BridgeHandle | null> {
  if (activeBridge && !activeBridge.proc.killed && activeBridge.proc.exitCode === null) {
    return activeBridge;
  }
  activeBridge = null;
  if (startingBridge) return startingBridge;

  const binaryPath = resolveAntigravityGoBinaryPath();
  if (!binaryPath) return null;

  startingBridge = spawnBridgeProcess(binaryPath)
    .then((handle) => {
      if (handle) activeBridge = handle;
      return handle;
    })
    .finally(() => {
      startingBridge = null;
    });

  return startingBridge;
}

function toAsciiJson(value: unknown): string {
  return JSON.stringify(value).replace(/[\u007f-\uffff]/g, (ch) => {
    return `\\u${ch.charCodeAt(0).toString(16).padStart(4, "0")}`;
  });
}

function createAbortError(signal?: AbortSignal | null): unknown {
  if (signal?.reason !== undefined) return signal.reason;
  return new DOMException("The operation was aborted.", "AbortError");
}

function parseErrorPayload(raw: string): { code: string; message: string } {
  try {
    const parsed = JSON.parse(raw) as { code?: unknown; message?: unknown };
    return {
      code: typeof parsed.code === "string" ? parsed.code : "ERR_NETWORK",
      message: typeof parsed.message === "string" ? parsed.message : "Bridge request failed",
    };
  } catch {
    return { code: "ERR_NETWORK", message: raw.slice(0, 200) || "Bridge request failed" };
  }
}

function buildWebHeaders(pairs: [string, string][]): Headers {
  const headers = new Headers();
  for (const [k, v] of pairs) {
    try {
      headers.append(k, v);
    } catch {
      // ignore invalid header entries defensively
    }
  }
  return headers;
}

function parseMetaLine(lineBuf: Buffer): AntigravityGoBridgeResponseMeta {
  const parsed = JSON.parse(lineBuf.toString("utf8")) as Partial<AntigravityGoBridgeResponseMeta>;
  return {
    status: typeof parsed.status === "number" ? parsed.status : 502,
    statusText: typeof parsed.statusText === "string" ? parsed.statusText : "",
    headers: Array.isArray(parsed.headers) ? parsed.headers : [],
  };
}

function requestBridgeHandle(
  handle: BridgeHandle,
  meta: AntigravityGoTargetMeta,
  body: Uint8Array | null,
  signal?: AbortSignal | null
): Promise<Response> {
  if (signal?.aborted) {
    return Promise.reject(createAbortError(signal));
  }

  return new Promise<Response>((resolveResponse, rejectResponse) => {
    let headSettled = false;
    const reqHeaders: Record<string, string> = {
      "X-Bridge-Token": handle.token,
      "X-Target-Meta": toAsciiJson(meta),
    };
    if (body && body.byteLength > 0) {
      reqHeaders["Content-Length"] = String(body.byteLength);
    } else if (meta.method !== "GET" && meta.method !== "HEAD") {
      reqHeaders["Content-Length"] = "0";
    }

    const req = http.request({
      hostname: "127.0.0.1",
      port: handle.port,
      path: "/fetch",
      method: "POST",
      headers: reqHeaders,
    });

    const onPreResponseAbort = () => {
      const err = createAbortError(signal);
      req.destroy();
      if (!headSettled) {
        headSettled = true;
        rejectResponse(err);
      }
    };
    signal?.addEventListener("abort", onPreResponseAbort, { once: true });

    const failBeforeHeaders = (err: unknown) => {
      signal?.removeEventListener("abort", onPreResponseAbort);
      if (headSettled) return;
      headSettled = true;
      rejectResponse(err);
    };

    req.on("error", (err) => {
      if (signal?.aborted) {
        failBeforeHeaders(createAbortError(signal));
        return;
      }
      const code = (err as NodeJS.ErrnoException).code || "ERR_BRIDGE_IO";
      if (
        (code === "ECONNREFUSED" || code === "ECONNRESET" || code === "EPIPE") &&
        activeBridge?.proc === handle.proc
      ) {
        activeBridge = null;
      }
      failBeforeHeaders(
        new AntigravityGoBridgeError(err.message, {
          code,
          isPreSend: true,
          isBridgeUnavailable: code === "ECONNREFUSED" || code === "ECONNRESET",
        })
      );
    });

    req.on("response", (res) => {
      if (res.statusCode !== 200) {
        const chunks: Buffer[] = [];
        res.on("data", (chunk: Buffer) => chunks.push(chunk));
        res.on("end", () => {
          const payload = parseErrorPayload(Buffer.concat(chunks).toString("utf8"));
          failBeforeHeaders(
            new AntigravityGoBridgeError(payload.message, {
              code: payload.code,
              isPreSend: PRE_SEND_BRIDGE_CODES.has(payload.code),
            })
          );
        });
        res.on("error", (err) => {
          failBeforeHeaders(
            new AntigravityGoBridgeError(err.message, {
              code: (err as NodeJS.ErrnoException).code || "ERR_BRIDGE_IO",
              isPreSend: true,
            })
          );
        });
        return;
      }

      let buffered: Buffer = Buffer.alloc(0);

      const detachHeadListeners = () => {
        res.off("data", onMetaChunk);
        res.off("end", onEarlyEnd);
        res.off("close", onEarlyClose);
        res.off("error", onEarlyError);
      };

      const onEarlyEnd = () => {
        detachHeadListeners();
        failBeforeHeaders(
          new AntigravityGoBridgeError("Go TLS bridge ended before response metadata", {
            code: "ECONNRESET",
            isPreSend: true,
          })
        );
      };
      const onEarlyClose = () => {
        detachHeadListeners();
        failBeforeHeaders(
          new AntigravityGoBridgeError("Go TLS bridge closed before response metadata", {
            code: "ECONNRESET",
            isPreSend: true,
          })
        );
      };
      const onEarlyError = (err: Error) => {
        detachHeadListeners();
        failBeforeHeaders(
          new AntigravityGoBridgeError(err.message, {
            code: (err as NodeJS.ErrnoException).code || "ERR_BRIDGE_IO",
            isPreSend: true,
          })
        );
      };

      const onMetaChunk = (chunk: Buffer) => {
        buffered = buffered.length > 0 ? Buffer.concat([buffered, chunk]) : chunk;
        const newlineIdx = buffered.indexOf(0x0a);
        if (newlineIdx === -1) return;

        detachHeadListeners();
        signal?.removeEventListener("abort", onPreResponseAbort);

        let respMeta: AntigravityGoBridgeResponseMeta;
        try {
          respMeta = parseMetaLine(buffered.subarray(0, newlineIdx));
        } catch (parseErr) {
          res.destroy();
          failBeforeHeaders(
            new AntigravityGoBridgeError(
              parseErr instanceof Error ? parseErr.message : "Invalid bridge metadata",
              { code: "ERR_ENCODE_META", isPreSend: false }
            )
          );
          return;
        }

        const remainder = buffered.subarray(newlineIdx + 1);
        headSettled = true;

        const isNullBody =
          meta.method.toUpperCase() === "HEAD" || NULL_BODY_STATUSES.has(respMeta.status);
        const responseHeaders = buildWebHeaders(respMeta.headers);

        if (isNullBody) {
          res.resume();
          resolveResponse(
            new Response(null, {
              status: respMeta.status,
              statusText: respMeta.statusText,
              headers: responseHeaders,
            })
          );
          return;
        }

        let cancelStreamCleanup: (() => void) | null = null;
        const bodyStream = new ReadableStream<Uint8Array>({
          start(controller) {
            let streamClosed = false;
            let endedCleanly = false;

            const cleanup = () => {
              signal?.removeEventListener("abort", onBodyAbort);
              res.off("data", onBodyData);
              res.off("end", onBodyEnd);
              res.off("close", onBodyClose);
              res.off("error", onBodyError);
            };
            cancelStreamCleanup = () => {
              streamClosed = true;
              cleanup();
            };

            const closeStream = () => {
              if (streamClosed) return;
              streamClosed = true;
              cleanup();
              controller.close();
            };

            const errorStream = (err: unknown) => {
              if (streamClosed) return;
              streamClosed = true;
              cleanup();
              controller.error(err);
            };

            const onBodyAbort = () => {
              const err = createAbortError(signal);
              res.destroy();
              errorStream(err);
            };

            const onBodyData = (dataChunk: Buffer) => {
              if (streamClosed) return;
              controller.enqueue(new Uint8Array(dataChunk));
            };

            const onBodyEnd = () => {
              endedCleanly = true;
              closeStream();
            };

            const onBodyClose = () => {
              if (streamClosed) return;
              if (signal?.aborted) {
                errorStream(createAbortError(signal));
                return;
              }
              if (endedCleanly || res.complete) {
                closeStream();
                return;
              }
              errorStream(
                new AntigravityGoBridgeError("Antigravity Go TLS upstream stream interrupted", {
                  code: "ECONNRESET",
                })
              );
            };

            const onBodyError = (err: Error) => {
              if (signal?.aborted) {
                errorStream(createAbortError(signal));
                return;
              }
              errorStream(err);
            };

            if (remainder.length > 0) {
              controller.enqueue(new Uint8Array(remainder));
            }

            if (signal?.aborted) {
              onBodyAbort();
              return;
            }

            signal?.addEventListener("abort", onBodyAbort, { once: true });
            res.on("data", onBodyData);
            res.on("end", onBodyEnd);
            res.on("close", onBodyClose);
            res.on("error", onBodyError);

            if (res.readableEnded) {
              endedCleanly = true;
              closeStream();
            }
          },
          cancel() {
            cancelStreamCleanup?.();
            res.destroy();
          },
        });

        resolveResponse(
          new Response(bodyStream, {
            status: respMeta.status,
            statusText: respMeta.statusText,
            headers: responseHeaders,
          })
        );
      };

      res.on("data", onMetaChunk);
      res.once("end", onEarlyEnd);
      res.once("close", onEarlyClose);
      res.once("error", onEarlyError);
    });

    if (body && body.byteLength > 0) {
      req.end(Buffer.from(body.buffer, body.byteOffset, body.byteLength));
    } else {
      req.end();
    }
  });
}

export async function sendViaAntigravityGoBridge(
  meta: AntigravityGoTargetMeta,
  body: Uint8Array | null,
  signal?: AbortSignal | null
): Promise<Response | null> {
  if (bridgeOverrideForTest) {
    return bridgeOverrideForTest.send(meta, body, signal);
  }
  const handle = await ensureBridgeHandle();
  if (!handle) return null;
  return requestBridgeHandle(handle, meta, body, signal);
}
