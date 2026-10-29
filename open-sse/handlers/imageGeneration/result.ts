import { isJsonObject } from "../../utils/kieTask.ts";

type ImageEndpointSuccess = {
  success: true;
  data: { created: unknown; data: unknown[] };
  usage?: Record<string, unknown>;
  status?: never;
  error?: never;
};

export type ImageEndpointResult =
  | ImageEndpointSuccess
  | { success: false; status: number; error: string; data?: never; usage?: never };

/** Keep upstream usage internal while preserving the OpenAI-compatible public payload. */
export function buildImageEndpointSuccess(
  data: Record<string, unknown>,
  items: unknown[]
): ImageEndpointSuccess {
  return {
    success: true,
    data: {
      created: data.created || Math.floor(Date.now() / 1000),
      data: items,
    },
    usage: isJsonObject(data?.usage) ? data.usage : undefined,
  };
}
