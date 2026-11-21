// Compat redirect: 1 release — /rotate was retired along with the legacy 1proxy system.
// The closest concept in the new system is forcing a sync of the free-proxy sources.
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  return new Response(null, {
    status: 308,
    headers: { Location: "/api/settings/free-proxies/sync" },
  });
}
