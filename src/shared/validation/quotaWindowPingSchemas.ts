/**
 * Zod schemas for quota window ping targets (POST /api/settings/quota-window-ping).
 *
 * The schedule union reuses `codexWakeupScheduleSchema` unchanged so both features
 * share one interval/daily definition (5 min - 7 days, IANA timezone, distinct
 * weekdays). Target rules are pure: descriptor existence, targetability, schedule
 * capability, schedule required when enabled, threshold only with a longer window,
 * and the Claude billable-quota confirmation gate.
 */
import { z } from "zod";
import {
  getQuotaWindowDescriptor,
  isTargetableDescriptor,
} from "@/shared/constants/quotaWindowPing";
import { codexWakeupScheduleSchema } from "./codexWakeupSchemas";

export const quotaWindowPingScheduleSchema = codexWakeupScheduleSchema;

export const quotaWindowPingIdSchema: z.ZodType<string> = z
  .string()
  .trim()
  .min(1)
  .max(200)
  .regex(/^[A-Za-z0-9._:-]+$/);

const targetInputObject = z
  .object({
    connectionId: quotaWindowPingIdSchema,
    descriptorId: z.string().trim().min(1).max(200),
    model: z.string().trim().min(1).max(200).nullable().optional(),
    enabled: z.boolean().optional().default(false),
    schedule: quotaWindowPingScheduleSchema.nullable().optional(),
    minLongerWindowRemainingPct: z.number().min(0).max(100).optional().default(0),
    dryRun: z.boolean().optional().default(false),
    claudeBillableConfirmed: z.boolean().optional().default(false),
  })
  .strict();

export const quotaWindowPingTargetInputSchema = targetInputObject.superRefine((value, ctx) => {
  const descriptor = getQuotaWindowDescriptor(value.descriptorId);
  if (!descriptor) {
    ctx.addIssue({
      code: "custom",
      path: ["descriptorId"],
      message: "Unknown quota window descriptor",
    });
    return;
  }
  if (descriptor.policy === "excluded") {
    ctx.addIssue({
      code: "custom",
      path: ["descriptorId"],
      message: "Quota window descriptor is excluded from pinging",
    });
    return;
  }
  if (!isTargetableDescriptor(descriptor)) {
    ctx.addIssue({
      code: "custom",
      path: ["descriptorId"],
      message: "Quota window descriptor is not targetable",
    });
    return;
  }
  if (value.schedule && !descriptor.scheduledAllowed) {
    ctx.addIssue({
      code: "custom",
      path: ["schedule"],
      message: "This descriptor does not allow a schedule",
    });
  }
  if (value.enabled && !value.schedule) {
    ctx.addIssue({
      code: "custom",
      path: ["schedule"],
      message: "A schedule is required when the target is enabled",
    });
  }
  if (!value.enabled && value.schedule) {
    ctx.addIssue({
      code: "custom",
      path: ["schedule"],
      message: "Clear the schedule before disabling the target",
    });
  }
  if (value.minLongerWindowRemainingPct > 0 && !descriptor.longerWindow) {
    ctx.addIssue({
      code: "custom",
      path: ["minLongerWindowRemainingPct"],
      message: "This descriptor has no longer window to measure",
    });
  }
  if (descriptor.provider === "claude" && value.enabled && !value.claudeBillableConfirmed) {
    ctx.addIssue({
      code: "custom",
      path: ["claudeBillableConfirmed"],
      message: "Recorded-confirmation required for Claude scheduled pings",
    });
  }
});

export const quotaWindowPingActionSchema = z.discriminatedUnion("action", [
  z
    .object({
      action: z.literal("create"),
      target: quotaWindowPingTargetInputSchema,
    })
    .strict(),
  z
    .object({
      action: z.literal("update"),
      id: quotaWindowPingIdSchema,
      target: quotaWindowPingTargetInputSchema,
    })
    .strict(),
  z.object({ action: z.literal("delete"), id: quotaWindowPingIdSchema }).strict(),
  z.object({ action: z.literal("run"), id: quotaWindowPingIdSchema }).strict(),
]);
