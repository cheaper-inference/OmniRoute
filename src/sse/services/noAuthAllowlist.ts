/**
 * #9057 gate for the synthetic keyless connection — implemented next to the
 * synthetic id in the engine so `open-sse/services/comboKeyScope.ts` can use it
 * without importing the app; re-exported here for the app callers.
 */
export { allowlistPermitsSyntheticNoAuth } from "@omniroute/open-sse/services/autoCombo/resilienceCandidateFilter.ts";
