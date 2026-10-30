/**
 * SSE Leaderboard Stream — /api/gamification/stream
 *
 * Pushes live leaderboard updates to connected clients via Server-Sent Events.
 * Supports all leaderboard scopes (global, weekly, monthly, tokens_shared, contributions).
 */

import { NextRequest } from "next/server";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { createBoundedEventStream } from "@/lib/api/boundedEventStream";
import { type LeaderboardScope, getTopN } from "@/lib/gamification/leaderboard";
import { CORS_HEADERS } from "@/shared/utils/cors";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

const VALID_SCOPES: ReadonlySet<string> = new Set([
  "global",
  "weekly",
  "monthly",
  "tokens_shared",
  "contributions",
]);

/**
 * GET /api/gamification/stream — SSE leaderboard updates
 *
 * Query params:
 *   scope — one of: global, weekly, monthly, tokens_shared, contributions (default: global)
 */
export async function GET(request: NextRequest) {
  const authErr = await requireManagementAuth(request);
  if (authErr) return authErr;

  const url = new URL(request.url);
  const rawScope = url.searchParams.get("scope") || "global";
  const scope: LeaderboardScope = VALID_SCOPES.has(rawScope)
    ? (rawScope as LeaderboardScope)
    : "global";

  const stream = createBoundedEventStream(request.signal, (sink) => {
    const encoder = new TextEncoder();
    let updating = false;
    const sendUpdate = async () => {
      if (sink.isClosed() || updating) return;
      updating = true;
      try {
        const entries = await getTopN(scope, 50);
        if (sink.isClosed()) return;
        const data = JSON.stringify({ type: "leaderboard", scope, entries });
        sink.send(encoder.encode(`data: ${data}\n\n`));
      } catch (error) {
        sink.send(
          encoder.encode(
            `event: error\ndata: ${JSON.stringify({ error: sanitizeErrorMessage(error) })}\n\n`
          )
        );
      } finally {
        updating = false;
      }
    };
    void sendUpdate();
    const heartbeat = setInterval(() => {
      sink.send(encoder.encode(`: heartbeat ${Date.now()}\n\n`));
    }, 15_000);
    const updater = setInterval(() => {
      void sendUpdate();
    }, 5_000);
    sink.onCleanup(() => {
      clearInterval(heartbeat);
      clearInterval(updater);
    });
  });

  return new Response(stream, {
    headers: {
      ...CORS_HEADERS,
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
