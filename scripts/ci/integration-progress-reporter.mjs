import { createIntegrationProgressReporter } from "./unit-progress-reporter.mjs";

export default async function* integrationProgressReporter(source) {
  yield* createIntegrationProgressReporter(source);
}
