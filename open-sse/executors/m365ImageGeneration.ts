/**
 * Image generation through a Microsoft 365 Copilot connection: one chat turn with the web
 * client's image options, then the generated artifacts downloaded with a Designer token.
 * Protocol details live in `m365Protocol/imageGeneration.ts`.
 */
import { createHash } from "node:crypto";
import type { ProviderCredentials } from "./base.ts";
import { prepareM365Credentials, m365WebSocketCtor } from "./copilot-m365-web.ts";
import {
  M365_IMAGE_ARTIFACT_SCOPE,
  buildWsUrl,
  resolveConnectionParams,
} from "./copilot-m365-connection.ts";
import { buildChatInvocation } from "./copilot-m365-frames.ts";
import { M365TurnComposer } from "./m365Protocol/composer.ts";
import {
  M365GeneratedImageCollector,
  M365_GRAPHIC_ART_MESSAGE_TYPE,
  M365_IMAGE_OPTION_SETS,
  classifyM365ImageFailure,
  isM365ArtifactUrl,
  m365ImagePrompt,
  type M365GeneratedImageRef,
  type M365ImageOrientation,
} from "./m365Protocol/imageGeneration.ts";
import { resolveM365Profile } from "./m365Protocol/profile.ts";
import { M365ExecutorError } from "./m365ExecutorOutput.ts";
import { runM365Turn } from "./m365Turn.ts";
import { sniffCursorImageFormat } from "../utils/cursorImages.ts";
import { refreshM365ScopedToken } from "../services/tokenRefresh/providers/m365.ts";

/** The model image generation runs under: Copilot's default routing, as the web client does. */
const IMAGE_MODEL = "m365-copilot";
const MAX_ARTIFACT_BYTES = 25 * 1024 * 1024;
const ARTIFACT_TIMEOUT_MS = 60_000;
/** Reuse a Designer token until this long before it expires. */
const ARTIFACT_TOKEN_MARGIN_MS = 5 * 60_000;

/** One generated image, downloaded. */
export interface M365GeneratedImage {
  data: Buffer;
  contentType: string;
}

/** Inputs for one image-generation turn. */
export interface M365ImageGenerationRequest {
  credentials: ProviderCredentials & { connectionId?: string };
  prompt: string;
  orientation: M365ImageOrientation | null;
  signal?: AbortSignal;
  onCredentialsRefreshed?: (credentials: ProviderCredentials) => Promise<void>;
}

type JsonRecord = Record<string, unknown>;
const record = (value: unknown): JsonRecord =>
  value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};

const artifactTokens = new Map<string, { token: string; expiresAt: number }>();
/** Forget cached Designer tokens (tests). */
export function __resetM365ArtifactTokensForTesting(): void {
  artifactTokens.clear();
}

/** The no-image outcome of a turn, as a public error. */
function noImageError(text: string): M365ExecutorError {
  switch (classifyM365ImageFailure(text)) {
    case "quota_exceeded":
      return new M365ExecutorError(
        429,
        "m365_image_quota_exceeded",
        "Microsoft 365 Copilot's image budget for this account is used up. Try again tomorrow."
      );
    case "capacity":
      return new M365ExecutorError(
        503,
        "m365_image_capacity",
        "Microsoft 365 Copilot could not generate an image right now. Retry later."
      );
    case "content_filtered":
      return new M365ExecutorError(
        400,
        "m365_image_refused",
        "Microsoft 365 Copilot declined to generate this image."
      );
    default:
      return new M365ExecutorError(
        502,
        "m365_image_not_generated",
        "Microsoft 365 Copilot answered without generating an image."
      );
  }
}

/** Run one image turn and return the images it announced. */
async function runImageTurn(request: M365ImageGenerationRequest): Promise<M365GeneratedImageRef[]> {
  const { credentials } = request;
  const params = resolveConnectionParams(credentials);
  if ("error" in params) throw new M365ExecutorError(400, "invalid_credentials", params.error);
  const psd = record(credentials.providerSpecificData);
  const override = (key: string) =>
    typeof psd[key] === "string" && psd[key] ? (psd[key] as string) : undefined;
  const profile = resolveM365Profile({
    model: IMAGE_MODEL,
    tier: params.tier,
    scenario: override("scenario"),
    licenseType: override("licenseType"),
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
    text: m365ImagePrompt(request.prompt, request.orientation),
    traceId: crypto.randomUUID(),
    sessionId: url.searchParams.get("X-SessionId")!,
    requestId: url.searchParams.get("chatsessionid")!,
    conversationId: url.searchParams.get("ConversationId")!,
    isStartOfSession: true,
    optionsSets: [...profile.optionsSets, ...M365_IMAGE_OPTION_SETS],
    allowedMessageTypes: [...profile.allowedMessageTypes, M365_GRAPHIC_ART_MESSAGE_TYPE],
  });
  const composer = new M365TurnComposer();
  const images = new M365GeneratedImageCollector();
  await runM365Turn({
    url: url.toString(),
    invocation,
    signal: request.signal,
    WebSocketCtor: m365WebSocketCtor(),
    onFrame(frame) {
      composer.push(frame);
      images.push(frame as JsonRecord);
    },
  });
  if (!images.images.length) throw noImageError(composer.text);
  return images.images;
}

/**
 * A Designer token for this connection, minted from its stored refresh token and cached until
 * shortly before it expires. A rotated refresh token is persisted like any other refresh.
 */
async function artifactToken(request: M365ImageGenerationRequest): Promise<string> {
  const { credentials } = request;
  const refreshToken = requireRefreshToken(credentials);
  const key = credentials.connectionId || createHash("sha256").update(refreshToken).digest("hex");
  const cached = artifactTokens.get(key);
  if (cached && cached.expiresAt - ARTIFACT_TOKEN_MARGIN_MS > Date.now()) return cached.token;
  const result = await refreshM365ScopedToken(
    refreshToken,
    credentials,
    M365_IMAGE_ARTIFACT_SCOPE,
    {
      signal: request.signal,
    }
  );
  if ("error" in result)
    throw new M365ExecutorError(
      401,
      "m365_image_token_failed",
      "Microsoft 365 Copilot refused the image download credentials. Reconnect this account."
    );
  if (result.refreshToken && result.refreshToken !== refreshToken) {
    credentials.refreshToken = result.refreshToken;
    await request.onCredentialsRefreshed?.({ ...credentials, refreshToken: result.refreshToken });
  }
  artifactTokens.set(key, {
    token: result.accessToken,
    expiresAt: Date.now() + (result.expiresIn ?? 3600) * 1000,
  });
  return result.accessToken;
}

/** The connection's refresh token; image generation needs one to mint the Designer token. */
function requireRefreshToken(credentials: ProviderCredentials): string {
  const refreshToken = credentials.refreshToken;
  if (typeof refreshToken === "string" && refreshToken) return refreshToken;
  throw new M365ExecutorError(
    400,
    "m365_image_requires_sign_in",
    "Microsoft 365 Copilot image generation needs a sign-in connection, not a pasted token."
  );
}

/** Read a response body, refusing more than `limit` bytes. */
async function readBounded(response: Response, limit: number): Promise<Buffer> {
  const declared = Number(response.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > limit) throw new Error("artifact too large");
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of response.body ?? []) {
    size += chunk.byteLength;
    if (size > limit) throw new Error("artifact too large");
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

/** Download one artifact with the Designer token; only Designer artifact URLs are fetched. */
async function downloadArtifact(
  image: M365GeneratedImageRef,
  token: string,
  signal?: AbortSignal
): Promise<M365GeneratedImage> {
  const failed = () =>
    new M365ExecutorError(
      502,
      "m365_image_download_failed",
      "Microsoft 365 Copilot generated an image that could not be downloaded."
    );
  if (!isM365ArtifactUrl(image.url)) throw failed();
  const timeout = AbortSignal.timeout(ARTIFACT_TIMEOUT_MS);
  try {
    const response = await fetch(image.url, {
      headers: { Authorization: `Bearer ${token}` },
      redirect: "error",
      signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
    });
    if (!response.ok) throw failed();
    const data = await readBounded(response, MAX_ARTIFACT_BYTES);
    const format = sniffCursorImageFormat(data);
    if (!format) throw failed();
    return { data, contentType: `image/${format}` };
  } catch (error) {
    if (signal?.aborted) throw error;
    throw error instanceof M365ExecutorError ? error : failed();
  }
}

/**
 * Generate images for a prompt with one Copilot turn and download them. Fails with a typed
 * public error when the turn draws nothing (budget used up, capacity, refusal, or no image).
 */
export async function generateM365Images(
  request: M365ImageGenerationRequest
): Promise<M365GeneratedImage[]> {
  await prepareM365Credentials({
    credentials: request.credentials,
    onCredentialsRefreshed: request.onCredentialsRefreshed,
    signal: request.signal,
  });
  // Checked before the turn (the preflight adopts a legacy stored refresh token): a turn spends
  // the account's small image budget, and its artifacts could not be downloaded without a
  // refresh token to mint the Designer token from.
  requireRefreshToken(request.credentials);
  const refs = await runImageTurn(request);
  const token = await artifactToken(request);
  const images: M365GeneratedImage[] = [];
  for (const ref of refs) images.push(await downloadArtifact(ref, token, request.signal));
  return images;
}
