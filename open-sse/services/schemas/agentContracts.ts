import { z } from "zod";
import { SchemaValidationError } from "../../utils/agentErrors.ts";

const ToolCallSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  arguments: z.union([z.string(), z.record(z.string(), z.unknown())]).transform((val) => {
    if (typeof val === "string") {
      try {
        return JSON.parse(val);
      } catch {
        return {};
      }
    }
    return val;
  }),
});

const PlannerDecisionToolsSchema = z.object({
  route: z.literal("TOOLS"),
  toolCalls: z.array(ToolCallSchema).min(1, "At least one tool call required when route is TOOLS"),
});

const PlannerDecisionFinalSchema = z.object({
  route: z.literal("FINAL"),
  finalAnswer: z.string().min(1, "finalAnswer must not be empty when route is FINAL"),
});

export const PlannerDecisionSchema = z.union([
  PlannerDecisionToolsSchema,
  PlannerDecisionFinalSchema,
]);

export type PlannerDecision = z.infer<typeof PlannerDecisionSchema>;

export interface ParsePlannerDecisionOptions {
  model?: string;
  traceId?: string;
}

export function parseAndValidatePlannerDecision(
  rawText: string,
  options: ParsePlannerDecisionOptions = {}
): PlannerDecision {
  const { model, traceId } = options;
  const context = { model, traceId, rawText: rawText.slice(0, 500) };

  const trimmed = rawText.trim();
  if (!trimmed) {
    throw new SchemaValidationError("Planner returned empty response", context);
  }

  let parsed: unknown;

  // Try to extract JSON from markdown code blocks - scan ALL blocks, try from last to first
  // (last block is often the final decision/action)
  const codeBlocks = Array.from(trimmed.matchAll(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/gi));
  if (codeBlocks.length > 0) {
    // Try from last block backwards (most recent decision)
    for (let i = codeBlocks.length - 1; i >= 0; i--) {
      try {
        parsed = JSON.parse(codeBlocks[i][1]);
        break;
      } catch {
        // Try next block
      }
    }
  }

  // Try direct JSON parse if no markdown block or parse failed
  if (!parsed) {
    try {
      parsed = JSON.parse(trimmed);
    } catch {
      // Fall through to legacy text format parsing
    }
  }

  // Legacy text format fallback: OMNIROUTE_ROUTE: TOOLS|FINAL (must be at start of line)
  if (!parsed) {
    // Use multiline mode (^) to only match at start of line
    const routeMatch = trimmed.match(/^OMNIROUTE_ROUTE:\s*(TOOLS|FINAL)\b\s*([\s\S]*)$/im);
    if (routeMatch) {
      const route = routeMatch[1].toUpperCase();
      const content = routeMatch[2].trim();

      if (route === "TOOLS") {
        // Try to parse tool calls from the content
        let toolCalls: Array<{ id: string; name: string; arguments: Record<string, unknown> }> = [];

        // Try to find JSON tool calls in content
        const toolCallsMatch = content.match(/\[[\s\S]*\]/);
        if (toolCallsMatch) {
          try {
            const parsedCalls = JSON.parse(toolCallsMatch[0]);
            if (Array.isArray(parsedCalls)) {
              toolCalls = parsedCalls.map((tc, i) => ({
                id: tc.id || `call_${Date.now()}_${i}`,
                name: tc.name || tc.function?.name || `tool_${i}`,
                arguments:
                  typeof tc.arguments === "string"
                    ? JSON.parse(tc.arguments)
                    : tc.arguments || tc.function?.arguments || {},
              }));
            }
          } catch {
            // If parsing fails, create a single generic tool call
            toolCalls = [
              {
                id: `call_${Date.now()}`,
                name: "execute_task",
                arguments: { instruction: content },
              },
            ];
          }
        } else {
          // No structured tool calls found, create generic one
          toolCalls = [
            {
              id: `call_${Date.now()}`,
              name: "execute_task",
              arguments: { instruction: content },
            },
          ];
        }

        const result = PlannerDecisionSchema.safeParse({ route: "TOOLS", toolCalls });
        if (result.success) {
          return result.data;
        }
        throw new SchemaValidationError(
          `Legacy TOOLS format produced invalid toolCalls: ${result.error.message}`,
          context
        );
      }

      if (route === "FINAL") {
        const result = PlannerDecisionSchema.safeParse({ route: "FINAL", finalAnswer: content });
        if (result.success) {
          return result.data;
        }
        throw new SchemaValidationError(
          `Legacy FINAL format invalid: ${result.error.message}`,
          context
        );
      }
    }
  }

  // Final validation with Zod schema
  if (parsed) {
    const result = PlannerDecisionSchema.safeParse(parsed);
    if (result.success) {
      return result.data;
    }
    throw new SchemaValidationError(
      `Planner decision schema validation failed: ${result.error.message}`,
      context
    );
  }

  throw new SchemaValidationError(
    "Planner response could not be parsed as JSON, markdown JSON, or legacy OMNIROUTE_ROUTE format",
    context
  );
}
