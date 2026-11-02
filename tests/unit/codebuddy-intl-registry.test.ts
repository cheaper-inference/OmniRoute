// Phase C — registry regression guard.
//
// The curated codebuddy-intl list had drifted from the authoritative
// `GET /v3/config` catalog: models the gateway no longer serves were still
// offered, and newer ones were missing. These assertions pin the captured
// membership so the drift cannot silently return.
import test from "node:test";
import assert from "node:assert/strict";

import { codebuddy_intlProvider } from "../../open-sse/config/providers/registry/codebuddy-intl/index.ts";
import { CODEBUDDY_INTL_USER_AGENT } from "../../open-sse/config/providerHeaderProfiles.ts";

const modelIds = () => codebuddy_intlProvider.models.map((model) => model.id);

test("the registry advertises the CLI client, not the IDE", () => {
  const headers = codebuddy_intlProvider.headers as Record<string, string>;

  assert.equal(headers["User-Agent"], CODEBUDDY_INTL_USER_AGENT);
  assert.match(headers["User-Agent"], /^CLI\//);
  assert.equal(headers["X-IDE-Type"], "CLI");
  assert.equal(headers["X-IDE-Name"], "CLI");
  assert.equal(headers["X-IDE-Version"], "2.175.0");
});

test("every model captured in /v3/config is offered", () => {
  const captured = [
    "deepseek-v4.1-flash-sg",
    "gpt-6.1-sol",
    "gemini-3.8-flash",
    "minimax-m3.1-flash",
    "kimi-k3.1-pro",
    "kimi-k3.1-pro-highspeed",
    "grok-4.7",
  ];

  const ids = modelIds();
  for (const id of captured) {
    assert.equal(ids.includes(id), true, `missing captured model ${id}`);
  }
});

test("models the gateway no longer serves are not offered", () => {
  // The first five were retired before the 2026-10-26 live capture; the last
  // three disappeared from /v3/config by that capture and are gone now.
  const stale = [
    "kimi-k2.7",
    "kimi-k2.6",
    "glm-5.1",
    "glm-5v-turbo",
    "gpt-5.3-codex",
    "gemini-3.5-flash",
    "minimax-m3",
    "step-5-preview",
  ];

  const ids = modelIds();
  for (const id of stale) {
    assert.equal(ids.includes(id), false, `stale model still offered: ${id}`);
  }
});

test("model ids are unique and non-empty", () => {
  const ids = modelIds();
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) assert.match(id, /^[a-z0-9][a-z0-9.\-]*$/);
});

test("every model declares a display name and a context window", () => {
  for (const model of codebuddy_intlProvider.models) {
    assert.ok(model.name && model.name.length > 0, `no name for ${model.id}`);
    assert.equal(typeof model.contextLength, "number", `no contextLength for ${model.id}`);
    assert.ok((model.contextLength as number) > 0, `bad contextLength for ${model.id}`);
  }
});

test("reasoning-capable models declare a max output budget", () => {
  for (const model of codebuddy_intlProvider.models) {
    if (!model.supportsReasoning) continue;
    assert.equal(typeof model.maxOutputTokens, "number", `no maxOutputTokens for ${model.id}`);
  }
});

test("the provider declares forceStream, matching the CLI body", () => {
  // The gateway rejects a non-streaming upstream call (code 11101) and the CLI
  // body always sets `stream: true`, so `stream: false` clients still get SSE.
  // Without this flag chatCore buffers that SSE with `response.text()` and logs
  // it as unexpected, instead of draining it through the byte-capped reader.
  assert.equal(codebuddy_intlProvider.forceStream, true);
});
