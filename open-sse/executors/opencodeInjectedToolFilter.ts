/**
 * Drops model calls to tools the gateway declared on its own behalf.
 *
 * A gated free-tier request carries the OpenCode CLI tool set so the upstream accepts it. The
 * caller never declared those tools, so a call to one of them must not reach the caller: the
 * Chat Completions event stream is rewritten here, removing the `tool_calls` deltas of the
 * injected names and turning a `tool_calls` finish into `stop` when nothing else was called.
 * Calls to tools the caller declared pass through untouched.
 */

/** Rewrite one SSE `data:` JSON chunk in place; returns false when the chunk becomes empty. */
function filterChunk(
  chunk: Record<string, unknown>,
  injected: ReadonlySet<string>,
  nameByIndex: Map<number, string>,
  keptIndexes: Set<number>
): void {
  const choices = Array.isArray(chunk.choices)
    ? (chunk.choices as Array<Record<string, unknown>>)
    : [];
  for (const choice of choices) {
    const delta = choice.delta as Record<string, unknown> | undefined;
    const calls = delta && Array.isArray(delta.tool_calls) ? (delta.tool_calls as unknown[]) : null;
    if (calls) {
      const kept: unknown[] = [];
      for (const raw of calls) {
        const call = raw as { index?: number; function?: { name?: string } };
        const index = typeof call.index === "number" ? call.index : 0;
        const name = call.function?.name;
        if (typeof name === "string" && name) nameByIndex.set(index, name);
        const known = nameByIndex.get(index);
        if (known && injected.has(known)) continue;
        keptIndexes.add(index);
        kept.push(raw);
      }
      if (kept.length > 0) (delta as Record<string, unknown>).tool_calls = kept;
      else delete (delta as Record<string, unknown>).tool_calls;
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
  const keptIndexes = new Set<number>();
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
        filterChunk(parsed, injected, nameByIndex, keptIndexes);
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
      let cut: number;
      while ((cut = buffer.indexOf("\n\n")) >= 0) {
        const event = buffer.slice(0, cut);
        buffer = buffer.slice(cut + 2);
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
