// bin/cli/launch/core/gateway/external-local.mjs: the "external-local" lifecycle strategy.
// A local gateway the user started: lease it (owned:false, so it is
// visible to `omnirouter sessions`) but never start or stop it.

/** Turn a lease into the acquire handle. `owned` decides the origin label only. */
export function leaseHandle({ baseUrl, owned, lease }) {
  return {
    baseUrl,
    owned,
    origin: owned ? "auto-started" : "external-local",
    leaseId: lease.leaseId,
    release: async () => {
      lease.release();
    },
  };
}
