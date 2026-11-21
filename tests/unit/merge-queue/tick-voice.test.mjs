// omni-queue tick with the owner voice (config `voice: "owner"`) and signed merge commits
// (config `landing.signing: "ssh"`): which client performs each write, the fallback to the App's
// token that never loses a message, and the alert when a batch is composed unsigned.
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { loadConfig } from "../../../scripts/merge-queue/config.mjs";
import { commentMarker } from "../../../scripts/merge-queue/contracts.mjs";
import { upsertDashboard } from "../../../scripts/merge-queue/dashboard.mjs";
import { createTickDeps, recordTickFailure } from "../../../scripts/merge-queue/tick.mjs";
import { VOICE_FALLBACK_PREFIX } from "../../../scripts/merge-queue/voice.mjs";
import { startFakeGitHub } from "./helpers/fake-github.mjs";
import { BASE, OWNER_IDENTITY, createFakeGitHub, createHarness } from "./helpers/tick-fakes.mjs";

const OWNER = "owner-login";
/** The writes a pull request or an issue shows to people: what the owner voice performs. */
const VOICE_WRITES = new Set([
  "commentOnce",
  "createIssueComment",
  "removeLabel",
  "createIssue",
  "updateIssue",
]);

/**
 * Turn the owner voice on in a harness: a second fake client (writes recorded with client
 * "owner") that shares the App fake's pull requests, issues and comments, as two tokens share
 * one repository. `token: false` = OMNI_QUEUE_LAND_TOKEN missing.
 */
function ownerVoice(h, { token = true, login = async () => OWNER } = {}) {
  const owner = createFakeGitHub({ calls: h.calls, client: "owner" });
  for (const key of ["pulls", "issues", "comments", "timelines", "branches"])
    owner[key] = h.gh[key];
  h.config.voice = "owner";
  h.deps.voiceGh = token ? owner : null;
  h.deps.ownerLogin = token ? login : null;
  return owner;
}

/**
 * The real dashboard upsert (issue create/update through the client it is given), with a body
 * that changes with the history, so a tick that records events updates it.
 */
function realDashboard(h) {
  h.modules.dashboard.upsertDashboard = upsertDashboard;
  h.modules.dashboard.renderDashboard = (input) =>
    `dashboard ${input.base}: ${input.state.history.map((e) => e.type).join(", ")}`;
}

const by = (h, client) => h.calls.filter((c) => c.client === client).map((c) => c.name);
const voiceWritesBy = (h, client) => by(h, client).filter((name) => VOICE_WRITES.has(name));
const types = (state) => state.history.map((e) => e.type);
const voiceErrors = (state) =>
  state.history.filter((e) => e.type === "error" && e.detail.startsWith(VOICE_FALLBACK_PREFIX));

async function startBatch(h, prs) {
  for (const n of prs) h.addPr(n);
  await h.tick();
  return (await h.state()).inFlight;
}

test("voice app (the default): every write is the App's, as before", async () => {
  const h = createHarness({ mode: "live" });
  assert.equal(h.config.voice, "app", "shipped default");
  realDashboard(h);
  const f = await startBatch(h, [1, 2]);
  h.runCi(f.candidateSha);
  await h.tick();
  assert.deepEqual(by(h, "owner"), []);
  assert.ok(voiceWritesBy(h, "app").includes("commentOnce"));
  assert.ok(voiceWritesBy(h, "app").includes("removeLabel"));
  assert.ok(voiceWritesBy(h, "app").includes("createIssue"), "the App opens the dashboard");
});

test("owner voice, live landing: comments, label removals and the dashboard are the owner's; statuses stay the App's", async () => {
  const h = createHarness({ mode: "live" });
  ownerVoice(h);
  realDashboard(h);
  const f = await startBatch(h, [1, 2]);
  h.runCi(f.candidateSha);
  await h.tick();
  const state = await h.state();
  assert.deepEqual(types(state), ["batch-started", "checks-green", "land-blessed", "landed"]);
  assert.deepEqual(voiceWritesBy(h, "app"), [], "the App performs none of the visible writes");
  const owner = voiceWritesBy(h, "owner");
  assert.equal(owner.filter((n) => n === "removeLabel").length, 4, "two labels on two PRs");
  assert.equal(owner.filter((n) => n === "commentOnce").length, 2, "one landed comment each");
  assert.equal(owner.filter((n) => n === "createIssue").length, 1, "the dashboard issue");
  assert.ok(owner.includes("updateIssue"), "and its body on the next change");
  // Commit statuses, the state branch and the candidate are never the owner's.
  for (const name of [
    "createCommitStatus",
    "putFileContent",
    "createOrphanBranch",
    "deleteBranch",
  ]) {
    assert.ok(!by(h, "owner").includes(name), name);
  }
  assert.ok(by(h, "app").includes("createCommitStatus"), "the App blesses the candidate");
  assert.deepEqual(voiceErrors(state), [], "nothing fell back");
});

test("owner voice, live dequeue: the base-conflict comment and label removal are the owner's", async () => {
  const h = createHarness({ mode: "live" });
  ownerVoice(h);
  h.world.baseConflicts.add(1);
  h.addPr(1);
  await h.tick();
  const owner = h.calls.filter((c) => c.client === "owner" && VOICE_WRITES.has(c.name));
  assert.deepEqual(
    owner.map((c) => [c.name, c.args[0]]),
    [
      ["removeLabel", 1],
      ["commentOnce", 1],
    ]
  );
  assert.match(owner[1].args[1], /^base-conflict:/);
  assert.deepEqual(voiceWritesBy(h, "app"), []);
});

test("owner voice, shadow: nothing on pull requests by anybody; the dashboard is the owner's", async () => {
  const h = createHarness({ mode: "shadow" });
  ownerVoice(h);
  realDashboard(h);
  h.world.baseConflicts.add(1);
  h.addPr(1);
  h.addPr(2);
  await h.tick();
  const state = await h.state();
  assert.ok(types(state).includes("would-dequeue"));
  for (const client of ["app", "owner"]) {
    for (const name of ["commentOnce", "removeLabel", "createIssueComment"]) {
      assert.ok(!by(h, client).includes(name), `${client}: ${name}`);
    }
  }
  assert.deepEqual(voiceWritesBy(h, "owner"), ["createIssue"], "the dashboard issue");
  assert.deepEqual(voiceWritesBy(h, "app"), []);
});

test("owner voice, the stalled alert on the dashboard is the owner's", async () => {
  const h = createHarness({ mode: "shadow" });
  h.config.approvers = ["octo-approver"];
  ownerVoice(h);
  await h.tick({ action: "pause" });
  h.clock.advance(121);
  await h.tick();
  const state = await h.state();
  assert.equal(state.stalled.notified, true);
  const alert = h.calls.find((c) => c.name === "commentOnce" && /^stalled:/.test(c.args[1]));
  assert.equal(alert.client, "owner");
});

test("owner voice without OMNI_QUEUE_LAND_TOKEN: every message still goes out, as the App, and one error event says so", async () => {
  const h = createHarness({ mode: "live" });
  ownerVoice(h, { token: false });
  realDashboard(h);
  const f = await startBatch(h, [1, 2]);
  h.runCi(f.candidateSha);
  const result = await h.tick();
  const state = await h.state();
  assert.deepEqual(by(h, "owner"), []);
  const app = voiceWritesBy(h, "app");
  assert.equal(app.filter((n) => n === "removeLabel").length, 4);
  assert.equal(app.filter((n) => n === "commentOnce").length, 2);
  assert.ok(app.includes("createIssue"));
  // The first tick (dashboard creation) and the landing tick each record it once.
  const errors = voiceErrors(state);
  assert.equal(errors.length, 1, "one event while the cause stays the same");
  assert.match(errors[0].detail, /OMNI_QUEUE_LAND_TOKEN is not set/);
  assert.ok(
    result.decisions.some((d) => /owner voice: .*#1.* written with the App's token/.test(d)),
    result.decisions
  );
  // A tick that changes nothing else adds no event: the fallback never makes its own churn.
  await h.tick();
  assert.equal(voiceErrors(await h.state()).length, 1);
});

test("owner voice: a write GitHub refuses (403) is retried as the App within the tick, recorded once", async () => {
  const h = createHarness({ mode: "live" });
  const owner = ownerVoice(h);
  owner.writeError = (method) =>
    VOICE_WRITES.has(method)
      ? Object.assign(new Error(`${method} → 403: Resource not accessible`), { status: 403 })
      : null;
  realDashboard(h);
  const f = await startBatch(h, [1, 2]);
  h.runCi(f.candidateSha);
  await h.tick();
  const state = await h.state();
  assert.deepEqual(
    types(state).filter((t) => t !== "error"),
    ["batch-started", "checks-green", "land-blessed", "landed"]
  );
  const app = voiceWritesBy(h, "app");
  assert.equal(app.filter((n) => n === "removeLabel").length, 4, "each refused removal redone");
  assert.equal(app.filter((n) => n === "commentOnce").length, 2, "each refused comment redone");
  const errors = voiceErrors(state);
  assert.equal(errors.length, 1);
  assert.match(errors[0].detail, /refused the owner's token \(403\)/);
  // Every PR got its landed comment exactly once.
  for (const n of [1, 2]) {
    const comments = (h.gh.comments.get(n) ?? []).filter((c) =>
      c.body.includes(commentMarker(`landed:${h.gh.pulls.get(n).headSha.slice(0, 12)}`))
    );
    assert.equal(comments.length, 1, `#${n}`);
  }
});

test("owner voice, failure path: the stalled alert and a missing dashboard are the owner's, the App's on a refusal", async () => {
  for (const refuse of [false, true]) {
    const h = createHarness({ mode: "shadow" });
    h.config.approvers = ["octo-approver"];
    const owner = ownerVoice(h);
    if (refuse) {
      owner.writeError = () => Object.assign(new Error("→ 401: Bad credentials"), { status: 401 });
    }
    await h.tick();
    const warnings = [];
    for (let i = 0; i < 3; i++) {
      h.clock.advance(5);
      await recordTickFailure(h.deps, BASE, "GitHub 502", (m) => warnings.push(m));
    }
    const state = await h.state();
    assert.equal(state.stalled.notified, true, `refuse=${refuse}: delivered`);
    const created = h.calls.find((c) => c.name === "createIssue");
    const alert = h.calls.find((c) => c.name === "commentOnce" && /^stalled:/.test(c.args[1]));
    const expected = refuse ? "app" : "owner";
    assert.equal(created.client, expected, `refuse=${refuse}: dashboard`);
    assert.equal(alert.client, expected, `refuse=${refuse}: alert`);
    assert.equal(
      warnings.some((w) => /owner voice: .* written with the App's token \(.*401/.test(w)),
      refuse,
      warnings.join("\n")
    );
  }
});

test("owner voice, dry-run: neither client writes", async () => {
  const h = createHarness({ mode: "live" });
  ownerVoice(h);
  h.world.baseConflicts.add(1);
  h.addPr(1);
  await h.tick({ action: "dry-run" });
  assert.deepEqual(by(h, "owner"), []);
  assert.deepEqual(voiceWritesBy(h, "app"), []);
});

// ───────────────────────────── signed merge commits ─────────────────────────────

/** Compose through the fake, reporting `signing` as compose.composeCandidate would. */
function signingReport(h, report) {
  const compose = h.modules.compose.composeCandidate;
  const seen = [];
  h.modules.compose.composeCandidate = (input) => {
    seen.push(input.signing);
    const result = compose(input);
    return input.signing ? { ...result, signing: report(result) } : result;
  };
  return seen;
}

test("signing on: every composition is asked to sign; an unsigned batch is one error event", async () => {
  const h = createHarness({ mode: "shadow", actor: "owner" });
  h.config.landing = { ...h.config.landing, signing: "ssh" };
  h.deps.signing = { keyPath: "/runner/temp/omni-queue-signing/signing-key" };
  const seen = signingReport(h, (r) => ({
    signed: 0,
    unsigned: r.included.length,
    cause: "no signing key file in the job (is the OMNI_QUEUE_SIGNING_KEY secret set?)",
  }));
  const f = await startBatch(h, [1, 2]);
  assert.deepEqual(seen, [h.deps.signing]);
  const state = await h.state();
  const errors = state.history.filter((e) => e.type === "error");
  assert.equal(errors.length, 1);
  assert.equal(errors[0].batchId, f.batchId);
  assert.equal(
    errors[0].detail,
    `${f.batchId}: 2 merge commit(s) composed unsigned: no signing key file in the job ` +
      "(is the OMNI_QUEUE_SIGNING_KEY secret set?)"
  );
  assert.ok(!JSON.stringify(state).includes("/runner/temp"), "the key path is never stored");
  assert.ok(state.inFlight, "the batch is composed and tested anyway (degrade, never block)");
});

test("signing on: a fully signed batch records nothing; signing off passes nothing", async () => {
  const signed = createHarness({ mode: "shadow", actor: "owner" });
  signed.config.landing = { ...signed.config.landing, signing: "ssh" };
  signed.deps.signing = { keyPath: "/k" };
  signingReport(signed, (r) => ({ signed: r.included.length, unsigned: 0, cause: null }));
  await startBatch(signed, [1]);
  assert.deepEqual(
    (await signed.state()).history.filter((e) => e.type === "error"),
    []
  );

  const off = createHarness({ mode: "shadow" });
  const seen = signingReport(off, () => assert.fail("no signing report without signing"));
  await startBatch(off, [1]);
  assert.deepEqual(seen, [undefined], "composeCandidate is not given `signing`");
});

test("createTickDeps: voice owner gets the owner's client and login reader; signing gets the key path", async (t) => {
  const fake = await startFakeGitHub({ token: "ghs_appToken", actor: "omni-queue[bot]" });
  t.after(() => fake.close());
  fake.tokenActors.set("github_pat_owner", OWNER);
  const dir = mkdtempSync(join(tmpdir(), "omni-queue-voice-deps-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const owner = {
    mode: "merge-ff",
    actor: "owner",
    identity: { ...OWNER_IDENTITY },
    statusContext: "omni-queue/land",
  };
  const writeConfig = (name, patch) => {
    const path = join(dir, name);
    writeFileSync(path, JSON.stringify({ ...loadConfig(), ...patch }));
    return path;
  };
  const env = {
    OMNI_QUEUE_TOKEN: "ghs_appToken",
    GITHUB_REPOSITORY: fake.repository,
    GITHUB_API_URL: fake.url,
    RUNNER_TEMP: dir,
  };
  const deps = (patch, extra = {}) =>
    createTickDeps({ ...env, ...extra, OMNI_QUEUE_CONFIG: writeConfig("c.json", patch) });

  const shipped = deps({}, { OMNI_QUEUE_LAND_TOKEN: "github_pat_owner" });
  assert.equal(shipped.voiceGh, null, "voice app: no owner client for the voice");
  assert.equal(shipped.ownerLogin, null);
  assert.equal(shipped.signing, null, "signing none");

  const voiced = deps({ voice: "owner" }, { OMNI_QUEUE_LAND_TOKEN: "github_pat_owner" });
  assert.ok(voiced.voiceGh, "the owner's client");
  assert.equal(await voiced.ownerLogin(), OWNER, "resolved from the token itself");
  assert.equal(await voiced.ownerLogin(), OWNER);
  assert.equal(fake.requests.filter((r) => r.path === "!/user").length, 1, "read once");

  const tokenless = deps({ voice: "owner" });
  assert.equal(tokenless.voiceGh, null, "no token: the voice falls back to the App");
  assert.equal(tokenless.ownerLogin, null);

  const appActor = deps(
    { voice: "owner", landing: { mode: "merge-ff" } },
    { OMNI_QUEUE_LAND_TOKEN: "github_pat_owner" }
  );
  assert.ok(appActor.voiceGh, "the voice does not depend on who lands");
  assert.equal(appActor.landGh, appActor.gh, "the App still lands with actor app");

  const signing = deps({ landing: { ...owner, signing: "ssh" } });
  assert.deepEqual(signing.signing, {
    keyPath: join(dir, "omni-queue-signing", "signing-key"),
  });
  const noTemp = createTickDeps({
    ...env,
    RUNNER_TEMP: "",
    OMNI_QUEUE_CONFIG: writeConfig("d.json", { landing: { ...owner, signing: "ssh" } }),
  });
  assert.deepEqual(noTemp.signing, { keyPath: null }, "asked for, no file: degrade and alert");
});
