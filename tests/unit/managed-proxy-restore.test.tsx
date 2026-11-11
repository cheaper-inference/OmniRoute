// @vitest-environment node
import { expect, test, vi } from "vitest";
const log = vi.hoisted(() => vi.fn());
vi.mock("@/shared/utils/logger", () => ({ logger: { error: log } }));
import { restoreManagedProxyCoresSafely } from "../../src/lib/services/managedProxy/restore";
for (const failure of ["load", "restore"]) {
  test(`${failure} failure allows bootstrap to continue without leaking diagnostics`, async () => {
    log.mockClear();
    /**
     * Inject either a module-load failure or a restoration failure with private diagnostic text.
     */
    const load = async () => {
      if (failure === "load") throw new Error("/private/path dependency missing");
      return {
        restoreManagedProxyCores: async () => {
          throw new Error("source-secret");
        },
      };
    };
    await expect(
      restoreManagedProxyCoresSafely(load as Parameters<typeof restoreManagedProxyCoresSafely>[0])
    ).resolves.toBeUndefined();
    expect(log).toHaveBeenCalledOnce();
    expect(JSON.stringify(log.mock.calls)).not.toMatch(/private\/path|source-secret/);
  });
}
