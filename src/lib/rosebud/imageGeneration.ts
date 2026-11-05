import { z } from "zod";
import { rosebudConnection, recordRosebudJob, generateRosebud } from "@/lib/rosebud/provider";
import { isRasterImage } from "@omniroute/open-sse/services/rosebud/artifact.ts";
import type { RosebudModel } from "@omniroute/open-sse/services/rosebud/catalog.ts";
import { RosebudError } from "@omniroute/open-sse/services/rosebud/cli.ts";
import { rosebudRuntime, type RosebudJob } from "@omniroute/open-sse/services/rosebud/runtime.ts";

const imageRequest = z
  .object({
    model: z.string(),
    prompt: z.string().optional(),
    n: z.literal(1).optional(),
    response_format: z.literal("b64_json").optional(),
    rosebud_inputs: z.record(z.string(), z.unknown()).optional(),
    idempotency_key: z.string().min(1).max(200).optional(),
  })
  .strict();

type ImageOptions = {
  body: unknown;
  credentials?: { connectionId?: string } | null;
  peerLocality?: string | null;
  signal?: AbortSignal | null;
};

const RASTER_FORMATS = new Set(["png", "jpg", "jpeg", "webp"]);
const isRasterFormat = (format: string) => RASTER_FORMATS.has(format);

/** Refuse requests whose result could not be returned as an OpenAI-style raster image. */
function assertRasterRequest(model: RosebudModel, input: Record<string, unknown>) {
  const format = input.output_format;
  const defaultFormat = model.inputs?.find((field) => field.name === "output_format")?.default;
  const defaultIsUnsafe = typeof defaultFormat === "string" && !isRasterFormat(defaultFormat);
  if (!format && (model.output_formats.some((item) => !isRasterFormat(item)) || defaultIsUnsafe))
    throw new RosebudError("explicit_raster_format_required", 400);
  if (
    !model.output_formats.some(isRasterFormat) ||
    (typeof format === "string" && !isRasterFormat(format))
  )
    throw new RosebudError("use_asset_tool_for_non_raster_output", 400);
}

/** Validate everything that can fail before a paid submission is possible. */
async function prepareImageRequest(options: ImageOptions) {
  if (options.signal?.aborted) throw new RosebudError("request_cancelled", 408);
  const body = imageRequest.parse(options.body);
  const id = options.credentials?.connectionId;
  if (!id) throw new RosebudError("connection_required", 401);
  const { connection, profile } = await rosebudConnection(id);
  if (!connection.isActive) throw new RosebudError("account_not_active", 401);
  const input: Record<string, unknown> = {
    ...body.rosebud_inputs,
    ...(body.prompt !== undefined ? { prompt: body.prompt } : {}),
  };
  const catalog = await rosebudRuntime.models(profile);
  const selected = catalog.find((model) => model.id === body.model.replace(/^rosebud\//, ""));
  if (!selected || selected.category !== "image") throw new RosebudError("not_an_image_model", 400);
  assertRasterRequest(selected, input);
  if (options.signal?.aborted) throw new RosebudError("request_cancelled", 408);
  return {
    id,
    profile,
    request: { model: body.model, input, idempotencyKey: body.idempotency_key },
  };
}

const continuingResult = (job: RosebudJob) => ({
  success: false as const,
  status: 422,
  rosebudUsage: {
    job_id: job.id,
    status: job.status,
    unit: "rosebud_credits",
    consumed: job.actualCredits,
  },
  error: `Rosebud job ${job.id} continues; retrieve it with rosebud_asset_status`,
});

/** Poll until the job ends; a job that outlives this request is reported, never resubmitted. */
async function waitForJob(
  id: string,
  profile: string,
  tracker: { job?: RosebudJob },
  signal?: AbortSignal | null
) {
  const deadline = Date.now() + 600000;
  let pollDelay = 1000;
  let job = tracker.job as RosebudJob;
  while (!["succeeded", "failed", "cancelled"].includes(job.status)) {
    if (
      signal?.aborted ||
      Date.now() > deadline ||
      ["submitting", "uncertain"].includes(job.status)
    )
      return continuingResult(job);
    await new Promise((resolve) => setTimeout(resolve, pollDelay));
    pollDelay = Math.min(10000, Math.ceil(pollDelay * 1.5));
    job = await rosebudRuntime.refresh(profile, job.id);
    tracker.job = job;
    recordRosebudJob(id, job);
  }
  return null;
}

/** Fetch a finished job's artifact and shape it as an image generation response. */
async function imageResult(profile: string, job: RosebudJob) {
  if (job.status !== "succeeded") throw new RosebudError("generation_failed", 502);
  const { data } = await rosebudRuntime.artifact(profile, job.id);
  if (!isRasterImage(data)) throw new RosebudError("use_asset_tool_for_non_raster_output", 400);
  return {
    success: true as const,
    data: {
      created: Math.floor(Date.now() / 1000),
      data: [{ b64_json: data.toString("base64") }],
      rosebud_usage: {
        job_id: job.id,
        unit: "rosebud_credits",
        estimated: job.estimatedCredits,
        consumed: job.actualCredits,
        refunded: job.refundedCredits,
        usd_cost: null,
      },
    },
  };
}

const uncertainJobId = (error: unknown) =>
  error instanceof RosebudError && error.uncertain ? error.jobId : undefined;

function failureStatus(error: unknown, job?: RosebudJob) {
  if (error instanceof z.ZodError) return 400;
  if (job || uncertainJobId(error)) return 422;
  return error instanceof RosebudError ? error.status : 502;
}

function failureUsage(error: unknown, job?: RosebudJob) {
  if (job)
    return {
      job_id: job.id,
      status: job.status,
      unit: "rosebud_credits",
      consumed: job.actualCredits,
    };
  const jobId = uncertainJobId(error);
  return jobId ? { job_id: jobId, unit: "rosebud_credits" } : undefined;
}

/**
 * Run one Rosebud image request. `handleImageGeneration` receives this function from the one
 * route that serves Rosebud, because it spawns the CLI and needs the app's connection state.
 */
export async function handleRosebudImageGeneration(options: ImageOptions) {
  if (!["loopback", "lan"].includes(options.peerLocality || "")) {
    return {
      success: false as const,
      status: 403,
      error: "Rosebud CLI requires a trusted local or LAN caller",
    };
  }
  const tracker: { job?: RosebudJob } = {};
  try {
    const { id, profile, request } = await prepareImageRequest(options);
    tracker.job = await generateRosebud(id, profile, request, options.signal);
    recordRosebudJob(id, tracker.job);
    const continuing = await waitForJob(id, profile, tracker, options.signal);
    return continuing ?? (await imageResult(profile, tracker.job));
  } catch (error) {
    return {
      success: false as const,
      status: failureStatus(error, tracker.job),
      error: error instanceof RosebudError ? error.code : "Rosebud image request failed",
      rosebudUsage: failureUsage(error, tracker.job),
    };
  }
}
