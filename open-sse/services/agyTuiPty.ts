/**
 * agyTuiPty.ts — a pseudo-terminal for agy's interactive mode, with no native addon.
 *
 * `node-pty` would be the obvious answer and is the wrong one here: it is a
 * native addon, and adding one would have to pass `check:native-deps`, ship
 * prebuilds for every platform and survive the Docker image build. agy's
 * interactive mode only needs a tty on its end plus a way to read what it draws,
 * and util-linux `script` provides exactly that on POSIX:
 *
 *     script -qfc "<agy …>" /dev/null
 *
 * The child sees a pty (so it takes its interactive path), the bytes come back on
 * stdout, and the window size is set from here. Non-POSIX hosts have no `script`
 * and no `openpty` path in the reference runtime either (agentnave: "Windows has
 * no interactive runtime"), so they get a clear refusal rather than a broken spawn.
 */
import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";

import { AgyScreen } from "./agyTuiScreen.ts";
import { HOOK_ENV, tuiRuntimeUnsupported } from "./agyTuiHooks.ts";

/** The geometry agy is driven at, same as the reference runtime. */
export const PTY_COLS = 200;
export const PTY_ROWS = 50;

/**
 * A child's environment. `NodeJS.ProcessEnv` is not usable here: Next augments
 * it with a required `NODE_ENV`, so a plain `{ HOME }` literal is not assignable.
 */
export type EnvRecord = Record<string, string | undefined>;

export type AgyTuiTerminalOptions = {
  /** Absolute path to the agy binary. */
  executable: string;
  args: string[];
  /** Extra environment for the child (the hook directory, the account home). */
  env?: EnvRecord;
  cwd?: string;
  cols?: number;
  rows?: number;
};

export class AgyTuiUnsupportedError extends Error {
  constructor(reason: string) {
    super(reason);
    this.name = "AgyTuiUnsupportedError";
  }
}

/** `script` invocation that pipes a pty to our stdout, or null when absent. */
export function ptyCommand(
  executable: string,
  args: string[],
  platform: NodeJS.Platform = process.platform
): { file: string; args: string[] } | null {
  if (tuiRuntimeUnsupported(platform)) return null;
  // The command string is built from the caller's own binary and argument list,
  // never from request data: the prompt travels on stdin, not here.
  const command = [executable, ...args].map((part) => quoteForShell(part)).join(" ");
  return { file: "script", args: ["-qfc", command, "/dev/null"] };
}

/** POSIX single-quote escaping for the `script -c` command string. */
function quoteForShell(value: string): string {
  return `'${value.replace(/'/g, `'\\''`)}'`;
}

/**
 * One agy process on a pty.
 *
 * Reading is non-blocking and incremental: `poll()` drains whatever arrived,
 * feeds the screen and returns the text the screen now holds. Writing goes
 * through `send()`, which queues so a caller can paste and press Enter without
 * interleaving the two.
 */
export class AgyTuiTerminal {
  readonly screen = new AgyScreen();
  private readonly child: ChildProcessWithoutNullStreams;
  private outgoing = Buffer.alloc(0);

  constructor(options: AgyTuiTerminalOptions) {
    const spec = ptyCommand(options.executable, options.args);
    if (!spec) {
      throw new AgyTuiUnsupportedError(
        "the tui transport needs a POSIX host with `script` (util-linux); this one has no pseudo-terminal path"
      );
    }
    this.child = spawn(spec.file, spec.args, {
      cwd: options.cwd,
      env: childEnv(options.env) as NodeJS.ProcessEnv,
      // No shell of our own: `script` already runs the command string.
      shell: false,
      stdio: ["pipe", "pipe", "pipe"],
    }) as ChildProcessWithoutNullStreams;
    this.child.stdout.on("data", (chunk: Buffer) => this.absorb(chunk));
    this.child.stderr.on("data", (chunk: Buffer) => this.absorb(chunk));
  }

  get pid(): number | undefined {
    return this.child.pid;
  }

  get exited(): boolean {
    return this.child.exitCode !== null || this.child.signalCode !== null;
  }

  get exitCode(): number | null {
    return this.child.exitCode;
  }

  private absorb(chunk: Buffer): void {
    const queries = this.screen.feed(new Uint8Array(chunk));
    // agy asks where the cursor is before it draws its box; an unanswered query
    // leaves the input box unrendered and the turn never becomes deliverable.
    if (queries > 0) this.send("\x1b[1;1R".repeat(queries));
    this.flush();
  }

  /** Queue bytes for the child and write what the pipe will take now. */
  send(data: string | Buffer): void {
    this.outgoing = Buffer.concat([this.outgoing, Buffer.from(data)]);
    this.flush();
  }

  private flush(): void {
    if (this.outgoing.length === 0) return;
    const chunk = this.outgoing;
    this.outgoing = Buffer.alloc(0);
    if (this.child.stdin.writable) this.child.stdin.write(chunk);
  }

  /** The current screen as text. */
  text(): string {
    return this.screen.text();
  }

  /**
   * Stop the child. SIGTERM first — agy finishes its own conversation writes on
   * it — then SIGKILL if it has not gone in time.
   */
  close(graceMs = 5_000): void {
    if (this.exited) return;
    this.child.kill("SIGTERM");
    const deadline = Date.now() + graceMs;
    const timer = setInterval(() => {
      if (this.exited || Date.now() > deadline) {
        clearInterval(timer);
        if (!this.exited) this.child.kill("SIGKILL");
      }
    }, 100);
    // Do not hold the event loop open for a process that is already gone.
    timer.unref?.();
  }
}

/**
 * The child's environment: the caller's, minus anything that would make agy
 * think it is already inside another agent, plus the hook directory.
 */
export function childEnv(extra: EnvRecord = {}): EnvRecord {
  const env: EnvRecord = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (value !== undefined) env[key] = value;
  }
  // An inherited value would make every operator's own agy run write our hooks.
  delete env[HOOK_ENV];
  for (const [key, value] of Object.entries(extra)) {
    if (value !== undefined) env[key] = value;
  }
  env.TERM = "xterm-256color";
  return env;
}
