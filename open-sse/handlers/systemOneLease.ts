import { isExclusiveConnectionActivelyLeased } from "@/lib/db/exclusiveConnectionLeases";
import {
  buildManagedLeaseErrorResponse,
  isExclusiveLeaseManagedKey,
  LeaseContextError,
  LEASE_GENERATION_HEADER,
  LEASE_OWNER_HEADER,
} from "@/sse/services/leaseContext";

/** Native decision routes are unmanaged; they may never consume another session's lease. */
export class NativeConnectionLeaseError extends Error {
  constructor() {
    super("decision_connection_leased");
    this.name = "NativeConnectionLeaseError";
  }
}
export function isNativeConnectionUnavailable(connectionId: string): boolean {
  return !connectionId || isExclusiveConnectionActivelyLeased(connectionId);
}
/** Synchronous so final-dispatch fences can recheck after their capacity queue. */
export function assertNativeConnectionUnleased(connectionId: string): void {
  if (isNativeConnectionUnavailable(connectionId)) throw new NativeConnectionLeaseError();
}
export function rejectNativeManagedLease(
  request: Request,
  metadata?: { scopes?: readonly string[] | null } | null
): Response | null {
  if (
    !request.headers.has(LEASE_OWNER_HEADER) &&
    !request.headers.has(LEASE_GENERATION_HEADER) &&
    !isExclusiveLeaseManagedKey(metadata)
  )
    return null;
  return buildManagedLeaseErrorResponse(
    new LeaseContextError(
      409,
      "LEASE_UNSUPPORTED_ROUTE",
      "Native decision routes do not support managed session leases"
    )
  );
}
