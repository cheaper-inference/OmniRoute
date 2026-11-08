import { z } from "zod";

const CLAIM_SEGMENT = /^[A-Za-z_][A-Za-z0-9_-]*$/;

export const oidcAdmissionClaimSchema = z
  .object({
    path: z
      .string()
      .min(1)
      .max(200)
      .refine(
        (path) =>
          path.split(".").length <= 8 &&
          path
            .split(".")
            .every(
              (part) =>
                CLAIM_SEGMENT.test(part) &&
                !["__proto__", "prototype", "constructor"].includes(part)
            ),
        "Use a dot-separated claim path of at most eight safe segments"
      ),
    values: z.array(z.string().min(1).max(200)).min(1).max(50),
  })
  .strict();

export type OidcAdmissionClaim = z.infer<typeof oidcAdmissionClaimSchema>;

export function matchesOidcAdmissionClaim(
  payload: Record<string, unknown>,
  policy: OidcAdmissionClaim
): boolean {
  let value: unknown = payload;
  for (const part of policy.path.split(".")) {
    if (!value || typeof value !== "object" || Array.isArray(value) || !Object.hasOwn(value, part))
      return false;
    value = (value as Record<string, unknown>)[part];
  }
  if (!Array.isArray(value) || !value.every((item) => typeof item === "string")) return false;
  return value.some((item) => policy.values.includes(item));
}
