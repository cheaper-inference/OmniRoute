type JsonRecord = Record<string, unknown>;

export interface ConsoleApiResult {
  ok: boolean;
  status: number;
  json: JsonRecord;
  error: string | null;
}

export function stringField(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function record(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

export async function readConsoleApiResponse(response: {
  ok: boolean;
  status: number;
  text(): Promise<string>;
}): Promise<ConsoleApiResult> {
  const text = await response.text();
  let json: JsonRecord = {};
  try {
    json = record(JSON.parse(text));
  } catch {
    // Non-JSON console failures are reported through `error` below.
  }
  const meta = record(json.ResponseMetadata);
  const err = record(meta.Error);
  const message = stringField(err.Message);
  return {
    ok: response.ok && !message,
    status: response.status,
    json,
    error: message || (response.ok ? null : text.slice(0, 200)),
  };
}
