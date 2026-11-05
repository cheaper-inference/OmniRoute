import { errorResponse, buildErrorBody } from "@omniroute/open-sse/utils/error.ts";
import { scopedRosebudKey } from "@omniroute/open-sse/services/rosebud/imageBinding.ts";
import {
  rosebudPublishInput,
  rosebudPublish,
} from "@omniroute/open-sse/services/rosebud/publishing.ts";
import { z } from "zod";
import { requireRosebudAccess, rosebudCallerScope } from "@/lib/rosebud/authorization";
import {
  connectRosebud,
  generateRosebud,
  rosebudAccount,
  discoverRosebud,
  rosebudConnection,
  recordRosebudJob,
  publicRosebudJob,
} from "@/lib/rosebud/provider";
import {
  rosebudRuntime,
  generationInput,
  type RosebudJob,
} from "@omniroute/open-sse/services/rosebud/runtime.ts";
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

type ActionContext = {
  request: Request;
  args: z.infer<typeof requestSchema>;
  connectionId: string;
  profile: string;
};
type RosebudAction = (context: ActionContext) => Promise<Response | null>;
type GameAction = "publish" | "update" | "game_status" | "pull";

async function authorizeAction({ connectionId, profile }: ActionContext) {
  const result = await runRosebud(profile, [
    "login",
    "--agent-client",
    "other",
    "--name",
    "OmniRoute Rosebud",
  ]);
  return Response.json({ connectionId, status: result.status, approval_url: result.approval_url });
}

const gameAction =
  (action: GameAction): RosebudAction =>
  async ({ args, profile }) =>
    args.game
      ? Response.json(await rosebudPublish(profile, action, args.game))
      : errorResponse(400, "game request required");

async function generateAction({ request, args, connectionId, profile }: ActionContext) {
  if (!args.request) return null;
  const generation = { ...args.request };
  if (generation.idempotencyKey)
    generation.idempotencyKey = scopedRosebudKey(
      await rosebudCallerScope(request),
      generation.idempotencyKey
    );
  const job = await generateRosebud(connectionId, profile, generation);
  recordRosebudJob(connectionId, job);
  return Response.json(publicRosebudJob(job), { status: job.status === "succeeded" ? 200 : 202 });
}

const jobAction =
  (load: (profile: string, jobId: string) => Promise<RosebudJob>): RosebudAction =>
  async ({ args, connectionId, profile }) => {
    if (!args.jobId) return null;
    const job = await load(profile, args.jobId);
    recordRosebudJob(connectionId, job);
    return Response.json(publicRosebudJob(job));
  };

async function downloadAction({ args, profile }: ActionContext) {
  if (args.assetId) return Response.json(await rosebudRuntime.downloadAsset(profile, args.assetId));
  if (!args.jobId) return null;
  const result = await rosebudRuntime.artifact(profile, args.jobId);
  return Response.json({
    ...publicRosebudJob(result.job),
    b64_data: result.data.toString("base64"),
    mime_type: result.mime,
    sha256: result.sha256,
  });
}

/** Available before an account is active, so that it can be authorized and checked. */
const SETUP_ACTIONS = new Map<string, RosebudAction>([
  ["authorize", authorizeAction],
  ["account", async ({ connectionId }) => Response.json(await rosebudAccount(connectionId))],
]);

/** Require an active account. A null result means the request lacked this action's input. */
const ACTIVE_ACTIONS = new Map<string, RosebudAction>([
  ["publish", gameAction("publish")],
  ["update", gameAction("update")],
  ["game_status", gameAction("game_status")],
  ["pull", gameAction("pull")],
  ["models", async ({ connectionId }) => Response.json(await discoverRosebud(connectionId))],
  [
    "quote",
    async ({ args, profile }) =>
      args.request
        ? Response.json(await rosebudRuntime.quote(profile, args.request.model, args.request.input))
        : null,
  ],
  ["list", async ({ profile }) => Response.json(await rosebudRuntime.list(profile))],
  ["generate", generateAction],
  ["status", jobAction((profile, jobId) => rosebudRuntime.refresh(profile, jobId))],
  ["recover", jobAction((profile, jobId) => rosebudRuntime.recover(profile, jobId))],
  ["download", downloadAction],
]);

function failureResponse(error: unknown) {
  const status =
    error instanceof z.ZodError ? 400 : error instanceof RosebudError ? error.status : 502;
  return Response.json(
    {
      ...buildErrorBody(
        status,
        error instanceof RosebudError
          ? error.code
          : "Invalid Rosebud request or provider unavailable"
      ),
      ...(error instanceof RosebudError && error.jobId ? { jobId: error.jobId } : {}),
    },
    { status }
  );
}

/** Run one explicit Rosebud account, asset or publishing operation for a local caller. */
export async function POST(request: Request, context: { params: Promise<{ action: string }> }) {
  try {
    const parsed = requestSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) throw parsed.error;
    const args = parsed.data;
    const denied = await requireRosebudAccess(request, args.connectionId);
    if (denied) return denied;
    const { action } = await context.params;
    if (action === "connect")
      return Response.json(await connectRosebud(args.name || "OmniRoute Rosebud"));
    if (!args.connectionId) return errorResponse(400, "connectionId required");
    const { connection, profile } = await rosebudConnection(args.connectionId);
    const actionContext = { request, args, connectionId: args.connectionId, profile };
    const setup = SETUP_ACTIONS.get(action);
    if (setup) return (await setup(actionContext)) as Response;
    if (!connection.isActive) throw new RosebudError("account_not_active", 401);
    const response = await ACTIVE_ACTIONS.get(action)?.(actionContext);
    return response ?? errorResponse(400, "Unsupported Rosebud operation");
  } catch (error) {
    return failureResponse(error);
  }
}
