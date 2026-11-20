import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-aihorde-queue-"));

import { handleAiHordeImageGeneration } from "../../open-sse/handlers/imageGeneration/providers/aihorde.ts";
import { aiHordeImageCatalog } from "../../open-sse/services/aihordeImageCatalog.ts";

/**
 * The Horde queue is known from the first response - you must refuse there and then.
 *
 * `/v2/generate/check` returns `wait_time` and `queue_position` at once. Bye
 * they were not read, a request for a model with a long queue polled Horde once every
 * for a second the entire budget fell due to a timeout, without explaining anything. Live check
 * 2026-08-30: model `Deliberate` (3 workers) responded with `wait_time: 1478,
 * queue_position: 321` - 25 minutes with a budget of 10. There was no point in waiting
 * even before the first survey, and the user found out about it ten minutes later.
 *
 * For comparison, `stable_diffusion` (10 workers) sent the image at the same moment
 * in 10.4 seconds - that is, the failure must be about this model and this queue, and
 * not about Horde at all, and should tell you what to do.
 */

const HORDE_JOB_ID = "queue-budget-job";

function stubHordeQueue({ waitTimeSeconds }: { waitTimeSeconds: number }) {
  const calls: string[] = [];
  globalThis.fetch = (async (input: string | URL, init?: RequestInit) => {
    const url = String(input);
    const method = (init?.method || "GET").toUpperCase();
    calls.push(`${method} ${url}`);

    if (url.endsWith("/v2/generate/async")) {
      return new Response(JSON.stringify({ id: HORDE_JOB_ID, kudos: 6 }), { status: 202 });
    }
    if (url.includes("/v2/generate/check/")) {
      return new Response(
        JSON.stringify({
          done: false,
          faulted: false,
          is_possible: true,
          waiting: 1,
          wait_time: waitTimeSeconds,
          queue_position: 321,
          eligible_workers: 3,
        }),
        { status: 200 }
      );
    }
    return new Response("{}", { status: 200 });
  }) as typeof fetch;
  return calls;
}

const originalFetch = globalThis.fetch;

test.beforeEach(() => {
  aiHordeImageCatalog.replace([
    { name: "Deliberate", count: 3, queued: 0, eta: 1478, performance: 1, jobs: 0 },
  ]);
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("refuses immediately when the queue cannot fit the remaining budget", async () => {
  const calls = stubHordeQueue({ waitTimeSeconds: 1478 });

  const started = Date.now();
  const result = await handleAiHordeImageGeneration({
    model: "Deliberate",
    provider: "aihorde",
    body: { model: "aihorde/Deliberate", prompt: "hello world" },
    credentials: { apiKey: "horde-key" },
    timeoutMs: 600_000,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 504);
  assert.match(String(result.error), /queue/i);
  assert.match(String(result.error), /1478|25/, "в отказе должно быть названо ожидание");

  assert.ok(
    Date.now() - started < 30_000,
    "отказ обязан прийти сразу, а не после выработки бюджета"
  );
  const checks = calls.filter((c) => c.includes("/v2/generate/check/"));
  assert.equal(checks.length, 1, "хватает одного опроса, чтобы узнать очередь");
});

test("keeps waiting when the queue fits the budget", async () => {
  // The wait is obviously included in the budget: 2 seconds of queue versus 6.
  const calls = stubHordeQueue({ waitTimeSeconds: 2 });

  const result = await handleAiHordeImageGeneration({
    model: "Deliberate",
    provider: "aihorde",
    body: { model: "aihorde/Deliberate", prompt: "hello world" },
    credentials: { apiKey: "horde-key" },
    timeoutMs: 6_000,
  });

  // The stub never responds with done, so the request goes to its own
  // timeout - it is important that it reached it and was not repulsed one by one.
  assert.equal(result.success, false);
  assert.ok(
    calls.filter((c) => c.includes("/v2/generate/check/")).length > 1,
    "короткая очередь не должна приводить к раннему отказу"
  );
});
