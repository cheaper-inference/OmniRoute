// scripts/merge-queue/state.mjs — WP3. Plan §3.6: queue state with compare-and-swap.
// STUB written by the lead: exported names, parameters and return shapes are the contract.
//
// Storage: contracts.STATE_BRANCH (orphan branch, created on the first save through
// gh.createOrphanBranch), file contracts.stateFilePath(base). CAS = the Contents API blob sha:
// save() passes the version read by load(); a concurrent writer makes it fail with a conflict,
// and the caller re-reads and redoes its tick (never a force push, never last-write-wins).

/**
 * @typedef {import("./contracts.mjs").QueueState} QueueState
 */

/**
 * @typedef {object} StateStore
 * @property {(base: string) => Promise<{state: QueueState, version: string|null}>} load
 *   initialState(base) with version null when the file/branch does not exist; throws when the
 *   stored document fails contracts.validateState (never silently resets).
 * @property {(base: string, state: QueueState, version: string|null, message: string)
 *   => Promise<{ok: true, version: string} | {ok: false, conflict: true}>} save
 *   validates before writing; stamps updatedAt.
 */

/**
 * @param {{gh: object, branch?: string, now?: () => string}} input   gh = github.mjs client
 * @returns {StateStore}
 */
export function createStateStore(input) {
  void input;
  throw new Error("not implemented (WP3)");
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
export async function updateStateWithRetry(store, base, mutate, options) {
  void store;
  void base;
  void mutate;
  void options;
  throw new Error("not implemented (WP3)");
}
