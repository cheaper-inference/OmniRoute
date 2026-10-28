import { NextResponse } from "next/server";
import { getCachedRawProviderConnections, getCachedSettings } from "@/lib/db/readCache";
import { getAllProviderLimitsCache } from "@/lib/db/providerLimits";
import { resolveResilienceSettings } from "@/lib/resilience/settings";
import { buildConnectionQuotaAvailability } from "@/lib/usage/availability";

// Like provider-limits, this management route is authenticated by the central authz pipeline.
export async function GET() {
  try {
    const [connections, settings] = await Promise.all([
      getCachedRawProviderConnections(),
      getCachedSettings(),
    ]);
    const caches = getAllProviderLimitsCache();
    const policy = resolveResilienceSettings(settings).quotaPreflight;
    return NextResponse.json(
      {
        generatedAt: new Date().toISOString(),
        connections: connections.map((connection) =>
          buildConnectionQuotaAvailability(
            connection,
            caches[(connection as { id: string }).id],
            policy
          )
        ),
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("[API] GET /api/usage/availability error:", error);
    return NextResponse.json(
      { error: "Failed to read cached quota availability" },
      { status: 500 }
    );
  }
}
