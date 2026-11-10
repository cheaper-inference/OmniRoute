/**
 * POST /v1/systemone — System One typed decisions (#13987).
 *
 * Body: `{ model?, state, questions }` where questions map ids to typed
 * questions (`noul`, `choice`, `score`). Response: `{ model, answers, usage }`
 * passthrough with calibrated probabilities. Models: `typesafe/jev-*` or bare
 * `jev-*` aliases (native api.typesafe.ai), `openrouter/<vendor>/<model>` for
 * OpenRouter-hosted decisions models. GET lists decisions-capable models.
 *
 * Not a chat endpoint — decisions models never join chat pickers or combos.
 */

import { createSystemOneRouteHandlers } from "@/app/api/v1/_shared/systemOneRoute";

const handlers = createSystemOneRouteHandlers("/v1/systemone");

export const dynamic = "force-dynamic";

export const OPTIONS = handlers.OPTIONS;
export const GET = handlers.GET;
export const POST = handlers.POST;
