import { test } from "node:test";
import assert from "node:assert/strict";

import { solveDuckDuckGoChallenge } from "../../open-sse/executors/duckduckgo-web/challenge.ts";

// The challenge program comes from the upstream (duck.ai) in the x-vqd-hash-1 header.
// Whatever evaluates it must not hand it the server's own realm: a program that walks
// the constructor chain must not reach the host `process`.

const UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36";
const MARK = "__ddgChallengeReachedHost";

function encode(js: string): string {
  return Buffer.from(js, "utf8").toString("base64");
}

function hostMark(): unknown {
  return (process as unknown as Record<string, unknown>)[MARK];
}

test.afterEach(() => {
  delete (process as unknown as Record<string, unknown>)[MARK];
});

test("a challenge cannot reach the host process through this.constructor", async () => {
  const program = `(function () {
    try { this.constructor.constructor("return process")().${MARK} = "sync"; } catch (e) {}
    return { client_hashes: ["ua", "h"], meta: {} };
  })()`;
  await solveDuckDuckGoChallenge(encode(program), UA).catch(() => undefined);
  assert.equal(hostMark(), undefined);
});

test("a challenge cannot reach the host process from async work after it returns", async () => {
  const program = `(async function () {
    await Promise.resolve();
    try { globalThis.constructor.constructor("return process")().${MARK} = "async"; } catch (e) {}
    return { client_hashes: ["ua", "h"], meta: {} };
  })()`;
  await solveDuckDuckGoChallenge(encode(program), UA).catch(() => undefined);
  await new Promise((resolve) => setTimeout(resolve, 20));
  assert.equal(hostMark(), undefined);
});
