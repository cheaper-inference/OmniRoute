import type { useTranslations } from "next-intl";
import type { ZodIssue } from "zod";
import {
  createDestinationSchema,
  destinationNumberLimits,
  updateDestinationSchema,
} from "@/lib/logExport/destinationSchemas";
import {
  BIGQUERY_PARTITION_RETENTION,
  bigQueryConfigSchema,
} from "@/lib/logExport/destinations/bigqueryConfig";

import type { DestinationSubmitPayload } from "../types";

type Translate = ReturnType<typeof useTranslations<"logExport">>;

const numericFieldLimits = new Map<string, { min: number; max: number }>(
  Object.entries({
    ...destinationNumberLimits,
    partitionExpirationDays: BIGQUERY_PARTITION_RETENTION,
  })
);

function validationMessage(key: string, issue: ZodIssue, t: Translate) {
  const limits = numericFieldLimits.get(key);
  if (limits) return t("validationIntegerRange", { min: limits.min, max: limits.max });

  switch (issue.code) {
    case "too_small":
      return t("validationRequired");
    case "too_big":
      return t("validationMaxLength", { max: Number(issue.maximum) });
    case "invalid_format":
      return t("validationBigQueryId");
    default:
      return t("validationInvalid");
  }
}

function validateBigQueryForm(payload: DestinationSubmitPayload, editing: boolean, t: Translate) {
  const envelopeSchema = editing ? updateDestinationSchema : createDestinationSchema;
  const envelope = envelopeSchema.safeParse(payload);
  const config = bigQueryConfigSchema.safeParse(payload.config);
  const errors = new Map<string, string>();

  for (const issue of [...(envelope.error?.issues ?? []), ...(config.error?.issues ?? [])]) {
    const key = String(issue.path[0]);
    // The required error already covers empty IDs.
    if (issue.code === "invalid_format" && payload.config[key] === "") continue;
    const message = validationMessage(key, issue, t);
    const previous = errors.get(key);
    if (previous !== message) errors.set(key, previous ? `${previous} ${message}` : message);
  }
  return errors;
}

export function getDestinationFormValidator(typeId: string | undefined) {
  return typeId === "bigquery" ? validateBigQueryForm : undefined;
}
