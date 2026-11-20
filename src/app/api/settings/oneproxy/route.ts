// Compat redirect: 1 release — endpoints moved to /api/settings/free-proxies
// Uses a relative path in the Location header — no user input enters the destination URL.
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

function relativeRedirect(location: string): Response {
  return new Response(null, { status: 308, headers: { Location: location } });
}

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  return relativeRedirect("/api/settings/free-proxies");
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  return relativeRedirect("/api/settings/free-proxies/sync");
}

export async function DELETE(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  return relativeRedirect("/api/settings/free-proxies");
}
