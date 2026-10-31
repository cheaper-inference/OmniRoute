/**
 * connectionHealthFilter — the status pills above the provider connections list.
 *
 * "verification_required" lists the Antigravity accounts that hold a stored Google
 * "verify your account" link (403 VALIDATION_REQUIRED), so an operator can open each
 * account's Verify button in turn instead of scanning the whole list.
 */
import { readStoredVerificationUrl } from "@omniroute/open-sse/services/antigravityVerification.ts";
import type { ConnectionRowConnection } from "./components/ConnectionRow";

export const VERIFICATION_REQUIRED_FILTER = "verification_required";

export function isHealthyConnection(c: ConnectionRowConnection): boolean {
  const s = c.testStatus;
  return c.isActive !== false && (!s || s === "active" || s === "success");
}

export function needsVerification(c: ConnectionRowConnection): boolean {
  return readStoredVerificationUrl(c.providerSpecificData) !== null;
}

export function countVerificationRequired(connections: ConnectionRowConnection[]): number {
  return connections.filter(needsVerification).length;
}

export function matchesHealthFilter(c: ConnectionRowConnection, filter: string): boolean {
  if (filter === "all") return true;
  if (filter === "active") return isHealthyConnection(c);
  if (filter === VERIFICATION_REQUIRED_FILTER) return needsVerification(c);
  if (filter === "error")
    return (
      !isHealthyConnection(c) && c.testStatus !== "banned" && c.testStatus !== "credits_exhausted"
    );
  return c.testStatus === filter;
}
