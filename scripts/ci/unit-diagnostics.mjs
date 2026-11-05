import { relative, resolve, sep } from "node:path";

export const FAILURE_LIMIT = 200;
export const SUMMARY_KEYS = [
  "tests",
  "suites",
  "passed",
  "failed",
  "cancelled",
  "skipped",
  "todo",
  "topLevel",
];
const ERROR_CODES = new Set([
  "ERR_ASSERTION",
  "ERR_TEST_FAILURE",
  "ERR_INVALID_ARG_TYPE",
  "ERR_MODULE_NOT_FOUND",
  "MODULE_NOT_FOUND",
]);
const FAILURE_TYPES = new Set([
  "testCodeFailure",
  "subtestsFailed",
  "cancelledByParent",
  "testTimeoutFailure",
  "testAborted",
  "hookFailed",
  "uncaughtException",
  "unhandledRejection",
]);
const OPERATORS = new Set([
  "strictEqual",
  "notStrictEqual",
  "deepStrictEqual",
  "notDeepStrictEqual",
  "equal",
  "notEqual",
  "deepEqual",
  "notDeepEqual",
  "ok",
  "match",
  "doesNotMatch",
  "throws",
  "doesNotThrow",
  "rejects",
  "doesNotReject",
  "fail",
]);
const INVOCATION =
  /^(?:[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|[0-9]+-[0-9]+-unit-[0-9]+)$/;

function own(value, key) {
  if (!value || typeof value !== "object") return undefined;
  try {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    return descriptor && Object.hasOwn(descriptor, "value") ? descriptor.value : undefined;
  } catch {
    return undefined;
  }
}

export function diagnosticIdentity(environment) {
  return {
    invocationId: INVOCATION.test(environment.OMNIROUTE_UNIT_INVOCATION_ID || "")
      ? environment.OMNIROUTE_UNIT_INVOCATION_ID
      : null,
    checkoutSha: /^[0-9a-f]{40}$/.test(environment.OMNIROUTE_UNIT_CHECKOUT_SHA || "")
      ? environment.OMNIROUTE_UNIT_CHECKOUT_SHA
      : null,
  };
}

/** A lookup key, never an acceptance verdict or proof that the artifact exists. */
export function unitDiagnosticReference(args, invocationId, checkoutSha) {
  if (args.length !== 2 || args[0] !== "run" || args[1] !== "test:unit:ci:shard") return null;
  const identity = diagnosticIdentity({
    OMNIROUTE_UNIT_INVOCATION_ID: invocationId,
    OMNIROUTE_UNIT_CHECKOUT_SHA: checkoutSha,
  });
  return {
    schemaVersion: 2,
    evidenceState: "UNVALIDATED",
    ...identity,
    directory: ".artifacts/unit-progress",
    memberPattern: identity.invocationId ? `*-${identity.invocationId}-*.jsonl` : null,
  };
}

export function unitSourcePath(value, cwd) {
  if (typeof value !== "string" || /[\0\r\n]/.test(value)) return null;
  const file = relative(cwd, resolve(cwd, value)).split(sep).join("/");
  return /^tests\/unit\/(?:[\w.-]+\/)*[\w.-]+\.test\.(?:[cm]?[jt]s)$/.test(file) &&
    !file.split("/").includes("..")
    ? file
    : null;
}

/** Only the two existing integration globs; unrelated nested/live suites stay excluded. */
export function integrationSourcePath(value, cwd) {
  if (typeof value !== "string" || /[\0\r\n]/.test(value)) return null;
  const file = relative(cwd, resolve(cwd, value)).split(sep).join("/");
  return /^tests\/integration\/(?:combo-matrix\/)?[\w.-]+\.test\.ts$/.test(file) ? file : null;
}

export function integrationDiagnosticIdentity(environment) {
  const invocationId = environment.OMNIROUTE_INTEGRATION_INVOCATION_ID || "";
  const checkoutSha = environment.OMNIROUTE_INTEGRATION_CHECKOUT_SHA || "";
  return {
    invocationId: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
      invocationId
    )
      ? invocationId
      : null,
    checkoutSha: /^[0-9a-f]{40}$/.test(checkoutSha) ? checkoutSha : null,
  };
}

/** Diagnostic locator only; the command exit and complete shard set still decide the gate. */
export function integrationDiagnosticReference(args, invocationId, checkoutSha) {
  if (args.length !== 2 || args[0] !== "run" || args[1] !== "test:integration:ci") return null;
  const identity = integrationDiagnosticIdentity({
    OMNIROUTE_INTEGRATION_INVOCATION_ID: invocationId,
    OMNIROUTE_INTEGRATION_CHECKOUT_SHA: checkoutSha,
  });
  return {
    schemaVersion: 2,
    evidenceState: "UNVALIDATED",
    ...identity,
    directory: ".artifacts/integration-progress",
    memberPattern: identity.invocationId ? `*-${identity.invocationId}-*.jsonl` : null,
  };
}

const integer = (value, minimum = 0) =>
  Number.isSafeInteger(value) && value >= minimum ? value : null;

export function cumulativeSummary(data) {
  if (
    !data ||
    data.file !== undefined ||
    data.entryFile !== undefined ||
    typeof data.success !== "boolean"
  )
    return null;
  if (!data.counts || SUMMARY_KEYS.some((key) => integer(data.counts[key]) === null)) return null;
  return {
    counts: Object.fromEntries(SUMMARY_KEYS.map((key) => [key, data.counts[key]])),
    success: data.success,
  };
}

/** Projects only location, enum codes and counters. Never examines test names or error text. */
export function createUnitDiagnostics(cwd) {
  return createDiagnostics(cwd, unitSourcePath);
}

export function createIntegrationDiagnostics(cwd) {
  return createDiagnostics(cwd, integrationSourcePath);
}

function createDiagnostics(cwd, sourcePath) {
  let failureEvents = 0;
  let retainedFailures = 0;
  let summary = null;
  let rootSummaries = 0;
  return {
    observe(event) {
      if (event.type === "test:summary") {
        if (event.data?.file === undefined && event.data?.entryFile === undefined) {
          rootSummaries++;
          summary = cumulativeSummary(event.data);
        }
        return null;
      }
      if (event.type !== "test:complete" || event.data?.details?.passed !== false) return null;
      failureEvents++;
      const data = event.data;
      const sourceFile = sourcePath(data.file, cwd);
      const file = sourcePath(data.entryFile, cwd) || sourceFile;
      if (!file || retainedFailures >= FAILURE_LIMIT) return null;
      const error = own(data.details, "error");
      const cause = own(error, "cause");
      const causeCode = own(cause, "code");
      const errorCode = ERROR_CODES.has(causeCode) ? causeCode : own(error, "code");
      const failureType = own(error, "failureType");
      const assertion =
        causeCode === "ERR_ASSERTION"
          ? cause
          : own(error, "code") === "ERR_ASSERTION"
            ? error
            : null;
      const operator = own(assertion, "operator");
      retainedFailures++;
      return {
        file,
        sourceFile,
        line: sourceFile ? integer(data.line, 1) : null,
        column: sourceFile ? integer(data.column, 1) : null,
        nesting: integer(data.nesting),
        testNumber: integer(data.testNumber, 1),
        role: !data.entryFile
          ? "file-wrapper"
          : failureType === "subtestsFailed"
            ? "aggregate"
            : "test",
        disposition: data.todo ? "TODO" : data.skip ? "SKIP" : "FAIL",
        failureType: FAILURE_TYPES.has(failureType) ? failureType : "UNCLASSIFIED",
        errorCode: ERROR_CODES.has(errorCode) ? errorCode : "UNCLASSIFIED",
        assertionOperator: OPERATORS.has(operator) ? operator : null,
      };
    },
    snapshot({ activeFiles, artifactWriteFailed }) {
      const omittedFailures = failureEvents - retainedFailures;
      const complete =
        rootSummaries === 1 &&
        summary !== null &&
        omittedFailures === 0 &&
        activeFiles === 0 &&
        !artifactWriteFailed &&
        !(summary.counts.failed > 0 && failureEvents === 0);
      return {
        evidenceState: complete ? "COMPLETE" : "INCOMPLETE",
        summary,
        failureEvents,
        retainedFailures,
        omittedFailures,
      };
    },
  };
}
