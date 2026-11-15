import { mergeCodexQuotaObservation } from "@/lib/providers/codexQuotaDisplay";
import { backupDbFile } from "../backup";
import { getDbInstance, rowToCamel } from "../core";
import { invalidateDbCache } from "../readCache";
import { toRecord } from "./columns";
import { mayWriteCodexConnection } from "../codexConnectionFences";

type JsonRecord = Record<string, unknown>;

interface StatementLike<TRow = unknown> {
  get: (...params: unknown[]) => TRow | undefined;
  run: (...params: unknown[]) => { changes?: number };
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
  transaction: <T>(fn: () => T) => () => T;
}

type CodexScopedQuotaPatch = {
  quotaState?: JsonRecord;
  exhaustedWindow?: "5h" | "7d" | null;
  rateLimitedUntil?: string | null;
  rateLimitSource?: "fallback" | "quota_reset" | "quota_preflight";
};

const CODEX_CHILD_COOLDOWN_KEYS = [
  "codexScopeRateLimitedUntil",
  "codexScopeRateLimitSource",
] as const;

function omitEmptyRecord(record: JsonRecord): JsonRecord | undefined {
  return Object.keys(record).length > 0 ? record : undefined;
}

/** Drop nested Codex child cooldowns; keep quota snapshots and unrelated keys. */
export function stripCodexChildCooldownFields(psd: JsonRecord): JsonRecord {
  if (!connectionHasCodexChildCooldown(psd)) return psd;
  const next = { ...psd };
  for (const key of CODEX_CHILD_COOLDOWN_KEYS) delete next[key];
  return next;
}

/** PUT/CAS payload that clears the parent column must also drop nested maps. */
export function applyCodexChildCooldownClearOnUpdate<T extends JsonRecord | undefined>(
  data: JsonRecord,
  psd: T
): T {
  if (psd == null) return psd;
  if (!Object.hasOwn(data, "rateLimitedUntil")) return psd;
  if (data.rateLimitedUntil != null && data.rateLimitedUntil !== "") return psd;
  return stripCodexChildCooldownFields(psd) as T;
}

function connectionHasCodexChildCooldown(psd: JsonRecord): boolean {
  return "codexScopeRateLimitedUntil" in psd || "codexScopeRateLimitSource" in psd;
}

/**
 * Persist a full-parent cooldown lift into the nested Codex child maps.
 * When `alsoClearTopLevel` is set, the parent `rate_limited_until` column is
 * nulled in the same transaction so a crash between the two writes cannot
 * leave a nested child map behind a cleared parent column.
 */
export function stripCodexChildCooldownsFromConnection(
  id: string,
  options?: { alsoClearTopLevel?: boolean }
): void {
  if (typeof id !== "string" || id.length === 0) return;
  const db = getDbInstance() as unknown as DbLike;
  if (!mayWriteCodexConnection(id)) return;
  const alsoClearTopLevel = options?.alsoClearTopLevel === true;
  const candidate = db.prepare("SELECT provider FROM provider_connections WHERE id = ?").get(id);
  const isCodex = toRecord(candidate).provider === "codex";
  if (!alsoClearTopLevel && !isCodex) return;

  backupDbFile("pre-write");
  const wrote = db.transaction(() => {
    if (!mayWriteCodexConnection(id)) return false;
    const existing = db
      .prepare("SELECT provider, provider_specific_data FROM provider_connections WHERE id = ?")
      .get(id);
    if (!existing) return false;
    const existingRecord = toRecord(rowToCamel(existing));
    const providerSpecificData = toRecord(existingRecord.providerSpecificData);
    const stripNested =
      existingRecord.provider === "codex" && connectionHasCodexChildCooldown(providerSpecificData);
    if (!alsoClearTopLevel && !stripNested) return false;

    const now = new Date().toISOString();
    if (alsoClearTopLevel && stripNested) {
      db.prepare(
        `UPDATE provider_connections
         SET rate_limited_until = NULL,
             provider_specific_data = ?,
             updated_at = ?
         WHERE id = ?`
      ).run(JSON.stringify(stripCodexChildCooldownFields(providerSpecificData)), now, id);
      return true;
    }
    if (alsoClearTopLevel) {
      db.prepare(
        `UPDATE provider_connections
         SET rate_limited_until = NULL, updated_at = ?
         WHERE id = ?`
      ).run(now, id);
      return true;
    }
    db.prepare(
      `UPDATE provider_connections
       SET provider_specific_data = ?, updated_at = ?
       WHERE id = ?`
    ).run(JSON.stringify(stripCodexChildCooldownFields(providerSpecificData)), now, id);
    return true;
  })();
  // Touches only rate_limited_until and codex-scope cooldown keys inside
  // provider_specific_data — none are read by the /v1/models catalog builder.
  if (wrote) invalidateDbCache("connections", id, { skipModelCatalog: true });
}

function applyQuotaStatePatch(
  previous: JsonRecord,
  next: JsonRecord,
  scope: "codex" | "spark",
  quotaState: JsonRecord | undefined
): boolean {
  if (!quotaState) return true;
  const byScope = toRecord(previous.codexQuotaStateByScope);
  const merged = mergeCodexQuotaObservation(toRecord(byScope[scope]), quotaState);
  if (!merged) return false;
  next.codexQuotaStateByScope = { ...byScope, [scope]: merged };
  next.codexQuotaState = { ...merged, scope, updatedAt: quotaState.observedAt };
  return true;
}

/**
 * Atomically merge one virtual Codex child's quota evidence into its persisted parent.
 * The transaction reads the latest row so sibling child state cannot be lost.
 */
export async function updateCodexScopedQuotaState(
  id: string,
  scope: "codex" | "spark",
  patch: CodexScopedQuotaPatch
): Promise<JsonRecord | null> {
  const db = getDbInstance() as unknown as DbLike;
  const candidate = db.prepare("SELECT provider FROM provider_connections WHERE id = ?").get(id);
  if (toRecord(candidate).provider !== "codex") return null;

  backupDbFile("pre-write");
  const persisted = db.transaction(() => {
    if (!mayWriteCodexConnection(id)) return null;
    const existing = db.prepare("SELECT * FROM provider_connections WHERE id = ?").get(id);
    if (!existing) return null;

    const existingRecord = toRecord(rowToCamel(existing));
    if (existingRecord.provider !== "codex") return null;
    const providerSpecificData = toRecord(existingRecord.providerSpecificData);
    const nextProviderSpecificData: JsonRecord = { ...providerSpecificData };

    if (
      !applyQuotaStatePatch(providerSpecificData, nextProviderSpecificData, scope, patch.quotaState)
    ) {
      return null;
    }

    if (patch.exhaustedWindow !== undefined) {
      const exhaustedByScope = { ...toRecord(providerSpecificData.codexExhaustedWindowByScope) };
      if (patch.exhaustedWindow) exhaustedByScope[scope] = patch.exhaustedWindow;
      else delete exhaustedByScope[scope];
      nextProviderSpecificData.codexExhaustedWindowByScope = exhaustedByScope;
      if (patch.exhaustedWindow) {
        nextProviderSpecificData.codexExhaustedWindow = patch.exhaustedWindow;
      } else {
        delete nextProviderSpecificData.codexExhaustedWindow;
      }
    }

    if (patch.rateLimitedUntil !== undefined) {
      const scopeCooldowns = { ...toRecord(providerSpecificData.codexScopeRateLimitedUntil) };
      const sourceByScope = { ...toRecord(providerSpecificData.codexScopeRateLimitSource) };
      if (patch.rateLimitedUntil) {
        const existingCooldownMs =
          typeof scopeCooldowns[scope] === "string"
            ? new Date(scopeCooldowns[scope] as string).getTime()
            : NaN;
        // A local text quota preflight must not downgrade an existing upstream
        // or legacy cooldown; only another preflight may replace a preflight.
        const existingIsAuthoritative =
          Number.isFinite(existingCooldownMs) &&
          existingCooldownMs > Date.now() &&
          ((sourceByScope[scope] === "quota_reset" && patch.rateLimitSource !== "quota_reset") ||
            (patch.rateLimitSource === "quota_preflight" &&
              sourceByScope[scope] !== "quota_preflight"));
        scopeCooldowns[scope] = existingIsAuthoritative
          ? scopeCooldowns[scope]
          : patch.rateLimitedUntil;
        sourceByScope[scope] = existingIsAuthoritative
          ? sourceByScope[scope]
          : (patch.rateLimitSource ?? "fallback");
      } else {
        delete scopeCooldowns[scope];
        delete sourceByScope[scope];
      }
      const nextCooldowns = omitEmptyRecord(scopeCooldowns);
      const nextSources = omitEmptyRecord(sourceByScope);
      if (nextCooldowns) nextProviderSpecificData.codexScopeRateLimitedUntil = nextCooldowns;
      else delete nextProviderSpecificData.codexScopeRateLimitedUntil;
      if (nextSources) nextProviderSpecificData.codexScopeRateLimitSource = nextSources;
      else delete nextProviderSpecificData.codexScopeRateLimitSource;
    }

    db.prepare(
      `UPDATE provider_connections
       SET provider_specific_data = ?, updated_at = ?
       WHERE id = ?`
    ).run(JSON.stringify(nextProviderSpecificData), new Date().toISOString(), id);
    return nextProviderSpecificData;
  })();

  // Codex-scope quota/cooldown keys only (codexQuotaState*, codexExhaustedWindow*,
  // codexScopeRateLimit*) — routing metadata the /v1/models builder never reads.
  if (persisted) invalidateDbCache("connections", id, { skipModelCatalog: true });
  return persisted;
}

/** Grace window absorbing clock skew against the upstream quota server. */
const QUOTA_RESET_CLOCK_SKEW_GRACE_MS = 30_000;

/** Cheap probe: does this connection+scope currently carry a child cooldown? */
export function hasCodexScopeCooldown(id: string, scope: "codex" | "spark"): boolean {
  if (typeof id !== "string" || id.length === 0) return false;
  const db = getDbInstance() as unknown as DbLike;
  const row = db
    .prepare("SELECT provider, provider_specific_data FROM provider_connections WHERE id = ?")
    .get(id);
  if (!row) return false;
  const record = toRecord(rowToCamel(row));
  if (record.provider !== "codex") return false;
  const psd = toRecord(record.providerSpecificData);
  return Boolean(toRecord(psd.codexScopeRateLimitedUntil)[scope]);
}

/**
 * #12860: When fresh quota snapshot data demonstrates headroom on a scope,
 * lift any fallback-sourced cooldown (e.g. parked by quota preflight).
 * Cooldowns sourced from upstream 429 quota_reset retain their authority
 * until their reset timestamp has elapsed.
 */
export function liftCodexScopeCooldownOnHeadroom(id: string, scope: "codex" | "spark"): boolean {
  if (typeof id !== "string" || id.length === 0) return false;
  const db = getDbInstance() as unknown as DbLike;

  // Cheap eligibility probe so the backup only runs when a write is plausible.
  // The transaction below re-reads under lock and remains the authority.
  if (!hasCodexScopeCooldown(id, scope)) return false;

  backupDbFile("pre-write");
  const wrote = db.transaction(() => {
    if (!mayWriteCodexConnection(id)) return false;
    const existing = db
      .prepare("SELECT provider, provider_specific_data FROM provider_connections WHERE id = ?")
      .get(id);
    if (!existing) return false;
    const existingRecord = toRecord(rowToCamel(existing));
    if (existingRecord.provider !== "codex") return false;
    const currentPsd = toRecord(existingRecord.providerSpecificData);
    const currentCooldowns = { ...toRecord(currentPsd.codexScopeRateLimitedUntil) };
    if (!currentCooldowns[scope]) return false;

    const currentSources = { ...toRecord(currentPsd.codexScopeRateLimitSource) };
    const curSource = currentSources[scope];
    const curUntilMs =
      typeof currentCooldowns[scope] === "string"
        ? new Date(currentCooldowns[scope] as string).getTime()
        : NaN;
    // An upstream-authoritative `quota_reset` deadline outranks a local snapshot:
    // the grace window absorbs clock skew against the quota server, so a fast
    // local clock cannot lift a cooldown upstream still considers active.
    if (
      curSource === "quota_reset" &&
      Number.isFinite(curUntilMs) &&
      curUntilMs > Date.now() - QUOTA_RESET_CLOCK_SKEW_GRACE_MS
    ) {
      return false;
    }

    delete currentCooldowns[scope];
    delete currentSources[scope];

    const nextPsd: JsonRecord = { ...currentPsd };
    const nextCooldowns = omitEmptyRecord(currentCooldowns);
    const nextSources = omitEmptyRecord(currentSources);
    if (nextCooldowns) nextPsd.codexScopeRateLimitedUntil = nextCooldowns;
    else delete nextPsd.codexScopeRateLimitedUntil;
    if (nextSources) nextPsd.codexScopeRateLimitSource = nextSources;
    else delete nextPsd.codexScopeRateLimitSource;

    const exhaustedByScope = { ...toRecord(currentPsd.codexExhaustedWindowByScope) };
    if (exhaustedByScope[scope]) {
      delete exhaustedByScope[scope];
      const nextExhausted = omitEmptyRecord(exhaustedByScope);
      if (nextExhausted) {
        nextPsd.codexExhaustedWindowByScope = nextExhausted;
      } else {
        delete nextPsd.codexExhaustedWindowByScope;
        delete nextPsd.codexExhaustedWindow;
      }
    }

    const now = new Date().toISOString();
    db.prepare(
      `UPDATE provider_connections
       SET provider_specific_data = ?, updated_at = ?
       WHERE id = ?`
    ).run(JSON.stringify(nextPsd), now, id);
    return true;
  })();

  // Codex-scope cooldown/exhaustion keys only — routing metadata the
  // /v1/models builder never reads.
  if (wrote) invalidateDbCache("connections", id, { skipModelCatalog: true });
  return wrote;
}

/** Persist one child cooldown through the shared scoped quota-state transaction. */
export async function updateCodexScopeCooldown(
  id: string,
  scope: "codex" | "spark",
  rateLimitedUntil: string,
  source: "fallback" | "quota_preflight" = "fallback"
): Promise<JsonRecord | null> {
  return updateCodexScopedQuotaState(id, scope, {
    rateLimitedUntil,
    rateLimitSource: source,
  });
}

/**
 * Codex + ChatGPT-account model rejections ("The '<model>' model is not supported when using
 * Codex with a ChatGPT account.") are EXACT-MODEL locks, never quota-family ones: they must
 * survive a restart so the same model is not re-probed on every boot, while sibling models of
 * the same account keep routing. Stored on the connection row (no migration) as
 * `model → ISO deadline`, pruned of expired entries on every write.
 *
 * Bounded: a rejection map is routing metadata, not a ledger. Anything beyond the cap is
 * dropped oldest-first, which can only cost an extra upstream probe later.
 */
const CODEX_UNSUPPORTED_MODELS_LIMIT = 50;

type UnsupportedModelMap = Record<string, string>;

/** Keep only well-formed, still-future entries, oldest deadline first when over the cap. */
function pruneUnsupportedModels(raw: UnsupportedModelMap, now: number): UnsupportedModelMap {
  const live = Object.entries(raw)
    .map(([model, until]) => ({ model, until, untilMs: new Date(until).getTime() }))
    .filter(
      (entry) => entry.model.length > 0 && Number.isFinite(entry.untilMs) && entry.untilMs > now
    )
    .sort((a, b) => a.untilMs - b.untilMs);
  const kept = live.slice(0, CODEX_UNSUPPORTED_MODELS_LIMIT);
  return Object.fromEntries(kept.map((entry) => [entry.model, entry.until]));
}

function readUnsupportedModelsPsd(psd: JsonRecord): UnsupportedModelMap {
  const raw = psd.codexUnsupportedModelsUntil;
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const out: UnsupportedModelMap = {};
  for (const [model, until] of Object.entries(raw as Record<string, unknown>)) {
    if (typeof model !== "string" || model.length === 0) continue;
    if (typeof until !== "string" || until.length === 0) continue;
    out[model] = until;
  }
  return out;
}

/** Active persisted rejections for one connection (diagnostics and tests). */
export function readCodexUnsupportedModels(id: string): Array<{ model: string; until: string }> {
  if (typeof id !== "string" || id.length === 0) return [];
  const db = getDbInstance() as unknown as DbLike;
  const row = db
    .prepare("SELECT provider, provider_specific_data FROM provider_connections WHERE id = ?")
    .get(id);
  if (!row) return [];
  const record = toRecord(rowToCamel(row));
  if (record.provider !== "codex") return [];
  const now = Date.now();
  return Object.entries(readUnsupportedModelsPsd(toRecord(record.providerSpecificData)))
    .filter(([, until]) => new Date(until).getTime() > now)
    .map(([model, until]) => ({ model, until }));
}

/**
 * Record one exact-model rejection. Idempotent: an existing entry keeps the LATER deadline, so a
 * repeated refusal never shortens a lock and a shorter one never overwrites a longer one.
 *
 * Best-effort durability: callers run inside the routing hot path, where the in-memory lock is
 * already the authority for this process. A storage failure must never turn a refusal into a
 * thrown request — the worst case of returning false is one extra upstream probe after restart.
 */
export function persistCodexUnsupportedModel(id: string, model: string, until: string): boolean {
  if (typeof id !== "string" || id.length === 0) return false;
  if (typeof model !== "string" || model.length === 0) return false;
  const untilMs = new Date(until).getTime();
  if (!Number.isFinite(untilMs)) return false;

  try {
    const db = getDbInstance() as unknown as DbLike;
    const candidate = db.prepare("SELECT provider FROM provider_connections WHERE id = ?").get(id);
    if (toRecord(candidate).provider !== "codex") return false;

    backupDbFile("pre-write");
    const wrote = db.transaction(() => {
      if (!mayWriteCodexConnection(id)) return false;
      const existing = db
        .prepare("SELECT provider, provider_specific_data FROM provider_connections WHERE id = ?")
        .get(id);
      if (!existing) return false;
      const existingRecord = toRecord(rowToCamel(existing));
      if (existingRecord.provider !== "codex") return false;
      const psd = toRecord(existingRecord.providerSpecificData);
      const current = readUnsupportedModelsPsd(psd);
      const now = Date.now();
      const previousMs = new Date(current[model] ?? "").getTime();
      current[model] = new Date(
        Number.isFinite(previousMs) && previousMs > untilMs ? previousMs : untilMs
      ).toISOString();
      const next = pruneUnsupportedModels(current, now);

      db.prepare(
        `UPDATE provider_connections
         SET provider_specific_data = ?, updated_at = ?
         WHERE id = ?`
      ).run(
        JSON.stringify({ ...psd, codexUnsupportedModelsUntil: next }),
        new Date(now).toISOString(),
        id
      );
      return true;
    })();
    // Routing metadata only — the /v1/models builder never reads this key.
    if (wrote) invalidateDbCache("connections", id, { skipModelCatalog: true });
    return wrote;
  } catch {
    return false;
  }
}

/**
 * Drop one exact-model rejection after the account actually served the model again.
 *
 * Best-effort, like `persistCodexUnsupportedModel`: it runs on every successful codex response,
 * so a storage error must not fail a request that already succeeded.
 */
export function clearCodexUnsupportedModel(id: string, model: string): boolean {
  if (typeof id !== "string" || id.length === 0) return false;
  if (typeof model !== "string" || model.length === 0) return false;

  try {
    const db = getDbInstance() as unknown as DbLike;
    const candidate = db
      .prepare("SELECT provider, provider_specific_data FROM provider_connections WHERE id = ?")
      .get(id);
    if (!candidate) return false;
    const candidateRecord = toRecord(rowToCamel(candidate));
    if (candidateRecord.provider !== "codex") return false;
    // Cheap eligibility probe so the backup only runs when a write is plausible; the
    // transaction below re-reads under lock and remains the authority.
    if (!(model in readUnsupportedModelsPsd(toRecord(candidateRecord.providerSpecificData)))) {
      return false;
    }

    backupDbFile("pre-write");
    const wrote = db.transaction(() => {
      if (!mayWriteCodexConnection(id)) return false;
      const existing = db
        .prepare("SELECT provider, provider_specific_data FROM provider_connections WHERE id = ?")
        .get(id);
      if (!existing) return false;
      const existingRecord = toRecord(rowToCamel(existing));
      if (existingRecord.provider !== "codex") return false;
      const psd = toRecord(existingRecord.providerSpecificData);
      const current = readUnsupportedModelsPsd(psd);
      if (!(model in current)) return false;
      const next = pruneUnsupportedModels(current, Date.now());
      delete next[model];

      db.prepare(
        `UPDATE provider_connections
         SET provider_specific_data = ?, updated_at = ?
         WHERE id = ?`
      ).run(
        JSON.stringify({ ...psd, codexUnsupportedModelsUntil: next }),
        new Date().toISOString(),
        id
      );
      return true;
    })();
    if (wrote) invalidateDbCache("connections", id, { skipModelCatalog: true });
    return wrote;
  } catch {
    return false;
  }
}
