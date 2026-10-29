import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { runRosebud } from "../../open-sse/services/rosebud/cli.ts";

test("CLI commands for the same account are serialized across concurrent requests", async () => {
  const root = await mkdtemp(join(tmpdir(), "rosebud-cli-"));
  const script = join(root, "fake.mjs");
  const oldRoot = process.env.ROSEBUD_DATA_DIR,
    oldScript = process.env.ROSEBUD_CLI_SCRIPT;
  process.env.ROSEBUD_DATA_DIR = root;
  process.env.ROSEBUD_CLI_SCRIPT = script;
  await writeFile(
    script,
    `import fs from "node:fs"; import path from "node:path";
const lock = path.join(process.env.ROSEBUD_CREDENTIALS_DIR, "test.lock");
fs.closeSync(fs.openSync(lock, "wx"));
setTimeout(() => { fs.unlinkSync(lock); process.stdout.write(JSON.stringify({ok:true,args:process.argv.slice(2)})); }, 50);`
  );
  try {
    const result = await Promise.all([
      runRosebud("one", ["whoami"]),
      runRosebud("one", ["assets", "models"]),
    ]);
    assert.ok(result.every((row) => row.ok === true));
  } finally {
    if (oldRoot === undefined) delete process.env.ROSEBUD_DATA_DIR;
    else process.env.ROSEBUD_DATA_DIR = oldRoot;
    if (oldScript === undefined) delete process.env.ROSEBUD_CLI_SCRIPT;
    else process.env.ROSEBUD_CLI_SCRIPT = oldScript;
    await rm(root, { recursive: true, force: true });
  }
});

test("expired authorization and throttling keep their HTTP status without exposing CLI stderr", async () => {
  const root = await mkdtemp(join(tmpdir(), "rosebud-cli-errors-"));
  const script = join(root, "fake.mjs");
  const oldRoot = process.env.ROSEBUD_DATA_DIR,
    oldScript = process.env.ROSEBUD_CLI_SCRIPT;
  process.env.ROSEBUD_DATA_DIR = root;
  process.env.ROSEBUD_CLI_SCRIPT = script;
  await writeFile(
    script,
    `process.stderr.write(JSON.stringify({error:{code:process.argv[2],message:"private details"}})); process.exitCode=3;`
  );
  try {
    for (const [code, status] of [
      ["key_expired", 401],
      ["throttled", 429],
    ] as const) {
      await assert.rejects(runRosebud("one", [code]), (error: unknown) => {
        assert.equal((error as { status: number }).status, status);
        assert.ok(!(error as Error).message.includes("private details"));
        return true;
      });
    }
  } finally {
    if (oldRoot === undefined) delete process.env.ROSEBUD_DATA_DIR;
    else process.env.ROSEBUD_DATA_DIR = oldRoot;
    if (oldScript === undefined) delete process.env.ROSEBUD_CLI_SCRIPT;
    else process.env.ROSEBUD_CLI_SCRIPT = oldScript;
    await rm(root, { recursive: true, force: true });
  }
});
