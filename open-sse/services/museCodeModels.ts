/**
 * Muse Code model discovery: what the key may use, described the way the Muse
 * Code client describes it.
 *
 * Meta publishes two listings for a Muse Code key:
 * - `GET /v1/models` — the models this key can call. It is the routing
 *   authority (its own 404 says so: "GET /v1/models lists the models this API
 *   key can use"), but each row carries only an id.
 * - `GET /muse-code/models` — the catalog the Muse Code client builds its model
 *   picker from. Every row carries `metadata["muse-code"]`: limits, reasoning
 *   and tool support, input/output modalities, effort variants, default effort
 *   and whether the client hides the model.
 *
 * Discovery keeps the first as the set of models and takes each model's
 * description from the second, so a model the key can still call keeps
 * routing even when the client no longer lists it, and every listed model
 * reaches the catalog with the limits and efforts the client itself uses.
 */

const MUSE_CODE_CATALOG_NAMESPACE = "muse-code";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function rowsOf(listing: unknown): JsonRecord[] {
  const data = asRecord(listing).data;
  return Array.isArray(data) ? data.map(asRecord) : [];
}

function idOf(row: JsonRecord): string | null {
  return typeof row.id === "string" && row.id.length > 0 ? row.id : null;
}

function stringList(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string" && item.length > 0)
    : [];
}

function positiveNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : undefined;
}

/**
 * The discovery record for one model, in the field names the shared discovery
 * normalizer reads. Absent metadata yields absent fields, never defaults.
 */
function describeModel(id: string, metadata: JsonRecord): JsonRecord {
  const limit = asRecord(metadata.limit);
  const modalities = asRecord(metadata.modalities);
  const inputModalities = stringList(modalities.input);
  const outputModalities = stringList(modalities.output);
  const efforts = Object.keys(asRecord(metadata.variants));
  const defaultEffort = asRecord(metadata.options).reasoningEffort;
  const record: JsonRecord = { id, owned_by: "meta" };

  if (typeof metadata.name === "string" && metadata.name.length > 0) record.name = metadata.name;
  if (typeof metadata.description === "string") record.description = metadata.description;
  const context = positiveNumber(limit.context);
  if (context) record.context_length = context;
  const output = positiveNumber(limit.output);
  if (output) record.max_output_tokens = output;
  if (typeof metadata.reasoning === "boolean") record.supportsThinking = metadata.reasoning;
  if (typeof metadata.tool_call === "boolean") record.supportsTools = metadata.tool_call;
  if (inputModalities.length > 0) record.input_modalities = inputModalities;
  if (efforts.length > 0) record.supportedThinkingEfforts = efforts;
  if (typeof defaultEffort === "string" && efforts.includes(defaultEffort)) {
    record.defaultThinkingEffort = defaultEffort;
  }
  // An image generator answers on the images endpoint, not chat.
  if (outputModalities.includes("image") && !outputModalities.includes("text")) {
    record.type = "image";
  }
  // The client keeps the model out of its picker; it stays callable.
  if (metadata.is_hidden === true) record.visibility = "hide";
  return record;
}

/**
 * Merge the two listings into discovery records.
 *
 * @param usable  The `/v1/models` response: which models exist for this key.
 * @param catalog The `/muse-code/models` response, or null when it could not
 *                be read; models then keep only their ids.
 */
export function mergeMuseCodeModelListings(usable: unknown, catalog: unknown): JsonRecord[] {
  const descriptions = new Map<string, JsonRecord>();
  for (const row of rowsOf(catalog)) {
    const id = idOf(row);
    if (!id) continue;
    descriptions.set(id, asRecord(asRecord(row.metadata)[MUSE_CODE_CATALOG_NAMESPACE]));
  }

  const models: JsonRecord[] = [];
  const seen = new Set<string>();
  for (const row of rowsOf(usable)) {
    const id = idOf(row);
    if (!id || seen.has(id)) continue;
    seen.add(id);
    const metadata = descriptions.get(id);
    models.push(metadata ? describeModel(id, metadata) : { id, owned_by: "meta" });
  }
  return models;
}
