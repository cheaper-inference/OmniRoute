import { posix } from "node:path";
import { NextResponse } from "next/server";
import { isConnectionUnavailableToAuxiliaryActivity } from "@/lib/exclusiveLeaseIsolation";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getProviderConnectionById } from "@/lib/db/providers";
import { grokBotAgentAccess, grokBotAccessError } from "../access";
import { grokBotComputerFile } from "../../../../../(dashboard)/dashboard/grok-bot/computerFile";
import { grokBotComputers } from "../../../../../(dashboard)/dashboard/grok-bot/computers";
import { grokBotRead } from "../../../../../(dashboard)/dashboard/grok-bot/read";

export function computerFilePathAllowed(path: string, roots: string[]): boolean {
  if (!posix.isAbsolute(path)) return false;
  const target = posix.normalize(path);
  return roots.some((root) => {
    if (!posix.isAbsolute(root)) return false;
    const base = posix.normalize(root).replace(/\/+$/, "") || "/";
    return target === base || target.startsWith(`${base}/`);
  });
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const { id } = await params;
  const connection = await getProviderConnectionById(id);
  if (!connection || connection.provider !== "grok-bot") {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  let body: { agentId?: unknown; machineId?: unknown; path?: unknown } = {};
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const agentId = typeof body.agentId === "string" ? body.agentId : "";
  const machineId = typeof body.machineId === "string" ? body.machineId : "";
  const path = typeof body.path === "string" ? body.path : "";
  if (agentId === "" || machineId === "" || path === "") {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  // Every sibling route refuses to spend the connection's token while an exclusive
  // lease holds it; reading a file from the computer is the same kind of spend.
  if (await isConnectionUnavailableToAuxiliaryActivity(id)) {
    return NextResponse.json({ error: "exclusive_lease_active" }, { status: 409 });
  }
  const access = await grokBotAgentAccess(connection, agentId);
  if ("error" in access) return grokBotAccessError(access);
  const computers = grokBotComputers(
    await grokBotRead({
      accessToken: access.accessToken,
      method: "ListGrokBotUserComputers",
      payload: {},
    })
  );
  const computer = computers.find((item) => item.machineId === machineId);
  const roots = [computer?.localRoot ?? "", computer?.terminalsFolder ?? ""].filter(Boolean);
  if (!computer || !computerFilePathAllowed(path, roots)) {
    return NextResponse.json({ error: "path_not_allowed" }, { status: 403 });
  }
  try {
    const bytes = await grokBotComputerFile({
      accessToken: access.accessToken,
      machineId,
      path,
    });
    return new NextResponse(Buffer.from(bytes), {
      headers: { "content-type": "application/octet-stream" },
    });
  } catch {
    return NextResponse.json({ error: "file_unavailable" }, { status: 502 });
  }
}
