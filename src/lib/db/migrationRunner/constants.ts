/**
 * db/migrationRunner/constants.ts — Static migration-compatibility data tables.
 *
 * Pure data (no imports, no DB, no behaviour) extracted verbatim from
 * migrationRunner.ts: the renamed/legacy/superseded migration maps and the
 * physical/initial schema sentinels used by the reconciliation, dedup, and
 * already-applied detection paths. Kept separate so the orchestrator host
 * file holds logic, not data tables.
 */

export const RENAMED_MIGRATION_COMPATIBILITY = [
  {
    fromVersion: "022",
    fromName: "call_logs_summary_storage",
    toVersion: "025",
    toName: "call_logs_summary_storage",
  },
  {
    // Earlier revisions used 228, 231, 233 or 236; canonical upstream rows stay put.
    // Match the name too: canonical cleanup/cache rows must never be rehomed.
    fromVersion: "228",
    fromName: "usage_history_calculated_cost",
    toVersion: "237",
    toName: "usage_history_calculated_cost",
  },
  {
    fromVersion: "231",
    fromName: "usage_history_calculated_cost",
    toVersion: "237",
    toName: "usage_history_calculated_cost",
  },
  {
    fromVersion: "233",
    fromName: "usage_history_calculated_cost",
    toVersion: "237",
    toName: "usage_history_calculated_cost",
  },
  {
    fromVersion: "236",
    fromName: "usage_history_calculated_cost",
    toVersion: "237",
    toName: "usage_history_calculated_cost",
  },
  {
    fromVersion: "028",
    fromName: "provider_connection_max_concurrent",
    toVersion: "029",
    toName: "provider_connection_max_concurrent",
  },
  {
    fromVersion: "028",
    fromName: "compression_settings",
    toVersion: "034",
    toName: "compression_settings",
  },
  {
    fromVersion: "032",
    fromName: "create_reasoning_cache",
    toVersion: "033",
    toName: "create_reasoning_cache",
  },
  {
    fromVersion: "032",
    fromName: "compression_analytics",
    toVersion: "038",
    toName: "compression_analytics",
  },
  {
    fromVersion: "033",
    fromName: "compression_cache_stats",
    toVersion: "039",
    toName: "compression_cache_stats",
  },
  {
    fromVersion: "041",
    fromName: "session_account_affinity",
    toVersion: "050",
    toName: "session_account_affinity",
  },
  {
    fromVersion: "051",
    fromName: "usage_history_service_tier",
    toVersion: "054",
    toName: "usage_history_service_tier",
  },
  {
    fromVersion: "052",
    fromName: "manifest_routing",
    toVersion: "059",
    toName: "manifest_routing",
  },
  {
    fromVersion: "056",
    fromName: "manifest_routing",
    toVersion: "059",
    toName: "manifest_routing",
  },
  {
    fromVersion: "123",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "151",
    toName: "windsurf_to_devin_desktop",
  },
  {
    fromVersion: "124",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "151",
    toName: "windsurf_to_devin_desktop",
  },
  {
    fromVersion: "125",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "151",
    toName: "windsurf_to_devin_desktop",
  },
  {
    fromVersion: "126",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "151",
    toName: "windsurf_to_devin_desktop",
  },
  {
    fromVersion: "127",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "151",
    toName: "windsurf_to_devin_desktop",
  },
  {
    fromVersion: "128",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "151",
    toName: "windsurf_to_devin_desktop",
  },
  {
    fromVersion: "131",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "151",
    toName: "windsurf_to_devin_desktop",
  },
  {
    // 133 collided with 133_call_logs_session_tag once that landed on release.
    fromVersion: "133",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "151",
    toName: "windsurf_to_devin_desktop",
  },
  {
    // 135 and 136 are canonical release migrations now.
    fromVersion: "135",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "151",
    toName: "windsurf_to_devin_desktop",
  },
  {
    fromVersion: "136",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "151",
    toName: "windsurf_to_devin_desktop",
  },
  {
    // 139 and 140 are occupied by CCR and connection runtime state.
    fromVersion: "139",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "151",
    toName: "windsurf_to_devin_desktop",
  },
  {
    fromVersion: "140",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "151",
    toName: "windsurf_to_devin_desktop",
  },
  {
    // 143 is the API-key cache mode; 144–145 are the stacked Radar caches.
    fromVersion: "143",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "151",
    toName: "windsurf_to_devin_desktop",
  },
  {
    // 144 was published by this PR before the Radar reservation landed.
    fromVersion: "144",
    fromName: "windsurf_to_devin_desktop",
    toVersion: "151",
    toName: "windsurf_to_devin_desktop",
  },
  {
    // inspector_custom_hosts was once published in slot 074, now occupied by
    // discovery_results. Its canonical idempotent migration lives at 081.
    fromVersion: "074",
    fromName: "inspector_custom_hosts",
    toVersion: "081",
    toName: "inspector_custom_hosts",
  },
  // Vacate feature slot 215 before Team history is rehomed there.
  {
    // Published cache reporting used slots now owned by canonical release migrations.
    fromVersion: "206",
    fromName: "daily_cached_input",
    toVersion: "231",
    toName: "daily_cached_input",
  },
  {
    fromVersion: "213",
    fromName: "daily_cached_input",
    toVersion: "231",
    toName: "daily_cached_input",
  },
  {
    fromVersion: "214",
    fromName: "daily_cached_input",
    toVersion: "231",
    toName: "daily_cached_input",
  },
  {
    fromVersion: "215",
    fromName: "daily_cached_input",
    toVersion: "231",
    toName: "daily_cached_input",
  },
  {
    fromVersion: "217",
    fromName: "daily_cached_input",
    toVersion: "231",
    toName: "daily_cached_input",
  },
  {
    fromVersion: "218",
    fromName: "daily_cached_input",
    toVersion: "231",
    toName: "daily_cached_input",
  },
  {
    fromVersion: "223",
    fromName: "daily_cached_input",
    toVersion: "231",
    toName: "daily_cached_input",
  },
  {
    fromVersion: "224",
    fromName: "daily_cached_input",
    toVersion: "231",
    toName: "daily_cached_input",
  },
  {
    fromVersion: "225",
    fromName: "daily_cached_input",
    toVersion: "231",
    toName: "daily_cached_input",
  },
  {
    fromVersion: "226",
    fromName: "daily_cached_input",
    toVersion: "231",
    toName: "daily_cached_input",
  },
  {
    fromVersion: "228",
    fromName: "daily_cached_input",
    toVersion: "231",
    toName: "daily_cached_input",
  },
  {
    fromVersion: "229",
    fromName: "daily_cached_input",
    toVersion: "231",
    toName: "daily_cached_input",
  },
  {
    // Earlier traffic candidates occupied slots now owned by release migrations.
    fromVersion: "206",
    fromName: "proxy_payload_traffic",
    toVersion: "232",
    toName: "proxy_payload_traffic",
  },
  {
    fromVersion: "207",
    fromName: "proxy_payload_traffic",
    toVersion: "232",
    toName: "proxy_payload_traffic",
  },
  {
    fromVersion: "213",
    fromName: "proxy_payload_traffic",
    toVersion: "232",
    toName: "proxy_payload_traffic",
  },
  {
    fromVersion: "214",
    fromName: "proxy_payload_traffic",
    toVersion: "232",
    toName: "proxy_payload_traffic",
  },
  {
    fromVersion: "215",
    fromName: "proxy_payload_traffic",
    toVersion: "232",
    toName: "proxy_payload_traffic",
  },
  {
    fromVersion: "217",
    fromName: "proxy_payload_traffic",
    toVersion: "232",
    toName: "proxy_payload_traffic",
  },
  {
    fromVersion: "218",
    fromName: "proxy_payload_traffic",
    toVersion: "232",
    toName: "proxy_payload_traffic",
  },
  {
    fromVersion: "223",
    fromName: "proxy_payload_traffic",
    toVersion: "232",
    toName: "proxy_payload_traffic",
  },
  {
    fromVersion: "224",
    fromName: "proxy_payload_traffic",
    toVersion: "232",
    toName: "proxy_payload_traffic",
  },
  {
    fromVersion: "225",
    fromName: "proxy_payload_traffic",
    toVersion: "232",
    toName: "proxy_payload_traffic",
  },
  {
    fromVersion: "226",
    fromName: "proxy_payload_traffic",
    toVersion: "232",
    toName: "proxy_payload_traffic",
  },
  {
    fromVersion: "228",
    fromName: "proxy_payload_traffic",
    toVersion: "232",
    toName: "proxy_payload_traffic",
  },
  {
    fromVersion: "229",
    fromName: "proxy_payload_traffic",
    toVersion: "232",
    toName: "proxy_payload_traffic",
  },
  // PR #19311 (key policy templates) published key_templates in slots 228, 230, 231,
  // 232 and 234 before release claimed them (purge_orphaned_provider_catalogs,
  // call_logs_cache_write_tiers, daily_cached_input, proxy_payload_traffic,
  // agent_sessions). Rehome those ledger rows to 236 so the canonical release
  // migrations in the vacated slots still run.
  {
    fromVersion: "228",
    fromName: "key_templates",
    toVersion: "236",
    toName: "key_templates",
  },
  {
    fromVersion: "230",
    fromName: "key_templates",
    toVersion: "236",
    toName: "key_templates",
  },
  {
    fromVersion: "231",
    fromName: "key_templates",
    toVersion: "236",
    toName: "key_templates",
  },
  {
    fromVersion: "232",
    fromName: "key_templates",
    toVersion: "236",
    toName: "key_templates",
  },
  {
    fromVersion: "234",
    fromName: "key_templates",
    toVersion: "236",
    toName: "key_templates",
  },
  // PR #10409 circulated through these draft slots before the current release
  // claimed them. The name guard is mandatory: canonical migrations using the
  // same numbers must never be rehomed as Team state.
  {
    fromVersion: "153",
    fromName: "team_cost_centers",
    toVersion: "215",
    toName: "team_cost_centers",
  },
  {
    fromVersion: "154",
    fromName: "team_cost_centers",
    toVersion: "215",
    toName: "team_cost_centers",
  },
  {
    fromVersion: "155",
    fromName: "team_cost_centers",
    toVersion: "215",
    toName: "team_cost_centers",
  },
  {
    fromVersion: "161",
    fromName: "team_cost_centers",
    toVersion: "215",
    toName: "team_cost_centers",
  },
  {
    fromVersion: "163",
    fromName: "team_cost_centers",
    toVersion: "215",
    toName: "team_cost_centers",
  },
  {
    fromVersion: "164",
    fromName: "team_cost_centers",
    toVersion: "215",
    toName: "team_cost_centers",
  },
  {
    // A later pushed #14771 build used the upstream mirror-URL slot.
    fromVersion: "218",
    fromName: "api_key_self_service_settings",
    toVersion: "233",
    toName: "api_key_self_service_settings",
  },
  {
    // The index also circulated as 207 before upstream provider cleanup claimed it.
    fromVersion: "207",
    fromName: "recreate_turn_nodes_content_hash_index",
    toVersion: "211",
    toName: "recreate_turn_nodes_content_hash_index",
  },
  {
    fromVersion: "134",
    fromName: "ccr_blocks",
    toVersion: "139",
    toName: "ccr_blocks",
  },
  {
    fromVersion: "139",
    fromName: "job_registry",
    toVersion: "146",
    toName: "job_registry",
  },
  {
    // The cumulative Radar branch used 143 before 143_api_key_cache_default_mode
    // landed on release/v3.8.50. Rehome already-applied Radar rows to the next
    // free slot so the canonical API-key migration can still run.
    fromVersion: "143",
    fromName: "radar_local_model_state",
    toVersion: "153",
    toName: "radar_local_model_state",
  },
  {
    // npm omniroute@3.8.50 was built from main at dea6bb8 (per its provenance
    // attestation), which shipped model_capabilities as 163. 70f5d4cbf then moved it
    // to 169 so 163_radar_feed_cache_generated_at could keep its slot. Without this
    // entry, a database first migrated by that npm build keeps its 163 ledger row,
    // so the release's 163 is treated as applied and never runs: radar_feed_cache
    // never gets generated_at, and every boot logs the renumbering CRITICAL.
    fromVersion: "163",
    fromName: "model_capabilities",
    toVersion: "169",
    toName: "model_capabilities",
  },
  {
    fromVersion: "056",
    fromName: "provider_default",
    toVersion: "056",
    toName: "mcp_accessibility_compression",
  },
  {
    fromVersion: "073",
    fromName: "discovery_results",
    toVersion: "073",
    toName: "per_model_token_limits",
  },
  {
    fromVersion: "077",
    fromName: "plugin_metrics",
    toVersion: "077",
    toName: "api_key_stream_default_mode",
  },
  {
    fromVersion: "101",
    fromName: "proxy_pool_rotation",
    toVersion: "101",
    toName: "api_key_usage_limits",
  },
  {
    // Early self-service stack builds occupied the upstream attempt-timing slot.
    fromVersion: "194",
    fromName: "api_key_self_service_settings",
    toVersion: "233",
    toName: "api_key_self_service_settings",
  },
  {
    // Later self-service stack builds (#14771) used 197, now proxy_subscription_core_config.
    fromVersion: "197",
    fromName: "api_key_self_service_settings",
    toVersion: "233",
    toName: "api_key_self_service_settings",
  },
  {
    // #14771 builds then used 207, now remove_opencode_free_provider.
    fromVersion: "207",
    fromName: "api_key_self_service_settings",
    toVersion: "233",
    toName: "api_key_self_service_settings",
  },
  {
    // #14771 builds shipped the turn-node index recreate as 206 (now codex_wakeup_tasks);
    // release/v3.8.53 ships the same migration as 211.
    fromVersion: "206",
    fromName: "recreate_turn_nodes_content_hash_index",
    toVersion: "211",
    toName: "recreate_turn_nodes_content_hash_index",
  },
  {
    // #14771 builds on release/v3.8.53 then used 213, now api_key_preferred_connections.
    fromVersion: "213",
    fromName: "api_key_self_service_settings",
    toVersion: "233",
    toName: "api_key_self_service_settings",
  },
  {
    // #14771 builds then used 228, now purge_orphaned_provider_catalogs.
    fromVersion: "228",
    fromName: "api_key_self_service_settings",
    toVersion: "233",
    toName: "api_key_self_service_settings",
  },
  {
    // #14771 builds then used 229, now api_key_five_hour_limit.
    fromVersion: "229",
    fromName: "api_key_self_service_settings",
    toVersion: "233",
    toName: "api_key_self_service_settings",
  },
  // Agent-session builds (#14833) shipped agent_sessions + usage_history.agent_session_id
  // as 190/191, 197/198, 198/199, 208/209, 214/215, 230/231 and 229/230. Upstream owns all of
  // those slots; the migrations now live at 234/235. Each entry is name-locked.
  {
    fromVersion: "190",
    fromName: "agent_sessions",
    toVersion: "234",
    toName: "agent_sessions",
  },
  {
    fromVersion: "191",
    fromName: "usage_history_agent_session_id",
    toVersion: "235",
    toName: "usage_history_agent_session_id",
  },
  {
    fromVersion: "197",
    fromName: "agent_sessions",
    toVersion: "234",
    toName: "agent_sessions",
  },
  {
    fromVersion: "198",
    fromName: "usage_history_agent_session_id",
    toVersion: "235",
    toName: "usage_history_agent_session_id",
  },
  {
    fromVersion: "198",
    fromName: "agent_sessions",
    toVersion: "234",
    toName: "agent_sessions",
  },
  {
    fromVersion: "199",
    fromName: "usage_history_agent_session_id",
    toVersion: "235",
    toName: "usage_history_agent_session_id",
  },
  {
    fromVersion: "208",
    fromName: "agent_sessions",
    toVersion: "234",
    toName: "agent_sessions",
  },
  {
    fromVersion: "209",
    fromName: "usage_history_agent_session_id",
    toVersion: "235",
    toName: "usage_history_agent_session_id",
  },
  {
    fromVersion: "214",
    fromName: "agent_sessions",
    toVersion: "234",
    toName: "agent_sessions",
  },
  {
    fromVersion: "215",
    fromName: "usage_history_agent_session_id",
    toVersion: "235",
    toName: "usage_history_agent_session_id",
  },
  {
    fromVersion: "229",
    fromName: "agent_sessions",
    toVersion: "234",
    toName: "agent_sessions",
  },
  {
    fromVersion: "230",
    fromName: "usage_history_agent_session_id",
    toVersion: "235",
    toName: "usage_history_agent_session_id",
  },
  {
    fromVersion: "230",
    fromName: "agent_sessions",
    toVersion: "234",
    toName: "agent_sessions",
  },
  {
    fromVersion: "231",
    fromName: "usage_history_agent_session_id",
    toVersion: "235",
    toName: "usage_history_agent_session_id",
  },
] as const;

export const LEGACY_VERSION_SLOT_MIGRATIONS = [
  { version: "028", name: "evals_tables" },
  { version: "029", name: "webhooks_templates" },
  { version: "030", name: "mcp_scopes_api_keys" },
  { version: "031", name: "api_keys_expires" },
  { version: "032", name: "detailed_logs_warnings" },
  { version: "033", name: "provider_connections_block_extra_usage" },
  { version: "033", name: "add_batch_id_to_call_logs" },
  { version: "046", name: "remove_status_from_files" },
  { version: "051", name: "remove_status_from_files" },
  // A renumbering shifted 140-143 in pairs, leaving the ledger holding the old
  // arrangement: ccr_blocks at 139 and 140, api_key_cache_default_mode at 141
  // and 143. In each pair exactly one row still matches a file (ccr_blocks at
  // 139, api_key_cache_default_mode at 143), so only the other row is listed
  // here. Its occupancy is what stopped the file now belonging at that version
  // from being back-filled; radar_referrals_cache and the two
  // proxy_subscriptions columns were the visible casualties. Releasing a slot
  // replays that version's file after everything newer has run, so an entry here
  // needs a file that is safe out of order, or a guard in isSchemaAlreadyApplied
  // (178 has one: its file would otherwise overwrite the trigger 203 installed).
  { version: "140", name: "ccr_blocks" },
  { version: "141", name: "api_key_cache_default_mode" },
  { version: "142", name: "connection_runtime_state" },
  { version: "176", name: "provider_connection_synced_models_at" },
  { version: "177", name: "xp_action_counts" },
  { version: "178", name: "memory_fts_skip_access_updates" },
  { version: "197", name: "model_capabilities_reasoning_efforts" },
] as const;

export const SUPERSEDED_DUPLICATE_MIGRATIONS = [
  {
    version: "041",
    name: "session_account_affinity",
    supersededByVersion: "050",
    supersededByName: "session_account_affinity",
  },
] as const;

export const PHYSICAL_SCHEMA_SENTINELS = [
  { version: "028", tableName: "batches", description: "batches table" },
  { version: "024", tableName: "sync_tokens", description: "sync_tokens table" },
  { version: "022", tableName: "memory_fts", description: "memory_fts virtual table" },
  { version: "019", tableName: "context_handoffs", description: "context_handoffs table" },
  {
    version: "064",
    tableName: "session_model_history",
    description: "session_model_history table",
  },
  { version: "017", tableName: "version_manager", description: "version_manager table" },
  { version: "016", tableName: "skill_executions", description: "skill_executions table" },
  { version: "015", tableName: "memories", description: "memories table" },
  { version: "013", tableName: "quota_snapshots", description: "quota_snapshots table" },
  { version: "011", tableName: "webhooks", description: "webhooks table" },
  { version: "010", tableName: "model_combo_mappings", description: "model_combo_mappings table" },
  { version: "008", tableName: "registered_keys", description: "registered_keys table" },
  { version: "006", tableName: "request_detail_logs", description: "request_detail_logs table" },
  { version: "004", tableName: "proxy_registry", description: "proxy_registry table" },
  { version: "002", tableName: "mcp_tool_audit", description: "mcp_tool_audit table" },
] as const;

export const INITIAL_SCHEMA_SENTINELS = ["provider_connections", "combos", "call_logs"] as const;
// "178" (#13717) and "203" (#15707) recreate memory_fts and hard-fail on sql.js/no-FTS5
// drivers. If #13331 (adds "180") lands before this, reconcile to the union
// ({"022","023","178","180","203"}) and update the assertion in
// tests/unit/db-migrationrunner-constants-split.test.ts accordingly.
export const OPTIONAL_FTS5_MIGRATION_VERSIONS = new Set(["022", "023", "178", "203"]);
