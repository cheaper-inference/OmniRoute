import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, readFileSync, readdirSync, existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

async function withTmpDataDir(fn: (dataDir: string) => Promise<void>) {
  const dataDir = mkdtempSync(join(tmpdir(), "omniroute-backup-20494-"));
  const orig = process.env.DATA_DIR;
  process.env.DATA_DIR = dataDir;
  try {
    await fn(dataDir);
  } finally {
    if (orig === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = orig;
    rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

function encFiles(dataDir: string): string[] {
  const backupsDir = join(dataDir, "backups");
  if (!existsSync(backupsDir)) return [];
  return readdirSync(backupsDir).flatMap((d) =>
    readdirSync(join(backupsDir, d)).filter((f) => f.endsWith(".enc"))
  );
}

async function quiet<T>(fn: () => Promise<T>): Promise<T> {
  const o = { log: console.log, error: console.error, warn: console.warn };
  console.log = console.error = console.warn = () => {};
  try {
    return await fn();
  } finally {
    Object.assign(console, o);
  }
}

test("#20494 enable --encrypt with --key-file: tick produces .enc backup", async () => {
  await withTmpDataDir(async (dataDir) => {
    writeFileSync(join(dataDir, "settings.json"), "{}\n");
    const keyFile = join(dataDir, "pass.key");
    writeFileSync(keyFile, "s3cret-pass\n");
    const { runBackupAutoEnableCommand } = await import("../../bin/cli/commands/backup.mjs");
    const code = await quiet(() =>
      runBackupAutoEnableCommand({ cron: "* * * * *", encrypt: true, keyFile })
    );
    assert.equal(code, 0);
    const schedule = JSON.parse(readFileSync(join(dataDir, "backup-schedule.json"), "utf8"));
    assert.equal(schedule.keyFile, keyFile);
    assert.ok(!JSON.stringify(schedule).includes("s3cret-pass"), "passphrase must not be stored");

    const { runBackupScheduleTick } = await import("@/lib/jobs/backupScheduleJob");
    const ran = await quiet(() => runBackupScheduleTick(new Date(2026, 10, 18, 3, 0, 0)));
    assert.equal(ran, true);
    assert.ok(encFiles(dataDir).length > 0, "expected a .enc artifact after the tick");
  });
});

test("#20494 enable --encrypt without --key-file is rejected", async () => {
  await withTmpDataDir(async (dataDir) => {
    const { runBackupAutoEnableCommand } = await import("../../bin/cli/commands/backup.mjs");
    const code = await quiet(() =>
      runBackupAutoEnableCommand({ cron: "* * * * *", encrypt: true })
    );
    assert.equal(code, 1);
    assert.equal(existsSync(join(dataDir, "backup-schedule.json")), false);
  });
});

test("#20494 enable --encrypt with unreadable/empty key file is rejected", async () => {
  await withTmpDataDir(async (dataDir) => {
    const { runBackupAutoEnableCommand } = await import("../../bin/cli/commands/backup.mjs");
    const empty = join(dataDir, "empty.key");
    writeFileSync(empty, "\n");
    for (const keyFile of [join(dataDir, "missing.key"), empty]) {
      const code = await quiet(() => runBackupAutoEnableCommand({ encrypt: true, keyFile }));
      assert.equal(code, 1);
    }
  });
});

test("#20494 tick with key file that became unreadable does not throw and writes nothing", async () => {
  await withTmpDataDir(async (dataDir) => {
    writeFileSync(join(dataDir, "settings.json"), "{}\n");
    writeFileSync(
      join(dataDir, "backup-schedule.json"),
      JSON.stringify({
        enabled: true,
        cron: "* * * * *",
        encrypt: true,
        keyFile: join(dataDir, "gone.key"),
      })
    );
    const { runBackupScheduleTick } = await import("@/lib/jobs/backupScheduleJob");
    await quiet(() => runBackupScheduleTick(new Date(2026, 10, 18, 3, 0, 0)));
    assert.equal(encFiles(dataDir).length, 0);
  });
});

test("#20494 tick with encrypt but no keyFile skips instead of hanging", async () => {
  await withTmpDataDir(async (dataDir) => {
    writeFileSync(
      join(dataDir, "backup-schedule.json"),
      JSON.stringify({ enabled: true, cron: "* * * * *", encrypt: true })
    );
    const { runBackupScheduleTick } = await import("@/lib/jobs/backupScheduleJob");
    const ran = await quiet(() => runBackupScheduleTick(new Date(2026, 10, 18, 3, 0, 0)));
    assert.equal(ran, false);
  });
});
