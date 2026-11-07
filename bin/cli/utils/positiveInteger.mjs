import { z } from "zod";
import { InvalidArgumentError } from "commander";
import { t } from "../i18n.mjs";

const positiveIntSchema = z
  .string()
  .trim()
  .regex(/^[0-9]+$/)
  .transform(Number)
  .pipe(z.number().int().positive().max(Number.MAX_SAFE_INTEGER));

export function parsePositiveInt(value) {
  const result = positiveIntSchema.safeParse(String(value ?? ""));
  if (!result.success) {
    throw new InvalidArgumentError(t("common.positiveIntegerRequired"));
  }
  return result.data;
}
