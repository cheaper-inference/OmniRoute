import assert from "node:assert/strict";
import { test } from "node:test";
import {
  projectSystemOneFailure,
  systemOneSensitiveValues,
  systemOneRetryAfter,
} from "../../open-sse/handlers/systemOneDiagnostics.ts";

test("RFC9457 diagnostics preserve useful bounded title, detail and problem type", () => {
  const result = projectSystemOneFailure({
    status: 429,
    authenticated: true,
    body: {
      title: "Free usage limit reached",
      detail: "Wait for the published reset before another request.",
      type: "https://provider.example/problems/free-usage-limit?account=private",
      instance: "https://private.example/requests/account-123",
      account_id: "account-123",
    },
  });
  assert.equal(result.kind, "unknown");
  assert.equal(result.authScope, "unknown");
  assert.equal(result.terminalAccessDenied, true);
  assert.equal(result.details.title, "Free usage limit reached");
  assert.equal(result.details.detail, "Wait for the published reset before another request.");
  assert.equal(result.details.type, "free-usage-limit");
  assert.match(result.message, /Free usage limit reached/);
  assert.doesNotMatch(JSON.stringify(result), /provider\.example|private\.example|account-123/);
});

test("nested provider messages and new semantic codes survive without a fixed code allowlist", () => {
  const result = projectSystemOneFailure({
    status: 429,
    body: {
      error: { error: { message: "Free usage limit reached.", code: "FreeUsageLimitError" } },
    },
  });
  assert.equal(result.details.code, "FreeUsageLimitError");
  assert.equal(result.details.message, "Free usage limit reached.");
  assert.match(result.message, /FreeUsageLimitError/);
  assert.match(result.message, /Free usage limit reached/);
});

test("credential-free and credentialed free-limit errors do not establish quota cause", () => {
  for (const authenticated of [false, true, undefined]) {
    const result = projectSystemOneFailure({
      status: 429,
      authenticated,
      body: { error: { name: "FreeUsageLimitError", message: "Free usage limit reached." } },
    });
    assert.equal(result.kind, "unknown");
    assert.equal(result.authScope, authenticated === false ? "anonymous" : "unknown");
    assert.equal(result.terminalAccessDenied, true);
    assert.doesNotMatch(result.message, /account quota|invalid key|bad key/i);
  }
});

test("rate limit, authentication and forbidden outcomes remain distinct", () => {
  const rate = projectSystemOneFailure({
    status: 429,
    body: { error: { code: "rate_limit_exceeded" } },
  });
  const auth = projectSystemOneFailure({
    status: 401,
    body: { error: { message: "Unauthorized" } },
  });
  const access = projectSystemOneFailure({
    status: 403,
    body: { error: { message: "Access denied" } },
  });
  assert.equal(rate.kind, "rate_limit");
  assert.equal(auth.kind, "authentication");
  assert.equal(access.kind, "access");
  assert.ok([rate, auth, access].every((result) => result.terminalAccessDenied));
  assert.doesNotMatch(access.message, /invalid key|bad key/i);
});

test("Cloudflare1010 HTML yields a fixed useful edge diagnostic and no HTML", () => {
  const result = projectSystemOneFailure({
    status: 403,
    bodyText:
      "<html><title>Cloudflare</title><p>Error 1010: browser signature denied</p><p>Ray: private-id, email owner@example.test</p></html>",
  });
  assert.equal(result.kind, "edge");
  assert.equal(result.terminalAccessDenied, true);
  assert.match(result.message, /Cloudflare.*1010/);
  assert.match(result.message, /application identification/i);
  assert.doesNotMatch(JSON.stringify(result), /<html|private-id|owner@example|browser spoof/i);
});

test("Cloudflare1010 problem JSON is identified without treating it as authentication failure", () => {
  const result = projectSystemOneFailure({
    status: 403,
    authenticated: true,
    body: { title: "Cloudflare access denied", detail: "Error 1010: browser signature blocked" },
  });
  assert.equal(result.kind, "edge");
  assert.equal(result.authScope, "unknown");
  assert.equal(result.terminalAccessDenied, true);
});

test("credentials, known accounts, request echoes, emails and URLs are removed", () => {
  const secret = "opaque-provider-credential-1234";
  const account = "private-account-5678";
  const state = "Confidential task: diagnose a private condition";
  const result = projectSystemOneFailure({
    status: 403,
    sensitiveValues: [secret, account, state],
    body: {
      error: {
        message: `Denied ${state}; Bearer ${secret}; account=${account}; owner@example.test; https://private.example/path?key=${secret}`,
      },
    },
  });
  const output = JSON.stringify(result);
  for (const value of [secret, account, state, "owner@example.test", "private.example"])
    assert.ok(!output.includes(value));
  assert.match(result.details.message ?? "", /Denied/);
  assert.match(output, /REDACTED/);
});

test("JSON-escaped and URL-encoded request and credential echoes are redacted", () => {
  const state = 'private task "do not expose"';
  const credential = "opaque/credential+with=encoding";
  const result = projectSystemOneFailure({
    status: 403,
    sensitiveValues: [state, credential],
    body: { detail: `Refused ${JSON.stringify(state)}; secret ${encodeURIComponent(credential)}` },
  });
  const output = JSON.stringify(result);
  assert.ok(!output.includes("private task"));
  assert.ok(!output.includes("do not expose"));
  assert.ok(!output.includes("opaque"));
  assert.match(output, /REDACTED/);
});

test("escaped Unicode sensitive values cannot reappear after canonical sanitization", () => {
  const result = projectSystemOneFailure({
    status: 403,
    sensitiveValues: ["private-state-value"],
    body: { detail: "Refused \\u0070rivate-state-value" },
  });
  assert.doesNotMatch(JSON.stringify(result), /private-state-value/);
});

test("account-labeled prose is redacted without requiring every upstream identifier", () => {
  const result = projectSystemOneFailure({
    status: 403,
    body: {
      detail:
        "Denied for account alice123; customer id='private-name'; user=José; contact owner@example.test",
    },
  });
  assert.doesNotMatch(JSON.stringify(result), /alice123|private-name|José|owner@example\.test/);
  assert.match(result.message, /Denied/);
});

test("common opaque account-ID prefixes never survive provider error prose", () => {
  for (const message of [
    "Free usage limit reached for acct_8j3G0pQ7n9F2; retry later.",
    "Account not found: acct_8j3G0pQ7n9F2",
    "Permission denied for user_aB12cD34 and org_qR56sT78",
  ]) {
    const result = projectSystemOneFailure({ status: 429, body: { error: { message } } });
    assert.doesNotMatch(JSON.stringify(result), /acct_8j3G0pQ7n9F2|user_aB12cD34|org_qR56sT78/);
  }
});

test("numeric and named HTML entities are decoded before literal redaction", () => {
  for (const detail of [
    "Denied private&#x2d;account&#x2d;5678",
    "Denied private&#45;account&#45;5678",
    "Denied private&hyphen;account&hyphen;5678",
    "Denied private&amp;#x2d;account&amp;#x2d;5678",
  ]) {
    const result = projectSystemOneFailure({
      status: 403,
      sensitiveValues: ["private-account-5678"],
      body: { detail },
    });
    assert.doesNotMatch(JSON.stringify(result), /private|5678|&#|&hyphen;/);
    assert.match(result.details.detail ?? "", /Denied/);
  }
});

test("decoded HTML and unsupported entity encodings fail closed", () => {
  for (const detail of [
    "&lt;html&gt;private account&lt;/html&gt;",
    "Untrusted &unknownEntity; prose",
    "Untrusted &#x110000; prose",
  ]) {
    const result = projectSystemOneFailure({ status: 403, body: { detail } });
    assert.deepEqual(result.details, {});
  }
});

test("security escapes cannot reintroduce HTML entities after canonical sanitization", () => {
  for (const detail of [
    "\\u003chtml>private html\\u003c/html>",
    "\\u0026lt;html\\u0026gt;private html\\u0026lt;/html\\u0026gt;",
  ]) {
    assert.deepEqual(projectSystemOneFailure({ status: 403, body: { detail } }).details, {});
  }
});

test("URN problem types preserve only the final semantic component", () => {
  const result = projectSystemOneFailure({
    status: 429,
    body: {
      type: "urn:private-account-5678:problem:FreeUsageLimitError?account=private#private-fragment",
      title: "Free usage limit reached",
    },
  });
  assert.equal(result.details.type, "FreeUsageLimitError");
  assert.equal(result.kind, "unknown");
  assert.doesNotMatch(JSON.stringify(result), /private-account|private-fragment|account=/);
});

test("JSON request-echo siblings cannot fabricate a Cloudflare edge classification", () => {
  const result = projectSystemOneFailure({
    status: 403,
    bodyText: JSON.stringify({
      error: { message: "Access denied" },
      state: "Cloudflare Error1010",
    }),
  });
  assert.equal(result.kind, "access");
  assert.doesNotMatch(result.message, /Cloudflare/);
});

test("overlong sensitive values suppress dynamic diagnostic fields", () => {
  const result = projectSystemOneFailure({
    status: 403,
    sensitiveValues: ["private-value".repeat(300)],
    body: { detail: "Private partial request content could occur here" },
  });
  assert.deepEqual(result.details, {});
  assert.equal(result.message, "Upstream returned HTTP 403");
});

test("lowercase URI escapes cannot disclose a known credential", () => {
  const secret = "opaque/credential+with=encoding";
  const result = projectSystemOneFailure({
    status: 403,
    sensitiveValues: [secret],
    body: { detail: encodeURIComponent(secret).toLowerCase() },
  });
  assert.doesNotMatch(JSON.stringify(result), /opaque|credential\+with/);
});

test("HTML wrapped in a JSON diagnostic field is not echoed", () => {
  const result = projectSystemOneFailure({
    status: 403,
    body: { detail: "<html>private html</html>" },
  });
  assert.deepEqual(result.details, {});
});

test("shared collector redacts nested request values and arbitrary criteria/question keys", () => {
  const sensitiveValues = systemOneSensitiveValues([
    "opaque-provider-key",
    {
      state: { privateLabel: "private request content" },
      questions: {
        privateQuestion: {
          type: "choice",
          criteria: { privateOption: "private option description" },
        },
      },
    },
  ]);
  const result = projectSystemOneFailure({
    status: 403,
    sensitiveValues,
    body: {
      detail:
        "Denied privateLabel private request content privateQuestion privateOption opaque-provider-key",
    },
  });
  assert.doesNotMatch(
    JSON.stringify(result),
    /privateLabel|private request content|privateQuestion|privateOption|opaque-provider-key/
  );
});

test("collector does not execute getters and makes hostile input fail closed", () => {
  let called = false;
  const hostile = Object.defineProperty({}, "private", {
    enumerable: true,
    get() {
      called = true;
      return "private";
    },
  });
  const values = systemOneSensitiveValues([hostile]);
  assert.equal(called, false);
  assert.deepEqual(
    projectSystemOneFailure({
      status: 403,
      sensitiveValues: values,
      body: { detail: "private content" },
    }).details,
    {}
  );
});

test("collector traversal and count overflow suppress dynamic error prose", () => {
  const many = Object.fromEntries(
    Array.from({ length: 300 }, (_, index) => [`key-${index}`, `value-${index}`])
  );
  let deep: unknown = "private deepest value";
  for (let depth = 0; depth < 12; depth++) deep = { state: deep };
  for (const value of [many, deep]) {
    const sensitiveValues = systemOneSensitiveValues([value]);
    assert.deepEqual(
      projectSystemOneFailure({ status: 403, sensitiveValues, body: { detail: "private content" } })
        .details,
      {}
    );
  }
});

test("malformed Unicode in a sensitive value fails closed rather than throwing", () => {
  const result = projectSystemOneFailure({
    status: 403,
    sensitiveValues: ["\ud800"],
    body: { detail: "untrusted details" },
  });
  assert.deepEqual(result.details, {});
});

test("Retry-After preserves zero, bounded seconds and a canonical HTTP date", () => {
  assert.equal(systemOneRetryAfter("0"), "0");
  assert.equal(systemOneRetryAfter(" 0007 "), "7");
  assert.equal(
    systemOneRetryAfter("Wed, 21 Oct 2015 07:28:00 GMT"),
    "Wed, 21 Oct 2015 07:28:00 GMT"
  );
});

test("Retry-After drops arbitrary secrets, malformed dates and overlong values", () => {
  for (const value of [
    null,
    "Bearer opaque-secret",
    "7; account=secret",
    "-1",
    "1.5",
    "99999999999",
    "Thu, 21 Oct 2015 07:28:00 GMT",
    "Wed, 99 Oct 2015 07:28:00 GMT",
    "Wed, 21 Oct 2015 07:28:00 GMT secret",
    "1".repeat(65),
  ]) {
    assert.equal(systemOneRetryAfter(value), null);
  }
});

test("newlines, paths and stack tails do not become public diagnostic fields", () => {
  const result = projectSystemOneFailure({
    status: 500,
    body: { detail: "Upstream unavailable\n at dispatch (/workspace/private/handler.ts:4:2)" },
  });
  assert.match(result.details.detail ?? "", /Upstream unavailable/);
  assert.doesNotMatch(JSON.stringify(result), /workspace|handler\.ts|dispatch|\\n/);
});

test("only selected diagnostic fields are projected; private sibling keys never escape", () => {
  const result = projectSystemOneFailure({
    status: 401,
    body: {
      error: {
        message: "Authentication required",
        token: "opaque-secret",
        account_id: "private-id",
        debug: { apiKey: "secret-key" },
      },
    },
  });
  assert.doesNotMatch(
    JSON.stringify(result),
    /opaque-secret|private-id|secret-key|account_id|apiKey/
  );
});

test("null and numeric diagnostic values are ignored rather than coerced into messages", () => {
  const result = projectSystemOneFailure({
    status: 429,
    body: { title: null, detail: 0, error: { message: false, code: 0 } },
  });
  assert.deepEqual(result.details, {});
  assert.equal(result.authScope, "unknown");
  assert.equal(result.message, "Upstream returned HTTP 429");
});

test("invalid JSON and non-Cloudflare HTML do not echo raw provider content", () => {
  for (const bodyText of [
    "not-json secret account text",
    "<html>private account data</html>",
    "",
  ]) {
    const result = projectSystemOneFailure({ status: 403, bodyText });
    assert.equal(result.kind, "access");
    assert.equal(result.message, "Upstream returned HTTP 403");
    assert.deepEqual(result.details, {});
  }
});

test("bounded traversal and body length fail closed", () => {
  const deep = { error: { error: { error: { error: { error: { message: "not reached" } } } } } };
  assert.doesNotMatch(
    JSON.stringify(projectSystemOneFailure({ status: 500, body: deep })),
    /not reached/
  );
  const text = "x".repeat(70_000) + "private-secret";
  assert.equal(
    projectSystemOneFailure({ status: 403, bodyText: text }).message,
    "Upstream returned HTTP 403"
  );
  const many = Array.from({ length: 257 }, (_, index) => `secret-${index}`);
  const result = projectSystemOneFailure({
    status: 403,
    body: { detail: "private details" },
    sensitiveValues: many,
  });
  assert.deepEqual(result.details, {});
});

test("cyclic and getter-bearing supplied objects fail closed without running getters", () => {
  const body: Record<string, unknown> = {};
  body.error = body;
  Object.defineProperty(body, "detail", {
    get() {
      throw new Error("getter must not execute");
    },
  });
  assert.doesNotThrow(() => projectSystemOneFailure({ status: 500, body }));
  assert.deepEqual(projectSystemOneFailure({ status: 500, body }).details, {});
});

test("public diagnostic strings and messages are bounded", () => {
  const result = projectSystemOneFailure({
    status: 429,
    body: {
      title: "t".repeat(3000),
      detail: "d".repeat(3000),
      error: { message: "m".repeat(3000) },
    },
  });
  assert.ok((result.details.title?.length ?? 0) <= 192);
  assert.ok((result.details.detail?.length ?? 0) <= 512);
  assert.ok((result.details.message?.length ?? 0) <= 512);
  assert.ok(result.message.length <= 1200);
});

test("unattributed HTTP errors do not assert provider origin or completed account authentication", () => {
  const cases = [
    { status: 403, body: { message: "Forbidden" } },
    {
      status: 429,
      body: { error: { name: "FreeUsageLimitError", message: "Free usage limit reached." } },
    },
  ];
  for (const input of cases) {
    const result = projectSystemOneFailure({ ...input, authenticated: true });
    assert.match(result.message, /^Upstream returned HTTP /);
    assert.doesNotMatch(
      result.message,
      /provider returned|account quota|authenticated|invalid key/i
    );
    assert.equal(result.authScope, "unknown");
    assert.equal(result.terminalAccessDenied, true);
    assert.deepEqual(Object.keys(result).sort(), [
      "authScope",
      "details",
      "kind",
      "message",
      "terminalAccessDenied",
    ]);
  }
});
