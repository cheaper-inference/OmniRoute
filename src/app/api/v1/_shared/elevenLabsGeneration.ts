import type { z } from "zod";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";
import { CORS_HEADERS } from "@/shared/utils/cors";
import { proxyElevenLabsRequest } from "./elevenLabsProxy";

function invalidBody(message: string): Response {
  return Response.json(buildErrorBody(400, message), { status: 400, headers: CORS_HEADERS });
}

/** Validate native JSON without buffering the upstream audio or multipart response. */
export async function proxyElevenLabsGeneration(
  request: Request,
  pathname: string,
  schema: z.ZodType<Record<string, unknown>>,
  defaultModel: string
): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return invalidBody("Invalid JSON body");
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return invalidBody(`Invalid ElevenLabs request: ${issue.path.join(".")}: ${issue.message}`);
  }
  const model = typeof parsed.data.model_id === "string" ? parsed.data.model_id : defaultModel;
  return proxyElevenLabsRequest(
    request,
    pathname,
    { method: "POST", body: JSON.stringify(parsed.data) },
    { model: `elevenlabs/${model}`, contentType: "application/json" }
  );
}
