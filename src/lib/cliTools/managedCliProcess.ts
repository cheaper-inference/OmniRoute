import { spawn, type ChildProcess } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { createLogger } from "@/shared/utils/logger";
import { ManagedCliRuntimeError } from "./managedCliError";

const log = createLogger("managed-cli-process");
const MAX_OUTPUT_BYTES = 256 * 1024;
const TERMINATION_TIMEOUT_MS = 5_000;

function processFailure(code = "install_failed"): ManagedCliRuntimeError {
  return new ManagedCliRuntimeError(
    code,
    "The CLI command failed. Check npm availability, network access, Node compatibility and data-directory permissions.",
    502
  );
}

/** npm lifecycle children must stop before the manager releases its update lock. */
function terminateTree(child: ChildProcess, env: NodeJS.ProcessEnv): void {
  if (!child.pid) return;
  if (os.platform() === "win32") {
    const taskkill = path.win32.join(
      env.SystemRoot || env.SYSTEMROOT || "C:\\Windows",
      "System32",
      "taskkill.exe"
    );
    const killer = spawn(taskkill, ["/PID", String(child.pid), "/T", "/F"], {
      windowsHide: true,
      stdio: "ignore",
      timeout: TERMINATION_TIMEOUT_MS,
    });
    killer.on("error", () => child.kill("SIGKILL"));
    killer.on("close", (code) => {
      if (code !== 0) child.kill("SIGKILL");
    });
    return;
  }
  try {
    process.kill(-child.pid, "SIGKILL");
  } catch {
    child.kill("SIGKILL");
  }
}

export function executeManagedCliCommand(
  command: string,
  args: string[],
  options: { cwd: string; env: NodeJS.ProcessEnv; timeout: number; shell?: boolean }
): Promise<string> {
  return new Promise((resolve, reject) => {
    let settled = false;
    let failure: ManagedCliRuntimeError | null = null;
    let stdout = "";
    let outputBytes = 0;
    let forcedClose: ReturnType<typeof setTimeout> | undefined;
    const child = spawn(command, args, {
      cwd: options.cwd,
      env: options.env,
      shell: options.shell ?? false,
      detached: os.platform() !== "win32",
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe"],
    });
    log.debug("Started managed CLI subprocess");

    const finish = (error: ManagedCliRuntimeError | null) => {
      if (settled) return;
      settled = true;
      clearTimeout(deadline);
      if (forcedClose) clearTimeout(forcedClose);
      if (error) {
        log.error({ code: error.code }, "Managed CLI subprocess failed");
        reject(error);
      } else {
        log.debug("Managed CLI subprocess completed");
        resolve(stdout);
      }
    };
    const stop = (code: string) => {
      if (settled || failure) return;
      failure = processFailure(code);
      log.warn({ code }, "Stopping managed CLI subprocess tree");
      try {
        terminateTree(child, options.env);
      } catch {
        child.kill("SIGKILL");
      }
      forcedClose = setTimeout(() => {
        child.stdout.destroy();
        child.stderr.destroy();
        child.kill("SIGKILL");
        finish(failure);
      }, TERMINATION_TIMEOUT_MS);
    };
    const deadline = setTimeout(() => stop("install_timeout"), options.timeout);
    const collect = (chunk: Buffer, keep: boolean) => {
      if (failure || settled) return;
      outputBytes += chunk.length;
      if (outputBytes > MAX_OUTPUT_BYTES) {
        stop("install_output_limit");
        return;
      }
      if (keep) stdout += chunk.toString("utf8");
    };
    child.stdout.on("data", (chunk: Buffer) => collect(chunk, true));
    child.stderr.on("data", (chunk: Buffer) => collect(chunk, false));
    child.on("error", () => finish(failure ?? processFailure()));
    child.on("close", (code) => finish(failure ?? (code === 0 ? null : processFailure())));
  });
}
