/**
 * chatCore managed-lease request fence (chatCore god-file decomposition, slice 2 — design after
 * #15709).
 *
 * Extracted byte-identically from handleChatCore's request entry. When the request runs under a
 * managed exclusive-connection lease, every dispatch must target the leased connection with the
 * current lease generation; any mismatch throws a 409 error carrying a `LEASE_*` code. The two
 * companion helpers translate that code back into the 409 lease-error result the response legs
 * return. With no lease (`managedLease === null`) the fence is a no-op.
 */

import { assertExclusiveConnectionLeaseFence } from "@/lib/db/exclusiveConnectionLeases";
import { createErrorResult } from "../../utils/error.ts";

/** Structural view of ManagedLeaseDispatchContext (src/sse/services/leaseContext.ts). */
export type ManagedLeaseFenceSubject = {
  apiKeyId: string;
  context: { leaseOwnerId: string; generation: number };
};

export function createManagedLeaseFence(managedLease: ManagedLeaseFenceSubject | null) {
  const assertManagedLeaseFence = (attemptConnectionId: string | null | undefined) => {
    if (!managedLease) return;
    if (!attemptConnectionId) {
      throw Object.assign(new Error("Managed lease connection is unavailable"), {
        code: "LEASE_CONNECTION_MISMATCH",
        status: 409,
      });
    }
    const fence = assertExclusiveConnectionLeaseFence({
      leaseOwnerId: managedLease.context.leaseOwnerId,
      generation: managedLease.context.generation,
      apiKeyId: managedLease.apiKeyId,
      connectionId: attemptConnectionId,
    });
    if (fence.kind === "VALID") return;
    const code =
      fence.kind === "REQUIRED"
        ? "LEASE_REQUIRED"
        : fence.kind === "STALE"
          ? "LEASE_FENCE_STALE"
          : fence.kind === "AUTHORIZATION_MISMATCH"
            ? "LEASE_AUTHORIZATION_MISMATCH"
            : "LEASE_CONNECTION_MISMATCH";
    throw Object.assign(new Error("Managed lease request fence rejected the dispatch"), {
      code,
      status: 409,
    });
  };
  const getManagedLeaseFenceErrorCode = (code: string | undefined): string | undefined => {
    if (managedLease === null) return undefined;
    return code?.startsWith("LEASE_") ? code : undefined;
  };
  const managedLeaseFenceErrorResult = (code: string) => {
    return {
      ...createErrorResult(409, "Managed lease request fence rejected the dispatch", null, code),
      errorType: "lease_error",
      errorCode: code,
    };
  };
  return { assertManagedLeaseFence, getManagedLeaseFenceErrorCode, managedLeaseFenceErrorResult };
}
