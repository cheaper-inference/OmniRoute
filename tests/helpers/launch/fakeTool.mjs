// Fake CLI tool: importable helper module AND runnable script (node fakeTool.mjs ...args).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const FAKE_TOOL_PATH = fileURLToPath(import.meta.url);

export function readFakeToolDump(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}

function isMain() {
  try {
    if (!process.argv[1]) return false;
    return fs.realpathSync(path.resolve(process.argv[1])) === fs.realpathSync(FAKE_TOOL_PATH);
  } catch {
    return false;
  }
}

function parseJsonEnv(name) {
  const raw = process.env[name];
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function fileArgs(argv) {
  const out = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--file" && i + 1 < argv.length) out.push(argv[++i]);
    else if (a.startsWith("--file=")) out.push(a.slice("--file=".length));
  }
  return out;
}

async function run() {
  const outPath = process.env.FAKE_TOOL_OUT;
  const dump = {
    argv: process.argv.slice(2),
    env: { ...process.env },
    cwd: process.cwd(),
    pid: process.pid,
    files: {},
    request: null,
    signals: [],
  };
  const exitCode = Number(process.env.FAKE_TOOL_EXIT || 0) || 0;

  const writeDump = () => {
    if (!outPath) return;
    const tmp = `${outPath}.${process.pid}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(dump, null, 2));
    fs.renameSync(tmp, outPath);
  };

  const extra = parseJsonEnv("FAKE_TOOL_FILES");
  const paths = [...fileArgs(dump.argv), ...(Array.isArray(extra) ? extra : [])];
  for (const p of paths) {
    try {
      const st = fs.statSync(p);
      dump.files[p] = {
        exists: true,
        contents: fs.readFileSync(p, "utf8"),
        mode: st.mode & 0o777,
      };
    } catch {
      dump.files[p] = { exists: false, contents: null, mode: null };
    }
  }

  const req = parseJsonEnv("FAKE_TOOL_REQUEST");
  if (req && req.url) {
    try {
      const method = req.method || "POST";
      const res = await fetch(req.url, {
        method,
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${process.env[req.tokenEnv] || ""}`,
        },
        body: method === "GET" || method === "HEAD" ? undefined : JSON.stringify(req.body ?? {}),
      });
      dump.request = { status: res.status, body: await res.text() };
    } catch (err) {
      dump.request = { error: String((err && err.message) || err) };
    }
  }

  writeDump();
  if (process.env.FAKE_TOOL_READY) fs.writeFileSync(process.env.FAKE_TOOL_READY, "ready");

  const sleepMs = Number(process.env.FAKE_TOOL_SLEEP_MS || 0);
  if (!(sleepMs > 0)) {
    process.exit(exitCode);
  }

  const codes = { SIGHUP: 129, SIGINT: 130, SIGTERM: 143 };
  for (const [sig, code] of Object.entries(codes)) {
    process.on(sig, () => {
      dump.signals.push(sig);
      writeDump();
      if (process.env.FAKE_TOOL_IGNORE_SIGNALS === "1") return;
      process.exit(code);
    });
  }
  setTimeout(() => {
    writeDump();
    process.exit(exitCode);
  }, sleepMs);
}

if (isMain()) {
  run();
}
