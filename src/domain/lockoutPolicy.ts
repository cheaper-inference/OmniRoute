/**
 * Lockout Policy — FASE-09 Domain Extraction (T-46)
 *
 * Extracts account lockout logic from handleChat into a dedicated
 * domain service. Manages login attempt tracking and lockout decisions.
 *
 * State is persisted in SQLite via domainState.js.
 *
 * @module domain/lockoutPolicy
 */

import {
  saveLockoutState,
  loadLockoutState,
  deleteLockoutState,
  loadAllLockedIdentifiers,
} from "../lib/db/domainState";

/**
 * @typedef {Object} LockoutConfig
 * @property {number} [maxAttempts=5] - Max failed attempts before lockout
 * @property {number} [lockoutDurationMs=900000] - Lockout duration (15 min default)
 * @property {number} [attemptWindowMs=300000] - Window for counting attempts (5 min)
 */

/** @type {Map<string, { attempts: number[], lockedUntil: number|null }>} In-memory cache */
const lockoutCache = new Map<string, { attempts: number[]; lockedUntil: number | null }>();

/**
 * Max entries kept in the in-memory lockout cache. The cache is keyed by
 * arbitrary identifiers (client IPs), so without a bound it grows without
 * limit under many distinct clients — each entry is small but unbounded.
 * Eviction is LRU: on insert past the cap the least-recently-used entry is
 * dropped (it can always be reloaded from SQLite via getState).
 */
const LOCKOUT_CACHE_MAX_ENTRIES = 1000;

function cacheSet(
  identifier: string,
  state: { attempts: number[]; lockedUntil: number | null }
): void {
  if (lockoutCache.has(identifier)) lockoutCache.delete(identifier);
  lockoutCache.set(identifier, state);
  while (lockoutCache.size > LOCKOUT_CACHE_MAX_ENTRIES) {
    const oldest = lockoutCache.keys().next().value;
    if (oldest === undefined) break;
    lockoutCache.delete(oldest);
  }
}

/** @type {LockoutConfig} */
const DEFAULT_CONFIG = {
  maxAttempts: 5,
  lockoutDurationMs: 15 * 60 * 1000, // 15 minutes
  attemptWindowMs: 5 * 60 * 1000, // 5 minutes
};

/**
 * Load state from DB into cache if not already cached.
 * @param {string} identifier
 * @returns {{ attempts: number[], lockedUntil: number|null }}
 */
function getState(identifier) {
  if (lockoutCache.has(identifier)) {
    // Refresh LRU position on read.
    const hit = lockoutCache.get(identifier);
    lockoutCache.delete(identifier);
    lockoutCache.set(identifier, hit);
    return hit;
  }

  try {
    const fromDb = loadLockoutState(identifier);
    if (fromDb) {
      cacheSet(identifier, fromDb);
      return fromDb;
    }
  } catch {
    // DB may not be ready
  }

  return null;
}

/**
 * Persist state to both cache and DB.
 * @param {string} identifier
 * @param {{ attempts: number[], lockedUntil: number|null }} state
 */
function persistState(identifier, state) {
  cacheSet(identifier, state);
  try {
    saveLockoutState(identifier, state);
  } catch {
    // Non-critical
  }
}

/**
 * Check if an identifier (IP, username, API key) is currently locked out.
 *
 * @param {string} identifier - The identifier to check
 * @param {LockoutConfig} [config]
 * @returns {{ locked: boolean, remainingMs?: number, attempts?: number }}
 */
export function checkLockout(identifier, config = DEFAULT_CONFIG) {
  const state = getState(identifier);
  if (!state) {
    return { locked: false, attempts: 0 };
  }

  // Check if lockout has expired
  if (state.lockedUntil && Date.now() < state.lockedUntil) {
    return {
      locked: true,
      remainingMs: state.lockedUntil - Date.now(),
      attempts: state.attempts.length,
    };
  }

  // Clear expired lockout
  if (state.lockedUntil) {
    state.lockedUntil = null;
    state.attempts = [];
    persistState(identifier, state);
  }

  // Count recent attempts within the window
  const windowStart = Date.now() - config.attemptWindowMs;
  const recentAttempts = state.attempts.filter((t) => t > windowStart);
  state.attempts = recentAttempts;
  persistState(identifier, state);

  return { locked: false, attempts: recentAttempts.length };
}

/**
 * Record a failed attempt. Returns whether the identifier is now locked out.
 *
 * @param {string} identifier
 * @param {LockoutConfig} [config]
 * @returns {{ locked: boolean, remainingMs?: number }}
 */
export function recordFailedAttempt(identifier, config = DEFAULT_CONFIG) {
  let state = getState(identifier);
  if (!state) {
    state = { attempts: [], lockedUntil: null };
  }

  // Clean old attempts
  const windowStart = Date.now() - config.attemptWindowMs;
  state.attempts = state.attempts.filter((t) => t > windowStart);

  // Record new attempt
  state.attempts.push(Date.now());

  // Check if threshold exceeded
  if (state.attempts.length >= config.maxAttempts) {
    state.lockedUntil = Date.now() + config.lockoutDurationMs;
    persistState(identifier, state);
    return {
      locked: true,
      remainingMs: config.lockoutDurationMs,
    };
  }

  persistState(identifier, state);
  return { locked: false };
}

/**
 * Record a successful login — clears history for identifier.
 *
 * @param {string} identifier
 */
export function recordSuccess(identifier) {
  lockoutCache.delete(identifier);
  try {
    deleteLockoutState(identifier);
  } catch {
    // Non-critical
  }
}

/**
 * Force-unlock an identifier (admin action).
 *
 * @param {string} identifier
 */
export function forceUnlock(identifier) {
  lockoutCache.delete(identifier);
  try {
    deleteLockoutState(identifier);
  } catch {
    // Non-critical
  }
}

/**
 * Get all currently locked identifiers (for monitoring).
 *
 * @returns {Array<{ identifier: string, lockedUntil: number, remainingMs: number }>}
 */
export function getLockedIdentifiers() {
  const now = Date.now();

  // Build a merged view of cached states and active locked identifiers from the DB,
  // without writing incomplete (empty-attempts) state into the shared cache.
  const merged = new Map<string, { attempts: number[]; lockedUntil: number | null }>();
  for (const [id, state] of lockoutCache.entries()) {
    merged.set(id, state);
  }
  try {
    const fromDb = loadAllLockedIdentifiers();
    for (const entry of fromDb) {
      if (!merged.has(entry.identifier)) {
        merged.set(entry.identifier, {
          attempts: [],
          lockedUntil: entry.lockedUntil,
        });
      }
    }
  } catch {
    // Use cache only
  }

  const locked = [];
  for (const [id, state] of merged.entries()) {
    if (state.lockedUntil && state.lockedUntil > now) {
      locked.push({
        identifier: id,
        lockedUntil: state.lockedUntil,
        remainingMs: state.lockedUntil - now,
      });
    }
  }

  return locked;
}

/** Test hook: current in-memory cache size (bounded by LOCKOUT_CACHE_MAX_ENTRIES). */
export function getLockoutCacheSize(): number {
  return lockoutCache.size;
}
