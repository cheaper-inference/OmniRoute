function asRecord(value: unknown): Record<string, unknown> | undefined {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return undefined;
  return value as Record<string, unknown>;
}

function effortValue(value: unknown, expanded: boolean): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (expanded) return /^[a-z][a-z0-9_-]{0,31}$/i.test(trimmed) ? trimmed : null;
  return trimmed.length > 0 ? value : null;
}

export function readReasoningEffort(body: unknown, expanded: boolean): string | null {
  const record = asRecord(body);
  return (
    effortValue(record?.reasoning_effort, expanded) ??
    effortValue(asRecord(record?.reasoning)?.effort, expanded) ??
    (expanded ? effortValue(asRecord(record?.output_config)?.effort, expanded) : null)
  );
}
