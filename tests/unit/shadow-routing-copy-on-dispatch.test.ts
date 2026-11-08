import test from "node:test";
import assert from "node:assert/strict";

import { scheduleShadowRouting } from "../../open-sse/services/combo/shadowRouting.ts";
import type {
  ComboLike,
  ComboLogger,
  ResolvedComboTarget,
} from "../../open-sse/services/combo/types.ts";

function target(name: string): ResolvedComboTarget {
  return {
    kind: "model",
    stepId: name,
    executionKey: name,
    modelStr: name,
    provider: "test",
    providerId: null,
    connectionId: null,
    weight: 1,
    label: null,
  };
}

const combo: ComboLike = { name: "shadow-copy-isolation", models: [] };
const config = { shadowRouting: { enabled: true, sampleRate: 1, timeoutMs: 1000 } };
const requestBody = () => ({
  model: "primary",
  messages: [{ role: "user", content: "original" }],
  tools: [{ function: { name: "read_file" } }],
});

function completionLogger(expected: number) {
  let resolve!: () => void;
  const done = new Promise<void>((r) => {
    resolve = r;
  });
  let completed = 0;
  const failures: string[] = [];
  const mark = (message: unknown) => {
    const text = String(message);
    if (text.includes("failed")) failures.push(text);
    if (
      text.includes("completed with status") ||
      text.includes("skipped (unavailable)") ||
      text.includes("failed")
    ) {
      completed++;
      if (completed >= expected) resolve();
    }
  };
  const log: ComboLogger = {
    info: (_tag, message) => mark(message),
    warn: (_tag, message) => mark(message),
    debug: () => undefined,
  };
  return { done, log, failures };
}

test("single shadow target receives the synchronous snapshot without modifying caller history", async () => {
  const body = requestBody();
  const { done, log, failures } = completionLogger(1);
  let observedContent = "";
  scheduleShadowRouting(
    combo,
    config,
    body,
    [target("shadow-one")],
    async (request, model) => {
      assert.equal(model, "shadow-one");
      const messages = request.messages as Array<{ content: string }>;
      observedContent = messages[0].content;
      messages[0].content = "executor changed";
      (request.tools as Array<{ function: { name: string } }>)[0].function.name = "modified";
      assert.equal(request.model, "shadow-one");
      assert.equal(request.stream, false);
      return new Response("shadow done");
    },
    undefined,
    "priority",
    log
  );
  body.messages[0].content = "caller changed after scheduling";
  await done;
  assert.deepEqual(failures, [], "shadow executor must not fail silently");
  assert.equal(observedContent, "original");
  assert.equal(body.messages[0].content, "caller changed after scheduling");
  assert.equal(body.tools[0].function.name, "read_file");
});

test("multiple shadow executors remain isolated even when one mutates nested content", async () => {
  const body = requestBody();
  const { done, log, failures } = completionLogger(2);
  const observed: string[] = [];
  scheduleShadowRouting(
    combo,
    config,
    body,
    [target("first"), target("second")],
    async (request, model) => {
      const messages = request.messages as Array<{ content: string }>;
      observed.push(`${model}:${messages[0].content}`);
      if (model === "first") messages[0].content = "injected mutation";
      return new Response("shadow done");
    },
    undefined,
    "priority",
    log
  );
  await done;
  assert.deepEqual(failures, [], "shadow executor must not fail silently");
  assert.deepEqual(observed, ["first:original", "second:original"]);
  assert.equal(body.messages[0].content, "original");
});

test("unavailable shadow candidates do not dispatch and available siblings keep original history", async () => {
  const body = requestBody();
  const { done, log, failures } = completionLogger(2);
  const dispatched: string[] = [];
  scheduleShadowRouting(
    combo,
    config,
    body,
    [target("offline"), target("online")],
    async (request, model) => {
      dispatched.push(model);
      assert.equal((request.messages as Array<{ content: string }>)[0].content, "original");
      return new Response("shadow done");
    },
    async (model) => model !== "offline",
    "priority",
    log
  );
  await done;
  assert.deepEqual(failures, [], "shadow executor must not fail silently");
  assert.deepEqual(dispatched, ["online"]);
  assert.equal(body.messages[0].content, "original");
});

async function countRequestClones(run: () => Promise<void>): Promise<number> {
  const scope = globalThis as unknown as { structuredClone: typeof structuredClone };
  const originalClone = scope.structuredClone;
  let clones = 0;
  scope.structuredClone = ((value: unknown, options?: StructuredSerializeOptions) => {
    if (value !== null && typeof value === "object" && "messages" in value) clones++;
    return originalClone(value, options);
  }) as typeof structuredClone;
  try {
    await run();
  } finally {
    scope.structuredClone = originalClone;
  }
  return clones;
}

const cloneBudgets = [
  { name: "one available target reuses the snapshot", targets: ["online"], clones: 1 },
  { name: "one unavailable target clones nothing extra", targets: ["offline"], clones: 1 },
  { name: "an unavailable sibling is not cloned", targets: ["offline", "online"], clones: 2 },
  { name: "every dispatched sibling gets its own copy", targets: ["a", "b"], clones: 3 },
];

for (const budget of cloneBudgets) {
  test(`clone budget: ${budget.name}`, async () => {
    const { done, log, failures } = completionLogger(budget.targets.length);
    const clones = await countRequestClones(async () => {
      scheduleShadowRouting(
        combo,
        config,
        requestBody(),
        budget.targets.map(target),
        async () => new Response("shadow done"),
        async (model) => model !== "offline",
        "priority",
        log
      );
      await done;
    });
    assert.deepEqual(failures, [], "shadow executor must not fail silently");
    assert.equal(clones, budget.clones);
  });
}
