import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

/**
 * Management auth for the CLI tool routes. Routes that write the operator's host CLI
 * config pass `alwaysRequireAuth`, so they stay authenticated with login disabled.
 */
export async function requireCliToolsAuth(
  request: Request,
  options: { alwaysRequireAuth?: boolean } = {}
): Promise<Response | null> {
  return requireManagementAuth(request, options);
}
