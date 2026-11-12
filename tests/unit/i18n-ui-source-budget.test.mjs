import assert from "node:assert/strict";
import test from "node:test";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve, sep } from "node:path";
import {
  auditNewUiReferences,
  DEFAULT_LIMITS,
} from "../../scripts/i18n/lib/translationReferences.mjs";
import {
  inspectNewUiReferences,
  parseChangeInventory,
} from "../../scripts/i18n/check-new-ui-references.mjs";

const comparison = { kind: "snapshot", base: "a".repeat(40), candidate: "b".repeat(40) };
const catalog = { common: { done: "Done" } };
const fileAt = (index) => `src/budget/page-${String(index).padStart(3, "0")}.tsx`;
const reference = (key = "done") =>
  'import { useTranslations } from "next-intl"; export function Page() {' +
  ` const t = useTranslations("common"); return t("${key}"); }`;

function sourceInput(count, { added = false } = {}) {
  const baseFiles = {};
  const headFiles = {};
  const changes = [];
  for (let index = 0; index < count; index++) {
    const file = fileAt(index);
    if (!added) baseFiles[file] = "export const value = 1;";
    headFiles[file] = reference();
    changes.push({ status: added ? "A" : "M", path: file });
  }
  return { comparison, changes, baseFiles, headFiles, baseEn: catalog, headEn: catalog };
}

function incompleteReason(input, reason) {
  const result = auditNewUiReferences(input);
  assert.equal(result.status, "INCOMPLETE");
  assert.deepEqual(
    result.incomplete.map((row) => row.reason),
    [reason]
  );
  assert.deepEqual(result.violations, []);
  return result;
}

test("source budget: a modified path counts once across two revisions", () => {
  const input = sourceInput(1);
  const result = auditNewUiReferences({ ...input, limits: { maxFiles: 1 } });
  assert.equal(result.status, "PASS");
  assert.equal(result.statistics.sourcePaths, 1);
  assert.equal(result.statistics.sourceFiles, 2);
  assert.equal(
    result.statistics.sourceBytes,
    Buffer.byteLength(input.baseFiles[fileAt(0)]) + Buffer.byteLength(input.headFiles[fileAt(0)])
  );
  assert.equal(DEFAULT_LIMITS.maxFiles, 128);
  assert.equal(DEFAULT_LIMITS.maxFileBytes, 1024 * 1024);
  assert.equal(DEFAULT_LIMITS.maxTotalBytes, 8 * 1024 * 1024);
  assert.equal(DEFAULT_LIMITS.maxNodes, 500000);
  assert.equal(DEFAULT_LIMITS.maxMilliseconds, 15000);
});

test("source budget: 128 modified paths preserve all 256 source snapshots", () => {
  const result = auditNewUiReferences(sourceInput(128));
  assert.equal(result.status, "PASS");
  assert.equal(result.statistics.sourcePaths, 128);
  assert.equal(result.statistics.sourceFiles, 256);
  assert.equal(Object.keys(result.sourceHashes.baseFiles).length, 128);
  assert.equal(Object.keys(result.sourceHashes.headFiles).length, 128);
  assert.equal(result.newReferences.length, 128);
  assert.equal(new Set(result.newReferences.map((row) => row.file)).size, 128);
});

test("source budget: the 129th distinct path remains incomplete", () => {
  incompleteReason(sourceInput(129, { added: true }), "SOURCE_FILE_LIMIT");
});

test("source budget: per-file bytes use UTF-8 and keep the exact boundary", () => {
  const source = 'export const marker = "é";';
  const bytes = Buffer.byteLength(source);
  assert.ok(bytes > source.length);
  const input = sourceInput(1, { added: true });
  input.headFiles[fileAt(0)] = source;
  const exact = auditNewUiReferences({ ...input, limits: { maxFileBytes: bytes } });
  assert.equal(exact.status, "PASS");
  assert.equal(exact.statistics.sourceBytes, bytes);
  incompleteReason({ ...input, limits: { maxFileBytes: bytes - 1 } }, "SOURCE_BYTE_LIMIT");
});

test("source budget: total bytes charge both snapshots even for identical content", () => {
  const input = sourceInput(1);
  const source = 'export const marker = "é";';
  input.baseFiles[fileAt(0)] = source;
  input.headFiles[fileAt(0)] = source;
  const bytes = Buffer.byteLength(source);
  const exact = auditNewUiReferences({
    ...input,
    limits: { maxFiles: 1, maxFileBytes: bytes, maxTotalBytes: 2 * bytes },
  });
  assert.equal(exact.status, "PASS");
  assert.equal(exact.statistics.sourceBytes, 2 * bytes);
  incompleteReason(
    { ...input, limits: { maxFiles: 1, maxFileBytes: bytes, maxTotalBytes: 2 * bytes - 1 } },
    "SOURCE_TOTAL_BYTE_LIMIT"
  );
});

test("source budget: different paths with identical bytes are not deduplicated", () => {
  const input = sourceInput(2, { added: true });
  assert.equal(input.headFiles[fileAt(0)], input.headFiles[fileAt(1)]);
  incompleteReason({ ...input, limits: { maxFiles: 1 } }, "SOURCE_FILE_LIMIT");
});

test("source budget: a rename keeps both paths in the resource scope", () => {
  const before = "src/budget/old.tsx";
  const after = "src/budget/new.tsx";
  const source = reference("inheritedMissing");
  const input = {
    comparison,
    changes: [{ status: "R", previousPath: before, path: after }],
    baseFiles: { [before]: source },
    headFiles: { [after]: source },
    baseEn: {},
    headEn: {},
  };
  incompleteReason({ ...input, limits: { maxFiles: 1 } }, "SOURCE_FILE_LIMIT");
  const result = auditNewUiReferences({ ...input, limits: { maxFiles: 2 } });
  assert.equal(result.status, "PASS");
  assert.equal(result.statistics.sourcePaths, 2);
  assert.equal(result.statistics.sourceFiles, 2);
  assert.equal(result.newReferences.length, 0);
  assert.equal(result.baselineGaps.length, 1);
});

test("source budget: supplied supporting sources share the same path limit", () => {
  const input = sourceInput(1);
  for (const file of ["src/budget/helper.ts", "src/budget/consumer.tsx"]) {
    input.baseFiles[file] = "export const value = 1;";
    input.headFiles[file] = "export const value = 1;";
  }
  incompleteReason({ ...input, limits: { maxFiles: 2 } }, "SOURCE_FILE_LIMIT");
  const result = auditNewUiReferences({ ...input, limits: { maxFiles: 3 } });
  assert.equal(result.status, "PASS");
  assert.equal(result.statistics.sourcePaths, 3);
  assert.equal(result.statistics.sourceFiles, 6);
});

test("source budget: duplicate inventories and array sources remain invalid", () => {
  const input = sourceInput(1);
  incompleteReason(
    { ...input, changes: [input.changes[0], input.changes[0]] },
    "INVALID_CHANGE_INVENTORY"
  );
  incompleteReason(
    { ...input, headFiles: Array(300).fill(input.headFiles) },
    "INVALID_SOURCE_OBJECT"
  );
  assert.throws(
    () => parseChangeInventory(`M\0${fileAt(0)}\0M\0${fileAt(0)}\0`),
    /DUPLICATE_GIT_CHANGE/
  );
});

function snapshotFixture(t, count, { added = false, missingLast = false } = {}) {
  const temporary = resolve(tmpdir());
  assert.ok(!temporary.split(sep).includes("_tasks"), "Git fixtures must not live under _tasks");
  const root = mkdtempSync(join(temporary, "ui-source-budget-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const env = {
    PATH: process.env.PATH || "/usr/bin:/bin",
    HOME: root,
    XDG_CONFIG_HOME: root,
    GIT_CONFIG_NOSYSTEM: "1",
    GIT_CONFIG_GLOBAL: join(root, "absent-global-config"),
    GIT_OPTIONAL_LOCKS: "0",
    GIT_ALLOW_PROTOCOL: "",
    GIT_NO_LAZY_FETCH: "1",
    LANG: "C.UTF-8",
  };
  const git = (...args) =>
    execFileSync("git", args, {
      cwd: root,
      env,
      encoding: "utf8",
      timeout: 5000,
      maxBuffer: 65536,
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  const write = (file, source) => {
    const destination = join(root, file);
    mkdirSync(dirname(destination), { recursive: true });
    writeFileSync(destination, source);
  };
  git("init", "--quiet", "--initial-branch=fixture");
  write("src/i18n/messages/en.json", JSON.stringify(catalog));
  if (!added) {
    for (let index = 0; index < count; index++) write(fileAt(index), "export const value = 1;");
  }
  git("add", "--", "src");
  const base = git("write-tree");
  for (let index = 0; index < count; index++) {
    write(fileAt(index), reference(missingLast && index === count - 1 ? "missingLast" : "done"));
  }
  git("add", "--", "src");
  const candidate = git("write-tree");
  return { cwd: root, env, snapshot: { base, candidate } };
}

function assertCompleteSnapshots(result, paths) {
  assert.equal(result.sourceChangeCount, paths);
  assert.equal(result.statistics.sourcePaths, paths);
  assert.equal(result.statistics.sourceFiles, 2 * paths);
  assert.equal(result.blobReceipts.length, 2 * paths);
  assert.equal(
    new Set(result.blobReceipts.map((row) => `${row.ref}\0${row.path}`)).size,
    2 * paths
  );
  const counts = new Map();
  for (const row of result.blobReceipts) counts.set(row.path, (counts.get(row.path) || 0) + 1);
  assert.equal(counts.size, paths);
  assert.ok([...counts.values()].every((count) => count === 2));
  assert.equal(result.candidateWritten, false);
}

test("source budget adapter: 65 modified paths preserve every source snapshot", (t) => {
  const result = inspectNewUiReferences(snapshotFixture(t, 65));
  assert.equal(result.status, "PASS");
  assertCompleteSnapshots(result, 65);
  assert.equal(result.newReferences.length, 65);
});

test("source budget adapter: the reference after 128 blobs is still checked", (t) => {
  const result = inspectNewUiReferences(snapshotFixture(t, 65, { missingLast: true }));
  assert.equal(result.status, "FAIL");
  assertCompleteSnapshots(result, 65);
  assert.equal(result.newReferences.length, 65);
  assert.deepEqual(
    result.violations.map((row) => ({ file: row.file, key: row.key })),
    [{ file: fileAt(64), key: "common.missingLast" }]
  );
});

test("source budget adapter: the 129th distinct path remains incomplete", (t) => {
  const result = inspectNewUiReferences(snapshotFixture(t, 129, { added: true }));
  assert.equal(result.status, "INCOMPLETE");
  assert.deepEqual(result.incompleteDetails, [{ reason: "SOURCE_READ_LIMIT" }]);
  assert.deepEqual(result.violations, []);
  assert.equal(result.candidateWritten, false);
});
