// scripts/merge-queue/voice.mjs — who performs the queue's human-visible writes (config `voice`).
//
// With `voice: "app"` (the default) the tick uses the App's client for everything, as before; this
// module is not involved. With `voice: "owner"` the writes people read on GitHub go out with the
// owner's token (OMNI_QUEUE_LAND_TOKEN, the token the tick already holds for the landing):
//   - every comment the tick posts on a pull request, and every label it removes from one;
//   - the dashboard issue: opening it, updating its body, its comments (the stalled alert too);
//   - comments on the base-red issue, and the tree-divergence issue if the tick opens one.
// Everything else stays the App's: commit statuses (omni-queue/land, the approvals, a bless),
// candidate branches, the omni-queue-state branch, re-runs of workflow jobs, and every read.
//
// NEVER LOSE A MESSAGE. The owner's token absent, or a 401/403 from GitHub on an owner write (or
// on reading the owner's login): the same write is made with the App's token, and the caller is
// told through `onFallback` (the tick records it once per tick, see Tick.voiceFallback). Any other
// error (a 5xx, a timeout) is thrown as the App's own errors are: the next tick redoes the write,
// whose idempotence (commentOnce markers, an absent label, the dashboard upsert) is unchanged.
//
// The queue recognises its own comments by their marker AND their author (github.commentOnce).
// Under the owner voice the owner's login counts too. That login is read from the owner's token
// itself (GET /user, once per process), never from configuration or any other text.
//
// Zero-dependency on purpose, like every module the queue workflow runs.

import { VOICES } from "./config.mjs";

export { VOICES };

/** Start of the `error` event detail that records a fallback (one per tick, Tick.voiceFallback). */
export const VOICE_FALLBACK_PREFIX = "owner voice unavailable";

/** The `error` event detail of a fallback whose cause is `cause`. */
export const voiceFallbackDetail = (cause) =>
  `${VOICE_FALLBACK_PREFIX}, written with the App's token instead: ${cause}`;

/** The one-line note (log, decisions) of the write `what` that fell back for `cause`. */
export const voiceFallbackNote = (what, cause) =>
  `owner voice: ${what} written with the App's token (${cause})`;

/** A user login (never a bot's: `[bot]` and anything else is refused). */
const USER_LOGIN_RE = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/;

/** The owner's token is not there: the tick runs without OMNI_QUEUE_LAND_TOKEN. */
export const NO_OWNER_TOKEN_CAUSE = "OMNI_QUEUE_LAND_TOKEN is not set";

/** GitHub's answer that a credential cannot make this call (bad token, missing permission). */
const isRefusal = (error) => error?.status === 401 || error?.status === 403;

/** A reason to write as the App, carried from the login read to the write. */
class Fallback extends Error {}

/**
 * The owner's login, read once from the owner's token (GET /user) and remembered for the life of
 * the process; a refusal (401/403) is remembered too, so a dead token is not asked again on every
 * write. Any other failure (a 5xx, a timeout) is not remembered: the next call reads again.
 * @param {{getAuthenticatedLogin: () => Promise<string>}|null} ownerGh
 * @returns {(() => Promise<string>)|null}  null without a client
 */
export function createOwnerLoginReader(ownerGh) {
  if (!ownerGh) return null;
  let settled = null;
  return () => {
    if (!settled) {
      settled = ownerGh.getAuthenticatedLogin().catch((error) => {
        if (!isRefusal(error)) settled = null;
        throw error;
      });
    }
    return settled;
  };
}

/**
 * The client of the owner voice: the writes listed above with the owner's client, each one
 * retried with the App's on a refusal; reads with the App's client.
 * @param {{app: object, owner: object|null, ownerLogin: (() => Promise<string>)|null,
 *          onFallback?: (cause: string, what: string) => void}} input
 *   app = the App's client (github.mjs); owner = the owner's, null when OMNI_QUEUE_LAND_TOKEN is
 *   not set; ownerLogin = createOwnerLoginReader(owner)
 * @returns {{listIssues: Function, commentOnce: Function, removeLabel: Function,
 *            createIssue: Function, updateIssue: Function}}
 */
export function createOwnerVoice({ app, owner, ownerLogin, onFallback = () => {} }) {
  /** The owner's login, or a Fallback naming why the App writes instead. */
  async function login() {
    if (!owner || !ownerLogin) throw new Fallback(NO_OWNER_TOKEN_CAUSE);
    let value;
    try {
      value = await ownerLogin();
    } catch (error) {
      if (!isRefusal(error)) throw error;
      throw new Fallback(`GitHub refused the owner's token reading its login (${error.status})`);
    }
    if (typeof value !== "string" || !USER_LOGIN_RE.test(value)) {
      throw new Fallback("the owner's token does not name a user account");
    }
    return value;
  }

  /**
   * One write: with the owner's client, else (no token, a refusal) with the App's. `asApp`
   * receives the owner's login when it is known (null otherwise).
   */
  async function write(what, asOwner, asApp) {
    let known;
    try {
      known = await login();
    } catch (error) {
      if (!(error instanceof Fallback)) throw error;
      onFallback(error.message, what);
      return asApp(null);
    }
    try {
      return await asOwner(known);
    } catch (error) {
      if (!isRefusal(error)) throw error;
      onFallback(`GitHub refused the owner's token (${error.status})`, what);
      return asApp(known);
    }
  }

  return {
    listIssues: (...args) => app.listIssues(...args),

    commentOnce: (n, key, body) =>
      write(
        `comment ${key} on #${n}`,
        (known) => owner.commentOnce(n, key, body, { reader: app, alsoLogins: [known] }),
        // The App's retry still counts the owner's earlier markers when the login is known.
        (known) =>
          known
            ? app.commentOnce(n, key, body, { alsoLogins: [known] })
            : app.commentOnce(n, key, body)
      ),

    removeLabel: (n, label) =>
      write(
        `label "${label}" removed from #${n}`,
        () => owner.removeLabel(n, label),
        () => app.removeLabel(n, label)
      ),

    createIssue: (input) =>
      write(
        `issue "${input?.title ?? ""}" opened`,
        () => owner.createIssue(input),
        () => app.createIssue(input)
      ),

    updateIssue: (n, patch) =>
      write(
        `issue #${n} updated`,
        () => owner.updateIssue(n, patch),
        () => app.updateIssue(n, patch)
      ),
  };
}
