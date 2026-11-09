import { z } from "zod";

/**
 * Selective provider-account transfer (Settings → Storage → Selective transfer).
 *
 * The file is a small cleartext header plus one passphrase-sealed payload: the
 * accounts' credentials, OAuth tokens, session cookies and provider-specific
 * data are never written in plaintext. Server-side sealing lives in
 * `src/lib/transfer/sealedPayload.ts`; these schemas stay free of server-only
 * imports so the dashboard can share the format constants.
 */
export const PROVIDER_TRANSFER_FORMAT = "omniroute-provider-transfer";
export const PROVIDER_TRANSFER_VERSION = 1;
export const PROVIDER_TRANSFER_ACTIONS = ["add", "skip", "replace"] as const;
export const MAX_TRANSFER_CONNECTIONS = 1000;
export const MIN_TRANSFER_PASSPHRASE_LENGTH = 12;
const MAX_PASSPHRASE_LENGTH = 1024;
const MIN_SCRYPT_N = 2 ** 14;
const MAX_SCRYPT_N = 2 ** 16;
/** Base64 of the sealed payload; ~15 MB of ciphertext is far above any real account list. */
const MAX_SEALED_DATA_CHARS = 20 * 1024 * 1024;

export type ProviderTransferAction = (typeof PROVIDER_TRANSFER_ACTIONS)[number];

const base64 = z.string().regex(/^[A-Za-z0-9+/]+={0,2}$/, "must be base64");

export const sealedEnvelopeSchema = z.object({
  alg: z.literal("aes-256-gcm"),
  kdf: z.literal("scrypt"),
  n: z
    .number()
    .int()
    .min(MIN_SCRYPT_N)
    .max(MAX_SCRYPT_N)
    .refine((value) => (value & (value - 1)) === 0, "must be a power of two"),
  r: z.literal(8),
  p: z.literal(1),
  salt: base64.min(20).max(64),
  iv: base64.min(16).max(24),
  tag: base64.min(20).max(32),
  data: base64.min(4).max(MAX_SEALED_DATA_CHARS),
});

export type SealedEnvelope = z.infer<typeof sealedEnvelopeSchema>;

export const providerTransferBundleSchema = z.object({
  format: z.literal(PROVIDER_TRANSFER_FORMAT),
  version: z.literal(PROVIDER_TRANSFER_VERSION),
  exportedAt: z.string().max(64).optional(),
  summary: z
    .object({
      providerConnections: z.number().int().min(0).max(MAX_TRANSFER_CONNECTIONS),
      providerNodes: z.number().int().min(0).max(MAX_TRANSFER_CONNECTIONS),
    })
    .optional(),
  sealed: sealedEnvelopeSchema,
});

export type ProviderTransferBundle = z.infer<typeof providerTransferBundleSchema>;

const passphrase = z.string().min(1, "Passphrase is required").max(MAX_PASSPHRASE_LENGTH);

export const providerTransferExportSchema = z.object({
  connectionIds: z
    .array(z.string().trim().min(1).max(200))
    .min(1, "Select at least one provider account")
    .max(MAX_TRANSFER_CONNECTIONS),
  passphrase: z
    .string()
    .min(
      MIN_TRANSFER_PASSPHRASE_LENGTH,
      `Passphrase must be at least ${MIN_TRANSFER_PASSPHRASE_LENGTH} characters`
    )
    .max(MAX_PASSPHRASE_LENGTH),
  // The operator must explicitly accept that the file carries live credentials.
  acknowledgeCredentialExport: z.literal(true),
});

export const providerTransferPreviewSchema = z.object({
  bundle: providerTransferBundleSchema,
  passphrase,
});

export const providerTransferImportSchema = z.object({
  bundle: providerTransferBundleSchema,
  passphrase,
  decisions: z
    .record(z.string().min(1).max(300), z.enum(PROVIDER_TRANSFER_ACTIONS))
    .refine(
      (value) => Object.keys(value).length <= MAX_TRANSFER_CONNECTIONS * 2,
      "Too many decisions"
    )
    .default({}),
});
