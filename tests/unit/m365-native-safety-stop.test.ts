import test from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import type WebSocket from "ws";
import {
  CopilotM365WebExecutor,
  __setCopilotM365WebSocketForTesting,
} from "../../open-sse/executors/copilot-m365-web.ts";
import { encodeFrame } from "../../open-sse/executors/copilot-m365-frames.ts";
import { isProviderSafetyRefusalBody } from "../../open-sse/utils/providerSafety.ts";
import {
  classifyProviderError,
  PROVIDER_ERROR_TYPES,
} from "../../open-sse/services/errorClassifier.ts";

// M365 "Disengaged" is its safety filter declining the request. It must reach routing as an
// explicit provider safety stop (request-scoped, terminal), never as a retryable 5xx that a
// combo would replay against another target or account.

type Frame = Record<string, unknown>;
let script: Frame[] = [];
class Socket extends EventEmitter {
  readyState = 1;
  constructor() {
    super();
    queueMicrotask(() => this.emit("open"));
  }
  send(data: string) {
    const frames = data
      .split("\x1e")
      .filter(Boolean)
      .map((f) => JSON.parse(f) as Frame);
    if (frames.some((f) => f.protocol === "json"))
      queueMicrotask(() => this.emit("message", Buffer.from(encodeFrame({}))));
    if (frames.some((f) => f.type === 4))
      queueMicrotask(() => {
        for (const frame of script) this.emit("message", Buffer.from(encodeFrame(frame)));
      });
  }
  close() {
    this.readyState = 3;
    this.emit("close");
  }
  terminate() {
    this.close();
  }
}

function request(stream: boolean) {
  return {
    model: "copilot-m365",
    stream,
    body: { messages: [{ role: "user", content: "hello" }] } as Record<string, unknown>,
    credentials: {
      accessToken: "test-token",
      providerSpecificData: { chathubPath: "u@t", tier: "edu" },
    },
  };
}

const shapes: Array<[string, Frame[]]> = [
  [
    "a Disengaged message",
    [
      { type: 1, arguments: [{ messages: [{ messageType: "Disengaged", text: "declined" }] }] },
      { type: 3, invocationId: "0" },
    ],
  ],
  [
    "a Disengaged final result",
    [
      { type: 2, item: { result: { value: "Disengaged", message: "declined" } } },
      { type: 3, invocationId: "0" },
    ],
  ],
];

for (const [label, frames] of shapes) {
  for (const stream of [false, true]) {
    test(`${label} is a terminal provider safety stop (stream=${stream})`, async () => {
      script = frames;
      const restore = __setCopilotM365WebSocketForTesting(Socket as unknown as typeof WebSocket);
      try {
        const { response } = await new CopilotM365WebExecutor().execute(request(stream));
        assert.equal(response.status, 400);
        const body = (await response.json()) as { error: Record<string, unknown> };
        assert.equal(body.error.code, "provider_safety_rejection");
        assert.equal(body.error.type, "invalid_request_error");
        assert.equal(isProviderSafetyRefusalBody(response.status, body), true);
        // Account health classifies it as a safety refusal, not an upstream failure.
        assert.equal(
          classifyProviderError(response.status, body, "copilot-m365-web"),
          PROVIDER_ERROR_TYPES.PROVIDER_SAFETY_REFUSAL
        );
        assert.equal(response.headers.get("Retry-After"), null);
      } finally {
        restore();
      }
    });
  }
}
