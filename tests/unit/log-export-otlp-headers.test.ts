import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { once } from "node:events";
import { spawn } from "node:child_process";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";
import { build } from "esbuild";
import { writeEsmWorkerScopes } from "../../scripts/build/colocate-standalone.mjs";
import {
  containsSensitiveErrorCredential,
  redactSensitiveErrorText,
  sanitizeErrorMessage,
} from "../../open-sse/utils/errorSanitization.ts";
import { createRequestLogger } from "../../open-sse/utils/requestLogger.ts";
import { protectPipelinePayloads } from "../../src/lib/usage/callLogs/format.ts";
import { resolveCallLogDetail } from "../../src/lib/usage/callLogDetailResolver.ts";
import {
  buildOtlpPayload,
  otlpHttpConfigSchema,
  otlpHttpDestination,
} from "../../src/lib/logExport/destinations/otlpHttp.ts";
import { attachExportBodies } from "../../src/lib/usage/callLogExportQueries.ts";
import type { LogExportRecord } from "../../src/lib/logExport/types.ts";
import type { ExportChildReply } from "../../src/lib/logExport/childProtocol.ts";

const row: LogExportRecord = {
  id: "headers-fixture",
  timestamp: "2026-10-13T00:00:02.000Z",
  method: "POST",
  path: "/v1/chat/completions",
  status: 200,
  model: "example-model",
  requestedModel: null,
  provider: "example",
  providerDisplay: null,
  account: null,
  connectionId: null,
  duration: 2000,
  ttftMs: 250,
  tokensIn: 10,
  tokensOut: 20,
  tokensCacheRead: null,
  tokensCacheWrite: null,
  tokensReasoning: null,
  tokensCompressed: null,
  cacheSource: null,
  requestType: null,
  sourceFormat: null,
  targetFormat: null,
  apiKeyId: null,
  apiKeyName: null,
  comboName: null,
  comboStepId: null,
  comboExecutionKey: null,
  errorSummary: null,
  errorType: null,
  correlationId: null,
  sessionTag: null,
  modelPinned: false,
  detailState: "none",
  hasRequestBody: false,
  hasResponseBody: false,
  hasPipelineDetails: false,
  requestBody: null,
  responseBody: null,
  pipelineRouteDecision: null,
  pipelineClientRequest: null,
  pipelineOpenaiRequest: null,
  pipelineProviderRequest: null,
  pipelineProviderResponse: null,
  pipelineClientResponse: null,
  pipelineError: null,
  bodiesTruncated: false,
};
const config = (extra: Record<string, unknown> = {}) =>
  otlpHttpConfigSchema.parse({
    endpoint: "http://127.0.0.1:1/v1/traces",
    ...extra,
  });
const arr = (...values: string[]) => ({
  arrayValue: { values: values.map((stringValue) => ({ stringValue })) },
});
const snapshot = (headers: unknown) =>
  JSON.stringify({ headers, body: { model: "example-model" } });
const spans = (payload: ReturnType<typeof buildOtlpPayload>) =>
  payload.resourceSpans[0].scopeSpans[0].spans;
const attrs = (record: LogExportRecord, extra: Record<string, unknown> = {}) =>
  Object.fromEntries(
    spans(buildOtlpPayload([record], config(extra)))[0].attributes.map(({ key, value }) => [
      key,
      value,
    ])
  );
const headerAttrs = (record: LogExportRecord, extra: Record<string, unknown> = {}) =>
  Object.fromEntries(
    Object.entries(attrs(record, extra)).filter(([key]) => key.startsWith("http.request.header."))
  );

test("header capture defaults off, does not read snapshots, and has an opt-in form field", () => {
  const record = {
    ...row,
    get pipelineClientRequest(): string {
      throw new Error("must not read");
    },
  };
  assert.deepEqual(buildOtlpPayload([record], config()), buildOtlpPayload([row], config()));
  assert.deepEqual(headerAttrs(record, { requestHeaderAllowlist: [] }), {});
  assert.deepEqual(config().requestHeaderAllowlist, []);
  const field = otlpHttpDestination.fields.find((f) => f.key === "requestHeaderAllowlist");
  assert.equal(field?.type, "textarea");
  assert.equal(field?.defaultValue, "");
});

test("exact/prefix capture preserves full lowercase names and OTLP string arrays in both modes", () => {
  const record = {
    ...row,
    pipelineClientRequest: snapshot({
      "X-Project": "one,two",
      "x-project": ["three", "four"],
      "X-OmniRoute-Meta-Team": "example-team",
      "X-OmniRoute-Meta-Task": ["task-a"],
      "User-Agent": "ExampleClient/1.0",
      "X-Other": "omit",
    }),
    pipelineProviderRequest: snapshot({ "X-Project": "provider-not-client" }),
  };
  const expected = {
    "http.request.header.x-project": arr("one,two", "three", "four"),
    "http.request.header.x-omniroute-meta-team": arr("example-team"),
    "http.request.header.x-omniroute-meta-task": arr("task-a"),
    "http.request.header.user-agent": arr("ExampleClient/1.0"),
  };
  for (const langfuseMapping of [false, true]) {
    const extra = {
      requestHeaderAllowlist: "X-Project, X-OmniRoute-Meta-*\nUser-Agent",
      langfuseMapping,
    };
    assert.deepEqual(headerAttrs(record, extra), expected);
    const all = attrs(record, extra);
    assert.deepEqual(all["user_agent.original"], { stringValue: "ExampleClient/1.0" });
    assert.equal(all["omniroute.metadata.team"], undefined);
    assert.equal(all["langfuse.observation.metadata.team"], undefined);
    assert.equal(JSON.stringify(all).includes("provider-not-client"), false);
  }
  assert.deepEqual(headerAttrs(record, { requestHeaderAllowlist: ["x-project"] }), {
    "http.request.header.x-project": expected["http.request.header.x-project"],
  });
});

test("allowlist accepts arrays/text, deduplicates case, and rejects unbounded/invalid patterns", () => {
  assert.deepEqual(
    config({ requestHeaderAllowlist: ["X-Project", "x-project", "X-OmniRoute-Meta-*"] })
      .requestHeaderAllowlist,
    ["x-project", "x-omniroute-meta-*"]
  );
  assert.deepEqual(config({ requestHeaderAllowlist: "X-A\r\nX-B" }).requestHeaderAllowlist, [
    "x-a",
    "x-b",
  ]);
  for (const requestHeaderAllowlist of [
    "*",
    "x-**",
    "x-*-team",
    "bad name",
    "X-Key",
    "x".repeat(257),
    "x-a\rb",
    [""],
    [3],
    Array(65).fill("x-a"),
  ]) {
    assert.equal(
      otlpHttpConfigSchema.safeParse({ endpoint: "http://localhost/", requestHeaderAllowlist })
        .success,
      false
    );
  }
});

test("credentials and gateway auth never export even under explicit or prefix selection", () => {
  const names = [
    "Authorization",
    "Proxy-Authorization",
    "Cookie",
    "Set-Cookie",
    "X-API-Key",
    "Api_Key",
    "X-Goog-Api-Key",
    "XI-API-Key",
    "X-Access-Token",
    "X-Secret",
    "X-Password",
    "X-Credential",
    "X-Runtime-Key",
    "X-Storage-State",
    "X-Capability",
    "X-OmniRoute-CLI-Token",
    "X-OmniRoute-Internal-Service-Token",
    "X-OmniRoute-Lease-Owner",
    "X-OmniRoute-Auth-Id",
    "X-OmniRoute-Self-Loop-Key-Id",
    "X-OmniRoute-Playground-Key-Id",
    "X-OmniRoute-Meta-Token",
    "X-OmniRoute-Meta-Secret",
  ];
  const headers = Object.fromEntries(names.map((name) => [name, "partially...masked"]));
  Object.assign(headers, { "X-Project": "allowed" });
  const record = { ...row, pipelineClientRequest: snapshot(headers) };
  assert.deepEqual(headerAttrs(record, { requestHeaderAllowlist: [...names, "x-project"] }), {
    "http.request.header.x-project": arr("allowed"),
  });
  assert.deepEqual(
    headerAttrs(record, { requestHeaderAllowlist: ["x-*", "a*", "p*", "c*", "s*"] }),
    {
      "http.request.header.x-project": arr("allowed"),
    }
  );
});

test("invalid names/types/control values and known credentials are omitted without coercion", () => {
  const headers = JSON.parse(
    '{"__proto__":"unsafe","constructor":"unsafe","prototype":"unsafe"}'
  ) as Record<string, unknown>;
  Object.assign(headers, {
    "bad name": "bad",
    "X-Key": "invalid-unicode-name",
    "x-null": null,
    "x-number": 42,
    "x-object": {},
    "x-mixed": ["ok", 3],
    "x-crlf": "one\r\ntwo",
    "x-control": "a\u0000b",
    "x-surrogate": "\ud800",
    "x-empty-array": [],
    "X-Duplicate": "ok",
    "x-duplicate": false,
    "x-empty": "",
    "x-tab": "a\tb",
    "x-known": "sk-proj-" + "a".repeat(30),
    "x-bearer": "Bearer synthetic-credential-value",
    "x-marker": "[REDACTED:auth_header]",
    "x-good": ["a,b", "c"],
  });
  assert.deepEqual(
    headerAttrs(
      { ...row, pipelineClientRequest: snapshot(headers) },
      {
        requestHeaderAllowlist: ["x-*", "bad*", "__proto__", "constructor", "prototype"],
      }
    ),
    {
      "http.request.header.x-empty": arr(""),
      "http.request.header.x-tab": arr("a\tb"),
      "http.request.header.x-good": arr("a,b", "c"),
    }
  );
});

const credentialHeaderValues = [
  ["password assignment", "password=synthetic-review-password-58"],
  ["one-character password", "password=x"],
  ["empty password", "password="],
  ["quoted password", '"password": "synthetic value"'],
  ["single-quoted password", "'PASSWORD' = 'x'"],
  ["CLI password", "--password x"],
  ["escaped password label", String.raw`pass\u0077ord=x`],
  ["escaped assignment delimiter", String.raw`password\u003dx`],
  ["private key", "private key=x"],
  ["private-key", "private-key: x"],
  ["private_key", '"private_key":"x"'],
  ["privatekey", "privatekey=x"],
  ["credential", "credential=x"],
  ["credentials", "credentials: x"],
  ["quoted credential", 'credential="synthetic value"'],
  ["unterminated credential", 'credential="synthetic value'],
  ["short API key", "api_key=x"],
  ["short access token", "access_token=x"],
  ["short refresh token", "refresh-token=x"],
  ["short authorization", "authorization=x"],
  ["short cookie", "cookie=x"],
  ["short secret", "secret=x"],
  ["short token", "token=x"],
  ["session ID", "session id=x"],
  ["encryption key", "encryption_key=x"],
  ["session key", "session-key=x"],
  ["signing key", "signingkey=x"],
  ["secret key", "secret key=x"],
  ["private PEM", "-----BEGIN PRIVATE KEY----- synthetic -----END PRIVATE KEY-----"],
  ["unterminated private PEM", "-----BEGIN RSA PRIVATE KEY----- synthetic"],
] as const;

const escapedQuotedCredential = String.raw`https://fixture.invalid/\u0022password\u0022=synthetic-review-password-58`;
const atValueByteLimit = (suffix: string, prefix = "") =>
  prefix + "z".repeat(4096 - Buffer.byteLength(prefix + suffix)) + suffix;
// Finite syntax already recognized by the public sanitizer, not a new decoding contract.
const canonicalCredentialHeaderValues = [
  ["Unicode double quotes", escapedQuotedCredential],
  ["Unicode single quotes", String.raw`https://fixture.invalid/\u0027password\u0027=x`],
  ["JSON double quotes", String.raw`https://fixture.invalid/\"password\"=x`],
  ["JSON single quotes", String.raw`https://fixture.invalid/\'password\'=x`],
  [
    "Unicode delimiter and quotes",
    String.raw`https://fixture.invalid/\u0022password\u0022\u003a\u0022x\u0022`,
  ],
  ["uppercase Unicode", String.raw`https://fixture.invalid/\U0022PASS\U0057ORD\U0022\U003DX`],
  [
    "second quote escape layer",
    String.raw`https://fixture.invalid/\u005cu0022password\u005cu0022=x`,
  ],
  [
    "third quote escape layer",
    String.raw`https://fixture.invalid/\u005cu005cu0022password\u005cu005cu0022=x`,
  ],
  ["escaped whitespace", String.raw`https://fixture.invalid/\u0022password\u0022\t=x`],
  ["escaped private key", String.raw`https://fixture.invalid/\u0022private_key\u0022=x`],
  ["escaped short token", String.raw`https://fixture.invalid/\u0022token\u0022=x`],
  ["HTML query separator", "https://fixture.invalid/?project=blue&amp;password=x"],
  ["HTML quoted query value", "https://fixture.invalid/?password=&quot;x&quot;"],
  ["percent-encoded query label", "https://fixture.invalid/?pass%77ord=x"],
  ["POSIX path before assignment", "/srv/app/client.ts:44:9 password=x"],
  ["Windows path before assignment", String.raw`C:\work\client.ts:44:9 password=x`],
  ["serialized stack tail", String.raw`password=x\n    at handler (/srv/app/client.ts:44:9)`],
  [
    "escaped quotes before stack tail",
    escapedQuotedCredential + String.raw`\n    at handler (/srv/app/client.ts:44:9)`,
  ],
  ["4096-byte quote tail", atValueByteLimit(" " + escapedQuotedCredential)],
  [
    "4096-byte UTF-8 quote tail",
    atValueByteLimit(" " + escapedQuotedCredential, "🙂".repeat(1000)),
  ],
  ["4096-byte path tail", atValueByteLimit(" /srv/app/client.ts:44:9 password=x")],
  [
    "4096-byte stack tail",
    atValueByteLimit(String.raw` password=x\n    at handler (/srv/app/client.ts:44:9)`),
  ],
  ["4096-byte marker expansion", atValueByteLimit(" password=x")],
] as const;

test("canonical credential fixtures reach the complete public recognition and tail bounds", () => {
  assert.equal(containsSensitiveErrorCredential(escapedQuotedCredential), false);
  assert.equal(redactSensitiveErrorText(escapedQuotedCredential).includes("[REDACTED"), false);
  assert.equal(
    sanitizeErrorMessage(escapedQuotedCredential),
    'https://fixture.invalid/"password"=[REDACTED]'
  );
  for (const [label, value] of canonicalCredentialHeaderValues) {
    assert.ok(Buffer.byteLength(value) <= 4096, label);
    assert.ok(sanitizeErrorMessage(value).includes("[REDACTED"), label);
    if (label.startsWith("4096-byte")) {
      assert.equal(Buffer.byteLength(value), 4096, label);
      assert.ok(Buffer.byteLength(value.slice(0, value.indexOf("password"))) > 4000, label);
    }
  }
  assert.ok(sanitizeErrorMessage(atValueByteLimit(" password=x")).endsWith("[REDACTED]"));
});

for (const [label, value] of [...credentialHeaderValues, ...canonicalCredentialHeaderValues]) {
  test(`credential-valued headers are omitted in full: ${label}`, () => {
    const record = {
      ...row,
      pipelineClientRequest: snapshot({
        "X-Project": value,
        "X-Array": ["safe", value],
        "X-Duplicate": "safe",
        "x-duplicate": [value],
        "User-Agent": value,
        "X-Safe": ["alpha,beta", "project-v2"],
      }),
    };
    for (const langfuseMapping of [false, true]) {
      const extra = { requestHeaderAllowlist: "x-*,user-agent", langfuseMapping };
      assert.deepEqual(headerAttrs(record, extra), {
        "http.request.header.x-safe": arr("alpha,beta", "project-v2"),
      });
      assert.equal(attrs(record, extra)["user_agent.original"], undefined);
      for (const headers of [
        { "X-Project": value },
        { "X-Project": ["safe", value] },
        { "X-Project": "safe", "x-project": value },
        { "x-project": value, "X-Project": "safe" },
        { "User-Agent": value },
        { "User-Agent": ["safe", value] },
        { "User-Agent": "safe", "user-agent": value },
        { "user-agent": value, "User-Agent": "safe" },
      ]) {
        const shaped = {
          ...row,
          pipelineClientRequest: snapshot({ ...headers, "X-Safe": ["alpha,beta", "project-v2"] }),
        };
        assert.deepEqual(headerAttrs(shaped, extra), {
          "http.request.header.x-safe": arr("alpha,beta", "project-v2"),
        });
        assert.equal(attrs(shaped, extra)["user_agent.original"], undefined);
      }
    }
  });
}

test("safe UA, project strings and comma-containing arrays remain byte-identical", () => {
  assert.equal(sanitizeErrorMessage(String.raw`project\u002dblue`), "project-blue");
  assert.equal(sanitizeErrorMessage(String.raw`C:\work\project.txt`), "<path>");
  for (const value of [
    "ExampleClient/1.0 (linux; amd64)",
    "project=password-manager",
    "private-key-rotation",
    "credential-audit-team",
    "team=alpha,project=demo",
    String.raw`project\u002dblue`,
    String.raw`https://fixture.invalid/\u0022project\u0022=blue`,
    String.raw`project\u005cu002dblue`,
    String.raw`project\tblue`,
    String.raw`C:\work\project.txt`,
    String.raw`project\n    at handler (/srv/app/client.ts:44:9)`,
    "https://fixture.invalid/?project=blue&amp;team=demo",
  ]) {
    assert.equal(sanitizeErrorMessage(value).includes("[REDACTED"), false);
    const record = {
      ...row,
      pipelineClientRequest: snapshot({ "X-Project": [value, "one,two"], "User-Agent": value }),
    };
    for (const langfuseMapping of [false, true]) {
      const extra = { requestHeaderAllowlist: "x-project,user-agent", langfuseMapping };
      assert.deepEqual(headerAttrs(record, extra), {
        "http.request.header.x-project": arr(value, "one,two"),
        "http.request.header.user-agent": arr(value),
      });
      assert.deepEqual(attrs(record, extra)["user_agent.original"], { stringValue: value });
      const duplicate = {
        ...row,
        pipelineClientRequest: snapshot({ "User-Agent": value, "user-agent": "OtherClient/2.0" }),
      };
      assert.deepEqual(headerAttrs(duplicate, extra), {
        "http.request.header.user-agent": arr(value, "OtherClient/2.0"),
      });
      assert.equal(attrs(duplicate, extra)["user_agent.original"], undefined);
    }
  }
});

test("header count, UTF-8 value bytes, array length and total bytes are bounded without clipping", () => {
  const headers: Record<string, unknown> = Object.fromEntries(
    Array.from({ length: 40 }, (_, i) => [`x-h${String(i).padStart(2, "0")}`, "v"])
  );
  assert.equal(
    Object.keys(
      headerAttrs(
        { ...row, pipelineClientRequest: snapshot(headers) },
        { requestHeaderAllowlist: "x-*" }
      )
    ).length,
    32
  );
  assert.deepEqual(
    headerAttrs(
      {
        ...row,
        pipelineClientRequest: snapshot({
          "x-over": "🙂".repeat(1025),
          "x-boundary": "🙂".repeat(1024),
          "x-array": Array(17).fill("v"),
        }),
      },
      { requestHeaderAllowlist: "x-*" }
    ),
    { "http.request.header.x-boundary": arr("🙂".repeat(1024)) }
  );
  const many = headerAttrs(
    {
      ...row,
      pipelineClientRequest: snapshot({
        "x-a": Array(4).fill("a".repeat(4000)),
        "x-b": "b".repeat(1000),
        "x-c": "ok",
      }),
    },
    { requestHeaderAllowlist: "x-*" }
  );
  assert.equal(many["http.request.header.x-b"], undefined);
  assert.deepEqual(many["http.request.header.x-c"], arr("ok"));
  assert.deepEqual(
    headerAttrs(
      {
        ...row,
        pipelineClientRequest: snapshot(
          Object.fromEntries(Array.from({ length: 257 }, (_, i) => [`x-${i}`, "v"]))
        ),
      },
      { requestHeaderAllowlist: "x-*" }
    ),
    {}
  );
  assert.deepEqual(
    headerAttrs(
      { ...row, pipelineClientRequest: snapshot({ "x-good": "v", body: "x".repeat(1024 * 1024) }) },
      { requestHeaderAllowlist: "x-*" }
    ),
    {}
  );
});

test("missing/corrupt/clipped snapshots cannot fall back to provider headers or contaminate rows", () => {
  for (const pipelineClientRequest of [
    null,
    "{broken",
    '{"headers":{"x-project":"v"}}…[truncated]',
    "null",
    "[]",
    '{"headers":[]}',
  ]) {
    assert.deepEqual(
      headerAttrs(
        {
          ...row,
          pipelineClientRequest,
          pipelineProviderRequest: snapshot({ "x-project": "provider" }),
        },
        { requestHeaderAllowlist: "x-project" }
      ),
      {}
    );
  }
  const records = ["first", "second", null].map((value, i) => ({
    ...row,
    id: `row-${i}`,
    pipelineClientRequest: value === null ? null : snapshot({ "x-project": value }),
  }));
  const values = spans(
    buildOtlpPayload(records, config({ requestHeaderAllowlist: "x-project" }))
  ).map((s) => s.attributes.find((a) => a.key === "http.request.header.x-project")?.value);
  assert.deepEqual(values, [arr("first"), arr("second"), undefined]);
});

test("actual hydration preserves clientRawRequest precedence, legacy clientRequest and clipping", async () => {
  for (const key of ["clientRawRequest", "clientRequest"]) {
    const hydrated = await attachExportBodies([{ rowId: 1, record: row }], 1024, async () => ({
      requestBody: null,
      responseBody: null,
      pipelinePayloads: {
        clientRequest: { headers: { "x-project": "legacy" } },
        [key]: { headers: { "x-project": key }, body: "small" },
        providerRequest: { headers: { "x-project": "provider" } },
      },
    }));
    assert.deepEqual(headerAttrs(hydrated[0].record, { requestHeaderAllowlist: "x-project" }), {
      "http.request.header.x-project": arr(key),
    });
  }
  const clipped = await attachExportBodies([{ rowId: 1, record: row }], 1024, async () => ({
    requestBody: null,
    responseBody: null,
    pipelinePayloads: {
      clientRawRequest: { headers: { "x-project": "present-before-clip" }, body: "x".repeat(3000) },
    },
  }));
  assert.equal(clipped[0].record.bodiesTruncated, true);
  assert.deepEqual(headerAttrs(clipped[0].record, { requestHeaderAllowlist: "x-project" }), {});
});

test("real HTTP send carries arrays as span attributes, not as collector transport headers", async () => {
  const received: {
    headers: http.IncomingHttpHeaders;
    payload: ReturnType<typeof buildOtlpPayload>;
  }[] = [];
  const server = http.createServer(async (req, res) => {
    const parts: Buffer[] = [];
    for await (const part of req) parts.push(Buffer.from(part));
    received.push({ headers: req.headers, payload: JSON.parse(Buffer.concat(parts).toString()) });
    res.writeHead(200).end();
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  try {
    await otlpHttpDestination
      .createClient(
        config({
          endpoint: `http://127.0.0.1:${address.port}/v1/traces`,
          requestHeaderAllowlist: "x-project",
          headers: "X-Collector: transport-only",
        })
      )
      .send([{ ...row, pipelineClientRequest: snapshot({ "x-project": ["a,b", "c"] }) }]);
    assert.equal(received.length, 1);
    assert.equal(received[0].headers["x-project"], undefined);
    assert.equal(received[0].headers["x-collector"], "transport-only");
    assert.deepEqual(
      spans(received[0].payload)[0].attributes.find(
        (a) => a.key === "http.request.header.x-project"
      )?.value,
      arr("a,b", "c")
    );
  } finally {
    server.closeAllConnections();
    server.close();
    await once(server, "close");
  }
});

test("standalone redactor still rejects credentials stripped with canonical stack tails", () => {
  const value = String.raw`Error\n    at handler (/srv/app/client.ts:44:9 password=x)`;
  assert.equal(sanitizeErrorMessage(value), "Error");
  assert.ok(redactSensitiveErrorText(value).includes("[REDACTED"));
  for (const langfuseMapping of [false, true])
    assert.deepEqual(
      headerAttrs(
        { ...row, pipelineClientRequest: snapshot({ "X-Project": value }) },
        {
          requestHeaderAllowlist: "x-project",
          langfuseMapping,
        }
      ),
      {}
    );
});

async function exerciseExportChild(compiled = false, langfuseMapping = false) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "otlp-header-child-"));
  const db = new DatabaseSync(path.join(dir, "storage.sqlite"));
  db.exec(`CREATE TABLE call_logs (id TEXT, timestamp TEXT, model TEXT, status INTEGER, path TEXT,
    provider TEXT, account TEXT, connection_id TEXT, artifact_relpath TEXT, detail_state TEXT,
    error_summary TEXT, has_pipeline_details INTEGER);
    CREATE TABLE provider_nodes (id TEXT, name TEXT, prefix TEXT);
    CREATE TABLE provider_connections (id TEXT, name TEXT, email TEXT);`);
  fs.mkdirSync(path.join(dir, "call_logs"));
  db.prepare(
    "INSERT INTO call_logs (id,timestamp,path,status,artifact_relpath,detail_state,has_pipeline_details) VALUES (?,?,?,200,?,'ready',1)"
  ).run(row.id, row.timestamp, row.path, "headers.json");
  const logger = await createRequestLogger("openai", "openai", "synthetic", {
    enabled: true,
    captureStreamChunks: false,
  });
  logger.logClientRawRequest(
    row.path,
    { model: "example-model" },
    {
      "X-Review": escapedQuotedCredential,
    }
  );
  const captured = protectPipelinePayloads(logger.getPipelinePayloads());
  const capturedHeaders = captured?.clientRawRequest?.headers as Record<string, unknown>;
  assert.equal(capturedHeaders["X-Review"], escapedQuotedCredential);
  fs.writeFileSync(
    path.join(dir, "call_logs/headers.json"),
    JSON.stringify({
      pipeline: {
        clientRawRequest: {
          headers: {
            ...capturedHeaders,
            "x-project": "persisted-client",
            Authorization: "[REDACTED]",
            "user-agent": "ExampleClient/1.0",
            "x-sensitive-a": "password=synthetic-review-password-58",
            "x-sensitive-b": ["safe", "password=x"],
            "x-sensitive-c": "private key=x",
            "x-sensitive-d": "credential=x",
          },
        },
        providerRequest: { headers: { "x-project": "never-provider" } },
      },
    })
  );
  const detail = await resolveCallLogDetail(
    db,
    {
      id: row.id,
      timestamp: row.timestamp,
      model: row.model,
      status: row.status,
      detailState: "ready",
      artifactRelPath: "headers.json",
      error: null,
      hasPipelineDetails: true,
    },
    path.join(dir, "call_logs")
  );
  const hydrated = await attachExportBodies([{ rowId: 1, record: row }], 1024, async () => detail);
  assert.equal(
    JSON.parse(hydrated[0].record.pipelineClientRequest!).headers["X-Review"],
    escapedQuotedCredential
  );
  const insert = db.prepare(
    "INSERT INTO call_logs (id,timestamp,path,status,artifact_relpath,detail_state,has_pipeline_details) VALUES (?,?,?,200,?,'ready',1)"
  );
  for (const name of ["missing", "corrupt", "clipped"])
    insert.run(name, row.timestamp, row.path, `${name}.json`);
  fs.writeFileSync(path.join(dir, "call_logs/corrupt.json"), "{invalid-snapshot-content");
  fs.writeFileSync(
    path.join(dir, "call_logs/clipped.json"),
    JSON.stringify({
      pipeline: {
        clientRawRequest: { headers: { "x-project": "before-clip" }, body: "x".repeat(3000) },
      },
    })
  );
  db.close();
  const payloads: ReturnType<typeof buildOtlpPayload>[] = [];
  const server = http.createServer(async (req, res) => {
    const parts: Buffer[] = [];
    for await (const part of req) parts.push(Buffer.from(part));
    payloads.push(JSON.parse(Buffer.concat(parts).toString()));
    res.writeHead(200).end();
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  try {
    let childArgs = ["--import", "tsx/esm", "src/lib/logExport/exportChild.ts"];
    if (compiled) {
      const root = path.resolve(import.meta.dirname, "../..");
      const childRoot = path.join(dir, "compiled-root");
      const childFile = path.join(childRoot, "src/lib/logExport/exportChild.js");
      fs.mkdirSync(path.dirname(childFile), { recursive: true });
      fs.writeFileSync(path.join(childRoot, "package.json"), '{"type":"commonjs"}');
      fs.symlinkSync(path.join(root, "node_modules"), path.join(childRoot, "node_modules"), "dir");
      writeEsmWorkerScopes([path.dirname(childFile)]);
      const built = await build({
        entryPoints: [path.join(root, "src/lib/logExport/exportChild.ts")],
        outfile: childFile,
        bundle: true,
        platform: "node",
        packages: "external",
        format: "esm",
        metafile: true,
      });
      assert.ok(
        Object.keys(built.metafile.inputs).some((f) => f.endsWith("otlpRequestHeaders.ts"))
      );
      childArgs = [childFile];
    }
    for (const includeBodies of [false, true]) {
      const child = spawn(process.execPath, childArgs, {
        env: {
          DATA_DIR: dir,
          NODE_ENV: "test",
          NODE_OPTIONS: process.env.NODE_OPTIONS,
          HOME: process.env.HOME,
          TMPDIR: process.env.TMPDIR,
        },
        stdio: ["ignore", "pipe", "pipe", "ipc"],
      });
      let output = "";
      child.stderr!.on("data", (part) => {
        output += part.toString();
      });
      const replies: ExportChildReply[] = [];
      child.on("message", (message: ExportChildReply) => {
        replies.push(message);
        if (message.kind === "batch") child.send({ kind: "ack", cursorRowId: message.cursorRowId });
      });
      const timer = setTimeout(() => child.kill("SIGKILL"), 20000);
      try {
        child.send({
          kind: "start",
          destination: { id: "fixture", type: "otlp-http", name: "fixture" },
          config: config({
            endpoint: `http://127.0.0.1:${address.port}/v1/traces`,
            requestHeaderAllowlist: "x-project,Authorization,user-agent,x-sensitive-*,x-review",
            langfuseMapping,
          }),
          batchSize: 10,
          maxRowsPerRun: 10,
          includeBodies,
          maxBodyBytes: 1024,
          cursorRowId: 0,
        });
        const [code] = await once(child, "close");
        assert.equal(code, 0, output + JSON.stringify(replies));
        assert.deepEqual(
          replies.map((m) => m.kind),
          ["batch", "done"]
        );
        assert.deepEqual(replies[0], { kind: "batch", cursorRowId: 4, count: 4 });
      } finally {
        clearTimeout(timer);
        if (child.exitCode === null) child.kill("SIGKILL");
      }
      const sent = spans(payloads.at(-1)!)[0].attributes;
      assert.deepEqual(
        sent.find((a) => a.key === "http.request.header.x-project")?.value,
        includeBodies ? arr("persisted-client") : undefined
      );
      assert.equal(
        sent.some((a) => a.key === "http.request.header.authorization"),
        false
      );
      assert.equal(JSON.stringify(sent).includes("never-provider"), false);
      assert.deepEqual(
        sent.find((a) => a.key === "user_agent.original")?.value,
        includeBodies ? { stringValue: "ExampleClient/1.0" } : undefined
      );
      assert.equal(
        sent.some((a) => a.key.startsWith("http.request.header.x-sensitive-")),
        false
      );
      assert.equal(JSON.stringify(payloads.at(-1)).includes("synthetic-review-password-58"), false);
      assert.equal(
        sent.some((a) => a.key === "http.request.header.x-review"),
        false
      );
      assert.equal(
        JSON.stringify(payloads.at(-1)).includes(
          JSON.stringify(escapedQuotedCredential).slice(1, -1)
        ),
        false
      );
      const batch = spans(payloads.at(-1)!);
      assert.equal(batch.length, 4);
      for (const span of batch.slice(1))
        assert.equal(
          span.attributes.some((a) => a.key.startsWith("http.request.header.")),
          false
        );
    }
    assert.equal(payloads.length, 2);
  } finally {
    server.closeAllConnections();
    server.close();
    await once(server, "close");
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

test("real export child hydrates persisted artifacts only with includeBodies and sends headers", () =>
  exerciseExportChild());

test("compiled export child omits credential-valued headers through hydration and loopback HTTP", () =>
  exerciseExportChild(true));

test("compiled export child excludes canonical escaped credentials with Langfuse mapping", () =>
  exerciseExportChild(true, true));
