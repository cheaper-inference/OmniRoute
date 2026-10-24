/**
 * PERF-09: Static provider metadata, generated from the live REGISTRY by
 * `scripts/build/gen-provider-metadata.ts`.
 *
 * Importing this JSON (≈330 KB, parse-once) replaces REGISTRY imports in
 * modules that only need flat provider metadata — wire format, auth type,
 * alias, model catalog. The 291-module REGISTRY evaluates every provider
 * module (2.5 MB of TS) at import time; modules reachable from browser
 * bundles or cold routes pay that cost for metadata they could read here.
 *
 * Drift safety: `tests/unit/provider-metadata-sync.test.ts` regenerates the
 * file in-memory and fails when the committed JSON no longer matches the
 * registry, so a newly registered provider can never ship with stale
 * metadata.
 */
import metadataJson from "./metadata.json";

export interface ProviderMetaModel {
  id: string;
  name: string;
}

export interface ProviderMeta {
  alias?: string;
  authType?: string;
  format?: string;
  anonymousApiKey?: boolean;
  models?: ProviderMetaModel[];
}

interface MetadataFile {
  count: number;
  modelTotal: number;
  claudeWireProviders: string[];
  providers: Record<string, ProviderMeta>;
}

const metadata = metadataJson as MetadataFile;

/** Provider id → flat metadata. Keys are sorted; ids match REGISTRY keys. */
export const PROVIDER_METADATA: Readonly<Record<string, ProviderMeta>> = metadata.providers;

/** Provider ids whose wire format is "claude" (lowercased, precomputed). */
export const CLAUDE_WIRE_PROVIDERS: ReadonlySet<string> = new Set(metadata.claudeWireProviders);

/** Display alias for a provider id (`alias || id`), mirroring REGISTRY consumers. */
export function providerMetaAlias(id: string): string {
  return PROVIDER_METADATA[id]?.alias ?? id;
}

/** Auth type of a provider id, or `undefined` when unregistered. */
export function providerMetaAuthType(id: string): string | undefined {
  return PROVIDER_METADATA[id]?.authType;
}

/** Wire format of a provider id, or `undefined` when unregistered. */
export function providerMetaFormat(id: string): string | undefined {
  return PROVIDER_METADATA[id]?.format;
}

/** Catalog models for a provider id (already `name || id`-resolved), or undefined. */
export function providerMetaModels(id: string): readonly ProviderMetaModel[] | undefined {
  return PROVIDER_METADATA[id]?.models;
}
