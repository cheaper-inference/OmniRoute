import test from "node:test";
import assert from "node:assert/strict";

import {
  SENSENOVA_CONSOLE_HOST,
  isSensenovaQuotaConnection,
  parseSensenovaOrigin,
} from "../../open-sse/services/usage/sensenovaTokenPlan.ts";

test("parseSensenovaOrigin returns the normalized origin for console URLs", () => {
  assert.strictEqual(SENSENOVA_CONSOLE_HOST, "token.sensenova.cn");
  assert.strictEqual(parseSensenovaOrigin("https://token.sensenova.cn/v1"), "https://token.sensenova.cn");
  assert.strictEqual(parseSensenovaOrigin("https://token.sensenova.cn"), "https://token.sensenova.cn");
  // Port and scheme survive; the path never does.
  assert.strictEqual(
    parseSensenovaOrigin("http://token.sensenova.cn:8080/lite/console"),
    "http://token.sensenova.cn:8080",
  );
  // A default port is reported as empty by the parser, so it disappears.
  assert.strictEqual(
    parseSensenovaOrigin("https://token.sensenova.cn:443/v1"),
    "https://token.sensenova.cn",
  );
  // Hostname comparison is case-insensitive and ignores the root label dot.
  assert.strictEqual(parseSensenovaOrigin("https://TOKEN.SenseNova.CN/v1"), "https://token.sensenova.cn");
  assert.strictEqual(parseSensenovaOrigin("https://token.sensenova.cn./v1"), "https://token.sensenova.cn");
  // Surrounding whitespace is trimmed before parsing.
  assert.strictEqual(parseSensenovaOrigin("  https://token.sensenova.cn/v1  "), "https://token.sensenova.cn");
});

test("parseSensenovaOrigin rejects everything that is not the console host", () => {
  for (const bad of [
    "https://token.sensenova.cn.evil.example/v1",
    "https://Token.Sensenova.cn.evil.example/v1",
    "https://token.sensenova.cn@evil.example/v1",
    "https://user:pass@token.sensenova.cn/v1",
    "https://evil.example/token.sensenova.cn",
    "ftp://token.sensenova.cn/v1",
    "token.sensenova.cn/v1",
    "https:///v1",
    "https://",
    "",
    "   ",
    null,
    undefined,
  ]) {
    assert.strictEqual(parseSensenovaOrigin(bad), null, `expected null for ${JSON.stringify(bad)}`);
  }
  // A non-string that stringifies to a console URL is still not a base URL.
  assert.strictEqual(
    parseSensenovaOrigin({ toString: () => "https://token.sensenova.cn/v1" }),
    null,
  );
});

test("isSensenovaQuotaConnection recognises the builtin id and console-host nodes only", () => {
  // No base URL to contradict the id, so the id decides.
  assert.strictEqual(isSensenovaQuotaConnection({ provider: "sensenova" }), true);
  assert.strictEqual(isSensenovaQuotaConnection({ provider: "sensenova", providerSpecificData: {} }), true);
  // An explicit base URL overrules the id, so a builtin id pointing elsewhere
  // is not treated as a console connection.
  assert.strictEqual(
    isSensenovaQuotaConnection({
      provider: "sensenova",
      providerSpecificData: { baseUrl: "https://api.example.com/v1" },
    }),
    false,
  );
  assert.strictEqual(
    isSensenovaQuotaConnection({
      provider: "openai-compatible-chat-55555555-5555-5555-5555-555555555555",
      providerSpecificData: { baseUrl: "https://token.sensenova.cn/v1" },
    }),
    true,
  );
  // providerSpecificData shapes that must not throw and must not match.
  for (const psd of [null, undefined, "https://token.sensenova.cn/v1", ["https://token.sensenova.cn/v1"], 42]) {
    assert.strictEqual(isSensenovaQuotaConnection({ provider: "x", providerSpecificData: psd }), false);
  }
  assert.strictEqual(isSensenovaQuotaConnection({ provider: "x", providerSpecificData: {} }), false);
  assert.strictEqual(
    isSensenovaQuotaConnection({ provider: "x", providerSpecificData: { baseUrl: 123 } }),
    false,
  );
  assert.strictEqual(
    isSensenovaQuotaConnection({
      provider: "x",
      providerSpecificData: { baseUrl: "https://api.moonshot.cn/v1" },
    }),
    false,
  );
});

