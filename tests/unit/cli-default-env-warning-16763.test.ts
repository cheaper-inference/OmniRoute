import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { syncEnv } from "../../scripts/dev/sync-env.mjs";
import { parseEnvValue } from "../../bin/cli/utils/parseEnvValue.mjs";
import { describeVolatileEnvWarning } from "../../bin/cli/utils/volatileEnvPath.mjs";

const shippedExample = readFileSync(new URL("../../.env.example", import.meta.url), "utf8");

function fixture(t: { after: (fn: () => void) => void }, example = shippedExample) {
  const tmp = mkdtempSync(join(tmpdir(), "omni-default-env-16763-"));
  const packageRoot = join(tmp, "node_modules", "omniroute");
  const durableEnvPath = join(tmp, "data", ".env");
  mkdirSync(packageRoot, { recursive: true });
  mkdirSync(join(tmp, "data"));
  writeFileSync(join(packageRoot, ".env.example"), example);
  const priorDataDir = process.env.DATA_DIR;
  process.env.DATA_DIR = join(tmp, "data");
  try {
    syncEnv({ rootDir: packageRoot, quiet: true });
  } finally {
    if (priorDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = priorDataDir;
  }
  t.after(() => rmSync(tmp, { recursive: true, force: true }));
  return { packageRoot, durableEnvPath, envPath: join(packageRoot, ".env") };
}

function suppliedValues(envPath: string) {
  const values = new Map<string, string>();
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index < 1) continue;
    const key = trimmed.slice(0, index).trim();
    if (!values.has(key)) values.set(key, parseEnvValue(trimmed.slice(index + 1)));
  }
  return values;
}

function describe(paths: ReturnType<typeof fixture>, values = suppliedValues(paths.envPath)) {
  const options = { ...paths, suppliedKeys: values.size > 0, suppliedValues: values };
  return describeVolatileEnvWarning(options);
}

test("postinstall-generated package defaults do not imply user values at risk", (t) => {
  const paths = fixture(t);
  assert.ok(suppliedValues(paths.envPath).size > 0);
  assert.equal(describe(paths), null);
});

test("startup storage-key comments do not turn generated defaults into overrides", (t) => {
  const paths = fixture(t);
  const content = readFileSync(paths.envPath, "utf8").replace(
    /^STORAGE_ENCRYPTION_KEY=\s*$/m,
    "# STORAGE_ENCRYPTION_KEY=\n# The real key lives in the durable file."
  );
  writeFileSync(paths.envPath, content);
  assert.equal(describe(paths), null);
});

test("equivalent quoting, whitespace and inline comments remain defaults", (t) => {
  const paths = fixture(t, 'PORT=20128\nLABEL="hash # data"\nBLANK=\n');
  writeFileSync(
    paths.envPath,
    "PORT = '20128' # same value\nLABEL='hash # data'\nBLANK='' # blank\n"
  );
  assert.equal(describe(paths), null);
});

test("a changed effective default warns without exposing its value", (t) => {
  const paths = fixture(t, "PORT=20128\n");
  const message = describe(paths, new Map([["PORT", "29999"]]));
  assert.ok(message);
  assert.ok(message.includes(paths.durableEnvPath));
  assert.ok(!message.includes("29999"));
});

test("a contributed key absent from the template remains at risk", (t) => {
  const paths = fixture(t, "PORT=20128\n");
  const message = describe(paths, new Map([["PRIVATE_TEST_KEY", "fixture-secret-do-not-print"]]));
  assert.ok(message);
  assert.ok(!message.includes("fixture-secret-do-not-print"));
});

test("a shadowed customization does not warn when the package supplies only defaults", (t) => {
  const paths = fixture(t, "PORT=20128\nLABEL=default\n");
  writeFileSync(paths.envPath, "PORT=29999\nLABEL=default\n");
  assert.equal(describe(paths, new Map([["LABEL", "default"]])), null);
});

test("a missing or unreadable template conservatively retains the warning", (t) => {
  const paths = fixture(t, "PORT=20128\n");
  const example = join(paths.packageRoot, ".env.example");
  rmSync(example);
  assert.ok(describe(paths));
  mkdirSync(example);
  assert.ok(describe(paths));
});

test("an explicitly emptied nonblank default remains an override", (t) => {
  const paths = fixture(t, "PORT=20128\n");
  assert.ok(describe(paths, new Map([["PORT", ""]])));
});

test("duplicate defaults use the same first-writer rule as CLI loading", (t) => {
  const paths = fixture(t, "PORT=20128\nPORT=29999\n");
  assert.equal(describe(paths), null);
  assert.ok(describe(paths, new Map([["PORT", "29999"]])));
});
