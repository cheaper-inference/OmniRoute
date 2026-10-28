/** OpenAI-shaped Decisions subset over the existing native System One lane.
 * Named text questions and text/JSON evidence only; provider-qualified models.
 */
import { createDecisionsPostHandler } from "./handler.ts";
export const dynamic = "force-dynamic";
export const POST = createDecisionsPostHandler();
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}
