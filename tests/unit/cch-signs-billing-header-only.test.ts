/**
 * CCH signing must only touch the `cch=00000;` placeholder inside the
 * billing-header block, never user text that merely looks like `cch=xxxxx;`.
 *
 * The billing header is injected as system block[0]
 * (`x-anthropic-billing-header: cc_version=…; cc_entrypoint=…; cch=00000;`).
 * The CLI fingerprint serialises `messages` before `system`, so the old
 * first-match `cch=[0-9a-f]{5};` rewrite hit user text (for example a tool
 * result quoting this repo's own source) and left the real header unsigned.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { computeCCH, signRequestBody } from "../../open-sse/services/claudeCodeCCH.ts";

const realFetch = globalThis.fetch;
type Call = { url: string; body: string };
function stubFetch() {
  const calls: Call[] = [];
  globalThis.fetch = (async (url: RequestInfo | URL, init?: RequestInit) => {
    const body = String(init?.body ?? "");
    if (!body) return new Response("{}", { status: 200 }); // background bootstrap GET
    calls.push({ url: String(url), body });
    return new Response("{}", { status: 200 });
  }) as typeof fetch;
  return calls;
}

const CLI_HEADERS = { "user-agent": "claude-cli/2.1.0 (external, cli)", "x-app": "cli" };
const oauth = () => ({
  accessToken: "test-token",
  connectionId: "cch-c1",
  providerSpecificData: {},
});

describe("signRequestBody anchors on the billing header", () => {
  it("signs the billing header placeholder and leaves cch-like user text untouched", async () => {
    const body =
      '{"model":"claude-sonnet-4-5","messages":[{"role":"user","content":[{"type":"text","text":"log line: cch=abcde; keep me"}]}],' +
      '"system":[{"type":"text","text":"x-anthropic-billing-header: cc_version=2.1.280.1e2; cc_entrypoint=cli; cch=00000;"}]}';
    const signed = await signRequestBody(body);
    assert.ok(signed.includes("log line: cch=abcde; keep me"), "user text must not be rewritten");
    assert.ok(!signed.includes("cch=00000;"), "billing header must carry the signed value");
    assert.match(
      signed,
      /cc_entrypoint=cli; cch=[0-9a-f]{5};/,
      "signed token must be in the billing header"
    );
  });

  it("signs the real billing header when user text starts like a billing header", async () => {
    const lookalike =
      "x-anthropic-billing-header: cc_version=9.9.9.abc; cc_entrypoint=cli; cch=00000;";
    const body =
      `{"messages":[{"role":"user","content":[{"type":"text","text":"${lookalike}"}]}],` +
      '"system":[{"type":"text","text":"x-anthropic-billing-header: cc_version=2.1.280.1e2; cc_entrypoint=cli; cch=00000;"}]}';
    const signed = await signRequestBody(body);
    const parsed = JSON.parse(signed);
    assert.equal(parsed.messages[0].content[0].text, lookalike, "user text must not be rewritten");
    assert.match(
      parsed.system[0].text,
      /cc_entrypoint=cli; cch=(?!00000)[0-9a-f]{5};$/,
      "the real billing header must carry the signed value"
    );
  });

  it("leaves a billing-header-like user text alone when the body has no billing header", async () => {
    const body =
      '{"messages":[{"role":"user","content":[{"type":"text","text":"x-anthropic-billing-header: cc_version=9.9.9.abc; cc_entrypoint=cli; cch=00000;"}]}]}';
    const signed = await signRequestBody(body);
    assert.equal(signed, body, "no billing header means nothing to sign");
  });

  it("does not reach past an already-signed billing header into later user text", async () => {
    const body =
      '{"system":[{"type":"text","text":"x-anthropic-billing-header: cc_version=2.1.280.1e2; cc_entrypoint=cli; cch=a3ae1;"}],' +
      '"messages":[{"role":"user","content":"quote: cch=00000; end"}]}';
    const signed = await signRequestBody(body);
    assert.equal(signed, body, "the placeholder search must stay inside the billing header value");
  });

  it("returns the body unchanged when no billing header exists (cch-like user text only)", async () => {
    const body =
      '{"model":"claude-sonnet-4-5","messages":[{"role":"user","content":"see cch=abcde; in the log"}]}';
    const signed = await signRequestBody(body);
    assert.equal(signed, body, "no billing header means nothing to sign");
  });

  it("returns the body unchanged when the billing header has no placeholder", async () => {
    const body =
      '{"system":[{"type":"text","text":"x-anthropic-billing-header: cc_version=2.1.280.1e2; cc_entrypoint=cli; cch=a3ae1;"}]}';
    const signed = await signRequestBody(body);
    assert.equal(signed, body, "an already-signed header must pass through");
  });

  it("hashes the body bytes that still contain the placeholder", async () => {
    const body =
      '{"system":[{"type":"text","text":"x-anthropic-billing-header: cc_version=2.1.280.1e2; cc_entrypoint=cli; cch=00000;"}]}';
    const signed = await signRequestBody(body);
    const expected = await computeCCH(new TextEncoder().encode(body));
    assert.ok(
      signed.includes(`cc_entrypoint=cli; cch=${expected};`),
      "token must be the hash over the placeholder bytes"
    );
  });

  it("still signs a legacy top-level-key billing header", async () => {
    const body =
      '{"x-anthropic-billing-header":"cc_version=2.1.280.1e2; cch=00000;","model":"claude"}';
    const signed = await signRequestBody(body);
    assert.ok(!signed.includes("cch=00000"), "key-form placeholder must still be replaced");
  });
});

describe("wire: executor CCH signing", () => {
  it("does not rewrite user text that looks like cch=xxxxx; and signs the real header", async () => {
    const calls = stubFetch();
    await new DefaultExecutor("claude").execute({
      model: "claude-sonnet-4-5",
      body: {
        model: "claude-sonnet-4-5",
        max_tokens: 64,
        messages: [
          { role: "user", content: [{ type: "text", text: "log line: cch=abcde; keep me" }] },
        ],
      },
      stream: false,
      credentials: oauth(),
      clientHeaders: CLI_HEADERS,
    } as never);
    globalThis.fetch = realFetch;
    const sent = JSON.parse(calls[0].body);
    assert.equal(
      sent.messages[0].content[0].text,
      "log line: cch=abcde; keep me",
      "user text must not be rewritten"
    );
    assert.doesNotMatch(
      sent.system[0].text,
      /cch=00000;/,
      "billing header must carry the signed value"
    );
  });

  it("leaves a plain API-key request with cch-like user text completely untouched", async () => {
    const calls = stubFetch();
    await new DefaultExecutor("claude").execute({
      model: "claude-sonnet-4-5",
      body: {
        model: "claude-sonnet-4-5",
        max_tokens: 64,
        messages: [{ role: "user", content: "see cch=abcde; in the log" }],
      },
      stream: false,
      credentials: { apiKey: "test-key", connectionId: "cch-c2", providerSpecificData: {} },
    } as never);
    globalThis.fetch = realFetch;
    const sent = JSON.parse(calls[0].body);
    assert.equal(sent.messages[0].content, "see cch=abcde; in the log");
  });

  it("control: with no cch-like user text the billing header is signed", async () => {
    const calls = stubFetch();
    await new DefaultExecutor("claude").execute({
      model: "claude-sonnet-4-5",
      body: {
        model: "claude-sonnet-4-5",
        max_tokens: 64,
        messages: [{ role: "user", content: "hello" }],
      },
      stream: false,
      credentials: oauth(),
      clientHeaders: CLI_HEADERS,
    } as never);
    globalThis.fetch = realFetch;
    const billing = JSON.parse(calls[0].body).system[0].text;
    assert.doesNotMatch(billing, /cch=00000;/, "billing header must carry the signed value");
    assert.match(billing, /cch=[0-9a-f]{5};/);
  });
});
