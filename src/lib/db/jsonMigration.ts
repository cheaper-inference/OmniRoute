/**
 * db/jsonMigration.ts — Shared helper to hydrate an SQLite database from a
 * legacy OmniRoute JSON backup object.
 *
 * Used by:
 *  - db/core.ts  (auto-migration at startup when db.json is found)
 *  - api/settings/import-json/route.ts  (on-demand import via dashboard)
 *
 * 🔒 Security: the caller is responsible for stripping sensitive keys
 * (password, requireLogin) from `data.settings` BEFORE passing the object
 * here, so this function never touches authentication configuration.
 */

import type { SqliteAdapter } from "./adapters/types";
import { normalizeRoutingStrategy } from "@/shared/constants/routingStrategies";
import { normalizeComboRecord } from "@/lib/combos/steps";
import { validateComboInvariant } from "@/lib/combos/invariants";
import { getTableColumns } from "./jsonMigration/columnUpsert";
import { getApiKeyImportColumns, importApiKeyRecord } from "./jsonMigration/apiKeysImport";
import { importProviderConnectionRecord } from "./jsonMigration/connectionsImport";
import {
  resolveImportedUsageAccountIdentity,
  resolveOrphanedUsageAccountIdentity,
  resolveUsageAccountIdentity,
} from "@/lib/usage/accountIdentity";

type SqliteDatabase = SqliteAdapter;

export interface LegacyJsonData {
  providerConnections?: Record<string, unknown>[];
  providerNodes?: Record<string, unknown>[];
  combos?: Record<string, unknown>[];
  apiKeys?: Record<string, unknown>[];
  settings?: Record<string, unknown>;
  modelAliases?: Record<string, unknown>;
  mitmAlias?: Record<string, unknown>;
  pricing?: Record<string, unknown>;
  customModels?: Record<string, unknown>;
  proxyConfig?: {
    global?: unknown;
    providers?: unknown;
    combos?: unknown;
    keys?: unknown;
  };
  usageHistory?: Record<string, unknown>[];
  domainCostHistory?: Record<string, unknown>[];
  domainBudgets?: Record<string, unknown>[];
  teams?: Record<string, unknown>[];
  apiKeyBillingTeamHistory?: Record<string, unknown>[];
  dailyTeamUsageSummary?: Record<string, unknown>[];
}

/**
 * Runs a single SQLite transaction that upserts all entities from a legacy
 * JSON backup into the provided database instance.
 *
 * Returns counts of what was inserted/replaced for logging.
 */
export function runJsonMigration(
  db: SqliteDatabase,
  data: LegacyJsonData
): {
  connections: number;
  nodes: number;
  combos: number;
  apiKeys: number;
  usageHistory: number;
  domainCostHistory: number;
  domainBudgets: number;
  teams: number;
  apiKeyBillingTeamHistory: number;
  dailyTeamUsageSummary: number;
} {
  const insertNode = db.prepare(`
    INSERT OR REPLACE INTO provider_nodes (id, type, name, prefix, api_type, base_url, created_at, updated_at)
    VALUES (@id, @type, @name, @prefix, @apiType, @baseUrl, @createdAt, @updatedAt)
  `);

  const insertKv = db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)"
  );

  const insertCombo = db.prepare(`
    INSERT OR REPLACE INTO combos (id, name, data, sort_order, created_at, updated_at)
    VALUES (@id, @name, @data, @sortOrder, @createdAt, @updatedAt)
  `);

  // Columns come from the live schema so columns added by later migrations are
  // restored too (jsonMigration/columnUpsert.ts).
  const connectionColumns = getTableColumns(db, "provider_connections");
  const apiKeyColumns = getApiKeyImportColumns(db);

  // UPSERT, not INSERT OR REPLACE: REPLACE deletes the parent row first and
  // api_key_billing_team_history / daily_team_usage_summary reference teams(id) with
  // ON DELETE RESTRICT, so restoring a backup over a live team would fail.
  const insertTeam = db.prepare(`
    INSERT INTO teams (
      id, name, description, status, max_budget_usd, budget_duration,
      budget_reset_at, created_at, updated_at, archived_at
    ) VALUES (
      @id, @name, @description, @status, @maxBudgetUsd, @budgetDuration,
      @budgetResetAt, @createdAt, @updatedAt, @archivedAt
    )
    ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
      description = excluded.description,
      status = excluded.status,
      max_budget_usd = excluded.max_budget_usd,
      budget_duration = excluded.budget_duration,
      budget_reset_at = excluded.budget_reset_at,
      created_at = excluded.created_at,
      updated_at = excluded.updated_at,
      archived_at = excluded.archived_at
  `);
  const insertBillingHistory = db.prepare(`
    INSERT OR REPLACE INTO api_key_billing_team_history (
      id, api_key_id, team_id, valid_from, valid_to, created_at
    ) VALUES (@id, @apiKeyId, @teamId, @validFrom, @validTo, @createdAt)
  `);
  const insertDailyTeamUsage = db.prepare(`
    INSERT OR REPLACE INTO daily_team_usage_summary (
      team_id, api_key_id, api_key_name, provider, model, service_tier, date,
      total_requests, successful_requests, total_input_tokens, total_output_tokens,
      total_cache_read_tokens, total_cache_creation_tokens, total_reasoning_tokens,
      successful_input_tokens, successful_output_tokens, successful_cache_read_tokens,
      successful_cache_creation_tokens, successful_reasoning_tokens,
      token_shapes_json, successful_token_shapes_json
    ) VALUES (
      @team_id, @api_key_id, @api_key_name, @provider, @model, @service_tier, @date,
      @total_requests, @successful_requests, @total_input_tokens, @total_output_tokens,
      @total_cache_read_tokens, @total_cache_creation_tokens, @total_reasoning_tokens,
      @successful_input_tokens, @successful_output_tokens, @successful_cache_read_tokens,
      @successful_cache_creation_tokens, @successful_reasoning_tokens,
      @token_shapes_json, @successful_token_shapes_json
    )
  `);

  const migrate = db.transaction(() => {
    // 1. Provider Connections — credentials encrypted like normal writes; existing rows
    // only get the columns the backup carries (jsonMigration/connectionsImport.ts).
    for (const conn of data.providerConnections ?? []) {
      importProviderConnectionRecord(db, connectionColumns, conn);
    }

    // 2. Provider Nodes
    for (const node of data.providerNodes ?? []) {
      insertNode.run({
        id: node.id,
        type: node.type,
        name: node.name,
        prefix: node.prefix ?? null,
        apiType: node.apiType ?? null,
        baseUrl: node.baseUrl ?? null,
        createdAt: node.createdAt ?? new Date().toISOString(),
        updatedAt: node.updatedAt ?? new Date().toISOString(),
      });
    }

    // 3. Key-Value Settings (caller must have stripped password / requireLogin)
    for (const [key, value] of Object.entries(data.settings ?? {})) {
      insertKv.run("settings", key, JSON.stringify(value));
    }

    // 4. Legacy key-value namespaces
    for (const [alias, model] of Object.entries(data.modelAliases ?? {})) {
      insertKv.run("modelAliases", alias, JSON.stringify(model));
    }
    for (const [toolName, mappings] of Object.entries(data.mitmAlias ?? {})) {
      insertKv.run("mitmAlias", toolName, JSON.stringify(mappings));
    }
    for (const [provider, models] of Object.entries(data.pricing ?? {})) {
      insertKv.run("pricing", provider, JSON.stringify(models));
    }
    for (const [providerId, models] of Object.entries(data.customModels ?? {})) {
      insertKv.run("customModels", providerId, JSON.stringify(models));
    }
    if (data.proxyConfig) {
      insertKv.run("proxyConfig", "global", JSON.stringify(data.proxyConfig.global ?? null));
      insertKv.run("proxyConfig", "providers", JSON.stringify(data.proxyConfig.providers ?? {}));
      insertKv.run("proxyConfig", "combos", JSON.stringify(data.proxyConfig.combos ?? {}));
      insertKv.run("proxyConfig", "keys", JSON.stringify(data.proxyConfig.keys ?? {}));
    }

    // 5. Combos
    for (const [index, combo] of (data.combos ?? []).entries()) {
      const config =
        combo.config && typeof combo.config === "object" && !Array.isArray(combo.config)
          ? { ...(combo.config as Record<string, unknown>) }
          : combo.config;
      if (config && typeof config === "object" && !Array.isArray(config) && "strategy" in config) {
        (config as Record<string, unknown>).strategy = normalizeRoutingStrategy(
          (config as Record<string, unknown>).strategy
        );
      }
      const normalizedCombo: Record<string, unknown> = normalizeComboRecord({
        ...combo,
        strategy: normalizeRoutingStrategy(combo.strategy),
        config,
        sortOrder: typeof combo.sortOrder === "number" ? combo.sortOrder : index + 1,
      });
      validateComboInvariant(normalizedCombo);
      insertCombo.run({
        id: normalizedCombo.id,
        name: normalizedCombo.name,
        data: JSON.stringify(normalizedCombo),
        sortOrder: normalizedCombo.sortOrder,
        createdAt: normalizedCombo.createdAt ?? new Date().toISOString(),
        updatedAt: normalizedCombo.updatedAt ?? new Date().toISOString(),
      });
    }

    // 6. API Keys — lossless for every carried column; a restore never re-activates a
    // revoked/banned/expired/inactive key (jsonMigration/apiKeysImport.ts).
    for (const apiKey of data.apiKeys ?? []) {
      importApiKeyRecord(db, apiKeyColumns, apiKey);
    }
    // 7. Teams and temporal API-key billing ownership
    for (const team of data.teams ?? []) {
      insertTeam.run({
        id: team.id,
        name: team.name,
        description: team.description ?? "",
        status: team.status === "archived" ? "archived" : "active",
        maxBudgetUsd: team.maxBudgetUsd ?? null,
        budgetDuration: team.budgetDuration ?? null,
        budgetResetAt: team.budgetResetAt ?? null,
        createdAt: team.createdAt ?? new Date().toISOString(),
        updatedAt: team.updatedAt ?? team.createdAt ?? new Date().toISOString(),
        archivedAt: team.archivedAt ?? null,
      });
    }
    for (const binding of data.apiKeyBillingTeamHistory ?? []) {
      insertBillingHistory.run({
        id: binding.id,
        apiKeyId: binding.apiKeyId,
        teamId: binding.teamId,
        validFrom: binding.validFrom,
        validTo: binding.validTo ?? null,
        createdAt: binding.createdAt ?? binding.validFrom,
      });
    }
    for (const row of data.dailyTeamUsageSummary ?? []) {
      insertDailyTeamUsage.run({
        team_id: row.team_id ?? row.teamId,
        api_key_id: row.api_key_id ?? row.apiKeyId,
        api_key_name: row.api_key_name ?? row.apiKeyName ?? null,
        provider: row.provider,
        model: row.model,
        service_tier: row.service_tier ?? row.serviceTier ?? "standard",
        date: row.date,
        total_requests: row.total_requests ?? row.totalRequests ?? 0,
        successful_requests: row.successful_requests ?? row.successfulRequests ?? 0,
        total_input_tokens: row.total_input_tokens ?? row.totalInputTokens ?? 0,
        total_output_tokens: row.total_output_tokens ?? row.totalOutputTokens ?? 0,
        total_cache_read_tokens: row.total_cache_read_tokens ?? row.totalCacheReadTokens ?? 0,
        total_cache_creation_tokens:
          row.total_cache_creation_tokens ?? row.totalCacheCreationTokens ?? 0,
        total_reasoning_tokens: row.total_reasoning_tokens ?? row.totalReasoningTokens ?? 0,
        successful_input_tokens: row.successful_input_tokens ?? row.successfulInputTokens ?? 0,
        successful_output_tokens: row.successful_output_tokens ?? row.successfulOutputTokens ?? 0,
        successful_cache_read_tokens:
          row.successful_cache_read_tokens ?? row.successfulCacheReadTokens ?? 0,
        successful_cache_creation_tokens:
          row.successful_cache_creation_tokens ?? row.successfulCacheCreationTokens ?? 0,
        successful_reasoning_tokens:
          row.successful_reasoning_tokens ?? row.successfulReasoningTokens ?? 0,
        token_shapes_json: row.token_shapes_json ?? row.tokenShapesJson ?? null,
        successful_token_shapes_json:
          row.successful_token_shapes_json ?? row.successfulTokenShapesJson ?? null,
      });
    }
    // 8. Usage History
    if (data.usageHistory && data.usageHistory.length > 0) {
      const importedConnections = new Map(
        (data.providerConnections ?? []).map((connection) => [connection.id, connection])
      );
      const insertUsageHistory = db.prepare(`
        INSERT OR REPLACE INTO usage_history (
          id, provider, model, connection_id, account_key, account_label, account_label_priority,
          api_key_id, api_key_name, billing_team_id, team_rollup_processed_at,
          tokens_input, tokens_output, tokens_cache_read, tokens_cache_creation, tokens_reasoning,
          service_tier, status, success, latency_ms, ttft_ms, error_code, combo_strategy, timestamp
        ) VALUES (
          @id, @provider, @model, @connection_id, @account_key, @account_label,
          @account_label_priority, @api_key_id, @api_key_name, @billing_team_id,
          @team_rollup_processed_at, @tokens_input, @tokens_output, @tokens_cache_read,
          @tokens_cache_creation, @tokens_reasoning, @service_tier, @status, @success,
          @latency_ms, @ttft_ms, @error_code, @combo_strategy, @timestamp
        )
      `);
      for (const row of data.usageHistory) {
        const connectionId = row.connection_id ?? row.connectionId ?? null;
        const connection = connectionId ? importedConnections.get(connectionId) : undefined;
        const fallbackIdentity = connection
          ? resolveUsageAccountIdentity(connection)
          : resolveOrphanedUsageAccountIdentity(row.provider, connectionId);
        const identity = resolveImportedUsageAccountIdentity(row, fallbackIdentity);
        insertUsageHistory.run({
          id: row.id,
          provider: row.provider ?? null,
          model: row.model ?? null,
          connection_id: connectionId,
          account_key: identity.accountKey,
          account_label: identity.accountLabel,
          account_label_priority: identity.accountLabelPriority,
          api_key_id: row.api_key_id ?? null,
          api_key_name: row.api_key_name ?? row.apiKeyName ?? null,
          billing_team_id: row.billing_team_id ?? row.billingTeamId ?? null,
          team_rollup_processed_at:
            row.team_rollup_processed_at ?? row.teamRollupProcessedAt ?? null,
          tokens_input: row.tokens_input ?? row.tokensInput ?? 0,
          tokens_output: row.tokens_output ?? row.tokensOutput ?? 0,
          tokens_cache_read: row.tokens_cache_read ?? row.tokensCacheRead ?? 0,
          tokens_cache_creation: row.tokens_cache_creation ?? row.tokensCacheCreation ?? 0,
          tokens_reasoning: row.tokens_reasoning ?? row.tokensReasoning ?? 0,
          service_tier: row.service_tier ?? row.serviceTier ?? "standard",
          status: row.status ?? null,
          success: row.success ?? 1,
          latency_ms: row.latency_ms ?? 0,
          ttft_ms: row.ttft_ms ?? 0,
          error_code: row.error_code ?? null,
          combo_strategy: row.combo_strategy ?? "direct",
          timestamp: row.timestamp,
        });
      }
    }

    // 9. Domain Cost History
    if (data.domainCostHistory && data.domainCostHistory.length > 0) {
      const insertCostHistory = db.prepare(`
        INSERT OR REPLACE INTO domain_cost_history (
          id, api_key_id, cost, timestamp
        ) VALUES (
          @id, @api_key_id, @cost, @timestamp
        )
      `);
      for (const row of data.domainCostHistory) {
        insertCostHistory.run({
          id: row.id,
          api_key_id: row.api_key_id,
          cost: row.cost,
          timestamp: row.timestamp,
        });
      }
    }
    // 10. Domain Budgets
    if (data.domainBudgets && data.domainBudgets.length > 0) {
      const insertBudgets = db.prepare(`
        INSERT OR REPLACE INTO domain_budgets (
          api_key_id, daily_limit_usd, weekly_limit_usd, monthly_limit_usd,
          warning_threshold, reset_interval, reset_time, budget_reset_at,
          last_budget_reset_at, warning_emitted_at, warning_period_start
        ) VALUES (
          @api_key_id, @daily_limit_usd, @weekly_limit_usd, @monthly_limit_usd,
          @warning_threshold, @reset_interval, @reset_time, @budget_reset_at,
          @last_budget_reset_at, @warning_emitted_at, @warning_period_start
        )
      `);
      for (const row of data.domainBudgets) {
        insertBudgets.run({
          api_key_id: row.api_key_id,
          daily_limit_usd: row.daily_limit_usd,
          weekly_limit_usd: row.weekly_limit_usd ?? 0,
          monthly_limit_usd: row.monthly_limit_usd ?? 0,
          warning_threshold: row.warning_threshold ?? 0.8,
          reset_interval: row.reset_interval ?? "daily",
          reset_time: row.reset_time ?? "00:00",
          budget_reset_at: row.budget_reset_at ?? null,
          last_budget_reset_at: row.last_budget_reset_at ?? null,
          warning_emitted_at: row.warning_emitted_at ?? null,
          warning_period_start: row.warning_period_start ?? null,
        });
      }
    }
  });

  migrate();

  return {
    connections: (data.providerConnections ?? []).length,
    nodes: (data.providerNodes ?? []).length,
    combos: (data.combos ?? []).length,
    apiKeys: (data.apiKeys ?? []).length,
    usageHistory: (data.usageHistory ?? []).length,
    domainCostHistory: (data.domainCostHistory ?? []).length,
    domainBudgets: (data.domainBudgets ?? []).length,
    teams: (data.teams ?? []).length,
    apiKeyBillingTeamHistory: (data.apiKeyBillingTeamHistory ?? []).length,
    dailyTeamUsageSummary: (data.dailyTeamUsageSummary ?? []).length,
  };
}
