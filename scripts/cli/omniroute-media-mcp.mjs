#!/usr/bin/env node
import { readFile, stat } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod/v4";
import { sanitizeErrorMessage } from "../../open-sse/utils/errorSanitization.ts";

const MAX_JSON_BYTES = 20 * 1024 * 1024;
const File = z.object({
  path: z.string().min(1).max(4096).describe("Local filesystem path requested by the user."),
  kind: z
    .enum(["audio", "video"])
    .optional()
    .describe("Disambiguate audio-only MP4/WebM containers when needed."),
});
export const MediaArguments = z.object({
  prompt: z
    .string()
    .min(1)
    .max(16000)
    .describe("The user's question, including what to inspect or transcribe."),
  files: z.array(File).min(1).max(8),
  max_tokens: z.number().int().min(128).max(8192).default(2048),
});

/** Identify supported media from its signature, rather than trusting a filename extension. */
function mediaType(bytes, filename, kind) {
  const text = bytes.subarray(0, 16).toString("latin1");
  if (text.startsWith("%PDF-")) return "application/pdf";
  if (bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])))
    return "image/png";
  if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return "image/jpeg";
  if (/^GIF8[79]a/.test(text)) return "image/gif";
  if (text.startsWith("RIFF") && text.slice(8, 12) === "WEBP") return "image/webp";
  if (text.startsWith("RIFF") && text.slice(8, 12) === "WAVE") return "audio/wav";
  if (text.startsWith("fLaC")) return "audio/flac";
  if (text.startsWith("OggS"))
    return kind === "video" || /\.ogv$/i.test(filename) ? "video/ogg" : "audio/ogg";
  if (
    text.startsWith("ID3") ||
    (bytes[0] === 255 && (bytes[1] & 224) === 224 && (bytes[1] & 6) !== 0)
  )
    return "audio/mpeg";
  if (text.slice(4, 8) === "ftyp") {
    if (kind === "audio" || /\.m4a$/i.test(filename) || text.slice(8, 12).startsWith("M4A"))
      return "audio/mp4";
    return text.slice(8, 12) === "qt  " ? "video/quicktime" : "video/mp4";
  }
  if (bytes.subarray(0, 4).equals(Buffer.from([26, 69, 223, 163])))
    return kind === "audio" || /\.weba$/i.test(filename) ? "audio/webm" : "video/webm";
  throw new Error(
    `Unsupported media in ${path.basename(filename)}. Use a PDF, PNG/JPEG/GIF/WebP, WAV/MP3/FLAC/Ogg, MP4/M4A/MOV or WebM file.`
  );
}

/** Build one multimodal request after validating local files and serialized size bounds. */
export async function buildMediaRequest(input, model = "auto") {
  const args = MediaArguments.parse(input);
  const files = await Promise.all(
    args.files.map(async (file) => {
      const filename = path.resolve(file.path);
      const info = await stat(filename);
      if (!info.isFile() || info.size === 0)
        throw new Error(`Not a non-empty regular file: ${path.basename(filename)}`);
      return { ...file, filename, size: info.size };
    })
  );
  const estimate =
    Buffer.byteLength(args.prompt) +
    4096 +
    files.reduce((sum, file) => sum + Math.ceil(file.size / 3) * 4 + 2048, 0);
  if (estimate > MAX_JSON_BYTES)
    throw new Error(
      "Media exceeds the 20 MiB inline JSON limit. Use fewer files or a shorter clip; files are never truncated."
    );
  const parts = await Promise.all(
    files.map(async (file) => {
      const bytes = await readFile(file.filename);
      if (bytes.length > file.size)
        throw new Error(
          "A media file changed while reading it. Retry once the file has finished writing."
        );
      const mime = mediaType(bytes, file.filename, file.kind);
      const data = `data:${mime};base64,${bytes.toString("base64")}`;
      return mime.startsWith("image/")
        ? { type: "image_url", image_url: { url: data } }
        : { type: "file", file: { filename: path.basename(file.filename), file_data: data } };
    })
  );
  const body = {
    model,
    stream: false,
    max_tokens: args.max_tokens,
    messages: [{ role: "user", content: [{ type: "text", text: args.prompt }, ...parts] }],
  };
  if (Buffer.byteLength(JSON.stringify(body)) > MAX_JSON_BYTES)
    throw new Error("Media exceeds the 20 MiB inline JSON limit. Nothing was sent.");
  return body;
}

/** Resolve the user-configured gateway and key, rejecting unsafe URLs and unresolved secrets. */
export async function mediaConnection() {
  const configPath =
    process.env.OMNIROUTE_MEDIA_CONFIG ||
    path.join(
      process.env.XDG_CONFIG_HOME || path.join(homedir(), ".config"),
      "opencode",
      "opencode.json"
    );
  const config = JSON.parse(await readFile(configPath, "utf8"));
  const settings =
    config.providers?.[process.env.OMNIROUTE_MEDIA_PROVIDER || "omniroute"]?.settings;
  if (!settings)
    throw new Error("The OmniRoute provider is missing from the OpenCode configuration.");
  const reference = /^\{env:([A-Za-z_][A-Za-z0-9_]{0,127})\}$/.exec(settings.apiKey || "");
  const key =
    process.env.OMNIROUTE_MEDIA_API_KEY ||
    (reference ? process.env[reference[1]] : settings.apiKey);
  if (!key || key.startsWith("{"))
    throw new Error("The OmniRoute API credential is unavailable in the tool's environment.");
  const base = new URL(settings.baseURL);
  if (
    base.username ||
    base.password ||
    (base.protocol !== "https:" &&
      !(base.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(base.hostname)))
  )
    throw new Error("OmniRoute must use HTTPS (HTTP is allowed only on localhost).");
  return {
    baseURL: base.href.replace(/\/$/, ""),
    key,
    model: process.env.OMNIROUTE_MEDIA_MODEL || "auto",
  };
}

/** Submit requested media and return text analysis while preserving sanitized HTTP errors. */
export async function analyzeMedia(input, options = {}) {
  const connection = options.connection || (await mediaConnection());
  const body = await buildMediaRequest(input, connection.model);
  const signal = options.signal
    ? AbortSignal.any([options.signal, AbortSignal.timeout(150000)])
    : AbortSignal.timeout(150000);
  const response = await fetch(`${connection.baseURL}/chat/completions`, {
    method: "POST",
    redirect: "error",
    signal,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${connection.key}` },
    body: JSON.stringify(body),
  });
  let result;
  try {
    result = JSON.parse(await response.text());
  } catch {
    result = null;
  }
  if (!response.ok) {
    const message = String(result?.error?.message || "Media analysis failed")
      .replaceAll(connection.key, "[redacted]")
      .slice(0, 1000);
    throw new Error(`OmniRoute HTTP ${response.status}: ${message}`);
  }
  if (!result || typeof result !== "object" || Array.isArray(result))
    throw new Error("OmniRoute returned an invalid JSON response.");
  const answer = result.choices?.[0]?.message?.content;
  if (typeof answer !== "string" || !answer.trim())
    throw new Error("The model returned no text analysis.");
  return {
    answer,
    model: result.model,
    files: input.files.map((file) => path.basename(file.path)),
    usage: result.usage,
    finish_reason: result.choices[0].finish_reason,
    output_truncated: result.choices[0].finish_reason === "length",
  };
}

export async function startMediaServer() {
  const server = new McpServer({ name: "omniroute-media", version: "1.0.0" });
  server.registerTool(
    "analyze_media",
    {
      description:
        "Read requested local audio, video, PDF and image files through the user's OmniRoute connection. Use for audio/video or mixed local media: OpenCode 2.2.5 omits native audio/video attachments. Pass the user's file paths and question. Only send files the user asked to analyze. Returns grounded text analysis; never truncates files. Existing native image/PDF attachments usually need no extra tool call.",
      inputSchema: MediaArguments.shape,
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: true },
    },
    async (args, extra) => {
      try {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(await analyzeMedia(args, { signal: extra.signal })),
            },
          ],
        };
      } catch (error) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: sanitizeErrorMessage(error) || "Media analysis failed",
            },
          ],
        };
      }
    }
  );
  await server.connect(new StdioServerTransport());
  return server;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  startMediaServer().catch(() => {
    process.stderr.write("OmniRoute media tool could not start.\n");
    process.exitCode = 1;
  });
}
