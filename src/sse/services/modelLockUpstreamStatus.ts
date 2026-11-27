/**
 * #20969: which upstream statuses a model-only cooldown answer may echo to the client.
 *
 * A model lock keeps the upstream status of the failure that created it. Only the billing class
 * (400 "credit balance is too low", 402) is worth echoing: it tells the client "add credit"
 * instead of "wait". Every other status stays the local 429 model cooldown. In particular a
 * 401/403 from a local answer reads to a client as "your OmniRoute key was rejected", and a
 * 5xx would read as a provider outage that the lock never saw.
 */
const ECHOED_MODEL_LOCK_STATUSES: ReadonlySet<number> = new Set([400, 402]);

/** The upstream status to echo for a model lock, or null when the answer must stay a 429. */
export function echoableModelLockStatus(errorCode: unknown): number | null {
  const status = Number(errorCode);
  return ECHOED_MODEL_LOCK_STATUSES.has(status) ? status : null;
}
