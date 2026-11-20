// unsanitized_error: a refresh-loop catch that neutralizes its result
// (`rows = null`) WITHOUT logging the error via sanitizeErrorMessage is a signal:
// every bulk catch must log. The predicate shares its log-call and
// message-argument reading with LOG_SINK.
import assert from "node:assert/strict";
import { test } from "node:test";
// @ts-expect-error — .mjs gate module has no type declarations; runtime shape is known.
import { unsanitized_error } from "../../scripts/check/check-error-helper.mjs";

test("unsanitized_error - nominal: bulk logged via sanitizeErrorMessage -> green", () => {
  const src = `async function refreshTokens() {
    try {
      rows = await fetchRows();
    } catch (err) {
      log.error("TOKEN_REFRESH", \`bulk refresh failed: \${sanitizeErrorMessage(err)}\`);
      rows = null;
    }
    return rows;
  }`;
  assert.equal(unsanitized_error(src), false);
});

test("unsanitized_error - limit: catch assigns null without a log -> REJECTED", () => {
  const src = `async function refreshTokens() {
    try {
      rows = await fetchRows();
    } catch (e) {
      rows = null;
    }
    return rows;
  }`;
  assert.equal(unsanitized_error(src), true);
});

test("unsanitized_error - limit: log with raw (unsanitized) error -> REJECTED", () => {
  const src = `catch (e) {
    log?.error?.("TOKEN_REFRESH", \`bulk \${e.message}\`);
    rows = null;
  }`;
  assert.equal(unsanitized_error(src), true);
});

// CodeRabbit 14:13 — restrict the scan to the catch block's real boundaries.
test("unsanitized_error - a safe assignment after the catch is not part of it", () => {
  const src = `try { await work(); } catch (err) { throw err; }
rows = null;`;
  assert.equal(unsanitized_error(src), false);
});

test("unsanitized_error - a sanitized log after the catch cannot suppress it", () => {
  const src = `catch (err) {
  rows = null;
}
log.error("TAG", sanitizeErrorMessage(err));`;
  assert.equal(unsanitized_error(src), true);
});
