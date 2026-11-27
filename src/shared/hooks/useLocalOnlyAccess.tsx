"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import {
  UNKNOWN_LOCAL_ONLY_ACCESS,
  type LocalOnlyAccessSnapshot,
} from "@/shared/constants/localOnlyFeatures";
import {
  EMPTY_LOCAL_ONLY_REJECTIONS,
  getLocalOnlyRejections,
  isLocalOnlyPathBlocked,
  subscribeLocalOnlyRejections,
} from "@/shared/utils/localOnlyAccess";

const LocalOnlyAccessContext = createContext<LocalOnlyAccessSnapshot>(UNKNOWN_LOCAL_ONLY_ACCESS);

/** Hands the server's answer (`resolveDashboardLocalAccess`) to the dashboard's client tree. */
export function LocalOnlyAccessProvider({
  value,
  children,
}: {
  value: LocalOnlyAccessSnapshot;
  children: React.ReactNode;
}) {
  return (
    <LocalOnlyAccessContext.Provider value={value}>{children}</LocalOnlyAccessContext.Provider>
  );
}

/**
 * True when the dashboard must not call the local-only endpoint `path` (a literal from
 * `LOCAL_ONLY_DASHBOARD_PATHS`) and should render `<LocalOnlyNotice />` instead.
 *
 * Known on the first render for a remote session; otherwise it turns true once
 * `detectLocalOnlyRejection()` sees the guard reject a local-only request.
 */
export function useLocalOnlyBlocked(path: string): boolean {
  const access = useContext(LocalOnlyAccessContext);
  const rejections = useSyncExternalStore(
    subscribeLocalOnlyRejections,
    getLocalOnlyRejections,
    () => EMPTY_LOCAL_ONLY_REJECTIONS
  );
  return isLocalOnlyPathBlocked(access, path, rejections);
}
