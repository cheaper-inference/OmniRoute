import { z } from "zod";
import { createKeySchema } from "./keys";

// safeExtend retains createKeySchema's model-access and exclusive-lease refinements.
export const importKeySchema = createKeySchema.safeExtend({
  id: z.string().uuid().optional(),
  key: z
    .string()
    .min(32)
    .max(256)
    // Unlike bare $, the final assertion also rejects a trailing newline/line separator.
    .regex(/^sk-[A-Za-z0-9_-]+$(?![\s\S])/, {
      message: "Key must have an sk- prefix and contain only ASCII letters, digits, _ or -",
    }),
});

export type ImportKeyInput = z.output<typeof importKeySchema>;
