/**
 * `omniroute packs` must not load optional-packs.index.json from the working
 * directory unless the caller passes `--source`. A cloned repo could otherwise
 * supply both the checksum index and the payload that install would extract.
 *
 * `list` always enumerates the built-in OPTIONAL_PACKS names, so a cwd-only
 * pack name never appears in the table; the security property is that the cwd
 * index is not selected when `--source` is omitted (bundle index wins).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const BIN = path.join(ROOT, "bin", "omniroute.mjs");
const INDEX = "optional-packs.index.json";
const { findPackIndexFile } = await import("../../scripts/packs/optionalPackInstaller.mjs");

function layout() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-packs-cwd-"));
  const home = path.join(tmp, "home");
  const dataDir = path.join(home, ".omniroute");
  const cwd = path.join(tmp, "untrusted");
  fs.mkdirSync(dataDir, { recursive: true });
  fs.mkdirSync(cwd, { recursive: true });
  const cwdIndex = path.join(cwd, INDEX);
  fs.writeFileSync(
    cwdIndex,
    JSON.stringify({
      packs: [
        {
          name: "evil-from-cwd",
          version: "0.0.0",
          archive: "evil.tgz",
          sha256: "0".repeat(64),
          members: [],
        },
      ],
    })
  );
  return { tmp, home, dataDir, cwd, cwdIndex };
}

function cleanEnv(home: string) {
  const env: Record<string, string> = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (value === undefined) continue;
    if (/^(OMNIROUTE_|NODE_|NPM_CONFIG_|DATA_DIR$|PORT$)/i.test(key)) continue;
    env[key] = value;
  }
  return {
    ...env,
    HOME: home,
    CI: "1",
    NO_UPDATE_NOTIFIER: "1",
    OMNIROUTE_NO_UPDATE_NOTIFIER: "1",
    OMNIROUTE_CLI_SKIP_REPO_ENV: "1",
    OMNIROUTE_CONTEXT_KEYCHAIN_DISABLED: "1",
    OMNIROUTE_DISABLE_CLI_TOKEN: "1",
    STORAGE_ENCRYPTION_KEY: "0".repeat(64),
    LANG: "en_US.UTF-8",
  };
}

function runCli(args: string[], cwd: string, env: Record<string, string>) {
  return new Promise<{ code: number | null; stdout: string; stderr: string }>((resolve) => {
    const child = spawn(process.execPath, [BIN, ...args], { cwd, env, detached: true });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (d) => (stdout += d));
    child.stderr.on("data", (d) => (stderr += d));
    const timer = setTimeout(() => {
      try {
        process.kill(-child.pid!, "SIGKILL");
      } catch {
        /* already gone */
      }
    }, 60_000);
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ code, stdout, stderr });
    });
  });
}

function rm(dir: string) {
  fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
}

test("findPackIndexFile: cwd index is only selected when cwd is in the start list", () => {
  const dirs = layout();
  try {
    const fromCwd = findPackIndexFile([dirs.cwd]);
    assert.equal(fromCwd, dirs.cwdIndex);

    // Same search order as loadIndex(undefined) after the fix: CLI module dir, no cwd.
    const cliDir = path.join(ROOT, "bin", "cli");
    const withoutCwd = findPackIndexFile([undefined, cliDir]);
    assert.notEqual(withoutCwd, dirs.cwdIndex);
    assert.ok(withoutCwd === null || !withoutCwd.startsWith(dirs.tmp));

    // When the CLI walk finds nothing, the pre-fix start list fell through to cwd.
    // That is the case this PR closes: a global install without a nearby index must
    // not pick up optional-packs.index.json from an untrusted working directory.
    const emptyCli = path.join(dirs.tmp, "empty-cli");
    fs.mkdirSync(emptyCli, { recursive: true });
    assert.equal(
      findPackIndexFile([undefined, emptyCli]),
      null,
      "fixed loadIndex start list must not reach cwd"
    );
    assert.equal(
      findPackIndexFile([undefined, emptyCli, dirs.cwd]),
      dirs.cwdIndex,
      "pre-fix start list (…, process.cwd()) would have selected the cwd index"
    );

    if (withoutCwd) {
      assert.equal(findPackIndexFile([undefined, cliDir, dirs.cwd]), withoutCwd);
      assert.equal(findPackIndexFile([dirs.cwd, cliDir]), dirs.cwdIndex);
    }
  } finally {
    rm(dirs.tmp);
  }
});

test("packs list from an untrusted cwd never surfaces a cwd-only pack name", async () => {
  const dirs = layout();
  try {
    const { code, stdout, stderr } = await runCli(["packs", "list"], dirs.cwd, cleanEnv(dirs.home));
    const out = `${stdout}\n${stderr}`;
    assert.equal(code, 0, out);
    assert.doesNotMatch(out, /evil-from-cwd/);
    assert.match(out, /ml-runtime|browser-runtime/);
  } finally {
    rm(dirs.tmp);
  }
});

test("packs list --source <cwd> selects the cwd index (install would then take its payload)", async () => {
  const dirs = layout();
  try {
    // list still enumerates OPTIONAL_PACKS only, so prove selection via findPackIndexFile
    // with the same start list loadIndex(opts.source) uses: [sourceDir, CLI_DIR].
    const cliDir = path.join(ROOT, "bin", "cli");
    assert.equal(findPackIndexFile([dirs.cwd, cliDir]), dirs.cwdIndex);

    const { code, stdout, stderr } = await runCli(
      ["packs", "list", "--source", dirs.cwd],
      dirs.cwd,
      cleanEnv(dirs.home)
    );
    const out = `${stdout}\n${stderr}`;
    assert.equal(code, 0, out);
    // Known pack names still print; the cwd-only name never does (list filters).
    assert.doesNotMatch(out, /evil-from-cwd/);
  } finally {
    rm(dirs.tmp);
  }
});
