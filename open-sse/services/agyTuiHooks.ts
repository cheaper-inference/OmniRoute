/**
 * agyTuiHooks.ts — the env-gated entry in Antigravity's global `hooks.json`.
 *
 * agy loads hooks only from a workspace's `.agents/hooks.json` or the global
 * file; `--settings` rejects them, and an added workspace can take the project's
 * place as the first workspace. So the `tui` transport writes one entry into the
 * global file, and that entry does nothing unless this process set
 * `OMNIROUTE_AGY_HOOKS` for the agy it spawned. The operator's own interactive
 * `agy` runs are untouched: they never see the variable.
 *
 * Ported from TimWongUp/agentnave `agy_tui/hooks.py` (ADR-0072).
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/** The only key this module ever writes. Everything else is left as it was. */
export const HOOK_ENTRY_NAME = "omniroute-tui";

/** The variable that makes the entry act. Set only for agy processes we spawn. */
export const HOOK_ENV = "OMNIROUTE_AGY_HOOKS";

/**
 * Record the hook payload, then answer with an empty object.
 *
 * `exec` keeps agy as the hook shell's parent, so `$PPID` names the agy that ran
 * it — that is the only reliable way to tell our process from a nested one. The
 * whole path comes from the environment; no path is interpolated into the script
 * itself (Hard Rule #13).
 */
const RECORD_SCRIPT =
  'if [ -n "$OMNIROUTE_AGY_HOOKS" ]; then f="$OMNIROUTE_AGY_HOOKS/$PPID.$$.$1"; ' +
  'cat > "$f.tmp" && mv "$f.tmp" "$f.json"; else cat > /dev/null; fi; echo "{}"';

/** Nothing can answer a question mid-turn, so the question is denied with a reason. */
const QUESTION_DENIED =
  "No one can answer questions during this run. Continue with your best judgment and " +
  "list open questions in your final answer.";

const ASK_SCRIPT =
  "cat > /dev/null; " +
  'if [ -n "$OMNIROUTE_AGY_HOOKS" ]; then echo \'{"decision":"deny","reason":' +
  `${shellQuote(JSON.stringify(QUESTION_DENIED))}}'; else echo '{"decision":"allow"}'; fi`;

/** POSIX single-quote escaping, the same shape as Python's `shlex.quote`. */
export function shellQuote(value: string): string {
  return `'${value.replace(/'/g, `'\\''`)}'`;
}

function command(script: string, ...args: string[]): Record<string, unknown> {
  // Every part is quoted, so a hook name or an argument can never become shell
  // syntax (Hard Rule #13: no interpolation of runtime values into a script).
  const line = ["exec", "/bin/sh", "-c", script, HOOK_ENTRY_NAME, ...args]
    .map((part) => shellQuote(part))
    .join(" ");
  return { type: "command", command: line, timeout: 10 };
}

/**
 * The entry itself: session lifecycle for the turn boundary, and one tool gate
 * for questions. Print mode cannot ask either, and the dispatch prompt already
 * asks for open questions in the final answer.
 */
export function hookEntry(): Record<string, unknown> {
  return {
    SessionStart: [command(RECORD_SCRIPT, "SessionStart")],
    PreInvocation: [command(RECORD_SCRIPT, "PreInvocation")],
    Stop: [command(RECORD_SCRIPT, "Stop")],
    PreToolUse: [{ matcher: "ask_question", hooks: [command(ASK_SCRIPT)] }],
  };
}

/** The global hooks file agy reads, honouring a home the caller selected. */
export function hooksPath(home: string = os.homedir()): string {
  return path.join(home, ".gemini", "config", "hooks.json");
}

/** The file to write: the symlink's target when it is one, else the path itself. */
function resolveHooksFile(home: string): string {
  return realpathOrSelf(hooksPath(home));
}

function readFileOrNull(file: string): string | null {
  try {
    return fs.readFileSync(file, "utf8");
  } catch {
    return null;
  }
}

export type EnsureEntryResult = {
  /** Set when the entry had to be written; null when it was already right. */
  warning: string | null;
};

/**
 * Add or restore the entry, keeping every other hook.
 *
 * Writes through a symlink to its target and starts over when the file changed
 * while it was being rewritten, so a concurrent save by the operator or by
 * Antigravity itself is never lost.
 */
export function ensureEntry(home: string = os.homedir()): EnsureEntryResult {
  const target = resolveHooksFile(home);

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const original = readFileOrNull(target);
    let document: unknown = {};
    if (original !== null) {
      try {
        document = JSON.parse(original);
      } catch (error) {
        throw new Error(
          `${target} is not valid JSON (${error instanceof Error ? error.message : "parse error"}); fix it in Antigravity`
        );
      }
    }
    if (document === null || typeof document !== "object" || Array.isArray(document)) {
      throw new Error(`${target} must hold a JSON object; fix it in Antigravity`);
    }
    const hooks = document as Record<string, unknown>;
    const current = hooks[HOOK_ENTRY_NAME];
    if (current && typeof current === "object") {
      const enabled = (current as Record<string, unknown>).enabled;
      if (enabled === false) {
        throw new Error(
          `the ${HOOK_ENTRY_NAME} hook is disabled in ${target}; enable it, or stop using the tui transport for Antigravity`
        );
      }
    }
    if (JSON.stringify(current) === JSON.stringify(hookEntry())) {
      return { warning: null };
    }

    hooks[HOOK_ENTRY_NAME] = hookEntry();
    fs.mkdirSync(path.dirname(target), { recursive: true });
    const temporary = path.join(
      path.dirname(target),
      `.${path.basename(target)}.omniroute-${process.pid}`
    );
    fs.writeFileSync(temporary, `${JSON.stringify(hooks, null, 2)}\n`, "utf8");
    if (readFileOrNull(target) !== original) {
      // Someone else saved while we rewrote it: start over rather than clobber.
      try {
        fs.unlinkSync(temporary);
      } catch {
        /* already gone */
      }
      continue;
    }
    fs.renameSync(temporary, target);
    return {
      warning: `OmniRoute added the ${HOOK_ENTRY_NAME} hook to ${target}; it acts only in runs OmniRoute starts`,
    };
  }

  throw new Error(`${target} kept changing while OmniRoute added its hook; try again`);
}

function realpathOrSelf(file: string): string {
  try {
    return fs.realpathSync(file);
  } catch {
    return file;
  }
}

/** One hook payload agy wrote, with the name the file encodes. */
export type AgyHookEvent = { name: string; payload: Record<string, unknown> };

/**
 * New hook payloads this agy wrote, oldest first.
 *
 * Files are named `<agy pid>.<shell pid>.<HookName>.json`, so a nested agy (its
 * own pid) and a concurrent one are never read as this turn's.
 */
export function readEvents(directory: string, agyPid: number, seen: Set<string>): AgyHookEvent[] {
  const collected: Array<{ written: number; order: string; event: AgyHookEvent }> = [];
  let entries: string[];
  try {
    entries = fs.readdirSync(directory);
  } catch {
    return [];
  }
  for (const name of entries) {
    if (!name.startsWith(`${agyPid}.`) || !name.endsWith(".json") || seen.has(name)) continue;
    const full = path.join(directory, name);
    let payload: unknown;
    let written: number;
    try {
      payload = JSON.parse(fs.readFileSync(full, "utf8"));
      written = fs.statSync(full).mtimeMs;
    } catch {
      continue;
    }
    seen.add(name);
    if (payload === null || typeof payload !== "object" || Array.isArray(payload)) continue;
    // `<pid>.<shell pid>.<HookName>.json`
    const hookName = name.split(".")[2];
    if (!hookName) continue;
    collected.push({
      written,
      order: name,
      event: { name: hookName, payload: payload as Record<string, unknown> },
    });
  }
  collected.sort((left, right) =>
    left.written === right.written
      ? left.order.localeCompare(right.order)
      : left.written - right.written
  );
  return collected.map((item) => item.event);
}

/** Remove a hook directory, ignoring one that is already gone. */
export function dropHookDir(directory: string): void {
  try {
    fs.rmSync(directory, { recursive: true, force: true });
  } catch {
    /* a leftover temp directory is not worth failing a shutdown over */
  }
}

/**
 * Whether this host can run the interactive transport at all.
 *
 * The reference runtime is POSIX-only (`os.openpty`, `fcntl`, `ps`, `killpg`),
 * and so is this port. Saying so plainly beats a spawn that fails obscurely.
 */
export function tuiRuntimeUnsupported(platform: NodeJS.Platform = process.platform): boolean {
  return platform === "win32";
}

/** A PTY runner is only useful if the tool it needs is actually present. */
export function hasPtyHelper(): boolean {
  if (tuiRuntimeUnsupported()) return false;
  try {
    execFileSync("sh", ["-c", "command -v script"], { stdio: "ignore", timeout: 5_000 });
    return true;
  } catch {
    return false;
  }
}
