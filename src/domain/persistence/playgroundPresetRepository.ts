export interface PlaygroundPresetRecord {
  id: string;
  name: string;
  endpoint: string;
  model: string;
  system: string | null;
  params: Record<string, unknown>;
  created_at: string;
}

export interface CreatePlaygroundPresetInput {
  name: string;
  endpoint: string;
  model: string;
  system: string | null | undefined;
  params: Record<string, unknown>;
}

export type UpdatePlaygroundPresetInput = Partial<CreatePlaygroundPresetInput>;

export interface PlaygroundPresetPage {
  items: PlaygroundPresetRecord[];
  total: number;
}

export interface PlaygroundPresetRepository {
  /** Newest first; offset is ignored without limit. Total is the unpaginated count. */
  list(options?: { limit?: number; offset?: number }): Promise<PlaygroundPresetPage>;
  findById(id: string): Promise<PlaygroundPresetRecord | null>;
  create(input: CreatePlaygroundPresetInput): Promise<PlaygroundPresetRecord>;
  /** Omitted/undefined fields are skipped, except a present system key clears to null. */
  update(id: string, patch: UpdatePlaygroundPresetInput): Promise<PlaygroundPresetRecord | null>;
  deleteById(id: string): Promise<boolean>;
}
