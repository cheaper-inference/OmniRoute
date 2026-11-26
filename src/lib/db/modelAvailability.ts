import { z } from "zod";
import { getDbInstance } from "./core";
import type { SqliteAdapter } from "./adapters/types";

const WINDOW_MS = 86_400_000;
const CONFIRMATION_MS = 30 * WINDOW_MS;
const CLEANUP_BATCH_SIZE = 64;
const reason = "explicit_model_not_found" as const;

const scopeSchema = z.object({
  providerId: z.string().min(1),
  connectionId: z.string().min(1),
  connectionRevision: z.string().min(1),
  endpointKind: z.enum(["chat_completions", "responses"]),
  modelId: z.string().min(1),
});
const timestamps = {
  startedAtMs: z.number().int().nonnegative(),
  observedAtMs: z.number().int().nonnegative(),
};
const observationSchema = z
  .discriminatedUnion("kind", [
    z.object({ kind: z.literal(reason), requestId: z.string().min(1), ...timestamps }),
    z.object({ kind: z.literal("accepted"), ...timestamps }),
  ])
  .refine(({ startedAtMs, observedAtMs }) => startedAtMs <= observedAtMs);

export type ModelAvailabilityScope = Readonly<z.infer<typeof scopeSchema>>;
export type ModelAvailabilityObservation = z.infer<typeof observationSchema>;
export type ConfirmedModelUnavailability = Readonly<{
  reason: typeof reason;
  confirmedAtMs: number;
  expiresAtMs: number;
}>;

type EvidenceRow = {
  firstAtMs: number | null;
  successAtMs: number | null;
  confirmedAtMs: number | null;
  expiresAtMs: number;
};

const scopeWhere = `provider_id = @providerId AND connection_id = @connectionId
  AND connection_revision = @connectionRevision AND endpoint_kind = @endpointKind
  AND model_id = @modelId`;
const currentConnectionWhere = `id = @connectionId AND provider = @providerId
  AND model_availability_revision = @connectionRevision AND auth_type = 'apikey'`;

export function isCurrentModelAvailabilityConnection(
  scope: Pick<ModelAvailabilityScope, "providerId" | "connectionId" | "connectionRevision">
): boolean {
  return Boolean(
    getDbInstance()
      .prepare(`SELECT 1 FROM provider_connections WHERE ${currentConnectionWhere}`)
      .get(scope)
  );
}

export function getConfirmedModelUnavailability(
  scope: ModelAvailabilityScope,
  nowMs: number
): ConfirmedModelUnavailability | null {
  if (!scopeSchema.safeParse(scope).success || !Number.isSafeInteger(nowMs)) return null;
  return (
    (getDbInstance()
      .prepare(
        `SELECT reason, confirmed_at_ms AS confirmedAtMs, expires_at_ms AS expiresAtMs
        FROM model_availability_evidence WHERE ${scopeWhere} AND confirmed_at_ms <= @nowMs
        AND expires_at_ms > @nowMs
        AND EXISTS (SELECT 1 FROM provider_connections WHERE ${currentConnectionWhere})`
      )
      .get({ ...scope, nowMs }) as ConfirmedModelUnavailability | undefined) ?? null
  );
}

function pruneExpired(db: SqliteAdapter, at: number) {
  for (const table of ["model_availability_evidence", "model_availability_requests"]) {
    // Keep the exact 24-hour boundary available to a second observation.
    db.prepare(
      `DELETE FROM ${table} WHERE rowid IN (
      SELECT rowid FROM ${table} WHERE expires_at_ms < ? ORDER BY expires_at_ms LIMIT ?
    )`
    ).run(at, CLEANUP_BATCH_SIZE);
  }
}

function saveEvidence(db: SqliteAdapter, scope: ModelAvailabilityScope, row: EvidenceRow) {
  db.prepare(
    `INSERT INTO model_availability_evidence (
      provider_id, connection_id, connection_revision, endpoint_kind, model_id,
      reason, first_at_ms, confirmed_at_ms, success_at_ms, expires_at_ms
    ) VALUES (
      @providerId, @connectionId, @connectionRevision, @endpointKind, @modelId,
      @reason, @firstAtMs, @confirmedAtMs, @successAtMs, @expiresAtMs
    ) ON CONFLICT (provider_id, connection_id, connection_revision, endpoint_kind, model_id)
    DO UPDATE SET reason = excluded.reason, first_at_ms = excluded.first_at_ms,
      confirmed_at_ms = excluded.confirmed_at_ms, success_at_ms = excluded.success_at_ms,
      expires_at_ms = excluded.expires_at_ms
    `
  ).run({ ...scope, ...row, reason: row.firstAtMs === null ? null : reason });
}

function nextFailureEvidence(
  previousAt: number | null | undefined,
  successAtMs: number | null,
  observedAtMs: number
): EvidenceRow {
  const qualifies = previousAt != null && Math.abs(observedAtMs - previousAt) <= WINDOW_MS;
  const confirmedAtMs = qualifies ? Math.max(observedAtMs, previousAt) : null;
  return {
    firstAtMs: qualifies ? Math.min(observedAtMs, previousAt) : observedAtMs,
    confirmedAtMs,
    successAtMs,
    expiresAtMs:
      confirmedAtMs === null ? observedAtMs + WINDOW_MS : confirmedAtMs + CONFIRMATION_MS,
  };
}

function recordFailure(
  db: SqliteAdapter,
  scope: ModelAvailabilityScope,
  prior: EvidenceRow | undefined,
  observation: Extract<ModelAvailabilityObservation, { kind: typeof reason }>
) {
  const { requestId, observedAtMs, startedAtMs } = observation;
  const lastSuccessAt = prior?.successAtMs;
  const successAtMs =
    lastSuccessAt != null && observedAtMs <= lastSuccessAt + WINDOW_MS ? lastSuccessAt : null;
  if (successAtMs !== null && startedAtMs <= successAtMs) return;
  const claim = db
    .prepare(
      `INSERT OR IGNORE INTO model_availability_requests (
    provider_id, connection_id, connection_revision, endpoint_kind, model_id, request_id, expires_at_ms
  ) VALUES (@providerId, @connectionId, @connectionRevision, @endpointKind, @modelId, @requestId, @until)`
    )
    .run({ ...scope, requestId, until: observedAtMs + CONFIRMATION_MS });
  if (!claim.changes) return;
  if (prior?.confirmedAtMs != null && observedAtMs < prior.expiresAtMs) return;

  const previousAt = prior?.confirmedAtMs == null ? prior?.firstAtMs : null;
  saveEvidence(db, scope, nextFailureEvidence(previousAt, successAtMs, observedAtMs));
}

export function recordModelAvailabilityObservation(
  scope: ModelAvailabilityScope,
  observation: ModelAvailabilityObservation
): void {
  if (!scopeSchema.safeParse(scope).success || !observationSchema.safeParse(observation).success)
    return;
  const db = getDbInstance();
  db.immediate(() => {
    if (!isCurrentModelAvailabilityConnection(scope)) return;
    const at = observation.observedAtMs;
    pruneExpired(db, at);
    const prior = db
      .prepare(
        `SELECT first_at_ms AS firstAtMs, confirmed_at_ms AS confirmedAtMs,
      success_at_ms AS successAtMs, expires_at_ms AS expiresAtMs
      FROM model_availability_evidence WHERE ${scopeWhere}`
      )
      .get(scope) as EvidenceRow | undefined;
    if (observation.kind === reason) {
      recordFailure(db, scope, prior, observation);
    } else if (!prior?.successAtMs || prior.successAtMs < at) {
      // Preserve a newer sequence if a success was delivered to this transaction out of order.
      if (prior?.firstAtMs != null && prior.firstAtMs > at) return;
      saveEvidence(db, scope, {
        firstAtMs: null,
        confirmedAtMs: null,
        successAtMs: at,
        expiresAtMs: at + WINDOW_MS,
      });
    }
  });
}
