import { z } from "zod";
import { isDashscopeTextModelId } from "../../../open-sse/services/dashscopeTextModels.ts";
import {
  ALIBABA_PROVIDER_ENDPOINTS,
  resolveAlibabaProviderRegion,
} from "../../shared/constants/alibabaProviderRegions.ts";

// Public model list used by the official Qwen Personal Token Plan pricing page.
// This is a product catalog, not an account entitlement or quota check.
const MODEL_LIST_API = "zeldaEasy.bmp.bmpTokenPlanServcie.modelIdList";

export function isTokenPlanCatalogProvider(provider: string): boolean {
  return provider === "qwen-cloud-token-plan" || provider === "bailian-coding-plan";
}

type TokenPlanCatalogScope = "connection" | "product";

export function buildTokenPlanCatalogRequest(
  provider: string,
  providerSpecificData: unknown,
  apiKey: string
): { url: string; init: RequestInit; scope: TokenPlanCatalogScope } {
  if (!isTokenPlanCatalogProvider(provider)) throw new Error("Unsupported Token Plan provider");
  if (resolveAlibabaProviderRegion(provider, providerSpecificData) === "global-sg") {
    if (!apiKey)
      throw Object.assign(new Error("Token Plan key required"), { code: "NO_CREDENTIAL" });
    // Both Singapore products list models on the OpenAI-compatible host,
    // including connections that send inference to the Anthropic-compatible API.
    const baseUrl = ALIBABA_PROVIDER_ENDPOINTS["qwen-cloud-token-plan"]["global-sg"];
    return {
      url: `${baseUrl}/models`,
      init: {
        method: "GET",
        headers: { Accept: "application/json", Authorization: `Bearer ${apiKey}` },
      },
      scope: "connection",
    };
  }

  // Beijing retains the public product catalog until its authenticated listing is verified.
  const action = "BroadScopeAspnGateway";
  const query = new URLSearchParams({ action, product: "sfm_bailian", api: MODEL_LIST_API });
  const body = new URLSearchParams({
    product: "sfm_bailian",
    action,
    sec_token: "",
    region: "cn-beijing",
    params: JSON.stringify({
      Api: MODEL_LIST_API,
      Data: {
        edition: "PERSONAL",
        cornerstoneParam: {
          consoleSite: "QIANWENAI",
          domain: "www.qianwenai.com",
          productCode: "p_efm",
          protocol: "V2",
          xsp_lang: "zh-CN",
        },
      },
    }),
  });
  return {
    url: `https://cs-data.qianwenai.com/data/api.json?${query}`,
    scope: "product",
    init: {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
      body: body.toString(),
    } satisfies RequestInit,
  };
}

const modelId = z
  .string()
  .trim()
  .min(1)
  .max(256)
  .regex(/^[a-zA-Z0-9._-]+$/);
const connectionCatalog = z.object({
  data: z.array(z.object({ id: modelId })).max(2000),
  has_more: z.literal(false).optional(),
});

const successCode = z.union([z.literal("200"), z.literal(200)]);
const catalogEnvelope = z.object({
  code: successCode,
  data: z.object({
    success: z.literal(true),
    DataV2: z.object({
      data: z.object({
        code: successCode,
        success: z.literal(true),
        data: z.array(modelId).max(2000),
      }),
    }),
  }),
});

export function parseTokenPlanCatalog(
  payload: unknown,
  scope: TokenPlanCatalogScope
): Array<{ id: string; name: string }> {
  let modelIds: string[];
  if (scope === "connection") {
    const parsed = connectionCatalog.safeParse(payload);
    if (!parsed.success) {
      throw Object.assign(new Error("Token Plan catalog returned an invalid response"), {
        code: "INVALID_RESPONSE",
      });
    }
    modelIds = parsed.data.data.map(({ id }) => id);
  } else {
    const parsed = catalogEnvelope.safeParse(payload);
    if (!parsed.success) {
      throw Object.assign(new Error("Token Plan catalog returned an invalid response"), {
        code: "INVALID_RESPONSE",
      });
    }
    modelIds = parsed.data.data.DataV2.data.data;
  }
  const ids = [...new Set(modelIds)].filter((id) => id === "auto" || isDashscopeTextModelId(id));
  // An unexpected empty/media-only response must not erase a previously usable chat catalog.
  if (ids.length === 0) {
    throw Object.assign(new Error("Token Plan catalog returned no chat models"), {
      code: "EMPTY_CATALOG",
    });
  }
  return ids.map((id) => ({ id, name: id }));
}
