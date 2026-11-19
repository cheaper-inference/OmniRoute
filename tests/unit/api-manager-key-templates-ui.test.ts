import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  KEY_TEMPLATE_ALL_COMBOS_RULE,
  KEY_TEMPLATE_SCHEMA_VERSION,
  composeTtlSeconds,
  createDefaultKeyTemplatePolicy,
  createDefaultPolicyEditorFormState,
  decomposeTtlSeconds,
  editorFormStateToPolicy,
  policyToEditorFormState,
  resolveActiveReferenceIssues,
  summarizeKeyTemplatePolicy,
  validatePolicyEditorState,
  type KeyTemplatePolicy,
  type TemplateReferenceIssue,
} from "../../src/app/(dashboard)/dashboard/api-manager/keyTemplatePolicyUtils.ts";
import {
  anchorReferenceIssues,
  removeReferenceTarget,
  removesLastQuotaRestriction,
  clearFieldValidationIssues,
} from "../../src/app/(dashboard)/dashboard/api-manager/keyTemplateReferenceIssues.ts";

const OVERLAY_ROOT = join(import.meta.dirname, "../..");
const API_MANAGER_DIR = join(OVERLAY_ROOT, "src/app/(dashboard)/dashboard/api-manager");

const mockT = (key: string, values?: Record<string, unknown>) =>
  values ? `${key}:${JSON.stringify(values)}` : key;

test("missing narrowing references and inactive groups remain nonblocking, but missing groups block", () => {
  const state = createDefaultPolicyEditorFormState();
  state.allowAllConnections = false;
  state.selectedConnections = ["stale"];
  state.allowedQuotas = ["stale-pool"];
  state.groupIds = ["inactive", "missing"];
  const issues = resolveActiveReferenceIssues(state, [], {
    connectionIds: new Set(),
    quotaPoolIds: new Set(),
    groupIds: new Set(["inactive"]),
    inactiveGroupIds: new Set(["inactive"]),
  });
  assert.deepEqual(
    issues.map(({ code, blocking }) => [code, blocking]),
    [
      ["CONNECTION_NOT_FOUND", false],
      ["QUOTA_POOL_NOT_FOUND", false],
      ["GROUP_NOT_FOUND", true],
      ["GROUP_INACTIVE", false],
    ]
  );
  assert.deepEqual(editorFormStateToPolicy(state).key.allowedQuotas, ["stale-pool"]);
  assert.deepEqual(resolveActiveReferenceIssues(state, []), [], "failed catalogs remain unknown");
});

test("stale removal is anchored by value after earlier indices shift, with a guard on the last quota", () => {
  const policy = createDefaultKeyTemplatePolicy();
  policy.key.allowedQuotas = ["first", "stale", "valid"];
  const [issue] = anchorReferenceIssues(
    [
      {
        path: "key.allowedQuotas.1",
        code: "QUOTA_POOL_NOT_FOUND",
        message: "gone",
        blocking: false,
      },
    ],
    policy
  );
  const state = policyToEditorFormState(policy);
  state.allowedQuotas = ["stale", "valid"];
  const next = removeReferenceTarget(state, issue);
  assert.deepEqual(next.allowedQuotas, ["valid"]);
  assert.equal(removesLastQuotaRestriction(state, next), false);
  assert.deepEqual(removeReferenceTarget(next, issue).allowedQuotas, ["valid"]);
  assert.deepEqual(
    removeReferenceTarget(state, { ...issue, value: undefined }).allowedQuotas,
    state.allowedQuotas
  );
  const last = { ...state, allowedQuotas: ["stale"] };
  assert.equal(removesLastQuotaRestriction(last, removeReferenceTarget(last, issue)), true);
});

test("combo patterns are preserved while literal rt-prefixed names are validated", () => {
  const state = createDefaultPolicyEditorFormState();
  state.allowAllCombos = false;
  state.selectedCombos = ["team-*", "combo?", "[ab]", "rt-missing"];
  assert.deepEqual(
    resolveActiveReferenceIssues(state, [], { comboNames: new Set() }).map((issue) => issue.value),
    ["rt-missing"]
  );
});

test("a nullable token reset time remains a valid default through the editor", () => {
  const policy = createDefaultKeyTemplatePolicy();
  policy.related.tokenLimits = [
    {
      scopeType: "global",
      scopeValue: "",
      tokenLimit: 100,
      resetInterval: "daily",
      resetTime: null,
      enabled: true,
    },
  ];
  const form = policyToEditorFormState(policy);
  assert.deepEqual(validatePolicyEditorState(form).limits, []);
  assert.equal(editorFormStateToPolicy(form).related.tokenLimits[0].resetTime, null);
});

test("loading and submitting a policy preserves long blocked patterns and exact expiry", () => {
  for (const seconds of [1, 90, 121, 3599]) {
    const policy = createDefaultKeyTemplatePolicy();
    policy.key.blockedModels = ["provider/" + "x".repeat(250)];
    policy.key.modelAccessMode = "restricted";
    policy.key.allowedModels = ["provider/" + "a".repeat(250)];
    policy.key.allowedCombos = ["c".repeat(200)];
    policy.expiry = { mode: "relative", ttlSeconds: seconds };
    const result = editorFormStateToPolicy(policyToEditorFormState(policy));
    assert.deepEqual(result.key.blockedModels, policy.key.blockedModels);
    assert.deepEqual(result.key.allowedModels, policy.key.allowedModels);
    assert.deepEqual(result.key.allowedCombos, policy.key.allowedCombos);
    assert.deepEqual(result.expiry, policy.expiry);
  }
});

test("replacing a missing reference with a valid value clears the old blocking issue", () => {
  const form = createDefaultPolicyEditorFormState();
  form.proxyId = "valid-proxy";
  form.groupIds = ["valid-group"];
  const issues: TemplateReferenceIssue[] = [
    { path: "key.proxyId", code: "PROXY_NOT_FOUND", message: "Old proxy missing", blocking: true },
    {
      path: "related.groupIds.0",
      code: "GROUP_NOT_FOUND",
      message: "Old group missing",
      blocking: true,
    },
  ];
  const catalog = { proxyIds: new Set(["valid-proxy"]), groupIds: new Set(["valid-group"]) };
  assert.deepEqual(resolveActiveReferenceIssues(form, issues, catalog), []);
  form.proxyId = "another-missing-proxy";
  assert.ok(
    resolveActiveReferenceIssues(form, issues, catalog).some((i) => i.code === "PROXY_NOT_FOUND")
  );
});

test("createDefaultKeyTemplatePolicy and editorFormState round-trip cleanly", () => {
  const defaultPolicy = createDefaultKeyTemplatePolicy();
  assert.equal(defaultPolicy.schemaVersion, KEY_TEMPLATE_SCHEMA_VERSION);
  assert.equal(defaultPolicy.key.modelAccessMode, "all");
  assert.deepEqual(defaultPolicy.key.allowedModels, []);
  assert.deepEqual(defaultPolicy.key.allowedCombos, [KEY_TEMPLATE_ALL_COMBOS_RULE]);
  assert.deepEqual(defaultPolicy.expiry, { mode: "none" });

  const formState = createDefaultPolicyEditorFormState();
  const roundTripped = editorFormStateToPolicy(formState);
  assert.deepEqual(roundTripped, defaultPolicy);
});

test("empty-list semantics are preserved for restricted models, combos, connections, endpoints, and IP allowlist", () => {
  const restrictedZeroModelsPolicy: KeyTemplatePolicy = {
    ...createDefaultKeyTemplatePolicy(),
    key: {
      ...createDefaultKeyTemplatePolicy().key,
      modelAccessMode: "restricted",
      allowedModels: [],
      allowedCombos: [],
      allowedConnections: [],
      allowedEndpoints: [],
      ipAllowlist: [],
    },
  };

  const form = policyToEditorFormState(restrictedZeroModelsPolicy);
  assert.equal(form.allowAllModels, false);
  assert.deepEqual(form.selectedModels, []);
  assert.equal(form.allowAllCombos, false);
  assert.deepEqual(form.selectedCombos, []);
  assert.equal(form.allowAllConnections, true);
  assert.equal(form.allowAllEndpoints, true);
  assert.deepEqual(form.ipAllowlist, []);

  const saved = editorFormStateToPolicy(form);
  assert.equal(saved.key.modelAccessMode, "restricted");
  assert.deepEqual(saved.key.allowedModels, []);
  assert.deepEqual(saved.key.allowedCombos, []);
  assert.deepEqual(saved.key.allowedConnections, []);
  assert.deepEqual(saved.key.allowedEndpoints, []);
  assert.deepEqual(saved.key.ipAllowlist, []);
});

test("relative TTL decomposition, composition, and validation enforce positive bounds", () => {
  assert.deepEqual(decomposeTtlSeconds(86400 * 14), {
    value: "14",
    unit: "days",
  });
  assert.deepEqual(decomposeTtlSeconds(3600 * 6), {
    value: "6",
    unit: "hours",
  });
  assert.deepEqual(decomposeTtlSeconds(60 * 45), {
    value: "45",
    unit: "minutes",
  });

  assert.equal(composeTtlSeconds("30", "days"), 30 * 86400);
  assert.equal(composeTtlSeconds("12", "hours"), 12 * 3600);
  assert.equal(composeTtlSeconds("15", "minutes"), 15 * 60);
  assert.equal(composeTtlSeconds("0", "days"), null);
  assert.equal(composeTtlSeconds("-5", "hours"), null);

  const invalidForm = {
    ...createDefaultPolicyEditorFormState(),
    expiryMode: "relative" as const,
    expiryTtlValue: "0",
    expiryTtlUnit: "days" as const,
  };
  const errors = validatePolicyEditorState(invalidForm, mockT);
  assert.ok(errors.general.length > 0);

  const validForm = {
    ...invalidForm,
    expiryTtlValue: "7",
  };
  const validErrors = validatePolicyEditorState(validForm, mockT);
  assert.equal(Object.values(validErrors).flat().length, 0);
  const policy = editorFormStateToPolicy(validForm);
  assert.deepEqual(policy.expiry, {
    mode: "relative",
    ttlSeconds: 7 * 86400,
  });
});

test("related configurations (groups, domainBudget, quotaLimits, tokenLimits, autoCandidateOverrides, reasoningRules) round-trip", () => {
  const fullPolicy: KeyTemplatePolicy = {
    schemaVersion: 1,
    key: {
      ...createDefaultKeyTemplatePolicy().key,
      modelAccessMode: "restricted",
      allowedModels: ["openai/*", "anthropic/claude-sonnet-4-20250514"],
      blockedModels: ["openai/gpt-3.5*"],
      allowedCombos: ["fast-router"],
      allowedConnections: ["11111111-1111-4111-8111-111111111111"],
      preferredConnections: ["11111111-1111-4111-8111-111111111111"],
      allowedQuotas: ["pool-alpha"],
      noLog: true,
      autoResolve: true,
      isActive: true,
      isBanned: false,
      accessSchedule: {
        enabled: true,
        from: "08:00",
        until: "18:00",
        days: [1, 2, 3, 4, 5],
        tz: "Europe/Warsaw",
      },
      maxRequestsPerDay: 5000,
      maxRequestsPerMinute: 120,
      throttleDelayMs: 250,
      rateLimits: [{ limit: 50, window: 60 }],
      maxSessions: 10,
      ipAllowlist: ["10.0.0.0/8"],
      scopes: [
        "self:usage",
        "self:account-quota",
        "policy:bypass-provider-quota",
        "lease:exclusive",
      ],
      proxyId: "proxy-eu-1",
      allowedEndpoints: ["chat", "embeddings"],
      streamDefaultMode: "json",
      codexServiceMode: "priority",
      cacheDefaultMode: "bypass",
      disableNonPublicModels: true,
      allowUsageCommand: true,
      usageLimitEnabled: true,
      dailyUsageLimitUsd: 15,
      weeklyUsageLimitUsd: 75,
      chaosModeEnabled: true,
      compressionEnabled: true,
      allowAutoCombos: true,
      allowCcDiscoveryAliases: true,
      catalogScope: "combos",
      forcedModel: "fast-router",
    },
    related: {
      groupIds: ["group-prod", "group-analytics"],
      domainBudget: {
        dailyLimitUsd: 20,
        weeklyLimitUsd: 100,
        monthlyLimitUsd: 350,
        warningThreshold: 0.85,
        resetInterval: "monthly",
        resetTime: "04:30",
      },
      quotaLimits: {
        tpmLimit: 250000,
        rpmLimit: 300,
        monthlyAmountUsd: 500,
      },
      tokenLimits: [
        {
          scopeType: "provider",
          scopeValue: "openai",
          tokenLimit: 1000000,
          resetInterval: "daily",
          resetTime: "00:00",
          enabled: true,
        },
      ],
      autoCandidateOverrides: [
        {
          autoChannel: "default",
          connectionId: "11111111-1111-4111-8111-111111111111",
          excluded: true,
        },
      ],
      reasoningRules: [
        {
          name: "Elevate deep reasoning",
          description: "Force high reasoning effort for complex tasks",
          scope: "apiKey",
          comboId: null,
          connectionId: null,
          modelPattern: "claude-*",
          sourceEffort: "any",
          requestTags: ["deep"],
          tagMatchMode: "any",
          effortMode: "force",
          targetEffort: "high",
          targetKind: "keep",
          targetModel: null,
          targetComboId: null,
          budgetAction: "set",
          budgetTokens: 16384,
          priority: 10,
          enabled: true,
        },
      ],
    },
    expiry: {
      mode: "relative",
      ttlSeconds: 86400 * 30,
    },
  };

  const form = policyToEditorFormState(fullPolicy);
  assert.equal(form.domainWarningThresholdPct, "85");
  assert.equal(form.catalogScope, "combos");
  assert.equal(form.disableNonPublicModels, true);
  assert.deepEqual(form.extraScopes, ["lease:exclusive"]);

  const reconstructed = editorFormStateToPolicy(form);
  assert.deepEqual(reconstructed, fullPolicy);

  const summary = summarizeKeyTemplatePolicy(reconstructed, mockT);
  assert.ok(summary.some((item) => item.id === "models-restricted"));
  assert.ok(summary.some((item) => item.id === "combos-restricted"));
  assert.ok(summary.some((item) => item.id === "connections"));
  assert.ok(summary.some((item) => item.id === "expiry-relative"));
  assert.ok(summary.some((item) => item.id === "budgets"));
});

test("resolveActiveReferenceIssues clears blocking issues once missing references are removed from form state", () => {
  const issues: TemplateReferenceIssue[] = [
    {
      path: "key.allowedConnections.0",
      code: "CONNECTION_NOT_FOUND",
      message: "Connection conn-missing was deleted",
      blocking: true,
    },
    {
      path: "related.groupIds.0",
      code: "GROUP_NOT_FOUND",
      message: "Group grp-missing was deleted",
      blocking: true,
    },
    {
      path: "key.proxyId",
      code: "PROXY_NOT_FOUND",
      message: "Proxy proxy-missing was deleted",
      blocking: true,
    },
  ];

  const staleForm = {
    ...createDefaultPolicyEditorFormState(),
    allowAllConnections: false,
    selectedConnections: ["conn-missing"],
    groupIds: ["grp-missing"],
    proxyId: "proxy-missing",
  };
  assert.equal(resolveActiveReferenceIssues(staleForm, issues).length, 3);

  const cleanedForm = {
    ...staleForm,
    allowAllConnections: true,
    selectedConnections: [],
    groupIds: [],
    proxyId: "",
  };
  assert.equal(resolveActiveReferenceIssues(cleanedForm, issues).length, 0);
});

test("ApiManagerPageClient, modals, and 6-tab editor preserve permanent row actions and implement full Key Templates UI", () => {
  const pageSrc = [
    "ApiManagerPageClient.tsx",
    "useKeyTemplateCreation.ts",
    "useCreateKeySubmission.ts",
  ]
    .map((file) => readFileSync(join(API_MANAGER_DIR, file), "utf8"))
    .join("\n");
  const saveModalSrc = readFileSync(
    join(API_MANAGER_DIR, "components/SaveKeyAsTemplateModal.tsx"),
    "utf8"
  );
  const librarySrc = readFileSync(
    join(API_MANAGER_DIR, "components/KeyTemplatesLibrarySection.tsx"),
    "utf8"
  );
  const editorSrc = [
    "KeyPolicySixTabEditor",
    "KeyPolicyGeneralTab",
    "KeyPolicyModelsTab",
    "KeyPolicyCombosTab",
    "KeyPolicyConnectionsTab",
    "KeyPolicyLimitsTab",
    "KeyPolicyBehaviourTab",
  ]
    .map((name) => readFileSync(join(API_MANAGER_DIR, `components/${name}.tsx`), "utf8"))
    .join("\n");

  // Existing static test invariants + new Save as template row button
  assert.ok(pageSrc.includes("newKeyAllowUsageCommand"));
  assert.ok(pageSrc.includes("allowUsageCommand: draft.newKeyAllowUsageCommand"));
  assert.ok(pageSrc.includes('fetch("/api/usage/analytics?range=all&view=apiKeys")'));
  assert.ok(pageSrc.includes("const isQuotaKey"));
  assert.ok(pageSrc.includes("const quotaKeys = filteredKeys.filter(isQuotaKey)"));
  assert.ok(pageSrc.includes("const normalKeys = filteredKeys.filter((k) => !isQuotaKey(k))"));
  assert.ok(pageSrc.includes("normalKeys.map(renderKeyRow)"));
  assert.ok(pageSrc.includes("quotaKeys.map(renderKeyRow)"));

  const headerIdx = pageSrc.indexOf("<PageHeader");
  const filterBarIdx = pageSrc.indexOf("{/* Filter Bar");
  const headerSlice = pageSrc.slice(headerIdx, filterBarIdx);
  assert.ok(headerSlice.includes("setShowAddModal(true)"));
  assert.ok(headerSlice.includes('{t("createKey")}'));

  assert.ok(pageSrc.includes('icon="playlist_add"'));
  assert.ok(pageSrc.includes('t("saveAsTemplate")'));
  assert.ok(pageSrc.includes("<KeyTemplatesLibrarySection"));
  assert.ok(pageSrc.includes("<SaveKeyAsTemplateModal"));
  assert.ok(pageSrc.includes("handleSelectTemplateInCreateModal"));
  assert.ok(pageSrc.includes("switchTemplateConfirmTitle"));
  assert.ok(pageSrc.includes("showFullPolicyEditor &&"));
  assert.ok(pageSrc.includes("templateRef: draft.selectedTemplateRef"));

  // Save as template modal extracts live policy and posts fromKeyId + acknowledge
  assert.ok(saveModalSrc.includes("/template-policy"));
  assert.ok(saveModalSrc.includes("fromKeyId: sourceKey.id"));
  assert.ok(saveModalSrc.includes("requiresAcknowledgement"));

  // Library section supports create/edit/delete/use + revision concurrency
  assert.ok(librarySrc.includes('method: editing ? "PATCH" : "POST"'));
  assert.ok(librarySrc.includes("revision: editing.revision"));
  assert.ok(librarySrc.includes("res.status === 409"));
  assert.ok(librarySrc.includes("onUseTemplate(tpl)"));

  // 6-tab editor distinguishes catalog listing from execution access and avoids raw JSON primary editing
  assert.ok(editorSrc.includes("catalogScope"));
  assert.ok(editorSrc.includes("disableNonPublicModels"));
  assert.ok(editorSrc.includes("\u2192"), "routing separator retains Unicode arrow");
});

test("en.json and pl.json contain all translation keys referenced across Key Templates UI files", () => {
  const en = JSON.parse(readFileSync(join(OVERLAY_ROOT, "src/i18n/messages/en.json"), "utf8"));
  const pl = JSON.parse(readFileSync(join(OVERLAY_ROOT, "src/i18n/messages/pl.json"), "utf8"));

  const files = [
    join(API_MANAGER_DIR, "ApiManagerPageClient.tsx"),
    join(API_MANAGER_DIR, "keyTemplatePolicyUtils.ts"),
    join(API_MANAGER_DIR, "components/KeyPolicySixTabEditor.tsx"),
    join(API_MANAGER_DIR, "components/SaveKeyAsTemplateModal.tsx"),
    join(API_MANAGER_DIR, "components/KeyTemplatesLibrarySection.tsx"),
    join(API_MANAGER_DIR, "components/KeyTemplatePolicyDetails.tsx"),
    join(API_MANAGER_DIR, "useKeyTemplateCreation.ts"),
    join(API_MANAGER_DIR, "useCreateKeySubmission.ts"),
    ...[
      "KeyPolicyGeneralTab",
      "KeyPolicyModelsTab",
      "KeyPolicyCombosTab",
      "KeyPolicyConnectionsTab",
      "KeyPolicyLimitsTab",
      "KeyPolicyBehaviourTab",
      "KeyPolicyReferenceIssues",
    ].map((name) => join(API_MANAGER_DIR, `components/${name}.tsx`)),
    join(API_MANAGER_DIR, "components/useKeyPolicyEditorModel.ts"),
  ];

  const missingEn: string[] = [];
  const missingPl: string[] = [];

  for (const file of files) {
    const src = readFileSync(file, "utf8");
    const regex = /\b(?:t|tr)\(\s*"([^"]+)"/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(src)) !== null) {
      const key = match[1];
      if (typeof en.apiManager[key] !== "string") {
        missingEn.push(`${key} (in ${file})`);
      }
      if (typeof pl.apiManager[key] !== "string") {
        missingPl.push(`${key} (in ${file})`);
      }
    }
  }

  assert.deepEqual(missingEn, []);
  assert.deepEqual(missingPl, []);
});

test("fractional quota limits and budget warning thresholds survive an untouched template draft", () => {
  const policy = createDefaultKeyTemplatePolicy();
  policy.related.quotaLimits = { tpmLimit: 0.5, rpmLimit: 1.75, monthlyAmountUsd: 0.125 };
  policy.related.domainBudget = {
    dailyLimitUsd: 1,
    weeklyLimitUsd: 2,
    monthlyLimitUsd: 3,
    warningThreshold: 0.855,
    resetInterval: "daily",
    resetTime: "00:00",
  };
  const result = editorFormStateToPolicy(policyToEditorFormState(policy));
  assert.deepEqual(result.related.quotaLimits, policy.related.quotaLimits);
  assert.deepEqual(result.related.domainBudget, policy.related.domainBudget);
});

test("an inactive-group warning follows its own value after another group is deactivated", () => {
  const policy = createDefaultKeyTemplatePolicy();
  policy.related.groupIds = ["A", "B"];
  const state = policyToEditorFormState(policy);
  const issues: TemplateReferenceIssue[] = [
    {
      path: "related.groupIds.0",
      code: "GROUP_INACTIVE",
      value: "A",
      message: "inactive A",
      blocking: false,
    },
  ];
  const active = resolveActiveReferenceIssues(state, issues, {
    groupIds: new Set(["A", "B"]),
    inactiveGroupIds: new Set(["B"]),
  });
  assert.deepEqual(
    active.map((issue) => issue.value),
    ["B"]
  );
});

test("removing a stale compound reference preserves other rows with the same target", () => {
  const policy = createDefaultKeyTemplatePolicy();
  policy.related.autoCandidateOverrides = ["auto", "auto-fast"].map((autoChannel) => ({
    autoChannel,
    connectionId: "gone",
    excluded: true,
  }));
  policy.related.reasoningRules = ["a", "b"].map((name) => ({
    name,
    description: "",
    scope: "apiKey",
    comboId: null,
    connectionId: "gone",
    modelPattern: null,
    sourceEffort: "any",
    requestTags: [],
    tagMatchMode: "any",
    effortMode: "inherit",
    targetEffort: null,
    targetKind: "keep",
    targetModel: null,
    targetComboId: null,
    budgetAction: "preserve",
    budgetTokens: null,
    priority: 0,
    enabled: true,
  }));
  const state = policyToEditorFormState(policy);
  const issues: TemplateReferenceIssue[] = [
    {
      path: "related.reasoningRules.0.connectionId",
      code: "REASONING_CONNECTION_NOT_FOUND",
      value: "gone",
      message: "first",
      blocking: true,
    },
    {
      path: "related.reasoningRules.1.connectionId",
      code: "REASONING_CONNECTION_NOT_FOUND",
      value: "gone",
      message: "second",
      blocking: true,
    },
    {
      path: "related.autoCandidateOverrides.0.connectionId",
      code: "CONNECTION_NOT_FOUND",
      value: "gone",
      message: "first override",
      blocking: false,
    },
  ];
  const anchored = anchorReferenceIssues(issues, policy, state);
  const next = removeReferenceTarget(state, anchored[0]);
  assert.deepEqual(
    next.reasoningRules.map((rule) => rule.name),
    ["b"]
  );
  assert.equal(
    removeReferenceTarget(next, anchored[1]).reasoningRules.length,
    0,
    "the second identity survives an index shift"
  );
  assert.deepEqual(
    removeReferenceTarget(state, anchored[2]).autoCandidateOverrides.map((row) => row.autoChannel),
    ["auto-fast"]
  );
  assert.equal(
    JSON.stringify(editorFormStateToPolicy(state)).includes("clientRowId"),
    false,
    "client identity never reaches the API policy"
  );
});

test("stale flat-list cards deduplicate after an earlier index is removed", () => {
  const policy = createDefaultKeyTemplatePolicy();
  policy.key.allowedConnections = ["A", "gone"];
  const state = policyToEditorFormState(policy);
  const issues: TemplateReferenceIssue[] = [
    {
      path: "key.allowedConnections.1",
      value: "gone",
      code: "CONNECTION_NOT_FOUND",
      message: "gone",
      blocking: false,
    },
  ];
  const anchored = anchorReferenceIssues(issues, policy, state);
  const next = { ...state, selectedConnections: ["gone"] };
  const active = resolveActiveReferenceIssues(next, anchored, { connectionIds: new Set(["A"]) });
  assert.equal(active.length, 1);
  assert.equal(active[0].path, "key.allowedConnections.0");
});

test("unrelated edits preserve the exact anchored issue array", () => {
  const issues: TemplateReferenceIssue[] = [
    {
      path: "key.proxyId",
      value: "gone",
      code: "PROXY_NOT_FOUND",
      message: "gone",
      blocking: true,
    },
  ];
  assert.equal(clearFieldValidationIssues(issues), issues);
  const invalid: TemplateReferenceIssue = {
    path: "policy.key.maxSessions",
    code: "INVALID_FIELD",
    message: "invalid",
    blocking: true,
  };
  assert.deepEqual(clearFieldValidationIssues([...issues, invalid]), issues);
});
