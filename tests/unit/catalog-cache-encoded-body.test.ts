import assert from "node:assert/strict";
import test from "node:test";

import { createTempDataDir } from "../_setup/tempDataDir.ts";

const { cleanup } = createTempDataDir("omniroute-catalog-encoded-");
const cache = await import("../../src/app/api/v1/models/catalogCache.ts");

const headers = { corsHeaders: {}, diagnosticHeaders: { "x-request-id": "diag" } };
const request = () =>
  new Request("http://localhost/v1/models", {
    headers: { authorization: "Bearer encoded-fixture" },
  });
// Non-Latin1 text, larger than one 64 KiB delivery chunk.
const BODY = JSON.stringify({
  data: Array.from({ length: 3000 }, (_, i) => ({ id: `p/model-${i}`, name: "界".repeat(6) })),
});
const payload = (body: string) => ({
  body,
  headers: { etag: '"fixture"' },
  status: 200,
  cacheTTL: 60_000,
});

test.beforeEach(() => cache.__resetCatalogBuilderRunsForTest());
test.after(cleanup);

async function readChunks(response: Response): Promise<Uint8Array[]> {
  const chunks: Uint8Array[] = [];
  const reader = response.body!.getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) return chunks;
    chunks.push(value);
  }
}

test("a cached catalog hit does not re-encode the body string", async (t) => {
  assert.ok(BODY.length > 64 * 1024);
  const expectedBytes = Buffer.byteLength(BODY);
  await cache.resolveCachedCatalogResponse(request(), headers, async () => payload(BODY));

  const byteLength = t.mock.method(Buffer, "byteLength");
  const from = t.mock.method(Buffer, "from");
  const hit = await cache.resolveCachedCatalogResponse(request(), headers, async () =>
    payload("unused")
  );
  const encodedBodyStrings = [...byteLength.mock.calls, ...from.mock.calls].filter(
    (call) => typeof call.arguments[0] === "string" && call.arguments[0].length === BODY.length
  );
  assert.equal(encodedBodyStrings.length, 0, "hit must reuse the stored bytes");
  byteLength.mock.restore();
  from.mock.restore();

  assert.equal(hit.headers.get("content-length"), String(expectedBytes));
  assert.equal(hit.headers.get("content-type"), "application/json");
  assert.equal(hit.headers.get("etag"), '"fixture"');
  assert.equal(hit.headers.get("x-request-id"), "diag");
  const chunks = await readChunks(hit);
  assert.ok(chunks.length > 1, "large body keeps chunked delivery");
  assert.equal(Buffer.concat(chunks).toString("utf8"), BODY);
});

test("repeated hits return identical bytes and a small body is served whole", async () => {
  await cache.resolveCachedCatalogResponse(request(), headers, async () => payload(BODY));
  for (let i = 0; i < 3; i++) {
    const hit = await cache.resolveCachedCatalogResponse(request(), headers, async () =>
      payload("unused")
    );
    assert.equal(await hit.text(), BODY);
  }
  const small = JSON.stringify({ data: [{ id: "界/m" }] });
  const small1 = await cache.resolveCachedCatalogResponse(
    new Request("http://localhost/v1/models?after=small"),
    headers,
    async () => payload(small)
  );
  assert.equal(await small1.text(), small);
  const small2 = await cache.resolveCachedCatalogResponse(
    new Request("http://localhost/v1/models?after=small"),
    headers,
    async () => payload("unused")
  );
  assert.equal(small2.headers.get("content-length"), String(Buffer.byteLength(small)));
  assert.equal(await small2.text(), small);
});
