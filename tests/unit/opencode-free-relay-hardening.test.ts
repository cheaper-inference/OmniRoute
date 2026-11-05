/**
 * OpenCode free-tier Bun relay hardening: loopback-only plaintext, relay URL prefix, log
 * redaction, CRLF SSE framing, package-root script resolution and the non-loopback relay guard.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";
import { freeTierRelayUrl } from "../../open-sse/executors/opencodeFreeTierContract.ts";
import { filterInjectedToolCalls } from "../../open-sse/executors/opencodeInjectedToolFilter.ts";
import { isLoopbackHostname } from "../../open-sse/utils/urlHost.ts";
import { createRequestLogger } from "../../open-sse/utils/requestLogger.ts";
import { resolveRelayScript } from "../../src/lib/opencodeFreeRelay.ts";
import {
  assertSafeBind,
  assertSafeUpstream,
  createHandler,
  guardFromEnv,
} from "../../scripts/opencode-free-relay.ts";
import { OPENCODE_SESSION_PATTERN } from "../../open-sse/utils/opencodeHeaders.ts";

const FREE = "deepseek-v4.1-flash-free";
const RELAY = "http://127.0.0.1:20199";

function withEnv<T>(name: string, value: string | undefined, fn: () => T): T {
  const prev = process.env[name];
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
  try {
    return fn();
  } finally {
    if (prev === undefined) delete process.env[name];
    else process.env[name] = prev;
  }
}
const withRelay = <T>(value: string | undefined, fn: () => T) =>
  withEnv("OPENCODE_FREE_TIER_RELAY_URL", value, fn);

test("freeTierRelayUrl: plaintext http is refused off loopback; https and loopback pass", () => {
  assert.throws(() => withRelay("http://relay.example.com:20199", freeTierRelayUrl), /https/);
  assert.throws(() => withRelay("http://127.example.com:20199", freeTierRelayUrl), /https/);
  assert.throws(() => withRelay("http://10.0.0.5:20199", freeTierRelayUrl), /https/);
  assert.equal(
    withRelay("https://relay.example.com", freeTierRelayUrl),
    "https://relay.example.com"
  );
  assert.equal(withRelay("http://localhost:20199", freeTierRelayUrl), "http://localhost:20199");
  assert.equal(withRelay("http://127.0.0.2:20199", freeTierRelayUrl), "http://127.0.0.2:20199");
  assert.equal(withRelay("http://[::1]:20199", freeTierRelayUrl), "http://[::1]:20199");
});

test("isLoopbackHostname: literal 127.0.0.0/8 only, not DNS names starting with 127.", () => {
  for (const ok of ["localhost", "LOCALHOST", "::1", "[::1]", "127.0.0.1", "127.255.255.254"]) {
    assert.equal(isLoopbackHostname(ok), true, ok);
  }
  for (const bad of ["127.example.com", "127.0.0.1.evil.test", "127.0.0.256", "128.0.0.1", ""]) {
    assert.equal(isLoopbackHostname(bad), false, bad);
  }
  assert.equal(isLoopbackHostname(null), false);
});

test("buildUrl: a path on the relay URL does not prefix the upstream inference path", () => {
  const zen = new OpencodeExecutor("opencode-zen");
  withRelay(`${RELAY}/prefix/`, () => {
    assert.equal(zen.buildUrl(FREE, true), `${RELAY}/inference/v1/chat/completions`);
  });
});

test("request logger fully masks the relay proxy credentials and the relay token", async () => {
  const logger = await createRequestLogger("openai", "opencode-zen", FREE, {});
  logger.logTargetRequest(
    "http://127.0.0.1:20199/inference/v1/chat/completions",
    {
      "x-opencode-relay-proxy": "http://user:hunter2@proxy.example.com:8080",
      "x-opencode-relay-auth": "relay-secret-token-value-123",
    },
    {}
  );
  const headers = logger.getPipelinePayloads()?.providerRequest?.headers as Record<string, string>;
  assert.doesNotMatch(JSON.stringify(headers), /hunter2|user:|relay-secret/);
  assert.ok(headers["x-opencode-relay-proxy"]);
  assert.ok(headers["x-opencode-relay-auth"]);
});

test("buildHeaders: relay token header is sent only when configured", () => {
  const zen = new OpencodeExecutor("opencode-zen");
  const body = { model: FREE, messages: [{ role: "user", content: "hi" }] };
  const build = () =>
    withRelay(RELAY, () => zen.buildHeaders(null, true, null, FREE, undefined, body));
  assert.equal(
    withEnv("OPENCODE_FREE_RELAY_TOKEN", undefined, build)["x-opencode-relay-auth"],
    undefined
  );
  assert.equal(
    withEnv("OPENCODE_FREE_RELAY_TOKEN", "s3cret", build)["x-opencode-relay-auth"],
    "s3cret"
  );
});

test("filterInjectedToolCalls: CRLF-framed SSE split mid-separator is filtered per event", async () => {
  const chunk = (delta: unknown, finish: string | null = null) => ({
    choices: [{ index: 0, delta, finish_reason: finish }],
  });
  const frames = [
    chunk({ content: "hi" }),
    chunk({
      tool_calls: [
        { index: 0, id: "a", type: "function", function: { name: "bash", arguments: "{}" } },
      ],
    }),
    chunk({}, "tool_calls"),
    "[DONE]",
  ]
    .map((e) => `data: ${typeof e === "string" ? e : JSON.stringify(e)}\r\n\r\n`)
    .join("");
  const cut = frames.indexOf("\r\n\r\n") + 2;
  const enc = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    start(c) {
      c.enqueue(enc.encode(frames.slice(0, cut)));
      c.enqueue(enc.encode(frames.slice(cut)));
      c.close();
    },
  });
  const res = new Response(stream, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
  const out = await filterInjectedToolCalls(res, ["bash"]).text();
  assert.doesNotMatch(out, /bash/);
  assert.match(out, /"content":"hi"/);
  assert.match(out, /"finish_reason":"stop"/);
  assert.match(out, /\[DONE\]/);
});

test("resolveRelayScript: from the module's package root, not the cwd; override wins", () => {
  const prevCwd = process.cwd();
  const root = path.resolve(import.meta.dirname, "..", "..");
  const moduleUrl = pathToFileURL(path.join(root, "src", "lib", "opencodeFreeRelay.ts")).href;
  try {
    process.chdir(path.join(root, "tests"));
    const resolved = withEnv("OPENCODE_FREE_RELAY_SCRIPT", undefined, () =>
      resolveRelayScript(moduleUrl)
    );
    assert.equal(path.resolve(resolved), path.join(root, "scripts", "opencode-free-relay.ts"));
    assert.ok(fs.existsSync(resolved));
    assert.equal(
      withEnv("OPENCODE_FREE_RELAY_SCRIPT", "/x/relay.ts", () => resolveRelayScript(moduleUrl)),
      "/x/relay.ts"
    );
  } finally {
    process.chdir(prevCwd);
  }
});

test("relay guard: non-loopback bind needs a token, checks it per request, allowlists proxies", async () => {
  assert.doesNotThrow(() => assertSafeBind(guardFromEnv({})));
  assert.doesNotThrow(() =>
    assertSafeBind(guardFromEnv({ OPENCODE_FREE_RELAY_HOST: "127.0.0.1" }))
  );
  assert.throws(
    () => assertSafeBind(guardFromEnv({ OPENCODE_FREE_RELAY_HOST: "0.0.0.0" })),
    /TOKEN/
  );
  assert.throws(
    () => assertSafeBind(guardFromEnv({ OPENCODE_FREE_RELAY_HOST: "127.example.com" })),
    /TOKEN/
  );

  const guard = guardFromEnv({
    OPENCODE_FREE_RELAY_HOST: "0.0.0.0",
    OPENCODE_FREE_RELAY_TOKEN: "tok",
    OPENCODE_FREE_RELAY_PROXY_ALLOWLIST: "proxy.example.com:8080",
  });
  assert.equal(guard.exposed, true);
  const handler = createHandler(guard);
  const post = (headers: Record<string, string>) =>
    handler(
      new Request("http://relay/inference/v1/chat/completions", {
        method: "POST",
        headers,
        body: "{}",
      })
    );
  assert.equal((await post({})).status, 401);
  assert.equal((await post({ "x-opencode-relay-auth": "wrong" })).status, 401);
  assert.equal(
    (
      await post({
        "x-opencode-relay-auth": "tok",
        "x-opencode-relay-proxy": "http://evil.test:3128",
      })
    ).status,
    403
  );
  assert.equal((await handler(new Request("http://relay/health"))).status, 200);
});

test("relay: upstream must be https unless it is a loopback test origin", () => {
  assert.doesNotThrow(() => assertSafeUpstream("https://opencode.ai"));
  assert.doesNotThrow(() => assertSafeUpstream("http://127.0.0.1:9999"));
  assert.throws(() => assertSafeUpstream("http://opencode.ai"), /https/);
  assert.throws(() => assertSafeUpstream("http://127.example.com"), /https/);
});

test("relay: direct egress disables the proxy explicitly, a supplied proxy is passed through", async () => {
  const realFetch = globalThis.fetch;
  const seen: Array<Record<string, unknown>> = [];
  globalThis.fetch = (async (_url: unknown, init?: Record<string, unknown>) => {
    seen.push(init ?? {});
    return new Response("{}", { status: 200 });
  }) as typeof fetch;
  try {
    const handler = createHandler(guardFromEnv({}));
    const post = (headers: Record<string, string>) =>
      handler(
        new Request("http://relay/inference/v1/chat/completions", {
          method: "POST",
          headers,
          body: "{}",
        })
      );
    await post({});
    await post({ "x-opencode-relay-proxy": "http://proxy.example.com:8080" });
    assert.equal(seen[0].proxy, false);
    assert.equal(seen[1].proxy, "http://proxy.example.com:8080");
  } finally {
    globalThis.fetch = realFetch;
  }
});

test("filterInjectedToolCalls: a nameless first delta is held until the name decides", async () => {
  const chunk = (delta: unknown, finish: string | null = null) => ({
    choices: [{ index: 0, delta, finish_reason: finish }],
  });
  const run = async (name: string) => {
    const events = [
      chunk({
        tool_calls: [{ index: 0, id: "a", type: "function", function: { arguments: '{"x"' } }],
      }),
      chunk({ tool_calls: [{ index: 0, function: { name, arguments: ":1}" } }] }),
      chunk({}, "tool_calls"),
    ];
    const body = events.map((e) => `data: ${JSON.stringify(e)}\n\n`).join("");
    const res = new Response(body, {
      status: 200,
      headers: { "content-type": "text/event-stream" },
    });
    return filterInjectedToolCalls(res, ["bash"]).text();
  };
  const dropped = await run("bash");
  assert.doesNotMatch(dropped, /"x"|bash|:1\}/);
  assert.match(dropped, /"finish_reason":"stop"/);
  const kept = await run("get_weather");
  assert.match(kept, /\{\\"x\\"/);
  assert.match(kept, /get_weather/);
  assert.match(kept, /"finish_reason":"tool_calls"/);
});

function sessionAged(days: number): string {
  const ts = (BigInt(Date.now()) - BigInt(days) * 86_400_000n) & 0xfffffffffn;
  const value = ~((ts << 12n) | 1n) & 0xffffffffffffn;
  return `ses_${value.toString(16).padStart(12, "0")}abcdefghijklmn`;
}

test("buildHeaders: relay mode re-mints a valid caller session older than 17 days, keeps a recent one", () => {
  const zen = new OpencodeExecutor("opencode-zen");
  const body = { model: FREE, messages: [{ role: "user", content: "hi" }] };
  const build = (session: string) =>
    withRelay(RELAY, () =>
      zen.buildHeaders(null, true, { "x-opencode-session": session }, FREE, undefined, body)
    )["x-opencode-session"];
  const old = sessionAged(30);
  assert.match(old, OPENCODE_SESSION_PATTERN);
  const reminted = build(old);
  assert.notEqual(reminted, old);
  assert.match(reminted, OPENCODE_SESSION_PATTERN);
  assert.equal(build(old), reminted, "stable per conversation");
  const recent = sessionAged(2);
  assert.equal(build(recent), recent);
});
