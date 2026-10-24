/**
 * Stable, language-neutral error codes for proxy subscriptions.
 *
 * Extracted from `subscriptionService.ts`: both the service and the
 * union pool writer encode the same codes, and sharing this tiny module
 * keeps the dependency acyclic (service → unionPool → here).
 */
import type { CoreConfigWarningCode } from "./coreConfig/sync";

/** Stable, language-neutral error codes stored in the subscription `error` column. */
export type ProxySubscriptionErrorCode =
  | CoreConfigWarningCode
  | "CORE_CONFIG_NOT_GENERATED"
  | "LOCAL_CORE_ENDPOINT_INVALID"
  | "NEEDS_CORE_NOT_CONFIGURED"
  | "NO_USABLE_NODES"
  | "SELECTOR_SWITCH_FAILED"
  | "CORE_RELOAD_UNDECLARED"
  | "CORE_RELOAD_FAILED";

/** Encode a user-facing error as `{ code, detail? }` for i18n on the client. */
export function subscriptionErrorCode(code: ProxySubscriptionErrorCode, detail?: string): string {
  return JSON.stringify(detail ? { code, detail } : { code });
}
