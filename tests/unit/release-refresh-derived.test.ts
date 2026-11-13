// scripts/release/refresh-derived.mjs + scripts/release/lib/derived-mirrors.mjs: the single
// writer of derived values. Runs against a minimal temporary tree with injected facts and an
// injected rewrite plan, so no tsx subprocess and no real repository file is involved.
import { afterEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  applyChanges,
  normalizeProviderReference,
  parseRefreshArgs,
  refreshDerived,
  refreshExitCode,
} from "../../scripts/release/refresh-derived.mjs";
import {
  findNumberOccurrences,
  propagateChangesToMirror,
  refreshI18nStateEntry,
  sha256,
} from "../../scripts/release/lib/derived-mirrors.mjs";
import { serializeFacts } from "../../scripts/release/facts.mjs";

const roots: string[] = [];
afterEach(() => {
  for (const r of roots.splice(0)) fs.rmSync(r, { recursive: true, force: true });
});

function tree(files: Record<string, string>) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "refresh-derived-"));
  roots.push(root);
  for (const [rel, text] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(root, rel)), { recursive: true });
    fs.writeFileSync(path.join(root, rel), text);
  }
  return root;
}
const read = (root: string, rel: string) => {
  const abs = path.join(root, rel);
  return fs.existsSync(abs) ? fs.readFileSync(abs, "utf8") : null;
};

const FACTS = { schemaVersion: 1, version: "3.8.55", providers: 395, code: { mcpTools: 111 } };

// A fake gate plan: rewrite every whole "393" to "395" and "OmniRoute v3.8.54" to 3.8.55, the
// shape planDerivedRewrites() returns (pure; reads through readFile).
function fakePlan(paths: string[], extraManual: object[] = []) {
  return ({ facts, readFile }: { facts: typeof FACTS; readFile: (p: string) => string | null }) => {
    assert.equal(facts.providers, 395, "the plan receives the facts");
    const files = [];
    for (const p of paths) {
      const before = readFile(p);
      if (before == null) continue;
      const changes = [];
      for (const index of findNumberOccurrences(before, "393"))
        changes.push({ label: "Provider count", from: "393", to: "395", index });
      const v = before.indexOf("OmniRoute v3.8.54");
      if (v !== -1)
        changes.push({
          label: "Package version (docs prose)",
          from: "3.8.54",
          to: "3.8.55",
          index: v + "OmniRoute v".length,
        });
      if (!changes.length) continue;
      files.push({ path: p, before, after: applyChanges(before, changes), changes });
    }
    return { files, manual: extraManual };
  };
}

const README = "# OmniRoute\n\n393 providers. OmniRoute v3.8.54 · one endpoint.\n";
const README_PT = "# OmniRoute\n\n393 provedores. OmniRoute v3.8.54 · um endpoint.\n";
const GUIDE = "Routes across 393 providers.\n";
const GUIDE_PT = "Roteia entre 393 provedores (393 no total).\n"; // extra occurrence → manual

function stateFor(files: Record<string, string>, opts: { driftedGuide?: boolean } = {}) {
  const entry = (src: string, mirror: string) => ({
    source_hash: sha256(src),
    locales: {
      "pt-BR": {
        source_hash: sha256(src),
        target_hash: sha256(mirror),
        section_hashes: ["abc"],
        updated_at: "2026-01-01T00:00:00.000Z",
      },
    },
  });
  return {
    sources: {
      "README.md": entry(files["README.md"], files["docs/i18n/pt-BR/README.md"]),
      "docs/guides/GUIDE.md": {
        ...entry(files["docs/guides/GUIDE.md"], files["docs/i18n/pt-BR/docs/guides/GUIDE.md"]),
        ...(opts.driftedGuide ? { source_hash: "stale" } : {}),
      },
    },
  };
}

function fixture(opts: { driftedGuide?: boolean } = {}) {
  const files: Record<string, string> = {
    "README.md": README,
    "docs/i18n/pt-BR/README.md": README_PT,
    "docs/guides/GUIDE.md": GUIDE,
    "docs/i18n/pt-BR/docs/guides/GUIDE.md": GUIDE_PT,
  };
  files[".i18n-state.json"] = JSON.stringify(stateFor(files, opts), null, 2) + "\n";
  return tree(files);
}

const ONLY = ["facts", "numbers"];

describe("argument parsing", () => {
  it("defaults to the release profile, writing mode", () => {
    const o = parseRefreshArgs([]);
    assert.deepEqual(
      { check: o.check, profile: o.profile, only: o.only, withChangelog: o.withChangelog },
      { check: false, profile: "release", only: null, withChangelog: false }
    );
    assert.equal(o.error, null);
  });
  it("accepts --check --profile=nightly --only=a,b --json", () => {
    const o = parseRefreshArgs(["--check", "--profile=nightly", "--only=facts,numbers", "--json"]);
    assert.equal(o.error, null);
    assert.deepEqual(o.only, ["facts", "numbers"]);
    assert.equal(o.profile, "nightly");
  });
  it("rejects --with-changelog outside the release profile, unknown steps and flags", () => {
    assert.match(parseRefreshArgs(["--profile=nightly", "--with-changelog"]).error, /release/);
    assert.match(parseRefreshArgs(["--only=facts,bogus"]).error, /bogus/);
    assert.match(parseRefreshArgs(["--profile=weekly"]).error, /profile/);
    assert.match(parseRefreshArgs(["--frobnicate"]).error, /unknown option/);
  });
});

describe("mirror propagation (conservative)", () => {
  it("finds whole numbers only", () => {
    assert.deepEqual(
      findNumberOccurrences("393 a3930 1,393 v393 3.393 393.5 (393) ~1.62B", "393"),
      [0, 34]
    );
    assert.deepEqual(findNumberOccurrences("~1.62B free", "1.62"), [1]);
  });

  it("carries a number when source and mirror hold the same occurrences", () => {
    const changes = [{ label: "Provider count", from: "393", to: "395", index: 0 }];
    const r = propagateChangesToMirror({
      sourceBefore: "393 providers",
      changes,
      mirrorText: "393 provedores",
    });
    assert.equal(r.content, "395 provedores");
    assert.equal(r.replaced, 1);
    assert.deepEqual(r.manual, []);
  });

  it("leaves the mirror alone (manual) when it has a different number of occurrences", () => {
    const r = propagateChangesToMirror({
      sourceBefore: GUIDE,
      changes: [{ label: "Provider count", from: "393", to: "395", index: 15 }],
      mirrorText: GUIDE_PT,
    });
    assert.equal(r.content, GUIDE_PT);
    assert.equal(r.replaced, 0);
    assert.match(r.manual[0].detail, /mirror has 2/);
  });

  it("leaves the mirror alone when the source has an occurrence the plan does not rewrite", () => {
    const r = propagateChangesToMirror({
      sourceBefore: "393 providers, issue #393",
      changes: [{ label: "Provider count", from: "393", to: "395", index: 0 }],
      mirrorText: "393 provedores, issue #393",
    });
    assert.equal(r.replaced, 0);
    assert.equal(r.manual.length, 1);
  });

  it("refuses one old value with two targets, and a non-numeric change", () => {
    const r = propagateChangesToMirror({
      sourceBefore: "21 a 21 b · alpha",
      changes: [
        { label: "x", from: "21", to: "22", index: 0 },
        { label: "y", from: "21", to: "23", index: 5 },
        { label: "z", from: "alpha", to: "beta", index: 12 },
      ],
      mirrorText: "21 a 21 b · alpha",
    });
    assert.equal(r.replaced, 0);
    assert.equal(r.manual.length, 2);
  });

  it("carries version claims through the claim detector", () => {
    const r = propagateChangesToMirror({
      sourceBefore: README,
      changes: [{ label: "Package version", from: "3.8.54", to: "3.8.55", index: 0 }],
      mirrorText: README_PT,
    });
    assert.ok(r.content.includes("OmniRoute v3.8.55"));
    assert.equal(r.replaced, 1);
  });

  it(".i18n-state: refreshed only when the source was in sync before the rewrite", () => {
    const state = {
      sources: {
        "a.md": {
          source_hash: sha256("old"),
          locales: {
            // in sync with the source before the rewrite → refreshed
            de: { source_hash: sha256("old"), section_hashes: [1] },
            // already behind an older source → keeps its source hash (stays stale)
            fr: { source_hash: "x", section_hashes: [2] },
          },
        },
        "b.md": { source_hash: "drifted", locales: {} },
      },
    };
    assert.equal(
      refreshI18nStateEntry(state, "a.md", {
        sourceBefore: "old",
        sourceAfter: "new",
        mirrors: [
          { locale: "de", content: "neu" },
          { locale: "fr", content: "nouveau" },
        ],
        now: "T",
      }),
      "refreshed"
    );
    assert.equal(state.sources["a.md"].source_hash, sha256("new"));
    assert.deepEqual(state.sources["a.md"].locales.de, {
      source_hash: sha256("new"),
      target_hash: sha256("neu"),
      section_hashes: [1],
      updated_at: "T",
    });
    assert.deepEqual(state.sources["a.md"].locales.fr, {
      source_hash: "x",
      target_hash: sha256("nouveau"),
      section_hashes: [2],
      updated_at: "T",
    });
    assert.equal(
      refreshI18nStateEntry(state, "b.md", {
        sourceBefore: "old",
        sourceAfter: "new",
        mirrors: [],
        now: "T",
      }),
      "drifted"
    );
    assert.equal(state.sources["b.md"].source_hash, "drifted");
    assert.equal(
      refreshI18nStateEntry(state, "c.md", {
        sourceBefore: "",
        sourceAfter: "",
        mirrors: [],
        now: "",
      }),
      "untracked"
    );
  });
});

describe("refreshDerived on a temporary tree", () => {
  it("--check lists what would change and writes nothing", async () => {
    const root = fixture();
    const snapshotBefore = Object.fromEntries(
      ["README.md", "docs/i18n/pt-BR/README.md", ".i18n-state.json"].map((f) => [f, read(root, f)])
    );
    const r = await refreshDerived({
      root,
      check: true,
      only: ONLY,
      facts: FACTS,
      planDerivedRewrites: fakePlan(["README.md", "docs/guides/GUIDE.md"]),
    });
    assert.deepEqual(r.changedFiles, [
      ".i18n-state.json",
      "README.md",
      "docs/guides/GUIDE.md",
      "docs/i18n/pt-BR/README.md",
      "docs/reference/derived-facts.json",
    ]);
    assert.ok(r.manual.some((m) => m.path === "docs/i18n/pt-BR/docs/guides/GUIDE.md"));
    for (const [f, text] of Object.entries(snapshotBefore)) assert.equal(read(root, f), text, f);
    assert.equal(read(root, "docs/reference/derived-facts.json"), null);
    assert.equal(refreshExitCode(r, { check: true }), 1);
    const byId = Object.fromEntries(r.steps.map((s) => [s.id, s.status]));
    assert.equal(byId.facts, "changed");
    assert.equal(byId.numbers, "changed");
    assert.equal(byId["readme-diagrams"], "skipped");
  });

  it("writes sources, mirrors, the snapshot and .i18n-state (in-sync source only)", async () => {
    const root = fixture({ driftedGuide: true });
    const stateBefore = JSON.parse(read(root, ".i18n-state.json")!);
    const r = await refreshDerived({
      root,
      only: ONLY,
      facts: FACTS,
      planDerivedRewrites: fakePlan(["README.md", "docs/guides/GUIDE.md"]),
    });
    assert.equal(refreshExitCode(r, { check: false }), 0);
    const readme = read(root, "README.md")!;
    const mirror = read(root, "docs/i18n/pt-BR/README.md")!;
    assert.equal(readme, "# OmniRoute\n\n395 providers. OmniRoute v3.8.55 · one endpoint.\n");
    assert.equal(mirror, "# OmniRoute\n\n395 provedores. OmniRoute v3.8.55 · um endpoint.\n");
    assert.equal(read(root, "docs/guides/GUIDE.md"), "Routes across 395 providers.\n");
    assert.equal(
      read(root, "docs/i18n/pt-BR/docs/guides/GUIDE.md"),
      GUIDE_PT,
      "unsafe mirror untouched"
    );
    assert.equal(read(root, "docs/reference/derived-facts.json"), serializeFacts(FACTS));

    const state = JSON.parse(read(root, ".i18n-state.json")!);
    // README was in sync → hashes follow the rewrite; section_hashes are never touched
    assert.equal(state.sources["README.md"].source_hash, sha256(readme));
    assert.equal(state.sources["README.md"].locales["pt-BR"].source_hash, sha256(readme));
    assert.equal(state.sources["README.md"].locales["pt-BR"].target_hash, sha256(mirror));
    assert.deepEqual(state.sources["README.md"].locales["pt-BR"].section_hashes, ["abc"]);
    // the guide was already drifted → its state is left to the i18n wave
    assert.deepEqual(
      state.sources["docs/guides/GUIDE.md"],
      stateBefore.sources["docs/guides/GUIDE.md"]
    );

    // a second run with the same facts is a no-op
    const again = await refreshDerived({
      root,
      check: true,
      only: ONLY,
      facts: FACTS,
      planDerivedRewrites: fakePlan(["README.md", "docs/guides/GUIDE.md"]),
    });
    assert.deepEqual(again.changedFiles, []);
  });

  it("nightly: never rewrites version claims (manual) and never touches the changelog", async () => {
    const root = fixture();
    fs.mkdirSync(path.join(root, "changelog.d", "fixes"), { recursive: true });
    fs.writeFileSync(path.join(root, "changelog.d", "fixes", "1-x.md"), "- fix (#1)\n");
    fs.writeFileSync(path.join(root, "CHANGELOG.md"), "## [3.8.55]\n\n### 🐛 Bug Fixes\n");
    const r = await refreshDerived({
      root,
      profile: "nightly",
      only: ["changelog", ...ONLY],
      facts: FACTS,
      planDerivedRewrites: fakePlan(["README.md"]),
    });
    assert.equal(r.steps.find((s) => s.id === "changelog")?.status, "skipped");
    assert.equal(read(root, "CHANGELOG.md"), "## [3.8.55]\n\n### 🐛 Bug Fixes\n");
    assert.ok(fs.existsSync(path.join(root, "changelog.d", "fixes", "1-x.md")));
    assert.equal(
      read(root, "README.md"),
      "# OmniRoute\n\n395 providers. OmniRoute v3.8.54 · one endpoint.\n"
    );
    assert.equal(
      read(root, "docs/i18n/pt-BR/README.md"),
      "# OmniRoute\n\n395 provedores. OmniRoute v3.8.54 · um endpoint.\n"
    );
    assert.ok(r.manual.some((m) => /release-only/.test(m.detail)));
    await assert.rejects(
      refreshDerived({ root, profile: "nightly", withChangelog: true, only: [] }),
      /release/
    );
  });

  it("release --with-changelog --check reports the fragments without consuming them", async () => {
    const root = tree({
      "package.json": JSON.stringify({ version: "3.8.55" }),
      "CHANGELOG.md": "## [3.8.55]\n\n### 🐛 Bug Fixes\n",
      "changelog.d/fixes/1-x.md": "- fix (#1)\n",
    });
    const r = await refreshDerived({ root, check: true, withChangelog: true, only: ["changelog"] });
    assert.equal(r.steps[0].status, "changed");
    assert.ok(r.changedFiles.includes("CHANGELOG.md"));
    assert.ok(r.changedFiles.some((f) => f.endsWith("1-x.md")));
    assert.equal(read(root, "CHANGELOG.md"), "## [3.8.55]\n\n### 🐛 Bug Fixes\n");
    assert.ok(fs.existsSync(path.join(root, "changelog.d", "fixes", "1-x.md")));
    // without the opt-in, --check never looks at changelog.d/
    const off = await refreshDerived({ root, check: true, only: ["changelog"] });
    assert.equal(off.steps[0].status, "skipped");
    assert.deepEqual(off.changedFiles, []);
  });

  it("a plan computed on other content is never applied", async () => {
    const root = fixture();
    const stale = () => ({
      files: [{ path: "README.md", before: "old", after: "new", changes: [] }],
      manual: [{ path: "AGENTS.md", label: "mode packs", detail: "names" }],
    });
    const r = await refreshDerived({
      root,
      only: ["numbers"],
      facts: FACTS,
      planDerivedRewrites: stale,
    });
    assert.equal(read(root, "README.md"), README);
    assert.ok(r.manual.some((m) => m.path === "README.md" && /different content/.test(m.detail)));
    assert.ok(
      r.manual.some((m) => m.path === "AGENTS.md"),
      "plan.manual is passed through"
    );
  });

  it("facts that cannot be collected fail the dependent steps as infrastructure (exit 2)", async () => {
    const root = fixture();
    const r = await refreshDerived({
      root,
      check: true,
      only: ONLY,
      collectFacts: () => ({
        facts: null,
        error: { kind: "timeout", detail: "probe timed out — infrastructure" },
      }),
      planDerivedRewrites: fakePlan(["README.md"]),
    });
    assert.deepEqual(
      r.steps.filter((s) => s.status === "failed").map((s) => s.id),
      ["facts", "numbers"]
    );
    assert.match(r.infraError, /probe timed out/);
    assert.equal(refreshExitCode(r, { check: true }), 2);
  });
});

describe("provider reference comparison", () => {
  it("ignores only the generation date", () => {
    const a =
      "lastUpdated: 2026-11-12\n> **Last generated:** 2026-11-12\nTotal providers: **393**.";
    const b =
      "lastUpdated: 2026-11-13\n> **Last generated:** 2026-11-13\nTotal providers: **393**.";
    assert.equal(normalizeProviderReference(a), normalizeProviderReference(b));
    assert.notEqual(
      normalizeProviderReference(a),
      normalizeProviderReference(b.replace("393", "394"))
    );
  });
});

// Review findings (2026-11-13): the REAL gate plan lists the README mirrors' database row BEFORE
// README.md. The refresh must still carry everything once, refresh .i18n-state.json and leave no
// manual item — and must never certify a mirror that kept an old value, nor a stale locale.
describe("refreshDerived with the real gate plan (README + mirrors + state)", () => {
  const REPO = path.resolve(import.meta.dirname, "../..");
  const realFile = (rel: string) => fs.readFileSync(path.join(REPO, rel), "utf8");
  const LOCALES = ["pt-BR", "fa"];

  function realFixture(opts: { staleLocale?: string } = {}) {
    const files: Record<string, string> = { "README.md": realFile("README.md") };
    for (const l of LOCALES)
      files[`docs/i18n/${l}/README.md`] = realFile(`docs/i18n/${l}/README.md`);
    const src = sha256(files["README.md"]);
    const locales: Record<string, object> = {};
    for (const l of LOCALES) {
      locales[l] = {
        source_hash: opts.staleLocale === l ? "older-source" : src,
        target_hash: sha256(files[`docs/i18n/${l}/README.md`]),
        section_hashes: ["keep"],
        updated_at: "2026-01-01T00:00:00.000Z",
      };
    }
    files[".i18n-state.json"] =
      JSON.stringify({ sources: { "README.md": { source_hash: src, locales } } }, null, 2) + "\n";
    return tree(files);
  }

  async function snapshotFacts() {
    const { loadFactsSnapshot } = await import("../../scripts/release/facts.mjs");
    const facts = loadFactsSnapshot(REPO) as Record<string, unknown>;
    assert.ok(facts, "docs/reference/derived-facts.json is missing");
    return { ...facts, migrations: Number(facts.migrations) + 1 };
  }

  it("migrations+1: source and every mirror carry the new count, state refreshed, no manual", async () => {
    const root = realFixture();
    const facts = await snapshotFacts();
    const before = Number(facts.migrations) - 1;
    const r = await refreshDerived({ root, only: ["numbers"], facts });
    assert.deepEqual(r.manual, [], JSON.stringify(r.manual, null, 1));
    assert.equal(refreshExitCode(r, { check: false }), 0);

    const readme = read(root, "README.md")!;
    assert.ok(readme.includes(`${before + 1} migrations`), "README carries the new count");
    assert.ok(!readme.includes(`${before} migrations`), "README lost the old count");
    for (const l of LOCALES) {
      const mirror = read(root, `docs/i18n/${l}/README.md`)!;
      assert.notEqual(mirror, realFile(`docs/i18n/${l}/README.md`), `${l} mirror rewritten`);
    }
    const state = JSON.parse(read(root, ".i18n-state.json")!);
    const entry = state.sources["README.md"];
    assert.equal(entry.source_hash, sha256(readme), "top-level source hash refreshed");
    for (const l of LOCALES) {
      const mirror = read(root, `docs/i18n/${l}/README.md`)!;
      assert.equal(entry.locales[l].source_hash, entry.source_hash, `${l} in sync`);
      assert.equal(entry.locales[l].target_hash, sha256(mirror), `${l} target hash = file`);
      assert.deepEqual(entry.locales[l].section_hashes, ["keep"], "section hashes untouched");
    }
  });

  it("a locale that was already stale keeps its source hash (never certified)", async () => {
    const root = realFixture({ staleLocale: "pt-BR" });
    const r = await refreshDerived({ root, only: ["numbers"], facts: await snapshotFacts() });
    assert.deepEqual(r.manual, []);
    const entry = JSON.parse(read(root, ".i18n-state.json")!).sources["README.md"];
    assert.equal(entry.locales["pt-BR"].source_hash, "older-source", "still stale");
    assert.equal(
      entry.locales["pt-BR"].target_hash,
      sha256(read(root, "docs/i18n/pt-BR/README.md")!),
      "its new content is recorded"
    );
    assert.equal(
      entry.locales.fa.source_hash,
      entry.source_hash,
      "the in-sync locale is refreshed"
    );
  });
});

describe("propagateChangesToMirror: partial carry is never certified", () => {
  it("one change reaches the mirror, another does not → manual", () => {
    const source = "393 providers and 239 migrations; 239 SQL files.\n";
    const mirror = "393 provedores e 239 migrações.\n"; // the translation merged the two 239s
    const changes = [
      { label: "Provider count", from: "393", to: "394", index: 0 },
      { label: "DB migrations count", from: "239", to: "240", index: source.indexOf("239") },
      { label: "DB migrations count", from: "239", to: "240", index: source.lastIndexOf("239") },
    ];
    const r = propagateChangesToMirror({ sourceBefore: source, changes, mirrorText: mirror });
    assert.equal(r.manual.length, 1, JSON.stringify(r.manual));
    assert.match(r.manual[0].detail, /"239" → "240"/);
    assert.ok(r.content.startsWith("394 provedores"), "the safe change still lands");
  });

  it("a change the plan already applied in local digits counts as carried", () => {
    const source = "Database: 236 migrations.\n";
    const planned = "پایگاه داده: ۲۳۷ مایگریشن.\n"; // the plan rewrote ۲۳۶ → ۲۳۷ itself
    const r = propagateChangesToMirror({
      sourceBefore: source,
      changes: [{ label: "DB migrations count", from: "236", to: "237", index: 10 }],
      mirrorText: planned,
      alreadyApplied: [{ from: "۲۳۶", to: "۲۳۷" }],
    });
    assert.deepEqual(r.manual, []);
    assert.equal(r.content, planned);
  });
});
