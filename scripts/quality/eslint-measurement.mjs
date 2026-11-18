import { closeSync, constants, fstatSync, lstatSync, openSync, readFileSync } from "node:fs";

const MAX_REPORT_BYTES = 256 * 1024 * 1024;

/** Read the dedicated report produced by this invocation, never mixed console output. */
export function readEslintMeasurement(file) {
  let descriptor;
  try {
    const before = lstatSync(file);
    if (!before.isFile() || before.size === 0 || before.size > MAX_REPORT_BYTES) {
      throw new Error("Invalid report file");
    }
    descriptor = openSync(file, constants.O_RDONLY | (constants.O_NOFOLLOW || 0));
    const opened = fstatSync(descriptor);
    if (
      !opened.isFile() ||
      opened.dev !== before.dev ||
      opened.ino !== before.ino ||
      opened.size === 0 ||
      opened.size > MAX_REPORT_BYTES
    ) {
      throw new Error("Report file changed before reading");
    }
    const results = JSON.parse(readFileSync(descriptor, "utf8"));
    eslintMeasurementCounts(results);
    return results;
  } catch {
    throw new Error("ESLint measurement is incomplete or invalid");
  } finally {
    if (descriptor !== undefined) closeSync(descriptor);
  }
}

/** A full-tree lint measurement must contain file records with finite counts. */
export function eslintMeasurementCounts(results) {
  if (
    !Array.isArray(results) ||
    results.length === 0 ||
    results.some(
      (result) =>
        !result ||
        typeof result.filePath !== "string" ||
        result.filePath.length === 0 ||
        ![result.errorCount, result.warningCount].every(
          (count) => Number.isSafeInteger(count) && count >= 0
        )
    )
  ) {
    throw new Error("ESLint measurement is incomplete or invalid");
  }
  return results.reduce(
    (counts, result) => ({
      errors: counts.errors + result.errorCount,
      warnings: counts.warnings + result.warningCount,
    }),
    { errors: 0, warnings: 0 }
  );
}
