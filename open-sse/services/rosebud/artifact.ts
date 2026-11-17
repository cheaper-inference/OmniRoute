import { RosebudError } from "./cli.ts";

const ascii = (data: Buffer, start: number, end: number) => data.toString("ascii", start, end);
const startsWith = (data: Buffer, bytes: number[]) =>
  data.subarray(0, bytes.length).equals(Buffer.from(bytes));
const isRiff = (data: Buffer, kind: string) =>
  ascii(data, 0, 4) === "RIFF" && ascii(data, 8, 12) === kind;

const isPng = (data: Buffer) => startsWith(data, [137, 80, 78, 71, 13, 10, 26, 10]);
const isJpeg = (data: Buffer) => startsWith(data, [255, 216, 255]);
const isWebp = (data: Buffer) => isRiff(data, "WEBP");

/** True when the bytes are a PNG, JPEG or WebP image. */
export function isRasterImage(data: Buffer): boolean {
  return isPng(data) || isJpeg(data) || isWebp(data);
}

const AUDIO_CATEGORIES = new Set(["music", "sound_effect", "speech"]);
const AUDIO_MP4_BRANDS = new Set(["M4A ", "M4B ", "M4P ", "F4A "]);
const SVG_DOCUMENT = /^(?:<\?xml[^>]*>\s*)?<svg[\s>]/i;

type Signature = [
  matches: (data: Buffer) => boolean,
  mime: string | ((data: Buffer, category: string) => string),
];

/** Ordered: the first matching signature decides the type. */
const SIGNATURES: Signature[] = [
  [isPng, "image/png"],
  [isJpeg, "image/jpeg"],
  [isWebp, "image/webp"],
  [(data) => isRiff(data, "WAVE"), "audio/wav"],
  [
    (data) => ascii(data, 0, 3) === "ID3" || (data[0] === 255 && (data[1] & 224) === 224),
    "audio/mpeg",
  ],
  [(data) => ascii(data, 0, 4) === "OggS", "audio/ogg"],
  [(data) => ascii(data, 0, 4) === "fLaC", "audio/flac"],
  [
    (data) => startsWith(data, [0x1a, 0x45, 0xdf, 0xa3]),
    (_data, category) => (AUDIO_CATEGORIES.has(category) ? "audio/webm" : "video/webm"),
  ],
  [(data) => ascii(data, 0, 4) === "glTF", "model/gltf-binary"],
  [
    (data) => ascii(data, 4, 8) === "ftyp",
    (data) => (AUDIO_MP4_BRANDS.has(ascii(data, 8, 12)) ? "audio/mp4" : "video/mp4"),
  ],
  [(data) => SVG_DOCUMENT.test(data.toString("utf8", 0, 256).trim()), "image/svg+xml"],
];

function sniffMime(data: Buffer, category: string): string {
  const match = SIGNATURES.find(([matches]) => matches(data));
  if (!match) return "";
  return typeof match[1] === "string" ? match[1] : match[1](data, category);
}

function categoryPrefix(category: string): string {
  if (category === "model_3d") return "model/";
  if (category === "video") return "video/";
  return AUDIO_CATEGORIES.has(category) ? "audio/" : "image/";
}

/** Identify an artifact from its bytes and refuse a type its category does not allow. */
export function rosebudArtifactType(data: Buffer, category: string): string {
  const mime = sniffMime(data, category);
  const allowed = category === "any" || mime.startsWith(categoryPrefix(category));
  if (!mime || !allowed) throw new RosebudError("invalid_artifact_format", 502);
  return mime;
}

export const ROSEBUD_ARTIFACT_FORMATS: ReadonlySet<string> = new Set([
  "png",
  "jpg",
  "jpeg",
  "webp",
  "svg",
  "wav",
  "mp3",
  "ogg",
  "flac",
  "m4a",
  "mp4",
  "webm",
  "glb",
]);
