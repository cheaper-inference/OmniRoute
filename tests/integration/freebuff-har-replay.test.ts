/**
 * Replays the executor against the real captured HAR exchanges (fixtures
 * extracted from the official client session) and asserts the produced request
 * is byte-compatible with what the upstream accepted.
 *
 * Fixtures: tests/fixtures/freebuff/ (catalog, session, admission, chat body).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { FreebuffExecutor } from "../../open-sse/executors/freebuff.ts";
import type { ExecuteInput } from "../../open-sse/executors/base.ts";

const FIXTURES = join(dirname(fileURLToPath(import.meta.url)), "..", "fixtures", "freebuff");
const read = (name: string) => readFileSync(join(FIXTURES, name), "utf8");

const ORIGIN = "https://www.codebuff.com/api/v1";
const CHAT = `${ORIGIN}/chat/completions`;

type Captured = { url: string; method: string; headers: Record<string, string>; body?: string };

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
  const { fetchImpl, captured } = stubFetch();
  const executor = new FreebuffExecutor({
    fetchImpl,
    traceSessionId: "8c4f7520-58cf-4827-9b6b-21a4f582139f",
  });

  const result = await executor.execute(input());
  assert.equal(result.response.status, 200);

  const chat = captured.find((c) => c.url === CHAT);
  assert.ok(chat, "chat/completions must be called");

  const body = JSON.parse(chat!.body!) as Record<string, unknown>;
  const metadata = body.codebuff_metadata as Record<string, unknown>;

  // Model: the catalog handle, exactly as the captured client sends it.
  assert.match(String(body.model), /^fbm1\./);
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

  // Headers the upstream validates.
  assert.equal(chat!.headers["x-freebuff-sse-gzip-recovery"], "1");
  assert.equal(chat!.headers["x-freebuff-client-version"], "0.2.36");
  assert.equal(chat!.headers["x-freebuff-acting-user-id"], "77c8f38e-c31f-4669-9950-1cd3afe574a3");
  assert.match(
    String(chat!.headers["user-agent"]),
    /ai-sdk\/openai-compatible\/0\.0\.0-test\/codebuff/
  );
  assert.equal(chat!.headers["x-freebuff-catalog-protocol"], "1");
  assert.ok(chat!.headers["x-freebuff-catalog-fetch"]?.startsWith("fbf1."));
});

test("freebuff replay: the catalog in the fixture resolves the models it advertises", async () => {
  const catalog = JSON.parse(read("catalog.json")) as {
    rows: Array<{ key: string; legacyDigests?: string[] }>;
  };
  assert.ok(catalog.rows.length > 0);

  const { fetchImpl, captured } = stubFetch();
  const executor = new FreebuffExecutor({ fetchImpl });
  await executor.execute(input({ model: "deepseek/deepseek-v4-flash" }));

  // deepseek/deepseek-v4-flash -> 1e303ac563a6f9cc -> row m-096e75164d
  const admission = captured.find((c) => c.url.endsWith("/session/admission"));
  assert.ok(admission!.headers["x-freebuff-model"].startsWith("fbm1."));
  assert.notEqual(admission!.headers["x-freebuff-model"], "deepseek/deepseek-v4-flash");
});
