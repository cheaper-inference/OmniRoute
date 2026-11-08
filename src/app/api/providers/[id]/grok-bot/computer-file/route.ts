import { posix } from "node:path";
import { NextResponse } from "next/server";
import { isConnectionUnavailableToAuxiliaryActivity } from "@/lib/exclusiveLeaseIsolation";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getProviderConnectionById } from "@/lib/db/providers";
import { grokBotAgentAccess, grokBotAccessError } from "../access";
import { grokBotComputerFile } from "../../../../../(dashboard)/dashboard/grok-bot/computerFile";
import { grokBotComputers } from "../../../../../(dashboard)/dashboard/grok-bot/computers";
import { grokBotComputerFileSchema } from "@/shared/validation/grokBotSchemas";
import { grokBotRead } from "../../../../../(dashboard)/dashboard/grok-bot/read";

export function computerFilePathAllowed(path: string, roots: string[]): boolean {
  if (path.includes("\u0000")) return false;
  // The client resolves this path on its own filesystem, where a symlink can sit in
  // front of a `..`. Normalising first folds that away and reports a path that looks
  // contained while the client walks out of it, so a parent segment is refused
  // outright instead. The client may also decode escapes or treat a backslash as a
  // separator, so the segment check runs on the literal text and on its once-decoded
  // form, split on both separators. A malformed escape is refused rather than guessed.
  const forms = [path];
  try {
    const decoded = decodeURIComponent(path);
    if (decoded !== path) forms.push(decoded);
  } catch {
    return false;
  }
  for (const form of forms) {
    const separators = form.replace(/\\/g, "/");
    if (!posix.isAbsolute(separators)) return false;
    if (separators.split("/").includes("..")) return false;
  }
  const target = posix.normalize(forms[forms.length - 1].replace(/\\/g, "/"));
  return roots.some((root) => {
    if (!posix.isAbsolute(root)) return false;
    const base = posix.normalize(root).replace(/\/+$/, "") || "/";
    return target === base || target.startsWith(`${base}/`);
  });
}

async function computersFor(accessToken: string) {
  return grokBotComputers(
    await grokBotRead({
      accessToken,
      method: "ListGrokBotUserComputers",
      payload: {},
    })
  );
}

/** Everything the client could not read comes back as one of two answers. */
function fileFailure(error: unknown): NextResponse {
  const message = error instanceof Error ? error.message : "";
  if (message === "computer file too large") {
    return NextResponse.json({ error: "file_too_large" }, { status: 413 });
  }
  return NextResponse.json({ error: "file_unavailable" }, { status: 502 });
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const { id } = await params;
  const connection = await getProviderConnectionById(id);
  if (!connection || connection.provider !== "grok-bot") {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  const parsed = grokBotComputerFileSchema.safeParse(await request.json().catch(() => undefined));
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 400 });
  const { agentId, machineId, path } = parsed.data;
  // Every sibling route refuses to spend the connection's token while an exclusive
  // lease holds it; reading a file from the computer is the same kind of spend.
  if (await isConnectionUnavailableToAuxiliaryActivity(id)) {
    return NextResponse.json({ error: "exclusive_lease_active" }, { status: 409 });
  }
  const access = await grokBotAgentAccess(connection, agentId);
  if ("error" in access) return grokBotAccessError(access);
  const computer = (await computersFor(access.accessToken)).find(
    (item) => item.machineId === machineId
  );
  const roots = [computer?.localRoot ?? "", computer?.terminalsFolder ?? ""].filter(Boolean);
  if (!computer || !computerFilePathAllowed(path, roots)) {
    return NextResponse.json({ error: "path_not_allowed" }, { status: 403 });
  }
  try {
    const bytes = await grokBotComputerFile({
      accessToken: access.accessToken,
      machineId,
      signal: request.signal,
      path,
    });
    return new NextResponse(Buffer.from(bytes), {
      headers: { "content-type": "application/octet-stream" },
    });
  } catch (error) {
    return fileFailure(error);
  }
}
