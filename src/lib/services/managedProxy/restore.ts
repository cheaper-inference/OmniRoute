import { logger } from "@/shared/utils/logger";

/** A missing archive dependency or damaged managed core must not block unrelated services. */
export async function restoreManagedProxyCoresSafely(
  load = () => import("./manager")
): Promise<void> {
  try {
    const { restoreManagedProxyCores } = await load();
    await restoreManagedProxyCores();
  } catch {
    // Module-load and filesystem errors can contain private paths; log a fixed message only.
    logger.error(
      { module: "managed-proxy" },
      "Managed proxy restoration failed; other services will continue"
    );
  }
}
