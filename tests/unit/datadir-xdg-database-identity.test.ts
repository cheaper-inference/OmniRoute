// With DATA_DIR unset, an existing ~/.omniroute used to win over $XDG_CONFIG_HOME/omniroute no
// matter what it held. Other code (MCP heartbeat, CLI sqlite runtime) creates ~/.omniroute/<sub>
// directly, so an XDG install that already had its database silently moved to a new empty
// ~/.omniroute on the next start. The legacy dir now wins only when it holds the database, or
// when the platform dir holds none (fresh installs and legacy installs behave as before).
// Every copy of the resolver must agree; they are separate files by design.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { resolveDataDir as bootstrapResolveDataDir } from "../../scripts/build/bootstrap-env.mjs";
import { resolveDataDir as syncEnvResolveDataDir } from "../../scripts/dev/sync-env.mjs";
import { resolveDataDir as webdavResolveDataDir } from "../../scripts/dev/webdav-handler.mjs";
import { resolveDataDir as cliResolveDataDir } from "../../bin/cli/data-dir.mjs";
import { resolveDataDir as runtimeResolveDataDir } from "../../src/lib/dataPaths.ts";

const resolvers: Array<[string, () => string]> = [
  ["src/lib/dataPaths.ts", () => runtimeResolveDataDir()],
  ["bin/cli/data-dir.mjs", () => cliResolveDataDir()],
  ["scripts/build/bootstrap-env.mjs", () => bootstrapResolveDataDir()],
  ["scripts/dev/sync-env.mjs", () => syncEnvResolveDataDir()],
  ["scripts/dev/webdav-handler.mjs", () => webdavResolveDataDir()],
];

function withTempEnv(fn: (p: { home: string; legacy: string; xdg: string }) => void) {
  const originalEnv = { ...process.env };
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-datadir-identity-"));
  const home = path.join(root, "home");
  fs.mkdirSync(home, { recursive: true });
  for (const key of ["DATA_DIR", "XDG_CONFIG_HOME", "APPDATA"]) delete process.env[key];
  process.env.HOME = home;
  process.env.USERPROFILE = home;
  const xdgBase = path.join(root, "xdg");
  process.env.XDG_CONFIG_HOME = xdgBase;
  try {
    fn({ home, legacy: path.join(home, ".omniroute"), xdg: path.join(xdgBase, "omniroute") });
  } finally {
    for (const key of Object.keys(process.env)) if (!(key in originalEnv)) delete process.env[key];
    for (const [key, value] of Object.entries(originalEnv)) process.env[key] = value;
    fs.rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

const touchDb = (dir: string) => {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "storage.sqlite"), "");
};

function expectAll(expected: string) {
  for (const [name, resolve] of resolvers) assert.equal(resolve(), expected, name);
}

const posix = process.platform !== "win32";

test("an XDG database is kept when an empty ~/.omniroute appears", { skip: !posix }, () => {
  withTempEnv(({ legacy, xdg }) => {
    touchDb(xdg);
    fs.mkdirSync(path.join(legacy, "mcp"), { recursive: true });
    expectAll(xdg);
  });
});

test("a legacy database still wins over an XDG dir that has none", { skip: !posix }, () => {
  withTempEnv(({ legacy, xdg }) => {
    touchDb(legacy);
    fs.mkdirSync(xdg, { recursive: true });
    expectAll(legacy);
  });
});

test("when both hold a database the legacy dir still wins (no silent switch)", () => {
  withTempEnv(({ legacy, xdg }) => {
    touchDb(legacy);
    touchDb(xdg);
    expectAll(legacy);
  });
});

test("with no database anywhere an existing legacy dir is still chosen", () => {
  withTempEnv(({ legacy }) => {
    fs.mkdirSync(legacy, { recursive: true });
    expectAll(legacy);
  });
});

test("the same rule holds for %APPDATA% on Windows", () => {
  withTempEnv(({ home, legacy }) => {
    const appData = path.join(home, "AppData", "Roaming");
    process.env.APPDATA = appData;
    touchDb(path.join(appData, "omniroute"));
    fs.mkdirSync(legacy, { recursive: true });
    const platform = Object.getOwnPropertyDescriptor(process, "platform")!;
    Object.defineProperty(process, "platform", { value: "win32" });
    try {
      expectAll(path.join(appData, "omniroute"));
    } finally {
      Object.defineProperty(process, "platform", platform);
    }
  });
});

// electron/main.js is CJS and needs the Electron runtime, so pin its contract at the source.
test("electron main.js resolveDataDir looks for the database before preferring the legacy dir", () => {
  const src = fs.readFileSync(path.join(process.cwd(), "electron/main.js"), "utf8");
  const start = src.indexOf("function resolveDataDir(overridePath, env = process.env) {");
  assert.notEqual(start, -1);
  const fn = src.slice(start, src.indexOf("\n}\n", start));
  assert.match(fn, /hasDatabase\(/);
});
