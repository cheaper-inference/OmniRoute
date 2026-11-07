import { record } from "../handlers/decisionTypes.ts";

/** Annotate only models already present in the authorized catalog. */
export const OPENAI_DECISION_MODEL_IDS = new Set(["gpt-6-luna"]);

/** Legacy `decisions` is a category: TypeSafe/OpenRouter use System One on the wire. */
export function isLegacySystemOneModel(row: Record<string, unknown>): boolean {
  if (typeof row.id !== "string" || !/^(typesafe|openrouter)\//.test(row.id)) return false;
  const endpoints = Array.isArray(row.supported_endpoints) ? row.supported_endpoints : [];
  return (
    row.type === "decisions" || endpoints.includes("systemone") || endpoints.includes("decisions")
  );
}

export function annotateLegacySystemOneModel(
  row: Record<string, unknown>
): Record<string, unknown> {
  if (!isLegacySystemOneModel(row)) return row;
  const endpoints = Array.isArray(row.supported_endpoints) ? row.supported_endpoints : [];
  return {
    ...row,
    api_format: "systemone",
    supported_endpoints: [
      ...new Set([...endpoints.filter((endpoint) => endpoint !== "decisions"), "systemone"]),
    ],
    capabilities: { ...record(row.capabilities), decision: true },
  };
}

export function annotateNativeDecisionCapabilities(
  rows: Record<string, unknown>[]
): Record<string, unknown>[] {
  return rows.map((row) => {
    if (row.owned_by === "combo") return row;
    if (isLegacySystemOneModel(row)) return annotateLegacySystemOneModel(row);
    if (row.id === "supersoniclabs/julia-1") {
      return {
        ...row,
        type: "decisions",
        api_format: "systemone",
        supported_endpoints: ["systemone"],
        capabilities: {
          ...record(row.capabilities),
          decision: true,
          tool_calling: false,
          reasoning: false,
        },
        context_length: null,
        context_window: null,
        context_size: null,
        contextWindow: null,
        max_model_len: null,
        max_input_tokens: null,
        max_output_tokens: null,
        max_completion_tokens: null,
        max_tokens: null,
        pricing: null,
        limit: { ...record(row.limit), context: null, output: null },
        meta: {
          ...record(row.meta),
          context_length: null,
          n_ctx_train: null,
          max_output_tokens: null,
        },
      };
    }
    if (
      typeof row.id !== "string" ||
      !row.id.startsWith("openai/") ||
      !OPENAI_DECISION_MODEL_IDS.has(row.id.slice(7))
    )
      return row;
    const endpoints = Array.isArray(row.supported_endpoints)
      ? row.supported_endpoints
      : ["chat", "responses"];
    return {
      ...row,
      supported_endpoints: [...new Set([...endpoints, "decisions"])],
      capabilities: { ...record(row.capabilities), decision: true },
    };
  });
}
