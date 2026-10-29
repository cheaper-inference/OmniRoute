import { NextRequest, NextResponse } from "next/server";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { rotateScope } from "@/lib/gamification/leaderboard";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { z } from "zod";

export async function OPTIONS() {
  return handleCorsOptions();
}

/**
 * POST /api/gamification/rotate — Manually trigger leaderboard rotation
 */
export async function POST(request: NextRequest) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400, headers: CORS_HEADERS }
    );
  }
  const schema = z.object({
    scope: z.enum(["weekly", "monthly"]),
  });

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400, headers: CORS_HEADERS });
  }

  await rotateScope(parsed.data.scope);

  return NextResponse.json({ success: true, scope: parsed.data.scope }, { headers: CORS_HEADERS });
}
