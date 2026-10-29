import { hasMcpHttpAuthContext, getMcpHttpPeerLocality } from "../httpAuthContext.ts";
import { z } from "zod";
import { rosebudPublishInput } from "../../services/rosebud/publishing.ts";
import { omniRouteFetch } from "../internalFetch.ts";

const account = z.object({ connectionId: z.string().uuid() });
const request = account.extend({
  model: z.string(),
  input: z.record(z.string(), z.unknown()),
  idempotencyKey: z.string().min(1).max(200).optional(),
  maxCredits: z.number().int().nonnegative().optional(),
});
const job = account.extend({ jobId: z.string().regex(/^[a-f0-9]{64}$/) });
function tool(name: string, action: string, description: string, schema: z.ZodType) {
  return {
    name,
    description,
    scopes: ["manage"],
    inputSchema: schema,
    handler: async (raw: unknown) => {
      if (
        hasMcpHttpAuthContext() &&
        !["loopback", "lan"].includes(getMcpHttpPeerLocality() || "")
      ) {
        throw new Error("Rosebud CLI requires a trusted local or LAN caller");
      }
      const args = schema.parse(raw) as Record<string, unknown>;
      const { connectionId, jobId, assetId, game, ...generation } = args;
      return omniRouteFetch("/api/rosebud/" + action, {
        method: "POST",
        body: JSON.stringify({
          connectionId,
          ...(jobId ? { jobId } : {}),
          ...(assetId ? { assetId } : {}),
          ...(game ? { game } : {}),
          ...(["generate", "quote"].includes(action) ? { request: generation } : {}),
        }),
        signal: AbortSignal.timeout(180000),
      });
    },
  };
}
export const rosebudTools = [
  tool(
    "rosebud_models",
    "models",
    "Discover official Rosebud models, input schemas, native credit prices and licenses.",
    account
  ),
  tool(
    "rosebud_account",
    "account",
    "Read Rosebud authorization, available credits and native-credit generation history.",
    account
  ),
  tool(
    "rosebud_quote",
    "quote",
    "Quote a Rosebud asset in native credits without generating it.",
    request
  ),
  ...["image", "sprite", "skybox", "3d_model", "sound", "music", "video", "speech"].map(
    (category) =>
      tool(
        "rosebud_generate_" + category,
        "generate",
        "Generate a Rosebud " +
          category +
          ". Choose a matching model and its exact input schema; use a stable idempotencyKey for retries.",
        request.extend({
          category: z
            .literal(
              category === "sprite"
                ? "image"
                : category === "3d_model"
                  ? "model_3d"
                  : category === "sound"
                    ? "sound_effect"
                    : category
            )
            .default(
              category === "sprite"
                ? "image"
                : category === "3d_model"
                  ? "model_3d"
                  : category === "sound"
                    ? "sound_effect"
                    : category
            ),
        })
      )
  ),
  ...["publish", "update", "game_status", "pull"].map((action) =>
    tool(
      "rosebud_" +
        (action === "publish" ? "publish_game" : action === "update" ? "update_game" : action),
      action,
      "Explicit Rosebud game " +
        action +
        "; separate from asset generation. Preserve the returned gameId for subsequent operations.",
      account.extend({ game: rosebudPublishInput })
    )
  ),
  tool(
    "rosebud_recover_asset",
    "recover",
    "Resume the identical uncertain generation without creating a new paid job.",
    job
  ),
  tool(
    "rosebud_asset_status",
    "status",
    "Recover an existing Rosebud generation job without creating another paid job.",
    job
  ),
  tool("rosebud_list_assets", "list", "List this Rosebud account's generated assets.", account),
  tool(
    "rosebud_download_asset",
    "download",
    "Retrieve a completed OmniRoute Rosebud job artifact as Base64.",
    account.extend({
      jobId: z
        .string()
        .regex(/^[a-f0-9]{64}$/)
        .optional(),
      assetId: z.string().uuid().optional(),
    })
  ),
];
