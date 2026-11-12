/**
 * Provider key validation must not report a provider-side access refusal
 * (403 / 451 / geo-block / egress-blocked HTML page) as "Invalid API key".
 *
 * Fixtures are synthetic: an edge proxy answering the /models probe with an
 * nginx-style `403 Forbidden` HTML page, or an API answering 403 with a policy
 * refusal, must not surface as "Invalid". 401 (and 403s whose body really is
 * an auth rejection) keep reporting "Invalid API key".
 */
import test from "node:test";
import assert from "node:assert/strict";

const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");
const {
  classifyValidationRejection,
  buildValidationLogRecord,
  sanitizeValidationEndpoint,
  refineValidationResult,
  redactValidationText,
  recordValidationResponse,
  runWithValidationTrace,
} = await import("../../src/lib/providers/validation/upstreamRejection.ts");

const SECRET = "sk-test-SECRETSECRETSECRET1234567890";

async function withFetch<T>(
  handler: (url: string, init?: RequestInit) => Response,
  fn: () => Promise<T>
): Promise<{ result: T; urls: string[] }> {
  const originalFetch = globalThis.fetch;
  const urls: string[] = [];
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    urls.push(url);
    return handler(url, init);
  }) as typeof fetch;
  try {
    return { result: await fn(), urls };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

const NGINX_403 =
  "<html>\r\n<head><title>403 Forbidden</title></head>\r\n<body>\r\n<center><h1>403 Forbidden</h1></center>\r\n<hr><center>nginx</center>\r\n</body>\r\n</html>\r\n";

test("an edge-proxy 403 HTML page on /models is reported as access denied, not invalid key", async () => {
  const { result } = await withFetch(
    () => new Response(NGINX_403, { status: 403, headers: { "content-type": "text/html" } }),
    () => validateProviderApiKey({ provider: "together", apiKey: SECRET, providerSpecificData: {} })
  );
  assert.equal(result.valid, false);
  assert.doesNotMatch(String(result.error), /invalid api key/i);
  assert.match(String(result.error), /access denied by provider/i);
  assert.match(String(result.error), /403/);
  assert.match(String(result.error), /403 Forbidden/);
  assert.match(String(result.error), /region|egress/i);
  assert.ok(!String(result.error).includes(SECRET));
});

test("a 403 policy refusal in JSON is reported as access denied with the upstream message", async () => {
  const { result } = await withFetch(
    () =>
      new Response(
        JSON.stringify({
          error: {
            message:
              "Requests are not permitted by provider policy. Service is not available in your region.",
          },
        }),
        { status: 403, headers: { "content-type": "application/json" } }
      ),
    () => validateProviderApiKey({ provider: "together", apiKey: SECRET, providerSpecificData: {} })
  );
  assert.equal(result.valid, false);
  assert.match(String(result.error), /access denied by provider \(HTTP 403: /i);
  assert.match(String(result.error), /not available in your region/);
});

test("451 Unavailable For Legal Reasons is reported as access denied", async () => {
  const { result } = await withFetch(
    () => new Response("Unavailable For Legal Reasons", { status: 451 }),
    () => validateProviderApiKey({ provider: "together", apiKey: SECRET, providerSpecificData: {} })
  );
  assert.equal(result.valid, false);
  assert.match(String(result.error), /access denied by provider \(HTTP 451: /i);
});

test("401 keeps reporting Invalid API key", async () => {
  const { result } = await withFetch(
    () =>
      new Response(JSON.stringify({ error: { message: "Invalid API key provided" } }), {
        status: 401,
      }),
    () => validateProviderApiKey({ provider: "together", apiKey: SECRET, providerSpecificData: {} })
  );
  assert.equal(result.valid, false);
  assert.equal(result.error, "Invalid API key");
});

test("a bare API 403 keeps the Invalid API key verdict but surfaces status, message and hint", async () => {
  const { result } = await withFetch(
    () => new Response(JSON.stringify({ error: "forbidden" }), { status: 403 }),
    () => validateProviderApiKey({ provider: "together", apiKey: SECRET, providerSpecificData: {} })
  );
  assert.equal(result.valid, false);
  assert.match(String(result.error), /^Invalid API key \(HTTP 403: forbidden\)/);
  assert.match(String(result.error), /network or region/);
});

test("an upstream body that echoes the key is redacted in the surfaced message", async () => {
  const { result } = await withFetch(
    () =>
      new Response(`Forbidden: request from blocked network for key ${SECRET}`, { status: 403 }),
    () => validateProviderApiKey({ provider: "together", apiKey: SECRET, providerSpecificData: {} })
  );
  assert.equal(result.valid, false);
  assert.match(String(result.error), /access denied by provider/i);
  assert.ok(!String(result.error).includes(SECRET), String(result.error));
});

test("a generic 'Validation failed: <status>' over an explicit refusal becomes access denied", () => {
  const { result, outcome } = refineValidationResult(
    { valid: false, error: "Validation failed: 400" },
    [
      {
        endpoint: "https://api.provider.example/v1/models",
        status: 400,
        body: '{"error":{"message":"User location is not supported for the API use."}}',
      },
    ],
    SECRET
  );
  assert.equal(outcome, "access_denied");
  assert.match(String(result.error), /^Access denied by provider \(HTTP 400: User location/);
});

test("a key accepted on 429 keeps valid:true but gains a rate-limit warning", () => {
  const { result } = refineValidationResult(
    { valid: true, error: null },
    [{ endpoint: "https://api.provider.example/v1/chat", status: 429, body: "slow down" }],
    SECRET
  );
  assert.equal(result.valid, true);
  assert.match(
    String(result.warning),
    /rate limited the validation request \(HTTP 429: slow down\)/
  );
});

test("search providers record their response so a 403 HTML page is refined too", async () => {
  const { result } = await withFetch(
    () => new Response(NGINX_403, { status: 403, headers: { "content-type": "text/html" } }),
    () =>
      validateProviderApiKey({
        provider: "tavily-search",
        apiKey: SECRET,
        providerSpecificData: {},
      })
  );
  assert.equal(result.valid, false);
  assert.match(String(result.error), /access denied by provider \(HTTP 403: 403 Forbidden\)/i);
});

test("a stalled error body does not hang validation and its read is cancelled", async () => {
  let cancelled = false;
  const stalled = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode("partial"));
    },
    cancel() {
      cancelled = true;
    },
  });
  const started = performance.now();
  const original = new Response(stalled, { status: 403 });
  const { responses } = await runWithValidationTrace(SECRET, async () => {
    await recordValidationResponse("https://api.provider.example/v1/models", original);
  });
  assert.ok(performance.now() - started < 3000);
  assert.equal(responses[0]?.body, "partial");
  // A tee'd source is cancelled only once BOTH branches are: cancelling the
  // validator's branch must now reach the source, proving the clone was released.
  assert.equal(cancelled, false, "recording must never cancel the validator's response");
  await original.body?.cancel();
  assert.ok(cancelled, "the clone's branch must already be cancelled after the timeout");
});

test("redaction covers individual cookie values, JSON cookie exports and path credentials", () => {
  const cookieKey = "session=abcdefSESSIONVALUE123; csrf=zyxwvCSRFVALUE987";
  assert.equal(
    redactValidationText("echo: csrf=zyxwvCSRFVALUE987 only", cookieKey).includes("CSRFVALUE"),
    false
  );
  const jsonCookieKey = JSON.stringify([
    { name: "sso", value: "eyJhbGciOiJIUzI1NiJ9SSOVALUE" },
    { name: "sso-rw", value: "rwTOKENVALUE4242" },
  ]);
  const echoed = redactValidationText(
    "forbidden for sso=eyJhbGciOiJIUzI1NiJ9SSOVALUE and rwTOKENVALUE4242",
    jsonCookieKey
  );
  assert.ok(!echoed.includes("SSOVALUE") && !echoed.includes("rwTOKENVALUE"), echoed);
  // The same export behind a `Cookie:` prefix (normalizeSessionCookieHeader strips it).
  const prefixed = redactValidationText(
    "forbidden for rwTOKENVALUE4242",
    `Cookie: ${jsonCookieKey}`
  );
  assert.ok(!prefixed.includes("rwTOKENVALUE"), prefixed);
  // A credential in a custom base-URL path need not match the validated key.
  const record = buildValidationLogRecord({
    provider: "custom",
    apiKey: SECRET,
    outcome: "access_denied",
    rejection: {
      endpoint: "https://relay.provider.example/t/OTHERPATHTOKEN123/v1/models",
      status: 403,
    },
  });
  assert.equal(record.endpoint, "https://relay.provider.example");
});

test("classifyValidationRejection buckets statuses", () => {
  assert.equal(classifyValidationRejection(401, "nope").kind, "auth");
  assert.equal(classifyValidationRejection(403, '{"error":"invalid api key"}').kind, "auth");
  assert.equal(classifyValidationRejection(403, "Incorrect API key provided").kind, "auth");
  assert.equal(classifyValidationRejection(403, "bad key").kind, "auth");
  assert.equal(classifyValidationRejection(403, NGINX_403).kind, "access_denied");
  assert.equal(classifyValidationRejection(403, "").kind, "forbidden_ambiguous");
  assert.equal(
    classifyValidationRejection(403, '{"error":"forbidden"}').kind,
    "forbidden_ambiguous"
  );
  assert.equal(classifyValidationRejection(403, "Access denied").kind, "access_denied");
  assert.equal(classifyValidationRejection(451, "").kind, "access_denied");
  // Geo wording wins even when the body also mentions the key.
  assert.equal(
    classifyValidationRejection(403, "API key not valid in your region: region is not supported")
      .kind,
    "access_denied"
  );
  assert.equal(
    classifyValidationRejection(400, "User location is not supported for the API use.").kind,
    "access_denied"
  );
  assert.equal(classifyValidationRejection(429, "slow down").kind, "rate_limited");
  assert.equal(classifyValidationRejection(503, "").kind, "unavailable");
  assert.equal(classifyValidationRejection(400, "bad model").kind, "other");
});

test("sanitizeValidationEndpoint drops query string, fragment and userinfo", () => {
  assert.equal(
    sanitizeValidationEndpoint(
      "https://user:pw@generativelanguage.googleapis.com/v1beta/models?key=AIzaSECRET#x"
    ),
    "https://generativelanguage.googleapis.com/v1beta/models"
  );
  assert.equal(sanitizeValidationEndpoint("not a url"), "[unparseable-url]");
});

test("buildValidationLogRecord carries provider/endpoint/status/body but never the key", () => {
  const record = buildValidationLogRecord({
    provider: "together",
    apiKey: SECRET,
    outcome: "access_denied",
    rejection: {
      endpoint: "https://api.provider.example/v1/models?sig=abc",
      status: 403,
      body: `Authorization: Bearer ${SECRET} ` + "x".repeat(2000),
    },
  });
  const serialized = JSON.stringify(record);
  assert.equal(record.provider, "together");
  assert.equal(record.status, 403);
  assert.equal(record.endpoint, "https://api.provider.example");
  assert.equal(record.outcome, "access_denied");
  assert.ok(!serialized.includes(SECRET), serialized);
  assert.ok(String(record.body).length <= 520, `body too long: ${String(record.body).length}`);
});
