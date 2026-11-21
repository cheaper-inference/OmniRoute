import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  verifyInvariants,
  whitespaceTrimSet,
  discoverTargets,
  sourceTargets,
  PREDICATE_NAMES,
  PREDICATES,
  counter_matches_parser,
  property_boundary_regex,
  display_name_golden,
  activity_clock_refreshed,
} from "../../scripts/check/check-functional-invariants.mjs";

const d = (...lines) => lines.map((line, i) => ({ path: "src/a.ts", line, number: i + 1 }));
const a = (diff, predicate) => verifyInvariants(diff).some((r) => r.predicate === predicate);

// 0. Surface: exactly 12 named predicates
test("surface - the 12 named predicates are exported", () => {
  const expectedNames = [
    "counter_matches_parser",
    "probe_executor_parity",
    "full_denominator",
    "property_boundary_regex",
    "emit_after_sink",
    "active_wait",
    "display_name_golden",
    "source_guard_before_predicate",
    "kept_prefix_normalization",
    "activity_clock_refreshed",
    "published_payload_assertion",
    "test_hygiene",
  ];
  assert.equal(PREDICATE_NAMES.length, 12);
  assert.deepEqual([...PREDICATE_NAMES].sort(), [...expectedNames].sort());
  assert.equal(Object.keys(PREDICATES).length, 12);
});

// 1. counter_matches_parser
test("counter_matches_parser - runtime whitespace discovery (U+00A0 included, no hardcoded list)", () => {
  const ws = whitespaceTrimSet();
  assert.equal(ws.has("\u00a0"), true, "NBSP must be discovered by trim() at runtime");
  assert.equal(ws.has(" "), true);
  assert.equal(ws.has("\t"), true);
  assert.equal(ws.has("\u200b"), false, "zero-width space is not whitespace for trim()");
});

test("counter_matches_parser - nominal: 5 lines + U+00A0 -> 5 (count aligned with trim/parser)", () => {
  const diff = d(
    'const raw = "l1\\nl2\\nl3\\nl4\\nl5\\n\\u00a0";',
    'const total = raw.split("\\n").filter(l => l.trim().length > 0).length;',
    "const data = JSON.parse(raw);"
  );
  assert.equal(a(diff, "counter_matches_parser"), false);
});

test("counter_matches_parser - limit: JSON validation below limit, total persisted as 5", () => {
  const diff = d(
    'const total = raw.split("\\n").length;',
    "if (!validate(raw)) throw new Error('invalid');"
  );
  assert.equal(a(diff, "counter_matches_parser"), true);
  assert.equal(counter_matches_parser(diff)[0].correction.includes("parser"), true);
});

// 2. probe_executor_parity
test("probe_executor_parity - nominal: key supplied, same Bearer on both sides", () => {
  const diff = d('const probe = "Bearer " + apiKey;', "const execut = `Bearer ${apiKey}`;");
  assert.equal(a(diff, "probe_executor_parity"), false);
});

test("probe_executor_parity - nominal: Kilo without key -> Bearer anonymous on both sides", () => {
  const diff = d('const probe = "Bearer anonymous";', 'const execut = "Bearer anonymous";');
  assert.equal(a(diff, "probe_executor_parity"), false);
});

test("probe_executor_parity - limit: key on one side, anonymous on the other -> REJECTED", () => {
  const diff = d('const probe = "Bearer " + apiKey;', 'const execut = "Bearer anonymous";');
  assert.equal(a(diff, "probe_executor_parity"), true);
});

// 3. full_denominator
test("full_denominator - nominal: 3 unfiltered attempts -> 1/3", () => {
  const diff = d("const attempts = [1, 2, 3];", "console.log(`${attempt}/${attempts.length}`);");
  assert.equal(a(diff, "full_denominator"), false);
});

test("full_denominator - limit: filter returning only attempt 1 -> rank alone", () => {
  const diff = d("console.log(`${attempt}/${attempts.filter(t => t.ok).length}`);");
  assert.equal(a(diff, "full_denominator"), true);
});

test("full_denominator - limit: cap at 300 -> partial denominator", () => {
  const diff = d("console.log(`${attempt}/${Math.min(total, 300)}`);");
  assert.equal(a(diff, "full_denominator"), true);
});
test("full_denominator - a diagnostic slash with no count is not a displayed denominator", () => {
  const diff = d("errors.push(`duplicate profile member: ${name}/${alias}`);");
  assert.equal(a(diff, "full_denominator"), false);
});
test("full_denominator - a regex flag is not a denominator", () => {
  const diff = d("const issue = /no linked issue/i.test(comment);");
  assert.equal(a(diff, "full_denominator"), false);
});

// 4. property_boundary_regex
test("property_boundary_regex - nominal: ECONNRESET (code) -> retry, no signal", () => {
  const diff = d('if (err.code === "ECONNRESET") retry();');
  assert.equal(a(diff, "property_boundary_regex"), false);
});

test("property_boundary_regex - limit: property error on message -> no retry (REJECTED)", () => {
  const diff = d("if (/ECONNRESET/.test(err.message)) retry();");
  assert.equal(a(diff, "property_boundary_regex"), true);
  assert.equal(property_boundary_regex(diff)[0].correction.includes("reading 'network'"), true);
});

// 5. emit_after_sink
test("emit_after_sink - nominal: log emitted after setHostSink", () => {
  const diff = d("setHostSink(sink);", "ctx.client.app.log('warn', 'ready');");
  assert.equal(a(diff, "emit_after_sink"), false);
});

test("emit_after_sink - limit: call before sink + setup without ctx.client.app.log -> REJECTED", () => {
  const diff = d(
    "function firstSetup(ctx) { /* no ctx.client.app.log */ }",
    "ctx.client.app.log('warn', 'early');",
    "setHostSink(sink);"
  );
  assert.equal(a(diff, "emit_after_sink"), true);
});

// 6. active_wait
test("active_wait - nominal: setImmediate outside a loop -> green", () => {
  const diff = d("setImmediate(flush);");
  assert.equal(a(diff, "active_wait"), false);
});

test("active_wait - nominal: loop with waiters.push(resolve) -> green", () => {
  const diff = d(
    "while (waiters.length) {",
    "  waiters.push(resolve);",
    "  await new Promise(r => setImmediate(r));",
    "}"
  );
  assert.equal(a(diff, "active_wait"), false);
});

test("active_wait - nominal: process.nextTick outside a loop -> green", () => {
  const diff = d("process.nextTick(flush);");
  assert.equal(a(diff, "active_wait"), false);
});

test("active_wait - limit: await new Promise(setImmediate) in a worker while -> REJECTED", () => {
  const diff = d("while (worker.busy) {", "  await new Promise(r => setImmediate(r));", "}");
  assert.equal(a(diff, "active_wait"), true);
});

test("active_wait - limit: while + process.nextTick -> named-predicate REJECTED", () => {
  const diff = d("while (worker.busy) {", "  process.nextTick(flush);", "}");
  assert.equal(a(diff, "active_wait"), true);
});

test("active_wait - limit: while + direct setImmediate -> named-predicate REJECTED", () => {
  const diff = d("while (worker.busy) {", "  setImmediate(flush);", "}");
  assert.equal(a(diff, "active_wait"), true);
});

// 7. display_name_golden
test("display_name_golden - real table read at runtime (readdir + JSON.parse, 3 cases)", () => {
  const guard = d(
    "const name = buildModelDisplayName(combo);",
    "if (name.startsWith(prefix)) name = name.slice(prefix.length);"
  );
  assert.equal(
    a(guard, "display_name_golden"),
    false,
    "non-empty table + guarded strip -> no signal"
  );
  const naive = d("publishCombos(c);", "const short = name.replace(/^.* - /, '');");
  assert.equal(a(naive, "display_name_golden"), true);
  assert.equal(display_name_golden(naive)[0].correction.includes("GPT-4 - Turbo preview"), true);
});

test("display_name_golden - nominal: combo without name or rawModelId keeps its name", () => {
  const diff = d(
    "const name = buildModelDisplayName(combo);",
    "if (name.startsWith(prefix)) name = name.slice(prefix.length);"
  );
  assert.equal(a(diff, "display_name_golden"), false);
});

test("display_name_golden - limit: naive strip breaks GPT-4 - Turbo preview -> REJECTED", () => {
  const diff = d(
    "const name = buildModelDisplayName(combo);",
    "const short = name.replace(/^.* - /, '');"
  );
  const signals = display_name_golden(diff);
  assert.equal(signals.length > 0, true);
  assert.equal(
    signals[0].correction.includes("GPT-4 - Turbo preview"),
    true,
    "the name comes from the table, not the code"
  );
});

test("display_name_golden - MISSING table -> immediate REJECTED", () => {
  const dirAbsent = join(tmpdir(), `t14-goldens-absent-${process.pid}-${Date.now()}`);
  assert.equal(existsSync(dirAbsent), false, "the directory must be absent for this case");
  const diff = d("const name = buildModelDisplayName(combo);");
  const signals = display_name_golden(diff, { goldensDir: dirAbsent });
  assert.equal(signals.length, 1);
  assert.equal(signals[0].correction.includes("missing or empty table"), true);
});

test("display_name_golden - EMPTY table -> immediate REJECTED", () => {
  const dirVide = mkdtempSync(join(tmpdir(), "t14-goldens-empty-"));
  try {
    const diff = d("const name = buildModelDisplayName(combo);");
    const signals = display_name_golden(diff, { goldensDir: dirVide });
    assert.equal(signals.length, 1);
    assert.equal(signals[0].line, "(table missing or empty)");
  } finally {
    rmSync(dirVide, { recursive: true, force: true });
  }
});

// 8. source_guard_before_predicate
test("source_guard_before_predicate - nominal: default source tested before isUserComboRow", () => {
  const diff = d(
    "if (combosSource === 'models') {",
    "  expect(isUserComboRow('kg/auto-fallback')).toBe(false);",
    "}"
  );
  assert.equal(a(diff, "source_guard_before_predicate"), false);
});

test("source_guard_before_predicate - limit: guard after the predicate -> REJECTED", () => {
  const diff = d(
    "expect(isUserComboRow('kg/auto-fallback')).toBe(false);",
    "combosSource: 'models'",
    "if (combosSource === 'models') { /* late */ }"
  );
  assert.equal(a(diff, "source_guard_before_predicate"), true);
});

// 9. kept_prefix_normalization
test("kept_prefix_normalization - nominal: startsWith before replace, unprefixed input rejected", () => {
  const diff = d(
    "if (!name.startsWith('package/')) throw new Error('bad tarball');",
    "name = name.replace('package/', '');"
  );
  assert.equal(a(diff, "kept_prefix_normalization"), false);
});

test("kept_prefix_normalization - limit: replace alone -> REJECTED", () => {
  const diff = d("name = name.replace('package/', '');");
  assert.equal(a(diff, "kept_prefix_normalization"), true);
});

// 10. activity_clock_refreshed
test("activity_clock_refreshed - nominal: 3 writes at start/release/finally", () => {
  const diff = d(
    "this.lastActivityAt = Date.now(); // start",
    "release(): this.lastActivityAt = Date.now();",
    "finally { this.lastActivityAt = Date.now(); noteStreamableInflight(-1); }"
  );
  assert.equal(a(diff, "activity_clock_refreshed"), false);
});

test("activity_clock_refreshed - limit: single write at start -> REJECTED", () => {
  const diff = d("this.lastActivityAt = Date.now(); // start");
  const signals = activity_clock_refreshed(diff);
  assert.equal(signals.length > 0, true);
  assert.equal(signals[0].correction.includes("3"), true);
});

test("activity_clock_refreshed - limit via verifyInvariants: named-predicate wiring", () => {
  const diff = d("this.lastActivityAt = Date.now(); // start");
  const signals = verifyInvariants(diff);
  assert.equal(
    signals.some((r) => r.predicate === "activity_clock_refreshed"),
    true
  );
});

// 11. published_payload_assertion
test("published_payload_assertion - nominal: assert(... 'm1') present", () => {
  const diff = d("assert.equal(payload.model, 'm1');", "const provider = 'openai';");
  assert.equal(a(diff, "published_payload_assertion"), false);
});

test("published_payload_assertion - limit: assert on provider name only -> REJECTED", () => {
  const diff = d("assert.equal(payload.provider, 'openai');");
  assert.equal(a(diff, "published_payload_assertion"), true);
});

// 12. test_hygiene
test("test_hygiene - nominal: mock as 2nd argument, waitFor, return after assert", () => {
  const diff = d(
    "const fakeMock = makeMock();",
    "const sut = build(fakeMock, opts);",
    "await waitFor(() => sut.ready);",
    "assert.equal(sut.ok, true);",
    "return;"
  );
  assert.equal(a(diff, "test_hygiene"), false);
});

test("test_hygiene - nominal: setTimeout in a guarding Promise.race -> green", () => {
  const diff = d(
    "await Promise.race([done, new Promise(r => setTimeout(r, 200))]);",
    "assert.ok(true);"
  );
  assert.equal(a(diff, "test_hygiene"), false);
});

test("test_hygiene - limit: return; before assert -> REJECTED", () => {
  const diff = d("if (skip) return;", "assert.equal(x, 1);");
  assert.equal(a(diff, "test_hygiene"), true);
});

test("test_hygiene - limit: mock not passed to the SUT -> REJECTED", () => {
  const diff = d("const fakeMock = makeMock();", "const sut = build(fakeMock);", "assert.ok(sut);");
  assert.equal(a(diff, "test_hygiene"), true);
});

test("test_hygiene - limit: expect(x.some(...)).toBe(false) without a link -> REJECTED", () => {
  const diff = d("expect(rows.some(r => r === 1)).toBe(false);");
  assert.equal(a(diff, "test_hygiene"), true);
});

test("test_hygiene - limit: setTimeout(assert, 200) after tick() without a guard -> REJECTED", () => {
  const diff = d("tick();", "setTimeout(() => assert.equal(x, 1), 200);");
  assert.equal(a(diff, "test_hygiene"), true);
});

// CodeRabbit 14:13 — remaining Major/Minor points.
test("probe_executor_parity - independent providers keep independent credentials", () => {
  const diff = [
    { path: "openai.ts", line: "const a = `Bearer ${openaiKey}`;", number: 1 },
    { path: "anthropic.ts", line: "const b = `Bearer ${anthropicKey}`;", number: 1 },
  ];
  assert.equal(a(diff, "probe_executor_parity"), false);
});
test("activity_clock_refreshed - enclosing block names count as context", () => {
  const diff = d(
    "start() {",
    "  this.lastActivityAt = Date.now();",
    "}",
    "release() {",
    "  this.lastActivityAt = Date.now();",
    "}",
    "finally {",
    "  this.lastActivityAt = Date.now();",
    "  noteStreamableInflight(-1);",
    "}"
  );
  assert.equal(a(diff, "activity_clock_refreshed"), false);
});
test("published_payload_assertion - a provider HTTP-status test is not a publication test", () => {
  const diff = d("const provider = 'openai';", "assert.equal(response.status, 200);");
  assert.equal(a(diff, "published_payload_assertion"), false);
});
test("published_payload_assertion - a publication signal in another file cannot flag an unrelated assertion", () => {
  const diff = [
    { path: "src/publish.ts", line: "publishModel(payload);", number: 1 },
    {
      path: "tests/unit/build/gate-manifest.test.ts",
      line: "assert.deepEqual(validateManifest(manifest, provider), []);",
      number: 1,
    },
  ];
  assert.equal(a(diff, "published_payload_assertion"), false);
});
test("counter_matches_parser - a filter in another file cannot clear this counter", () => {
  const diff = [
    { path: "a.ts", line: "const total = raw.split('\\n').length;", number: 1 },
    { path: "b.ts", line: "const rows = rows.filter(r => r.trim());", number: 1 },
  ];
  assert.equal(a(diff, "counter_matches_parser"), true);
});
test("active_wait - an inner closing brace does not deactivate the loop", () => {
  const diff = d(
    "while (worker.busy) {",
    "  if (ready) {",
    "    continue;",
    "  }",
    "  setImmediate(flush);",
    "}"
  );
  assert.equal(a(diff, "active_wait"), true);
});

// CodeRabbit 14:13 — scope the hygiene and executable-source checks.
test("test_hygiene - a return in a helper cannot skip an assert in another callback", () => {
  const diff = d("function noop() { return; }", "assert.equal(x, 1);");
  assert.equal(a(diff, "test_hygiene"), false);
});
test("test_hygiene - return before assert inside one test callback stays REJECTED", () => {
  const diff = d('test("x", () => {', "if (skip) return;", "assert.equal(x, 1);", "});");
  assert.equal(a(diff, "test_hygiene"), true);
});
test("sourceTargets - only executable source, test files and scanner excluded", () => {
  assert.deepEqual(
    sourceTargets([
      "docs/guide.md",
      "config/x.json",
      "src/a.ts",
      "src/b.mjs",
      "tests/unit/a.test.mjs",
      "scripts/check/check-functional-invariants.mjs",
    ]),
    ["src/a.ts", "src/b.mjs"]
  );
});

// Orchestration + dynamic discovery
test("orchestration - signal = predicate + path + line, bounded output", () => {
  const signals = verifyInvariants(d("if (/ECONNRESET/.test(err.message)) retry();"));
  assert.equal(signals.length >= 1, true);
  assert.equal(signals[0].predicate, "property_boundary_regex");
  assert.equal(typeof signals[0].path, "string");
  assert.equal(typeof signals[0].line, "string");
  assert.equal(verifyInvariants([]).length, 0);
});

test("discovery - git diff $BASE --name-only + ls-files, never a bare git diff", (t) => {
  // Self-contained repo: CI checkouts have no upstream/release/* ref, so a test
  // pinned to that local-only ref fails there even though the detector is fine.
  const dir = mkdtempSync(join(tmpdir(), "fi-targets-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const git = (...args) =>
    execFileSync("git", ["-C", dir, ...args], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  git("init", "-q");
  git("config", "user.email", "test@example.com");
  git("config", "user.name", "Test");
  writeFileSync(join(dir, "tracked.ts"), "const a = 1;\n");
  git("add", "tracked.ts");
  git("commit", "-qm", "seed");
  const base = git("rev-parse", "HEAD").trim();
  writeFileSync(join(dir, "tracked.ts"), "const a = 2;\n");
  writeFileSync(join(dir, "added.ts"), "const b = 3;\n");
  const targets = discoverTargets(dir, base);
  assert.equal(Array.isArray(targets), true);
  assert.equal(targets.includes("tracked.ts"), true, "modified tracked file");
  assert.equal(targets.includes("added.ts"), true, "untracked file");
});

test("node --import tsx/esm loads the TS whitespace-discovery substrate", () => {
  const output = execFileSync(
    "node",
    [
      "--import",
      "tsx/esm",
      "-e",
      'import("./scripts/check/check-substrate-invariants.ts").then(m => console.log("SUBSTRAT_OK nb=" + m.whitespaceTrimSet().has(0x00a0)))',
    ],
    { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }
  ).trim();
  assert.match(output, /SUBSTRAT_OK nb=true/);
});
