/** `decisions` was historically a System One category, not a wire format. */
export function resolveDecisionProtocol(
  model: {
    id?: string;
    owned_by?: string;
    type?: string;
    api_format?: unknown;
    apiFormat?: unknown;
    supported_endpoints?: unknown;
    supportedEndpoints?: unknown;
  },
  nodeType?: string
): "decisions" | "systemone" | null {
  const format = model.api_format ?? model.apiFormat;
  if (format === "systemone" || format === "decisions") return format;
  const endpoints = model.supported_endpoints ?? model.supportedEndpoints;
  const values = Array.isArray(endpoints) ? endpoints : [];
  if (values.includes("systemone")) return "systemone";
  if (nodeType === "systemone" || nodeType === "decisions") return nodeType;
  if (!values.includes("decisions") && model.type !== "decisions") return null;
  const provider = model.owned_by || model.id?.split("/")[0];
  return provider === "openai" ? "decisions" : "systemone";
}
