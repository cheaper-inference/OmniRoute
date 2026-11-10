import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import ts from "typescript";
import { createStaticMetadataReader } from "./staticCountMetadata.mjs";
import { createModelMetadataReader } from "./modelMetadataReader.mjs";
import { measureChatModelCounts } from "../../docs/lib/count-facts.mjs";

const MODEL_DATA_FILES = new Set([
  "open-sse/executors/maxai/catalog.ts",
  // The M365 registry projects only this literal catalog's keys; profile bodies stay lazy (#19329).
  "open-sse/executors/m365Protocol/profile.ts",
  "open-sse/executors/uc/catalog.ts",
  "open-sse/services/conolModels.ts",
  "open-sse/services/hyperagentModels.ts",
  "open-sse/services/notionWebFallbackModels.ts",
  "open-sse/services/notionWebModels.ts",
  "open-sse/services/promptqlModels.ts",
  "open-sse/services/syntxModels.ts",
  "open-sse/services/twinmindModels.ts",
]);
const fail = (code) => {
  throw new Error(`COUNT_CHAT_METADATA:${code}`);
};

// Pure source callback seam. Neither metadata reader imports application code.
export function projectChatModelCounts(readSource) {
  const reader = createStaticMetadataReader(readSource);
  const models = createModelMetadataReader(ts, readSource);
  const registry = reader.properties(
    reader.reference("open-sse/config/providers/index.ts", "REGISTRY")
  );
  const inventory = [];
  // Preserve Object.values(REGISTRY)'s own-key enumeration order, including a
  // future integer-like key, before applying first-namespace selection.
  const keys = Object.keys(Object.fromEntries([...registry.keys()].map((key) => [key, true])));
  for (const key of keys) {
    const properties = reader.properties(registry.get(key));
    if (!properties.has("models")) continue;
    const id = reader.string(properties.get("id"));
    const entries = models.arrayRefs(properties.get("models"));
    const modelIds = entries.map((model) =>
      models.literalString(models.properties(model).get("id"))
    );
    const alias = modelIds.length ? reader.optionalString(properties.get("alias")) : undefined;
    inventory.push({ id, alias, modelIds });
  }
  return measureChatModelCounts(inventory);
}

// Paths are restricted to existing public catalog surfaces, with an explicit
// extension point for a new data module. Unknown expressions or modules fail;
// there is no fallback to an old count, runtime import or incomplete inventory.
export function readChatModelCountSnapshot(root, { io = fs } = {}) {
  const base = path.resolve(root);
  const sources = new Map();
  let sourceBytes = 0;
  const readSource = (file) => {
    if (
      typeof file !== "string" ||
      !file.endsWith(".ts") ||
      file.includes("\\") ||
      file.includes("\0") ||
      file.split("/").some((part) => !part || part === "." || part === "..") ||
      !(
        file.startsWith("open-sse/config/") ||
        file.startsWith("src/shared/constants/") ||
        MODEL_DATA_FILES.has(file)
      )
    )
      fail("SOURCE_SCOPE");
    if (sources.has(file)) return sources.get(file).text;
    let absolute = base;
    for (const part of file.split("/")) {
      absolute = path.join(absolute, part);
      let stat;
      try {
        stat = io.lstatSync(absolute);
      } catch (error) {
        if (error.code === "ENOENT") return undefined;
        throw error;
      }
      if (stat.isSymbolicLink()) fail("SOURCE_SYMLINK");
    }
    const stat = io.statSync(absolute);
    if (!stat.isFile() || stat.size > 262144) fail("SOURCE_BLOB_BUDGET");
    const bytes = io.readFileSync(absolute);
    sourceBytes += bytes.length;
    if (bytes.length > 262144 || sourceBytes > 8 * 1024 * 1024 || sources.size >= 4096)
      fail("SOURCE_BUDGET");
    const text = bytes.toString("utf8");
    if (/^(?:<<<<<<< |=======\r?$|>>>>>>> )/m.test(text)) fail("SOURCE_CONFLICT");
    sources.set(file, {
      text,
      sha256: createHash("sha256").update(bytes).digest("hex"),
      bytes: bytes.length,
    });
    return text;
  };
  const facts = projectChatModelCounts(readSource);
  return {
    facts,
    sources: [...sources]
      .sort(([a], [b]) => a.localeCompare(b, "en"))
      .map(([file, { sha256, bytes }]) => ({ path: file, sha256, bytes })),
  };
}
