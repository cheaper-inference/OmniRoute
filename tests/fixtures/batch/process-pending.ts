// This test-owned worker runs the production processor without starting unrelated services.
import {
  processPendingBatches,
  waitForAllBatches,
} from "../../../open-sse/services/batchProcessor.ts";
import { shutdownDbInstance } from "../../../src/lib/db/core.ts";
import { closeSharedLoggerResource } from "../../../src/shared/utils/loggerResource.ts";

try {
  await processPendingBatches();
  await waitForAllBatches();
} finally {
  try {
    await shutdownDbInstance();
  } finally {
    await closeSharedLoggerResource();
  }
}
