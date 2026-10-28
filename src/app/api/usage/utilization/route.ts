import { NextResponse } from "next/server";
import { getAggregatedSnapshots } from "@/lib/db/quotaSnapshots";
import { getProviderConnectionById } from "@/lib/db/providers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import type {
  ProviderUtilizationResponse,
  UtilizationTimeRange,
  ConnectionMetaEntry,
} from "@/shared/types/utilization";
import { BUCKET_SIZES } from "@/shared/types/utilization";

const VALID_RANGES: UtilizationTimeRange[] = ["1h", "24h", "7d", "30d"];

function asNullableString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function getRangeStartIso(range: UtilizationTimeRange): string {
  const end = new Date();
  const start = new Date(end);

  switch (range) {
    case "1h":
      start.setHours(start.getHours() - 1);
      break;
    case "24h":
      start.setDate(start.getDate() - 1);
      break;
    case "7d":
      start.setDate(start.getDate() - 7);
      break;
    case "30d":
      start.setDate(start.getDate() - 30);
      break;
  }

  return start.toISOString();
}

export async function GET(request: Request) {
  try {
    // Management plane: connection meta includes account emails — the same
    // dashboard session / oma token / manage-scope key gate every other
    // management route uses. There is no global middleware (route-specific
    // interception only), so an unguarded GET here is public.
    const authError = await requireManagementAuth(request);
    if (authError) return authError;

    const { searchParams } = new URL(request.url);
    const rangeParam = searchParams.get("range");
    const providerParam = searchParams.get("provider");

    if (!rangeParam || !VALID_RANGES.includes(rangeParam as UtilizationTimeRange)) {
      return NextResponse.json(
        { error: "Invalid range. Must be one of: 1h, 24h, 7d, 30d" },
        { status: 400 }
      );
    }

    const range = rangeParam as UtilizationTimeRange;
    const since = getRangeStartIso(range);
    const bucketMinutes = BUCKET_SIZES[range];
    const aggregateByParam = searchParams.get("aggregateBy");
    const aggregateBy = aggregateByParam === "connection" ? "connection" : "provider";

    const data = getAggregatedSnapshots({
      provider: providerParam || undefined,
      since,
      bucketMinutes,
      aggregateBy,
    });

    const providers = Array.from(new Set(data.map((d) => d.provider)));

    let connectionMeta: Record<string, ConnectionMetaEntry> | undefined;
    if (aggregateBy === "connection") {
      const uniqueConnectionIds = new Set(
        data.map((d) => d.provider.split(":").slice(1).join(":")).filter(Boolean)
      );
      connectionMeta = {};
      for (const cid of uniqueConnectionIds) {
        const conn = await getProviderConnectionById(cid);
        connectionMeta[cid] = {
          email: asNullableString(conn?.email),
          name: asNullableString(conn?.name),
          displayName: asNullableString(conn?.displayName),
        };
      }
    }

    const response: ProviderUtilizationResponse = {
      timeRange: range,
      bucketSizeMinutes: bucketMinutes,
      providers,
      data,
      connectionMeta,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching utilization data:", error);
    return NextResponse.json({ error: "Failed to fetch utilization data" }, { status: 500 });
  }
}
