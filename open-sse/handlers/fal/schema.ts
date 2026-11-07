import Ajv, { type AnySchema, type ValidateFunction } from "ajv";
import addFormats from "ajv-formats";
import { canonicalFalEndpoint, falRealtimePath } from "../../config/falEndpoint.ts";
import realtimeSchema from "./realtimeSchema.json" with { type: "json" };

export type FalRecord = Record<string, unknown>;
export type FalTransport = "direct" | "queue" | "stream" | "realtime" | "http-websocket";
export type FalDefinition = {
  endpoint_id: string;
  metadata?: FalRecord;
  openapi: FalRecord;
};

export function falRecord(value: unknown): FalRecord {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as FalRecord)
    : {};
}

function localRef(document: FalRecord, ref: string): unknown {
  if (!ref.startsWith("#/")) throw new Error("External schema references are unsupported");
  let value: unknown = document;
  for (const key of ref.slice(2).split("/")) {
    value = falRecord(value)[key.replace(/~1/g, "/").replace(/~0/g, "~")];
  }
  if (value === undefined) throw new Error("Unresolved fal schema reference");
  return value;
}

export function resolveFalSchema(document: FalRecord, schema: unknown): FalRecord {
  const record = falRecord(schema);
  return typeof record.$ref === "string" ? falRecord(localRef(document, record.$ref)) : record;
}

function falInputProperties(
  document: FalRecord,
  schema: FalRecord,
  seen = new Set<unknown>()
): FalRecord {
  if (seen.has(schema)) return {};
  seen.add(schema);
  const resolved = resolveFalSchema(document, schema);
  const properties = { ...falRecord(resolved.properties) };
  for (const composition of ["allOf", "anyOf", "oneOf"]) {
    const alternatives = resolved[composition];
    if (!Array.isArray(alternatives)) continue;
    for (const alternative of alternatives)
      Object.assign(properties, falInputProperties(document, falRecord(alternative), seen));
  }
  return properties;
}

export function falInputSchema(definition: FalDefinition, transport: FalTransport = "direct") {
  canonicalFalEndpoint(definition.endpoint_id);
  if (transport === "realtime") {
    const override = falRecord(definition.openapi["x-fal-realtime"]);
    // Legacy path-only overrides remain stored, but need an explicit input_schema upgrade.
    const schema = falRecord(override.input_schema);
    if (Object.keys(schema).length) {
      return { path: falRealtimePath(definition)!, schema };
    }
    if (definition.endpoint_id === "fal-ai/fast-lcm-diffusion" && !Object.keys(override).length) {
      return {
        path: falRealtimePath(definition)!,
        schema: {
          ...realtimeSchema.schema,
          components: realtimeSchema.components,
        } as FalRecord,
      };
    }
    throw new Error("No verified realtime input schema; register x-fal-realtime.input_schema");
  }
  if (!String(definition.openapi.openapi ?? "").startsWith("3.")) {
    throw new Error("The endpoint has no usable OpenAPI schema; register an override");
  }
  const paths = falRecord(definition.openapi.paths);
  const posts = Object.entries(paths).filter(
    ([path, item]) => falRecord(item).post && !path.includes("{request_id}")
  );
  const candidates = posts.filter(([path]) =>
    transport === "stream" ? path.endsWith("/stream") : !path.endsWith("/stream")
  );
  const operation =
    transport === "stream" && !definition.endpoint_id.endsWith("/stream")
      ? `/${definition.endpoint_id}/stream`
      : `/${definition.endpoint_id}`;
  const selected =
    posts.find(([path]) => path === operation) ??
    (candidates.length === 1 ? candidates[0] : undefined);
  if (!selected) throw new Error(`No unambiguous ${transport} input schema for this endpoint`);
  const post = falRecord(falRecord(selected[1]).post);
  const requestBody = resolveFalSchema(definition.openapi, post.requestBody);
  const content = falRecord(requestBody.content);
  const schema = resolveFalSchema(
    definition.openapi,
    falRecord(content["application/json"]).schema
  );
  if (Object.keys(schema).length === 0) throw new Error("Missing fal JSON input schema");
  return { path: selected[0], schema };
}

export function falCapabilities(definition: FalDefinition) {
  const { schema } = falInputSchema(definition);
  const paths = Object.keys(falRecord(definition.openapi.paths));
  const properties = falInputProperties(definition.openapi, schema);
  let realtime: ReturnType<typeof falInputSchema> | null = null;
  if (falRealtimePath(definition)) {
    try {
      const candidate = falInputSchema(definition, "realtime");
      compileFalInput(definition, "realtime");
      realtime = candidate;
    } catch {
      // A protocol path alone is not proof of a usable input contract.
    }
  }
  return {
    category: definition.metadata?.category ?? null,
    kind: definition.metadata?.kind ?? "inference",
    transports: {
      direct: true,
      queue: paths.some((path) => path.includes("{request_id}/status")),
      stream:
        paths.some((path) => path.endsWith("/stream")) ||
        typeof definition.metadata?.stream_url === "string",
      realtime: realtime !== null,
      "http-websocket": true,
    },
    inputs: properties,
    required: schema.required ?? [],
    transport_inputs: {
      ...(realtime
        ? {
            realtime: {
              inputs: falInputProperties(
                {
                  ...definition.openapi,
                  components: realtime.schema.components ?? definition.openapi.components,
                },
                realtime.schema
              ),
              required: realtime.schema.required ?? [],
            },
          }
        : {}),
      ...(paths.some((path) => path.endsWith("/stream"))
        ? {
            stream: {
              inputs: falInputProperties(
                definition.openapi,
                falInputSchema(definition, "stream").schema
              ),
              required: falInputSchema(definition, "stream").schema.required ?? [],
            },
          }
        : {}),
    },
    reasoning: Object.fromEntries(
      Object.entries(properties).filter(([name]) =>
        /^(enable_thinking|reasoning|reasoning_mode|reasoning_budget|reasoning_effort|thinking_budget)$/.test(
          name
        )
      )
    ),
    verification: "schema-validated",
  };
}

/** Compile without mutating values: no defaults, coercion, clamping or field removal. */
export function compileFalInput(definition: FalDefinition, transport: FalTransport = "direct") {
  const { schema } = falInputSchema(definition, transport);
  const ajv = new Ajv({ strict: false, allErrors: true, validateFormats: true });
  addFormats(ajv);
  const validate: ValidateFunction = ajv.compile({
    ...schema,
    components: schema.components ?? definition.openapi.components,
  } as AnySchema);
  return (input: FalRecord) => {
    // OpenAPI objects often leave additionalProperties implicit. Unsupported controls
    // must still produce a useful error rather than silently disappear upstream.
    const properties = falInputProperties(definition.openapi, schema);
    if (
      (schema.additionalProperties === undefined || schema.additionalProperties === false) &&
      Object.keys(properties).length > 0
    ) {
      const unknown = Object.keys(input).filter((key) => !Object.hasOwn(properties, key));
      if (unknown.length) throw new Error(`Unsupported fal input: ${unknown.join(", ")}`);
    }
    if (!validate(input)) throw new Error(`Invalid fal input: ${ajv.errorsText(validate.errors)}`);
    return input;
  };
}

/** Compatibility names are mapped only when the endpoint documents their target. */
export function falCompatibilityInput(body: FalRecord, definition: FalDefinition): FalRecord {
  const { schema } = falInputSchema(definition);
  const properties = falInputProperties(definition.openapi, schema);
  const input: FalRecord = {};
  const envelope = new Set([
    "model",
    "response_format",
    "fal_input",
    "size",
    "n",
    "image",
    "images",
    "mask",
  ]);
  for (const [key, value] of Object.entries(body)) {
    if (!envelope.has(key)) input[key] = value;
  }
  mapMediaReferences(body, properties, input);
  for (const [source, target] of [
    ["n", "num_images"],
    ["mask", "mask_url"],
  ]) {
    if (body[source] !== undefined) {
      if (!(target in properties)) throw new Error(`Unsupported fal control: ${source}`);
      input[target] = body[source];
    }
  }
  if (body.size !== undefined) {
    if (!("image_size" in properties))
      throw new Error("This fal endpoint does not support size; use fal_input");
    const match = typeof body.size === "string" && body.size.match(/^(\d+)x(\d+)$/);
    input.image_size = match ? { width: Number(match[1]), height: Number(match[2]) } : body.size;
  }
  return compileFalInput(definition)({ ...input, ...falRecord(body.fal_input) });
}

function mapMediaReferences(body: FalRecord, properties: FalRecord, input: FalRecord) {
  for (const media of ["image", "video", "audio"]) {
    const source = `${media}_urls`;
    const references = `reference_${media}_urls`;
    if (body[source] === undefined || Object.hasOwn(properties, source)) continue;
    if (Object.hasOwn(properties, references)) {
      input[references] = body[source];
      delete input[source];
    } else if (Object.hasOwn(properties, `${media}_url`)) {
      if (!Array.isArray(body[source]) || body[source].length !== 1) {
        throw new Error(`This fal endpoint supports exactly one ${media} reference`);
      }
      input[`${media}_url`] = body[source][0];
      delete input[source];
    }
  }
}
