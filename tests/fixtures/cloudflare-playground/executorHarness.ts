/**
 * Shared fakes for the Cloudflare Playground executor suites: the real executor runs, and
 * only the playground transport is replaced.
 */
import {
  CloudflarePlaygroundExecutor,
  type CfTransport,
  type CfTransportStartResult,
} from "../../../open-sse/executors/cloudflare-playground.ts";

const identityFrame = JSON.stringify({
  name: "playground-test",
  agent: "playground",
  type: "cf_agent_identity",
});
const stateFrame = JSON.stringify({
  state: {
    model: "@cf/test-model",
    temperature: 0.7,
    stream: true,
    system: "You are a helpful assistant.",
  },
  type: "cf_agent_state",
});
const decoyRpcDone = JSON.stringify({
  id: "cfp-config",
  done: true,
  type: "cf_agent_rpc_response",
});

export const cfFrame = (chatId: string, body: unknown) =>
  JSON.stringify({ id: chatId, type: "cf_agent_use_chat_response", body: JSON.stringify(body) });

export const buildSuccessFrames = (chatId: string, text: string, reasoning = "") => [
  identityFrame,
  stateFrame,
  decoyRpcDone,
  cfFrame(chatId, { type: "start" }),
  cfFrame(chatId, { type: "start-step" }),
  ...(reasoning
    ? [
        cfFrame(chatId, { type: "reasoning-start", id: "r1" }),
        cfFrame(chatId, { type: "reasoning-delta", delta: reasoning, id: "r1" }),
        cfFrame(chatId, { type: "reasoning-end", id: "r1" }),
      ]
    : []),
  cfFrame(chatId, { type: "text-start", id: "t1" }),
  cfFrame(chatId, { type: "text-delta", delta: text, id: "t1" }),
  cfFrame(chatId, { type: "finish-step" }),
  cfFrame(chatId, { type: "finish", messageMetadata: { finishReason: "stop" } }),
  JSON.stringify({ id: chatId, type: "cf_agent_use_chat_response", done: true }),
];

export type CfTransportFailure = Omit<Extract<CfTransportStartResult, { ok: false }>, "ok">;

export class FakeTransport implements CfTransport {
  constructor(
    private framesList: string[],
    private fail: CfTransportFailure | null = null
  ) {}

  async start(): Promise<CfTransportStartResult> {
    return this.fail ? { ok: false, ...this.fail } : { ok: true };
  }

  async *frames(): AsyncGenerator<string> {
    for (const frame of this.framesList) yield frame;
  }

  async close(): Promise<void> {}
}

export const executeArgs = (body: Record<string, unknown>, stream: boolean) =>
  ({ body, credentials: {}, signal: null, stream }) as unknown as Parameters<
    CloudflarePlaygroundExecutor["execute"]
  >[0];

export function parseSseChunks(raw: string) {
  return raw
    .split("\n\n")
    .filter((chunk) => chunk.startsWith("data: ") && chunk !== "data: [DONE]")
    .map((chunk) => JSON.parse(chunk.slice(6)));
}

/**
 * Transport that yields a different reply per attempt, recording each room id.
 *
 * `retryDelayMs: 0` is essential: the production delay is 5 s on purpose (the
 * playground rate-limits per IP per minute), but paying it here would make the
 * whole file cost `retries * 5 s` of wall clock. Exhaustion tests additionally
 * pass `maxToolRetries` so the budget is exercised, not the clock.
 */
export function makeSequencedExecutor(
  replies: Array<(chatId: string) => string[]>,
  maxToolRetries?: number
) {
  const rooms: string[] = [];
  const executor = new CloudflarePlaygroundExecutor(
    (chatId) => {
      rooms.push(chatId);
      const build = replies[Math.min(rooms.length - 1, replies.length - 1)];
      return new FakeTransport(build(chatId));
    },
    undefined,
    maxToolRetries,
    0
  );
  return { executor, rooms };
}
