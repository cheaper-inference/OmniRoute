import { RosebudError } from "./cli.ts";

export function rosebudArtifactType(data: Buffer, category: string): string {
  let mime = "";
  if (data.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])))
    mime = "image/png";
  else if (data.subarray(0, 3).equals(Buffer.from([255, 216, 255]))) mime = "image/jpeg";
  else if (data.toString("ascii", 0, 4) === "RIFF" && data.toString("ascii", 8, 12) === "WEBP")
    mime = "image/webp";
  else if (data.toString("ascii", 0, 4) === "RIFF" && data.toString("ascii", 8, 12) === "WAVE")
    mime = "audio/wav";
  else if (data.toString("ascii", 0, 3) === "ID3" || (data[0] === 255 && (data[1] & 224) === 224))
    mime = "audio/mpeg";
  else if (data.toString("ascii", 0, 4) === "OggS") mime = "audio/ogg";
  else if (data.toString("ascii", 0, 4) === "fLaC") mime = "audio/flac";
  else if (data.subarray(0, 4).equals(Buffer.from([0x1a, 0x45, 0xdf, 0xa3])))
    mime = ["music", "sound_effect", "speech"].includes(category) ? "audio/webm" : "video/webm";
  else if (data.toString("ascii", 0, 4) === "glTF") mime = "model/gltf-binary";
  else if (data.toString("ascii", 4, 8) === "ftyp") {
    const brand = data.toString("ascii", 8, 12);
    mime = ["M4A ", "M4B ", "M4P ", "F4A "].includes(brand) ? "audio/mp4" : "video/mp4";
  } else if (/^(?:<\?xml[^>]*>\s*)?<svg[\s>]/i.test(data.toString("utf8", 0, 256).trim()))
    mime = "image/svg+xml";
  const allowed =
    category === "any"
      ? Boolean(mime)
      : category === "model_3d"
        ? mime.startsWith("model/")
        : category === "video"
          ? mime.startsWith("video/")
          : ["music", "sound_effect", "speech"].includes(category)
            ? mime.startsWith("audio/")
            : mime.startsWith("image/");
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
