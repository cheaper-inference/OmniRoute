// scripts/merge-queue/eligibility.mjs — WP1 (pure). Plan §3.3: which PRs may enter a batch.
//
// Pure module: no I/O, no network, no clock except ctx.now. Side effects (comments, label
// removals) are returned as `actions` and executed by the tick through gh.commentOnce /
// gh.removeLabel. Approval is bound to the exact head SHA through the commit statuses written
// by approve.mjs (APPROVAL_CONTEXTS) — commit dates are forgeable and never trusted here.

import {
  APPROVAL_CONTEXTS,
  APPROVAL_STATUS_SKEW_SECONDS,
  isProtectedPath,
  sanitizeBase,
} from "./contracts.mjs";
import { isManagedBase } from "./config.mjs";

/**
 * @typedef {import("./contracts.mjs").Action} Action
 * @typedef {import("./contracts.mjs").PrRef} PrRef
 * @typedef {import("./contracts.mjs").QueueState} QueueState
 * @typedef {import("./config.mjs").QueueConfig} QueueConfig
 */

/**
 * @typedef {object} TimelineEvent   normalized by github.listIssueTimeline (oldest first)
 * @property {string} event          "labeled" | "unlabeled" | "head_ref_force_pushed" | ...
 * @property {string|null} actor     login (server-side actor, trusted)
 * @property {string} createdAt      ISO, server time
 * @property {string} [label]        label name for labeled/unlabeled
 * @property {string} [sha]          commit id when the event carries one
 */

/**
 * @typedef {object} CommitStatus    normalized by github.listCommitStatuses (newest first)
 * @property {string} context
 * @property {"success"|"failure"|"error"|"pending"} state
 * @property {string|null} creator   login of the status creator
 * @property {string} description
 * @property {string} createdAt      ISO
 * @property {string|null} targetUrl
 */

/**
 * @typedef {object} PrSnapshot      assembled by the tick for every open PR carrying the label
 * @property {number} number
 * @property {"open"|"closed"} state
 * @property {boolean} draft
 * @property {boolean} merged
 * @property {string} baseRef
 * @property {string} headSha
 * @property {string} title
 * @property {string} author
 * @property {string[]} labels
 * @property {boolean|null} mergeable   GitHub `mergeable` (null = not computed yet)
 * @property {string} mergeableState    GitHub `mergeable_state`
 * @property {string[]} files           changed paths, including previous names of renames
 * @property {boolean} [filesComplete]  false = GitHub listed fewer files than the PR changes
 *                                      (3,000-file cap): treated as a protected surface
 * @property {TimelineEvent[]} timeline
 * @property {CommitStatus[]} headStatuses   statuses on headSha (approval contexts live here)
 * @property {"success"|"failure"|"pending"|null} prGreenCheck  latest config.prGreenCheck on head
 */

/**
 * @typedef {object} EligibilityContext
 * @property {QueueConfig} config
 * @property {{number: number, title: string, body: string}[]} freezeIssues  open release-freeze issues
 * @property {QueueState|null} state   state of the PR's base (in-flight / shadow bookkeeping)
 * @property {string} now              ISO
 */

/**
 * @typedef {object} Approval
 * @property {boolean} valid
 * @property {string|null} actor       approver who applied the label
 * @property {string|null} labeledAt   ISO of that label event (FIFO key)
 * @property {string|null} reason      INELIGIBLE_REASONS code when invalid
 * @property {string} [detail]         extra context for `reason` (e.g. the label is present but
 *                                     its "labeled" event is missing from the timeline)
 */

/**
 * @typedef {object} Eligibility
 * @property {boolean} eligible
 * @property {{code: string, detail: string}[]} reasons  INELIGIBLE_REASONS codes; [] when eligible
 * @property {Action[]} actions          comment-once / remove-label requests for the tick
 * @property {Approval} approval         queue-label approval (valid when eligible)
 * @property {boolean} protectedSurface  diff touches config.protectedPaths
 */

/** Tolerated clock difference: an approval status may predate its label event by this much. */
const STATUS_BEFORE_LABEL_TOLERANCE_MS = 60 * 1000;

const lower = (v) => String(v ?? "").toLowerCase();
const toMs = (iso) => {
  const ms = Date.parse(String(iso ?? ""));
  return Number.isNaN(ms) ? null : ms;
};
const head12 = (sha) => String(sha ?? "").slice(0, 12);
const escapeRegExp = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** Git ref names may contain "<", ">", "@" and backticks: keep comment-safe characters only. */
const safeRef = (ref) =>
  String(ref ?? "")
    .replace(/[^A-Za-z0-9._/-]/g, "?")
    .slice(0, 120);

/**
 * Protected-path match that also holds for paths with control characters: Git allows "\n" in
 * file names, and the contracts glob does not match across it ("x\ny/AGENTS.md" would escape
 * "**\/AGENTS.md"). Control characters are replaced before matching (fail closed).
 */
function isProtectedFile(path, globs) {
  const clean = String(path ?? "").replace(/[\u0000-\u001f\u007f]/g, "_");
  return isProtectedPath(clean, globs);
}

function hasLabel(labels, name) {
  const want = lower(name);
  return (labels ?? []).some((l) => lower(l) === want);
}

function isApprover(config, login) {
  const who = lower(login);
  return Boolean(who) && config.approvers.some((a) => lower(a) === who);
}

/** True when the description names one of the approvers as a whole word. */
function citesApprover(config, description) {
  const text = String(description ?? "");
  return config.approvers.some((a) =>
    new RegExp(`(?<![A-Za-z0-9-])@?${escapeRegExp(a)}(?![A-Za-z0-9-])`, "i").test(text)
  );
}

/** Newest status of `context` (max createdAt; ties keep the earlier entry of a newest-first list). */
function newestStatus(statuses, context) {
  let best = null;
  let bestMs = -Infinity;
  for (const s of statuses ?? []) {
    if (s?.context !== context) continue;
    const ms = toMs(s.createdAt);
    if (ms === null) continue;
    if (ms > bestMs) {
      best = s;
      bestMs = ms;
    }
  }
  return best;
}

/** Latest `labeled` event for `label` in an oldest-first timeline (by createdAt, then order). */
function lastLabeledEvent(timeline, label) {
  const want = lower(label);
  let best = null;
  let bestMs = -Infinity;
  for (const ev of timeline ?? []) {
    if (ev?.event !== "labeled" || lower(ev.label) !== want) continue;
    const ms = toMs(ev.createdAt);
    if (ms === null) continue;
    if (ms >= bestMs) {
      best = ev;
      bestMs = ms;
    }
  }
  return best;
}

/**
 * Approval of one label kind, bound to the CURRENT head:
 *  - the latest `labeled` timeline event for that label is by an approver, and
 *  - the newest status of APPROVAL_CONTEXTS[kind] on headSha is `success`, created by
 *    `${config.appSlug}[bot]`, cites an approver in its description, and was created no earlier
 *    than 60 s before that label event (clock tolerance).
 * Without such a status: label event older than APPROVAL_STATUS_SKEW_SECONDS →
 * "head-changed-after-label" (the head moved after the label, or the approval was never
 * recorded); younger → "approval-missing" (approve.mjs may still be running).
 * For kind "protected" the codes are the same; evaluateEligibility folds them into
 * "protected-approval-missing".
 * @param {PrSnapshot} pr
 * @param {EligibilityContext} ctx
 * @param {"queue"|"protected"} kind
 * @returns {Approval}
 */
export function approvalFor(pr, ctx, kind) {
  const { config } = ctx;
  const context = APPROVAL_CONTEXTS[kind];
  if (!context) throw new Error(`approvalFor: unknown approval kind ${JSON.stringify(kind)}`);
  const label = kind === "queue" ? config.label : config.protectedApprovalLabel;

  const event = lastLabeledEvent(pr.timeline, label);
  if (!event) {
    // The label is (normally) present but no "labeled" event was found: a truncated timeline or
    // an event the normalizer dropped. Never approve; say why so the tick/dashboard can show it.
    return {
      valid: false,
      actor: null,
      labeledAt: null,
      reason: "approval-missing",
      detail: `label ${label} event not found in timeline`,
    };
  }
  const actor = event.actor ?? null;
  const labeledAt = event.createdAt;
  if (!isApprover(config, actor)) {
    return { valid: false, actor, labeledAt, reason: "label-not-by-approver" };
  }

  const labeledMs = toMs(labeledAt);
  const status = newestStatus(pr.headStatuses, context);
  const bot = lower(`${config.appSlug}[bot]`);
  const statusValid =
    status !== null &&
    status.state === "success" &&
    lower(status.creator) === bot &&
    citesApprover(config, status.description) &&
    toMs(status.createdAt) >= labeledMs - STATUS_BEFORE_LABEL_TOLERANCE_MS;
  if (statusValid) return { valid: true, actor, labeledAt, reason: null };

  const nowMs = toMs(ctx.now);
  const ageSeconds = nowMs === null ? Infinity : (nowMs - labeledMs) / 1000;
  const reason =
    ageSeconds > APPROVAL_STATUS_SKEW_SECONDS ? "head-changed-after-label" : "approval-missing";
  return { valid: false, actor, labeledAt, reason };
}

const BRANCH_TOKEN_RE = /(?<![A-Za-z0-9._-])release\/v[A-Za-z0-9._-]*/g;
const TITLE_VERSION_RE = /(?<![A-Za-z0-9._/-])v(\d+\.\d+\.\d+)(?![A-Za-z0-9_-]|\.[A-Za-z0-9])/g;
const MERGE_INTO_RE = /\bmerge\b[^.\n]*?\binto\s+[`'"]?(release\/v[A-Za-z0-9._-]*)/i;

/** "release/v3.8.54." (sentence punctuation) → "release/v3.8.54". */
const trimToken = (t) => String(t).replace(/\.+$/, "");

/**
 * Branches an open release-freeze issue freezes. The /generate-release template is
 * title "🔒 release-freeze: vX.Y.Z in progress" and body "do NOT merge campaign PRs into
 * release/vX.Y.Z (...). Development continues on release/vX.Y.Z+1 ...", so the body also names
 * the branch that stays OPEN. Order of trust:
 *  1. the title: every "release/v…" branch it names, else every "vX.Y.Z" version in it
 *     (→ "release/vX.Y.Z");
 *  2. only when the title names nothing: the branch of the body's "merge … into <branch>"
 *     sentence, else the FIRST branch the body mentions (never every mention).
 * An empty list means the issue names no branch at all (see isBaseFrozen: fail closed).
 * @param {{title: string, body: string}} issue
 * @returns {string[]}
 */
export function frozenBranches(issue) {
  const title = String(issue?.title ?? "");
  const body = String(issue?.body ?? "");
  const fromTitle = [...title.matchAll(BRANCH_TOKEN_RE)].map((m) => trimToken(m[0]));
  if (fromTitle.length) return [...new Set(fromTitle)];
  const versions = [...title.matchAll(TITLE_VERSION_RE)].map((m) => `release/v${m[1]}`);
  if (versions.length) return [...new Set(versions)];
  const into = MERGE_INTO_RE.exec(body);
  if (into) return [trimToken(into[1])];
  const first = body.match(BRANCH_TOKEN_RE);
  return first ? [trimToken(first[0])] : [];
}

/**
 * True when an OPEN release-freeze issue freezes `base` (exact name; "release/v3.8.5" never
 * matches "release/v3.8.54", nor "release/v3.8.54x"). The frozen branch comes from the title
 * first and only falls back to the body when the title names none (frozenBranches), so a body
 * that says where development CONTINUES never freezes that branch. Fail closed: an open freeze
 * issue that names no branch or version at all freezes every base.
 * @param {string} base
 * @param {{title: string, body: string}[]} freezeIssues
 */
export function isBaseFrozen(base, freezeIssues) {
  const name = String(base ?? "");
  if (!name) return false;
  return (freezeIssues ?? []).some((issue) => {
    const branches = frozenBranches(issue);
    return branches.length === 0 || branches.includes(name);
  });
}

function prInFlight(state, n) {
  const f = state?.inFlight;
  if (!f) return false;
  const has = (list) => Array.isArray(list) && list.some((p) => p?.n === n);
  if (has(f.prs)) return true;
  if (Array.isArray(f.bisect?.segments) && f.bisect.segments.some((seg) => has(seg))) return true;
  return has(f.pendingRed?.prs);
}

/**
 * All §3.3 rules. Never performs I/O; returns the side effects as `actions`:
 *  - label by a non-approver → comment once (key "not-approver"), label kept, ineligible;
 *  - head changed after the label → comment + removeLabel;
 *  - conflicting (mergeable === false) → comment + removeLabel;
 *  - approval/protected approval missing on the current head → comment once (key includes head12).
 * Actions are only emitted for an open PR that carries the queue label and is NOT in flight:
 * a closed PR needs nothing, an unlabeled one is not ours to comment on, and an in-flight PR
 * is owned by the tick (removing its label mid-run would race the candidate).
 * @param {PrSnapshot} pr
 * @param {EligibilityContext} ctx
 * @returns {Eligibility}
 */
export function evaluateEligibility(pr, ctx) {
  const { config } = ctx;
  const n = pr.number;
  const h12 = head12(pr.headSha);
  /** @type {{code: string, detail: string}[]} */
  const reasons = [];
  /** @type {Action[]} */
  const actions = [];
  const reason = (code, detail) => reasons.push({ code, detail });
  const manifestIncomplete = pr.filesComplete === false;
  const protectedSurface =
    manifestIncomplete || (pr.files ?? []).some((f) => isProtectedFile(f, config.protectedPaths));
  /** @type {Approval} */
  let approval = { valid: false, actor: null, labeledAt: null, reason: "no-label" };

  if (pr.state !== "open" || pr.merged) {
    reason("not-open", pr.merged ? "PR is already merged" : "PR is closed");
    return { eligible: false, reasons, actions, approval, protectedSurface };
  }

  const labeled = hasLabel(pr.labels, config.label);
  const inFlight = prInFlight(ctx.state, n);
  const canAct = labeled && !inFlight;
  const act = (a) => {
    if (canAct) actions.push(a);
  };
  const comment = (key, body) => act({ type: "comment", pr: n, key, body });
  const removeQueueLabel = () => act({ type: "removeLabel", pr: n, label: config.label });

  if (pr.draft) reason("draft", "PR is a draft");

  const managed = isManagedBase(config, pr.baseRef);
  if (!managed) {
    reason("base-mismatch", `base ${safeRef(pr.baseRef)} does not match ${config.bases}`);
    comment(
      "base-mismatch",
      `omni-queue only manages bases matching \`${config.bases}\`; this PR targets ` +
        `\`${safeRef(pr.baseRef)}\`. Retarget it to the active release branch to queue it.`
    );
  }

  if (!labeled) reason("no-label", `label ${config.label} is not applied`);

  const blocked = (pr.labels ?? []).filter((l) => hasLabel(config.blockLabels, l));
  if (blocked.length) reason("blocked-label", `blocking label(s): ${blocked.join(", ")}`);

  if (managed && isBaseFrozen(pr.baseRef, ctx.freezeIssues)) {
    const issues = (ctx.freezeIssues ?? [])
      .filter((i) => isBaseFrozen(pr.baseRef, [i]))
      .map((i) => `#${i.number}`);
    reason("base-frozen", `release-freeze open for ${safeRef(pr.baseRef)} (${issues.join(", ")})`);
    let key = null;
    try {
      key = `frozen:${sanitizeBase(pr.baseRef)}`;
    } catch {
      key = null;
    }
    if (key) {
      comment(
        key,
        `\`${safeRef(pr.baseRef)}\` is frozen for release (${issues.join(", ")}). omni-queue will not ` +
          `merge into it; retarget this PR to the next release branch to keep it queued.`
      );
    }
  }

  if (inFlight) reason("in-flight", "PR is part of the candidate under test");

  if (labeled) {
    approval = approvalFor(pr, ctx, "queue");
    if (approval.reason === "label-not-by-approver") {
      reason(
        "label-not-by-approver",
        `label ${config.label} applied by ${approval.actor ?? "unknown"}`
      );
      comment(
        "not-approver",
        `The \`${config.label}\` label only counts when a maintainer applies it ` +
          `(applied by @${approval.actor ?? "unknown"}). This PR is not queued.`
      );
    } else if (approval.reason === "head-changed-after-label") {
      reason("head-changed-after-label", `no approval recorded for head ${h12}`);
      comment(
        `head-changed:${h12}`,
        `The head of this PR (${h12}) has no omni-queue approval: it changed after the ` +
          `\`${config.label}\` label (or the approval was not recorded). The label was removed; ` +
          `a maintainer must apply it again to queue the current head.`
      );
      removeQueueLabel();
    } else if (approval.reason === "approval-missing") {
      reason(
        "approval-missing",
        approval.detail ?? `approval status for head ${h12} not recorded yet`
      );
    }
  }

  if (protectedSurface && labeled) {
    // File paths are chosen by the PR author (markdown/mention/marker injection): report only
    // the count and the matching globs, which come from the trusted config.
    const count = (pr.files ?? []).filter((f) => isProtectedFile(f, config.protectedPaths)).length;
    const globs = config.protectedPaths.filter((g) =>
      (pr.files ?? []).some((f) => isProtectedFile(f, [g]))
    );
    const parts = count
      ? [`${count} file(s) matching ${globs.map((g) => `\`${g}\``).join(", ")}`]
      : [];
    if (manifestIncomplete) parts.push("file list incomplete: GitHub did not list every file");
    const surface = parts.join("; ");
    const hasProtected = hasLabel(pr.labels, config.protectedApprovalLabel);
    const prot = hasProtected ? approvalFor(pr, ctx, "protected") : null;
    if (!prot?.valid) {
      const why = hasProtected ? (prot.detail ?? prot.reason) : "label absent";
      reason(
        "protected-approval-missing",
        `protected surface (${surface}): ${config.protectedApprovalLabel} ${why}`
      );
      // While approve.mjs may still be recording a fresh protected label, stay silent.
      if (prot?.reason !== "approval-missing") {
        const lead = count
          ? `This PR changes agent-instruction surfaces (${surface}). `
          : "GitHub did not list every changed file of this PR, so omni-queue cannot rule out " +
            "agent-instruction surfaces. ";
        comment(
          `protected:${h12}`,
          lead +
            `A maintainer must also apply \`${config.protectedApprovalLabel}\` to the current ` +
            `head (${h12}) before omni-queue can merge it.`
        );
      }
    }
  }

  if (pr.mergeable === false || pr.mergeableState === "dirty") {
    reason("conflicting", `PR conflicts with ${pr.baseRef}`);
    comment(
      `conflict:${h12}`,
      `This PR conflicts with \`${pr.baseRef}\`, so it was removed from omni-queue. Resolve the ` +
        `conflict and ask a maintainer to apply \`${config.label}\` again.`
    );
    removeQueueLabel();
  }

  if (config.mode === "shadow" && ctx.state?.shadow?.processed?.[String(n)] === pr.headSha) {
    reason("shadow-processed", `head ${h12} already validated in shadow mode`);
  }

  return { eligible: reasons.length === 0, reasons, actions, approval, protectedSurface };
}

const GREEN_RANK = { success: 0, pending: 1, failure: 2 };

/**
 * Pick the next batch. Order: FIFO by approval.labeledAt (ties by PR number); with
 * config.preferGreenPrChecks, PRs whose prGreenCheck is "success" come first, then
 * null/pending, then "failure" (FIFO inside each group). Takes at most config.batch.maxSize.
 * Waits (waiting=true, batch=[]) while fewer than maxSize are eligible AND the oldest approval
 * is younger than batch.maxWaitMinutes; never returns fewer than batch.minSize.
 * @param {{pr: PrSnapshot, eligibility: Eligibility}[]} candidates   eligible ones only
 * @param {EligibilityContext} ctx
 * @returns {{batch: PrRef[], waiting: boolean, reason: string}}
 */
export function selectBatch(candidates, ctx) {
  const { config } = ctx;
  const { maxSize, minSize, maxWaitMinutes } = config.batch;
  const pool = (candidates ?? []).filter(
    (c) => c?.eligibility?.eligible && toMs(c.eligibility.approval?.labeledAt) !== null
  );
  if (pool.length === 0) return { batch: [], waiting: false, reason: "no eligible PR" };

  const fifo = [...pool].sort(
    (a, b) =>
      toMs(a.eligibility.approval.labeledAt) - toMs(b.eligibility.approval.labeledAt) ||
      a.pr.number - b.pr.number
  );
  const ordered = config.preferGreenPrChecks
    ? [...fifo].sort(
        (a, b) => (GREEN_RANK[a.pr.prGreenCheck] ?? 1) - (GREEN_RANK[b.pr.prGreenCheck] ?? 1)
      )
    : fifo;

  if (pool.length < minSize) {
    return {
      batch: [],
      waiting: true,
      reason: `${pool.length} eligible PR(s), below batch.minSize ${minSize}`,
    };
  }
  if (pool.length < maxSize) {
    const oldestMs = toMs(fifo[0].eligibility.approval.labeledAt);
    const nowMs = toMs(ctx.now);
    const waitedMinutes = nowMs === null ? Infinity : (nowMs - oldestMs) / 60000;
    if (waitedMinutes < maxWaitMinutes) {
      return {
        batch: [],
        waiting: true,
        reason:
          `${pool.length}/${maxSize} eligible; oldest approval waited ` +
          `${Math.max(0, Math.floor(waitedMinutes))} of ${maxWaitMinutes} min`,
      };
    }
  }

  const batch = ordered.slice(0, maxSize).map(({ pr, eligibility }) => ({
    n: pr.number,
    head: pr.headSha,
    title: pr.title,
    author: pr.author,
    labeledAt: eligibility.approval.labeledAt,
  }));
  return {
    batch,
    waiting: false,
    reason:
      pool.length > maxSize
        ? `${batch.length} of ${pool.length} eligible (batch.maxSize ${maxSize})`
        : `${batch.length} eligible`,
  };
}
