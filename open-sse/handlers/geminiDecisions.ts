import { getAccessToken, parseSAFromApiKey } from "../executors/vertex.ts";
import { z } from "zod";
import { CORS_HEADERS } from "../utils/cors.ts";
import { errorResponse } from "../utils/error.ts";
import { buildSanitizedUpstreamErrorResponse } from "../utils/upstreamErrorResponse.ts";

export const geminiDecisionSchema = z
  .object({
    model: z.enum(["gemini-decision-1", "gemini/gemini-decision-1", "vertex/gemini-decision-1"]),
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
    return errorResponse(401, "An active Google provider connection is required.");
  }
  try {
    let url = "https://generativelanguage.googleapis.com/v1beta/decisions";
    const headers = new Headers({ "Content-Type": "application/json" });
    if (body.model.startsWith("vertex/")) {
      const account = parseSAFromApiKey(credentials.apiKey);
      if (typeof account.project_id !== "string" || !/^[a-zA-Z0-9.-]+$/.test(account.project_id)) {
        return errorResponse(400, "Vertex Decisions requires a project-scoped service account.");
      }
      url = `https://aiplatform.googleapis.com/v1beta1/projects/${account.project_id}/locations/global/decisions`;
      headers.set("Authorization", `Bearer ${await getAccessToken(account)}`);
    } else {
      headers.set("x-goog-api-key", credentials.apiKey);
    }
    const response = await send(url, {
      method: "POST",
      redirect: "error",
      signal,
      headers,
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
