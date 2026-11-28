import { z } from "zod";

const NAME_PATTERN = /^[A-Za-z0-9_]+$/;
export const BIGQUERY_DEFAULT_LOCATION = "EU";
/** 0 keeps partitions forever; anything higher sets the table's partition expiry. */
export const BIGQUERY_PARTITION_RETENTION = { min: 0, max: 3650, defaultValue: 0 } as const;

export const bigQueryConfigSchema = z.object({
  projectId: z.string().min(1).max(200),
  datasetId: z.string().min(1).max(1024).regex(NAME_PATTERN, "Dataset id must match [A-Za-z0-9_]+"),
  tableId: z.string().min(1).max(1024).regex(NAME_PATTERN, "Table id must match [A-Za-z0-9_]+"),
  location: z.string().min(1).max(64).default(BIGQUERY_DEFAULT_LOCATION),
  serviceAccountJson: z.string().min(1),
  autoCreate: z.boolean().default(true),
  partitionExpirationDays: z
    .number()
    .int()
    .min(BIGQUERY_PARTITION_RETENTION.min)
    .max(BIGQUERY_PARTITION_RETENTION.max)
    .default(BIGQUERY_PARTITION_RETENTION.defaultValue),
});

export type BigQueryConfig = z.infer<typeof bigQueryConfigSchema>;
