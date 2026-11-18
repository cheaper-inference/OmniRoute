function mediaData(part: Record<string, unknown>) {
  const inline = part.inlineData ?? part.inline_data;
  return { inline, rawData: inline ?? part.fileData ?? part.file_data };
}

/** Normalize Gemini media into the matching OpenAI-compatible carrier, never image-label a PDF/video. */
export function geminiMediaToOpenAI(part: Record<string, unknown>): Record<string, unknown> | null {
  const { inline, rawData } = mediaData(part);
  if (!rawData || typeof rawData !== "object") return null;
  const data = rawData as Record<string, unknown>;
  const mime = String(data.mimeType ?? data.mime_type ?? "application/octet-stream").toLowerCase();
  const ref = inline ? `data:${mime};base64,${data.data}` : (data.fileUri ?? data.file_uri);
  if (mime.startsWith("image/")) return { type: "image_url", image_url: { url: ref } };
  if (mime.startsWith("video/")) return { type: "video_url", video_url: { url: ref } };
  if (mime.startsWith("audio/"))
    return inline
      ? {
          type: "input_audio",
          input_audio: { data: data.data, format: mime === "audio/mpeg" ? "mp3" : mime.slice(6) },
        }
      : { type: "audio_url", audio_url: { url: ref } };
  return {
    type: "file",
    file: {
      filename: mime === "application/pdf" ? "attachment.pdf" : "attachment",
      file_data: ref,
    },
  };
}

/** Convert supported video carriers to Gemini parts without rewriting their source bytes. */
export function videoPartToGemini(part: Record<string, unknown>): Record<string, unknown> | null {
  if (part.type !== "video_url" && part.type !== "input_video") return null;
  const raw = part.video_url ?? part.url ?? part.input_video;
  const url = typeof raw === "string" ? raw : (raw as { url?: string } | undefined)?.url;
  if (!url) return null;
  const match = /^data:(video\/[^;,]+);base64,(.+)$/s.exec(url);
  return match
    ? { inlineData: { mimeType: match[1], data: match[2] } }
    : {
        fileData: {
          mimeType: /\.webm(?:$|[?#])/i.test(url) ? "video/webm" : "video/mp4",
          fileUri: url,
        },
      };
}
