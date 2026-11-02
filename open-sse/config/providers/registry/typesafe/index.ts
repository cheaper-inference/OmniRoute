import type { RegistryEntry } from "../../shared.ts";
import { SYSTEMONE_BACKENDS } from "../../../systemOneRegistry.ts";

/** Native discovery/credential metadata; never dispatched by a chat executor. */
export const typesafeProvider: RegistryEntry = {
  id: "typesafe",
  alias: "typesafe",
  format: "systemone",
  executor: "none",
  baseUrl: SYSTEMONE_BACKENDS.typesafe.url,
  modelsUrl: SYSTEMONE_BACKENDS.typesafe.modelsUrl,
  authType: "apikey",
  authHeader: "bearer",
  liveCatalogAuthoritative: true,
  models: [],
};
