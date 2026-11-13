type QoderCredentials = {
  apiKey?: unknown;
  accessToken?: unknown;
  refreshToken?: unknown;
};

/** Match the executor's credential precedence, including the optional host PAT. */
export function resolveQoderAuthToken(credentials: QoderCredentials): string {
  for (const key of ["apiKey", "accessToken", "refreshToken"] as const) {
    const token = credentials[key];
    if (typeof token === "string" && token.trim()) return token.trim();
  }
  return String(process.env.QODER_PERSONAL_ACCESS_TOKEN || "").trim();
}

export function qoderSupportsCallerTools(credentials: QoderCredentials): boolean {
  return !resolveQoderAuthToken(credentials).startsWith("pt-");
}

/** Image parts as the Chat Completions, Responses and Claude-style content arrays name them. */
const QODER_IMAGE_PART_TYPES = new Set(["image_url", "input_image", "image"]);

/** The qodercli prompt is text only, so an image part cannot reach the model on a PAT connection. */
export function hasQoderImageParts(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const request = body as Record<string, unknown>;
  return [request.messages, request.input].some(
    (turns) =>
      Array.isArray(turns) &&
      turns.some((turn) => {
        const content = (turn as Record<string, unknown> | null)?.content;
        return (
          Array.isArray(content) &&
          content.some((part) =>
            QODER_IMAGE_PART_TYPES.has(String((part as Record<string, unknown> | null)?.type))
          )
        );
      })
  );
}

/** A request only an HTTP connection can serve: caller tools or image input. */
export function requiresQoderHttpTransport(body: unknown): boolean {
  return hasQoderCallerTools(body) || hasQoderImageParts(body);
}

export function hasQoderCallerTools(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const request = body as Record<string, unknown>;
  return [request.tools, request.functions].some(
    (tools) => Array.isArray(tools) && tools.length > 0
  );
}
