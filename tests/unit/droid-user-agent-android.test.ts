import test from "node:test";
import assert from "node:assert/strict";

import { resolveChatCoreRequestFormat } from "../../open-sse/handlers/chatCore/requestFormat.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

function format(userAgent: string) {
  return resolveChatCoreRequestFormat({
    clientRawRequest: { endpoint: "/v1/chat/completions", headers: new Headers() },
    body: { input: "hi", model: "m" },
    provider: "openai",
    userAgent,
  });
}

test("an Android user agent is not the Droid CLI", () => {
  const r = format("Dalvik/2.1.0 (Linux; U; Android 14; Pixel 8 Build/UP1A)");
  assert.equal(r.isDroidCLI, false);
  assert.equal(r.clientResponseFormat, FORMATS.OPENAI);
});

test("a browser on Android is not the Droid CLI", () => {
  const r = format(
    "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/126.0 Mobile"
  );
  assert.equal(r.isDroidCLI, false);
});

test("Droid CLI user agents still keep the Responses format", () => {
  for (const ua of ["droid/0.9.1", "Droid CLI/1.2", "factory-droid/2.0 (linux)"]) {
    const r = format(ua);
    assert.equal(r.isDroidCLI, true, ua);
    assert.equal(r.clientResponseFormat, FORMATS.OPENAI_RESPONSES, ua);
  }
});

test("codex-cli user agents are still treated like Droid", () => {
  assert.equal(format("codex-cli/0.5.0").isDroidCLI, true);
});
