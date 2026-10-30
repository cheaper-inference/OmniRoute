/**
 * POST /v1/decisions — OpenRouter-alpha-compatible alias of /v1/systemone
 * (#13987). OpenRouter's SDK posts decisions to /api/alpha/decisions; clients
 * that already speak that shape only need to swap the base URL to the gateway
 * and keep "/v1/decisions" on their request path. Same body, backend
 * resolution, credentials, and usage accounting as /v1/systemone.
 */

import { createSystemOneRouteHandlers } from "@/app/api/v1/_shared/systemOneRoute";

const handlers = createSystemOneRouteHandlers("/v1/decisions");

export const dynamic = "force-dynamic";

export const OPTIONS = handlers.OPTIONS;
export const GET = handlers.GET;
export const POST = handlers.POST;
