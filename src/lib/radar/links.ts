import { parseRadarAdminUrl } from "@/shared/validation/radarAdminUrl";

/** Optional private operations-panel URL configured by the instance owner. */
export function getRadarAdminUrl(): string | null {
  return parseRadarAdminUrl(process.env.RADAR_ADMIN_URL);
}
