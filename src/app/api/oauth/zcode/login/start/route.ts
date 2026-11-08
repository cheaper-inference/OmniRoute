import { NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  startZcodeLogin,
  zcodeRequestOwner,
  ZcodeSessionLimitError,
} from "@/lib/oauth/services/zcodeLogin";
import { isEncryptionEnabled } from "@/lib/db/encryption";
import { getProviderConnectionById } from "@/models";

const schema = z.object({
  family: z.enum(["zai", "bigmodel"]),
  connectionId: z.string().uuid().optional(),
});

async function isValidReauthorizationTarget(connectionId: string, family: string) {
  const connection = await getProviderConnectionById(connectionId);
  const data = connection?.providerSpecificData;
  const account =
    data && typeof data === "object" && !Array.isArray(data)
      ? (data as Record<string, unknown>)
      : null;
  return Boolean(
    connection &&
    connection.provider === "zcode" &&
    connection.authType === "oauth" &&
    account?.family === family &&
    typeof account.userId === "string"
  );
}

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
    if (
      parsed.data.connectionId &&
      !(await isValidReauthorizationTarget(parsed.data.connectionId, parsed.data.family))
    ) {
      return NextResponse.json(
        { error: "Invalid Z-code account for reauthorization" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      await startZcodeLogin(
        parsed.data.family,
        zcodeRequestOwner(request),
        parsed.data.connectionId
      ),
      {
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (error) {
    if (error instanceof ZcodeSessionLimitError)
      return NextResponse.json({ error: "Too many login sessions" }, { status: 429 });
    return NextResponse.json({ error: "Failed to start Z-code login" }, { status: 502 });
  }
}
