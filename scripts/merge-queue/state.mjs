// scripts/merge-queue/state.mjs — WP3. Plan §3.6: queue state with compare-and-swap.
//
// Storage: contracts.STATE_BRANCH (orphan branch, created on the first save through
// gh.createOrphanBranch), file contracts.stateFilePath(base). CAS = the Contents API blob sha:
// save() passes the version read by load(); a concurrent writer makes it fail with a conflict,
// and the caller re-reads and redoes its tick (never a force push, never last-write-wins).
//
// The version handed back by save() is the git blob sha of the exact bytes written, computed
// locally (`sha1("blob <len>\0" + content)`): that is what the Contents API calls a file's `sha`,
// so it stays correct whatever extra fields the client's PUT response carries.

import { createHash } from "node:crypto";
import { STATE_BRANCH, initialState, stateFilePath, validateState } from "./contracts.mjs";

/**
 * @typedef {import("./contracts.mjs").QueueState} QueueState
 */

/**
 * @typedef {object} StateStore
 * @property {(base: string) => Promise<{state: QueueState, version: string|null}>} load
 *   initialState(base) with version null when the file/branch does not exist; throws when the
 *   stored document fails contracts.validateState (never silently resets).
 * @property {(base: string, state: QueueState, version: string|null, message: string)
 *   => Promise<{ok: true, version: string, state: QueueState} | {ok: false, conflict: true}>} save
 *   validates before writing; stamps updatedAt (the stamped document is returned as `state`).
 */

/** The stored document is unreadable or invalid. Never "fixed" by resetting the state. */
export class StateError extends Error {
  constructor(message) {
    super(message);
    this.name = "StateError";
  }
}

/** A save lost the compare-and-swap race too many times (or a tick lost it once). */
export class StateConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = "StateConflictError";
  }
}

/** Git blob sha of a UTF-8 text (the Contents API `sha` of a file with that content). */
export function gitBlobSha(content) {
  const bytes = Buffer.from(String(content), "utf8");
  return createHash("sha1").update(`blob ${bytes.length}\0`).update(bytes).digest("hex");
}

/** Canonical serialization: 2-space JSON + trailing newline (stable diffs on the branch). */
export function serializeState(state) {
  return `${JSON.stringify(state, null, 2)}\n`;
}

const BASE64_RE = /^[A-Za-z0-9+/=\s]+$/;

function parseDocument(content, where) {
  let text = String(content ?? "");
  // Defensive: a client that hands back the raw base64 payload of the Contents API.
  if (!text.trimStart().startsWith("{") && BASE64_RE.test(text) && text.trim()) {
    text = Buffer.from(text.replace(/\s+/g, ""), "base64").toString("utf8");
  }
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new StateError(`${where}: not valid JSON (${error.message})`);
  }
}

/**
 * @param {{gh: object, branch?: string, now?: () => string}} input   gh = github.mjs client
 * @returns {StateStore}
 */
export function createStateStore({
  gh,
  branch = STATE_BRANCH,
  now = () => new Date().toISOString(),
}) {
  if (!gh) throw new Error("createStateStore: gh client is required");

  async function load(base) {
    const path = stateFilePath(base);
    const where = `${branch}:${path}`;
    const file = await gh.getFileContent(path, branch);
    if (!file) return { state: initialState(base, now()), version: null };
    const state = parseDocument(file.content, where);
    const errors = validateState(state);
    if (errors.length) throw new StateError(`${where}: invalid state (${errors.join(", ")})`);
    if (state.base !== base) {
      throw new StateError(`${where}: document is for base ${JSON.stringify(state.base)}`);
    }
    return { state, version: file.sha ?? null };
  }

  async function save(base, state, version, message) {
    const path = stateFilePath(base);
    const stamped = { ...state, updatedAt: now() };
    const errors = validateState(stamped);
    if (errors.length) {
      throw new StateError(`refusing to save an invalid state for ${base}: ${errors.join(", ")}`);
    }
    if (stamped.base !== base) {
      throw new StateError(`refusing to save the state of ${stamped.base} as ${base}`);
    }
    const content = serializeState(stamped);
    const commitMessage = message || `omni-queue: state of ${base}`;
    if (version === null || version === undefined) {
      // First write ever (no branch) or first write of this base (branch exists, file absent).
      const created = await gh.createOrphanBranch(branch, [{ path, content }], commitMessage);
      if (created) return { ok: true, version: gitBlobSha(content), state: stamped };
    }
    const result = await gh.putFileContent(path, {
      branch,
      message: commitMessage,
      content,
      sha: version ?? null,
    });
    if (!result?.ok) return { ok: false, conflict: true };
    return { ok: true, version: gitBlobSha(content), state: stamped };
  }

  return { load, save };
}

/**
 * Load → mutate → save with retry on CAS conflict (re-reads and re-applies `mutate`).
 * `mutate(state)` must be deterministic given the state it receives and return the new state.
 * @param {StateStore} store
 * @param {string} base
 * @param {(state: QueueState) => Promise<QueueState>|QueueState} mutate
 * @param {{maxAttempts?: number, message?: string}} [options]
 * @returns {Promise<QueueState>}
 */
export async function updateStateWithRetry(store, base, mutate, options = {}) {
  const { maxAttempts = 3, message } = options;
  if (!Number.isSafeInteger(maxAttempts) || maxAttempts < 1) {
    throw new Error(`updateStateWithRetry: invalid maxAttempts ${maxAttempts}`);
  }
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const { state, version } = await store.load(base);
    const next = await mutate(structuredClone(state));
    const result = await store.save(base, next, version, message);
    if (result.ok) return result.state ?? next;
  }
  throw new StateConflictError(
    `state of ${base}: compare-and-swap lost ${maxAttempts} time(s) in a row`
  );
}
