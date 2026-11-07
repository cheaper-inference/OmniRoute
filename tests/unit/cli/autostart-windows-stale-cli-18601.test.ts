import test from "node:test";
import assert from "node:assert/strict";
import {
  chmodSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, extname, join } from "node:path";
import { tmpdir } from "node:os";

const autostart = await import("../../../bin/cli/tray/autostart.mjs");
const {
  buildWinVbsContent,
  rewriteWinVbsCliPath,
  refreshWinAutostartCliPath,
  compareCliVersions,
  isNpxCachePath,
  winVbsTempPath,
} = autostart;
const { refreshAutostartEntry } = await import("../../../bin/cli/commands/serve.mjs");

// #18601: the Startup VBS pins the real path of the CLI that enabled autostart.
// pnpm installs each version under its own directory, so after an upgrade every
// login kept booting the old version.

// What 3.8.51 wrote on a pnpm 10 global install (old quoting escaped every backslash).
const LEGACY_VBS = [
  'Set WshShell = CreateObject("WScript.Shell")',
  'WshShell.Run """C:\\\\Users\\\\u\\\\fnm\\\\node.exe"" ""C:\\\\Users\\\\u\\\\pnpm\\\\global\\\\5\\\\.pnpm\\\\omniroute@3.8.51_abc\\\\node_modules\\\\omniroute\\\\bin\\\\omniroute.mjs"" serve --no-open --tray", 0, False',
  "",
].join("\n");

const NEW_CLI =
  "C:\\Users\\u\\pnpm\\store\\v11\\links\\@\\omniroute\\3.8.52\\def\\node_modules\\omniroute\\bin\\omniroute.mjs";

function execLineOf(vbs: string) {
  const run = vbs.match(/^WshShell\.Run "(.*)", 0, False\r?$/m);
  assert.ok(run, "VBS keeps its WshShell.Run line");
  return run[1].replace(/""/g, '"');
}

test("rewriteWinVbsCliPath swaps only the CLI script in a legacy VBS", () => {
  const result = rewriteWinVbsCliPath(LEGACY_VBS, NEW_CLI);
  assert.ok(result);
  assert.equal(
    result.previousCliPath,
    "C:\\Users\\u\\pnpm\\global\\5\\.pnpm\\omniroute@3.8.51_abc\\node_modules\\omniroute\\bin\\omniroute.mjs"
  );
  assert.equal(
    execLineOf(result.content),
    `"C:\\\\Users\\\\u\\\\fnm\\\\node.exe" "${NEW_CLI}" serve --no-open --tray`
  );
  assert.ok(result.content.startsWith('Set WshShell = CreateObject("WScript.Shell")\n'));
});

test("rewriteWinVbsCliPath keeps hand-added flags and CRLF line endings", () => {
  const vbs = LEGACY_VBS.replace("--tray", "--tray --port 20129").replace(/\n/g, "\r\n");
  const result = rewriteWinVbsCliPath(vbs, NEW_CLI);
  assert.ok(result);
  assert.match(execLineOf(result.content), / serve --no-open --tray --port 20129$/);
  assert.equal(result.content.split("\r\n").length, vbs.split("\r\n").length);
  assert.doesNotMatch(result.content.replace(/\r\n/g, ""), /\n/);
});

test("rewriteWinVbsCliPath round-trips the current buildWinVbsContent format", () => {
  const vbs = buildWinVbsContent("C:\\old\\node_modules\\omniroute\\bin\\omniroute.mjs", {
    tray: false,
  });
  const result = rewriteWinVbsCliPath(vbs, NEW_CLI);
  assert.ok(result);
  assert.equal(result.previousCliPath, "C:\\old\\node_modules\\omniroute\\bin\\omniroute.mjs");
  assert.ok(execLineOf(result.content).endsWith(` "${NEW_CLI}" serve --no-open --no-tray`));
});

test("rewriteWinVbsCliPath returns null for a VBS it did not write", () => {
  assert.equal(rewriteWinVbsCliPath('MsgBox "hello"\n', NEW_CLI), null);
  assert.equal(rewriteWinVbsCliPath("", NEW_CLI), null);
});

// The version/path comparisons are pure, so these run on every OS.
test("compareCliVersions orders versions numerically, prereleases below their release", () => {
  assert.equal(compareCliVersions("3.8.51", "3.8.52"), -1);
  assert.equal(compareCliVersions("3.8.52", "3.8.51"), 1);
  assert.equal(compareCliVersions("3.8.52", "3.8.52"), 0);
  assert.equal(compareCliVersions("3.8.9", "3.8.10"), -1, "numeric, not lexical");
  assert.equal(compareCliVersions("3.9.0", "3.10.0"), -1);
  assert.equal(compareCliVersions("4.0.0", "3.99.99"), 1);
  assert.equal(compareCliVersions("3.9.0-rc1", "3.9.0"), -1);
  assert.equal(compareCliVersions("3.9.0", "3.9.0-rc1"), 1);
  assert.equal(compareCliVersions("3.9.0-rc1", "3.9.0-rc2"), -1);
  assert.equal(compareCliVersions("3.9.0-rc.2", "3.9.0-rc.10"), -1);
  assert.equal(compareCliVersions("3.9.0-rc1", "3.8.99"), 1, "prerelease of a newer release");
  assert.equal(compareCliVersions("3.9.0+build5", "3.9.0"), 0, "build metadata is ignored");
});

test("compareCliVersions returns null for anything that is not major.minor.patch", () => {
  for (const bad of [null, undefined, "", "nightly", "3.8", "v3.8.52", "3.8.52.1", 3.8, {}]) {
    assert.equal(compareCliVersions(bad, "3.8.52"), null, String(bad));
    assert.equal(compareCliVersions("3.8.52", bad), null, String(bad));
  }
});

test("isNpxCachePath matches an _npx path segment only", () => {
  const cli = "node_modules\\omniroute\\bin\\omniroute.mjs";
  const npx = "C:\\Users\\u\\AppData\\Local\\npm-cache\\_npx\\abc123";
  assert.equal(isNpxCachePath(`${npx}\\${cli}`), true);
  assert.equal(isNpxCachePath(`c:/users/u/appdata/local/npm-cache/_NPX/abc123/${cli}`), true);
  assert.equal(isNpxCachePath(`C:\\Users\\u\\pnpm\\global\\5\\${cli}`), false);
  assert.equal(
    isNpxCachePath(`C:\\Users\\u\\my_npx_tools\\${cli}`),
    false,
    "segment, not substring"
  );
});

// ---------------------------------------------------------------------------
// refreshWinAutostartCliPath touches the filesystem with Windows paths, so it
// only runs on win32 (same as the integration test in autostart-windows.test.ts).
// ---------------------------------------------------------------------------

function fakeInstall(root: string, name: string, version: string) {
  const pkgDir = join(root, name, "node_modules", "omniroute");
  mkdirSync(join(pkgDir, "bin"), { recursive: true });
  writeFileSync(join(pkgDir, "package.json"), JSON.stringify({ name: "omniroute", version }));
  writeFileSync(join(pkgDir, "bin", "omniroute.mjs"), "");
  return join(pkgDir, "bin", "omniroute.mjs");
}

function withTmp(fn: (dir: string) => void) {
  const dir = mkdtempSync(join(tmpdir(), "omniroute-autostart-18601-"));
  try {
    fn(dir);
  } finally {
    rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

test("refresh points a VBS that launches an older install at the running one", () => {
  if (process.platform !== "win32") return;
  withTmp((dir) => {
    const oldCli = fakeInstall(dir, "old", "3.8.51");
    const newCli = fakeInstall(dir, "new", "3.8.52");
    const vbsPath = join(dir, "OmniRoute.vbs");
    writeFileSync(vbsPath, buildWinVbsContent(oldCli, { tray: true }));

    assert.equal(refreshWinAutostartCliPath({ cliPath: newCli, vbsPath }), true);
    const exec = execLineOf(readFileSync(vbsPath, "utf8"));
    assert.ok(exec.includes(`"${newCli}" serve --no-open --tray`), exec);
    assert.ok(!exec.includes(oldCli));
  });
});

test("refresh repairs a VBS whose install was removed", () => {
  if (process.platform !== "win32") return;
  withTmp((dir) => {
    const oldCli = fakeInstall(dir, "old", "3.8.51");
    const newCli = fakeInstall(dir, "new", "3.8.52");
    const vbsPath = join(dir, "OmniRoute.vbs");
    writeFileSync(vbsPath, buildWinVbsContent(oldCli));
    rmSync(join(dir, "old"), { recursive: true, force: true });

    assert.equal(refreshWinAutostartCliPath({ cliPath: newCli, vbsPath }), true);
    assert.ok(execLineOf(readFileSync(vbsPath, "utf8")).includes(`"${newCli}"`));
  });
});

test("refresh repairs a VBS whose CLI script is gone but whose package.json remains", () => {
  if (process.platform !== "win32") return;
  withTmp((dir) => {
    // Same version as the running install, then a newer one: a package.json
    // without the script it describes must not make a broken target look current.
    for (const version of ["3.8.52", "3.9.0"]) {
      const oldCli = fakeInstall(dir, `old-${version}`, version);
      const newCli = fakeInstall(dir, `new-${version}`, "3.8.52");
      const vbsPath = join(dir, `OmniRoute-${version}.vbs`);
      writeFileSync(vbsPath, buildWinVbsContent(oldCli));
      rmSync(oldCli);

      assert.equal(refreshWinAutostartCliPath({ cliPath: newCli, vbsPath }), true, version);
      assert.ok(execLineOf(readFileSync(vbsPath, "utf8")).includes(`"${newCli}"`), version);
    }
  });
});

test("refresh leaves a VBS alone when it already launches the same version", () => {
  if (process.platform !== "win32") return;
  withTmp((dir) => {
    const pnpmCli = fakeInstall(dir, "pnpm", "3.8.52");
    const npmCli = fakeInstall(dir, "npm", "3.8.52");
    const vbsPath = join(dir, "OmniRoute.vbs");
    const vbs = buildWinVbsContent(pnpmCli);
    writeFileSync(vbsPath, vbs);

    assert.equal(refreshWinAutostartCliPath({ cliPath: npmCli, vbsPath }), false);
    assert.equal(refreshWinAutostartCliPath({ cliPath: pnpmCli, vbsPath }), false);
    assert.equal(readFileSync(vbsPath, "utf8"), vbs);
  });
});

test("refresh never repoints autostart at an npx cache copy, even a newer one", () => {
  if (process.platform !== "win32") return;
  withTmp((dir) => {
    const installedCli = fakeInstall(dir, "pnpm", "3.8.52");
    const npxCli = fakeInstall(dir, join("npm-cache", "_npx", "abc123"), "3.9.0");
    const vbsPath = join(dir, "OmniRoute.vbs");
    const vbs = buildWinVbsContent(installedCli);
    writeFileSync(vbsPath, vbs);

    assert.equal(refreshWinAutostartCliPath({ cliPath: npxCli, vbsPath }), false);
    assert.equal(readFileSync(vbsPath, "utf8"), vbs);

    // ...and not even to replace an install that was removed.
    rmSync(join(dir, "pnpm"), { recursive: true, force: true });
    assert.equal(refreshWinAutostartCliPath({ cliPath: npxCli, vbsPath }), false);
    assert.equal(readFileSync(vbsPath, "utf8"), vbs);
  });
});

test("refresh does not repoint a VBS at an older install (downgrade)", () => {
  if (process.platform !== "win32") return;
  withTmp((dir) => {
    const newerCli = fakeInstall(dir, "pnpm", "3.8.52");
    const olderCli = fakeInstall(dir, "project", "3.8.40");
    const vbsPath = join(dir, "OmniRoute.vbs");
    const vbs = buildWinVbsContent(newerCli);
    writeFileSync(vbsPath, vbs);

    assert.equal(refreshWinAutostartCliPath({ cliPath: olderCli, vbsPath }), false);
    assert.equal(readFileSync(vbsPath, "utf8"), vbs);
  });
});

test("refresh settles on the newest of two coexisting installs instead of flip-flopping", () => {
  if (process.platform !== "win32") return;
  withTmp((dir) => {
    const pnpmCli = fakeInstall(dir, "pnpm", "3.8.52");
    const npmCli = fakeInstall(dir, "npm", "3.8.53");
    const vbsPath = join(dir, "OmniRoute.vbs");
    writeFileSync(vbsPath, buildWinVbsContent(pnpmCli));

    assert.equal(refreshWinAutostartCliPath({ cliPath: npmCli, vbsPath }), true);
    const settled = readFileSync(vbsPath, "utf8");
    assert.ok(execLineOf(settled).includes(`"${npmCli}"`));

    // Serving the older copy, or the newer one again, leaves the file as it is.
    assert.equal(refreshWinAutostartCliPath({ cliPath: pnpmCli, vbsPath }), false);
    assert.equal(refreshWinAutostartCliPath({ cliPath: npmCli, vbsPath }), false);
    assert.equal(readFileSync(vbsPath, "utf8"), settled);
  });
});

test("refresh repoints from a prerelease to its release but not the other way round", () => {
  if (process.platform !== "win32") return;
  withTmp((dir) => {
    const rcCli = fakeInstall(dir, "rc", "3.9.0-rc1");
    const releaseCli = fakeInstall(dir, "release", "3.9.0");
    const vbsPath = join(dir, "OmniRoute.vbs");
    writeFileSync(vbsPath, buildWinVbsContent(releaseCli));
    assert.equal(refreshWinAutostartCliPath({ cliPath: rcCli, vbsPath }), false);

    writeFileSync(vbsPath, buildWinVbsContent(rcCli));
    assert.equal(refreshWinAutostartCliPath({ cliPath: releaseCli, vbsPath }), true);
    assert.ok(execLineOf(readFileSync(vbsPath, "utf8")).includes(`"${releaseCli}"`));
  });
});

test("refresh leaves a VBS alone when either version cannot be parsed", () => {
  if (process.platform !== "win32") return;
  withTmp((dir) => {
    const odd = fakeInstall(dir, "odd", "nightly");
    const good = fakeInstall(dir, "good", "3.8.52");
    const vbsPath = join(dir, "OmniRoute.vbs");

    const vbs = buildWinVbsContent(odd);
    writeFileSync(vbsPath, vbs);
    assert.equal(refreshWinAutostartCliPath({ cliPath: good, vbsPath }), false);
    assert.equal(readFileSync(vbsPath, "utf8"), vbs);

    const goodVbs = buildWinVbsContent(good);
    writeFileSync(vbsPath, goodVbs);
    assert.equal(refreshWinAutostartCliPath({ cliPath: odd, vbsPath }), false);
    assert.equal(readFileSync(vbsPath, "utf8"), goodVbs);
  });
});

test("refresh never repoints autostart at a source checkout", () => {
  if (process.platform !== "win32") return;
  withTmp((dir) => {
    const installedCli = fakeInstall(dir, "old", "3.8.51");
    const checkoutCli = join(dir, "OmniRoute", "bin", "omniroute.mjs");
    mkdirSync(join(dir, "OmniRoute", "bin"), { recursive: true });
    writeFileSync(join(dir, "OmniRoute", "package.json"), JSON.stringify({ version: "3.8.53" }));
    writeFileSync(checkoutCli, "");
    const vbsPath = join(dir, "OmniRoute.vbs");
    const vbs = buildWinVbsContent(installedCli);
    writeFileSync(vbsPath, vbs);

    assert.equal(refreshWinAutostartCliPath({ cliPath: checkoutCli, vbsPath }), false);
    assert.equal(readFileSync(vbsPath, "utf8"), vbs);
  });
});

test("refresh keeps a VBS that deliberately launches a source checkout", () => {
  if (process.platform !== "win32") return;
  withTmp((dir) => {
    const installedCli = fakeInstall(dir, "new", "3.8.52");
    const checkoutCli = join(dir, "OmniRoute", "bin", "omniroute.mjs");
    mkdirSync(join(dir, "OmniRoute", "bin"), { recursive: true });
    writeFileSync(join(dir, "OmniRoute", "package.json"), JSON.stringify({ version: "3.8.53" }));
    writeFileSync(checkoutCli, "");
    const vbsPath = join(dir, "OmniRoute.vbs");
    const vbs = buildWinVbsContent(checkoutCli);
    writeFileSync(vbsPath, vbs);

    assert.equal(refreshWinAutostartCliPath({ cliPath: installedCli, vbsPath }), false);
    assert.equal(readFileSync(vbsPath, "utf8"), vbs);
  });
});

test("refresh does nothing when autostart is off or the VBS is foreign", () => {
  if (process.platform !== "win32") return;
  withTmp((dir) => {
    const newCli = fakeInstall(dir, "new", "3.8.52");
    const vbsPath = join(dir, "OmniRoute.vbs");

    assert.equal(refreshWinAutostartCliPath({ cliPath: newCli, vbsPath }), false);
    assert.equal(existsSync(vbsPath), false, "must not create a VBS when autostart is off");

    writeFileSync(vbsPath, 'MsgBox "custom"\n');
    assert.equal(refreshWinAutostartCliPath({ cliPath: newCli, vbsPath }), false);
    assert.equal(readFileSync(vbsPath, "utf8"), 'MsgBox "custom"\n');
  });
});

test("refresh replaces the VBS atomically and leaves no temp file behind", () => {
  if (process.platform !== "win32") return;
  withTmp((dir) => {
    const oldCli = fakeInstall(dir, "old", "3.8.51");
    const newCli = fakeInstall(dir, "new", "3.8.52");
    const vbsPath = join(dir, "OmniRoute.vbs");
    writeFileSync(vbsPath, buildWinVbsContent(oldCli));
    const before = statSync(vbsPath, { bigint: true }).ino;

    assert.equal(refreshWinAutostartCliPath({ cliPath: newCli, vbsPath }), true);
    // A new file renamed over the old one, not the old one truncated and rewritten.
    assert.notEqual(statSync(vbsPath, { bigint: true }).ino, before);
    assert.ok(execLineOf(readFileSync(vbsPath, "utf8")).includes(`"${newCli}"`));
    assert.deepEqual(
      readdirSync(dir).filter((name) => name.startsWith("OmniRoute")),
      ["OmniRoute.vbs"]
    );
  });
});

test("a failed replace keeps the old VBS intact, throws, and removes its temp file", () => {
  if (process.platform !== "win32") return;
  withTmp((dir) => {
    const oldCli = fakeInstall(dir, "old", "3.8.51");
    const newCli = fakeInstall(dir, "new", "3.8.52");
    const startup = join(dir, "Startup");
    mkdirSync(startup);
    const vbsPath = join(startup, "OmniRoute.vbs");
    const vbs = buildWinVbsContent(oldCli);
    writeFileSync(vbsPath, vbs);
    chmodSync(vbsPath, 0o444); // read-only: the rename over it fails after the temp is written
    try {
      assert.throws(() => refreshWinAutostartCliPath({ cliPath: newCli, vbsPath }));
      assert.equal(readFileSync(vbsPath, "utf8"), vbs, "old VBS untouched, not truncated");
      assert.deepEqual(readdirSync(startup), ["OmniRoute.vbs"], "temp file removed");
    } finally {
      chmodSync(vbsPath, 0o644);
    }
  });
});

test("the temp file sits next to the VBS under an extension Windows will not run", () => {
  const vbsPath = "C:\\Users\\u\\Startup\\OmniRoute.vbs";
  const temp = winVbsTempPath(vbsPath);
  assert.notEqual(temp, vbsPath);
  assert.equal(dirname(temp).toLowerCase(), dirname(vbsPath).toLowerCase(), "same volume");
  // Everything in the Startup folder is run at login: a leftover temp must not be a script.
  assert.equal(extname(temp).toLowerCase(), ".tmp");
});

test("serve skips the autostart refresh when the install has no server to start", () => {
  const calls: string[] = [];
  const refresh = () => {
    calls.push("refresh");
    return true;
  };
  const withApp = (files: string[], fn: (appDir: string) => void) =>
    withTmp((dir) => {
      for (const file of files) writeFileSync(join(dir, file), "");
      fn(dir);
    });

  withApp([], (appDir) => {
    assert.equal(refreshAutostartEntry({ appDir, platform: "win32", refresh }), false);
  });
  assert.deepEqual(calls, [], "no server-ws.mjs or server.js: the entry must not move");

  withApp(["server.js"], (appDir) => {
    assert.equal(refreshAutostartEntry({ appDir, platform: "win32", refresh }), true);
  });
  withApp(["server-ws.mjs"], (appDir) => {
    assert.equal(refreshAutostartEntry({ appDir, platform: "win32", refresh }), true);
  });
  assert.deepEqual(calls, ["refresh", "refresh"]);

  withApp(["server.js"], (appDir) => {
    assert.equal(refreshAutostartEntry({ appDir, platform: "linux", refresh }), false);
  });
  assert.equal(calls.length, 2, "not on other platforms");
});

test("serve leaves a working VBS alone when the newer install has no server", () => {
  if (process.platform !== "win32") return;
  withTmp((dir) => {
    const oldCli = fakeInstall(dir, "old", "3.8.51");
    const newCli = fakeInstall(dir, "new", "3.8.52");
    const vbsPath = join(dir, "OmniRoute.vbs");
    const vbs = buildWinVbsContent(oldCli);
    writeFileSync(vbsPath, vbs);
    const refresh = () => refreshWinAutostartCliPath({ cliPath: newCli, vbsPath });

    const appDir = join(dir, "new", "node_modules", "omniroute", "dist");
    mkdirSync(appDir);
    assert.equal(refreshAutostartEntry({ appDir, refresh }), false);
    assert.equal(readFileSync(vbsPath, "utf8"), vbs);

    writeFileSync(join(appDir, "server.js"), "");
    assert.equal(refreshAutostartEntry({ appDir, refresh }), true);
    assert.ok(execLineOf(readFileSync(vbsPath, "utf8")).includes(`"${newCli}"`));
  });
});

test("serve refreshes the autostart entry, but not from the detached tray worker", () => {
  const source = readFileSync(join(process.cwd(), "bin/cli/commands/serve.mjs"), "utf8");
  const runServe = source.match(/export async function runServe\(opts = \{\}\) \{([\s\S]*?)\n\}/);
  assert.ok(runServe, "runServe should exist");
  assert.match(runServe[1], /if \(opts\.trayWorker !== true\) refreshAutostartEntry\(\);/);
  assert.match(source, /refreshWinAutostartCliPath\(\)/);
});
