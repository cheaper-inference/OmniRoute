import { z } from "zod";
import { CORS_HEADERS } from "../utils/cors.ts";
import { errorResponse } from "../utils/error.ts";
import { buildSanitizedUpstreamErrorResponse } from "../utils/upstreamErrorResponse.ts";

export const openaiDecisionSchema = z
  .object({
    model: z.enum(["gpt-6-luna", "openai/gpt-6-luna"]),
    input: z.union([z.string(), z.array(z.record(z.string(), z.unknown())).min(1)]),
    questions: z
      .array(
        z
          .object({
            name: z.string().min(1),
            type: z.enum(["predicate", "choice", "score"]),
          })
          .passthrough()
      )
      .min(1)
      .max(400),
  })
  .passthrough();

export async function handleOpenAIDecisions(
  body: z.infer<typeof openaiDecisionSchema>,
  credentials: object,
  signal: AbortSignal,
  send: typeof fetch = fetch
): Promise<Response> {
  if (!("apiKey" in credentials) || typeof credentials.apiKey !== "string" || !credentials.apiKey) {
    return errorResponse(401, "An OpenAI Platform API key is required.");
  }
  try {
    const response = await send("https://api.openai.com/v1/decisions", {
      method: "POST",
      redirect: "error",
      signal,
      headers: {
        Authorization: `Bearer ${credentials.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...body, model: "gpt-6-luna" }),
    });
    if (!response.ok) {
      return buildSanitizedUpstreamErrorResponse({
        status: response.status,
        rawBody: await response.text(),
        fallbackMessage: "OpenAI rejected the decision request.",
        headers: CORS_HEADERS,
      });
    }
    return Response.json(await response.json(), { status: response.status, headers: CORS_HEADERS });
  } catch {
    return errorResponse(signal.aborted ? 499 : 502, "OpenAI decision request interrupted.");
  }
}
