// A proxy record whose type is unknown or misspelled must not be handed to Chromium as HTTP:
// that silently routes the browser through a proxy the operator never chose.
import test from "node:test";
import assert from "node:assert/strict";

import { toPlaywrightProxy } from "../../open-sse/utils/playwrightProxy.ts";

test("an unsupported proxy type fails closed instead of becoming an HTTP proxy", () => {
  assert.throws(
    () => toPlaywrightProxy({ host: "10.0.0.8", port: 1080, type: "ftp" } as never),
    /Unsupported proxy type "ftp"/
  );
});

test("a record without a type is still an HTTP proxy", () => {
  const proxy = toPlaywrightProxy({ host: "10.0.0.8", port: 8080 } as never);
  assert.equal(proxy?.server, "http://10.0.0.8:8080");
});
