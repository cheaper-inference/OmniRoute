/**
 * Executor body isolation, cheap version: the #16631 class of bug, checked for every executor.
 *
 * A combo replays the caller's body on its next step and hands each target only a SHALLOW copy
 * (#7847), so an executor that rewrites a nested object of the body it is given (a tool name, a
 * system block, a cache_control) rewrites it for the fallback provider too. #16648 fixed that for
 * the Claude OAuth block; claude-oauth-frozen-body-egress-guard-16631.test.ts pins it.
 *
 * Every executor getExecutor() can return is driven once per request format it serves (openai,
 * openai-responses, claude, gemini; its first model of that format) up to the upstream fetch,
 * which is stubbed, with every other transport blocked by tests/_setup/egressGuard.ts and the
 * body deep-frozen, so an in-place write throws a TypeError whose stack names the line.
 *
 * Nothing is pinned: no list of unreachable executors, no table of known writers, no exact
 * counts. Writers and executors the stubs cannot drive to fetch are REPORTED through
 * t.diagnostic and never fail the test. It fails only when the harness stops working: the guard
 * was left installed, a corpus body was not frozen, or a format reached fetch in no executor.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import childProcess from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { clearEgressHits, egressHits, installEgressGuard } from "../_setup/egressGuard.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-frozen-body-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { getExecutor, listExecutorAliases } = await import("../../open-sse/executors/index.ts");
const { PROVIDERS } = await import("../../open-sse/config/constants.ts");
const { getRegistryEntry } = await import("../../open-sse/config/providerRegistry.ts");
const { getModelTargetFormat } = await import("../../open-sse/config/providerModels.ts");
const { AI_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { resetWafRateLimit } = await import("../../open-sse/services/wafRateLimit.ts");
const core = await import("../../src/lib/db/core.ts");

type Json = Record<string, unknown>;
type Executor = Awaited<ReturnType<typeof getExecutor>>;
type Bucket = "openai" | "openai-responses" | "claude" | "gemini";

const REPO_ROOT = fileURLToPath(new URL("../../", import.meta.url));
const CASE_TIMEOUT_MS = 5000;
/** How long a case that timed out gets, after its abort, to settle before the survey ends. */
const LINGER_GRACE_MS = 10_000;
/** Cases whose execute() timed out and has not settled yet. Labels repeat across a provider's cases. */
const lingering = new Set<Case>();
const SUITE_TIMEOUT_MS = 60_000;
const BUCKETS: Bucket[] = ["openai", "openai-responses", "claude", "gemini"];

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

// ── Corpus: one body per request format ────────────────────────────────────────
// Each carries the nested objects a rewrite would touch (tools, tool_choice, tool-call history,
// system blocks, cache_control, metadata). LONG_TOOL is over the 64-character tool name cap some
// providers alias. MARKER is in a user turn: a stubbed fetch counts as the upstream request only
// when its body contains it, so an auxiliary call (token mint, version check) is not mistaken.
const MARKER = "frozen-body-probe";
const LONG_TOOL =
  "mcp__claude_ai_Example_Workspace_Server__search_every_document_in_the_shared_drive";

const BODIES: Record<Bucket, (model: string) => Json> = {
  openai: (model) => ({
    model,
    stream: false,
    max_tokens: 256,
    messages: [
      { role: "system", content: [{ type: "text", text: "You are helpful." }] },
      { role: "user", content: `Weather in Paris? ${MARKER}` },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          { id: "call_1", type: "function", function: { name: "get_weather", arguments: "{}" } },
          { id: "call_2", type: "function", function: { name: LONG_TOOL, arguments: "{}" } },
        ],
      },
      { role: "tool", tool_call_id: "call_1", content: "sunny" },
      { role: "tool", tool_call_id: "call_2", content: "none" },
    ],
    tools: [
      {
        type: "function",
        function: { name: "get_weather", parameters: { type: "object", properties: {} } },
      },
      { type: "function", function: { name: LONG_TOOL, parameters: { type: "object" } } },
    ],
    tool_choice: { type: "function", function: { name: "get_weather" } },
    response_format: { type: "text" },
  }),
  "openai-responses": (model) => ({
    model,
    stream: false,
    instructions: "Be brief.",
    input: [
      {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: `look it up ${MARKER}` }],
      },
      { type: "function_call", call_id: "call_1", name: "lookup", arguments: "{}" },
      { type: "function_call_output", call_id: "call_1", output: "done" },
      { type: "function_call", call_id: "call_2", name: LONG_TOOL, arguments: "{}" },
      { type: "function_call_output", call_id: "call_2", output: "none" },
    ],
    tools: [
      { type: "function", name: "lookup", parameters: { type: "object", properties: {} } },
      { type: "function", name: LONG_TOOL, parameters: { type: "object" } },
    ],
    tool_choice: "auto",
    reasoning: { effort: "low" },
  }),
  claude: (model) => ({
    model,
    max_tokens: 1024,
    stream: false,
    system: [
      { type: "text", text: "You are a coding agent.", cache_control: { type: "ephemeral" } },
    ],
    metadata: { user_id: "client-user" },
    tools: [
      {
        name: "read",
        description: "Read a file",
        input_schema: { type: "object", properties: { path: { type: "string" } } },
        cache_control: { type: "ephemeral" },
      },
      { name: "proxy_glob", description: "Glob files", input_schema: { type: "object" } },
      { name: LONG_TOOL, description: "Search", input_schema: { type: "object" } },
    ],
    tool_choice: { type: "auto" },
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: `read a.ts ${MARKER}`, cache_control: { type: "ephemeral" } },
        ],
      },
      {
        role: "assistant",
        content: [
          { type: "tool_use", id: "toolu_1", name: "read", input: { path: "a.ts" } },
          { type: "tool_use", id: "toolu_2", name: LONG_TOOL, input: { q: "x" } },
        ],
      },
      {
        role: "user",
        content: [
          { type: "tool_result", tool_use_id: "toolu_1", content: "export {}" },
          { type: "tool_result", tool_use_id: "toolu_2", content: "none" },
        ],
      },
    ],
  }),
  gemini: (model) => ({
    model,
    systemInstruction: { role: "user", parts: [{ text: "Be brief." }] },
    contents: [
      { role: "user", parts: [{ text: `look it up ${MARKER}` }] },
      { role: "model", parts: [{ functionCall: { name: LONG_TOOL, args: { q: "x" } } }] },
      { role: "user", parts: [{ functionResponse: { name: LONG_TOOL, response: { ok: true } } }] },
    ],
    tools: [{ functionDeclarations: [{ name: LONG_TOOL, parameters: { type: "object" } }] }],
    generationConfig: { maxOutputTokens: 256, thinkingConfig: { thinkingBudget: 1024 } },
  }),
};

// ── Credentials ────────────────────────────────────────────────────────────────
// One generic profile for everyone, plus the stub shapes some executors validate before they
// dispatch. An executor without a fixture that needs one shows up as "not reached", never as a
// failure.
const FAR_FUTURE = new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString();
const b64url = (value: unknown) => Buffer.from(JSON.stringify(value)).toString("base64url");
const STUB_JWT = [
  b64url({ alg: "none" }),
  b64url({ id: "u1", sub: "u1", exp: 4102444800 }),
  "x",
].join(".");
const FIXTURES: Record<string, { model?: string; apiKey?: string; providerSpecificData?: Json }> = {
  "ghe-copilot": { providerSpecificData: { gheUrl: "https://ghe.example.com" } },
  "cloudflare-ai": { providerSpecificData: { accountId: "0123456789abcdef0123456789abcdef" } },
  maxai: { providerSpecificData: { deviceId: "device-1", userId: "user-1" } },
  promptql: { providerSpecificData: { projectId: "project-1" } },
  "gemini-web": { providerSpecificData: { cookie: "__Secure-1PSID=x; __Secure-1PSIDTS=y" } },
  "t3-web": { apiKey: "convex-session-id=s1; sessionToken=t1" },
  "yuanbao-web": { apiKey: "hy_user=u1; hy_token=t1" },
  "doubao-web": { apiKey: "sessionid=s1; ttwid=t1; s_v_web_id=verify_fp1" },
  "zenmux-free": { apiKey: "ctoken=c1" },
  "tinycms-web": { apiKey: "R0000000-0000-0000-0000-000000000000" },
  "zai-web": { apiKey: STUB_JWT },
  antigravity: { providerSpecificData: { projectId: "project-1" } },
  syntx: { apiKey: STUB_JWT },
  chatplayground: { model: "gpt-6.1-sol", apiKey: STUB_JWT },
};

function credentialsFor(provider: string): Json {
  const fixture = FIXTURES[provider] ?? {};
  const providerSpecificData: Json = { ...fixture.providerSpecificData };
  // Dynamic compatible nodes carry their host on the connection.
  if (/^(openai|anthropic)-compatible-/.test(provider)) {
    providerSpecificData.baseUrl = "https://upstream.example.com/v1";
  }
  return {
    apiKey: fixture.apiKey ?? "sk-test-frozen-body",
    accessToken: "test-access-token",
    refreshToken: "test-refresh-token",
    expiresAt: FAR_FUTURE,
    providerSpecificData,
  };
}

// ── Enumeration: executor x format ─────────────────────────────────────────────
type Case = { label: string; executor: Executor; bucket: Bucket; model: string };

const COMPATIBLE_NODE_IDS = [
  "openai-compatible-frozen-body",
  "anthropic-compatible-frozen-body",
  "anthropic-compatible-cc-frozen-body",
];

/** The corpus shape for a model's target format; formats with no shape of their own get openai. */
function bucketOf(format: string | null | undefined): Bucket {
  if (format === "openai-responses" || format === "claude") return format;
  if (format === "gemini" || format === "antigravity") return "gemini";
  return "openai";
}

/** The first registry model of each request format the provider serves. */
function firstModelPerFormat(provider: string): Map<Bucket, string> {
  const entry = getRegistryEntry(provider) as { format?: string; models?: unknown[] } | undefined;
  const found = new Map<Bucket, string>();
  const fixed = FIXTURES[provider]?.model;
  if (fixed) return found.set(bucketOf(entry?.format), fixed);
  for (const m of entry?.models ?? []) {
    const id = typeof m === "string" ? m : (m as { id?: string }).id;
    if (!id) continue;
    const bucket = bucketOf(getModelTargetFormat(provider, id) ?? entry?.format);
    if (!found.has(bucket)) found.set(bucket, id);
  }
  // No registry models (dynamic nodes, catalog-only ids): one case on the entry's own format.
  if (found.size === 0) found.set(bucketOf(entry?.format), "m");
  return found;
}

/** Every id getExecutor() resolves, deduplicated to one entry per executor instance shape. */
async function planCases(): Promise<{ cases: Case[]; refused: number }> {
  const ids = new Set([
    ...listExecutorAliases(),
    ...Object.keys(PROVIDERS),
    ...Object.keys(AI_PROVIDERS),
    ...COMPATIBLE_NODE_IDS,
  ]);
  const seen = new Set<string>();
  const cases: Case[] = [];
  let refused = 0;
  for (const id of ids) {
    let executor: Executor;
    try {
      executor = await getExecutor(id);
    } catch {
      refused++; // search and cloud-agent providers refuse chat
      continue;
    }
    // Aliases of one executor (pol -> pollinations) share a class and a provider id.
    const shape = `${executor.constructor.name}:${executor.provider}`;
    if (seen.has(shape)) continue;
    seen.add(shape);
    for (const [bucket, model] of firstModelPerFormat(executor.provider)) {
      cases.push({ label: executor.provider, executor, bucket, model });
    }
  }
  return { cases, refused };
}

// ── One run ────────────────────────────────────────────────────────────────────
const FROZEN_WRITE =
  /Cannot (?:assign to read only property|add property|delete property|define property|redefine property)|object is not extensible/;
const OK_COMPLETION = {
  id: "chatcmpl-frozen-body",
  object: "chat.completion",
  choices: [{ index: 0, message: { role: "assistant", content: "ok" }, finish_reason: "stop" }],
  usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
};

type Outcome = {
  label: string;
  bucket: Bucket;
  reached: boolean;
  /** Why the request did not reach the stub (empty when it did). */
  reason: string;
  /** The write into the frozen body: message and the first stack frame inside the repo. */
  writer: string | null;
};

/** A fetch body as text (JSON, protobuf and form bodies all carry MARKER verbatim). */
function bodyText(body: unknown): string {
  if (typeof body === "string") return body;
  if (body instanceof ArrayBuffer) return Buffer.from(body).toString("utf8");
  if (ArrayBuffer.isView(body)) {
    return Buffer.from(body.buffer, body.byteOffset, body.byteLength).toString("utf8");
  }
  if (body instanceof URLSearchParams) return [...body.values()].join(" ");
  if (body instanceof FormData) {
    return [...body.values()].filter((v) => typeof v === "string").join(" ");
  }
  return "";
}

function okResponse(): Response {
  return new Response(JSON.stringify(OK_COMPLETION), {
    status: 200,
    // The x-vqd-* pair is DuckDuckGo's session token, which it hands out as a header.
    headers: { "Content-Type": "application/json", "x-vqd-4": "vqd-1", "x-vqd-hash-1": "h-1" },
  });
}

function deepFreeze<T>(value: T): T {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const key of Object.getOwnPropertyNames(value)) deepFreeze((value as Json)[key]);
  }
  return value;
}

function isDeepFrozen(value: unknown): boolean {
  if (value === null || typeof value !== "object") return true;
  if (!Object.isFrozen(value)) return false;
  return Object.values(value).every(isDeepFrozen);
}

/** First stack frame inside the repo's own sources: "open-sse/executors/x.ts:60". */
function repoFrame(stack: string | undefined): string | null {
  for (const line of (stack ?? "").split("\n").slice(1)) {
    const frame = /(?:\(|at )([^()]+):(\d+):\d+\)?$/.exec(line.trim());
    if (!frame) continue;
    const file = frame[1].startsWith("file://") ? fileURLToPath(frame[1]) : frame[1];
    const rel = path.relative(REPO_ROOT, file).replaceAll("\\", "/");
    if (rel.startsWith("..") || path.isAbsolute(rel) || /^(node_modules|tests)\//.test(rel)) {
      continue;
    }
    return `${rel}:${frame[2]}`;
  }
  return null;
}

/** A write into the frozen body, from the thrown error or from a swallowed one. */
function describeWrite(error: unknown, swallowed: string | undefined): string | null {
  if (error instanceof Error && FROZEN_WRITE.test(error.message)) {
    return `${error.message} at ${repoFrame(error.stack) ?? "(no repo frame)"}`;
  }
  return swallowed ? `swallowed: ${swallowed.slice(0, 120)}` : null;
}

/** Why a run never sent the request: blocked transport, thrown error, local error response. */
function unreachedReason(blocked: string[], error: unknown, response: string): string {
  if (blocked.length > 0) return `blocked ${[...new Set(blocked)].join(",")}`;
  if (error) return `threw ${String(error instanceof Error ? error.message : error).slice(0, 100)}`;
  return response || "returned without sending the request";
}

async function localErrorText(response: unknown): Promise<string> {
  if (!(response instanceof Response)) return "";
  const text = await response.text().catch(() => "");
  const message = /"message":\s*"([^"]*)/.exec(text)?.[1] ?? text;
  return `HTTP ${response.status} ${message.slice(0, 100)}`;
}

/**
 * One executor step on a deep-frozen body with fetch stubbed. Never rejects: a throw, a hang or
 * a blocked transport is the outcome, not an error.
 */
async function runCase(c: Case): Promise<Outcome> {
  const body = deepFreeze(BODIES[c.bucket](c.model));
  assert.ok(isDeepFrozen(body), `${c.label}: the ${c.bucket} corpus body must be frozen`);
  resetWafRateLimit(); // agentrouter's WAF gate would otherwise sleep between runs
  clearEgressHits();
  const logged: string[] = [];
  const record = (...args: unknown[]) => void logged.push(args.map(String).join(" "));
  let requestCalls = 0;
  globalThis.fetch = (async (_url: string | URL | Request, init: RequestInit = {}) => {
    if (bodyText(init.body).includes(MARKER)) requestCalls++;
    return okResponse();
  }) as typeof fetch;

  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  let error: unknown = null;
  let response: unknown = null;
  let timedOut = false;
  // Wrapped so a synchronous throw becomes a rejection the race below catches.
  const run: Promise<unknown> = Promise.resolve().then(() =>
    c.executor.execute({
      model: c.model,
      body,
      stream: false,
      credentials: credentialsFor(c.executor.provider),
      signal: controller.signal,
      log: { debug: record, info: record, warn: record, error: record },
      clientHeaders: {},
    } as Parameters<Executor["execute"]>[0])
  );
  try {
    const outcome = await Promise.race([
      run,
      new Promise<never>((_resolve, reject) => {
        timer = setTimeout(() => {
          timedOut = true;
          controller.abort();
          reject(new Error(`no result within ${CASE_TIMEOUT_MS}ms`));
        }, CASE_TIMEOUT_MS);
      }),
    ]);
    response =
      outcome instanceof Response ? outcome : (outcome as { response?: unknown })?.response;
  } catch (thrown) {
    error = thrown;
  } finally {
    clearTimeout(timer);
    // Not the real fetch: an executor that timed out may still be running and must not reach it.
    globalThis.fetch = (async () => okResponse()) as typeof fetch;
  }
  if (timedOut) {
    lingering.add(c);
    const settled = () => void lingering.delete(c);
    run.then(settled, settled);
  }

  const responseText = requestCalls === 0 ? await localErrorText(response) : "";
  const swallowed = [...logged, responseText].find((s) => FROZEN_WRITE.test(s));
  return {
    label: c.label,
    bucket: c.bucket,
    reached: requestCalls > 0,
    reason: requestCalls > 0 ? "" : unreachedReason([...egressHits], error, responseText),
    writer: describeWrite(error, swallowed),
  };
}

// ── Report ─────────────────────────────────────────────────────────────────────
function reachedPerFormat(outcomes: Outcome[]): Record<Bucket, number> {
  const counts = { openai: 0, "openai-responses": 0, claude: 0, gemini: 0 };
  for (const o of outcomes) if (o.reached) counts[o.bucket]++;
  return counts;
}

/** Unreached cases grouped by kind of reason; a case that wrote is listed as a writer only. */
function unreachedByReason(outcomes: Outcome[]): string[] {
  const groups = new Map<string, string[]>();
  for (const o of outcomes.filter((x) => !x.reached && !x.writer)) {
    const kind = /^(?:HTTP \d+|threw|blocked .+)/.exec(o.reason)?.[0] ?? o.reason;
    const detail = o.reason.slice(kind.length).trim().slice(0, 60);
    groups.set(kind, [...(groups.get(kind) ?? []), `${o.label}/${o.bucket} ${detail}`.trim()]);
  }
  return [...groups]
    .sort((a, b) => b[1].length - a[1].length)
    .map(([kind, who]) => `not reached (${who.length}) ${kind}: ${who.join(" | ")}`);
}

function writerLines(outcomes: Outcome[]): string[] {
  return outcomes
    .filter((o) => o.writer)
    .map((o) => `WRITES into the caller's body: ${o.label}/${o.bucket}: ${o.writer}`);
}

type Survey = { cases: Case[]; refused: number; outcomes: Outcome[]; stillRunning: string[] };

/** Wait up to `ms` for every timed-out execute() to settle; returns the cases still running. */
async function waitForLingering(ms: number): Promise<string[]> {
  const deadline = Date.now() + ms;
  while (lingering.size > 0 && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  return [...lingering].map((c) => `${c.label}/${c.bucket}`);
}

/**
 * Every case under the egress guard. Executors are constructed under it too: some lazy loaders
 * reach for wreq-js. The real fetch stays out of reach from the first case until the end, and
 * neither the guard nor the real fetch comes back while an execute() that ignored its abort is
 * still running: that run would otherwise be free to dial out after the survey.
 */
async function runSurvey(): Promise<Survey> {
  const realFetch = globalThis.fetch;
  const restoreGuard = installEgressGuard();
  try {
    const plan = await planCases();
    const outcomes: Outcome[] = [];
    for (const c of plan.cases) outcomes.push(await runCase(c));
    return { ...plan, outcomes, stillRunning: await waitForLingering(LINGER_GRACE_MS) };
  } finally {
    if ((await waitForLingering(0)).length === 0) {
      restoreGuard();
      globalThis.fetch = realFetch;
    }
  }
}

test(
  "every executor's first model per format runs on a deep-frozen body inside the egress guard",
  { timeout: SUITE_TIMEOUT_MS },
  async (t) => {
    const before = {
      spawn: childProcess.spawn,
      connect: net.connect,
      webSocket: globalThis.WebSocket,
    };

    const { cases, refused, outcomes, stillRunning } = await runSurvey();
    if (stillRunning.length > 0) {
      // The guard stays installed (and fetch stubbed) for the rest of this test process on purpose.
      t.diagnostic(
        `still running ${LINGER_GRACE_MS}ms after their abort, egress left blocked: ${stillRunning.join(", ")}`
      );
    }

    const reached = reachedPerFormat(outcomes);
    const total = outcomes.filter((o) => o.reached).length;
    t.diagnostic(
      `${cases.length} executor/format cases (+${refused} ids that refuse chat), ${total} reached ` +
        `the stubbed fetch: ${BUCKETS.map((b) => `${b} ${reached[b]}`).join(", ")}`
    );
    for (const line of writerLines(outcomes)) t.diagnostic(line);
    for (const line of unreachedByReason(outcomes)) t.diagnostic(line);

    // The only things that fail: the harness stopped working. Writers and unreached executors
    // above are warnings by design.
    if (stillRunning.length === 0) {
      assert.equal(childProcess.spawn, before.spawn, "the egress guard was left installed");
      assert.equal(net.connect, before.connect, "the egress guard was left installed");
      assert.equal(globalThis.WebSocket, before.webSocket, "the egress guard was left installed");
    }
    for (const bucket of BUCKETS) {
      assert.ok(
        reached[bucket] >= 1,
        `no executor sent a ${bucket} request to the stubbed fetch: the enumeration or the stub is broken`
      );
    }
  }
);
