/**
 * `connection.auth_failed` webhook: one account of a provider pool failed authentication.
 *
 * Two sources feed it:
 *  - stage "request": a live request got a 401/403 auth verdict for this account and the router
 *    moved on (markAccountUnavailable). A refresh that fixes the token before the retry never
 *    reaches that point, so a request that ends in 200 after a reactive refresh sends nothing.
 *  - the needs-re-auth edge: a write that moves the connection's testStatus to "expired"
 *    (updateProviderConnection). That happens once per episode, so it is never deduped.
 *
 * The payload names the account (masked display name) and a short error code. It never carries
 * tokens, refresh tokens or upstream response bodies.
 */
import { pickMaskedDisplayValue } from "@/shared/utils/maskEmail";

import type { WebhookEvent } from "./eventDescriptions";

export type ConnectionAuthFailureStage = "request" | "refresh";

export const CONNECTION_AUTH_FAILED_EVENT: WebhookEvent = "connection.auth_failed";
export const CONNECTION_AUTH_FAILED_DEDUPE_MS = 10 * 60 * 1000;

export interface ConnectionAuthFailedInput {
  provider: string | null | undefined;
  connectionId: string;
  name?: string | null;
  email?: string | null;
  stage: ConnectionAuthFailureStage;
  status?: number | null;
  code?: unknown;
  needsReauth: boolean;
}

type Sink = (event: WebhookEvent, data: Record<string, unknown>) => void;

const lastSentAt = new Map<string, number>();
let sinkOverride: Sink | null = null;

/** Test hook: capture events instead of dispatching them. Pass null to restore. */
export function setConnectionAuthFailedSinkForTesting(sink: Sink | null): void {
  sinkOverride = sink;
  lastSentAt.clear();
}

const SAFE_CODE = /^[A-Za-z0-9_.:-]{1,64}$/;

/** A short machine code only; free text (which may echo upstream bodies) is dropped. */
function toSafeCode(code: unknown): string | null {
  if (typeof code !== "string") return null;
  const trimmed = code.trim();
  return SAFE_CODE.test(trimmed) ? trimmed : null;
}

function dispatch(data: Record<string, unknown>): void {
  if (sinkOverride) {
    sinkOverride(CONNECTION_AUTH_FAILED_EVENT, data);
    return;
  }
  void import("@/lib/webhookDispatcher")
    .then(({ notifyWebhookEvent }) => notifyWebhookEvent(CONNECTION_AUTH_FAILED_EVENT, data))
    .catch(() => {
      /* webhook delivery is best-effort */
    });
}

/**
 * Fire-and-forget. A plain auth failure is sent at most once per connection and stage every
 * 10 minutes; a needs-re-auth edge is always sent. Returns whether an event went out.
 */
export function notifyConnectionAuthFailed(input: ConnectionAuthFailedInput): boolean {
  if (!input.connectionId) return false;
  if (!input.needsReauth) {
    const key = `${input.connectionId}:${input.stage}`;
    const now = Date.now();
    const last = lastSentAt.get(key);
    if (last !== undefined && now - last < CONNECTION_AUTH_FAILED_DEDUPE_MS) return false;
    lastSentAt.set(key, now);
  }
  dispatch({
    provider: input.provider || null,
    connectionId: input.connectionId,
    account: pickMaskedDisplayValue(
      [input.name, input.email],
      `Account #${input.connectionId.slice(0, 6)}`
    ),
    stage: input.stage,
    status: typeof input.status === "number" ? input.status : null,
    code: toSafeCode(input.code),
    needsReauth: input.needsReauth,
  });
  return true;
}

const REQUEST_AUTH_ERROR_TYPES = new Set([
  "unauthorized",
  "account_deactivated",
  "oauth_invalid_token",
  "forbidden",
]);

/**
 * Request stage, called by markAccountUnavailable after it persisted the verdict. Only an
 * account-level auth class counts: a model the account lacks, a refused request, a safety stop or
 * a quota body are not auth failures. An "expired" verdict is reported by the needs-re-auth edge
 * instead, so one failure never produces two events.
 */
export function notifyRequestAuthFailure(input: {
  connection: { name?: string | null; email?: string | null } | null | undefined;
  connectionId: string;
  provider: string | null;
  status: number;
  providerErrorType: string | null;
  terminalStatus: string | null;
  code?: string | null;
}): boolean {
  if (input.status !== 401 && input.status !== 403) return false;
  if (!input.providerErrorType || !REQUEST_AUTH_ERROR_TYPES.has(input.providerErrorType)) {
    return false;
  }
  if (input.terminalStatus === "expired") return false;
  return notifyConnectionAuthFailed({
    provider: input.provider,
    connectionId: input.connectionId,
    name: input.connection?.name ?? null,
    email: input.connection?.email ?? null,
    stage: "request",
    status: input.status,
    code: toSafeCode(input.code) ?? input.providerErrorType,
    needsReauth: false,
  });
}

/** Caller-supplied context for the needs-re-auth edge (defaults to the refresh stage). */
export interface ConnectionAuthFailureContext {
  stage: ConnectionAuthFailureStage;
  status?: number | null;
  code?: string | null;
}

/**
 * Called by updateProviderConnection after a committed write. Sends the needs-re-auth event when
 * testStatus moved from anything else to "expired". A retired provider is not an auth failure.
 */
export function notifyOnExpiredTransition(
  before: Record<string, unknown>,
  after: Record<string, unknown>,
  update: Record<string, unknown>,
  context?: ConnectionAuthFailureContext
): boolean {
  if (after.testStatus !== "expired" || before.testStatus === "expired") return false;
  if (after.lastErrorType === "provider_deprecated") return false;
  return notifyConnectionAuthFailed({
    provider: stringOrNull(after.provider),
    connectionId: String(after.id ?? ""),
    name: stringOrNull(after.name),
    email: stringOrNull(after.email),
    stage: context?.stage ?? "refresh",
    status: context?.status ?? null,
    code: expiredTransitionCode(update, context),
    needsReauth: true,
  });
}

function stringOrNull(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

/** The most specific code for the needs-re-auth edge: caller context, then the written row. */
function expiredTransitionCode(
  update: Record<string, unknown>,
  context?: ConnectionAuthFailureContext
): unknown {
  return context?.code ?? stringOrNull(update.errorCode) ?? update.lastErrorType ?? null;
}
