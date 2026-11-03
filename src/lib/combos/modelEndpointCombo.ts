import { handleComboChat } from "@omniroute/open-sse/services/combo.ts";
import type { ComboLike, ResolvedComboTarget } from "@omniroute/open-sse/services/combo/types.ts";
import {
  narrowMediaConnectionScope,
  pinnedConnectionIds,
} from "@omniroute/open-sse/services/mediaComboFallback.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { getComboByName, getCombos } from "@/lib/db/combos";
import { createComboTargetKeyGate } from "@/sse/services/keyConnectionScope";
import * as log from "@/sse/utils/logger";
import type { ApiKeyPolicyResult } from "@/shared/utils/apiKeyPolicy";
import type { ComboEndpoint } from "@/shared/constants/comboEndpoints";

interface ModelEndpointComboOptions {
  name: string;
  endpoint: ComboEndpoint;
  request: Request;
  body: Record<string, unknown>;
  policy: ApiKeyPolicyResult;
  allowedConnections: string[] | null;
  settings?: Record<string, unknown>;
  dispatch: (
    body: Record<string, unknown>,
    allowedConnections: string[] | null,
    target: ResolvedComboTarget
  ) => Promise<Response>;
}

function asCombo(record: Record<string, unknown>): ComboLike {
  return {
    ...record,
    name: String(record.name || ""),
    models: Array.isArray(record.models) ? record.models : [],
  };
}

export async function runModelEndpointCombo(options: ModelEndpointComboOptions): Promise<Response> {
  try {
    const record = await getComboByName(options.name);
    if (!record) return errorResponse(404, "Unknown routing combo");
    if (record.isActive === false) return errorResponse(400, "Routing combo is inactive");
    return await handleComboChat({
      body: { ...options.body, model: options.name, stream: false },
      combo: asCombo(record),
      endpointCapability: options.endpoint,
      allCombos: (await getCombos()).map(asCombo),
      settings: options.settings,
      log,
      signal: options.request.signal,
      apiKeyAllowedConnections: options.allowedConnections,
      isModelAvailable: createComboTargetKeyGate(options.policy, options.name),
      handleSingleModel: async (routedBody, model, target) => {
        if (options.request.signal.aborted) return errorResponse(499, "Request aborted");
        if (!target || !("modelStr" in target)) {
          return errorResponse(400, "Invalid capability combo target");
        }
        return options.dispatch(
          { ...routedBody, model },
          narrowMediaConnectionScope(options.allowedConnections, pinnedConnectionIds(target)),
          target
        );
      },
    });
  } catch (error) {
    log.error("CAPABILITY_COMBO", "Failed to resolve endpoint combo", error);
    return errorResponse(500, "Failed to resolve endpoint combo");
  }
}
