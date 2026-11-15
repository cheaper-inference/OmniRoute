// Queue state store with compare-and-swap (scripts/merge-queue/state.mjs).
import assert from "node:assert/strict";
import test from "node:test";
import {
  STATE_BRANCH,
  appendEvent,
  initialState,
  stateFilePath,
} from "../../../scripts/merge-queue/contracts.mjs";
import {
  StateConflictError,
  StateError,
  createStateStore,
  gitBlobSha,
  serializeState,
  updateStateWithRetry,
} from "../../../scripts/merge-queue/state.mjs";
import { BASE, createClock, createFakeGitHub } from "./helpers/tick-fakes.mjs";

const PATH = stateFilePath(BASE);
const KEY = `${STATE_BRANCH}:${PATH}`;

function setup() {
  const clock = createClock();
  const gh = createFakeGitHub();
  const store = createStateStore({ gh, now: clock.now });
  return { clock, gh, store };
}

const event = (type, at = "2026-11-13T12:00:00.000Z") => ({ at, type });

test("gitBlobSha matches `git hash-object` for known contents", () => {
  // `printf 'hello\n' | git hash-object --stdin`
  assert.equal(gitBlobSha("hello\n"), "ce013625030ba8dba906f756967f9e9ca394464a");
  // empty blob
  assert.equal(gitBlobSha(""), "e69de29bb2d1d6434b8b29ae775ad8c2e48c5391");
});

test("load: absent branch/file → initial state, version null, no write", async () => {
  const { gh, store } = setup();
  const { state, version } = await store.load(BASE);
  assert.equal(version, null);
  assert.deepEqual(state, initialState(BASE, "2026-11-13T12:00:00.000Z"));
  assert.deepEqual(gh.writes, []);
  assert.deepEqual(gh.reads[0], { method: "getFileContent", args: [PATH, STATE_BRANCH] });
});

test("first save creates the orphan state branch with the file; reload round-trips", async () => {
  const { clock, gh, store } = setup();
  const { state, version } = await store.load(BASE);
  clock.advance(5);
  const next = appendEvent(state, event("paused"));
  const saved = await store.save(BASE, next, version, "first");
  assert.equal(saved.ok, true);
  assert.deepEqual(
    gh.writes.map((w) => w.method),
    ["createOrphanBranch"]
  );
  assert.deepEqual(gh.writes[0].args, [STATE_BRANCH, [PATH], "first"]);
  assert.ok(gh.branches.has(STATE_BRANCH));
  assert.equal(saved.state.updatedAt, "2026-11-13T12:05:00.000Z", "updatedAt stamped");
  assert.equal(saved.version, gitBlobSha(gh.contents.get(KEY).content));
  assert.equal(gh.contents.get(KEY).content, serializeState(saved.state));

  const reloaded = await store.load(BASE);
  assert.equal(reloaded.version, saved.version);
  assert.deepEqual(reloaded.state, saved.state);
});

test("save with the version read updates in place; a stale version is a conflict", async () => {
  const { gh, store } = setup();
  const first = await store.save(BASE, initialState(BASE), null, "create");
  const changed = appendEvent(initialState(BASE), event("paused"));
  const second = await store.save(BASE, changed, first.version, "update");
  assert.equal(second.ok, true);
  assert.notEqual(second.version, first.version);
  assert.equal(gh.writes.at(-1).method, "putFileContent");
  assert.equal(gh.writes.at(-1).args[1].sha, first.version);

  const stale = await store.save(BASE, initialState(BASE), first.version, "stale");
  assert.deepEqual(stale, { ok: false, conflict: true });
  assert.equal(gh.contents.get(KEY).sha, second.version, "the winner's document is kept");
});

test("branch exists but this base has no file yet → created through the Contents API", async () => {
  const { gh, store } = setup();
  await store.save("release/v1.0.0", initialState("release/v1.0.0"), null, "other base");
  const saved = await store.save(BASE, initialState(BASE), null, "this base");
  assert.equal(saved.ok, true);
  const methods = gh.writes.map((w) => w.method);
  assert.deepEqual(methods, ["createOrphanBranch", "createOrphanBranch", "putFileContent"]);
  assert.equal(gh.writes[2].args[1].sha, null);
  assert.ok(gh.contents.has(KEY));
});

test("two writers creating the same file: the loser gets a conflict, not an overwrite", async () => {
  const { gh, store } = setup();
  gh.branches.set(STATE_BRANCH, "f".repeat(40));
  gh.contents.set(KEY, { content: serializeState(initialState(BASE)), sha: "abc" });
  const lost = await store.save(BASE, initialState(BASE), null, "late create");
  assert.deepEqual(lost, { ok: false, conflict: true });
  assert.equal(gh.contents.get(KEY).sha, "abc");
});

test("updateStateWithRetry: a conflict re-reads and re-applies the mutation", async () => {
  const { gh, store } = setup();
  await store.save(BASE, initialState(BASE), null, "seed");
  let calls = 0;
  gh.beforePut = async () => {
    // a concurrent writer lands between our load and our save
    const { state, version } = await store.load(BASE);
    gh.beforePut = null;
    const other = appendEvent(state, event("resumed"));
    const res = await store.save(BASE, other, version, "concurrent");
    assert.equal(res.ok, true);
  };
  const final = await updateStateWithRetry(store, BASE, (state) => {
    calls += 1;
    return appendEvent(state, event("paused"));
  });
  assert.equal(calls, 2, "mutate re-applied after the conflict");
  assert.deepEqual(
    final.history.map((e) => e.type),
    ["resumed", "paused"],
    "both writes survive, ours on top of the winner's"
  );
  const stored = await store.load(BASE);
  assert.deepEqual(
    stored.state.history.map((e) => e.type),
    ["resumed", "paused"]
  );
});

test("updateStateWithRetry gives up after maxAttempts conflicts", async () => {
  const conflicting = {
    load: async () => ({ state: initialState(BASE), version: "v1" }),
    save: async () => ({ ok: false, conflict: true }),
  };
  let calls = 0;
  await assert.rejects(
    updateStateWithRetry(
      conflicting,
      BASE,
      (s) => {
        calls += 1;
        return s;
      },
      { maxAttempts: 2 }
    ),
    StateConflictError
  );
  assert.equal(calls, 2);
  await assert.rejects(updateStateWithRetry(conflicting, BASE, (s) => s, { maxAttempts: 0 }));
});

test("load: a stored document that is not JSON throws instead of resetting", async () => {
  const { gh, store } = setup();
  gh.contents.set(KEY, { content: "{not json", sha: "s1" });
  await assert.rejects(store.load(BASE), (error) => {
    assert.ok(error instanceof StateError);
    assert.match(error.message, /not valid JSON/);
    return true;
  });
  assert.deepEqual(gh.writes, [], "never rewritten");
});

test("load: a structurally invalid document throws with the failing fields", async () => {
  const { gh, store } = setup();
  const broken = { ...initialState(BASE), version: 2, counters: { batchSeq: -1 } };
  gh.contents.set(KEY, { content: JSON.stringify(broken), sha: "s1" });
  await assert.rejects(store.load(BASE), /invalid state \(version, counters\)/);
});

test("load: a history event whose prs is not an array of PR numbers is refused", async () => {
  const { gh, store } = setup();
  const broken = {
    ...initialState(BASE),
    history: [{ at: "2026-11-13T12:00:00.000Z", type: "landed", prs: {} }],
  };
  gh.contents.set(KEY, { content: JSON.stringify(broken), sha: "s1" });
  await assert.rejects(store.load(BASE), /invalid state \(history\[\]\)/);
});

test("load: a document of another base is refused", async () => {
  const { gh, store } = setup();
  gh.contents.set(KEY, { content: JSON.stringify(initialState("release/v1.2.3")), sha: "s1" });
  await assert.rejects(store.load(BASE), /document is for base "release\/v1.2.3"/);
});

test("load: tolerates a client that returns the raw base64 payload", async () => {
  const { gh, store } = setup();
  const doc = serializeState(initialState(BASE));
  gh.contents.set(KEY, { content: Buffer.from(doc).toString("base64"), sha: "s1" });
  const { state, version } = await store.load(BASE);
  assert.equal(state.base, BASE);
  assert.equal(version, "s1");
});

test("save refuses an invalid state or a base mismatch without writing", async () => {
  const { gh, store } = setup();
  const invalid = { ...initialState(BASE), inFlight: { batchId: "../x" } };
  await assert.rejects(store.save(BASE, invalid, null, "bad"), StateError);
  await assert.rejects(
    store.save(BASE, initialState("release/v1.0.0"), null, "wrong base"),
    /refusing to save the state of release\/v1.0.0/
  );
  assert.deepEqual(gh.writes, []);
});
