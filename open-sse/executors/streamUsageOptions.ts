/**
 * Shared stream_options policy for OpenAI-compatible chat-completions targets.
 *
 * Upstreams following the OpenAI spec only emit a usage chunk on streaming
 * responses when `stream_options.include_usage` is set. Without it OmniRoute
 * falls back to a heuristic estimate, which clients that budget context from
 * `usage` (e.g. Claude Code auto-compaction) treat as real.
 *
 * - stream:true  -> inject include_usage unless the connection opted out
 *                   via providerSpecificData.disableStreamOptions.
 * - stream:false -> strip any stream_options (invalid on non-streaming calls, #3884).
 */
export function applyStreamUsageOptions(
  body: Record<string, unknown>,
  stream: boolean,
  disableStreamOptions?: unknown
): Record<string, unknown> {
  if (stream && !disableStreamOptions) {
    const existing =
      body.stream_options &&
      typeof body.stream_options === "object" &&
      !Array.isArray(body.stream_options)
        ? (body.stream_options as Record<string, unknown>)
        : {};
    return {
      ...body,
      stream_options: {
        ...existing,
        include_usage: true,
      },
    };
  }
  if (Object.prototype.hasOwnProperty.call(body, "stream_options")) {
    const rest = { ...body };
    delete rest.stream_options;
    return rest;
  }
  return body;
}
