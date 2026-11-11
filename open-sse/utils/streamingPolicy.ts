/**
 * Per-route streaming policy, set by OMNIROUTE_STREAMING_POLICY (unset = off).
 *
 * Format: `<path-prefix>=<allow|deny|always>`, comma separated. The longest matching
 * prefix wins. `deny` refuses a client that asked to stream (HTTP 400), so a client that
 * cannot parse SSE gets a clear error instead of a broken body. `always` forces a stream,
 * which keeps a long request alive behind a proxy with an idle timeout. `allow`, no match
 * and invalid entries leave the request as it was.
 */

type Mode = "allow" | "deny" | "always";

export type StreamingPolicyResult = {
  stream: boolean;
  error?: { status: number; message: string };
};

const MODES = new Set<string>(["allow", "deny", "always"]);

function parsePolicy(raw: string | undefined): Array<[string, Mode]> {
  const rules: Array<[string, Mode]> = [];
  for (const entry of (raw ?? "").split(",")) {
    const at = entry.lastIndexOf("=");
    const prefix = entry.slice(0, at).trim();
    const mode = entry.slice(at + 1).trim();
    if (at > 0 && prefix.startsWith("/") && MODES.has(mode)) rules.push([prefix, mode as Mode]);
  }
  return rules.sort((a, b) => b[0].length - a[0].length);
}

export function applyStreamingPolicy(
  endpointPath: string,
  stream: boolean,
  env: Record<string, string | undefined> = process.env
): StreamingPolicyResult {
  const rule = parsePolicy(env.OMNIROUTE_STREAMING_POLICY).find(([prefix]) =>
    endpointPath.startsWith(prefix)
  );
  if (rule?.[1] === "always") return { stream: true };
  if (rule?.[1] === "deny" && stream) {
    return {
      stream,
      error: { status: 400, message: "Response streaming is not enabled for this route" },
    };
  }
  return { stream };
}
