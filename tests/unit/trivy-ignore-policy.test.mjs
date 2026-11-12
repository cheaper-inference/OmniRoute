import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  parseTrivyIgnorePolicy,
  validateTrivyIgnorePolicy,
} from "../../scripts/check/check-trivy-ignore-policy.mjs";

const beforeExpiry = Date.parse("2026-12-01T23:59:59.999Z");
const expiry = Date.parse("2026-12-02T00:00:00Z");
const cli = fileURLToPath(
  new URL("../../scripts/check/check-trivy-ignore-policy.mjs", import.meta.url)
);

function fixture() {
  return {
    vulnerabilities: [
      {
        id: "CVE-2026-118764",
        paths: ["usr/local/lib/node_modules/npm/node_modules/minimatch/package.json"],
        expired_at: "2026-12-02T00:00:00Z",
        statement:
          "Accepted until review: https://github.com/cheaper-inference/OmniRoute/issues/18765",
      },
      {
        id: "CVE-2026-118773",
        paths: ["usr/local/lib/node_modules/npm/node_modules/glob/package.json"],
        expired_at: "2026-12-02T00:00:00Z",
        statement:
          "Accepted until review: https://github.com/cheaper-inference/OmniRoute/issues/18765",
      },
    ],
  };
}

test("the exact reviewed policy is valid before its UTC deadline", () => {
  assert.deepEqual(validateTrivyIgnorePolicy(fixture(), { now: beforeExpiry }), {
    exceptions: 2,
    expiresAt: "2026-12-02T00:00:00Z",
  });
});

test("expiry blocks configuration at the deadline and afterward regardless of CVE severity", () => {
  for (const now of [expiry, expiry + 1, Date.parse("2027-01-01T00:00:00Z")]) {
    assert.throws(() => validateTrivyIgnorePolicy(fixture(), { now }), /policy has expired/);
  }
});

test("missing and invalid dates cannot disable expiry validation", () => {
  for (const value of [
    undefined,
    "not-a-date",
    "2026-02-30T00:00:00Z",
    "2026-12-02",
    "2026-12-02T01:00:00+01:00",
  ]) {
    const policy = fixture();
    policy.vulnerabilities[0].expired_at = value;
    assert.throws(
      () => validateTrivyIgnorePolicy(policy, { now: beforeExpiry }),
      /expiry|calendar date/
    );
  }
});

test("a different future date cannot silently extend the reviewed deadline", () => {
  const policy = fixture();
  policy.vulnerabilities[0].expired_at = "2027-12-02T00:00:00Z";
  assert.throws(() => validateTrivyIgnorePolicy(policy, { now: beforeExpiry }), /reviewed expiry/);
});

test("another target or a wildcard cannot broaden the accepted package path", () => {
  for (const candidate of [
    "app/node_modules/glob/package.json",
    "**/glob/package.json",
    "/usr/local/lib/node_modules/npm/node_modules/glob/package.json",
  ]) {
    const policy = fixture();
    policy.vulnerabilities[1].paths = [candidate];
    assert.throws(
      () => validateTrivyIgnorePolicy(policy, { now: beforeExpiry }),
      /exact observed npm package path/
    );
  }
});

test("extra paths and advisory IDs cannot grow the accepted-risk scope", () => {
  const extraPath = fixture();
  extraPath.vulnerabilities[1].paths.push("app/node_modules/glob/package.json");
  assert.throws(
    () => validateTrivyIgnorePolicy(extraPath, { now: beforeExpiry }),
    /exact observed npm package path/
  );
  const unknown = fixture();
  unknown.vulnerabilities[1].id = "CVE-2026-999999";
  assert.throws(
    () => validateTrivyIgnorePolicy(unknown, { now: beforeExpiry }),
    /unreviewed vulnerability ID/
  );
});

test("retiring one or both reviewed exceptions is valid and empty policies never expire", () => {
  for (const count of [0, 1]) {
    const policy = fixture();
    policy.vulnerabilities = policy.vulnerabilities.slice(0, count);
    assert.deepEqual(validateTrivyIgnorePolicy(policy, { now: beforeExpiry }), {
      exceptions: count,
      expiresAt: count ? "2026-12-02T00:00:00Z" : null,
    });
  }
  assert.deepEqual(validateTrivyIgnorePolicy({ vulnerabilities: [] }, { now: expiry }), {
    exceptions: 0,
    expiresAt: null,
  });
  const remaining = fixture();
  remaining.vulnerabilities.pop();
  assert.throws(() => validateTrivyIgnorePolicy(remaining, { now: expiry }), /policy has expired/);
});

test("duplicate entries and additions beyond the reviewed upper bound are invalid", () => {
  const duplicate = fixture();
  duplicate.vulnerabilities[1] = structuredClone(duplicate.vulnerabilities[0]);
  assert.throws(
    () => validateTrivyIgnorePolicy(duplicate, { now: beforeExpiry }),
    /Duplicate vulnerability/
  );
  const extra = fixture();
  extra.vulnerabilities.push(structuredClone(extra.vulnerabilities[0]));
  assert.throws(() => validateTrivyIgnorePolicy(extra, { now: beforeExpiry }), /At most two/);
});

test("unknown scanner scopes, entry fields and missing tracking are rejected", () => {
  const extraScope = { ...fixture(), secrets: [] };
  assert.throws(
    () => validateTrivyIgnorePolicy(extraScope, { now: beforeExpiry }),
    /Only vulnerability/
  );
  const extraField = fixture();
  extraField.vulnerabilities[0].purls = ["pkg:npm/minimatch@10.2.5"];
  assert.throws(
    () => validateTrivyIgnorePolicy(extraField, { now: beforeExpiry }),
    /statement only/
  );
  const noTracking = fixture();
  noTracking.vulnerabilities[0].statement = "Accepted risk";
  assert.throws(
    () => validateTrivyIgnorePolicy(noTracking, { now: beforeExpiry }),
    /tracking issue/
  );
});

test("an invalid clock fails closed", () => {
  for (const now of [NaN, Infinity, -Infinity, "2026-11-03"]) {
    assert.throws(() => validateTrivyIgnorePolicy(fixture(), { now }), /finite timestamp/);
  }
});

test("the JSON-formatted YAML parser accepts nested strings and rejects malformed input", () => {
  const policy = fixture();
  policy.vulnerabilities[0].statement += ' value: { "quoted", [brackets] }';
  assert.deepEqual(parseTrivyIgnorePolicy(JSON.stringify(policy)), policy);
  for (const source of ["{", "vulnerabilities: []", "x".repeat(65537)]) {
    assert.throws(() => parseTrivyIgnorePolicy(source), /JSON|64 KiB/);
  }
});

test("duplicate JSON keys are rejected before the YAML scanner sees them", () => {
  for (const source of [
    '{"vulnerabilities":[],"vulnerabilities":[]}',
    '{"vulnerabilities":[{"id":"first","id":"second"}]}',
    '{"vulnerabilities":[{"id":"first","\\u0069d":"second"}]}',
  ]) {
    assert.throws(() => parseTrivyIgnorePolicy(source), /Duplicate policy keys/);
  }
});

test("the CLI blocks an invalid policy without a network request or dependency install", (t) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "trivy-policy-"));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const file = path.join(dir, "invalid-policy.yaml");
  fs.writeFileSync(file, "{}");
  const child = spawnSync(process.execPath, [cli, file], {
    cwd: dir,
    env: { PATH: path.dirname(process.execPath), TZ: "UTC" },
    encoding: "utf8",
    timeout: 5000,
    maxBuffer: 65536,
  });
  assert.equal(child.error, undefined);
  assert.equal(child.signal, null);
  assert.equal(child.status, 1);
  assert.match(child.stderr, /Trivy exception configuration failed: Only vulnerability/);
  assert.equal(child.stdout, "");
});

test("the CLI blocks the reviewed policy when its real clock reaches expiry", (t) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "trivy-policy-expiry-"));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const file = path.join(dir, "reviewed-policy.yaml");
  const clock = path.join(dir, "test-clock.mjs");
  fs.writeFileSync(file, JSON.stringify(fixture()));
  // Only the isolated test child gets a controlled clock. The production CLI has
  // no clock argument or environment override that could prolong accepted risk.
  fs.writeFileSync(clock, `Date.now = () => ${expiry};\n`);
  const child = spawnSync(process.execPath, ["--import", clock, cli, file], {
    cwd: dir,
    env: { PATH: path.dirname(process.execPath), TZ: "UTC" },
    encoding: "utf8",
    timeout: 5000,
    maxBuffer: 65536,
  });
  assert.equal(child.error, undefined);
  assert.equal(child.signal, null);
  assert.equal(child.status, 1);
  assert.match(child.stderr, /accepted-risk policy has expired/);
  assert.equal(child.stdout, "");
});

test("tracking attribution requires the exact issue URL, not a substring in another URL", () => {
  const issue = "https://github.com/cheaper-inference/OmniRoute/issues/18765";
  for (const reference of [
    `${issue}0`,
    `${issue}/unrelated`,
    `${issue}?redirect=elsewhere`,
    `https://example.invalid/?next=${issue}`,
    `prefix${issue}`,
  ]) {
    const policy = fixture();
    policy.vulnerabilities[0].statement = `Accepted: ${reference}`;
    assert.throws(
      () => validateTrivyIgnorePolicy(policy, { now: beforeExpiry }),
      /tracking issue/,
      reference
    );
  }
  for (const reference of [issue, `<${issue}>`, `[review](${issue})`, `${issue}.`]) {
    const policy = fixture();
    policy.vulnerabilities[0].statement = `Accepted: ${reference}`;
    assert.equal(validateTrivyIgnorePolicy(policy, { now: beforeExpiry }).exceptions, 2);
  }
});
