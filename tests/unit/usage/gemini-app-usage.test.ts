import test from "node:test";
import assert from "node:assert/strict";

import { USAGE_FETCHER_PROVIDERS } from "../../../open-sse/services/usage/fetcherProviders.ts";
import { USAGE_SUPPORTED_PROVIDERS } from "../../../open-sse/services/usage/supportedProviders.ts";
import { getGeminiAppUsage } from "../../../open-sse/services/usage/geminiApp.ts";
import {
  decodeUsageInfo,
  quotaFailureCode,
  safeQuota,
} from "../../../open-sse/executors/gemini-app/quota.ts";
import { REGISTRY } from "../../../open-sse/config/providers/index.ts";
import { getProviderPluginManifestEntryFromRegistry } from "../../../open-sse/config/providerPluginManifest.ts";

const usageModule = await import("../../../open-sse/services/usage.ts");

/** Minimal `GetUsageInfo` response: root.3[0].2[0] with a 25% used float + label. */
function fixturePayload(): Buffer {
  const percent = Buffer.alloc(5);
  percent[0] = 0x15; // field 2, wire type 5 (fixed32)
  percent.writeFloatLE(0.25, 1);

  const labelBytes = Buffer.from("Gemini App requests", "utf8");
  const label = Buffer.concat([Buffer.from([0x1a, labelBytes.length]), labelBytes]); // field 3, wire 2
  const rowContent = Buffer.concat([percent, label]);
  const row = Buffer.concat([Buffer.from([0x12, rowContent.length]), rowContent]); // field 2, wire 2
  const groupContent = Buffer.concat([Buffer.from([0x08, 0x01]), row]); // groupType = 1
  const group = Buffer.concat([Buffer.from([0x1a, groupContent.length]), groupContent]); // field 3, wire 2
  return group;
}

test("gemini-app is registered for quota visibility and the background fetcher", () => {
  assert.ok(
    USAGE_SUPPORTED_PROVIDERS.includes("gemini-app"),
    "the dashboard must offer quota for gemini-app"
  );
  assert.ok(
    USAGE_FETCHER_PROVIDERS.includes("gemini-app"),
    "the generic quota refresher must fetch gemini-app"
  );
  assert.ok(
    USAGE_FETCHER_PROVIDERS.includes("gapp"),
    "the alias must resolve in the manifest's alias-aware capability check"
  );
});

test("plugin manifest advertises both usage capabilities for gemini-app", () => {
  const entry = getProviderPluginManifestEntryFromRegistry(REGISTRY, "gemini-app");
  assert.ok(entry, "gemini-app must resolve in the plugin manifest from the real registry");
  assert.ok(
    entry.capabilities.includes("usage-fetch"),
    "the manifest must advertise usage-fetch for the wired gemini-app fetcher"
  );
  assert.ok(
    entry.capabilities.includes("usage-supported"),
    "the manifest must advertise usage-supported for the canonical gemini-app id"
  );
  assert.ok(
    entry.capabilities.includes("oauth"),
    "gemini-app keeps its OAuth capability alongside usage"
  );
});

test("getUsageForProvider routes gemini-app and gapp without the unsupported branch", async () => {
  for (const provider of ["gemini-app", "gapp"]) {
    const result = await usageModule.getUsageForProvider({
      id: `gapp-${provider}`,
      provider,
      accessToken: "",
      providerSpecificData: {},
    });

    assert.ok(result && typeof result === "object");
    assert.notEqual(
      (result as { message?: string }).message,
      `Usage API not implemented for ${provider}`,
      `${provider} must reach the Gemini App usage leaf`
    );
    assert.equal(
      (result as { message?: string }).message,
      "Gemini App credential required for quota lookup",
      `${provider} should surface the sanitized leaf error for a missing token`
    );
  }
});

test("the Gemini App leaf maps verified GetUsageInfo rows to shared quotas", async () => {
  const payload = fixturePayload();
  const decoded = decodeUsageInfo(payload);
  assert.equal(decoded.usageRows.length, 1);
  assert.equal(decoded.usageRows[0]?.sourcePath, "getUsageInfo.3[0].2[0]");
  assert.equal(decoded.usageRows[0]?.providerPercent, 25);

  const result = await getGeminiAppUsage("fake-token", {}, async () => ({
    payload,
    observedAt: "2026-11-19T12:00:00.000Z",
    httpStatus: 200,
    grpcStatus: 0,
  }));

  assert.ok(!("message" in result), "a valid snapshot must not return an error message");
  const usage = result as {
    quotas: Record<string, { used: number; remainingPercentage: number; displayName: string }>;
  };
  const quota = usage.quotas["gemini-app-requests"];
  assert.ok(quota, "the verified row should become a quota keyed by its label");
  assert.equal(quota.used, 25);
  assert.equal(quota.remainingPercentage, 75);
  assert.equal(quota.displayName, "Gemini App requests");
});

test("quota normalization keeps unknown provenance unspecified and errors sanitized", () => {
  const untrusted = safeQuota({
    source: "unknown",
    status: "ok",
    usageRows: [{ label: "Guess", providerPercent: 50, sourcePath: "fabricated.path" }],
  });
  assert.equal(untrusted.usageRows[0]?.percentMeaning, "unspecified");
  assert.equal(untrusted.usageRows[0]?.sourcePath, null);

  assert.equal(quotaFailureCode({ code: "<script>" }), "QUOTA_REFRESH_FAILED");
  assert.equal(quotaFailureCode({ code: "QUOTA_AUTH_REJECTED" }), "QUOTA_AUTH_REJECTED");
});
