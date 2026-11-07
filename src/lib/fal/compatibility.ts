import {
  prepareFalCompatibility as prepareFalInput,
  type PrepareFalInput,
} from "@omniroute/open-sse/handlers/fal/compatibility";
import { getFalDefinition, saveFalDefinition } from "@/lib/db/fal";

/** Used after the compatibility route has selected its scoped credentials. */
export const prepareFalCompatibility: PrepareFalInput = (endpoint, body, credentials, signal) =>
  prepareFalInput(endpoint, body, credentials, signal, {
    get: getFalDefinition,
    save: saveFalDefinition,
  });
