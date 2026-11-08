import fs from "fs/promises";
import path from "path";
import {
  buildCodexModelCatalog,
  loadBundledCodexCatalog,
  type CatalogModelInput,
  type CodexModelCatalog,
} from "./codexModelCatalog";

export const CODEX_CATALOG_FILENAME = "omniroute-models.json";

export const getCodexCatalogPath = (codexDir: string) =>
  path.join(codexDir, CODEX_CATALOG_FILENAME);

export type CodexCatalogWriteResult =
  | { catalogPath: string; count: number; warning?: undefined }
  | { warning: string; catalogPath?: undefined; count?: undefined };

type CatalogListEntry = { id?: unknown; type?: unknown; context_length?: unknown };

/**
 * List OmniRoute's chat models through the same unified catalog `/v1/models` serves
 * (hidden models excluded, combos included). The caller's own credentials (session
 * cookie, peer stamp, bearer) are forwarded so the catalog's auth gate sees the
 * same identity that already passed the CLI-tools management check.
 */
export async function listOmniRouteChatModels(request: Request): Promise<CatalogModelInput[]> {
  const { getUnifiedModelsResponse } = await import("@/app/api/v1/models/catalog");
  const headers = new Headers(request.headers);
  headers.delete("content-type");
  headers.delete("content-length");
  const response = await getUnifiedModelsResponse(
    new Request(new URL("/v1/models", request.url), { method: "GET", headers })
  );
  if (!response.ok) return [];
  const body = (await response.json()) as { data?: unknown };
  if (!Array.isArray(body?.data)) return [];
  return (body.data as CatalogListEntry[])
    .filter((m) => typeof m?.id === "string" && (!m.type || m.type === "chat"))
    .map((m) => ({ id: m.id, context_length: m.context_length }));
}

type WriteCatalogOptions = {
  codexDir: string;
  /** Models the user picked in this Apply; listed first and always included. */
  selectedModels: string[];
  listModels: () => Promise<CatalogModelInput[]>;
  loadBundled?: (codexHome: string) => Promise<CodexModelCatalog>;
};

/**
 * Write the OmniRoute model catalog so Codex's `/model` picker lists routable,
 * provider-prefixed ids instead of bare bundled slugs.
 *
 * Fail-open: every failure returns `{ warning }` instead of throwing, so Apply still
 * succeeds without the catalog. Catalog content is never logged.
 */
export async function writeCodexModelCatalog({
  codexDir,
  selectedModels,
  listModels,
  loadBundled = loadBundledCodexCatalog,
}: WriteCatalogOptions): Promise<CodexCatalogWriteResult> {
  let bundled: CodexModelCatalog;
  try {
    bundled = await loadBundled(codexDir);
  } catch (error) {
    console.log(
      "Codex bundled model catalog unavailable:",
      error instanceof Error ? error.message : String(error)
    );
    return {
      warning: "Could not read Codex's bundled model catalog; the /model picker was not updated",
    };
  }

  let listed: CatalogModelInput[] = [];
  try {
    listed = await listModels();
  } catch (error) {
    console.log(
      "Could not build the OmniRoute model list for Codex:",
      error instanceof Error ? error.message : String(error)
    );
  }

  // Selected models go first (they survive the listing cap) and may be custom ids
  // that are absent from the unified catalog.
  const models: CatalogModelInput[] = [];
  const byId = new Map<string, CatalogModelInput>();
  for (const entry of listed) {
    if (entry && typeof entry === "object" && typeof entry.id === "string") {
      byId.set(entry.id, entry);
    }
  }
  for (const id of selectedModels) {
    if (typeof id === "string" && id.trim()) models.push(byId.get(id.trim()) ?? id.trim());
  }
  models.push(...listed);

  if (models.length === 0) {
    return { warning: "No OmniRoute models available; the /model picker was not updated" };
  }

  const catalog = buildCodexModelCatalog(bundled, models);
  const count = catalog.models.filter((m) => m.visibility === "list").length;
  if (count === 0) {
    return {
      warning: "Codex's bundled catalog has no usable template; the /model picker was not updated",
    };
  }

  const catalogPath = getCodexCatalogPath(codexDir);
  try {
    await fs.writeFile(catalogPath, JSON.stringify(catalog));
  } catch (error) {
    console.log(
      "Could not write the Codex model catalog:",
      error instanceof Error ? error.message : String(error)
    );
    return {
      warning: "Could not write the Codex model catalog; the /model picker was not updated",
    };
  }
  return { catalogPath, count };
}

/** Remove the catalog file OmniRoute wrote; a missing file is not an error. */
export async function removeCodexModelCatalog(codexDir: string): Promise<void> {
  try {
    await fs.unlink(getCodexCatalogPath(codexDir));
  } catch (error) {
    const code = (error as NodeJS.ErrnoException)?.code;
    if (code !== "ENOENT") {
      console.log(
        "Could not remove the Codex model catalog:",
        error instanceof Error ? error.message : String(error)
      );
    }
  }
}
