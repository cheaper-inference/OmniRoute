import { spawn, type ChildProcess } from "node:child_process";
import { constants } from "node:fs";
import { access, mkdir, mkdtemp, rm, stat, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { NativeAcpClient } from "./nativeAcpClient.ts";

const MODE = "omniroute-text-only";
const ONE_MIB = 1024 * 1024;
let active = 0;

export class KiroCliError extends Error {
  constructor(
    readonly status: number,
    message: string
  ) {
    super(message);
  }
}

export async function kiroCliTurn(
  model: string,
  prompt: string,
  signal?: AbortSignal | null,
  timeoutMs = 60_000
) {
  const binary = process.env.OMNIROUTE_KIRO_CLI_BIN ?? "";
  const data = process.env.OMNIROUTE_KIRO_CLI_DATA_DIR ?? "";
  if (
    process.platform !== "linux" ||
    !path.isAbsolute(binary) ||
    !path.isAbsolute(data) ||
    process.env.REQUIRE_API_KEY !== "true"
  ) {
    throw new KiroCliError(
      503,
      "Kiro CLI requires an operator-configured Linux CLI, dedicated login and authenticated gateway"
    );
  }
  if (active >= 2) throw new KiroCliError(429, "Kiro CLI is busy");
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,127}$/.test(model))
    throw new KiroCliError(400, "Invalid Kiro model");
  const deadline = AbortSignal.timeout(timeoutMs);
  const stop = signal ? AbortSignal.any([signal, deadline]) : deadline;
  let home: string | undefined;
  let child: ChildProcess | undefined;
  let client: NativeAcpClient | undefined;
  let onAbort: (() => void) | undefined;
  active++;
  try {
    try {
      await access(binary, constants.X_OK);
      const profile = await stat(data);
      if (
        !profile.isDirectory() ||
        (profile.mode & 0o077) !== 0 ||
        profile.uid !== process.getuid?.()
      ) {
        throw new Error("Invalid private profile");
      }
    } catch {
      throw new KiroCliError(503, "Kiro CLI executable or private login directory unavailable");
    }
    home = await mkdtemp(path.join(tmpdir(), "omniroute-kiro-"));
    const cwd = path.join(home, "workspace");
    const agents = path.join(home, ".kiro", "agents");
    const share = path.join(home, ".local", "share");
    await Promise.all([
      mkdir(cwd),
      mkdir(agents, { recursive: true }),
      mkdir(share, { recursive: true }),
    ]);
    await symlink(data, path.join(share, "kiro-cli"));
    await writeFile(
      path.join(agents, `${MODE}.json`),
      JSON.stringify({
        name: MODE,
        tools: [],
        resources: [],
        mcpServers: {},
        hooks: {},
        includeMcpJson: false,
        includePowers: false,
      }),
      { mode: 0o600 }
    );
    if (stop.aborted) throw new KiroCliError(499, "Kiro CLI request cancelled");
    child = spawn(binary, ["acp", "--agent", MODE, "--model", model], {
      cwd,
      detached: true,
      stdio: ["pipe", "pipe", "ignore"],
      env: {
        HOME: home,
        PATH: `${path.dirname(binary)}:/usr/bin:/bin`,
        XDG_DATA_HOME: share,
        AWS_EC2_METADATA_DISABLED: "true",
      },
    });
    const interrupted = new Promise<never>((_, reject) => {
      child.once("error", () => reject(new KiroCliError(503, "Cannot start Kiro CLI")));
      child.once("exit", () =>
        reject(new KiroCliError(502, "Kiro CLI exited before completing the turn"))
      );
      onAbort = () =>
        reject(new KiroCliError(deadline.aborted ? 504 : 499, "Kiro CLI turn interrupted"));
      stop.addEventListener("abort", onAbort, { once: true });
      if (stop.aborted) onAbort();
    });
    let text = "";
    let overflow = false;
    client = new NativeAcpClient(child, (chunk) => {
      if (overflow || text.length + chunk.length > ONE_MIB) {
        overflow = true;
        return;
      }
      text += chunk;
    });
    const acp = client;
    await Promise.race([
      interrupted,
      (async () => {
        await acp.initialize(cwd, { mode: MODE, model });
        await acp.prompt(prompt, true);
      })(),
    ]);
    if (overflow || !text)
      throw new KiroCliError(502, "Kiro CLI returned an empty or oversized response");
    return text;
  } catch (err) {
    if (err instanceof KiroCliError) throw err;
    if (typeof err === "object" && err && "code" in err && err.code === -32000) {
      throw new KiroCliError(401, "Sign in with the official Kiro CLI in the dedicated profile");
    }
    throw new KiroCliError(
      502,
      "Kiro CLI ACP session failed; verify its login, text-only mode and selected model"
    );
  } finally {
    try {
      if (onAbort) stop.removeEventListener("abort", onAbort);
      if (child?.pid) {
        try {
          process.kill(-child.pid, "SIGKILL");
        } catch (err) {
          if ((err as NodeJS.ErrnoException).code !== "ESRCH") throw err;
        }
      }
      client?.close();
      if (home) await rm(home, { recursive: true, force: true });
    } finally {
      active--;
    }
  }
}
