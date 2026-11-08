/** Retained application-console history, newest page first, returned in display order. */
import { NextResponse, type NextRequest } from "next/server";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  ConsoleLogHistoryError,
  consoleLogQuerySchema,
  readConsoleLogHistory,
} from "@/lib/consoleLogHistory";

const NO_STORE = { "Cache-Control": "no-store, no-cache, must-revalidate" };

export async function GET(request: NextRequest) {
  // Authorize before inspecting the filesystem, or even interpreting a history cursor.
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const query = consoleLogQuerySchema.safeParse(
    Object.fromEntries(new URL(request.url).searchParams)
  );
  if (!query.success)
    return NextResponse.json(buildErrorBody(400, "Invalid log history query."), {
      status: 400,
      headers: NO_STORE,
    });
  try {
    const result = await readConsoleLogHistory(query.data);
    return NextResponse.json(result.entries, {
      status: 200,
      headers: {
        ...NO_STORE,
        ...(result.nextCursor ? { "X-Console-Next-Cursor": result.nextCursor } : {}),
        "X-Console-Truncated": String(result.truncated),
      },
    });
  } catch (error: unknown) {
    if (error instanceof ConsoleLogHistoryError)
      return NextResponse.json(buildErrorBody(error.status, error.message), {
        status: error.status,
        headers: NO_STORE,
      });
    console.error(
      "[consoleHistory] Unable to read retained logs:",
      error instanceof Error ? error.name : "unknown"
    );
    return NextResponse.json(
      { error: buildErrorBody(500, "Failed to read logs.").error.message },
      { status: 500, headers: NO_STORE }
    );
  }
}
