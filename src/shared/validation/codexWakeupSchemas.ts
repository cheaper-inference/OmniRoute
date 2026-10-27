/**
 * Zod schemas for scheduled Codex account wakeups (POST /api/settings/codex-wakeups).
 *
 * A task pings 1–20 Codex OAuth accounts either daily at HH:mm in an IANA timezone on
 * chosen weekdays, or every N minutes (5 min – 7 days). The lower bound keeps a task
 * from turning into a quota-hammering loop.
 */
import { z } from "zod";

export const CODEX_WAKEUP_MAX_ACCOUNTS = 20;
export const CODEX_WAKEUP_MIN_INTERVAL_MINUTES = 5;
export const CODEX_WAKEUP_MAX_INTERVAL_MINUTES = 7 * 24 * 60;

export function isValidTimeZone(timeZone: string): boolean {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone }).format(0);
    return true;
  } catch {
    return false;
  }
}

const idSchema = z
  .string()
  .trim()
  .min(1)
  .max(200)
  .regex(/^[A-Za-z0-9._:-]+$/);

const distinct = (values: readonly unknown[]) => new Set(values).size === values.length;

const intervalScheduleSchema = z
  .object({
    kind: z.literal("interval"),
    minutes: z
      .number()
      .int()
      .min(CODEX_WAKEUP_MIN_INTERVAL_MINUTES)
      .max(CODEX_WAKEUP_MAX_INTERVAL_MINUTES),
  })
  .strict();

const dailyScheduleSchema = z
  .object({
    kind: z.literal("daily"),
    time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Use HH:mm (00:00–23:59)"),
    timezone: z.string().trim().min(1).max(80).refine(isValidTimeZone, "Unknown timezone"),
    // 0 = Sunday … 6 = Saturday (Date#getDay()).
    days: z
      .array(z.number().int().min(0).max(6))
      .min(1)
      .max(7)
      .refine(distinct, "Weekdays must be distinct")
      .transform((days) => [...days].sort((a, b) => a - b)),
  })
  .strict();

export const codexWakeupScheduleSchema = z.discriminatedUnion("kind", [
  intervalScheduleSchema,
  dailyScheduleSchema,
]);

export const codexWakeupTaskInputSchema = z
  .object({
    name: z.string().trim().min(1).max(80),
    connectionIds: z
      .array(idSchema)
      .min(1)
      .max(CODEX_WAKEUP_MAX_ACCOUNTS)
      .refine(distinct, "Accounts must be distinct"),
    enabled: z.boolean(),
    schedule: codexWakeupScheduleSchema,
  })
  .strict();

export const codexWakeupActionSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("create"), task: codexWakeupTaskInputSchema }).strict(),
  z
    .object({ action: z.literal("update"), id: idSchema, task: codexWakeupTaskInputSchema })
    .strict(),
  z.object({ action: z.literal("delete"), id: idSchema }).strict(),
  z.object({ action: z.literal("run"), id: idSchema }).strict(),
]);

export type CodexWakeupSchedule = z.infer<typeof codexWakeupScheduleSchema>;
export type CodexWakeupTaskInput = z.infer<typeof codexWakeupTaskInputSchema>;
export type CodexWakeupAction = z.infer<typeof codexWakeupActionSchema>;
