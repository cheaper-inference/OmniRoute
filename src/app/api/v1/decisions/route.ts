import { postDecision } from "../_shared/decisionRuntime";
import { CORS_HEADERS } from "@omniroute/open-sse/utils/cors.ts";

export const runtime = "nodejs";
export const POST = (request: Request) => postDecision(request, "decisions");
export const OPTIONS = () => new Response(null, { headers: CORS_HEADERS });
