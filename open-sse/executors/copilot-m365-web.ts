import WebSocket from "ws";
import { getAccessToken } from "../services/tokenRefresh.ts";
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import {
  buildWsUrl,
  currentM365AccessToken,
  extractToolSpec,
  resolveConnectionParams,
  tokenNeedsRefresh,
} from "./copilot-m365-connection.ts";
import { buildChatInvocation, clientPlugins } from "./copilot-m365-frames.ts";
import { M365TurnComposer, M365_MAX_TEXT_LENGTH } from "./m365Protocol/composer.ts";
import { resolveM365Profile } from "./m365Protocol/profile.ts";
import { buildM365ToolInstructions, parseM365ToolOutput } from "./m365Protocol/tools.ts";
import { runM365Turn, M365TurnError, type M365WebSocketConstructor } from "./m365Turn.ts";
import {
  M365ExecutorError,
  m365ErrorResponse,
  m365Failure,
  m365Output,
} from "./m365ExecutorOutput.ts";

type JsonRecord = Record<string, unknown>;
const DIAGNOSTIC_URL = "wss://substrate.office.com/m365Copilot/Chathub?access_token=REDACTED";
let WebSocketCtor: typeof WebSocket = WebSocket;
export function __setCopilotM365WebSocketForTesting(ctor: typeof WebSocket): () => void {
  const previous = WebSocketCtor;
  WebSocketCtor = ctor;
  return () => {
    WebSocketCtor = previous;
  };
}
const record = (value: unknown): JsonRecord =>
  value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};

/** Fresh conversations require entire history, including unabridged tool results. */
function historyPrompt(body: JsonRecord): string {
  const messages = Array.isArray(body.messages) ? body.messages : [];
  const parts: string[] = [];
  let size = 0;
  for (const raw of messages) {
    const message = record(raw);
    let content = typeof message.content === "string" ? message.content : "";
    if (Array.isArray(message.content)) {
      content = message.content
        .map((rawPart) => {
          const part = record(rawPart);
          if (part.type !== "text" || typeof part.text !== "string")
            throw new M365ExecutorError(
              400,
              "unsupported_content",
              "Microsoft 365 Copilot image/vision and non-text parts are not supported."
            );
          return part.text;
        })
        .join("\n");
    }
    const role = typeof message.role === "string" ? message.role : "user";
    const item =
      `[${role}${role === "tool" ? ` result id=${String(message.tool_call_id ?? "")}` : ""}]\n${content}` +
      (Array.isArray(message.tool_calls)
        ? `\n[assistant tool_calls]\n${JSON.stringify(message.tool_calls)}`
        : "");
    size += item.length;
    if (size > M365_MAX_TEXT_LENGTH || parts.length >= 256)
      throw new M365ExecutorError(
        400,
        "m365_input_too_large",
        "Microsoft 365 Copilot input exceeded the size limit."
      );
    if (content || Array.isArray(message.tool_calls)) parts.push(item);
  }
  return parts.join("\n\n");
}
export class CopilotM365WebExecutor extends BaseExecutor {
  constructor() {
    super("copilot-m365-web", { id: "copilot-m365-web", baseUrl: "wss://substrate.office.com" });
  }
  private async preflight(input: ExecuteInput): Promise<void> {
    const credentials = input.credentials;
    const psd = record(credentials.providerSpecificData);
    const legacy = typeof psd.refreshToken === "string" ? psd.refreshToken : "";
    if (!credentials.refreshToken && legacy) credentials.refreshToken = legacy;
    if (!credentials.refreshToken) return;
    const current = currentM365AccessToken(credentials);
    const expires = credentials.expiresAt ? Date.parse(credentials.expiresAt) : NaN;
    if (!(Number.isFinite(expires) ? expires <= Date.now() + 300_000 : tokenNeedsRefresh(current)))
      return;
    const nextCredentials = (result: JsonRecord) => ({
      ...credentials,
      ...result,
      accessToken: typeof result.accessToken === "string" ? result.accessToken : "",
      refreshToken:
        typeof result.refreshToken === "string" && result.refreshToken
          ? result.refreshToken
          : credentials.refreshToken,
    });
    let refreshed: unknown;
    try {
      refreshed = await getAccessToken(
        "copilot-m365-web",
        credentials,
        undefined,
        null,
        async (result: JsonRecord) => {
          await input.onCredentialsRefreshed?.(nextCredentials(result));
        }
      );
    } catch {
      throw new M365ExecutorError(
        401,
        "m365_refresh_failed",
        "Microsoft 365 Copilot credential refresh failed."
      );
    }
    const result = record(refreshed);
    if (typeof result.accessToken !== "string" || !result.accessToken || result.error)
      throw new M365ExecutorError(
        401,
        "m365_refresh_failed",
        "Microsoft 365 Copilot credential refresh failed. Reconnect this account."
      );
    Object.assign(credentials, nextCredentials(result));
  }
  async execute(input: ExecuteInput): Promise<{
    response: Response;
    url: string;
    headers: Record<string, string>;
    transformedBody: unknown;
  }> {
    const body = record(input.body);
    const model = input.model || (typeof body.model === "string" ? body.model : "copilot-m365");
    // No credential URL, prompt, history, or tool arguments enter call logs.
    const wrap = (response: Response) => ({
      response,
      url: DIAGNOSTIC_URL,
      headers: {},
      transformedBody: { model },
    });
    try {
      if (input.signal?.aborted) throw new M365TurnError("M365_ABORTED");
      const history = historyPrompt(body);
      if (!history)
        throw new M365ExecutorError(400, "invalid_request", "No user message provided.");
      const { tools, toolChoice } = extractToolSpec(body);
      const toolOptions = { toolChoice, parallelToolCalls: body.parallel_tool_calls !== false };
      const instructions = buildM365ToolInstructions(tools, toolOptions);
      const prompt = [instructions, history].filter(Boolean).join("\n\n");
      if (prompt.length > M365_MAX_TEXT_LENGTH)
        throw new M365ExecutorError(
          400,
          "m365_input_too_large",
          "Microsoft 365 Copilot input exceeded the size limit."
        );
      // The refresh belongs to the canonical connection mutex, not this request.
      // Detach only our wait on cancellation; keep grant/persistence and rejection observed.
      const preflight = this.preflight(input);
      if (input.signal) {
        const requestSignal = input.signal;
        await new Promise<void>((resolve, reject) => {
          const onAbort = () => {
            requestSignal.removeEventListener("abort", onAbort);
            reject(new M365TurnError("M365_ABORTED"));
          };
          const cleanup = () => requestSignal.removeEventListener("abort", onAbort);
          requestSignal.addEventListener("abort", onAbort, { once: true });
          if (requestSignal.aborted) onAbort();
          preflight.then(
            () => {
              cleanup();
              resolve();
            },
            (error: unknown) => {
              cleanup();
              reject(error);
            }
          );
        });
      } else {
        await preflight;
      }
      if (input.signal?.aborted) throw new M365TurnError("M365_ABORTED");
      const params = resolveConnectionParams(input.credentials);
      if ("error" in params) throw new M365ExecutorError(400, "invalid_credentials", params.error);
      const psd = record(input.credentials.providerSpecificData);
      const override = (key: string) =>
        typeof psd[key] === "string" && psd[key] ? (psd[key] as string) : undefined;
      const profile = resolveM365Profile({
        model,
        tier: params.tier,
        tone: override("tone"),
        scenario: override("scenario"),
        licenseType: override("licenseType"),
        agent: override("agent"),
      });
      const url = new URL(
        buildWsUrl({
          ...params,
          scenario: profile.scenario,
          licenseType: profile.licenseType,
          agent: profile.agent,
        })
      );
      url.searchParams.set("disableMemory", "1");
      const invocation = buildChatInvocation({
        ...profile,
        text: prompt,
        traceId: crypto.randomUUID(),
        sessionId: url.searchParams.get("X-SessionId")!,
        requestId: url.searchParams.get("chatsessionid")!,
        conversationId: url.searchParams.get("ConversationId")!,
        isStartOfSession: true,
        ...(instructions
          ? { plugins: clientPlugins(tools), toolChoice, customInstructions: instructions }
          : {}),
      });
      const composer = new M365TurnComposer();
      const output = m365Output(model);
      const buffered = input.stream === false || instructions.length > 0;
      const controller = new AbortController();
      const signal = input.signal
        ? AbortSignal.any([input.signal, controller.signal])
        : controller.signal;
      let streamRewriteError: M365ExecutorError | undefined;
      input.log?.debug?.("M365_WS", `connecting ${DIAGNOSTIC_URL}`);
      const run = (onDelta?: (delta: string) => void) =>
        runM365Turn({
          url: url.toString(),
          invocation,
          signal,
          WebSocketCtor: WebSocketCtor as unknown as M365WebSocketConstructor,
          onFrame(frame) {
            // Only protocol enums are diagnostics; frame text, IDs and raw URLs stay private.
            if (frame.type === undefined) input.log?.debug?.("M365_WS", "handshake complete");
            else
              input.log?.debug?.(
                "M365_WS",
                `frame type=${Number(frame.type)} target=${frame.target === "update" ? "update" : "other"}`
              );
            const update = composer.push(frame);
            if (!buffered && update.streamingDiverged) {
              streamRewriteError = new M365ExecutorError(
                502,
                "m365_stream_rewritten",
                "Microsoft 365 Copilot rewrote content already published in this stream. Retry without streaming."
              );
              // Abort owns transport cleanup; callback exceptions are deliberately sanitized
              // by the transport, so retain this local typed failure at the executor boundary.
              controller.abort();
              return;
            }
            if (update.delta) onDelta?.(update.delta);
          },
        })
          .catch((error: unknown) => {
            throw streamRewriteError ?? error;
          })
          .then(() => {
            if (streamRewriteError) throw streamRewriteError;
            if (!composer.text)
              throw new M365ExecutorError(
                502,
                "m365_empty_response",
                "Microsoft 365 Copilot turn completed with no content in any known frame shape."
              );
            const parsed = parseM365ToolOutput(composer.text, tools, toolOptions);
            if (parsed.constraintViolation)
              throw new M365ExecutorError(
                502,
                "m365_tool_constraint",
                "Microsoft 365 Copilot did not satisfy the requested tool contract."
              );
            return parsed;
          });
      if (buffered) {
        const parsed = await run();
        return wrap(
          input.stream === false
            ? output.json(parsed)
            : new Response(output.bufferedSse(parsed), {
                headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
              })
        );
      }
      // Hold HTTP commitment until meaningful content or a terminal failure.
      let ready!: (error?: unknown) => void;
      const first = new Promise<unknown>((resolve) => {
        ready = resolve;
      });
      const encoder = new TextEncoder();
      let cancelled = false;
      const stream = new ReadableStream<Uint8Array>({
        start(sink) {
          void run((delta) => {
            if (cancelled) return;
            sink.enqueue(encoder.encode(output.chunk({ content: delta })));
            ready();
          }).then(
            () => {
              if (cancelled) return;
              sink.enqueue(encoder.encode(output.chunk({}, "stop") + "data: [DONE]\n\n"));
              sink.close();
              ready();
            },
            (error: unknown) => {
              ready(error);
              if (cancelled) return;
              sink.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify(m365Failure(error, model).body)}\n\ndata: [DONE]\n\n`
                )
              );
              sink.close();
            }
          );
        },
        cancel() {
          cancelled = true;
          controller.abort();
        },
      });
      const earlyError = await first;
      if (earlyError) {
        await stream.cancel();
        return wrap(m365ErrorResponse(earlyError, model));
      }
      return wrap(
        new Response(stream, {
          headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
        })
      );
    } catch (error) {
      return wrap(m365ErrorResponse(error, model));
    }
  }
}
