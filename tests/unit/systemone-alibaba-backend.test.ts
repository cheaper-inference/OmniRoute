/**
 * Alibaba DashScope decision models through POST /v1/systemone.
 *
 * `alibaba/decision-model` and `dashscope/decision-model-preview` resolve to the
 * DashScope OpenAI-compatible surface (`…/compatible-mode/v1/systemone`); the URL
 * is derived from the alibaba connection's base URL (the general
 * `dashscope.aliyuncs.com` host or a dedicated `ws-….maas.aliyuncs.com` business
 * space), falling back to the general host when none is configured.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { resolveSystemOneTarget } from "../../open-sse/config/systemOneRegistry.ts";
import { buildAlibabaSystemOneUrl } from "../../src/app/api/v1/_shared/systemOneAlibabaUrl.ts";

test("registry: alibaba/ and dashscope/ prefixes resolve to the alibaba backend", () => {
  assert.deepEqual(resolveSystemOneTarget("alibaba/decision-model"), {
    backend: "alibaba",
    provider: "alibaba",
    upstreamModel: "decision-model",
    upstreamUrl: "",
  });
  assert.deepEqual(resolveSystemOneTarget("dashscope/decision-model-preview"), {
    backend: "alibaba",
    provider: "alibaba",
    upstreamModel: "decision-model-preview",
    upstreamUrl: "",
  });
});

test("registry: unknown DashScope decision ids are refused, not proxied", () => {
  assert.equal(resolveSystemOneTarget("alibaba/unknown-model"), null);
  assert.equal(resolveSystemOneTarget("alibaba/"), null);
  assert.equal(resolveSystemOneTarget("alibaba/decision-model extra"), null);
  assert.equal(resolveSystemOneTarget("alibaba/../decision-model"), null);
});

test("registry: existing backends are untouched", () => {
  assert.equal(resolveSystemOneTarget("jev-latest")?.backend, "typesafe");
  assert.equal(resolveSystemOneTarget("openrouter/typesafe/jev-1.13")?.backend, "openrouter");
  assert.equal(resolveSystemOneTarget("ollama-local/qwen3:8b")?.backend, "ollama-local");
});

test("URL: general host, dedicated business space, and compatible-mode URLs normalize", () => {
  assert.equal(
    buildAlibabaSystemOneUrl(undefined),
    "https://dashscope.aliyuncs.com/compatible-mode/v1/systemone"
  );
  assert.equal(
    buildAlibabaSystemOneUrl("https://ws-x.cn-beijing.maas.aliyuncs.com"),
    "https://ws-x.cn-beijing.maas.aliyuncs.com/compatible-mode/v1/systemone"
  );
  assert.equal(
    buildAlibabaSystemOneUrl("https://dashscope.aliyuncs.com/compatible-mode/v1"),
    "https://dashscope.aliyuncs.com/compatible-mode/v1/systemone"
  );
  assert.equal(
    buildAlibabaSystemOneUrl(
      "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions?x=1#f"
    ),
    "https://dashscope.aliyuncs.com/compatible-mode/v1/systemone"
  );
});

test("URL: embedded credentials and cloud metadata are refused by the outbound guard", () => {
  assert.throws(
    () => buildAlibabaSystemOneUrl("https://user:pw@dashscope.aliyuncs.com/"),
    /credentials/
  );
  assert.throws(() => buildAlibabaSystemOneUrl("http://169.254.169.254/v1"));
});
