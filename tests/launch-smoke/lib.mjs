// Shared helpers for the live launch smoke (tests/launch-smoke/run.mjs): sandbox roots, real
// HOME snapshots, leftover-process scans, and the headless / pty runners. Node built-ins only.

import { spawn } from "node:child_process";
import {
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  readlinkSync,
} from "node:fs";
import os from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const WORKTREE = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
export const OMNIROUTER = join(WORKTREE, "bin", "omnirouter.mjs");
/** Optional tool install root ($LAUNCH_SMOKE_SANDBOX). Unset: no sandbox, tools come from PATH. */
export const SANDBOX = process.env.LAUNCH_SMOKE_SANDBOX || "";
/** Output dir when --out is not given: $LAUNCH_SMOKE_OUT, else <os tmpdir>/omniroute-launch-smoke. */
export const DEFAULT_OUT =
  process.env.LAUNCH_SMOKE_OUT || join(os.tmpdir(), "omniroute-launch-smoke");
export const PROMPT = "reply with OK";
/** The launcher's private temp dir prefix (bin/cli/launch/core/tempfiles.mjs). */
export const LAUNCH_TMP_PREFIX = "omnirouter-";
/** Full minted token shape (stub: olx_<16>_<32>, base32 lower). */
export const TOKEN_RE = /olx_[a-z2-7]{16}_[a-z2-7]{32}/;

/** Sandbox PATH entries (npm/bin, venv/bin, bin), prepended when present. No sandbox: PATH as is. */
export function sandboxPath(basePath = process.env.PATH || "") {
  if (!SANDBOX) return basePath;
  const extra = ["npm/bin", "venv/bin", "bin"].map((p) => join(SANDBOX, p)).filter(existsSync);
  return [...extra, basePath].join(":");
}

/** Executable name per tool id where it differs from the id. */
const TOOL_BINS = { continue: "cn", deepseek: "dsh" };

function onPath(name, pathValue = process.env.PATH || "") {
  for (const dir of pathValue.split(":").filter(Boolean)) {
    const file = join(dir, name);
    try {
      if (existsSync(file) && !lstatSync(file).isDirectory()) return file;
    } catch {
      // unreadable PATH entry: ignore
    }
  }
  return null;
}

/**
 * Installed tools: <sandbox>/tools.json when a sandbox is set, else every id in `ids` whose
 * executable is on PATH (status "global").
 */
export function readToolsJson(ids = []) {
  if (SANDBOX) {
    const file = join(SANDBOX, "tools.json");
    return existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : {};
  }
  const out = {};
  for (const id of ids) {
    const bin = onPath(TOOL_BINS[id] || id);
    if (bin) out[id] = { status: "global", bin };
  }
  return out;
}

/** Fresh temp root with HOME, XDG dirs, TMPDIR, DATA_DIR and a work dir inside it. */
export function makeSandbox(parent, label) {
  mkdirSync(parent, { recursive: true });
  const root = mkdtempSync(join(parent, `${label}-`));
  const dirs = {
    root,
    home: join(root, "home"),
    tmp: join(root, "tmp"),
    data: join(root, "data"),
    work: join(root, "work"),
  };
  for (const d of Object.values(dirs)) mkdirSync(d, { recursive: true });
  const h = dirs.home;
  const env = {
    HOME: h,
    USERPROFILE: h,
    XDG_CONFIG_HOME: join(h, ".config"),
    XDG_DATA_HOME: join(h, ".local", "share"),
    XDG_CACHE_HOME: join(h, ".cache"),
    XDG_STATE_HOME: join(h, ".local", "state"),
    APPDATA: join(h, "AppData", "Roaming"),
    LOCALAPPDATA: join(h, "AppData", "Local"),
    TMPDIR: dirs.tmp,
    TMP: dirs.tmp,
    TEMP: dirs.tmp,
    DATA_DIR: dirs.data,
  };
  for (const key of ["XDG_CONFIG_HOME", "XDG_DATA_HOME", "XDG_CACHE_HOME", "XDG_STATE_HOME"]) {
    mkdirSync(env[key], { recursive: true });
  }
  return { ...dirs, env };
}

export function expandVars(value, sb) {
  return String(value).replaceAll("{ROOT}", sb.root).replaceAll("{HOME}", sb.home);
}

/** Env for the launcher process: the runner's env (minus OmniRoute/provider secrets) + sandbox. */
export function launcherEnv(sb, extra = {}) {
  const env = {};
  for (const [k, v] of Object.entries(process.env)) {
    if (/^(OMNIROUTE_|OMNIROUTER_|ANTHROPIC_|OPENAI_|GEMINI_|GOOGLE_|DEEPSEEK_)/.test(k)) continue;
    if (k === "DATA_DIR" || k === "PORT") continue;
    env[k] = v;
  }
  // PWD must match the spawn cwd: the launcher forwards PWD (bin/cli/launch-env.mjs SAFE_KEYS)
  // and tools such as opencode/kilo resolve their project dir from it, not from the real cwd.
  Object.assign(env, sb.env, {
    PATH: sandboxPath(process.env.PATH),
    NO_COLOR: "1",
    CI: "1",
    PWD: sb.work,
  });
  for (const [k, v] of Object.entries(extra)) env[k] = expandVars(v, sb);
  return env;
}

// ---------------------------------------------------------------- real HOME snapshot

const SNAP_MAX_ENTRIES = 30000;
const SNAP_MAX_DEPTH = 8;

/** path -> "type:size:mtimeMs" for each listed path under the real HOME (bounded walk). */
export function snapshotHome(paths, realHome = os.homedir()) {
  const out = new Map();
  let count = 0;
  const walk = (abs, depth) => {
    if (count >= SNAP_MAX_ENTRIES) return;
    let st;
    try {
      st = lstatSync(abs);
    } catch {
      return;
    }
    count += 1;
    const type = st.isDirectory() ? "d" : st.isSymbolicLink() ? "l" : "f";
    let sig = `${type}:${type === "d" ? 0 : st.size}:${Math.floor(st.mtimeMs)}`;
    if (type === "l") {
      try {
        sig += `:${readlinkSync(abs)}`;
      } catch {
        /* ignore */
      }
    }
    out.set(abs, sig);
    if (type === "d" && depth < SNAP_MAX_DEPTH) {
      let names = [];
      try {
        names = readdirSync(abs);
      } catch {
        return;
      }
      for (const n of names) walk(join(abs, n), depth + 1);
    }
  };
  for (const p of paths) walk(join(realHome, p), 0);
  return out;
}

export function diffSnapshots(before, after) {
  const changes = [];
  for (const [p, sig] of after) {
    if (!before.has(p)) changes.push({ path: p, change: "added" });
    else if (before.get(p) !== sig && !sig.startsWith("d:"))
      changes.push({ path: p, change: "modified" });
  }
  for (const p of before.keys()) if (!after.has(p)) changes.push({ path: p, change: "removed" });
  return changes;
}

/**
 * A real-HOME change is attributed to the smoke run when the file names the sandbox root, the
 * stub URL, a minted token or the canned reply. Other changes are reported as concurrent
 * activity (the operator's own sessions keep writing to e.g. ~/.claude while the smoke runs).
 */
export function attributeChanges(changes, markers) {
  const ours = [];
  const other = [];
  for (const c of changes) {
    let hit = null;
    if (c.change !== "removed") {
      try {
        const st = lstatSync(c.path);
        if (st.isFile() && st.size <= 4 * 1024 * 1024) {
          const text = readFileSync(c.path, "latin1");
          hit = markers.find((m) => m && text.includes(m)) || null;
        }
      } catch {
        /* vanished */
      }
    }
    (hit ? ours : other).push(hit ? { ...c, marker: hit } : c);
  }
  return { ours, other };
}

// ---------------------------------------------------------------- leftover processes

/** Live pids (not ours) whose environ or cmdline mentions `needle` (the sandbox root). */
export function processesMentioning(needle) {
  const found = [];
  let pids = [];
  try {
    pids = readdirSync("/proc").filter((n) => /^\d+$/.test(n));
  } catch {
    return found;
  }
  for (const pid of pids) {
    if (Number(pid) === process.pid) continue;
    let cmd = "";
    let hit = false;
    try {
      cmd = readFileSync(`/proc/${pid}/cmdline`, "latin1").replaceAll("\0", " ").trim();
      hit = cmd.includes(needle);
      if (!hit) hit = readFileSync(`/proc/${pid}/environ`, "latin1").includes(needle);
    } catch {
      continue;
    }
    if (hit) found.push({ pid: Number(pid), cmd: cmd.slice(0, 200) });
  }
  return found;
}

export function killAll(procs) {
  for (const p of procs) {
    try {
      process.kill(p.pid, "SIGKILL");
    } catch {
      /* gone */
    }
  }
}

// ---------------------------------------------------------------- runners

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function killGroup(child, signal) {
  try {
    process.kill(-child.pid, signal);
  } catch {
    try {
      child.kill(signal);
    } catch {
      /* gone */
    }
  }
}

/**
 * Run a command in its own process group, capture output, enforce a timeout.
 * @returns {Promise<{ code, signal, stdout, stderr, timedOut, ms }>}
 */
export function runProcess(
  cmd,
  args,
  { cwd, env, stdin = "ignore", timeoutMs = 120000, onSpawn } = {}
) {
  return new Promise((resolvePromise) => {
    const started = Date.now();
    const child = spawn(cmd, args, {
      cwd,
      env,
      detached: true,
      stdio: [stdin === "ignore" ? "ignore" : "pipe", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    let timedOut = false;
    child.stdout.on("data", (d) => (stdout += d));
    child.stderr.on("data", (d) => (stderr += d));
    if (stdin === "newline") {
      child.stdin.on("error", () => {});
      child.stdin.end("\n");
    }
    if (onSpawn) onSpawn(child);
    const timer = setTimeout(() => {
      timedOut = true;
      killGroup(child, "SIGTERM");
      setTimeout(() => killGroup(child, "SIGKILL"), 5000).unref();
    }, timeoutMs);
    child.on("error", (err) => {
      stderr += `\n[spawn error] ${err.message}`;
    });
    child.on("close", (code, signal) => {
      clearTimeout(timer);
      resolvePromise({ code, signal, stdout, stderr, timedOut, ms: Date.now() - started });
    });
  });
}

function shQuote(s) {
  return `'${String(s).replaceAll("'", `'\\''`)}'`;
}

/**
 * Run a command under a pty (`script -qfec`), type `input` after `inputDelayMs`, then Ctrl-C
 * (SIGINT to the pty foreground group) at `waitMs`, twice, then SIGTERM/SIGKILL if needed.
 */
export async function runPty(
  cmd,
  args,
  { cwd, env, waitMs = 20000, inputDelayMs = 6000, input, graceMs = 15000 }
) {
  const line = [cmd, ...args].map(shQuote).join(" ");
  const steps = [];
  let ended = false;
  const result = runProcess("script", ["-qfec", line, "/dev/null"], {
    cwd,
    env: { ...env, TERM: "xterm-256color", COLUMNS: "120", LINES: "40" },
    stdin: "pipe",
    timeoutMs: waitMs + graceMs + 10000,
    onSpawn: (child) => {
      child.stdin.on("error", () => {});
      const write = (data, label) => {
        if (ended) return;
        steps.push(`${Date.now()}: ${label}`);
        try {
          child.stdin.write(data);
        } catch {
          /* closed */
        }
      };
      // Type the text, then press Enter separately (some TUIs drop a CR glued to a paste).
      if (input) {
        const text = input.replace(/\r$/, "");
        setTimeout(() => write(text, "input"), inputDelayMs).unref();
        if (text !== input) setTimeout(() => write("\r", "enter"), inputDelayMs + 400).unref();
      }
      setTimeout(() => write("\x03", "ctrl-c #1"), waitMs).unref();
      setTimeout(() => write("\x03", "ctrl-c #2"), waitMs + 500).unref();
      setTimeout(() => {
        if (!ended) {
          steps.push(`${Date.now()}: SIGTERM group`);
          killGroup(child, "SIGTERM");
        }
      }, waitMs + graceMs).unref();
      child.on("close", () => (ended = true));
    },
  });
  const r = await result;
  return { ...r, steps, stdout: stripAnsi(r.stdout) };
}

export function stripAnsi(s) {
  return String(s).replace(
    /\x1b\[[0-9;?]*[ -/]*[@-~]|\x1b\][^\x07\x1b]*(\x07|\x1b\\)|\x1b[()][A-Za-z0-9]|\x1b[=>]/g,
    ""
  );
}

export function tail(text, lines = 15) {
  return stripAnsi(String(text || ""))
    .split(/\r?\n/)
    .map((l) => l.replace(/\r/g, "").trimEnd())
    .filter((l) => l.trim() !== "")
    .slice(-lines)
    .join("\n");
}

export function launcherTempDirsLeft(tmpDir) {
  try {
    return readdirSync(tmpDir).filter((n) => n.startsWith(LAUNCH_TMP_PREFIX));
  } catch {
    return [];
  }
}

/**
 * Redact anything key-shaped (and any exact secret value passed in) from text before it is
 * stored or printed: sk-/sk-proj- keys, Google AIza keys, olx_ tokens, long bearer tokens.
 */
export function redactSecrets(text, secrets = []) {
  let out = String(text ?? "");
  for (const value of secrets || []) {
    if (value && value.length >= 8) out = out.split(value).join("<redacted>");
  }
  return out
    .replace(/\bsk-[A-Za-z0-9_-]{12,}/g, "sk-<redacted>")
    .replace(/\bAIza[0-9A-Za-z_-]{20,}/g, "AIza<redacted>")
    .replace(/\bolx_[a-z2-7]{16}_[a-z2-7]{32}\b/g, "olx_<redacted>")
    .replace(/(bearer\s+)[A-Za-z0-9._~+/-]{24,}=*/gi, "$1<redacted>")
    .replace(/([?&](?:token|key|api_key|access_token)=)[A-Za-z0-9._~%-]{12,}/gi, "$1<redacted>");
}
