import assert from "node:assert/strict";
import test from "node:test";
import {
  createDestinationSchema,
  updateDestinationSchema,
} from "../../src/lib/logExport/destinationSchemas";
import { bigQueryConfigSchema } from "../../src/lib/logExport/destinations/bigqueryConfig";

const envelope = { name: "QA warehouse", type: "bigquery" };
const config = {
  projectId: "qa-project",
  datasetId: "qa_dataset",
  tableId: "call_logs",
  serviceAccountJson: "test-key",
};

test("the create and update envelopes accept integer batches from 1 to 10000", () => {
  for (const batchSize of [1, 10_000]) {
    assert.equal(createDestinationSchema.safeParse({ ...envelope, batchSize }).success, true);
    assert.equal(updateDestinationSchema.safeParse({ batchSize }).success, true);
  }
  for (const batchSize of [0, 1.5, 10_001]) {
    assert.equal(createDestinationSchema.safeParse({ ...envelope, batchSize }).success, false);
    assert.equal(updateDestinationSchema.safeParse({ batchSize }).success, false);
  }
});

test("the create envelope supplies defaults and the update envelope accepts a partial body", () => {
  assert.deepEqual(createDestinationSchema.parse(envelope), {
    ...envelope,
    enabled: false,
    config: {},
    batchSize: 500,
    startFromCurrentPosition: false,
    includeBodies: false,
    maxBodyBytes: 262_144,
    maxRowsPerRun: 10_000,
  });
  assert.deepEqual(updateDestinationSchema.parse({ enabled: true }), { enabled: true });
});

test("BigQuery defaults omitted location to EU and rejects explicitly empty required fields", () => {
  const defaults = bigQueryConfigSchema.parse(config);
  assert.equal(defaults.location, "EU");
  assert.equal(defaults.partitionExpirationDays, 0);

  const result = bigQueryConfigSchema.safeParse({
    projectId: "",
    datasetId: "",
    tableId: "",
    location: "",
    serviceAccountJson: "",
  });
  assert.equal(result.success, false);
  assert.deepEqual(Array.from(new Set(result.error?.issues.map((issue) => issue.path[0]))), [
    "projectId",
    "datasetId",
    "tableId",
    "location",
    "serviceAccountJson",
  ]);
});

test("BigQuery validates dataset/table identifiers and retention boundaries", () => {
  assert.equal(
    bigQueryConfigSchema.safeParse({ ...config, datasetId: "qa-dataset", tableId: "logs.v1" })
      .success,
    false
  );
  for (const partitionExpirationDays of [0, 3650]) {
    assert.equal(
      bigQueryConfigSchema.safeParse({ ...config, partitionExpirationDays }).success,
      true
    );
  }
  for (const partitionExpirationDays of [-5, 1.5, 3651]) {
    assert.equal(
      bigQueryConfigSchema.safeParse({ ...config, partitionExpirationDays }).success,
      false
    );
  }
});
