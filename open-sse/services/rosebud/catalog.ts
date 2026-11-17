import { z } from "zod";
import { RosebudError } from "./cli.ts";

export const rosebudCategory = z.enum([
  "image",
  "skybox",
  "model_3d",
  "sound_effect",
  "music",
  "video",
  "speech",
]);
export type RosebudCategory = z.infer<typeof rosebudCategory>;
export const rosebudModel = z
  .object({
    id: z.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,127}$/),
    name: z.string(),
    category: rosebudCategory,
    status: z.string().optional(),
    inputs: z.array(
      z
        .object({
          name: z.string(),
          type: z.string(),
          required: z.boolean().optional(),
          values: z.array(z.union([z.string(), z.number()])).optional(),
          minimum: z.number().optional(),
          maximum: z.number().optional(),
          max_length: z.number().optional(),
        })
        .passthrough()
    ),
    price: z.record(z.string(), z.unknown()).optional(),
    license: z.record(z.string(), z.unknown()).optional(),
    output_formats: z.array(z.string()).default([]),
  })
  .passthrough();
export type RosebudModel = z.infer<typeof rosebudModel>;

type InputSpec = RosebudModel["inputs"][number];

function numberField(spec: InputSpec): z.ZodType {
  let number = z.number().finite();
  if (spec.type === "integer") number = number.int();
  if (spec.minimum !== undefined) number = number.min(spec.minimum);
  if (spec.maximum !== undefined) number = number.max(spec.maximum);
  return number;
}

function stringField(spec: InputSpec): z.ZodType {
  let string = z.string().min(1);
  if (spec.max_length !== undefined) string = string.max(spec.max_length);
  if (spec.type !== "file") return string;
  return string.refine(
    (value) => /^[a-zA-Z0-9_-]+$/.test(value) || /^https:\/\//.test(value),
    "Use an asset ID or HTTPS URL"
  );
}

function inputField(spec: InputSpec): z.ZodType {
  if (spec.type === "integer" || spec.type === "number") return numberField(spec);
  if (spec.type === "boolean") return z.boolean();
  if (spec.type === "string" || spec.type === "file") return stringField(spec);
  if (spec.type === "enum")
    return z
      .union([z.string(), z.number()])
      .refine((value) => spec.values?.includes(value) === true);
  throw new RosebudError("unsupported_input_type", 400);
}

/** Validate against the live provider schema before quoting or spending credits. */
export function validateRosebudInput(model: RosebudModel, input: Record<string, unknown>) {
  const fields: Record<string, z.ZodType> = {};
  for (const spec of model.inputs) {
    const field = inputField(spec);
    fields[spec.name] = spec.required ? field : field.optional();
  }
  return z.object(fields).strict().parse(input);
}

export function rosebudEndpoint(category: RosebudCategory): string[] {
  return category === "image" ? ["images"] : [];
}

export function rosebudCatalogEntry(model: RosebudModel) {
  return {
    id: model.id,
    name: model.name,
    type: model.category === "image" ? "image" : model.category,
    supportedEndpoints: rosebudEndpoint(model.category),
    endpointCapabilitySource: "declared",
    apiFormat:
      model.category === "image"
        ? "images-generations"
        : model.category === "speech"
          ? "audio-speech"
          : model.category,
    rosebud: {
      category: model.category,
      inputs: model.inputs,
      price: model.price,
      license: model.license,
      outputFormats: model.output_formats,
      creditUnit: "rosebud_credits",
      usdCost: null,
    },
  };
}
