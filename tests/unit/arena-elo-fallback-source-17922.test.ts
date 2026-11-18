import assert from "node:assert/strict";
import { after, test } from "node:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dataDir = mkdtempSync(join(tmpdir(), "arena-fallback-17922-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const core = await import("../../src/lib/db/core.ts");
core.resetDbInstance();
const {
  fetchArenaLeaderboards,
  transformToModelIntelligence,
  syncArenaElo,
  getArenaEloSyncStatus,
} = await import("../../src/lib/arenaEloSync.ts");

const originalFetch = globalThis.fetch;
after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true });
});

function hfRow(
  model_name: string,
  rating: number,
  vote_count: number,
  rank: number,
  category: string
) {
  return {
    row: {
      model_name,
      organization: "x",
      license: "Proprietary",
      rating,
      rating_lower: rating - 5,
      rating_upper: rating + 5,
      vote_count,
      rank,
      category,
      leaderboard_publish_date: "2026-10-22",
    },
  };
}

// Primary (api.wulong.dev) is empty since 2026-10-08 -> 404 for every name=;
// Hugging Face datasets-server (lmarena-ai/leaderboard-dataset) is healthy.
function mockUpstreams() {
  globalThis.fetch = (async (input: string | URL | Request) => {
    const url = String(input);
    if (url.includes("api.wulong.dev")) {
      return new Response(JSON.stringify({ error: "Leaderboard not found" }), {
        status: 404,
        statusText: "",
      });
    }
    if (url.includes("datasets-server.huggingface.co")) {
      const coding = decodeURIComponent(url).includes("coding");
      const rows = coding
        ? [hfRow("Claude Opus 5.5 (High)", 1544.9, 2314, 1, "coding")]
        : [
            hfRow("Gemini 4 Argon (High)", 1525.7, 10083, 1, "overall"),
            hfRow("Claude Opus 5.5 (High)", 1516.2, 9000, 2, "overall"),
          ];
      return new Response(JSON.stringify({ rows, num_rows_total: rows.length }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    throw new Error(`unexpected fetch ${url}`);
  }) as typeof fetch;
}

test("#17922: falls back to the Hugging Face arena dataset when the primary returns 404", async () => {
  mockUpstreams();
  const boards = await fetchArenaLeaderboards(); // today: throws "All Arena leaderboard fetches failed"
  assert.ok(boards.text?.models.length >= 2, "text board served from fallback");
  assert.ok(boards.code?.models.length >= 1, "code board served from fallback");
  const entries = transformToModelIntelligence(boards);
  assert.ok(entries.some((e) => e.model.includes("claude-opus-5.5") && e.category === "coding"));
});

test("#17922: failed sync is surfaced in GET status (lastError / lastFailedAt)", async () => {
  globalThis.fetch = (async () => new Response("", { status: 404 })) as typeof fetch;
  const result = await syncArenaElo();
  assert.equal(result.success, false);
  const status = getArenaEloSyncStatus() as Record<string, unknown>;
  assert.ok(status.lastError, "status exposes lastError");
  assert.ok(status.lastFailedAt, "status exposes lastFailedAt");
});
