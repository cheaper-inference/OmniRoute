"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { normalizeCombosOnlyProviderSet } from "@/shared/utils/providerCombosOnly";

/**
 * Makes `settings.combosOnlyProviders` available to every ProviderCard without prop-drilling
 * it through the ~19 render sites in page.tsx (one per auth-type section).
 *
 * The card only needs to know whether THIS provider is marked, so the context exposes a
 * predicate rather than the raw list; providers absent from the setting simply answer false.
 */
const NO_MATCH = () => false;
const Context =
  createContext<(keys: ReadonlyArray<string | null | undefined>) => boolean>(NO_MATCH);

export function CombosOnlyProvidersProvider({
  providers,
  children,
}: {
  providers: unknown;
  children: ReactNode;
}) {
  const set = useMemo(() => normalizeCombosOnlyProviderSet(providers), [providers]);
  const isCombosOnly = useMemo(
    () => (keys: ReadonlyArray<string | null | undefined>) =>
      set.size > 0 && keys.some((key) => typeof key === "string" && key.length > 0 && set.has(key)),
    [set]
  );
  return <Context.Provider value={isCombosOnly}>{children}</Context.Provider>;
}

/** True when any of the identifiers the card knows names a `combos_only` provider. */
export function useProviderCombosOnly(keys: ReadonlyArray<string | null | undefined>): boolean {
  const isCombosOnly = useContext(Context);
  return isCombosOnly(keys);
}
