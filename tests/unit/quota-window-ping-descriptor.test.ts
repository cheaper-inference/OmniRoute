/**
 * Descriptor registry + pure eligibility logic for quota window ping targets.
 *
 * Everything here is data or pure logic: deps and the clock are injected, so no
 * real DB, network or timers are exercised. DATA_DIR is still pointed at a
 * throwaway tmpdir before importing the service module because it re-exports
 * normalizeResetKey from quotaAutoPing, which imports the DB layer.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { QuotaWindowDescriptor } from "../../src/shared/types/quotaWindowPing.ts";

process.env.DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-quota-window-ping-descriptor-")
);

const {
  QUOTA_WINDOW_PING_DESCRIPTORS,
  getQuotaWindowDescriptor,
  listQuotaWindowDescriptors,
  isTargetableDescriptor,
  isQuotaWindowPingEnabled,
} = await import("../../src/shared/constants/quotaWindowPing.ts");
const { evaluateDescriptorEligibility, evaluateTargetEligibility, selectPingModelCandidates } =
  await import("../../src/lib/services/quotaWindowPing.ts");

const NOW_MS = Date.parse("2026-01-01T12:00:00.000Z");
const now = () => NOW_MS;

const codexSession = getQuotaWindowDescriptor("codex:session");
if (!codexSession) throw new Error("codex:session descriptor missing from the registry");

function makeDescriptor(overrides: Partial<QuotaWindowDescriptor>): QuotaWindowDescriptor {
  return { ...codexSession, ...overrides };
}

function eligibilityDeps(
  connection: Record<string, unknown> | null,
  targets: Array<Record<string, unknown>> = []
) {
  return {
    getProviderConnectionById: async () => connection,
    store: { listWindowPingTargets: () => targets },
  } as unknown as Parameters<typeof evaluateTargetEligibility>[1];
}

test("registry ids are unique and the five descriptors are registered", () => {
  const ids = QUOTA_WINDOW_PING_DESCRIPTORS.map((descriptor) => descriptor.id);
  assert.deepEqual(ids, [
    "codex:session",
    "codex:weekly",
    "claude:session",
    "claude:weekly",
    "claude:weekly-scoped",
  ]);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) {
    assert.equal(getQuotaWindowDescriptor(id)?.id, id);
  }
  assert.deepEqual(listQuotaWindowDescriptors(), QUOTA_WINDOW_PING_DESCRIPTORS);
  assert.equal(listQuotaWindowDescriptors("codex").length, 2);
  assert.equal(listQuotaWindowDescriptors("claude").length, 3);
});

test("codex defaults to scheduled, claude to manual with schedules allowed", () => {
  assert.equal(getQuotaWindowDescriptor("codex:session")?.policy, "scheduled");
  assert.equal(getQuotaWindowDescriptor("codex:session")?.scheduledAllowed, true);
  assert.equal(getQuotaWindowDescriptor("codex:weekly")?.policy, "scheduled");
  assert.equal(getQuotaWindowDescriptor("codex:weekly")?.scheduledAllowed, true);

  assert.equal(getQuotaWindowDescriptor("claude:session")?.policy, "manual");
  assert.equal(getQuotaWindowDescriptor("claude:session")?.scheduledAllowed, true);
  assert.equal(getQuotaWindowDescriptor("claude:weekly")?.policy, "manual");
  assert.equal(getQuotaWindowDescriptor("claude:weekly")?.scheduledAllowed, true);

  assert.equal(getQuotaWindowDescriptor("claude:weekly-scoped")?.policy, "excluded");
  assert.equal(getQuotaWindowDescriptor("claude:weekly-scoped")?.scheduledAllowed, false);
});

test("durations, window ids and ping body knobs match the descriptor table", () => {
  const codex = {
    session: getQuotaWindowDescriptor("codex:session"),
    weekly: getQuotaWindowDescriptor("codex:weekly"),
  };
  assert.equal(codex.session?.windowId, "session");
  assert.equal(codex.session?.durationSeconds, 18000);
  assert.equal(codex.weekly?.windowId, "weekly");
  assert.equal(codex.weekly?.durationSeconds, 604800);
  for (const descriptor of Object.values(codex)) {
    assert.equal(descriptor?.kind, "first-use");
    assert.equal(descriptor?.scope, "connection");
    assert.equal(descriptor?.model, null);
    assert.equal(descriptor?.modelFamily, null);
    assert.equal(descriptor?.pingText, "hi");
    assert.equal(descriptor?.pingInstructions, "Reply with OK.");
    assert.equal(descriptor?.pingReasoningEffort, "none");
    assert.equal(descriptor?.pingMaxTokens, null);
  }

  const claude = {
    session: getQuotaWindowDescriptor("claude:session"),
    weekly: getQuotaWindowDescriptor("claude:weekly"),
    scoped: getQuotaWindowDescriptor("claude:weekly-scoped"),
  };
  assert.equal(claude.session?.windowId, "session (5h)");
  assert.equal(claude.session?.durationSeconds, 18000);
  assert.equal(claude.weekly?.windowId, "weekly (7d)");
  assert.equal(claude.weekly?.durationSeconds, 604800);
  assert.equal(claude.scoped?.windowId, "weekly <model> (7d)");
  assert.equal(claude.scoped?.scope, "model");
  assert.equal(claude.scoped?.resetAtSource, "upstream-per-model");
  assert.equal(claude.scoped?.globalResetAt, false);
  for (const descriptor of Object.values(claude)) {
    assert.equal(descriptor?.kind, "first-use");
    assert.equal(descriptor?.pingText, "hi");
    assert.equal(descriptor?.pingInstructions, null);
    assert.equal(descriptor?.pingReasoningEffort, null);
    assert.equal(descriptor?.pingMaxTokens, 1);
  }
});

test("longerWindow links resolve and only session windows carry one", () => {
  const links = [
    ["codex:session", "codex:weekly", "weekly"],
    ["claude:session", "claude:weekly", "weekly (7d)"],
  ] as const;
  for (const [id, linkedId, linkedWindowId] of links) {
    const link = getQuotaWindowDescriptor(id)?.longerWindow;
    assert.equal(link?.descriptorId, linkedId);
    assert.equal(link?.windowId, linkedWindowId);
    assert.equal(getQuotaWindowDescriptor(linkedId)?.windowId, linkedWindowId);
  }
  for (const id of ["codex:weekly", "claude:weekly", "claude:weekly-scoped"]) {
    assert.equal(getQuotaWindowDescriptor(id)?.longerWindow, null);
  }
});

test("the four first-use descriptors are targetable; the excluded one is not", () => {
  const targetable = QUOTA_WINDOW_PING_DESCRIPTORS.filter(isTargetableDescriptor).map((d) => d.id);
  assert.deepEqual(targetable, [
    "codex:session",
    "codex:weekly",
    "claude:session",
    "claude:weekly",
  ]);
  for (const descriptor of QUOTA_WINDOW_PING_DESCRIPTORS.filter(isTargetableDescriptor)) {
    assert.equal(descriptor.kind, "first-use");
    assert.equal(descriptor.globalResetAt, true);
    assert.equal(typeof descriptor.durationSeconds, "number");
    assert.notEqual(descriptor.policy, "excluded");
  }
  assert.equal(isTargetableDescriptor(getQuotaWindowDescriptor("claude:weekly-scoped")!), false);
});

test("sliding, fixed-calendar and token-bucket windows are ineligible with a machine reason", () => {
  for (const kind of ["sliding", "fixed-calendar", "token-bucket"] as const) {
    const descriptor = makeDescriptor({ id: `fixture:${kind}`, kind });
    assert.equal(isTargetableDescriptor(descriptor), false);
    assert.deepEqual(evaluateDescriptorEligibility(descriptor), {
      eligible: false,
      reason: "descriptor_not_targetable",
    });
  }

  const noGlobalReset = makeDescriptor({ id: "fixture:no-global-reset", globalResetAt: false });
  assert.equal(isTargetableDescriptor(noGlobalReset), false);
  assert.deepEqual(evaluateDescriptorEligibility(noGlobalReset), {
    eligible: false,
    reason: "descriptor_not_targetable",
  });
});

test("policy excluded is never eligible and reports descriptor_excluded", () => {
  assert.deepEqual(
    evaluateDescriptorEligibility(getQuotaWindowDescriptor("claude:weekly-scoped")),
    {
      eligible: false,
      reason: "descriptor_excluded",
    }
  );

  const excludedFixture = makeDescriptor({ id: "fixture:excluded", policy: "excluded" });
  assert.equal(isTargetableDescriptor(excludedFixture), false);
  assert.deepEqual(evaluateDescriptorEligibility(excludedFixture), {
    eligible: false,
    reason: "descriptor_excluded",
  });

  assert.deepEqual(evaluateDescriptorEligibility(undefined), {
    eligible: false,
    reason: "descriptor_unknown",
  });
});

test("a first-use descriptor with a global reset horizon is eligible with no reason", () => {
  const descriptor = makeDescriptor({ id: "fixture:first-use" });
  assert.equal(isTargetableDescriptor(descriptor), true);
  assert.deepEqual(evaluateDescriptorEligibility(descriptor), { eligible: true, reason: null });
  assert.deepEqual(evaluateDescriptorEligibility(codexSession), { eligible: true, reason: null });
});

test("no antigravity, google or other telemetry-only provider has a registry entry", () => {
  const telemetryOnly = [
    "antigravity",
    "agy",
    "google",
    "glm",
    "glm-cn",
    "zai",
    "glmt",
    "kimi-coding",
    "minimax",
    "command-code",
    "openrouter",
    "vertex",
  ];
  for (const provider of telemetryOnly) {
    assert.deepEqual(listQuotaWindowDescriptors(provider), []);
    assert.equal(
      QUOTA_WINDOW_PING_DESCRIPTORS.some(
        (descriptor) => descriptor.provider === provider && isTargetableDescriptor(descriptor)
      ),
      false
    );
  }
  for (const provider of ["antigravity", "agy", "google"]) {
    assert.equal(getQuotaWindowDescriptor(`${provider}:session`), undefined);
  }
});

test("isQuotaWindowPingEnabled reads exactly quotaWindowPing.enabled === true", () => {
  assert.equal(isQuotaWindowPingEnabled({}), false);
  assert.equal(isQuotaWindowPingEnabled({ quotaWindowPing: null }), false);
  assert.equal(isQuotaWindowPingEnabled({ quotaWindowPing: [] }), false);
  assert.equal(isQuotaWindowPingEnabled({ quotaWindowPing: { enabled: false } }), false);
  assert.equal(isQuotaWindowPingEnabled({ quotaWindowPing: { enabled: "true" } }), false);
  assert.equal(isQuotaWindowPingEnabled({ quotaWindowPing: { enabled: true } }), true);
});

test("model scope selects only the exact model", () => {
  const descriptor = makeDescriptor({
    id: "fixture:model",
    provider: "claude",
    scope: "model",
    model: "claude-opus-4-5",
  });
  const catalog = ["claude-sonnet-4-5", "claude-opus-4-5", "claude-haiku-4-5"];
  assert.deepEqual(selectPingModelCandidates(descriptor, catalog, { asOfMs: NOW_MS }), [
    "claude-opus-4-5",
  ]);

  // An out-of-scope pin never wins, and a catalog without the exact model yields nothing.
  assert.deepEqual(
    selectPingModelCandidates(descriptor, catalog, {
      overrideModel: "claude-sonnet-4-5",
      asOfMs: NOW_MS,
    }),
    ["claude-opus-4-5"]
  );
  assert.deepEqual(
    selectPingModelCandidates(descriptor, ["claude-sonnet-4-5"], {
      overrideModel: "claude-sonnet-4-5",
      asOfMs: NOW_MS,
    }),
    []
  );
  assert.deepEqual(
    selectPingModelCandidates(
      makeDescriptor({ id: "fixture:model-null", scope: "model" }),
      catalog
    ),
    []
  );
});

test("family scope selects only that family, in the descriptor order", () => {
  const descriptor = makeDescriptor({
    id: "fixture:family",
    provider: "claude",
    scope: "family",
    modelFamily: "opus",
    pingModelCandidates: ["claude-opus-4-1"],
  });
  const catalog = ["claude-sonnet-4-5", "claude-opus-4-5", "claude-opus-4-1", "claude-haiku-4-5"];
  assert.deepEqual(selectPingModelCandidates(descriptor, catalog, { asOfMs: NOW_MS }), [
    "claude-opus-4-1",
    "claude-opus-4-5",
  ]);
  assert.deepEqual(
    selectPingModelCandidates(descriptor, catalog, {
      overrideModel: "claude-opus-4-5",
      asOfMs: NOW_MS,
    }),
    ["claude-opus-4-5", "claude-opus-4-1"]
  );

  // Empty family: nothing in the catalog matches, and a missing family selects nothing.
  const haikuDescriptor = makeDescriptor({
    id: "fixture:family-haiku",
    provider: "claude",
    scope: "family",
    modelFamily: "haiku",
  });
  assert.deepEqual(
    selectPingModelCandidates(haikuDescriptor, ["claude-sonnet-4-5", "claude-opus-4-5"], {
      asOfMs: NOW_MS,
    }),
    []
  );
  assert.deepEqual(
    selectPingModelCandidates(makeDescriptor({ id: "fixture:family-null", scope: "family" }), [
      "claude-opus-4-5",
    ]),
    []
  );
});

test("codex reasoning-suffix variants are skipped in every candidate source", () => {
  assert.deepEqual(
    selectPingModelCandidates(codexSession, ["gpt-6-sol-low", "gpt-6-sol"], {
      asOfMs: NOW_MS,
    }),
    ["gpt-6-sol"]
  );
  const pinned = makeDescriptor({ id: "fixture:suffix", pingModelCandidates: ["gpt-6-sol-low"] });
  assert.deepEqual(
    selectPingModelCandidates(pinned, ["gpt-6-sol-low", "gpt-6-sol"], { asOfMs: NOW_MS }),
    ["gpt-6-sol"]
  );
});

test("missing, empty or non-finite catalogs yield no candidates without throwing", () => {
  assert.deepEqual(selectPingModelCandidates(codexSession, undefined), []);
  assert.deepEqual(selectPingModelCandidates(codexSession, null), []);
  assert.deepEqual(selectPingModelCandidates(codexSession, []), []);
  assert.deepEqual(selectPingModelCandidates(codexSession, [Number.NaN as unknown as string]), []);
  assert.deepEqual(
    selectPingModelCandidates(codexSession, ["gpt-6-sol"], { asOfMs: Number.NaN }),
    []
  );
  assert.doesNotThrow(() =>
    selectPingModelCandidates(codexSession, Number.NaN as unknown as string[])
  );
  assert.deepEqual(selectPingModelCandidates(codexSession, Number.NaN as unknown as string[]), []);
});

test("codex and claude sessions are eligible for an oauth connection", async () => {
  assert.deepEqual(
    await evaluateTargetEligibility(
      { connectionId: "codex-1", descriptorId: "codex:session" },
      eligibilityDeps({
        id: "codex-1",
        provider: "codex",
        authType: "oauth",
        isActive: true,
        testStatus: "active",
      }),
      now
    ),
    { eligible: true, reason: null }
  );
  assert.deepEqual(
    await evaluateTargetEligibility(
      { connectionId: "claude-1", descriptorId: "claude:weekly" },
      eligibilityDeps({ id: "claude-1", provider: "claude", authType: "oauth", isActive: true }),
      now
    ),
    { eligible: true, reason: null }
  );
});

test("descriptor gates fail before any connection read", async () => {
  let connectionReads = 0;
  const deps = {
    getProviderConnectionById: async () => {
      connectionReads += 1;
      return null;
    },
    store: { listWindowPingTargets: () => [] },
  } as unknown as Parameters<typeof evaluateTargetEligibility>[1];

  assert.deepEqual(
    await evaluateTargetEligibility(
      { connectionId: "codex-1", descriptorId: "codex:missing" },
      deps,
      now
    ),
    { eligible: false, reason: "descriptor_unknown" }
  );
  assert.deepEqual(
    await evaluateTargetEligibility(
      { connectionId: "claude-1", descriptorId: "claude:weekly-scoped" },
      deps,
      now
    ),
    { eligible: false, reason: "descriptor_excluded" }
  );
  assert.equal(connectionReads, 0);
});

test("connection gates: missing, provider mismatch, unsupported auth and disabled account", async () => {
  const codex = {
    id: "codex-1",
    provider: "codex",
    authType: "oauth",
    isActive: true,
    testStatus: "active",
  };
  const evaluate = (connection: Record<string, unknown> | null) =>
    evaluateTargetEligibility(
      { connectionId: "codex-1", descriptorId: "codex:session" },
      eligibilityDeps(connection),
      now
    );

  assert.deepEqual(await evaluate(null), { eligible: false, reason: "connection_missing" });
  assert.deepEqual(await evaluate({ ...codex, provider: "claude" }), {
    eligible: false,
    reason: "provider_mismatch",
  });
  assert.deepEqual(await evaluate({ ...codex, authType: "api_key" }), {
    eligible: false,
    reason: "unsupported_auth",
  });
  assert.deepEqual(await evaluate({ ...codex, isActive: false }), {
    eligible: false,
    reason: "account_disabled",
  });
  assert.deepEqual(await evaluate({ ...codex, testStatus: "banned" }), {
    eligible: false,
    reason: "account_disabled",
  });
  assert.deepEqual(await evaluate({ ...codex, testStatus: "expired" }), {
    eligible: false,
    reason: "account_disabled",
  });
  assert.deepEqual(await evaluate({ ...codex, testStatus: "unavailable" }), {
    eligible: true,
    reason: null,
  });
});

test("a pinned model must pass the lifecycle gate", async () => {
  const claude = { id: "claude-1", provider: "claude", authType: "oauth", isActive: true };
  assert.deepEqual(
    await evaluateTargetEligibility(
      {
        connectionId: "claude-1",
        descriptorId: "claude:session",
        model: "claude-3-7-sonnet-20250219",
      },
      eligibilityDeps(claude),
      now
    ),
    { eligible: false, reason: "model_unavailable" }
  );
  assert.deepEqual(
    await evaluateTargetEligibility(
      { connectionId: "claude-1", descriptorId: "claude:session", model: "claude-opus-4-5" },
      eligibilityDeps(claude),
      now
    ),
    { eligible: true, reason: null }
  );
});

test("duplicate (connectionId, descriptorId) targets are rejected unless excluded", async () => {
  const connection = { id: "codex-1", provider: "codex", authType: "oauth", isActive: true };
  const duplicate = {
    id: "target-1",
    connectionId: "codex-1",
    descriptorId: "codex:session",
  };
  const evaluate = (excludeTargetId?: string) =>
    evaluateTargetEligibility(
      { connectionId: "codex-1", descriptorId: "codex:session", excludeTargetId },
      eligibilityDeps(connection, [duplicate]),
      now
    );

  assert.deepEqual(await evaluate(), { eligible: false, reason: "duplicate_target" });
  assert.deepEqual(await evaluate("target-1"), { eligible: true, reason: null });
  assert.deepEqual(
    await evaluateTargetEligibility(
      { connectionId: "codex-1", descriptorId: "codex:weekly" },
      eligibilityDeps(connection, [duplicate]),
      now
    ),
    { eligible: true, reason: null }
  );
});
