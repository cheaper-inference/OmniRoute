import { z } from "zod";
import { rosebudConnection, recordRosebudJob, generateRosebud } from "@/lib/rosebud/provider";
import { rosebudRuntime, type RosebudJob } from "../../../services/rosebud/runtime.ts";
import { RosebudError } from "../../../services/rosebud/cli.ts";

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

export async function handleRosebudImageGeneration(options: {
  body: unknown;
  credentials?: { connectionId?: string } | null;
  peerLocality?: string | null;
  signal?: AbortSignal | null;
}) {
  if (!["loopback", "lan"].includes(options.peerLocality || "")) {
    return {
      success: false as const,
      status: 403,
      error: "Rosebud CLI requires a trusted local or LAN caller",
    };
  }
  let job: RosebudJob | undefined;
  try {
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
    if (!selected || selected.category !== "image")
      throw new RosebudError("not_an_image_model", 400);
    const defaultFormat = selected.inputs?.find((field) => field.name === "output_format")?.default;
    if (
      typeof defaultFormat === "string" &&
      !input.output_format &&
      !["png", "jpg", "jpeg", "webp"].includes(defaultFormat)
    )
      throw new RosebudError("explicit_raster_format_required", 400);
    if (
      !selected.output_formats.some((format) => ["png", "jpg", "jpeg", "webp"].includes(format)) ||
      (typeof input.output_format === "string" &&
        !["png", "jpg", "jpeg", "webp"].includes(input.output_format))
    ) {
      throw new RosebudError("use_asset_tool_for_non_raster_output", 400);
    }
    if (options.signal?.aborted) throw new RosebudError("request_cancelled", 408);
    job = await generateRosebud(id, profile, {
      model: body.model,
      input,
      idempotencyKey: body.idempotency_key,
    });
    recordRosebudJob(id, job);
    const deadline = Date.now() + 600000;
    while (!["succeeded", "failed", "cancelled"].includes(job.status)) {
      if (
        options.signal?.aborted ||
        Date.now() > deadline ||
        ["submitting", "uncertain"].includes(job.status)
      ) {
        return {
          success: false as const,
          status: 409,
          rosebudUsage: {
            job_id: job.id,
            status: job.status,
            unit: "rosebud_credits",
            consumed: job.actualCredits,
          },
          error: `Rosebud job ${job.id} continues; retrieve it with rosebud_asset_status`,
        };
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      job = await rosebudRuntime.refresh(profile, job.id);
      recordRosebudJob(id, job);
    }
    if (job.status !== "succeeded") throw new RosebudError("generation_failed", 502);
    const artifact = await rosebudRuntime.artifact(profile, job.id);
    const data = artifact.data;
    const raster =
      data.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) ||
      data.subarray(0, 3).equals(Buffer.from([255, 216, 255])) ||
      (data.toString("ascii", 0, 4) === "RIFF" && data.toString("ascii", 8, 12) === "WEBP");
    if (!raster) throw new RosebudError("use_asset_tool_for_non_raster_output", 400);
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
  } catch (error) {
    return {
      success: false as const,
      status:
        job && !(error instanceof z.ZodError)
          ? 409
          : error instanceof z.ZodError
            ? 400
            : error instanceof RosebudError
              ? error.status
              : 502,
      error: error instanceof RosebudError ? error.code : "Rosebud image request failed",
      rosebudUsage: job
        ? {
            job_id: job.id,
            status: job.status,
            unit: "rosebud_credits",
            consumed: job.actualCredits,
          }
        : error instanceof RosebudError && error.jobId
          ? { job_id: error.jobId, unit: "rosebud_credits" }
          : undefined,
    };
  }
}
