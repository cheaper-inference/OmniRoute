import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { rosebudPublish } from "../../open-sse/services/rosebud/publishing.ts";
import { RosebudError } from "../../open-sse/services/rosebud/cli.ts";

test("publishing refuses traversal and never repeats an uncertain first upload", async () => {
  const dir = await mkdtemp(join(tmpdir(), "rosebud-publish-"));
  const previous = process.env.ROSEBUD_DATA_DIR;
  process.env.ROSEBUD_DATA_DIR = dir;
  let calls = 0;
  const runner = async () => {
    calls++;
    throw new RosebudError("interrupted", 502, true);
  };
  try {
    const gameId = randomUUID();
    await assert.rejects(
      rosebudPublish("primary", "publish", { gameId, files: { "../private.json": "bad" } }, runner),
      /unsafe_game_path/
    );
    assert.equal(calls, 0);
    const game = { gameId, files: { "index.html": "<h1>Test</h1>" } };
    await assert.rejects(rosebudPublish("primary", "publish", game, runner), /interrupted/);
    await assert.rejects(rosebudPublish("primary", "publish", game, runner), /reconciliation/);
    assert.equal(calls, 1);
  } finally {
    if (previous === undefined) delete process.env.ROSEBUD_DATA_DIR;
    else process.env.ROSEBUD_DATA_DIR = previous;
    await rm(dir, { recursive: true, force: true });
  }
});
