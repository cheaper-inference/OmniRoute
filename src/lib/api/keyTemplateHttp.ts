import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/errorSanitization.ts";
import { NextResponse } from "next/server";
import type { z } from "zod";
import { KeyTemplateError } from "@/lib/db/keyTemplates/errors.ts";
import { zodIssuesToTemplateIssues } from "@/lib/db/keyTemplates";
import type { KeyTemplateApiError, KeyTemplateErrorCode } from "@/shared/types/keyTemplates";
import * as log from "@/sse/utils/logger";

/** Template payloads describe access policy; never let intermediaries cache them. */
export const NO_STORE_HEADERS = { "Cache-Control": "no-store" } as const;

export function templateJson(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: NO_STORE_HEADERS });
}

export function templateError(
  status: number,
  code: KeyTemplateErrorCode,
  error: string,
  extra: Omit<KeyTemplateApiError, "error" | "code"> = {}
) {
  return templateJson({ error, code, ...extra } satisfies KeyTemplateApiError, status);
}

export async function readJsonBody(
  request: Request
): Promise<{ ok: true; body: unknown } | { ok: false; response: Response }> {
  try {
    return { ok: true, body: await request.json() };
  } catch {
    return { ok: false, response: templateError(400, "INVALID_JSON", "Invalid JSON body") };
  }
}

export function validationError(error: z.ZodError, prefix = "") {
  return templateError(400, "VALIDATION_FAILED", "Invalid request", {
    issues: zodIssuesToTemplateIssues(error, prefix),
  });
}

/** Maps known failures to their contract body; anything else is a logged 500. */
export function templateFailure(error: unknown, context: string) {
  if (error instanceof KeyTemplateError) {
    return templateJson(error.toBody(), error.status);
  }
  if (error instanceof Error && (error as { code?: string }).code === "LEASE_KEY_POLICY_INVALID") {
    return templateError(400, "POLICY_INVARIANT", sanitizeErrorMessage(error.message));
  }
  log.error("key-templates", context, error);
  return templateError(500, "INTERNAL_ERROR", "Key template operation failed");
}
