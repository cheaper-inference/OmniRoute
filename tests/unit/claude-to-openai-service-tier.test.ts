import test from "node:test";
import assert from "node:assert/strict";

import { translateRequest } from "../../open-sse/translator/index.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { CodexExecutor } from "../../open-sse/executors/codex.ts";
import { withApiKeyCodexServiceMode } from "../../src/lib/providers/codexApiKeyServiceMode.ts";

// An Anthropic Messages client (/v1/messages) asking for a specific OpenAI
// service tier must reach the upstream with that tier: billing already reads it
// from the source body, so dropping it in the Claude → OpenAI pivot made the
// reported cost and the tier actually served diverge.

const claudeBody = (extra: Record<string, unknown> = {}) => ({
  model: "gpt-5.5",
  max_tokens: 1000,
  stream: true,
  messages: [{ role: "user", content: "hi" }],
  ...extra,
});

function toOpenAI(provider: string | null, extra: Record<string, unknown>) {
  return translateRequest(
    FORMATS.CLAUDE,
    FORMATS.OPENAI,
    "gpt-5.5",
    claudeBody(extra),
    true,
    null,
    provider
  ) as Record<string, unknown>;
}

test("Claude → Responses → Codex executor keeps a client priority tier", () => {
  const translated = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.OPENAI_RESPONSES,
    "gpt-5.5",
    claudeBody({ service_tier: "priority" }),
    true,
    null,
    "codex"
  );
  const body = new CodexExecutor().transformRequest("gpt-5.5", translated, true, {}) as Record<
    string,
    unknown
  >;
  assert.equal(body.service_tier, "priority");
});

test("Claude → OpenAI keeps an explicit valid tier for OpenAI-family targets", () => {
  assert.equal(toOpenAI("codex", { service_tier: "flex" }).service_tier, "flex");
  assert.equal(toOpenAI("openai", { service_tier: "priority" }).service_tier, "priority");
  assert.equal(toOpenAI("azure-openai", { service_tier: "auto" }).service_tier, "auto");
});

test("Claude → OpenAI maps Anthropic standard_only to default and fast to priority", () => {
  assert.equal(toOpenAI("openai", { service_tier: "standard_only" }).service_tier, "default");
  assert.equal(toOpenAI("codex", { service_tier: "fast" }).service_tier, "priority");
  assert.equal(toOpenAI("codex", { service_tier: " Priority " }).service_tier, "priority");
});

test("Claude → OpenAI drops an unknown tier", () => {
  const out = toOpenAI("codex", { service_tier: "bogus" });
  assert.equal(Object.hasOwn(out, "service_tier"), false);
});

test("Claude → OpenAI injects no tier when the client sent none", () => {
  const out = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.OPENAI_RESPONSES,
    "gpt-5.5",
    claudeBody(),
    true,
    null,
    "codex"
  ) as Record<string, unknown>;
  assert.equal(Object.hasOwn(out, "service_tier"), false);
  assert.equal(Object.hasOwn(toOpenAI("openai", {}), "service_tier"), false);
});

test("Claude → OpenAI does not forward service_tier to non-OpenAI-family targets", () => {
  // Strict OpenAI-compatible gateways reject unknown top-level fields.
  assert.equal(
    Object.hasOwn(toOpenAI("deepseek", { service_tier: "priority" }), "service_tier"),
    false
  );
  assert.equal(Object.hasOwn(toOpenAI(null, { service_tier: "priority" }), "service_tier"), false);
});

test("a Codex API-key service mode still wins over the client tier", () => {
  const translated = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.OPENAI_RESPONSES,
    "gpt-5.5",
    claudeBody({ service_tier: "priority" }),
    true,
    null,
    "codex"
  );
  const credentials = withApiKeyCodexServiceMode("codex", {}, "flex");
  const body = new CodexExecutor().transformRequest(
    "gpt-5.5",
    translated,
    true,
    credentials
  ) as Record<string, unknown>;
  assert.equal(body.service_tier, "flex");
});
