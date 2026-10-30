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
