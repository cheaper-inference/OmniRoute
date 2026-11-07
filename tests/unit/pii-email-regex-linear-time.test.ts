import test from "node:test";
import assert from "node:assert/strict";

import { processPII } from "../../src/shared/utils/inputSanitizer.ts";

// The request-side email rule used to be quadratic on runs of local-part characters
// with many word boundaries: 4x the input cost about 16x the time. Assert how the
// cost scales instead of a wall-clock limit, so a slow runner does not fail it. Time is
// process CPU time, not wall time, so a busy runner that preempts the test does not
// skew the ratio, and each size keeps its fastest of 7 interleaved runs. The 0.5 ms
// floor keeps timer noise on a fast linear scan from inflating the ratio.
const SMALL = 10_000;
const LARGE = 40_000;
const MAX_RATIO = 8;
const FLOOR_MS = 0.5;

const SHAPES: Record<string, (n: number) => string> = {
  "ab-ab-": (n) => "ab-".repeat(n / 3 + 1).slice(0, n),
  "a.a.a.": (n) => "a.".repeat(n / 2),
  "x@a.a.": (n) => ("x@" + "a.".repeat(n / 2)).slice(0, n),
  "a.a.@x": (n) => "a.".repeat(n / 2 - 1) + "@x",
  "-----": (n) => "-".repeat(n),
  "_-_-_-": (n) => "_-".repeat(n / 2),
  "%a%a%a": (n) => "%a".repeat(n / 2),
  "a+a+a+": (n) => "a+".repeat(n / 2),
  "1.1.1.": (n) => "1.".repeat(n / 2),
  "A.A.A.": (n) => "A.".repeat(n / 2),
};

function cpuMs(text: string): number {
  const start = process.cpuUsage();
  processPII(text, false);
  const used = process.cpuUsage(start);
  return (used.user + used.system) / 1000;
}

function scalingRatio(small: string, large: string): number {
  let bestSmall = Infinity;
  let bestLarge = Infinity;
  for (let i = 0; i < 7; i++) {
    bestSmall = Math.min(bestSmall, cpuMs(small));
    bestLarge = Math.min(bestLarge, cpuMs(large));
  }
  return bestLarge / Math.max(bestSmall, FLOOR_MS);
}

// Each shape ends in "@" so that a prefilter that skips the email rule on text without
// "@" cannot make these checks pass without running the pattern.
const withAt = (make: (n: number) => string) => (n: number) => make(n - 1) + "@";

for (const [label, make] of Object.entries(SHAPES)) {
  test(`request PII scan grows linearly on "${label}" input`, () => {
    const small = withAt(make)(SMALL);
    const large = withAt(make)(LARGE);
    processPII(small, false);
    const ratio = scalingRatio(small, large);
    assert.ok(ratio < MAX_RATIO, `40k/10k CPU time ratio ${ratio.toFixed(1)} (linear is about 4)`);
  });
}

const redact = (text: string) => processPII(text, true, { enabledTypes: new Set(["email"]) });

// Expected output of the previous pattern for each input.
const SAMPLES: Array<[string, string, number]> = [
  ["mail john.doe@example.com now", "mail [EMAIL_REDACTED] now", 1],
  ["first.last+tag@sub.domain.co.uk", "[EMAIL_REDACTED]", 1],
  ["<ALICE@EXAMPLE.COM>", "<[EMAIL_REDACTED]>", 1],
  ["a@b.co and c-d@e.io", "[EMAIL_REDACTED] and [EMAIL_REDACTED]", 2],
  ["foo@bar and foo@bar.c stay", "foo@bar and foo@bar.c stay", 0],
  ["id a@b.com1 stays", "id a@b.com1 stays", 0],
  [".abc@x.com", ".[EMAIL_REDACTED]", 1],
  ["see -john@example.com", "see -[EMAIL_REDACTED]", 1],
  ["%_a@b.co", "%[EMAIL_REDACTED]", 1],
  ["..x@c.dd", "..[EMAIL_REDACTED]", 1],
  [`${"-".repeat(65)}x@c.dd`, `${"-".repeat(65)}[EMAIL_REDACTED]`, 1],
  ["a@b.co-x@c.dd", "[EMAIL_REDACTED][EMAIL_REDACTED]", 2],
  ["mail a@b.co%x@c.dd now", "mail [EMAIL_REDACTED][EMAIL_REDACTED] now", 2],
  ["ab--cd@e.fg", "[EMAIL_REDACTED]", 1],
  [`${"l".repeat(90)}@example.com`, "[EMAIL_REDACTED]", 1],
  [`${"a.".repeat(60)}b@example.com`, "[EMAIL_REDACTED]", 1],
  // A newline or tab before an address is a delimiter.
  ["line one\na@b.co", "line one\n[EMAIL_REDACTED]", 1],
  ["\ta@b.co\r\nc@d.io", "\t[EMAIL_REDACTED]\r\n[EMAIL_REDACTED]", 2],
  // Letters that only case-fold to ASCII (U+017F long s, U+212A Kelvin sign) do not match.
  ["\u017f@b.co \u212a@b.co", "\u017f@b.co \u212a@b.co", 0],
  // Other characters outside [A-Za-z0-9._%+-] are delimiters too: non-ASCII letters,
  // Unicode spaces, NUL, CR, VT and FF, "|", and an emoji (a surrogate pair).
  ["邮箱a@b.co", "邮箱[EMAIL_REDACTED]", 1],
  ["\u00a0a@b.co\u3000c@d.io", "\u00a0[EMAIL_REDACTED]\u3000[EMAIL_REDACTED]", 2],
  ["\u200ba@b.co", "\u200b[EMAIL_REDACTED]", 1],
  ["\u{1f600}a@b.co", "\u{1f600}[EMAIL_REDACTED]", 1],
  ["\u0000a@b.co", "\u0000[EMAIL_REDACTED]", 1],
  ["x\ra@b.co", "x\r[EMAIL_REDACTED]", 1],
  ["\va@b.co\fc@d.io", "\v[EMAIL_REDACTED]\f[EMAIL_REDACTED]", 2],
  ["x|a@b.co", "x|[EMAIL_REDACTED]", 1],
  // A second address glued on with each of [.%+-], after an upper- or lowercase letter.
  ["a@b.co.x@c.dd", "[EMAIL_REDACTED][EMAIL_REDACTED]", 2],
  ["a@b.co+x@c.dd", "[EMAIL_REDACTED][EMAIL_REDACTED]", 2],
  ["A@B.CO-x@c.dd", "[EMAIL_REDACTED][EMAIL_REDACTED]", 2],
  ["Z@B.CO%y@c.dd", "[EMAIL_REDACTED][EMAIL_REDACTED]", 2],
  ["A@B.CO.x@c.dd", "[EMAIL_REDACTED][EMAIL_REDACTED]", 2],
  ["A@B.CO+x@c.dd", "[EMAIL_REDACTED][EMAIL_REDACTED]", 2],
  // The glued local part may hold digits and "_"; "|" before the separator is not a letter.
  ["a@b.co.1x@c.dd", "[EMAIL_REDACTED][EMAIL_REDACTED]", 2],
  ["a@b.co-_x@c.dd", "[EMAIL_REDACTED][EMAIL_REDACTED]", 2],
  ["a@b.c|.x@c.dd", "a@b.c|.[EMAIL_REDACTED]", 1],
  // A glued second address whose local part is only the separator.
  ["a@b.co.@a.ax@c.dd", "[EMAIL_REDACTED][EMAIL_REDACTED]@c.dd", 2],
  // The glued local part may be 64 characters after its separator.
  [`a@b.co-${"x".repeat(64)}@c.dd`, "[EMAIL_REDACTED][EMAIL_REDACTED]", 2],
];

// Known difference from the previous pattern: past the bound, the glued address is not
// redacted, and an address glued after it can absorb its domain.
const PAST_BOUND: Array<[string, string, number]> = [
  [`a@b.co-${"x".repeat(65)}@c.dd`, `[EMAIL_REDACTED]-${"x".repeat(65)}@c.dd`, 1],
  [
    `a@b.co-${"x".repeat(70)}@c.dd-yy@e.ff`,
    `[EMAIL_REDACTED]-${"x".repeat(70)}@[EMAIL_REDACTED]`,
    2,
  ],
];

function assertRedacts(cases: Array<[string, string, number]>) {
  for (const [input, expected, count] of cases) {
    const result = redact(input);
    assert.equal(result.text, expected, input.slice(0, 40));
    assert.deepEqual(
      result.detections,
      count ? [{ type: "email", count }] : [],
      `count: ${input.slice(0, 40)}`
    );
  }
}

test("request email redaction matches the same text as before", () => {
  assertRedacts(SAMPLES);
});

test("a glued address past the 64-character bound is not redacted", () => {
  assertRedacts(PAST_BOUND);
});
