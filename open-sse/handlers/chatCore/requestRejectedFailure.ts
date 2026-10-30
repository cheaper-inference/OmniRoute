import { getProviderConnectionById, updateProviderConnection } from "@/lib/db/providers";
import { shouldIsolateProbeFailures } from "@/shared/utils/probeOrigin";

import { PROVIDER_ERROR_TYPES } from "../../services/errorClassifier.ts";
import { lockModel } from "../../services/accountFallback.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";
import {
  hasRequestRejectedStreak,
  recordRequestRejected,
  seedRequestRejectedStreak,
} from "../../services/requestRejectedStreak.ts";

/**
 * chatCore leaf for PROVIDER_ERROR_TYPES.REQUEST_REJECTED (#12859 — Anthropic
 * OAuth 403 "Request not allowed").
 *
 * The upstream refused THIS request, not the credential: the same token serves
 * the next request. One refusal must not ban the connection — and a run of them
 * must not either, because a refusal answers *what was asked*. So the streak is
 * scoped to `connectionId|model` and its longest rung is a cooldown: the model
 * leaves the rotation for a while and the connection, including its sibling
 * models, stays active (services/requestRejectedStreak).
 *
 * With a resolved `targetModel` the cooldown is a model lockout, which is the
 * mechanism that already means "this model on this connection is out of
 * rotation" everywhere else in the routing path. Without one (a caller that
 * cannot attribute the refusal) it falls back to the connection-level cooldown,
 * which is strictly better than the old terminal write but still excludes the
 * whole connection — so callers SHOULD pass the model.
 *
 * Probe-origin failures (dashboard test-all) are recorded on the connection
 * but never touch the streak, cool it down or lock a model (#9817).
 */
export async function handleRequestRejectedFailure(params: {
  connectionId: string;
  provider: string;
  targetModel?: string | null;
  statusCode: number;
  message: string;
}): Promise<void> {
  const { connectionId, provider, statusCode, message } = params;
  const targetModel = params.targetModel || null;
  const nowIso = new Date().toISOString();
  // Sanitize at the write, not only at the caller: chatCore already hands in its
  // projected persistentMessage, but every `lastError` persistence branch must be
  // safe on its own (docs/security/ERROR_SANITIZATION.md) so a future caller that
  // forwards a raw upstream body cannot leak it into the stored connection state.
  const persistentMessage = sanitizeErrorMessage(message) || "Provider request failed";
  const modelLabel = targetModel ? ` model ${targetModel}` : "";

  if (await shouldIsolateProbeFailures()) {
    await updateProviderConnection(connectionId, {
      lastErrorType: PROVIDER_ERROR_TYPES.REQUEST_REJECTED,
      lastError: persistentMessage,
      lastErrorAt: nowIso,
      errorCode: statusCode,
    });
    console.warn(
      `[provider] Node ${connectionId}${modelLabel} probe refused by upstream (${statusCode}) — connection stays active`
    );
    return;
  }

  // First refusal seen by this process: pick up one that happened before a
  // restart so a crash loop cannot reset the count on every boot.
  if (!hasRequestRejectedStreak(connectionId, targetModel)) {
    const row = await getProviderConnectionById(connectionId).catch(() => null);
    if (
      row?.lastErrorType === PROVIDER_ERROR_TYPES.REQUEST_REJECTED &&
      row.lastErrorAt &&
      // The persisted row is per connection, not per model: only seed when the
      // connection row itself is the scope (no model to attribute it to).
      !targetModel
    ) {
      seedRequestRejectedStreak(connectionId, null, Date.parse(String(row.lastErrorAt)));
    }
  }

  const verdict = recordRequestRejected(connectionId, targetModel, Date.now());

  if (!verdict.counted) {
    console.warn(
      `[provider] Node ${connectionId}${modelLabel} request refused by upstream (${statusCode}) while already excluded — same episode, not counted (refusal ${verdict.streak}/${verdict.threshold})`
    );
    return;
  }

  if (targetModel) {
    // Model-scoped exclusion: the rest of the connection keeps routing. The
    // cooldown ladder caps at a long-but-temporary rung, never a terminal state.
    lockModel(provider, connectionId, targetModel, "request_rejected", verdict.cooldownMs);
    await updateProviderConnection(connectionId, {
      lastErrorType: PROVIDER_ERROR_TYPES.REQUEST_REJECTED,
      lastError: persistentMessage,
      lastErrorAt: nowIso,
      errorCode: statusCode,
    });
    const seconds = Math.ceil(verdict.cooldownMs / 1000);
    console.warn(
      `[provider] Node ${connectionId} request refused by upstream (${statusCode}) for model ${targetModel} — model out of rotation for ${seconds}s (refusal ${verdict.streak}/${verdict.threshold}), connection stays active`
    );
    return;
  }

  const until = new Date(Date.now() + verdict.cooldownMs).toISOString();
  // Same shape as the other connection-level cooldowns (testStatus
  // "unavailable" + ISO rateLimitedUntil): the dashboard shows the countdown
  // and the recovery tick restores "active" once the window has elapsed.
  await updateProviderConnection(connectionId, {
    testStatus: "unavailable",
    rateLimitedUntil: until,
    lastErrorType: PROVIDER_ERROR_TYPES.REQUEST_REJECTED,
    lastError: persistentMessage,
    lastErrorAt: nowIso,
    errorCode: statusCode,
  });
  console.warn(
    `[provider] Node ${connectionId} request refused by upstream (${statusCode}) — excluded until ${until} (refusal ${verdict.streak}/${verdict.threshold} in a row), trying other accounts`
  );
}
