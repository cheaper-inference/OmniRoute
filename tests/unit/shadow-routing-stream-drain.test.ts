import test from "node:test";
import assert from "node:assert/strict";
import type {
  ComboLike,
  ComboLogger,
  ResolvedComboTarget,
} from "../../open-sse/services/combo/types.ts";

import {
  drainShadowResponse,
  scheduleShadowRouting,
} from "../../open-sse/services/combo/shadowRouting.ts";

function noBufferOrClone(response: Response): Response {
  Object.defineProperty(response, "clone", {
    value() {
      throw new Error("must not tee the shadow response");
    },
  });
  Object.defineProperty(response, "arrayBuffer", {
    value() {
      throw new Error("must not accumulate the shadow response in memory");
    },
  });
  return response;
}

test("shadow response drain consumes all chunks without cloning or accumulating a body", async () => {
  let pulled = 0;
  const chunks = 40;
  const response = noBufferOrClone(
    new Response(
      new ReadableStream<Uint8Array>({
        pull(controller) {
          if (pulled === chunks) {
            controller.close();
            return;
          }
          pulled++;
          controller.enqueue(new Uint8Array(64 * 1024));
        },
      })
    )
  );

  await drainShadowResponse(response);
  assert.equal(pulled, chunks);
  assert.equal(response.bodyUsed, true);
});

test("shadow body reader errors are best-effort", async () => {
  const response = new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.error(new Error("upstream stream failed"));
      },
    })
  );
  await assert.doesNotReject(drainShadowResponse(response));
});

test("scheduled shadow routing consumes the original stream, not a tee", async () => {
  let produced = 0;
  const response = noBufferOrClone(
    new Response(
      new ReadableStream<Uint8Array>({
        pull(controller) {
          produced++;
          controller.enqueue(new Uint8Array([1, 2, 3]));
          controller.close();
        },
      }),
      { status: 200 }
    )
  );

  let complete!: () => void;
  const done = new Promise<void>((resolve) => {
    complete = resolve;
  });
  const logs: string[] = [];
  scheduleShadowRouting(
    { name: "shadow-memory-regression", models: [] } as ComboLike,
    { shadowRouting: { enabled: true, sampleRate: 1, timeoutMs: 1000 } },
    { model: "primary", messages: [{ role: "user", content: "hi" }] },
    [
      { modelStr: "shadow-model", provider: "test-provider", executionKey: "test" },
    ] as ResolvedComboTarget[],
    async () => response,
    undefined,
    "priority",
    {
      info(_tag: string, message: string) {
        logs.push(message);
        if (message.includes("completed with status")) complete();
      },
      warn(_tag: string, message: string) {
        logs.push(message);
        complete();
      },
    } as ComboLogger
  );
  await Promise.race([
    done,
    new Promise<never>((_resolve, reject) =>
      setTimeout(() => reject(new Error("shadow completion timed out")), 2000)
    ),
  ]);
  assert.equal(produced, 1);
  assert.equal(response.bodyUsed, true);
  assert.ok(
    logs.some((msg) => msg.includes("completed with status 200")),
    logs.join("\n")
  );
});
