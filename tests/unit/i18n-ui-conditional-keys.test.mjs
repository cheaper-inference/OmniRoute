import assert from "node:assert/strict";
import test from "node:test";
import { auditNewUiReferences } from "../../scripts/i18n/lib/translationReferences.mjs";

const FILE = "src/shared/components/RequestLoggerDetail.tsx";
const messages = { transportError: "Transport error", noHttpResponse: "No HTTP response" };
const expression =
  'classifyHttpLog(log) === "transport_error" ? "transportError" : "noHttpResponse"';

function source(key, values = "") {
  return `import { useTranslations } from "next-intl";
    export function Detail({ log }) {
      const t = useTranslations("requestLogger");
      return t(${key}${values ? ", " + values : ""});
    }`;
}

function inspect(key, { catalog = messages, before = null, values = "", limits = {} } = {}) {
  return auditNewUiReferences({
    comparison: { kind: "snapshot", base: "a".repeat(40), candidate: "b".repeat(40) },
    changes: [{ status: before === null ? "A" : "M", path: FILE }],
    baseFiles: before === null ? {} : { [FILE]: source(before, values) },
    headFiles: { [FILE]: source(key, values) },
    baseEn: { requestLogger: messages },
    headEn: { requestLogger: catalog },
    limits,
  });
}

test("conditional keys: the two literal RequestLoggerDetail outcomes are checked", () => {
  const result = inspect(expression);
  assert.equal(result.status, "PASS");
  assert.deepEqual(result.incomplete, []);
  assert.deepEqual(
    result.newReferences.map((row) => row.key),
    ["requestLogger.transportError", "requestLogger.noHttpResponse"]
  );
  assert.equal(result.statistics.referencesObserved, 2);
});

test("conditional keys: a missing false branch remains a failure", () => {
  const result = inspect(expression, { catalog: { transportError: "Transport error" } });
  assert.equal(result.status, "FAIL");
  assert.deepEqual(result.incomplete, []);
  assert.deepEqual(
    result.violations.map((row) => [row.key, row.reason]),
    [["requestLogger.noHttpResponse", "MISSING_EN_MESSAGE"]]
  );
});

test("conditional keys: a missing true branch remains a failure", () => {
  const result = inspect(expression, { catalog: { noHttpResponse: "No HTTP response" } });
  assert.equal(result.status, "FAIL");
  assert.deepEqual(
    result.violations.map((row) => row.key),
    ["requestLogger.transportError"]
  );
});

test("conditional keys: nested literal branches and parentheses preserve every outcome", () => {
  const result = inspect('(first ? "transportError" : (second ? "noHttpResponse" : `done`))', {
    catalog: { ...messages, done: "Done" },
  });
  assert.equal(result.status, "PASS");
  assert.deepEqual(
    result.newReferences.map((row) => row.key),
    ["requestLogger.transportError", "requestLogger.noHttpResponse", "requestLogger.done"]
  );
});

test("conditional keys: one unknown outcome keeps the whole call incomplete", () => {
  const result = inspect('ready ? "transportError" : log.messageKey');
  assert.equal(result.status, "INCOMPLETE");
  assert.deepEqual(
    result.incomplete.map((row) => row.reason),
    ["DYNAMIC_KEY"]
  );
  assert.deepEqual(result.newReferences, []);
});

test("conditional keys: ICU arguments are required for each possible message", () => {
  const result = inspect(expression, {
    catalog: { transportError: "Error {code}", noHttpResponse: "No response after {seconds}" },
    values: "{ code: 500 }",
  });
  assert.equal(result.status, "FAIL");
  assert.deepEqual(
    result.violations.map((row) => [row.key, row.reason, row.missingParameters]),
    [["requestLogger.noHttpResponse", "MISSING_ICU_ARGUMENTS", ["seconds"]]]
  );
});

test("conditional keys: a newly introduced outcome cannot cancel against the old branch", () => {
  const result = inspect('ready ? "transportError" : "newMissing"', { before: expression });
  assert.equal(result.status, "FAIL");
  assert.deepEqual(
    result.newReferences.map((row) => row.key),
    ["requestLogger.newMissing"]
  );
});

test("conditional keys: duplicate outcomes need one message", () => {
  const result = inspect('ready ? "transportError" : "transportError"');
  assert.equal(result.status, "PASS");
  assert.deepEqual(
    result.newReferences.map((row) => row.key),
    ["requestLogger.transportError"]
  );
  assert.equal(result.statistics.referencesObserved, 1);
});

test("conditional keys: every distinct outcome consumes the reference budget", () => {
  const result = inspect(expression, { limits: { maxReferences: 1 } });
  assert.equal(result.status, "INCOMPLETE");
  assert.deepEqual(
    result.incomplete.map((row) => row.reason),
    ["ANALYSIS_WORK_LIMIT"]
  );
});

test("conditional keys: nested expansion is bounded by the existing analysis depth", () => {
  let key = '"noHttpResponse"';
  for (let i = 0; i < 20; i++) key = `ready ? "transportError" : (${key})`;
  const result = inspect(key);
  assert.equal(result.status, "INCOMPLETE");
  assert.deepEqual(
    result.incomplete.map((row) => row.reason),
    ["ANALYSIS_DEPTH_LIMIT"]
  );
});
