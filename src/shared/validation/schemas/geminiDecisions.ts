/** The native Google Gemini Decisions wire schema (not OpenAI chat or System One). */
import { z } from "zod";
import { parseAndValidatePublicUrl } from "@/shared/network/outboundUrlGuard";

export const GEMINI_DECISION_MODEL = "gemini-decision-1";
export const GEMINI_DECISION_PUBLIC_MODEL = "gemini/gemini-decision-1";
export const MAX_DECISIONS_REQUEST_BYTES = 145 * 1024 * 1024;
const MAX_INLINE_BYTES = 100 * 1024 * 1024;
const MAX_PDF_BYTES = 50 * 1024 * 1024;

const MIME_TYPES = {
  image: ["image/png", "image/jpeg", "image/webp", "image/heic", "image/heif",
    "image/gif", "image/bmp", "image/tiff"],
  audio: ["audio/wav", "audio/mp3", "audio/mpeg", "audio/aiff", "audio/aac",
    "audio/ogg", "audio/flac", "audio/m4a", "audio/opus", "audio/webm",
    "audio/l16", "audio/alaw", "audio/mulaw"],
  video: ["video/mp4", "video/mpeg", "video/mov", "video/avi", "video/webm",
    "video/wmv", "video/x-flv", "video/3gpp"],
  document: ["application/pdf"],
} as const;

const textBlock = z.object({ type: z.literal("text"), text: z.string().min(1) }).strict();
const mediaBlock = z.object({
  type: z.enum(["image", "audio", "video", "document"]),
  mime_type: z.string().min(1),
  data: z.string().optional(),
  uri: z.string().optional(),
  resolution: z.enum(["low", "medium", "high", "ultra_high"]).optional(),
}).strict().superRefine((block, ctx) => {
  if (Boolean(block.data) === Boolean(block.uri)) {
    ctx.addIssue({ code: "custom", message: "Supply exactly one of data or uri" });
  }
  if (!(MIME_TYPES[block.type] as readonly string[]).includes(block.mime_type)) {
    ctx.addIssue({ code: "custom", message: "Unsupported MIME type for media block" });
  }
  if (block.resolution && (block.type === "audio" || block.type === "document" ||
    (block.type === "video" && block.resolution === "ultra_high"))) {
    ctx.addIssue({ code: "custom", message: "Invalid resolution for media type" });
  }
  if (block.uri) {
    try {
      if (parseAndValidatePublicUrl(block.uri).protocol !== "https:") {
        throw new Error("Non-HTTPS URL");
      }
    } catch {
      ctx.addIssue({ code: "custom", message: "Media uri must be public HTTPS" });
    }
  }
  if (block.data && (block.data.length % 4 !== 0 ||
    !/^[A-Za-z0-9+/]*={0,2}$/.test(block.data))) {
    ctx.addIssue({ code: "custom", message: "Invalid base64 media data" });
  }
});
const inputBlock = z.union([textBlock, mediaBlock]);
const instructions = z.union([
  z.string().min(1),
  textBlock,
  z.array(textBlock).min(1),
]);

const yesNoQuestion = z.object({
  type: z.literal("noul"),
  instructions,
  criteria: z.object({
    true_description: z.string().optional(),
    false_description: z.string().optional(),
  }).strict().optional(),
}).strict();

const choiceCriteria = z.record(z.string(), z.string()).superRefine((choices, ctx) => {
  const keys = Object.keys(choices);
  if (keys.length < 2 || keys.length > 255) {
    ctx.addIssue({ code: "custom", message: "choice requires 2 to 255 options" });
  }
  for (const key of keys) {
    if (!key || key.length > 128 || new TextEncoder().encode(key).length > 512 ||
      key.trim() !== key || /[\u0000-\u001f\u007f\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000]/u.test(key)) {
      ctx.addIssue({ code: "custom", message: "Invalid choice option identifier" });
      break;
    }
  }
});
const choiceQuestion = z.object({
  type: z.literal("choice"),
  instructions,
  criteria: choiceCriteria,
}).strict();
const scoreQuestion = z.object({
  type: z.literal("score"),
  instructions,
  criteria: z.array(z.string().min(1)).min(2).max(255),
}).strict();

const question = z.discriminatedUnion("type", [yesNoQuestion, choiceQuestion, scoreQuestion]);
const questionId = z.string().regex(/^[A-Za-z0-9_-]{1,64}$/);
const input = z.union([z.string().min(1), inputBlock, z.array(inputBlock).min(1)]);

export const geminiDecisionsSchema = z.object({
  model: z.enum([GEMINI_DECISION_PUBLIC_MODEL, GEMINI_DECISION_MODEL]),
  input,
  questions: z.record(questionId, question).superRefine((questions, ctx) => {
    const count = Object.keys(questions).length;
    if (count < 1 || count > 1000) {
      ctx.addIssue({ code: "custom", message: "questions must contain 1 to 1000 entries" });
    }
  }),
}).strict().superRefine((body, ctx) => {
  const blocks = Array.isArray(body.input) ? body.input : [body.input];
  let totalInline = 0;
  for (const block of blocks) {
    if (typeof block === "string" || block.type === "text" || !block.data) continue;
    const padding = block.data.endsWith("==") ? 2 : block.data.endsWith("=") ? 1 : 0;
    const bytes = (block.data.length / 4) * 3 - padding;
    if (block.type === "document" && bytes > MAX_PDF_BYTES) {
      ctx.addIssue({ code: "custom", message: "PDF inline media exceeds 50 MiB" });
    }
    totalInline += bytes;
  }
  if (totalInline > MAX_INLINE_BYTES) {
    ctx.addIssue({ code: "custom", message: "Inline media exceeds 100 MiB per request" });
  }
});

export type GeminiDecisionsBody = z.infer<typeof geminiDecisionsSchema>;
