import assert from "node:assert/strict";
import test from "node:test";
import { loadProfileCatalog } from "../../src/lib/cli-helper/profileCatalog.ts";

const request = new Request("http://localhost/sync", {
  headers: { cookie: "session=test", authorization: "Bearer test", "x-unrelated": "omit" },
});

test("uses the internal URL and only forwards authentication headers", async () => {
  const result = await loadProfileCatalog(
    request,
    async (url, init) => {
      assert.equal(url, "http://127.0.0.1:20128/v1/models");
      assert.deepEqual(init?.headers, { cookie: "session=test", authorization: "Bearer test" });
      assert.equal(init?.redirect, "error");
      assert.ok(init?.signal instanceof AbortSignal);
      return Response.json([{ id: "test-model" }]);
    },
    () => "http://127.0.0.1:20128/"
  );
  assert.deepEqual(result, {
    ok: true,
    models: [{ id: "test-model" }],
    baseUrl: "http://127.0.0.1:20128",
  });
});

test("preserves data precedence and accepts supported catalog shapes", async () => {
  for (const [body, models] of [
    [["a"], ["a"]],
    [{ data: ["a"], models: ["b"] }, ["a"]],
    [{ models: ["b"] }, ["b"]],
    [{ data: {}, models: ["b"] }, []],
    [{ data: null, models: ["b"] }, ["b"]],
    [{}, []],
  ]) {
    const result = await loadProfileCatalog(
      new Request("http://localhost"),
      async (_url, init) => {
        assert.deepEqual(init?.headers, {});
        return Response.json(body);
      },
      () => "http://localhost"
    );
    assert.deepEqual(result, { ok: true, models, baseUrl: "http://localhost" });
  }
});

test("reports HTTP failures before trying to parse the body", async () => {
  assert.deepEqual(
    await loadProfileCatalog(
      request,
      async () => new Response("not JSON", { status: 503 }),
      () => "http://localhost"
    ),
    { ok: false, reason: "catalog_http_503" }
  );
});

test("propagates fetch and JSON parsing failures", async () => {
  const failure = new Error("network failed");
  await assert.rejects(
    loadProfileCatalog(
      request,
      async () => {
        throw failure;
      },
      () => "http://localhost"
    ),
    (error) => error === failure
  );
  await assert.rejects(
    loadProfileCatalog(
      request,
      async () => new Response("invalid"),
      () => "http://localhost"
    ),
    SyntaxError
  );
});
