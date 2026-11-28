// Wires the synced-model inventory (src DB) into the combo quota strategies (open-sse) once,
// at module load, so open-sse never imports src/ (#21066). Imported for its side effect by chat.ts.
import { registerSyncedAvailableModelsReader } from "@omniroute/open-sse/services/combo/quotaStrategies.ts";
import { getSyncedAvailableModelsByConnection } from "@/lib/db/models";

registerSyncedAvailableModelsReader(getSyncedAvailableModelsByConnection);
