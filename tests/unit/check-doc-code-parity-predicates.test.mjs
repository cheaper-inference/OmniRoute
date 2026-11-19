// Each REJECTED of the eight named predicates has an EXECUTED failing case.
// No always-true `||` and no test that merely greps a rule string.
import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import nodePath from "node:path";
import {
  ANCHOR_RE,
  verdicts_alignes,
  class_id_by_predicate,
  durability_shared_storage,
  durability_named_optout,
  durability_active_rehydration,
  measured_figure,
  pr_body_filled,
  ecriture_transactionnelle,
  doc_code_parity,
  filtrerSansPreuve,
  addedDocLines,
  discoverTargets,
} from "../../scripts/check/check-doc-code-parity.mjs";

// 1. verdicts_alignes
test("verdicts_alignes - the changelog lies; both verdicts come from CODE", () => {
  assert.equal(
    verdicts_alignes({
      code: "preview -> rate_limit; failover -> quota_exhausted",
      changelog: "verdicts now agree",
    }),
    true
  );
});
test("verdicts_alignes - REJECTED: a single verdict asserted", () => {
  assert.equal(
    verdicts_alignes({
      code: "preview -> rate_limit",
      changelog: "verdicts now agree",
    }),
    false
  );
});
test("verdicts_alignes - REJECTED: the claim says 'agree' but verdicts differ", () => {
  assert.equal(
    verdicts_alignes({
      code: "rate_limit / quota_exhausted",
      affirmation: "verdicts now agree",
    }),
    false
  );
});

// 2. class_id_by_predicate
const ID_ROUTER_DOC = "Router `openrouter/auto` in the README";
const ID_ROUTER_CODE =
  "export function isRouterEntryId(id) { return id.includes('openrouter/auto'); }";
test("class_id_by_predicate - nominal: isRouterEntryId recognizes the documented ID", () => {
  assert.equal(class_id_by_predicate({ doc: ID_ROUTER_DOC, code: ID_ROUTER_CODE }), true);
});
test("class_id_by_predicate - REJECTED: documented ID absent from code", () => {
  assert.equal(
    class_id_by_predicate({
      doc: ID_ROUTER_DOC,
      code: "isRouterEntryId(id) => false // gpt-4o",
    }),
    false
  );
});
test("class_id_by_predicate - REJECTED: direct ID not recognized as a router entry", () => {
  assert.equal(
    class_id_by_predicate({
      doc: "Router model: `gpt-4o`",
      code: "gpt-4o isRouterEntryId",
    }),
    false
  );
});

// 3. durability_shared_storage (independent of the opt-out)
test("durability_shared_storage - nominal: shared DATA_DIR", () => {
  assert.equal(
    durability_shared_storage({
      doc: "After restart, storage.sqlite is preserved",
      code: "const dir = process.env.DATA_DIR || resolveHome();",
    }),
    true
  );
});
test("durability_shared_storage - REJECTED: mention without shared storage", () => {
  assert.equal(
    durability_shared_storage({ doc: "After restart", code: "const dir = tmpdir();" }),
    false
  );
});
test("durability_shared_storage - opt-out alone is NOT sufficient (independence)", () => {
  assert.equal(
    durability_shared_storage({
      doc: "OPT_OUT_CACHE after restart",
      code: "process.env.OPT_OUT_CACHE",
    }),
    false
  );
});

// 4. durability_named_optout
test("durability_named_optout - nominal: variable named and READ in code", () => {
  assert.equal(
    durability_named_optout({
      doc: "Variable OPT_OUT_CACHE",
      code: "if (process.env.OPT_OUT_CACHE) return;",
    }),
    true
  );
});
test("durability_named_optout - REJECTED: variable absent from code", () => {
  assert.equal(
    durability_named_optout({
      doc: "Variable OPT_OUT_CACHE",
      code: "if (process.env.OTHER) return;",
    }),
    false
  );
});

// 5. durability_active_rehydration
const CCR_OK =
  "export function retrieveBlock(h) { return cache.get(h); }\n" +
  "export function inspectCcrBlock(args) { const b = retrieveBlock(args.hash); if (!found) return null; return b; }";
const CCR_REJECTED =
  "export function retrieveBlock(h) { return cache.get(h); }\n" +
  "export function inspectCcrBlock(args) { if (!found) return null; const b = retrieveBlock(args.hash); return b; }";
test("durability_active_rehydration - nominal: retrieveBlock BEFORE the early-return", () => {
  assert.equal(durability_active_rehydration({ code: CCR_OK }), true);
});
test("durability_active_rehydration - REJECTED: early-return BEFORE rehydration", () => {
  assert.equal(durability_active_rehydration({ code: CCR_REJECTED }), false);
});
test("durability_active_rehydration - a handler without retrieveBlock is NOT the order source", () => {
  assert.equal(
    durability_active_rehydration({
      code: CCR_OK,
      handler: "compressionTools.ts: no retrieveBlock here",
    }),
    true
  );
});

// 6. measured_figure
test("measured_figure - nominal: measured source cited", () => {
  assert.equal(measured_figure({ doc: "12 ms (source: CI, ci.yml:42)" }), true);
});
test("measured_figure - nominal: AUTHOR ATTESTED marker", () => {
  assert.equal(measured_figure({ doc: "12 ms AUTHOR ATTESTED" }), true);
});
test("measured_figure - REJECTED: bare unmeasured figure", () => {
  assert.equal(measured_figure({ doc: "12 ms of latency" }), false);
});

// 7. pr_body_filled (corrected logic)
test("pr_body_filled - nominal: ALL boxes checked AND issue linked", () => {
  assert.equal(pr_body_filled({ body: "- [x] A\n- [x] B\nCloses #20462" }), true);
});
test("pr_body_filled - nominal: explicit 'no linked issue' mention", () => {
  assert.equal(pr_body_filled({ body: "- [x] A\n- [x] B\nno linked issue" }), true);
});
test("pr_body_filled - REJECTED: one unchecked box", () => {
  assert.equal(pr_body_filled({ body: "- [x] A\n- [ ] B\nCloses #20462" }), false);
});
test("pr_body_filled - REJECTED: no issue (old inverted logic)", () => {
  assert.equal(pr_body_filled({ body: "- [x] A\n- [x] B\n(description only)" }), false);
});

// 8. ecriture_transactionnelle
const RMW_OK =
  "db.transaction(async tx => { const cur = await tx.query('SELECT cooldown FROM t'); await tx.query('UPDATE t SET cooldown = ?'); });";
test("ecriture_transactionnelle - nominal: read INSIDE the transaction + targeted write", () => {
  assert.equal(ecriture_transactionnelle({ code: RMW_OK }), true);
});
test("ecriture_transactionnelle - REJECTED: RMW outside the transaction", () => {
  assert.equal(
    ecriture_transactionnelle({
      code: "const cur = await db.query('SELECT cooldown FROM t'); await db.query('UPDATE t SET cooldown = ?');",
    }),
    false
  );
});
test("ecriture_transactionnelle - REJECTED: cooldown changed during the flight", () => {
  assert.equal(ecriture_transactionnelle({ code: "cooldown += 1; " + RMW_OK }), false);
});

// Orchestration + anchor boundary
test("doc_code_parity - a verdicts_alignes REJECTED is counted (marker has no effect)", () => {
  const r = doc_code_parity({
    docs: [{ file: "changelog.d/20462.md", text: "verdicts now agree" }],
    proofs: { code: "preview -> rate_limit; failover -> quota_exhausted" },
  });
  assert.equal(r.ok, false);
  assert.equal(r.count.rejections, 1);
  assert.equal(r.rejections[0].predicate, "verdicts_alignes");
});
test("doc_code_parity - AUTHOR ATTESTED exempts a figure but NOT verdicts_alignes", () => {
  const r = doc_code_parity({
    docs: [
      { file: "docs/a.md", text: "12 ms AUTHOR ATTESTED" },
      { file: "docs/b.md", text: "verdicts now agree AUTHOR ATTESTED" },
    ],
    proofs: { code: "rate_limit quota_exhausted" },
  });
  assert.equal(
    r.rejections.some((x) => x.predicate === "verdicts_alignes"),
    true
  );
  assert.equal(
    r.rejections.some((x) => x.predicate === "measured_figure"),
    false
  );
});
// CodeRabbit 14:13 — remaining Major/Minor points.
test("class_id_by_predicate - fallback match supplies the full supported ID", () => {
  assert.equal(
    class_id_by_predicate({
      doc: "Use `openrouter/auto` with the router.",
      code: ID_ROUTER_CODE,
    }),
    true
  );
});
test("doc_code_parity - every applicable predicate must be satisfied", () => {
  const doc = "After restart, OPT_OUT_CACHE disables caching and storage.sqlite is shared";
  const r = doc_code_parity({
    docs: [{ file: "docs/x.md", text: doc }],
    proofs: { code: "process.env.DATA_DIR" },
  });
  // durability_shared_storage passes, durability_named_optout has no evidence.
  assert.equal(
    r.rejections.some((x) => x.predicate === "durability_named_optout"),
    true
  );
});
test("filtrerSansPreuve - eligibility is per claim, not per document", () => {
  const docs = [
    {
      file: "docs/x.md",
      text: "- [x] Reviewed\n" + "12 ms (source: CI)",
    },
  ];
  const { withProof, noProof } = filtrerSansPreuve(docs, { code: "some code" });
  assert.equal(withProof.length, 1);
  assert.equal(withProof[0].text.includes("- [x] Reviewed"), false, "unproven claim excluded");
  assert.equal(withProof[0].text.includes("ms (source"), true, "measured claim kept");
  assert.equal(
    noProof.some((n) => n.predicate === "pr_body_filled"),
    true
  );
});
test("addedDocLines - only patch-added line numbers are selected", (t) => {
  const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), "dcp-added-"));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const git = (...args) =>
    execFileSync("git", ["-C", dir, ...args], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  git("init", "-q");
  git("config", "user.email", "test@example.com");
  git("config", "user.name", "Test");
  fs.writeFileSync(nodePath.join(dir, "docs.md"), "old line\n");
  git("add", "docs.md");
  git("commit", "-qm", "seed");
  const base = git("rev-parse", "HEAD").trim();
  fs.writeFileSync(nodePath.join(dir, "docs.md"), "old line\nnew claim\n");
  const added = addedDocLines(dir, base, "docs.md");
  assert.deepEqual([...added], [2]);
});
test("discoverTargets - deleted paths are excluded before any read", (t) => {
  const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), "dcp-deleted-"));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const git = (...args) =>
    execFileSync("git", ["-C", dir, ...args], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  git("init", "-q");
  git("config", "user.email", "test@example.com");
  git("config", "user.name", "Test");
  fs.writeFileSync(nodePath.join(dir, "gone.md"), "old\n");
  fs.writeFileSync(nodePath.join(dir, "kept.md"), "old\n");
  git("add", ".");
  git("commit", "-qm", "seed");
  const base = git("rev-parse", "HEAD").trim();
  fs.rmSync(nodePath.join(dir, "gone.md"));
  fs.writeFileSync(nodePath.join(dir, "kept.md"), "new\n");
  const targets = discoverTargets(dir, base);
  assert.equal(targets.includes("gone.md"), false);
  assert.equal(targets.includes("kept.md"), true);
});

test("ANCHOR_RE - verbatim regex: ci.yml:42-43 captured", () => {
  const m = ".github/workflows/ci.yml:42-43".match(ANCHOR_RE);
  assert.ok(m);
  assert.equal(m[1], ".github/workflows/ci.yml");
  assert.equal(m[2], "42"); // trailing \b, no (?![-\w]), so '-43' does not block
});
test("ANCHOR_RE - lookbehind: encoder-decoder.ts:12 captured whole", () => {
  const m = "encoder-decoder.ts:12".match(ANCHOR_RE);
  assert.ok(m);
  assert.equal(m[1], "encoder-decoder.ts");
});

// TypeScript predicate loaded via node --import tsx/esm (bounded output)
test("node --import tsx/esm loads the TS predicate", () => {
  const out = execFileSync(
    process.execPath,
    [
      "--import",
      "tsx/esm",
      "-e",
      'import("./scripts/check/doc-code-parity-router-id.ts").then(m => console.log(String(m.isRouterEntryId("openrouter/auto"))))',
    ],
    { cwd: new URL("../..", import.meta.url).pathname, encoding: "utf8" }
  ).slice(0, 200);
  assert.match(out, /^true/);
});
