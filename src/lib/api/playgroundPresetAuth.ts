import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { extractApiKey, isValidApiKey } from "@/sse/services/auth";
import { isRequireApiKeyEnabled } from "@/shared/utils/featureFlags";

export async function checkPlaygroundPresetAuth(
  request: Request
): Promise<"Invalid API key" | "Authentication required" | null> {
  const apiKey = extractApiKey(request);
  if (apiKey) {
    return (await isValidApiKey(apiKey)) ? null : "Invalid API key";
  }

  const requireApiKey = isRequireApiKeyEnabled();
  if (!(await requireManagementAuth(request, { alwaysRequireAuth: requireApiKey }))) return null;
  return requireApiKey ? "Authentication required" : null;
}
