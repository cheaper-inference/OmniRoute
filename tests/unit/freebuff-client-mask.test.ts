import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { FreebuffExecutor } from "../../open-sse/executors/freebuff.ts";
import {
  FileDeviceStore,
  createDeviceRecord,
  loadDeviceKeyFile,
} from "../../open-sse/executors/freebuff/deviceKey.ts";
import type { ExecuteInput } from "../../open-sse/executors/base.ts";
import {
  freebuffLegacyDigest,
  parseFreebuffCatalog,
  resolveCatalogHandle,
  catalogModelIds,
  type FreebuffCatalog,
} from "../../open-sse/executors/freebuff/catalog.ts";
import {
  FREEBUFF_AGENT_ID,
  FREEBUFF_ENV_FINGERPRINT,
  FREEBUFF_CHAT_UA,
  FREEBUFF_RUNTIME_UA,
  freebuffCurrentDate,
  freebuffTimezone,
} from "../../open-sse/executors/freebuff/identity.ts";

const ORIGIN = "https://www.codebuff.com/api/v1";
const SESSION = `${ORIGIN}/freebuff/session`;
const ADMISSION = `${ORIGIN}/freebuff/session/admission`;
const CATALOG = `${ORIGIN}/freebuff/models`;
const AGENT_RUNS = `${ORIGIN}/agent-runs`;
const CHAT = `${ORIGIN}/chat/completions`;
const ME = `${ORIGIN}/me?fields=id%2Cemail`;
const DEVICE_KEYS = `${ORIGIN}/freebuff/device-keys`;

const HANDLE = "fbm1.AAEAAUSCwg087f-ulZoNY3BJxxPM7bvO4S7LIMa0";
const FETCH_ID = "fbf1.AAFeTWqXiGI7x-9fXCGDpNmDM6boua89Aocks70HOCd2";

type Captured = { url: string; method: string; headers: Record<string, string>; body?: string };

function headersToObject(headers: HeadersInit | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  new Headers(headers).forEach((value, key) => {
    out[key.toLowerCase()] = value;
  });
  return out;
}

function installFetchStub(handler: (url: string, init: RequestInit) => Response) {
  const captured: Captured[] = [];
  const fetchImpl = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    captured.push({
      url,
      method: (init?.method ?? "GET").toUpperCase(),
      headers: headersToObject(init?.headers),
      body: typeof init?.body === "string" ? init.body : undefined,
    });
    return handler(url, init ?? {});
  }) as typeof fetch;
  return { fetchImpl, captured };
}

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function catalogPayload(): unknown {
  return {
    protocol: 1,
    version: "v0.g1.e83073.limited.5.l0p25.n1",
    issuedAt: 1794385275070,
    refreshAt: Date.now() + 1_800_000,
    fetchId: FETCH_ID,
    recommendedKey: "m-61c26317cc",
    fallbackKey: "m-096e75164d",
    plansUrl: "https://freebuff.com/plans",
    rows: [
      {
        key: "m-096e75164d",
        handle: HANDLE,
        displayName: "DeepSeek V4.1 Flash Fast",
        access: "open",
        premium: false,
        contextWindow: 1_048_576,
        efforts: ["low", "high", "max"],
        defaultEffort: "high",
        legacyDigests: ["1e303ac563a6f9cc"],
      },
      {
        key: "m-61c26317cc",
        handle: "fbm1.AAEAAUSCLhltJWD5dbBVrCNLNLTaclRB3vqjs",
        displayName: "DeepSeek V4.1 Flash Slow",
        access: "open",
        premium: false,
        legacyDigests: ["466ec9e2f921d3d5", "85e88c27c998a67e"],
      },
      {
        key: "m-5a5d0e255e",
        handle: "fbm1.AAEAAUSCrYVqzV8ZabzXl4o",
        displayName: "GPT-6 Luna",
        access: "locked",
        premium: true,
        contextWindow: 1_000_000,
        legacyDigests: ["6fe0bf9071b3f925"],
      },
    ],
  };
}

function happyPath(url: string, init: RequestInit): Response {
  const method = (init?.method ?? "GET").toUpperCase();
  if (url === ME) return jsonResponse(200, { id: "account-1", email: "a@b.c" });
  if (url === CATALOG) return jsonResponse(200, catalogPayload());
  if (url === DEVICE_KEYS) return jsonResponse(200, { keyId: "A1-dwZRyav_SOTgVqG00de" });
  if (url === ADMISSION) {
    return jsonResponse(200, {
      status: "active",
      instanceId: "cli:server-instance",
      model: "m-096e75164d",
    });
  }
  if (url === SESSION && method === "GET") return jsonResponse(200, { status: "none" });
  if (url === AGENT_RUNS) return jsonResponse(200, { runId: "run-1" });
  if (url === CHAT) {
    return new Response("data: {}\n\n", {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });
  }
  return jsonResponse(404, { error: "not_found", url });
}

function makeInput(overrides: Partial<ExecuteInput> = {}): ExecuteInput {
  return {
    model: "deepseek/deepseek-v4-flash",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: true,
    credentials: { apiKey: "token-123" },
    ...overrides,
  } as ExecuteInput;
}

// ------------------------------- identity -------------------------------

test("freebuff identity: the env fingerprint and agent id match the captured client", () => {
  // A request carrying only x-freebuff-sse-gzip-recovery clears the 410 gate;
  // the env fingerprint is echoed in codebuff_metadata.freebuff_client_env.
  assert.match(FREEBUFF_ENV_FINGERPRINT, /^v1;in=1;out=1;tp=none;/);
  assert.match(FREEBUFF_ENV_FINGERPRINT, /;tls=0;/);
  assert.match(FREEBUFF_ENV_FINGERPRINT, /;osc=0;/);
  assert.equal(FREEBUFF_AGENT_ID, "base3-free-catalog");
  assert.equal(FREEBUFF_RUNTIME_UA, "Bun/1.3.14");
  assert.match(FREEBUFF_CHAT_UA, /^ai-sdk\/openai-compatible\/0\.0\.0-test\/codebuff /);
});

test("freebuff identity: timezone header drops zero-offset UTC aliases and keeps nonzero Etc/GMT", () => {
  assert.equal(freebuffTimezone("Europe/Kiev"), "Europe/Kiev");
  assert.equal(freebuffTimezone("America/Los_Angeles"), "America/Los_Angeles");
  assert.equal(freebuffTimezone("Etc/GMT+5"), "Etc/GMT+5");
  assert.equal(freebuffTimezone("Etc/GMT-2"), "Etc/GMT-2");
  assert.equal(freebuffTimezone("UTC"), undefined);
  assert.equal(freebuffTimezone("Etc/UTC"), undefined);
  assert.equal(freebuffTimezone("Etc/GMT"), undefined);
  assert.equal(freebuffTimezone("Etc/GMT+0"), undefined);
  assert.equal(freebuffTimezone(""), undefined);
  assert.equal(freebuffTimezone("not a zone"), undefined);
});

test("freebuff identity: the injected date uses the `November 18, 2026` shape", () => {
  assert.equal(
    freebuffCurrentDate(new Date(2026, 10, 18, 12, 0, 0).getTime()),
    "November 18, 2026"
  );
  assert.equal(freebuffCurrentDate(new Date(2026, 0, 1, 0, 0, 0).getTime()), "January 1, 2026");
  assert.equal(
    freebuffCurrentDate(new Date(2026, 11, 31, 23, 59, 59).getTime()),
    "December 31, 2026"
  );
});

// ------------------------------- catalog --------------------------------

test("freebuff catalog: legacy digest matches the upstream rows", () => {
  // Verified against a live catalog response.
  assert.equal(freebuffLegacyDigest("deepseek/deepseek-v4-flash"), "1e303ac563a6f9cc");
  assert.equal(freebuffLegacyDigest("fbc/deepseek-flash-slow"), "85e88c27c998a67e");
  assert.equal(freebuffLegacyDigest("openai/gpt-6-luna"), "6fe0bf9071b3f925");
});

test("freebuff catalog: parses rows, locked keys and resolves a human id to a handle", () => {
  const catalog = parseFreebuffCatalog(catalogPayload());
  assert.ok(catalog);
  assert.equal(catalog!.fetchId, FETCH_ID);
  assert.equal(catalog!.rows.length, 3);
  assert.deepEqual(catalog!.lockedKeys, ["m-5a5d0e255e"]);

  assert.equal(resolveCatalogHandle(catalog!, "deepseek/deepseek-v4-flash"), HANDLE);
  assert.equal(
    resolveCatalogHandle(catalog!, "fbc/deepseek-flash-slow"),
    "fbm1.AAEAAUSCLhltJWD5dbBVrCNLNLTaclRB3vqjs"
  );
  // A ready handle passes through; an unknown id resolves to null.
  assert.equal(resolveCatalogHandle(catalog!, HANDLE), HANDLE);
  assert.equal(resolveCatalogHandle(catalog!, "nope/not-a-model"), null);
});

test("freebuff catalog: a row with opensAt in the future is not selectable yet", () => {
  const payload = catalogPayload() as { rows: Array<Record<string, unknown>> };
  payload.rows[0].opensAt = Date.now() + 3_600_000;
  const catalog = parseFreebuffCatalog(payload) as FreebuffCatalog;
  assert.equal(resolveCatalogHandle(catalog, "deepseek/deepseek-v4-flash"), null);
  // ...but it resolves once the window opens.
  assert.equal(
    resolveCatalogHandle(catalog, "deepseek/deepseek-v4-flash", Date.now() + 7_200_000),
    HANDLE
  );
});

test("freebuff catalog: builds the model list from live rows instead of a static table", () => {
  const catalog = parseFreebuffCatalog(catalogPayload()) as FreebuffCatalog;
  const ids = catalogModelIds(catalog)
    .map((entry) => entry.id)
    .sort();
  assert.deepEqual(ids, [
    "deepseek/deepseek-v4-flash",
    "fbc/deepseek-flash-slow",
    "openai/gpt-6-luna",
  ]);
});

test("freebuff catalog: rejects a payload without fetchId or rows", () => {
  assert.equal(parseFreebuffCatalog({ rows: [] }), null);
  assert.equal(parseFreebuffCatalog({ fetchId: FETCH_ID, rows: [] }), null);
  assert.equal(parseFreebuffCatalog(null), null);
});

test("freebuff catalog: sanitizes invalid optional row fields without dropping valid rows", () => {
  const catalog = parseFreebuffCatalog({
    fetchId: FETCH_ID,
    rows: [
      {
        key: "m-096e75164d",
        handle: HANDLE,
        displayName: 42,
        opensAt: "later",
        legacyDigests: ["1e303ac563a6f9cc", 99],
      },
    ],
  });
  assert.ok(catalog);
  assert.equal(catalog!.rows[0].displayName, "m-096e75164d");
  assert.equal(catalog!.rows[0].opensAt, undefined);
  assert.deepEqual(catalog!.rows[0].legacyDigests, ["1e303ac563a6f9cc"]);
  assert.equal(resolveCatalogHandle(catalog!, "deepseek/deepseek-v4-flash"), HANDLE);
});

// ------------------------------- executor -------------------------------

test("FreebuffExecutor: missing credentials return 401", async () => {
  const executor = new FreebuffExecutor({ fetchImpl: installFetchStub(happyPath).fetchImpl });
  const res = await executor.execute(makeInput({ credentials: { apiKey: "" } }));
  assert.equal(res.response.status, 401);
  const data = (await res.response.json()) as { error: { message: string } };
  assert.match(data.error.message, /Freebuff Auth Token required/i);
});

test("FreebuffExecutor: admission sends the catalog handle, not a human model id", async () => {
  const { fetchImpl, captured } = installFetchStub(happyPath);
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });

  const result = await executor.execute(makeInput());
  assert.equal(result.response.status, 200);

  const admission = captured.find((c) => c.url === ADMISSION);
  assert.ok(admission, "must admit a session before chatting");
  assert.equal(admission!.method, "POST");
  assert.equal(admission!.headers["x-freebuff-model"], HANDLE);
  assert.equal(admission!.headers["x-freebuff-wallet-spend-limit"], "session");
  assert.equal(admission!.headers["x-freebuff-catalog-fetch"], FETCH_ID);
  assert.equal(admission!.headers["x-freebuff-multi-session"], "1");
  assert.equal(admission!.headers["x-freebuff-purchase-continuity"], "1");
  assert.equal(admission!.headers["x-freebuff-client-version"], "0.2.36");
  assert.equal(admission!.headers["user-agent"], FREEBUFF_RUNTIME_UA);
  // The admission call carries no body: the model travels in a header.
  assert.equal(admission!.body, undefined);
  // Device attestation is attached and scoped to the account.
  assert.equal(admission!.headers["x-freebuff-device-key"], "A1-dwZRyav_SOTgVqG00de");
  assert.match(admission!.headers["x-freebuff-device-ts"], /^\d+$/);
  assert.ok(admission!.headers["x-freebuff-device-sig"]);
});

test("FreebuffExecutor: catalog request carries the protocol headers", async () => {
  const { fetchImpl, captured } = installFetchStub(happyPath);
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });
  await executor.execute(makeInput());

  const catalog = captured.find((c) => c.url === CATALOG);
  assert.ok(catalog);
  assert.equal(catalog!.headers["x-freebuff-catalog-protocol"], "1");
  assert.equal(catalog!.headers["x-freebuff-client"], "cli");
});

test("FreebuffExecutor: the 410 gate header is sent on chat", async () => {
  const { fetchImpl, captured } = installFetchStub(happyPath);
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });
  await executor.execute(makeInput());

  const chat = captured.find((c) => c.url === CHAT);
  assert.ok(chat, "must call chat/completions");
  // This single header is what clears `410 freebuff_update_required`.
  assert.equal(chat!.headers["x-freebuff-sse-gzip-recovery"], "1");
  assert.equal(chat!.headers["x-freebuff-client-version"], "0.2.36");
  assert.equal(chat!.headers["x-freebuff-catalog-fetch"], FETCH_ID);
  assert.equal(chat!.headers["x-freebuff-acting-user-id"], "account-1");
  assert.equal(chat!.headers["user-agent"], FREEBUFF_CHAT_UA);
  // No stale identity headers from the previous implementation.
  assert.equal(chat!.headers["x-codebuff-run-id"], undefined);
  assert.equal(chat!.headers["x-codebuff-agent-id"], undefined);
});

test("FreebuffExecutor: agent run uses the single free-tier agent id", async () => {
  const { fetchImpl, captured } = installFetchStub(happyPath);
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });
  await executor.execute(makeInput());

  const run = captured.find((c) => c.url === AGENT_RUNS && JSON.parse(c.body!).action === "START");
  assert.ok(run, "must start an agent run");
  const runBody = JSON.parse(run!.body!) as Record<string, unknown>;
  assert.equal(runBody.agentId, FREEBUFF_AGENT_ID);
  // The official client opens a bare run; it never chains runs for a chat.
  assert.equal(runBody.ancestorRunIds, undefined);
  assert.equal(run!.headers["x-freebuff-acting-user-id"], "account-1");
});

test("FreebuffExecutor: chat body carries the official free-mode shape", async () => {
  const { fetchImpl, captured } = installFetchStub(happyPath);
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });
  await executor.execute(makeInput());

  const body = JSON.parse(captured.find((c) => c.url === CHAT)!.body!) as Record<string, unknown>;

  // The admitted catalog key wins over the requested id.
  assert.equal(body.model, HANDLE);
  assert.equal(body.stream, true, "the upstream only serves the free tier over a stream");
  assert.equal(body.tool_choice, "auto");
  assert.deepEqual(body.provider, { data_collection: "deny" });
  // The official client sends no `stop`; we must not invent one.
  assert.equal(body.stop, undefined);
  assert.equal(body.stream_options, undefined);

  const metadata = body.codebuff_metadata as Record<string, unknown>;
  assert.equal(metadata.freebuff_instance_id, "cli:server-instance");
  assert.equal(metadata.freebuff_multi_session, "1");
  assert.equal(metadata.surface, "cli");
  assert.equal(metadata.freebuff_client_env, FREEBUFF_ENV_FINGERPRINT);
  assert.equal(metadata.trace_session_id, "trace-1");
  assert.equal(metadata.run_id, "run-1");
  assert.equal(metadata.cost_mode, "free");
  assert.match(String(metadata.client_id), /^[0-9a-z]{13}$/);
});

test("FreebuffExecutor: a caller-supplied stop sequence is preserved", async () => {
  const { fetchImpl, captured } = installFetchStub(happyPath);
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });
  await executor.execute(
    makeInput({ body: { messages: [{ role: "user", content: "hi" }], stop: ["END"] } })
  );

  const body = JSON.parse(captured.find((c) => c.url === CHAT)!.body!) as Record<string, unknown>;
  assert.deepEqual(body.stop, ["END"]);
});

test("FreebuffExecutor: reasoning effort is forwarded into codebuff_metadata", async () => {
  const { fetchImpl, captured } = installFetchStub(happyPath);
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });
  await executor.execute(
    makeInput({ body: { messages: [{ role: "user", content: "hi" }], reasoning_effort: "high" } })
  );

  const body = JSON.parse(captured.find((c) => c.url === CHAT)!.body!) as {
    codebuff_metadata: Record<string, unknown>;
  };
  assert.equal(body.codebuff_metadata.reasoning_effort, "high");
});

test("FreebuffExecutor: developer role is promoted to system and harness markers dropped", async () => {
  const { fetchImpl, captured } = installFetchStub(happyPath);
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });
  await executor.execute(
    makeInput({
      body: {
        messages: [
          {
            role: "developer",
            content: "You are Claude Code, Anthropic's official CLI (cc_version=2.0.1).",
          },
          { role: "user", content: "hi" },
        ],
      },
    })
  );

  const body = JSON.parse(captured.find((c) => c.url === CHAT)!.body!) as {
    messages: Array<{ role: string; content: string }>;
  };
  assert.equal(body.messages[0].role, "system");
  assert.equal(body.messages[0].content.includes("You are Claude Code"), false);
  assert.equal(body.messages[0].content.includes("Anthropic's official CLI"), false);
  assert.equal(body.messages[0].content.includes("cc_version="), false);
});

const PERSONA =
  "You are Buffy, the coding agent behind Codebuff. You help users with software engineering tasks: fixing bugs, adding functionality, refactoring, and explaining code.";
const CURRENT_DATE = "Current date: November 18, 2026.";
const PREFIX = `${PERSONA}\n\n${CURRENT_DATE}\n\n- `;
/** Fixed clock so the injected date is deterministic. */
const NOW = () => new Date(2026, 10, 18, 12, 0, 0).getTime();

test("FreebuffExecutor: the Buffy persona and current date are prepended to the caller's system prompt", async () => {
  const { fetchImpl, captured } = installFetchStub(happyPath);
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1", now: NOW });
  await executor.execute(
    makeInput({
      body: {
        messages: [
          { role: "system", content: "You are a terse assistant." },
          { role: "user", content: "hi" },
        ],
      },
    })
  );

  const body = JSON.parse(captured.find((c) => c.url === CHAT)!.body!) as {
    messages: Array<{ role: string; content: string }>;
  };
  assert.equal(body.messages[0].role, "system");
  assert.equal(body.messages[0].content, `${PREFIX}You are a terse assistant.`);
});

test("FreebuffExecutor: the injected prefix has the exact persona + date + bullet shape", async () => {
  const { fetchImpl, captured } = installFetchStub(happyPath);
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1", now: NOW });
  await executor.execute(
    makeInput({
      body: {
        messages: [
          { role: "system", content: "Rules." },
          { role: "user", content: "hi" },
        ],
      },
    })
  );

  const body = JSON.parse(captured.find((c) => c.url === CHAT)!.body!) as {
    messages: Array<{ role: string; content: string }>;
  };
  assert.equal(
    body.messages[0].content,
    "You are Buffy, the coding agent behind Codebuff. You help users with software engineering tasks: fixing bugs, adding functionality, refactoring, and explaining code.\n\nCurrent date: November 18, 2026.\n\n- Rules."
  );
});

test("FreebuffExecutor: the persona injection is idempotent", async () => {
  const already = "You are Buffy, the coding agent behind Codebuff. Custom tail.";
  const { fetchImpl, captured } = installFetchStub(happyPath);
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1", now: NOW });
  await executor.execute(
    makeInput({
      body: {
        messages: [
          { role: "system", content: already },
          { role: "user", content: "hi" },
        ],
      },
    })
  );

  const body = JSON.parse(captured.find((c) => c.url === CHAT)!.body!) as {
    messages: Array<{ role: string; content: string }>;
  };
  assert.equal(body.messages[0].content, already);
});

test("FreebuffExecutor: array content gets the persona as a leading text part", async () => {
  const { fetchImpl, captured } = installFetchStub(happyPath);
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1", now: NOW });
  await executor.execute(
    makeInput({
      body: {
        messages: [
          { role: "system", content: [{ type: "text", text: "Caller rules." }] },
          { role: "user", content: "hi" },
        ],
      },
    })
  );

  const body = JSON.parse(captured.find((c) => c.url === CHAT)!.body!) as {
    messages: Array<{ role: string; content: Array<{ type: string; text: string }> }>;
  };
  assert.deepEqual(body.messages[0].content, [
    { type: "text", text: PREFIX },
    { type: "text", text: "Caller rules." },
  ]);
});

test("FreebuffExecutor: only the first system turn carries the persona", async () => {
  const { fetchImpl, captured } = installFetchStub(happyPath);
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1", now: NOW });
  await executor.execute(
    makeInput({
      body: {
        messages: [
          { role: "system", content: "First." },
          { role: "system", content: "Second." },
          { role: "user", content: "hi" },
        ],
      },
    })
  );

  const body = JSON.parse(captured.find((c) => c.url === CHAT)!.body!) as {
    messages: Array<{ role: string; content: string }>;
  };
  assert.match(body.messages[0].content, /^You are Buffy, the coding agent behind Codebuff/);
  assert.equal(body.messages[1].content, "Second.");
  assert.equal(body.messages[0].content.match(/You are Buffy/g)?.length, 1);
});

test("FreebuffExecutor: a missing system prompt still gets the persona and date", async () => {
  const { fetchImpl, captured } = installFetchStub(happyPath);
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1", now: NOW });
  await executor.execute(makeInput({ body: { messages: [{ role: "user", content: "hi" }] } }));

  const body = JSON.parse(captured.find((c) => c.url === CHAT)!.body!) as {
    messages: Array<{ role: string; content: string }>;
  };
  assert.equal(body.messages[0].role, "system");
  assert.equal(body.messages[0].content, `${PERSONA}\n\n${CURRENT_DATE}`);
});

test("FreebuffExecutor: 410 update_required is reported as a protocol problem", async () => {
  const { fetchImpl } = installFetchStub((url, init) => {
    if (url === CHAT) {
      return jsonResponse(410, {
        error: "freebuff_update_required",
        message: "This version of Freebuff is out of date.",
      });
    }
    return happyPath(url, init);
  });
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });

  const result = await executor.execute(makeInput());
  assert.equal(result.response.status, 410);
  const data = (await result.response.json()) as {
    error: { message: string; type: string; code?: string };
  };
  assert.equal(data.error.type, "upstream_protocol_error");
  assert.equal(data.error.code, "upgrade_required");
  assert.match(data.error.message, /rejected this client version/i);
  assert.match(data.error.message, /freebuff_update_required/);
});

test("FreebuffExecutor: a retired model maps to model_not_found", async () => {
  const { fetchImpl } = installFetchStub((url, init) => {
    if (url === CHAT) {
      return jsonResponse(410, {
        error: "freebuff_model_retired",
        message: "DeepSeek V4 Pro is no longer available in Freebuff.",
      });
    }
    return happyPath(url, init);
  });
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });

  const result = await executor.execute(makeInput());
  assert.equal(result.response.status, 410);
  const data = (await result.response.json()) as { error: { type: string } };
  assert.equal(data.error.type, "model_not_found");
});

test("FreebuffExecutor: 409 catalog_stale refetches the catalog and retries once", async () => {
  let catalogFetches = 0;
  let admissions = 0;
  const { fetchImpl } = installFetchStub((url, init) => {
    if (url === CATALOG) {
      catalogFetches += 1;
      return jsonResponse(200, catalogPayload());
    }
    if (url === ADMISSION) {
      admissions += 1;
      if (admissions === 1) {
        return jsonResponse(409, { error: "freebuff_catalog_stale" });
      }
      return jsonResponse(200, {
        status: "active",
        instanceId: "cli:server-instance",
        model: "m-096e75164d",
      });
    }
    return happyPath(url, init);
  });
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });

  const result = await executor.execute(makeInput());
  assert.equal(result.response.status, 200);
  assert.equal(catalogFetches, 2);
  assert.equal(admissions, 2);
});

test("FreebuffExecutor: a slot conflict is taken over via x-freebuff-takeover-instance-id", async () => {
  let admissions = 0;
  const { fetchImpl, captured } = installFetchStub((url, init) => {
    if (url === ADMISSION) {
      admissions += 1;
      if (admissions === 1) {
        return jsonResponse(409, {
          status: "purchase_capacity",
          requestedModel: "m-096e75164d",
          currentInstanceId: "cli:other-instance",
          concurrency: "slot-bound",
          slotLimit: 1,
        });
      }
      return jsonResponse(200, {
        status: "active",
        instanceId: "cli:our-instance",
        model: "m-096e75164d",
      });
    }
    return happyPath(url, init);
  });
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });

  const result = await executor.execute(makeInput());
  assert.equal(result.response.status, 200);
  assert.equal(admissions, 2, "must retry once after the takeover");

  const attempts = captured.filter((c) => c.url === ADMISSION);
  assert.equal(attempts[0].headers["x-freebuff-takeover-instance-id"], undefined);
  assert.equal(
    attempts[1].headers["x-freebuff-takeover-instance-id"],
    "cli:other-instance",
    "the retry must claim the slot rather than end it"
  );
  // Takeover must not delete the other window's session.
  assert.equal(
    captured.some((c) => c.method === "DELETE"),
    false,
    "must not end the other session"
  );
});

test("FreebuffExecutor: a released claim mints a new instance id and retries", async () => {
  let admissions = 0;
  const seenInstanceIds: string[] = [];
  const { fetchImpl } = installFetchStub((url, init) => {
    if (url === ADMISSION) {
      admissions += 1;
      const headers = new Headers(init?.headers);
      seenInstanceIds.push(headers.get("x-freebuff-instance-id") ?? "");
      if (admissions === 1) {
        return jsonResponse(409, {
          status: "purchase_claim_released",
          accessTier: "limited",
          desktopPurchases: [],
          desktopRefunds: [{ claimInstanceIds: ["cli:dead-instance"], amount: 5 }],
        });
      }
      return jsonResponse(200, {
        status: "active",
        instanceId: "cli:fresh-instance",
        model: "m-096e75164d",
      });
    }
    return happyPath(url, init);
  });
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });

  const result = await executor.execute(makeInput());
  assert.equal(result.response.status, 200);
  assert.equal(admissions, 2, "must retry with a fresh instance id");
  assert.notEqual(
    seenInstanceIds[0],
    seenInstanceIds[1],
    "the dead instance id must not be reused"
  );
});

test("FreebuffExecutor: a released claim that keeps failing surfaces session_released", async () => {
  const { fetchImpl } = installFetchStub((url, init) => {
    if (url === ADMISSION) {
      return jsonResponse(409, {
        status: "purchase_claim_released",
        desktopPurchases: [],
      });
    }
    return happyPath(url, init);
  });
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });

  const result = await executor.execute(makeInput());
  assert.equal(result.response.status, 409);
  const data = (await result.response.json()) as { error: { type: string; message: string } };
  assert.equal(data.error.type, "session_expired");
  assert.match(data.error.message, /released this session upstream/i);
});

test("FreebuffExecutor: a second turn reuses the admitted instance id", async () => {
  const { fetchImpl, captured } = installFetchStub(happyPath);
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });

  // The upstream admits a different id than we asked for on the first turn.
  await executor.execute(makeInput());
  await executor.execute(makeInput());

  const admissions = captured.filter((c) => c.url === ADMISSION);
  assert.equal(admissions.length, 2);
  assert.equal(
    admissions[1].headers["x-freebuff-instance-id"],
    "cli:server-instance",
    "the second turn must reuse the admitted id, not invent a new one"
  );
});

test("FreebuffExecutor: X-Session-Id gives each conversation its own slot", async () => {
  const { fetchImpl, captured } = installFetchStub(happyPath);
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });

  await executor.execute(makeInput({ clientHeaders: { "x-session-id": "chat-a" } }));
  await executor.execute(makeInput({ clientHeaders: { "x-session-id": "chat-b" } }));

  const admissions = captured.filter((c) => c.url === ADMISSION);
  // Both chats are admitted, and neither takes over the other.
  assert.equal(admissions.length, 2);
  assert.equal(admissions[0].headers["x-freebuff-takeover-instance-id"], undefined);
  assert.equal(admissions[1].headers["x-freebuff-takeover-instance-id"], undefined);
});

test("FreebuffExecutor: a multi-turn chat keeps one client_id and trace_session_id", async () => {
  const { fetchImpl, captured } = installFetchStub(happyPath);
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });

  await executor.execute(makeInput());
  await executor.execute(makeInput());
  await executor.execute(makeInput());

  const chats = captured.filter((c) => c.url === CHAT);
  assert.equal(chats.length, 3);
  const metadata = chats.map(
    (c) => (JSON.parse(c.body!) as { codebuff_metadata: Record<string, unknown> }).codebuff_metadata
  );
  // Same chat -> same identity on every turn; a fresh client_id per request is
  // exactly what made the upstream treat each message as a new conversation.
  assert.equal(new Set(metadata.map((m) => m.client_id)).size, 1);
  assert.equal(new Set(metadata.map((m) => m.trace_session_id)).size, 1);
  assert.equal(new Set(metadata.map((m) => m.freebuff_instance_id)).size, 1);
});

test("FreebuffExecutor: one run per chat, replayed on every turn", async () => {
  let starts = 0;
  const { fetchImpl, captured } = installFetchStub((url, init) => {
    if (url === AGENT_RUNS) {
      const body = JSON.parse(String(init.body ?? "{}")) as { action?: string };
      if (body.action === "START") {
        starts += 1;
        return jsonResponse(200, { runId: `run-${starts}` });
      }
      return jsonResponse(200, {});
    }
    return happyPath(url, init);
  });
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });

  await executor.execute(makeInput());
  await executor.execute(makeInput());
  await executor.execute(makeInput());

  // The official client opens one run per session and replays its id; a run
  // per message is exactly what produced `No runId found in request body`.
  assert.equal(starts, 1, "must not start a new run per message");

  const runIds = captured
    .filter((c) => c.url === CHAT)
    .map(
      (c) =>
        (JSON.parse(c.body!) as { codebuff_metadata: Record<string, unknown> }).codebuff_metadata
    )
    .map((m) => m.run_id);
  assert.deepEqual(runIds, ["run-1", "run-1", "run-1"]);
  assert.ok(runIds.every((id) => typeof id === "string" && id.length > 0));
});

test("FreebuffExecutor: a successful turn does not finish the chat's run", async () => {
  const { fetchImpl, captured } = installFetchStub(happyPath);
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });

  await executor.execute(makeInput());
  await executor.execute(makeInput());

  const finishes = captured.filter(
    (c) => c.url === AGENT_RUNS && JSON.parse(c.body!).action === "FINISH"
  );
  assert.equal(finishes.length, 0, "the run must stay alive for the next turn");
});

test("FreebuffExecutor: a failed chat request fails loudly instead of sending an empty run_id", async () => {
  const { fetchImpl, captured } = installFetchStub((url, init) => {
    if (url === AGENT_RUNS) return jsonResponse(500, { error: "agent_runs_down" });
    return happyPath(url, init);
  });
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });

  const result = await executor.execute(makeInput());
  assert.equal(result.response.status, 502);
  const data = (await result.response.json()) as { error: { message: string } };
  assert.match(data.error.message, /could not start an agent run/i);
  assert.equal(
    captured.some((c) => c.url === CHAT),
    false,
    "must not forward a chat request without a run id"
  );
});

test("FreebuffExecutor: separate chats do not share a client_id, trace_session_id or run chain", async () => {
  const { fetchImpl, captured } = installFetchStub(happyPath);
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });

  await executor.execute(makeInput({ clientHeaders: { "x-session-id": "chat-a" } }));
  await executor.execute(makeInput({ clientHeaders: { "x-session-id": "chat-b" } }));

  const metadata = captured
    .filter((c) => c.url === CHAT)
    .map(
      (c) =>
        (JSON.parse(c.body!) as { codebuff_metadata: Record<string, unknown> }).codebuff_metadata
    );
  assert.notEqual(metadata[0].client_id, metadata[1].client_id);
  assert.notEqual(metadata[0].trace_session_id, metadata[1].trace_session_id);

  // Each chat asks the upstream for its own slot (the stub admits one id for
  // both, so compare what was requested, not what came back).
  const requested = captured
    .filter((c) => c.url === ADMISSION)
    .map((c) => c.headers["x-freebuff-instance-id"]);
  assert.notEqual(requested[0], requested[1]);
});

test("FreebuffExecutor: a late failure of an older run does not wipe a newer run", async () => {
  let runCounter = 0;
  let resolveSlowChat: (() => void) | null = null;
  let chatCount = 0;
  const { fetchImpl, captured } = installFetchStub(async (url, init) => {
    if (url === AGENT_RUNS) {
      const body = JSON.parse(String(init.body ?? "{}")) as { action?: string };
      if (body.action === "START") {
        runCounter += 1;
        return jsonResponse(200, { runId: `run-${runCounter}` });
      }
      return jsonResponse(200, {});
    }
    if (url === CHAT) {
      chatCount += 1;
      if (chatCount === 1) {
        await new Promise<void>((resolve) => {
          resolveSlowChat = resolve;
        });
        return jsonResponse(500, { message: "late failure on R1" });
      }
      return new Response("data: {}\n\n", {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    }
    return happyPath(url, init);
  });

  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });
  const firstTurn = executor.execute(makeInput());
  // Wait until the slow first turn reaches CHAT (R1 is now active and stored).
  while (!resolveSlowChat) await new Promise((r) => setTimeout(r, 5));

  // Clear R1 by rotating a fresh run R2 into the conversation state, then let R1 fail.
  (executor as unknown as { forgetRun: (k: string) => void }).forgetRun("account-1:default");
  const secondTurn = await executor.execute(makeInput());
  assert.equal(secondTurn.response.status, 200);

  resolveSlowChat();
  const lateFail = await firstTurn;
  assert.equal(lateFail.response.status, 500);

  // A third turn must still replay R2 instead of starting R3.
  const thirdTurn = await executor.execute(makeInput());
  assert.equal(thirdTurn.response.status, 200);
  const runIds = captured
    .filter((c) => c.url === CHAT)
    .map(
      (c) =>
        (JSON.parse(c.body!) as { codebuff_metadata: Record<string, unknown> }).codebuff_metadata
    )
    .map((m) => m.run_id);
  assert.equal(runIds[2], "run-2");
});

test("FreebuffExecutor: device key registration attaches a bounded AbortSignal", async () => {
  let registrationSignal: AbortSignal | null | undefined;
  const { fetchImpl } = installFetchStub((url, init) => {
    if (url === DEVICE_KEYS) registrationSignal = init.signal;
    return happyPath(url, init);
  });
  const executor = new FreebuffExecutor({
    fetchImpl,
    externalDeviceKeyStores: [],
    deviceKeyStore: {
      persistable: true,
      async load() {
        return createDeviceRecord();
      },
      async save() {},
    },
  });
  await executor.execute(makeInput());
  assert.ok(
    registrationSignal instanceof AbortSignal,
    "registration POST must be bounded by timeout signal"
  );
});

test("FileDeviceStore: concurrent saves serialize cleanly without corrupting the key file", async () => {
  const dir = mkdtempSync(path.join(os.tmpdir(), "freebuff-devstore-"));
  const filePath = path.join(dir, "device-key.json");
  try {
    const store = new FileDeviceStore(filePath);
    const base = createDeviceRecord();
    await Promise.all([
      store.save({ ...base, registrations: { "https://a": "k1" } }),
      store.save({ ...base, registrations: { "https://a": "k1", "https://b": "k2" } }),
      store.save({
        ...base,
        registrations: { "https://a": "k1", "https://b": "k2", "https://c": "k3" },
      }),
    ]);
    const loaded = await loadDeviceKeyFile(filePath);
    assert.ok(loaded);
    assert.equal(loaded!.registrations["https://c"], "k3");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("FreebuffExecutor: conversation continuity survives a dead session slot", async () => {
  let admissions = 0;
  const { fetchImpl, captured } = installFetchStub((url, init) => {
    if (url === ADMISSION) {
      admissions += 1;
      if (admissions === 2) {
        return jsonResponse(409, { status: "purchase_claim_released" });
      }
      return jsonResponse(200, {
        status: "active",
        instanceId: `cli:instance-${admissions}`,
        model: "m-096e75164d",
      });
    }
    return happyPath(url, init);
  });
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });

  await executor.execute(makeInput());
  await executor.execute(makeInput());

  const metadata = captured
    .filter((c) => c.url === CHAT)
    .map(
      (c) =>
        (JSON.parse(c.body!) as { codebuff_metadata: Record<string, unknown> }).codebuff_metadata
    );
  // The slot changed (released hour), but it is still the same chat client-side.
  assert.notEqual(metadata[0].freebuff_instance_id, metadata[1].freebuff_instance_id);
  assert.equal(metadata[0].client_id, metadata[1].client_id);
  assert.equal(metadata[0].trace_session_id, metadata[1].trace_session_id);
});

test("FreebuffExecutor: without a session header every request continues ONE chat", async () => {
  const { fetchImpl, captured } = installFetchStub(happyPath);
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });

  // Two different conversations, no identity header, and no shared history -
  // the worst case for any content-derived key.
  await executor.execute(
    makeInput({ body: { messages: [{ role: "user", content: "Write a haiku." }] } })
  );
  await executor.execute(
    makeInput({ body: { messages: [{ role: "user", content: "Explain TCP slow start." }] } })
  );

  const metadata = captured
    .filter((c) => c.url === CHAT)
    .map(
      (c) =>
        (JSON.parse(c.body!) as { codebuff_metadata: Record<string, unknown> }).codebuff_metadata
    );
  // One chat per account when the client sends no identity: same client, same
  // trace, same slot, and the same live run.
  assert.equal(metadata[0].client_id, metadata[1].client_id);
  assert.equal(metadata[0].trace_session_id, metadata[1].trace_session_id);
  assert.equal(metadata[0].freebuff_instance_id, metadata[1].freebuff_instance_id);
  assert.equal(metadata[0].run_id, metadata[1].run_id);
  assert.ok(metadata[1].run_id);

  const starts = captured
    .filter((c) => c.url === AGENT_RUNS)
    .map((c) => JSON.parse(c.body!) as { action: string })
    .filter((b) => b.action === "START");
  assert.equal(starts.length, 1, "one run for the whole chat");
});

test("FreebuffExecutor: an exhausted Freebucks pool carries the real retry hint", async () => {
  // Live shape captured 2026-11-18 from an account with daily 25/25 spent.
  const exhausted = {
    status: "rate_limited",
    accessTier: "limited",
    model: "deepseek/deepseek-v4-flash",
    pool: "freebucks",
    poolLabel: "Freebucks",
    limit: 25,
    recentCount: 25,
    period: "pacific_day",
    resetAt: "2026-11-18T22:00:00.000Z",
    windowHours: 24,
    retryAfterMs: 6_148_883,
    freebucksShortfall: { price: 15, balance: 0 },
  };
  const { fetchImpl } = installFetchStub((url, init) => {
    if (url === ADMISSION) return jsonResponse(429, exhausted);
    return happyPath(url, init);
  });
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });

  const result = await executor.execute(makeInput());
  assert.equal(result.response.status, 429);
  // The caller parks the account for the pool reset instead of retrying it
  // seconds later against a budget that only refills at the day boundary.
  assert.equal(result.response.headers.get("retry-after"), String(Math.ceil(6_148_883 / 1000)));
  const data = (await result.response.json()) as { error: { code?: string; type: string } };
  assert.equal(data.error.code, "insufficient_quota");
});

test("FreebuffExecutor: chat endpoint 429 overusage carries transient code and Retry-After", async () => {
  const { fetchImpl } = installFetchStub((url, init) => {
    if (url === CHAT) {
      return jsonResponse(429, { status: "rate_limited", message: "overusage: busy right now" });
    }
    return happyPath(url, init);
  });
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });

  const result = await executor.execute(makeInput());
  assert.equal(result.response.status, 429);
  assert.equal(result.response.headers.get("retry-after"), "3");
  const data = (await result.response.json()) as { error: { code?: string; type: string } };
  assert.equal(data.error.code, "rate_limit_exceeded");
});

test("FreebuffExecutor: a transient admission rejection asks for a quick same-account retry", async () => {
  const { fetchImpl, captured } = installFetchStub((url, init) => {
    if (url === ADMISSION) {
      return jsonResponse(409, {
        status: "model_unavailable",
        requestedModel: "mimo/mimo-v2.5",
        withdrawn: true,
      });
    }
    return happyPath(url, init);
  });
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });

  const result = await executor.execute(makeInput());
  assert.equal(result.response.status, 409);
  // Not a spent pool: short hint so the SAME account is retried, because a
  // rotation would bill another account's hour for nothing.
  assert.equal(result.response.headers.get("retry-after"), "3");
  assert.equal(
    captured.some((c) => c.url === CHAT),
    false,
    "must not chat after a rejected admission"
  );
});

test("FreebuffExecutor: an upstream 5xx on admission is retryable, not terminal", async () => {
  const { fetchImpl } = installFetchStub((url, init) => {
    if (url === ADMISSION) return jsonResponse(503, { status: "unavailable" });
    return happyPath(url, init);
  });
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });

  const result = await executor.execute(makeInput());
  assert.equal(result.response.status, 503);
  assert.equal(result.response.headers.get("retry-after"), "3");
});

test("FreebuffExecutor: a withdrawn model handle is retried on the SAME account after a catalog refresh", async () => {
  let admissions = 0;
  const { fetchImpl } = installFetchStub((url, init) => {
    if (url === ADMISSION) {
      admissions += 1;
      if (admissions === 1) {
        return jsonResponse(409, {
          status: "model_unavailable",
          requestedModel: "mimo/mimo-v2.5",
          withdrawn: true,
        });
      }
      return jsonResponse(200, {
        status: "active",
        instanceId: "cli:server-instance",
        model: "m-096e75164d",
      });
    }
    return happyPath(url, init);
  });
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });

  const result = await executor.execute(makeInput());
  // Resolved inside the executor: no account rotation, no wasted hour.
  assert.equal(result.response.status, 200);
  assert.equal(admissions, 2);
});

test("FreebuffExecutor: a permanently withdrawn model still surfaces after the retry budget", async () => {
  let admissions = 0;
  const { fetchImpl } = installFetchStub((url, init) => {
    if (url === ADMISSION) {
      admissions += 1;
      return jsonResponse(409, {
        status: "model_unavailable",
        requestedModel: "mimo/mimo-v2.5",
        withdrawn: true,
      });
    }
    return happyPath(url, init);
  });
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });

  const result = await executor.execute(makeInput());
  assert.equal(result.response.status, 409);
  // Bounded: the initial attempt plus FREEBUFF_MODEL_RETRY_MAX retries.
  assert.equal(admissions, 3);
});

test("FreebuffExecutor: session failure surfaces the upstream status", async () => {
  const { fetchImpl } = installFetchStub((url, init) => {
    if (url === ADMISSION) {
      return jsonResponse(429, {
        status: "rate_limited",
        message: "one free account per person",
      });
    }
    return happyPath(url, init);
  });
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });

  const result = await executor.execute(makeInput());
  assert.equal(result.response.status, 429);
  const data = (await result.response.json()) as { error: { message: string; type: string } };
  // A rate-limited admission is its own class, not a generic upstream failure.
  assert.equal(data.error.type, "rate_limit_error");
  assert.match(data.error.message, /Freebuff limit reached \(rate_limited\)/);
  assert.match(data.error.message, /one free account per person/);
});

test("FreebuffExecutor: an unknown model is sent through untouched when the catalog is unreachable", async () => {
  const { fetchImpl, captured } = installFetchStub((url, init) => {
    if (url === CATALOG) return jsonResponse(500, { error: "boom" });
    return happyPath(url, init);
  });
  const executor = new FreebuffExecutor({ fetchImpl, traceSessionId: "trace-1" });

  const result = await executor.execute(makeInput({ model: "custom/whatever" }));
  assert.equal(result.response.status, 200);
  assert.equal(
    captured.find((c) => c.url === ADMISSION)!.headers["x-freebuff-model"],
    "custom/whatever"
  );
});
