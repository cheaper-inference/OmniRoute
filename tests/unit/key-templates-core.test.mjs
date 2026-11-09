import test from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
import {
  collectReferenceIssues,
  deleteStoredTemplate,
  getStoredTemplate,
  insertKeyPolicyRows,
  insertStoredTemplate,
  KEY_TEMPLATES_INDEX_SQL,
  KEY_TEMPLATES_TABLE_SQL,
  KeyTemplateNameConflictError,
  listStoredTemplates,
  readKeyPolicyRows,
  runDeferred,
  runImmediate,
  snapshotToTemplatePolicy,
  templatePolicyToRows,
  updateStoredTemplate,
} from "../../src/lib/db/keyTemplates/policyCore.ts";
import { createDefaultKeyTemplatePolicy } from "../../src/shared/types/keyTemplates.ts";
import { isLiteralKeyTemplateComboReference } from "../../src/shared/utils/keyTemplateReferences.ts";

const CONN_A = "11111111-1111-4111-8111-111111111111";
const CONN_B = "22222222-2222-4222-8222-222222222222";
const CONN_GONE = "33333333-3333-4333-8333-333333333333";
const NOW = Date.parse("2026-11-08T12:00:00.000Z");

// Mirrors the production column set (core schema + migrations + column fallbacks).
function fixture() {
  const db = new DatabaseSync(":memory:");
  db.exec(`
  CREATE TABLE api_keys (
    id TEXT PRIMARY KEY, name TEXT NOT NULL, key TEXT NOT NULL UNIQUE, machine_id TEXT,
    allowed_models TEXT DEFAULT '[]', no_log INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL,
    source TEXT NOT NULL DEFAULT 'manual',
    codex_service_mode TEXT NOT NULL DEFAULT 'inherit',
    model_access_mode TEXT NOT NULL DEFAULT 'all', blocked_models TEXT, allowed_combos TEXT,
    allowed_connections TEXT, preferred_connections TEXT, auto_resolve INTEGER NOT NULL DEFAULT 0,
    is_active INTEGER NOT NULL DEFAULT 1, access_schedule TEXT, max_requests_per_day INTEGER,
    max_requests_per_minute INTEGER, throttle_delay_ms INTEGER, max_sessions INTEGER NOT NULL DEFAULT 0,
    revoked_at TEXT, expires_at TEXT, last_used_at TEXT, key_prefix TEXT, ip_allowlist TEXT, scopes TEXT,
    rate_limits TEXT, is_banned INTEGER NOT NULL DEFAULT 0, key_hash TEXT, proxy_id TEXT,
    allowed_endpoints TEXT, allowed_quotas TEXT NOT NULL DEFAULT '[]',
    stream_default_mode TEXT NOT NULL DEFAULT 'legacy', cache_default_mode TEXT NOT NULL DEFAULT 'legacy',
    disable_non_public_models INTEGER NOT NULL DEFAULT 0, allow_usage_command INTEGER NOT NULL DEFAULT 0,
    usage_limit_enabled INTEGER NOT NULL DEFAULT 0, daily_usage_limit_usd REAL, weekly_usage_limit_usd REAL, five_hour_usage_limit_usd REAL,
    chaos_mode_enabled INTEGER NOT NULL DEFAULT 0, compression_enabled INTEGER NOT NULL DEFAULT 1,
    allow_auto_combos INTEGER NOT NULL DEFAULT 1, allow_cc_discovery_aliases INTEGER NOT NULL DEFAULT 1,
    catalog_scope TEXT NOT NULL DEFAULT 'all', forced_model TEXT
  );
  CREATE TABLE provider_connections (id TEXT PRIMARY KEY);
  CREATE TABLE combos (id TEXT PRIMARY KEY, name TEXT);
  CREATE TABLE quota_pools (id TEXT PRIMARY KEY);
  CREATE TABLE proxy_registry (id TEXT PRIMARY KEY);
  CREATE TABLE key_groups (id TEXT PRIMARY KEY, name TEXT, is_active INTEGER NOT NULL DEFAULT 1);
  CREATE TABLE key_group_members (key_id TEXT NOT NULL, group_id TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')), PRIMARY KEY (key_id, group_id));
  CREATE TABLE domain_budgets (api_key_id TEXT PRIMARY KEY, daily_limit_usd REAL NOT NULL,
    weekly_limit_usd REAL DEFAULT 0, monthly_limit_usd REAL DEFAULT 0, warning_threshold REAL DEFAULT 0.8,
    reset_interval TEXT DEFAULT 'daily', reset_time TEXT DEFAULT '00:00', budget_reset_at INTEGER,
    last_budget_reset_at INTEGER, warning_emitted_at INTEGER, warning_period_start INTEGER);
  CREATE TABLE api_key_quota_limits (api_key_id TEXT PRIMARY KEY, tpm_limit INTEGER, rpm_limit INTEGER,
    monthly_amount_usd REAL, updated_at TEXT NOT NULL DEFAULT (datetime('now')));
  CREATE TABLE api_key_token_limits (id TEXT PRIMARY KEY, api_key_id TEXT NOT NULL,
    scope_type TEXT NOT NULL, scope_value TEXT NOT NULL DEFAULT '', token_limit INTEGER NOT NULL,
    reset_interval TEXT NOT NULL DEFAULT 'monthly', reset_time TEXT, enabled INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now')), updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE (api_key_id, scope_type, scope_value, reset_interval));
  CREATE TABLE api_key_token_counters (limit_id TEXT, window_start TEXT, tokens_used INTEGER);
  CREATE TABLE auto_candidate_overrides (id TEXT PRIMARY KEY, api_key_id TEXT NOT NULL,
    auto_channel TEXT NOT NULL, connection_id TEXT NOT NULL, excluded INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL, UNIQUE(api_key_id, auto_channel, connection_id));
  CREATE TABLE reasoning_routing_rules (id TEXT PRIMARY KEY, name TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '', scope TEXT NOT NULL, api_key_id TEXT, combo_id TEXT,
    connection_id TEXT, model_pattern TEXT, source_effort TEXT NOT NULL DEFAULT 'any',
    request_tags TEXT NOT NULL DEFAULT '[]', tag_match_mode TEXT NOT NULL DEFAULT 'any',
    effort_mode TEXT NOT NULL DEFAULT 'inherit', target_effort TEXT, target_kind TEXT NOT NULL DEFAULT 'keep',
    target_model TEXT, target_combo_id TEXT, budget_action TEXT NOT NULL DEFAULT 'preserve',
    budget_tokens INTEGER, priority INTEGER NOT NULL DEFAULT 0, enabled INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL, updated_at TEXT NOT NULL);
  CREATE TABLE quota_allocations (pool_id TEXT, api_key_id TEXT, weight REAL);
  CREATE TABLE quota_allocation_model_caps (pool_id TEXT, api_key_id TEXT, model TEXT);
  CREATE TABLE api_key_context_sources (api_key_id TEXT, source_type TEXT, token TEXT);
  CREATE TABLE api_key_billing_team_history (id TEXT, api_key_id TEXT, team_id TEXT, valid_to TEXT);
  CREATE TABLE sso_identities (oid TEXT, api_key_id TEXT);

  INSERT INTO provider_connections VALUES ('${CONN_A}'), ('${CONN_B}');
  INSERT INTO combos VALUES ('combo-1', 'team-combo');
  INSERT INTO quota_pools VALUES ('pool-1');
  INSERT INTO proxy_registry VALUES ('proxy-1');
  INSERT INTO key_groups VALUES ('group-1', 'Group', 1), ('group-off', 'Off', 0);

  INSERT INTO api_keys (id, name, key, key_hash, key_prefix, machine_id, created_at, last_used_at,
    model_access_mode, allowed_models, blocked_models, allowed_combos, allowed_connections,
    preferred_connections, allowed_quotas, no_log, scopes, allowed_endpoints, ip_allowlist,
    access_schedule, rate_limits, throttle_delay_ms, max_sessions, proxy_id, forced_model,
    catalog_scope, disable_non_public_models, compression_enabled, allow_auto_combos,
    daily_usage_limit_usd, usage_limit_enabled, expires_at)
  VALUES ('src', 'Source key', 'enc:v1:SECRET-VALUE', 'HASH-VALUE', 'sk-PREFIX', 'machine', '2026-11-01T12:00:00.000Z',
    '2026-11-07T00:00:00.000Z', 'restricted', '[]', '["denied/*"]', '[]',
    '["${CONN_A}","${CONN_B}"]', '["${CONN_B}"]', '["pool-1"]', 1, '["manage","self:usage"]',
    '["chat/completions"]', '["10.0.0.0/8"]',
    '{"enabled":true,"from":"08:00","until":"18:00","days":[1,2,3],"tz":"Europe/Berlin"}',
    '[{"limit":10,"window":60}]', 250, 3, 'proxy-1', 'openai/gpt-x', 'models', 1, 0, 0, 5, 1,
    '2026-12-01T12:00:00.000Z');
  INSERT INTO key_group_members (key_id, group_id) VALUES ('src', 'group-1');
  INSERT INTO domain_budgets VALUES ('src', 1, 2, 3, 0.5, 'weekly', '06:00', 987651, 987652, 987653, 987654);
  INSERT INTO api_key_quota_limits (api_key_id, tpm_limit, rpm_limit, monthly_amount_usd) VALUES ('src', 1000, 20, 50);
  INSERT INTO api_key_token_limits (id, api_key_id, scope_type, scope_value, token_limit, reset_interval, reset_time, enabled)
    VALUES ('limit-1', 'src', 'provider', 'openai', 100000, 'daily', '00:00', 1);
  INSERT INTO api_key_token_counters VALUES ('limit-1', 'w', 999);
  INSERT INTO auto_candidate_overrides VALUES ('ovr-1', 'src', 'auto/coding', '${CONN_A}', 1, 'old');
  INSERT INTO reasoning_routing_rules (id, name, scope, api_key_id, effort_mode, target_effort,
    target_kind, target_combo_id, priority, created_at, updated_at, request_tags)
    VALUES ('rule-1', 'Force high', 'apiKey', 'src', 'force', 'high', 'combo', 'combo-1', 5, 'old', 'old', '["Fast"]');
  `);
  return db;
}

function identity(id) {
  return {
    id,
    name: `Key ${id}`,
    secret: ["fixture-only", id].join(":"),
    hash: `hash-${id}`,
    prefix: `sk-${id}`,
    createdAt: new Date(NOW).toISOString(),
    machineId: "machine",
  };
}

function count(db, sql, ...params) {
  return db.prepare(sql).get(...params).n;
}

test("snapshot captures every policy field and related configuration, no identity or secret", () => {
  const db = fixture();
  const { policy, warnings, problems } = snapshotToTemplatePolicy(
    readKeyPolicyRows(db, "src"),
    NOW
  );
  assert.deepEqual(problems, []);
  const json = JSON.stringify(policy);
  for (const forbidden of [
    "SECRET-VALUE",
    "HASH-VALUE",
    "sk-PREFIX",
    "Source key",
    "machine",
    "last_used",
    "999",
    "98765",
    "ovr-1",
    "rule-1",
    "limit-1",
  ]) {
    assert.ok(!json.includes(forbidden), `policy must not contain ${forbidden}`);
  }
  const defaults = createDefaultKeyTemplatePolicy();
  assert.deepEqual(
    Object.keys(policy.key).sort(),
    Object.keys(defaults.key).sort(),
    "complete key field set"
  );
  assert.equal(policy.key.modelAccessMode, "restricted");
  assert.deepEqual(policy.key.allowedModels, [], "restricted + [] stays deny-all");
  assert.deepEqual(policy.key.allowedCombos, [], "[] combos stays deny-all");
  assert.deepEqual(policy.key.blockedModels, ["denied/*"]);
  assert.deepEqual(policy.key.allowedConnections, [CONN_A, CONN_B]);
  assert.deepEqual(policy.key.preferredConnections, [CONN_B]);
  assert.deepEqual(policy.key.allowedQuotas, ["pool-1"]);
  assert.deepEqual(policy.key.ipAllowlist, ["10.0.0.0/8"]);
  assert.deepEqual(policy.key.accessSchedule.days, [1, 2, 3]);
  assert.deepEqual(policy.key.rateLimits, [{ limit: 10, window: 60 }]);
  assert.equal(policy.key.throttleDelayMs, 250);
  assert.equal(policy.key.maxSessions, 3);
  assert.equal(policy.key.proxyId, "proxy-1");
  assert.equal(policy.key.forcedModel, "openai/gpt-x");
  assert.equal(policy.key.catalogScope, "models");
  assert.equal(policy.key.disableNonPublicModels, true);
  assert.equal(policy.key.compressionEnabled, false);
  assert.equal(policy.key.allowAutoCombos, false);
  assert.equal(policy.key.noLog, true);
  assert.equal(policy.key.dailyUsageLimitUsd, 5);
  assert.deepEqual(policy.related.groupIds, ["group-1"]);
  assert.deepEqual(policy.related.domainBudget, {
    dailyLimitUsd: 1,
    weeklyLimitUsd: 2,
    monthlyLimitUsd: 3,
    warningThreshold: 0.5,
    resetInterval: "weekly",
    resetTime: "06:00",
  });
  assert.deepEqual(policy.related.quotaLimits, {
    tpmLimit: 1000,
    rpmLimit: 20,
    monthlyAmountUsd: 50,
  });
  assert.deepEqual(policy.related.tokenLimits, [
    {
      scopeType: "provider",
      scopeValue: "openai",
      tokenLimit: 100000,
      resetInterval: "daily",
      resetTime: "00:00",
      enabled: true,
    },
  ]);
  assert.deepEqual(policy.related.autoCandidateOverrides, [
    { autoChannel: "auto/coding", connectionId: CONN_A, excluded: true },
  ]);
  assert.equal(policy.related.reasoningRules.length, 1);
  assert.equal(policy.related.reasoningRules[0].targetComboId, "combo-1");
  assert.deepEqual(policy.related.reasoningRules[0].requestTags, ["Fast"]);
  assert.deepEqual(policy.expiry, { mode: "relative", ttlSeconds: 30 * 86400 });
  assert.ok(
    warnings.some((w) => w.code === "EXPIRY_CONVERTED_TO_RELATIVE" && !w.requiresAcknowledgement)
  );
  assert.ok(warnings.some((w) => w.code === "GROUP_POLICY_SHARED"));
  db.close();
});

test("policy roundtrip creates an equivalent independent key with fresh identity", () => {
  const db = fixture();
  const { policy } = snapshotToTemplatePolicy(readKeyPolicyRows(db, "src"), NOW);
  runImmediate(db, () =>
    insertKeyPolicyRows(db, identity("new"), templatePolicyToRows(policy, NOW))
  );
  const created = db.prepare("SELECT * FROM api_keys WHERE id='new'").get();
  assert.equal(created.key, "fixture-only:new");
  assert.equal(created.key_hash, "hash-new");
  assert.equal(created.last_used_at, null);
  assert.equal(created.revoked_at, null);
  assert.equal(created.expires_at, new Date(NOW + 30 * 86400 * 1000).toISOString());
  assert.equal(created.allowed_models, "[]");
  assert.equal(created.allowed_combos, "[]");
  assert.equal(created.model_access_mode, "restricted");
  const again = snapshotToTemplatePolicy(readKeyPolicyRows(db, "new"), NOW);
  assert.deepEqual(again.policy.key, policy.key, "key policy survives a full roundtrip");
  assert.deepEqual(
    again.policy.related,
    policy.related,
    "related policy survives a full roundtrip"
  );
  assert.equal(
    count(
      db,
      "SELECT count(*) n FROM api_key_token_limits WHERE api_key_id='new' AND id <> 'limit-1'"
    ),
    1
  );
  assert.equal(
    count(
      db,
      "SELECT count(*) n FROM reasoning_routing_rules WHERE api_key_id='new' AND id <> 'rule-1'"
    ),
    1
  );
  const budget = db.prepare("SELECT * FROM domain_budgets WHERE api_key_id='new'").get();
  assert.equal(budget.warning_emitted_at, null, "budget runtime state is not copied");
  assert.equal(budget.budget_reset_at, null);
  // Independence: editing the new key never touches the source.
  db.prepare("UPDATE api_keys SET allowed_combos='[\"x\"]' WHERE id='new'").run();
  assert.equal(
    db.prepare("SELECT allowed_combos FROM api_keys WHERE id='src'").get().allowed_combos,
    "[]"
  );
  db.close();
});

test("legacy NULL combos stay allow-all and non-empty legacy models stay restricted", () => {
  const db = fixture();
  db.exec(
    "UPDATE api_keys SET allowed_combos = NULL, model_access_mode = 'all', allowed_models = '[\"m/*\"]' WHERE id='src'"
  );
  const { policy } = snapshotToTemplatePolicy(readKeyPolicyRows(db, "src"), NOW);
  assert.deepEqual(policy.key.allowedCombos, ["combo/*"]);
  assert.equal(policy.key.modelAccessMode, "restricted");
  assert.deepEqual(policy.key.allowedModels, ["m/*"], "wildcards are kept verbatim");
  db.close();
});

test("lifecycle and excluded settings require acknowledgement and are normalized explicitly", () => {
  const db = fixture();
  db.exec(`UPDATE api_keys SET is_active=0, is_banned=1, revoked_at='2026-11-02', expires_at='2026-11-03T12:00:00.000Z', source='sso' WHERE id='src';
    INSERT INTO quota_allocations VALUES ('pool-1','src',50);
    INSERT INTO api_key_context_sources VALUES ('src','vault','CTX-CREDENTIAL');
    INSERT INTO api_key_billing_team_history VALUES ('h','src','team',NULL);`);
  const { policy, warnings } = snapshotToTemplatePolicy(readKeyPolicyRows(db, "src"), NOW);
  const ack = new Set(warnings.filter((w) => w.requiresAcknowledgement).map((w) => w.code));
  for (const code of [
    "KEY_REVOKED",
    "KEY_DISABLED",
    "KEY_BANNED",
    "KEY_EXPIRED",
    "SSO_IDENTITY_EXCLUDED",
    "WEIGHTED_ALLOCATION_EXCLUDED",
    "CONTEXT_SOURCES_EXCLUDED",
    "BILLING_TEAM_EXCLUDED",
  ]) {
    assert.ok(ack.has(code), `${code} requires acknowledgement`);
  }
  assert.equal(policy.key.isActive, true);
  assert.equal(policy.key.isBanned, false);
  assert.ok(
    !JSON.stringify(policy).includes("CTX-CREDENTIAL"),
    "context-source credentials never captured"
  );
  db.close();
});

test("expiry that cannot become a lifetime is disclosed, not silently dropped", () => {
  const db = fixture();
  db.exec("UPDATE api_keys SET expires_at='not-a-date' WHERE id='src'");
  const { policy, warnings } = snapshotToTemplatePolicy(readKeyPolicyRows(db, "src"), NOW);
  assert.deepEqual(policy.expiry, { mode: "none" });
  assert.ok(warnings.some((w) => w.code === "EXPIRY_NOT_DERIVABLE" && w.requiresAcknowledgement));
  db.close();
});

test("unreadable stored restrictions and unclassified fields fail closed", () => {
  const db = fixture();
  db.exec("UPDATE api_keys SET allowed_connections='{broken' WHERE id='src'");
  let result = snapshotToTemplatePolicy(readKeyPolicyRows(db, "src"), NOW);
  assert.ok(result.problems.some((p) => p.path === "key.allowedConnections" && p.blocking));
  db.exec(
    `UPDATE api_keys SET allowed_connections='["${CONN_A}"]' WHERE id='src'; ALTER TABLE api_keys ADD COLUMN future_policy TEXT DEFAULT 'off';`
  );
  result = snapshotToTemplatePolicy(readKeyPolicyRows(db, "src"), NOW);
  assert.deepEqual(result.problems, [], "unclassified column at its default is harmless");
  db.exec("UPDATE api_keys SET future_policy='on' WHERE id='src'");
  result = snapshotToTemplatePolicy(readKeyPolicyRows(db, "src"), NOW);
  assert.ok(
    result.problems.some(
      (p) => p.code === "UNCLASSIFIED_SOURCE_FIELD" && p.path === "api_keys.future_policy"
    )
  );
  assert.equal(
    count(db, "SELECT count(*) n FROM api_keys"),
    1,
    "snapshot capture never writes a key"
  );
  db.close();
});

test("reference issues never prune and only block when dropping could broaden access", () => {
  const db = fixture();
  const policy = createDefaultKeyTemplatePolicy();
  policy.key.allowedConnections = [CONN_A, CONN_GONE];
  policy.key.allowedCombos = ["team-combo", "gone-combo", "combo/*", "rt-*", "rt-concrete"];
  policy.key.allowedQuotas = ["pool-gone"];
  policy.key.proxyId = "proxy-gone";
  policy.related.groupIds = ["group-1", "group-off", "group-gone"];
  policy.related.autoCandidateOverrides = [
    { autoChannel: "auto/x", connectionId: CONN_GONE, excluded: true },
  ];
  policy.related.reasoningRules = [
    {
      name: "r",
      description: "",
      scope: "apiKey",
      comboId: null,
      connectionId: null,
      modelPattern: null,
      sourceEffort: "any",
      requestTags: [],
      tagMatchMode: "any",
      effortMode: "inherit",
      targetEffort: null,
      targetKind: "combo",
      targetModel: null,
      targetComboId: "combo-gone",
      budgetAction: "preserve",
      budgetTokens: null,
      priority: 0,
      enabled: true,
    },
  ];
  const issues = collectReferenceIssues(db, policy);
  const byPath = Object.fromEntries(issues.map((i) => [i.path, i]));
  assert.equal(byPath["key.allowedConnections.1"].blocking, false);
  assert.equal(byPath["key.allowedConnections.0"], undefined);
  assert.equal(byPath["key.allowedCombos.1"].code, "COMBO_NOT_FOUND");
  assert.equal(byPath["key.allowedCombos.0"], undefined);
  assert.equal(byPath["key.allowedCombos.2"], undefined, "combo/* is never a reference");
  assert.equal(byPath["key.allowedCombos.3"], undefined, "patterns are never invalid by absence");
  assert.equal(byPath["key.allowedCombos.4"].value, "rt-concrete", "rt- alone is a literal");
  assert.equal(byPath["key.allowedConnections.1"].value, CONN_GONE);
  assert.equal(byPath["key.allowedQuotas.0"].blocking, false);
  assert.equal(byPath["key.proxyId"].blocking, true);
  assert.equal(byPath["related.groupIds.1"].code, "GROUP_INACTIVE");
  assert.equal(byPath["related.groupIds.1"].value, "group-off");
  assert.equal(byPath["related.groupIds.2"].blocking, true);
  assert.equal(
    byPath["related.autoCandidateOverrides.0.connectionId"].blocking,
    false,
    "stale exclusions are kept"
  );
  assert.equal(byPath["related.reasoningRules.0.targetComboId"].blocking, true);
  assert.deepEqual(policy.key.allowedConnections, [CONN_A, CONN_GONE], "nothing is pruned");
  db.close();
});

test("combo reference predicate excludes wildcard rules but not concrete rt- names", () => {
  for (const name of ["combo/*", "team?", "[ab]", "rt-*"]) {
    assert.equal(isLiteralKeyTemplateComboReference(name), false, name);
  }
  for (const name of ["team-combo", "rt-concrete"]) {
    assert.equal(isLiteralKeyTemplateComboReference(name), true, name);
  }
});

test("deferred snapshot commits and rolls back without retaining a write lock", () => {
  const db = fixture();
  assert.equal(
    runDeferred(db, () => {
      const before = db.prepare("SELECT name FROM api_keys WHERE id='src'").get().name;
      return before;
    }),
    "Source key"
  );
  // The read transaction is complete and no RESERVED writer lock is retained.
  db.exec("UPDATE api_keys SET name='After read' WHERE id='src'");
  assert.equal(db.prepare("SELECT name FROM api_keys WHERE id='src'").get().name, "After read");
  assert.throws(
    () =>
      runDeferred(db, () => {
        throw new Error("snapshot failed");
      }),
    /snapshot failed/
  );
  assert.equal(
    runDeferred(db, () => db.prepare("SELECT name FROM api_keys WHERE id='src'").get().name),
    "After read"
  );
  db.close();
});

test("a failing related insert rolls back the principal key", () => {
  const db = fixture();
  db.exec(
    "CREATE TRIGGER fail_rule BEFORE INSERT ON reasoning_routing_rules WHEN NEW.api_key_id='new' BEGIN SELECT RAISE(ABORT,'fixture'); END;"
  );
  const { policy } = snapshotToTemplatePolicy(readKeyPolicyRows(db, "src"), NOW);
  assert.throws(() =>
    runImmediate(db, () =>
      insertKeyPolicyRows(db, identity("new"), templatePolicyToRows(policy, NOW))
    )
  );
  for (const table of [
    "api_keys",
    "key_group_members",
    "domain_budgets",
    "api_key_quota_limits",
    "api_key_token_limits",
    "auto_candidate_overrides",
  ]) {
    const column =
      table === "api_keys" ? "id" : table === "key_group_members" ? "key_id" : "api_key_id";
    assert.equal(
      count(db, `SELECT count(*) n FROM ${table} WHERE ${column}='new'`),
      0,
      `${table} rolled back`
    );
  }
  db.close();
});

test("key policy reasoning rules cannot escape to a global scope", () => {
  const db = fixture();
  const { policy } = snapshotToTemplatePolicy(readKeyPolicyRows(db, "src"), NOW);
  const rows = templatePolicyToRows(policy, NOW);
  rows.reasoningRules[0].scope = "global";
  assert.throws(
    () => runImmediate(db, () => insertKeyPolicyRows(db, identity("new"), rows)),
    /must use apiKey scope/
  );
  assert.equal(db.prepare("SELECT count(*) AS n FROM api_keys WHERE id='new'").get().n, 0);
  assert.equal(
    db.prepare("SELECT count(*) AS n FROM reasoning_routing_rules WHERE scope='global'").get().n,
    0
  );
  db.close();
});

test("a related value the schema cannot store fails instead of being dropped", () => {
  const db = fixture();
  db.exec("DROP TABLE api_key_quota_limits");
  const sourceDb = fixture();
  const { policy } = snapshotToTemplatePolicy(readKeyPolicyRows(sourceDb, "src"), NOW);
  sourceDb.close();
  assert.throws(
    () =>
      runImmediate(db, () =>
        insertKeyPolicyRows(db, identity("new"), templatePolicyToRows(policy, NOW))
      ),
    /api_key_quota_limits/
  );
  assert.equal(count(db, "SELECT count(*) n FROM api_keys WHERE id='new'"), 0);
  db.close();
});

test("template storage: revisions, name conflicts, deletion and snapshot independence", () => {
  const db = fixture();
  const { policy } = snapshotToTemplatePolicy(readKeyPolicyRows(db, "src"), NOW);
  const stored = insertStoredTemplate(db, {
    id: "t1",
    name: "Restricted",
    description: "",
    policyJson: JSON.stringify(policy),
    now: "t0",
  });
  assert.equal(stored.revision, 1);
  assert.throws(
    () =>
      insertStoredTemplate(db, {
        id: "t2",
        name: "restricted",
        description: "",
        policyJson: "{}",
        now: "t0",
      }),
    KeyTemplateNameConflictError
  );
  // A key created from the template is independent from later template edits.
  runImmediate(db, () =>
    insertKeyPolicyRows(
      db,
      identity("fromT"),
      templatePolicyToRows(JSON.parse(stored.policyJson), NOW)
    )
  );
  const edited = structuredClone(policy);
  edited.key.allowedCombos = ["combo/*"];
  const updated = updateStoredTemplate(db, {
    id: "t1",
    revision: 1,
    policyJson: JSON.stringify(edited),
    now: "t1",
  });
  assert.equal(updated.status, "updated");
  assert.equal(updated.template.revision, 2);
  assert.deepEqual(updateStoredTemplate(db, { id: "t1", revision: 1, name: "Stale", now: "t2" }), {
    status: "conflict",
    currentRevision: 2,
  });
  assert.equal(getStoredTemplate(db, "t1").name, "Restricted", "stale revision never overwrites");
  assert.deepEqual(updateStoredTemplate(db, { id: "nope", revision: 1, now: "t3" }), {
    status: "not_found",
  });
  assert.equal(
    db.prepare("SELECT allowed_combos FROM api_keys WHERE id='fromT'").get().allowed_combos,
    "[]"
  );
  // Editing the source key never changes the stored template.
  db.exec("UPDATE api_keys SET allowed_models='[\"changed\"]' WHERE id='src'");
  assert.deepEqual(JSON.parse(getStoredTemplate(db, "t1").policyJson).key.allowedModels, []);
  assert.equal(deleteStoredTemplate(db, "t1"), true);
  assert.equal(deleteStoredTemplate(db, "t1"), false);
  assert.equal(
    count(db, "SELECT count(*) n FROM api_keys WHERE id='fromT'"),
    1,
    "deleting a template keeps keys"
  );
  assert.deepEqual(listStoredTemplates(db), []);
  db.close();
});

test("migration, core schema and lazy ensure declare the same key_templates table and index", () => {
  const coreSource = readFileSync(new URL("../../src/lib/db/core.ts", import.meta.url), "utf8");
  const norm = (sql) =>
    sql
      .replace(/\s+/g, " ")
      .replace(/ ?([(),;]) ?/g, "$1")
      .trim();
  const table = /CREATE TABLE IF NOT EXISTS key_templates \([\s\S]*?\n\s*\);/.exec(coreSource);
  assert.ok(table, "core schema declares key_templates");
  assert.equal(norm(table[0]), norm(KEY_TEMPLATES_TABLE_SQL));
  const migrationSource = readFileSync(
    new URL("../../src/lib/db/migrations/234_key_templates.sql", import.meta.url),
    "utf8"
  );
  const migrationTable = /CREATE TABLE IF NOT EXISTS key_templates \([\s\S]*?\n\s*\);/.exec(
    migrationSource
  );
  assert.ok(migrationTable, "numbered migration declares key_templates");
  assert.equal(norm(migrationTable[0]), norm(KEY_TEMPLATES_TABLE_SQL));
  assert.ok(norm(migrationSource).includes(norm(KEY_TEMPLATES_INDEX_SQL)));

  assert.ok(norm(coreSource).includes(norm(KEY_TEMPLATES_INDEX_SQL)));
  assert.match(
    coreSource,
    /\{ table: "key_templates", maxRows: 5_000 \}/,
    "critical-table preservation"
  );
});

test("five-hour USD budgets survive capture, independent creation and recapture", () => {
  const db = fixture();
  db.prepare("UPDATE api_keys SET five_hour_usage_limit_usd = ? WHERE id = ?").run(0.125, "src");
  const captured = snapshotToTemplatePolicy(readKeyPolicyRows(db, "src"), NOW);
  assert.deepEqual(captured.problems, []);
  assert.equal(captured.policy.key.fiveHourUsageLimitUsd, 0.125);
  runImmediate(db, () =>
    insertKeyPolicyRows(db, identity("five-hour"), templatePolicyToRows(captured.policy, NOW))
  );
  const copied = snapshotToTemplatePolicy(readKeyPolicyRows(db, "five-hour"), NOW);
  assert.deepEqual(copied.problems, []);
  assert.equal(copied.policy.key.fiveHourUsageLimitUsd, 0.125);
  db.prepare("UPDATE api_keys SET five_hour_usage_limit_usd = NULL WHERE id = ?").run("src");
  assert.equal(
    snapshotToTemplatePolicy(readKeyPolicyRows(db, "five-hour"), NOW).policy.key
      .fiveHourUsageLimitUsd,
    0.125
  );
  db.close();
});
