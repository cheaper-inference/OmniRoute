import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { bootstrapEnv } from "../../scripts/build/bootstrap-env.mjs";
import { parseEnvValue } from "../../bin/cli/utils/parseEnvValue.mjs";

function withTempEnv(fn) {
  const originalCwd = process.cwd();
  const originalEnv = { ...process.env };
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-bootstrap-test-"));
  const tempCwd = path.join(tempRoot, "cwd");
  const tempHome = path.join(tempRoot, "home");

  fs.mkdirSync(tempCwd, { recursive: true });
  fs.mkdirSync(tempHome, { recursive: true });

  delete process.env.DATA_DIR;
  delete process.env.XDG_CONFIG_HOME;
  delete process.env.APPDATA;
  delete process.env.JWT_SECRET;
  delete process.env.STORAGE_ENCRYPTION_KEY;
  delete process.env.STORAGE_ENCRYPTION_KEY_VERSION;
  delete process.env.API_KEY_SECRET;
  delete process.env.INITIAL_PASSWORD;
  process.env.HOME = tempHome;
  process.chdir(tempCwd);

  try {
    fn({ tempRoot, tempCwd, tempHome, dataDir: path.join(tempHome, ".omniroute") });
  } finally {
    process.chdir(originalCwd);
    for (const key of Object.keys(process.env)) {
      if (!(key in originalEnv)) delete process.env[key];
    }
    for (const [key, value] of Object.entries(originalEnv)) {
      process.env[key] = value;
    }
    fs.rmSync(tempRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

function writeServerEnv(dataDir, content) {
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(path.join(dataDir, "server.env"), content, "utf8");
}

test("strips an unquoted inline comment", () => {
  withTempEnv(({ dataDir }) => {
    process.env.DATA_DIR = dataDir;
    writeServerEnv(dataDir, "MY_KEY=v  # note\n");

    const env = bootstrapEnv({ quiet: true });

    assert.equal(env.MY_KEY, "v");
  });
});

test("keeps hashes inside quotes", () => {
  withTempEnv(({ dataDir }) => {
    process.env.DATA_DIR = dataDir;
    writeServerEnv(dataDir, "MY_FIRST=\"a#b\"\nMY_SECOND='a#b'\n");

    const env = bootstrapEnv({ quiet: true });

    assert.equal(env.MY_FIRST, "a#b");
    assert.equal(env.MY_SECOND, "a#b");
  });
});

test("strips a comment after a closing quote", () => {
  withTempEnv(({ dataDir }) => {
    process.env.DATA_DIR = dataDir;
    writeServerEnv(dataDir, 'MY_KEY="v"   # note\n');

    const env = bootstrapEnv({ quiet: true });

    assert.equal(env.MY_KEY, "v");
  });
});

test("keeps hashes without preceding whitespace", () => {
  withTempEnv(({ dataDir }) => {
    process.env.DATA_DIR = dataDir;
    writeServerEnv(dataDir, "MY_FIRST=pass#word\nMY_SECOND=https://example.com/page#section\n");

    const env = bootstrapEnv({ quiet: true });

    assert.equal(env.MY_FIRST, "pass#word");
    assert.equal(env.MY_SECOND, "https://example.com/page#section");
  });
});

test("leaves values without hashes unchanged", () => {
  withTempEnv(({ dataDir }) => {
    process.env.DATA_DIR = dataDir;
    writeServerEnv(dataDir, "MY_KEY=v\n");

    const env = bootstrapEnv({ quiet: true });

    assert.equal(env.MY_KEY, "v");
  });
});

test("skips full-line comments", () => {
  withTempEnv(({ dataDir }) => {
    process.env.DATA_DIR = dataDir;
    writeServerEnv(dataDir, "# full line comment\nMY_KEY=value\n");

    const env = bootstrapEnv({ quiet: true });

    assert.equal(env.MY_KEY, "value");
    for (const key of Object.keys(env)) {
      assert.doesNotMatch(key, /^#/);
    }
  });
});

test("treats a comment-only value as empty", () => {
  withTempEnv(({ dataDir }) => {
    process.env.DATA_DIR = dataDir;
    fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(path.join(dataDir, ".env"), "MY_KEY=  # note\n", "utf8");

    const env = bootstrapEnv({ quiet: true });

    assert.equal(env.MY_KEY, undefined);
  });
});

test("keeps a quoted leading hash as data", () => {
  withTempEnv(({ dataDir }) => {
    process.env.DATA_DIR = dataDir;
    writeServerEnv(dataDir, 'MY_KEY="#s3cret"\n');

    const env = bootstrapEnv({ quiet: true });

    assert.equal(env.MY_KEY, "#s3cret");
  });
});

test("skips lines without an equals sign", () => {
  withTempEnv(({ dataDir }) => {
    process.env.DATA_DIR = dataDir;
    writeServerEnv(dataDir, "MY_KEY # note\nMY_OTHER=value\n");

    const env = bootstrapEnv({ quiet: true });

    assert.equal(env.MY_KEY, undefined);
    assert.equal(env.MY_OTHER, "value");
  });
});

test("matches the command-line reader on a shared vector", () => {
  const raws = [
    "v",
    "v  # note",
    '"a#b"',
    "'a#b'",
    '"v"   # note',
    "pass#word",
    "https://example.com/page#section",
  ];
  for (const raw of raws) {
    withTempEnv(({ dataDir }) => {
      process.env.DATA_DIR = dataDir;
      writeServerEnv(dataDir, `MY_KEY=${raw}\n`);

      const env = bootstrapEnv({ quiet: true });

      assert.equal(env.MY_KEY, parseEnvValue(raw));
    });
  }
});
