import { z } from "zod";

import { REPORT_DIMENSIONS, SESSION_REPORT_SORTS } from "@/lib/usage/agentSessionReports";

// Stored timestamps are UTC `toISOString()` strings compared lexically, so any accepted offset
// is normalized to that form before it reaches SQL.
const isoTimestamp = z
  .string()
  .datetime({ offset: true })
  .transform((value) => new Date(value).toISOString());

const optionalText = z.string().trim().min(1).max(512).optional();

// apiKeyId, projectName and client also accept REPORT_FILTER_NONE ("__none__", no value).
export const reportFilterSchema = z.object({
  from: isoTimestamp.optional(),
  to: isoTimestamp.optional(),
  apiKeyId: optionalText,
  projectName: optionalText,
  client: optionalText,
  provider: optionalText,
  model: optionalText,
  connectionId: optionalText,
  /** Minutes to add to UTC for local days (the browser's `-getTimezoneOffset()`). */
  tzOffset: z.coerce.number().int().min(-840).max(840).optional(),
});

const sessionOrderSchema = {
  sort: z.enum(SESSION_REPORT_SORTS).optional(),
  order: z.enum(["asc", "desc"]).optional(),
};

export const sessionsQuerySchema = reportFilterSchema.extend({
  ...sessionOrderSchema,
  limit: z.coerce.number().int().min(1).max(100).optional(),
  offset: z.coerce.number().int().min(0).optional(),
});

export const exportQuerySchema = reportFilterSchema.extend({
  type: z.enum([...REPORT_DIMENSIONS, "sessions"]),
  ...sessionOrderSchema,
});

/** Query params as a plain object; empty values count as absent. */
export function searchParamsObject(request: Request): Record<string, string> {
  const entries = [...new URL(request.url).searchParams.entries()].filter(([, v]) => v !== "");
  return Object.fromEntries(entries);
}
