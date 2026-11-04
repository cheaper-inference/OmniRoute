import type { MediaKind, MediaPart } from "./mediaParts.ts";

type Attachment = { kind: MediaKind; ref: string; shape: MediaPart["shape"] };
/** Read an attachment object without coercing primitive values. */
const record = (value: unknown): Record<string, unknown> =>
  value && typeof value === "object" ? (value as Record<string, unknown>) : {};
/** Read a textual attachment field without coercing non-string values. */
const string = (value: unknown): string => (typeof value === "string" ? value : "");

/** Classify declared MIME types without treating arbitrary binary files as images. */
function mimeKind(mime: string): MediaKind | null {
  const value = mime.toLowerCase().split(";")[0];
  if (value.startsWith("image/")) return "image";
  if (value.startsWith("audio/")) return "audio";
  if (value.startsWith("video/")) return "video";
  if (value === "application/pdf") return "document";
  return value ? "file" : null;
}

const first = (...values: unknown[]): unknown => values.find((value) => value != null);

/** Read typed Gemini inline/file attachments without decoding their content. */
function geminiAttachment(obj: Record<string, unknown>): Attachment | null {
  const inline = record(obj.inlineData ?? obj.inline_data);
  const remote = record(obj.fileData ?? obj.file_data);
  const data = Object.keys(inline).length ? inline : remote;
  const kind = mimeKind(string(data.mimeType ?? data.mime_type));
  return kind
    ? { kind, ref: string(first(data.data, data.fileUri, data.file_uri)), shape: "file_part" }
    : null;
}

/** Recognize document text that has already been extracted for ordinary text transport. */
function hasExtractedText(obj: Record<string, unknown>, file: Record<string, unknown>) {
  if (obj.type !== "file") return false;
  const references = [
    file.file_data,
    file.data,
    file.url,
    file.file_id,
    obj.file_data,
    obj.file_url,
    obj.file_id,
  ];
  return (
    !references.some(Boolean) &&
    typeof first(file.content, file.text, obj.content, obj.text) === "string"
  );
}

function fileReference(
  obj: Record<string, unknown>,
  file: Record<string, unknown>,
  source: Record<string, unknown>
) {
  return string(
    first(
      file.file_data,
      file.data,
      file.url,
      obj.file_data,
      obj.file_url,
      source.data,
      source.url,
      file.file_id,
      obj.file_id,
      source.file_id
    )
  );
}

/** Resolve PDF, media and opaque file kinds from the declared attachment metadata. */
function fileKind(
  obj: Record<string, unknown>,
  file: Record<string, unknown>,
  source: Record<string, unknown>,
  ref: string
): MediaKind {
  const mime =
    string(
      first(source.media_type, source.mime_type, file.mime_type, obj.mime_type, obj.media_type)
    ) ||
    (/^data:([^;,]+)/i.exec(ref)?.[1] ?? "");
  const name = string(first(file.filename, file.name, obj.filename, obj.name));
  return (
    mimeKind(mime) ??
    (/\.pdf(?:$|[?#])/i.test(name || ref) ||
    ref.startsWith("JVBER") ||
    string(obj.type).toLowerCase() === "document"
      ? "document"
      : "file")
  );
}

/** Typed file carriers only; ordinary text mentioning a file remains text. */
export function inspectAttachmentPart(obj: Record<string, unknown>): Attachment | null {
  const type = string(obj.type).toLowerCase();
  const native = geminiAttachment(obj);
  if (native) return native;
  const source = record(obj.source);
  if (type === "document" && ["text", "content"].includes(string(source.type))) return null;
  if (!["file", "file_url", "input_file", "document"].includes(type)) return null;
  const file = record(first(obj.file, obj.document, obj.file_url));
  if (hasExtractedText({ ...obj, type }, file)) return null;
  const ref = fileReference(obj, file, source);
  return { kind: fileKind(obj, file, source, ref), ref, shape: "file_part" };
}

/** Classify the MIME prefix of a data URI without decoding its content. */
export function dataUriKind(value: string): MediaKind | null {
  const mime = /^data:([^;,]+)/i.exec(value)?.[1];
  return mime ? mimeKind(mime) : null;
}
