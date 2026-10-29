import {
  rosebudPublishInput,
  rosebudPublish,
} from "@omniroute/open-sse/services/rosebud/publishing.ts";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  connectRosebud,
  generateRosebud,
  rosebudAccount,
  discoverRosebud,
  rosebudConnection,
  recordRosebudJob,
  publicRosebudJob,
} from "@/lib/rosebud/provider";
import { rosebudRuntime, generationInput } from "@omniroute/open-sse/services/rosebud/runtime.ts";
import { RosebudError } from "@omniroute/open-sse/services/rosebud/cli.ts";
import { runRosebud } from "@omniroute/open-sse/services/rosebud/cli.ts";

const requestSchema = z
  .object({
    connectionId: z.string().uuid().optional(),
    name: z.string().min(1).max(100).optional(),
    game: rosebudPublishInput.optional(),
    assetId: z.string().uuid().optional(),
    jobId: z
      .string()
      .regex(/^[a-f0-9]{64}$/)
      .optional(),
    request: generationInput.optional(),
  })
  .strict();
export async function POST(request: Request, context: { params: Promise<{ action: string }> }) {
  const denied = await requireManagementAuth(request);
  if (denied) return denied;
  try {
    const args = requestSchema.parse(await request.json());
    const { action } = await context.params;
    if (action === "connect")
      return Response.json(await connectRosebud(args.name || "OmniRoute Rosebud"));
    if (!args.connectionId)
      return Response.json({ error: "connectionId required" }, { status: 400 });
    const { connection, profile } = await rosebudConnection(args.connectionId);
    if (action === "authorize") {
      const result = await runRosebud(profile, [
        "login",
        "--agent-client",
        "other",
        "--name",
        "OmniRoute Rosebud",
      ]);
      return Response.json({
        connectionId: args.connectionId,
        status: result.status,
        approval_url: result.approval_url,
      });
    }
    if (action === "account") return Response.json(await rosebudAccount(args.connectionId));
    if (!connection.isActive) throw new RosebudError("account_not_active", 401);
    if (["publish", "update", "game_status", "pull"].includes(action)) {
      if (!args.game) return Response.json({ error: "game request required" }, { status: 400 });
      return Response.json(
        await rosebudPublish(
          profile,
          action as "publish" | "update" | "game_status" | "pull",
          args.game
        )
      );
    }
    if (action === "models") return Response.json(await discoverRosebud(args.connectionId));
    if (action === "quote" && args.request)
      return Response.json(
        await rosebudRuntime.quote(profile, args.request.model, args.request.input)
      );
    if (action === "list") return Response.json(await rosebudRuntime.list(profile));
    if (action === "generate" && args.request) {
      const job = await generateRosebud(args.connectionId, profile, args.request);
      recordRosebudJob(args.connectionId, job);
      return Response.json(publicRosebudJob(job), {
        status: job.status === "succeeded" ? 200 : 202,
      });
    }
    if (action === "status" && args.jobId) {
      const job = await rosebudRuntime.refresh(profile, args.jobId);
      recordRosebudJob(args.connectionId, job);
      return Response.json(publicRosebudJob(job));
    }
    if (action === "recover" && args.jobId) {
      const job = await rosebudRuntime.recover(profile, args.jobId);
      recordRosebudJob(args.connectionId, job);
      return Response.json(publicRosebudJob(job));
    }
    if (action === "download" && args.assetId)
      return Response.json(await rosebudRuntime.downloadAsset(profile, args.assetId));
    if (action === "download" && args.jobId) {
      const result = await rosebudRuntime.artifact(profile, args.jobId);
      return Response.json({
        ...publicRosebudJob(result.job),
        b64_data: result.data.toString("base64"),
        mime_type: result.mime,
        sha256: result.sha256,
      });
    }
    return Response.json({ error: "Unsupported Rosebud operation" }, { status: 400 });
  } catch (error) {
    return Response.json(
      {
        jobId: error instanceof RosebudError ? error.jobId : undefined,
        error:
          error instanceof RosebudError
            ? error.code
            : "Invalid Rosebud request or provider unavailable",
      },
      {
        status:
          error instanceof z.ZodError ? 400 : error instanceof RosebudError ? error.status : 502,
      }
    );
  }
}
