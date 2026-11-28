/**
 * The exemption reader decides whether check-openapi-security-tiers sees the
 * runtime's GET exemptions at all. Every case below is a way the previous
 * regex-based reader silently produced a plausible-but-wrong set, so each one
 * is a regression test for a demonstrated failure mode, not a style example.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { readStringEntries } = await import("../../scripts/check/lib/parseStringEntries.mjs");

const multiLine = `
export const LOCAL_ONLY_API_GET_EXEMPTIONS: ReadonlySet<string> = new Set([
  "/api/system/version",
  // the read-only version-manager routes only report state
  "/api/version-manager/status",
  '/api/tunnels/cloudflared',
]);

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
`;

test("reads multi-line entries, skipping comments and accepting both quote styles", () => {
  const entries = readStringEntries(multiLine, "LOCAL_ONLY_API_GET_EXEMPTIONS");
  assert.deepEqual(entries, [
    "/api/system/version",
    "/api/version-manager/status",
    "/api/tunnels/cloudflared",
  ]);
});

test("reads a single-line set", () => {
  assert.deepEqual(readStringEntries(multiLine, "SAFE_METHODS"), ["GET", "HEAD", "OPTIONS"]);
});

test("a generic type argument does not make the reader latch onto the next set", () => {
  const src = multiLine.replace("= new Set([", "= new Set<string>([");
  const entries = readStringEntries(src, "LOCAL_ONLY_API_GET_EXEMPTIONS");
  assert.deepEqual(entries, [
    "/api/system/version",
    "/api/version-manager/status",
    "/api/tunnels/cloudflared",
  ]);
  assert.ok(!entries.includes("GET"), "must not read SAFE_METHODS instead");
});

test("a closing bracket quoted inside a comment does not truncate the body", () => {
  const src = multiLine.replace(
    '  "/api/system/version",',
    '  "/api/system/version",\n  // this block used to end with ]) here'
  );
  assert.equal(readStringEntries(src, "LOCAL_ONLY_API_GET_EXEMPTIONS").length, 3);
});

test("a path quoted inside a comment does not become an entry", () => {
  const src = multiLine.replace(
    '  "/api/system/version",',
    '  "/api/system/version",\n  // "/api/not-really-exempt" is commented out'
  );
  const entries = readStringEntries(src, "LOCAL_ONLY_API_GET_EXEMPTIONS");
  assert.ok(!entries.includes("/api/not-really-exempt"));
  assert.equal(entries.length, 3);
});

test("a missing declaration returns null so the caller can fail closed", () => {
  assert.equal(readStringEntries(multiLine, "NOT_DECLARED"), null);
});

test("an unreadable body line throws instead of silently dropping entries", () => {
  const src = multiLine.replace(
    '  "/api/system/version",',
    '  "/api/system/version",\n  ...LEGACY_EXEMPTIONS,'
  );
  assert.throws(
    () => readStringEntries(src, "LOCAL_ONLY_API_GET_EXEMPTIONS"),
    /unexpected line in LOCAL_ONLY_API_GET_EXEMPTIONS/
  );
});

test("a declaration with no readable entries throws", () => {
  const src = "export const LOCAL_ONLY_API_GET_EXEMPTIONS = new Set([\n]);\n";
  assert.throws(
    () => readStringEntries(src, "LOCAL_ONLY_API_GET_EXEMPTIONS"),
    /parsed to no entries/
  );
});

test("a bracket in the type annotation is not mistaken for the collection opener", () => {
  const arrayTyped =
    'export const LOCAL_ONLY_API_GET_EXEMPTIONS: string[] = [\n  "/api/a",\n  "/api/b",\n];\n';
  assert.deepEqual(readStringEntries(arrayTyped, "LOCAL_ONLY_API_GET_EXEMPTIONS"), [
    "/api/a",
    "/api/b",
  ]);

  const readonlyTyped = 'const SAFE_METHODS: readonly string[] = ["GET", "HEAD"];\n';
  assert.deepEqual(readStringEntries(readonlyTyped, "SAFE_METHODS"), ["GET", "HEAD"]);
});

test("a formatter-wrapped declaration opens on a later line", () => {
  const wrapped =
    'export const LOCAL_ONLY_API_GET_EXEMPTIONS: ReadonlySet<string> =\n  new Set([\n    "/api/a",\n  ]);\n';
  assert.deepEqual(readStringEntries(wrapped, "LOCAL_ONLY_API_GET_EXEMPTIONS"), ["/api/a"]);
});

test("a quoted value in a trailing comment is not collected", () => {
  const withComment = 'const SAFE_METHODS = new Set(["GET", "HEAD"]); // "OPTIONS"\n';
  assert.deepEqual(readStringEntries(withComment, "SAFE_METHODS"), ["GET", "HEAD"]);
});
