/**
 * #19073: when no StreamGenerate response arrives, gemini-web answered a bare
 * 502 "No response from Gemini". That hides whether the page sent nothing, posted to
 * another endpoint, or posted to StreamGenerate with a body the parser could not read.
 * The 502 now carries a code and the response URLs (origin + path only) seen while
 * waiting, so the three cases can be told apart from the error alone.
 */
import test from "node:test";
import assert from "node:assert/strict";

const playwright = await import("playwright");
const { GeminiWebExecutor } = await import("../../open-sse/executors/gemini-web.ts");

type Handler = (resp: { url: () => string; text: () => Promise<string> }) => Promise<void>;

function fakeResponse(url: string, body = ""): { url: () => string; text: () => Promise<string> } {
  return { url: () => url, text: async () => body };
}

/** A browser whose page replays `responses` as soon as the prompt is submitted. */
function stubLaunch(responses: Array<{ url: () => string; text: () => Promise<string> }>) {
  let onResponse: Handler | null = null;
  playwright.chromium.launch = (async () => ({
    newContext: async () => ({
      addCookies: async () => {},
      newPage: async () => ({
        on: (event: string, handler: Handler) => {
          if (event === "response") onResponse = handler;
        },
        goto: async () => {},
        waitForTimeout: async () => {},
        waitForSelector: async () => ({ click: async () => {} }),
        keyboard: {
          type: async () => {},
          insertText: async () => {},
          press: async () => {
            for (const resp of responses) await onResponse?.(resp);
          },
        },
      }),
    }),
    close: async () => {},
  })) as unknown as typeof playwright.chromium.launch;
}

async function run(): Promise<{ status: number; body: Record<string, unknown> }> {
  const executor = new GeminiWebExecutor();
  const result = await executor.execute({
    model: "gemini-3.1-pro",
    body: { messages: [{ role: "user", content: "hello" }], stream: false },
    stream: false,
    credentials: { apiKey: "__Secure-1PSID=test-psid" },
    signal: AbortSignal.timeout(5000),
    log: null,
  });
  return { status: result.response.status, body: await result.response.json() };
}

const originalLaunch = playwright.chromium.launch;
test.afterEach(() => {
  playwright.chromium.launch = originalLaunch;
});

test("no StreamGenerate response: the 502 names the code and the other response URLs seen", async () => {
  stubLaunch([
    fakeResponse(
      "https://gemini.google.com/_/BardChatUi/data/batchexecute?rpcids=abc&f.sid=12345&_reqid=9"
    ),
    fakeResponse("https://play.google.com/log?format=json&hasfast=true"),
    fakeResponse("https://gemini.google.com/_/BardChatUi/data/batchexecute?rpcids=def"),
  ]);

  const { status, body } = await run();

  assert.equal(status, 502);
  assert.equal(body.error, "No response from Gemini");
  assert.equal(body.code, "gemini_web_no_response");
  // Origin and path only, de-duplicated, in the order first seen: no query strings.
  assert.deepEqual(body.seen_response_urls, [
    "https://gemini.google.com/_/BardChatUi/data/batchexecute",
    "https://play.google.com/log",
  ]);
  assert.doesNotMatch(JSON.stringify(body), /f\.sid|12345/);
});

test("a StreamGenerate response the parser cannot read is reported as unparseable", async () => {
  stubLaunch([
    fakeResponse(
      "https://gemini.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate?bl=x",
      "garbage"
    ),
  ]);

  const { status, body } = await run();

  assert.equal(status, 502);
  assert.equal(body.code, "gemini_web_unparseable_response");
  assert.deepEqual(body.seen_response_urls, [
    "https://gemini.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate",
  ]);
});

test("no response at all: an empty seen list and the no-response code", async () => {
  stubLaunch([]);

  const { status, body } = await run();

  assert.equal(status, 502);
  assert.equal(body.code, "gemini_web_no_response");
  assert.deepEqual(body.seen_response_urls, []);
});
