/**
 * Claude Code traffic through the real chat pipeline, with Task-Aware Routing set up through
 * PUT /api/settings/task-routing: coding and images on Sonnet, summaries and background on
 * Haiku, general chat left on the requested model, hard prompts optionally escalated to Opus,
 * and Background Degradation catching session titles.
 *
 * Request bodies follow Claude Code 2.1.x `/v1/messages` traffic: top-level `system` blocks
 * whose main prompt contains "one-line summary", tool definitions, `<system-reminder>` blocks
 * ahead of the human prompt, tool results that carry more reminders, and tool-less Haiku
 * utility calls (WebFetch summaries, session titles).
 *
 * With `detectionAnchor: "first-user"` the upstream must see one model per conversation on
 * every turn: the prompt cache is per model, so a switch re-bills the whole transcript at the
 * uncached rate.
 */
import test from "node:test";
import assert from "node:assert/strict";
import zlib from "node:zlib";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("task-routing-claude-code");
const {
  BaseExecutor,
  buildClaudeResponse,
  buildRequest,
  handleChat,
  resetStorage,
  seedConnection,
  settingsDb,
  toPlainHeaders,
} = harness;
const { DEFAULT_COMPLEXITY_MIN_SCORE, getDefaultTaskModelMap, setTaskRoutingConfig } =
  await import("../../open-sse/services/taskAwareRouter.ts");
const { getBackgroundDegradationConfig, setBackgroundDegradationConfig } =
  await import("../../open-sse/services/backgroundTaskDetector.ts");
const taskRoutingRoute = await import("../../src/app/api/settings/task-routing/route.ts");

const OPUS = "claude/claude-opus-5-5";
const SONNET = "claude/claude-sonnet-5-5";
const HAIKU = "claude/claude-haiku-5-5";

const CODING_PROMPT = "Implement retry with exponential backoff in src/http.ts";
const HARD_PROMPT =
  "Sessions drop under load. First, analyze how the worker pool and the Redis cache interact; " +
  "then find the race condition, because two workers can renew the same lease. Step by step: " +
  "1. reproduce 2. root cause 3. fix 4. regression test.";

const SYSTEM = [
  { type: "text", text: "x-anthropic-billing-header: cc_version=2.1.319; cc_entrypoint=cli;" },
  { type: "text", text: "You are Claude Code, Anthropic's official CLI for Claude." },
  {
    type: "text",
    text: "You are an interactive CLI tool that helps users with software engineering tasks. When you finish, give a one-line summary of what changed.",
    cache_control: { type: "ephemeral" },
  },
];
const TOOLS = [
  "Bash",
  "Read",
  "Edit",
  "Write",
  "Grep",
  "Glob",
  "Task",
  "TodoWrite",
  "WebFetch",
].map((name) => ({ name, description: `${name} tool`, input_schema: { type: "object" } }));
const REMINDER = (text: string) => ({
  type: "text",
  text: `<system-reminder>\n${text}\n</system-reminder>`,
});

/** One request of a Claude Code session after `turns` tool round trips. */
function sessionRequest(firstPrompt: string, turns: number, model = "claude-opus-5-5") {
  const messages: Array<Record<string, unknown>> = [
    {
      role: "user",
      content: [
        REMINDER("# claudeMd\nImplement features with tests. ```ts\nexport const x = 1;\n```"),
        REMINDER("The following skills are available: write code, debug, refactor."),
        { type: "text", text: firstPrompt, cache_control: { type: "ephemeral" } },
      ],
    },
  ];
  for (let i = 0; i < turns; i++) {
    messages.push({
      role: "assistant",
      content: [
        { type: "text", text: "Checking the code." },
        { type: "tool_use", id: `toolu_${i}`, name: "Bash", input: { command: "rg -n lease" } },
      ],
    });
    messages.push({
      role: "user",
      content: [
        {
          type: "tool_result",
          tool_use_id: `toolu_${i}`,
          content: "src/lease.ts:12: import { redis } from './cache';\nfunction renew() {}",
        },
        REMINDER("The TodoWrite tool hasn't been used recently."),
      ],
    });
  }
  // Later human turns that, read on their own, look like other task types.
  if (turns >= 2) messages.push({ role: "user", content: "now summarize what you changed" });
  if (turns >= 3) {
    messages.push({ role: "assistant", content: [{ type: "text", text: "Summary: …" }] });
    messages.push({
      role: "user",
      content: [
        {
          type: "image",
          source: { type: "base64", media_type: "image/png", data: "iVBORw0KGgo=" },
        },
        { type: "text", text: "[Request interrupted by user]" },
      ],
    });
  }
  return {
    model,
    max_tokens: 32000,
    stream: false,
    system: SYSTEM,
    tools: TOOLS,
    metadata: { user_id: "user_test_account_test_session_test" },
    messages,
  };
}

/** Claude Code's WebFetch summarizer: Haiku, an empty tool list, the fetched page as the prompt. */
function webFetchRequest() {
  const page = `${HARD_PROMPT}\n\`\`\`js\nfunction renew(lease) { return redis.set(lease); }\n\`\`\`\n`;
  return {
    model: HAIKU,
    max_tokens: 128000,
    stream: false,
    system: SYSTEM.slice(0, 2),
    tools: [],
    messages: [
      {
        role: "user",
        content: `\nWeb page content:\n---\n${page.repeat(40)}---\n\nExtract the API for renewing a lease.`,
      },
    ],
  };
}

/** Claude Code's session-title request: Haiku, no tools, the session in a `<session>` block. */
function titleRequest(firstPrompt: string) {
  return {
    model: HAIKU,
    max_tokens: 512,
    stream: false,
    system: [
      ...SYSTEM.slice(0, 2),
      { type: "text", text: "You are naming a coding session so the user can pick it out later." },
    ],
    messages: [{ role: "user", content: `<session>\n${firstPrompt}\n</session>` }],
  };
}

let upstreamModels: string[] = [];
const originalBackgroundConfig = getBackgroundDegradationConfig();

async function taskRoutingApi(method: "PUT" | "POST", body: unknown) {
  const response = await taskRoutingRoute[method](
    new Request("http://localhost/api/settings/task-routing", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  );
  assert.equal(response.status, 200, await response.clone().text());
  return response.json();
}

/** The operator's setup, sent through PUT /api/settings/task-routing. */
function configureRouting(options: {
  enabled?: boolean;
  detectionAnchor: "first-user" | "latest-user";
  escalateToOpus?: boolean;
}) {
  return taskRoutingApi("PUT", {
    enabled: options.enabled ?? true,
    detectionAnchor: options.detectionAnchor,
    taskModelMap: {
      coding: SONNET,
      creative: "",
      analysis: SONNET,
      vision: SONNET,
      summarization: HAIKU,
      chat: "",
      background: HAIKU,
    },
    ...(options.escalateToOpus
      ? {
          complexityRouting: {
            enabled: true,
            minScore: DEFAULT_COMPLEXITY_MIN_SCORE,
            model: OPUS,
          },
        }
      : {}),
  });
}

async function send(body: unknown): Promise<string> {
  const before = upstreamModels.length;
  const response = await handleChat(buildRequest({ url: "http://localhost/v1/messages", body }));
  assert.equal(response.status, 200, await response.clone().text());
  assert.equal(upstreamModels.length, before + 1, "exactly one upstream call per request");
  return upstreamModels[before];
}

const tier = (model: string) => /opus|sonnet|haiku/.exec(model)?.[0] ?? model;

async function sessionTiers(turnCount: number, firstPrompt = CODING_PROMPT, model?: string) {
  const tiers = [];
  for (let turns = 0; turns < turnCount; turns++) {
    tiers.push(tier(await send(sessionRequest(firstPrompt, turns, model))));
  }
  return tiers;
}

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
  await seedConnection("claude", { apiKey: "sk-claude-task-routing" });
  upstreamModels = [];
  globalThis.fetch = async (_url, init: RequestInit = {}) => {
    // Large Anthropic bodies go upstream gzip-compressed.
    const gzipped = toPlainHeaders(init.headers)["content-encoding"] === "gzip";
    const raw = gzipped ? zlib.gunzipSync(init.body as Uint8Array).toString("utf8") : init.body;
    const model = String(JSON.parse(String(raw)).model);
    upstreamModels.push(model);
    return buildClaudeResponse("ok", model);
  };
  setBackgroundDegradationConfig({
    enabled: true,
    degradationMap: {
      "claude-opus-5-5": "claude-haiku-5-5",
      "claude-sonnet-5-5": "claude-haiku-5-5",
      [SONNET]: HAIKU,
    },
    detectionPatterns: ["naming a coding session"],
  });
});

test.afterEach(async () => {
  setTaskRoutingConfig({
    enabled: false,
    detectionEnabled: true,
    detectionAnchor: "latest-user",
    taskModelMap: getDefaultTaskModelMap(),
    complexityRouting: { enabled: false, minScore: DEFAULT_COMPLEXITY_MIN_SCORE, model: "" },
  });
  setBackgroundDegradationConfig(originalBackgroundConfig);
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

test("with routing off, every turn keeps the model Claude Code asked for", async () => {
  await configureRouting({ enabled: false, detectionAnchor: "first-user" });
  assert.deepEqual(await sessionTiers(5), ["opus", "opus", "opus", "opus", "opus"]);
});

test("the settings API saves the conversation mode", async () => {
  await configureRouting({ detectionAnchor: "first-user" });
  const persisted = JSON.parse(String((await settingsDb.getSettings()).taskRouting));
  assert.equal(persisted.detectionAnchor, "first-user");
});

test("the default per-message mode switches models inside one session", async () => {
  await configureRouting({ detectionAnchor: "latest-user" });
  // coding → tool result (general chat keeps the requested model) → "summarize" → screenshot
  assert.deepEqual(await sessionTiers(5), ["sonnet", "opus", "haiku", "sonnet", "sonnet"]);
});

test("one model per conversation keeps the whole session on one model", async () => {
  await configureRouting({ detectionAnchor: "first-user" });
  assert.deepEqual(await sessionTiers(5), ["sonnet", "sonnet", "sonnet", "sonnet", "sonnet"]);
});

test("the session-title request still lands on Haiku via Background Degradation", async () => {
  await configureRouting({ detectionAnchor: "first-user" });
  assert.equal(tier(await send(titleRequest(CODING_PROMPT))), "haiku");
});

// ── complexity escalation ────────────────────────────────────────────────────

test("with routing off, an escalation setup keeps the requested model", async () => {
  await configureRouting({ enabled: false, detectionAnchor: "first-user", escalateToOpus: true });
  const tiers = await sessionTiers(5, HARD_PROMPT, "claude-sonnet-5-5");
  assert.deepEqual(tiers, ["sonnet", "sonnet", "sonnet", "sonnet", "sonnet"]);
});

test("the settings API saves the escalation and detect reports it", async () => {
  await configureRouting({ detectionAnchor: "first-user", escalateToOpus: true });
  const persisted = JSON.parse(String((await settingsDb.getSettings()).taskRouting));
  assert.deepEqual(persisted.complexityRouting, {
    enabled: true,
    minScore: DEFAULT_COMPLEXITY_MIN_SCORE,
    model: OPUS,
  });

  const hard = await taskRoutingApi("POST", {
    action: "detect",
    body: sessionRequest(HARD_PROMPT, 3),
  });
  assert.equal(hard.preferredModel, OPUS);
  assert.equal(hard.escalated, true);
  assert.ok(hard.complexityScore >= DEFAULT_COMPLEXITY_MIN_SCORE);

  // The fetched page scores as complex, but a request without tools is not an agent turn.
  const webFetch = await taskRoutingApi("POST", { action: "detect", body: webFetchRequest() });
  assert.ok(webFetch.complexityScore >= DEFAULT_COMPLEXITY_MIN_SCORE);
  assert.equal(webFetch.escalated, false);
  assert.equal(webFetch.preferredModel, SONNET);
});

test("with escalation on, an easy session stays on its task-type model", async () => {
  await configureRouting({ detectionAnchor: "first-user", escalateToOpus: true });
  assert.deepEqual(await sessionTiers(5), ["sonnet", "sonnet", "sonnet", "sonnet", "sonnet"]);
});

test("a hard session escalates to Opus for every turn", async () => {
  await configureRouting({ detectionAnchor: "first-user", escalateToOpus: true });
  const tiers = await sessionTiers(5, HARD_PROMPT, "claude-sonnet-5-5");
  assert.deepEqual(tiers, ["opus", "opus", "opus", "opus", "opus"]);
});

test("in the per-message mode the escalation lasts only while the hard prompt is newest", async () => {
  await configureRouting({ detectionAnchor: "latest-user", escalateToOpus: true });
  // hard prompt → tool result (general chat keeps the requested Sonnet) → "summarize" → image
  const tiers = await sessionTiers(5, HARD_PROMPT, "claude-sonnet-5-5");
  assert.deepEqual(tiers, ["opus", "sonnet", "haiku", "sonnet", "sonnet"]);
});

test("a WebFetch summary inside a hard session is not escalated to Opus", async () => {
  await configureRouting({ detectionAnchor: "first-user", escalateToOpus: true });
  assert.equal(tier(await send(webFetchRequest())), "sonnet");
});
