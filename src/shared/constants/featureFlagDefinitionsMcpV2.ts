import type { FeatureFlagDefinition } from "./featureFlagTypes";

/** #15983 — kept in its own module so the definitions registry stays under the file-size cap. */
export const MCP_V2_FLAG: FeatureFlagDefinition = {
  key: "OMNIROUTE_MCP_V2",
  label: "MCP v2 Sidecar",
  description:
    "Enable the experimental 2026-07-28 spec MCP v2 sidecar (stateless, no handshake). Off by default; v1 is untouched.",
  descriptionI18nKey: "featureFlagOmnirouteMcpV2Description",
  category: "runtime",
  // Experimental surface: ships off so v1 behavior is unchanged unless an operator opts in.
  defaultValue: "false",
  type: "boolean",
  requiresRestart: true,
  warningLevel: "caution",
};
