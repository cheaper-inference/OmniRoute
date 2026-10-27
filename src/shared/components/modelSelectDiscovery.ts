"use client";

import { readDiscoveryDegradation } from "@/shared/discovery/degradedCause";

/**
 * The live catalog of one provider, and whether it is the provider's own list
 * or the built-in fallback catalog.
 */
export type ModelSelectDiscovery = {
  models: unknown[];
  degraded: boolean;
  cause?: string;
};

/**
 * The degradation of one provider's list: the flag and the reason, kept
 * together so the picker and the notice read the same shape.
 */
export type ProviderDegradation = {
  degraded: boolean;
  cause?: string;
};

/**
 * Fetch the live model catalog of one provider from its connection's upstream
 * `/models` endpoint.
 *
 * The degradation of the answer is read from the response itself, so a
 * fallback catalog is never presented as the provider's own list.
 */
export async function fetchProviderModels(
  providerId: string,
  connectionId: string | number | undefined
): Promise<ModelSelectDiscovery> {
  // Without a connection id there is no live catalog to ask for.
  if (!connectionId) {
    return { models: [], degraded: false };
  }
  try {
    // #9203: ask the live route to drop hidden models server-side too, so the
    // operator's visibility settings apply before the rows reach the picker,
    // while chatOnly excludes media and retired models from this chat surface.
    const res = await fetch(
      `/api/providers/${connectionId}/models?excludeHidden=true&chatOnly=true`
    );
    if (!res.ok) {
      console.warn(`Failed to fetch models for ${providerId}: ${res.status}`);
      return { models: [], degraded: false };
    }
    const data = await res.json();
    const degradation = readDiscoveryDegradation(data);
    return {
      models: data?.models || [],
      degraded: degradation.degraded,
      ...(degradation.cause ? { cause: degradation.cause } : {}),
    };
  } catch (error) {
    console.error(`Error fetching models for ${providerId}:`, error);
    return { models: [], degraded: false };
  }
}
