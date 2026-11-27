/**
 * PATCH /api/v1/me/quota/{provider}: the calling API key records its own lending consent for one
 * pool, named by the opaque `ref` the GET view shows.
 *
 * Checks run in this order, each refusal a fixed body: the self-service gate (flag, header key,
 * self:usage), the provider segment, the per-key change limit, the body, the deadline, the ref
 * among the key's pools of that provider, the pool's consent mode. A percentage of 0 withdraws
 * the consent and is accepted in either mode, so a holder can always take it back. A ref that is
 * malformed, belongs to another key, names another provider's pool or a pool the key is not in is
 * always the same 404. Nothing is written before every check passes.
 *
 * The same body twice writes once and is audited once. The answer is the full GET view, rebuilt
 * after the write. Errors go through the fixed 500 of quotaHandler.ts, logged on the server.
 */
import { logAuditEvent, getAuditRequestContext } from "@/lib/compliance/index";
import { setAllocationLending } from "@/lib/db/quotaLending";
import { isConsentPool } from "@/lib/quota/consentGate";
import { buildQuotaSelfView, resolveSelfPoolContexts } from "@/lib/quota/selfView";
import type { QuotaSelfViewInput, SelfViewPoolContext } from "@/lib/quota/selfViewTypes";
import { resolveProviderId } from "@/shared/constants/providers";
import { readRequestBodyWithLimit } from "@/shared/middleware/bodySizeGuard";
import {
  checkLendingDeadline,
  selfLendingPatchSchema,
  selfQuotaProviderSegmentSchema,
  selfQuotaResponseSchema,
  type SelfLendingPatch,
} from "@/shared/schemas/selfQuota";
import { getApiKeySecret } from "@/shared/utils/apiKey";
import { checkRateLimit, type RateLimitResult } from "@/shared/utils/rateLimiter";

import { authenticateSelfServiceRequest, selfServiceError, selfServiceJson } from "./auth";
import { failureResponse, toViewInput, type SelfQuotaHandlerDeps } from "./quotaHandler";

export const SELF_LENDING_RATE_LIMIT = { limit: 20, window: 60 } as const;

export interface SelfLendingHandlerDeps extends SelfQuotaHandlerDeps {
  now?: () => number;
  audit?: typeof logAuditEvent;
  rateLimit?: (bucket: string) => Promise<RateLimitResult>;
}

const BODY_MESSAGE =
  "Body must be { pool, lendingPercent, lendingUntil }. lendingPercent is an integer from 0 to 100.";
const DEADLINE_MESSAGES = {
  seconds: "lendingUntil must be a Unix time in milliseconds",
  past: "lendingUntil must be in the future",
} as const;
const NOT_FOUND_MESSAGE = "Pool not found";
const DEFAULT_RETRY_AFTER_SECONDS = 60;

function defaultRateLimit(bucket: string): Promise<RateLimitResult> {
  return checkRateLimit(bucket, [{ ...SELF_LENDING_RATE_LIMIT }]);
}

/** Counted in its own bucket, so lending changes never spend the key's inference limit. */
async function rateLimitRefusal(
  keyId: string,
  deps: SelfLendingHandlerDeps,
  nowMs: number
): Promise<Response | null> {
  const result = await (deps.rateLimit ?? defaultRateLimit)(`self-lending:${keyId}`);
  if (result.allowed) return null;
  const retryAfter =
    typeof result.resetAt === "number"
      ? Math.max(1, Math.ceil((result.resetAt - nowMs) / 1000))
      : DEFAULT_RETRY_AFTER_SECONDS;
  return selfServiceError(429, "Too many lending changes. Retry later.", {
    "Retry-After": String(retryAfter),
  });
}

/** Bytes of the largest body read. A valid body is far shorter. */
const SELF_LENDING_MAX_BODY_BYTES = 4096;

/**
 * The body text. The read streams and stops at the cap, so a longer body is never held whole.
 * It throws `RequestBodyTooLargeError` when the body is declared or found longer than the cap.
 */
async function readCappedText(request: Request): Promise<string> {
  const bytes = await readRequestBodyWithLimit(request, SELF_LENDING_MAX_BODY_BYTES);
  return new TextDecoder().decode(bytes);
}

/** The parsed body, or null for a body that is too long, not JSON or not in the schema. */
async function readBody(request: Request): Promise<SelfLendingPatch | null> {
  let raw: unknown;
  try {
    raw = JSON.parse(await readCappedText(request));
  } catch {
    return null;
  }
  const parsed = selfLendingPatchSchema.safeParse(raw);
  return parsed.success ? parsed.data : null;
}

/** A zero percentage stores no deadline, so its deadline is not checked. */
function deadlineRefusal(body: SelfLendingPatch, nowMs: number): Response | null {
  if (body.lendingPercent === 0) return null;
  const verdict = checkLendingDeadline(body.lendingUntil, nowMs);
  return verdict === "ok" ? null : selfServiceError(400, DEADLINE_MESSAGES[verdict]);
}

async function findOwnPool(
  input: QuotaSelfViewInput,
  ref: string,
  secret: string
): Promise<SelfViewPoolContext | null> {
  const contexts = await resolveSelfPoolContexts(input, { secret });
  return contexts.find((ctx) => ctx.ref === ref) ?? null;
}

/** Writes the consent and audits it when it changed. A 404 when the allocation is gone. */
function recordConsent(
  request: Request,
  ctx: SelfViewPoolContext,
  keyId: string,
  body: SelfLendingPatch,
  audit: typeof logAuditEvent
): Response | null {
  const lendingPercent = body.lendingPercent;
  const lendingUntil = lendingPercent > 0 ? (body.lendingUntil ?? null) : null;
  const result = setAllocationLending(ctx.pool.id, keyId, { lendingPercent, lendingUntil });
  if (!result) return selfServiceError(404, NOT_FOUND_MESSAGE);
  if (!result.changed) return null;
  const requestContext = getAuditRequestContext(request);
  audit({
    action: "quota.pool.lending.updated",
    actor: `api-key:${keyId}`,
    target: ctx.pool.id,
    resourceType: "quota_pool",
    metadata: {
      apiKeyId: keyId,
      lendingPercent,
      lendingUntil,
      previousLendingPercent: result.previous.lendingPercent,
      previousLendingUntil: result.previous.lendingUntil,
    },
    ipAddress: requestContext.ipAddress ?? undefined,
    requestId: requestContext.requestId,
  });
  return null;
}

async function applyLendingPatch(
  request: Request,
  rawProvider: string,
  deps: SelfLendingHandlerDeps,
  now: () => number
): Promise<Response> {
  const auth = await authenticateSelfServiceRequest(request, deps.keyStore);
  if (!auth.ok) return auth.response;

  const segment = selfQuotaProviderSegmentSchema.safeParse(rawProvider);
  if (!segment.success) return selfServiceError(400, "Invalid provider");
  const provider = resolveProviderId(segment.data).toLowerCase();

  const limited = await rateLimitRefusal(auth.key.id, deps, now());
  if (limited) return limited;
  const body = await readBody(request);
  if (!body) return selfServiceError(400, BODY_MESSAGE);
  const badDeadline = deadlineRefusal(body, now());
  if (badDeadline) return badDeadline;

  const input = toViewInput(auth.key, provider);
  const secret = getApiKeySecret();
  const ctx = await findOwnPool(input, body.pool, secret);
  if (!ctx) return selfServiceError(404, NOT_FOUND_MESSAGE);
  if (body.lendingPercent > 0 && !isConsentPool(ctx.pool))
    return selfServiceError(403, "Lending is not enabled for this pool");

  const refused = recordConsent(request, ctx, auth.key.id, body, deps.audit ?? logAuditEvent);
  if (refused) return refused;

  const view = await (deps.buildView ?? buildQuotaSelfView)(input, { secret, now });
  return selfServiceJson(selfQuotaResponseSchema.parse(view));
}

export async function handleSelfLendingPatch(
  request: Request,
  rawProvider: string,
  deps: SelfLendingHandlerDeps = {}
): Promise<Response> {
  try {
    return await applyLendingPatch(request, rawProvider, deps, deps.now ?? Date.now);
  } catch (err) {
    return failureResponse(err);
  }
}
