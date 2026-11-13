// omni-queue approval handler (scripts/merge-queue/approve.mjs): label events → commit statuses
// bound to the exact head SHA, against the fake GitHub.
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { handleLabelEvent, main } from "../../../scripts/merge-queue/approve.mjs";
import { loadConfig } from "../../../scripts/merge-queue/config.mjs";
import { APPROVAL_CONTEXTS, commentMarker } from "../../../scripts/merge-queue/contracts.mjs";
import { createGitHubClient } from "../../../scripts/merge-queue/github.mjs";
import { sha, startFakeGitHub } from "./helpers/fake-github.mjs";

const config = loadConfig();
const HEAD = sha("head-1");

function labelEvent({
  action = "labeled",
  label = "omni-queue",
  sender = "diegosouzapw",
  base = "release/v3.8.54",
  head = HEAD,
  number = 5,
  state = "open",
} = {}) {
  return {
    action,
    label: { name: label },
    sender: { login: sender },
    pull_request: { number, state, base: { ref: base }, head: { sha: head } },
  };
}

async function setup(t) {
  const fake = await startFakeGitHub({ token: "app-token", actor: "omni-queue[bot]" });
  t.after(() => fake.close());
  fake.addPull({ number: 5, head: { sha: HEAD } });
  const gh = createGitHubClient({
    token: "app-token",
    repository: fake.repository,
    apiUrl: fake.url,
  });
  const handle = (event, eventName = "pull_request_target", extra = {}) =>
    handleLabelEvent({ gh, config, event, eventName, ...extra });
  return { fake, gh, handle };
}

test("an approver's queue label writes a success status on the exact head", async (t) => {
  const { fake, handle } = await setup(t);
  const result = await handle(labelEvent(), "pull_request_target", {
    runUrl: "https://github.com/acme/widget/actions/runs/77",
  });
  assert.deepEqual(result, { action: "approved", kind: "queue", sha: HEAD, actor: "diegosouzapw" });
  const statuses = fake.statuses.get(HEAD);
  assert.equal(statuses.length, 1);
  assert.equal(statuses[0].state, "success");
  assert.equal(statuses[0].context, APPROVAL_CONTEXTS.queue);
  assert.equal(statuses[0].context, "omni-queue/approval");
  assert.equal(statuses[0].description, "approved by diegosouzapw");
  assert.equal(statuses[0].target_url, "https://github.com/acme/widget/actions/runs/77");
  assert.equal(statuses[0].creator.login, "omni-queue[bot]");
  assert.equal(fake.comments.get(5), undefined, "no comment for an approver");
});

test("approver logins match case-insensitively (GitHub logins are)", async (t) => {
  const { handle } = await setup(t);
  const result = await handle(labelEvent({ sender: "DiegoSouzaPW" }));
  assert.equal(result.action, "approved");
});

test("the protected-approved label writes the protected context", async (t) => {
  const { fake, handle } = await setup(t);
  const result = await handle(labelEvent({ label: "protected-approved" }));
  assert.deepEqual(result, {
    action: "approved",
    kind: "protected",
    sha: HEAD,
    actor: "diegosouzapw",
  });
  assert.equal(fake.statuses.get(HEAD)[0].context, "omni-queue/protected-approval");
  assert.equal(fake.statuses.get(HEAD)[0].state, "success");
});

test("a non-approver's label writes no status and comments once", async (t) => {
  const { fake, handle } = await setup(t);
  const first = await handle(labelEvent({ sender: "mallory" }));
  assert.deepEqual(first, { action: "rejected-actor", kind: "queue", sha: HEAD, actor: "mallory" });
  await handle(labelEvent({ sender: "mallory" }));
  await handle(labelEvent({ sender: "mallory", label: "protected-approved" }));
  assert.equal(fake.statuses.get(HEAD), undefined, "no approval status at all");
  const comments = fake.comments.get(5);
  assert.equal(comments.length, 1, "comment-once per PR");
  assert.ok(comments[0].body.includes(commentMarker("not-approver")));
  assert.match(comments[0].body, /`omni-queue` label was applied by `mallory`/);
  assert.match(comments[0].body, /`diegosouzapw`/);
  assert.ok(!/@mallory/.test(comments[0].body), "the comment does not ping the actor");
});

test("unlabeled withdraws the approval with a failure status", async (t) => {
  const { fake, handle } = await setup(t);
  await handle(labelEvent());
  const result = await handle(labelEvent({ action: "unlabeled", sender: "mallory" }));
  assert.deepEqual(result, { action: "withdrawn", kind: "queue", sha: HEAD, actor: "mallory" });
  const [latest, earlier] = fake.statuses.get(HEAD);
  assert.equal(latest.state, "failure");
  assert.equal(latest.context, "omni-queue/approval");
  assert.equal(latest.description, "approval withdrawn by mallory");
  assert.equal(earlier.state, "success");
  const protectedOff = await handle(
    labelEvent({ action: "unlabeled", label: "protected-approved" })
  );
  assert.equal(protectedOff.kind, "protected");
  assert.equal(fake.statuses.get(HEAD)[0].context, "omni-queue/protected-approval");
});

test("irrelevant labels, unmanaged bases and other events are ignored without writes", async (t) => {
  const { fake, handle } = await setup(t);
  const cases = [
    [labelEvent({ label: "hold" }), "pull_request_target"],
    [labelEvent({ label: "queue" }), "pull_request_target"],
    [labelEvent({ base: "main" }), "pull_request_target"],
    [labelEvent({ base: "release/v3.8.54-rc" }), "pull_request_target"],
    [labelEvent({ state: "closed" }), "pull_request_target"],
    [labelEvent({ head: "not-a-sha" }), "pull_request_target"],
    [labelEvent({ sender: "" }), "pull_request_target"],
    [{ ...labelEvent(), action: "synchronize" }, "pull_request_target"],
    [labelEvent(), "push"],
    [labelEvent(), "issues"],
  ];
  for (const [event, name] of cases) {
    assert.deepEqual(await handle(event, name), { action: "ignored" }, JSON.stringify(event));
  }
  assert.ok(
    !fake.requests.some((r) => r.method !== "GET"),
    "ignored events never write to the API"
  );
});

test("the status description is capped at 140 characters", async (t) => {
  const { fake, gh } = await setup(t);
  const longLogin = `a${"b".repeat(38)}`;
  const wide = { ...config, approvers: [longLogin] };
  await handleLabelEvent({
    gh,
    config: wide,
    event: labelEvent({ action: "unlabeled", sender: longLogin }),
    eventName: "pull_request_target",
  });
  const description = fake.statuses.get(HEAD)[0].description;
  assert.ok(description.length <= 140);
  assert.equal(description, `approval withdrawn by ${longLogin}`);
});

test("main reads the event file and env, exits 0, and never prints the token", async (t) => {
  const fake = await startFakeGitHub({ token: "ghs_mainSecretToken", actor: "omni-queue[bot]" });
  t.after(() => fake.close());
  const dir = mkdtempSync(join(tmpdir(), "omni-queue-approve-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const eventPath = join(dir, "event.json");
  writeFileSync(eventPath, JSON.stringify(labelEvent({ head: sha("main-head") })));
  const logs = [];
  const env = {
    OMNI_QUEUE_TOKEN: "ghs_mainSecretToken",
    GITHUB_REPOSITORY: fake.repository,
    GITHUB_EVENT_NAME: "pull_request_target",
    GITHUB_EVENT_PATH: eventPath,
    GITHUB_API_URL: fake.url,
    GITHUB_SERVER_URL: "https://github.com",
    GITHUB_RUN_ID: "4242",
  };
  assert.equal(await main(env, { log: (m) => logs.push(m) }), 0);
  const status = fake.statuses.get(sha("main-head"))[0];
  assert.equal(status.state, "success");
  assert.equal(status.target_url, "https://github.com/acme/widget/actions/runs/4242");
  assert.ok(logs.some((l) => l.includes('"action":"approved"')));

  fake.inject({
    method: "POST",
    path: /^\/statuses\//,
    status: 403,
    body: { message: "Forbidden" },
  });
  assert.equal(await main(env, { log: (m) => logs.push(m) }), 1);
  assert.match(logs.at(-1), /approval failed: POST .* → 403: Forbidden/);
  assert.equal(await main({ ...env, OMNI_QUEUE_TOKEN: "" }, { log: (m) => logs.push(m) }), 1);
  assert.match(logs.at(-1), /OMNI_QUEUE_TOKEN is not set/);
  assert.equal(
    await main(
      { ...env, GITHUB_EVENT_PATH: join(dir, "missing.json") },
      { log: (m) => logs.push(m) }
    ),
    1
  );
  for (const line of logs) assert.ok(!line.includes("ghs_mainSecretToken"), line);
});
