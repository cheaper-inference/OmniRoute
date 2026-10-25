// A 400 whose text describes a bad request (a parameter the model rejects, an input that is too long,
// a malformed message list) would fail the same way on every account of that model, so it must not
// rotate accounts. A 400 that looks like a bad credential or throttling still does, and any other
// status or an empty body never counts as request-scoped.
import { test } from "node:test";
import assert from "node:assert/strict";

import { isRequestScoped400 } from "../../open-sse/services/accountFallback/requestScoped400.ts";

test("only a 400 can be request-scoped", () => {
  for (const status of [200, 401, 403, 404, 422, 429, 500]) {
    assert.equal(
      isRequestScoped400(status, "max_tokens must be less than 4096"),
      false,
      String(status)
    );
  }
});

test("an empty error text is never request-scoped", () => {
  assert.equal(isRequestScoped400(400, ""), false);
});

test("a parameter validation error is request-scoped", () => {
  assert.equal(isRequestScoped400(400, "max_tokens must be at most 4096"), true);
  assert.equal(isRequestScoped400(400, "Unrecognized field: foo"), true);
  assert.equal(isRequestScoped400(400, "invalid parameters supplied"), true);
});

test("a context overflow error is request-scoped", () => {
  assert.equal(isRequestScoped400(400, "This prompt is too long for the context window"), true);
  assert.equal(isRequestScoped400(400, "input is too long"), true);
});

test("a malformed request error is request-scoped", () => {
  assert.equal(isRequestScoped400(400, "messages must alternate between user and assistant"), true);
  assert.equal(isRequestScoped400(400, "Improperly formed request."), true);
});

test("an authentication problem on a 400 still rotates accounts", () => {
  assert.equal(isRequestScoped400(400, "Invalid API key. Unrecognized field in header"), false);
  assert.equal(isRequestScoped400(400, "Unauthorized"), false);
});

test("a throttling text on a 400 still rotates accounts", () => {
  assert.equal(
    isRequestScoped400(400, "Rate limit reached: invalid parameters for this tier"),
    false
  );
  assert.equal(isRequestScoped400(400, "Too many requests, max_tokens must be lower"), false);
});

test("a 400 with an unrelated text is not request-scoped", () => {
  assert.equal(isRequestScoped400(400, "something went wrong on our side"), false);
});
