/**
 * agyCliTuiExecutor.ts — the `tui` transport for Antigravity.
 *
 * Three transports drive the same `agy` binary:
 *
 *   http  the Antigravity web endpoint (the default, unchanged)
 *   acp   agy's Agent Client Protocol (agyCliExecutor.ts)
 *   tui   agy driven as a person would drive it, through a pseudo-terminal
 *
 * `tui` exists because agy's interactive mode is the only mode where a few
 * behaviours (its own tool loop against the real filesystem, background tasks it
 * keeps running between turns) are actually exercised. It is opt-in per
 * connection or per deployment, never the default: a typo must not move traffic
 * onto a path that needs a CLI installed and signed in. Which transport a request
 * takes, and where `agy` is, are decided once for both CLI transports:
 * `resolveAgyTransport` (agyCliExecutor.ts) and `findAgyBinary` (agyCliPlatform.ts).
 *
 * Modal scope is deliberately the last user turn. agy keeps the conversation
 * itself (`--conversation`), so replaying the history into the prompt would
 * duplicate every message it already holds.
 *
 * The requested model is not passed to agy: it answers with whatever model it is
 * set to, and the response names the model agy's `Stop` hook reported, falling
 * back to the requested one only when agy did not say.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { buildErrorBody } from "../utils/error.ts";
import { runAgyTuiTurn, AgyTuiTurnError } from "../services/agyTuiRunner.ts";
import { tuiRuntimeUnsupported } from "../services/agyTuiHooks.ts";
import { findAgyBinary } from "../services/agyCliPlatform.ts";

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/**
 * The text of the last user turn.
 *
 * The translator puts the client's text in the user parts of the Antigravity
 * envelope, under `contents` either at the top level or inside `request`.
 */
export function lastUserText(body: unknown): string {
  const envelope = isRecord(body) ? body : {};
  const request = isRecord(envelope.request) ? envelope.request : envelope;
  const contents = Array.isArray(request.contents) ? request.contents : [];
  for (let index = contents.length - 1; index >= 0; index -= 1) {
    const entry = contents[index];
    if (!isRecord(entry) || entry.role !== "user" || !Array.isArray(entry.parts)) continue;
    const text = entry.parts
      .map((part) => (isRecord(part) && typeof part.text === "string" ? part.text : ""))
      .filter(Boolean)
      .join("\n")
      .trim();
    if (text) return text;
  }
  return "";
}

/** A stable conversation id, so successive requests of one chat share a session. */
export function tuiConversationKey(body: unknown): string | null {
  const envelope = isRecord(body) ? body : {};
  const request = isRecord(envelope.request) ? envelope.request : envelope;
  const declared = request.sessionId ?? envelope.sessionId;
  // agy only names a conversation with a uuid it minted itself; anything else
  // would send `--conversation` a value it cannot resolve.
  if (typeof declared === "string" && /^[0-9a-fA-F-]{36}$/.test(declared)) return declared;
  return null;
}

/**
 * The folder agy works in. It must exist and be trusted, so it is a dedicated
 * directory rather than the proxy's own working directory (which agy would then
 * be free to edit).
 */
export function tuiWorkspace(env: NodeJS.ProcessEnv = process.env): string {
  const configured = env.OMNIROUTE_AGY_TUI_CWD?.trim();
  const directory = configured || path.join(os.tmpdir(), "omniroute-agy-tui-workspace");
  fs.mkdirSync(directory, { recursive: true });
  return directory;
}

/** One Antigravity SSE frame, as `alt=sse` produces it. */
function sseFrame(response: Record<string, unknown>): string {
  return `data: ${JSON.stringify({ response })}\n\n`;
}

/** A whole turn as an SSE stream, in the envelope the HTTP path sends. */
export function tuiSseBody(model: string, text: string): string {
  const frame = tuiFrame(model, text);
  return `${sseFrame(frame)}data: [DONE]\n\n`;
}

/** The same turn as a single non-streaming Antigravity body. */
export function tuiJsonBody(model: string, text: string): Record<string, unknown> {
  return { response: tuiFrame(model, text) };
}

function tuiFrame(model: string, text: string): Record<string, unknown> {
  return {
    candidates: [{ content: { role: "model", parts: [{ text }] }, finishReason: "STOP" }],
    modelVersion: model,
  };
}

/** The model name agy knows, without the router's provider prefix. */
export function agyModelId(model: string): string {
  return model.replace(/^(?:antigravity|agy)\//, "");
}

/**
 * The model a response names: the one agy reported it used, else the requested
 * one. agy is never told which model to use, so the requested name is only a
 * fallback, never a claim about what answered.
 */
export function tuiModelVersion(requested: string, used: string | null | undefined): string {
  const reported = typeof used === "string" ? used.trim() : "";
  return reported || agyModelId(requested);
}

/**
 * An agy failure as the response the caller sees.
 *
 * Hard Rule #12: the body comes from `buildErrorBody()`, never from raw error
 * text. The status is the one the turn derived from agy's own report.
 */
export function tuiErrorResponse(error: unknown): Response {
  const status = error instanceof AgyTuiTurnError ? error.status : 502;
  const message =
    error instanceof Error && error.message ? error.message : "agy: the turn failed with no detail";
  const type =
    status === 402 || status === 429
      ? "rate_limit_error"
      : status >= 500
        ? "provider_error"
        : "invalid_request_error";
  return new Response(JSON.stringify(buildErrorBody(status, message, undefined, { type })), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export type AgyTuiExecutorRequest = {
  model: string;
  body: unknown;
  stream: boolean;
  signal?: AbortSignal | null;
};

/**
 * What a turn reaches outside this process for. Production uses the real ones;
 * a test swaps them so it never finds the host's own agy, spawns `script` or
 * writes the operator's `~/.gemini` hook file.
 */
export type AgyTuiExecutorDeps = {
  findBinary?: () => string | null;
  runTurn?: typeof runAgyTuiTurn;
};

/**
 * Drive one completion through agy's interactive mode.
 *
 * Missing pieces of the environment (no POSIX pseudo-terminal, no `agy` on the
 * machine, no user turn to send) are reported as responses rather than thrown:
 * they are operational states with an actionable message, not a crash of the
 * request pipeline.
 */
export async function executeViaAgyTui(
  request: AgyTuiExecutorRequest,
  deps: AgyTuiExecutorDeps = {}
): Promise<{ response: Response; url: string }> {
  const { model, body, stream, signal } = request;
  const { findBinary = () => findAgyBinary(), runTurn = runAgyTuiTurn } = deps;

  // A request with no user turn is the caller's mistake on any host, so it is
  // reported as one rather than as the host's missing capability.
  const prompt = lastUserText(body);
  if (!prompt) {
    return {
      response: tuiErrorResponse(new AgyTuiTurnError("agy: the request carried no user text", 400)),
      url: "agy://tui",
    };
  }

  if (tuiRuntimeUnsupported()) {
    return {
      response: tuiErrorResponse(
        new AgyTuiTurnError(
          "the tui transport runs agy in its interactive mode, which needs a POSIX pseudo-terminal; use the http transport on this host",
          501
        )
      ),
      url: "agy://tui",
    };
  }

  const executable = findBinary();
  if (!executable) {
    return {
      response: tuiErrorResponse(
        new AgyTuiTurnError(
          "agy: the `agy` CLI was not found. Install it and sign in, set AGY_PATH, or switch this connection back to the http transport.",
          502
        )
      ),
      url: "agy://tui",
    };
  }

  try {
    const result = await runTurn({
      executable,
      conversationId: tuiConversationKey(body),
      prompt,
      cwd: tuiWorkspace(),
      signal: signal ?? undefined,
    });
    const upstreamModel = tuiModelVersion(model, result.model);
    const payload = stream
      ? new Response(tuiSseBody(upstreamModel, result.text), {
          status: 200,
          headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
        })
      : new Response(JSON.stringify(tuiJsonBody(upstreamModel, result.text)), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
    return { response: payload, url: "agy://tui" };
  } catch (error) {
    return { response: tuiErrorResponse(error), url: "agy://tui" };
  }
}
