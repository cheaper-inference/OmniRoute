import { syncRadarOffers } from "@/lib/radar/offersSync";
import { handleCorsOptions } from "@/shared/utils/cors";
import { handleRadarFeedSync } from "../../syncHandler";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function POST(request: Request) {
  return handleRadarFeedSync(request, syncRadarOffers, "Radar offers sync failed");
}
