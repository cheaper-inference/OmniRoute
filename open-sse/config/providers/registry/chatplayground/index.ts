import type { RegistryEntry } from "../../shared.ts";
import {
  CHATPLAYGROUND_API_BASE,
  CHATPLAYGROUND_DEFAULT_CONTEXT,
} from "../../../../services/chatplaygroundModels.ts";

export const chatplaygroundProvider: RegistryEntry = {
  id: "chatplayground",
  alias: "cpl",
  format: "openai",
  executor: "chatplayground",
  baseUrl: `${CHATPLAYGROUND_API_BASE}/chat`,
  modelsUrl: `${CHATPLAYGROUND_API_BASE}/models`,
  authType: "apikey",
  authHeader: "cookie",
  defaultContextLength: CHATPLAYGROUND_DEFAULT_CONTEXT,
  models: [],
};
