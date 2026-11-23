import test from "node:test";
import assert from "node:assert/strict";
import { after, before } from "node:test";
import { createServer, type Server } from "node:http";

import { validateProviderApiKey } from "../../src/lib/providers/validation.ts";
import { getRegistryEntry } from "../../open-sse/config/providerRegistry.ts";

// Inception Labs serves GET /v1/models WITHOUT authentication: a bogus `Authorization: Bearer
// sk-bogus` gets 200 with the full catalog (verified live 2026-10-15), while
// POST /v1/chat/completions answers 401 for the same key. The generic OpenAI-like probe returns
// `{valid:true}` on the first 2xx from /models, so the setup dialog and the connection Test
// accepted any string as an Inception key. Validation must probe the authenticated chat route.
//
// The fake upstream below is Inception-faithful: /v1/models is open, chat is authenticated.

let server: Server;
let baseUrl = "";
let modelsRequests = 0;
let chatRequests = 0;
let lastChatAuthorization: string | null = null;
let lastChatBody: Record<string, unknown> | null = null;
let chatStatusForValidKey = 200;

const VALID_KEY = "sk-inception-valid";

before(async () => {
  server = createServer((req, res) => {
    const path = (req.url || "").split("?")[0];
    const auth = req.headers["authorization"];

    if (path === "/v1/models") {
      modelsRequests += 1;
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ data: [{ id: "mercury-2" }, { id: "mercury-2.5" }] }));
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
          res.end(JSON.stringify({ error: { message: "Invalid API key" } }));
          return;
        }
        res.writeHead(chatStatusForValidKey, { "content-type": "application/json" });
        res.end(JSON.stringify({ choices: [{ message: { role: "assistant", content: "ok" } }] }));
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

test("inception key validation rejects a bad key instead of trusting the public catalog", async () => {
  modelsRequests = 0;
  chatRequests = 0;
  const result = await validateProviderApiKey({
    provider: "inception",
    apiKey: "sk-bogus",
    providerSpecificData: { baseUrl },
  });

  assert.equal(
    modelsRequests,
    0,
    "the public /v1/models must not be consulted — a 200 from it is what greened bad keys"
  );
  assert.equal(result.valid, false, `expected an invalid verdict, got ${JSON.stringify(result)}`);
  assert.ok(chatRequests > 0, "validation must probe the authenticated chat route");
  assert.equal(lastChatAuthorization, "Bearer sk-bogus");
  assert.equal(lastChatBody?.model, "mercury-2");
  assert.equal(lastChatBody?.max_tokens, 1);
});

test("inception key validation accepts a key the chat route authenticates (200)", async () => {
  chatStatusForValidKey = 200;
  modelsRequests = 0;
  const result = await validateProviderApiKey({
    provider: "inception",
    apiKey: VALID_KEY,
    providerSpecificData: { baseUrl },
  });

  assert.equal(result.valid, true, `expected a valid verdict, got ${JSON.stringify(result)}`);
  assert.equal(modelsRequests, 0);
});

test("inception key validation treats a rate-limited chat probe (429) as a valid key", async () => {
  chatStatusForValidKey = 429;
  try {
    const result = await validateProviderApiKey({
      provider: "inception",
      apiKey: VALID_KEY,
      providerSpecificData: { baseUrl },
    });
    assert.equal(result.valid, true, `expected a valid verdict, got ${JSON.stringify(result)}`);
  } finally {
    chatStatusForValidKey = 200;
  }
});

test("inception key validation honors a custom validationModelId", async () => {
  await validateProviderApiKey({
    provider: "inception",
    apiKey: VALID_KEY,
    providerSpecificData: { baseUrl, validationModelId: "mercury-2.5" },
  });
  assert.equal(lastChatBody?.model, "mercury-2.5");
});

test("inception registry seed lists mercury-2.5 alongside mercury-2", () => {
  const ids = (getRegistryEntry("inception")?.models || []).map((m) => m.id);
  assert.ok(ids.includes("mercury-2"), `seed lost mercury-2: ${ids.join(",")}`);
  assert.ok(ids.includes("mercury-2.5"), `seed is missing mercury-2.5: ${ids.join(",")}`);
});
