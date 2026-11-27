import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import test from "node:test";
import { spawnSync } from "node:child_process";
import { AsyncLocalStorage } from "node:async_hooks";
import { channel } from "node:diagnostics_channel";
import { fileURLToPath } from "node:url";
import {
  startCacheDiagnostics,
  supportsCacheBodyDiagnostics,
} from "../../bin/cli/runtime/cacheDiagnostics.mjs";
import {
  rawCacheUsage,
  createCacheUsageParser,
} from "../../bin/cli/runtime/cacheDiagnosticsProtocol.mjs";
import { createCacheDiagnosticsSink } from "../../bin/cli/runtime/cacheDiagnosticsSink.mjs";
import { buildNodeRuntimeArgs } from "../../scripts/build/runtime-env.mjs";
const root = fileURLToPath(new URL("../..", import.meta.url));
test("raw nested aliases retain explicit zero precedence and absent values", () => {
  assert.deepEqual(rawCacheUsage({}), {
    inputTokens: null,
    outputTokens: null,
    cacheReadTokens: null,
    cacheWriteTokens: null,
  });
  assert.equal(
    rawCacheUsage({
      cache_creation_input_tokens: 0,
      input_tokens_details: { cache_write_tokens: 9 },
    }).cacheWriteTokens,
    0
  );
  assert.equal(
    rawCacheUsage({ input_tokens_details: { cache_write_tokens: 9, cached_tokens: 0 } })
      .cacheWriteTokens,
    9
  );
  assert.equal(
    rawCacheUsage({ prompt_tokens_details: { cache_write_tokens: 3 } }).cacheWriteTokens,
    3
  );
});
test("usage reporting requires a numeric counter and preserves explicit zero", () => {
  const invalid = createCacheUsageParser();
  invalid.push('data: {"usage":{"input_tokens":"unknown","output_tokens":-1}}\n\n');
  assert.equal(invalid.finish().status, "unavailable");

  const partial = createCacheUsageParser();
  partial.push('data: {"usage":{"input_tokens":0}}\n\n');
  partial.push('data: {"usage":{"input_tokens":"unknown"}}\n\n');
  assert.equal(partial.finish().status, "reported");
  assert.equal(partial.finish().inputTokens, 0);
});

test("a failed response event records termination independently of usage", () => {
  const parser = createCacheUsageParser();
  parser.push('data: {"type":"response.failed"}\n\n');
  assert.equal(parser.finish().terminal, true);
  assert.equal(parser.finish().status, "unavailable");
});

test("SSE recognizes each newline style and split mixed line endings", () => {
  for (const newline of ["\r", "\n", "\r\n"]) {
    const parser = createCacheUsageParser();
    const stream = Buffer.from(
      ['data: {"usage":{"input_tokens":3}}', "", "data: [DONE]", "", ""].join(newline)
    );
    for (const byte of stream) parser.push(Buffer.from([byte]));
    assert.equal(parser.finish().inputTokens, 3, JSON.stringify(newline));
    assert.equal(parser.finish().terminal, true, JSON.stringify(newline));
  }

  const mixed = createCacheUsageParser();
  mixed.push('data: {"usage":\r');
  mixed.push('\ndata: {"input_tokens":7}}\n\r');
  assert.equal(mixed.finish().inputTokens, 7);
});

test("SSE byte limits exclude the frame separator across every split", () => {
  const frame = 'data: {"usage":{"input_tokens":12},"output":"فارسی 😀"}';
  const maxFrameBytes = Buffer.byteLength(frame);
  const separator = "\r\n\r\n";
  for (let split = 0; split <= separator.length; split++) {
    const parser = createCacheUsageParser({ maxFrameBytes });
    parser.push(Buffer.from(frame + separator.slice(0, split)));
    parser.push(Buffer.from(separator.slice(split)));
    assert.equal(parser.finish().status, "reported", `delimiter split ${split}`);
    assert.equal(parser.finish().inputTokens, 12);
  }
  const oversized = createCacheUsageParser({ maxFrameBytes });
  oversized.push(Buffer.from(frame + " " + separator));
  assert.equal(oversized.finish().status, "oversized");
});

test("fragmented UTF-8 SSE, JSON, missing terminal events and oversized frames remain distinguishable", () => {
  const input = Buffer.from(
    'data: {"type":"response.completed","response":{"usage":{"input_tokens":12,"input_tokens_details":{"cached_tokens":0}},"output":"فارسی 😀"}}\r\n\r\n'
  );
  const parser = createCacheUsageParser();
  for (const byte of input) parser.push(Buffer.from([byte]));
  assert.deepEqual(parser.finish(), {
    inputTokens: 12,
    outputTokens: null,
    cacheReadTokens: 0,
    cacheWriteTokens: null,
    terminal: true,
    status: "reported",
  });
  const json = createCacheUsageParser({ sse: false });
  json.push(Buffer.from('{"usage":{"prompt_tokens_details":{"cache_write_tokens":4}}}'));
  assert.equal(json.finish().cacheWriteTokens, 4);
  assert.equal(createCacheUsageParser().finish().terminal, false);
  const oversized = createCacheUsageParser({ maxFrameBytes: 20 });
  oversized.push(Buffer.from("x".repeat(21)));
  assert.equal(oversized.finish().status, "oversized");
});

test(
  "deferred captures are canceled when requests fail before processing",
  {
    skip: !supportsCacheBodyDiagnostics(),
  },
  async () => {
    const rows = [];
    const observer = startCacheDiagnostics({
      env: { OMNIROUTE_CACHE_DIAGNOSTICS: "1", OMNIROUTE_TOKEN_BREAKDOWN: "1" },
      sinkFactory: () => ({ write: (row) => rows.push(row), async close() {} }),
      tokenCounter: {
        async submit() {
          return { status: "busy" };
        },
        async stop() {},
      },
      log() {},
    });
    const key = Symbol.for("omniroute.providerRequestCapture.state");
    const previous = globalThis[key];
    const context = new AsyncLocalStorage();
    globalThis[key] = { context };
    const publish = (name, request, extra = {}) =>
      channel(`undici:request:${name}`).publish({ request, ...extra });
    try {
      context.run({ capture: { diagnosticsOptOut: false } }, () => {
        for (let index = 0; index < 13; index++) {
          const request = {
            origin: "https://api.openai.com",
            path: "/v1/responses",
            method: "POST",
          };
          publish("create", request);
          publish("bodyChunkSent", request, { chunk: Buffer.from('{"input":"synthetic"}') });
          publish("bodySent", request);
          publish(index < 12 ? "error" : "trailers", request);
        }
      });
      await new Promise((resolve) => setImmediate(resolve));
      assert.equal(rows.filter((row) => row.status === "transport_error").length, 12);
      assert.equal(rows.filter((row) => row.event === "token_breakdown").length, 1);
      assert.match(
        rows.find((row) => row.requestState === "captured").requestFingerprint,
        /^[a-f0-9]{64}$/
      );
    } finally {
      await observer.stop();
      if (previous === undefined) delete globalThis[key];
      else globalThis[key] = previous;
    }
  }
);
test("opt-out and initialization failure do not create subscribers or block inference", async () => {
  let initialized = false;
  await startCacheDiagnostics({
    env: {},
    sinkFactory: () => {
      initialized = true;
    },
  }).stop();
  assert.equal(initialized, false);
  await startCacheDiagnostics({
    env: { OMNIROUTE_CACHE_DIAGNOSTICS: "1" },
    sinkFactory: () => {
      throw new Error("synthetic secret");
    },
    log() {},
  }).stop();
});
test("the passive observer ignores unrelated endpoints and reports encoded bodies unavailable", async () => {
  const rows = [];
  const observer = startCacheDiagnostics({
    env: { OMNIROUTE_CACHE_DIAGNOSTICS: "1" },
    sinkFactory: () => ({ write: (row) => rows.push(row), async close() {} }),
    log() {},
  });
  const send = (name, request, extra = {}) =>
    channel(`undici:request:${name}`).publish({ request, ...extra });
  const unknown = { origin: "https://unrelated.invalid", path: "/v1/responses", method: "POST" };
  const known = { origin: "https://api.openai.com", path: "/v1/responses", method: "POST" };
  const key = Symbol.for("omniroute.providerRequestCapture.state");
  const previous = globalThis[key];
  const context = new AsyncLocalStorage();
  globalThis[key] = { context };
  try {
    context.run({ capture: { diagnosticsOptOut: false } }, () => {
      send("create", unknown);
      send("trailers", unknown);
      send("create", known);
      send("headers", known, {
        response: { headers: [Buffer.from("content-encoding"), Buffer.from("gzip")] },
      });
      send("trailers", known);
    });
    await new Promise((resolve) => setImmediate(resolve));
  } finally {
    await observer.stop();
    if (previous === undefined) delete globalThis[key];
    else globalThis[key] = previous;
  }
  assert.equal(rows.length, 1);
  assert.equal(
    rows[0].status,
    supportsCacheBodyDiagnostics() ? "unsupported_encoding" : "unsupported_body_diagnostics"
  );
  assert.equal(rows[0].cacheReadTokens, null);
});
test("real launcher preload uses explicit and default CLI data dirs and never persists prompts or credentials", () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "cache diagnostics "));
  try {
    for (const explicit of [true, false]) {
      const home = path.join(temporary, explicit ? "explicit-home" : "default-home");
      fs.mkdirSync(home);
      const data = explicit ? path.join(home, "chosen data") : path.join(home, ".omniroute");
      const env = {
        ...process.env,
        HOME: home,
        USERPROFILE: home,
        APPDATA: home,
        XDG_CONFIG_HOME: home,
        OMNIROUTE_CACHE_DIAGNOSTICS: "1",
      };
      if (explicit) env.DATA_DIR = data;
      else {
        delete env.DATA_DIR;
        delete env.XDG_CONFIG_HOME;
        delete env.APPDATA;
      }
      const child = spawnSync(
        process.execPath,
        buildNodeRuntimeArgs(env, 256, "tests/fixtures/token-breakdown/diagnostics-child.mjs"),
        { cwd: root, env, encoding: "utf8", timeout: 10000 }
      );
      assert.equal(child.status, 0, child.stderr);
      const resolved =
        explicit || process.platform !== "win32"
          ? data
          : path.join(home, "AppData", "Roaming", "omniroute");
      const files = fs
        .readdirSync(path.join(resolved, "cache-diagnostics"))
        .filter((file) => file.endsWith(".jsonl"));
      assert.equal(files.length, 1);
      const content = fs.readFileSync(path.join(resolved, "cache-diagnostics", files[0]), "utf8");
      const row = JSON.parse(content.trim());
      assert.equal(row.cacheReadTokens, supportsCacheBodyDiagnostics() ? 0 : null);
      assert.equal(row.cacheWriteTokens, supportsCacheBodyDiagnostics() ? 5 : null);
      assert.doesNotMatch(content, /PRIVATE PROMPT|synthetic-secret|synthetic-model|فارسی/);
    }
  } finally {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
});
test("private sink bounds disk use, retains four files and safely closes", async () => {
  const data = fs.mkdtempSync(path.join(os.tmpdir(), "cache-sink-"));
  try {
    for (let i = 0; i < 6; i++) {
      const sink = createCacheDiagnosticsSink(data, { maxBytes: 200 });
      sink.write({ event: "cache_usage", value: 1 });
      assert.equal(sink.write({ value: "x".repeat(300) }), false);
      await sink.close();
    }
    assert.equal(
      fs.readdirSync(path.join(data, "cache-diagnostics")).filter((file) => file.endsWith(".jsonl"))
        .length,
      4
    );
  } finally {
    fs.rmSync(data, { recursive: true, force: true });
  }
});

test("missing or opted-out trusted dispatch context suppresses private diagnostics", async () => {
  const key = Symbol.for("omniroute.providerRequestCapture.state"),
    previous = globalThis[key];
  const context = new AsyncLocalStorage(),
    rows = [];
  globalThis[key] = { context };
  const observer = startCacheDiagnostics({
    env: { OMNIROUTE_CACHE_DIAGNOSTICS: "1" },
    sinkFactory: () => ({ write: (row) => rows.push(row), async close() {} }),
    log() {},
  });
  try {
    const request = { origin: "https://api.openai.com", path: "/v1/responses", method: "POST" };
    channel("undici:request:create").publish({ request });
    channel("undici:request:trailers").publish({ request });
    context.run({ capture: { diagnosticsOptOut: true } }, () => {
      channel("undici:request:create").publish({ request });
      channel("undici:request:trailers").publish({ request });
    });
    await new Promise((resolve) => setImmediate(resolve));
    assert.deepEqual(rows, []);
  } finally {
    await observer.stop();
    if (previous === undefined) delete globalThis[key];
    else globalThis[key] = previous;
  }
});
