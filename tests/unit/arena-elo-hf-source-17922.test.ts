import assert from "node:assert/strict";
import { after, test } from "node:test";

const { fetchHuggingFaceLeaderboards, slugifyArenaDisplayName } =
  await import("../../src/lib/arenaEloHfSource.ts");
const { fetchArenaLeaderboards } = await import("../../src/lib/arenaEloSync.ts");

const originalFetch = globalThis.fetch;
after(() => {
  globalThis.fetch = originalFetch;
});

const row = (name: string, rating: number, i: number) => ({
  row: {
    model_name: name,
    organization: "o",
    license: "l",
    rating,
    rating_lower: rating - 4,
    rating_upper: rating + 4,
    vote_count: 100,
    rank: i,
    leaderboard_publish_date: "2026-10-22",
  },
});
const json = (body: unknown) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

test("slugifyArenaDisplayName folds effort words and drops harness annotations", () => {
  assert.equal(slugifyArenaDisplayName("Claude Opus 5.5 (High)"), "claude-opus-5.5-high");
  assert.equal(slugifyArenaDisplayName("Claude Opus 4.6"), "claude-opus-4.6");
  assert.equal(slugifyArenaDisplayName("GPT-5.6 Sol (xhigh)"), "gpt-5.6-sol-xhigh");
  assert.equal(slugifyArenaDisplayName("X (codex-harness)"), "x");
});

test("HF source paginates until num_rows_total and maps fields", async () => {
  const offsets: string[] = [];
  globalThis.fetch = (async (input: string | URL | Request) => {
    const url = new URL(String(input));
    const offset = Number(url.searchParams.get("offset"));
    offsets.push(`${url.searchParams.get("where")}@${offset}`);
    const n = offset === 0 ? 100 : 5;
    return json({
      rows: Array.from({ length: n }, (_, i) => row(`M ${offset + i}`, 1500 - i, offset + i + 1)),
      num_rows_total: 105,
    });
  }) as typeof fetch;
  const boards = await fetchHuggingFaceLeaderboards();
  assert.equal(boards.text.models.length, 105);
  assert.equal(boards.code.models.length, 105);
  assert.equal(boards.text.models[0].ci, 4);
  assert.equal(boards.text.meta.dataset_date, "2026-10-22");
  assert.ok(offsets.some((o) => o.includes("coding") && o.endsWith("@100")));
});

test("HF source retries 5xx and fails on 422 without retry", async () => {
  let calls = 0;
  globalThis.fetch = (async () => {
    calls++;
    if (calls === 1) return new Response("", { status: 502 });
    return json({ rows: [row("A", 1500, 1)], num_rows_total: 1 });
  }) as typeof fetch;
  const boards = await fetchHuggingFaceLeaderboards();
  assert.equal(boards.text.models.length, 1);

  let bad = 0;
  globalThis.fetch = (async () => {
    bad++;
    return new Response("", { status: 422 });
  }) as typeof fetch;
  await assert.rejects(fetchHuggingFaceLeaderboards(), /Hugging Face fallback failed/);
  assert.equal(bad, 2); // one attempt per category, no retries
});

test("healthy primary never touches Hugging Face; both failing throws a combined error", async () => {
  const hosts: string[] = [];
  globalThis.fetch = (async (input: string | URL | Request) => {
    hosts.push(new URL(String(input)).host);
    return json({
      meta: { leaderboard: "x", model_count: 1 },
      models: [{ rank: 1, model: "m", vendor: "v", score: 1, ci: 1, votes: 1, license: "l" }],
    });
  }) as typeof fetch;
  await fetchArenaLeaderboards();
  assert.ok(hosts.every((h) => h === "api.wulong.dev"));

  globalThis.fetch = (async () => new Response("", { status: 404 })) as typeof fetch;
  await assert.rejects(
    fetchArenaLeaderboards(),
    /All Arena leaderboard fetches failed.*\|.*Hugging Face/s
  );
});
