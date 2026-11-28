/** Alias name → mapping, as written by the alias route, model import and agent bridge. */
export type MitmAliasMappingRecord = Record<string, unknown>;

/** Persistence only; the DB facade owns backup side effects. */
export interface MitmAliasRepository {
  /** The tool's mappings, or `{}` when the tool has no stored value. Malformed JSON rejects. */
  findByTool(toolName: string): Promise<MitmAliasMappingRecord>;
  /** Mappings for every tool; any malformed stored value rejects the whole read. */
  listAll(): Promise<Record<string, MitmAliasMappingRecord>>;
  /** Replaces the tool's mappings; nullish mappings are stored as `{}`. */
  replace(toolName: string, mappings: unknown): Promise<void>;
}
