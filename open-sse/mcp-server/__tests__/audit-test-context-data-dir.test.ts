// The MCP audit resolves its own database path: DATA_DIR, else ~/.omniroute/storage.sqlite. It
// writes there whenever that file exists. A Vitest run without DATA_DIR therefore appended
// `omniroute_test_combo` rows to the developer's real database on every run (202 of them had
// piled up in one install). Two guards close that:
// - tests/_setup/vitestDataDir.ts gives every Vitest run a throwaway DATA_DIR;
// - in a test context with no DATA_DIR, the audit refuses the home database (the same rule
//   src/lib/dataPaths.ts applies to the main database, #10428), unless
//   OMNIROUTE_ALLOW_DEFAULT_DATA_DIR=1 opts back in.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

it("runs Vitest with a DATA_DIR outside the developer's ~/.omniroute", () => {
  const dataDir = process.env.DATA_DIR;
  expect(dataDir, "tests/_setup/vitestDataDir.ts must set DATA_DIR").toBeTruthy();
  expect(path.resolve(dataDir as string)).not.toBe(path.resolve(os.homedir(), ".omniroute"));
});

describe("MCP audit database path in a test context", () => {
  const saved = {
    DATA_DIR: process.env.DATA_DIR,
    OMNIROUTE_ALLOW_DEFAULT_DATA_DIR: process.env.OMNIROUTE_ALLOW_DEFAULT_DATA_DIR,
  };
  let fakeHome: string;
  let homeDb: string;

  beforeEach(() => {
    vi.resetModules();
    globalThis.__omnirouteMcpAuditDb = undefined;
    fakeHome = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-audit-home-"));
    fs.mkdirSync(path.join(fakeHome, ".omniroute"));
    homeDb = path.join(fakeHome, ".omniroute", "storage.sqlite");
    fs.writeFileSync(homeDb, "");
    // Vitest runs files in worker threads, where os.homedir() reads the real process environment
    // and ignores a changed process.env.HOME, so the home directory is mocked instead.
    vi.doMock("node:os", async (importOriginal) => {
      const actual = await importOriginal<typeof import("node:os")>();
      const homedir = () => fakeHome;
      return { ...actual, homedir, default: { ...actual, homedir } };
    });
    delete process.env.DATA_DIR;
    delete process.env.OMNIROUTE_ALLOW_DEFAULT_DATA_DIR;
  });

  afterEach(() => {
    for (const [key, value] of Object.entries(saved)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    globalThis.__omnirouteMcpAuditDb = undefined;
    vi.doUnmock("node:os");
    fs.rmSync(fakeHome, { recursive: true, force: true });
    vi.restoreAllMocks();
  });

  async function auditWithRecordingDriver() {
    const opened: string[] = [];
    class RecordingDatabase {
      open = true;
      constructor(file: string) {
        opened.push(file);
      }
      prepare() {
        return { run: () => ({ changes: 1 }), get: () => undefined, all: () => [] };
      }
      pragma() {}
      close() {
        this.open = false;
      }
    }
    const audit = await import("../audit.ts");
    audit.__setBetterSqliteLoaderForTests(() => RecordingDatabase);
    audit.__setAuditCallerIdResolverForTests(async () => undefined);
    return { audit, opened };
  }

  it("never opens the home database in a test context without DATA_DIR, even when it exists", async () => {
    const { audit, opened } = await auditWithRecordingDriver();
    try {
      await audit.logToolCall("omniroute_test_combo", { combo: "x" }, { ok: true }, 3, true);
      expect(opened).toEqual([]);
    } finally {
      audit.__setBetterSqliteLoaderForTests(null);
      audit.__setAuditCallerIdResolverForTests(null);
    }
  }, 30000);

  it("uses the home database only with OMNIROUTE_ALLOW_DEFAULT_DATA_DIR=1, like the main database", async () => {
    process.env.OMNIROUTE_ALLOW_DEFAULT_DATA_DIR = "1";
    const { audit, opened } = await auditWithRecordingDriver();
    try {
      await audit.logToolCall("omniroute_test_combo", { combo: "x" }, { ok: true }, 3, true);
      expect(opened).toEqual([homeDb]);
    } finally {
      audit.__setBetterSqliteLoaderForTests(null);
      audit.__setAuditCallerIdResolverForTests(null);
      audit.closeAuditDb();
    }
  }, 30000);
});
