import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as providers from "../../../src/shared/constants/providers.ts";
import { computeFreeModelTotals } from "../../../open-sse/config/freeModelCatalog.ts";
import { readCliCountMetadata } from "../../check/lib/staticCountMetadata.mjs";
import { readChatModelCountSnapshot } from "../../check/lib/staticChatModelMetadata.mjs";
export {
  countCliToolRecords,
  countCliToolCategories,
} from "../../check/lib/staticCountMetadata.mjs";
import { measureCatalogCounts, parseRoutingStrategyCount } from "./count-facts.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

export function readDocCountFacts(root = ROOT) {
  const migrations = fs
    .readdirSync(path.join(root, "src/lib/db/migrations"))
    .filter((name) => name.endsWith(".sql")).length;
  if (!migrations) throw new Error("COUNT_FACTS_MIGRATIONS_UNAVAILABLE");
  const strategies = parseRoutingStrategyCount(
    fs.readFileSync(path.join(root, "src/shared/constants/routingStrategies.ts"), "utf8")
  );
  return Object.freeze({
    ...readCliCountMetadata(root),
    ...readChatModelCountSnapshot(root).facts,
    ...measureCatalogCounts(providers, computeFreeModelTotals()),
    migrations,
    strategies,
  });
}

// Every renderer imported by one invocation consumes the same measured snapshot.
export const CURRENT_DOC_COUNTS = readDocCountFacts();
