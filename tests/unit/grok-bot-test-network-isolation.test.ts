import test from "node:test";
import assert from "node:assert/strict";
import { createLoopbackOnlyFetch } from "../helpers/grokBotExecutorFixture.ts";

test("executor test transport blocks external destinations before dispatch", async () => {
  let dispatched = 0;
  const blocked: string[] = [];
  const guarded = createLoopbackOnlyFetch(
    async () => {
      dispatched += 1;
      return new Response("unexpected");
    },
    (origin) => blocked.push(origin)
  );
  await assert.rejects(guarded("https://upstream.example.test/token"), /non-loopback/);
  assert.equal(dispatched, 0);
  assert.deepEqual(blocked, ["https://upstream.example.test"]);
});

test("executor test transport does not follow loopback redirects or hide a caught attempt", async () => {
  const calls: RequestInit[] = [];
  const blocked: string[] = [];
  const guarded = createLoopbackOnlyFetch(
    async (_input, init) => {
      calls.push(init!);
      return new Response(null, {
        status: 302,
        headers: { location: "https://upstream.example.test" },
      });
    },
    (origin) => blocked.push(origin)
  );
  await assert.rejects(
    guarded("http://127.0.0.1:12345/bridge", { redirect: "follow" }),
    /redirect/
  );
  assert.equal(calls.length, 1);
  assert.equal(calls[0].redirect, "manual");
  assert.deepEqual(blocked, ["http://127.0.0.1:12345 (redirect refused)"]);
});

test("executor test transport permits a normal local bridge response", async () => {
  const blocked: string[] = [];
  const guarded = createLoopbackOnlyFetch(
    async () => new Response("local-only"),
    (origin) => blocked.push(origin)
  );
  assert.equal(await (await guarded("http://127.0.0.1:12345/bridge")).text(), "local-only");
  assert.deepEqual(blocked, []);
});
