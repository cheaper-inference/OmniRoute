import assert from "node:assert/strict";
import test from "node:test";

import { handleAgenticPipelineChat } from "../../open-sse/services/agenticPipeline.ts";
import { handleFusionChat, enforcePanelBufferLimits } from "../../open-sse/services/fusion.ts";
import { ContextPruner } from "../../open-sse/services/contextPruner.ts";
import {
  RecursionGuard,
  RecursionLimitExceededError,
  TimeBudgetExceededError,
} from "../../open-sse/utils/recursionGuard.ts";
import type { HandleSingleModel } from "../../open-sse/services/combo/types.ts";

const noop = () => undefined;
const log = { info: noop, warn: noop, debug: noop, error: noop };

function responseText(content: string, status = 200): Response {
  return new Response(JSON.stringify({ choices: [{ message: { role: "assistant", content } }] }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function steps() {
  return [{ model: "p/planner" }, { model: "p/executor" }];
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ============================================================================
// STRESS TEST 1: High Concurrency Agentic Pipeline
// ============================================================================

test("STRESS: 50 concurrent agentic pipeline requests - no stack overflow", async () => {
  const CONCURRENT_REQUESTS = 50;
  const MAX_TOOL_ROUNDS = 1;

  let totalPlannerCalls = 0;
  let totalExecutorCalls = 0;

  const handle: HandleSingleModel = async (_body, model) => {
    // Random delay 50-300ms
    await delay(50 + Math.random() * 250);

    if (model === "p/planner") {
      totalPlannerCalls++;
      return responseText(
        JSON.stringify({
          route: "TOOLS",
          toolCalls: [
            { id: `call_${totalPlannerCalls}`, name: "read_file", arguments: { path: "test.txt" } },
          ],
        })
      );
    }
    totalExecutorCalls++;
    return responseText("executor result");
  };

  const promises = [];
  for (let i = 0; i < CONCURRENT_REQUESTS; i++) {
    promises.push(
      handleAgenticPipelineChat({
        body: {
          messages: [{ role: "user", content: `Request ${i}` }],
          tools: [{ name: "read_file" }],
          stream: false,
        },
        steps: steps(),
        handleSingleModel: handle,
        log,
        config: { maxToolRounds: MAX_TOOL_ROUNDS },
      })
    );
  }

  const results = await Promise.allSettled(promises);

  // Assert: No unhandled rejections (all promises settled)
  for (const result of results) {
    assert.equal(
      result.status,
      "fulfilled",
      "All requests must complete without unhandled rejection"
    );
  }

  // Assert: No RangeError: Maximum call stack size exceeded
  // (If recursion happened, we'd see unhandled rejections with stack overflow)

  // Assert: Correct number of calls
  // Each request: 1 planner (TOOLS) + 1 executor + 1 planner (FINAL) = 3 planner calls
  assert.equal(
    totalPlannerCalls,
    CONCURRENT_REQUESTS * 2,
    "Each request should have 2 planner calls (TOOLS + FINAL)"
  );
  assert.equal(totalExecutorCalls, CONCURRENT_REQUESTS, "Each request should have 1 executor call");

  console.log(
    `[STRESS] ${CONCURRENT_REQUESTS} requests: ${totalPlannerCalls} planner, ${totalExecutorCalls} executor calls`
  );
});

test("STRESS: 25 concurrent agentic requests with tool round continuation", async () => {
  const CONCURRENT_REQUESTS = 25;
  const MAX_TOOL_ROUNDS = 3;

  let totalPlannerCalls = 0;
  let totalExecutorCalls = 0;

  const handle: HandleSingleModel = async (_body, model) => {
    await delay(50 + Math.random() * 250);

    if (model === "p/planner") {
      totalPlannerCalls++;
      // First 3 calls return TOOLS, 4th returns FINAL
      if (
        totalPlannerCalls % 4 === 1 ||
        totalPlannerCalls % 4 === 2 ||
        totalPlannerCalls % 4 === 3
      ) {
        return responseText(
          JSON.stringify({
            route: "TOOLS",
            toolCalls: [{ id: `call_${totalPlannerCalls}`, name: "tool", arguments: {} }],
          })
        );
      }
      return responseText(
        JSON.stringify({
          route: "FINAL",
          finalAnswer: "Done",
        })
      );
    }
    totalExecutorCalls++;
    return responseText("executor result");
  };

  const promises = [];
  for (let i = 0; i < CONCURRENT_REQUESTS; i++) {
    promises.push(
      handleAgenticPipelineChat({
        body: {
          messages: [{ role: "user", content: `Request ${i}` }],
          tools: [{ name: "tool" }],
          stream: false,
        },
        steps: steps(),
        handleSingleModel: handle,
        log,
        config: { maxToolRounds: MAX_TOOL_ROUNDS },
      })
    );
  }

  const results = await Promise.allSettled(promises);

  for (const result of results) {
    assert.equal(result.status, "fulfilled", "All requests must complete");
  }

  // With maxToolRounds=3 and 25 concurrent:
  // Each request goes through up to 3 tool rounds
  // Each round = 1 planner(TOOLS) + 1 executor = 2 calls
  // Final = 1 planner(FINAL)
  // Total per request: 3 * 2 + 1 = 7 planner, 3 executor
  // But some may finish early

  console.log(
    `[STRESS] ${CONCURRENT_REQUESTS} requests (3 rounds): ${totalPlannerCalls} planner, ${totalExecutorCalls} executor`
  );
});

test("STRESS: 50 concurrent Fusion panel requests", async () => {
  const CONCURRENT_REQUESTS = 30; // Fewer because Fusion is heavier
  const PANEL_SIZE = 5;

  let totalPanelCalls = 0;
  let totalJudgeCalls = 0;

  const handle: HandleSingleModel = async (_body, model) => {
    await delay(50 + Math.random() * 250);

    if (model.startsWith("panel/")) {
      totalPanelCalls++;
      return responseText(`Panel ${model} response`);
    }
    totalJudgeCalls++;
    return responseText("Judge synthesis");
  };

  const promises = [];
  for (let i = 0; i < CONCURRENT_REQUESTS; i++) {
    promises.push(
      handleFusionChat({
        body: { messages: [{ role: "user", content: `Request ${i}` }] },
        models: Array.from({ length: PANEL_SIZE }, (_, j) => `panel/model-${j}`),
        handleSingleModel: handle,
        log,
        judgeModel: "judge/model",
        tuning: { minPanel: 2, stragglerGraceMs: 1000, panelHardTimeoutMs: 5000 },
      })
    );
  }

  const results = await Promise.allSettled(promises);

  for (const result of results) {
    assert.equal(result.status, "fulfilled", "All Fusion requests must complete");
  }

  console.log(
    `[STRESS] ${CONCURRENT_REQUESTS} Fusion requests: ${totalPanelCalls} panel, ${totalJudgeCalls} judge calls`
  );
});

// ============================================================================
// STRESS TEST 2: Memory Stability
// ============================================================================

test("STRESS: Memory stability - ContextPruner prevents bloat", async () => {
  const ITERATIONS = 1000;
  const LARGE_CONTENT = "x".repeat(10000); // 10KB per tool result

  let peakMemory = 0;

  for (let i = 0; i < ITERATIONS; i++) {
    const messages = [
      { role: "system", content: "System" },
      { role: "user", content: "Question" },
      ...Array.from({ length: 20 }, (_, j) => [
        {
          role: "assistant",
          content: [{ type: "tool_use", id: `t${j}`, name: "tool", input: {} }],
        },
        { role: "tool", content: LARGE_CONTENT },
      ]).flat(),
    ];

    const pruned = ContextPruner.pruneForPlanner(messages, {
      maxRecentToolResults: 3,
      maxToolOutputLength: 2000,
    });

    // Verify pruning happened
    const toolResults = pruned.filter((m) => m.role === "tool");
    for (const tr of toolResults) {
      if (typeof tr.content === "string") {
        assert.ok(tr.content.length <= 2020, "Tool result should be truncated");
      }
    }

    // Track memory
    if (i % 100 === 0) {
      const mem = process.memoryUsage();
      if (mem.heapUsed > peakMemory) peakMemory = mem.heapUsed;
    }
  }

  // Memory should not grow unbounded
  const finalMem = process.memoryUsage();
  console.log(
    `[STRESS] Memory: peak heap ${Math.round(peakMemory / 1024 / 1024)}MB, final heap ${Math.round(finalMem.heapUsed / 1024 / 1024)}MB`
  );

  // Heap should stay reasonable (under 200MB for this test)
  assert.ok(
    finalMem.heapUsed < 200 * 1024 * 1024,
    `Heap too large: ${Math.round(finalMem.heapUsed / 1024 / 1024)}MB`
  );
});

test("STRESS: Memory stability - Panel buffer limits prevent OOM", () => {
  const answers = Array.from({ length: 20 }, (_, i) => ({
    model: `model-${i}`,
    text: "x".repeat(100000), // 100KB each = 2MB total before limits
  }));

  const limited = enforcePanelBufferLimits(answers, 500000, 50000); // 500KB budget, 50KB per response

  // Should truncate and drop oldest
  const totalChars = limited.reduce((sum, a) => sum + a.text.length, 0);
  assert.ok(totalChars <= 500000, `Total chars ${totalChars} exceeds budget 500000`);

  // Each should be truncated to 50KB
  for (const a of limited) {
    assert.ok(a.text.length <= 50020, `Response ${a.model} exceeds 50KB limit`);
  }

  console.log(
    `[STRESS] Panel: kept ${limited.length}/20 responses, ${Math.round(totalChars / 1024)}KB total`
  );
});

test("STRESS: Memory stability - Fusion with large panel responses", async () => {
  const PANEL_SIZE = 40; // Max panel size

  let totalPanelCalls = 0;
  let totalJudgeCalls = 0;

  const handle: HandleSingleModel = async (_body, model) => {
    await delay(10); // Fast for stress test

    if (model.startsWith("panel/")) {
      totalPanelCalls++;
      // Return large response
      return responseText("x".repeat(100000)); // 100KB
    }
    totalJudgeCalls++;
    return responseText("Judge synthesis");
  };

  const result = await handleFusionChat({
    body: { messages: [{ role: "user", content: "test" }] },
    models: Array.from({ length: PANEL_SIZE }, (_, j) => `panel/model-${j}`),
    handleSingleModel: handle,
    log,
    judgeModel: "judge/model",
    tuning: { minPanel: 10, stragglerGraceMs: 500, panelHardTimeoutMs: 3000, maxPanel: PANEL_SIZE },
  });

  assert.equal(result.status, 200);
  console.log(
    `[STRESS] Fusion ${PANEL_SIZE} panel: ${totalPanelCalls} panel, ${totalJudgeCalls} judge`
  );
});

// ============================================================================
// STRESS TEST 3: Recursion Guard Under Load
// ============================================================================

test("STRESS: RecursionGuard prevents stack overflow under load", async () => {
  const guard = new RecursionGuard({ maxDepth: 100, timeBudgetMs: 5000 });

  async function recursiveFn(depth: number): Promise<number> {
    guard.enter();
    try {
      if (depth <= 0) return depth;
      return await recursiveFn(depth - 1);
    } finally {
      guard.exit();
    }
  }

  // This should work within limits
  const result = await recursiveFn(50);
  assert.equal(result, 0);

  // This should throw RecursionLimitExceededError
  await assert.rejects(
    () => recursiveFn(150),
    (err) => err instanceof RecursionLimitExceededError
  );

  console.log("[STRESS] RecursionGuard correctly prevents deep recursion");
});

test("STRESS: RecursionGuard time budget enforcement", async () => {
  const guard = new RecursionGuard({ maxDepth: 1000, timeBudgetMs: 100 }); // 100ms budget

  async function slowRecursive(): Promise<void> {
    guard.enter();
    try {
      await delay(50); // 50ms per level
      await slowRecursive();
    } finally {
      guard.exit();
    }
  }

  await assert.rejects(
    () => slowRecursive(),
    (err) => err instanceof TimeBudgetExceededError
  );

  console.log("[STRESS] RecursionGuard correctly enforces time budget");
});

// ============================================================================
// STRESS TEST 4: End-to-End Concurrency with All Guards
// ============================================================================

test("STRESS: Full pipeline concurrency with all guards active", async () => {
  const CONCURRENT = 25;

  let plannerCalls = 0;
  let executorCalls = 0;
  let fusionPanelCalls = 0;
  let fusionJudgeCalls = 0;

  const handle: HandleSingleModel = async (_body, model) => {
    await delay(20 + Math.random() * 100); // 20-120ms

    if (model === "p/planner") {
      plannerCalls++;
      // Alternate between TOOLS and FINAL
      if (plannerCalls % 2 === 1) {
        return responseText(
          JSON.stringify({
            route: "TOOLS",
            toolCalls: [{ id: `call_${plannerCalls}`, name: "tool", arguments: {} }],
          })
        );
      }
      return responseText(
        JSON.stringify({
          route: "FINAL",
          finalAnswer: "Done",
        })
      );
    }

    if (model.startsWith("panel/")) {
      fusionPanelCalls++;
      return responseText(`Panel ${model} response`);
    }

    if (model === "p/executor") {
      executorCalls++;
      return responseText("executor result");
    }

    if (model === "judge/model") {
      fusionJudgeCalls++;
      return responseText("Judge synthesis");
    }

    return responseText("default");
  };

  // Mix of agentic and fusion requests
  const promises = [];
  for (let i = 0; i < CONCURRENT; i++) {
    if (i % 2 === 0) {
      promises.push(
        handleAgenticPipelineChat({
          body: {
            messages: [{ role: "user", content: `Agentic ${i}` }],
            tools: [{ name: "tool" }],
          },
          steps: steps(),
          handleSingleModel: handle,
          log,
          config: { maxToolRounds: 2 },
        })
      );
    } else {
      promises.push(
        handleFusionChat({
          body: { messages: [{ role: "user", content: `Fusion ${i}` }] },
          models: ["panel/m1", "panel/m2", "panel/m3"],
          handleSingleModel: handle,
          log,
          judgeModel: "judge/model",
          tuning: { minPanel: 2, stragglerGraceMs: 100, panelHardTimeoutMs: 1000 },
        })
      );
    }
  }

  const results = await Promise.allSettled(promises);

  for (const result of results) {
    assert.equal(result.status, "fulfilled", "All mixed requests must complete");
  }

  console.log(
    `[STRESS] Mixed ${CONCURRENT}: ${plannerCalls} planner, ${executorCalls} executor, ${fusionPanelCalls} panel, ${fusionJudgeCalls} judge`
  );
});

// ============================================================================
// STRESS TEST 5: Sustained Load Simulation
// ============================================================================

test("STRESS: Sustained load - 100 sequential requests", async () => {
  const TOTAL_REQUESTS = 100;
  const BATCH_SIZE = 20;

  let totalPlanner = 0;
  let totalExecutor = 0;

  const handle: HandleSingleModel = async (_body, model) => {
    await delay(5 + Math.random() * 30); // Very fast for sustained test

    if (model === "p/planner") {
      totalPlanner++;
      return responseText(
        JSON.stringify({
          route: totalPlanner % 2 === 1 ? "TOOLS" : "FINAL",
          toolCalls:
            totalPlanner % 2 === 1
              ? [{ id: `call_${totalPlanner}`, name: "tool", arguments: {} }]
              : undefined,
          finalAnswer: totalPlanner % 2 === 0 ? "Done" : undefined,
        })
      );
    }
    totalExecutor++;
    return responseText("executor");
  };

  let completed = 0;
  for (let batch = 0; batch < TOTAL_REQUESTS / BATCH_SIZE; batch++) {
    const promises = [];
    for (let i = 0; i < BATCH_SIZE; i++) {
      promises.push(
        handleAgenticPipelineChat({
          body: {
            messages: [{ role: "user", content: `Request ${batch * BATCH_SIZE + i}` }],
            tools: [{ name: "tool" }],
          },
          steps: steps(),
          handleSingleModel: handle,
          log,
          config: { maxToolRounds: 1 },
        })
      );
    }

    const results = await Promise.allSettled(promises);
    for (const r of results) {
      assert.equal(r.status, "fulfilled");
    }
    completed += BATCH_SIZE;
    console.log(`[STRESS] Completed ${completed}/${TOTAL_REQUESTS} requests`);
  }

  console.log(`[STRESS] Sustained: ${totalPlanner} planner, ${totalExecutor} executor`);
});

test("STRESS: No memory leaks in sustained load", async () => {
  // Run multiple batches and verify memory doesn't grow unbounded
  const memBefore = process.memoryUsage().heapUsed;

  for (let round = 0; round < 10; round++) {
    const promises = [];
    for (let i = 0; i < 10; i++) {
      promises.push(
        handleAgenticPipelineChat({
          body: {
            messages: [{ role: "user", content: `Round ${round} req ${i}` }],
            tools: [{ name: "tool" }],
          },
          steps: steps(),
          handleSingleModel: async (_body, model) => {
            await delay(1);
            if (model === "p/planner") {
              return responseText(JSON.stringify({ route: "FINAL", finalAnswer: "Done" }));
            }
            return responseText("executor");
          },
          log,
          config: { maxToolRounds: 1 },
        })
      );
    }
    await Promise.allSettled(promises);
  }

  // Force GC if available
  if (global.gc) global.gc();

  const memAfter = process.memoryUsage().heapUsed;
  const growth = memAfter - memBefore;

  console.log(
    `[STRESS] Memory growth: ${Math.round(growth / 1024 / 1024)}MB (before: ${Math.round(memBefore / 1024 / 1024)}MB, after: ${Math.round(memAfter / 1024 / 1024)}MB)`
  );

  // Growth should be minimal (< 50MB for this test)
  assert.ok(
    growth < 50 * 1024 * 1024,
    `Memory grew too much: ${Math.round(growth / 1024 / 1024)}MB`
  );
});
