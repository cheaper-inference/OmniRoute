---
title: "OmniRoute Documentation"
version: 3.8.54
lastUpdated: 2026-11-16
---

# OmniRoute Documentation

Guides, references and operating procedures for OmniRoute, grouped by task. Start with
the user guides for installation and daily use; use the technical sections for API,
routing, integrations and maintenance.

> Looking for the project overview, install steps, or release notes? See the root [README.md](../README.md), [ROADMAP.md](../ROADMAP.md), [CHANGELOG.md](../CHANGELOG.md), and [CONTRIBUTING.md](../CONTRIBUTING.md).

---

## Complete source documentation index

This index covers the source documentation outside translated mirrors, including
supporting notes and historical fragments. The latter have their own section and do
not establish current product behavior. Translations are linked under [i18n](#i18n).

| Start here                             | Reference and implementation                        | Operations and supporting material                                          |
| -------------------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------- |
| [Getting started](#getting-started)    | [Architecture](#architecture)                       | [Operations](#ops)                                                          |
| [User and integration guides](#guides) | [API and catalog reference](#reference)             | [Security](#security)                                                       |
| [Provider guides](#providers)          | [Agent frameworks](#frameworks)                     | [Development notes](#overview-and-development-notes)                        |
| [Service integrations](#integrations)  | [Routing](#routing) and [compression](#compression) | [Supporting and historical documents](#supporting-and-historical-documents) |

## For Non-Tech Users

Simple guides for using OmniRoute — no technical background needed.

### getting-started/

- [QUICK-START.md](getting-started/QUICK-START.md) — install and run OmniRoute in 3 minutes.
- [AUTO-COMBO-GUIDE.md](getting-started/AUTO-COMBO-GUIDE.md) — let OmniRoute pick the best AI for you.
- [PROVIDERS-GUIDE.md](getting-started/PROVIDERS-GUIDE.md) — how to connect AI providers.
- [FREE-TIERS-GUIDE.md](getting-started/FREE-TIERS-GUIDE.md) — free-tier options, eligibility and setup.
- [WEB-COOKIE-GUIDE.md](getting-started/WEB-COOKIE-GUIDE.md) — web cookie providers (session-credential setup).
- [SELF_HOST_GUIDE.md](getting-started/SELF_HOST_GUIDE.md) — Self-Host Guide — OmniRoute.

### guides/

- [SETUP_GUIDE.md](guides/SETUP_GUIDE.md) — first-time setup of OmniRoute.
- [USER_GUIDE.md](guides/USER_GUIDE.md) — daily usage of the dashboard and API.
- [THINKING_BUDGET.md](guides/THINKING_BUDGET.md) — thinking/reasoning budget modes (passthrough vs auto-strip).
- [FEATURES.md](guides/FEATURES.md) — dashboard feature gallery.
- [CHAOS-MODE.md](guides/CHAOS-MODE.md) — multi-model parallel/collaborative execution (setup, permissions, API).
- [TIERS.md](guides/TIERS.md) — OmniRoute tiers explained (user guide).
- [USAGE_QUOTA_GUIDE.md](guides/USAGE_QUOTA_GUIDE.md) — usage, quota & spend tracking.
- [COST_TRACKING.md](guides/COST_TRACKING.md) — cost and spend tracking.
- [TEAM_COST_CENTERS.md](guides/TEAM_COST_CENTERS.md) — Team billing attribution, reports, and soft shared budgets.
- [FREE_PROVIDER_RANKINGS.md](guides/FREE_PROVIDER_RANKINGS.md) — free provider rankings (Arena ELO).
- [DOCKER_GUIDE.md](guides/DOCKER_GUIDE.md) — running OmniRoute under Docker, including runtime RAM for coding agents.
- [ELECTRON_GUIDE.md](guides/ELECTRON_GUIDE.md) — desktop (Electron) builds.
- [TERMUX_GUIDE.md](guides/TERMUX_GUIDE.md) — running on Android via Termux.
- [PWA_GUIDE.md](guides/PWA_GUIDE.md) — installing the dashboard as a PWA.
- [REMOTE-MODE.md](guides/REMOTE-MODE.md) — exposing OmniRoute remotely + scoped tokens.
- [HEADLESS.md](guides/HEADLESS.md) — headless mode: proxy engine only, no dashboard (`OMNIROUTE_HEADLESS=1` / `serve --headless`).
- [CLI-INTEGRATIONS.md](guides/CLI-INTEGRATIONS.md) — master table of `setup-*` CLI integrations.
- [OPENCODE-V2-PLUGIN.md](guides/OPENCODE-V2-PLUGIN.md) — installing and configuring the OpenCode v2 plugin.
- [CLAUDE-CODE-CONFIGURATION.md](guides/CLAUDE-CODE-CONFIGURATION.md) — Claude Code CLI with OmniRoute.
- [CODEX-CLI-CONFIGURATION.md](guides/CODEX-CLI-CONFIGURATION.md) — Codex CLI with OmniRoute.
- [KIRO_SETUP.md](guides/KIRO_SETUP.md) — Kiro setup.
- [ANTIGRAVITY-ONBOARDING.md](guides/ANTIGRAVITY-ONBOARDING.md) — Antigravity (Google One AI) onboarding.
- [MANAGEMENT-AUTH.md](guides/MANAGEMENT-AUTH.md) — management authentication.
- [I18N.md](guides/I18N.md) — translation and locale workflow.
- [TROUBLESHOOTING.md](guides/TROUBLESHOOTING.md) — detailed troubleshooting reference.
- [UNINSTALL.md](guides/UNINSTALL.md) — clean removal steps.
- [CHATGPT-WEB-PERSISTENT-CDP.md](guides/CHATGPT-WEB-PERSISTENT-CDP.md) — ChatGPT Web: persistent CDP profile.
- [CLI-COMPANION.md](guides/CLI-COMPANION.md) — CLI Companion.
- [CLI-LAUNCH-CONTRACTS.md](guides/CLI-LAUNCH-CONTRACTS.md) — Shared CLI launch and configuration contracts.
- [CLI-MANUAL-MODELS.md](guides/CLI-MANUAL-MODELS.md) — CLI model catalog and manual metadata.
- [CLI-SMOKE-TESTS.md](guides/CLI-SMOKE-TESTS.md) — Isolated CLI smoke tests.
- [CODEX-APP-SERVER-PROVIDER.md](guides/CODEX-APP-SERVER-PROVIDER.md) — OpenAI Codex — App-Server provider (`codex-app-server`).
- [CUSTOM_JSON_API.md](guides/CUSTOM_JSON_API.md) — Custom JSON API provider nodes.
- [DOCKER_MODEL_RUNNER.md](guides/DOCKER_MODEL_RUNNER.md) — Docker Model Runner.
- [GROK_IMAGES.md](guides/GROK_IMAGES.md) — Grok Image Generation.
- [KEY-TEMPLATES.md](guides/KEY-TEMPLATES.md) — Key Templates.
- [LOCAL_OLLAMA_DOCKER.md](guides/LOCAL_OLLAMA_DOCKER.md) — Local Ollama + Docker OmniRoute.
- [MODEL-VALIDATION.md](guides/MODEL-VALIDATION.md) — Validate and add a custom chat model.
- [SESSION-SYNC-EXTENSION.md](guides/SESSION-SYNC-EXTENSION.md) — Browser Session Sync Extension.
- [VSCODE-COPILOT.md](guides/VSCODE-COPILOT.md) — VS Code Copilot Chat — OmniCopilot extension.

---

## For Tech Users

Technical documentation for developers and contributors.

## Overview and development notes

Cross-cutting runtime guides and development context.

- [DEVELOPER-ENVIRONMENT.md](DEVELOPER-ENVIRONMENT.md) — Developer environment notes.
- [DEVIN_CLAUDE_BRIDGE.md](DEVIN_CLAUDE_BRIDGE.md) — Devin Claude Bridge.
- [OMNIROUTE_ALLOCATION_HANDOFF.md](OMNIROUTE_ALLOCATION_HANDOFF.md) — OmniRoute Allocation Handoff.
- [OMNIROUTE_PROVIDER_FAILOVER.md](OMNIROUTE_PROVIDER_FAILOVER.md) — OmniRoute Provider Failover.
- [OMNIROUTE_QUOTA_TELEMETRY.md](OMNIROUTE_QUOTA_TELEMETRY.md) — OmniRoute Quota Telemetry.
- [OMNIROUTE_ROUTING_POLICY.md](OMNIROUTE_ROUTING_POLICY.md) — OmniRoute Routing Policy.

## architecture/

How the system is put together — read these to understand the runtime, code layout, and resilience model.

- [ARCHITECTURE.md](architecture/ARCHITECTURE.md) — high-level system architecture (request pipeline, layers, modules).
- [CODEBASE_DOCUMENTATION.md](architecture/CODEBASE_DOCUMENTATION.md) — engineering reference for the codebase.
- [REPOSITORY_MAP.md](architecture/REPOSITORY_MAP.md) — directory-by-directory navigation guide.
- [AUTHZ_GUIDE.md](architecture/AUTHZ_GUIDE.md) — authorization pipeline (route classifier + policy engine).
- [RESILIENCE_GUIDE.md](architecture/RESILIENCE_GUIDE.md) — provider circuit breaker, connection cooldown, and model lockout.
- [QUALITY_GATES.md](architecture/QUALITY_GATES.md) — quality-gate scripts and CI jobs inventory.
- [MONITORING_SECTIONS.md](architecture/MONITORING_SECTIONS.md) — monitoring/costs dashboard navigation.
- [cluster-decisions.md](architecture/cluster-decisions.md) — optional sidecar/cluster profile decisions.
- [DESIGN_SYSTEM.md](architecture/DESIGN_SYSTEM.md) — design system & visual identity.
- [ROUTER_BACKENDS.md](architecture/ROUTER_BACKENDS.md) — router backends & embedded services architecture contract (ADR).
- [admission-lanes.md](architecture/admission-lanes.md) — the two admission-lane systems and what gates each.
- [persistence-backend-boundary.md](architecture/persistence-backend-boundary.md) — pluggable persistence boundary (ADR).
- [ADAPTIVE_ROUTING.md](architecture/ADAPTIVE_ROUTING.md) — Adaptive Routing: Routing Events, Quality Feedback & Explainability.
- [MODIFICATION_SCENARIOS.md](architecture/MODIFICATION_SCENARIOS.md) — Common Modification Scenarios — full recipes.
- [QUALITY_EVIDENCE_CONTRACT.md](architecture/QUALITY_EVIDENCE_CONTRACT.md) — Quality evidence contract.

## reference/

Lookup material — API surface, environment variables, CLI flags, provider catalog.

- [API_REFERENCE.md](reference/API_REFERENCE.md) — REST API endpoints and shapes.
- [PROVIDER_REFERENCE.md](reference/PROVIDER_REFERENCE.md) — auto-generated provider catalog (do not edit by hand).
- [REMOVED_PROVIDERS.md](reference/REMOVED_PROVIDERS.md) — providers removed at their operator's request; never reintroduce without written permission.
- [PROVIDER_PLUGIN_MANIFEST.md](reference/PROVIDER_PLUGIN_MANIFEST.md) — sidecar-safe provider plugin contract for Bifrost and CLIProxyAPI migration.
- [openapi.yaml](openapi.yaml) — OpenAPI spec for the public API.
- [ENVIRONMENT.md](reference/ENVIRONMENT.md) — environment variables reference.
- [FEATURE_FLAGS.md](reference/FEATURE_FLAGS.md) — feature flags and their defaults.
- [CLI-TOOLS.md](reference/CLI-TOOLS.md) — coding-tool and agent catalog.
- [FREE_TIERS.md](reference/FREE_TIERS.md) — free-tier LLM provider directory.
- [FREE_PROXIES_API.md](reference/FREE_PROXIES_API.md) — free proxies API.
- [RELAY_BACKEND_STRATEGY.md](reference/RELAY_BACKEND_STRATEGY.md) — relay backend strategy.
- [RELAY_TROUBLESHOOTING.md](reference/RELAY_TROUBLESHOOTING.md) — relay troubleshooting.
- [EMBEDDINGS.md](reference/EMBEDDINGS.md) — Embeddings client runbook.
- [OPENAI_COMPATIBILITY.md](reference/OPENAI_COMPATIBILITY.md) — OpenAI-compatible protocol.
- [OPENCODE-SESSION-IDENTITY.md](reference/OPENCODE-SESSION-IDENTITY.md) — OpenCode conversation identity.

## frameworks/

Pluggable subsystems exposed to clients, agents, and operators.

- [MCP-SERVER.md](frameworks/MCP-SERVER.md) — Model Context Protocol server.
- [A2A-SERVER.md](frameworks/A2A-SERVER.md) — Agent-to-Agent (A2A) JSON-RPC server.
- [ACP.md](frameworks/ACP.md) — Agent Client Protocol.
- [AGENT_PROTOCOLS_GUIDE.md](frameworks/AGENT_PROTOCOLS_GUIDE.md) — A2A / ACP / Cloud agent overview.
- [AGENTBRIDGE.md](frameworks/AGENTBRIDGE.md) — IDE agent bridge.
- [AGENT-SKILLS.md](frameworks/AGENT-SKILLS.md) — agent skills catalog.
- [CLOUD_AGENT.md](frameworks/CLOUD_AGENT.md) — cloud agent runtime and providers.
- [SKILLS.md](frameworks/SKILLS.md) — Skills framework (sandboxed extension).
- [MEMORY.md](frameworks/MEMORY.md) — persistent memory (FTS5 + Qdrant).
- [WEBHOOKS.md](frameworks/WEBHOOKS.md) — webhook events and dispatch.
- [EVALS.md](frameworks/EVALS.md) — eval suites.
- [GAMIFICATION.md](frameworks/GAMIFICATION.md) — gamification & leaderboard system.
- [EMBEDDED-SERVICES.md](frameworks/EMBEDDED-SERVICES.md) — embedded sidecar services (9Router, CLIProxyAPI).
- [NOTION_CONTEXT.md](frameworks/NOTION_CONTEXT.md) — Notion context source.
- [OBSIDIAN_CONTEXT.md](frameworks/OBSIDIAN_CONTEXT.md) — Obsidian context source.
- [LOCAL_CORPUS_CONTEXT.md](frameworks/LOCAL_CORPUS_CONTEXT.md) — local corpus context source (approved directory exposed to MCP).
- [OPENCODE.md](frameworks/OPENCODE.md) — OpenCode integration.
- [OPEN_SSE_ARCHITECTURE.md](frameworks/OPEN_SSE_ARCHITECTURE.md) — open-sse streaming engine internals.
- [PLAYGROUND_STUDIO.md](frameworks/PLAYGROUND_STUDIO.md) — Playground Studio UI.
- [SEARCH_TOOLS_STUDIO.md](frameworks/SEARCH_TOOLS_STUDIO.md) — Search Tools Studio UI.
- [TRAFFIC_INSPECTOR.md](frameworks/TRAFFIC_INSPECTOR.md) — traffic inspector (MITM).
- [PLUGINS.md](frameworks/PLUGINS.md) — CLI plugin system overview.
- [PLUGIN_SDK.md](frameworks/PLUGIN_SDK.md) — plugin SDK reference.
- [PLUGIN_MARKETPLACE.md](frameworks/PLUGIN_MARKETPLACE.md) — plugin marketplace.
- [RADAR.md](frameworks/RADAR.md) — Radar free-model catalog overlay (optional, off by default).
- [LOG-EXPORT.md](frameworks/LOG-EXPORT.md) — Log export.

## routing/

Combo routing, scoring, and replay.

- [AUTO-COMBO.md](routing/AUTO-COMBO.md) — Auto-Combo scoring and routing-strategy reference.
- [QUOTA_SHARE.md](routing/QUOTA_SHARE.md) — quota sharing engine.
- [REASONING_REPLAY.md](routing/REASONING_REPLAY.md) — reasoning replay cache.
- [REASONING_ROUTING.md](routing/REASONING_ROUTING.md) — reasoning routing rules (effort/budget rule engine).
- [API_KEY_CONNECTION_PREFERENCE.md](routing/API_KEY_CONNECTION_PREFERENCE.md) — API-key connection preference.
- [DETERMINISTIC_ROUTING.md](routing/DETERMINISTIC_ROUTING.md) — Deterministic routing strategies.
- [EMPTY_TURNS.md](routing/EMPTY_TURNS.md) — Valid empty assistant turns.
- [MODEL_EXPOSURE_LIST.md](routing/MODEL_EXPOSURE_LIST.md) — Model Exposure Allow/Deny List.
- [MODEL_INTELLIGENCE.md](routing/MODEL_INTELLIGENCE.md) — Model Intelligence — How It Works.
- [PROXY_CORE_CONFIG.md](routing/PROXY_CORE_CONFIG.md) — Local proxy-core configuration (opt-in).
- [SELF_HOSTED_OPENAI_ENTRY.md](routing/SELF_HOSTED_OPENAI_ENTRY.md) — Self-hosted unified OpenAI-compatible entry.
- [STRICT_ZERO_COST.md](routing/STRICT_ZERO_COST.md) — STRICT_ZERO_COST.
- [SUBSCRIPTION_LADDER.md](routing/SUBSCRIPTION_LADDER.md) — Subscription-first routing.

## security/

Guardrails, compliance, stealth, and the mandatory patterns for handling public credentials and error messages.

- [GUARDRAILS.md](security/GUARDRAILS.md) — PII, prompt injection, vision guardrails.
- [COMPLIANCE.md](security/COMPLIANCE.md) — audit trails and compliance.
- [STEALTH_GUIDE.md](security/STEALTH_GUIDE.md) — TLS / fingerprint stealth.
- [PUBLIC_CREDS.md](security/PUBLIC_CREDS.md) — **mandatory** pattern for embedding public upstream OAuth client_id/secret + Firebase Web keys without tripping secret scanners.
- [ERROR_SANITIZATION.md](security/ERROR_SANITIZATION.md) — **mandatory** pattern for routing every error response through `sanitizeErrorMessage` to prevent stack-trace exposure.
- [ROUTE_GUARD_TIERS.md](security/ROUTE_GUARD_TIERS.md) — route-guard classification tiers.
- [CLI_TOKEN.md](security/CLI_TOKEN.md) — CLI machine-ID token (HMAC + legacy SHA-256) auth.
- [EGRESS_POLICY.md](security/EGRESS_POLICY.md) — egress IP family (IPv4/IPv6) policy.
- [BAN_DETECTION.md](security/BAN_DETECTION.md) — account-ban / banned-keyword detection.
- [AGENTROUTER_WAF.md](security/AGENTROUTER_WAF.md) — agentrouter.org WAF.
- [CORS.md](security/CORS.md) — CORS configuration & security.
- [MITM-TPROXY-DECRYPT.md](security/MITM-TPROXY-DECRYPT.md) — transparent MITM decrypt.
- [SUPPLY_CHAIN.md](security/SUPPLY_CHAIN.md) — supply-chain gates (SLSA, SBOM, Trivy, osv-scanner, Scorecard).
- [SOCKET_DEV_FINDINGS.md](security/SOCKET_DEV_FINDINGS.md) — supply-chain finding attestations.
- [CLI-CONFIGURATION.md](security/CLI-CONFIGURATION.md) — CLI configuration previews and writes.
- [ENTRA_SSO.md](security/ENTRA_SSO.md) — Entra ID SSO for the Client API.
- [INFERENCE_AUTH_POSTURE.md](security/INFERENCE_AUTH_POSTURE.md) — Inference Auth Posture.
- [LTS_SECURITY_BASELINE.md](security/LTS_SECURITY_BASELINE.md) — LTS Security Baseline (v3.9.x preparation).

## compression/

Prompt compression engines, rules, and language packs.

- [COMPRESSION_GUIDE.md](compression/COMPRESSION_GUIDE.md) — top-level compression overview.
- [COMPRESSION_ENGINES.md](compression/COMPRESSION_ENGINES.md) — available compression engines.
- [COMPRESSION_RULES_FORMAT.md](compression/COMPRESSION_RULES_FORMAT.md) — rule file format.
- [COMPRESSION_LANGUAGE_PACKS.md](compression/COMPRESSION_LANGUAGE_PACKS.md) — language packs.
- [RTK_COMPRESSION.md](compression/RTK_COMPRESSION.md) — RTK engine deep dive.
- [CONTEXT_EDITING.md](compression/CONTEXT_EDITING.md) — delegated context editing (Anthropic).
- [EXTENDING_COMPRESSION.md](compression/EXTENDING_COMPRESSION.md) — adding a custom compression engine.

## integrations/

External-service integration guides.

- [FAL_NATIVE.md](integrations/FAL_NATIVE.md) — Fal native multimodal model APIs.
- [MARKITDOWN_MCP.md](integrations/MARKITDOWN_MCP.md) — MarkItDown MCP Server Integration.
- [integrations/README.md](integrations/README.md) — integration overview.

## providers/

Provider-specific integration guides.

- [CLAUDE_WEB.md](providers/CLAUDE_WEB.md) — Claude Web (cookie-auth) provider.
- [CHATGPT_WEB.md](providers/CHATGPT_WEB.md) — ChatGPT Web (Codex) provider and common-provider retirement note.
- [COPILOT-M365.md](providers/COPILOT-M365.md) — Microsoft 365 Copilot (BizChat) provider.
- [ALIBABA-QWEN-PROVIDER-FAMILIES.md](providers/ALIBABA-QWEN-PROVIDER-FAMILIES.md) — Alibaba and Qwen provider families.
- [AGENTROUTER.md](providers/AGENTROUTER.md) — AgentRouter setup.
- [ZED-DOCKER.md](providers/ZED-DOCKER.md) — Zed IDE integration under Docker.
- [CURSOR-DOCKER.md](providers/CURSOR-DOCKER.md) — Cursor model listing under Docker.
- [CHATPLAYGROUND.md](providers/CHATPLAYGROUND.md) — ChatPlayground Provider Integration.
- [CLAUDE_CODE.md](providers/CLAUDE_CODE.md) — Providers — Claude Code (OAuth).
- [CLAUDE_CODE_SETUP_TOKEN.md](providers/CLAUDE_CODE_SETUP_TOKEN.md) — Claude Code with a `claude setup-token` token.
- [CSV-IMPORT.md](providers/CSV-IMPORT.md) — Import providers from a CSV or JSON file.
- [CURSOR-API-KEY-AND-CLI.md](providers/CURSOR-API-KEY-AND-CLI.md) — Cursor API provider and the Cursor CLI passthrough.
- [CURSOR_IMAGE.md](providers/CURSOR_IMAGE.md) — Cursor Image Generation.
- [DEMON_ROUTE.md](providers/DEMON_ROUTE.md) — Demon Route (API-key gateway).
- [GITHUB-COPILOT.md](providers/GITHUB-COPILOT.md) — GitHub Copilot Provider.
- [MINIMAX_CODE.md](providers/MINIMAX_CODE.md) — MiniMax Code Provider.
- [REPLICATE-CEREBRIUM.md](providers/REPLICATE-CEREBRIUM.md) — Replicate and Cerebrium chat providers.
- [grok-cli-media.md](providers/grok-cli-media.md) — Grok Build OAuth media.

## comparison/

- [OMNIROUTE_VS_ALTERNATIVES.md](comparison/OMNIROUTE_VS_ALTERNATIVES.md) — how OmniRoute compares to alternatives.

## ops/

Release, deployment, proxies, tunnels, coverage, database, monitoring.

- [RELEASE_CHECKLIST.md](ops/RELEASE_CHECKLIST.md) — release flow checklist.
- [RELEASE_GREEN.md](ops/RELEASE_GREEN.md) — keeping the PR queue and release branch green.
- [BRANCHING_MODEL.md](ops/BRANCHING_MODEL.md) — branching & release model.
- [RELEASE_STRATEGY.md](ops/RELEASE_STRATEGY.md) — LTS rail: branches, npm channels, forward-port, rail labels.
- [MERGE_TRAIN.md](ops/MERGE_TRAIN.md) — merge queue & manual merge-train runbook.
- [HOMOLOGATION.md](ops/HOMOLOGATION.md) — homologation suite (`npm run homolog`).
- [QUALITY_GATE_PLAYBOOK.md](ops/QUALITY_GATE_PLAYBOOK.md) — quality-gate playbook.
- [RUNNER_BOX.md](ops/RUNNER_BOX.md) — self-hosted runner box operations.
- [BRANCH_PROTECTION_MAIN.md](ops/BRANCH_PROTECTION_MAIN.md) — `main` branch protection.
- [CONTRIBUTION_GOLDEN_PATH.md](ops/CONTRIBUTION_GOLDEN_PATH.md) — contribution golden path (focused checks per change type).
- [COVERAGE_PLAN.md](ops/COVERAGE_PLAN.md) — test coverage plan.
- [LTS_GO_NO_GO.md](ops/LTS_GO_NO_GO.md) — 3.9.0 LTS GO/NO-GO checklist (rail gates + closing battery).
- [DATABASE_GUIDE.md](ops/DATABASE_GUIDE.md) — DB schema and operations.
- [SQLITE_RUNTIME.md](ops/SQLITE_RUNTIME.md) — SQLite driver resolution chain.
- [REDIS_PRODUCTION_CONFIG.md](ops/REDIS_PRODUCTION_CONFIG.md) — Redis production configuration.
- [MONITORING_GUIDE.md](ops/MONITORING_GUIDE.md) — monitoring & observability.
- [FLY_IO_DEPLOYMENT_GUIDE.md](ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io deployment.
- [VM_DEPLOYMENT_GUIDE.md](ops/VM_DEPLOYMENT_GUIDE.md) — generic VM deployment.
- [PROXY_GUIDE.md](ops/PROXY_GUIDE.md) — upstream proxy configuration.
- [TUNNELS_GUIDE.md](ops/TUNNELS_GUIDE.md) — Cloudflare tunnel and friends.
- [BUILD_WARNINGS.md](ops/BUILD_WARNINGS.md) — Build Warnings Reference.
- [CACHED_INPUT_REPORTING.md](ops/CACHED_INPUT_REPORTING.md) — Cached input token reporting.
- [HARD_RULES_DETAIL.md](ops/HARD_RULES_DETAIL.md) — Hard Rules — full text and rationale.
- [KUBERNETES_DEPLOYMENT_GUIDE.md](ops/KUBERNETES_DEPLOYMENT_GUIDE.md) — Kubernetes deployment guide (k3s and k8s).
- [OMNI_QUEUE.md](ops/OMNI_QUEUE.md) — omni-queue: OmniRoute's own merge queue.
- [PERF_BASELINE.md](ops/PERF_BASELINE.md) — Performance Baseline (LTS rail).
- [PROXY_BULK_IMPORT.md](ops/PROXY_BULK_IMPORT.md) — Named bulk proxy import.
- [PROXY_PAYLOAD_TRAFFIC.md](ops/PROXY_PAYLOAD_TRAFFIC.md) — Proxy Payload Traffic.
- [RELAY_INTEGRATION_QUEUE.md](ops/RELAY_INTEGRATION_QUEUE.md) — Relay integration queue.
- [WORKTREE_ISOLATION.md](ops/WORKTREE_ISOLATION.md) — Worktree Isolation Protocol.
- [ZCODE_IMAGES.md](ops/ZCODE_IMAGES.md) — ZCode image input (explicit native protocol opt-in).

## Supporting and historical documents

Asset documentation, retained design notes and changelog fragments are included for
traceability. For current releases, use the root [CHANGELOG.md](../CHANGELOG.md);
for future milestones, use [ROADMAP.md](../ROADMAP.md).

### assets/

- [flags/README.md](assets/flags/README.md) — flag assets and their sources.

### changelog/fragments/

- [10962.md](changelog/fragments/10962.md)
- [14268.md](changelog/fragments/14268.md)
- [15006.md](changelog/fragments/15006.md)
- [15540.md](changelog/fragments/15540.md)
- [15659.md](changelog/fragments/15659.md)
- [18608.md](changelog/fragments/18608.md)
- [7778.md](changelog/fragments/7778.md)

### plans/

Retained implementation plans; read the current guide and source before relying on
a historical plan's proposed behavior.

- [11690-anysearch-provider-integration.md](plans/11690-anysearch-provider-integration.md) — AnySearch provider integration (PR #11690).
- [7778-hierarchical-admission.md](plans/7778-hierarchical-admission.md) — #7778 hierarchical admission cleanup plan.

## diagrams/

Mermaid sources and exported SVG/PNG diagrams referenced from the docs above. See [diagrams/README.md](diagrams/README.md).

## i18n/

Translated mirrors of the documentation in 66 locales (plus the English originals — 67 languages in total). See [i18n/README.md](i18n/README.md) for the supported language list.

## screenshots/

Static screenshots used by the dashboard and the README. Not part of the doc body.

---

## Auto-generated artifacts

- [reference/PROVIDER_REFERENCE.md](reference/PROVIDER_REFERENCE.md) is generated by `scripts/docs/gen-provider-reference.ts` from `src/shared/constants/providers.ts`. Do not edit by hand.
- The `/docs` UI is backed by Fumadocs MDX source generation from the subfolders above.
