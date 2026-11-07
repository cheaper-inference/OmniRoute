/**
 * RTK PHPUnit filter — selection and compaction of PHPUnit test-runner output.
 *
 * The samples below are PHPUnit 10.5's own end-to-end expected outputs
 * (sebastianbergmann/phpunit, branch 10.5: tests/end-to-end/generic/default.phpt,
 * cli/failure-reverse-list.phpt, generic/exception-stack.phpt, regression/5258.phpt) with the
 * `%s`/`%d` placeholders filled in with concrete values, so they match what `vendor/bin/phpunit`
 * prints byte for byte (including the right-aligned dot-progress counter).
 *
 * Before this filter existed, PHPUnit output had no detector of its own: the `Tests: N, ...`
 * trailer matched the Jest detector's `Tests:\s+\d+` probe, so a PHPUnit run was compacted
 * with the Jest rules (keep only `FAIL`/`●`/`Expected:` lines plus severity words), which
 * dropped every `N) Class::method` heading, the custom assertion messages, the expected/actual
 * diff bodies and the test file locations.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { processRtkText } from "../../../open-sse/services/compression/engines/rtk/index.ts";
import { detectCommandType } from "../../../open-sse/services/compression/engines/rtk/commandDetector.ts";
import {
  loadRtkFilters,
  matchRtkFilter,
} from "../../../open-sse/services/compression/engines/rtk/filterLoader.ts";
import { runRtkFilterTests } from "../../../open-sse/services/compression/engines/rtk/verify.ts";

const BUILTIN_ONLY = { customFiltersEnabled: false } as const;

/** tests/end-to-end/generic/default.phpt */
const PASSING_RUN = [
  "PHPUnit 10.5.36 by Sebastian Bergmann and contributors.",
  "",
  "Runtime:       PHP 8.3.12",
  "Configuration: /app/phpunit.xml",
  "",
  "...                                                                 3 / 3 (100%)",
  "",
  "Time: 00:00.012, Memory: 8.00 MB",
  "",
  "OK (3 tests, 3 assertions)",
].join("\n");

/** tests/end-to-end/cli/failure-reverse-list.phpt (first three failure blocks). */
const FAILING_RUN = [
  "PHPUnit 10.5.36 by Sebastian Bergmann and contributors.",
  "",
  "Runtime:       PHP 8.3.12",
  "Configuration: /app/phpunit.xml",
  "",
  "...............................................................  63 / 120 ( 52%)",
  "........................................................FF.F   120 / 120 (100%)",
  "",
  "Time: 00:00.087, Memory: 10.00 MB",
  "",
  "There were 3 failures:",
  "",
  "1) Tests\\Unit\\FailureTest::testAssertStringMatchesFormatFile",
  "Failed asserting that string matches format description.",
  "--- Expected",
  "+++ Actual",
  "@@ @@",
  "-FOO",
  "+...BAR...",
  "",
  "/app/tests/Unit/FailureTest.php:31",
  "",
  "2) Tests\\Unit\\FailureTest::testAssertFloatSameFloat",
  "message",
  "Failed asserting that 1.5 is identical to 1.0.",
  "",
  "/app/tests/Unit/FailureTest.php:38",
  "",
  "3) Tests\\Unit\\FailureTest::testAssertTextSameText",
  "message",
  "Failed asserting that two strings are identical.",
  "--- Expected",
  "+++ Actual",
  "@@ @@",
  "-'foo'",
  "+'bar'",
  "",
  "/app/tests/Unit/FailureTest.php:52",
  "",
  "FAILURES!",
  "Tests: 120, Assertions: 214, Failures: 3.",
].join("\n");

/** tests/end-to-end/generic/exception-stack.phpt (second error block) + a vendor frame. */
const ERRORING_RUN = [
  "PHPUnit 10.5.36 by Sebastian Bergmann and contributors.",
  "",
  "Runtime:       PHP 8.3.12",
  "",
  "E.                                                                  2 / 2 (100%)",
  "",
  "Time: 00:00.009, Memory: 8.00 MB",
  "",
  "There was 1 error:",
  "",
  "1) Tests\\Unit\\ExceptionStackTest::testNestedExceptions",
  "Exception: One",
  "",
  "/app/tests/Unit/ExceptionStackTest.php:41",
  "/app/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:183",
  "",
  "Caused by",
  "InvalidArgumentException: Two",
  "",
  "/app/tests/Unit/ExceptionStackTest.php:36",
  "",
  "ERRORS!",
  "Tests: 2, Assertions: 1, Errors: 1.",
].join("\n");

/** tests/end-to-end/regression/5258.phpt */
const SKIPPED_RUN = [
  "PHPUnit 10.5.36 by Sebastian Bergmann and contributors.",
  "",
  "Runtime:       PHP 8.3.12",
  "",
  ".S                                                                  2 / 2 (100%)",
  "",
  "Time: 00:00.010, Memory: 8.00 MB",
  "",
  "OK, but some tests were skipped!",
  "Tests: 2, Assertions: 1, Skipped: 1.",
].join("\n");

/** `--colors=always`: PHPUnit wraps the result line and each progress glyph in SGR codes. */
const COLORED_PASSING_RUN = [
  "PHPUnit 10.5.36 by Sebastian Bergmann and contributors.",
  "",
  "Runtime:       PHP 8.3.12",
  "",
  ".                                                                   1 / 1 (100%)",
  "",
  "Time: 00:00.004, Memory: 8.00 MB",
  "",
  "\u001b[30;42mOK (1 test, 1 assertion)\u001b[0m",
].join("\n");

function compress(text: string, command: string | null): string {
  return processRtkText(text, { command, config: BUILTIN_ONLY }).text;
}

describe("RTK PHPUnit filter", () => {
  it("ships a builtin test-phpunit filter in the test category", () => {
    const filter = loadRtkFilters({ refresh: true, ...BUILTIN_ONLY }).find(
      (candidate) => candidate.id === "test-phpunit"
    );
    assert.ok(filter, "expected builtin filter test-phpunit");
    assert.equal(filter.category, "test");
    assert.deepEqual(filter.commandTypes, ["test-phpunit"]);
  });

  it("detects PHPUnit output by command and by content alone", () => {
    for (const command of [
      "phpunit",
      "vendor/bin/phpunit",
      "./vendor/bin/phpunit --colors=always",
      "php vendor/bin/phpunit tests/Unit",
      "php artisan test",
      "composer test",
      "cd app && vendor/bin/phpunit --filter FailureTest",
    ]) {
      assert.equal(detectCommandType(FAILING_RUN, command).type, "test-phpunit", command);
    }
    for (const sample of [PASSING_RUN, FAILING_RUN, ERRORING_RUN, SKIPPED_RUN]) {
      assert.equal(detectCommandType(sample).type, "test-phpunit");
    }
    // The bare trailer is what used to be claimed by the Jest detector.
    assert.equal(detectCommandType("Tests: 2, Assertions: 4, Failures: 1.").type, "test-phpunit");
  });

  it("routes PHPUnit output to the test-phpunit filter, not Jest or build-output", () => {
    for (const [sample, command] of [
      [FAILING_RUN, "vendor/bin/phpunit"],
      [FAILING_RUN, null],
      [ERRORING_RUN, null],
      [PASSING_RUN, "./vendor/bin/phpunit"],
    ] as const) {
      assert.equal(matchRtkFilter(sample, command, BUILTIN_ONLY)?.id, "test-phpunit");
    }
  });

  it("does not claim Jest output, whose trailer also starts with Tests:", () => {
    const jest = [
      "PASS src/a.test.ts",
      "FAIL src/b.test.ts",
      "  ● b › works",
      "Test Suites: 1 failed, 1 passed, 2 total",
      "Tests:       1 failed, 3 passed, 4 total",
    ].join("\n");
    assert.equal(detectCommandType(jest, "npx jest").type, "test-jest");
    assert.equal(detectCommandType(jest).type, "test-jest");
    assert.equal(matchRtkFilter(jest, "npx jest", BUILTIN_ONLY)?.id, "test-jest");
  });

  it("collapses a passing run to the OK line", () => {
    assert.equal(compress(PASSING_RUN, "vendor/bin/phpunit"), "OK (3 tests, 3 assertions)");
  });

  it("strips ANSI colors before matching (--colors=always)", () => {
    assert.equal(
      compress(COLORED_PASSING_RUN, "vendor/bin/phpunit --colors=always"),
      "OK (1 test, 1 assertion)"
    );
  });

  it("keeps the skipped-run summary and its counts", () => {
    assert.equal(
      compress(SKIPPED_RUN, "vendor/bin/phpunit"),
      "OK, but some tests were skipped!\nTests: 2, Assertions: 1, Skipped: 1."
    );
  });

  it("keeps every failure heading, message, diff and location; drops progress noise", () => {
    const out = compress(FAILING_RUN, "vendor/bin/phpunit");

    assert.ok(out.includes("There were 3 failures:"));
    for (const heading of [
      "1) Tests\\Unit\\FailureTest::testAssertStringMatchesFormatFile",
      "2) Tests\\Unit\\FailureTest::testAssertFloatSameFloat",
      "3) Tests\\Unit\\FailureTest::testAssertTextSameText",
    ]) {
      assert.ok(out.includes(heading), `missing heading ${heading}`);
    }
    assert.ok(out.includes("Failed asserting that string matches format description."));
    assert.ok(out.includes("Failed asserting that 1.5 is identical to 1.0."));
    assert.ok(out.includes("Failed asserting that two strings are identical."));
    assert.ok(out.includes("-'foo'\n+'bar'"), "diff body must survive");
    assert.ok(out.includes("/app/tests/Unit/FailureTest.php:52"));
    assert.ok(out.includes("FAILURES!\nTests: 120, Assertions: 214, Failures: 3."));

    assert.ok(!out.includes("Sebastian Bergmann"), "banner must be dropped");
    assert.ok(!out.includes("Runtime:"));
    assert.ok(!out.includes("Configuration:"));
    assert.ok(!out.includes("Time: 00:00.087"));
    assert.ok(!out.includes("( 52%)"), "dot-progress lines must be dropped");
    assert.ok(!out.includes("(100%)"), "dot-progress lines must be dropped");
    assert.ok(out.length < FAILING_RUN.length);
  });

  it("keeps errors, chained causes and project frames; drops vendor frames", () => {
    const out = compress(ERRORING_RUN, "vendor/bin/phpunit");

    assert.ok(out.includes("There was 1 error:"));
    assert.ok(out.includes("1) Tests\\Unit\\ExceptionStackTest::testNestedExceptions"));
    assert.ok(out.includes("Exception: One"));
    assert.ok(out.includes("Caused by\nInvalidArgumentException: Two"));
    assert.ok(out.includes("/app/tests/Unit/ExceptionStackTest.php:41"));
    assert.ok(out.includes("ERRORS!\nTests: 2, Assertions: 1, Errors: 1."));
    assert.ok(!out.includes("/app/vendor/laravel/"), "vendor frames must be dropped");
    assert.ok(!out.includes("(100%)"));
  });

  it("never grows the output", () => {
    for (const sample of [PASSING_RUN, FAILING_RUN, ERRORING_RUN, SKIPPED_RUN]) {
      assert.ok(compress(sample, "vendor/bin/phpunit").length <= sample.length);
    }
  });

  it("passes its own inline filter tests", () => {
    const outcomes = runRtkFilterTests({ customFiltersEnabled: false }).outcomes.filter(
      (outcome) => outcome.filterId === "test-phpunit"
    );
    assert.ok(outcomes.length >= 2, "expected inline tests for test-phpunit");
    assert.deepEqual(
      outcomes.filter((outcome) => !outcome.passed),
      []
    );
  });
});
