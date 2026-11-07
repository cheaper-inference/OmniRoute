import assert from "node:assert/strict";
import test from "node:test";

import { parseAndValidatePlannerDecision } from "../../open-sse/services/schemas/agentContracts.ts";
import { ContextPruner } from "../../open-sse/services/contextPruner.ts";
import {
  SchemaValidationError,
  ProviderExecutionError,
  AgentBudgetExceededError,
  ClientCancellationError,
  toOmniRouteError,
} from "../../open-sse/utils/agentErrors.ts";
import { enforcePanelBufferLimits, truncateText } from "../../open-sse/services/fusion.ts";

// =============================================================================
// Schema Validation Tests
// =============================================================================

test("parseAndValidatePlannerDecision - valid JSON with TOOLS route", () => {
  const raw = JSON.stringify({
    route: "TOOLS",
    toolCalls: [{ id: "call_1", name: "read_file", arguments: { path: "test.txt" } }],
  });
  const result = parseAndValidatePlannerDecision(raw, { model: "test-model" });
  assert.equal(result.route, "TOOLS");
  assert.equal(result.toolCalls.length, 1);
  assert.equal(result.toolCalls[0].name, "read_file");
});

test("parseAndValidatePlannerDecision - valid JSON with FINAL route", () => {
  const raw = JSON.stringify({
    route: "FINAL",
    finalAnswer: "The answer is 42.",
  });
  const result = parseAndValidatePlannerDecision(raw, { model: "test-model" });
  assert.equal(result.route, "FINAL");
  assert.equal(result.finalAnswer, "The answer is 42.");
});

test("parseAndValidatePlannerDecision - markdown JSON block", () => {
  const raw = `Here is my decision:\n\`\`\`json\n{"route":"TOOLS","toolCalls":[{"id":"c1","name":"shell","arguments":{}}]}\n\`\`\``;
  const result = parseAndValidatePlannerDecision(raw, { model: "test-model" });
  assert.equal(result.route, "TOOLS");
  assert.equal(result.toolCalls[0].name, "shell");
});

test("parseAndValidatePlannerDecision - legacy OMNIROUTE_ROUTE format TOOLS", () => {
  const raw = "OMNIROUTE_ROUTE: TOOLS\nUse the read_file tool to read the file.";
  const result = parseAndValidatePlannerDecision(raw, { model: "test-model" });
  assert.equal(result.route, "TOOLS");
  assert.ok(result.toolCalls.length >= 1);
});

test("parseAndValidatePlannerDecision - legacy OMNIROUTE_ROUTE format FINAL", () => {
  const raw = "OMNIROUTE_ROUTE: FINAL\nThe answer is 42.";
  const result = parseAndValidatePlannerDecision(raw, { model: "test-model" });
  assert.equal(result.route, "FINAL");
  assert.equal(result.finalAnswer, "The answer is 42.");
});

test("parseAndValidatePlannerDecision - empty response throws", () => {
  assert.throws(
    () => parseAndValidatePlannerDecision("", { model: "test-model" }),
    (err) => err instanceof SchemaValidationError
  );
});

test("parseAndValidatePlannerDecision - invalid JSON throws", () => {
  assert.throws(
    () => parseAndValidatePlannerDecision("not json at all", { model: "test-model" }),
    (err) => err instanceof SchemaValidationError
  );
});

test("parseAndValidatePlannerDecision - TOOLS without toolCalls throws", () => {
  const raw = JSON.stringify({ route: "TOOLS", toolCalls: [] });
  assert.throws(
    () => parseAndValidatePlannerDecision(raw, { model: "test-model" }),
    (err) => err instanceof SchemaValidationError
  );
});

test("parseAndValidatePlannerDecision - FINAL without finalAnswer throws", () => {
  const raw = JSON.stringify({ route: "FINAL", finalAnswer: "" });
  assert.throws(
    () => parseAndValidatePlannerDecision(raw, { model: "test-model" }),
    (err) => err instanceof SchemaValidationError
  );
});

// =============================================================================
// Context Pruner Tests
// =============================================================================

test("ContextPruner.pruneForPlanner - keeps system messages", () => {
  const messages = [
    { role: "system", content: "You are a helpful assistant" },
    { role: "user", content: "Hello" },
    { role: "assistant", content: "Hi there!" },
  ];
  const result = ContextPruner.pruneForPlanner(messages, { maxRecentToolResults: 1 });
  assert.equal(result.length, 3);
  assert.equal(result[0].role, "system");
});

test("ContextPruner.pruneForPlanner - limits tool result pairs", () => {
  const messages = [
    { role: "system", content: "System" },
    { role: "user", content: "Question" },
    { role: "assistant", content: [{ type: "tool_use", id: "t1", name: "tool", input: {} }] },
    { role: "tool", tool_call_id: "t1", content: "Result 1" },
    { role: "assistant", content: [{ type: "tool_use", id: "t2", name: "tool", input: {} }] },
    { role: "tool", tool_call_id: "t2", content: "Result 2" },
    { role: "assistant", content: [{ type: "tool_use", id: "t3", name: "tool", input: {} }] },
    { role: "tool", tool_call_id: "t3", content: "Result 3" },
    { role: "assistant", content: [{ type: "tool_use", id: "t4", name: "tool", input: {} }] },
    { role: "tool", tool_call_id: "t4", content: "Result 4" },
  ];
  const result = ContextPruner.pruneForPlanner(messages, {
    maxRecentToolResults: 2,
    maxRecentUserTurns: 1,
  });
  // The new logic preserves system messages and keeps tool call groups intact
  assert.ok(result.length >= 4); // At least system + some messages
  assert.equal(result[0].role, "system");
  // Should have 2 tool messages (2 pairs kept)
  const toolCount = result.filter((m) => m.role === "tool").length;
  assert.equal(toolCount, 2);
  // Should be the last 2 results (t3, t4)
  const toolMsgs = result.filter((m) => m.role === "tool");
  assert.equal(toolMsgs[0].tool_call_id, "t3");
  assert.equal(toolMsgs[1].tool_call_id, "t4");
});

test("ContextPruner.pruneForPlanner - truncates long tool outputs", () => {
  const longContent = "x".repeat(3000);
  const messages = [
    { role: "user", content: "Question" },
    { role: "assistant", content: [{ type: "tool_use", id: "t1", name: "tool", input: {} }] },
    { role: "tool", content: longContent },
  ];
  const result = ContextPruner.pruneForPlanner(messages, {
    maxRecentToolResults: 1,
    maxToolOutputLength: 100,
  });
  const toolMsg = result.find((m) => m.role === "tool");
  assert.ok(toolMsg);
  assert.ok((toolMsg.content as string).length <= 116); // 100 + "...[TRUNCATED]...".length
  assert.ok((toolMsg.content as string).includes("[TRUNCATED]"));
});

test("ContextPruner.pruneForPlanner - preserves user prompt", () => {
  const messages = [
    { role: "system", content: "System" },
    { role: "user", content: "Important user question" },
    { role: "assistant", content: [{ type: "tool_use", id: "t1", name: "tool", input: {} }] },
    { role: "tool", content: "Result" },
  ];
  const result = ContextPruner.pruneForPlanner(messages, { preserveUserPrompt: true });
  const userMsg = result.find((m) => m.role === "user");
  assert.ok(userMsg);
  assert.equal(userMsg.content, "Important user question");
});

test("ContextPruner.pruneInputArray - limits function call pairs", () => {
  const input = [
    { role: "user", content: "Question" },
    { type: "function_call", call_id: "c1", name: "tool", arguments: "{}" },
    { type: "function_call_output", call_id: "c1", output: "Result 1" },
    { type: "function_call", call_id: "c2", name: "tool", arguments: "{}" },
    { type: "function_call_output", call_id: "c2", output: "Result 2" },
    { type: "function_call", call_id: "c3", name: "tool", arguments: "{}" },
    { type: "function_call_output", call_id: "c3", output: "Result 3" },
  ];
  const result = ContextPruner.pruneInputArray(input, { maxRecentToolResults: 1 });
  // Should keep user + last pair = 3 items
  assert.equal(result.length, 3);
  assert.equal(result[0].role, "user");
  assert.equal(result[1].type, "function_call");
  assert.equal(result[2].type, "function_call_output");
});

test("ContextPruner.pruneBody - prunes all message formats", () => {
  const body = {
    messages: [
      { role: "system", content: "System" },
      { role: "user", content: "Question" },
      { role: "assistant", tool_calls: [{ id: "t1", name: "tool", arguments: "{}" }] },
      { role: "tool", tool_call_id: "t1", content: "Result 1" },
      { role: "assistant", tool_calls: [{ id: "t2", name: "tool", arguments: "{}" }] },
      { role: "tool", tool_call_id: "t2", content: "Result 2" },
    ],
    input: [
      { role: "user", content: "Question" },
      { type: "function_call", call_id: "c1", name: "tool", arguments: "{}" },
      { type: "function_call_output", call_id: "c1", output: "Result 1" },
      { type: "function_call", call_id: "c2", name: "tool", arguments: "{}" },
      { type: "function_call_output", call_id: "c2", output: "Result 2" },
    ],
    contents: [
      { role: "user", parts: [{ text: "Question" }] },
      { role: "model", parts: [{ functionCall: { name: "tool", args: {} } }] },
      { role: "user", parts: [{ functionResponse: { name: "tool", response: { result: "1" } } }] },
      { role: "model", parts: [{ functionCall: { name: "tool", args: {} } }] },
      { role: "user", parts: [{ functionResponse: { name: "tool", response: { result: "2" } } }] },
    ],
  };
  const result = ContextPruner.pruneBody(body, { maxRecentToolResults: 1, maxRecentUserTurns: 1 });
  // The new logic preserves system messages and keeps tool call groups intact
  // messages: keeps system + 1 tool pair (4 items with system) or just the pair
  assert.ok(result.messages.length >= 2);
  // Should have 1 tool message (1 pair kept)
  const toolCount = result.messages.filter((m) => m.role === "tool").length;
  assert.equal(toolCount, 1);
  // input: keeps 1 pair (3 items)
  assert.ok(result.input.length >= 3);
  // contents: keeps 1 pair (3 items)
  assert.ok(result.contents.length >= 3);
});

// =============================================================================
// Structured Error Tests
// =============================================================================

test("OmniRouteBaseError - basic properties", () => {
  const err = new ProviderExecutionError("Upstream failed", 503, { model: "test" });
  assert.equal(err.severity, "RETRYABLE");
  assert.equal(err.code, "PROVIDER_HTTP_503");
  assert.ok(err.timestamp > 0);
  assert.ok(err.context.model === "test");
});

test("ProviderExecutionError - retryable for 429/502/503/504", () => {
  for (const status of [429, 502, 503, 504]) {
    const err = new ProviderExecutionError("Failed", status);
    assert.equal(err.severity, "RETRYABLE", `Status ${status} should be RETRYABLE`);
    assert.ok(err.isRetryable());
  }
});

test("ProviderExecutionError - fatal for other status codes", () => {
  for (const status of [400, 401, 403, 500, 501]) {
    const err = new ProviderExecutionError("Failed", status);
    assert.equal(err.severity, "FATAL", `Status ${status} should be FATAL`);
    assert.ok(err.isFatal());
  }
});

test("SchemaValidationError - RETRYABLE severity", () => {
  const err = new SchemaValidationError("Invalid schema");
  assert.equal(err.severity, "RETRYABLE");
  assert.ok(err.isRetryable());
});

test("AgentBudgetExceededError - FATAL severity", () => {
  const err = new AgentBudgetExceededError("Budget exceeded");
  assert.equal(err.severity, "FATAL");
  assert.ok(err.isFatal());
});

test("ClientCancellationError - FATAL severity", () => {
  const err = new ClientCancellationError("Client disconnected");
  assert.equal(err.severity, "FATAL");
  assert.ok(err.isFatal());
});

test("OmniRouteBaseError - toJSON serialization", () => {
  const err = new ProviderExecutionError("Test error", 503, { traceId: "abc123" });
  const json = err.toJSON();
  assert.equal(json.name, "ProviderExecutionError");
  assert.equal(json.message, "Test error");
  assert.equal(json.code, "PROVIDER_HTTP_503");
  assert.equal(json.severity, "RETRYABLE");
  assert.equal(json.context.traceId, "abc123");
  assert.ok(json.timestamp);
  assert.ok(typeof json.stack === "string");
});

test("toOmniRouteError - wraps unknown errors", () => {
  const err = toOmniRouteError("string error", { model: "test" });
  assert.ok(err instanceof ProviderExecutionError);
  assert.equal(err.context.model, "test");
});

test("toOmniRouteError - passes through OmniRouteBaseError", () => {
  const original = new SchemaValidationError("Original");
  const result = toOmniRouteError(original, { extra: "context" });
  assert.strictEqual(result, original);
});

test("toOmniRouteError - wraps AbortError as ClientCancellationError", () => {
  const abortErr = new DOMException("Aborted", "AbortError");
  const result = toOmniRouteError(abortErr);
  assert.ok(result instanceof ClientCancellationError);
});

// =============================================================================
// Panel Buffer Limit Tests
// =============================================================================

test("truncateText - no truncation when under limit", () => {
  const text = "short text";
  assert.equal(truncateText(text, 100), "short text");
});

test("truncateText - truncates with marker when over limit", () => {
  const text = "x".repeat(200);
  const result = truncateText(text, 100);
  assert.ok(result.length <= 120); // 100 + marker
  assert.ok(result.includes("[TRUNCATED]"));
});

test("enforcePanelBufferLimits - no change when under budget", () => {
  const answers = [
    { model: "m1", text: "a".repeat(1000) },
    { model: "m2", text: "b".repeat(1000) },
  ];
  const result = enforcePanelBufferLimits(answers, 10000, 5000);
  assert.equal(result.length, 2);
  assert.equal(result[0].text.length, 1000);
});

test("enforcePanelBufferLimits - truncates individual responses", () => {
  const answers = [
    { model: "m1", text: "a".repeat(100000) }, // Over maxResponseChars
    { model: "m2", text: "b".repeat(1000) },
  ];
  const result = enforcePanelBufferLimits(answers, 500000, 50000);
  assert.equal(result.length, 2);
  assert.ok(result[0].text.length <= 50020);
  assert.ok(result[0].text.includes("[TRUNCATED]"));
});

test("enforcePanelBufferLimits - drops oldest when total exceeds budget", () => {
  const answers = [
    { model: "m1", text: "a".repeat(100000) },
    { model: "m2", text: "b".repeat(100000) },
    { model: "m3", text: "c".repeat(100000) },
    { model: "m4", text: "d".repeat(100000) },
  ];
  const result = enforcePanelBufferLimits(answers, 150000, 50000);
  // Each response truncated to 50000, so we can fit at most 3 in 150000 budget
  // But we drop oldest first, so we keep newest 3 (m2, m3, m4) = 150000 total
  assert.ok(result.length >= 1 && result.length <= 3);
  const totalChars = result.reduce((s, a) => s + a.text.length, 0);
  // Allow some tolerance for truncation markers
  assert.ok(totalChars <= 151000);
});
