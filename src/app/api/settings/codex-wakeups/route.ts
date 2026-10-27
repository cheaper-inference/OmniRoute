import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponse } from "@/lib/api/errorResponse";
import {
  CodexWakeupStoreError,
  createCodexWakeupTask,
  deleteCodexWakeupTask,
  listCodexWakeupRuns,
  listCodexWakeupTasks,
  updateCodexWakeupTask,
} from "@/lib/db/codexWakeups";
import { nextWakeupAt } from "@/lib/services/codexWakeupSchedule";
import { findUnusableWakeupAccounts, runCodexWakeupTaskNow } from "@/lib/services/codexWakeups";
import {
  codexWakeupActionSchema,
  type CodexWakeupTaskInput,
} from "@/shared/validation/codexWakeupSchemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

/**
 * Scheduled Codex account wakeups (Settings → AI → Codex Quota Auto-Ping).
 *
 * GET  → { tasks, runs } (newest 20 runs).
 * POST → { action: "create" | "update", task } · { action: "delete" | "run", id }.
 *
 * Every run spends real Codex quota, so this is a management route; writes from the
 * dashboard are origin/CSRF-checked by the central authz pipeline. Error bodies carry
 * fixed messages only.
 */

export const dynamic = "force-dynamic";

const STORE_ERRORS: Record<CodexWakeupStoreError["code"], [number, string]> = {
  not_found: [404, "Wakeup task not found"],
  running: [409, "Wakeup task is running; wait for it to finish"],
  limit: [409, "Maximum number of wakeup tasks reached"],
};

function invalid(message: string) {
  return createErrorResponse({ status: 400, message, type: "invalid_request" });
}

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    return NextResponse.json({ tasks: listCodexWakeupTasks(), runs: listCodexWakeupRuns(20) });
  } catch {
    return createErrorResponse({ status: 500, message: "Failed to load wakeup tasks" });
  }
}

async function saveTask(task: CodexWakeupTaskInput, id: string | null) {
  // Disabling a task never needs its accounts to still be usable.
  if (task.enabled || !id) {
    const unusable = await findUnusableWakeupAccounts(task.connectionIds);
    if (unusable.length > 0) return invalid("Choose active Codex OAuth accounts");
  }
  const nowMs = Date.now();
  const nextRunAt = task.enabled ? nextWakeupAt(task.schedule, nowMs) : null;
  const saved = id
    ? updateCodexWakeupTask(id, task, nextRunAt, nowMs)
    : createCodexWakeupTask(task, nextRunAt, nowMs);
  return NextResponse.json({ task: saved }, { status: id ? 200 : 201 });
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return invalid("Invalid JSON body");
  }
  const validation = validateBody(codexWakeupActionSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }
  const body = validation.data;

  try {
    switch (body.action) {
      case "create":
        return await saveTask(body.task, null);
      case "update":
        return await saveTask(body.task, body.id);
      case "delete":
        deleteCodexWakeupTask(body.id);
        return NextResponse.json({ ok: true });
      case "run": {
        const run = runCodexWakeupTaskNow(body.id);
        if (!run) return createErrorResponse({ status: 409, message: STORE_ERRORS.running[1] });
        return NextResponse.json({ run }, { status: 202 });
      }
    }
  } catch (error) {
    if (error instanceof CodexWakeupStoreError) {
      const [status, message] = STORE_ERRORS[error.code];
      return createErrorResponse({ status, message });
    }
    return createErrorResponse({ status: 500, message: "Wakeup operation failed" });
  }
}
