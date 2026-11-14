#!/usr/bin/env node
// scripts/merge-queue/approve.mjs — WP4. Binds a label approval to the exact head SHA.
//
// Runs in the `approval` job of .github/workflows/omni-queue.yml on pull_request_target
// (labeled | unlabeled), WITHOUT the tick's concurrency group (a pending tick can be cancelled by
// GitHub; an approval must never be lost). The job has its own group per PR AND label: runs for
// the same label are serialized, and a pending one is replaced only by a newer event on that same
// label (whose run re-reads the labels), never by an unrelated label or the other approval
// label. Reads only the event payload (GITHUB_EVENT_PATH) and the API — never PR code.
//
// SECURITY: only `pull_request_target` is accepted. That event runs this script from the BASE
// branch; a `pull_request` event runs the PR's own copy, so a PR could rewrite this file and
// forge an approval status with the App token. Never wire the approval job to `pull_request`
// (the sandbox repository uses pull_request_target too). Any other event name is ignored.
//
//   labeled config.label / config.protectedApprovalLabel by an approver → commit status
//     `success` on pull_request.head.sha, context APPROVAL_CONTEXTS[kind],
//     description "approved by <login>" (App token, so the creator is `<appSlug>[bot]`);
//   labeled by a non-approver → comment once (key "not-approver"), no status;
//   unlabeled → status `failure` "approval withdrawn by <login>" on the same head/context.
//
// LEVEL-triggered: the per-PR-and-label group serializes a quick labeled→unlabeled (or
// unlabeled→labeled) pair, and before writing a status the PR is re-read so the CURRENT label set
// decides: `labeled` writes `success` only while the label is still present, `unlabeled` writes
// `failure` only while it is still absent (otherwise the newer event's job writes its own
// status). The re-read alone did not converge: two parallel runs could each read, then write in
// either order, leaving a stale `failure` after a newer `success`. The status always goes on the
// head of the event PAYLOAD (what the approver saw), never on the current head: a push after the
// label must not inherit the approval.

import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { DEFAULT_CONFIG_PATH, isManagedBase, loadConfig } from "./config.mjs";
import { APPROVAL_CONTEXTS, isSha } from "./contracts.mjs";
import { createGitHubClient } from "./github.mjs";

const EVENT_NAMES = ["pull_request_target"];
const LOGIN_RE = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})(?:\[bot\])?$/;
const MAX_DESCRIPTION = 140;

/** Commit-status descriptions are capped at 140 characters by GitHub. */
export const truncateDescription = (text) =>
  text.length > MAX_DESCRIPTION ? `${text.slice(0, MAX_DESCRIPTION - 3)}...` : text;

/** Comment posted (once per PR) when someone outside config.approvers applies a queue label. */
export function notApproverComment(config, label, actor) {
  return [
    `The \`${label}\` label was applied by \`${actor}\`, who is not an omni-queue approver.`,
    "",
    "The label is ignored: a PR enters the queue only when an approver " +
      `(${config.approvers.map((a) => `\`${a}\``).join(", ")}) applies it. ` +
      "No approval was recorded for this head.",
  ].join("\n");
}

/**
 * @param {{gh: object, config: object, event: object, eventName: string,
 *          log?: (msg: string) => void, runUrl?: string|null}} input   event = parsed
 *   GITHUB_EVENT_PATH; runUrl (optional) becomes the status target_url
 * @returns {Promise<{action: "approved"|"withdrawn"|"rejected-actor"|"ignored",
 *                    kind?: "queue"|"protected", sha?: string, actor?: string}>}
 */
export async function handleLabelEvent(input) {
  const { gh, config, event, eventName, log = () => {}, runUrl = null } = input;
  const ignored = (why) => {
    log(`ignored: ${why}`);
    return { action: "ignored" };
  };
  if (!EVENT_NAMES.includes(eventName)) return ignored(`event ${eventName}`);
  const action = event?.action;
  if (action !== "labeled" && action !== "unlabeled") return ignored(`action ${action}`);

  const labelName = event?.label?.name;
  const kind =
    labelName === config.label
      ? "queue"
      : labelName === config.protectedApprovalLabel
        ? "protected"
        : null;
  if (!kind) return ignored(`label ${JSON.stringify(labelName)}`);

  const pr = event?.pull_request;
  const base = pr?.base?.ref;
  if (!isManagedBase(config, base)) return ignored(`base ${JSON.stringify(base)} is not managed`);
  if (pr?.state && pr.state !== "open") return ignored(`PR #${pr.number} is ${pr.state}`);
  const sha = pr?.head?.sha;
  if (!isSha(sha)) return ignored("missing head sha");
  if (!Number.isSafeInteger(pr?.number) || pr.number <= 0) return ignored("missing PR number");

  const actor = String(event?.sender?.login ?? "");
  if (!LOGIN_RE.test(actor)) return ignored("missing sender");
  const context = APPROVAL_CONTEXTS[kind];
  /** Current label set of the PR: the event may already be stale when this job runs. */
  const labelPresent = async () => {
    const current = await gh.getPull(pr.number);
    return (current.labels ?? []).includes(labelName);
  };
  const targetUrl =
    typeof runUrl === "string" && runUrl.startsWith("https://") ? runUrl : undefined;

  if (action === "unlabeled") {
    if (await labelPresent()) {
      return ignored(`#${pr.number} ${labelName} was applied again after this removal`);
    }
    await gh.createCommitStatus(sha, {
      state: "failure",
      context,
      description: truncateDescription(`approval withdrawn by ${actor}`),
      ...(targetUrl ? { targetUrl } : {}),
    });
    log(`#${pr.number} ${context} withdrawn by ${actor} on ${sha}`);
    return { action: "withdrawn", kind, sha, actor };
  }

  const approvers = new Set(config.approvers.map((a) => a.toLowerCase()));
  if (!approvers.has(actor.toLowerCase())) {
    await gh.commentOnce(pr.number, "not-approver", notApproverComment(config, labelName, actor));
    log(`#${pr.number} ${labelName} applied by non-approver ${actor}: no status written`);
    return { action: "rejected-actor", kind, sha, actor };
  }

  if (!(await labelPresent())) {
    return ignored(`#${pr.number} ${labelName} was removed again after this label`);
  }
  await gh.createCommitStatus(sha, {
    state: "success",
    context,
    description: truncateDescription(`approved by ${actor}`),
    ...(targetUrl ? { targetUrl } : {}),
  });
  log(`#${pr.number} ${context} approved by ${actor} on ${sha}`);
  return { action: "approved", kind, sha, actor };
}

/**
 * CLI entry: reads OMNI_QUEUE_TOKEN, GITHUB_REPOSITORY, GITHUB_EVENT_NAME, GITHUB_EVENT_PATH
 * (optional: OMNI_QUEUE_CONFIG, GITHUB_API_URL, GITHUB_SERVER_URL + GITHUB_RUN_ID for the
 * status link). Returns the exit code (0 handled or ignored, 1 error); never prints the token.
 */
export async function main(env = process.env, { log = (m) => console.log(m) } = {}) {
  try {
    const token = env.OMNI_QUEUE_TOKEN;
    if (!token) throw new Error("OMNI_QUEUE_TOKEN is not set");
    if (!env.GITHUB_REPOSITORY) throw new Error("GITHUB_REPOSITORY is not set");
    if (!env.GITHUB_EVENT_PATH) throw new Error("GITHUB_EVENT_PATH is not set");
    const config = loadConfig(env.OMNI_QUEUE_CONFIG || DEFAULT_CONFIG_PATH);
    const event = JSON.parse(readFileSync(env.GITHUB_EVENT_PATH, "utf8"));
    const gh = createGitHubClient({
      token,
      repository: env.GITHUB_REPOSITORY,
      ...(env.GITHUB_API_URL ? { apiUrl: env.GITHUB_API_URL } : {}),
      // Only markers written by the App count: a third party cannot pre-post one to mute us.
      botLogin: `${config.appSlug}[bot]`,
      log,
    });
    const runUrl =
      env.GITHUB_SERVER_URL && env.GITHUB_RUN_ID
        ? `${env.GITHUB_SERVER_URL}/${env.GITHUB_REPOSITORY}/actions/runs/${env.GITHUB_RUN_ID}`
        : null;
    const result = await handleLabelEvent({
      gh,
      config,
      event,
      eventName: env.GITHUB_EVENT_NAME ?? "",
      log,
      runUrl,
    });
    log(`omni-queue approval: ${JSON.stringify(result)}`);
    return 0;
  } catch (error) {
    const token = env.OMNI_QUEUE_TOKEN;
    const message = String(error?.message ?? error);
    log(`omni-queue approval failed: ${token ? message.split(token).join("***") : message}`);
    return 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().then((code) => {
    process.exitCode = code;
  });
}
