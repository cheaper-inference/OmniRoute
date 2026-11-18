/**
 * Image generation over the Microsoft 365 Copilot chat protocol.
 *
 * Copilot draws with a built-in server-side tool. A turn opts in with the web client's image
 * option sets and declares that it can receive `GenerateGraphicArt` messages (the server only
 * sends message types a client declares). The picture never arrives as chat text: a bot
 * message carries a `contentGenerationProgressList` entry per image, repeated as progress
 * snapshots until `status` 2 (ready) and again in the final item, whose `ImageReferenceUrls`
 * point at an artifact on the Designer service. The artifact refuses the chat token; it needs
 * a token for the Designer service (`M365_IMAGE_ARTIFACT_SCOPE`).
 */

/** The image option sets the web client sends on every turn; the model picks the kind. */
export const M365_IMAGE_OPTION_SETS = [
  "cwc_flux_image",
  "cwc_flux_v3",
  "enable_gg_gpt",
  "flux_v3_progress_messages",
  "flux_v3_image_gen_enable_dimensions",
  "flux_v3_image_gen_enable_icon_dimensions",
  "flux_v3_image_gen_enable_story",
  "flux_v3_image_gen_enable_designer_dimensions_meta_prompting_in_system_prompts",
  "flux_v3_image_gen_enable_system_text_with_params",
  "flux_v3_image_gen_enable_non_watermarked_storage",
] as const;

/** The message type a turn must declare to receive generated images. */
export const M365_GRAPHIC_ART_MESSAGE_TYPE = "GenerateGraphicArt";

/** Artifacts are served from this host only; the Designer token is never sent elsewhere. */
const ARTIFACT_HOST = "designerapp.officeapps.live.com";

/** One generated image as announced by Copilot. */
export interface M365GeneratedImageRef {
  url: string;
  status: number;
  size?: string;
  orientation?: string;
}

type JsonRecord = Record<string, unknown>;
const record = (value: unknown): JsonRecord =>
  value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};

/** Whether `url` is a Designer artifact URL, the only place the Designer token may go. */
export function isM365ArtifactUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && parsed.hostname === ARTIFACT_HOST && !parsed.port;
  } catch {
    return false;
  }
}

/** The bot messages a frame carries: streamed updates and the final item. */
function frameMessages(frame: JsonRecord): unknown[] {
  if (frame.type === 2) {
    const messages = record(frame.item).messages;
    return Array.isArray(messages) ? messages : [];
  }
  if (frame.type === 1 && Array.isArray(frame.arguments)) {
    return frame.arguments.flatMap((argument) => {
      const messages = record(argument).messages;
      return Array.isArray(messages) ? messages : [];
    });
  }
  return [];
}

/**
 * Collects the images a turn generates. The same image is announced repeatedly while it
 * renders, so entries are keyed by file token (or first URL) and the readiest copy wins.
 */
export class M365GeneratedImageCollector {
  private readonly byKey = new Map<string, M365GeneratedImageRef>();

  /** Record the images announced in one frame. */
  push(frame: JsonRecord): void {
    for (const message of frameMessages(frame)) {
      const list = record(message).contentGenerationProgressList;
      if (!Array.isArray(list)) continue;
      for (const raw of list) this.add(record(raw));
    }
  }

  private add(entry: JsonRecord): void {
    const urls = Array.isArray(entry.ImageReferenceUrls) ? entry.ImageReferenceUrls : [];
    const url = urls.find((value): value is string => typeof value === "string" && !!value);
    if (!url) return;
    const key = typeof entry.fileToken === "string" && entry.fileToken ? entry.fileToken : url;
    const status = typeof entry.status === "number" ? entry.status : 0;
    const previous = this.byKey.get(key);
    if (previous && previous.status >= status) return;
    this.byKey.set(key, {
      url,
      status,
      ...(typeof entry.size === "string" ? { size: entry.size } : {}),
      ...(typeof entry.orientation === "string" ? { orientation: entry.orientation } : {}),
    });
  }

  /** The images announced so far, in first-seen order. */
  get images(): M365GeneratedImageRef[] {
    return [...this.byKey.values()];
  }
}

/** Why a turn produced no image. */
export type M365ImageFailure = "quota_exceeded" | "capacity" | "content_filtered" | "no_image";

/**
 * Classify a turn that produced no image from its text. Only meaningful without images: then
 * the text is a status or a refusal, not a caption. The quota wording has been observed live
 * ("Sorry, I can't generate any more images today. Try again tomorrow"); the capacity and
 * content wordings are the likely phrasings and fall back to `no_image` when they differ.
 */
export function classifyM365ImageFailure(text: string): M365ImageFailure {
  const t = text.toLowerCase();
  if (
    /can.?t generate any more images|no more images (today|right now)|reached (your|the)[^.]*image|image (generation )?(limit|quota)|try again tomorrow/.test(
      t
    )
  )
    return "quota_exceeded";
  if (
    /trouble (creating|generating|making)[^.]*image|couldn.?t (create|generate)[^.]*image|try again (later|in a (bit|moment|few))/.test(
      t
    )
  )
    return "capacity";
  if (
    /can.?t (create|generate|make) (that|this|an? )[^.]*image|unable to (create|generate)[^.]*image|against[^.]*(policy|guideline)|can.?t help (with|create) that/.test(
      t
    )
  )
    return "content_filtered";
  return "no_image";
}

/** Orientation Copilot renders at; it reads it from the prompt, not from a parameter. */
export type M365ImageOrientation = "landscape" | "portrait" | "square";

/** The orientation an OpenAI `size` (`WIDTHxHEIGHT`) asks for, or null when it names none. */
export function m365OrientationForSize(size: unknown): M365ImageOrientation | null {
  const match = typeof size === "string" ? /^(\d+)x(\d+)$/.exec(size.trim()) : null;
  if (!match) return null;
  const [width, height] = [Number(match[1]), Number(match[2])];
  if (width === height) return "square";
  return width > height ? "landscape" : "portrait";
}

/** The prompt for an image turn: the caller's text, plus the orientation as an instruction. */
export function m365ImagePrompt(prompt: string, orientation: M365ImageOrientation | null): string {
  const directive = {
    landscape: "Use a landscape (wide, 16:9) orientation.",
    portrait: "Use a portrait (tall, 9:16) orientation.",
    square: "Use a square (1:1) orientation.",
  };
  return orientation ? `${prompt.trim()}\n\n${directive[orientation]}` : prompt;
}
