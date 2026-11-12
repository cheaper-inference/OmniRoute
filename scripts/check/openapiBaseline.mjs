import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const SHA = /^[0-9a-f]{40}$/;

/** Pin both sides before reading a spec. Event failures never fall back to a moving ref. */
export function resolveOpenapiBaseline({
  cwd = process.cwd(),
  env = process.env,
  defaultRef,
} = {}) {
  const git = (...args) =>
    execFileSync("git", args, {
      cwd,
      encoding: "utf8",
      timeout: 30000,
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  const candidateSha = git("rev-parse", "--verify", "HEAD^{commit}");
  let requestedBase;
  let source = "local-merge-base";
  const eventName = env.GITHUB_EVENT_NAME;
  if (eventName) {
    if (
      !["schedule", "workflow_dispatch"].includes(eventName) &&
      (!SHA.test(env.GITHUB_SHA ?? "") || env.GITHUB_SHA !== candidateSha)
    ) {
      throw new Error("Event candidate does not match checkout");
    }
    const event = JSON.parse(readFileSync(env.GITHUB_EVENT_PATH, "utf8"));
    if (eventName === "pull_request") {
      requestedBase = event.pull_request?.base?.sha;
    } else if (eventName === "merge_group") {
      requestedBase = event.merge_group?.base_sha;
      if (event.merge_group?.head_sha !== candidateSha)
        throw new Error("Merge-group head mismatch");
    } else if (eventName === "push") {
      requestedBase = event.before;
      if (event.after !== candidateSha) throw new Error("Push head mismatch");
    } else if (
      eventName === "workflow_dispatch" &&
      (event.inputs?.candidate_base_branch || event.inputs?.i18n_base_sha)
    ) {
      // A full manual candidate must measure the same change as its PR. A
      // follow-up commit must never hide earlier API breaks by changing HEAD^1.
      requestedBase = event.inputs.i18n_base_sha;
      if (
        !/^(main|release\/v[0-9]+\.[0-9]+\.[0-9]+)$/.test(
          event.inputs.candidate_base_branch ?? ""
        ) ||
        !SHA.test(requestedBase ?? "") ||
        env.GITHUB_SHA !== candidateSha
      ) {
        throw new Error("Invalid manual candidate comparison");
      }
      git("merge-base", "--is-ancestor", requestedBase, candidateSha);
    } else if (["schedule", "workflow_dispatch"].includes(eventName)) {
      // No candidate was supplied. Observe the selected commit's own change.
      requestedBase = git("rev-parse", "--verify", `${candidateSha}^1`);
    } else {
      throw new Error(`Unsupported OpenAPI event: ${eventName}`);
    }
    if (!SHA.test(requestedBase ?? "") || /^0+$/.test(requestedBase)) {
      throw new Error("Missing immutable event base");
    }
    source = eventName;
  } else {
    requestedBase = (env.BASE_REF || "").trim() || defaultRef;
    if (!requestedBase) throw new Error("Missing local base reference");
  }
  const baseTipSha = git("rev-parse", "--verify", "--end-of-options", `${requestedBase}^{commit}`);
  // A PR head may predate the event's base tip. Compare their shared ancestry;
  // a synthetic merge includes the base, so merge-base returns that pinned base.
  const baseSha =
    !eventName || eventName === "pull_request"
      ? git("merge-base", baseTipSha, candidateSha)
      : baseTipSha;
  if (!SHA.test(baseSha)) throw new Error("No unambiguous comparison base");
  return { baseSha, baseTipSha, candidateSha, source };
}
