/**
 * A2A skills call back into OmniRoute over HTTP. They used to attach the
 * deployment's OMNIROUTE_API_KEY (a `manage`-scope key) to every self-loop
 * call, so a restricted inference key could reach models outside its
 * allowlist and read management data through /a2a. The self-loop must carry
 * the caller's own key so /v1 and the management policy judge the caller.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { AsyncLocalStorage } from "node:async_hooks";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-a2a-caller-cred-"));
const ENV_KEY = "sk-env-operator-key-a2a-caller-cred";
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  OMNIROUTE_DISABLE_REDIS_AUTH_CACHE: process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE,
  REQUIRE_API_KEY: process.env.REQUIRE_API_KEY,
  OMNIROUTE_API_KEY: process.env.OMNIROUTE_API_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
};
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "a2a-caller-cred-secret";
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";
process.env.REQUIRE_API_KEY = "true";
process.env.OMNIROUTE_API_KEY = ENV_KEY;
process.env.JWT_SECRET = "a2a-caller-cred-jwt-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const route = await import("../../src/app/a2a/route.ts");
const { getTaskManager } = await import("../../src/lib/a2a/taskManager.ts");
const { SignJWT } = await import("jose");

await settingsDb.updateSettings({ a2aEnabled: true });
const restricted = await apiKeysDb.createApiKey("a2a-restricted", "a2a-caller-cred", []);
await apiKeysDb.updateApiKeyPermissions(restricted.id, {
  allowedModels: ["openai/gpt-cheap"],
});

const sessionToken = await new SignJWT({ authenticated: true })
  .setProtectedHeader({ alg: "HS256" })
  .setExpirationTime("1h")
  .sign(new TextEncoder().encode(process.env.JWT_SECRET));

type Captured = {
  url: string;
  auth: string | null;
  headerValues: string;
  redirect: RequestRedirect | undefined;
  // The Authorization value the A2A request that made this call should send.
  expected: string | undefined;
};
const captured: Captured[] = [];
const expectedAuth = new AsyncLocalStorage<string>();
// "fail": every self-loop call gets a 500, so the skill fails.
// "deny-caller": only OMNIROUTE_API_KEY gets marked data, in the shape each
// endpoint returns, so a skill would show it if it got it. The marker is the
// string ENV_ONLY_DATA, or the count ENV_ONLY_COUNT where a skill only reports
// numbers (analytics totals, telemetry). Any other credential, or none, is
// answered the way the real routes answer a caller without `manage` scope:
// 403 (401 with no key) from /v1 and the management routes, and 200 with only
// {status, setupComplete} from the public /api/monitoring/health.
let stubMode: "ok" | "fail" | "deny-caller" = "ok";
// Delay before each stub reply, so concurrent requests interleave.
let stubDelayMs = 0;
const ENV_ONLY_DATA = "env-only-data-a2a-caller-cred";
const ENV_ONLY_COUNT = 918273645;
function envOnlyData(url: string): unknown {
  if (url.includes("/api/usage/quota")) {
    return { providers: [{ provider: ENV_ONLY_DATA, quotaTotal: 100, quotaUsed: 1 }] };
  }
  if (url.includes("/api/combos")) {
    return { combos: [{ id: ENV_ONLY_DATA, name: `${ENV_ONLY_DATA}-free` }] };
  }
  if (url.includes("/api/usage/analytics")) {
    return {
      summary: { totalCost: 1.5, totalRequests: ENV_ONLY_COUNT },
      byProvider: [{ provider: ENV_ONLY_DATA, requests: 1, cost: 1.5 }],
      byModel: [],
    };
  }
  if (url.includes("/api/monitoring/health")) {
    return {
      status: "healthy",
      providerHealth: {
        [ENV_ONLY_DATA]: { state: "OPEN", failures: 3, lastFailure: null, retryAfterMs: 0 },
      },
      rateLimitStatus: {},
      lockouts: [],
    };
  }
  if (url.includes("/api/telemetry/summary")) {
    return { totalRequests: ENV_ONLY_COUNT, p95: 120, errorRate: 0 };
  }
  return { model: ENV_ONLY_DATA, choices: [{ message: { content: ENV_ONLY_DATA } }] };
}

// The count may appear raw (metadata) or formatted (artifact text).
function showsEnvOnlyCount(text: string): boolean {
  return text.includes(String(ENV_ONLY_COUNT)) || text.includes(ENV_ONLY_COUNT.toLocaleString());
}
const originalFetch = globalThis.fetch;
globalThis.fetch = (async (input: RequestInfo | URL, init: RequestInit = {}) => {
  const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
  captured.push({
    url,
    auth: new Headers(init.headers).get("authorization"),
    headerValues: [...new Headers(init.headers).values()].join("\n"),
    redirect: init.redirect,
    expected: expectedAuth.getStore(),
  });
  if (stubDelayMs) await new Promise((resolve) => setTimeout(resolve, stubDelayMs));
  if (stubMode === "fail") {
    return new Response("upstream unavailable", { status: 500 });
  }
  if (stubMode === "deny-caller") {
    const auth = new Headers(init.headers).get("authorization");
    if (auth === `Bearer ${ENV_KEY}`) {
      return new Response(JSON.stringify(envOnlyData(url)), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (url.includes("/api/monitoring/health")) {
      return new Response(JSON.stringify({ status: "healthy", setupComplete: true }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ error: auth ? "forbidden" : "unauthorized" }), {
      status: auth ? 403 : 401,
    });
  }
  const body = url.includes("/v1/chat/completions")
    ? { model: "openai/gpt-cheap", choices: [{ message: { content: "ok" } }] }
    : {};
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}) as typeof fetch;

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [name, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[name];
    else process.env[name] = value;
  }
});

function callA2A(
  method: "message/send" | "message/stream" | "SendMessage" | "SendStreamingMessage",
  skill: string,
  headers: Record<string, string>,
  content = "hi"
) {
  return route.POST(
    new Request("http://localhost/a2a", {
      method: "POST",
      headers: { "content-type": "application/json", ...headers },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method,
        params: {
          skill,
          messages: [{ role: "user", content }],
          metadata: { model: "openai/gpt-premium" },
        },
      }),
    }) as never
  );
}

// Live tasks are what tasks/get and /api/a2a/tasks return; the history rows
// and events are what the dashboard reads back after the task leaves memory.
// With `exclude`, tasks whose id is in it are left out.
function persistedTaskData(exclude?: Set<string>): string {
  const db = core.getDbInstance();
  const keep = (id: unknown) => !exclude?.has(String(id));
  const tasks = getTaskManager().listTasks({ limit: 10_000 });
  const rows = db.prepare("SELECT * FROM a2a_tasks").all() as { id: unknown }[];
  const events = db.prepare("SELECT * FROM a2a_task_events").all() as { task_id: unknown }[];
  return JSON.stringify([
    tasks.filter((t) => keep(t.id)),
    rows.filter((r) => keep(r.id)),
    events.filter((e) => keep(e.task_id)),
  ]);
}

function knownTaskIds(): Set<string> {
  const db = core.getDbInstance();
  const rows = db.prepare("SELECT id FROM a2a_tasks").all() as { id: unknown }[];
  return new Set([
    ...getTaskManager()
      .listTasks({ limit: 10_000 })
      .map((t) => String(t.id)),
    ...rows.map((r) => String(r.id)),
  ]);
}

const SELF_LOOP_SKILLS = ["smart-routing", "cost-analysis", "quota-management", "health-report"];

for (const skill of SELF_LOOP_SKILLS) {
  test(`${skill} self-loop carries the caller's key, not OMNIROUTE_API_KEY`, async () => {
    captured.length = 0;
    const res = await callA2A("message/send", skill, {
      authorization: `Bearer ${restricted.key}`,
    });
    const text = await res.text();
    assert.ok(captured.length > 0, `${skill} made no self-loop call`);
    assert.ok(!text.includes(restricted.key), `${skill} echoed the caller's key in its result`);
    assert.ok(!persistedTaskData().includes(restricted.key), `${skill} stored the caller's key`);
    for (const call of captured) {
      assert.equal(call.auth, `Bearer ${restricted.key}`, `${call.url} used the wrong credential`);
      assert.ok(!call.headerValues.includes(ENV_KEY), `${call.url} also sent OMNIROUTE_API_KEY`);
      assert.equal(call.redirect, "error", `${call.url} would follow a redirect with the key`);
    }
  });
}

for (const skill of SELF_LOOP_SKILLS) {
  test(`${skill} over message/stream carries the caller's key`, async () => {
    captured.length = 0;
    const res = await callA2A("message/stream", skill, {
      authorization: `Bearer ${restricted.key}`,
    });
    assertCallerKeyOnly(`stream ${skill}`, await res.text());
  });
}

test("dashboard session caller (no API key) keeps the configured key", async () => {
  captured.length = 0;
  const res = await callA2A("message/send", "smart-routing", {
    cookie: `auth_token=${sessionToken}`,
  });
  const body = (await res.json()) as { result?: { task?: { state?: string } } };
  assert.equal(body.result?.task?.state, "completed");
  const chat = captured.find((c) => c.url.includes("/v1/chat/completions"));
  assert.ok(chat, "session call made no /v1/chat/completions call");
  assert.equal(chat.auth, `Bearer ${ENV_KEY}`);
});

// Every self-loop call must carry the caller's key and refuse redirects, and
// the key must not reach the A2A response or the stored task data.
function assertCallerKeyOnly(label: string, text: string) {
  assert.ok(captured.length > 0, `${label} made no self-loop call`);
  assert.ok(!text.includes(restricted.key), `${label} echoed the caller's key`);
  assert.ok(!persistedTaskData().includes(restricted.key), `${label} stored the caller's key`);
  for (const call of captured) {
    assert.equal(call.auth, `Bearer ${restricted.key}`, `${call.url} used the wrong credential`);
    assert.ok(!call.headerValues.includes(ENV_KEY), `${call.url} also sent OMNIROUTE_API_KEY`);
    assert.equal(call.redirect, "error", `${call.url} would follow a redirect with the key`);
    assert.ok(!call.url.includes(ENV_KEY), `${call.url} put OMNIROUTE_API_KEY in the URL`);
  }
}

const METHODS = ["message/send", "message/stream"] as const;
type Method = (typeof METHODS)[number];
const overMethod = (method: Method) => (method === "message/stream" ? " over message/stream" : "");

// /a2a authenticates with extractApiKey, which also accepts x-api-key (with
// anthropic-version) and x-goog-api-key. The self-loop must replay that key,
// or these callers fall back to OMNIROUTE_API_KEY again, on either method.
for (const method of METHODS) {
  for (const [label, headers] of [
    ["x-api-key", { "x-api-key": restricted.key, "anthropic-version": "2023-06-01" }],
    ["x-goog-api-key", { "x-goog-api-key": restricted.key }],
  ] as const) {
    test(`${label} caller's key is replayed on the self-loop${overMethod(method)}`, async () => {
      captured.length = 0;
      const res = await callA2A(method, "cost-analysis", headers);
      assertCallerKeyOnly(`${label}${overMethod(method)}`, await res.text());
    });
  }
}

// A2A 1.0 method names take their own branches (v1 response shape).
for (const method of ["SendMessage", "SendStreamingMessage"] as const) {
  test(`v1 ${method} self-loop carries the caller's key`, async () => {
    captured.length = 0;
    const res = await callA2A(method, "smart-routing", {
      authorization: `Bearer ${restricted.key}`,
    });
    assertCallerKeyOnly(method, await res.text());
    assert.ok(
      captured.some((c) => c.url.includes("/v1/chat/completions")),
      `${method} made no /v1/chat/completions call`
    );
  });
}

// Keyless default (REQUIRE_API_KEY=false, OMNIROUTE_API_KEY unset): /a2a admits
// the caller anonymously, and the self-loop used to send no key at all, so the
// restricted key's allowedModels never applied. It must still be replayed,
// on either method.
for (const method of METHODS) {
  test(`keyless mode still replays the caller's key on the self-loop${overMethod(method)}`, async () => {
    const saved = { req: process.env.REQUIRE_API_KEY, env: process.env.OMNIROUTE_API_KEY };
    process.env.REQUIRE_API_KEY = "false";
    delete process.env.OMNIROUTE_API_KEY;
    try {
      captured.length = 0;
      const res = await callA2A(method, "smart-routing", {
        authorization: `Bearer ${restricted.key}`,
      });
      assertCallerKeyOnly(`keyless${overMethod(method)}`, await res.text());
    } finally {
      process.env.REQUIRE_API_KEY = saved.req;
      process.env.OMNIROUTE_API_KEY = saved.env;
    }
  });
}

// Runs fn with console error/warn/log/info/debug captured, and returns what
// was printed (strings, error stacks and JSON forms of the arguments).
async function captureConsole(fn: () => Promise<void>): Promise<string[]> {
  const logged: string[] = [];
  const methods = ["error", "warn", "log", "info", "debug"] as const;
  const saved = methods.map((m) => console[m]);
  for (const m of methods) {
    console[m] = (...args: unknown[]) => {
      logged.push(args.map((a) => (a instanceof Error ? a.stack : String(a))).join(" "));
      for (const a of args) {
        try {
          logged.push(JSON.stringify(a));
        } catch {
          // circular values are covered by String() above
        }
      }
    };
  }
  try {
    await fn();
  } finally {
    methods.forEach((m, i) => (console[m] = saved[i]));
  }
  return logged;
}

// quota-management settles its two sub-requests and degrades quietly; the
// other three skills fail the task when their self-loop call fails.
const FAILS_ON_ERROR = new Set(["smart-routing", "cost-analysis", "health-report"]);

// A failed skill takes the error path: the route logs the error and stores it
// on the task. Neither the log nor the stored error may contain the key.
for (const skill of SELF_LOOP_SKILLS) {
  test(`${skill}: a failed self-loop does not log or store the caller's key`, async () => {
    stubMode = "fail";
    let body: { error?: { message?: string } } = {};
    let logged: string[] = [];
    try {
      captured.length = 0;
      logged = await captureConsole(async () => {
        const res = await callA2A("message/send", skill, {
          authorization: `Bearer ${restricted.key}`,
        });
        body = (await res.json()) as typeof body;
      });
    } finally {
      stubMode = "ok";
    }
    assertCallerKeyOnly(`failed ${skill}`, JSON.stringify(body));
    if (FAILS_ON_ERROR.has(skill)) {
      assert.match(body.error?.message ?? "", /Skill execution failed/);
      assert.ok(logged.length > 0, `${skill}: the error path logged nothing`);
    }
    assert.ok(!logged.join("\n").includes(restricted.key), `${skill} logged the caller's key`);
  });
}

// quota-management shows quota data in its default summary and combo data
// only for a "free"/"suggest" query, so the rejected-key case runs both.
const DENY_CASES: [skill: string, query: string][] = [
  ["smart-routing", "hi"],
  ["cost-analysis", "hi"],
  ["quota-management", "hi"],
  ["quota-management", "suggest a free combo"],
  ["health-report", "hi"],
];

// Returns the A2A response (the whole SSE body for message/stream), what was
// logged while it was produced, and the data stored for the tasks this call
// created (so a leak is reported on the skill that made it).
async function callDenyCaller(
  method: Method,
  skill: string,
  query: string,
  headers: Record<string, string>
) {
  const before = knownTaskIds();
  stubMode = "deny-caller";
  let text = "";
  let logged: string[] = [];
  try {
    captured.length = 0;
    logged = await captureConsole(async () => {
      const res = await callA2A(method, skill, headers, query);
      text = await res.text();
    });
  } finally {
    stubMode = "ok";
  }
  return { text, logged, stored: persistedTaskData(before) };
}

// The task state the call ended with: from the JSON-RPC result for
// message/send, or from the last SSE event for message/stream.
function finalState(method: Method, text: string): string | undefined {
  if (method === "message/send") {
    const body = JSON.parse(text) as {
      error?: { message?: string };
      result?: { task?: { state?: string } };
    };
    if (body.error) {
      assert.match(body.error.message ?? "", /Skill execution failed/);
      return "failed";
    }
    return body.result?.task?.state;
  }
  const events = text
    .split("\n")
    .filter((line) => line.startsWith("data: "))
    .map((line) => JSON.parse(line.slice(6)) as { params?: { task?: { state?: string } } });
  return events.at(-1)?.params?.task?.state;
}

// With the caller's key rejected, smart-routing and cost-analysis fail the
// task. quota-management drops the rejected sub-requests, and health-report
// gets the public health view (its telemetry call is rejected); both complete.
const FAILS_WHEN_DENIED = new Set(["smart-routing", "cost-analysis"]);

// When /v1 or a management route rejects the caller's key, the skill must not
// retry with OMNIROUTE_API_KEY: that retry would hand the restricted caller
// the deployment key's access again. The stream path gets the same cases.
for (const method of METHODS) {
  for (const [skill, query] of DENY_CASES) {
    test(`${skill} (${query})${overMethod(method)}: a rejected caller key is not retried with OMNIROUTE_API_KEY`, async () => {
      const { text, logged, stored } = await callDenyCaller(method, skill, query, {
        authorization: `Bearer ${restricted.key}`,
      });
      assertCallerKeyOnly(`rejected ${skill}`, text);
      assert.ok(stored.length > 10, `${skill} stored no task`);
      assert.ok(!text.includes(ENV_ONLY_DATA), `${skill} returned data fetched with another key`);
      assert.ok(!showsEnvOnlyCount(text), `${skill} returned a count fetched with another key`);
      assert.ok(!stored.includes(ENV_ONLY_DATA), `${skill} stored data fetched with another key`);
      assert.ok(!showsEnvOnlyCount(stored), `${skill} stored a count fetched with another key`);
      const want = FAILS_WHEN_DENIED.has(skill) ? "failed" : "completed";
      assert.equal(finalState(method, text), want, `${skill} did not end ${want}`);
      assert.ok(!logged.join("\n").includes(restricted.key), `${skill} logged the caller's key`);
    });
  }
}

// Control for the rejected-key cases, and the dashboard-session path of every
// skill: a session has no API key, so every self-loop call must carry
// OMNIROUTE_API_KEY and refuse redirects. The stub serves marked data only to
// that key, so every marker a skill can show must show up in the response and
// the stored task, or those marker checks prove nothing. The dashboard's own
// smoke tests are quota-management over message/send and message/stream with
// a session. cost-analysis shows the
// analytics count; health-report shows the provider from the full
// /api/monitoring/health view and the count from telemetry. The other marker
// checks (counts for smart-routing and quota-management, the provider for
// cost-analysis) cannot fail on the skill's current output. Runs last.
const SHOWN_MARKERS: Record<string, { data: boolean; count: boolean }> = {
  "smart-routing": { data: true, count: false },
  "cost-analysis": { data: false, count: true },
  "quota-management": { data: true, count: false },
  "health-report": { data: true, count: true },
};
for (const method of METHODS) {
  for (const [skill, query] of DENY_CASES) {
    test(`${skill} (${query})${overMethod(method)}: data served to OMNIROUTE_API_KEY reaches the output`, async () => {
      const { text, stored } = await callDenyCaller(method, skill, query, {
        cookie: `auth_token=${sessionToken}`,
      });
      assert.ok(captured.length > 0, `${skill} made no self-loop call`);
      for (const call of captured) {
        assert.equal(call.auth, `Bearer ${ENV_KEY}`, `${call.url} did not use OMNIROUTE_API_KEY`);
        assert.equal(call.redirect, "error", `${call.url} would follow a redirect with the key`);
      }
      const shown = SHOWN_MARKERS[skill];
      for (const [where, out] of [
        ["response", text],
        ["stored task", stored],
      ] as const) {
        if (shown.data)
          assert.ok(
            out.includes(ENV_ONLY_DATA),
            `${skill} did not show the stub's data (${where})`
          );
        if (shown.count)
          assert.ok(showsEnvOnlyCount(out), `${skill} did not show the stub's count (${where})`);
      }
    });
  }
}

// Concurrent requests must not share a caller: a dashboard session, the
// restricted key and a second key without `manage` scope (no model allowlist),
// interleaved, must each send their own credential.
test("concurrent callers each keep their own key on the self-loop", async () => {
  const other = await apiKeysDb.createApiKey("a2a-restricted-2", "a2a-caller-cred", []);
  const callers: Array<{ headers: Record<string, string>; auth: string }> = [
    { headers: { cookie: `auth_token=${sessionToken}` }, auth: `Bearer ${ENV_KEY}` },
    { headers: { authorization: `Bearer ${restricted.key}` }, auth: `Bearer ${restricted.key}` },
    { headers: { authorization: `Bearer ${other.key}` }, auth: `Bearer ${other.key}` },
  ];
  captured.length = 0;
  stubDelayMs = 5;
  try {
    // 24 requests, one per caller x skill x method, all in flight together and
    // ordered so neighbouring requests come from different callers. Each
    // self-loop call is tagged with the key its own request should send, so a
    // key that leaks across requests shows up.
    const jobs: Promise<string>[] = [];
    for (const skill of SELF_LOOP_SKILLS) {
      for (const method of METHODS) {
        for (const caller of callers) {
          jobs.push(
            expectedAuth.run(caller.auth, () =>
              callA2A(method, skill, caller.headers).then((r) => r.text())
            )
          );
        }
      }
    }
    assert.equal(jobs.length, 24);
    await Promise.all(jobs);
  } finally {
    stubDelayMs = 0;
  }
  const tagged = captured.filter((c) => c.expected);
  assert.equal(tagged.length, captured.length, "every self-loop call ran inside its request");
  assert.ok(tagged.length >= 24, `expected at least one call per request, got ${tagged.length}`);
  for (const c of tagged) assert.equal(c.auth, c.expected, c.url);
});
