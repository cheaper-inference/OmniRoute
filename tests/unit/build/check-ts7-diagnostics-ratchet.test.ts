import assert from "node:assert/strict";
import test from "node:test";

import {
  diffDiagnosticMultisets,
  hasParserPrerequisite,
  parseTscDiagnostics,
} from "../../../scripts/check/check-ts7-diagnostics-ratchet.mjs";

test("line and column movement does not create a new diagnostic", () => {
  const base = parseTscDiagnostics(
    "src/example.ts(10,2): error TS2322: Type 'string' is not assignable to type 'number'.\n"
  );
  const head = parseTscDiagnostics(
    "src/example.ts(80,19): error TS2322: Type 'string' is not assignable to type 'number'.\n"
  );

  assert.deepEqual(diffDiagnosticMultisets(base, head), { added: [], removed: [] });
});

test("the full normalized message distinguishes different diagnostics at one file and code", () => {
  const base = parseTscDiagnostics(
    "src/example.ts(1,1): error TS2339: Property 'old' does not exist on type 'Value'.\n"
  );
  const head = parseTscDiagnostics(
    "src/example.ts(1,1): error TS2339: Property 'new' does not exist on type 'Value'.\n"
  );
  const diff = diffDiagnosticMultisets(base, head);

  assert.equal(diff.added.length, 1);
  assert.equal(diff.removed.length, 1);
  assert.match(diff.added[0].message, /Property 'new'/);
});

test("duplicate diagnostics are compared as a multiset, not a set", () => {
  const line = "src/example.ts(1,1): error TS2304: Cannot find name 'missing'.\n";
  const base = parseTscDiagnostics(line);
  const head = parseTscDiagnostics(line + line.replace("(1,1)", "(2,1)"));
  const { added, removed } = diffDiagnosticMultisets(base, head);

  assert.equal(added.length, 1);
  assert.equal(added[0].delta, 1);
  assert.equal(added[0].baseCount, 1);
  assert.equal(added[0].headCount, 2);
  assert.equal(removed.length, 0);
});

test("multiline diagnostics normalize whitespace and nested coordinates", () => {
  const base = parseTscDiagnostics(
    "src/example.ts(1,1): error TS2345: Argument is invalid.\n" +
      "  The expected type comes from property 'value' declared at src/types.ts(12,4).\n"
  );
  const head = parseTscDiagnostics(
    "src/example.ts(99,8): error TS2345: Argument is invalid.\n" +
      "    The expected type comes from property 'value' declared at src/types.ts(20,9).\n"
  );

  assert.deepEqual(diffDiagnosticMultisets(base, head), { added: [], removed: [] });
});

test("an absolute worktree root is normalized out of file paths and messages", () => {
  const base = parseTscDiagnostics(
    "/tmp/base/src/example.ts(1,1): error TS2307: Cannot find module '/tmp/base/src/missing'.\n",
    { root: "/tmp/base" }
  );
  const head = parseTscDiagnostics(
    "/tmp/head/src/example.ts(2,3): error TS2307: Cannot find module '/tmp/head/src/missing'.\n",
    { root: "/tmp/head" }
  );

  assert.deepEqual(diffDiagnosticMultisets(base, head), { added: [], removed: [] });
  assert.equal(base[0].file, "src/example.ts");
});

test("reductions pass and report the removed multiplicity", () => {
  const line = "src/example.ts(1,1): error TS2304: Cannot find name 'missing'.\n";
  const base = parseTscDiagnostics(line + line.replace("(1,1)", "(2,1)"));
  const head = parseTscDiagnostics(line);
  const { added, removed } = diffDiagnosticMultisets(base, head);

  assert.equal(added.length, 0);
  assert.equal(removed.length, 1);
  assert.equal(removed[0].delta, 1);
});

test("TS1005 makes the unresolved parser prerequisite explicit", () => {
  const diagnostics = parseTscDiagnostics(
    "open-sse/config/providers/gateways.ts(10,2): error TS1005: ',' expected.\n"
  );

  assert.equal(hasParserPrerequisite(diagnostics), true);
  assert.equal(hasParserPrerequisite([]), false);
});
