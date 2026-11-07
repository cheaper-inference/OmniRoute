import { z } from "zod";
import { FalError } from "@omniroute/open-sse/handlers/fal/client";
import { errorResponse, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { readRequestBodyWithLimit, getBodySizeLimit } from "@/shared/middleware/bodySizeGuard";
import { isFalNativeEnabled } from "@/shared/utils/featureFlags";

export const falRunSchema = z
  .object({
    endpoint_id: z.string().min(3).max(300),
    connection_id: z.string().min(1).max(100).optional(),
    input: z.record(z.string(), z.unknown()),
    transport: z.enum(["direct", "queue", "stream", "realtime", "http-websocket"]).default("queue"),
  })
  .strict();

export async function readFalRun(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const raw = await readRequestBodyWithLimit(request, getBodySizeLimit("/api/v1/fal/run"));
  if (!contentType.includes("multipart/form-data"))
    return falRunSchema.parse(JSON.parse(Buffer.from(raw).toString()));
  const form = await new Response(raw, { headers: { "content-type": contentType } }).formData();
  const input = z
    .record(z.string(), z.unknown())
    .parse(JSON.parse(String(form.get("input") ?? "{}")));
  const files = new Map<string, string[]>();
  for (const [field, value] of form.entries()) {
    if (typeof value === "string") continue;
    const values = files.get(field) ?? [];
    values.push(
      `data:${value.type || "application/octet-stream"};base64,${Buffer.from(await value.arrayBuffer()).toString("base64")}`
    );
    files.set(field, values);
  }
  // [] explicitly chooses an array even for a single file; repeated file order is retained.
  for (const [field, values] of files) {
    const name = field.replace(/\[\]$/, "");
    if (name in input) throw new FalError(`Duplicate fal file input: ${name}`);
    input[name] = field.endsWith("[]") || values.length > 1 ? values : values[0];
  }
  return falRunSchema.parse({
    endpoint_id: form.get("endpoint_id"),
    ...(form.has("connection_id") ? { connection_id: form.get("connection_id") } : {}),
    transport: form.get("transport") ?? "queue",
    input,
  });
}

export function falErrorResponse(error: unknown) {
  const status =
    error instanceof FalError
      ? error.status
      : error instanceof SyntaxError || error instanceof z.ZodError
        ? 400
        : error instanceof Error && ["AbortError", "TimeoutError"].includes(error.name)
          ? 504
          : 400;
  const response = errorResponse(status, sanitizeErrorMessage(error));
  if (error instanceof FalError && error.retryAfter)
    response.headers.set("Retry-After", error.retryAfter);
  return response;
}

/** FAL_NATIVE_ENABLED off: the native routes do not exist for callers. */
export function falNativeDisabled(): Response | null {
  return isFalNativeEnabled() ? null : errorResponse(404, "Fal native gateway is disabled");
}

export function falOptions(methods: string) {
  return new Response(null, {
    headers: { "Access-Control-Allow-Methods": methods, "Access-Control-Allow-Headers": "*" },
  });
}
