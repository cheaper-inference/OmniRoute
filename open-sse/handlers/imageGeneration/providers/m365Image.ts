import { sanitizeErrorMessage } from "../../../utils/error.ts";
import type { ProviderCredentials } from "../../../executors/base.ts";
import { generateM365Images } from "../../../executors/m365ImageGeneration.ts";
import { M365ExecutorError } from "../../../executors/m365ExecutorOutput.ts";
import { M365TurnError } from "../../../executors/m365Turn.ts";
import { m365OrientationForSize } from "../../../executors/m365Protocol/imageGeneration.ts";

/**
 * Microsoft 365 Copilot image generation on a copilot-m365-web connection. Each image is one
 * Copilot turn, drawn by Copilot's built-in image tool; `size` only steers the orientation,
 * which Copilot reads from the prompt. Artifacts sit behind Microsoft's Designer service, so
 * they are downloaded and returned inline: a `url` response is a data URL.
 */

/** Generated images draw on a small daily budget, so a request may ask for a few at most. */
const MAX_IMAGES_PER_REQUEST = 4;

/** App-side helpers injected by the image dispatcher, so this provider adds no src imports. */
export interface M365ImageDeps {
  saveCallLog: (entry: Record<string, unknown>) => Promise<unknown>;
}

interface M365ImageArgs {
  model: string;
  provider: string;
  body: Record<string, unknown>;
  credentials?: (ProviderCredentials & { connectionId?: string }) | null;
  signal?: AbortSignal | null;
  log?: { error?: (tag: string, message: string) => void } | null;
  onCredentialsRefreshed?: (credentials: ProviderCredentials) => Promise<void>;
  deps: M365ImageDeps;
}

/** The validated request options, or an error message. */
function readOptions(
  body: Record<string, unknown>
): { prompt: string; n: number; dataUrl: boolean; size: unknown } | string {
  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt) return "Missing required field: prompt";
  const n = body.n === undefined ? 1 : Number(body.n);
  if (!Number.isInteger(n) || n < 1 || n > MAX_IMAGES_PER_REQUEST)
    return `n must be an integer from 1 to ${MAX_IMAGES_PER_REQUEST}`;
  return { prompt, n, dataUrl: body.response_format === "url", size: body.size };
}

/** Generate `n` images on a Microsoft 365 Copilot connection. */
export async function handleM365ImageGeneration({
  model,
  provider,
  body,
  credentials,
  signal,
  log,
  onCredentialsRefreshed,
  deps,
}: M365ImageArgs) {
  const startTime = Date.now();
  const logCall = (entry: Record<string, unknown>) => {
    deps
      .saveCallLog({
        method: "POST",
        path: "/v1/images/generations",
        provider,
        model: `${provider}/${model}`,
        duration: Date.now() - startTime,
        ...entry,
      })
      .catch((err: unknown) => log?.error?.("IMAGE", sanitizeErrorMessage(err)));
  };
  const fail = (status: number, message: unknown) => {
    const error = sanitizeErrorMessage(message);
    log?.error?.("IMAGE", `Microsoft 365 Copilot image: ${error}`);
    logCall({ status, error });
    return { success: false as const, status, error };
  };

  if (!credentials) return fail(401, "A Microsoft 365 Copilot connection is required");
  const options = readOptions(body);
  if (typeof options === "string") return fail(400, options);
  const orientation = m365OrientationForSize(options.size);

  const data: Array<{ b64_json?: string; url?: string; revised_prompt?: string }> = [];
  try {
    while (data.length < options.n) {
      const images = await generateM365Images({
        credentials,
        prompt: options.prompt,
        orientation,
        signal: signal ?? undefined,
        onCredentialsRefreshed,
      });
      for (const image of images.slice(0, options.n - data.length)) {
        const base64 = image.data.toString("base64");
        data.push(
          options.dataUrl
            ? { url: `data:${image.contentType};base64,${base64}` }
            : { b64_json: base64 }
        );
      }
    }
  } catch (error) {
    if (error instanceof M365ExecutorError || error instanceof M365TurnError)
      return fail(error.status, error.message);
    if (signal?.aborted) return fail(499, "Request cancelled");
    return fail(502, "Microsoft 365 Copilot image generation failed");
  }
  logCall({
    status: 200,
    requestBody: { model, n: options.n, size: options.size ?? null },
    responseBody: { images_count: data.length },
  });
  return { success: true as const, data: { created: Math.floor(Date.now() / 1000), data } };
}
