import type { ExecuteInput, ProviderCredentials } from "./base.ts";
import { DefaultExecutor } from "./default.ts";
import { buildErrorBody } from "../utils/error.ts";

function resolveDeploymentUrl(credentials: ProviderCredentials | null): string | null {
  const custom = credentials?.providerSpecificData?.baseUrl;
  return typeof custom === "string" && custom.trim() ? custom.trim().replace(/\/+$/, "") : null;
}

/**
 * Cerebrium has no shared endpoint: every deployment exposes its own OpenAI-compatible
 * URL ending in /run (https://api.cerebrium.ai/v4/<project-id>/<app-name>/run). The
 * connection's Base URL is therefore mandatory and is used verbatim.
 */
export class CerebriumExecutor extends DefaultExecutor {
  constructor() {
    super("cerebrium");
  }

  buildUrl(model, stream, urlIndex = 0, credentials = null) {
    return (
      resolveDeploymentUrl(credentials) ?? super.buildUrl(model, stream, urlIndex, credentials)
    );
  }

  async execute(input: ExecuteInput) {
    if (resolveDeploymentUrl(input.credentials)) return super.execute(input);

    // Fail fast with a 400 (not a provider-failure status) so a missing Base URL never
    // trips the connection cooldown or the provider circuit breaker.
    return {
      response: new Response(
        JSON.stringify(
          buildErrorBody(
            400,
            "Cerebrium requires a Base URL: set it to your deployment's /run endpoint."
          )
        ),
        { status: 400, headers: { "Content-Type": "application/json" } }
      ),
      url: "",
      headers: {},
      transformedBody: input.body,
    };
  }
}

export default CerebriumExecutor;
