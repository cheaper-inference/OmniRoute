// ordata-114: `omniroute` (bin/omniroute.mjs) loads every candidate .env in order and a later file fills
// the keys an earlier one lacks. The standalone launcher (bootstrapEnv) used to read only the first
// existing .env, so a key kept in the default data dir reached a CLI launch but not a standalone one.
import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { bootstrapEnv } from "../../scripts/build/bootstrap-env.mjs";

const SECRETS = "JWT_SECRET=jwt\nSTORAGE_ENCRYPTION_KEY=key\nAPI_KEY_SECRET=api\n";
const MERGE_FLAG = "OMNIROUTE_STANDALONE_ENV_MERGE_ENABLED";

// `flag` is the value of the merge flag in the process env; null leaves it unset.
function withLayout(fn, flag = "1") {
  const originalCwd = process.cwd();
  const originalEnv = { ...process.env };
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-env-merge-"));
  const home = path.join(root, "home");
  const cwd = path.join(root, "cwd");
  const dataDir = path.join(root, "data");
  const defaultDir = path.join(home, ".omniroute");
  for (const dir of [cwd, dataDir, defaultDir]) fs.mkdirSync(dir, { recursive: true });
  for (const key of [
    "XDG_CONFIG_HOME",
    "APPDATA",
    "JWT_SECRET",
    "STORAGE_ENCRYPTION_KEY",
    "STORAGE_ENCRYPTION_KEY_VERSION",
    "API_KEY_SECRET",
    "INITIAL_PASSWORD",
    "OMNIROUTE_CLI_SKIP_DEFAULT_DATA_ENV",
    MERGE_FLAG,
    "MERGE_PROBE_A",
    "MERGE_PROBE_B",
  ]) {
    delete process.env[key];
  }
  if (flag !== null) process.env[MERGE_FLAG] = flag;
  process.env.HOME = home;
  // os.homedir() reads USERPROFILE on Windows, so it must point at the temporary home too.
  process.env.USERPROFILE = home;
  process.env.DATA_DIR = dataDir;
  process.chdir(cwd);
  try {
    return fn({ cwd, dataDir, defaultDir });
  } finally {
    process.chdir(originalCwd);
    for (const key of Object.keys(process.env)) if (!(key in originalEnv)) delete process.env[key];
    for (const [key, value] of Object.entries(originalEnv)) process.env[key] = value;
    fs.rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

function boot() {
  const write = mock.method(process.stderr, "write", () => true);
  try {
    const env = bootstrapEnv();
    return { env, stderr: write.mock.calls.map((c) => String(c.arguments[0])).join("") };
  } finally {
    write.mock.restore();
  }
}

test("a key only in the default data dir .env reaches the standalone env, like the CLI", () => {
  withLayout(({ dataDir, defaultDir }) => {
    fs.writeFileSync(path.join(dataDir, ".env"), `${SECRETS}MERGE_PROBE_A=from-data-dir\n`);
    fs.writeFileSync(path.join(defaultDir, ".env"), "MERGE_PROBE_B=from-default-dir\n");
    const { env } = boot();
    assert.equal(env.MERGE_PROBE_A, "from-data-dir");
    assert.equal(env.MERGE_PROBE_B, "from-default-dir");
  });
});

test("the earlier file wins a key that both files set", () => {
  withLayout(({ dataDir, defaultDir }) => {
    fs.writeFileSync(path.join(dataDir, ".env"), `${SECRETS}MERGE_PROBE_A=first\n`);
    fs.writeFileSync(path.join(defaultDir, ".env"), "MERGE_PROBE_A=second\n");
    assert.equal(boot().env.MERGE_PROBE_A, "first");
  });
});

test("the launcher names the key and file whose value is new, never the value", () => {
  withLayout(({ dataDir, defaultDir }) => {
    fs.writeFileSync(path.join(dataDir, ".env"), SECRETS);
    fs.writeFileSync(path.join(defaultDir, ".env"), "MERGE_PROBE_B=super-private-value\n");
    const { stderr } = boot();
    assert.match(stderr, /MERGE_PROBE_B/);
    assert.ok(stderr.includes(path.join(defaultDir, ".env")));
    assert.doesNotMatch(stderr, /super-private-value/);
  });
});

test("OMNIROUTE_CLI_SKIP_DEFAULT_DATA_ENV=1 skips the default data dir, as in the CLI", () => {
  withLayout(({ dataDir, defaultDir }) => {
    process.env.OMNIROUTE_CLI_SKIP_DEFAULT_DATA_ENV = "1";
    fs.writeFileSync(path.join(dataDir, ".env"), SECRETS);
    fs.writeFileSync(path.join(defaultDir, ".env"), "MERGE_PROBE_B=from-default-dir\n");
    const { env, stderr } = boot();
    assert.equal(env.MERGE_PROBE_B, undefined);
    assert.doesNotMatch(stderr, /MERGE_PROBE_B/);
  });
});

test("a .env in the working directory is not merged behind a data dir .env", () => {
  withLayout(({ cwd, dataDir }) => {
    fs.writeFileSync(path.join(dataDir, ".env"), SECRETS);
    fs.writeFileSync(path.join(cwd, ".env"), "MERGE_PROBE_B=from-cwd\n");
    assert.equal(boot().env.MERGE_PROBE_B, undefined);
  });
});

test("one data dir .env alone gives no merge warning", () => {
  withLayout(({ dataDir }) => {
    fs.writeFileSync(path.join(dataDir, ".env"), `${SECRETS}MERGE_PROBE_A=only\n`);
    const { env, stderr } = boot();
    assert.equal(env.MERGE_PROBE_A, "only");
    assert.doesNotMatch(stderr, /MERGE_PROBE_A/);
  });
});

// Off by default (maintainer's request on #20231): a standalone launch reads the same single .env
// file as before, and never reads the default data dir .env when DATA_DIR points elsewhere.
for (const flag of [null, "0", "false"]) {
  test(`flag ${flag === null ? "unset" : `"${flag}"`}: a key only in the default data dir .env stays out`, () => {
    withLayout(({ dataDir, defaultDir }) => {
      fs.writeFileSync(path.join(dataDir, ".env"), `${SECRETS}MERGE_PROBE_A=from-data-dir\n`);
      fs.writeFileSync(path.join(defaultDir, ".env"), "MERGE_PROBE_B=from-default-dir\n");
      const { env, stderr } = boot();
      assert.equal(env.MERGE_PROBE_A, "from-data-dir");
      assert.equal(env.MERGE_PROBE_B, undefined);
      assert.doesNotMatch(stderr, /MERGE_PROBE_B|later \.env/);
    }, flag);
  });
}

test("flag off: the working-directory .env is still the fallback when the data dir has none", () => {
  withLayout(({ cwd, defaultDir }) => {
    fs.writeFileSync(path.join(cwd, ".env"), `${SECRETS}MERGE_PROBE_B=from-cwd\n`);
    fs.writeFileSync(path.join(defaultDir, ".env"), "MERGE_PROBE_B=from-default-dir\n");
    assert.equal(boot().env.MERGE_PROBE_B, "from-cwd");
  }, null);
});

test("flag off: only the first .env is read, so an empty value there does not fall through", () => {
  withLayout(({ dataDir, defaultDir }) => {
    fs.writeFileSync(path.join(dataDir, ".env"), `${SECRETS}MERGE_PROBE_A=\n`);
    fs.writeFileSync(path.join(defaultDir, ".env"), "MERGE_PROBE_A=from-default-dir\n");
    assert.equal(boot().env.MERGE_PROBE_A, undefined);
  }, null);
});

test("the flag is read from the process env, never from a .env file", () => {
  withLayout(({ dataDir, defaultDir }) => {
    fs.writeFileSync(path.join(dataDir, ".env"), `${SECRETS}${MERGE_FLAG}=1\n`);
    fs.writeFileSync(path.join(defaultDir, ".env"), "MERGE_PROBE_B=from-default-dir\n");
    assert.equal(boot().env.MERGE_PROBE_B, undefined);
  }, null);
});

test("flag true: the default data dir .env is merged, like flag 1", () => {
  withLayout(({ dataDir, defaultDir }) => {
    fs.writeFileSync(path.join(dataDir, ".env"), SECRETS);
    fs.writeFileSync(path.join(defaultDir, ".env"), "MERGE_PROBE_B=from-default-dir\n");
    assert.equal(boot().env.MERGE_PROBE_B, "from-default-dir");
  }, "true");
});
