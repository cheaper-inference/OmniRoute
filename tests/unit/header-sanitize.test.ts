import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import type { AddressInfo } from "node:net";
import {
  sanitizeHeaderValues,
  stripInvisibleHeaderChars,
} from "../../open-sse/utils/headerSanitize.ts";
import { proxyFetch } from "../../open-sse/utils/proxyFetch.ts";

test("removes a trailing zero-width space from a pasted key", () => {
  const input = { Authorization: "Bearer sk-abc​" };
  assert.deepEqual(sanitizeHeaderValues(input), { Authorization: "Bearer sk-abc" });
});

test("removes a leading BOM and the word joiner / ZWNJ / ZWJ", () => {
  assert.deepEqual(sanitizeHeaderValues({ "x-api-key": "﻿sk-⁠a‌b‍c" }), {
    "x-api-key": "sk-abc",
  });
});

test("removes C0 controls (but not HTAB) and DEL", () => {
  assert.equal(stripInvisibleHeaderChars("sk-\u0000a\u0001b\nc\r\u001Fd\u007F"), "sk-abcd");
  assert.equal(stripInvisibleHeaderChars("a\tb"), "a\tb");
});

test("a value without invisible characters comes back identical (same string, same object)", () => {
  const value = "Bearer sk-ABC_123-xyz.~+/=";
  assert.equal(stripInvisibleHeaderChars(value), value);

  const input = {
    Authorization: value,
    "Content-Type": "application/json",
    Accept: "text/event-stream",
    "x-tab": "a\tb",
    "x-space": " padded ",
  };
  const snapshot = { ...input };
  const result = sanitizeHeaderValues(input);
  assert.equal(result, input, "unchanged header set must be returned as the same object");
  assert.deepEqual(result, snapshot);
  assert.equal(result.Authorization, value);
});

test("never alters valid characters: Latin-1, C1 range and visible non-Latin-1 are kept", () => {
  // é (0xE9), NBSP (0xA0), soft hyphen (0xAD) and U+0085 are all legal header bytes.
  const latin1 = "café ­\u0085x";
  assert.equal(stripInvisibleHeaderChars(latin1), latin1);
  // A visible character above U+00FF is not invisible noise: left for the transport.
  assert.equal(stripInvisibleHeaderChars("key中"), "key中");
  // Only the invisible part is removed around valid characters.
  assert.equal(stripInvisibleHeaderChars("café​"), "café");
});

test("does not mutate the caller's header object", () => {
  const input = { Authorization: "Bearer sk-abc​", Accept: "*/*" };
  const result = sanitizeHeaderValues(input);
  assert.notEqual(result, input);
  assert.equal(input.Authorization, "Bearer sk-abc​");
  assert.deepEqual(result, { Authorization: "Bearer sk-abc", Accept: "*/*" });
});

test("handles a Headers instance and returns a Headers instance", () => {
  // Headers already refuses non-Latin-1 values, but stores C0 controls such as U+0001.
  const headers = new Headers();
  headers.set("authorization", "Bearer sk-abc\u0001");
  headers.set("x-api-key", "key-val");
  const sanitized = sanitizeHeaderValues(headers);
  assert.ok(sanitized instanceof Headers);
  assert.notEqual(sanitized, headers);
  assert.equal(sanitized.get("authorization"), "Bearer sk-abc");
  assert.equal(sanitized.get("x-api-key"), "key-val");

  const clean = new Headers({ accept: "application/json" });
  assert.equal(sanitizeHeaderValues(clean), clean);
});

test("handles the [name, value][] tuple form", () => {
  const tuples: Array<[string, string]> = [
    ["authorization", "Bearer sk-abc﻿"],
    ["accept", "*/*"],
  ];
  assert.deepEqual(sanitizeHeaderValues(tuples), [
    ["authorization", "Bearer sk-abc"],
    ["accept", "*/*"],
  ]);
  const clean: Array<[string, string]> = [["accept", "*/*"]];
  assert.equal(sanitizeHeaderValues(clean), clean);
});

test("non-string values and empty inputs pass through", () => {
  const input = { "content-length": 42, "x-flag": true, "x-null": null };
  assert.equal(sanitizeHeaderValues(input), input);
  assert.equal(sanitizeHeaderValues(undefined), undefined);
  assert.equal(sanitizeHeaderValues(null), null);
});

test("proxyFetch hands the cleaned headers to the transport", async () => {
  let captured: RequestInit | undefined;
  const callerHeaders = {
    Authorization: "Bearer sk-test​",
    "x-api-key": "﻿key-val",
  };
  const response = await proxyFetch(
    "https://api.example.com/test",
    { headers: callerHeaders, dispatcher: {} } as RequestInit,
    {
      undiciFetch: async (_input, init) => {
        captured = init;
        return new Response("ok", { status: 200 });
      },
    }
  );
  assert.equal(response.status, 200);
  assert.deepEqual(captured?.headers, { Authorization: "Bearer sk-test", "x-api-key": "key-val" });
  assert.equal(callerHeaders.Authorization, "Bearer sk-test​", "caller object untouched");
});

test("proxyFetch passes clean headers through as the same object", async () => {
  let captured: RequestInit | undefined;
  const callerHeaders = { Authorization: "Bearer sk-test", Accept: "*/*" };
  await proxyFetch(
    "https://api.example.com/test",
    { headers: callerHeaders, dispatcher: {} } as RequestInit,
    {
      undiciFetch: async (_input, init) => {
        captured = init;
        return new Response("ok", { status: 200 });
      },
    }
  );
  assert.equal(captured?.headers, callerHeaders);
});

test("a pasted key with a ZWSP reaches a real loopback server instead of a ByteString error", async () => {
  const seen: Array<string | undefined> = [];
  const server = http.createServer((req, res) => {
    seen.push(req.headers["x-api-key"] as string | undefined);
    res.end("ok");
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  try {
    const { port } = server.address() as AddressInfo;
    const response = await proxyFetch(`http://127.0.0.1:${port}/v1/models`, {
      headers: { "x-api-key": "sk-live​", authorization: "Bearer ﻿sk-live⁠" },
    });
    assert.equal(response.status, 200);
    assert.equal(await response.text(), "ok");
    assert.deepEqual(seen, ["sk-live"]);
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});
