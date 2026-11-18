import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import crypto from "node:crypto";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const google = await import("../../scripts/i18n/lib/google-translate.mjs");
const runner = await import("../../scripts/i18n/run-translation.mjs");

// #18538: the scheduled mirror refresh threw away every translated locale when a few failed
// (run 40830410369: 506 translated, 22 failed, no PR). A failed (source, locale) must now keep
// its mirror and its state record exactly as they were while the rest is written and recorded.

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const LOCALES = ["de", "fr", "ja"];
const sha = (text: string) => crypto.createHash("sha256").update(text).digest("hex");

const OLD_A = "# Alpha\n\nIntro.\n\n## Setup\n\nOld setup text.\n";
const NEW_A = "# Alpha\n\nIntro.\n\n## Setup\n\nNew setup text with one more sentence.\n";
const OLD_B = "# Beta\n\nBeta intro.\n";
const NEW_B = "# Beta\n\nBeta intro, revised.\n";

// The keyless endpoint, faked in the child process: prose comes back upper-cased, and the
// locales in FAKE_GOOGLE_FAIL, and any text containing FAKE_GOOGLE_FAIL_TEXT, answer HTTP 400
// (not retryable, so the test stays fast).
const FAKE_FETCH = `
import { writeFileSync } from "node:fs";
const fail = new Set((process.env.FAKE_GOOGLE_FAIL || "").split(",").filter(Boolean));
let first = true;
globalThis.fetch = async (url, init) => {
  if (first && process.env.FAKE_CORRUPT_STATE) writeFileSync(process.env.FAKE_CORRUPT_STATE, "");
  first = false;
  const tl = new URL(url).searchParams.get("tl");
  const q = new URLSearchParams(init.body).getAll("q");
  const failText = process.env.FAKE_GOOGLE_FAIL_TEXT;
  if (fail.has(tl) || (failText && q.some((s) => s.includes(failText))))
    return { ok: false, status: 400, json: async () => ({}) };
  return { ok: true, status: 200, json: async () => q.map((s) => "T:" + s.toUpperCase()) };
};
`;

type LocaleRecord = { source_hash: string | null; target_hash: string; updated_at: string };
type SourceRecord = { source_hash: string | null; locales: Record<string, LocaleRecord> };
type State = { sources: Record<string, SourceRecord> };
type Fixture = { root: string; mirror: (rel: string, loc: string) => string; state: () => State };

function fixture(): Fixture {
  const root = mkdtempSync(path.join(tmpdir(), "i18n-partial-"));
  cpSync(path.join(REPO, "scripts", "i18n"), path.join(root, "scripts", "i18n"), {
    recursive: true,
  });
  symlinkSync(path.join(REPO, "node_modules"), path.join(root, "node_modules"), "dir");
  mkdirSync(path.join(root, "config"), { recursive: true });
  const locale = (code: string) => ({
    code,
    label: code.toUpperCase(),
    native: code,
    english: code,
  });
  writeFileSync(
    path.join(root, "config", "i18n.json"),
    JSON.stringify({ default: "en", docsExcluded: ["en"], locales: ["en", ...LOCALES].map(locale) })
  );
  writeFileSync(path.join(root, "fake-fetch.mjs"), FAKE_FETCH);

  const mirrorPath = (rel: string, loc: string) => path.join(root, "docs", "i18n", loc, rel);
  const sources: Record<string, SourceRecord> = {};
  for (const [rel, oldText, newText] of [
    ["docs/guides/ALPHA.md", OLD_A, NEW_A],
    ["docs/guides/BETA.md", OLD_B, NEW_B],
  ]) {
    mkdirSync(path.dirname(path.join(root, rel)), { recursive: true });
    writeFileSync(path.join(root, rel), newText);
    const locales: Record<string, LocaleRecord> = {};
    for (const loc of LOCALES) {
      const mirror = `# ${rel} (${loc})\n\n---\n\nOld ${loc} translation of ${rel}.\n`;
      mkdirSync(path.dirname(mirrorPath(rel, loc)), { recursive: true });
      writeFileSync(mirrorPath(rel, loc), mirror);
      locales[loc] = {
        source_hash: sha(oldText),
        target_hash: sha(mirror),
        updated_at: "2026-10-01T00:00:00.000Z",
      };
    }
    sources[rel] = { source_hash: sha(oldText), locales };
  }
  writeFileSync(path.join(root, ".i18n-state.json"), JSON.stringify({ sources }, null, 2));
  return {
    root,
    mirror: (rel, loc) => readFileSync(mirrorPath(rel, loc), "utf8"),
    state: () => JSON.parse(readFileSync(path.join(root, ".i18n-state.json"), "utf8")),
  };
}

function runTranslation(
  fx: Fixture,
  env: Record<string, string>,
  files = "docs/guides/ALPHA.md,docs/guides/BETA.md"
) {
  const res = spawnSync(
    process.execPath,
    [
      "--import",
      path.join(fx.root, "fake-fetch.mjs"),
      path.join(fx.root, "scripts", "i18n", "run-translation.mjs"),
      `--files=${files}`,
      `--failures-json=${path.join(fx.root, "failures.json")}`,
    ],
    {
      cwd: fx.root,
      encoding: "utf8",
      env: {
        ...process.env,
        GIT_CEILING_DIRECTORIES: path.dirname(fx.root),
        OMNIROUTE_TRANSLATION_ENGINE: "google",
        OMNIROUTE_TRANSLATION_GOOGLE_API_KEY: "",
        ...env,
      },
    }
  );
  const failuresPath = path.join(fx.root, "failures.json");
  const summary = existsSync(failuresPath) ? JSON.parse(readFileSync(failuresPath, "utf8")) : null;
  return { status: res.status, output: `${res.stdout}\n${res.stderr}`, summary };
}

test("a partial run writes and records the good locales and leaves a failed one as it was", (t) => {
  const fx = fixture();
  t.after(() => rmSync(fx.root, { recursive: true, force: true }));
  const before = fx.state();
  const oldFr = fx.mirror("docs/guides/ALPHA.md", "fr");

  const { status, output, summary } = runTranslation(fx, { FAKE_GOOGLE_FAIL: "fr" });

  assert.equal(status, runner.EXIT_PARTIAL, output);
  const after = fx.state();
  for (const rel of ["docs/guides/ALPHA.md", "docs/guides/BETA.md"]) {
    for (const loc of ["de", "ja"]) {
      const mirror = fx.mirror(rel, loc);
      assert.match(mirror, /T:/, `${rel} [${loc}] was translated`);
      assert.equal(after.sources[rel].locales[loc].target_hash, sha(mirror));
      assert.equal(after.sources[rel].locales[loc].source_hash, after.sources[rel].source_hash);
    }
    // the failed locale: same bytes on disk, same record in the state (nothing adopted)
    assert.deepEqual(after.sources[rel].locales.fr, before.sources[rel].locales.fr);
  }
  assert.equal(fx.mirror("docs/guides/ALPHA.md", "fr"), oldFr);
  assert.equal(after.sources["docs/guides/ALPHA.md"].source_hash, sha(NEW_A));
  assert.deepEqual(
    summary.failures.map((f: { rel: string; locale: string }) => `${f.rel} [${f.locale}]`).sort(),
    ["docs/guides/ALPHA.md [fr]", "docs/guides/BETA.md [fr]"]
  );
  assert.equal(summary.translated, 4);
  assert.equal(summary.translatedUnits.length, 4);
});

test("a run where every locale fails still exits 1 and changes nothing", (t) => {
  const fx = fixture();
  t.after(() => rmSync(fx.root, { recursive: true, force: true }));
  const before = fx.state();
  const oldDe = fx.mirror("docs/guides/BETA.md", "de");

  const { status, output, summary } = runTranslation(fx, { FAKE_GOOGLE_FAIL: LOCALES.join(",") });

  assert.equal(status, 1, output);
  assert.deepEqual(fx.state(), before);
  assert.equal(fx.mirror("docs/guides/BETA.md", "de"), oldDe);
  assert.equal(summary.translated, 0);
  assert.equal(summary.failures.length, 6);
});

test("a source whose every locale failed keeps its source_hash when the state is rebuilt from the run", (t) => {
  // save-time re-read fails (file emptied mid-run) → the run's in-memory snapshot is written
  const fx = fixture();
  t.after(() => rmSync(fx.root, { recursive: true, force: true }));
  const before = fx.state();

  const { status, output } = runTranslation(fx, {
    FAKE_GOOGLE_FAIL_TEXT: "Beta", // BETA fails in every locale, ALPHA translates everywhere
    FAKE_CORRUPT_STATE: path.join(fx.root, ".i18n-state.json"),
  });
  assert.equal(status, runner.EXIT_PARTIAL, output);
  assert.match(output, /merging into this run's snapshot/);
  const after = fx.state();
  assert.equal(after.sources["docs/guides/ALPHA.md"].source_hash, sha(NEW_A));
  // still reported as a drifted source by i18n:check, as it must be
  assert.deepEqual(after.sources["docs/guides/BETA.md"], before.sources["docs/guides/BETA.md"]);
});

test("translationExitCode: 0 clean, 3 partial, 1 when nothing translated", () => {
  assert.equal(runner.translationExitCode({ translated: 5, failed: 0 }), 0);
  assert.equal(runner.translationExitCode({ translated: 5, failed: 2 }), runner.EXIT_PARTIAL);
  assert.equal(runner.translationExitCode({ translated: 0, failed: 2 }), 1);
  assert.notEqual(runner.EXIT_PARTIAL, 1);
});

test("blockingDrift excuses only the failed units and never an unreadable report", () => {
  const failures = [
    { rel: "docs/A.md", locale: "fr" },
    { rel: "docs/B.md", locale: "de" },
    { rel: "docs/B.md", locale: "fr" },
  ];
  const translated = [{ rel: "docs/A.md", locale: "de" }];
  const report = {
    ok: false,
    driftedSources: [{ rel: "docs/A.md" }, { rel: "docs/B.md" }, { rel: "docs/C.md" }],
    missingTargets: [{ rel: "docs/B.md", locale: "de" }],
    driftedTargets: [
      { rel: "docs/A.md", locale: "fr" },
      { rel: "docs/A.md", locale: "ja" },
    ],
  };
  const left = runner
    .blockingDrift(report, failures, translated)
    .map((x: { kind: string; rel: string; locale?: string }) =>
      `${x.kind} ${x.rel} ${x.locale ?? ""}`.trim()
    );
  assert.deepEqual(left, [
    // A translated in de, so its source-level drift is real
    "driftedSources docs/A.md",
    "driftedSources docs/C.md",
    "driftedTargets docs/A.md ja",
  ]);
  assert.deepEqual(
    runner.blockingDrift(
      { ok: true, driftedSources: [], missingTargets: [], driftedTargets: [] },
      []
    ),
    []
  );
  assert.equal(runner.blockingDrift({ ok: false, reason: "missing-state" }, failures).length, 1);
});

// The keyless endpoint drops connections; undici reports that as TypeError("fetch failed")
// with a cause such as `SocketError: other side closed` (UND_ERR_SOCKET).
function socketReset() {
  const cause = Object.assign(new Error("other side closed"), {
    name: "SocketError",
    code: "UND_ERR_SOCKET",
  });
  return new TypeError("fetch failed", { cause });
}

function flakyFetch(resets: number) {
  let calls = 0;
  const fetchImpl = async (_url: string, init: { body: string }) => {
    calls++;
    if (calls <= resets) throw socketReset();
    const q = new URLSearchParams(init.body).getAll("q");
    return { ok: true, status: 200, json: async () => q.map((s) => "T:" + s.toUpperCase()) };
  };
  return { fetchImpl, calls: () => calls };
}

test("a dropped connection (fetch failed, socket cause) is retried and then succeeds", async () => {
  const flaky = flakyFetch(2);
  const out = await google.translateMarkdownWithGoogle("Plain sentence.", "de", {
    fetchImpl: flaky.fetchImpl,
    backoffMs: 1,
  });
  assert.equal(out, "T:PLAIN SENTENCE.");
  assert.equal(flaky.calls(), 3);
});

test("a connection that keeps dropping exhausts the retries and fails the locale", async () => {
  const dead = flakyFetch(Infinity);
  const backend = {
    engine: "google",
    googleTranslate: (text: string, code: string, opts: object) =>
      google.translateMarkdownWithGoogle(text, code, {
        ...opts,
        fetchImpl: dead.fetchImpl,
        backoffMs: 1,
      }),
  };
  await assert.rejects(
    runner.translateBody("Plain sentence.", { code: "de", native: "Deutsch" }, backend),
    /fetch failed/
  );
  // MAX_TRIES (7) per request, and the chunk-level attempts on top of it
  assert.ok(dead.calls() >= 7, `retried ${dead.calls()} times`);
  assert.equal(dead.calls() % 7, 0);
});

test("the refresh workflow can import blockingDrift under `node -e` without starting a run", () => {
  // i18n-mirror-refresh.yml's check step does exactly this; argv[1] is unset there.
  const res = spawnSync(
    process.execPath,
    [
      "--input-type=module",
      "-e",
      'import { blockingDrift } from "./scripts/i18n/run-translation.mjs"; console.log(typeof blockingDrift);',
    ],
    { cwd: REPO, encoding: "utf8" }
  );
  assert.equal(res.status, 0, res.stderr);
  assert.equal(res.stdout.trim(), "function");
});

test("a brand-new source whose every locale failed gets no source_hash when the state is rebuilt from the run", (t) => {
  // No state entry and no mirrors yet; the save-time re-read fails, so the run's in-memory
  // snapshot is written. The new entry must not claim the current source as translated.
  const fx = fixture();
  t.after(() => rmSync(fx.root, { recursive: true, force: true }));
  const rel = "docs/guides/GAMMA.md";
  writeFileSync(path.join(fx.root, rel), "# Gamma\n\nGamma is a brand-new guide.\n");

  const { status, output, summary } = runTranslation(
    fx,
    { FAKE_GOOGLE_FAIL_TEXT: "Gamma", FAKE_CORRUPT_STATE: path.join(fx.root, ".i18n-state.json") },
    `docs/guides/ALPHA.md,${rel}`
  );

  assert.equal(status, runner.EXIT_PARTIAL, output);
  assert.match(output, /merging into this run's snapshot/);
  assert.equal(
    summary.failures.filter((f: { rel: string }) => f.rel === rel).length,
    LOCALES.length
  );
  const entry = fx.state().sources[rel];
  assert.notEqual(entry?.source_hash, sha("# Gamma\n\nGamma is a brand-new guide.\n"));
  assert.deepEqual(entry?.locales ?? {}, {});
  for (const loc of LOCALES)
    assert.equal(existsSync(path.join(fx.root, "docs", "i18n", loc, rel)), false);
});

test("blockingDrift: a locale that was never tried still blocks even when its source failed everywhere else", () => {
  // e.g. a `--locale=de,fr` run where docs/B.md failed in both: ja was not attempted, so its
  // missing or drifted mirror is not one of the failed units and must keep the check red.
  const failures = [
    { rel: "docs/B.md", locale: "de" },
    { rel: "docs/B.md", locale: "fr" },
  ];
  const report = {
    ok: false,
    driftedSources: [{ rel: "docs/B.md" }],
    missingTargets: [
      { rel: "docs/B.md", locale: "de" },
      { rel: "docs/B.md", locale: "ja" },
    ],
    driftedTargets: [
      { rel: "docs/B.md", locale: "fr" },
      { rel: "docs/B.md", locale: "ko" },
    ],
  };
  const left = runner
    .blockingDrift(report, failures, [])
    .map((x: { kind: string; rel: string; locale?: string }) =>
      `${x.kind} ${x.rel} ${x.locale ?? ""}`.trim()
    );
  assert.deepEqual(left, ["missingTargets docs/B.md ja", "driftedTargets docs/B.md ko"]);
});
