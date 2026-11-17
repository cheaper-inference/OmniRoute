/**
 * Drops model calls to tools the gateway declared on its own behalf.
 *
 * A gated free-tier request carries the OpenCode CLI tool set so the upstream accepts it. The
 * caller never declared those tools, so a call to one of them must not reach the caller: the
 * Chat Completions event stream is rewritten here, removing the `tool_calls` deltas of the
 * injected names and turning a `tool_calls` finish into `stop` when nothing else was called.
 * Calls to tools the caller declared keep their content and are renumbered from 0 in arrival
 * order. A tool-call delta that arrives before its function name is held until the name is
 * known; a call that never gets a name is dropped.
 */
import type { ExecutorExecuteResult } from "./base.ts";

/**
 * Decide one tool-call delta entry; returns the deltas to emit (held ones first), or none.
 * `keptIndexes` maps an upstream index to the one the caller sees: dropping an injected call
 * must not leave a gap, because a client that accumulates by index would get a sparse array.
 */
function routeToolCall(
  raw: unknown,
  injected: ReadonlySet<string>,
  nameByIndex: Map<number, string>,
  keptIndexes: Map<number, number>,
  pending: Map<number, unknown[]>
): unknown[] {
  const call = raw as { index?: number; function?: { name?: string } };
  const index = typeof call.index === "number" ? call.index : 0;
  const name = call.function?.name;
  if (typeof name === "string" && name) nameByIndex.set(index, name);
  const known = nameByIndex.get(index);
  if (!known) {
    // No function name yet: hold the delta until the name decides whether it is ours.
    const held = pending.get(index) ?? [];
    held.push(raw);
    pending.set(index, held);
    return [];
  }
  if (injected.has(known)) {
    pending.delete(index);
    return [];
  }
  const outIndex = keptIndexes.get(index) ?? keptIndexes.size;
  keptIndexes.set(index, outIndex);
  const held = pending.get(index) ?? [];
  pending.delete(index);
  return [...held, raw].map((entry) => ({ ...(entry as object), index: outIndex }));
}

/** Rewrite one SSE `data:` JSON chunk in place. */
function filterChunk(
  chunk: Record<string, unknown>,
  injected: ReadonlySet<string>,
  nameByIndex: Map<number, string>,
  keptIndexes: Map<number, number>,
  pending: Map<number, unknown[]>
): void {
  const choices = Array.isArray(chunk.choices)
    ? (chunk.choices as Array<Record<string, unknown>>)
    : [];
  for (const choice of choices) {
    const delta = choice.delta as Record<string, unknown> | undefined;
    if (delta && Array.isArray(delta.tool_calls)) {
      const kept = (delta.tool_calls as unknown[]).flatMap((raw) =>
        routeToolCall(raw, injected, nameByIndex, keptIndexes, pending)
      );
      if (kept.length > 0) delta.tool_calls = kept;
      else delete delta.tool_calls;
    }
    if (choice.finish_reason === "tool_calls" && keptIndexes.size === 0) {
      choice.finish_reason = "stop";
    }
  }
}

export function filterInjectedToolCalls(
  response: Response,
  injectedNames: readonly string[]
): Response {
  if (injectedNames.length === 0 || !response.ok || !response.body) return response;
  if (!(response.headers.get("content-type") || "").includes("text/event-stream")) return response;
  const injected = new Set(injectedNames);
  const nameByIndex = new Map<number, string>();
  const keptIndexes = new Map<number, number>();
  const pending = new Map<number, unknown[]>();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  const processEvent = (event: string): string => {
    const lines = event.split("\n");
    const out: string[] = [];
    for (const line of lines) {
      if (!line.startsWith("data:")) {
        out.push(line);
        continue;
      }
      const payload = line.slice(5).trim();
      if (!payload || payload === "[DONE]") {
        out.push(line);
        continue;
      }
      try {
        const parsed = JSON.parse(payload) as Record<string, unknown>;
        filterChunk(parsed, injected, nameByIndex, keptIndexes, pending);
        const choices = Array.isArray(parsed.choices)
          ? (parsed.choices as Array<Record<string, unknown>>)
          : [];
        const emptyDelta =
          choices.length === 1 &&
          choices[0].finish_reason == null &&
          JSON.stringify(choices[0].delta ?? {}) === "{}" &&
          !parsed.usage;
        if (emptyDelta && line.length > 0 && payload.includes("tool_calls")) continue;
        out.push(`data: ${JSON.stringify(parsed)}`);
      } catch {
        out.push(line);
      }
    }
    return out.join("\n");
  };

  const transform = new TransformStream<Uint8Array, Uint8Array>({
    transform(part, controller) {
      buffer += decoder.decode(part, { stream: true });
      let boundary: RegExpExecArray | null;
      // An SSE event ends at a blank line: LF LF, CRLF CRLF or a mix of the two.
      while ((boundary = /\r\n\r\n|\n\n|\r\n\n|\n\r\n/.exec(buffer))) {
        const event = buffer.slice(0, boundary.index).replace(/\r\n/g, "\n");
        buffer = buffer.slice(boundary.index + boundary[0].length);
        const rewritten = processEvent(event);
        if (rewritten.trim().length > 0) controller.enqueue(encoder.encode(`${rewritten}\n\n`));
      }
    },
    flush(controller) {
      buffer += decoder.decode();
      if (buffer.trim().length > 0) controller.enqueue(encoder.encode(processEvent(buffer)));
    },
  });
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(response.body.pipeThrough(transform), {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

/** Remove model calls to OpenCode CLI tools the caller never declared. */
export function dropInjectedToolCalls(
  result: ExecutorExecuteResult,
  names: readonly string[] | undefined
): ExecutorExecuteResult {
  if (!names || names.length === 0) return result;
  if (result instanceof Response) return filterInjectedToolCalls(result, names);
  if (!("response" in result) || !result.response) return result;
  const filtered = filterInjectedToolCalls(result.response, names);
  return filtered === result.response ? result : { ...result, response: filtered };
}
