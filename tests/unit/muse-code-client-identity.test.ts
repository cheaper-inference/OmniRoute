import test from "node:test";
import assert from "node:assert/strict";
import { MuseCodeExecutor } from "../../open-sse/executors/muse-code.ts";
import {
  MUSE_CODE_CLIENT_BUILD,
  MUSE_CODE_CLIENT_VERSION,
  museCodeClientUserAgent,
} from "../../open-sse/config/museCode.ts";
import { __resetMuseCodeSessionsForTesting } from "../../open-sse/executors/museCodeIdentity.ts";
import { getRegistryEntry } from "../../open-sse/config/providerRegistry.ts";

// Muse Code subscription keys serve requests that look like the Muse Code client. These are the
// headers Muse Code 1.4.14-R7309.1 sends on POST /v1/responses (captured from the official
// binary): one UUIDv7 session id repeated across the session headers, the exec surface id, and
// the non-interactive build user agent. It sends no contributor-mode header: the model id picks it.

const UUID_V7 = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const SESSION_HEADERS = [
  "X-Tbh-Session-Id",
  "X-Meta-Ai-Gateway-Session-Id",
  "X-Tbh-Thread-Id",
  "X-Tbh-Root-Session-Id",
];
const credentials = { accessToken: "test-inference-key" };

/** Builds inference headers with optional client session metadata and fixture credentials. */
function headersFor(
  clientHeaders: Record<string, string> | null = null,
  body?: unknown,
  requestCredentials: Record<string, unknown> = credentials
) {
  return new MuseCodeExecutor().buildHeaders(
    requestCredentials,
    true,
    clientHeaders,
    "muse-spark-1.3",
    undefined,
    body
  ) as Record<string, string>;
}

test("inference requests carry the Muse Code client identity", () => {
  __resetMuseCodeSessionsForTesting();
  const headers = headersFor();
  assert.equal(headers["User-Agent"], museCodeClientUserAgent());
  assert.match(
    headers["User-Agent"],
    new RegExp(
      `^muse-build/${MUSE_CODE_CLIENT_VERSION.replace(/\./g, "\\.")} \\(non-interactive; (linux|macos|windows)-(x86_64|aarch64); build ${MUSE_CODE_CLIENT_BUILD}\\)$`
    )
  );
  assert.equal(headers["X-Client-Id"], "tbh:exec");
  assert.equal(headers["X-Tbh-Agent-Role"], "main");
  assert.match(headers.traceparent, /^00-[0-9a-f]{32}-[0-9a-f]{16}-01$/);
  const session = headers["X-Tbh-Session-Id"];
  assert.match(session, UUID_V7);
  for (const name of SESSION_HEADERS) assert.equal(headers[name], session, name);
  assert.equal(headers.Authorization, "Bearer test-inference-key");
  assert.equal(
    Object.keys(headers).some((name) => name.toLowerCase() === "x-tbh-contributor-mode"),
    false
  );
});

test("one client session keeps one Muse session id; another session gets its own", () => {
  __resetMuseCodeSessionsForTesting();
  const a1 = headersFor({ "x-opencode-session": "ses_a" })["X-Tbh-Session-Id"];
  const a2 = headersFor({ "x-opencode-session": "ses_a" })["X-Tbh-Session-Id"];
  const b = headersFor({ "x-opencode-session": "ses_b" })["X-Tbh-Session-Id"];
  const fromMetadata = headersFor(null, { metadata: { session_id: "ses_a" } })["X-Tbh-Session-Id"];
  assert.equal(a1, a2);
  assert.notEqual(a1, b);
  assert.equal(fromMetadata, a1);
  // The trace id is per request, as on the real client.
  assert.notEqual(
    headersFor({ "x-opencode-session": "ses_a" }).traceparent,
    headersFor({ "x-opencode-session": "ses_a" }).traceparent
  );
});

test("requests without a client session each get a fresh Muse session", () => {
  __resetMuseCodeSessionsForTesting();
  assert.notEqual(headersFor()["X-Tbh-Session-Id"], headersFor()["X-Tbh-Session-Id"]);
});

test("the same client session on another connection gets its own Muse session", () => {
  __resetMuseCodeSessionsForTesting();
  const session = { "x-opencode-session": "ses_a" };
  const on = (connectionId: string) =>
    headersFor(session, undefined, { ...credentials, connectionId })["X-Tbh-Session-Id"];
  assert.equal(on("conn-1"), on("conn-1"));
  assert.notEqual(on("conn-1"), on("conn-2"));
});

test("the MUSE_CODE_USER_AGENT override reaches the wire", (t) => {
  const previous = process.env.MUSE_CODE_USER_AGENT;
  t.after(() => {
    if (previous === undefined) delete process.env.MUSE_CODE_USER_AGENT;
    else process.env.MUSE_CODE_USER_AGENT = previous;
  });
  process.env.MUSE_CODE_USER_AGENT = "muse-build/9.9.9 (operator)";
  const headers = headersFor();
  assert.equal(headers["User-Agent"], "muse-build/9.9.9 (operator)");
  assert.equal(headers["X-Client-Id"], "tbh:exec");
  delete process.env.MUSE_CODE_USER_AGENT;
  assert.equal(headersFor()["User-Agent"], museCodeClientUserAgent());
});

test("the provider registry advertises the current client identity, not the retired 1.3.0 build", () => {
  const headers = (getRegistryEntry("muse-code") as { extraHeaders?: Record<string, string> })
    .extraHeaders;
  assert.equal(headers?.["User-Agent"], museCodeClientUserAgent());
  assert.equal(headers?.["X-Client-Id"], "tbh:exec");
  assert.doesNotMatch(JSON.stringify(headers), /muse-build\/1\.3\.0/);
});

test("another client's attribution headers are not forwarded to Muse Code", () => {
  __resetMuseCodeSessionsForTesting();
  const headers = headersFor({
    "User-Agent": "opencode/1.2.3",
    "x-opencode-session": "ses_a",
    "x-opencode-request": "req_1",
    "x-opencode-project": "proj",
    "x-opencode-client": "cli",
    "x-session-id": "sid",
    "x-title": "Some App",
    "http-referer": "https://example.app",
  });
  const names = Object.keys(headers).map((name) => name.toLowerCase());
  for (const forbidden of [
    "x-opencode-session",
    "x-opencode-request",
    "x-opencode-project",
    "x-opencode-client",
    "x-session-id",
    "x-title",
    "http-referer",
  ])
    assert.equal(names.includes(forbidden), false, forbidden);
  assert.equal(headers["User-Agent"], museCodeClientUserAgent());
  // The client's session still selects the Muse session, without leaving OmniRoute.
  assert.equal(
    headers["X-Tbh-Session-Id"],
    headersFor({ "x-opencode-session": "ses_a" })["X-Tbh-Session-Id"]
  );
});
