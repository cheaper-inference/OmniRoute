/** db/models/mitmAlias.ts — MITM alias facade (mitmAlias namespace). */

import { backupDbFile } from "../backup";
import { sqliteMitmAliasRepository as repository } from "../repositories/sqliteMitmAliasRepository";

export async function getMitmAlias(toolName?: string) {
  if (toolName) return repository.findByTool(toolName);
  return repository.listAll();
}

export async function setMitmAliasAll(toolName: string, mappings: unknown) {
  await repository.replace(toolName, mappings);
  backupDbFile("pre-write");
}
