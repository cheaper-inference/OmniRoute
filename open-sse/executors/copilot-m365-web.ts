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
import {
  m365Conversations,
  m365ReplyFingerprint,
  type M365ConversationClaim,
} from "./m365Protocol/conversations.ts";
import {
  M365ImageResolver,
  m365ImagePartRef,
  uploadM365Image,
  type M365ImageAnnotation,
} from "./m365Protocol/images.ts";
import { resolveM365Profile, type M365ResolvedProfile } from "./m365Protocol/profile.ts";
import { buildM365ToolInstructions, parseM365ToolOutput } from "./m365Protocol/tools.ts";
import { runM365Turn, M365TurnError, type M365WebSocketConstructor } from "./m365Turn.ts";
import type { M365ToolOutput } from "./m365Protocol/tools.ts";
import {
  M365ExecutorError,
  m365ErrorResponse,
  m365Failure,
  m365Output,
} from "./m365ExecutorOutput.ts";

type JsonRecord = Record<string, unknown>;
const DIAGNOSTIC_URL = "wss://substrate.office.com/m365Copilot/Chathub?access_token=REDACTED";
let WebSocketCtor: typeof WebSocket = WebSocket;
/** The WebSocket constructor M365 turns use (swappable in tests). */
export function m365WebSocketCtor(): M365WebSocketConstructor {
  return WebSocketCtor as unknown as M365WebSocketConstructor;
}
export function __setCopilotM365WebSocketForTesting(ctor: typeof WebSocket): () => void {
  const previous = WebSocketCtor;
  WebSocketCtor = ctor;
  return () => {
    WebSocketCtor = previous;
  };
}
const record = (value: unknown): JsonRecord =>
  value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};

/** A turn's text and the images it carries, in the order their markers appear in the text. */
interface M365TurnInput {
  text: string;
  imageRefs: string[];
}

/** One content part as turn text; an image part becomes a numbered marker and is collected. */
function partText(rawPart: unknown, imageRefs: string[]): string {
  const imageRef = m365ImagePartRef(rawPart);
  if (imageRef !== null) {
    imageRefs.push(imageRef);
    return `[image ${imageRefs.length}]`;
  }
  const part = record(rawPart);
  if (part.type !== "text" || typeof part.text !== "string")
    throw new M365ExecutorError(
      400,
      "unsupported_content",
      "Microsoft 365 Copilot accepts text and image parts only."
    );
  return part.text;
}

/** Format messages as turn text. A fresh conversation sends the entire history, including
 * unabridged tool results and every image; a continued one sends only the messages after our
 * last reply. */
function historyPrompt(messages: readonly unknown[]): M365TurnInput {
  const parts: string[] = [];
  const imageRefs: string[] = [];
  let size = 0;
  for (const raw of messages) {
    const message = record(raw);
    let content = typeof message.content === "string" ? message.content : "";
    if (Array.isArray(message.content)) {
      content = message.content.map((rawPart) => partText(rawPart, imageRefs)).join("\n");
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
  return { text: parts.join("\n\n"), imageRefs };
}
/**
 * Which conversations a request may continue: same connection (Copilot keeps conversations per
 * account), same model profile and same tool set. Null without a connection identity, so the
 * request stays stateless.
 */
function conversationScope(
  credentials: unknown,
  profile: M365ResolvedProfile,
  tools: ReadonlyArray<{ name: string }>
): string | null {
  const connectionId = record(credentials).connectionId;
  if (typeof connectionId !== "string" || !connectionId) return null;
  const names = tools.map((tool) => tool.name).sort();
  return [
    connectionId,
    profile.tone,
    profile.scenario,
    profile.licenseType,
    profile.agent,
    names.join(","),
  ].join("|");
}

/** What a request needs to refresh its connection's credentials. */
type M365CredentialInput = Pick<ExecuteInput, "credentials" | "onCredentialsRefreshed" | "signal">;

async function refreshM365Credentials(input: M365CredentialInput): Promise<void> {
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

/**
 * Refresh the connection's chat token when it is close to expiry and persist the result. The
 * refresh belongs to the canonical connection mutex, not this request: cancellation detaches
 * only our wait, and the grant, its persistence and any rejection still complete and are
 * observed.
 */
export async function prepareM365Credentials(input: M365CredentialInput): Promise<void> {
  const preflight = refreshM365Credentials(input);
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
}

export class CopilotM365WebExecutor extends BaseExecutor {
  constructor() {
    super("copilot-m365-web", { id: "copilot-m365-web", baseUrl: "wss://substrate.office.com" });
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
      const messages: readonly unknown[] = Array.isArray(body.messages) ? body.messages : [];
      const history = historyPrompt(messages);
      if (!history.text)
        throw new M365ExecutorError(400, "invalid_request", "No user message provided.");
      const { tools, toolChoice } = extractToolSpec(body);
      const toolOptions = { toolChoice, parallelToolCalls: body.parallel_tool_calls !== false };
      const instructions = buildM365ToolInstructions(tools, toolOptions);
      const prompt = [instructions, history.text].filter(Boolean).join("\n\n");
      if (prompt.length > M365_MAX_TEXT_LENGTH)
        throw new M365ExecutorError(
          400,
          "m365_input_too_large",
          "Microsoft 365 Copilot input exceeded the size limit."
        );
      await prepareM365Credentials(input);
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
      const conversations = m365Conversations();
      const scope = conversationScope(input.credentials, profile, tools);
      const claimed = scope ? conversations.claim(scope, messages) : null;
      const delta = claimed ? historyPrompt(claimed.delta) : null;
      const images = new M365ImageResolver(input.signal ?? undefined);
      // One upstream turn: continue `resume` with only the new messages, or open a fresh
      // conversation with the whole history.
      const turnFor = (resume: M365ConversationClaim | null) => {
        const url = new URL(
          buildWsUrl(
            {
              ...params,
              scenario: profile.scenario,
              licenseType: profile.licenseType,
              agent: profile.agent,
            },
            resume?.ids
          )
        );
        url.searchParams.set("disableMemory", "1");
        const ids = {
          conversationId: url.searchParams.get("ConversationId")!,
          sessionId: url.searchParams.get("X-SessionId")!,
        };
        const invocation = (messageAnnotations: readonly M365ImageAnnotation[]) =>
          buildChatInvocation({
            ...profile,
            text: resume ? (delta?.text ?? "") : prompt,
            traceId: crypto.randomUUID(),
            sessionId: ids.sessionId,
            requestId: url.searchParams.get("chatsessionid")!,
            conversationId: ids.conversationId,
            isStartOfSession: !resume,
            messageAnnotations,
            ...(instructions
              ? { plugins: clientPlugins(tools), toolChoice, customInstructions: instructions }
              : {}),
          });
        const imageRefs = resume ? (delta?.imageRefs ?? []) : history.imageRefs;
        return { url, ids, imageRefs, invocation, turns: (resume?.turns ?? 0) + 1 };
      };
      // Uploads are keyed to the conversation, so each turn uploads its own images: all of
      // them for a fresh conversation, only the new messages' for a continued one.
      const uploadImages = async (turn: ReturnType<typeof turnFor>) => {
        const annotations: M365ImageAnnotation[] = [];
        for (const image of await images.resolve(turn.imageRefs)) {
          annotations.push(
            await uploadM365Image({
              host: params.host,
              accessToken: params.accessToken,
              conversationId: turn.ids.conversationId,
              image,
              signal,
            })
          );
        }
        return annotations;
      };
      const output = m365Output(model);
      const buffered = input.stream === false || instructions.length > 0;
      const controller = new AbortController();
      const signal = input.signal
        ? AbortSignal.any([input.signal, controller.signal])
        : controller.signal;
      let streamRewriteError: M365ExecutorError | undefined;
      let published = false;
      const attempt = async (
        turn: ReturnType<typeof turnFor>,
        onDelta?: (delta: string) => void
      ): Promise<M365ToolOutput> => {
        const composer = new M365TurnComposer();
        const invocation = turn.invocation(await uploadImages(turn));
        input.log?.debug?.("M365_WS", `connecting ${DIAGNOSTIC_URL}`);
        try {
          await runM365Turn({
            url: turn.url.toString(),
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
              if (update.delta) {
                published = true;
                onDelta?.(update.delta);
              }
            },
          });
        } catch (error) {
          throw streamRewriteError ?? error;
        }
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
      };
      const run = async (onDelta?: (delta: string) => void): Promise<M365ToolOutput> => {
        let turn = turnFor(claimed && delta?.text ? claimed : null);
        let parsed: M365ToolOutput;
        try {
          parsed = await attempt(turn, onDelta);
        } catch (error) {
          // A content-less InternalError is a turn Copilot dropped, and the conversation it
          // happened in tends to stay broken: re-send the whole request once, in a fresh one.
          // A failed conversation is never committed back, so later requests start fresh too.
          if (
            !(error instanceof M365TurnError) ||
            error.code !== "M365_INTERNAL_ERROR" ||
            published
          )
            throw error;
          input.log?.info?.(
            "M365",
            "InternalError without content; retrying once in a fresh conversation"
          );
          turn = turnFor(null);
          parsed = await attempt(turn, onDelta);
        }
        if (scope)
          conversations.commit(scope, messages, turn.ids, m365ReplyFingerprint(parsed), turn.turns);
        return parsed;
      };
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
