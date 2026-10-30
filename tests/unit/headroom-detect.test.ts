import { test } from "node:test";
import assert from "node:assert/strict";

import {
  buildPythonSearchPath,
  findHeadroomBinary,
  findPython310,
  resolvePythonCandidates,
  PYTHON_CANDIDATES,
} from "../../src/lib/headroom/detect.ts";

// Regression guard for upstream 9router#2353 — Headroom could not detect a
// python interpreter managed by mise / pyenv / conda because those tools only
// add their shim dirs to PATH via interactive-shell activation, which the
// non-interactive server process never runs.

test("buildPythonSearchPath includes env-manager shim dirs derived from HOME", () => {
  const path = buildPythonSearchPath({ HOME: "/home/dev", PATH: "/usr/bin" });
  const segments = path.split(":");
  assert.ok(segments.includes("/home/dev/.local/share/mise/shims"), "mise shims");
  assert.ok(segments.includes("/home/dev/.pyenv/shims"), "pyenv shims");
  assert.ok(segments.includes("/home/dev/.asdf/shims"), "asdf shims");
  assert.ok(segments.includes("/home/dev/.local/bin"), "user local bin (pipx/uv)");
  // still preserves the caller's PATH and the classic EXTRA_BINS
  assert.ok(segments.includes("/usr/bin"), "inherited PATH preserved");
  assert.ok(segments.includes("/opt/homebrew/bin"), "homebrew bin preserved");
});

test("buildPythonSearchPath honors CONDA_PREFIX and custom manager roots", () => {
  const path = buildPythonSearchPath({
    HOME: "/home/dev",
    CONDA_PREFIX: "/opt/conda/envs/ml",
    PYENV_ROOT: "/custom/pyenv",
    MISE_DATA_DIR: "/custom/mise",
  });
  const segments = path.split(":");
  assert.ok(segments.includes("/opt/conda/envs/ml/bin"), "active conda env bin");
  assert.ok(segments.includes("/custom/pyenv/shims"), "PYENV_ROOT override");
  assert.ok(segments.includes("/custom/mise/shims"), "MISE_DATA_DIR override");
});

test("buildPythonSearchPath is robust when HOME/PATH are absent", () => {
  const path = buildPythonSearchPath({});
  const segments = path.split(":").filter(Boolean);
  // no empty segments, still returns the static EXTRA_BINS
  assert.ok(segments.includes("/usr/bin"));
  assert.ok(!path.includes("::"), "no empty path segments");
});

test("resolvePythonCandidates puts HEADROOM_PYTHON override first", () => {
  const candidates = resolvePythonCandidates({ HEADROOM_PYTHON: "/opt/py/bin/python" });
  assert.equal(candidates[0], "/opt/py/bin/python");
  // default candidates still follow
  assert.ok(candidates.includes("python3"));
});

test("resolvePythonCandidates returns the default list when no override", () => {
  const candidates = resolvePythonCandidates({});
  assert.deepEqual(candidates, [...PYTHON_CANDIDATES]);
});

// Windows detection (upstream 9router#5063 delta): `which` does not exist on
// Windows, PATH is ";"-delimited there, and pip-installed CLIs land in the
// per-version Python Scripts dirs that a packaged/Electron process never sees.
// Every probe below runs through an injected exec function — no real binary runs.

type ExecCall = { file: string; args: readonly string[]; path: string | undefined };

function fakeExec(responses: Record<string, string>) {
  const calls: ExecCall[] = [];
  const execFile = (
    file: string,
    args: readonly string[],
    options: { env?: NodeJS.ProcessEnv }
  ) => {
    calls.push({ file, args, path: options.env?.PATH });
    if (!(file in responses)) {
      throw Object.assign(new Error(`fake exec: ${file} not found`), { code: "ENOENT" });
    }
    return Buffer.from(responses[file]);
  };
  return { calls, execFile };
}

const WIN_ENV = {
  LOCALAPPDATA: "C:\\Users\\u\\AppData\\Local",
  APPDATA: "C:\\Users\\u\\AppData\\Roaming",
  PATH: "C:\\Windows",
};

test("buildPythonSearchPath on win32 is ';'-delimited and adds the Windows Python dirs", () => {
  const searchPath = buildPythonSearchPath(WIN_ENV, "win32");
  const segments = searchPath.split(";");
  assert.ok(
    segments.includes("C:\\Users\\u\\AppData\\Local\\Programs\\Python\\Python314\\Scripts"),
    "per-user python.org install Scripts dir (3.14)"
  );
  assert.ok(
    segments.includes("C:\\Users\\u\\AppData\\Local\\Programs\\Python\\Python310\\Scripts"),
    "per-user python.org install Scripts dir (3.10)"
  );
  assert.ok(
    segments.includes("C:\\Users\\u\\AppData\\Roaming\\Python\\Python314\\Scripts"),
    "pip --user Scripts dir"
  );
  assert.ok(segments.includes("C:\\Python314"), "top-level install dir (python.exe)");
  assert.ok(segments.includes("C:\\Python310\\Scripts"), "top-level install Scripts dir");
  assert.equal(segments[segments.length - 1], "C:\\Windows", "inherited PATH preserved last");
  assert.ok(!segments.includes("/usr/bin"), "no POSIX dirs on Windows");
  assert.ok(!searchPath.includes(";;"), "no empty path segments");
});

test("buildPythonSearchPath on win32 skips user dirs when LOCALAPPDATA/APPDATA are unset", () => {
  const segments = buildPythonSearchPath({ PATH: "C:\\Windows" }, "win32").split(";");
  assert.ok(segments.includes("C:\\Python313"));
  assert.ok(
    segments.every((segment) => !segment.startsWith("\\")),
    "no drive-less dirs built from an empty env var"
  );
});

test("buildPythonSearchPath keeps the POSIX output byte-identical", () => {
  const env = { HOME: "/home/dev", PATH: "/usr/bin" };
  const expected =
    "/home/dev/.local/share/mise/shims:/home/dev/.pyenv/shims:/home/dev/.asdf/shims:" +
    "/home/dev/.local/bin:/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/bin";
  assert.equal(buildPythonSearchPath(env, "linux"), expected);
  assert.equal(buildPythonSearchPath(env, "darwin"), expected);
});

test("resolvePythonCandidates probes python3.14 first", () => {
  assert.equal(resolvePythonCandidates({})[0], "python3.14");
});

test("resolvePythonCandidates adds the fixed py launcher only on win32", () => {
  const win = resolvePythonCandidates({}, "win32");
  assert.equal(win[win.length - 1], "py");
  assert.ok(!resolvePythonCandidates({}, "linux").includes("py"));
  const overridden = resolvePythonCandidates({ HEADROOM_PYTHON: "C:\\py\\python.exe" }, "win32");
  assert.equal(overridden[0], "C:\\py\\python.exe");
});

test("findHeadroomBinary uses `where` on win32 and returns the first match", () => {
  const { calls, execFile } = fakeExec({
    where:
      "C:\\Users\\u\\AppData\\Roaming\\Python\\Python313\\Scripts\\headroom.exe\r\n" +
      "C:\\Python313\\Scripts\\headroom.exe\r\n",
  });
  const found = findHeadroomBinary({ platform: "win32", env: WIN_ENV, execFile });
  assert.equal(found, "C:\\Users\\u\\AppData\\Roaming\\Python\\Python313\\Scripts\\headroom.exe");
  assert.equal(calls.length, 1);
  assert.equal(calls[0].file, "where");
  assert.deepEqual(calls[0].args, ["headroom"]);
  assert.ok(
    calls[0].path?.split(";").includes("C:\\Python314\\Scripts"),
    "probe runs with the Windows search PATH"
  );
});

test("findHeadroomBinary keeps `which` on POSIX and returns null when absent", () => {
  const found = fakeExec({ which: "/home/dev/.local/bin/headroom\n" });
  assert.equal(
    findHeadroomBinary({ platform: "linux", env: { HOME: "/home/dev" }, execFile: found.execFile }),
    "/home/dev/.local/bin/headroom"
  );
  assert.equal(found.calls[0].file, "which");

  const missing = fakeExec({});
  assert.equal(
    findHeadroomBinary({ platform: "win32", env: WIN_ENV, execFile: missing.execFile }),
    null
  );
});

test("findPython310 on win32 falls back to the py launcher with the Windows PATH", () => {
  const { calls, execFile } = fakeExec({ python: "Python 3.9.13", py: "Python 3.12.4" });
  const found = findPython310({ platform: "win32", env: WIN_ENV, execFile });
  assert.equal(found, "py", "python 3.9 is too old, the py launcher resolves 3.12");
  assert.ok(calls.every((call) => call.args.length === 1 && call.args[0] === "--version"));
  assert.ok(calls.every((call) => call.path?.includes("C:\\Python314;")));
});
