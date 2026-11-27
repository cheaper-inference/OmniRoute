import { buildClientRawRequest, handleChat } from "@/sse/handlers/chat";
import { initTranslators } from "@omniroute/open-sse/translator/index.ts";
import {
  convertOpenAIResponseToGemini,
  transformOpenAISSEToGeminiSSE,
} from "@omniroute/open-sse/translator/response/openai-to-gemini-sse";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { v1betaGeminiGenerateSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { convertGeminiToInternal } from "./convertGeminiToInternal";
import { estimateGeminiCountTokens, parseGeminiModelPath } from "./geminiRouteHelpers";

let initialized = false;

/**
 * Initialize translators once
 */
async function ensureInitialized() {
  if (!initialized) {
    await initTranslators();
    initialized = true;
    console.log("[SSE] Translators initialized for /v1beta/models");
  }
}

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/**
 * POST /v1beta/models/{model}:generateContent        — non-streaming (JSON)
 * POST /v1beta/models/{model}:streamGenerateContent  — streaming (SSE)
 * POST /v1beta/models/{model}:countTokens            (local token estimate, {totalTokens})
 *
 * Streaming intent is determined by the URL action suffix (the canonical
 * Gemini API convention), NOT by a body field. `generationConfig.stream` is
 * not a real Gemini API field and the @google/genai SDK never sets it.
 *
 * The SDK always uses `:streamGenerateContent?alt=sse` for chat. handleChat
 * returns OpenAI SSE; transformOpenAISSEToGeminiSSE() converts it to Gemini
 * SSE on the fly so the SDK doesn't crash on the `[DONE]` sentinel.
 *
 * Ported from upstream decolua/9router#225 by @SteelMorgan.
 */
export async function POST(request, { params }) {
  await ensureInitialized();

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return Response.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    const { path } = await params;
    // path = ["model:action"], ["provider", "model:action"] or deeper
    // (["a", "b", "c:action"]); model ids may contain "/".
    const parsed = parseGeminiModelPath(path);
    if (!parsed) {
      return Response.json(
        { error: { message: "Missing model in path", code: 400, status: "INVALID_ARGUMENT" } },
        { status: 400 }
      );
    }
    const { model, action } = parsed;

    if (action === "countTokens") {
      // Local estimate in Gemini's CountTokensResponse shape. Gemini CLI calls this for
      // media parts and context calibration and falls back to its own estimate on error.
      return Response.json({ totalTokens: estimateGeminiCountTokens(rawBody, model) });
    }

    const validation = validateBody(v1betaGeminiGenerateSchema, rawBody);
    if (isValidationFailure(validation)) {
      return Response.json({ error: validation.error }, { status: 400 });
    }
    const body = validation.data;

    // Streaming is determined by URL action suffix:
    //   :streamGenerateContent => stream: true  (SSE)
    //   :generateContent       => stream: false (plain JSON)
    const stream = action === "streamGenerateContent";

    // Convert Gemini format to OpenAI/internal format
    const convertedBody = convertGeminiToInternal(body, model, stream);

    // Create new request with converted body
    const newRequest = new Request(request.url, {
      method: "POST",
      headers: request.headers,
      body: JSON.stringify(convertedBody),
      signal: request.signal,
    });

    const response = await handleChat(newRequest, () => buildClientRawRequest(request, rawBody));

    if (stream) {
      // Transform OpenAI SSE => Gemini SSE on the fly. The @google/genai SDK
      // always uses :streamGenerateContent?alt=sse and expects Gemini SSE
      // chunks (no [DONE] sentinel — stream just closes).
      return transformOpenAISSEToGeminiSSE(response, model);
    }
    // Convert OpenAI JSON => Gemini GenerateContentResponse JSON.
    return await convertOpenAIResponseToGemini(response, model);
  } catch (error) {
    console.log("Error handling Gemini request:", error);
    return Response.json(
      { error: { message: sanitizeErrorMessage(error), code: 500 } },
      { status: 500 }
    );
  }
}
