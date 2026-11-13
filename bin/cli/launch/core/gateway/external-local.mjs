// bin/cli/launch/core/gateway/external-local.mjs: the "external-local" lifecycle strategy
// (architecture 4.1, 4.6, 12.6). A local gateway the user started: lease it (owned:false, so it is
// visible to `omnirouter sessions`) but never start or stop it. Owned by stream C2.

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
