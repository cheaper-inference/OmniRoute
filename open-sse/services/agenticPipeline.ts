/**
 * Agentic pipeline mode for planner/executor model pairs.
 *
 * The first model owns reasoning and final answers. The second model receives the
 * client's native tools and turns an explicit planner decision into native tool calls.
 * Every client-returned tool result goes back through the planner before another
 * executor turn, so the planner remains in control of sequential workflows while the
 * executor may still emit multiple independent tool calls in parallel.
 */
import { errorResponse } from "../utils/error.ts";
import type { ComboLogger, HandleSingleModel, ResolvedComboTarget } from "./combo/types.ts";
import { extractPanelText, isToolBearingRequest } from "./fusion.ts";
import { prependSystemInstruction, type PipelineStep } from "./pipeline.ts";
import { parseAndValidatePlannerDecision, type PlannerDecision } from "./schemas/agentContracts.ts";
import { ContextPruner } from "./contextPruner.ts";
import { SchemaValidationError, toOmniRouteError } from "../utils/agentErrors.ts";

/** Represents a single tool call extracted from the planner's decision */
export interface PlannerToolCall {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
}

/** Result of tool execution with actual output from the executor */
export interface ToolExecutionResult {
  toolCallId: string;
  name: string;
  output: unknown;
  isError: boolean;
  durationMs: number;
}

type Body = Record<string, unknown>;

export type AgenticOrchestrationConfig = {
  enabled?: boolean;
  maxToolRounds?: number;
};

export type HandleAgenticPipelineOptions = {
  body: Body;
  steps: PipelineStep[];
  handleSingleModel: HandleSingleModel;
  log: ComboLogger;
  comboName?: string;
  config?: AgenticOrchestrationConfig | null;
};

const DEFAULT_MAX_TOOL_ROUNDS = 8;
const HARD_MAX_TOOL_ROUNDS = 16; // Absolute safety cap

function stepModel(step: PipelineStep): string {
  return "target" in step ? step.target.modelStr : step.model;
}

function stepTarget(step: PipelineStep): ResolvedComboTarget | undefined {
  return "target" in step ? step.target : undefined;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function contentHasType(content: unknown, types: ReadonlySet<string>): boolean {
  if (!Array.isArray(content)) return false;
  return content.some((part) => {
    const record = asRecord(part);
    return record && typeof record.type === "string" && types.has(record.type);
  });
}

function geminiPartsHaveFunctionResponse(content: unknown): boolean {
  if (!Array.isArray(content)) return false;
  return content.some((part) => {
    const record = asRecord(part);
    return Boolean(record?.functionResponse || record?.function_response);
  });
}

/** Detect only the trailing native tool-result turn, never historical tool use. */
export function hasTrailingToolResult(body: Body): boolean {
  const messages = Array.isArray(body.messages) ? body.messages : null;
  if (messages?.length) {
    const last = asRecord(messages[messages.length - 1]);
    if (last?.role === "tool") return true;
    if (
      contentHasType(
        last?.content,
        new Set(["tool_result", "function_call_output", "computer_call_output"])
      )
    ) {
      return true;
    }
  }

  const input = Array.isArray(body.input) ? body.input : null;
  if (input?.length) {
    const last = asRecord(input[input.length - 1]);
    if (
      typeof last?.type === "string" &&
      new Set(["function_call_output", "computer_call_output", "local_shell_call_output"]).has(
        last.type
      )
    ) {
      return true;
    }
    if (contentHasType(last?.content, new Set(["tool_result", "function_call_output"]))) {
      return true;
    }
  }

  const contents = Array.isArray(body.contents) ? body.contents : null;
  if (contents?.length) {
    const last = asRecord(contents[contents.length - 1]);
    if (geminiPartsHaveFunctionResponse(last?.parts)) return true;
  }
  return false;
}

/** Count completed tool-result turns to bound client-driven sequential loops.
 *  A "turn" is defined as a planner→executor round that produced tool results.
 *  We count by finding assistant messages with tool_calls (or tool_use in content)
 *  followed by tool results. */
export function countToolResultTurns(body: Body): number {
  const messages = Array.isArray(body.messages) ? body.messages : [];
  let turns = 0;

  // Scan messages for assistant+tool_calls followed by tool results
  for (let i = 0; i < messages.length - 1; i++) {
    const curr = asRecord(messages[i]);
    const next = asRecord(messages[i + 1]);

    // Check if current is assistant with tool calls (either tool_calls property or tool_use in content)
    const hasToolCallsInProperty =
      Array.isArray((curr as Record<string, unknown>).tool_calls) &&
      ((curr as Record<string, unknown>).tool_calls as unknown[]).length > 0;
    const hasToolUseInContent = contentHasType(
      (curr as Record<string, unknown>).content,
      new Set(["tool_use", "function_call"])
    );
    const hasToolCalls =
      curr?.role === "assistant" && (hasToolCallsInProperty || hasToolUseInContent);

    // Check if next is tool result
    const isToolResult =
      next?.role === "tool" ||
      contentHasType(
        next?.content,
        new Set(["tool_result", "function_call_output", "computer_call_output"])
      );

    if (hasToolCalls && isToolResult) {
      turns++;
    }
  }

  // Also count input array format (OpenAI Responses API)
  const input = Array.isArray(body.input) ? body.input : [];
  for (let i = 0; i < input.length - 1; i++) {
    const curr = asRecord(input[i]);
    const next = asRecord(input[i + 1]);

    const hasFunctionCall =
      curr?.type === "function_call" ||
      (Array.isArray((curr as Record<string, unknown>).tool_calls) &&
        ((curr as Record<string, unknown>).tool_calls as unknown[]).length > 0);
    const isFunctionCallOutput =
      next?.type === "function_call_output" ||
      next?.type === "computer_call_output" ||
      next?.type === "local_shell_call_output";

    if (hasFunctionCall && isFunctionCallOutput) {
      turns++;
    }
  }

  // Gemini contents format
  const contents = Array.isArray(body.contents) ? body.contents : [];
  for (let i = 0; i < contents.length - 1; i++) {
    const curr = asRecord(contents[i]);
    const next = asRecord(contents[i + 1]);

    const hasFunctionCall =
      curr?.type === "function_call" || contentHasType(curr?.parts, new Set(["function_call"]));
    const hasFunctionResponse = geminiPartsHaveFunctionResponse(next?.parts);

    if (hasFunctionCall && hasFunctionResponse) {
      turns++;
    }
  }

  return turns;
}

function availableToolsPrompt(body: Body): string {
  const tools = body.tools;
  if (!Array.isArray(tools) || tools.length === 0) return "No native tools are available.";
  return [
    "Available native tools (reference only; do not call them in this planning pass):",
    JSON.stringify(tools),
  ].join("\n");
}

function withoutTools(body: Body, preserveStreaming: boolean): Body {
  const {
    tools: _tools,
    tool_choice: _toolChoice,
    parallel_tool_calls: _parallelToolCalls,
    ...rest
  } = body;
  void _tools;
  void _toolChoice;
  void _parallelToolCalls;
  return preserveStreaming ? rest : { ...rest, stream: false };
}

function plannerDecisionPrompt(continuation: boolean, maxRoundsReached: boolean): string {
  const state = continuation
    ? "The client has returned one or more native tool results. Review them before deciding the next action."
    : "This is a fresh client turn. Decide whether tools are required before answering.";
  const limit = maxRoundsReached
    ? "The configured tool-round limit has been reached. You MUST choose FINAL and provide the best answer possible from the available evidence."
    : "Choose TOOLS only when another tool call is necessary; otherwise choose FINAL.";
  return [
    "You are the planning and final-answer model in a two-model agentic workflow.",
    state,
    limit,
    "Return a JSON object with the following schema:",
    JSON.stringify(
      {
        route: "TOOLS|FINAL",
        toolCalls: "[{ id, name, arguments }] (required if route=TOOLS)",
        finalAnswer: "string (required if route=FINAL)",
      },
      null,
      2
    ),
    "Do not emit native tool calls in this internal planning pass.",
  ].join("\n");
}

function executorPrompt(plan: string): string {
  return [
    "Act as the tool-call executor for this turn.",
    "Use the client's native tools to carry out the plan below. Emit all independent tool calls in parallel when possible.",
    "Do not replace a required tool call with prose. For dependent work, emit only the currently executable calls; their results will be reviewed before the next round.",
    "",
    "Tool execution plan:",
    plan,
  ].join("\n");
}

function finalPrompt(draft: string): string {
  return [
    "Produce the final answer to the user's request now.",
    "Do not call tools. Use the full conversation and returned tool results as evidence.",
    "Do not mention routing, orchestration, or this instruction.",
    draft ? `Planning draft:\n${draft}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
}

async function dispatchExecutors(
  body: Body,
  executors: PipelineStep[],
  plan: string,
  handleSingleModel: HandleSingleModel,
  log: ComboLogger
): Promise<Response> {
  let lastFailure = errorResponse(502, "All configured agentic tool executors failed");
  for (const executor of executors) {
    const model = stepModel(executor);
    const request = prependSystemInstruction(
      structuredClone(body),
      [executor.prompt, executorPrompt(plan)].filter(Boolean).join("\n\n")
    );
    log.info("AGENTIC_PIPELINE", `Routing client-facing tool turn to ${model}`);
    try {
      const response = await handleSingleModel(request, model, stepTarget(executor));
      if (response.ok) return response;
      lastFailure = response;
      log.warn("AGENTIC_PIPELINE", `Tool executor ${model} failed with ${response.status}`);
      // Only discard a failed body when another executor remains. Never retry SSE
      // after a successful response starts; preserve the final failure intact.
      if (executor !== executors.at(-1)) await response.body?.cancel().catch(() => undefined);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") throw error;
      log.warn("AGENTIC_PIPELINE", `Tool executor ${model} failed before responding`);
      lastFailure = errorResponse(502, "All configured agentic tool executors failed");
    }
  }
  return lastFailure;
}

async function executeFinalStep(
  body: Body,
  planner: PipelineStep,
  plannerModel: string,
  handleSingleModel: HandleSingleModel,
  log: ComboLogger
): Promise<Response> {
  const finalBody = prependSystemInstruction(
    withoutTools(body, true),
    [planner.prompt, finalPrompt("")].filter(Boolean).join("\n\n")
  );
  log.info("AGENTIC_PIPELINE", `Routing client-facing final turn to ${plannerModel}`);
  return handleSingleModel(finalBody, plannerModel, stepTarget(planner));
}

export async function handleAgenticPipelineChat({
  body,
  steps,
  handleSingleModel,
  log,
  comboName,
  config,
}: HandleAgenticPipelineOptions): Promise<Response> {
  const chain = steps.filter((step) => Boolean(step && stepModel(step)));
  if (chain.length < 2) {
    return errorResponse(400, "Agentic pipeline requires a planner and at least one tool executor");
  }

  const planner = chain[0];
  const executors = chain.slice(1);
  const plannerModel = stepModel(planner);
  const executorModels = executors.map(stepModel);

  // Hard cap on tool rounds - cannot be exceeded by any configuration
  const maxToolRounds = Math.min(
    Math.max(config?.maxToolRounds ?? DEFAULT_MAX_TOOL_ROUNDS, 1),
    HARD_MAX_TOOL_ROUNDS
  );

  let currentBody = structuredClone(body);
  let currentRound = 0;

  while (currentRound <= maxToolRounds) {
    const currentToolTurns = countToolResultTurns(currentBody);
    const maxRoundsReached = currentToolTurns >= maxToolRounds;
    const continuation = hasTrailingToolResult(currentBody);

    log.info(
      "AGENTIC_PIPELINE",
      `Combo "${comboName ?? ""}" | planner=${plannerModel} executors=${executorModels.join(",")} round=${currentRound}/${maxToolRounds} toolTurns=${currentToolTurns} continuation=${continuation}`
    );

    // Without client tools there is nothing for the executor to do. The planner owns
    // the response directly and preserves the client's stream preference.
    if (!isToolBearingRequest(currentBody)) {
      return handleSingleModel(
        prependSystemInstruction(currentBody, planner.prompt),
        plannerModel,
        stepTarget(planner)
      );
    }

    // On the final round (either maxRoundsReached or planner decides FINAL),
    // the planner generates the final answer directly, not a decision.
    const isFinalRound = maxRoundsReached;

    const plannerInstruction = isFinalRound
      ? [planner.prompt, finalPrompt("")].filter(Boolean).join("\n\n")
      : [
          planner.prompt,
          plannerDecisionPrompt(continuation, maxRoundsReached),
          availableToolsPrompt(currentBody),
        ].join("\n\n");

    // Prune context for planner to prevent token bloat
    const prunedBody = ContextPruner.pruneBody(currentBody, {
      maxRecentToolResults: 3,
      maxToolOutputLength: 2000,
    });

    // Strip tools from the pruned body for planner decision
    const decisionBody = prependSystemInstruction(
      withoutTools(prunedBody, false),
      plannerInstruction
    );

    const decisionResponse = await handleSingleModel(
      decisionBody,
      plannerModel,
      stepTarget(planner)
    );
    if (!decisionResponse.ok) return decisionResponse;

    let decisionText = "";
    try {
      decisionText = extractPanelText(await decisionResponse.clone().json());
    } catch {
      return errorResponse(
        502,
        `Agentic planner (${plannerModel}) returned an unparseable response`
      );
    }
    if (!decisionText.trim()) {
      return errorResponse(502, `Agentic planner (${plannerModel}) returned an empty decision`);
    }

    // If this is the final round, the planner's response IS the final answer
    if (isFinalRound) {
      log.info(
        "AGENTIC_PIPELINE",
        `Finalizing response after ${currentToolTurns} tool rounds (max rounds reached).`
      );
      // Preserve the original stream preference from the request
      const originalStream = body.stream === true;
      if (originalStream && decisionResponse.body) {
        return new Response(decisionResponse.body, {
          status: decisionResponse.status,
          statusText: decisionResponse.statusText,
          headers: decisionResponse.headers,
        });
      }
      return decisionResponse;
    }

    // Parse and validate planner decision using Zod schema
    let decision: PlannerDecision;
    try {
      decision = parseAndValidatePlannerDecision(decisionText, {
        model: plannerModel,
        traceId: comboName,
      });
    } catch (error) {
      const omniError = toOmniRouteError(error, { model: plannerModel, traceId: comboName });
      if (omniError instanceof SchemaValidationError) {
        log.warn(
          "AGENTIC_PIPELINE",
          `Planner schema validation failed: ${omniError.message}, falling back to safe FINAL`
        );
        return await executeFinalStep(currentBody, planner, plannerModel, handleSingleModel, log);
      }
      throw error;
    }

    // If planner decides FINAL, generate final response
    if (decision.route === "FINAL") {
      log.info(
        "AGENTIC_PIPELINE",
        `Finalizing response after ${currentToolTurns} tool rounds (planner chose FINAL).`
      );
      return await executeFinalStep(currentBody, planner, plannerModel, handleSingleModel, log);
    }

    // Planner wants TOOLS - execute them
    if (decision.route === "TOOLS") {
      log.info("AGENTIC_PIPELINE", `Executing tool turn ${currentToolTurns + 1}/${maxToolRounds}`);

      // Convert structured toolCalls for executor plan
      const toolCalls = formatToolCallsForExecutor(decision);
      const toolPlan = toolCalls
        .map((tc) => `${tc.name}(${JSON.stringify(tc.arguments)})`)
        .join("\n");

      const executionResult = await dispatchExecutors(
        currentBody,
        executors,
        toolPlan,
        handleSingleModel,
        log
      );

      if (!executionResult.ok) {
        log.warn(
          "AGENTIC_PIPELINE",
          "Tool execution failed; falling back to final synthesis with available context."
        );
        return await executeFinalStep(currentBody, planner, plannerModel, handleSingleModel, log);
      }

      // Append tool results to body for next planning round
      currentBody = await appendToolResultsToBody(currentBody, executionResult, toolCalls, log);
      currentRound++;
    }
  }

  // Should not reach here due to while condition, but safety fallback
  log.warn(
    "AGENTIC_PIPELINE",
    `Exceeded max tool rounds (${maxToolRounds}); forcing final response`
  );
  return await executeFinalStep(currentBody, planner, plannerModel, handleSingleModel, log);
}

/**
 * Extracts tool calls from the planner decision and formats them for the executor body
 */
function formatToolCallsForExecutor(decision: PlannerDecision): PlannerToolCall[] {
  if (decision.route !== "TOOLS") return [];
  return decision.toolCalls.map((tc) => ({
    id: tc.id,
    name: tc.name,
    arguments: (tc.arguments as Record<string, unknown>) ?? {},
  }));
}

interface OpenAIToolCallItem {
  id?: string;
  type?: string;
  function?: {
    name?: string;
    arguments?: string;
  };
}

interface AnthropicToolUseItem {
  id?: string;
  type?: string;
  name?: string;
  input?: unknown;
}

interface GeminiFunctionCallPart {
  functionCall?: {
    name?: string;
    id?: string;
    args?: unknown;
  };
}

/**
 * Extracts actual tool execution results from the executor response
 * and formats them as proper tool result messages for the next planning round.
 *
 * This replaces the old mock implementation that just appended "tool execution completed".
 */
async function extractAndFormatToolResults(
  executorResponse: Response,
  toolCalls: PlannerToolCall[],
  log: ComboLogger
): Promise<{ success: boolean; toolResults: ToolExecutionResult[]; rawText: string }> {
  let rawBody: Record<string, unknown> | null = null;
  let rawText = "";

  try {
    rawBody = (await executorResponse.clone().json()) as Record<string, unknown>;
    rawText = extractPanelText(rawBody) ?? JSON.stringify(rawBody);
  } catch (err: unknown) {
    log?.error?.("AGENTIC_PIPELINE", "Failed to parse tool executor JSON output", err);
    // Return structured error results for each tool call so planner knows execution failed
    const toolResults: ToolExecutionResult[] = toolCalls.map((tc) => ({
      toolCallId: tc.id,
      name: tc.name,
      output: {
        error: "EXECUTOR_PARSE_FAILURE",
        message: "Executor returned unparseable or non-JSON output",
      },
      isError: true,
      durationMs: 0,
    }));
    return { success: false, toolResults, rawText: "" };
  }

  // Extract tool results from various response formats
  const toolResults: ToolExecutionResult[] = [];

  // Try OpenAI format: choices[0].message.tool_calls
  const choices = Array.isArray(rawBody?.choices) ? rawBody.choices : [];
  const firstChoice = asRecord(choices[0]);
  const firstMessage = asRecord(firstChoice?.message);
  const openAIToolCalls = Array.isArray(firstMessage?.tool_calls)
    ? (firstMessage.tool_calls as OpenAIToolCallItem[])
    : null;

  // Try Anthropic format: content with type "tool_use"
  const rawContent = Array.isArray(rawBody?.content)
    ? (rawBody.content as AnthropicToolUseItem[])
    : [];
  const anthropicToolUses = rawContent.filter((c) => c?.type === "tool_use");

  // Try Gemini format: candidates[0].content.parts with functionCall
  const candidates = Array.isArray(rawBody?.candidates) ? rawBody.candidates : [];
  const firstCandidate = asRecord(candidates[0]);
  const candidateContent = asRecord(firstCandidate?.content);
  const candidateParts = Array.isArray(candidateContent?.parts)
    ? (candidateContent.parts as GeminiFunctionCallPart[])
    : [];
  const geminiFunctionCalls = candidateParts.filter((p) => p?.functionCall);

  // Try custom array format: results array
  const resultsArray = Array.isArray(rawBody?.results) ? rawBody.results : null;

  // For each planned tool call, find its result in the executor response
  for (const tc of toolCalls) {
    let output: unknown = "No output captured from executor";
    let isError = false;

    // Try to find matching result by index or name
    if (openAIToolCalls && Array.isArray(openAIToolCalls)) {
      const match = openAIToolCalls.find((c) => c?.function?.name === tc.name || c?.id === tc.id);
      if (match) {
        try {
          output = JSON.parse(match?.function?.arguments ?? "{}");
        } catch {
          output = match?.function?.arguments ?? "{}";
        }
      }
    } else if (anthropicToolUses.length > 0) {
      const match = anthropicToolUses.find((c) => c?.name === tc.name || c?.id === tc.id);
      if (match) {
        output = match?.input ?? {};
      }
    } else if (geminiFunctionCalls.length > 0) {
      const match = geminiFunctionCalls.find(
        (p) => p?.functionCall?.name === tc.name || p?.functionCall?.id === tc.id
      );
      if (match) {
        output = match?.functionCall?.args ?? {};
      }
    } else if (resultsArray && resultsArray.length > 0) {
      // Fallback: use results array by index
      const idx = toolCalls.indexOf(tc);
      if (idx < resultsArray.length) {
        output = resultsArray[idx];
      }
    } else {
      // Last resort: use the full response text
      output = rawText;
    }

    toolResults.push({
      toolCallId: tc.id,
      name: tc.name,
      output,
      isError,
      durationMs: 0, // Could be enhanced with timing from headers
    });
  }

  return { success: true, toolResults, rawText };
}

/**
 * Appends tool execution results to the conversation body for the next planning round.
 * Supports OpenAI (messages), OpenAI Responses API (input), and Gemini (contents) formats.
 */
async function appendToolResultsToBody(
  body: Body,
  executionResult: Response,
  toolCalls: PlannerToolCall[],
  log: ComboLogger
): Promise<Body> {
  const newBody = structuredClone(body);

  // Extract and format actual tool results from executor response
  const { toolResults } = await extractAndFormatToolResults(executionResult, toolCalls, log);

  if (Array.isArray(newBody.messages)) {
    // OpenAI Chat Completions format
    for (const result of toolResults) {
      // Add assistant message with tool_calls
      newBody.messages.push({
        role: "assistant",
        tool_calls: [
          {
            id: result.toolCallId,
            type: "function",
            function: {
              name: result.name,
              arguments: JSON.stringify(
                toolCalls.find((tc) => tc.id === result.toolCallId)?.arguments ?? {}
              ),
            },
          },
        ],
      });
      // Add tool result message
      newBody.messages.push({
        role: "tool",
        tool_call_id: result.toolCallId,
        content: typeof result.output === "string" ? result.output : JSON.stringify(result.output),
      });
    }
  } else if (Array.isArray(newBody.input)) {
    // OpenAI Responses API format
    for (const result of toolResults) {
      const toolCall = toolCalls.find((tc) => tc.id === result.toolCallId);
      newBody.input.push({
        type: "function_call",
        call_id: result.toolCallId,
        name: result.name,
        arguments: toolCall ? JSON.stringify(toolCall.arguments) : "{}",
      });
      newBody.input.push({
        type: "function_call_output",
        call_id: result.toolCallId,
        output: typeof result.output === "string" ? result.output : JSON.stringify(result.output),
      });
    }
  } else if (Array.isArray(newBody.contents)) {
    // Gemini format
    for (const result of toolResults) {
      const toolCall = toolCalls.find((tc) => tc.id === result.toolCallId);
      newBody.contents.push({
        role: "model",
        parts: [
          {
            functionCall: {
              name: result.name,
              args: toolCall ? toolCall.arguments : {},
            },
          },
        ],
      });
      newBody.contents.push({
        role: "user",
        parts: [
          {
            functionResponse: {
              name: result.name,
              response: { result: result.output },
            },
          },
        ],
      });
    }
  }

  return newBody;
}
