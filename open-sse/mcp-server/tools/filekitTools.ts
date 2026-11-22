/**
 * Vision / image / video MCP tools.
 *
 * Handler nyata (bukan mock):
 *  - visionAnalyze  -> memanggil /v1/chat/completions lewat omniRouteFetch (model vision)
 *  - imageGenerate  -> memanggil /v1/images/generations lewat omniRouteFetch, menyimpan hasil
 *  - videoCut/videoSpeed/videoResize -> ffmpeg lewat execFileSync (tanpa shell interpolation)
 *
 * Catatan jujur: tool MCP mengembalikan path + metadata. "Auto-attach ke chat" dilakukan
 * oleh agent yang memanggil tool (filekit.attach_file), bukan oleh server MCP — MCP tidak
 * punya kanal untuk menyuntik lampiran ke sesi chat.
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { z } from "zod";
import { omniRouteFetch } from "../internalFetch.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";

const ROOT = path.join(os.homedir(), "ai-edited");
const IMAGE_DIR = path.join(ROOT, "images");
const VIDEO_DIR = path.join(ROOT, "videos");

function ensureDir(dir: string): void {
  fs.mkdirSync(dir, { recursive: true });
}

function safeName(value: string): string {
  return value.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 60) || "output";
}

function uniquePath(dir: string, prefix: string, ext: string): string {
  ensureDir(dir);
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  return path.join(dir, `${stamp}_${safeName(prefix)}${ext}`);
}

function extensionOf(filePath: string): string {
  return path.extname(filePath).toLowerCase();
}

function mimeOf(filePath: string): string {
  const ext = extensionOf(filePath);
  const table: Record<string, string> = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".gif": "image/gif",
  };
  return table[ext] ?? "image/png";
}

const CONTEXT_PROMPTS: Record<string, string> = {
  screenshot:
    "This is a UI screenshot. Describe what is visible, report any error messages verbatim, and explain the likely cause and the next action to take.",
  diagram:
    "This is a diagram. Describe each component and the relationships/arrows between them, then summarize the overall flow.",
  design:
    "This is a design mockup. Describe layout, typography, colors, spacing, and visual hierarchy, then list concrete improvement suggestions.",
  chart:
    "This is a chart. Read the axes, legend, and data values, describe the trend, and call out any anomalies.",
  general: "Describe this image in detail and answer the question accurately.",
};

// ---------------------------------------------------------------------------
// 1. Vision analyze
// ---------------------------------------------------------------------------

export const visionAnalyzeInput = z.object({
  path: z.string().min(1).describe("Path file gambar (png/jpg/webp/gif)"),
  context: z
    .enum(["screenshot", "diagram", "design", "chart", "general"])
    .default("general")
    .describe("Jenis gambar, menentukan prompt yang dipakai"),
  question: z.string().optional().describe("Pertanyaan spesifik tentang gambar"),
  model: z.string().default("auto/vision").describe("Model vision (OmniRoute model id)"),
});

export type VisionAnalyzeInput = z.infer<typeof visionAnalyzeInput>;

export async function handleVisionAnalyze(input: VisionAnalyzeInput): Promise<string> {
  if (!fs.existsSync(input.path)) {
    return `Gagal: file tidak ditemukan: ${input.path}`;
  }
  const stats = fs.statSync(input.path);
  if (stats.size > 20 * 1024 * 1024) {
    return "Gagal: gambar terlalu besar (maks 20MB).";
  }

  try {
    const base64 = fs.readFileSync(input.path).toString("base64");
    const instruction = CONTEXT_PROMPTS[input.context] ?? CONTEXT_PROMPTS.general;
    const text = input.question ? `${instruction}\n\nPertanyaan: ${input.question}` : instruction;

    const result = (await omniRouteFetch("/v1/chat/completions", {
      method: "POST",
      body: JSON.stringify({
        model: input.model,
        stream: false,
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text },
              {
                type: "image_url",
                image_url: { url: `data:${mimeOf(input.path)};base64,${base64}` },
              },
            ],
          },
        ],
      }),
    })) as { choices?: Array<{ message?: { content?: string } }> };

    const answer = result?.choices?.[0]?.message?.content;
    if (!answer) {
      return "Gagal: model tidak mengembalikan teks analisis.";
    }
    return `Analisis (${input.context}, model ${input.model}):\n\n${answer}`;
  } catch (error: unknown) {
    return `Gagal analisis gambar: ${sanitizeErrorMessage(error)}`;
  }
}

// ---------------------------------------------------------------------------
// 2. Image generate
// ---------------------------------------------------------------------------

export const imageGenerateInput = z.object({
  prompt: z.string().min(1).describe("Deskripsi gambar yang ingin dibuat"),
  aspect: z.enum(["1:1", "16:9", "9:16", "4:3", "3:4"]).default("1:1"),
  n: z.number().int().min(1).max(4).default(1),
  model: z
    .string()
    .default("gemini/gemini-3.1-flash-image-preview")
    .describe("Model image generation (OmniRoute model id)"),
});

export type ImageGenerateInput = z.infer<typeof imageGenerateInput>;

interface ImageGenerationItem {
  b64_json?: string;
  url?: string;
  revised_prompt?: string;
}

interface ImageGenerationResponse {
  data?: ImageGenerationItem[];
}

async function saveImage(item: ImageGenerationItem, index: number): Promise<string> {
  const output = uniquePath(IMAGE_DIR, `generated_${index}`, ".png");
  if (typeof item?.b64_json === "string" && item.b64_json.length > 0) {
    fs.writeFileSync(output, Buffer.from(item.b64_json, "base64"));
  } else if (typeof item?.url === "string" && item.url.startsWith("http")) {
    const response = await fetch(item.url);
    if (!response.ok) throw new Error(`Gagal mengunduh hasil (HTTP ${response.status})`);
    fs.writeFileSync(output, Buffer.from(await response.arrayBuffer()));
  } else {
    throw new Error("Respons model tidak memuat b64_json maupun url.");
  }
  return output;
}

export async function handleImageGenerate(input: ImageGenerateInput): Promise<string> {
  try {
    const result = (await omniRouteFetch("/v1/images/generations", {
      method: "POST",
      body: JSON.stringify({
        model: input.model,
        prompt: input.prompt,
        n: input.n,
        size: input.aspect,
        response_format: "b64_json",
      }),
    })) as ImageGenerationResponse;

    const items = result?.data;
    if (!Array.isArray(items) || items.length === 0) {
      return "Gagal: model tidak mengembalikan gambar.";
    }

    const saved: string[] = [];
    for (let i = 0; i < items.length; i += 1) {
      saved.push(await saveImage(items[i], i));
    }
    return `Gambar berhasil dibuat (${saved.length}):\n${saved.join("\n")}\n\nLampirkan ke chat dengan tool attach_file jika ingin langsung tampil.`;
  } catch (error: unknown) {
    return `Gagal generate gambar: ${sanitizeErrorMessage(error)}`;
  }
}

// ---------------------------------------------------------------------------
// 3-5. Video tools (ffmpeg lewat execFileSync — tanpa shell interpolation)
// ---------------------------------------------------------------------------

function runFfmpeg(args: string[]): void {
  execFileSync("ffmpeg", [...args, "-y"], { stdio: "pipe", timeout: 10 * 60 * 1000 });
}

function videoGuard(inputPath: string): string | null {
  if (!fs.existsSync(inputPath)) return `Gagal: video tidak ditemukan: ${inputPath}`;
  try {
    execFileSync("ffmpeg", ["-version"], { stdio: "ignore" });
  } catch {
    return "Gagal: ffmpeg tidak terpasang.";
  }
  return null;
}

export const videoCutInput = z.object({
  input: z.string().min(1).describe("Path video input"),
  start: z
    .string()
    .regex(/^\d{1,2}:\d{2}(:\d{2})?$|^\d+(\.\d+)?$/)
    .default("00:00")
    .describe("Waktu mulai (MM:SS / HH:MM:SS / detik)"),
  duration: z
    .string()
    .regex(/^\d{1,2}:\d{2}(:\d{2})?$|^\d+(\.\d+)?$/)
    .describe("Durasi (MM:SS / detik)"),
});

export type VideoCutInput = z.infer<typeof videoCutInput>;

export async function handleVideoCut(input: VideoCutInput): Promise<string> {
  const guard = videoGuard(input.input);
  if (guard) return guard;
  try {
    const ext = extensionOf(input.input) || ".mp4";
    const output = uniquePath(VIDEO_DIR, `cut_${input.start}_${input.duration}`, ext);
    runFfmpeg(["-ss", input.start, "-i", input.input, "-t", input.duration, "-c", "copy", output]);
    const size = (fs.statSync(output).size / 1024 / 1024).toFixed(2);
    return `Video dipotong (${input.start}, durasi ${input.duration}):\n${output}\nUkuran: ${size} MB`;
  } catch (error: unknown) {
    return `Gagal memotong video: ${sanitizeErrorMessage(error)}`;
  }
}

export const videoSpeedInput = z.object({
  input: z.string().min(1).describe("Path video input"),
  factor: z.number().min(0.25).max(4).default(1).describe("Faktor kecepatan 0.25-4"),
});

export type VideoSpeedInput = z.infer<typeof videoSpeedInput>;

export async function handleVideoSpeed(input: VideoSpeedInput): Promise<string> {
  const guard = videoGuard(input.input);
  if (guard) return guard;
  try {
    const ext = extensionOf(input.input) || ".mp4";
    const output = uniquePath(VIDEO_DIR, `speed_${input.factor}x`, ext);
    const pts = (1 / input.factor).toFixed(6);
    runFfmpeg([
      "-i",
      input.input,
      "-filter:v",
      `setpts=${pts}*PTS`,
      "-filter:a",
      `atempo=${input.factor}`,
      output,
    ]);
    const size = (fs.statSync(output).size / 1024 / 1024).toFixed(2);
    return `Kecepatan video diubah ke ${input.factor}x:\n${output}\nUkuran: ${size} MB`;
  } catch (error: unknown) {
    return `Gagal mengubah kecepatan: ${sanitizeErrorMessage(error)}`;
  }
}

const VIDEO_PRESETS: Record<string, { width: number; height: number }> = {
  reels: { width: 1080, height: 1920 },
  tiktok: { width: 1080, height: 1920 },
  youtube: { width: 1920, height: 1080 },
  square: { width: 1080, height: 1080 },
};

export const videoResizeInput = z.object({
  input: z.string().min(1).describe("Path video input"),
  preset: z.enum(["reels", "tiktok", "youtube", "square", "custom"]).default("reels"),
  width: z.number().int().positive().optional().describe("Lebar kustom (preset=custom)"),
  height: z.number().int().positive().optional().describe("Tinggi kustom (preset=custom)"),
});

export type VideoResizeInput = z.infer<typeof videoResizeInput>;

export async function handleVideoResize(input: VideoResizeInput): Promise<string> {
  const guard = videoGuard(input.input);
  if (guard) return guard;

  let width: number;
  let height: number;
  if (input.preset === "custom") {
    if (!input.width || !input.height) return "Gagal: preset custom butuh width dan height.";
    width = input.width;
    height = input.height;
  } else {
    ({ width, height } = VIDEO_PRESETS[input.preset]);
  }

  try {
    const ext = extensionOf(input.input) || ".mp4";
    const output = uniquePath(VIDEO_DIR, `resize_${input.preset}_${width}x${height}`, ext);
    const filter = `scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2`;
    runFfmpeg(["-i", input.input, "-vf", filter, output]);
    const size = (fs.statSync(output).size / 1024 / 1024).toFixed(2);
    return `Video diresize ke ${width}x${height} (${input.preset}):\n${output}\nUkuran: ${size} MB`;
  } catch (error: unknown) {
    return `Gagal meresize video: ${sanitizeErrorMessage(error)}`;
  }
}
