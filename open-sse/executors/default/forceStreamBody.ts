import { getRegistryEntry } from "../../config/providerRegistry.ts";

/**
 * #18007: providers declared `forceStream` in the registry reject non-streaming
 * upstream requests (e.g. WorkBuddy 11101). chatCore already passes stream=true to
 * the executor; this lets the executor override a client-sent `stream:false` body.
 */
export function isForceStreamProvider(provider: string | undefined): boolean {
  if (!provider) return false;
  return (
    (getRegistryEntry(provider) as { forceStream?: boolean } | null | undefined)?.forceStream ===
    true
  );
}
