import { z } from "zod";

import { REPORT_MULTI_VALUE_FILTERS, REPORT_SEARCH_MAX_LENGTH } from "@/lib/db/agentSessionReports";
import { SESSION_REQUESTS_MAX_LIMIT } from "@/lib/db/agentSessionReportStats";
import { REPORT_DIMENSIONS, SESSION_REPORT_SORTS } from "@/lib/usage/agentSessionReports";

// Stored timestamps are UTC `toISOString()` strings compared lexically, so any accepted offset
// is normalized to that form before it reaches SQL.
const isoTimestamp = z
  .string()
  .datetime({ offset: true })
  .transform((value) => new Date(value).toISOString());

const filterText = z.string().trim().min(1).max(512);
/** Most values one multi-select filter accepts. */
export const MAX_FILTER_VALUES = 50;
// One value, or several from repeated query params (`?model=a&model=b`); never comma lists,
// since project names may contain commas. Each value may be REPORT_FILTER_NONE ("__none__").
const filterValues = z
  .union([filterText, z.array(filterText).min(1).max(MAX_FILTER_VALUES)])
  .optional();

export const reportFilterSchema = z.object({
  from: isoTimestamp.optional(),
  to: isoTimestamp.optional(),
  apiKeyId: filterValues,
  projectName: filterValues,
  client: filterValues,
  provider: filterValues,
  model: filterValues,
  connectionId: filterValues,
  gitBranch: filterValues,
  serviceTier: filterValues,
  errorCode: filterValues,
  billingTeamId: filterValues,
  outcome: z.enum(["success", "error"]).optional(),
  search: z.string().trim().min(1).max(REPORT_SEARCH_MAX_LENGTH).optional(),
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

/** Session detail: one page of the session's requests, newest first. */
export const sessionDetailQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(SESSION_REQUESTS_MAX_LIMIT).optional(),
  offset: z.coerce.number().int().min(0).optional(),
});

export const exportQuerySchema = reportFilterSchema.extend({
  type: z.enum([...REPORT_DIMENSIONS, "sessions"]),
  ...sessionOrderSchema,
});

const MULTI_VALUE_PARAMS = new Set<string>(REPORT_MULTI_VALUE_FILTERS);

/**
 * Query params as a plain object; empty values count as absent. Multi-value filters repeated in
 * the query become arrays; a single value stays a string. Other repeated params keep the last.
 */
export function searchParamsObject(request: Request): Record<string, string | string[]> {
  const params = new URL(request.url).searchParams;
  const result: Record<string, string | string[]> = {};
  for (const [key, value] of params.entries()) {
    if (value === "") continue;
    if (!MULTI_VALUE_PARAMS.has(key)) {
      result[key] = value;
      continue;
    }
    const values = params.getAll(key).filter((item) => item !== "");
    result[key] = values.length === 1 ? values[0] : values;
  }
  return result;
}
