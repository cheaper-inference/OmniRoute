import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import {
  handleAuthorizedManagedCliRequest,
  requireManagedCliLocality,
} from "@/lib/cliTools/managedCliApi";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export async function GET(request: Request): Promise<Response> {
  const localityError = requireManagedCliLocality(request);
  if (localityError) return localityError;
  const authError = await requireCliToolsAuth(request, { alwaysRequireAuth: true });
  if (authError) {
    authError.headers.set("cache-control", "no-store");
    return authError;
  }
  return handleAuthorizedManagedCliRequest(request);
}

export async function POST(request: Request): Promise<Response> {
  const localityError = requireManagedCliLocality(request);
  if (localityError) return localityError;
  const authError = await requireCliToolsAuth(request, { alwaysRequireAuth: true });
  if (authError) {
    authError.headers.set("cache-control", "no-store");
    return authError;
  }
  return handleAuthorizedManagedCliRequest(request);
}
