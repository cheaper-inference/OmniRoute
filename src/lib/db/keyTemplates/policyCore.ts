/**
 * db/keyTemplates/policyCore.ts — dependency-free primitives shared by key duplication,
 * Key Templates and policy-based key creation.
 *
 * Everything here takes an explicit SQLite handle, so the same code runs under
 * better-sqlite3, node:sqlite and sql.js and can be tested against an in-memory DB.
 *
 * Classification (every api_keys column and every key-linked table is accounted for):
 *   identity  — id, name, key, key_hash, key_prefix, machine_id, created_at, source
 *   history   — last_used_at
 *   lifecycle — revoked_at, expires_at (plus is_active / is_banned policy flags)
 *   policy    — API_KEY_POLICY_FIELDS in fieldParsing.ts
 *   related configuration — key_group_members, domain_budgets, api_key_quota_limits,
 *               api_key_token_limits, auto_candidate_overrides, reasoning_routing_rules
 *   excluded (never copied, disclosed when present) — sso_identities,
 *               quota_allocations / quota_allocation_model_caps (weighted pool shares),
 *               api_key_context_sources (credentials), api_key_billing_team_history
 *   runtime state / counters (never copied) — usage/cost history, token/quota counters,
 *               budget reset state, leases, recovery tickets, call logs.
 * Any other api_keys or related-table column holding a non-default value fails closed.
 */

import { randomUUID } from "node:crypto";
import { KEY_TEMPLATE_SCHEMA_VERSION } from "../../../shared/types/keyTemplates.ts";
import type {
  KeyTemplateKeyPolicy,
  KeyTemplatePolicy,
  KeyTemplateReasoningRule,
  TemplateReferenceIssue,
  TemplateWarning,
} from "../../../shared/types/keyTemplates.ts";
import {
  API_KEY_POLICY_FIELDS,
  parseField,
  strictList,
  truthy,
  falsy,
  toFiniteNumber,
} from "./fieldParsing.ts";
import { isLiteralKeyTemplateComboReference } from "../../../shared/utils/keyTemplateReferences.ts";

export interface PolicyStatement {
  all: (...params: unknown[]) => unknown[];
  get: (...params: unknown[]) => unknown;
  run: (...params: unknown[]) => { changes?: number | bigint };
}

export interface PolicyDb {
  prepare: (sql: string) => PolicyStatement;
  exec: (sql: string) => void;
}

type Row = Record<string, unknown>;

// ──────────────── Classification ────────────────

export const API_KEY_IDENTITY_COLUMNS = [
  "id",
  "name",
  "key",
  "key_hash",
  "key_prefix",
  "machine_id",
  "created_at",
  "source",
] as const;
export const API_KEY_HISTORY_COLUMNS = ["last_used_at"] as const;
export const API_KEY_LIFECYCLE_COLUMNS = ["revoked_at", "expires_at"] as const;

export const API_KEY_POLICY_COLUMNS = API_KEY_POLICY_FIELDS.map((spec) => spec.column);

interface RelatedTableSpec {
  table: string;
  keyColumn: string;
  config: readonly string[];
  /** Identity, timestamps and runtime state: never copied. */
  ignored: readonly string[];
}

export const RELATED_TABLES = {
  groups: {
    table: "key_group_members",
    keyColumn: "key_id",
    config: ["group_id"],
    ignored: ["key_id", "created_at"],
  },
  domainBudget: {
    table: "domain_budgets",
    keyColumn: "api_key_id",
    config: [
      "daily_limit_usd",
      "weekly_limit_usd",
      "monthly_limit_usd",
      "warning_threshold",
      "reset_interval",
      "reset_time",
    ],
    ignored: [
      "api_key_id",
      "budget_reset_at",
      "last_budget_reset_at",
      "warning_emitted_at",
      "warning_period_start",
    ],
  },
  quotaLimits: {
    table: "api_key_quota_limits",
    keyColumn: "api_key_id",
    config: ["tpm_limit", "rpm_limit", "monthly_amount_usd"],
    ignored: ["api_key_id", "updated_at"],
  },
  tokenLimits: {
    table: "api_key_token_limits",
    keyColumn: "api_key_id",
    config: ["scope_type", "scope_value", "token_limit", "reset_interval", "reset_time", "enabled"],
    ignored: ["id", "api_key_id", "created_at", "updated_at"],
  },
  autoCandidateOverrides: {
    table: "auto_candidate_overrides",
    keyColumn: "api_key_id",
    config: ["auto_channel", "connection_id", "excluded"],
    ignored: ["id", "api_key_id", "created_at"],
  },
  reasoningRules: {
    table: "reasoning_routing_rules",
    keyColumn: "api_key_id",
    config: [
      "name",
      "description",
      "scope",
      "combo_id",
      "connection_id",
      "model_pattern",
      "source_effort",
      "request_tags",
      "tag_match_mode",
      "effort_mode",
      "target_effort",
      "target_kind",
      "target_model",
      "target_combo_id",
      "budget_action",
      "budget_tokens",
      "priority",
      "enabled",
    ],
    ignored: ["id", "api_key_id", "created_at", "updated_at"],
  },
} as const satisfies Record<string, RelatedTableSpec>;

// ──────────────── Low-level helpers ────────────────

interface ColumnInfo {
  name: string;
  dflt: string | null;
}

function tableColumns(db: PolicyDb, table: string): Map<string, ColumnInfo> {
  const rows = db.prepare(`PRAGMA table_info(${table})`).all() as Row[];
  const map = new Map<string, ColumnInfo>();
  for (const row of rows) {
    const name = String(row.name ?? "");
    if (name) {
      map.set(name, { name, dflt: row.dflt_value === null ? null : String(row.dflt_value) });
    }
  }
  return map;
}

export function hasTable(db: PolicyDb, table: string): boolean {
  return Boolean(
    db.prepare("SELECT 1 FROM sqlite_master WHERE type='table' AND name=?").get(table)
  );
}

function normalizeDefault(dflt: string | null): string | null {
  if (dflt === null) return null;
  const trimmed = dflt.trim();
  const quoted = /^'(.*)'$/s.exec(trimmed);
  return quoted ? quoted[1].replace(/''/g, "'") : trimmed;
}

/** A value is "unset" when it is NULL or equals the column's literal default. */
function isUnsetValue(value: unknown, info: ColumnInfo | undefined): boolean {
  if (value === null || value === undefined) return true;
  const dflt = normalizeDefault(info?.dflt ?? null);
  return dflt !== null && String(value) === dflt;
}

export interface UnclassifiedField {
  table: string;
  column: string;
}

function collectUnclassified(
  table: string,
  row: Row,
  columns: Map<string, ColumnInfo>,
  known: ReadonlySet<string>,
  out: UnclassifiedField[]
): void {
  for (const [column, info] of columns) {
    if (known.has(column)) continue;
    if (!isUnsetValue(row[column], info)) out.push({ table, column });
  }
}

function runTransaction<T>(db: PolicyDb, mode: "DEFERRED" | "IMMEDIATE", fn: () => T): T {
  db.exec(`BEGIN ${mode}`);
  try {
    const result = fn();
    db.exec("COMMIT");
    return result;
  } catch (error) {
    try {
      db.exec("ROLLBACK");
    } catch {
      // Preserve the original failure.
    }
    throw error;
  }
}

/** Writer transaction: reserves a write lock before reading configuration rows. */
export function runImmediate<T>(db: PolicyDb, fn: () => T): T {
  return runTransaction(db, "IMMEDIATE", fn);
}

/** Consistent read-only snapshot, without reserving a write lock. */
export function runDeferred<T>(db: PolicyDb, fn: () => T): T {
  return runTransaction(db, "DEFERRED", fn);
}

// ──────────────── Snapshot of an existing key ────────────────

export interface KeyPolicyRows {
  source: string;
  createdAt: string | null;
  /** Raw api_keys values for policy + lifecycle columns present in the table. */
  keyColumns: Row;
  groupIds: string[];
  domainBudget: Row | null;
  quotaLimits: Row | null;
  tokenLimits: Row[];
  autoCandidateOverrides: Row[];
  reasoningRules: Row[];
  excluded: {
    ssoIdentity: boolean;
    weightedAllocations: number;
    contextSources: number;
    billingTeam: boolean;
  };
  unclassified: UnclassifiedField[];
}

function readRelated(
  db: PolicyDb,
  spec: RelatedTableSpec,
  keyId: string,
  unclassified: UnclassifiedField[],
  orderBy = "rowid"
): Row[] {
  if (!hasTable(db, spec.table)) return [];
  const columns = tableColumns(db, spec.table);
  const known = new Set<string>([...spec.config, ...spec.ignored]);
  const rows = db
    .prepare(`SELECT * FROM ${spec.table} WHERE ${spec.keyColumn} = ? ORDER BY ${orderBy}`)
    .all(keyId) as Row[];
  return rows.map((row) => {
    collectUnclassified(spec.table, row, columns, known, unclassified);
    const config: Row = {};
    for (const column of spec.config) if (columns.has(column)) config[column] = row[column];
    return config;
  });
}

function countRows(db: PolicyDb, table: string, where: string, keyId: string): number {
  if (!hasTable(db, table)) return 0;
  const row = db.prepare(`SELECT count(*) AS n FROM ${table} WHERE ${where}`).get(keyId) as Row;
  return Number(row?.n ?? 0);
}

/**
 * Reads every configuration row of one key. Must run inside a transaction when the
 * result is written back (duplication), so the snapshot is consistent.
 */
export function readKeyPolicyRows(db: PolicyDb, keyId: string): KeyPolicyRows | null {
  const keyRow = db.prepare("SELECT * FROM api_keys WHERE id = ?").get(keyId) as Row | undefined;
  if (!keyRow) return null;
  const unclassified: UnclassifiedField[] = [];
  const keyColumnsInfo = tableColumns(db, "api_keys");
  const known = new Set<string>([
    ...API_KEY_IDENTITY_COLUMNS,
    ...API_KEY_HISTORY_COLUMNS,
    ...API_KEY_LIFECYCLE_COLUMNS,
    ...API_KEY_POLICY_COLUMNS,
  ]);
  collectUnclassified("api_keys", keyRow, keyColumnsInfo, known, unclassified);
  const keyColumns: Row = {};
  for (const column of [...API_KEY_POLICY_COLUMNS, ...API_KEY_LIFECYCLE_COLUMNS]) {
    if (keyColumnsInfo.has(column)) keyColumns[column] = keyRow[column];
  }

  const groups = readRelated(db, RELATED_TABLES.groups, keyId, unclassified);
  const budgets = readRelated(db, RELATED_TABLES.domainBudget, keyId, unclassified);
  const quotas = readRelated(db, RELATED_TABLES.quotaLimits, keyId, unclassified);
  const source =
    typeof keyRow.source === "string" && keyRow.source.trim() ? keyRow.source : "manual";

  return {
    source,
    createdAt: typeof keyRow.created_at === "string" ? keyRow.created_at : null,
    keyColumns,
    groupIds: groups.map((row) => String(row.group_id)),
    domainBudget: budgets[0] ?? null,
    quotaLimits: quotas[0] ?? null,
    tokenLimits: readRelated(db, RELATED_TABLES.tokenLimits, keyId, unclassified),
    autoCandidateOverrides: readRelated(
      db,
      RELATED_TABLES.autoCandidateOverrides,
      keyId,
      unclassified
    ),
    reasoningRules: readRelated(
      db,
      RELATED_TABLES.reasoningRules,
      keyId,
      unclassified,
      "priority DESC, rowid"
    ),
    excluded: {
      ssoIdentity:
        source !== "manual" || countRows(db, "sso_identities", "api_key_id = ?", keyId) > 0,
      weightedAllocations:
        countRows(db, "quota_allocations", "api_key_id = ?", keyId) +
        countRows(db, "quota_allocation_model_caps", "api_key_id = ?", keyId),
      contextSources: countRows(db, "api_key_context_sources", "api_key_id = ?", keyId),
      billingTeam:
        countRows(
          db,
          "api_key_billing_team_history",
          "api_key_id = ? AND valid_to IS NULL",
          keyId
        ) > 0,
    },
    unclassified,
  };
}

// ──────────────── Atomic insert ────────────────

export interface NewKeyIdentity {
  id: string;
  name: string;
  /** Stored form of the secret (already encrypted when the caller encrypts at rest). */
  secret: string;
  hash: string;
  prefix: string;
  createdAt: string;
  machineId: string;
}

/** Rows to write for a new key; same shape as a snapshot's configuration part. */
export interface KeyPolicyInsertRows {
  keyColumns: Row;
  groupIds: string[];
  domainBudget: Row | null;
  quotaLimits: Row | null;
  tokenLimits: Row[];
  autoCandidateOverrides: Row[];
  reasoningRules: Row[];
}

export class KeyPolicyPersistenceError extends Error {
  readonly code = "POLICY_PERSISTENCE";
}

function insertRow(db: PolicyDb, table: string, values: Row): void {
  const columns = tableColumns(db, table);
  const names: string[] = [];
  const params: unknown[] = [];
  for (const [column, value] of Object.entries(values)) {
    if (!columns.has(column)) {
      if (value === null || value === undefined) continue;
      throw new KeyPolicyPersistenceError(`${table}.${column} is missing; cannot store policy`);
    }
    names.push(column);
    params.push(value === undefined ? null : value);
  }
  db.prepare(
    `INSERT INTO ${table} (${names.join(",")}) VALUES (${names.map(() => "?").join(",")})`
  ).run(...params);
}

function requireTable(db: PolicyDb, table: string): void {
  if (!hasTable(db, table)) {
    throw new KeyPolicyPersistenceError(`${table} table is missing; cannot store policy`);
  }
}

/**
 * Writes the principal row and every related row. Call inside runImmediate(): a failure
 * anywhere leaves no partially configured key.
 */
export function insertKeyPolicyRows(
  db: PolicyDb,
  identity: NewKeyIdentity,
  rows: KeyPolicyInsertRows
): void {
  insertRow(db, "api_keys", {
    id: identity.id,
    name: identity.name,
    key: identity.secret,
    key_hash: identity.hash,
    key_prefix: identity.prefix,
    created_at: identity.createdAt,
    machine_id: identity.machineId,
    ...rows.keyColumns,
  });
  if (rows.groupIds.length > 0) requireTable(db, RELATED_TABLES.groups.table);
  for (const groupId of rows.groupIds) {
    insertRow(db, RELATED_TABLES.groups.table, { key_id: identity.id, group_id: groupId });
  }
  if (rows.domainBudget) {
    requireTable(db, RELATED_TABLES.domainBudget.table);
    insertRow(db, RELATED_TABLES.domainBudget.table, {
      api_key_id: identity.id,
      ...rows.domainBudget,
    });
  }
  if (rows.quotaLimits) {
    requireTable(db, RELATED_TABLES.quotaLimits.table);
    insertRow(db, RELATED_TABLES.quotaLimits.table, {
      api_key_id: identity.id,
      ...rows.quotaLimits,
    });
  }
  if (rows.tokenLimits.length > 0) requireTable(db, RELATED_TABLES.tokenLimits.table);
  for (const limit of rows.tokenLimits) {
    insertRow(db, RELATED_TABLES.tokenLimits.table, {
      id: randomUUID(),
      api_key_id: identity.id,
      ...limit,
    });
  }
  if (rows.autoCandidateOverrides.length > 0) {
    requireTable(db, RELATED_TABLES.autoCandidateOverrides.table);
  }
  for (const override of rows.autoCandidateOverrides) {
    insertRow(db, RELATED_TABLES.autoCandidateOverrides.table, {
      id: randomUUID(),
      api_key_id: identity.id,
      created_at: identity.createdAt,
      ...override,
    });
  }
  if (rows.reasoningRules.length > 0) requireTable(db, RELATED_TABLES.reasoningRules.table);
  for (const rule of rows.reasoningRules) {
    if (rule.scope !== "apiKey") {
      throw new Error("Key policy reasoning rules must use apiKey scope");
    }
    insertRow(db, RELATED_TABLES.reasoningRules.table, {
      ...rule,
      id: randomUUID(),
      api_key_id: identity.id,
      created_at: identity.createdAt,
      updated_at: identity.createdAt,
    });
  }
}

/**
 * Key duplication: exact policy copy (lifecycle included, as before) with a fresh
 * identity, in one transaction. Returns false when the source does not exist.
 */
export function copyKeyPolicy(db: PolicyDb, sourceId: string, identity: NewKeyIdentity): boolean {
  return runImmediate(db, () => {
    const rows = readKeyPolicyRows(db, sourceId);
    if (!rows) return false;
    // SSO credentials are controlled by the identity lifecycle, not a manual copy.
    if (rows.source !== "manual") throw new Error("SSO key cannot be duplicated");
    // A weighted allocation cannot be copied without changing other keys' shares.
    if (rows.excluded.weightedAllocations > 0) {
      throw new Error("Weighted quota allocation requires explicit allocation planning");
    }
    if (rows.unclassified.length > 0) {
      throw new KeyPolicyPersistenceError(
        `Unclassified key fields hold values: ${rows.unclassified
          .map((f) => `${f.table}.${f.column}`)
          .join(", ")}`
      );
    }
    insertKeyPolicyRows(db, identity, rows);
    return true;
  });
}

// ──────────────── Raw rows → typed template policy ────────────────

function warn(
  code: TemplateWarning["code"],
  message: string,
  requiresAcknowledgement: boolean
): TemplateWarning {
  return { code, message, requiresAcknowledgement };
}

function issue(
  path: string,
  code: TemplateReferenceIssue["code"],
  message: string,
  blocking: boolean,
  value?: string
): TemplateReferenceIssue {
  return { path, code, message, blocking, ...(value === undefined ? {} : { value }) };
}

function parseTimestamp(value: unknown): number | null {
  if (typeof value !== "string" || value.trim() === "") return null;
  const ms = Date.parse(value);
  return Number.isFinite(ms) ? ms : null;
}

export interface SnapshotResult {
  policy: KeyTemplatePolicy;
  warnings: TemplateWarning[];
  /** Blocking problems: the source cannot be captured faithfully until fixed. */
  problems: TemplateReferenceIssue[];
}

function relatedNumber(value: unknown, fallback: number): number {
  const n = toFiniteNumber(value);
  return n === null ? fallback : n;
}

function relatedNullableNumber(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  return toFiniteNumber(value);
}

function nullableText(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function captureExpiry(
  rows: KeyPolicyRows,
  nowMs: number,
  warnings: TemplateWarning[]
): KeyTemplatePolicy["expiry"] {
  const expiresAt = rows.keyColumns.expires_at;
  if (expiresAt === null || expiresAt === undefined) return { mode: "none" };
  const expiresMs = parseTimestamp(expiresAt);
  const createdMs = parseTimestamp(rows.createdAt);
  const ttlSeconds =
    expiresMs !== null && createdMs !== null ? Math.round((expiresMs - createdMs) / 1000) : 0;
  if (expiresMs !== null && expiresMs <= nowMs) {
    warnings.push(
      warn(
        "KEY_EXPIRED",
        "The source key has expired. Keys created from the template get a fresh lifetime.",
        true
      )
    );
  }
  if (ttlSeconds > 0) {
    warnings.push(
      warn(
        "EXPIRY_CONVERTED_TO_RELATIVE",
        `The fixed expiry date becomes a lifetime of ${ttlSeconds} seconds from creation.`,
        false
      )
    );
    return { mode: "relative", ttlSeconds };
  }
  warnings.push(
    warn(
      "EXPIRY_NOT_DERIVABLE",
      "The source expiry cannot be expressed as a lifetime. The template has no expiry; set one in the editor if needed.",
      true
    )
  );
  return { mode: "none" };
}

function captureExcludedWarnings(rows: KeyPolicyRows, warnings: TemplateWarning[]): void {
  if (rows.excluded.ssoIdentity) {
    warnings.push(
      warn(
        "SSO_IDENTITY_EXCLUDED",
        "The source key is bound to an SSO identity. The identity is never captured; group memberships the identity provider maintains are captured as static memberships.",
        true
      )
    );
  }
  if (rows.excluded.weightedAllocations > 0) {
    warnings.push(
      warn(
        "WEIGHTED_ALLOCATION_EXCLUDED",
        `The source key holds ${rows.excluded.weightedAllocations} weighted quota pool allocation or cap row(s). They are shared pool settings and are not captured; pool weights stay unchanged.`,
        true
      )
    );
  }
  if (rows.excluded.contextSources > 0) {
    warnings.push(
      warn(
        "CONTEXT_SOURCES_EXCLUDED",
        `The source key has ${rows.excluded.contextSources} context source(s). They carry credentials and are never captured.`,
        true
      )
    );
  }
  if (rows.excluded.billingTeam) {
    warnings.push(
      warn(
        "BILLING_TEAM_EXCLUDED",
        "The source key is assigned to a billing team. Billing assignment history is not captured; assign the team after creating a key.",
        true
      )
    );
  }
  if (rows.groupIds.length > 0) {
    warnings.push(
      warn(
        "GROUP_POLICY_SHARED",
        "Group memberships are captured. Group permissions are shared: later group edits affect every member key.",
        false
      )
    );
  }
}

function captureKeyFields(rows: KeyPolicyRows, problems: TemplateReferenceIssue[]): Row {
  const key: Row = {};
  for (const spec of API_KEY_POLICY_FIELDS) {
    const parsed = parseField(spec, rows.keyColumns[spec.column], rows.keyColumns);
    if (!parsed.ok) {
      problems.push(
        issue(
          `key.${spec.field}`,
          "UNREADABLE_SOURCE_FIELD",
          `The stored value of ${spec.field} cannot be read; fix it on the key before saving a template.`,
          true
        )
      );
      continue;
    }
    key[spec.field] = parsed.value;
  }
  for (const field of rows.unclassified) {
    problems.push(
      issue(
        `${field.table}.${field.column}`,
        "UNCLASSIFIED_SOURCE_FIELD",
        `${field.table}.${field.column} holds a value this version cannot capture; refusing to drop it silently.`,
        true
      )
    );
  }
  return key;
}

function normalizeCapturedLifecycle(
  rows: KeyPolicyRows,
  key: Row,
  warnings: TemplateWarning[]
): void {
  const revokedAt = rows.keyColumns.revoked_at;
  if (typeof revokedAt === "string" && revokedAt.trim() !== "") {
    warnings.push(
      warn(
        "KEY_REVOKED",
        "The source key is revoked. The template will not carry the revocation; keys created from it start usable.",
        true
      )
    );
  }
  if (key.isActive === false) {
    warnings.push(
      warn(
        "KEY_DISABLED",
        "The source key is disabled. The template is normalized to active; switch it off in the editor to keep new keys disabled.",
        true
      )
    );
    key.isActive = true;
  }
  if (key.isBanned === true) {
    warnings.push(
      warn(
        "KEY_BANNED",
        "The source key is banned. The template is normalized to not banned.",
        true
      )
    );
    key.isBanned = false;
  }
}

function captureReasoningRules(
  rows: KeyPolicyRows,
  problems: TemplateReferenceIssue[]
): KeyTemplateReasoningRule[] {
  return rows.reasoningRules.map((rule, index) => {
    const tags = strictList(rule.request_tags, []);
    if (!tags.ok) {
      problems.push(
        issue(
          `related.reasoningRules.${index}.requestTags`,
          "UNREADABLE_SOURCE_FIELD",
          "The stored request tags of this reasoning rule cannot be read.",
          true
        )
      );
    }
    return {
      name: String(rule.name ?? ""),
      description: typeof rule.description === "string" ? rule.description : "",
      scope: String(rule.scope) as KeyTemplateReasoningRule["scope"],
      comboId: nullableText(rule.combo_id),
      connectionId: nullableText(rule.connection_id),
      modelPattern: nullableText(rule.model_pattern),
      sourceEffort: String(rule.source_effort ?? "any") as "any",
      requestTags: tags.ok ? tags.value : [],
      tagMatchMode: rule.tag_match_mode === "all" ? "all" : "any",
      effortMode: String(rule.effort_mode ?? "inherit") as "inherit",
      targetEffort: nullableText(rule.target_effort) as KeyTemplateReasoningRule["targetEffort"],
      targetKind: String(rule.target_kind ?? "keep") as "keep",
      targetModel: nullableText(rule.target_model),
      targetComboId: nullableText(rule.target_combo_id),
      budgetAction: String(rule.budget_action ?? "preserve") as "preserve",
      budgetTokens: relatedNullableNumber(rule.budget_tokens),
      priority: relatedNumber(rule.priority, 0),
      enabled: rule.enabled === undefined ? true : !falsy(rule.enabled),
    };
  });
}

function captureRelated(
  rows: KeyPolicyRows,
  problems: TemplateReferenceIssue[]
): KeyTemplatePolicy["related"] {
  const budget = rows.domainBudget;
  const quota = rows.quotaLimits;
  return {
    groupIds: [...rows.groupIds],
    domainBudget: budget
      ? {
          dailyLimitUsd: relatedNumber(budget.daily_limit_usd, 0),
          weeklyLimitUsd: relatedNumber(budget.weekly_limit_usd, 0),
          monthlyLimitUsd: relatedNumber(budget.monthly_limit_usd, 0),
          warningThreshold: relatedNumber(budget.warning_threshold, 0.8),
          resetInterval: (typeof budget.reset_interval === "string"
            ? budget.reset_interval
            : "daily") as "daily",
          resetTime: typeof budget.reset_time === "string" ? budget.reset_time : "00:00",
        }
      : null,
    quotaLimits: quota
      ? {
          tpmLimit: relatedNullableNumber(quota.tpm_limit),
          rpmLimit: relatedNullableNumber(quota.rpm_limit),
          monthlyAmountUsd: relatedNullableNumber(quota.monthly_amount_usd),
        }
      : null,
    tokenLimits: rows.tokenLimits.map((limit) => ({
      scopeType: String(limit.scope_type) as "global",
      scopeValue: typeof limit.scope_value === "string" ? limit.scope_value : "",
      tokenLimit: relatedNumber(limit.token_limit, 0),
      resetInterval: (typeof limit.reset_interval === "string"
        ? limit.reset_interval
        : "monthly") as "monthly",
      resetTime: nullableText(limit.reset_time),
      enabled: limit.enabled === undefined ? true : !falsy(limit.enabled),
    })),
    autoCandidateOverrides: rows.autoCandidateOverrides.map((override) => ({
      autoChannel: String(override.auto_channel),
      connectionId: String(override.connection_id),
      excluded: override.excluded === undefined ? true : truthy(override.excluded),
    })),
    reasoningRules: captureReasoningRules(rows, problems),
  };
}

/**
 * Converts a snapshot into a typed, lifecycle-normalized template policy. Nothing is
 * dropped silently: unreadable or unclassified values are blocking problems, excluded
 * configuration and lifecycle normalization are warnings that require acknowledgement.
 */
export function snapshotToTemplatePolicy(rows: KeyPolicyRows, nowMs: number): SnapshotResult {
  const warnings: TemplateWarning[] = [];
  const problems: TemplateReferenceIssue[] = [];
  const key = captureKeyFields(rows, problems);
  normalizeCapturedLifecycle(rows, key, warnings);
  const expiry = captureExpiry(rows, nowMs, warnings);
  captureExcludedWarnings(rows, warnings);
  const policy: KeyTemplatePolicy = {
    schemaVersion: KEY_TEMPLATE_SCHEMA_VERSION,
    key: key as unknown as KeyTemplateKeyPolicy,
    related: captureRelated(rows, problems),
    expiry,
  };
  return { policy, warnings, problems };
}

// ──────────────── Typed policy → rows ────────────────

/** Converts a validated policy into rows for insertKeyPolicyRows(). */
function serializeKeyColumns(policy: KeyTemplatePolicy, nowMs: number): Row {
  const keyColumns: Row = {};
  const key = policy.key as unknown as Row;
  for (const spec of API_KEY_POLICY_FIELDS) {
    const value = key[spec.field];
    switch (spec.kind) {
      case "list":
      case "combos":
        keyColumns[spec.column] = JSON.stringify(value);
        break;
      case "boolFalse":
      case "boolTrue":
        keyColumns[spec.column] = value === true ? 1 : 0;
        break;
      case "schedule":
      case "rateLimits":
        keyColumns[spec.column] = value === null ? null : JSON.stringify(value);
        break;
      default:
        keyColumns[spec.column] = value === undefined ? null : value;
    }
  }
  keyColumns.revoked_at = null;
  keyColumns.expires_at =
    policy.expiry.mode === "relative"
      ? new Date(nowMs + policy.expiry.ttlSeconds * 1000).toISOString()
      : null;
  return keyColumns;
}

/** Preserve the complete related configuration independently of key-column encoding. */
function serializeRelatedRows(policy: KeyTemplatePolicy): Omit<KeyPolicyInsertRows, "keyColumns"> {
  const { related } = policy;
  return {
    groupIds: [...related.groupIds],
    domainBudget: related.domainBudget
      ? {
          daily_limit_usd: related.domainBudget.dailyLimitUsd,
          weekly_limit_usd: related.domainBudget.weeklyLimitUsd,
          monthly_limit_usd: related.domainBudget.monthlyLimitUsd,
          warning_threshold: related.domainBudget.warningThreshold,
          reset_interval: related.domainBudget.resetInterval,
          reset_time: related.domainBudget.resetTime,
        }
      : null,
    quotaLimits: related.quotaLimits
      ? {
          tpm_limit: related.quotaLimits.tpmLimit,
          rpm_limit: related.quotaLimits.rpmLimit,
          monthly_amount_usd: related.quotaLimits.monthlyAmountUsd,
        }
      : null,
    tokenLimits: related.tokenLimits.map((limit) => ({
      scope_type: limit.scopeType,
      scope_value: limit.scopeType === "global" ? "" : limit.scopeValue,
      token_limit: limit.tokenLimit,
      reset_interval: limit.resetInterval,
      reset_time: limit.resetTime,
      enabled: limit.enabled ? 1 : 0,
    })),
    autoCandidateOverrides: related.autoCandidateOverrides.map((override) => ({
      auto_channel: override.autoChannel,
      connection_id: override.connectionId,
      excluded: override.excluded ? 1 : 0,
    })),
    reasoningRules: related.reasoningRules.map((rule) => ({
      name: rule.name,
      description: rule.description,
      scope: rule.scope,
      combo_id: rule.comboId,
      connection_id: rule.connectionId,
      model_pattern: rule.modelPattern,
      source_effort: rule.sourceEffort,
      request_tags: JSON.stringify(rule.requestTags),
      tag_match_mode: rule.tagMatchMode,
      effort_mode: rule.effortMode,
      target_effort: rule.targetEffort,
      target_kind: rule.targetKind,
      target_model: rule.targetModel,
      target_combo_id: rule.targetComboId,
      budget_action: rule.budgetAction,
      budget_tokens: rule.budgetTokens,
      priority: rule.priority,
      enabled: rule.enabled ? 1 : 0,
    })),
  };
}

/** Converts a validated policy into rows for insertKeyPolicyRows(). */
export function templatePolicyToRows(
  policy: KeyTemplatePolicy,
  nowMs: number
): KeyPolicyInsertRows {
  return { keyColumns: serializeKeyColumns(policy, nowMs), ...serializeRelatedRows(policy) };
}

// ──────────────── Reference validation ────────────────

function existingIds(db: PolicyDb, table: string, column: string, ids: string[]): Set<string> {
  const found = new Set<string>();
  if (ids.length === 0 || !hasTable(db, table)) return found;
  const stmt = db.prepare(`SELECT 1 FROM ${table} WHERE ${column} = ?`);
  for (const id of new Set(ids)) if (stmt.get(id)) found.add(id);
  return found;
}

/**
 * Checks concrete database references without pruning anything. Wildcards, routing-rule
 * names and model ids are never treated as invalid just because no row matches them.
 */
function collectConnectionReferenceIssues(
  db: PolicyDb,
  policy: KeyTemplatePolicy,
  issues: TemplateReferenceIssue[]
): Set<string> {
  const { key, related } = policy;

  const connectionIds = [
    ...key.allowedConnections,
    ...key.preferredConnections,
    ...related.autoCandidateOverrides.map((o) => o.connectionId),
    ...related.reasoningRules.flatMap((r) => (r.connectionId ? [r.connectionId] : [])),
  ];
  const connections = existingIds(db, "provider_connections", "id", connectionIds);
  key.allowedConnections.forEach((id, index) => {
    if (!connections.has(id)) {
      issues.push(
        issue(
          `key.allowedConnections.${index}`,
          "CONNECTION_NOT_FOUND",
          `Connection ${id} no longer exists. It stays in the allow-list (narrowing only); remove it explicitly. Removing every entry makes the key unrestricted.`,
          false,
          id
        )
      );
    }
  });
  key.preferredConnections.forEach((id, index) => {
    if (!connections.has(id)) {
      issues.push(
        issue(
          `key.preferredConnections.${index}`,
          "CONNECTION_NOT_FOUND",
          `Preferred connection ${id} no longer exists; it is kept until removed.`,
          false,
          id
        )
      );
    }
  });
  related.autoCandidateOverrides.forEach((override, index) => {
    if (!connections.has(override.connectionId)) {
      issues.push(
        issue(
          `related.autoCandidateOverrides.${index}.connectionId`,
          "CONNECTION_NOT_FOUND",
          `Connection ${override.connectionId} no longer exists; the override is kept as configured.`,
          false,
          override.connectionId
        )
      );
    }
  });

  return connections;
}

function collectComboReferenceIssues(
  db: PolicyDb,
  key: KeyTemplateKeyPolicy,
  issues: TemplateReferenceIssue[]
): void {
  const comboNames = key.allowedCombos.filter(isLiteralKeyTemplateComboReference);
  const combos = existingIds(db, "combos", "name", comboNames);
  key.allowedCombos.forEach((name, index) => {
    if (!isLiteralKeyTemplateComboReference(name)) return;
    if (!combos.has(name)) {
      issues.push(
        issue(
          `key.allowedCombos.${index}`,
          "COMBO_NOT_FOUND",
          `No combo is named "${name}" now. The rule is kept (it may name a routing rule or a removed combo).`,
          false,
          name
        )
      );
    }
  });
}

function collectQuotaAndProxyIssues(
  db: PolicyDb,
  key: KeyTemplateKeyPolicy,
  issues: TemplateReferenceIssue[]
): void {
  const pools = existingIds(db, "quota_pools", "id", key.allowedQuotas);
  key.allowedQuotas.forEach((id, index) => {
    if (!pools.has(id)) {
      issues.push(
        issue(
          `key.allowedQuotas.${index}`,
          "QUOTA_POOL_NOT_FOUND",
          `Quota pool ${id} no longer exists; it stays in the restriction until removed.`,
          false,
          id
        )
      );
    }
  });

  if (key.proxyId && existingIds(db, "proxy_registry", "id", [key.proxyId]).size === 0) {
    issues.push(
      issue(
        "key.proxyId",
        "PROXY_NOT_FOUND",
        `Proxy ${key.proxyId} no longer exists. Choose another proxy or clear it explicitly; without it traffic would not use the configured egress.`,
        true,
        key.proxyId
      )
    );
  }
}

function collectGroupIssues(
  db: PolicyDb,
  groupIds: string[],
  issues: TemplateReferenceIssue[]
): void {
  if (groupIds.length > 0) {
    const groupsTable = hasTable(db, "key_groups");
    const stmt = groupsTable ? db.prepare("SELECT is_active FROM key_groups WHERE id = ?") : null;
    groupIds.forEach((groupId, index) => {
      const row = stmt?.get(groupId) as Row | undefined;
      if (!row) {
        issues.push(
          issue(
            `related.groupIds.${index}`,
            "GROUP_NOT_FOUND",
            `Key group ${groupId} no longer exists. Its permissions could have restricted the key; remove the membership explicitly or pick another group.`,
            true,
            groupId
          )
        );
      } else if (falsy(row.is_active)) {
        issues.push(
          issue(
            `related.groupIds.${index}`,
            "GROUP_INACTIVE",
            `Key group ${groupId} is inactive; the membership is kept.`,
            false,
            groupId
          )
        );
      }
    });
  }
}

function collectReasoningRuleIssues(
  db: PolicyDb,
  rules: KeyTemplateReasoningRule[],
  connections: Set<string>,
  issues: TemplateReferenceIssue[]
): void {
  const ruleCombos = existingIds(
    db,
    "combos",
    "id",
    rules
      .flatMap((r) => [r.comboId, r.targetComboId])
      .filter((id): id is string => typeof id === "string")
  );
  rules.forEach((rule, index) => {
    if (rule.comboId && !ruleCombos.has(rule.comboId)) {
      issues.push(
        issue(
          `related.reasoningRules.${index}.comboId`,
          "REASONING_COMBO_NOT_FOUND",
          `Combo ${rule.comboId} no longer exists; edit or remove this reasoning rule.`,
          true,
          rule.comboId
        )
      );
    }
    if (rule.targetComboId && !ruleCombos.has(rule.targetComboId)) {
      issues.push(
        issue(
          `related.reasoningRules.${index}.targetComboId`,
          "REASONING_COMBO_NOT_FOUND",
          `Target combo ${rule.targetComboId} no longer exists; edit or remove this reasoning rule.`,
          true,
          rule.targetComboId
        )
      );
    }
    if (rule.connectionId && !connections.has(rule.connectionId)) {
      issues.push(
        issue(
          `related.reasoningRules.${index}.connectionId`,
          "REASONING_CONNECTION_NOT_FOUND",
          `Connection ${rule.connectionId} no longer exists; edit or remove this reasoning rule.`,
          true,
          rule.connectionId
        )
      );
    }
  });
}

/** Check concrete references, without dropping absent entries or broadening access. */
export function collectReferenceIssues(
  db: PolicyDb,
  policy: KeyTemplatePolicy
): TemplateReferenceIssue[] {
  const issues: TemplateReferenceIssue[] = [];
  const connections = collectConnectionReferenceIssues(db, policy, issues);
  collectComboReferenceIssues(db, policy.key, issues);
  collectQuotaAndProxyIssues(db, policy.key, issues);
  collectGroupIssues(db, policy.related.groupIds, issues);
  collectReasoningRuleIssues(db, policy.related.reasoningRules, connections, issues);
  return issues;
}

// ──────────────── Template storage ────────────────

export const KEY_TEMPLATES_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS key_templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  revision INTEGER NOT NULL DEFAULT 1 CHECK (revision > 0),
  schema_version INTEGER NOT NULL DEFAULT 1,
  policy TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
`;
export const KEY_TEMPLATES_INDEX_SQL = `
CREATE UNIQUE INDEX IF NOT EXISTS idx_key_templates_name ON key_templates(name COLLATE NOCASE);
`;

/** Lazy, idempotent table ensure (also declared in the core schema). */
export function ensureKeyTemplatesTable(db: PolicyDb): void {
  db.exec(KEY_TEMPLATES_TABLE_SQL);
  db.exec(KEY_TEMPLATES_INDEX_SQL);
}

export interface StoredKeyTemplate {
  id: string;
  name: string;
  description: string;
  revision: number;
  schemaVersion: number;
  /** Raw JSON text; validated by the caller. */
  policyJson: string;
  createdAt: string;
  updatedAt: string;
}

function rowToStored(row: Row): StoredKeyTemplate {
  return {
    id: String(row.id),
    name: String(row.name),
    description: typeof row.description === "string" ? row.description : "",
    revision: Number(row.revision),
    schemaVersion: Number(row.schema_version),
    policyJson: String(row.policy),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

export class KeyTemplateNameConflictError extends Error {
  readonly code = "TEMPLATE_NAME_CONFLICT";
}

function nameTaken(db: PolicyDb, name: string, exceptId: string | null): boolean {
  const row = db.prepare("SELECT id FROM key_templates WHERE name = ? COLLATE NOCASE").get(name) as
    Row | undefined;
  return Boolean(row && row.id !== exceptId);
}

export function listStoredTemplates(db: PolicyDb): StoredKeyTemplate[] {
  ensureKeyTemplatesTable(db);
  return (
    db.prepare("SELECT * FROM key_templates ORDER BY name COLLATE NOCASE, id").all() as Row[]
  ).map(rowToStored);
}

export function getStoredTemplate(db: PolicyDb, id: string): StoredKeyTemplate | null {
  ensureKeyTemplatesTable(db);
  const row = db.prepare("SELECT * FROM key_templates WHERE id = ?").get(id) as Row | undefined;
  return row ? rowToStored(row) : null;
}

export function insertStoredTemplate(
  db: PolicyDb,
  input: { id: string; name: string; description: string; policyJson: string; now: string }
): StoredKeyTemplate {
  ensureKeyTemplatesTable(db);
  return runImmediate(db, () => {
    if (nameTaken(db, input.name, null)) {
      throw new KeyTemplateNameConflictError(`A template named "${input.name}" already exists`);
    }
    db.prepare(
      "INSERT INTO key_templates (id,name,description,revision,schema_version,policy,created_at,updated_at) VALUES (?,?,?,1,?,?,?,?)"
    ).run(
      input.id,
      input.name,
      input.description,
      KEY_TEMPLATE_SCHEMA_VERSION,
      input.policyJson,
      input.now,
      input.now
    );
    return rowToStored(db.prepare("SELECT * FROM key_templates WHERE id = ?").get(input.id) as Row);
  });
}

export type UpdateStoredResult =
  | { status: "updated"; template: StoredKeyTemplate }
  | { status: "not_found" }
  | { status: "conflict"; currentRevision: number };

/** Compare-and-swap on `revision`; a stale revision never overwrites newer edits. */
export function updateStoredTemplate(
  db: PolicyDb,
  input: {
    id: string;
    revision: number;
    name?: string;
    description?: string;
    policyJson?: string;
    now: string;
  }
): UpdateStoredResult {
  ensureKeyTemplatesTable(db);
  return runImmediate(db, (): UpdateStoredResult => {
    const current = db.prepare("SELECT * FROM key_templates WHERE id = ?").get(input.id) as
      Row | undefined;
    if (!current) return { status: "not_found" };
    if (Number(current.revision) !== input.revision) {
      return { status: "conflict", currentRevision: Number(current.revision) };
    }
    if (input.name !== undefined && nameTaken(db, input.name, input.id)) {
      throw new KeyTemplateNameConflictError(`A template named "${input.name}" already exists`);
    }
    db.prepare(
      "UPDATE key_templates SET name = ?, description = ?, policy = ?, schema_version = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ?"
    ).run(
      input.name ?? current.name,
      input.description ?? current.description,
      input.policyJson ?? current.policy,
      KEY_TEMPLATE_SCHEMA_VERSION,
      input.now,
      input.id,
      input.revision
    );
    return {
      status: "updated",
      template: rowToStored(
        db.prepare("SELECT * FROM key_templates WHERE id = ?").get(input.id) as Row
      ),
    };
  });
}

export function deleteStoredTemplate(db: PolicyDb, id: string): boolean {
  ensureKeyTemplatesTable(db);
  const result = db.prepare("DELETE FROM key_templates WHERE id = ?").run(id);
  return Number(result.changes ?? 0) > 0;
}
