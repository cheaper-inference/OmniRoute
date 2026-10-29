import { z } from "zod";

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

/** Validate against the live provider schema before quoting or spending credits. */
export function validateRosebudInput(model: RosebudModel, input: Record<string, unknown>) {
  const fields: Record<string, z.ZodType> = {};
  for (const spec of model.inputs) {
    let field: z.ZodType;
    if (spec.type === "integer" || spec.type === "number") {
      let number = z.number().finite();
      if (spec.type === "integer") number = number.int();
      if (spec.minimum !== undefined) number = number.min(spec.minimum);
      if (spec.maximum !== undefined) number = number.max(spec.maximum);
      field = number;
    } else if (spec.type === "boolean") field = z.boolean();
    else if (spec.type === "enum") {
      field = z
        .union([z.string(), z.number()])
        .refine((value) => spec.values?.includes(value) === true);
    } else if (spec.type === "string" || spec.type === "file") {
      let string = z.string().min(1);
      if (spec.max_length !== undefined) string = string.max(spec.max_length);
      field =
        spec.type === "file"
          ? string.refine(
              (value) => /^[a-zA-Z0-9_-]+$/.test(value) || /^https:\/\//.test(value),
              "Use an asset ID or HTTPS URL"
            )
          : string;
    } else throw new Error("Unsupported Rosebud input type");
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
