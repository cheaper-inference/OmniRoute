import assert from "node:assert/strict";
import { after, test } from "node:test";

const { fetchHuggingFaceLeaderboards, slugifyArenaDisplayName, HF_RETRY_CONFIG } =
  await import("../../src/lib/arenaEloHfSource.ts");
const { fetchArenaLeaderboards } = await import("../../src/lib/arenaEloSync.ts");

// Keep retry backoff instant so full-fallback tests do not burn the real window.
HF_RETRY_CONFIG.baseDelayMs = 0;
HF_RETRY_CONFIG.maxDelayMs = 0;

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

const categoryRow = (name: string, rating: number, i: number, category: string) => ({
  row: { ...row(name, rating, i).row, category },
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
  // 422 is non-retryable: exactly one attempt per endpoint, per category
  // (/filter + /rows fallback × overall + coding), no retries.
  assert.equal(bad, 4);
});

test("HF source retries 429 with backoff and falls back to /rows when /filter is exhausted", async () => {
  let filterCalls = 0;
  let rowsCalls = 0;
  globalThis.fetch = (async (input: string | URL | Request) => {
    const url = new URL(String(input));
    if (url.pathname.endsWith("/filter")) {
      filterCalls++;
      return new Response("", { status: 429 });
    }
    rowsCalls++;
    return json({
      rows: [
        categoryRow("Text Model", 1500, 1, "overall"),
        categoryRow("Code Model", 1400, 2, "coding"),
      ],
      num_rows_total: 2,
    });
  }) as typeof fetch;
  const boards = await fetchHuggingFaceLeaderboards();
  // /filter exhausted all attempts for both categories, then /rows served the data.
  assert.equal(filterCalls, 10); // 5 attempts × 2 categories
  assert.equal(rowsCalls, 2); // one /rows call per category
  assert.equal(boards.text.models.length, 1);
  assert.equal(boards.text.models[0].model, "text-model");
  assert.equal(boards.code.models.length, 1);
  assert.equal(boards.code.models[0].model, "code-model");
});

test("HF source does not call /rows when /filter succeeds", async () => {
  let rowsCalls = 0;
  globalThis.fetch = (async (input: string | URL | Request) => {
    const url = new URL(String(input));
    if (url.pathname.endsWith("/rows")) {
      rowsCalls++;
      return json({ rows: [], num_rows_total: 0 });
    }
    return json({ rows: [row("M", 1500, 1)], num_rows_total: 1 });
  }) as typeof fetch;
  const boards = await fetchHuggingFaceLeaderboards();
  assert.equal(rowsCalls, 0);
  assert.equal(boards.text.models.length, 1);
  assert.equal(boards.code.models.length, 1);
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
