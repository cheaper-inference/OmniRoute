/**
 * Replays the executor against the real captured HAR exchanges (fixtures
 * extracted from the official client session) and asserts the produced request
 * is byte-compatible with what the upstream accepted.
 *
 * Fixtures: tests/fixtures/freebuff/ (catalog, session, admission, chat body).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { createPublicKey, verify as verifyEd25519 } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { FreebuffExecutor } from "../../open-sse/executors/freebuff.ts";
import type { ExecuteInput } from "../../open-sse/executors/base.ts";
import {
  base64UrlDecode,
  buildDeviceSignaturePayload,
  createDeviceRecord,
  sha256Hex,
  type FreebuffDeviceRecord,
  type FreebuffDeviceStore,
} from "../../open-sse/executors/freebuff/deviceKey.ts";
import { freebuffLegacyDigest } from "../../open-sse/executors/freebuff/catalog.ts";

const FIXTURES = join(dirname(fileURLToPath(import.meta.url)), "..", "fixtures", "freebuff");
const read = (name: string) => readFileSync(join(FIXTURES, name), "utf8");

const ORIGIN = "https://www.codebuff.com/api/v1";
const CHAT = `${ORIGIN}/chat/completions`;

type Captured = { url: string; method: string; headers: Record<string, string>; body?: string };

function createMemoryDeviceStore() {
  let current: FreebuffDeviceRecord = createDeviceRecord();
  const store: FreebuffDeviceStore = {
    persistable: true,
    async load() {
      return current;
    },
    async save(record) {
      current = record;
    },
  };
  return { store, getRecord: () => current };
}

function ed25519SpkiFromRaw(rawPublicKey: Buffer) {
  // RFC 8410 Ed25519 SubjectPublicKeyInfo prefix (12 bytes) + 32-byte raw key.
  const spkiPrefix = Buffer.from("302a300506032b6570032100", "hex");
  return createPublicKey({
    key: Buffer.concat([spkiPrefix, rawPublicKey]),
    format: "der",
    type: "spki",
  });
}

function stubFetch() {
  const captured: Captured[] = [];
  const fetchImpl = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    const headers: Record<string, string> = {};
    new Headers(init?.headers).forEach((v, k) => {
      headers[k.toLowerCase()] = v;
    });
    captured.push({
      url,
      method: (init?.method ?? "GET").toUpperCase(),
      headers,
      body: typeof init?.body === "string" ? init.body : undefined,
    });

    const json = (status: number, body: string) =>
      new Response(body, { status, headers: { "Content-Type": "application/json" } });

    if (url.includes("/me?"))
      return json(200, JSON.stringify({ id: "77c8f38e-c31f-4669-9950-1cd3afe574a3" }));
    if (url.endsWith("/freebuff/models")) return json(200, read("catalog.json"));
    if (url.endsWith("/freebuff/device-keys"))
      return json(200, JSON.stringify({ keyId: "A1-dwZRyav_SOTgVqG00de" }));
    if (url.endsWith("/freebuff/session/admission"))
      return json(
        200,
        JSON.stringify({
          status: "active",
          instanceId: "cli:31fce9b9-5889-4db0-96f4-31b9b05046ba",
          model: "m-61c26317cc",
        })
      );
    if (url.endsWith("/freebuff/session")) return json(200, read("session.json"));
    if (url.endsWith("/agent-runs"))
      return json(200, JSON.stringify({ runId: "01a1c9d1-f49b-7637-8a65-2eac5c9f7165" }));
    if (url === CHAT)
      return new Response("data: [DONE]\n\n", {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    return json(404, JSON.stringify({ error: "not_found", url }));
  }) as typeof fetch;
  return { fetchImpl, captured };
}

function input(overrides: Partial<ExecuteInput> = {}): ExecuteInput {
  return {
    // The human id the caller uses; the executor must swap it for the handle.
    model: "fbc/deepseek-flash-slow",
    body: {
      messages: [
        { role: "system", content: "You are a terse coding assistant." },
        { role: "user", content: [{ type: "text", text: "hi" }] },
      ],
    },
    stream: true,
    credentials: { apiKey: "7f3d965c-f018-4693-90e4-e6d1bf5df92a" },
    ...overrides,
  } as ExecuteInput;
}

test("freebuff replay: the request matches the captured client on every load-bearing field", async () => {
  const catalog = JSON.parse(read("catalog.json")) as {
    fetchId: string;
    rows: Array<{ key: string; handle: string; legacyDigests?: string[] }>;
  };
  const slowRow = catalog.rows.find((r) =>
    (r.legacyDigests ?? []).includes(freebuffLegacyDigest("fbc/deepseek-flash-slow"))
  );
  const grantedRow = catalog.rows.find((r) => r.key === "m-61c26317cc");
  assert.ok(slowRow && grantedRow, "fixture catalog must contain requested and granted rows");

  const { fetchImpl, captured } = stubFetch();
  const memoryDevice = createMemoryDeviceStore();
  const executor = new FreebuffExecutor({
    fetchImpl,
    traceSessionId: "8c4f7520-58cf-4827-9b6b-21a4f582139f",
    externalDeviceKeyStores: [],
    deviceKeyStore: memoryDevice.store,
  });

  const result = await executor.execute(input());
  assert.equal(result.response.status, 200);

  const admission = captured.find((c) => c.url.endsWith("/session/admission"));
  const chat = captured.find((c) => c.url === CHAT);
  assert.ok(admission && chat, "admission and chat/completions must be called");

  const body = JSON.parse(chat!.body!) as Record<string, unknown>;
  const metadata = body.codebuff_metadata as Record<string, unknown>;

  // Exact handles from the fixture catalog: requested on admission, granted on chat.
  assert.equal(admission!.headers["x-freebuff-model"], slowRow!.handle);
  assert.equal(body.model, grantedRow!.handle);
  assert.equal(body.stream, true);
  assert.equal(body.tool_choice, "auto");
  assert.deepEqual(body.provider, { data_collection: "deny" });
  assert.equal(body.stop, undefined, "the captured client sends no stop sequence");

  // codebuff_metadata keys the upstream keys off.
  assert.equal(metadata.cost_mode, "free");
  assert.equal(metadata.surface, "cli");
  assert.equal(metadata.freebuff_multi_session, "1");
  assert.equal(metadata.freebuff_instance_id, "cli:31fce9b9-5889-4db0-96f4-31b9b05046ba");
  assert.equal(metadata.trace_session_id, "8c4f7520-58cf-4827-9b6b-21a4f582139f");
  assert.equal(metadata.run_id, "01a1c9d1-f49b-7637-8a65-2eac5c9f7165");
  assert.match(String(metadata.freebuff_client_env), /^v1;in=1;out=1;/);

  // Headers the upstream validates, including exact fetchId and Ed25519 attestation.
  assert.equal(chat!.headers["x-freebuff-sse-gzip-recovery"], "1");
  assert.equal(chat!.headers["x-freebuff-client-version"], "0.2.36");
  assert.equal(chat!.headers["x-freebuff-acting-user-id"], "77c8f38e-c31f-4669-9950-1cd3afe574a3");
  assert.match(
    String(chat!.headers["user-agent"]),
    /ai-sdk\/openai-compatible\/0\.0\.0-test\/codebuff/
  );
  assert.equal(chat!.headers["x-freebuff-catalog-protocol"], "1");
  assert.equal(chat!.headers["x-freebuff-catalog-fetch"], catalog.fetchId);
  assert.equal(chat!.headers["x-freebuff-device-key"], "A1-dwZRyav_SOTgVqG00de");

  const sigPayload = buildDeviceSignaturePayload({
    method: chat!.method,
    path: new URL(chat!.url).pathname,
    timestampMs: Number(chat!.headers["x-freebuff-device-ts"]),
    bodySha256: sha256Hex(chat!.body ?? ""),
    fetchId: catalog.fetchId,
  });
  const publicKey = ed25519SpkiFromRaw(base64UrlDecode(memoryDevice.getRecord().publicKey));
  const verified = verifyEd25519(
    null,
    Buffer.from(sigPayload),
    publicKey,
    base64UrlDecode(chat!.headers["x-freebuff-device-sig"])
  );
  assert.equal(verified, true, "chat device signature must verify with the registered Ed25519 key");
});

test("freebuff replay: the catalog in the fixture resolves the models it advertises", async () => {
  const catalog = JSON.parse(read("catalog.json")) as {
    fetchId: string;
    rows: Array<{ key: string; handle: string; legacyDigests?: string[] }>;
  };
  assert.ok(catalog.rows.length > 0);

  const flashRow = catalog.rows.find((r) =>
    (r.legacyDigests ?? []).includes(freebuffLegacyDigest("deepseek/deepseek-v4-flash"))
  );
  assert.ok(flashRow, "fixture catalog must resolve deepseek/deepseek-v4-flash");

  const { fetchImpl, captured } = stubFetch();
  const memoryDevice = createMemoryDeviceStore();
  const executor = new FreebuffExecutor({
    fetchImpl,
    externalDeviceKeyStores: [],
    deviceKeyStore: memoryDevice.store,
  });
  await executor.execute(input({ model: "deepseek/deepseek-v4-flash" }));

  // deepseek/deepseek-v4-flash -> 1e303ac563a6f9cc -> exact fixture row handle
  const admission = captured.find((c) => c.url.endsWith("/session/admission"));
  assert.equal(admission!.headers["x-freebuff-model"], flashRow!.handle);
  assert.equal(admission!.headers["x-freebuff-catalog-fetch"], catalog.fetchId);
});
