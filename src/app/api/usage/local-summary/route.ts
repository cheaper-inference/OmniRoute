import { NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getProviderConnectionById } from "@/lib/db/providers";
import { getConnectionLocalUsage } from "@/lib/db/connectionLocalUsage";
import { errorResponse } from "@omniroute/open-sse/utils/error";

const connectionIdSchema = z
  .string()
  .min(1)
  .max(128)
  .regex(/^[a-zA-Z0-9_-]+$/);

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const parsed = connectionIdSchema.safeParse(
    new URL(request.url).searchParams.get("connectionId")
  );
  if (!parsed.success) return errorResponse(400, "Invalid connection ID");
  try {
    const connection = await getProviderConnectionById(parsed.data);
    if (!connection || connection.provider !== "chatgpt")
      return errorResponse(404, "ChatGPT connection not found");
    // The row was looked up by this id and is a ChatGPT connection (checked above).
    return NextResponse.json(getConnectionLocalUsage(parsed.data, "chatgpt"), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return errorResponse(500, "Local usage history is temporarily unavailable");
  }
}
