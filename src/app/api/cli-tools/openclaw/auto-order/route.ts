/**
 * OpenClaw Integration — Dynamic provider.order based on Auto-Combo scores.
 *
 * GET /api/cli-tools/openclaw/auto-order
 */

import { NextResponse } from "next/server";
import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import { getCombos } from "@/lib/db/combos";
import { getComboModelProvider } from "@/lib/combos/steps";
import { getAllCircuitBreakerStatuses } from "@/shared/utils/circuitBreaker";

export async function GET(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  try {
    // Read the domain modules directly: a self-hop over HTTP carries no credential and gets 401.
    const combos = await getCombos();
    const breakers = getAllCircuitBreakerStatuses();

    // Build provider scores from circuit breaker state
    const providerScores = new Map<string, number>();

    // Start all providers with base score
    const allProviders = new Set<string>();
    for (const combo of combos) {
      for (const model of Array.isArray(combo.models) ? combo.models : []) {
        const provider = getComboModelProvider(model);
        if (!provider) continue;
        allProviders.add(provider);
        providerScores.set(provider, (providerScores.get(provider) || 0) + 1);
      }
    }

    // Adjust by circuit breaker state
    // A breaker status is keyed by `name` (the provider id for provider-level breakers).
    // Skip breakers that match no provider so they never add a phantom entry to the order.
    for (const cb of breakers) {
      if (!providerScores.has(cb.name)) continue;
      const current = providerScores.get(cb.name) || 0;
      if (cb.state === "OPEN") providerScores.set(cb.name, current * 0.1);
      else if (cb.state === "HALF_OPEN") providerScores.set(cb.name, current * 0.5);
    }

    // Sort by score descending
    const ordered = [...providerScores.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([provider]) => provider);

    return NextResponse.json({
      provider: {
        order: ordered,
        allow_fallbacks: true,
      },
      generated_at: new Date().toISOString(),
      source: "omniroute-auto-combo",
    });
  } catch {
    return NextResponse.json({
      provider: {
        order: ["anthropic", "google", "openai"],
        allow_fallbacks: true,
      },
      generated_at: new Date().toISOString(),
      source: "omniroute-fallback",
    });
  }
}
