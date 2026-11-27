import { parentPort, workerData } from "node:worker_threads";

// Some providers refresh client-version headers at import time. Reading declarations
// in an isolated worker keeps those requests out of both the audit and its caller.
globalThis.fetch = async () => {
  throw new Error("Network access is disabled while reading registry declarations");
};

const { REGISTRY } = await import("../../../open-sse/config/providerRegistry.ts");
const snapshots = Object.fromEntries(
  workerData
    .filter((provider) => Object.hasOwn(REGISTRY, provider))
    .map((provider) => [
      provider,
      REGISTRY[provider].models.map(({ id, aliases, liveCatalogIds }) => ({
        id,
        aliases,
        liveCatalogIds,
      })),
    ])
);
parentPort.postMessage(snapshots);
