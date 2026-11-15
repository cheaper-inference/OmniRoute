/**
 * agyCliPlatform.ts — binary discovery and per-account child spawning for the
 * `agy acp` transport.
 *
 * Ported from magpie-community/plugins packages/agy-cli (platform.mjs,
 * account.mjs). The expectations were read off the running port, not inferred.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  accountEnv,
  accountsDir,
  agyCandidates,
  agySpawnSpec,
  childEnv,
  currentHome,
  dropHome,
  findAgyBinary,
  homeIdOfAuth,
  homeOf,
  inAccount,
  newHome,
  ownAgyPath,
  readAccountToken,
  tokenFile,
  windowsMcpShim,
  windowsNcBuild,
  windowsTreeKill,
  writeAccountToken,
} from "../../open-sse/services/agyCliPlatform.ts";

// ── Binary discovery ────────────────────────────────────────────────────────

test("agyCandidates searches PATH before the fixed directories", () => {
  const candidates = agyCandidates({ PATH: "/a:/b" }, "/home/u", "linux");
  assert.deepEqual(candidates.slice(0, 2), ["/a/agy", "/b/agy"]);
  assert.ok(candidates.includes("/home/u/.local/bin/agy"));
  assert.ok(candidates.includes("/usr/local/bin/agy"));
});

test("agyCandidates goes last to the copy the bridge installed itself", () => {
  const candidates = agyCandidates({ PATH: "/a" }, "/home/u", "linux");
  assert.equal(candidates.at(-1), "/home/u/.local/share/omniroute-agy-cli/agy");
});

test("agyCandidates honours AGY_PATH first and strips quotes around PATH entries", () => {
  const candidates = agyCandidates(
    { PATH: '"/with space/bin";C:\\b', AGY_PATH: "/custom/agy" },
    "C:\\Users\\u",
    "win32"
  );
  assert.equal(candidates[0], "/custom/agy");
  // A quoted PATH entry is unquoted before use, and Windows looks for all three names.
  assert.deepEqual(candidates.slice(1, 4), [
    path.win32.join("/with space/bin", "agy.exe"),
    path.win32.join("/with space/bin", "agy.cmd"),
    path.win32.join("/with space/bin", "agy.bat"),
  ]);
});

test("agyCandidates falls back to Path when PATH is unset on Windows", () => {
  const candidates = agyCandidates({ Path: "C:\\tools" }, "C:\\Users\\u", "win32");
  assert.equal(candidates[0], "C:\\tools\\agy.exe");
});

test("ownAgyPath keeps the bridge's copy out of a user's install", () => {
  assert.equal(
    ownAgyPath({}, "C:\\Users\\u", "win32"),
    "C:\\Users\\u\\AppData\\Local\\omniroute-agy-cli\\agy.exe"
  );
  assert.equal(
    ownAgyPath({ XDG_DATA_HOME: "/data" }, "/home/u", "linux"),
    "/data/omniroute-agy-cli/agy"
  );
  // A relative XDG_DATA_HOME is ignored, never resolved against the cwd.
  assert.equal(
    ownAgyPath({ XDG_DATA_HOME: "rel" }, "/home/u", "linux"),
    "/home/u/.local/share/omniroute-agy-cli/agy"
  );
});

test("findAgyBinary returns the first candidate that exists, or null", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "agy-find-"));
  const platform = process.platform;
  const name = platform === "win32" ? "agy.exe" : "agy";
  // An empty environment: no PATH, no LOCALAPPDATA, so the only candidates left
  // are the home directories, which point at the throwaway one below.
  const home = path.join(dir, "home");
  fs.mkdirSync(home, { recursive: true });
  const env = { PATH: "" };
  try {
    assert.equal(findAgyBinary(env, home, platform), null);
    const file = path.join(home, ".local", "bin", name);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, "");
    assert.equal(findAgyBinary(env, home, platform), file);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// ── Windows spawning ────────────────────────────────────────────────────────

test("agySpawnSpec spawns a non-.cmd file directly", () => {
  assert.deepEqual(agySpawnSpec("C:\\tools\\agy.exe", ["acp"], "win32", {}), {
    file: "C:\\tools\\agy.exe",
    args: ["acp"],
    options: {},
  });
  assert.deepEqual(agySpawnSpec("/usr/local/bin/agy", ["acp"], "linux", {}), {
    file: "/usr/local/bin/agy",
    args: ["acp"],
    options: {},
  });
});

test("agySpawnSpec routes a .cmd through cmd.exe with every argument escaped", () => {
  const spec = agySpawnSpec("C:\\npm\\agy.cmd", ["acp"], "win32", {});
  assert.equal(spec.file, "cmd.exe");
  assert.deepEqual(spec.args.slice(0, 4), ["/d", "/v:off", "/s", "/c"]);
  // A single quoting pass: the argument is wrapped and cmd metacharacters are ^-escaped.
  assert.equal(spec.args[4], '"C:\\npm\\agy.cmd ^"acp^""');
  assert.deepEqual(spec.options, { windowsVerbatimArguments: true, windowsHide: true });
});

test("agySpawnSpec escapes spaces, quotes and % inside an argument", () => {
  const spec = agySpawnSpec("C:\\t\\agy.cmd", ["a b", 'c"d', "e%f"], "win32", {});
  const command = spec.args[4];
  // The space and % are escaped so cmd does not split or expand the argument;
  // the inner quote is backslash-escaped before the ^ pass.
  assert.match(command, /a\^ b/);
  assert.match(command, /e\^%f/);
  assert.match(command, /c\\\^"d/);
});

test("agySpawnSpec double-escapes an npm .bin cmd-shim, which expands %* again", () => {
  const single = agySpawnSpec("C:\\p\\agy.cmd", ["x&y"], "win32", {}).args[4];
  const double = agySpawnSpec("C:\\p\\node_modules\\.bin\\agy.cmd", ["x&y"], "win32", {}).args[4];
  assert.notEqual(single, double);
  assert.ok((double.match(/\^/g) ?? []).length > (single.match(/\^/g) ?? []).length);
});

test("agySpawnSpec uses ComSpec when the environment sets it", () => {
  assert.equal(
    agySpawnSpec("C:\\t\\agy.cmd", [], "win32", { ComSpec: "C:\\W\\cmd.exe" }).file,
    "C:\\W\\cmd.exe"
  );
});

test("agySpawnSpec refuses an argument or path carrying a line break", () => {
  assert.throws(() => agySpawnSpec("C:\\t\\agy.cmd", ["a\nb"], "win32", {}), /line break or NUL/);
  assert.throws(() => agySpawnSpec("C:\\t\\agy.cmd", ["a\0b"], "win32", {}), /line break or NUL/);
  assert.throws(() => agySpawnSpec("C:\\t\ragy.cmd", [], "win32", {}), /line break or NUL/);
});

test("windowsTreeKill ends every live pid in one taskkill run", () => {
  assert.deepEqual(windowsTreeKill([1, null, 1, 2]), {
    file: "taskkill",
    args: ["/T", "/F", "/PID", "1", "/PID", "2"],
  });
  // Nothing to end: no command at all, so the caller can skip the spawn.
  assert.equal(windowsTreeKill([null, undefined, 0]), null);
});

test("windowsNcBuild only builds under Bun, which is what makes the nc console-less", () => {
  assert.deepEqual(windowsNcBuild("C:\\bun.exe", "srv.js", "out.exe", { bun: "1.4.2" }), {
    file: "C:\\bun.exe",
    args: ["build", "--compile", "--windows-hide-console", "srv.js", "--outfile", "out.exe"],
  });
  assert.deepEqual(
    windowsNcBuild("C:\\magpie-bun.exe", "srv.js", "out.exe", { bun: "1.4.2" })?.file,
    "C:\\magpie-bun.exe"
  );
  // Node (or any non-Bun runtime) cannot compile, so the caller keeps nc.cmd.
  assert.equal(windowsNcBuild("C:\\node.exe", "srv.js", "out.exe", {}), null);
});

test("windowsMcpShim quotes both paths and doubles % for the batch file", () => {
  const shim = windowsMcpShim("C:\\a b\\nc.exe", "C:\\s\\mcp.js");
  assert.equal(shim.startsWith("@echo off\r\n"), true);
  assert.match(shim, /"C:\\a b\\nc\.exe" "C:\\s\\mcp\.js"/);
  assert.match(windowsMcpShim("C:\\x\\nc.exe", "C:\\s\\100%.js"), /100%%\.js/);
  assert.throws(() => windowsMcpShim('C:\\a"b\\nc.exe', "s.js"), /invalid Windows MCP shim path/);
});

// ── Account homes ───────────────────────────────────────────────────────────

test("accountsDir keeps the homes under the data directory", () => {
  const previous = process.env.DATA_DIR;
  process.env.DATA_DIR = path.join(os.tmpdir(), "agy-accounts-home");
  try {
    assert.equal(accountsDir({}), path.join(process.env.DATA_DIR, "agy-homes"));
    assert.equal(accountsDir({ AGY_CLI_ACCOUNTS_DIR: "/custom/homes" }), "/custom/homes");
  } finally {
    if (previous === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = previous;
  }
});

test("homeOf accepts only an opaque id, never a path out of accountsDir", () => {
  const env = { AGY_CLI_ACCOUNTS_DIR: "/homes" };
  assert.equal(homeOf("abcdef12", env), path.join("/homes", "abcdef12"));
  for (const bad of ["../etc", "abcdef1", "ABCDEF12", "abc-def12", "", null, undefined, 42]) {
    assert.equal(homeOf(bad, env), null, `${String(bad)} must be rejected`);
  }
});

test("homeIdOfAuth reads the saved sign-in's home and nothing else", () => {
  assert.equal(homeIdOfAuth({ metadata: { agyHome: "abcdef12" } }), "abcdef12");
  assert.equal(homeIdOfAuth({ metadata: { agyHome: "../escape" } }), "");
  assert.equal(homeIdOfAuth({ metadata: {} }), "");
  assert.equal(homeIdOfAuth({}), "");
  assert.equal(homeIdOfAuth(null), "");
});

test("accountEnv isolates the home and forces the file-backed sign-in", () => {
  assert.deepEqual(accountEnv("/home/acct", "linux"), {
    HOME: "/home/acct",
    // agy reads SSH_CONNECTION as "a session over SSH" and keeps the token in
    // the home's file rather than the keyring every account would share.
    SSH_CONNECTION: "127.0.0.1 0 127.0.0.1 0",
  });
  assert.deepEqual(accountEnv("C:\\h", "win32"), {
    HOME: "C:\\h",
    USERPROFILE: "C:\\h",
    SSH_CONNECTION: "127.0.0.1 0 127.0.0.1 0",
  });
});

test("inAccount scopes the home to the work and restores it afterwards", () => {
  assert.equal(currentHome(), null);
  const seen = inAccount("/home/acct", () => {
    assert.equal(currentHome(), "/home/acct");
    return currentHome();
  });
  assert.equal(seen, "/home/acct");
  assert.equal(currentHome(), null);
  // An empty home means agy's own account.
  assert.equal(
    inAccount("", () => currentHome()),
    null
  );
});

test("tokenFile sits where agy looks for it inside the home", () => {
  assert.equal(
    path.normalize(tokenFile("/home/acct")),
    path.normalize("/home/acct/.gemini/antigravity-cli/antigravity-oauth-token")
  );
});

test("newHome creates a private folder and dropHome removes it", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "agy-homes-"));
  const env = { AGY_CLI_ACCOUNTS_DIR: dir };
  try {
    const { id, home } = newHome(env);
    assert.match(id, /^[a-z0-9]{16}$/);
    assert.equal(home, path.join(dir, id));
    assert.equal(fs.statSync(home).isDirectory(), true);
    dropHome(home);
    assert.equal(fs.existsSync(home), false);
    // Dropping a folder that is already gone is not an error.
    dropHome(home);
    dropHome(null);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("writeAccountToken writes the credential 0600 and reads it back", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "agy-token-"));
  try {
    const file = writeAccountToken(dir, "secret-token");
    assert.equal(file, tokenFile(dir));
    assert.equal(readAccountToken(dir), "secret-token");
    if (process.platform !== "win32") {
      assert.equal(fs.statSync(file).mode & 0o777, 0o600);
    }
    // An object token is stored as JSON, which is what agy reads.
    writeAccountToken(dir, { access_token: "t" });
    assert.deepEqual(JSON.parse(readAccountToken(dir) as string), { access_token: "t" });
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("readAccountToken returns null for an account with no sign-in", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "agy-nologin-"));
  try {
    assert.equal(readAccountToken(dir), null);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// ── Child environment ───────────────────────────────────────────────────────

test("childEnv turns auto-update off when the operator set nothing", () => {
  assert.deepEqual(childEnv({ PATH: "/p" }, {}, "linux"), {
    PATH: "/p",
    AGY_CLI_DISABLE_AUTO_UPDATE: "true",
  });
});

test("childEnv keeps an auto-update value the operator set", () => {
  assert.equal(
    childEnv({ AGY_CLI_DISABLE_AUTO_UPDATE: "false" }, {}, "linux").AGY_CLI_DISABLE_AUTO_UPDATE,
    "false"
  );
});

test("childEnv lets the caller's values override the parent's", () => {
  assert.equal(childEnv({ PATH: "/p" }, { PATH: "/q" }, "linux").PATH, "/q");
});

test("childEnv treats Windows env names case-insensitively and keeps the last spelling", () => {
  const env = childEnv({ Path: "C:\\a" }, { PATH: "C:\\b" }, "win32");
  assert.equal(env.PATH, "C:\\b");
  // The stale differently-cased copy is removed, not left beside the new one.
  assert.equal("Path" in env, false);
});

test("childEnv applies the account's home and SSH shim inside the scope", () => {
  const env = inAccount("/home/acct", () => childEnv({ PATH: "/p" }, {}, "linux"));
  assert.equal(env.HOME, "/home/acct");
  assert.equal(env.SSH_CONNECTION, "127.0.0.1 0 127.0.0.1 0");
  assert.equal(env.PATH, "/p");
  assert.equal(env.AGY_CLI_DISABLE_AUTO_UPDATE, "true");
});

test("childEnv skips undefined values instead of passing them through", () => {
  const env = childEnv({ PATH: "/p", DROPPED: undefined }, {}, "linux");
  assert.equal("DROPPED" in env, false);
});
