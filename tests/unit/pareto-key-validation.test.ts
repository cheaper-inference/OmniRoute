import test from "node:test";
import assert from "node:assert/strict";
import { after, before } from "node:test";
import { createServer, type Server } from "node:http";

import { validateProviderApiKey } from "../../src/lib/providers/validation.ts";

// Pareto Inference serves GET /v1/models WITHOUT authentication: `Authorization: Bearer
// sk-bogus` gets 200 with the catalog (verified live 2026-11-06), while POST
// /v1/chat/completions answers 401 for the same key. A valid key sending a non-streamed
// request gets `400 streaming_only` before any credit is held. The fake upstream below
// reproduces that contract.

let server: Server;
let baseUrl = "";
let modelsRequests = 0;
let chatRequests = 0;
let lastChatAuthorization: string | null = null;
let lastChatBody: Record<string, unknown> | null = null;

const VALID_KEY = "sk-pareto-valid";

before(async () => {
  server = createServer((req, res) => {
    const path = (req.url || "").split("?")[0];
    const auth = req.headers["authorization"];

    if (path === "/v1/models") {
      modelsRequests += 1;
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ object: "list", data: [{ id: "z-ai/glm-5.3-flash" }] }));
      return;
    }

    if (path === "/v1/chat/completions") {
      chatRequests += 1;
      lastChatAuthorization = typeof auth === "string" ? auth : null;
      let raw = "";
      req.on("data", (chunk) => {
        raw += chunk;
      });
      req.on("end", () => {
        try {
          lastChatBody = JSON.parse(raw);
        } catch {
          lastChatBody = null;
        }
        if (auth !== `Bearer ${VALID_KEY}`) {
          res.writeHead(401, { "content-type": "application/json" });
          res.end(
            JSON.stringify({
              error: { message: "Authentication failed.", type: "auth_error", code: "401" },
            })
          );
          return;
        }
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: { message: "Set stream to true.", code: "streaming_only" } }));
      });
      return;
    }

    res.writeHead(404, { "content-type": "text/plain" });
    res.end("Not Found");
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("no assigned port");
  baseUrl = `http://127.0.0.1:${address.port}/v1`;
});

after(async () => {
  await new Promise<void>((resolve, reject) =>
    server.close((err) => (err ? reject(err) : resolve()))
  );
});

test("pareto key validation rejects a bad key instead of trusting the public catalog", async () => {
  modelsRequests = 0;
  chatRequests = 0;
  const result = await validateProviderApiKey({
    provider: "pareto",
    apiKey: "sk-bogus",
    providerSpecificData: { baseUrl },
  });

  assert.equal(modelsRequests, 0, "the public /v1/models must not be consulted");
  assert.equal(result.valid, false, `expected an invalid verdict, got ${JSON.stringify(result)}`);
  assert.ok(chatRequests > 0, "validation must probe the authenticated chat route");
  assert.equal(lastChatAuthorization, "Bearer sk-bogus");
  assert.equal(lastChatBody?.model, "z-ai/glm-5.3-flash");
  assert.equal(lastChatBody?.max_tokens, 1);
});

test("pareto key validation accepts a valid key refused with 400 streaming_only", async () => {
  modelsRequests = 0;
  const result = await validateProviderApiKey({
    provider: "pareto",
    apiKey: VALID_KEY,
    providerSpecificData: { baseUrl },
  });

  assert.equal(result.valid, true, `expected a valid verdict, got ${JSON.stringify(result)}`);
  assert.equal(modelsRequests, 0);
  assert.notEqual(lastChatBody?.stream, true, "the probe must stay non-streamed so it is never billed");
});

test("pareto key validation honors a custom validationModelId", async () => {
  await validateProviderApiKey({
    provider: "pareto",
    apiKey: VALID_KEY,
    providerSpecificData: { baseUrl, validationModelId: "deepseek/deepseek-v4.1-flash" },
  });
  assert.equal(lastChatBody?.model, "deepseek/deepseek-v4.1-flash");
});
