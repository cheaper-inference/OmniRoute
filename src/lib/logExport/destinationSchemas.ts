import { z } from "zod";

export const destinationNumberLimits = {
  batchSize: { min: 1, max: 10_000, defaultValue: 500 },
  maxBodyBytes: { min: 1024, max: 5_000_000, defaultValue: 262_144 },
  maxRowsPerRun: { min: 1, max: 1_000_000, defaultValue: 10_000 },
} as const;

const { batchSize, maxBodyBytes, maxRowsPerRun } = destinationNumberLimits;
const destinationFields = {
  name: z.string().min(1).max(200),
  enabled: z.boolean(),
  config: z.record(z.string(), z.unknown()),
  batchSize: z.number().int().min(batchSize.min).max(batchSize.max),
  includeBodies: z.boolean(),
  maxBodyBytes: z.number().int().min(maxBodyBytes.min).max(maxBodyBytes.max),
  maxRowsPerRun: z.number().int().min(maxRowsPerRun.min).max(maxRowsPerRun.max),
};

export const updateDestinationSchema = z.object(destinationFields).partial();

export const createDestinationSchema = z.object({
  name: destinationFields.name,
  type: z.string().min(1).max(64),
  enabled: destinationFields.enabled.default(false),
  config: destinationFields.config.default({}),
  batchSize: destinationFields.batchSize.default(batchSize.defaultValue),
  startFromCurrentPosition: z.boolean().default(false),
  includeBodies: destinationFields.includeBodies.default(false),
  maxBodyBytes: destinationFields.maxBodyBytes.default(maxBodyBytes.defaultValue),
  maxRowsPerRun: destinationFields.maxRowsPerRun.default(maxRowsPerRun.defaultValue),
});
