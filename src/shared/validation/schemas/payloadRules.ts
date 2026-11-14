import { z } from "zod";
import {
  ACCOUNT_FALLBACK_STRATEGY_VALUES,
  ROUTING_STRATEGY_VALUES,
} from "@/shared/constants/routingStrategies";
import { SUPPORTED_BATCH_ENDPOINTS } from "@/shared/constants/batchEndpoints";
import { MAX_REQUEST_BODY_LIMIT_MB, MIN_REQUEST_BODY_LIMIT_MB } from "@/shared/constants/bodySize";
import { COMBO_CONFIG_MODES } from "@/shared/constants/comboConfigMode";
import { providerAllowsOptionalApiKey } from "@/shared/constants/providers";
import { HIDEABLE_SIDEBAR_ITEM_IDS } from "@/shared/constants/sidebarVisibility";
import {
  isForbiddenUpstreamHeaderName,
  isForbiddenCustomHeaderName,
} from "@/shared/constants/upstreamHeaders";
import { MAX_TIMER_TIMEOUT_MS } from "@/shared/utils/runtimeTimeouts";

export const payloadRuleModelSpecSchema = z
  .object({
    name: z.string().trim().min(1),
    protocol: z.string().trim().min(1).optional(),
  })
  .strict();

// Optional guard on a rule. `eq` / `neq` / `in` need a `value` (`in` a list); `exists` / `missing`
// take none. All conditions of a rule must hold.
export const payloadRuleConditionSchema = z
  .object({
    path: z.string().trim().min(1),
    op: z.enum(["eq", "neq", "in", "exists", "missing"]),
    value: z.unknown().optional(),
  })
  .strict()
  .superRefine((condition, ctx) => {
    const needsValue = condition.op === "eq" || condition.op === "neq" || condition.op === "in";
    if (needsValue !== (condition.value !== undefined)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: needsValue
          ? `op "${condition.op}" needs a value`
          : `op "${condition.op}" takes no value`,
        path: ["value"],
      });
    } else if (condition.op === "in" && !Array.isArray(condition.value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'op "in" needs a list',
        path: ["value"],
      });
    }
  });

export const payloadMutationRuleSchema = z
  .object({
    models: z.array(payloadRuleModelSpecSchema).min(1),
    params: z
      .record(z.string().trim().min(1), z.unknown())
      .refine((value) => Object.keys(value).length > 0, "params must contain at least one path"),
    when: z.array(payloadRuleConditionSchema).min(1).optional(),
  })
  .strict();

export const payloadFilterRuleSchema = z
  .object({
    models: z.array(payloadRuleModelSpecSchema).min(1),
    params: z.array(z.string().trim().min(1)).min(1),
    when: z.array(payloadRuleConditionSchema).min(1).optional(),
  })
  .strict();

export const updatePayloadRulesSchema = z
  .object({
    default: z.array(payloadMutationRuleSchema).optional(),
    override: z.array(payloadMutationRuleSchema).optional(),
    filter: z.array(payloadFilterRuleSchema).optional(),
    defaultRaw: z.array(payloadMutationRuleSchema).optional(),
    "default-raw": z.array(payloadMutationRuleSchema).optional(),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (
      value.default === undefined &&
      value.override === undefined &&
      value.filter === undefined &&
      value.defaultRaw === undefined &&
      value["default-raw"] === undefined
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "No valid fields to update",
        path: [],
      });
    }
  });
