import { NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { pollZcodeLogin, zcodeRequestOwner } from "@/lib/oauth/services/zcodeLogin";
import {
  persistZcodeConnection,
  ZcodeReauthMismatchError,
} from "@/lib/oauth/services/zcodePersistence";
import { isEncryptionEnabled } from "@/lib/db/encryption";

const schema = z.object({ sessionId: z.string().regex(/^[A-Za-z0-9_-]{43}$/) });
export async function POST(request: Request) {
  const auth = await requireManagementAuth(request, {
    invalidApiKeyStatus: 401,
    alwaysRequireAuth: true,
  });
  if (auth) return auth;
  if (!isEncryptionEnabled())
    return NextResponse.json({ error: "Storage encryption is required" }, { status: 503 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  try {
    const result = await pollZcodeLogin(
      parsed.data.sessionId,
      zcodeRequestOwner(request),
      persistZcodeConnection
    );
    return NextResponse.json(result, {
      status: result.status === "expired" ? 410 : 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    if (error instanceof ZcodeReauthMismatchError)
      return NextResponse.json(
        { error: "The signed-in account does not match this connection" },
        { status: 409 }
      );
    return NextResponse.json({ error: "Failed to complete Z-code login" }, { status: 502 });
  }
}
