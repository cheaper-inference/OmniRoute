import { NextResponse } from "next/server";
import { z } from "zod";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { getRepriceState, isRepriceJobEnabled, runRepriceJob } from "@/lib/usage/repriceLedger";

/**
 * Resumable repricing of never-priced cost-ledger rows (bifrost-12). Opt-in: with
 * OMNIROUTE_USAGE_REPRICE_JOB_ENABLED unset the route answers 404, as if it did not exist.
 *
 * GET  /api/usage/reprice — the stored cursor and running totals.
 * POST /api/usage/reprice — run up to `maxBatches` batches from the stored cursor; call again
 *                           while `done` is false. `restart: true` starts from the oldest row.
 */
const repriceBodySchema = z
  .object({
    batchSize: z.coerce.number().int().min(1).max(1000).optional(),
    maxBatches: z.coerce.number().int().min(1).max(100).optional(),
    restart: z.boolean().optional(),
  })
  .strict();

const notFound = () => NextResponse.json(buildErrorBody(404, "Not found"), { status: 404 });

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  if (!isRepriceJobEnabled()) return notFound();
  try {
    return NextResponse.json(getRepriceState());
  } catch (error) {
    console.error("Error reading reprice state:", error);
    return NextResponse.json(buildErrorBody(500, "Failed to read reprice state"), {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  if (!isRepriceJobEnabled()) return notFound();

  // Every option has a default, so the body is optional: an empty body runs with the defaults.
  let rawBody: unknown;
  try {
    const text = await request.text();
    rawBody = text.trim() === "" ? {} : JSON.parse(text);
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }
  const validation = validateBody(repriceBodySchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }
  try {
    return NextResponse.json(await runRepriceJob(validation.data));
  } catch (error) {
    console.error("Error running reprice job:", error);
    return NextResponse.json(buildErrorBody(500, "Failed to run reprice job"), { status: 500 });
  }
}
