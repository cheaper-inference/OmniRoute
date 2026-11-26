// omni-queue owner voice (scripts/merge-queue/voice.mjs): which token performs the queue's
// human-visible writes (comments, label removals, the dashboard and other issues), and the
// fallback to the App's token that keeps every message delivered.
import assert from "node:assert/strict";
import test from "node:test";
import {
  VOICES,
  createOwnerLoginReader,
  createOwnerVoice,
} from "../../../scripts/merge-queue/voice.mjs";

/** A refusal as github.mjs throws it (GitHubError carries `status`). */
const refused = (status) =>
  Object.assign(new Error(`POST /x → ${status}: Resource not accessible`), {
    name: "GitHubError",
    status,
  });

/**
 * A client double: every call is recorded as [name, ...args] in `calls` (shared, tagged with
 * `who`); `fail` = (name) => Error|null makes a call throw instead.
 */
function client(who, calls, { fail = () => null } = {}) {
  const call =
    (name, result) =>
    async (...args) => {
      calls.push([who, name, ...args]);
      const error = fail(name);
      if (error) throw error;
      return typeof result === "function" ? result(...args) : result;
    };
  return {
    listIssues: call("listIssues", []),
    commentOnce: call("commentOnce", { posted: true }),
    removeLabel: call("removeLabel", undefined),
    createIssue: call("createIssue", { number: 7 }),
    updateIssue: call("updateIssue", undefined),
  };
}

function setup({ owner = true, ownerFail, appFail, login = async () => "owner-login" } = {}) {
  const calls = [];
  const fallbacks = [];
  const app = client("app", calls, { fail: appFail });
  const ownerGh = owner ? client("owner", calls, { fail: ownerFail }) : null;
  const voice = createOwnerVoice({
    app,
    owner: ownerGh,
    ownerLogin: owner ? login : null,
    onFallback: (cause, what) => fallbacks.push({ cause, what }),
  });
  return { calls, fallbacks, voice, app };
}

test("VOICES: the App (default) or the owner", () => {
  assert.deepEqual(VOICES, ["app", "owner"]);
});

test("owner voice: every human-visible write goes out with the owner's token", async () => {
  const { calls, fallbacks, voice, app } = setup();
  await voice.commentOnce(12, "culprit:abc", "body");
  await voice.removeLabel(12, "omni-queue");
  assert.deepEqual(await voice.createIssue({ title: "t", body: "b", labels: ["x"] }), {
    number: 7,
  });
  await voice.updateIssue(7, { body: "b2" });
  assert.deepEqual(calls, [
    // the owner posts; the App's client reads the comments; both logins' markers count
    [
      "owner",
      "commentOnce",
      12,
      "culprit:abc",
      "body",
      { reader: app, alsoLogins: ["owner-login"] },
    ],
    ["owner", "removeLabel", 12, "omni-queue"],
    ["owner", "createIssue", { title: "t", body: "b", labels: ["x"] }],
    ["owner", "updateIssue", 7, { body: "b2" }],
  ]);
  assert.deepEqual(fallbacks, []);
});

test("owner voice: commentOnce reads through the App's client", async () => {
  const calls = [];
  const app = client("app", calls);
  const owner = client("owner", calls);
  const voice = createOwnerVoice({ app, owner, ownerLogin: async () => "owner-login" });
  await voice.commentOnce(3, "k", "b");
  const [, , , , , opts] = calls[0];
  assert.equal(opts.reader, app, "the App's client lists the comments");
  assert.deepEqual(opts.alsoLogins, ["owner-login"]);
});

test("owner voice: reads stay with the App", async () => {
  const { calls, voice } = setup();
  await voice.listIssues({ labels: ["omni-queue-dashboard"], state: "open" });
  assert.deepEqual(calls, [
    ["app", "listIssues", { labels: ["omni-queue-dashboard"], state: "open" }],
  ]);
});

test("owner voice without the owner's token: the App writes, and the fallback is reported", async () => {
  const { calls, fallbacks, voice } = setup({ owner: false });
  await voice.commentOnce(12, "k", "body");
  await voice.removeLabel(12, "omni-queue");
  await voice.createIssue({ title: "t", body: "b" });
  await voice.updateIssue(7, { body: "b2" });
  assert.deepEqual(
    calls.map(([who, name]) => `${who}:${name}`),
    ["app:commentOnce", "app:removeLabel", "app:createIssue", "app:updateIssue"]
  );
  // No owner login is known: the App's commentOnce counts the App's markers only.
  assert.deepEqual(calls[0], ["app", "commentOnce", 12, "k", "body"]);
  assert.equal(fallbacks.length, 4);
  for (const { cause } of fallbacks) assert.match(cause, /OMNI_QUEUE_LAND_TOKEN is not set/);
  assert.match(fallbacks[0].what, /#12/);
});

for (const status of [401, 403]) {
  test(`owner voice: a ${status} on an owner write is retried with the App's token`, async () => {
    const { calls, fallbacks, voice } = setup({ ownerFail: () => refused(status) });
    assert.deepEqual(await voice.commentOnce(12, "k", "body"), { posted: true });
    await voice.removeLabel(12, "omni-queue");
    assert.deepEqual(await voice.createIssue({ title: "t", body: "b" }), { number: 7 });
    await voice.updateIssue(7, { body: "b2" });
    assert.deepEqual(
      calls.map(([who, name]) => `${who}:${name}`),
      [
        "owner:commentOnce",
        "app:commentOnce",
        "owner:removeLabel",
        "app:removeLabel",
        "owner:createIssue",
        "app:createIssue",
        "owner:updateIssue",
        "app:updateIssue",
      ]
    );
    // The App's retry still recognises the owner's earlier markers (the login is known).
    assert.deepEqual(calls[1], [
      "app",
      "commentOnce",
      12,
      "k",
      "body",
      { alsoLogins: ["owner-login"] },
    ]);
    assert.deepEqual(calls[3], ["app", "removeLabel", 12, "omni-queue"]);
    assert.equal(fallbacks.length, 4);
    for (const { cause } of fallbacks) assert.match(cause, new RegExp(`refused.*\\(${status}\\)`));
  });
}

test("owner voice: an owner error that is not a refusal is not retried as the App", async () => {
  const { calls, fallbacks, voice } = setup({ ownerFail: () => refused(502) });
  await assert.rejects(voice.commentOnce(12, "k", "b"), /502/);
  assert.deepEqual(
    calls.map(([who, name]) => `${who}:${name}`),
    ["owner:commentOnce"]
  );
  assert.deepEqual(fallbacks, []);
});

test("owner voice: when the App's fallback write fails too, the error surfaces (never dropped)", async () => {
  const { voice } = setup({
    ownerFail: () => refused(403),
    appFail: () => refused(500),
  });
  await assert.rejects(voice.updateIssue(7, { body: "b" }), /500/);
});

test("owner voice: an owner login GitHub refuses sends every write as the App", async () => {
  let reads = 0;
  const login = async () => {
    reads += 1;
    throw refused(401);
  };
  const { calls, fallbacks, voice } = setup({ login });
  await voice.commentOnce(12, "k", "b");
  await voice.removeLabel(12, "omni-queue");
  assert.deepEqual(
    calls.map(([who, name]) => `${who}:${name}`),
    ["app:commentOnce", "app:removeLabel"]
  );
  assert.deepEqual(calls[0], ["app", "commentOnce", 12, "k", "b"]);
  assert.equal(fallbacks.length, 2);
  assert.match(fallbacks[0].cause, /login.*\(401\)/);
  assert.equal(reads, 2, "the voice asks its reader; the reader memoizes (below)");
});

test("owner voice: a login that is not a user's login is never trusted", async () => {
  for (const bad of ["", "omni-queue[bot]", "has space", null, "-leading"]) {
    const { calls, fallbacks, voice } = setup({ login: async () => bad });
    await voice.commentOnce(12, "k", "b");
    assert.deepEqual(calls, [["app", "commentOnce", 12, "k", "b"]], JSON.stringify(bad));
    assert.match(fallbacks[0].cause, /does not name a user/);
  }
});

test("owner voice: a login read that fails without a refusal fails the write (transient)", async () => {
  const { calls, voice } = setup({
    login: async () => {
      throw refused(503);
    },
  });
  await assert.rejects(voice.removeLabel(12, "x"), /503/);
  assert.deepEqual(calls, []);
});

test("createOwnerLoginReader: one GET /user per process, a refusal is remembered, a 5xx is not", async () => {
  let n = 0;
  const answers = [() => "owner-login"];
  const gh = {
    async getAuthenticatedLogin() {
      n += 1;
      return answers.shift()();
    },
  };
  const read = createOwnerLoginReader(gh);
  assert.equal(await read(), "owner-login");
  assert.equal(await read(), "owner-login");
  assert.equal(n, 1);

  let m = 0;
  const failing = createOwnerLoginReader({
    async getAuthenticatedLogin() {
      m += 1;
      if (m === 1) throw refused(503);
      throw refused(401);
    },
  });
  await assert.rejects(failing(), /503/);
  await assert.rejects(failing(), /401/);
  await assert.rejects(failing(), /401/);
  assert.equal(m, 2, "the transient error is retried, the refusal is not");
  assert.equal(createOwnerLoginReader(null), null);
});
