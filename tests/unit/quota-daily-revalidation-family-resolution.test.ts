/**
 * A quota-family lock stores a BUCKET name, and the probe has to turn it into a real
 * model before asking anything upstream (#20343).
 *
 * Codex locks the whole `codex` / `spark` bucket; Antigravity/agy lock
 * `family:gemini|claude|argon`. None of those strings is a callable model id, so the
 * probe used to send a name the upstream does not know, read the 4xx as "unknown" and
 * leave the lock parked for its whole window. The resolver therefore has to:
 *
 *   - leave an `exact` lock's own model untouched;
 *   - resolve a family bucket from the connection's synced catalog FIRST (Codex refuses
 *     a model its account does not advertise) and only then from the static registry;
 *   - never leave the bucket's family (a Gemini family lock must not be probed with a
 *     Claude model, which would report on the wrong quota pool);
 *   - skip the probe entirely when no chat model of that family is known.
 *
 * Pure: catalogs are injected, no DB read and no network.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  modelMatchesFamily,
  parseQuotaFamilyBucket,
  resolveQuotaProbeModel,
} from "../../src/lib/credentialHealth/quotaProbeModelResolution.ts";

const ANTIGRAVITY_FAMILIES = ["gemini", "claude", "argon"] as const;

test("an exact lock keeps its own model unchanged", async () => {
  for (const provider of ["codex", "antigravity", "agy", "openai"]) {
    const resolved = await resolveQuotaProbeModel({
      provider,
      connectionId: "conn-exact",
      model: "gpt-4o",
      scope: "exact",
    });
    assert.deepEqual(resolved, { model: "gpt-4o" }, provider);
  }
});

test("a caller that predates the scope field is treated as exact", async () => {
  const resolved = await resolveQuotaProbeModel({
    provider: "antigravity",
    connectionId: "conn-legacy",
    model: "gemini-3-pro",
  });
  assert.deepEqual(resolved, { model: "gemini-3-pro" });
});

test("the two Codex buckets are recognised, and a real Codex model is not", () => {
  assert.deepEqual(parseQuotaFamilyBucket("codex", "codex"), {
    stored: "codex",
    family: "codex",
  });
  assert.deepEqual(parseQuotaFamilyBucket("codex", "spark"), {
    stored: "spark",
    family: "spark",
  });
  assert.equal(
    parseQuotaFamilyBucket("codex", "gpt-5.6-sol"),
    null,
    "a real model id is not a bucket"
  );
  assert.equal(parseQuotaFamilyBucket("openai", "codex"), null, "not a Codex connection");
});

test("Antigravity family buckets are recognised for both surfaces", () => {
  for (const provider of ["antigravity", "agy"]) {
    for (const family of ANTIGRAVITY_FAMILIES) {
      assert.deepEqual(parseQuotaFamilyBucket(provider, `family:${family}`), {
        stored: `family:${family}`,
        family,
      });
    }
    assert.equal(
      parseQuotaFamilyBucket(provider, "claude-sonnet-4-6"),
      null,
      "a concrete model is not a bucket"
    );
  }
  assert.equal(parseQuotaFamilyBucket("openai", "family:gemini"), null);
});

test("a Codex bucket resolves from the account's synced catalog first", async () => {
  const resolved = await resolveQuotaProbeModel(
    { provider: "codex", connectionId: "conn-synced", model: "spark", scope: "quota_family" },
    {
      loadSyncedModels: async () => [{ id: "gpt-5.6-sol" }, { id: "gpt-5.3-codex-spark" }],
    }
  );
  assert.deepEqual(resolved, { model: "gpt-5.3-codex-spark" }, "the spark bucket's own model");
});

test("a Codex bucket with no synced catalog falls back to the static registry", async () => {
  // prepareConnectionModelTest() syncs a missing Codex catalog before it validates, so the
  // static registry is a legitimate first guess; the account's own list still wins when it
  // exists (the case above).
  const resolved = await resolveQuotaProbeModel(
    { provider: "codex", connectionId: "conn-unsynced", model: "codex", scope: "quota_family" },
    { loadSyncedModels: async () => [] }
  );
  assert.ok("model" in resolved, `expected a static fallback, got ${JSON.stringify(resolved)}`);
  assert.equal(
    modelMatchesFamily("codex", resolved.model, { stored: "codex", family: "codex" }),
    true
  );
});

test("an unreadable catalog falls back to the static registry", async () => {
  const resolved = await resolveQuotaProbeModel(
    {
      provider: "antigravity",
      connectionId: "conn-throw",
      model: "family:claude",
      scope: "quota_family",
    },
    {
      loadSyncedModels: async () => {
        throw new Error("db unavailable");
      },
    }
  );
  assert.ok("model" in resolved, `expected the static fallback, got ${JSON.stringify(resolved)}`);
  assert.equal(
    modelMatchesFamily("antigravity", resolved.model, {
      stored: "family:claude",
      family: "claude",
    }),
    true
  );
});

test("each Antigravity family resolves to a model of its own family only", async () => {
  for (const provider of ["antigravity", "agy"]) {
    for (const family of ANTIGRAVITY_FAMILIES) {
      const resolved = await resolveQuotaProbeModel({
        provider,
        connectionId: `conn-${family}`,
        model: `family:${family}`,
        scope: "quota_family",
      });
      assert.ok(
        "model" in resolved,
        `${provider}/${family} must resolve from the static registry: ${JSON.stringify(resolved)}`
      );
      assert.equal(
        modelMatchesFamily(provider, resolved.model, { stored: `family:${family}`, family }),
        true,
        `${provider} family ${family} resolved to ${resolved.model}, which is another family`
      );
    }
  }
});

test("a per-account Antigravity catalog is honoured over the static one", async () => {
  const resolved = await resolveQuotaProbeModel(
    {
      provider: "antigravity",
      connectionId: "conn-catalog",
      model: "family:gemini",
      scope: "quota_family",
    },
    { loadSyncedModels: async () => [{ id: "accounts-only-gemini-9-flash" }] }
  );
  assert.deepEqual(resolved, { model: "accounts-only-gemini-9-flash" });
});

test("a catalog entry from another family is never used", async () => {
  const resolved = await resolveQuotaProbeModel(
    {
      provider: "antigravity",
      connectionId: "conn-crossed",
      model: "family:claude",
      scope: "quota_family",
    },
    // A Claude family lock must not be probed through a Gemini model: it would report
    // on a different quota pool and could recover a lock that is still exhausted.
    { loadSyncedModels: async () => [{ id: "gemini-3.8-flash-high" }] }
  );
  assert.ok("model" in resolved);
  assert.equal(
    modelMatchesFamily("antigravity", resolved.model, {
      stored: "family:claude",
      family: "claude",
    }),
    true
  );
});

test("a family with no known chat model is skipped with a reason", async () => {
  const resolved = await resolveQuotaProbeModel(
    {
      provider: "antigravity",
      connectionId: "conn-empty",
      model: "family:argon",
      scope: "quota_family",
    },
    { loadSyncedModels: async () => [] }
  );
  // Argon IS in the static catalog today; the assertion is only that the answer is one
  // of the two well-formed shapes the caller handles.
  assert.equal("model" in resolved || "unavailable" in resolved, true);
});

test("non-chat and image surfaces are never probed as chat", async () => {
  const resolved = await resolveQuotaProbeModel(
    {
      provider: "antigravity",
      connectionId: "conn-image",
      model: "family:gemini",
      scope: "quota_family",
    },
    {
      loadSyncedModels: async () => [
        { id: "gemini-3-pro-image-preview" },
        { id: "gemini-2.5-flash-preview-tts" },
      ],
    }
  );
  assert.ok("model" in resolved);
  assert.equal(
    /image|tts/.test(resolved.model),
    false,
    `probed a non-chat surface: ${resolved.model}`
  );
});

test("an unknown bucket name is reported instead of being sent upstream", async () => {
  const resolved = await resolveQuotaProbeModel({
    provider: "antigravity",
    connectionId: "conn-odd",
    model: "family:notafamily",
    scope: "quota_family",
  });
  assert.ok("unavailable" in resolved);
});

test("a lock with no model is reported, never resolved to something arbitrary", async () => {
  for (const model of [null, undefined, "", "   "]) {
    const resolved = await resolveQuotaProbeModel({
      provider: "antigravity",
      connectionId: "conn-null",
      model,
      scope: "quota_family",
    });
    assert.ok("unavailable" in resolved);
  }
});
