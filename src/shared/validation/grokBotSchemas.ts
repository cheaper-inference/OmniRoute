import { z } from "zod";

// Preserve wire strings verbatim (especially secret values); only test emptiness.
const id = z.string().min(1);
const text = z.string().refine((value) => value.trim().length > 0);
const entry = { agentId: id, entryId: id };
const resolutionRequest = { agentId: id, entryId: z.string().default(""), requestId: id };

export const grokBotConnectorSchema = z.object({
  ...resolutionRequest,
  resolution: z.enum([
    "allowed",
    "skipped",
    "always_this_bot",
    "always_all_team_bots",
    "allow_in_channel",
  ]),
});
export const grokBotPermissionSchema = z.object({
  ...resolutionRequest,
  resolution: z.enum(["allow_once", "deny", "always", "never"]),
});
export const grokBotDraftSchema = z.object(entry);
export const grokBotSecretSchema = z.object({ ...entry, value: text });
export const grokBotSendSchema = z.object({ agentId: id, messageId: id, text });
export const grokBotWidgetSchema = z.union([
  z.object({ ...entry, dismiss: z.literal(true), value: z.string().optional() }),
  z.object({ ...entry, dismiss: z.literal(false).optional(), value: text }),
]);

const profile = z.union([
  z.string(),
  z.object({ name: z.string().optional(), description: z.string().optional() }),
]);
const skill = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  content: z.string().optional(),
});
const routine = z.object({ id: z.string().optional(), enabled: z.boolean().optional() });

// Domain helpers retain action-specific required-field errors. Validate the
// envelope here so malformed JSON can never fall back to creating an agent.
export const grokBotAgentSchema = z.object({
  action: z
    .enum([
      "create",
      "recreate",
      "put-memory",
      "add-skill",
      "update-skill",
      "remove-skill",
      "set-routine",
      "remove-routine",
    ])
    .default("create"),
  profile: profile.optional(),
  skill: skill.optional(),
  routine: routine.optional(),
});
