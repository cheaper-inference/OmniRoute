import { z } from "zod";
import { CORS_HEADERS } from "../utils/cors.ts";
import { errorResponse } from "../utils/error.ts";
import { buildSanitizedUpstreamErrorResponse } from "../utils/upstreamErrorResponse.ts";

export const geminiDecisionSchema = z
  .object({
    model: z.enum(["gemini-decision-1", "gemini/gemini-decision-1"]),
    input: z.union([
      z.string(),
      z.record(z.string(), z.unknown()),
      z.array(z.record(z.string(), z.unknown())).min(1),
    ]),
    questions: z
      .record(
        z.string().min(1),
        z.object({ type: z.enum(["noul", "choice", "score"]) }).passthrough()
      )
      .refine(
        (questions) => Object.keys(questions).length > 0 && Object.keys(questions).length <= 1000
      ),
  })
  .passthrough();

export async function handleGeminiDecisions(
  body: z.infer<typeof geminiDecisionSchema>,
  credentials: object,
  signal: AbortSignal,
  send: typeof fetch = fetch
): Promise<Response> {
  if (!("apiKey" in credentials) || typeof credentials.apiKey !== "string" || !credentials.apiKey) {
    return errorResponse(401, "A Gemini Developer API key is required.");
  }
  try {
    const response = await send("https://generativelanguage.googleapis.com/v1beta/decisions", {
      method: "POST",
      redirect: "error",
      signal,
      headers: {
        "x-goog-api-key": credentials.apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...body, model: "gemini-decision-1" }),
    });
    if (!response.ok) {
      return buildSanitizedUpstreamErrorResponse({
        status: response.status,
        rawBody: await response.text(),
        fallbackMessage: "Gemini rejected the decision request.",
        headers: CORS_HEADERS,
      });
    }
    return Response.json(await response.json(), { status: response.status, headers: CORS_HEADERS });
  } catch {
    return errorResponse(signal.aborted ? 499 : 502, "Gemini decision request interrupted.");
  }
}
