import { NextResponse } from "next/server";
import { z } from "zod";
import {
  detectCommandType,
  processRtkText,
  resolveRtkStructuralFlag,
  rtkRenderersMayRun,
} from "@omniroute/open-sse/services/compression/engines/rtk";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { rtkConfigSchema } from "@/shared/validation/compressionConfigSchemas";

export const rtkTestSchema = z
  .object({
    text: z.string().min(1),
    command: z.string().optional(),
    config: rtkConfigSchema.optional(),
  })
  .strict();

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = validateBody(rtkTestSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const detection = detectCommandType(validation.data.text, validation.data.command);
  // The flag lookup is skipped while the structural gate is closed for this preview config.
  const structuralMayRun = rtkRenderersMayRun(validation.data.config, [{ engine: "rtk" }]);
  return NextResponse.json({
    detection,
    ...processRtkText(validation.data.text, {
      command: validation.data.command,
      config: validation.data.config,
      // Same dispatch as a real tool result: the preview must show what the pipeline would do.
      rtkStructuralRenderersEnabled: structuralMayRun && resolveRtkStructuralFlag(),
      toolResult: true,
    }),
  });
}
