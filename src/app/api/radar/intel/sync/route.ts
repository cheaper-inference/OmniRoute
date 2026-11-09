import { syncRadarIntel } from "@/lib/radar/intelSync";
import { handleCorsOptions } from "@/shared/utils/cors";
import { handleRadarFeedSync } from "../../syncHandler";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function POST(request: Request) {
  return handleRadarFeedSync(request, syncRadarIntel, "Radar Intel sync failed");
}
