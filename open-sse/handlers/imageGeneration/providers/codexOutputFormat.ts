// Codex GPT Image output_format contract (#19252).
// The ChatGPT-backed Codex Images endpoint answers 200 with PNG bytes even when
// jpeg/webp is requested (probed upstream, 2026-11-15). Silently dropping the field made
// callers decode PNG as the format they asked for, so a non-png request is rejected.

export type CodexOutputFormatCheck = {
  ok: boolean;
  forward: "png" | null;
  error?: string;
};

export function checkCodexOutputFormat(body: Record<string, unknown>): CodexOutputFormatCheck {
  const raw = body.output_format;
  if (raw === undefined || raw === null || raw === "") return { ok: true, forward: null };
  const value = typeof raw === "string" ? raw.trim().toLowerCase() : "";
  if (value === "png") return { ok: true, forward: "png" };
  const shown = typeof raw === "string" ? raw.trim().slice(0, 32) : typeof raw;
  return {
    ok: false,
    forward: null,
    error: `Codex image models only return PNG output; output_format "${shown}" is not supported. Omit output_format or use "png".`,
  };
}
