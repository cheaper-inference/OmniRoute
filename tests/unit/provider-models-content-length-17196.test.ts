/**
 * #17196 — GET /api/v1/providers/{provider}/models was still reported to reach
 * clients with the FULL catalog's Content-Length (202482, then 242917 as the
 * catalog grew) on the much smaller filtered body, so the response never
 * completed and the dashboard model picker stayed empty.
 *
 * #14092/#15212 made the route DROP the catalog's length and fall back to
 * chunked framing. Dropping is not enough to guarantee the client sees the
 * right framing: the route now declares an explicit length computed from the
 * exact filtered bytes, written by the same framed writer GET /v1/models uses
 * (the endpoint the reporter confirmed works).
 *
 * The catalog is planted through the route's `unifiedModels.load` seam and is
 * built by the real `catalogStringResponse()`, above the 64 KB chunk size, so
 * it takes the same streamed path as the reporter's catalog.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import { createRequire } from "node:module";
import os from "node:os";
import path from "node:path";

process.env.NODE_ENV = "test";
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cl-17196-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const routeModule = await import("../../src/app/api/v1/providers/[provider]/models/route.ts");
const { catalogStringResponse, CATALOG_BODY_CHUNK_BYTES } =
  await import("../../src/app/api/v1/models/catalogPagination.ts");

// Next's own response writer (the one that copies a route handler's Response
// onto the Node socket), so the wire test exercises real framing, not a replica.
const require = createRequire(import.meta.url);
const { sendResponse } = require("next/dist/server/send-response") as {
  sendResponse: (req: unknown, res: unknown, response: Response) => Promise<void>;
};
const { NodeNextRequest, NodeNextResponse } = require("next/dist/server/base-http/node") as {
  NodeNextRequest: new (req: http.IncomingMessage) => unknown;
  NodeNextResponse: new (res: http.ServerResponse) => unknown;
};

const originalLoad = routeModule.unifiedModels.load;

test.after(() => {
  routeModule.unifiedModels.load = originalLoad;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

/** A catalog larger than one write chunk, with a handful of gemini models in it. */
function buildLargeCatalog() {
  const data: Array<Record<string, unknown>> = [];
  for (let i = 0; i < 1500; i++) {
    data.push({
      id: `openai/padding-model-${i}`,
      object: "model",
      owned_by: "openai",
      description: "x".repeat(80),
    });
  }
  for (const name of ["gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.0-flash"]) {
    data.push({ id: `gemini/${name}`, object: "model", owned_by: "gemini" });
  }
  const body = JSON.stringify({ object: "list", data });
  assert.ok(
    Buffer.byteLength(body) > CATALOG_BODY_CHUNK_BYTES,
    "catalog must take the streamed path"
  );
  return body;
}

function plantLargeCatalog() {
  const body = buildLargeCatalog();
  routeModule.unifiedModels.load = (async () =>
    catalogStringResponse(body, {
      "x-model-catalog-version": "model-metadata-v1:static",
    })) as typeof originalLoad;
  return Buffer.byteLength(body);
}

function callRoute() {
  return routeModule.GET(new Request("http://127.0.0.1:20128/api/v1/providers/gemini/models"), {
    params: Promise.resolve({ provider: "gemini" }),
  });
}

test("#17196 filtered provider models declare a Content-Length that matches the filtered body", async () => {
  const catalogBytes = plantLargeCatalog();

  const response = await callRoute();
  assert.equal(response.status, 200);
  const text = await response.text();
  const payload = JSON.parse(text) as { data: Array<{ id: string }> };
  assert.deepEqual(
    payload.data.map((model) => model.id),
    ["gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.0-flash"]
  );

  const declared = response.headers.get("content-length");
  assert.notEqual(declared, String(catalogBytes), "the full catalog length must not be forwarded");
  assert.equal(
    declared,
    String(Buffer.byteLength(text)),
    "content-length must be declared and describe the filtered body"
  );
  assert.equal(response.headers.get("transfer-encoding"), null);
  assert.equal(response.headers.get("content-encoding"), null);
  assert.equal(response.headers.get("content-type"), "application/json");
  assert.equal(
    response.headers.get("x-model-catalog-version"),
    "model-metadata-v1:static",
    "catalog diagnostics headers must survive"
  );
});

test("#17196 filtered provider models arrive complete over a real socket through Next's sendResponse", async () => {
  const catalogBytes = plantLargeCatalog();

  const server = http.createServer((req, res) => {
    callRoute()
      .then((response) =>
        sendResponse(new NodeNextRequest(req), new NodeNextResponse(res), response)
      )
      .catch((err) => {
        res.statusCode = 500;
        res.end(String(err));
      });
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as { port: number };

  try {
    const result = await new Promise<{
      status: number;
      headers: http.IncomingHttpHeaders;
      body: Buffer;
    }>((resolve, reject) => {
      const req = http.get(
        { host: "127.0.0.1", port, path: "/api/v1/providers/gemini/models", agent: false },
        (res) => {
          const chunks: Buffer[] = [];
          res.on("data", (chunk: Buffer) => chunks.push(chunk));
          res.on("end", () =>
            resolve({
              status: res.statusCode ?? 0,
              headers: res.headers,
              body: Buffer.concat(chunks),
            })
          );
          res.on("aborted", () => reject(new Error("response aborted before completion")));
          res.on("error", reject);
        }
      );
      req.setTimeout(10_000, () => req.destroy(new Error("timed out waiting for the body")));
      req.on("error", reject);
    });

    assert.equal(result.status, 200);
    const declared = result.headers["content-length"];
    assert.notEqual(
      declared,
      String(catalogBytes),
      "the full catalog length must not reach the wire"
    );
    assert.equal(
      declared,
      String(result.body.length),
      "the wire content-length must equal the bytes actually sent"
    );
    assert.equal(result.headers["transfer-encoding"], undefined);
    const payload = JSON.parse(result.body.toString("utf8")) as { data: Array<{ id: string }> };
    assert.equal(payload.data.length, 3);
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});
