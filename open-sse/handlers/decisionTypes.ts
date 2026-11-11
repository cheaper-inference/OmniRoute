/** Native decision protocols deliberately do not share a wire schema. */
export type DecisionFormat = "decisions" | "systemone";
export type DecisionRecord = Record<string, unknown>;

export interface DecisionCredentials {
  apiKey?: string | null;
  accessToken?: string | null;
  connectionId?: string | null;
  providerSpecificData?: DecisionRecord | null;
}

export interface DecisionBackend {
  provider: string;
  format: DecisionFormat;
  url: string;
  modelsUrl: string;
  discovery: "openai" | "ollama" | "systemone" | "cloudflare";
  transport?: "cloudflare";
  /** Only operator-managed servers without discovery need an explicit model list. */
  models?: string[];
  fallbackModels: string[];
  timeoutMs: number;
}

export interface DecisionModel {
  id: string;
  object: "model";
  owned_by: string;
  type: "decisions";
  api_format: DecisionFormat;
  supported_endpoints: DecisionFormat[];
  capabilities: { decision: true; vision?: boolean };
  pricing: null;
}

export class DecisionError extends Error {
  constructor(
    public status: number,
    public category: string
  ) {
    // Fixed messages only: neither upstream bodies nor URLs belong in client errors/logs.
    super(`Decision gateway: ${category}`);
  }
}

export function record(value: unknown): DecisionRecord {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as DecisionRecord)
    : {};
}

export type DecisionFetch = (
  url: string,
  credentials: DecisionCredentials,
  init: RequestInit
) => Promise<Response>;
