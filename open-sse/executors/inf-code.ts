import { DefaultExecutor } from "./default.ts";
import type { ExecuteInput, ExecutorExecuteResult } from "./base.ts";
import { createInfCodeSseTransform, rewriteInfCodeNonStreamJson } from "./inf-code-thinking.ts";

const SSE_CONTENT_TYPE = "text/event-stream";
const JSON_CONTENT_TYPE = "application/json";

/**
 * Rewrite one upstream InfCode response.
 *
 * Returns `null` only when the body is a shape this executor does not own;
 * the caller then keeps the untouched upstream result. Every other path returns
 * a fresh `Response` (the original body has been consumed or piped).
 */
export async function rewriteInfCodeResponse(response: Response): Promise<Response | null> {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes(SSE_CONTENT_TYPE)) {
    if (!response.body) return null;
    return new Response(response.body.pipeThrough(createInfCodeSseTransform()), {
      status: response.status,
      statusText: response.statusText,
      headers: withoutContentLength(response.headers),
    });
  }

  if (contentType.includes(JSON_CONTENT_TYPE)) {
    const text = await response.text();
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      // Not JSON we can reason about: hand the exact bytes back untouched.
      return new Response(text, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });
    }
    if (!rewriteInfCodeNonStreamJson(parsed)) {
      return new Response(text, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });
    }
    return new Response(JSON.stringify(parsed), {
      status: response.status,
      statusText: response.statusText,
      headers: withoutContentLength(response.headers),
    });
  }

  return null;
}

/**
 * InfCode (Token Infinity) executor.
 *
 * The gateway speaks OpenAI wire format, so request building, auth, retries and
 * error classification stay on {@link DefaultExecutor}. Only the response shape
 * is InfCode-specific: the gateway mirrors the model's reasoning into `content`
 * as a `<thinking>…</thinking>` block *and* into `reasoning_content`.
 * {@link createInfCodeSseTransform} / {@link rewriteInfCodeNonStreamJson} strip
 * the duplicated block from `content` while leaving `reasoning_content`
 * untouched.
 *
 * Keeping this here (instead of a textual-reasoning rule in the shared
 * sanitizer) is deliberate: a future InfCode format change is a one-file edit
 * and can never alter another provider's response path.
 */
export class InfCodeExecutor extends DefaultExecutor {
  constructor(provider = "inf-code") {
    super(provider);
  }

  override async execute(input: ExecuteInput): Promise<ExecutorExecuteResult> {
    const result = await super.execute(input);
    const response = result instanceof Response ? result : result.response;
    if (!response) return result;

    const rewritten = await rewriteInfCodeResponse(response);
    if (!rewritten) return result;
    return result instanceof Response ? rewritten : { ...result, response: rewritten };
  }
}

/** The body is re-serialized, so a stale upstream `content-length` must go. */
function withoutContentLength(headers: Headers): Headers {
  const next = new Headers(headers);
  next.delete("content-length");
  return next;
}

export default InfCodeExecutor;
