import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { readBoundedSystemOneBody } from "@omniroute/open-sse/handlers/systemOneBody.ts";
import {
  fromOpenAiDecisionRequest,
  toOpenAiDecisionResponse,
} from "@omniroute/open-sse/services/decisions/openAiDecisionsEnvelope.ts";
import { enforceClientApiRouteAuth } from "@/shared/utils/clientApiRouteAuth";
import {
  readRequestBodyWithLimit,
  RequestBodyTooLargeError,
} from "@/shared/middleware/bodySizeGuard";
import { POST as systemOnePost } from "../systemone/route.ts";

const MAX_BYTES = 1_048_576;
export type DecisionsPostDeps = {
  authenticate: (request: Request) => Promise<Response | null>;
  systemOnePost: (request: Request) => Promise<Response>;
};

function copiedHeaders(response: Response): Headers {
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.delete("content-encoding");
  return headers;
}

function stopped(status: number, message: string, original?: Response): Response {
  const failure = errorResponse(status, message);
  if (!original) return failure;
  const headers = copiedHeaders(original);
  headers.set("content-type", "application/json");
  return new Response(failure.body, { status, headers });
}

async function requestBody(request: Request): Promise<unknown> {
  const bytes = await readRequestBodyWithLimit(request, MAX_BYTES, request.signal);
  request.signal.throwIfAborted();
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
}

/**
 * In-process protocol adaptation only. Authentication precedes parsing. The
 * shared System One route owns policy/admission, credentials, dispatch and
 * accounting exactly once; no HTTP loopback or second provider gateway exists.
 */
export function createDecisionsPostHandler(overrides: Partial<DecisionsPostDeps> = {}) {
  const deps: DecisionsPostDeps = {
    authenticate: enforceClientApiRouteAuth,
    systemOnePost,
    ...overrides,
  };
  return async (request: Request): Promise<Response> => {
    if (request.signal.aborted) return stopped(499, "Decisions request aborted by caller");
    const auth = await deps.authenticate(request);
    if (auth) return auth;
    let raw: unknown;
    try {
      raw = await requestBody(request);
    } catch (error) {
      if (request.signal.aborted) return stopped(499, "Decisions request aborted by caller");
      return error instanceof RequestBodyTooLargeError
        ? stopped(413, "Decisions request body exceeds the byte budget")
        : stopped(400, "Invalid JSON body");
    }
    const canonical = fromOpenAiDecisionRequest(raw);
    if (canonical.ok === false) return stopped(canonical.status, canonical.message);
    const url = new URL(request.url);
    url.pathname = "/v1/systemone";
    url.search = "";
    const headers = new Headers(request.headers);
    headers.delete("content-length");
    headers.delete("content-encoding");
    headers.set("content-type", "application/json");
    const nativeRequest = new Request(url, {
      method: "POST",
      headers,
      body: JSON.stringify(canonical.body),
      signal: request.signal,
    });
    let response: Response | undefined;
    try {
      request.signal.throwIfAborted();
      response = await deps.systemOnePost(nativeRequest);
      request.signal.throwIfAborted();
      if (!response.ok) return response;
      const text = await readBoundedSystemOneBody(response, request.signal, MAX_BYTES);
      const translated = toOpenAiDecisionResponse(JSON.parse(text), raw);
      if (translated.ok === false)
        return stopped(502, "Native response does not satisfy the Decisions contract", response);
      return new Response(JSON.stringify(translated.body), {
        status: response.status,
        headers: copiedHeaders(response),
      });
    } catch {
      return request.signal.aborted
        ? stopped(499, "Decisions request aborted by caller", response)
        : stopped(502, "Native Decisions response could not be read", response);
    }
  };
}
