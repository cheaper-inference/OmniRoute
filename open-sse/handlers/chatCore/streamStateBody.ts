import { FORMATS } from "../../translator/formats.ts";

type JsonRecord = Record<string, unknown>;

/**
 * Give response translation the client's tool schemas when a Chat or Claude
 * request was converted to another wire format. Provider normalization may
 * remove schema defaults or add aliases, but response argument cleanup belongs
 * to the schema the client declared.
 */
export function resolveStreamStateBody(
  clientResponseFormat: string | null | undefined,
  clientBody: JsonRecord | null | undefined,
  finalBody: JsonRecord | null | undefined
): JsonRecord | null | undefined {
  const usesClientToolSchema =
    clientResponseFormat === FORMATS.CLAUDE || clientResponseFormat === FORMATS.OPENAI;
  if (usesClientToolSchema && Array.isArray(clientBody?.tools)) {
    return { ...(finalBody || clientBody), tools: clientBody.tools };
  }
  return finalBody || clientBody;
}
