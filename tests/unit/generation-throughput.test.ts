import test from "node:test";
import assert from "node:assert/strict";
import {
  attachTokensPerSecond,
  generationDurationMs,
  MAX_PLAUSIBLE_TOKENS_PER_SECOND,
  MIN_GENERATION_WINDOW_MS,
  tokensPerSecond,
} from "../../open-sse/utils/generationThroughput.ts";
import { filterUsageForFormat } from "../../open-sse/utils/usageTracking.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { createStreamTiming } from "../../open-sse/utils/streamTiming.ts";
import {
  buildOmniRouteResponseMetaHeaders,
  buildOmniRouteSseMetadataComment,
} from "../../src/domain/omnirouteResponseMeta.ts";
import { OMNIROUTE_RESPONSE_HEADERS } from "../../src/shared/constants/headers.ts";

test("#12616 tok/s excludes TTFT (200 tokens over 2s generation after 3s TTFT)", () => {
  const generationMs = generationDurationMs(5000, 3000);
  assert.equal(generationMs, 2000);
  assert.equal(tokensPerSecond(200, generationMs), 100);
});

test("#12616 tok/s is omitted when TTFT is unknown (do not use tokens/total_latency)", () => {
  assert.equal(generationDurationMs(5000, null), null);
  assert.equal(tokensPerSecond(200, null), null);
  const usage = attachTokensPerSecond({ prompt_tokens: 10, completion_tokens: 200 }, null);
  assert.equal((usage as { tokens_per_second?: number }).tokens_per_second, undefined);
});

test("#12616 tok/s is omitted when generation duration is not positive", () => {
  assert.equal(generationDurationMs(3000, 3000), null);
  assert.equal(generationDurationMs(2000, 3000), null);
  assert.equal(tokensPerSecond(0, 2000), null);
});

test("#12616 filterUsageForFormat keeps tokens_per_second for OpenAI and Claude", () => {
  const usage = { prompt_tokens: 10, completion_tokens: 20, tokens_per_second: 42.5 };
  const openai = filterUsageForFormat(usage, FORMATS.OPENAI) as Record<string, unknown>;
  const claude = filterUsageForFormat(
    { input_tokens: 10, output_tokens: 20, tokens_per_second: 42.5 },
    FORMATS.CLAUDE
  ) as Record<string, unknown>;
  assert.equal(openai.tokens_per_second, 42.5);
  assert.equal(claude.tokens_per_second, 42.5);
});

test("#12616 headers omit tok/s without ttftMs and emit it when TTFT is known", () => {
  const without = buildOmniRouteResponseMetaHeaders({
    provider: "openai",
    model: "gpt-4o-mini",
    latencyMs: 5000,
    usage: { prompt_tokens: 11, completion_tokens: 200 },
  });
  assert.equal(without[OMNIROUTE_RESPONSE_HEADERS.tokensPerSecond], undefined);

  const withTtft = buildOmniRouteResponseMetaHeaders({
    provider: "openai",
    model: "gpt-4o-mini",
    latencyMs: 5000,
    ttftMs: 3000,
    usage: { prompt_tokens: 11, completion_tokens: 200 },
  });
  assert.equal(withTtft[OMNIROUTE_RESPONSE_HEADERS.tokensPerSecond], "100.000");
});

test("#12616 SSE comment carries tok/s from usage.tokens_per_second when TTFT is unknown", () => {
  const comment = buildOmniRouteSseMetadataComment({
    provider: "openai",
    model: "gpt-4o-mini",
    latencyMs: 50,
    usage: { prompt_tokens: 4, completion_tokens: 2, tokens_per_second: 12.5 },
  });
  assert.match(comment, /^: x-omniroute-tokens-per-second=12.500/m);
});

test("janela de geração menor que 250 ms não produz taxa", () => {
  assert.equal(MIN_GENERATION_WINDOW_MS, 250);
  assert.equal(tokensPerSecond(100, 249), null);
  assert.equal(tokensPerSecond(100, 250), 400);
  const usage = attachTokensPerSecond({ prompt_tokens: 1, completion_tokens: 100 }, 249);
  assert.equal("tokens_per_second" in usage, false);
});

test("taxa acima do teto plausível não é emitida", () => {
  assert.equal(MAX_PLAUSIBLE_TOKENS_PER_SECOND, 5000);
  assert.equal(tokensPerSecond(5000, 1000), 5000); // no teto: aceita
  assert.equal(tokensPerSecond(5001, 1000), null);
  assert.equal(tokensPerSecond(200_000, 1000), null);
});

test("cabeçalho omite tok/s quando o TTFT encosta na latência total", () => {
  const headers = buildOmniRouteResponseMetaHeaders({
    provider: "openai",
    model: "gpt-4o-mini",
    latencyMs: 5000,
    ttftMs: 4999,
    usage: { prompt_tokens: 11, completion_tokens: 200 },
  });
  assert.equal(headers[OMNIROUTE_RESPONSE_HEADERS.tokensPerSecond], undefined);
});

test("#12616 StreamTiming.withTps anexa tok/s numa janela mensurável e omite numa curta", () => {
  const measurable = createStreamTiming();
  measurable.startedAt = performance.now() - 2000;
  measurable.firstForwardAt = measurable.startedAt + 1000; // janela ≈ 1000 ms
  const tps = (
    measurable.withTps({ prompt_tokens: 1, completion_tokens: 100 }) as {
      tokens_per_second?: number;
    }
  ).tokens_per_second;
  assert.equal(typeof tps, "number");
  assert.ok(tps! > 90 && tps! <= 100, `got ${tps}`);

  const tooShort = createStreamTiming();
  tooShort.startedAt = performance.now() - 1010;
  tooShort.firstForwardAt = tooShort.startedAt + 1000; // janela ≈ 10 ms
  const usage = tooShort.withTps({ prompt_tokens: 1, completion_tokens: 100 });
  assert.equal("tokens_per_second" in usage, false);
});
