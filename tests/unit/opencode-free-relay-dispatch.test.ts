/**
 * OpenCode free-tier Bun relay dispatch: what stays true of a request once its URL points at
 * the relay. Failures do not leak the proxy URL, the egress of the real upstream keeps being
 * tracked, kept tool calls stay contiguous and the accepted tool schemas stay recorded.
 */
import { after, afterEach, before, beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import net from "node:net";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";
import type { ExecutorLog, ProviderCredentials } from "../../open-sse/executors/base.ts";
import {
  noteFreeTierOutcome,
  prepareFreeTierRequest,
} from "../../open-sse/executors/opencodeFreeTierContract.ts";
import { relayEgressUrl } from "../../open-sse/executors/opencodeRelay.ts";
import { filterInjectedToolCalls } from "../../open-sse/executors/opencodeInjectedToolFilter.ts";
import {
  _resetToolObservationForTests,
  recordedToolParameters,
  setToolSchemaMemoryGate,
} from "../../open-sse/executors/opencodeToolObservation.ts";
import {
  runWithAppliedProxyCapture,
  runWithProxyContext,
} from "../../open-sse/utils/proxyFetch.ts";
import { runInRequestContext } from "../../open-sse/executors/opencodeRequestContext.ts";
import {
  __resetProxyRefusalMemoryForTesting,
  isProxyAvoided,
  proxyEgressKey,
} from "../../open-sse/utils/proxyRefusalMemory.ts";
import { createHandler, guardFromEnv } from "../../scripts/ops/opencode-free-relay.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

const FREE = "deepseek-v4.1-flash-free";
const RELAY = "http://127.0.0.1:20199";
const RELAY_ENV = "OPENCODE_FREE_TIER_RELAY_URL";
const FPS = ["a", "b"].map((c) => c.repeat(32));
const log: ExecutorLog = { debug() {}, info() {}, warn() {}, error() {} };

let proxyServer: net.Server;
let proxyPort = 0;
let originalFetch: typeof globalThis.fetch;
let priorRelay: string | undefined;

before(async () => {
  proxyServer = net.createServer((socket) => socket.destroy());
  await new Promise<void>((resolve) => proxyServer.listen(0, "127.0.0.1", () => resolve()));
  proxyPort = (proxyServer.address() as net.AddressInfo).port;
});

after(() => {
  proxyServer.close();
  resetDbInstance();
});

beforeEach(() => {
  originalFetch = globalThis.fetch;
  priorRelay = process.env[RELAY_ENV];
  process.env[RELAY_ENV] = RELAY;
  __resetProxyRefusalMemoryForTesting();
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  if (priorRelay === undefined) delete process.env[RELAY_ENV];
  else process.env[RELAY_ENV] = priorRelay;
});

function sse(events: unknown[]): Response {
  const body = events.map((e) => `data: ${JSON.stringify(e)}\n\n`).join("");
  return new Response(body, { status: 200, headers: { "content-type": "text/event-stream" } });
}

const toolDelta = (entry: unknown) => ({
  choices: [{ index: 0, delta: { tool_calls: [entry] }, finish_reason: null }],
});

function toolIndexes(text: string): Array<[number, string | undefined]> {
  const seen: Array<[number, string | undefined]> = [];
  for (const line of text.split("\n")) {
    if (!line.startsWith("data: ")) continue;
    const parsed = JSON.parse(line.slice(6));
    for (const call of parsed.choices?.[0]?.delta?.tool_calls ?? []) {
      seen.push([call.index, call.function?.name]);
    }
  }
  return seen;
}

test("relay: an upstream failure answers a static 502 and logs no credential", async () => {
  globalThis.fetch = (async () => {
    throw new Error("connect ECONNREFUSED http://user:s3cret@10.9.9.9:3128");
  }) as typeof fetch;
  const originalWarn = console.warn;
  const warned: string[] = [];
  console.warn = (...args: unknown[]) => void warned.push(args.join(" "));
  try {
    const res = await createHandler(guardFromEnv({}))(
      new Request("http://relay/inference/v1/chat/completions", {
        method: "POST",
        headers: { "x-opencode-relay-proxy": "http://user:s3cret@10.9.9.9:3128" },
        body: "{}",
      })
    );
    assert.equal(res.status, 502);
    assert.deepEqual(await res.json(), { error: "relay upstream failure" });
  } finally {
    console.warn = originalWarn;
  }
  const logged = warned.join("\n");
  assert.match(logged, /ECONNREFUSED/, "the detail stays available server-side");
  assert.doesNotMatch(logged, /s3cret|user:/);
});

test("relay mode: a 429 under an ambient proxy still sets that proxy aside", async () => {
  const seen: Array<{ url: string; proxy: string | null }> = [];
  globalThis.fetch = (async (url: RequestInfo | URL, init?: RequestInit) => {
    const headers = new Headers(init?.headers);
    seen.push({ url: String(url), proxy: headers.get("x-opencode-relay-proxy") });
    return new Response(JSON.stringify({ error: { message: "rate limit reached, try again" } }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof globalThis.fetch;
  const proxy = { type: "http", host: "127.0.0.1", port: proxyPort };
  const credentials: ProviderCredentials = {
    apiKey: "sk-test",
    accessToken: null,
    connectionId: "noauth",
    providerSpecificData: { fingerprints: FPS },
  };
  const executor = new OpencodeExecutor("opencode-zen");
  await runInRequestContext(() =>
    runWithAppliedProxyCapture({}, () =>
      runWithProxyContext(proxy, () =>
        executor.execute({
          model: FREE,
          body: { model: FREE, messages: [{ role: "user", content: "hi" }] },
          stream: true,
          credentials,
          log,
        })
      )
    )
  );
  assert.ok(seen.length > 0);
  assert.ok(seen.every((call) => call.url.startsWith(`${RELAY}/inference/v1/`)));
  assert.ok(seen[0].proxy?.includes(`:${proxyPort}`), "the relay is told about the egress");
  assert.equal(isProxyAvoided(proxyEgressKey(proxy)), true);
});

test("relayEgressUrl: names the real upstream, and leaves everything else alone", () => {
  const path = "/inference/v1/chat/completions";
  assert.equal(relayEgressUrl(`${RELAY}${path}`), `https://opencode.ai${path}`);
  const paid = "https://opencode.ai/zen/v1/chat/completions";
  assert.equal(relayEgressUrl(paid), paid);
  // A relay URL the gated path refuses must not break a paid request that never uses it.
  process.env[RELAY_ENV] = "http://10.0.0.5:20199";
  assert.equal(relayEgressUrl(paid), paid);
  delete process.env[RELAY_ENV];
  assert.equal(relayEgressUrl(`${RELAY}${path}`), `${RELAY}${path}`);
});

test("filterInjectedToolCalls: kept calls are renumbered from 0 in arrival order", async () => {
  const res = sse([
    toolDelta({ index: 0, id: "a", type: "function", function: { name: "bash", arguments: "" } }),
    toolDelta({ index: 1, id: "b", type: "function", function: { name: "one", arguments: "" } }),
    toolDelta({ index: 0, function: { arguments: "{}" } }),
    toolDelta({ index: 2, id: "c", type: "function", function: { name: "read", arguments: "" } }),
    toolDelta({ index: 3, id: "d", type: "function", function: { arguments: "{" } }),
    toolDelta({ index: 3, function: { name: "two", arguments: "}" } }),
    toolDelta({ index: 1, function: { arguments: "{}" } }),
    { choices: [{ index: 0, delta: {}, finish_reason: "tool_calls" }] },
  ]);
  const text = await filterInjectedToolCalls(res, ["bash", "read"]).text();
  assert.deepEqual(toolIndexes(text), [
    [0, "one"],
    [1, undefined],
    [1, "two"],
    [0, undefined],
  ]);
  assert.match(text, /"finish_reason":"tool_calls"/);
});

test("relay mode: an accepted request records the schemas the caller declared", () => {
  setToolSchemaMemoryGate(() => true);
  _resetToolObservationForTests();
  const parameters = { type: "object", properties: { city: { type: "string" } } };
  const body = {
    model: FREE,
    messages: [{ role: "user", content: "hi" }],
    tools: [{ type: "function", function: { name: "get_weather", parameters } }],
  };
  try {
    const { attempt } = prepareFreeTierRequest(body, "openai", "zen", "opencode-zen", FREE, "s1");
    noteFreeTierOutcome(attempt, true);
    assert.deepEqual(recordedToolParameters("opencode-zen", FREE, "s1", "get_weather"), parameters);
  } finally {
    _resetToolObservationForTests();
    setToolSchemaMemoryGate(null);
  }
});
