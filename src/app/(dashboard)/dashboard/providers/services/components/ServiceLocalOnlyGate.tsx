"use client";

import { LocalOnlyNotice } from "@/shared/components/LocalOnlyNotice";
import { useLocalOnlyBlocked } from "@/shared/hooks/useLocalOnlyAccess";
import { serviceStatusPath } from "../hooks/useServiceStatus";

/**
 * Embedded services are installed, started and stopped on the host, so their API is a
 * local-only route. When the session cannot reach a service's status, show the notice instead
 * of the tab: none of its panels (status, lifecycle, logs) can work, and none should poll.
 */
export function ServiceLocalOnlyGate({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  const localOnly = useLocalOnlyBlocked(serviceStatusPath(name));
  return localOnly ? <LocalOnlyNotice /> : <>{children}</>;
}
