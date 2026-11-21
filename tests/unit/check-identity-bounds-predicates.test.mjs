import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  INT32_MAX,
  FALLBACK,
  numeric_bound,
  ttl_bound_ms,
  TTL_30D_MS,
  ttl_30d_not_collapsed,
  CORRECTION_TTL_30D,
  identity_item,
  owner_cleanup,
  result_key,
  checkpoint_resume,
  PREDICATES,
  identity_bounds,
  discoverTargets,
} from "../../scripts/check/check-identity-bounds.mjs";

// 1. numeric_bound / bounded parsing fallback
test("numeric_bound - nominal: configurable fallback and ceiling", () => {
  assert.equal(numeric_bound("0"), FALLBACK); // > 0 required
  assert.equal(numeric_bound("-5"), FALLBACK);
  assert.equal(numeric_bound("7", { fallback: 11 }), 7);
  assert.equal(numeric_bound("9999", { ceiling: 500 }), 500);
});
test("numeric_bound - limit: 30-day TTL -> INT32_MAX, never 1 ms", () => {
  assert.equal(ttl_bound_ms("30"), INT32_MAX);
  assert.equal(ttl_bound_ms("1" + "0".repeat(300)), FALLBACK);
});

test("PREDICATES - the five named predicates are exported", () => {
  const names = Object.keys(PREDICATES);
  for (const name of [
    "numeric_bound",
    "result_key",
    "owner_cleanup",
    "identity_item",
    "checkpoint_resume",
  ]) {
    assert.ok(names.includes(name));
  }
  assert.equal(TTL_30D_MS, 2592000000);
  assert.ok(names.includes("ttl_30d_not_collapsed"));
});

// 1c. ttl_30d_not_collapsed / canonical "30-day TTL -> 1 ms" limit
test("ttl_30d_not_collapsed - nominal: valid 30-day TTL, no signal", () => {
  const valid = "const ttl = 30 * 86400 * 1000;";
  assert.equal(ttl_30d_not_collapsed({ code: valid, line: valid }), true);
  const bound = "const ttl = 2147483647; // 30 * 86400 * 1000 capped at INT32_MAX";
  assert.equal(ttl_30d_not_collapsed({ code: bound, line: bound }), true);
  // No false REJECTED: `ttl = 1` without a 30-day context is not judged.
  const withoutContext = "const ttl = 1; // short cache";
  assert.equal(ttl_30d_not_collapsed({ code: withoutContext, line: withoutContext }), true);
  // Orchestration: no signal on these legitimate TTLs (one file each).
  const r = identity_bounds({
    targets: [
      { file: "config/ttl-valid.mjs", text: valid },
      { file: "config/ttl-bounded.mjs", text: bound },
      { file: "config/ttl-short.mjs", text: withoutContext },
    ],
  });
  assert.equal(r.count.rejections, 0);
});
test("ttl_30d_not_collapsed - limit: 30-day TTL collapsed to 1 ms -> named REJECTED", () => {
  const code = "// expected TTL: 30 * 86400 * 1000 ms\nconst ttl = 1;";
  const line = "const ttl = 1;";
  assert.equal(ttl_30d_not_collapsed({ code, line }), false);
  const r = identity_bounds({ targets: [{ file: "config/ttl.mjs", text: code }] });
  assert.equal(r.ok, false);
  assert.equal(r.count.rejections, 1);
  assert.equal(r.rejections[0].predicate, "ttl_30d_not_collapsed");
  assert.equal(r.rejections[0].file, "config/ttl.mjs");
  assert.equal(r.rejections[0].line, line);
  assert.equal(r.rejections[0].correction, CORRECTION_TTL_30D);
  assert.match(r.rejections[0].correction, /86400|2592000000|node --test/);
});

// 2. identity_item / generated choice frames
const GENERATED_FRAMES = "const frames = matrix.map((l) => ({ choice0: l.a, choice1: l.b }));";
// (choice0 "A", choice1 stop) then (choice0 "B", stop=choice0) -> "B" kept.
// `stop` is a distinct field: a duplicated choice0 would overwrite "B".
const CHOICE_FRAMES = [
  { choice0: "A", choice1: "stop" },
  { choice0: "B", stop: "choice0" },
];

test("identity_item - nominal: last generated frame wins (B kept)", () => {
  assert.equal(
    identity_item({ code: GENERATED_FRAMES, frames: CHOICE_FRAMES, candidate: "B" }),
    true
  );
});
test("identity_item - limit: stale frame A instead of B -> REJECTED", () => {
  assert.equal(
    identity_item({ code: GENERATED_FRAMES, frames: CHOICE_FRAMES, candidate: "A" }),
    false
  );
});
test("identity_item - limit: hardcoded ID -> REJECTED", () => {
  assert.equal(
    identity_item({
      code: 'const identity = "A"; const frames = matrix.map((l) => l.a);',
      frames: CHOICE_FRAMES,
      candidate: "B",
    }),
    false
  );
});
test("identity_item - limit: removing a choice-0 frame is forbidden", () => {
  assert.equal(
    identity_item({
      code: `${GENERATED_FRAMES}\nframes.splice(i, 1); // choice0 removed`,
      frames: CHOICE_FRAMES,
      candidate: "B",
    }),
    false
  );
});

// 3. owner_cleanup / owner cleanup
const CLEANUP_OWN = "if (registry.get(X) === thisSetup) registry.delete(X); refreshAndPublish();";

test("owner_cleanup - nominal: registry.get === thisSetup guard", () => {
  assert.equal(owner_cleanup({ code: CLEANUP_OWN }), true);
});
test("owner_cleanup - nominal: single install without existing", () => {
  assert.equal(owner_cleanup({ code: "install(); refreshAndPublish();" }), true);
});
test("owner_cleanup - limit: existing.stop() dominates refreshAndPublish()", () => {
  assert.equal(owner_cleanup({ code: "existing.stop(); refreshAndPublish();" }), false);
});
test("owner_cleanup - limit: an old cleanup modifies its successor", () => {
  assert.equal(
    owner_cleanup({
      code: CLEANUP_OWN,
      events: [{ owner: "successeur", cleanupBy: "old" }],
    }),
    false
  );
});

// 4. result_key / filtered result key
const CODE_KEY = "const rows = getAllAccessTokens(all).filter((r) => r.connectionId);";
const ON_PERSIST_OK =
  "const onPersist = async (x) => { if (!(await save(x))) throw new Error('no'); return true; };";

test("result_key - nominal: filtered key + guarded Promise<boolean>", () => {
  assert.equal(result_key({ code: CODE_KEY, onPersist: ON_PERSIST_OK }), true);
});
test("result_key - limit: ?? '' fallback -> REJECTED", () => {
  assert.equal(
    result_key({ code: "const cid = row.connectionId ?? '';", onPersist: ON_PERSIST_OK }),
    false
  );
});
test("result_key - limit: bare callback -> REJECTED", () => {
  assert.equal(result_key({ code: CODE_KEY, onPersist: "const onPersist = save;" }), false);
});
test("result_key - limit: getAllAccessTokens without filter -> REJECTED", () => {
  assert.equal(
    result_key({ code: "const rows = getAllAccessTokens(all);", onPersist: ON_PERSIST_OK }),
    false
  );
});

// 5. checkpoint_resume / resumed count kept intact
test("checkpoint_resume - nominal: resumed batch over limit, count intact", () => {
  assert.equal(
    checkpoint_resume({
      code: "if (batch.resumed) count += 1;",
      batches: [{ resumed: true, admission: false, countOverwritten: false }],
    }),
    true
  );
});
test("checkpoint_resume - limit: admission on resumed batch -> REJECTED", () => {
  assert.equal(
    checkpoint_resume({
      code: "if (batch.resumed) count += 1;",
      batches: [{ resumed: true, admission: true, countOverwritten: false }],
    }),
    false
  );
});
test("checkpoint_resume - limit: count overwritten -> REJECTED", () => {
  assert.equal(
    checkpoint_resume({
      code: "if (batch.resumed) count += 1;",
      batches: [{ resumed: true, countOverwritten: true }],
    }),
    false
  );
});
test("checkpoint_resume - limit: count = 0 without increment -> REJECTED", () => {
  assert.equal(checkpoint_resume({ code: "count = 0;" }), false);
});

// Orchestration + dynamic discovery
test("identity_bounds - clean batch: 0 REJECTED", () => {
  const r = identity_bounds({ targets: [{ file: "x.mjs", text: 'const ttl = "42";' }] });
  assert.equal(r.ok, true);
  assert.equal(r.count.rejections, 0);
});
test("identity_bounds - invalid fallback: 1 REJECTED numeric_bound", () => {
  const r = identity_bounds({ targets: [{ file: "x.mjs", text: 'const ttl = "100_000";' }] });
  assert.equal(r.ok, false);
  assert.equal(r.count.rejections, 1);
  assert.equal(r.rejections[0].predicate, "numeric_bound");
});
// CI 20614 — comment lines are prose, not executable claims.
test("identity_bounds - comment trigger words are not REJECTED", () => {
  const r = identity_bounds({
    targets: [
      {
        file: "scripts/check/x.mjs",
        text: [
          "// Nominal: isRouterEntryId recognizes the documented ID. Limit: unrecognized.",
          "// Pre-existing violators frozen so the gate is green NOW and blocks only NEW leaks.",
          "// Suppress known pre-existing violations so only NEW leaks fail the gate.",
          "// existing auth and written into the generated Claude Code settings",
        ].join("\n"),
      },
    ],
  });
  assert.equal(r.ok, true);
  assert.equal(r.count.evaluated, 0);
});
test("identity_bounds - a code line with a trailing comment is still evaluated", () => {
  const r = identity_bounds({
    targets: [
      {
        file: "scripts/check/x.mjs",
        text: 'const ttl = "100_000"; // invalid fallback',
      },
    ],
  });
  assert.equal(r.ok, false);
  assert.equal(r.rejections[0].predicate, "numeric_bound");
});

// CodeRabbit 14:13 — detector robustness on valid source (no false REJECTED).
test("result_key - token filter alone needs no persistence callback", () => {
  assert.equal(
    result_key({ code: "const rows = getAllAccessTokens(all).filter((r) => r.connectionId);" }),
    true
  );
});
test("result_key - a supplied bare callback still requires a guard", () => {
  assert.equal(result_key({ code: CODE_KEY, onPersist: "const onPersist = save;" }), false);
});
test("identity_item - no runtime candidate: source checks apply", () => {
  assert.equal(identity_item({ code: GENERATED_FRAMES }), true);
  assert.equal(
    identity_item({ code: 'const identity = "A"; const frames = matrix.map((l) => l.a);' }),
    false
  );
});
test("identity_item - null expected with a candidate stays REJECTED", () => {
  assert.equal(identity_item({ code: GENERATED_FRAMES, frames: [], candidate: "B" }), false);
});
test("identity_bounds - limit extraction matches the numeric trigger", () => {
  const r = identity_bounds({ targets: [{ file: "x.mjs", text: "const limit = 42;" }] });
  assert.equal(r.count.rejections, 0);
});
test("identity_bounds - CLI scan of generated frames: no runtime proof, no violation", () => {
  const r = identity_bounds({
    targets: [{ file: "x.mjs", text: "const frames = matrix.map((l) => l.a);" }],
  });
  assert.equal(r.count.rejections, 0);
});

// CodeRabbit 14:13 — remaining points (control flow, parse validity, deletions).
test("checkpoint_resume - keyword alone is not proof without batch evidence", () => {
  assert.equal(checkpoint_resume({ code: "function resume(batch) { return true; }" }), false);
});
test("checkpoint_resume - source guard on an over-limit resumed batch is accepted", () => {
  assert.equal(
    checkpoint_resume({
      code: "function resume(batch) { if (batch.resumed && batch.size > limit) return false; return true; }",
    }),
    true
  );
});
test("identity_bounds - digit-only zero is a rejected numeric declaration", () => {
  const r = identity_bounds({ targets: [{ file: "x.mjs", text: "const maxTokens = 0;" }] });
  assert.equal(r.ok, false);
  assert.equal(r.rejections[0].predicate, "numeric_bound");
});
test("discoverTargets - deleted paths are excluded before any read", (t) => {
  const dir = mkdtempSync(join(tmpdir(), "idb-deleted-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const git = (...args) =>
    execFileSync("git", ["-C", dir, ...args], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  git("init", "-q");
  git("config", "user.email", "test@example.com");
  git("config", "user.name", "Test");
  writeFileSync(join(dir, "gone.mjs"), "const x = 1;\n");
  writeFileSync(join(dir, "kept.mjs"), "const y = 2;\n");
  git("add", ".");
  git("commit", "-qm", "seed");
  const base = git("rev-parse", "HEAD").trim();
  rmSync(join(dir, "gone.mjs"));
  writeFileSync(join(dir, "kept.mjs"), "const y = 3;\n");
  const targets = discoverTargets(dir, base);
  assert.equal(targets.includes("gone.mjs"), false, "deleted path excluded");
  assert.equal(targets.includes("kept.mjs"), true, "modified path kept");
});

test("discoverTargets - diff BASE + untracked, never a bare git diff", (t) => {
  // Self-contained repo: CI checkouts have no upstream/release/* ref, so a test
  // pinned to that local-only ref fails there even though the detector is fine.
  const dir = mkdtempSync(join(tmpdir(), "idb-targets-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const git = (...args) =>
    execFileSync("git", ["-C", dir, ...args], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  git("init", "-q");
  git("config", "user.email", "test@example.com");
  git("config", "user.name", "Test");
  writeFileSync(join(dir, "tracked.mjs"), "const a = 1;\n");
  git("add", "tracked.mjs");
  git("commit", "-qm", "seed");
  const base = git("rev-parse", "HEAD").trim();
  writeFileSync(join(dir, "tracked.mjs"), "const a = 2;\n");
  writeFileSync(join(dir, "added.mjs"), "const b = 3;\n");
  const targets = discoverTargets(dir, base);
  assert.ok(targets.includes("tracked.mjs"), "modified tracked file");
  assert.ok(targets.includes("added.mjs"), "untracked file");
});
