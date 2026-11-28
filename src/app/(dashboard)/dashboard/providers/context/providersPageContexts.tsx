"use client";

import type { ReactNode } from "react";
import { CombosOnlyProvidersProvider } from "./combosOnlyProvidersContext";
import { OpenRouterProviderStatsProvider } from "./openRouterProviderStatsContext";
import type { OpenRouterProviderStatsEntry } from "../providerPageUtils";

/**
 * The providers page's React contexts, composed once.
 *
 * Both used to be mounted individually in `page.tsx`; adding a second one there re-indented the
 * whole ~900-line render tree. Composing them keeps that tree byte-identical: the page swaps one
 * element name for another and new contexts are added here instead.
 */
export function ProvidersPageContexts({
  openRouterProviderStats,
  combosOnlyProviders,
  children,
}: {
  openRouterProviderStats: OpenRouterProviderStatsEntry[];
  combosOnlyProviders: unknown;
  children: ReactNode;
}) {
  return (
    <OpenRouterProviderStatsProvider entries={openRouterProviderStats}>
      <CombosOnlyProvidersProvider providers={combosOnlyProviders}>
        {children}
      </CombosOnlyProvidersProvider>
    </OpenRouterProviderStatsProvider>
  );
}
