import type { RegistryEntry } from "../../shared.ts";
export const supersoniclabsProvider: RegistryEntry = {
  id: "supersoniclabs",
  alias: "supersoniclabs",
  format: "systemone",
  executor: "default",
  baseUrl: "https://api.supersoniclabs.ai/v1/systemone",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "julia-1", name: "Julia-1", supportedEndpoints: ["systemone"], apiFormat: "systemone" },
  ],
};
