import test from "node:test";
import assert from "node:assert/strict";

import {
  isProviderQuotaVisible,
  supportsProviderQuota,
} from "../../src/shared/utils/providerQuotaVisibility.ts";

test("provider quota visibility is opt-out so existing connections stay visible", () => {
  assert.equal(isProviderQuotaVisible({}), true);
  assert.equal(isProviderQuotaVisible({ quotaVisible: true }), true);
  assert.equal(isProviderQuotaVisible({ quotaVisible: false }), false);
});

test("quota visibility controls are limited to providers with quota support", () => {
  assert.equal(supportsProviderQuota("codex"), true);
  assert.equal(supportsProviderQuota("openai"), false);
});

test("supportsProviderQuota is true for moonshot-native shaped connection", () => {
  assert.equal(
    supportsProviderQuota("openai-compatible-chat-e2971611-bc02-4c37-8fc5-39b8e3906fdf", {
      providerSpecificData: { baseUrl: "https://api.moonshot.cn/v1" },
    }),
    true,
  );
  assert.equal(supportsProviderQuota("moonshot"), true);
  assert.equal(supportsProviderQuota("kimi"), true);
  assert.equal(supportsProviderQuota("openai"), false);
});

test("supportsProviderQuota is true for a SenseNova node, matched by console host", () => {
  const nodeId = "openai-compatible-chat-95565442-1b4b-4082-b428-9503ac8ca716";
  assert.equal(
    supportsProviderQuota(nodeId, {
      providerSpecificData: { baseUrl: "https://token.sensenova.cn/v1" },
    }),
    true,
  );
  assert.equal(supportsProviderQuota("sensenova"), true);

  // The gate compares the parsed hostname, so a lookalike suffix or a host
  // smuggled through userinfo must not pass.
  assert.equal(
    supportsProviderQuota(nodeId, {
      providerSpecificData: { baseUrl: "https://token.sensenova.cn.evil.example/v1" },
    }),
    false,
  );
  assert.equal(
    supportsProviderQuota(nodeId, {
      providerSpecificData: { baseUrl: "https://token.sensenova.cn@evil.example/v1" },
    }),
    false,
  );

  // A different OpenAI-compatible node with no quota endpoint stays hidden, and
  // a node with no base URL at all cannot be recognised.
  assert.equal(
    supportsProviderQuota("openai-compatible-chat-00000000-0000-0000-0000-000000000000", {
      providerSpecificData: { baseUrl: "https://api.example.com/v1" },
    }),
    false,
  );
  assert.equal(supportsProviderQuota(nodeId, { providerSpecificData: {} }), false);
  assert.equal(supportsProviderQuota(nodeId), false);
});
