import test from "node:test";
import assert from "node:assert/strict";
import { projectSystemOneFailure } from "../../open-sse/handlers/systemOneDiagnostics.ts";

test("FreeUsageLimitError preserves the reported error without inventing its limiting cause", () => {
  for (const authenticated of [false, true, undefined]) {
    const result = projectSystemOneFailure({
      status: 429,
      authenticated,
      body: { error: { name: "FreeUsageLimitError", message: "Free usage limit reached." } },
    });
    assert.equal(result.kind, "unknown");
    assert.equal(result.authScope, authenticated === false ? "anonymous" : "unknown");
    assert.equal(result.terminalAccessDenied, true);
    assert.equal(result.details.code, "FreeUsageLimitError");
    assert.match(result.message, /Free usage limit reached/);
    assert.doesNotMatch(result.message, /account quota exhausted|invalid key|permanent/i);
  }
});

for (const message of [
  "Free-tier chat models require OpenCode.",
  "This model is only available through the OpenCode client.",
  "Free models can only be used with OpenCode.",
])
  test(`explicit client restriction stays distinct: ${message}`, () => {
    const result = projectSystemOneFailure({
      status: 429,
      authenticated: true,
      body: { error: { name: "FreeUsageLimitError", message } },
    });
    assert.equal(result.kind, "client_restricted");
    assert.equal(result.authScope, "unknown");
    assert.equal(result.terminalAccessDenied, true);
    assert.equal(result.details.code, "FreeUsageLimitError");
  });

test("an explicit policy budget and a generic rate limit retain their reported categories", () => {
  assert.equal(
    projectSystemOneFailure({
      status: 429,
      body: { error: { message: "Workspace policy budget exceeded." } },
    }).kind,
    "quota"
  );
  assert.equal(projectSystemOneFailure({ status: 429 }).kind, "rate_limit");
  assert.equal(
    projectSystemOneFailure({
      status: 401,
      body: { error: { message: "Authentication required." } },
    }).kind,
    "authentication"
  );
});
