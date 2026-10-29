/** Compatibility entry point; model authority and response identity are engine contracts. */
export {
  checkResolvedModelPermission,
  hasApiKeyModelRestrictions,
  isLocalModelPolicyResponse,
  markLocalModelPolicyResponse,
  type ModelAccessMetadata,
  type ResolvedModelPermission,
} from "@omniroute/open-sse/services/resolvedModelAccess.ts";
