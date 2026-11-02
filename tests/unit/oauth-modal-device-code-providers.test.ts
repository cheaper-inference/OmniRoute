import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { PROVIDERS } from "../../src/lib/oauth/providers/index";

// Regression guard for #17836 (same class of gap as #8882 / PR #8921): a provider whose OAuth
// module declares `flowType: "device_code"` but is missing from OAuthModal's DEVICE_CODE_PROVIDERS
// gets no Device Code tab. The modal then calls /authorize, receives `authUrl: null` and throws
// `errorBrowserUnavailable`.
//
// DEVICE_CODE_PROVIDERS is a module-private const inside a "use client" component, so importing it
// would drag React/next-intl into a node test. The Set literal is read from the source instead and
// compared against the real provider registry (no hardcoded copy of the provider list).
const here = dirname(fileURLToPath(import.meta.url));
const modalSource = readFileSync(
  resolve(here, "../..", "src/shared/components/OAuthModal.tsx"),
  "utf8"
);

function readDeviceCodeProviders(): Set<string> {
  const match = modalSource.match(/const DEVICE_CODE_PROVIDERS = new Set\(\[([\s\S]*?)\]\);/);
  assert.ok(match, "DEVICE_CODE_PROVIDERS Set literal not found in OAuthModal.tsx");
  const ids = [...match[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  return new Set(ids);
}

// Device-code providers that intentionally have no entry in DEVICE_CODE_PROVIDERS. Keep empty
// unless a provider genuinely drives its flow through another modal path (explain why here).
const EXEMPT_PROVIDERS = new Set<string>();

test("OAuthModal DEVICE_CODE_PROVIDERS literal is parseable and non-empty", () => {
  assert.ok(readDeviceCodeProviders().size > 0);
});

test("every OAuth provider with flowType device_code is listed in OAuthModal DEVICE_CODE_PROVIDERS", () => {
  const listed = readDeviceCodeProviders();
  const missing = Object.entries(PROVIDERS)
    .filter(([, provider]) => (provider as { flowType?: string }).flowType === "device_code")
    .map(([id]) => id)
    .filter((id) => !EXEMPT_PROVIDERS.has(id) && !listed.has(id));

  assert.deepEqual(
    missing,
    [],
    `device_code providers missing from OAuthModal DEVICE_CODE_PROVIDERS (no Device Code tab): ${missing.join(", ")}`
  );
});

test("workbuddy is a device_code provider and is listed in OAuthModal DEVICE_CODE_PROVIDERS (#17836)", () => {
  assert.equal((PROVIDERS.workbuddy as { flowType?: string }).flowType, "device_code");
  assert.ok(readDeviceCodeProviders().has("workbuddy"));
});

test("OAuthModal DEVICE_CODE_PROVIDERS has no stale ids absent from the provider registry", () => {
  const unknown = [...readDeviceCodeProviders()].filter((id) => !(id in PROVIDERS));
  assert.deepEqual(
    unknown,
    [],
    `unknown provider ids in DEVICE_CODE_PROVIDERS: ${unknown.join(", ")}`
  );
});
