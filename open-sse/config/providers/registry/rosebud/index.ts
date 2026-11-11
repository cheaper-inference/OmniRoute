import type { RegistryEntry } from "../../shared.ts";
export const rosebudProvider: RegistryEntry = {
  id: "rosebud",
  alias: "rosebud",
  format: "rosebud-assets",
  executor: "rosebud-assets",
  baseUrl: "rosebud://assets",
  authType: "none",
  authHeader: "none",
  models: [],
};
