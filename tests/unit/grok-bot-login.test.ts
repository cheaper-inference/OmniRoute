import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { generateCursorAuthParams, clearCursorLoginSessions } from "../../src/lib/oauth/services/cursorLogin.ts";

describe("generateCursorAuthParams redirect target", () => {
  beforeEach(() => {
    clearCursorLoginSessions();
  });

  it("defaults to the cli target so the Cursor login stays unchanged", async () => {
    const params = await generateCursorAuthParams();
    assert.match(params.loginUrl, /redirectTarget=cli/);
  });

  it("builds a sand target for the Grok Bot login", async () => {
    const params = await generateCursorAuthParams("sand");
    assert.match(params.loginUrl, /^https:\/\/cursor\.com\/loginDeepControl\?/);
    assert.match(params.loginUrl, /redirectTarget=sand/);
    assert.doesNotMatch(params.loginUrl, /verifier=/);
  });

  it("the Grok Bot start route asks for the sand target", () => {
    const source = readFileSync(
      new URL("../../src/app/api/oauth/grok-bot/login/start/route.ts", import.meta.url),
      "utf8"
    );
    assert.match(source, /generateCursorAuthParams\("sand"\)/);
  });
});
