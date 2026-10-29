import { test } from "node:test";
import assert from "node:assert/strict";

import { translateRequest } from "../../open-sse/translator/index.ts";
import "../../open-sse/translator/bootstrap.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { filterToOpenAIFormat } from "../../open-sse/translator/helpers/openaiHelper.ts";
import { resolvePreserveDeveloperRole } from "../../open-sse/services/roleNormalizer.ts";

// The role normalizer decides whether an OpenAI-format target keeps `developer`
// (provider allowlist + per-model compat toggle). The final OpenAI clean-up pass
// used to lower `developer` → `system` unconditionally, so that decision never
// reached the wire. These tests drive the real translateRequest pipeline.

function buildBody() {
  return {
    model: "gpt-5.5",
    messages: [
      { role: "developer", content: "Follow the house style." },
      { role: "user", content: "Hi" },
    ],
  };
}

function translate(
  provider: string,
  options?: { preserveDeveloperRole?: boolean },
  targetFormat: string = FORMATS.OPENAI
) {
  return translateRequest(
    FORMATS.OPENAI,
    targetFormat,
    "gpt-5.5",
    buildBody(),
    false,
    null,
    provider,
    null,
    options
  ) as { messages?: Array<{ role: string }>; system?: unknown };
}

test("OpenAI → OpenAI keeps developer for the official openai provider", () => {
  const out = translate("openai");
  assert.equal(out.messages?.[0].role, "developer");
  assert.equal(out.messages?.[1].role, "user");
});

test("azure-openai keeps developer by default", () => {
  const out = translate("azure-openai");
  assert.equal(out.messages?.[0].role, "developer");
});

test("explicit preserveDeveloperRole=true keeps developer for a custom compatible node", () => {
  const out = translate("openai-compatible-xyz", { preserveDeveloperRole: true });
  assert.equal(out.messages?.[0].role, "developer");
});

test("#2281 custom openai-compatible node lowers developer to system by default", () => {
  const out = translate("openai-compatible-xyz");
  assert.equal(out.messages?.[0].role, "system");
});

test("non-allowlisted OpenAI-format provider lowers developer to system by default", () => {
  const out = translate("deepseek");
  assert.equal(out.messages?.[0].role, "system");
});

test("explicit preserveDeveloperRole=false lowers developer for the openai provider", () => {
  const out = translate("openai", { preserveDeveloperRole: false });
  assert.equal(out.messages?.[0].role, "system");
});

test("Claude target still lifts developer instructions out of messages", () => {
  const out = translate("claude", undefined, FORMATS.CLAUDE);
  const roles = (out.messages ?? []).map((m) => m.role);
  assert.ok(!roles.includes("developer"));
  assert.ok(JSON.stringify(out.system ?? "").includes("Follow the house style."));
});

test("filterToOpenAIFormat keeps developer only when preserveDeveloperRole is set", () => {
  const kept = filterToOpenAIFormat(buildBody(), { preserveDeveloperRole: true });
  assert.equal(kept.messages[0].role, "developer");
  const lowered = filterToOpenAIFormat(buildBody(), { preserveDeveloperRole: false });
  assert.equal(lowered.messages[0].role, "system");
});

test("resolvePreserveDeveloperRole: explicit value wins, else strict provider default", () => {
  assert.equal(resolvePreserveDeveloperRole(true, "deepseek"), true);
  assert.equal(resolvePreserveDeveloperRole(false, "openai"), false);
  assert.equal(resolvePreserveDeveloperRole(undefined, "openai"), true);
  assert.equal(resolvePreserveDeveloperRole(undefined, "azure-openai-gov"), true);
  assert.equal(resolvePreserveDeveloperRole(undefined, "openai-compatible-xyz"), false);
  assert.equal(resolvePreserveDeveloperRole(undefined, "github"), false);
  assert.equal(resolvePreserveDeveloperRole(undefined, ""), false);
  assert.equal(resolvePreserveDeveloperRole(undefined, null), false);
});
