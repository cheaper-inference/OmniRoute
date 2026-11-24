/**
 * POST /v1/decisions — native OpenAI Decisions (#18838).
 *
 * Body: `{ model: "openai/gpt-6-luna" | "gpt-6-luna", input, questions[] }` in the
 * Decisions wire format; the response is the upstream `{ model, answers[], usage }`.
 * Not a chat endpoint and never translated to or from chat or System One.
 */
import { createDecisionsRouteHandlers } from "@/app/api/v1/_shared/decisionsRoute";

const handlers = createDecisionsRouteHandlers();

export const dynamic = "force-dynamic";

export const OPTIONS = handlers.OPTIONS;
export const POST = handlers.POST;
