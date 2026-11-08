import test from "node:test";
import assert from "node:assert/strict";
import {
  prepareFalCompatibility,
  type FalDefinitionStore,
} from "../../open-sse/handlers/fal/compatibility.ts";
import type { FalDefinition } from "../../open-sse/handlers/fal/schema.ts";

const endpoint = "publisher/custom-app";
const definition: FalDefinition = {
  endpoint_id: endpoint,
  openapi: {
    openapi: "3.0.0",
    paths: {
      [`/${endpoint}`]: {
        post: {
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { prompt: { type: "string" } },
                  required: ["prompt"],
                },
              },
            },
          },
        },
      },
    },
  },
};

test("Fal uses the selected connection's cached schema without discovery", async () => {
  const seen: string[] = [];
  const store: FalDefinitionStore = {
    get(connectionId, requestedEndpoint) {
      seen.push(connectionId, requestedEndpoint);
      return definition;
    },
    save() {
      assert.fail("cached definitions must not be overwritten");
    },
  };
  // No API key means any accidental discovery would fail.
  assert.deepEqual(
    await prepareFalCompatibility(
      endpoint,
      { prompt: "cached" },
      { connectionId: "selected" },
      undefined,
      store
    ),
    { prompt: "cached" }
  );
  assert.deepEqual(seen, ["selected", endpoint]);
  await assert.rejects(
    prepareFalCompatibility(
      endpoint,
      { fal_input: { prompt: 42 } },
      { connectionId: "selected" },
      undefined,
      store
    ),
    /Invalid fal input/
  );
});

test("Fal discovery persists only to the selected connection and propagates cancellation", async () => {
  const original = globalThis.fetch;
  const controller = new AbortController();
  const readKeys: string[] = [];
  const writes: string[] = [];
  let discoveries = 0;
  const store: FalDefinitionStore = {
    get(connectionId) {
      readKeys.push(connectionId);
      return null;
    },
    save(connectionId, found) {
      writes.push(connectionId);
      assert.deepEqual(found, definition);
    },
  };
  globalThis.fetch = async (url, init) => {
    discoveries++;
    assert.equal(new URL(String(url)).searchParams.get("endpoint_id"), endpoint);
    assert.equal(new Headers(init?.headers).get("Authorization"), "Key scoped-key");
    assert.equal(init?.signal?.aborted, false);
    controller.abort();
    assert.equal(init?.signal?.aborted, true);
    return Response.json({ models: [definition], has_more: false });
  };
  try {
    assert.deepEqual(
      await prepareFalCompatibility(
        endpoint,
        { prompt: "discovered" },
        { apiKey: "scoped-key", connectionId: "selected" },
        controller.signal,
        store
      ),
      { prompt: "discovered" }
    );
    assert.deepEqual(readKeys, ["selected"]);
    assert.deepEqual(writes, ["selected"]);
    assert.equal(discoveries, 1);
  } finally {
    globalThis.fetch = original;
  }
});

test("credentials without a connection never read or populate a persistent schema store", async () => {
  const original = globalThis.fetch;
  const store: FalDefinitionStore = {
    get() {
      assert.fail("unscoped cache read");
    },
    save() {
      assert.fail("unscoped cache write");
    },
  };
  globalThis.fetch = async () => Response.json({ models: [definition], has_more: false });
  try {
    assert.deepEqual(
      await prepareFalCompatibility(
        endpoint,
        { prompt: "standalone" },
        { apiKey: "test-key" },
        undefined,
        store
      ),
      { prompt: "standalone" }
    );
  } finally {
    globalThis.fetch = original;
  }
});
