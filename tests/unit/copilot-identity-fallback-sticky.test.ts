/**
 * After the GitHub Copilot 403 identity fallback switches to copilot-chat, every
 * later request of the same execute() call (400 field-downgrade retry, 429 re-run)
 * must keep the copilot-chat identity. Going back to the denied CLI identity
 * turns a recoverable error into a 403.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { GithubExecutor } from "../../open-sse/executors/github.ts";
import { BaseExecutor } from "../../open-sse/executors/base.ts";
import {
  GITHUB_COPILOT_CLI_INTEGRATION_ID,
  GITHUB_COPILOT_CHAT_INTEGRATION_ID,
} from "../../open-sse/config/providerHeaderProfiles.ts";

const realFetch = globalThis.fetch;
const realDelay = BaseExecutor.RETRY_CONFIG.delayMs;

function integrationId(headers: unknown): string {
  const entry = Object.entries((headers ?? {}) as Record<string, string>).find(
    ([k]) => k.toLowerCase() === "copilot-integration-id"
  );
  return String(entry?.[1]);
}

async function run(scenario: "429" | "400") {
  const ids: string[] = [];
  globalThis.fetch = (async (_url: RequestInfo | URL, init?: RequestInit) => {
    if (!init?.body) return new Response("{}", { status: 200 });
    const id = integrationId(init.headers);
    ids.push(id);
    const hasVerbosity = String(init.body).includes('"verbosity"');
    if (id === GITHUB_COPILOT_CLI_INTEGRATION_ID) {
      return new Response('{"error":{"message":"Access denied: copilot 403"}}', { status: 403 });
    }
    if (scenario === "429" && ids.length === 2) {
      return new Response('{"error":"rate limited"}', { status: 429 });
    }
    if (scenario === "400" && hasVerbosity) {
      return new Response('{"error":"verbosity: Extra inputs are not permitted"}', {
        status: 400,
      });
    }
    return new Response("{}", { status: 200 });
  }) as typeof fetch;
  const res = await new GithubExecutor().execute({
    model: "gpt-4o",
    body: { model: "gpt-4o", messages: [{ role: "user", content: "hi" }], verbosity: "low" },
    stream: false,
    credentials: {
      accessToken: "gho_test",
      providerSpecificData: { copilotToken: "tid=test" },
      connectionId: `sticky-${scenario}`,
    },
  } as never);
  return { status: res.response.status, ids };
}

test.beforeEach(() => {
  BaseExecutor.RETRY_CONFIG.delayMs = 1;
});
test.afterEach(() => {
  BaseExecutor.RETRY_CONFIG.delayMs = realDelay;
  globalThis.fetch = realFetch;
});

test("a 429 re-run after the identity fallback keeps copilot-chat", async () => {
  const { status, ids } = await run("429");
  assert.equal(status, 200);
  assert.deepEqual(ids.slice(1), Array(ids.length - 1).fill(GITHUB_COPILOT_CHAT_INTEGRATION_ID));
});

test("a 400 field-downgrade retry after the identity fallback keeps copilot-chat", async () => {
  const { status, ids } = await run("400");
  assert.equal(status, 200);
  assert.deepEqual(ids.slice(1), Array(ids.length - 1).fill(GITHUB_COPILOT_CHAT_INTEGRATION_ID));
});
