import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const root = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute managed selection "));
const savedEnv = {
  DATA_DIR: process.env.DATA_DIR,
  HOME: process.env.HOME,
  USERPROFILE: process.env.USERPROFILE,
  CLI_CODEX_BIN: process.env.CLI_CODEX_BIN,
};
process.env.DATA_DIR = path.join(root, "data");
process.env.HOME = path.join(root, "home");
process.env.USERPROFILE = process.env.HOME;
delete process.env.CLI_CODEX_BIN;

const { getCliRuntimeStatus, getKnownToolPaths } =
  await import("../../src/shared/services/cliRuntime.ts");
const { getManagedCliRoot, getManagedCliCommand } =
  await import("../../src/shared/services/managedCliRuntime.ts");
const { loadBundledCodexCatalog } = await import("../../src/lib/cliTools/codexModelCatalog.ts");
const version = "9.10.0";
const installationId = version + "-11111111-1111-4111-8111-111111111111";
const runtimeRoot = getManagedCliRoot();
const prefix = path.join(runtimeRoot, "codex", "versions", installationId);
const packageDirectory = path.join(prefix, "node_modules", "@openai", "codex");
const entry = path.join(packageDirectory, "bin", "codex.mjs");
const command = path.join(
  prefix,
  "node_modules",
  ".bin",
  "codex" + (process.platform === "win32" ? ".cmd" : "")
);
const pointerFile = path.join(runtimeRoot, "codex", "active.json");

fs.mkdirSync(path.dirname(entry), { recursive: true });
fs.mkdirSync(path.dirname(command), { recursive: true });
fs.mkdirSync(process.env.HOME!, { recursive: true });
fs.writeFileSync(
  entry,
  "#!/usr/bin/env node\nconst args = process.argv.slice(2);\nconsole.log(args.includes('--version') ? 'codex-cli 9.10.0' : JSON.stringify({models:[{slug:'managed-model'}]}));\n"
);
fs.chmodSync(entry, 0o755);
fs.writeFileSync(
  path.join(packageDirectory, "package.json"),
  JSON.stringify({
    name: "@openai/codex",
    version,
    bin: { codex: "bin/codex.mjs" },
  })
);
if (process.platform === "win32") fs.writeFileSync(command, "@echo off\r\n");
else fs.symlinkSync(entry, command);
fs.writeFileSync(
  pointerFile,
  JSON.stringify({ version, installationId, updatedAt: new Date().toISOString() })
);

test.after(() => {
  for (const [key, value] of Object.entries(savedEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  fs.rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("managed runtime takes priority over system discovery and runs from a data path with spaces", async () => {
  assert.equal(getManagedCliCommand("codex"), command);
  assert.equal(getKnownToolPaths("codex")[0], command);
  const status = await getCliRuntimeStatus("codex");
  assert.equal(status.commandPath, command);
  assert.equal(status.runnable, true);
  assert.equal(status.version, "codex-cli 9.10.0");
});

test("Codex bundled model catalog is loaded from the newly activated executable", async () => {
  const catalog = await loadBundledCodexCatalog(path.join(root, "codex-home"));
  assert.deepEqual(
    catalog.models.map((model) => model.slug),
    ["managed-model"]
  );
});

test("explicit binary selection is preserved instead of activating the managed runtime", () => {
  process.env.CLI_CODEX_BIN = path.join(root, "operator-selected-codex");
  try {
    assert.equal(getManagedCliCommand("codex"), null);
    assert.equal(getKnownToolPaths("codex").includes(command), false);
  } finally {
    delete process.env.CLI_CODEX_BIN;
  }
});

test("invalid pointer never enters the authoritative runtime search", () => {
  const previous = fs.readFileSync(pointerFile, "utf8");
  fs.writeFileSync(
    pointerFile,
    JSON.stringify({ version, installationId: "../../escape", updatedAt: new Date().toISOString() })
  );
  try {
    assert.equal(getManagedCliCommand("codex"), null);
    assert.equal(getKnownToolPaths("codex").includes(command), false);
  } finally {
    fs.writeFileSync(pointerFile, previous);
  }
});
