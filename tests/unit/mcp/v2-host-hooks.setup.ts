/**
 * Registers the real host implementations for the MCP v2 sidecar.
 *
 * Production registers these from src/app/api/mcp/v2/route.ts. The v2 specs
 * call createMcpServerV2() directly and never load that route, so without this
 * setup they would run against the no-op defaults in open-sse.
 */

import { registerMcpV2HostHooks } from "@omniroute/open-sse/mcp-server/v2/hostHooks";
import { isMcpScopeEnforcementEnabled } from "@/shared/utils/featureFlags";
import { getComboModelProvider, getComboModelString, getComboStepTarget } from "@/lib/combos/steps";
import { normalizeQuotaResponse } from "@/shared/contracts/quota";

registerMcpV2HostHooks({
  isScopeEnforcementEnabled: isMcpScopeEnforcementEnabled,
  getComboModelProvider,
  getComboModelString,
  getComboStepTarget,
  normalizeQuotaResponse: (raw, filters) => normalizeQuotaResponse(raw, filters),
});
