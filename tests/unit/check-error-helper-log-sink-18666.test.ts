// LOG_SINK, a detector DISTINCT from the suppression anchor.
//
// The INTERNAL_SINK_CALL anchor (check-error-helper.mjs) stays verbatim: it is
// true on `log.error("BATCHES", "sweep failed", {` (a historical false positive
// fixed and then removed from the allowlist, kept by another regression test).
// LOG_SINK instead inspects the MESSAGE ARGUMENT (2nd argument) and refuses a
// raw error interpolated into the message — including with `?.` after the method.
import assert from "node:assert/strict";
import { test } from "node:test";
// @ts-expect-error — .mjs gate module has no type declarations; runtime shape is known.
import { LOG_SINK } from "../../scripts/check/check-error-helper.mjs";
// @ts-expect-error — .mjs gate module has no type declarations.
import {
  findErrorHelperViolations,
  errorHelperDiagnostics,
} from "../../scripts/check/check-error-helper.mjs";

test("LOG_SINK - nominal: suppression anchor intact (historical false positive)", () => {
  assert.equal(LOG_SINK('log.error("BATCHES", "sweep failed", {'), true); // anchor = green
  assert.equal(LOG_SINK('log.error("x", key)'), true); // a key, not an error = green
});

test("LOG_SINK - limit: message-first with raw error -> REJECTED", () => {
  assert.equal(LOG_SINK('log?.error?.("TOKEN_REFRESH", `bulk ...${proxyErr.message}`)'), false);
});

test("LOG_SINK - sanitized sink: sanitizeErrorMessage in the message -> green", () => {
  assert.equal(
    LOG_SINK('log.error("TOKEN_REFRESH", `refresh failed: ${sanitizeErrorMessage(err)}`)'),
    true
  );
});

// CodeRabbit 14:13 — conventional `e` binding and complete-call parsing.
test("LOG_SINK - the conventional e binding is a raw error too", () => {
  assert.equal(LOG_SINK('log.error("TAG", e.message)'), false);
  assert.equal(LOG_SINK('log.error("TAG", e.stack)'), false);
  assert.equal(LOG_SINK('log.error("TAG", String(e))'), false);
});

test("LOG_SINK - a multiline call with a raw message is a violation", () => {
  const src = `log.error(
  "TAG",
  \`raw: \${e.message}\`
);`;
  const found = findErrorHelperViolations([{ path: "src/a.ts", source: src }], new Set(), {
    newDetectors: true,
  });
  assert.equal(found.length > 0, true, "complete multiline log call must be inspected");
});

test("errorHelperDiagnostics - one entry per violation, not per file", () => {
  const src = `catch (e) {
  rows = null;
}
log.error("TAG", e.message);`;
  const found = errorHelperDiagnostics([{ path: "src/a.ts", source: src }], new Set(), {
    newDetectors: true,
  });
  assert.equal(found.length >= 2, true, "each added violation gets its own diagnostic");
});
