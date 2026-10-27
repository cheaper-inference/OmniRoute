import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  copyFileSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../", import.meta.url));

function installedFixture(t: { after: (fn: () => void) => void }) {
  const tmp = mkdtempSync(join(tmpdir(), "omni-installed-env-16763-"));
  const packageRoot = join(tmp, "node_modules", "omniroute");
  const dataDir = join(tmp, "data");
  const cwd = join(tmp, "cwd");
  mkdirSync(join(packageRoot, "bin"), { recursive: true });
  mkdirSync(dataDir);
  mkdirSync(cwd);
  copyFileSync(join(root, "bin", "omniroute.mjs"), join(packageRoot, "bin", "omniroute.mjs"));
  copyFileSync(join(root, "package.json"), join(packageRoot, "package.json"));
  for (const name of ["node_modules", "src", "open-sse", "scripts", "config"]) {
    symlinkSync(join(root, name), join(packageRoot, name), "junction");
  }
  symlinkSync(join(root, "bin", "cli"), join(packageRoot, "bin", "cli"), "junction");
  for (const name of ["nodeRuntimeSupport.mjs", "aliasResolver.mjs"]) {
    copyFileSync(join(root, "bin", name), join(packageRoot, "bin", name));
  }
  writeFileSync(join(packageRoot, ".env.example"), "PORT=20128\nNODE_ENV=production\n");
  copyFileSync(join(packageRoot, ".env.example"), join(packageRoot, ".env"));
  t.after(() => rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 }));
  return { packageRoot, dataDir, cwd };
}

function runHelp(layout: ReturnType<typeof installedFixture>) {
  const env = { ...process.env };
  for (const key of ["PORT", "NODE_ENV", "OMNIROUTE_CLI_SKIP_REPO_ENV", "OMNIROUTE_LANG"])
    delete env[key];
  const result = spawnSync(
    process.execPath,
    [join(layout.packageRoot, "bin", "omniroute.mjs"), "--help"],
    {
      cwd: layout.cwd,
      env: {
        ...env,
        DATA_DIR: layout.dataDir,
        OMNIROUTE_CLI_SKIP_DEFAULT_DATA_ENV: "1",
        OMNIROUTE_NO_UPDATE_NOTIFIER: "1",
        CI: "1",
      },
      encoding: "utf8",
      timeout: 60_000,
    }
  );
  assert.equal(result.error, undefined, result.error?.message);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Usage: omniroute/);
  assert.ok(result.stdout.includes(join(layout.packageRoot, ".env")));
  return result.stderr;
}

test("real installed-layout CLI keeps generated defaults quiet and warns on effective edits", (t) => {
  const layout = installedFixture(t);
  assert.doesNotMatch(runHelp(layout), /lives inside the installed package/);
  writeFileSync(join(layout.packageRoot, ".env"), "PORT=29999\nNODE_ENV=production\n");
  const warning = runHelp(layout);
  assert.match(warning, /lives inside the installed package/);
  assert.ok(warning.includes(join(layout.dataDir, ".env")));
  assert.ok(!warning.includes("29999"));
  assert.equal(
    readFileSync(join(layout.packageRoot, ".env"), "utf8"),
    "PORT=29999\nNODE_ENV=production\n"
  );
});
