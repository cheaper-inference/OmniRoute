import { spawn } from "child_process";
import { getLookupEnv } from "@/shared/services/cliRuntime";
import { acquireQoderCliSlot, QoderCliQueueTimeoutError } from "./qoderCliConcurrency";
import { resolveQoderCliInvocation } from "./qoderCliResolve";

const DEFAULT_TIMEOUT_MS = 45_000;

export type QoderCliRunResult = {
  ok: boolean;
  code: number | null;
  stdout: string;
  stderr: string;
  timedOut: boolean;
  error: string | null;
  /** No qodercli slot freed up within the queue timeout; nothing was spawned. */
  busy?: boolean;
};

export function buildQoderCliEnv(token: string | null | undefined): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = { ...getLookupEnv() };
  const trimmed = String(token || "").trim();
  if (trimmed) env.QODER_PERSONAL_ACCESS_TOKEN = trimmed;
  return env;
}

export type SpawnQoderCliOptions = {
  args: string[];
  token?: string | null;
  stdin?: string | null;
  signal?: AbortSignal | null;
  timeoutMs?: number;
  command?: string | null;
  cwd?: string | null;
};

/**
 * SIGKILL the whole qodercli process tree. On POSIX the child is spawned as the
 * leader of its own process group, so a negative pid reaches every descendant;
 * killing only the direct child would orphan anything it spawned.
 */
export function killQoderCliProcessTree(child: ReturnType<typeof spawn>): void {
  const pid = child.pid;
  if (!pid) return;
  if (process.platform === "win32") {
    try {
      spawn("taskkill", ["/pid", String(pid), "/T", "/F"], { windowsHide: true, stdio: "ignore" });
    } catch {
      /* fall through to the direct kill */
    }
  } else {
    try {
      process.kill(-pid, "SIGKILL");
      return;
    } catch {
      /* group already gone, or not a group leader — fall back to the direct kill */
    }
  }
  try {
    child.kill("SIGKILL");
  } catch {
    /* already gone */
  }
}

/**
 * Low-level qodercli spawn. The PAT (if any) is passed via the
 * `QODER_PERSONAL_ACCESS_TOKEN` env var — the only env var the official CLI
 * honors for headless PAT auth — and the prompt is piped through stdin so no
 * untrusted value is ever interpolated into a shell command (Hard Rule #13).
 * Every spawn holds a slot of the process-wide qodercli gate for its lifetime.
 */
export async function spawnQoderCli(options: SpawnQoderCliOptions): Promise<QoderCliRunResult> {
  return runWithQoderCliSlot(options.signal, () => spawnQoderCliUnlimited(options));
}

/**
 * Run qodercli work while holding a slot of the process-wide gate. Queue
 * timeouts and aborts while queued come back as failed results, nothing spawned.
 */
export async function runWithQoderCliSlot(
  signal: AbortSignal | null | undefined,
  fn: () => Promise<QoderCliRunResult>
): Promise<QoderCliRunResult> {
  let release: () => void;
  try {
    release = await acquireQoderCliSlot({ signal });
  } catch (err) {
    return {
      ok: false,
      code: null,
      stdout: "",
      stderr: "",
      timedOut: false,
      error: (err as Error).message,
      busy: err instanceof QoderCliQueueTimeoutError,
    };
  }
  try {
    return await fn();
  } finally {
    release();
  }
}

function failedQoderCliRun(error: string): QoderCliRunResult {
  return { ok: false, code: null, stdout: "", stderr: "", timedOut: false, error };
}

async function spawnQoderCliUnlimited(options: SpawnQoderCliOptions): Promise<QoderCliRunResult> {
  // #6263: resolve the real qodercli command (absolute .cmd/.exe on Windows) and
  // whether it needs a shell, then spawn with the cliRuntime-enriched env (PATH +
  // PATHEXT + APPDATA) so the npm `.cmd` wrapper under %APPDATA%\npm is found.
  const { command, useShell } = await resolveQoderCliInvocation(options.command);

  let child: ReturnType<typeof spawn>;
  try {
    child = spawn(command, options.args, {
      env: buildQoderCliEnv(options.token),
      cwd: options.cwd || undefined,
      stdio: ["pipe", "pipe", "pipe"],
      windowsHide: true,
      detached: process.platform !== "win32",
      ...(useShell ? { shell: true } : {}),
    });
  } catch (err) {
    return failedQoderCliRun((err as Error).message);
  }
  return collectQoderCliRun(child, options);
}

/** Kill the child on timeout or abort; `stop()` detaches both triggers. */
function guardQoderCliChild(
  child: ReturnType<typeof spawn>,
  signal: AbortSignal | null | undefined,
  timeoutMs: number
): { timedOut: () => boolean; stop: () => void } {
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    killQoderCliProcessTree(child);
  }, timeoutMs);
  timer.unref?.();

  const onAbort = () => killQoderCliProcessTree(child);
  if (signal?.aborted) onAbort();
  else signal?.addEventListener("abort", onAbort, { once: true });

  return {
    timedOut: () => timedOut,
    stop: () => {
      clearTimeout(timer);
      signal?.removeEventListener?.("abort", onAbort);
    },
  };
}

/** qodercli itself has exited; reap anything it left behind in its group. */
function reapQoderCliProcessGroup(child: ReturnType<typeof spawn>): void {
  if (process.platform === "win32" || !child.pid) return;
  try {
    process.kill(-child.pid, "SIGKILL");
  } catch {
    /* group already empty */
  }
}

function captureQoderCliOutput(child: ReturnType<typeof spawn>): {
  stdout: () => string;
  stderr: () => string;
} {
  let stdout = "";
  let stderr = "";
  // If qodercli exits or closes stdin before we finish writing the prompt, the
  // write/end can emit an ASYNC EPIPE/EINVAL on the stream (not caught by the
  // surrounding try/catch). Without a listener that becomes an unhandled 'error'
  // event that crashes the whole process — attach no-op handlers.
  for (const stream of [child.stdin, child.stdout, child.stderr]) stream?.on("error", () => {});
  // Decode with a stateful UTF-8 reader so a multi-byte character (e.g. Chinese,
  // common in Qoder output) split across two chunks is not corrupted — Buffer
  // per-chunk toString() would mangle the boundary bytes.
  child.stdout?.setEncoding("utf8");
  child.stderr?.setEncoding("utf8");
  child.stdout?.on("data", (chunk: string) => {
    stdout += chunk;
  });
  child.stderr?.on("data", (chunk: string) => {
    stderr += chunk;
  });
  return { stdout: () => stdout, stderr: () => stderr };
}

function writeQoderCliStdin(child: ReturnType<typeof spawn>, input: string | null | undefined) {
  try {
    if (input != null) child.stdin?.write(input);
    child.stdin?.end();
  } catch {
    /* stdin closed early — the child will surface its own error */
  }
}

function collectQoderCliRun(
  child: ReturnType<typeof spawn>,
  options: SpawnQoderCliOptions
): Promise<QoderCliRunResult> {
  return new Promise<QoderCliRunResult>((resolve) => {
    let settled = false;
    const guard = guardQoderCliChild(
      child,
      options.signal,
      options.timeoutMs ?? DEFAULT_TIMEOUT_MS
    );
    const output = captureQoderCliOutput(child);

    const finish = (result: Omit<QoderCliRunResult, "stdout" | "stderr" | "timedOut">) => {
      if (settled) return;
      settled = true;
      guard.stop();
      reapQoderCliProcessGroup(child);
      resolve({
        ...result,
        stdout: output.stdout(),
        stderr: output.stderr(),
        timedOut: guard.timedOut(),
      });
    };

    child.on("error", (err: Error) => {
      finish({ ok: false, code: null, error: err.message });
    });
    child.on("close", (code: number | null) => {
      const timedOut = guard.timedOut();
      finish({
        ok: code === 0 && !timedOut,
        code,
        error: timedOut ? "qodercli timed out" : null,
      });
    });

    writeQoderCliStdin(child, options.stdin);
  });
}
