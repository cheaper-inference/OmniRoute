#!/usr/bin/env node
// scripts/check/check-provider-consistency.ts
// Anti-hallucination gate #1: every entry in REGISTRY (open-sse/config/providerRegistry.ts)
// must match a canonical provider in src/shared/constants/providers.ts.
// Pega entradas de registry inventadas/meia-registradas (provider com baseUrl+models
// but absent from the canonical list → not selectable by the normal provider machinery).
// Ratchet: pre-existing exceptions live in KNOWN_REGISTRY_ONLY; only NEW orphans fail.
// Stale-enforcement (6A.3): an entry in KNOWN_REGISTRY_ONLY that no longer suppresses any real
// orphan → gate fails with removal instructions (prevents a silent regression hole).
//
// Reverse walk (
// serviceKinds includes "llm" MUST have a REGISTRY entry — unless it is in
// KNOWN_CATALOG_ONLY (providers that route via a connection baseUrl / a specialized
// executor with no registry entry). This makes provider:remove --dry-run
// verifiable: a provider removed from REGISTRY but forgotten in providers.ts
// shows up as a reverse orphan and the gate fails.
import { pathToFileURL } from "node:url";
import { AI_PROVIDERS, getProviderById } from "@/shared/constants/providers.ts";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.ts";
import { assertNoStale } from "./lib/allowlist.mjs";

// Known registry-only entries (pre-existing half-registrations). Each with
// justificativa. Remover daqui ao registrar o provider em providers.ts.
export const KNOWN_REGISTRY_ONLY: Record<string, string> = {};

/**
 * Canonical providers with llm serviceKinds that LEGITIMATELY have no REGISTRY
 * entry. Each routes via a connection baseUrl (providerSpecificData.baseUrl) or a
 * specialized executor, so the absence of a registration is not an orphan.
 */
export const KNOWN_CATALOG_ONLY: Record<string, string> = {
"amazon-q": "OAuth/IDE provider routed via KiroExecutor with no registry entry.",
zed: "OAuth/IDE provider (Zed) routed via a specialized executor; no registry entry.",
piapi: "OpenAI-compatible gateway routed via connection baseUrl.",
getgoapi: "OpenAI-compatible gateway routed via connection baseUrl.",
laozhang: "OpenAI-compatible gateway routed via connection baseUrl.",
thebai: "OpenAI-compatible gateway routed via connection baseUrl.",
fenayai: "OpenAI-compatible gateway routed via connection baseUrl.",
empower: "OpenAI-compatible gateway routed via connection baseUrl.",
"arcee-ai": "API-key provider routed via connection baseUrl.",
"azure-openai": "Azure OpenAI routed via AzureOpenAIExecutor + connection baseUrl.",
"azure-ai": "Azure AI Foundry routed via AzureAiExecutor + connection baseUrl.",
watsonx: "Enterprise provider routed via connection baseUrl.",
oci: "OCI Generative AI routed via connection baseUrl.",
sap: "SAP AI Core routed via connection baseUrl.",
datarobot: "Enterprise provider routed via connection baseUrl.",
clarifai: "Clarifai PAT routed via connection baseUrl.",
"360ai": "Regional provider routed via connection baseUrl.",
gitlab: "GitLab (non-Duo) routed via specialized executor + connection baseUrl.",
  "poe-web": "Web/cookie provider roteado via executor especializado (PoeWebExecutor).",
  "venice-web": "Web/cookie provider roteado via executor especializado (VeniceWeb).",
  "v0-vercel-web": "Web/cookie provider roteado via executor especializado (V0VercelWeb).",
"gemini-business": "Enterprise Gemini routed via specialized executor + connection baseUrl.",
"ollama-local": "Local provider (Ollama) routed via connection baseUrl; no registry.",
"lm-studio": "Local provider (LM Studio) routed via connection baseUrl.",
vllm: "Local provider (vLLM) routed via connection baseUrl.",
lemonade: "Local provider routed via connection baseUrl.",
llamafile: "Local provider routed via connection baseUrl.",
"llama-cpp": "Local provider routed via connection baseUrl.",
triton: "Local provider (Triton) routed via connection baseUrl.",
"docker-model-runner": "Local provider routed via connection baseUrl.",
xinference: "Local provider (XInference) routed via connection baseUrl.",
oobabooga: "Local provider (Oobabooga) routed via connection baseUrl.",
};

/** IDs in REGISTRY that are not canonical providers and are not in the allowlist. */
export function findOrphanRegistryIds(
  registryIds: string[],
  isKnownProvider: (id: string) => boolean,
  allowlist: Record<string, string>
): string[] {
  return registryIds.filter((id) => !isKnownProvider(id) && !(id in allowlist));
}

/**
 * Canonical providers with llm serviceKinds and no REGISTRY entry, outside the
 * allowlist — half of a provider:remove (registration deleted, catalog forgotten).
 */
export function findCatalogOnlyLlmProviders(
  canonicalProviders: Record<string, { serviceKinds?: string[] }>,
  registryIds: string[],
  allowlist: Record<string, string>
): string[] {
  const registry = new Set(registryIds);
  return Object.entries(canonicalProviders)
    .filter(([id, p]) => {
      if (registry.has(id) || id in allowlist) return false;
      return Array.isArray(p.serviceKinds) && p.serviceKinds.includes("llm");
    })
    .map(([id]) => id);
}

function main(): void {
  const canonical = new Set(Object.keys(AI_PROVIDERS));
  const isKnown = (id: string) => canonical.has(id) || Boolean(getProviderById(id));

  // Live orphans BEFORE allowlist filtering (needed for stale-enforcement).
  const liveOrphans = Object.keys(REGISTRY).filter((id) => !isKnown(id));
  assertNoStale(Object.keys(KNOWN_REGISTRY_ONLY), liveOrphans, "provider-consistency");

  const orphans = liveOrphans.filter((id) => !(id in KNOWN_REGISTRY_ONLY));
  if (orphans.length) {
    console.error(
      `[provider-consistency] ${orphans.length} entry(ies) in REGISTRY with no canonical provider in providers.ts:\n` +
        orphans.map((id) => `  ✗ ${id}`).join("\n") +
        `\n  → register the provider in src/shared/constants/providers.ts or add it to KNOWN_REGISTRY_ONLY (scripts/check/check-provider-consistency.ts) with justification.`
    );
    process.exitCode = 1;
  }
  // Reverse walk: llm-kind canonical provider without REGISTRY = reverse orphan.
  const catalogOnlyLlm = findCatalogOnlyLlmProviders(
    AI_PROVIDERS as Record<string, { serviceKinds?: string[] }>,
    Object.keys(REGISTRY),
    KNOWN_CATALOG_ONLY
  );
  if (catalogOnlyLlm.length) {
    console.error(
      `[provider-consistency] ${catalogOnlyLlm.length} canonical llm provider(s) with no REGISTRY entry:\n` +
        catalogOnlyLlm.map((id) => `  ✗ ${id}`).join("\n") +
        `\n  → register the provider in open-sse/config/providers/registry/<id>/ or add it to KNOWN_CATALOG_ONLY (scripts/check/check-provider-consistency.ts) with justification — reverse orphan of an incomplete provider:remove?`
    );
    process.exitCode = 1;
  }

  if (!process.exitCode) {
    console.log(
      `[provider-consistency] OK — ${Object.keys(REGISTRY).length} REGISTRY entries, ${canonical.size} canonical providers, ${Object.keys(KNOWN_REGISTRY_ONLY).length} exception(s) registry-only, ${Object.keys(KNOWN_CATALOG_ONLY).length} catalog-only`
    );
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
