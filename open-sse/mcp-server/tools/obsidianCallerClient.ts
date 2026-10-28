import { getObsidianConfigForApiKey } from "../../../src/lib/db/obsidian.ts";
import { createObsidianClient } from "../../../src/lib/obsidian/api.ts";
import {
  getMcpHttpAuthHeadersForInternalFetch,
  hasMcpHttpAuthContext,
} from "../httpAuthContext.ts";
import { resolveMcpCallerApiKeyId, resolvePrincipalFromHeaders } from "../mcpCallerIdentity.ts";

type CallerExtra = { authInfo?: { clientId?: string } };

async function resolveObsidianCaller(extra?: CallerExtra): Promise<string | undefined> {
  const id = extra?.authInfo?.clientId?.trim();
  if (id && id !== "anonymous" && id !== "env-key") return id;

  // A placeholder is not a principal. Resolve actual credentials instead;
  // legitimate environment credentials may themselves resolve to "env-key".
  // HTTP callers must never borrow the server's stdio environment identity.
  if (hasMcpHttpAuthContext()) {
    return resolvePrincipalFromHeaders(getMcpHttpAuthHeadersForInternalFetch());
  }
  return resolveMcpCallerApiKeyId();
}

/** Non-sync vault access requires a resolved caller before reading credentials. */
export async function getObsidianCallerClient(extra?: CallerExtra) {
  const id = await resolveObsidianCaller(extra).catch(() => undefined);
  if (!id || id === "anonymous") {
    throw new Error(
      "Obsidian API token not configured. Authenticate with an API key to access Obsidian."
    );
  }
  const config = getObsidianConfigForApiKey(id);
  if (!config.token) {
    throw new Error(
      "Obsidian API token not configured. Set it in Settings > Context Sources or in your API key's context source settings."
    );
  }
  return createObsidianClient(config.token, config.baseUrl);
}
