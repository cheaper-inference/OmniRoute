type ImagePart = { bytes: Buffer; mime?: string | null };
type AppendField = (name: string, value: string) => void;
type AppendFile = (name: string, filename: string, mime: string, bytes: Buffer) => void;

const EXTENSIONS = new Map([
  ["image/jpeg", "jpg"],
  ["image/jpg", "jpg"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
]);

// Only allow a media-type token in the multipart header.
const IMAGE_MIME = /^image\/[a-z0-9][a-z0-9.+-]*$/;

function appendImagePart(appendFile: AppendFile, name: string, filename: string, image: ImagePart) {
  const candidate = image.mime?.trim().toLowerCase() || "";
  const mime = IMAGE_MIME.test(candidate) ? candidate : "image/png";
  appendFile(name, `${filename}.${EXTENSIONS.get(mime) ?? "png"}`, mime, image.bytes);
}

function appendNativeOpenAIEditFiles(
  appendFile: AppendFile,
  fallback: ImagePart,
  images?: ImagePart[] | null,
  mask?: Buffer
) {
  const referenceImages = images?.filter(
    (image) => Buffer.isBuffer(image.bytes) && image.bytes.length
  );
  const references = referenceImages?.length ? referenceImages : [fallback];
  const field = references.length > 1 ? "image[]" : "image";
  for (const reference of references) {
    appendImagePart(appendFile, field, "image", reference);
  }

  if (mask) appendFile("mask", "mask.png", "image/png", mask);
}

export function appendNativeOpenAIEditOptions(
  appendField: AppendField,
  options: Record<string, unknown>
) {
  const outputFormat =
    typeof options.output_format === "string" ? options.output_format.trim().toLowerCase() : "";
  if (outputFormat) appendField("output_format", outputFormat);

  for (const name of ["quality", "background", "input_fidelity", "complexity", "moderation"]) {
    const value = options[name];
    if (typeof value === "string" && value.trim()) appendField(name, value.trim());
  }
  for (const name of ["frame_count", "frame_duration_ms"]) {
    const value = options[name];
    if (typeof value === "number" && Number.isFinite(value)) appendField(name, String(value));
  }

  const compression = options.output_compression;
  if (
    (outputFormat === "jpeg" || outputFormat === "webp") &&
    typeof compression === "number" &&
    Number.isFinite(compression)
  ) {
    appendField("output_compression", String(compression));
  }
}

export function finishOpenAIEditMultipart(
  parts: Buffer[],
  boundary: string,
  image: ImagePart,
  native?: { images?: ImagePart[] | null; mask?: Buffer }
): Buffer {
  const crlf = "\r\n";
  const appendFile: AppendFile = (name, filename, mime, bytes) => {
    parts.push(
      Buffer.from(
        `--${boundary}${crlf}Content-Disposition: form-data; name="${name}"; filename="${filename}"${crlf}` +
          `Content-Type: ${mime}${crlf}${crlf}`
      ),
      bytes,
      Buffer.from(crlf)
    );
  };
  if (native) {
    appendNativeOpenAIEditFiles(appendFile, image, native.images, native.mask);
  } else {
    appendFile("image", "image.png", image.mime || "image/png", image.bytes);
  }
  parts.push(Buffer.from(`--${boundary}--${crlf}`));
  return Buffer.concat(parts);
}

export function nativeOpenAIEditCount(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isSafeInteger(value) && value > 0 ? value : fallback;
}

export function usesOpenAIEditResponseFormat(native: boolean, model: string): boolean {
  return !native || !/^gpt-image-/i.test(model.trim());
}
