// CodeBuddy (CN + Intl, shared base) replaces a system prompt that carries a
// coding-agent identity marker, because Tencent's content filter rejects those.
// It also used to replace ANY system prompt longer than 2000 chars, silently
// swapping long hand-written project/orchestration prompts for a 78-char
// neutral one. The length cut is now off by default; CODEBUDDY_SYSTEM_PROMPT_MAX_LEN
// (integer > 0) re-enables a cap, and every replacement logs which rule fired.
import test, { afterEach, beforeEach } from "node:test";
import assert from "node:assert/strict";

import { CodeBuddyCnExecutor } from "../../open-sse/executors/codebuddy-cn.ts";
import { CodeBuddyIntlExecutor } from "../../open-sse/executors/codebuddy-intl.ts";
import {
  NEUTRAL_PROMPT,
  SENSITIVE_CONTENT_REJECTION,
  classifySystemPrompt,
  flattenContent,
  resolveSystemPromptMaxLen,
} from "../../open-sse/executors/codebuddy/shared.ts";

const ENV_KEY = "CODEBUDDY_SYSTEM_PROMPT_MAX_LEN";
const AGENT_PROMPT = "You are Claude Code, Anthropic's official CLI for Claude.";
// Long, but plainly a human-written project prompt: no agent identity marker.
const LONG_PROJECT_PROMPT = `Project conventions. ${"Prefer small, focused functions and explicit names. ".repeat(60)}`;

type Body = Record<string, unknown>;
type Message = { role: string; content: unknown };
type Executor = CodeBuddyCnExecutor | CodeBuddyIntlExecutor;

const EXECUTORS: Array<[string, () => Executor]> = [
  ["codebuddy-cn", () => new CodeBuddyCnExecutor()],
  ["codebuddy-intl", () => new CodeBuddyIntlExecutor()],
];

let savedEnv: string | undefined;
let warnings: string[] = [];
let originalWarn: typeof console.warn;

beforeEach(() => {
  savedEnv = process.env[ENV_KEY];
  delete process.env[ENV_KEY];
  warnings = [];
  originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    const line = args.map(String).join(" ");
    // Only the CodeBuddy replacement log is under test; lazy module loads may
    // emit unrelated warnings (e.g. the credentials dataPaths fallback).
    if (line.includes("system prompt replaced")) warnings.push(line);
    else originalWarn(...args);
  };
});

afterEach(() => {
  console.warn = originalWarn;
  if (savedEnv === undefined) delete process.env[ENV_KEY];
  else process.env[ENV_KEY] = savedEnv;
});

function run(body: Body, executor: Executor = new CodeBuddyCnExecutor()): Body {
  return executor.transformRequest("glm-5.2", body, false, {}) as Body;
}

function messageSystemOf(out: Body): string | undefined {
  const systemTexts = (out.messages as Message[])
    .filter((m) => m.role === "system")
    .map((m) => flattenContent(m.content));
  // Intl prepends NEUTRAL_PROMPT only when no system message exists, so prefer
  // the caller's (possibly replaced) prompt over an injected neutral one.
  return systemTexts.find((text) => text !== NEUTRAL_PROMPT) ?? systemTexts[0];
}

function withSystemMessage(content: unknown): Body {
  return {
    messages: [
      { role: "system", content },
      { role: "user", content: "hi" },
    ],
  };
}

test("resolveSystemPromptMaxLen: unset/junk/zero/negative mean no length cap", () => {
  for (const value of [undefined, "", "   ", "0", "-1", "1.5", "abc", "2e3", "0x10"]) {
    if (value === undefined) delete process.env[ENV_KEY];
    else process.env[ENV_KEY] = value;
    assert.equal(resolveSystemPromptMaxLen(), null, `value ${JSON.stringify(value)}`);
  }
});

test("resolveSystemPromptMaxLen: a positive integer re-enables the cap", () => {
  process.env[ENV_KEY] = " 2000 ";
  assert.equal(resolveSystemPromptMaxLen(), 2000);
  process.env[ENV_KEY] = "20000";
  assert.equal(resolveSystemPromptMaxLen(), 20000);
});

test("classifySystemPrompt: identity marker wins regardless of the cap", () => {
  assert.equal(classifySystemPrompt(AGENT_PROMPT, null), "agent");
  assert.equal(classifySystemPrompt(AGENT_PROMPT, 1_000_000), "agent");
  assert.equal(classifySystemPrompt(LONG_PROJECT_PROMPT, null), null);
  assert.equal(classifySystemPrompt(LONG_PROJECT_PROMPT, 2000), "length");
  assert.equal(classifySystemPrompt(LONG_PROJECT_PROMPT, LONG_PROJECT_PROMPT.length), null);
  assert.equal(classifySystemPrompt("", 1), null);
});

for (const [name, make] of EXECUTORS) {
  test(`${name}: keeps a long project system message by default (no length cut)`, () => {
    assert.ok(LONG_PROJECT_PROMPT.length > 2000);
    const out = run(withSystemMessage(LONG_PROJECT_PROMPT), make());
    assert.equal(messageSystemOf(out), LONG_PROJECT_PROMPT);
    assert.deepEqual(warnings, []);
  });

  test(`${name}: keeps a long top-level system field by default`, () => {
    const out = run(
      { system: LONG_PROJECT_PROMPT, messages: [{ role: "user", content: "hi" }] },
      make()
    );
    assert.equal(out.system, LONG_PROJECT_PROMPT);
    assert.deepEqual(warnings, []);
  });

  test(`${name}: still replaces an agent identity prompt and names the rule`, () => {
    const out = run(withSystemMessage(AGENT_PROMPT), make());
    assert.equal(messageSystemOf(out), NEUTRAL_PROMPT);
    assert.equal(warnings.length, 1);
    assert.match(warnings[0], /agent identity marker/);
    assert.ok(!warnings[0].includes(AGENT_PROMPT), "the prompt text itself is never logged");

    warnings = [];
    const top = run({ system: AGENT_PROMPT, messages: [{ role: "user", content: "hi" }] }, make());
    assert.equal(top.system, NEUTRAL_PROMPT);
    assert.equal(warnings.length, 1);
    assert.match(warnings[0], /agent identity marker/);
  });

  test(`${name}: an opt-in cap replaces an over-long prompt and logs length + env name`, () => {
    process.env[ENV_KEY] = "2000";
    const out = run(withSystemMessage(LONG_PROJECT_PROMPT), make());
    assert.equal(messageSystemOf(out), NEUTRAL_PROMPT);
    assert.equal(warnings.length, 1);
    assert.ok(warnings[0].includes(ENV_KEY));
    assert.ok(warnings[0].includes(String(LONG_PROJECT_PROMPT.length)));
    assert.ok(warnings[0].includes("2000"));

    warnings = [];
    const top = run(
      { system: LONG_PROJECT_PROMPT, messages: [{ role: "user", content: "hi" }] },
      make()
    );
    assert.equal(top.system, NEUTRAL_PROMPT);
    assert.equal(warnings.length, 1);
    assert.ok(warnings[0].includes(ENV_KEY));
  });

  test(`${name}: a cap above the prompt length keeps it`, () => {
    process.env[ENV_KEY] = "20000";
    const out = run(withSystemMessage(LONG_PROJECT_PROMPT), make());
    assert.equal(messageSystemOf(out), LONG_PROJECT_PROMPT);
    assert.deepEqual(warnings, []);
  });

  test(`${name}: identity markers stay authoritative under any cap value`, () => {
    for (const value of ["0", "abc", "-1", "1000000"]) {
      process.env[ENV_KEY] = value;
      const out = run(withSystemMessage(AGENT_PROMPT), make());
      assert.equal(messageSystemOf(out), NEUTRAL_PROMPT, `value ${value}`);
    }
  });
}

test("short project prompts are left alone and nothing is logged", () => {
  process.env[ENV_KEY] = "2000";
  const out = run(withSystemMessage("Answer in French."));
  assert.equal(messageSystemOf(out), "Answer in French.");
  assert.deepEqual(warnings, []);
});

test("typed-block content shape is preserved on replacement and on keep", () => {
  const replaced = run(withSystemMessage([{ type: "text", text: AGENT_PROMPT }]));
  assert.deepEqual((replaced.messages as Message[])[0].content, [
    { type: "text", text: NEUTRAL_PROMPT },
  ]);

  const blocks = [{ type: "text", text: LONG_PROJECT_PROMPT }];
  const kept = run(withSystemMessage(blocks));
  assert.deepEqual((kept.messages as Message[])[0].content, blocks);
});

test("user and assistant messages are never touched", () => {
  process.env[ENV_KEY] = "10";
  const out = run({
    messages: [
      { role: "user", content: LONG_PROJECT_PROMPT },
      { role: "assistant", content: AGENT_PROMPT },
    ],
  });
  assert.equal((out.messages as Message[])[0].content, LONG_PROJECT_PROMPT);
  assert.equal((out.messages as Message[])[1].content, AGENT_PROMPT);
  assert.deepEqual(warnings, []);
});

// --- Safety net: a kept prompt that still trips the content filter ---

type Captured = { body: Body };

async function executeWithMockedUpstream(
  body: Body,
  responses: Response[],
  executor: Executor = new CodeBuddyCnExecutor()
): Promise<{ calls: Captured[]; status: number; logs: string[] }> {
  const originalFetch = globalThis.fetch;
  const calls: Captured[] = [];
  const logs: string[] = [];
  globalThis.fetch = async (_url: string | URL | Request, init?: RequestInit) => {
    calls.push({ body: JSON.parse(String(init?.body ?? "{}")) as Body });
    const response = responses.shift();
    assert.ok(response, "unexpected extra upstream dispatch");
    return response;
  };
  try {
    const result = await executor.execute({
      model: "glm-5.2",
      body,
      stream: false,
      credentials: { accessToken: "test-token" },
      log: {
        debug: (tag, message) => logs.push(`${tag} ${message}`),
        warn: (tag, message) => logs.push(`${tag} ${message}`),
      },
    });
    const response = result instanceof Response ? result : result.response;
    return { calls, status: response.status, logs };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

function rejection(message = SENSITIVE_CONTENT_REJECTION): Response {
  return new Response(JSON.stringify({ error: { message } }), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
}

function success(): Response {
  return new Response("data: [DONE]\n\n", {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
}

for (const [name, make] of EXECUTORS) {
  test(`${name}: a content-filter rejection of a kept system prompt retries once with the neutral prompt`, async () => {
    const input = withSystemMessage(LONG_PROJECT_PROMPT);
    const { calls, status, logs } = await executeWithMockedUpstream(
      input,
      [rejection(), success()],
      make()
    );

    assert.equal(status, 200);
    assert.equal(calls.length, 2);
    assert.equal(messageSystemOf(calls[0].body), LONG_PROJECT_PROMPT);
    assert.equal(messageSystemOf(calls[1].body), NEUTRAL_PROMPT);
    assert.deepEqual(
      (calls[1].body.messages as Message[]).filter((m) => m.role === "user"),
      [{ role: "user", content: "hi" }]
    );
    assert.ok(logs.some((line) => /system prompt/.test(line)));
    assert.ok(logs.every((line) => !line.includes(LONG_PROJECT_PROMPT)));
  });
}

test("the neutral-prompt retry also covers a top-level system field", async () => {
  const { calls, status } = await executeWithMockedUpstream(
    { system: LONG_PROJECT_PROMPT, messages: [{ role: "user", content: "hi" }] },
    [rejection(), success()]
  );
  assert.equal(status, 200);
  assert.equal(calls.length, 2);
  assert.equal(calls[0].body.system, LONG_PROJECT_PROMPT);
  assert.equal(calls[1].body.system, NEUTRAL_PROMPT);
});

test("no neutral-prompt retry when the system prompt was already replaced", async () => {
  const { calls, status } = await executeWithMockedUpstream(withSystemMessage(AGENT_PROMPT), [
    rejection(),
  ]);
  assert.equal(status, 400);
  assert.equal(calls.length, 1);
});

test("no neutral-prompt retry on an unrelated 400", async () => {
  const { calls, status } = await executeWithMockedUpstream(
    withSystemMessage(LONG_PROJECT_PROMPT),
    [rejection("Invalid request")]
  );
  assert.equal(status, 400);
  assert.equal(calls.length, 1);
});

test("the neutral-prompt retry happens at most once", async () => {
  const { calls, status } = await executeWithMockedUpstream(
    withSystemMessage(LONG_PROJECT_PROMPT),
    [rejection(), rejection()]
  );
  assert.equal(status, 400);
  assert.equal(calls.length, 2);
});
