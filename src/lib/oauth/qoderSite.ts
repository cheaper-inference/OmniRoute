/**
 * Qoder site (global vs China) resolution.
 *
 * Ported from magpie's `internal/qoder/endpoints.go` (MIT), which records that
 * Qoder's built-in accounts moved onto two sites: the global one (`qoder`) and
 * Qoder CN (`qoder-cn`). Anything that is not explicitly `qoder-cn` belongs to
 * the global site, mirroring `SiteOf`.
 */

export const QODER_CN_PROVIDER_ID = "qoder-cn";

export const QODER_SITES = {
  GLOBAL: "global",
  CN: "cn",
} as const;

export type QoderSite = (typeof QODER_SITES)[keyof typeof QODER_SITES];

/** @see magpie `internal/qoder/endpoints.go` → `SiteOf` */
export function isQoderSite(providerId: unknown): boolean {
  return providerId === QODER_CN_PROVIDER_ID;
}

/**
 * Resolve the site for a provider id. Only the exact `qoder-cn` id selects the
 * China site; every other value (including `undefined`, a bare `qoder`, or an
 * unknown id) resolves to global so existing connections keep their behaviour.
 */
export function resolveQoderSite(providerId: unknown): QoderSite {
  return isQoderSite(providerId) ? QODER_SITES.CN : QODER_SITES.GLOBAL;
}

/**
 * Site-specific request headers. The global site adds nothing, so existing
 * Qoder traffic is byte-identical to before. The CN site needs the machine id
 * its CLI presents to keep a device stable across restarts.
 */
export function buildQoderSiteHeaders(
  providerId: unknown,
  machineId?: string
): Record<string, string> {
  if (!isQoderSite(providerId)) return {};
  const headers: Record<string, string> = { "x-qoder-site": "cn" };
  if (machineId) headers["x-qoder-machine-id"] = machineId;
  return headers;
}
