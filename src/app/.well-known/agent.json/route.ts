/**
 * Agent Card Endpoint — /.well-known/agent.json
 *
 * Serves the OmniRoute A2A Agent Card for discovery by other agents.
 * Conforms to A2A Protocol v0.3.
 *
 * The Agent Card is dynamically generated to include the current version
 * from package.json and skills based on available combos.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { buildAgentCardMetadata } from "@/lib/a2a/agentCardMetadata";
import { getFleetSkills } from "@/lib/conductor/fleetSkills";
import { getBaseUrl } from "@/lib/wellKnown";

/**
 * GET /.well-known/agent.json
 *
 * Returns the OmniRoute Agent Card that describes this gateway's
 * capabilities as an A2A agent.
 */
export async function GET(request?: NextRequest) {
  // Conductor PRD RF2: fleet skills from the OmniConductor hub (cached ~60s; [] when
  // the hub is unset/offline — the card stays valid without the fleet section).
  const fleetSkills = await getFleetSkills();
  const baseUrl = getBaseUrl(request);
  const agentCard = {
    ...buildAgentCardMetadata(baseUrl, fleetSkills),
    authentication: {
      schemes: ["api-key"],
      apiKeyHeader: "Authorization",
    },
  };

  return NextResponse.json(agentCard, {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Content-Type": "application/json",
    },
  });
}
