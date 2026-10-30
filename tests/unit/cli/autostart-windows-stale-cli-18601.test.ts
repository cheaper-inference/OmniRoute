import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const autostart = await import("../../../bin/cli/tray/autostart.mjs");
const { buildWinVbsContent, rewriteWinVbsCliPath, refreshWinAutostartCliPath } = autostart;

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

test("serve refreshes the autostart entry, but not from the detached tray worker", () => {
  const source = readFileSync(join(process.cwd(), "bin/cli/commands/serve.mjs"), "utf8");
  const runServe = source.match(/export async function runServe\(opts = \{\}\) \{([\s\S]*?)\n\}/);
  assert.ok(runServe, "runServe should exist");
  assert.match(runServe[1], /if \(opts\.trayWorker !== true\) refreshAutostartEntry\(\);/);
  assert.match(source, /refreshWinAutostartCliPath\(\)/);
});
