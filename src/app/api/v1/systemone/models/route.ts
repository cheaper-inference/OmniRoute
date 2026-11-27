/**
 * GET /v1/systemone/models — decision-model catalog (#18838): System One rows and native
 * OpenAI Decisions rows, each with its `api_format`, paged by `limit` / `after`.
 */
import { getDecisionCatalog } from "@/app/api/v1/_shared/decisionCatalog";
import { CORS_HEADERS } from "@omniroute/open-sse/utils/cors.ts";

export const dynamic = "force-dynamic";

export const OPTIONS = () => new Response(null, { headers: CORS_HEADERS });
export const GET = (request: Request) => getDecisionCatalog(request);
