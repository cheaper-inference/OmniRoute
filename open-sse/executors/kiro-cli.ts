import { randomUUID } from "node:crypto";
import { z } from "zod";
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { KiroCliError, kiroCliTurn } from "../services/kiroCliTurn.ts";
import { buildErrorBody } from "../utils/error.ts";

const input = z.object({
  messages: z.tuple([z.object({ role: z.literal("user"), content: z.string().min(1).max(65536) })]),
  tools: z.array(z.never()).max(0).optional(),
  tool_choice: z.literal("none").optional(),
  functions: z.never().optional(),
  response_format: z.object({ type: z.literal("text") }).optional(),
});
const url = "kiro-cli://local/acp";

export class KiroCliExecutor extends BaseExecutor {
  constructor() {
    super("kiro-cli", { id: "kiro-cli", baseUrl: url });
  }

  async execute({ body, model, stream, signal }: ExecuteInput) {
    const result = (response: Response) => ({ response, url, headers: {}, transformedBody: null });
    const parsed = input.safeParse(body);
    if (!parsed.success) {
      return result(
        Response.json(buildErrorBody(400, "Kiro CLI accepts one text user message and no tools"), {
          status: 400,
        })
      );
    }
    try {
      const text = await kiroCliTurn(model, parsed.data.messages[0].content, signal);
      const meta = {
        id: `chatcmpl-${randomUUID()}`,
        model,
        created: Math.floor(Date.now() / 1000),
      };
      if (!stream)
        return result(
          Response.json({
            ...meta,
            object: "chat.completion",
            choices: [
              { index: 0, message: { role: "assistant", content: text }, finish_reason: "stop" },
            ],
          })
        );
      const chunk = (delta: Record<string, string>, finish_reason: string | null) =>
        `data: ${JSON.stringify({ ...meta, object: "chat.completion.chunk", choices: [{ index: 0, delta, finish_reason }] })}\n\n`;
      return result(
        new Response(
          chunk({ role: "assistant", content: text }, null) +
            chunk({}, "stop") +
            "data: [DONE]\n\n",
          { headers: { "Content-Type": "text/event-stream" } }
        )
      );
    } catch (err) {
      const status = err instanceof KiroCliError ? err.status : 502;
      return result(
        Response.json(
          buildErrorBody(
            status,
            err instanceof KiroCliError ? err.message : "Kiro CLI unavailable"
          ),
          { status }
        )
      );
    }
  }
}
