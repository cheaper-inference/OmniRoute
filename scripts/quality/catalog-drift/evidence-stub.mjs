import { parseArgs } from "node:util";

import {
  FREE_MODEL_BUDGETS,
  grantsFreeAccess,
  resolveFreeQuotaUnit,
} from "../../../open-sse/config/freeModelCatalog.ts";
import {
  catalogFingerprint,
  requiredClaim,
  validateCatalogEvidence,
} from "../../check/freeCatalogEvidence.mjs";
import { isMainModule } from "../../lib/is-main-module.mjs";

/** @param {{ row: import("../../../open-sse/config/freeModelCatalog.ts").FreeModelBudget,
 *   sourceUrl: string, sourceType: string, today: string }} options */
export function buildEvidenceStub({ row, sourceUrl, sourceType, today }) {
  const claim = requiredClaim(row);
  return {
    provider: row.provider,
    modelId: row.modelId,
    catalogHash: catalogFingerprint(row),
    sourceType,
    sourceUrl,
    checkedAt: today,
    claim,
    ...(claim === "recurring-quota" ? { quotaUnit: resolveFreeQuotaUnit(row) } : {}),
    ...(claim !== "recurring-free-access" ? { excerpt: "TODO" } : {}),
    verifiedBy: "TODO",
    summary: "TODO",
    limitations: "TODO",
  };
}

function main() {
  const { values } = parseArgs({
    options: {
      provider: { type: "string" },
      model: { type: "string" },
      url: { type: "string" },
      "source-type": { type: "string" },
      today: { type: "string" },
    },
  });
  const { provider, model, url: sourceUrl, "source-type": sourceType } = values;
  if (!provider || !model || !sourceUrl || !sourceType) {
    throw new Error(
      "Usage: --provider <id> --model <id> --url <https> --source-type <public-page|api-public|console-verified> [--today YYYY-MM-DD]"
    );
  }
  const row = FREE_MODEL_BUDGETS.find((row) => row.provider === provider && row.modelId === model);
  if (!row) throw new Error(`No catalog row for ${provider}/${model}`);

  const today = new Date().toISOString().slice(0, 10);
  const evidence = buildEvidenceStub({ row, sourceUrl, sourceType, today: values.today ?? today });
  const errors = validateCatalogEvidence(
    [row],
    { schemaVersion: 1, debt: [], evidence: [evidence] },
    { seed: [], previousDebt: [], today, grantsFreeAccess, unitOf: resolveFreeQuotaUnit }
  );
  if (errors.length) throw new Error(errors.join("\n"));

  console.log(JSON.stringify(evidence, null, 2));
}

if (isMainModule(import.meta.url)) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
