import { z } from "zod";
import { MAX_PROVIDER_CREDENTIAL_LENGTH } from "@/shared/validation/schemas/provider";

const m365RefreshTokenSchema = z.object({
  refreshToken: z
    .string()
    .max(MAX_PROVIDER_CREDENTIAL_LENGTH)
    .trim()
    .refine((value) => !value.startsWith("enc:v1:"))
    .transform((value) => value || undefined)
    .optional(),
});

/** Validate only an explicitly supplied M365 credential, never the stored fallback. */
export function parseM365RefreshToken(
  provider: string,
  providerSpecificData: Record<string, unknown> | null | undefined
) {
  return m365RefreshTokenSchema.safeParse(
    provider === "copilot-m365-web" ? { refreshToken: providerSpecificData?.refreshToken } : {}
  );
}
